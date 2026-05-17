import { type OpenPlaces, Place } from "openplaces";

import { type Places } from ".";

export async function search(
  this: Places,
  query: string,
  options: OpenPlaces.Places.Search.Options = {},
): Promise<Place[]> {
  options.limit = options.limit ?? 100;

  const places: Place[] = [];
  for await (const p of this.stream(query, options)) places.push(p);
  return places;
}

declare module "openplaces" {
  namespace OpenPlaces.Places.Search {
    type Options = OpenPlaces.Places.Stream.Options;
  }
}
