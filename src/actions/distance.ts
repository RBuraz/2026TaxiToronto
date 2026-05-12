// taxiintl\src\app\actions\distance.ts
"use server";

import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client({});

export interface DistanceResult {
  distance: string;
  distanceMeters: number;
  duration: string;
  durationMinutes: number;
  status: string;
}

export const calculateDistance = async (
  originPlaceId: string,
  destinationPlaceId: string,
): Promise<DistanceResult> => {
  try {
    if (!process.env.GOOGLE_API_KEY) {
      throw new Error("Google API key is missing");
    }

    const response = await client.distancematrix({
      params: {
        origins: [`place_id:${originPlaceId}`],
        destinations: [`place_id:${destinationPlaceId}`],
        key: process.env.GOOGLE_API_KEY,
        language: "en",
      },
    });

    const element = response.data.rows[0].elements[0];

    if (element.status === "OK") {
      return {
        distance: element.distance.text,
        distanceMeters: element.distance.value,
        duration: element.duration.text,
        durationMinutes: Math.ceil(element.duration.value / 60),
        status: "OK",
      };
    } else {
      throw new Error(`Google Maps API error: ${element.status}`);
    }
  } catch (error: any) {
    console.error("Error calculating distance:", error.message || error);
    return {
      distance: "N/A",
      distanceMeters: 0,
      duration: "N/A",
      durationMinutes: 0,
      status: "ERROR",
    };
  }
};
