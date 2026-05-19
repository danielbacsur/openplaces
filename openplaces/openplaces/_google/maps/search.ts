import { Place } from "openplaces";

import {
  FIELD_OF_VIEW,
  PAGE_SIZE,
  TIMEOUT,
  USER_AGENT,
  VIEWPORT_HEIGHT,
  VIEWPORT_WIDTH,
} from "./config";
import { type Node } from "./protobuf/schema";
import { serialize } from "./protobuf/serialize";

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

  const nodes: Node[] = [];

  nodes.push({ tag: 1, type: "s", value: query });

  if (viewport) {
    nodes.push({
      tag: 4,
      type: "m",
      children: [
        {
          tag: 1,
          type: "m",
          children: [
            { tag: 1, type: "d", value: viewport.altitude },
            { tag: 2, type: "d", value: viewport.longitude },
            { tag: 3, type: "d", value: viewport.latitude },
          ],
        },
        {
          tag: 3,
          type: "m",
          children: [
            { tag: 1, type: "i", value: VIEWPORT_WIDTH },
            { tag: 2, type: "i", value: VIEWPORT_HEIGHT },
          ],
        },
        { tag: 4, type: "f", value: FIELD_OF_VIEW },
      ],
    });
  }

  nodes.push({ tag: 7, type: "i", value: PAGE_SIZE });

  if (offset) {
    nodes.push({ tag: 8, type: "i", value: offset });
  }

  nodes.push({ tag: 10, type: "b", value: 1 });

  const protobuf = serialize(nodes);

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
