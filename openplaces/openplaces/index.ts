import { Places } from "./places";
export { Place } from "./place";

export class OpenPlaces {
  static Places = Places;
  places = new Places(this);
}
