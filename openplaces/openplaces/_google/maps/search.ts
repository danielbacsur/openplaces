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

  const organic = (parsed.data.results?.rows ?? []).map((row) => row?.place);
  const sponsored = (parsed.data.ads?.ads ?? [])
    .flat()
    .map((ad) => ad?.place);

  return [
    ...organic.flatMap((node) => place(node, false)),
    ...sponsored.flatMap((node) => place(node, true)),
  ];
}

function place(node: PlaceNode | null | undefined, sponsored: boolean): Place[] {
  if (!node) return [];

  const address = node.structuredAddress?.flat;

  const result = Place.safeParse({
    id: node.identifiers?.bundle?.placeId ?? node.placeId,
    name: node.name,
    localName: node.localName ?? undefined,

    category: node.relatedTypes?.[0]?.label ?? node.categories?.[0] ?? undefined,
    categories: strings(node.categories),
    description: node.description?.summary?.text ?? node.description?.blurb?.text,

    latitude: node.coordinates?.latitude,
    longitude: node.coordinates?.longitude,
    timezone:
      node.timezone && node.timezone !== "Etc/Unknown"
        ? node.timezone
        : undefined,

    address: node.address ?? join(node.addressLines),
    street: address?.streetDisplay ?? node.addressComponents?.street ?? undefined,
    district: address?.district ?? node.district ?? undefined,
    city: address?.city ?? node.city ?? undefined,
    postalCode: address?.postalCode ?? undefined,
    country: address?.country ?? undefined,

    phone: node.phones?.[0]?.number ?? undefined,
    website: node.website?.url ?? undefined,
    logo: node.logo ?? undefined,

    rating: node.ratings?.rating ?? undefined,
    reviews: count(node.ratings?.reviewCount),
    price: node.ratings?.priceRange?.short ?? node.ratings?.priceLevel ?? undefined,

    hours: hours(node.openingHours),

    services: services(node),
    accessible: accessible(node.attributes),

    reserve: node.reserve?.[0]?.url ?? undefined,
    sponsored: sponsored || undefined,
    image:
      node.photos?.photos?.[0]?.image?.url ??
      node.legacyPhotos?.photos?.[0]?.image?.url ??
      undefined,
  });

  return result.success ? [result.data] : [];
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

function argb(value: number | null | undefined): string {
  if (typeof value !== "number") return "#5e5e5e";
  return "#" + (value & 0xffffff).toString(16).padStart(6, "0");
}

function hours(opening: PlaceNode["openingHours"]) {
  const current = opening?.current;
  if (!current) return undefined;

  const full = current.status?.text ?? undefined;
  const status = current.shortStatus?.text ?? full?.split("·")[0]?.trim();

  const detail = (
    full && status && full.startsWith(status)
      ? full.slice(status.length).replace(/^\s*·\s*/, "")
      : full
  )?.replace(/\b([ap])m\b/gi, (_, meridiem) => `${meridiem.toLowerCase()}m`);

  const color = argb(current.status?.colorRuns?.[0]?.style?.colors?.[0]);

  if (!status && !detail) return undefined;
  return { status, detail: detail || undefined, color };
}

function services(node: PlaceNode) {
  const group = node.attributes?.groups?.find((g) => g?.key === "service_options");

  const organic = (group?.attributes ?? []).flatMap((attribute) => {
    const label = attribute?.label;
    if (!label) return [];
    return [{ label, available: attribute?.availability?.state === 1 }];
  });

  if (organic.length) return organic;

  const promoted = (node.promoted?.groups?.[0]?.services?.[0] ?? []).flatMap(
    (service) => {
      const label = service?.label?.[0];
      if (!label) return [];
      const icon = service?.icons?.[0]?.[0] ?? "";
      return [{ label, available: /green/.test(icon) }];
    },
  );

  return promoted.length ? promoted : undefined;
}

function accessible(attributes: PlaceNode["attributes"]) {
  for (const group of attributes?.groups ?? []) {
    for (const attribute of group?.attributes ?? []) {
      if (typeof attribute?.id === "string" && attribute.id.includes("wheelchair")) {
        return attribute.availability?.state === 1;
      }
    }
  }

  return undefined;
}
