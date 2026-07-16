export type Coordinate = [longitude: number, latitude: number];

export type Ring = Coordinate[];

export type Polygon = Ring[];

export type MultiPolygon = Polygon[];

export type Cell = {
  south: number;
  north: number;
  west: number;
  east: number;
};

export function contains(
  polygons: MultiPolygon,
  latitude: number,
  longitude: number,
) {
  let inside = false;

  for (const polygon of polygons) {
    for (const ring of polygon) {
      for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        const [ax, ay] = ring[j];
        const [bx, by] = ring[i];

        if (
          ay > latitude !== by > latitude &&
          longitude < ((bx - ax) * (latitude - ay)) / (by - ay) + ax
        ) {
          inside = !inside;
        }
      }
    }
  }

  return inside;
}

export function intersects(polygons: MultiPolygon, cell: Cell): boolean {
  if (contains(polygons, cell.south, cell.west)) return true;

  function crosses(
    [ax, ay]: Coordinate,
    [bx, by]: Coordinate,
  ): boolean {
    let enter = 0;
    let exit = 1;

    for (const [p, q] of [
      [ax - bx, ax - cell.west],
      [bx - ax, cell.east - ax],
      [ay - by, ay - cell.south],
      [by - ay, cell.north - ay],
    ]) {
      if (p === 0) {
        if (q < 0) return false;
      } else if (p < 0) {
        enter = Math.max(enter, q / p);
      } else {
        exit = Math.min(exit, q / p);
      }
    }

    return enter <= exit;
  }

  for (const polygon of polygons) {
    for (const ring of polygon) {
      for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        if (crosses(ring[j], ring[i])) return true;
      }
    }
  }

  return false;
}
