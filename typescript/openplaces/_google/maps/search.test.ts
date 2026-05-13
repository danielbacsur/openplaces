import { beforeAll, describe, expect, it } from "vitest";

import { Place } from "./place";
import { search } from "./search";

const BUDAPEST_VIEWPORT = {
  latitude: 47.4764513,
  longitude: 19.0683452,
  altitude: 10786.763861126317,
};

const PARIS_VIEWPORT = {
  latitude: 48.8566,
  longitude: 2.3522,
  altitude: 10786.763861126317,
};

const NEW_YORK_VIEWPORT = {
  latitude: 40.7128,
  longitude: -74.006,
  altitude: 10786.763861126317,
};

describe("search", () => {
  describe("unique landmark with no viewport", () => {
    let results: Place[];

    beforeAll(async () => {
      results = await search({ query: "eiffel tower" });
    });

    it("returns exactly one place", () => {
      expect(results).toHaveLength(1);
    });

    it("returns a name matching the query", () => {
      expect(results[0].name).toMatch(/eiffel tower/i);
    });

    it("returns the latitude of the eiffel tower", () => {
      expect(results[0].latitude).toBeCloseTo(48.858, 2);
    });

    it("returns the longitude of the eiffel tower", () => {
      expect(results[0].longitude).toBeCloseTo(2.294, 2);
    });

    it("returns a ChIJ-prefixed id", () => {
      expect(results[0].id).toMatch(/^ChIJ[\w-]+$/);
    });

    it("returns a website domain", () => {
      expect(results[0].website).toMatch(/toureiffel\.paris/);
    });
  });

  describe("area search around budapest", () => {
    let results: Place[];

    beforeAll(async () => {
      results = await search({
        query: "restaurants",
        viewport: BUDAPEST_VIEWPORT,
      });
    });

    it("returns the full page of results", () => {
      expect(results).toHaveLength(20);
    });

    it("returns ChIJ-prefixed ids for every place", () => {
      for (const place of results) {
        expect(place.id).toMatch(/^ChIJ[\w-]+$/);
      }
    });

    it("returns a non-empty string name for every place", () => {
      for (const place of results) {
        expect(typeof place.name).toBe("string");
        expect(place.name.length).toBeGreaterThan(0);
      }
    });

    it("returns finite numeric coordinates for every place", () => {
      for (const place of results) {
        expect(Number.isFinite(place.latitude)).toBe(true);
        expect(Number.isFinite(place.longitude)).toBe(true);
      }
    });

    it("returns latitudes near the viewport center", () => {
      for (const place of results) {
        expect(place.latitude).toBeCloseTo(BUDAPEST_VIEWPORT.latitude, 0);
      }
    });

    it("returns longitudes near the viewport center", () => {
      for (const place of results) {
        expect(place.longitude).toBeCloseTo(BUDAPEST_VIEWPORT.longitude, 0);
      }
    });

    it("returns unique ids on a single page", () => {
      const ids = new Set(results.map((p) => p.id));
      expect(ids.size).toBe(results.length);
    });

    it("populates a phone number for at least one place", () => {
      expect(results.some((p) => p.phone !== undefined)).toBe(true);
    });

    it("populates a website for at least one place", () => {
      expect(results.some((p) => p.website !== undefined)).toBe(true);
    });

    it("returns string-typed phone numbers when populated", () => {
      for (const place of results) {
        if (place.phone !== undefined) {
          expect(typeof place.phone).toBe("string");
          expect(place.phone.length).toBeGreaterThan(0);
        }
      }
    });
  });

  describe("pagination via offset", () => {
    let page1: Place[];
    let page2: Place[];

    beforeAll(async () => {
      page1 = await search({
        query: "restaurants",
        viewport: BUDAPEST_VIEWPORT,
      });
      page2 = await search({
        query: "restaurants",
        viewport: BUDAPEST_VIEWPORT,
        offset: 20,
      });
    });

    it("returns places on page 1", () => {
      expect(page1.length).toBeGreaterThan(0);
    });

    it("returns places on page 2", () => {
      expect(page2.length).toBeGreaterThan(0);
    });

    it("returns disjoint id sets across pages", () => {
      const ids1 = new Set(page1.map((p) => p.id));
      const overlap = page2.filter((p) => ids1.has(p.id));
      expect(overlap).toHaveLength(0);
    });
  });

  describe("viewport biases the result location", () => {
    let parisResults: Place[];
    let newYorkResults: Place[];

    beforeAll(async () => {
      parisResults = await search({
        query: "coffee",
        viewport: PARIS_VIEWPORT,
      });
      newYorkResults = await search({
        query: "coffee",
        viewport: NEW_YORK_VIEWPORT,
      });
    });

    it("returns paris-area latitudes for the paris viewport", () => {
      for (const place of parisResults) {
        expect(place.latitude).toBeCloseTo(PARIS_VIEWPORT.latitude, 0);
      }
    });

    it("returns paris-area longitudes for the paris viewport", () => {
      for (const place of parisResults) {
        expect(place.longitude).toBeCloseTo(PARIS_VIEWPORT.longitude, 0);
      }
    });

    it("returns new-york-area latitudes for the new york viewport", () => {
      for (const place of newYorkResults) {
        expect(place.latitude).toBeCloseTo(NEW_YORK_VIEWPORT.latitude, 0);
      }
    });

    it("returns new-york-area longitudes for the new york viewport", () => {
      for (const place of newYorkResults) {
        expect(place.longitude).toBeCloseTo(NEW_YORK_VIEWPORT.longitude, 0);
      }
    });

    it("returns disjoint id sets across distant viewports", () => {
      const parisIds = new Set(parisResults.map((p) => p.id));
      const overlap = newYorkResults.filter((p) => parisIds.has(p.id));
      expect(overlap).toHaveLength(0);
    });
  });

  describe("nonsense query", () => {
    let results: Place[];

    beforeAll(async () => {
      results = await search({ query: "asdfqwerlkjhpoiu98765zxcvbnm" });
    });

    it("returns no places", () => {
      expect(results).toHaveLength(0);
    });
  });
});
