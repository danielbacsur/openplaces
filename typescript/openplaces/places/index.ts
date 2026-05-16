import { type OpenPlaces } from "..";
import { type Place } from "../_google/maps/place";

import { search } from "./search";
import { stream } from "./stream";

export class Places {
  constructor(protected client: OpenPlaces) {}

  declare search: (
    query: string,
    options?: OpenPlaces.Places.Search.Options,
  ) => Promise<Place[]>;

  declare stream: (
    query: string,
    options?: OpenPlaces.Places.Stream.Options,
  ) => AsyncGenerator<Place>;
}

Places.prototype.search = search;
Places.prototype.stream = stream;
