import { beforeAll, describe, expect, it } from "vitest";

import { geocode, type Area } from "./geocode";
import { contains } from "./polygon";

describe("geocode", () => {
  describe("query: budapest", () => {
    let area: Area;

    beforeAll(async () => {
      area = await geocode("budapest");
    }, 5000);

    it("returns a center near the expected geographic point", () => {
      expect(area.center.latitude).toBeCloseTo(47.5, 0);
      expect(area.center.longitude).toBeCloseTo(19.0, 0);
    });

    it("produces a non-degenerate bounding box envelope", () => {
      expect(area.bounds.south).toBeLessThan(area.bounds.north);
      expect(area.bounds.west).toBeLessThan(area.bounds.east);
    });

    it("places the center strictly inside the bounding box", () => {
      expect(area.center.latitude).toBeGreaterThan(area.bounds.south);
      expect(area.center.latitude).toBeLessThan(area.bounds.north);
      expect(area.center.longitude).toBeGreaterThan(area.bounds.west);
      expect(area.center.longitude).toBeLessThan(area.bounds.east);
    });
  });

  describe("query: hungary", () => {
    let area: Area;

    beforeAll(async () => {
      area = await geocode("hungary");
    }, 5000);

    it("returns an area polygon for a country-level query", () => {
      expect(area.polygons).toBeDefined();
    });

    it("keeps budapest inside the returned country polygon", () => {
      expect(contains(area.polygons!, 47.5, 19.04)).toBe(true);
    });

    it("excludes vienna from the returned country polygon", () => {
      expect(contains(area.polygons!, 48.21, 16.37)).toBe(false);
    });
  });

  describe("query: no such place", () => {
    it("throws a descriptive error when no result exists", async () => {
      await expect(geocode("no such place")).rejects.toThrow(
        /nominatim returned no result for "no such place"/,
      );
    }, 5000);
  });
});
