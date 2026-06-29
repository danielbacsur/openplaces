import { EventEmitter } from "node:events";

import { Place } from "./place";
import { Places } from "./places";

export class OpenPlaces extends EventEmitter<OpenPlaces.Events> {
  static readonly Places = Places;
  readonly places = new Places(this);

  constructor({ ...plugins }: OpenPlaces.Options = {}) {
    super();

    for (const plugin of Object.values(plugins)) {
      if (typeof plugin === "function") plugin(this);
    }
  }
}

export namespace OpenPlaces {
  export interface Options {}

  export type Plugin = (client: OpenPlaces) => void;

  export type Events = {
    query: [query: string];
    place: [place: Place];
  };
}

export { Place } from "./place";
