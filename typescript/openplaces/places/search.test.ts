import { beforeAll, describe, expect, it } from "vitest";

import { OpenPlaces } from "..";

const openplaces = new OpenPlaces();

describe("places.search", () => {
  describe("eiffel tower", () => {
    let result: OpenPlaces.Places.Search.Result;

    beforeAll(async () => {
      [result] = await openplaces.places.search("eiffel tower");
    });

    it("url", () => {
      expect(result.url).toContain("/maps/place/Eiffel+Tower/");
      expect(result.url).toContain("0x47e66e2964e34e2d:0x8ddca9ee380ef7e0");
    });

    it("name", () => {
      expect(result.name).toBe("Eiffel Tower");
    });

    it("location", () => {
      expect(result.location).toBe("Av. Gustave Eiffel, 75007 Paris, France");
    });

    it("website", () => {
      expect(result.website).toBe("https://www.toureiffel.paris/fr");
    });
  });
});
