// taxiintl\src\app\actions\distanceMapper.ts
"use server";

//mapira sve sa svime pa san je prekinuo na pagu

import { Client } from "@googlemaps/google-maps-services-js";
import fs from "fs/promises";
import path from "path";
import { calculateDistance, DistanceResult } from "./distance";
import { initialPrediction } from "@/data/initialPrediction";
import { firstPlaces } from "@/data/firstPlaces";
import { secondPlaces } from "@/data/secendPlaces";


const client = new Client({});

// Tipovi
export interface DistanceMatrix {
  [originId: string]: {
    [destinationId: string]: DistanceResult;
  };
}

// Helper za čitanje JSON fajla
async function readJsonFile<T>(filePath: string): Promise<T> {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    return [] as T;
  }
}

// Helper za pisanje JSON fajla
async function writeJsonFile(filePath: string, data: any): Promise<void> {
  const dir = path.dirname(filePath);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

// Glavna funkcija za generiranje distance matrice
export async function generateAllDistances(): Promise<void> {
  console.log("🚀 Pokrećem generiranje allDistances.json...");
  
  // Definiraj putanje
  const dataDir = path.join(process.cwd(), "src", "data");
  const outputPath = path.join(dataDir, "allDistances.json");
  
  // Filtriraj secondPlaces - izbaci one s "lodging" u types
  const filteredSecondPlaces = secondPlaces.filter(
    (place) => !place.types?.includes("lodging"),
  );
  
  console.log(`📊 firstPlaces: ${firstPlaces.length}`);
  console.log(`📊 secondPlaces (ukupno): ${secondPlaces.length}`);
  console.log(`📊 secondPlaces (bez lodging): ${filteredSecondPlaces.length}`);
  console.log(`📊 initialPrediction: ${initialPrediction.length}`);

  // Kreiraj Set svih place_id-ova za brzu provjeru
  const allPlaceIds = new Set<string>();
  
  // Kombiniraj sve destinacije (bez duplikata po place_id)
  const allDestinations = [
    ...firstPlaces,
    ...filteredSecondPlaces,
    ...initialPrediction
  ];
  
  const uniqueDestinations = Array.from(
    new Map(allDestinations.map((item) => [item.place_id, item])).values(),
  );
  
  console.log(`📊 Unique destinations (nakon uklanjanja duplikata): ${uniqueDestinations.length}`);

  // Mapa za praćenje već izračunatih ruta
  const calculatedRoutes = new Set<string>();
  const distanceMatrix: DistanceMatrix = {};

  // Inicijaliziraj prazne objekte za sve destinacije
  for (const place of uniqueDestinations) {
    distanceMatrix[place.place_id] = {};
    allPlaceIds.add(place.place_id);
  }

  let totalCalls = 0;
  const totalExpected = Math.pow(uniqueDestinations.length, 2); // Sve kombinacije
  console.log(`📊 Očekivani broj API poziva (nakon optimizacije): ~${Math.floor(totalExpected / 2)}`);

  // Za svaki origin
  for (let i = 0; i < uniqueDestinations.length; i++) {
    const origin = uniqueDestinations[i];
    console.log(
      `\n📍 [${i + 1}/${uniqueDestinations.length}] Processing: ${origin.description?.split(",")[0] || origin.main_text}`,
    );

    // Sebi dodaj 0
    distanceMatrix[origin.place_id][origin.place_id] = {
      distance: "0 km",
      distanceMeters: 0,
      duration: "0 min",
      durationMinutes: 0,
      status: "OK",
    };

    // Za svaku destinaciju (samo one koje nismo već obradili)
    for (let j = i + 1; j < uniqueDestinations.length; j++) {
      const destination = uniqueDestinations[j];

      // Kreiraj ključ za rutu
      const routeKey = [origin.place_id, destination.place_id].sort().join("|");

      // Ako smo već izračunali ovu rutu, preskoči
      if (calculatedRoutes.has(routeKey)) {
        continue;
      }

      totalCalls++;
      console.log(
        `   📞 API call ${totalCalls}: ${origin.main_text || origin.description?.split(",")[0]} → ${destination.main_text || destination.description?.split(",")[0]}`,
      );

      try {
        const result = await calculateDistance(
          origin.place_id,
          destination.place_id,
        );

        // Spremi rezultat za oba smjera
        distanceMatrix[origin.place_id][destination.place_id] = result;
        distanceMatrix[destination.place_id][origin.place_id] = result;

        // Označi kao izračunato
        calculatedRoutes.add(routeKey);

        // Čekaj malo da ne preopteretiš API (rate limiting)
        await new Promise((resolve) => setTimeout(resolve, 200));
      } catch (error) {
        console.error(
          `   ❌ Greška za rutu ${origin.place_id} → ${destination.place_id}:`,
          error,
        );

        const errorResult: DistanceResult = {
          distance: "N/A",
          distanceMeters: 0,
          duration: "N/A",
          durationMinutes: 0,
          status: "ERROR",
        };

        distanceMatrix[origin.place_id][destination.place_id] = errorResult;
        distanceMatrix[destination.place_id][origin.place_id] = errorResult;
        calculatedRoutes.add(routeKey);
      }

      // Povremeno spremi međurezultat (svakih 50 poziva)
      if (totalCalls % 50 === 0) {
        console.log(`   💾 Saving checkpoint after ${totalCalls} calls...`);
        await writeJsonFile(
          outputPath.replace(".json", "_checkpoint.json"),
          distanceMatrix,
        );
      }
    }
  }

  // Spremi konačni rezultat
  await writeJsonFile(outputPath, distanceMatrix);

  console.log("\n✅ Generiranje allDistances.json završeno!");
  console.log(`📈 Ukupno API poziva: ${totalCalls}`);
  console.log(`📁 Rezultat spremljen u: ${outputPath}`);
  
  // Izračunaj statistiku
  let successCount = 0;
  let errorCount = 0;
  
  for (const originId of Object.keys(distanceMatrix)) {
    for (const destId of Object.keys(distanceMatrix[originId])) {
      if (distanceMatrix[originId][destId].status === "OK") {
        successCount++;
      } else {
        errorCount++;
      }
    }
  }
  
  console.log(`📊 Uspješnih ruta: ${successCount}`);
  console.log(`📊 Grešaka: ${errorCount}`);
  console.log(`📊 Ukupno ruta u matrici: ${successCount + errorCount}`);
}

// Funkcija za čitanje postojeće matrice
export async function loadDistanceMatrix(
  filePath: string = path.join(process.cwd(), "src", "data", "allDistances.json"),
): Promise<DistanceMatrix | null> {
  try {
    return await readJsonFile<DistanceMatrix>(filePath);
  } catch (error) {
    return null;
  }
}

// Funkcija za dohvat distance između dva mjesta
export async function getDistanceBetween(
  originPlaceId: string,
  destinationPlaceId: string,
): Promise<DistanceResult | null> {
  try {
    const matrix = await loadDistanceMatrix();
    if (!matrix) return null;
    
    return matrix[originPlaceId]?.[destinationPlaceId] || null;
  } catch (error) {
    console.error("Error getting distance:", error);
    return null;
  }
}

// Funkcija za provjeru i ažuriranje (ako fali neka ruta)
export async function ensureDistanceExists(
  originPlaceId: string,
  destinationPlaceId: string,
): Promise<DistanceResult> {
  // Prvo probaj iz postojeće matrice
  const existing = await getDistanceBetween(originPlaceId, destinationPlaceId);
  if (existing) return existing;
  
  // Ako ne postoji, izračunaj
  console.log(`⚠️ Ruta ne postoji, izračunavam: ${originPlaceId} → ${destinationPlaceId}`);
  
  const result = await calculateDistance(originPlaceId, destinationPlaceId);
  
  // Spremi u matricu
  const matrix = (await loadDistanceMatrix()) || {};
  
  if (!matrix[originPlaceId]) matrix[originPlaceId] = {};
  if (!matrix[destinationPlaceId]) matrix[destinationPlaceId] = {};
  
  matrix[originPlaceId][destinationPlaceId] = result;
  matrix[destinationPlaceId][originPlaceId] = result;
  
  await writeJsonFile(
    path.join(process.cwd(), "src", "data", "allDistances.json"),
    matrix,
  );
  
  return result;
}