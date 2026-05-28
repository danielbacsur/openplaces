import { z } from "../../_openplaces/zod";

export const Coordinates = z.positional([
  /* 0 */ z.unused(),
  /* 1 */ z.unused(),
  /* 2 */ z.mapped("latitude", z.number()), /* 47.4979937 */
  /* 3 */ z.mapped("longitude", z.number()), /* 19.0403594 */
]);

export const Website = z.positional([
  /* 0 */ z.mapped("url", z.string()), /* "https://www.gundel.hu/" */
  /* 1 */ z.mapped("domain", z.string().nullish()), /* "gundel.hu" */
  /* 2 */ z.unused(),
  /* 3 */ z.opaque(/* ved / tracking token */),
  /* 4 */ z.opaque(/* ved / click-tracking token */),
]);

export const PhoneLink = z.positional([
  /* 0 */ z.mapped("uri", z.string()), /* "tel:06306032480" */
  /* 1 */ z.unused(),
  /* 2 */ z.unused(),
  /* 3 */ z.opaque(/* action / click-tracking id */),
]);

export const PhoneVariant = z.positional([
  /* 0 */ z.mapped("formatted", z.string()), /* "06 30 603 2480" */
  /* 1 */ z.mapped("type", z.number().nullish()), /* 1 */
]);

export const PhoneEntry = z.positional([
  /* 0 */ z.mapped("number", z.string()), /* "06 30 603 2480" */
  /* 1 */ z.mapped("variants", z.array(PhoneVariant.nullish()).nullish()),
  /* 2 */ z.unused(),
  /* 3 */ z.mapped("normalized", z.string().nullish()), /* "06306032480" */
  /* 4 */ z.unused(),
  /* 5 */ z.mapped("link", PhoneLink.nullish()),
]);

export const RatingsPriceBucketLabel = z.positional([
  /* 0 */ z.mapped("id", z.string().nullish()), /* "E:HUF_12000_TO_14000" */
  /* 1 */ z.mapped("short", z.string().nullish()), /* "12 000–14 000 Ft" */
  /* 2 */ z.mapped("long", z.string().nullish()), /* "12 000 Ft to 14 000 Ft" */
]);

export const RatingsPriceBucketStats = z.positional([
  /* 0 */ z.mapped("count", z.number().nullish()), /* 110 */
  /* 1 */ z.mapped("fraction", z.number().nullish()), /* 0.061 */
  /* 2 */ z.mapped("selected", z.number().nullish()), /* 0 */
]);

export const RatingsPriceBucket = z.positional([
  /* 0 */ z.mapped("label", RatingsPriceBucketLabel.nullish()),
  /* 1 */ z.mapped("statistics", RatingsPriceBucketStats.nullish()),
  /* 2 */ z.unused(),
  /* 3 */ z.unused(),
  /* 4 */ z.opaque(/* feature/ui token */),
]);

export const RatingsPriceRange = z.positional([
  /* 0 */ z.mapped("buckets", z.array(RatingsPriceBucket.nullish()).nullish()),
  /* 1 */ z.mapped("short", z.string().nullish()), /* "20 000 Ft+" */
  /* 2 */ z.mapped("long", z.string().nullish()), /* "20 000 Ft or above" */
]);

export const RatingsReviewsLink = z.positional([
  /* 0 */ z.mapped("url", z.string().nullish()),
  /* 1 */ z.mapped("text", z.string().nullish()), /* "5 203 reviews" */
  /* 2 */ z.unused(),
  /* 3 */ z.opaque(/* feature/ui token */),
]);

export const Ratings = z.positional([
  /* 0 */ z.unused(),
  /* 1 */ z.unused(),
  /* 2 */ z.mapped("priceLevel", z.string().nullish()), /* "20 000 Ft+" */
  /* 3 */ z.mapped("reviewsLink", RatingsReviewsLink.nullish()),
  /* 4 */ z.mapped("priceSymbol", z.string().nullish()), /* "$$" */
  /* 5 */ z.unused(),
  /* 6 */ z.unused(),
  /* 7 */ z.mapped("rating", z.number().nullish()), /* 4.7 */
  /* 8 */ z.mapped("reviewCount", z.number().nullish()), /* 5203 */
  /* 9 */ z.mapped("priceRange", RatingsPriceRange.nullish()),
]);

