import { beforeAll, describe, expect, it } from "vitest";

import { Place } from "../_google/maps/place";
import { OpenPlaces } from "..";

const places = new OpenPlaces().places;

describe("stream", () => {
  describe("unique landmark", () => {
    let results: Place[];

    beforeAll(async () => {
      results = await places.search("eiffel tower");
    }, 5000);

    it("returns exactly one place", () => {
      expect(results).toHaveLength(1);
    });

    it("returns a name matching the query", () => {
      expect(results[0].name).toMatch(/eiffel tower/i);
    });

    it("returns the eiffel tower coordinates", () => {
      expect(results[0].latitude).toBeCloseTo(48.858, 1);
      expect(results[0].longitude).toBeCloseTo(2.294, 1);
    });
  });

  describe("area traversal (limit 200)", () => {
    let results: Place[];

    beforeAll(async () => {
      results = await places.search("restaurants in budapest", { limit: 200 });
    }, 200000);

    it("returns exactly the requested number of places", () => {
      expect(results).toHaveLength(200);
    });

    it("returns all unique ids", () => {
      const ids = new Set(results.map((r) => r.id));
      expect(ids.size).toBe(200);
    });

    it("returns ChIJ-prefixed ids", () => {
      for (const r of results) {
        expect(r.id).toMatch(/^ChIJ[\w-]+$/);
      }
    });

    it("returns string names", () => {
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
