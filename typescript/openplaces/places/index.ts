import { type OpenPlaces } from "..";

import { search } from "./search";
import { stream } from "./stream";

export class Places {
  constructor(protected client: OpenPlaces) {}
}

Places.prototype.search = search;
Places.prototype.stream = stream;
