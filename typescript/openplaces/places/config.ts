import { FIELD_OF_VIEW } from "../_google/maps/config";

export const EARTH_RADIUS = 6_371_010;

export const EARTH_CIRCUMFERENCE = 2 * Math.PI * EARTH_RADIUS;

export const HALF_FIELD_OF_VIEW_TANGENT = Math.tan(
  ((FIELD_OF_VIEW / 2) * Math.PI) / 180,
);
