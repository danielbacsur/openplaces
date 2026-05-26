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
      category: place.categories?.[0] ?? undefined,
      categories: strings(place.categories),
      latitude: place.coordinates?.latitude,
      longitude: place.coordinates?.longitude,
      address: join(place.addressLines),
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

function strings(values: (string | null | undefined)[] | null | undefined) {
  const list = (values ?? []).filter((v): v is string => typeof v === "string");
  return list.length ? list : undefined;
}

function join(lines: (string | null | undefined)[] | null | undefined) {
  return lines?.filter(Boolean).join(", ") || undefined;
}

function count(reviews: number | null | undefined): string | undefined {
  return typeof reviews === "number" ? reviews.toLocaleString("en") : undefined;
}
