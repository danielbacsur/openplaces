import { Place } from "openplaces";

import * as browser from "./browser";
import { pb } from "./features";

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