export const PhotoSize = z.positional([
  /* 0 */ z.mapped("width", z.number().nullish()), /* 4032 */
  /* 1 */ z.mapped("height", z.number().nullish()), /* 3024 */
]);

export const PhotoImage = z.positional([
  /* 0 */ z.mapped("url", z.string().nullish()), /* "https://lh3.googleusercontent.com/gps-cs-s/...=w122-h92-k-no" */
  /* 1 */ z.mapped("attribution", z.string().nullish()), /* "9653+ Photos" */
  /* 2 */ z.mapped("native", PhotoSize.nullish()),
  /* 3 */ z.mapped("thumbnail", PhotoSize.nullish()),
]);

export const PhotoVideoVariant = z.positional([
  /* 0 */ z.mapped("itag", z.number().nullish()), /* 18 */
  /* 1 */ z.mapped("width", z.number().nullish()), /* 360 */
  /* 2 */ z.mapped("height", z.number().nullish()), /* 640 */
  /* 3 */ z.mapped("url", z.string().nullish()), /* "https://lh3.googleusercontent.com/gps-cs-s/...=m18" */
  /* 4 */ z.mapped("streamType", z.number().nullish()), /* 1 */
]);

export const PhotoVideo = z.positional([
  /* 0 */ z.mapped("durationMs", z.number().nullish()), /* 29999 */
  /* 1 */ z.mapped("variants", z.array(PhotoVideoVariant.nullish()).nullish()),
]);

export const PhotoCamera = z.positional([
  /* 0 */ z.mapped("position", z.array(z.number().nullish()).nullish()), /* [3, 19.07, 47.51] */
  /* 1 */ z.mapped("orientation", z.array(z.number().nullish()).nullish()), /* [0, 90] */
  /* 2 */ z.mapped("size", PhotoSize.nullish()),
  /* 3 */ z.mapped("quality", z.number().nullish()), /* 75 */
]);

export const Photo = z.positional([
  /* 0 */ z.mapped("id", z.string().nullish()), /* "CIHM0ogKEICAgID5vvCh7wE" */
  /* 1 */ z.mapped("mediaSource", z.number().nullish()), /* 10 */
  /* 2 */ z.mapped("mediaFormat", z.number().nullish()), /* 12 */
  /* 3 */ z.mapped("caption", z.string().nullish()), /* "" */
  /* 4 */ z.unused(),
  /* 5 */ z.unused(),
  /* 6 */ z.mapped("image", PhotoImage.nullish()),
  /* 7 */ z.unused(),
  /* 8 */ z.mapped("camera", PhotoCamera.nullish()),
  /* 9 */ z.opaque(/* session token */),
  /* 10 */ z.opaque(/* ved / request token */),
]);

export const Photos = z.positional([
  /* 0 */ z.mapped("photos", z.array(Photo.nullish()).nullish()),
]);

export const LegacyPhoto = z.positional([
  /* 0 */ z.mapped("id", z.string().nullish()), /* "CIHM0ogKEICAgID5vvCh7wE" */
  /* 1 */ z.mapped("mediaSource", z.number().nullish()), /* 10 */
  /* 2 */ z.mapped("mediaFormat", z.number().nullish()), /* 12 */
  /* 3 */ z.mapped("caption", z.string().nullish()), /* "" */
  /* 4 */ z.unused(),
  /* 5 */ z.unused(),
  /* 6 */ z.mapped("image", PhotoImage.nullish()),
  /* 7 */ z.unused(),
  /* 8 */ z.mapped("camera", PhotoCamera.nullish()),
]);

