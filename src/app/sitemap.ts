import { areaServed } from "@/data/areaContact/areaContact";
import { CONFIG } from "@/data/config/company";
import { firstPlaces } from "@/data/firstPlaces";
import { initialPrediction } from "@/data/initialPrediction";
import { secondPlaces } from "@/data/secendPlaces";
import { urlSlugify } from "@/lib/url";
import type { MetadataRoute } from "next";

// Pretpostavljam da distances dolazi iz nekog importa
import { distances } from "@/data/distances"; // Dodaj ovo

type Distance = any; // Definiraj prema tvojoj strukturi

export default function sitemap(): MetadataRoute.Sitemap {
  const baseURL = CONFIG.url;

  const lastTimeModify = {
    other: "2026-05-13",
    taxiPath: "2026-05-13",
    transferSinglePath: "2026-05-13",
    transferTwoWayPath: "2026-05-13",
  };

  const taxiAreaServed = Object.values(areaServed);
  const sitemap: MetadataRoute.Sitemap = [];

  // Osnovne stranice
  sitemap.push(
    {
      url: `${baseURL}`,
      changeFrequency: "yearly",
      lastModified: lastTimeModify.other,
      priority: 0.3,
    },
    {
      url: `${baseURL}/taxi`,
      changeFrequency: "yearly",
      lastModified: lastTimeModify.other,
      priority: 0.4,
    },
    {
      url: `${baseURL}/transfers`,
      changeFrequency: "yearly",
      lastModified: lastTimeModify.other,
      priority: 0.4,
    },
    {
      url: `${baseURL}/transfers/calculator`,
      changeFrequency: "yearly",
      lastModified: lastTimeModify.other,
      priority: 1.0,
    },
  );

  // Taxi area served
  taxiAreaServed.forEach((taxiArea) => {
    sitemap.push({
      url: `${baseURL}/taxi/${taxiArea.path}`,
      changeFrequency: "monthly",
      lastModified: lastTimeModify.taxiPath,
      priority: 1.0,
    });
  });

  // Helper funkcija za provjeru da li ruta postoji
  const isValidTransferRoute = (fromText: string, toText: string): boolean => {
    const fromLocation = initialPrediction.find(
      (prediction) => urlSlugify(prediction.main_text.toLowerCase()) === urlSlugify(fromText.toLowerCase())
    );
    
    const toLocation = initialPrediction.find(
      (prediction) => urlSlugify(prediction.main_text.toLowerCase()) === urlSlugify(toText.toLowerCase())
    );

    if (!fromLocation || !toLocation) return false;

    const distanceFromTo = (distances as Record<string, Record<string, Distance>>)[fromLocation.place_id]?.[toLocation.place_id];
    
    return !!distanceFromTo;
  };

  // First places - samo single pages koje postoje u initialPrediction
  firstPlaces.forEach((place) => {
    // Provjeri da li place postoji u initialPrediction
    const placeExists = initialPrediction.some(
      (p) => urlSlugify(p.main_text.toLowerCase()) === urlSlugify(place.main_text.toLowerCase())
    );
    
    if (placeExists) {
      sitemap.push({
        url: `${baseURL}/transfers/${urlSlugify(place.main_text)}`,
        changeFrequency: "monthly",
        lastModified: lastTimeModify.transferSinglePath,
        priority: 0.9,
      });
    }

    // Dual routes - samo validne rute
    initialPrediction.forEach((place2) => {
      // Provjeri oba smjera
      if (isValidTransferRoute(place.main_text, place2.main_text)) {
        sitemap.push({
          url: `${baseURL}/transfers/${urlSlugify(place.main_text)}/${urlSlugify(place2.main_text)}`,
          changeFrequency: "monthly",
          lastModified: lastTimeModify.transferTwoWayPath,
          priority: 0.7,
        });
      }

      if (isValidTransferRoute(place2.main_text, place.main_text)) {
        sitemap.push({
          url: `${baseURL}/transfers/${urlSlugify(place2.main_text)}/${urlSlugify(place.main_text)}`,
          changeFrequency: "monthly",
          lastModified: lastTimeModify.transferTwoWayPath,
          priority: 0.5,
        });
      }
    });
  });

  // Second places
  secondPlaces.forEach((place) => {
    const placeExists = initialPrediction.some(
      (p) => urlSlugify(p.main_text.toLowerCase()) === urlSlugify(place.main_text.toLowerCase())
    );
    
    if (placeExists) {
      sitemap.push({
        url: `${baseURL}/transfers/${urlSlugify(place.main_text)}`,
        changeFrequency: "monthly",
        lastModified: lastTimeModify.transferSinglePath,
        priority: 0.8,
      });
    }

    initialPrediction.forEach((place2) => {
      if (isValidTransferRoute(place.main_text, place2.main_text)) {
        sitemap.push({
          url: `${baseURL}/transfers/${urlSlugify(place.main_text)}/${urlSlugify(place2.main_text)}`,
          changeFrequency: "monthly",
          lastModified: lastTimeModify.transferTwoWayPath,
          priority: 0.6,
        });
      }

      if (isValidTransferRoute(place2.main_text, place.main_text)) {
        sitemap.push({
          url: `${baseURL}/transfers/${urlSlugify(place2.main_text)}/${urlSlugify(place.main_text)}`,
          changeFrequency: "monthly",
          lastModified: lastTimeModify.transferTwoWayPath,
          priority: 0.4,
        });
      }
    });
  });

  // Ukloni duplikate
  const uniqueSitemap = Array.from(
    new Map(sitemap.map((item) => [item.url, item])).values(),
  );

  return uniqueSitemap;
}