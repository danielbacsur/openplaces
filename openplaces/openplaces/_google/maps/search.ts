import { Place } from "openplaces";

import {
  FIELD_OF_VIEW,
  PAGE_SIZE,
  TIMEOUT,
  USER_AGENT,
  VIEWPORT_HEIGHT,
  VIEWPORT_WIDTH,
} from "./config";

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

  // prettier-ignore
  const protobuf = [
    `!1s${query}`,
    viewport && `!4m8!1m3!1d${viewport.altitude}!2d${viewport.longitude}!3d${viewport.latitude}!3m2!1i${VIEWPORT_WIDTH}!2i${VIEWPORT_HEIGHT}!4f${FIELD_OF_VIEW}`,
    `!7i${PAGE_SIZE}`,
    offset && `!8i${offset}`,
    `!10b1`,
  ].filter(Boolean).join("");

  const url = new URL(
    `https://www.google.com/search?${new URLSearchParams({
      tbm: "map",
      hl: "en",
      gl: "us",
      q: query,
      pb: protobuf,
    })}`,
  );

  const response = await fetch(url, {
    headers: { "user-agent": USER_AGENT, "accept-language": "en" },
    signal: AbortSignal.timeout(TIMEOUT),
  });

  if (!response.ok) throw new Error(`maps search failed: ${response.status}`);

  const data = JSON.parse((await response.text()).replace(/^\)\]\}'/, ""));

  return ((data?.[0]?.[1] ?? []) as any[]).flatMap((raw) => {
    const result = Place.safeParse({
      id: raw?.[14]?.[78],
      name: raw?.[14]?.[11],
      latitude: raw?.[14]?.[9]?.[2],
      longitude: raw?.[14]?.[9]?.[3],
      phone: raw?.[14]?.[178]?.[0]?.[0] ?? undefined,
      website: raw?.[14]?.[7]?.[0] ?? undefined,
    });
    return result.success ? [result.data] : [];
  });
}