export const LegacyPhotos = z.positional([
  /* 0 */ z.mapped("photos", z.array(LegacyPhoto.nullish()).nullish()),
  /* 1 */ z.mapped("totalCount", z.number().nullish()), /* 9653 */
]);

export const HoursPeriodTime = z.positional([
  /* 0 */ z.mapped("open", z.array(z.number().nullish()).nullish()), /* [11, 30] */
  /* 1 */ z.mapped("close", z.array(z.number().nullish()).nullish()), /* [22] */
]);

export const HoursPeriod = z.positional([
  /* 0 */ z.mapped("label", z.string().nullish()), /* "11:30 am–10 pm" */
  /* 1 */ z.mapped("time", HoursPeriodTime.nullish()),
]);

export const HoursDate = z.positional([
  /* 0 */ z.mapped("year", z.number().nullish()), /* 2026 */
  /* 1 */ z.mapped("month", z.number().nullish()), /* 6 */
  /* 2 */ z.mapped("day", z.number().nullish()), /* 28 */
]);

export const HoursDay = z.positional([
  /* 0 */ z.mapped("weekday", z.string().nullish()), /* "Sunday" */
  /* 1 */ z.mapped("weekdayNumber", z.number().nullish()), /* 7 */
  /* 2 */ z.mapped("date", HoursDate.nullish()),
  /* 3 */ z.mapped("periods", z.array(HoursPeriod.nullish()).nullish()),
  /* 4 */ z.opaque(/* flag */),
  /* 5 */ z.mapped("openFlag", z.number().nullish()), /* 1 */
  /* 6 */ z.opaque(/* holiday note */),
]);

export const HoursColorStyle = z.positional([
  /* 0 */ z.unused(),
  /* 1 */ z.mapped("colors", z.array(z.number().nullish()).nullish()), /* [4279862841] */
]);

export const HoursColorRun = z.positional([
  /* 0 */ z.mapped("start", z.number().nullish()), /* 0 */
  /* 1 */ z.mapped("length", z.number().nullish()), /* 4 */
  /* 2 */ z.mapped("style", HoursColorStyle.nullish()),
]);

export const HoursStatus = z.positional([
  /* 0 */ z.mapped("text", z.string().nullish()), /* "Open · Closes 10 pm" */
  /* 1 */ z.mapped("colorRuns", z.array(HoursColorRun.nullish()).nullish()),
]);

export const HoursCurrent = z.positional([
  /* 0 */ z.mapped("day", HoursDay.nullish()),
  /* 1 */ z.mapped("activePeriodIndex", z.number().nullish()), /* 0 */
  /* 2 */ z.mapped("openStateCode", z.number().nullish()), /* 1 */
  /* 3 */ z.opaque(/* flag */),
  /* 4 */ z.mapped("status", HoursStatus.nullish()),
  /* 5 */ z.mapped("statusAlt", HoursStatus.nullish()),
  /* 6 */ z.unused(),
  /* 7 */ z.mapped("closingHour", z.array(z.number().nullish()).nullish()), /* [21] */
  /* 8 */ z.mapped("shortStatus", HoursStatus.nullish()),
]);

export const OpeningHours = z.positional([
  /* 0 */ z.mapped("weekly", z.array(HoursDay.nullish()).nullish()),
  /* 1 */ z.mapped("current", HoursCurrent.nullish()),
  /* 2 */ z.mapped("todayWeekdayNumber", z.number().nullish()), /* 7 */
  /* 3 */ z.unused(),
  /* 4 */ z.unused(),
  /* 5 */ z.unused(),
  /* 6 */ z.opaque(/* flag */),
]);

export const DescriptionLine = z.positional([
  /* 0 */ z.unused(),
  /* 1 */ z.mapped("text", z.string().nullish()), /* "Chic hangout for global eats & cocktails" */
]);

