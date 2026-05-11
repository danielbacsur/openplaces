import { Places } from "./places";

export class OpenPlaces {
  options: OpenPlaces.Options;

  constructor({ headless = true }: OpenPlaces.Options = {}) {
    this.options = { headless };
  }

  static Places = Places;
  public places = new Places(this);
}

declare module "." {
  namespace OpenPlaces {
    interface Options {
      headless?: boolean;
    }
  }
}
