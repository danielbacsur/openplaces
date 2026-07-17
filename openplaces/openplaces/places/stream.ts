import { sql } from "drizzle-orm";

import { type OpenPlaces, Place } from "openplaces";

import { type Places } from ".";
import * as browser from "../_google/maps/browser";
import {
  MAX_OFFSET,
  PAGE_SIZE,
  VIEWPORT_HEIGHT,
  VIEWPORT_WIDTH,
} from "../_google/maps/config";
import { search } from "../_google/maps/search";
import { places } from "../_openplaces/drizzle/schema";
import { sqlite } from "../_openplaces/drizzle/sqlite";
import { parse } from "../_openplaces/language";
import { geocode } from "../_openstreetmap/nominatim/geocode";
import { contains, intersects } from "../_openstreetmap/nominatim/polygon";
import { EARTH_CIRCUMFERENCE, HALF_FIELD_OF_VIEW_TANGENT } from "./config";

export async function* stream(
  this: Places,
  query: string,
  options: OpenPlaces.Places.Stream.Options = {},
): AsyncGenerator<Place> {
  const where = options.where;
  const database = where ? await sqlite() : undefined;

  const match = (place: Place) => {
    if (!where || !database) return true;

    database.delete(places).run();
    database.insert(places).values(place).run();

    return (
      database
        .select({ one: sql`1` })
        .from(places)
        .where(sql.raw(where))
        .all().length > 0
    );
  };

  try {
    const limit = options.limit ?? Infinity;
    const seen = new Set<string>();

    let count = 0;

    this.client.emit("query", query);

    for (const prototype of parse(query)) {
      if (count >= limit) return;

      if (!prototype.location) {
        for (const place of await search({ query: prototype.query })) {
          if (seen.has(place.id)) continue;
          seen.add(place.id);

          if (!match(place)) continue;

          this.client.emit("place", place);
          yield place;

          if (++count >= limit) return;
        }
        continue;
      }

      const { bounds: root, polygons } = await geocode(prototype.location);
      const queue = [root];

      while (queue.length > 0) {
        const cell = queue.shift()!;
        if (polygons && !intersects(polygons, cell)) continue;

        const latitude = (cell.south + cell.north) / 2;
        const longitude = (cell.west + cell.east) / 2;
        const cosineLatitude = Math.cos((latitude * Math.PI) / 180);

        const widthMeters =
          ((cell.east - cell.west) * EARTH_CIRCUMFERENCE * cosineLatitude) / 360;
        const heightMeters =
          ((cell.north - cell.south) * EARTH_CIRCUMFERENCE) / 360;

        const metersPerPixel = Math.max(
          widthMeters / VIEWPORT_WIDTH,
          heightMeters / VIEWPORT_HEIGHT,
        );

        const altitude =
          ((VIEWPORT_HEIGHT / 2) * metersPerPixel) / HALF_FIELD_OF_VIEW_TANGENT;

        const viewport = { latitude, longitude, altitude };

        let saturated = false;

        for (let offset = 0; offset < MAX_OFFSET; offset += PAGE_SIZE) {
          const places = await search({
            query: prototype.query,
            viewport,
            offset,
          });
          if (places.length === 0) break;

          let fresh = 0;
          for (const place of places) {
            if (place.latitude < cell.south || place.latitude > cell.north)
              continue;
            if (place.longitude < cell.west || place.longitude > cell.east)
              continue;
            if (polygons && !contains(polygons, place.latitude, place.longitude))
              continue;

            if (seen.has(place.id)) continue;
            seen.add(place.id);
            fresh++;

            if (!match(place)) continue;

            this.client.emit("place", place);
            yield place;

            if (++count >= limit) return;
          }

          if (places.length < PAGE_SIZE) break;
          saturated = true;
          if (fresh === 0) break;
        }

        if (saturated) {
          queue.push(
            {
              south: cell.south,
              north: latitude,
              west: cell.west,
              east: longitude,
            },
            {
              south: cell.south,
              north: latitude,
              west: longitude,
              east: cell.east,
            },
            {
              south: latitude,
              north: cell.north,
              west: cell.west,
              east: longitude,
            },
            {
              south: latitude,
              north: cell.north,
              west: longitude,
              east: cell.east,
            },
          );
        }
      }
    }
  } finally {
    database?.close();
    await browser.close();
  }
}

declare module "openplaces" {
  namespace OpenPlaces.Places.Stream {
    interface Options {
      where?: string;
      limit?: number;
    }
  }
}