export const Description = z.positional([
  /* 0 */ z.mapped("summary", DescriptionLine.nullish()),
  /* 1 */ z.mapped("blurb", DescriptionLine.nullish()),
  /* 2 */ z.mapped("extended", z.unknown().nullish()),
  /* 3 */ z.opaque(/* report url */),
  /* 4 */ z.opaque(/* learn-more url */),
]);

export const AddressComponents = z.positional([
  /* 0 */ z.mapped("district", z.string().nullish()), /* "District XIV." */
  /* 1 */ z.mapped("street", z.string().nullish()), /* "Gundel Károly út 4" */
  /* 2 */ z.mapped("streetDisplay", z.string().nullish()), /* "Gundel Károly út 4" */
  /* 3 */ z.mapped("city", z.string().nullish()), /* "Budapest" */
]);

export const StructuredAddressPart = z.positional([
  /* 0 */ z.mapped("type", z.number().nullish()), /* 7 */
  /* 1 */ z.mapped("values", z.array(z.array(z.string().nullish()).nullish()).nullish()), /* [["Budapest"], ["Gundel Károly út 4"]] */
]);

export const StructuredAddressFlat = z.positional([
  /* 0 */ z.mapped("district", z.string().nullish()), /* "District XIV." */
  /* 1 */ z.mapped("street", z.string().nullish()), /* "Gundel Károly út 4" */
  /* 2 */ z.mapped("streetDisplay", z.string().nullish()), /* "Gundel Károly út 4" */
  /* 3 */ z.mapped("city", z.string().nullish()), /* "Budapest" */
  /* 4 */ z.mapped("postalCode", z.string().nullish()), /* "1146" */
  /* 5 */ z.mapped("region", z.string().nullish()), /* "Tokyo" */
  /* 6 */ z.mapped("country", z.string().nullish()), /* "HU" */
]);

export const StructuredAddress = z.positional([
  /* 0 */ z.mapped("parts", z.array(StructuredAddressPart.nullish()).nullish()),
  /* 1 */ z.mapped("flat", StructuredAddressFlat.nullish()),
]);

