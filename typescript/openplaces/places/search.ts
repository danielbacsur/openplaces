import { type Places } from ".";
import { type OpenPlaces } from "..";

declare module "." {
  interface Places {
    search(
      query: string,
      options?: OpenPlaces.Places.Search.Options,
    ): Promise<OpenPlaces.Places.Search.Result[]>;
  }
}

export async function search(
  this: Places,
  query: string,
  options: OpenPlaces.Places.Search.Options = {},
): Promise<OpenPlaces.Places.Search.Result[]> {
  const places: OpenPlaces.Places.Search.Result[] = [];
  for await (const p of this.stream(query, options)) places.push(p);
  return places;
}

declare module ".." {
  namespace OpenPlaces.Places.Search {
    type Result = OpenPlaces.Places.Stream.Result;
    type Options = OpenPlaces.Places.Stream.Options;
  }
}
