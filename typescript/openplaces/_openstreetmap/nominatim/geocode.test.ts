import { beforeAll, describe, expect, it } from "vitest";

import { geocode, type Area } from "./geocode";

describe("geocode", () => {
  describe("query: budapest", () => {
    let area: Area;

    beforeAll(async () => {
      area = await geocode("budapest");
    }, 5000);

    it("returns a center near the expected coordinates", () => {
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

  describe("query: no such place", () => {
    it("throws a descriptive error when no result exists", async () => {
      await expect(geocode("no such place")).rejects.toThrow(
        /nominatim returned no result for "no such place"/,
      );
    }, 5000);
  });
});