export const PlaceNode = z.positional([
  /* 0 */ z.unused(),
  /* 1 */ z.unused(),
  /* 2 */ z.mapped("addressLines", z.array(z.string().nullish()).nullish()), /* ["Budapest", "Gundel Károly út 4", "1146"] */
  /* 3 */ z.unused(),
  /* 4 */ z.mapped("ratings", Ratings.nullish()),
  /* 5 */ z.unused(),
  /* 6 */ z.unused(),
  /* 7 */ z.mapped("website", Website.nullish()),
  /* 8 */ z.unused(),
  /* 9 */ z.mapped("coordinates", Coordinates.nullish()),
  /* 10 */ z.unused(),
  /* 11 */ z.mapped("name", z.string()), /* "Gundel Cafe Patisserie Restaurant" */
  /* 12 */ z.unused(),
  /* 13 */ z.mapped("categories", z.array(z.string().nullish()).nullish()), /* ["Hungarian restaurant"] */
  /* 14 */ z.mapped("district", z.string().nullish()), /* "District XIV." */
  /* 15 */ z.unused(),
  /* 16 */ z.unused(),
  /* 17 */ z.unused(),
  /* 18 */ z.unused(),
  /* 19 */ z.unused(),
  /* 20 */ z.unused(),
  /* 21 */ z.unused(),
  /* 22 */ z.unused(),
  /* 23 */ z.unused(),
  /* 24 */ z.unused(),
  /* 25 */ z.unused(),
  /* 26 */ z.unused(),
  /* 27 */ z.unused(),
  /* 28 */ z.unused(),
  /* 29 */ z.unused(),
  /* 30 */ z.mapped("timezone", z.string().nullish()), /* "Europe/Budapest" */
  /* 31 */ z.unused(),
  /* 32 */ z.mapped("description", Description.nullish()),
  /* 33 */ z.unused(),
  /* 34 */ z.unused(),
  /* 35 */ z.unused(),
  /* 36 */ z.unused(),
  /* 37 */ z.mapped("legacyPhotos", LegacyPhotos.nullish()),
  /* 38 */ z.unused(),
  /* 39 */ z.mapped("address", z.string().nullish()), /* "Budapest, Gundel Károly út 4, 1146" */
  /* 40 */ z.unused(),
  /* 41 */ z.unused(),
  /* 42 */ z.unused(),
  /* 43 */ z.unused(),
  /* 44 */ z.unused(),
  /* 45 */ z.unused(),
  /* 46 */ z.unused(),
  /* 47 */ z.unused(),
  /* 48 */ z.unused(),
  /* 49 */ z.unused(),
  /* 50 */ z.unused(),
  /* 51 */ z.unused(),
  /* 52 */ z.unused(),
  /* 53 */ z.unused(),
  /* 54 */ z.unused(),
  /* 55 */ z.unused(),
  /* 56 */ z.unused(),
  /* 57 */ z.unused(),
  /* 58 */ z.unused(),
  /* 59 */ z.unused(),
  /* 60 */ z.unused(),
  /* 61 */ z.unused(),
  /* 62 */ z.unused(),
  /* 63 */ z.unused(),
  /* 64 */ z.unused(),
  /* 65 */ z.unused(),
  /* 66 */ z.unused(),
  /* 67 */ z.unused(),
  /* 68 */ z.unused(),
  /* 69 */ z.unused(),
  /* 70 */ z.unused(),
  /* 71 */ z.unused(),
  /* 72 */ z.mapped("photos", Photos.nullish()),
  /* 73 */ z.unused(),
  /* 74 */ z.unused(),
  /* 75 */ z.unused(),
  /* 76 */ z.unused(),
  /* 77 */ z.unused(),
  /* 78 */ z.mapped("placeId", z.string().nullish()), /* "ChIJhzNeW4jbQUcRDpNeQSc81aA" */
  /* 79 */ z.unused(),
  /* 80 */ z.unused(),
  /* 81 */ z.unused(),
  /* 82 */ z.mapped("addressComponents", AddressComponents.nullish()),
  /* 83 */ z.unused(),
  /* 84 */ z.unused(),
  /* 85 */ z.unused(),
  /* 86 */ z.unused(),
  /* 87 */ z.unused(),
  /* 88 */ z.unused(),
  /* 89 */ z.unused(),
  /* 90 */ z.unused(),
  /* 91 */ z.unused(),
  /* 92 */ z.unused(),
  /* 93 */ z.unused(),
  /* 94 */ z.unused(),
  /* 95 */ z.unused(),
  /* 96 */ z.unused(),
  /* 97 */ z.unused(),
  /* 98 */ z.unused(),
  /* 99 */ z.unused(),
  /* 100 */ z.unused(),
  /* 101 */ z.unused(),
  /* 102 */ z.unused(),
  /* 103 */ z.unused(),
  /* 104 */ z.unused(),
  /* 105 */ z.unused(),
  /* 106 */ z.unused(),
  /* 107 */ z.unused(),
  /* 108 */ z.unused(),
  /* 109 */ z.unused(),
  /* 110 */ z.unused(),
  /* 111 */ z.unused(),
  /* 112 */ z.unused(),
  /* 113 */ z.unused(),
  /* 114 */ z.unused(),
  /* 115 */ z.unused(),
  /* 116 */ z.unused(),
  /* 117 */ z.unused(),
  /* 118 */ z.unused(),
  /* 119 */ z.unused(),
  /* 120 */ z.unused(),
  /* 121 */ z.unused(),
  /* 122 */ z.unused(),
  /* 123 */ z.unused(),
  /* 124 */ z.unused(),
  /* 125 */ z.unused(),
  /* 126 */ z.unused(),
  /* 127 */ z.unused(),
  /* 128 */ z.unused(),
  /* 129 */ z.unused(),
  /* 130 */ z.unused(),
  /* 131 */ z.unused(),
  /* 132 */ z.unused(),
  /* 133 */ z.unused(),
  /* 134 */ z.unused(),
  /* 135 */ z.unused(),
  /* 136 */ z.unused(),
  /* 137 */ z.unused(),
  /* 138 */ z.unused(),
  /* 139 */ z.unused(),
  /* 140 */ z.unused(),
  /* 141 */ z.unused(),
  /* 142 */ z.unused(),
  /* 143 */ z.unused(),
  /* 144 */ z.unused(),
  /* 145 */ z.unused(),
  /* 146 */ z.unused(),
  /* 147 */ z.unused(),
  /* 148 */ z.unused(),
  /* 149 */ z.unused(),
  /* 150 */ z.unused(),
  /* 151 */ z.unused(),
  /* 152 */ z.unused(),
  /* 153 */ z.unused(),
  /* 154 */ z.unused(),
  /* 155 */ z.unused(),
  /* 156 */ z.unused(),
  /* 157 */ z.unused(),
  /* 158 */ z.unused(),
  /* 159 */ z.unused(),
  /* 160 */ z.unused(),
  /* 161 */ z.unused(),
  /* 162 */ z.unused(),
  /* 163 */ z.unused(),
  /* 164 */ z.unused(),
  /* 165 */ z.unused(),
  /* 166 */ z.mapped("city", z.string().nullish()), /* "Budapest" */
  /* 167 */ z.unused(),
  /* 168 */ z.unused(),
  /* 169 */ z.unused(),
  /* 170 */ z.unused(),
  /* 171 */ z.unused(),
  /* 172 */ z.unused(),
  /* 173 */ z.unused(),
  /* 174 */ z.unused(),
  /* 175 */ z.unused(),
  /* 176 */ z.unused(),
  /* 177 */ z.unused(),
  /* 178 */ z.mapped("phones", z.array(PhoneEntry.nullish()).nullish()),
  /* 179 */ z.unused(),
  /* 180 */ z.unused(),
  /* 181 */ z.unused(),
  /* 182 */ z.unused(),
  /* 183 */ z.mapped("structuredAddress", StructuredAddress.nullish()),
  /* 184 */ z.unused(),
  /* 185 */ z.unused(),
  /* 186 */ z.unused(),
  /* 187 */ z.unused(),
  /* 188 */ z.unused(),
  /* 189 */ z.unused(),
  /* 190 */ z.unused(),
  /* 191 */ z.unused(),
  /* 192 */ z.unused(),
  /* 193 */ z.unused(),
  /* 194 */ z.unused(),
  /* 195 */ z.unused(),
  /* 196 */ z.unused(),
  /* 197 */ z.unused(),
  /* 198 */ z.unused(),
  /* 199 */ z.unused(),
  /* 200 */ z.unused(),
  /* 201 */ z.unused(),
  /* 202 */ z.unused(),
  /* 203 */ z.mapped("openingHours", OpeningHours.nullish()),
]);

export type PlaceNode = z.infer<typeof PlaceNode>;

export const ResultRow = z.positional([
  /* 0 */ z.unused(),
  /* 1 */ z.unused(),
  /* 2 */ z.unused(),
  /* 3 */ z.unused(),
  /* 4 */ z.unused(),
  /* 5 */ z.unused(),
  /* 6 */ z.unused(),
  /* 7 */ z.unused(),
  /* 8 */ z.unused(),
  /* 9 */ z.unused(),
  /* 10 */ z.unused(),
  /* 11 */ z.unused(),
  /* 12 */ z.unused(),
  /* 13 */ z.unused(),
  /* 14 */ z.mapped("place", PlaceNode.nullish()),
]);

export const ResultContainer = z.positional([
  /* 0 */ z.unused(),
  /* 1 */ z.mapped("rows", z.array(ResultRow.nullish().catch(null)).nullish()),
]);

export const Response = z.positional([
  /* 0 */ z.mapped("results", ResultContainer.nullish()),
]);

export type Response = z.infer<typeof Response>;
