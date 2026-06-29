import { EventEmitter } from "node:events";

import { Place } from "./place";
import { Places } from "./places";

export class OpenPlaces extends EventEmitter<OpenPlaces.Events> {
  static readonly Places = Places;
  readonly places = new Places(this);
}

export namespace OpenPlaces {
  export type Events = {
    query: [query: string];
    place: [place: Place];
  };
}

export { Place } from "./place";
