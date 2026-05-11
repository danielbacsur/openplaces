import { Places } from "./places";

export class OpenPlaces {
  static Places = Places;
  places = new Places(this);
}
