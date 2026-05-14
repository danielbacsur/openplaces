import { beforeAll, describe, expect, it } from "vitest";

import { Place } from "../_google/maps/place";
import { OpenPlaces } from "..";

const places = new OpenPlaces().places;

describe("stream", () => {
  describe("unique landmark", () => {
    let results: Place[];

    beforeAll(async () => {
      results = await places.search("eiffel tower");
    }, 5_000);

    it("returns exactly one place for a unique landmark", () => {
      expect(results).toHaveLength(1);
    });

    it("returns a name that matches the eiffel tower query", () => {
      expect(results[0].name).toMatch(/eiffel tower/i);
    });

    it("returns latitude and longitude of the eiffel tower", () => {
      expect(results[0].latitude).toBeCloseTo(48.858, 1);
      expect(results[0].longitude).toBeCloseTo(2.294, 1);
    });
  });

  describe("area traversal (limit 200)", () => {
    let results: Place[];

    beforeAll(async () => {
      results = await places.search("restaurants in budapest", { limit: 200 });
    }, 200_000);

    it("returns exactly the requested limit of two hundred", () => {
      expect(results).toHaveLength(200);
    });

    it("returns a unique id for every place in the stream", () => {
      const ids = new Set(results.map((r) => r.id));
      expect(ids.size).toBe(200);
    });

    it("returns a ChIJ-prefixed id on every yielded place", () => {
      for (const r of results) {
        expect(r.id).toMatch(/^ChIJ[\w-]+$/);
      }
    });

    it("returns a non-empty string name on every result", () => {
      for (const r of results) {
        expect(typeof r.name).toBe("string");
      }
    });

    it("keeps every place inside the budapest bounding box", () => {
      for (const r of results) {
        expect(r.latitude).toBeGreaterThan(47);
        expect(r.latitude).toBeLessThan(48);
        expect(r.longitude).toBeGreaterThan(18);
        expect(r.longitude).toBeLessThan(20);
      }
    });
  });
});
