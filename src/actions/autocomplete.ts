// app/actions/autocomplete.ts
"use server";

import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client({});

export const autocompleteNovi = async (input: string) => {
  try {
    const normalizedInput = input.toLowerCase().trim();

    if (!normalizedInput || normalizedInput.length < 2) {
      return [];
    }

    if (!process.env.GOOGLE_API_KEY) {
      console.error("Google API key is missing");
      return [];
    }

    const response = await client.placeAutocomplete({
      params: {
        input: normalizedInput,
        key: process.env.GOOGLE_API_KEY,
        language: "en",
        components: ["country:hr"],
      },
    });

    const predictions = response.data.predictions.map((prediction) => ({
      description: prediction.description,
      place_id: prediction.place_id,
      types: prediction.types || [],
      main_text: prediction.structured_formatting?.main_text || "",
      secondary_text: prediction.structured_formatting?.secondary_text || "",
    }));

    return predictions;
  } catch (error: any) {
    console.error("Error in autocompleteNovi:", error.message || error);
    return [];
  }
};