import { Place } from "openplaces";

import * as browser from "./browser";
import { pb } from "./features";
import { type PlaceNode, Response } from "./schema";

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
      description:
        place.description?.summary?.text ??
        place.description?.blurb?.text ??
        undefined,
      latitude: place.coordinates?.latitude,
      longitude: place.coordinates?.longitude,
      timezone: place.timezone ?? undefined,
      address: place.address ?? join(place.addressLines),
      street:
        place.structuredAddress?.flat?.streetDisplay ??
        place.addressComponents?.street ??
        undefined,
      district:
        place.structuredAddress?.flat?.district ?? place.district ?? undefined,
      city: place.structuredAddress?.flat?.city ?? place.city ?? undefined,
      postalCode: place.structuredAddress?.flat?.postalCode ?? undefined,
      country: place.structuredAddress?.flat?.country ?? undefined,
      phone: place.phones?.[0]?.number ?? undefined,
      website: place.website?.url ?? undefined,
      rating: place.ratings?.rating ?? undefined,
      reviews: count(place.ratings?.reviewCount),
      price:
        place.ratings?.priceRange?.short ??
        place.ratings?.priceLevel ??
        undefined,
      hours: hours(place.openingHours),
      image: place.photos?.photos?.[0]?.image?.url ?? undefined,
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

function argb(value: number | null | undefined): string {
  if (typeof value !== "number") return "#5e5e5e";
  return "#" + (value & 0xffffff).toString(16).padStart(6, "0");
}

function hours(opening: PlaceNode["openingHours"]) {
  const current = opening?.current;
  if (!current) return undefined;

  const detail = current.status?.text ?? undefined;
  const status = current.shortStatus?.text ?? detail?.split("·")[0]?.trim();
  const color = argb(current.status?.colorRuns?.[0]?.style?.colors?.[0]);

  if (!status && !detail) return undefined;
  return { status, detail, color };
}

function count(reviews: number | null | undefined): string | undefined {
  return typeof reviews === "number" ? reviews.toLocaleString("en") : undefined;
}
