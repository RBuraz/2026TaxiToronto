import { areaServed } from "@/data/areaContact/areaContact";
import { CONFIG } from "@/data/config/company";
import { firstPlaces } from "@/data/firstPlaces";
import { initialPrediction } from "@/data/initialPrediction";
import { secondPlaces } from "@/data/secendPlaces";
import { urlSlugify } from "@/lib/url";
import type { MetadataRoute } from "next";

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

  taxiAreaServed.forEach((taxiArea) => {
    sitemap.push({
      url: `${baseURL}/taxi/${taxiArea.path}`,
      changeFrequency: "monthly",
      lastModified: lastTimeModify.taxiPath,
      priority: 1.0,
    });
  });

  firstPlaces.forEach((place) => {
    sitemap.push({
      url: `${baseURL}/transfers/${urlSlugify(place.main_text)}`,
      changeFrequency: "monthly",
      lastModified: lastTimeModify.transferSinglePath,
      priority: 0.9,
    });
    initialPrediction.forEach((place2) => {
      sitemap.push({
        url: `${baseURL}/transfers/${urlSlugify(place.main_text)}/${urlSlugify(place2.main_text)}`,
        changeFrequency: "monthly",
        lastModified: lastTimeModify.transferTwoWayPath,
        priority: 0.7,
      });
      // i obrnuto, da se pokrije i putanja u suprotnom smjeru

      sitemap.push({
        url: `${baseURL}/transfers/${urlSlugify(place2.main_text)}/${urlSlugify(place.main_text)}`,
        changeFrequency: "monthly",
        lastModified: lastTimeModify.transferTwoWayPath,
        priority: 0.5,
      });
    });
  });

  secondPlaces.forEach((place) => {
    sitemap.push({
      url: `${baseURL}/transfers/${urlSlugify(place.main_text)}`,
      changeFrequency: "monthly",
      lastModified: lastTimeModify.transferSinglePath,
      priority: 0.8,
    });
    initialPrediction.forEach((place2) => {
      sitemap.push({
        url: `${baseURL}/transfers/${urlSlugify(place.main_text)}/${urlSlugify(place2.main_text)}`,
        changeFrequency: "monthly",
        lastModified: lastTimeModify.transferTwoWayPath,
        priority: 0.6,
      });

      // i obrnuto, da se pokrije i putanja u suprotnom smjeru
      sitemap.push({
        url: `${baseURL}/transfers/${urlSlugify(place2.main_text)}/${urlSlugify(place.main_text)}`,
        changeFrequency: "monthly",
        lastModified: lastTimeModify.transferTwoWayPath,
        priority: 0.4,
      });
    });
  });

  const uniqueSitemap = Array.from(
    new Map(sitemap.map((item) => [item.url, item])).values(),
  );

  return uniqueSitemap;
}
