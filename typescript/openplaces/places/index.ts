import { type OpenPlaces } from "..";

import { search } from "./search";

export class Places {
  constructor(protected client: OpenPlaces) {}
}

Places.prototype.search = search;
