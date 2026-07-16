import { TIMEOUT, USER_AGENT } from "./config";
import { type MultiPolygon, type Polygon } from "./polygon";

export interface Area {
  center: { latitude: number; longitude: number };
  bounds: { south: number; north: number; west: number; east: number };
  polygons?: MultiPolygon;
}

export async function geocode(query: string): Promise<Area> {
  const url = new URL(
    `https://nominatim.openstreetmap.org/search?${new URLSearchParams({
      q: query,
      format: "jsonv2",
      limit: "1",
      polygon_geojson: "1",
    })}`,
  );

  const response = await fetch(url, {
    headers: { "user-agent": USER_AGENT },
    signal: AbortSignal.timeout(TIMEOUT),
  });

  if (!response.ok) {
    throw new Error(`nominatim failed to geocode "${query}"`);
  }

  const [result] = (await response.json()) as Array<{
    lat: string;
    lon: string;
    boundingbox: [string, string, string, string];
    geojson?:
      | { type: "Polygon"; coordinates: Polygon }
      | { type: "MultiPolygon"; coordinates: MultiPolygon }
      | { type: "Point" | "LineString"; coordinates: unknown };
  }>;

  if (!result) {
    throw new Error(`nominatim returned no result for "${query}"`);
  }

  const [latitude, longitude] = [result.lat, result.lon].map(Number);
  const [south, north, west, east] = result.boundingbox.map(Number);

  const polygons =
    result.geojson?.type === "Polygon"
      ? [result.geojson.coordinates]
      : result.geojson?.type === "MultiPolygon"
        ? result.geojson.coordinates
        : undefined;

  return {
    center: { latitude, longitude },
    bounds: { south, north, west, east },
    polygons,
  };
}
