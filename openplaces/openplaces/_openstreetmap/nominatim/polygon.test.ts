import { describe, expect, it } from "vitest";

import { contains, intersects, type MultiPolygon, type Ring } from "./polygon";

const ring = (
  west: number,
  south: number,
  east: number,
  north: number,
): Ring => [
  [west, south],
  [east, south],
  [east, north],
  [west, north],
  [west, south],
];

const donut: MultiPolygon = [[ring(0, 0, 10, 10), ring(4, 4, 6, 6)]];
const islands: MultiPolygon = [[ring(0, 0, 2, 2)], [ring(10, 10, 12, 12)]];
const slab: MultiPolygon = [[ring(0, 0, 10, 1)]];

describe("contains", () => {
  it("finds a point lying strictly inside the outer ring", () => {
    expect(contains(donut, 2, 2)).toBe(true);
  });

  it("excludes a point that falls inside the inner hole", () => {
    expect(contains(donut, 5, 5)).toBe(false);
  });

  it("excludes a point that lies outside of every ring", () => {
    expect(contains(donut, 5, 11)).toBe(false);
  });

  it("finds a point on each island of a multipolygon area", () => {
    expect(contains(islands, 1, 1)).toBe(true);
    expect(contains(islands, 11, 11)).toBe(true);
    expect(contains(islands, 5, 5)).toBe(false);
  });
});

describe("intersects", () => {
  it("accepts a cell that sits entirely inside the polygon", () => {
    expect(intersects(donut, { south: 1, north: 3, west: 1, east: 3 })).toBe(
      true,
    );
  });

  it("accepts a cell that swallows the polygon entirely", () => {
    expect(
      intersects(islands, { south: -1, north: 3, west: -1, east: 3 }),
    ).toBe(true);
  });

  it("accepts a cell crossed only by the polygon's edges", () => {
    expect(intersects(slab, { south: -2, north: 3, west: 4, east: 6 })).toBe(
      true,
    );
  });

  it("rejects a cell that sits entirely inside the hole", () => {
    expect(
      intersects(donut, { south: 4.5, north: 5.5, west: 4.5, east: 5.5 }),
    ).toBe(false);
  });

  it("rejects a cell completely disjoint from the polygon", () => {
    expect(
      intersects(donut, { south: 20, north: 22, west: 20, east: 22 }),
    ).toBe(false);
  });
});
