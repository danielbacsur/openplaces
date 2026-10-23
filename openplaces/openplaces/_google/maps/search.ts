import { Place } from "openplaces";

import * as browser from "./browser";
import { pb } from "./features";
import { type AttributesAttribute, type PlaceNode, Response } from "./schema";

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

  const { results, ads, feed } = parsed.data;

  // sponsored hotels carry no timezone; use the response's when it has only one
  const zones = results?.context?.timezones ?? [];
  const fallback = zones.length === 1 ? (zones[0]?.id ?? undefined) : undefined;

  // our pb puts rows, ads and hotel ads in their own sections; the web-app layout
  // (pb !34m19) inlines all three at [64]
  const inline = !results?.rows?.some((row) => row?.place) && !!feed?.length;

  const organic = inline
    ? (feed ?? []).map((row) => row?.place)
    : (results?.rows ?? []).map((row) => row?.place);
  const sponsored = inline
    ? (feed ?? []).flatMap((row) => [row?.ad?.place, row?.hotelAd?.place])
    : [
        ...(ads?.ads ?? []).flat().map((ad) => ad?.place),
        ...(ads?.hotelAds ?? []).flat().map((ad) => ad?.place),
      ];

  // an advertised place can also be listed organically; keep the richer organic copy
  const listed = new Set(
    organic.flatMap((node) => (node ? [node.featureId] : [])),
  );

  return [
    ...organic.flatMap((node) => place(node, false, fallback)),
    ...sponsored
      .filter((node) => !(node && listed.has(node.featureId)))
      .flatMap((node) => place(node, true, fallback)),
  ];
}

function place(
  node: PlaceNode | null | undefined,
  sponsored: boolean,
  fallbackTimezone?: string,
): Place[] {
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
        : fallbackTimezone,

    address: node.address ?? join(node.addressLines),
    street: address?.streetDisplay ?? node.addressComponents?.street ?? undefined,
    district: address?.district ?? node.district ?? undefined,
    city: address?.city ?? locality(node),
    postalCode: address?.postalCode ?? undefined,
    country: address?.country ?? undefined,

    phone: node.phones?.[0]?.number ?? undefined,
    website: node.website?.url ?? undefined,
    logo:
      node.logo?.replace(/\/s\d+(-p-k-no-ns-nd\/photo\.jpg)$/, "/s256$1") ??
      undefined,

    rating: node.ratings?.rating ?? undefined,
    reviews: node.ratings?.reviewCount ?? undefined,
    // dark: Google sends no price to anonymous sessions as of 2026-10
    price: node.ratings?.priceLevel ?? node.ratings?.priceRange?.short ?? undefined,

    hours: hours(node.openingHours),

    services: services(node),
    accessible: accessible(node.attributes),

    reserve: node.reserve?.[0]?.url ?? undefined,
    sponsored: sponsored || node.adFlag === 1 || undefined,
    image: image(node),
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

// flat.city is missing on sponsored nodes and on some places ("Dubai - United Arab
// Emirates"); take the first segment of the locality line instead
function locality(node: PlaceNode) {
  const line =
    node.locality ??
    node.structuredAddress?.parts?.find((part) => part?.type === 4)?.values?.[0]?.[0];

  return line?.split(/,| - /)[0]?.trim() || undefined;
}

function image(node: PlaceNode) {
  const url =
    node.photos?.photos?.find((p) => p?.image?.url)?.image?.url ??
    node.legacyPhotos?.photos?.find((p) => p?.image?.url)?.image?.url;

  if (!url) return undefined;

  const absolute = url.startsWith("//") ? `https:${url}` : url;

  // cards get =wN-hN thumbnails of about 100px; the same key serves any size
  return absolute.replace(/=w\d+-h\d+-k-no$/, "=s1600-k-no");
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
      ? full.slice(status.length).replace(/^\s*(?:·\s*)?/, "")
      : full
  )?.replace(/\b([ap])m\b/gi, (_, meridiem) => `${meridiem.toLowerCase()}m`);

  const color = argb(current.status?.colorRuns?.[0]?.style?.colors?.[0]);

  if (!status && !detail) return undefined;
  return { status, detail: detail || undefined, color };
}

function services(node: PlaceNode) {
  const group = [
    ...(node.attributes?.groups ?? []),
    ...(node.attributes?.secondaryGroups ?? []),
  ].find((g) => g?.key === "service_options");

  const organic = (group?.attributes ?? []).flatMap((attribute) => {
    const label = attribute?.label;
    if (!attribute || !label) return [];
    return [{ label, available: value(attribute) }];
  });

  if (organic.length) return organic;

  // dark: sponsored badges are not sent to anonymous sessions as of 2026-10
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

// the card's wheelchair icon follows only the entrance attribute
function accessible(attributes: PlaceNode["attributes"]) {
  const entrance = [
    ...(attributes?.groups ?? []),
    ...(attributes?.secondaryGroups ?? []),
  ]
    .flatMap((group) => group?.attributes ?? [])
    .find((attribute) =>
      attribute?.id?.endsWith("/has_wheelchair_accessible_entrance"),
    );

  return entrance ? value(entrance) : undefined;
}

// availability.kind is the type of the value (1 yes/no, 3 option list), not the value;
// a yes/no value sits in shortLabels[0].value, and an option list counts as offered
function value(attribute: AttributesAttribute) {
  const flag = attribute.availability?.shortLabels?.[0]?.value;
  if (flag != null) return flag === 1;
  return attribute.negated !== 1;
}
