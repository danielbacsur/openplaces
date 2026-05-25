import { Place } from "openplaces";

import * as browser from "./browser";
import { pb } from "./features";
import { Response } from "./schema";

interface Options {
  query: string;
  viewport?: {
    latitude: number;
    longitude: number;
    altitude: number;
  };
  offset?: number;
}

export async function search(options: Options): Promise<Place[]> {
  const { query, viewport, offset } = options;

  const url = new URL(
    `https://www.google.com/search?${new URLSearchParams({
      tbm: "map",
      hl: "en",
      gl: "us",
      q: query,
      pb: pb({ query, viewport, offset }),
    })}`,
  );

  const data = JSON.parse((await browser.get(url)).replace(/^\)\]\}'/, ""));

  const parsed = Response.safeParse(data);
  if (!parsed.success) return [];

  return (parsed.data.results?.rows ?? []).flatMap((row) => {
    const place = row?.place;
    if (!place) return [];

    const result = Place.safeParse({
      id: place.placeId,
      name: place.name,
      latitude: place.coordinates?.latitude,
      longitude: place.coordinates?.longitude,
      phone: place.phones?.[0]?.number ?? undefined,
      website: place.website?.url ?? undefined,
      rating: place.ratings?.rating ?? undefined,
      reviews: count(place.ratings?.reviewCount),
      price:
        place.ratings?.priceRange?.short ??
        place.ratings?.priceLevel ??
        undefined,
    });

    return result.success ? [result.data] : [];
  });
}

function count(reviews: number | null | undefined): string | undefined {
  return typeof reviews === "number" ? reviews.toLocaleString("en") : undefined;
}
