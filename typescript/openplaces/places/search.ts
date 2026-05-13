import { type Places } from ".";
import { type OpenPlaces } from "..";

import { Place } from "../_google/maps/place";

declare module "." {
  interface Places {
    search(
      query: string,
      options?: OpenPlaces.Places.Search.Options,
    ): Promise<Place[]>;
  }
}

export async function search(
  this: Places,
  query: string,
  options: OpenPlaces.Places.Search.Options = {},
): Promise<Place[]> {
  const places: Place[] = [];
  for await (const p of this.stream(query, options)) places.push(p);
  return places;
}

declare module ".." {
  namespace OpenPlaces.Places.Search {
    type Options = OpenPlaces.Places.Stream.Options;
  }
}
