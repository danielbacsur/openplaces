import { z } from "../../_openplaces/zod";

export const Coordinates = z.positional([
  /* 0 */ z.unused(),
  /* 1 */ z.unused(),
  /* 2 */ z.mapped("latitude", z.number()), /* 47.517446199999995 */
  /* 3 */ z.mapped("longitude", z.number()), /* 19.0772756 */
]);

export const BareCoordinate = z.positional([
  /* 0 */ z.unused(),
  /* 1 */ z.unused(),
  /* 2 */ z.mapped("latitude", z.number()), /* 47.4987342 */
  /* 3 */ z.mapped("longitude", z.number()), /* 19.039915399999998 */
]);

export const PinLocation = z.positional([
  /* 0 */ z.mapped("location", BareCoordinate),
]);

export const EntranceLocation = z.positional([
  /* 0 */ z.opaque(/* flag */), /* 1 */
  /* 1 */ z.mapped("location", BareCoordinate.nullish()),
]);

// RatingsPrice*: dark, null for anonymous sessions as of 2026-10 (last seen 2026-05)
export const RatingsPriceBucketLabel = z.positional([
  /* 0 */ z.mapped("id", z.string().nullish()), /* "E:HUF_12000_TO_14000" */
  /* 1 */ z.mapped("short", z.string().nullish()), /* "12 000–14 000 Ft" */
  /* 2 */ z.mapped("long", z.string().nullish()), /* "12 000 Ft to 14 000 Ft" */
]);

export const RatingsPriceBucketStats = z.positional([
  /* 0 */ z.mapped("count", z.number().nullish()), /* 110 */
  /* 1 */ z.mapped("fraction", z.number().nullish()), /* 0.06100942872989462 */
  /* 2 */ z.mapped("selected", z.number().nullish()), /* 0 */
]);

export const RatingsPriceBucket = z.positional([
  /* 0 */ z.mapped("label", RatingsPriceBucketLabel.nullish()),
  /* 1 */ z.mapped("statistics", RatingsPriceBucketStats.nullish()),
  /* 2 */ z.unused(),
  /* 3 */ z.unused(),
  /* 4 */ z.opaque(/* feature/ui token */), /* "0ahUKEwiXq_7Lt6qVAxUPPxAIHQwxCkAQhtMHCBgoAg" */
]);

export const RatingsPriceRange = z.positional([
  /* 0 */ z.mapped("buckets", z.array(RatingsPriceBucket.nullish()).nullish()),
  /* 1 */ z.mapped("short", z.string().nullish()), /* "20 000 Ft+" */
  /* 2 */ z.mapped("long", z.string().nullish()), /* "20 000 Ft or above" */
]);

export const RatingsReviewsLink = z.positional([
  /* 0 */ z.mapped("url", z.string().nullish()), /* "https://search.google.com/local/reviews?placeid=ChIJhzNeW4jbQUcRDpNeQSc81aA&q=Gundel&hl=en&gl=HU" */
  /* 1 */ z.mapped("text", z.string().nullish()), /* "5 203 reviews" */
  /* 2 */ z.unused(),
  /* 3 */ z.opaque(/* feature/ui token */), /* "0ahUKEwiXq_7Lt6qVAxUPPxAIHQwxCkAQ6W4IHSgH" */
]);

export const Ratings = z.positional([
  /* 0 */ z.unused(),
  /* 1 */ z.unused(),
  /* 2 */ z.mapped("priceLevel", z.string().nullish()), /* "20 000 Ft+" (dark: null for anonymous sessions as of 2026-10) */
  /* 3 */ z.mapped("reviewsLink", RatingsReviewsLink.nullish()),
  /* 4 */ z.mapped("priceSymbol", z.string().nullish()), /* "$$" (dark: null for anonymous sessions as of 2026-10) */
  /* 5 */ z.unused(),
  /* 6 */ z.unused(),
  /* 7 */ z.mapped("rating", z.number()), /* 4.7 */
  /* 8 */ z.mapped("reviewCount", z.number().nullish()), /* 5203 */
  /* 9 */ z.mapped("priceRange", RatingsPriceRange.nullish()), /* dark: null for anonymous sessions as of 2026-10 */
  /* 10 */ z.mapped("priceDescription", z.string().nullish()), /* "20 000 Ft or above" (dark: null for anonymous sessions as of 2026-10) */
  /* 11 */ z.unused(),
  /* 12 */ z.unused(),
  /* 13 */ z.unused(),
  /* 14 */ z.opaque(/* only ever 1; seen only on length-15 Ratings of some food/drink places, never on ads; meaning unknown */), /* 1 */
]);

export const Website = z.positional([
  /* 0 */ z.mapped("url", z.string()), /* "https://www.gundel.hu/" */
  /* 1 */ z.mapped("domain", z.string()), /* "gundel.hu" */
  /* 2 */ z.unused(),
  /* 3 */ z.opaque(/* ved / tracking token */), /* "0ahUKEwiakdiCyaqVAxX2U1UIHRtBHuoQ61gIHCgP" */
  /* 4 */ z.opaque(/* ved / click-tracking token */), /* ",AOvVaw3mcLy_sPtyCXDgWU5x3Vdh,,0ahUKEwiXq_7Lt6qVAxUPPxAIHQwxCkAQ61gIHigQ," */
]);

export const PhoneLink = z.positional([
  /* 0 */ z.mapped("uri", z.string()), /* "tel:06306032480" */
  /* 1 */ z.unused(),
  /* 2 */ z.unused(),
  /* 3 */ z.opaque(/* action / click-tracking id */), /* "0ahUKEwiXq_7Lt6qVAxUPPxAIHQwxCkAQ_doBCBQoDg" */
]);

export const PhoneVariant = z.positional([
  /* 0 */ z.mapped("formatted", z.string()), /* "06 30 603 2480" */
  /* 1 */ z.mapped("type", z.number()), /* 1 */
]);

export const PhoneEntry = z.positional([
  /* 0 */ z.mapped("number", z.string()), /* "06 30 603 2480" */
  /* 1 */ z.mapped("variants", z.array(PhoneVariant.nullish()).nullish()),
  /* 2 */ z.unused(),
  /* 3 */ z.mapped("normalized", z.string().nullish()), /* "06306032480" */
  /* 4 */ z.unused(),
  /* 5 */ z.mapped("link", PhoneLink.nullish()),
]);

// PlaceNode[181]: duplicate of identifiers.bundle[5..6]; null on unclaimed places
export const ListingIds = z.positional([
  /* 0 */ z.unused(),
  /* 1 */ z.unused(),
  /* 2 */ z.unused(),
  /* 3 */ z.unused(),
  /* 4 */ z.unused(),
  /* 5 */ z.mapped("listingId", z.string()), /* "8350095830035021410" */
  /* 6 */ z.mapped("ownerGaiaId", z.string().nullish()), /* "109965436827872873143" */
]);

export const Owner = z.positional([
  /* 0 */ z.unused(),
  /* 1 */ z.mapped("name", z.string()), /* "Gundel Cafe Patisserie Restaurant (Owner)" */
  /* 2 */ z.mapped("claimedGaiaId", z.string().nullish()), /* "109965436827872873143"; == [8]; almost always only on claimed listings */
  /* 3 */ z.unused(),
  /* 4 */ z.unused(),
  /* 5 */ z.unused(),
  /* 6 */ z.unused(),
  /* 7 */ z.unused(),
  /* 8 */ z.mapped("gaiaId", z.string()), /* "109965436827872873143" */
]);

export const RankingTypeDescriptor = z.positional([
  /* 0 */ z.mapped("typeCode", z.string().nullish()), /* "SearchResult.TYPE_RESTAURANT" */
  /* 1 */ z.mapped("country", z.string().nullish()), /* "HU" */
  /* 2 */ z.opaque(/* ranking signal */), /* 54 */
  /* 3 */ z.opaque(/* ranking signal */), /* 84 */
  /* 4 */ z.opaque(/* ranking signal */), /* 85 */
  /* 5 */ z.opaque(/* ranking signal */), /* 151 */
]);

export const Ranking = z.positional([
  /* 0 */ z.mapped("highlight", z.string().nullish()), /* "Chic hangout for global eats & cocktails" */
  /* 1 */ z.mapped("typeCode", z.string().nullish()), /* "SearchResult.TYPE_RESTAURANT" */
  /* 2 */ z.mapped("descriptor", RankingTypeDescriptor.nullish()),
  /* 3 */ z.mapped("name", z.string().nullish()), /* "Gundel Cafe Patisserie Restaurant" */
  /* 4 */ z.opaque(/* ranking signals */), /* [null, null, 269, 270, 1228, 583] */
]);

export const RelatedTypeEntry = z.positional([
  /* 0 */ z.mapped("type", z.string().nullish()), /* "hungarian_restaurant" */
  /* 1 */ z.mapped("label", z.string().nullish()), /* "Hungarian" */
  /* 2 */ z.mapped("weight", z.number().nullish()), /* 2 */
]);

export const AttributesShortLabel = z.positional([
  /* 0 */ z.mapped("value", z.number()), /* 1; 1 = has it, 0 = lacks it ([1] is then "No ..." / " Does not have ...") */
  /* 1 */ z.mapped("label", z.string()), /* "Outdoor seating" */
]);

export const AttributesLongLabel = z.positional([
  /* 0 */ z.mapped("value", z.number()), /* 1; same as shortLabels[0].value; array is just [0] when labels are blank */
  /* 1 */ z.mapped("short", z.string().nullish()), /* "Outdoor seating" */
  /* 2 */ z.mapped("canonical", z.string().nullish()), /* "Outdoor seating" */
  /* 3 */ z.mapped("sentence", z.string().nullish()), /* "Has outdoor seating" */
]);

export const AttributesVariantOption = z.positional([
  /* 0 */ z.mapped("id", z.string().nullish()), /* "/g/11fhrczfxy" */
  /* 1 */ z.unused(),
  /* 2 */ z.mapped("name", z.string().nullish()), /* "Very expensive" */
  /* 3 */ z.mapped("nameAlt", z.string().nullish()), /* "Very expensive" */
]);

export const AttributesVariantList = z.positional([
  /* 0 */ z.mapped("options", z.array(AttributesVariantOption.nullish()).nullish()), /* [["/g/11g7z0k821", null, "Non-motorised", "Non-motorised"]] */
  /* 1 */ z.unused(),
  /* 2 */ z.opaque(/* flags */), /* [1] */
]);

export const AttributesVariants = z.positional([
  /* 0 */ z.unused(),
  /* 1 */ z.mapped("lists", z.array(AttributesVariantList.nullish()).nullish()),
]);

export const AttributesAvailability = z.positional([
  /* 0 */ z.mapped("kind", z.number()), /* 1; value type: 1 = yes/no (value in shortLabels[0].value), 3 = option list in [4]; NOT has/lacks */
  /* 1 */ z.mapped("shortLabels", z.array(AttributesShortLabel.nullish()).nullish()),
  /* 2 */ z.mapped("longLabel", AttributesLongLabel.nullish()),
  /* 3 */ z.unused(),
  /* 4 */ z.mapped("variants", AttributesVariants.nullish()), /* [null, [[[["/g/11g9h0yyz0", null, "American Express", "American Express"], ["/g/11g9h0tjcp", null, "Mastercard", "Mastercard"], ["/g/11fxy6tx8n", null, "VISA", "VISA"]], null, [1]]]] */
]);

export const AttributesAttribute = z.positional([
  /* 0 */ z.mapped("id", z.string()), /* "/geo/type/establishment_poi/has_seating_outdoors" */
  /* 1 */ z.mapped("label", z.string()), /* "Outdoor seating" */
  /* 2 */ z.mapped("availability", AttributesAvailability),
  /* 3 */ z.mapped("negated", z.number().nullish()), /* 1; 1 iff the value is 0 (lacks); null otherwise */
  /* 4 */ z.mapped("iconGlyph", z.array(z.number().nullish())), /* [4]; [2] = cross (lacks); [4] accessibility check; [1] generic check / offered (also kind-3 lists); [51]/[31]/[24] group-specific */
  /* 5 */ z.opaque(/* constant 0 */), /* 0 */
]);

export type AttributesAttribute = z.infer<typeof AttributesAttribute>;

export const AttributesGroup = z.positional([
  /* 0 */ z.mapped("key", z.string()), /* "service_options" */
  /* 1 */ z.mapped("name", z.string()), /* "Service options" */
  /* 2 */ z.mapped("attributes", z.array(AttributesAttribute.nullish())),
]);

export const Attributes = z.positional([
  /* 0 */ z.unused(),
  /* 1 */ z.mapped("groups", z.array(AttributesGroup.nullish()).nullish()),
  /* 2 */ z.unused(),
  /* 3 */ z.unused(),
  /* 4 */ z.unused(),
  /* 5 */ z.mapped("secondaryGroups", z.array(AttributesGroup.nullish()).nullish()),
]);

export const PromotedService = z.positional([
  /* 0 */ z.mapped("label", z.array(z.string().nullish()).nullish()), /* ["Dine-in"] */
  /* 1 */ z.unused(),
  /* 2 */ z.unused(),
  /* 3 */ z.mapped("icons", z.array(z.array(z.string().nullish()).nullish()).nullish()), /* [["https://ssl.gstatic.com/images/icons/material/system_gm/2x/done_gm_green700_24dp.png", "https://ssl.gstatic.com/images/icons/material/system_gm/2x/done_gm_green200_24dp.png"]] */
  /* 4 */ z.mapped("detail", z.string().nullish()), /* "Serves dine-in" */
]);

export const JustificationQuote = z.positional([
  /* 0 */ z.mapped("text", z.array(z.string().nullish()).nullish()), /* ["\"The tour takes around 20 minutes to see many art pieces inside.\""] */
  /* 1 */ z.unused(),
  /* 2 */ z.mapped("avatar", z.string().nullish()), /* "https://ssl.gstatic.com/local/servicebusiness/default_user.png" */
]);

// PlaceNode[142][1][i] is the card "justification" line: a review quote ([1]) or sponsored service badges ([6])
export const PromotedServiceGroup = z.positional([
  /* 0 */ z.unused(),
  /* 1 */ z.mapped("quote", JustificationQuote.nullish()),
  /* 2 */ z.unused(),
  /* 3 */ z.opaque(/* unknown id, not the review count */), /* 210379 */
  /* 4 */ z.unused(),
  /* 5 */ z.unused(),
  /* 6 */ z.mapped("services", z.array(z.array(PromotedService.nullish()).nullish()).nullish()), /* dark: null for anonymous sessions as of 2026-10 */
  /* 7 */ z.unused(),
  /* 8 */ z.unused(),
  /* 9 */ z.opaque(/* flag */), /* 1 */
  /* 10 */ z.opaque(/* nested base64 protobuf wrapping an rp_h:... review-highlight id */), /* "Ci9DQUlRQUNvZENodHljRjlvT2tOb0xYaGlabVoxV1dJdFJYWXlaVjlMVTBVeVJHYxAB" */
  /* 11 */ z.unused(),
  /* 12 */ z.opaque(/* ved */), /* "2ahUKEwjLsK3__c-XAxXjBtsEHWcpNi0QwusMKBV6BQgEEPkB" */
]);

export const PromotedServices = z.positional([
  /* 0 */ z.unused(),
  /* 1 */ z.mapped("groups", z.array(PromotedServiceGroup.nullish()).nullish()),
]);

export const HoursPeriodTime = z.positional([
  /* 0 */ z.mapped("open", z.array(z.number().nullish())), /* [11, 30] ([] = midnight 00:00) */
  /* 1 */ z.mapped("close", z.array(z.number().nullish())), /* [22] ([] = midnight 24:00; "Open 24 hours" is [[], []]) */
]);

export const HoursPeriod = z.positional([
  /* 0 */ z.mapped("label", z.string()), /* "11:30 am–10 pm" */
  /* 1 */ z.mapped("time", HoursPeriodTime.nullish()),
]);

export const HoursDate = z.positional([
  /* 0 */ z.mapped("year", z.number()), /* 2026 */
  /* 1 */ z.mapped("month", z.number()), /* 6 */
  /* 2 */ z.mapped("day", z.number()), /* 28 */
]);

export const HoursHoliday = z.positional([
  /* 0 */ z.mapped("note", z.string()), /* "Independence Day (Observed) might affect these hours" */
  /* 1 */ z.mapped("name", z.string()), /* "Independence Day (Observed)" */
  /* 2 */ z.mapped("kind", z.number()), /* 2; 1 = special hours set for the holiday, 2 = holiday may affect these hours */
]);

export const HoursDay = z.positional([
  /* 0 */ z.mapped("weekday", z.string()), /* "Sunday" */
  /* 1 */ z.mapped("weekdayNumber", z.number()), /* 7 */
  /* 2 */ z.mapped("date", HoursDate),
  /* 3 */ z.mapped("periods", z.array(HoursPeriod.nullish())),
  /* 4 */ z.mapped("specialHours", z.number()), /* 0; 1 = owner-set special/holiday hours override this date */
  /* 5 */ z.mapped("openFlag", z.number()), /* 1; 1 = has hours this day, 2 = closed all day */
  /* 6 */ z.mapped("holiday", HoursHoliday.nullish()), /* ["Independence Day (Observed) might affect these hours", "Independence Day (Observed)", 2] */
]);

export const HoursColorStyle = z.positional([
  /* 0 */ z.unused(),
  /* 1 */ z.mapped("colors", z.array(z.number().nullish())), /* [4279862841, 4285388172] */
]);

export const HoursColorRun = z.positional([
  /* 0 */ z.mapped("start", z.number()), /* 0 */
  /* 1 */ z.mapped("length", z.number()), /* 4 */
  /* 2 */ z.mapped("style", HoursColorStyle),
]);

export const HoursStatus = z.positional([
  /* 0 */ z.mapped("text", z.string()), /* "Open · Closes 10 pm" */
  /* 1 */ z.mapped("colorRuns", z.array(HoursColorRun.nullish())),
]);

export const HoursCurrent = z.positional([
  /* 0 */ z.mapped("day", HoursDay.nullish()),
  /* 1 */ z.mapped("activePeriodIndex", z.number().nullish()), /* 0; index into day.periods of the current-or-next period; null when today has no more periods (codes 5/6) */
  /* 2 */ z.mapped("openStateCode", z.number().nullish()), /* 1; 1 open, 2 closes soon, 4 closed but opens later today (incl. "Opens soon"), 5 closed for the rest of today, 6 closed all day */
  /* 3 */ z.opaque(/* no-schedule flag: 1 only on the "Open now" stub (OpeningHours length 3, no weekly/day) */), /* 1 */
  /* 4 */ z.mapped("status", HoursStatus),
  /* 5 */ z.mapped("statusAlt", HoursStatus.nullish()), /* identical to [4] in every observed place */
  /* 6 */ z.unused(),
  /* 7 */ z.mapped("nextChangeHour", z.array(z.number().nullish()).nullish()), /* [21]; when the status label next changes: close-1h while Open (capped at [24] = midnight), close while "Closes soon", open-30min while Closed, open while "Opens soon", [24] for codes 5/6 */
  /* 8 */ z.mapped("shortStatus", HoursStatus.nullish()),
]);

export const OpeningHours = z.positional([
  /* 0 */ z.mapped("weekly", z.array(HoursDay.nullish()).nullish()),
  /* 1 */ z.mapped("current", HoursCurrent),
  /* 2 */ z.mapped("todayWeekdayNumber", z.number()), /* 7 */
  /* 3 */ z.unused(),
  /* 4 */ z.unused(),
  /* 5 */ z.unused(),
  /* 6 */ z.opaque(/* flag */), /* 1 */
]);

export const MealTextSpan = z.positional([
  /* 0 */ z.mapped("start", z.number()), /* 0 */
  /* 1 */ z.mapped("length", z.number()), /* 4 */
  /* 2 */ z.mapped("style", HoursColorStyle),
]);

export const MealStatus = z.positional([
  /* 0 */ z.mapped("text", z.string()), /* "Open · Closes 10 pm" */
  /* 1 */ z.mapped("spans", z.array(MealTextSpan.nullish())),
]);

export const MealInterval = z.positional([
  /* 0 */ z.mapped("label", z.string()), /* "12–10 pm" */
  /* 1 */ z.mapped("time", HoursPeriodTime.nullish()),
]);

export const MealDay = z.positional([
  /* 0 */ z.mapped("weekday", z.string()), /* "Sunday" */
  /* 1 */ z.mapped("weekdayNumber", z.number()), /* 7 */
  /* 2 */ z.mapped("date", HoursDate),
  /* 3 */ z.mapped("intervals", z.array(MealInterval.nullish())),
  /* 4 */ z.mapped("specialHours", z.number()), /* 0; 1 = special hours override this date */
  /* 5 */ z.mapped("statusCode", z.number()), /* 1 */
  /* 6 */ z.mapped("holiday", HoursHoliday.nullish()), /* ["Independence Day (Observed) might affect these hours", "Independence Day (Observed)", 2] */
]);

export const MealToday = z.positional([
  /* 0 */ z.mapped("day", MealDay),
  /* 1 */ z.mapped("activeIntervalIndex", z.number().nullish()), /* 0 */
  /* 2 */ z.mapped("openStateCode", z.number()), /* 1 */
  /* 3 */ z.unused(),
  /* 4 */ z.mapped("status", MealStatus),
  /* 5 */ z.mapped("statusAlt", MealStatus),
  /* 6 */ z.unused(),
  /* 7 */ z.mapped("nextChangeHour", z.array(z.number().nullish())), /* [21] */
  /* 8 */ z.mapped("shortStatus", MealStatus),
]);

export const MealBlock = z.positional([
  /* 0 */ z.mapped("weekly", z.array(MealDay.nullish())),
  /* 1 */ z.mapped("current", MealToday),
  /* 2 */ z.mapped("todayWeekdayNumber", z.number()), /* 7 */
  /* 3 */ z.unused(),
  /* 4 */ z.unused(),
  /* 5 */ z.unused(),
  /* 6 */ z.opaque(/* flag */), /* 1 */
]);

export const MealService = z.positional([
  /* 0 */ z.mapped("service", z.string().nullish()), /* "Kitchen"; localized secondary-hours group label (Kitchen/Lunch/Happy hours/Delivery/Takeout/Drive through/Online service hours ...) or a sub-business like "Walgreens Photo"; no stable id */
  /* 1 */ z.unused(),
  /* 2 */ z.unused(),
  /* 3 */ z.mapped("hours", MealBlock),
]);

export const PhotoSize = z.positional([
  /* 0 */ z.mapped("width", z.number()), /* 4032 */
  /* 1 */ z.mapped("height", z.number()), /* 3024 */
]);

export const PhotoImage = z.positional([
  /* 0 */ z.mapped("url", z.string()), /* "https://lh3.googleusercontent.com/gps-cs-s/APNQkAEyRlR58F-u13TJ49oFZe_M_KqibcT8CBSu3fv-OHyrZNAp32qsQbXoWZA3wbvbR7NDS7K0dw287RcwZS_OxoXd9_ibHlhVGU1kgGTFuGx9pNBxZ33ZraoAvTTa1qRG9Cf3byr_=w122-h92-k-no" */
  /* 1 */ z.mapped("countLabel", z.string().nullish()), /* "474 Photos" (only on legacyPhotos.photos[0]; "" on every other photo) */
  /* 2 */ z.mapped("native", PhotoSize.nullish()),
  /* 3 */ z.mapped("thumbnail", PhotoSize),
]);

export const PhotoVideoVariant = z.positional([
  /* 0 */ z.mapped("itag", z.number().nullish()), /* 18 */
  /* 1 */ z.mapped("width", z.number().nullish()), /* 360 */
  /* 2 */ z.mapped("height", z.number().nullish()), /* 640 */
  /* 3 */ z.mapped("url", z.string().nullish()), /* "https://lh3.googleusercontent.com/gps-cs-s/APNQkAEBM-YPAHAhBIXfXbnSM2DFxnguQFmN3kyT2_OHgCeCN9oeBKxhf6dkQqUZwWe2WRqtku1fXeQMfx44QSBmIGfyhAaMnUD-w0a1MQubkr4eexPvDA2_jNYf-_bnbqzu5Ho-MGR8=m18" */
  /* 4 */ z.mapped("streamType", z.number().nullish()), /* 1 */
]);

export const PhotoVideo = z.positional([
  /* 0 */ z.mapped("durationMs", z.number().nullish()), /* 29999 */
  /* 1 */ z.mapped("variants", z.array(PhotoVideoVariant.nullish()).nullish()),
]);

export const PhotoCamera = z.positional([
  /* 0 */ z.mapped("position", z.array(z.number().nullish()).nullish()), /* [3, 19.0774987, 47.5173442] */
  /* 1 */ z.mapped("orientation", z.array(z.number().nullish()).nullish()), /* [0, 90] */
  /* 2 */ z.mapped("size", PhotoSize.nullish()),
  /* 3 */ z.mapped("fieldOfView", z.number().nullish()), /* 75 */
]);

export const PhotoUploadClient = z.positional([
  /* 0 */ z.unused(),
  /* 1 */ z.unused(),
  /* 2 */ z.mapped("name", z.string().nullish()), /* "photos:gmm_android" */
  /* 3 */ z.opaque(/* client capability codes */), /* [6, 7, 4, 1, 3] */
]);

export const PhotoUpload = z.positional([
  /* 0 */ z.mapped("uploaderType", z.number().nullish()), /* 2; 1 business (bizbuilder/innerspace), 2 user (photos:*), 3 Google/partner */
  /* 1 */ z.unused(),
  /* 2 */ z.unused(),
  /* 3 */ z.opaque(/* variable-length content codes */), /* [9, 1] */
  /* 4 */ z.unused(),
  /* 5 */ z.mapped("client", PhotoUploadClient.nullish()),
  /* 6 */ z.opaque(/* flag */), /* 1 */
  /* 7 */ z.unused(),
  /* 8 */ z.mapped("uploadedAt", z.array(z.number().nullish()).nullish()), /* [2022, 10, 15, 22] */
]);

export const PhotoMetadata = z.positional([
  /* 0 */ z.unused(),
  /* 1 */ z.opaque(/* [store, photo id] */), /* [10, "CIHM0ogKEICAgIDe1YvTpwE"] */
  /* 2 */ z.opaque(/* [store, 3, [height, width]] */), /* [10, 3, [2456, 4032]] */
  /* 3 */ z.unused(),
  /* 4 */ z.unused(),
  /* 5 */ z.opaque(/* capture location */), /* [[[2], [[null, null, 47.4978836, 19.062777]]]] */
  /* 6 */ z.mapped("upload", PhotoUpload.nullish()),
  /* 7 */ z.unused(),
  /* 8 */ z.unused(),
  /* 9 */ z.unused(),
  /* 10 */ z.unused(),
  /* 11 */ z.unused(),
  /* 12 */ z.unused(),
  /* 13 */ z.unused(),
  /* 14 */ z.unused(),
  /* 15 */ z.unused(),
  /* 16 */ z.unused(),
  /* 17 */ z.unused(),
  /* 18 */ z.unused(),
  /* 19 */ z.mapped("reference", z.array(z.string().nullish()).nullish()), /* ["UGCS_REFERENCE", "CIHM0ogKEICAgIDe1YvTpwE||", "1"] */
]);

export const Photo = z.positional([
  /* 0 */ z.mapped("id", z.string().nullish()), /* "CIHM0ogKEICAgID5vvCh7wE" */
  /* 1 */ z.mapped("mediaSource", z.number().nullish()), /* 10 */
  /* 2 */ z.mapped("mediaFormat", z.number().nullish()), /* 12 */
  /* 3 */ z.unused(),
  /* 4 */ z.unused(),
  /* 5 */ z.unused(),
  /* 6 */ z.mapped("image", PhotoImage),
  /* 7 */ z.unused(),
  /* 8 */ z.mapped("camera", PhotoCamera.nullish()),
  /* 9 */ z.opaque(/* response ei token (== Response[7]) */), /* "dVZBatecE4_-wPAPjOKogAQ" */
  /* 10 */ z.opaque(/* ved / request token */), /* "0ahUKEwiXq_7Lt6qVAxUPPxAIHQwxCkAQzCcINCgW" */
  /* 11 */ z.unused(),
  /* 12 */ z.unused(),
  /* 13 */ z.unused(),
  /* 14 */ z.unused(),
  /* 15 */ z.mapped("featureId", z.array(z.array(z.array(z.string().nullish()).nullish()).nullish()).nullish()), /* [[["0x4741db885b5e3387:0xa0d53c27415e930e"]]] */
  /* 16 */ z.unused(),
  /* 17 */ z.mapped("address", z.array(z.string().nullish()).nullish()), /* ["Budapest, Gundel Károly út 4, 1146"] */
  /* 18 */ z.unused(),
  /* 19 */ z.unused(),
  /* 20 */ z.mapped("kindLabel", z.string().nullish()), /* "Photo" */
  /* 21 */ z.mapped("metadata", PhotoMetadata.nullish().catch(null)), /* [null, [null, "CIABIhCt3SBwDByinNpLQYbvhguK"], [0, 3, [5917, 3945]]] */
  /* 22 */ z.mapped("kind", z.number().nullish()), /* 1 */
  /* 23 */ z.unused(),
  /* 24 */ z.unused(),
  /* 25 */ z.unused(),
  /* 26 */ z.mapped("video", PhotoVideo.nullish()),
  /* 27 */ z.unused(),
  /* 28 */ z.unused(),
  /* 29 */ z.mapped("idPair", z.array(z.string().nullish()).nullish()), /* ["5134626428874011527", "-6857508718303603954"] */
  /* 30 */ z.unused(),
  /* 31 */ z.opaque(/* short token */), /* "0sXbGiZKhLE" */
]);

export const Photos = z.positional([
  /* 0 */ z.mapped("photos", z.array(Photo.nullish().catch(null)).nullish()),
]);

export const LegacyPhoto = z.positional([
  /* 0 */ z.mapped("id", z.string().nullish()), /* "CIHM0ogKEICAgID5vvCh7wE" */
  /* 1 */ z.mapped("mediaSource", z.number().nullish()), /* 10 */
  /* 2 */ z.mapped("mediaFormat", z.number().nullish()), /* 12 */
  /* 3 */ z.unused(),
  /* 4 */ z.unused(),
  /* 5 */ z.unused(),
  /* 6 */ z.mapped("image", PhotoImage.nullish()),
  /* 7 */ z.unused(),
  /* 8 */ z.mapped("camera", PhotoCamera.nullish()),
  /* 9 */ z.opaque(/* response ei token (== Response[7]) */), /* "dVZBatecE4_-wPAPjOKogAQ" */
  /* 10 */ z.opaque(/* auth / page token */), /* "0ahUKEwiXq_7Lt6qVAxUPPxAIHQwxCkAQzCcIMSgA" */
  /* 11 */ z.unused(),
  /* 12 */ z.unused(),
  /* 13 */ z.unused(),
  /* 14 */ z.unused(),
  /* 15 */ z.mapped("featureId", z.array(z.array(z.array(z.string().nullish()).nullish()).nullish()).nullish()), /* [[["0x4741db885b5e3387:0xa0d53c27415e930e"]]] */
  /* 16 */ z.unused(),
  /* 17 */ z.mapped("address", z.array(z.string().nullish()).nullish()), /* ["Budapest, Gundel Károly út 4, 1146"] */
  /* 18 */ z.unused(),
  /* 19 */ z.unused(),
  /* 20 */ z.mapped("kindLabel", z.string().nullish()), /* "Photo" */
  /* 21 */ z.mapped("metadata", PhotoMetadata.nullish().catch(null)), /* [null, [null, "CIABIhCt3SBwDByinNpLQYbvhguK"], [0, 3, [5917, 3945]]] */
  /* 22 */ z.mapped("kind", z.number().nullish()), /* 1 */
  /* 23 */ z.unused(),
  /* 24 */ z.unused(),
  /* 25 */ z.unused(),
  /* 26 */ z.unused(),
  /* 27 */ z.unused(),
  /* 28 */ z.unused(),
  /* 29 */ z.mapped("idPair", z.array(z.string().nullish()).nullish()), /* ["5145835839167143181", "-6141078824404022392"] */
  /* 30 */ z.unused(),
  /* 31 */ z.opaque(/* session id */), /* "sI09UQ5_TyU" */
]);

export const LegacyPhotos = z.positional([
  /* 0 */ z.mapped("photos", z.array(LegacyPhoto.nullish().catch(null)).nullish()),
  /* 1 */ z.mapped("totalCount", z.number().nullish()), /* 9653 */
  /* 2 */ z.unused(),
  /* 3 */ z.opaque(/* response ei token (== Response[7]) */), /* "dVZBatecE4_-wPAPjOKogAQ" */
  /* 4 */ z.unused(),
  /* 5 */ z.opaque(/* photo-gallery continuation token, base64, ~46-130 chars */), /* "CmYKAgABEgIAARgC" */
]);

export const ActionsLogo = z.positional([
  /* 0 */ z.mapped("url", z.string()), /* "https://lh3.googleusercontent.com/rXDeTnKgBFi2s3T8p7xL7K_ev3ia1KXeIQ5yYD6SXLJeeX34OtVXcU4PC4FENWjBJw" */
  /* 1 */ z.mapped("label", z.string()), /* "Tabelog" */
  /* 2 */ z.mapped("size", PhotoSize.nullish()),
]);

export const ActionsProvider = z.positional([
  /* 0 */ z.mapped("name", z.string()), /* "gundel.hu" */
  /* 1 */ z.mapped("banner", ActionsLogo.nullish()),
  /* 2 */ z.mapped("logo", ActionsLogo.nullish()),
  /* 3 */ z.mapped("id", z.number().nullish()), /* 20000058 */
]);

export const ActionsUrlInner = z.positional([
  /* 0 */ z.mapped("url", z.string().nullish()), /* "https://gundel.hu/asztalfoglalas/" */
  /* 1 */ z.unused(),
  /* 2 */ z.unused(),
  /* 3 */ z.opaque(/* ved token; only on length-4 inners of google.com/maps/reserve/appt buttons */), /* "0ahUKEwjIoomByaqVAxWXFRAIHWamE3AQtxwIogQoAA" */
  /* 4 */ z.opaque(/* ",AOvVaw...,,<ved>," usg + ved click-tracking */), /* ",AOvVaw3g-NRU_1JZ6vcU_Cnu9Aga,,0ahUKEwiXq_7Lt6qVAxUPPxAIHQwxCkAQtxwIVSgA," */
]);

export const ActionsUrl = z.positional([
  /* 0 */ z.mapped("url", z.string()), /* "https://gundel.hu/asztalfoglalas/" */
  /* 1 */ z.mapped("tracked", ActionsUrlInner.nullish()),
]);

export const ActionsLink = z.positional([
  /* 0 */ z.unused(),
  /* 1 */ z.unused(),
  /* 2 */ z.mapped("destination", ActionsUrl),
]);

export const ActionsProviderEntry = z.positional([
  /* 0 */ z.mapped("provider", ActionsProvider),
  /* 1 */ z.mapped("link", ActionsLink),
  /* 2 */ z.opaque(/* flag */), /* 1 */
]);

export const ActionsOrderMode = z.positional([
  /* 0 */ z.mapped("mode", z.number()), /* 1; 1 delivery, 2 pickup */
]);

export const ActionsOrderDetails = z.positional([
  /* 0 */ z.unused(),
  /* 1 */ z.mapped("modes", z.array(ActionsOrderMode.nullish()).nullish()), /* [[1], [2]] */
  /* 2 */ z.unused(),
  /* 3 */ z.unused(),
  /* 4 */ z.unused(),
  /* 5 */ z.opaque(/* constant */), /* 4 */
  /* 6 */ z.unused(),
  /* 7 */ z.opaque(/* small count, 1-14; likely ordering partners behind searchviewer */), /* 2 */
]);

export const ActionsOrder = z.positional([
  /* 0 */ z.unused(),
  /* 1 */ z.mapped("details", ActionsOrderDetails.nullish()),
  /* 2 */ z.unused(),
  /* 3 */ z.unused(),
  /* 4 */ z.opaque(/* constant */), /* 4 */
]);

export const ActionsReserve = z.positional([
  /* 0 */ z.mapped("label", z.string()), /* "Reserve a table"; button text; "Order online" / "Book online" / "Join waitlist" for other types */
  /* 1 */ z.mapped("link", ActionsLink),
  /* 2 */ z.opaque(/* 1 only on type 1/6 Google reserve buttons whose ActionsList has no providers; always 0 on type 3/4 */), /* 0 */
  /* 3 */ z.opaque(/* action category bitmask: 64 reserve/book, 32 order, 16 waitlist */), /* 64 */
  /* 4 */ z.opaque(/* UI element id per action type: 41902 reserve, 41901 order, 155425/181470 book, 67116 waitlist */), /* 41902 */
  /* 5 */ z.unused(),
  /* 6 */ z.unused(),
  /* 7 */ z.mapped("labelAlt", z.string().nullish()), /* "Reserve a table"; accessible label; null on waitlist */
  /* 8 */ z.unused(),
  /* 9 */ z.opaque(/* ved / tracking token */), /* "0ahUKEwiXq_7Lt6qVAxUPPxAIHQwxCkAQrscCCFYoAQ" */
  /* 10 */ z.mapped("shortLabel", z.string()), /* "Reserve" */
  /* 11 */ z.mapped("order", ActionsOrder.nullish()), /* [null, [null, [[1], [2]], null, null, null, 4, null, 2], null, null, 4] */
  /* 12 */ z.opaque(/* flag */), /* 0 */
  /* 13 */ z.unused(),
  /* 14 */ z.unused(),
  /* 15 */ z.unused(),
  /* 16 */ z.unused(),
  /* 17 */ z.unused(),
  /* 18 */ z.unused(),
  /* 19 */ z.unused(),
  /* 20 */ z.unused(),
  /* 21 */ z.opaque(/* flag */), /* 0 */
  /* 22 */ z.unused(),
  /* 23 */ z.opaque(/* appointment booking kind: [1] partner page, [null, 1] Google /maps/reserve/appt */), /* [1] */
  /* 24 */ z.mapped("provider", ActionsProvider.nullish()), /* ["Zocdoc", null, ["https://lh3.googleusercontent.com/...", "Zocdoc", [80, 80]], 20003046] */
  /* 25 */ z.unused(),
  /* 26 */ z.opaque(/* waitlist flag */), /* [0] */
]);

export const ActionsList = z.positional([
  /* 0 */ z.mapped("type", z.number()), /* 1; 1 reserve a table, 3 book appointment, 4 order online, 6 join waitlist */
  /* 1 */ z.unused(),
  /* 2 */ z.mapped("providers", z.array(ActionsProviderEntry.nullish()).nullish()),
  /* 3 */ z.unused(),
  /* 4 */ z.mapped("enum", z.number()), /* 21631; 1:1 with type: 21631 reserve, 21633 book, 21634 order, 21565 waitlist */
  /* 5 */ z.mapped("reserve", ActionsReserve.nullish()),
  /* 6 */ z.opaque(/* reserve-with-Google flag: 1 on type 1/6 lists whose [5] button is a google.com/maps/reserve/v/(dine|waitlist) URL */), /* 1 */
  /* 7 */ z.unused(),
  /* 8 */ z.opaque(/* flag */), /* 0 */
]);

export const ClaimLink = z.positional([
  /* 0 */ z.mapped("url", z.string()), /* "https://business.google.com/create?fp=16689103740366261267&hl=en&authuser=0&gmbsrc=jp-en-et-ip-z-gmb-s-z-l~mrc%7Cclaimbz%7Cu&ppsrc=GMBMI&utm_campaign=jp-en-et-ip-z-gmb-s-z-l~mrc%7Cclaimbz%7Cu&utm_source=gmb_mrc81&utm_medium=et&getstarted" */
  /* 1 */ z.mapped("label", z.string().nullish()), /* "Claim this business" */
  /* 2 */ z.unused(),
  /* 3 */ z.opaque(/* ved / tracking token */), /* "0ahUKEwiO__7St6qVAxU4EBAIHXZqNfQQ_1kIcCgU" */
  /* 4 */ z.unused(),
  /* 5 */ z.unused(),
  /* 6 */ z.opaque(/* flag */), /* 1 */
]);

export const AffiliatedEntry = z.positional([
  /* 0 */ z.mapped("label", z.string().nullish()), /* "Budapest Zoo & Botanical Garden" */
  /* 1 */ z.mapped("featureId", z.string().nullish()), /* "0x4741db8896028bc7:0xaf07c6529c6becf2" */
  /* 2 */ z.unused(),
  /* 3 */ z.unused(),
  /* 4 */ z.unused(),
  /* 5 */ z.opaque(/* ved token */), /* "0ahUKEwiXq_7Lt6qVAxUPPxAIHQwxCkAQg7cGCFcoIw" */
]);

export const AffiliatedGroup = z.positional([
  /* 0 */ z.mapped("entries", z.array(AffiliatedEntry.nullish()).nullish()),
  /* 1 */ z.mapped("relation", z.number().nullish()), /* 2; 1 = this place is located in the entries, 2 = the entries are inside this place */
  /* 2 */ z.opaque(/* relation subtype (4 with relation 2; 1 or 5 with relation 1); meaning unknown */), /* 4 */
]);

export const AffiliatedLink = z.positional([
  /* 0 */ z.mapped("group", AffiliatedGroup.nullish()),
]);

export const LocationSummary = z.positional([
  /* 0 */ z.mapped("name", z.string().nullish()), /* "Petit-Montrouge"; neighborhood name (seen only on vacation rentals, n=2) */
  /* 1 */ z.mapped("text", z.string().nullish()), /* "Sharing a sleek high-rise with offices, this premium hotel is 2 km from both the iconic Burj Khalifa, and shops at The Dubai Mall. It's a 15-minute walk from Emirates Towers metro station." */
  /* 2 */ z.mapped("featureId", z.string().nullish()), /* "0x47e671b10c5eeeb5:0xc39f906a4301f6e7"; neighborhood feature id (seen only on vacation rentals, n=2) */
  /* 3 */ z.opaque(/* location scores [[score 0-5, aspect 1..4]] */), /* [[4.1993379792879875, 1], [3.5437653304603973, 2], [4.43424683835341, 3], [1.8405167090446382, 4]] */
]);

export const HighlightEntry = z.positional([
  /* 0 */ z.opaque(/* ved / tracking token */), /* "0ahUKEwjmuZ7Mt6qVAxVBQVUIHQ7YBngQgLcGCMcHKBE" */
  /* 1 */ z.mapped("label", z.array(z.string().nullish())), /* ["LGBTQ+ friendly"] */
  /* 2 */ z.opaque(/* help link */), /* ["https://support.google.com/maps/?p=businessownership"] */
  /* 3 */ z.mapped("icon", z.string()), /* "https://gstatic.com/local/placeinfo/lgbtq_friendly_ic_24dp.png" */
  /* 4 */ z.mapped("iconDark", z.string()), /* "https://gstatic.com/local/placeinfo/lgbtq_friendly_ic_24dp.png" */
  /* 5 */ z.unused(),
  /* 6 */ z.unused(),
  /* 7 */ z.opaque(/* copy-link a11y label */), /* "Copy black-owned business help center link" */
  /* 8 */ z.opaque(/* open-link a11y label */), /* "Open black-owned business help center link" */
  /* 9 */ z.unused(),
  /* 10 */ z.mapped("detail", z.array(z.array(z.string().nullish()).nullish()).nullish()), /* [["Check-out time: 10:00"]]; hotels: check-out time paired with the check-in badge */
  /* 11 */ z.opaque(/* flag */), /* 1 */
  /* 12 */ z.opaque(/* label */), /* "" */
]);

export const HighlightTyped = z.positional([
  /* 0 */ z.mapped("type", z.number().nullish()), /* 4; 1 Black-owned, 4 LGBTQ+ friendly, 6 veteran-owned, 8 women-owned, 13 check-in/check-out time, 26 Latino-owned, 27 LGBTQ+ owned, 28 Asian-owned */
  /* 1 */ z.mapped("entry", HighlightEntry.nullish()),
]);

export const Highlights = z.positional([
  /* 0 */ z.unused(),
  /* 1 */ z.mapped("badges", z.array(HighlightEntry.nullish())),
  /* 2 */ z.unused(),
  /* 3 */ z.mapped("typedBadges", z.array(HighlightTyped.nullish()).nullish()), /* [[4, ["0ahUKEwjmuZ7Mt6qVAxVBQVUIHQ7YBngQgLcGCMYHKBA", ["LGBTQ+ friendly"], null, "https://gstatic.com/local/placeinfo/lgbtq_friendly_ic_24dp.png", "https://gstatic.com/local/placeinfo/lgbtq_friendly_ic_24dp.png", null, null, null, null, null, null, 1]]] */
]);

export const SavedListId = z.positional([
  /* 0 */ z.mapped("typeId", z.number()), /* 1 */
]);

export const SavedList = z.positional([
  /* 0 */ z.mapped("id", SavedListId),
  /* 1 */ z.mapped("name", z.string()), /* "Favorites" */
  /* 2 */ z.unused(),
  /* 3 */ z.mapped("savedState", z.number()), /* 1 */
  /* 4 */ z.unused(),
  /* 5 */ z.unused(),
  /* 6 */ z.unused(),
  /* 7 */ z.unused(),
  /* 8 */ z.unused(),
  /* 9 */ z.unused(),
  /* 10 */ z.unused(),
  /* 11 */ z.opaque(/* per-option ved token */), /* "0ahUKEwiXq_7Lt6qVAxUPPxAIHQwxCkAQwaQDCCsoAA" */
]);

export const SaveControl = z.positional([
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
  /* 14 */ z.unused(),
  /* 15 */ z.unused(),
  /* 16 */ z.unused(),
  /* 17 */ z.unused(),
  /* 18 */ z.mapped("lists", z.array(SavedList.nullish())),
  /* 19 */ z.unused(),
  /* 20 */ z.unused(),
  /* 21 */ z.unused(),
  /* 22 */ z.opaque(/* ved token for the save control */), /* "0ahUKEwiXq_7Lt6qVAxUPPxAIHQwxCkAQ0JcGCCooFA" */
]);

export const RelatedSearchTopic = z.positional([
  /* 0 */ z.mapped("kind", z.number().nullish()), /* 0 */
  /* 1 */ z.mapped("term", z.string().nullish()), /* "Fine dining restaurant" */
]);

export const RelatedSearch = z.positional([
  /* 0 */ z.mapped("topic", RelatedSearchTopic.nullish()),
  /* 1 */ z.mapped("label", z.string().nullish()), /* "See similar places" */
]);

export const GeoFeatureId = z.positional([
  /* 0 */ z.mapped("high", z.string()), /* "5134599681805176777" */
  /* 1 */ z.mapped("low", z.string()), /* "288446056727712096" */
]);

export const GeoName = z.positional([
  /* 0 */ z.mapped("name", z.string()), /* "Budapest" */
]);

export const GeoEntry = z.positional([
  /* 0 */ z.mapped("featureId", GeoFeatureId),
  /* 1 */ z.mapped("level", z.number()), /* 0.9; feature-type rank, not a confidence: 1 neighborhood, 0.99 sublocality (Budapest district, NYC borough, chome), 0.9 locality/city (incl. Tokyo wards), 0.84 sublocality-2, 0.83 admin-3 (London borough, arrondissement), 0.82 admin-2/county, 0.81 admin-1/state, 0.8 island, 0.75 colloquial/statistical area (continent, macro-region, school district, historic quarter), 0.5 country */
  /* 2 */ z.mapped("names", z.array(GeoName.nullish())),
]);

export const GeoHierarchy = z.positional([
  /* 0 */ z.mapped("entries", z.array(GeoEntry.nullish()).nullish()),
]);

export const DescriptionLine = z.positional([
  /* 0 */ z.unused(),
  /* 1 */ z.mapped("text", z.string()), /* "Chic hangout for global eats & cocktails" */
  /* 2 */ z.unused(),
  /* 3 */ z.unused(),
  /* 4 */ z.unused(),
  /* 5 */ z.opaque(/* flag */), /* 1 */
  /* 6 */ z.unused(),
  /* 7 */ z.unused(),
  /* 8 */ z.unused(),
  /* 9 */ z.unused(),
  /* 10 */ z.unused(),
  /* 11 */ z.unused(),
  /* 12 */ z.opaque(/* flag */), /* 2 */
]);

export const DescriptionExtended = z.positional([
  /* 0 */ z.unused(),
  /* 1 */ z.unused(),
  /* 2 */ z.unused(),
  /* 3 */ z.unused(),
  /* 4 */ z.unused(),
  /* 5 */ z.opaque(/* flag */), /* 1 */
  /* 6 */ z.unused(),
  /* 7 */ z.mapped("paragraphs", z.array(z.array(z.string().nullish()).nullish()).nullish()), /* [["This down-to-earth hotel is a 9-minute walk from Buda Castle, ...", "Warmly decorated rooms feature ...", "A breakfast buffet is complimentary. ..."]]; usually 3 paragraphs, sometimes 2 */
]);

export const Description = z.positional([
  /* 0 */ z.mapped("summary", DescriptionLine.nullish()),
  /* 1 */ z.mapped("blurb", DescriptionLine.nullish()),
  /* 2 */ z.mapped("extended", DescriptionExtended.nullish()), /* hotel long description */
  /* 3 */ z.opaque(/* report url */), /* "https://www.google.com/local/content/rap/report?d=286732321&t=5&postId=0x4741dd76d0c10b09:0x4afa4824537f85a1%7C/g/11g0gd5y53%7Cen-HU" */
  /* 4 */ z.opaque(/* learn-more url */), /* "https://support.google.com/local-listings/answer/9851099" */
]);

export const IdentifierBundle = z.positional([
  /* 0 */ z.mapped("featureId", z.string()), /* "0x4741db885b5e3387:0xa0d53c27415e930e" */
  /* 1 */ z.unused(),
  /* 2 */ z.unused(),
  /* 3 */ z.mapped("knowledgeGraphId", z.string()), /* "/m/0frxnw" */
  /* 4 */ z.mapped("placeId", z.string()), /* "ChIJhzNeW4jbQUcRDpNeQSc81aA" */
  /* 5 */ z.mapped("listingId", z.string().nullish()), /* "8350095830035021410"; Business Profile listing id (== PlaceNode[181][5]); NOT the CID, which is BigInt(featureId.split(":")[1]) */
  /* 6 */ z.mapped("ownerGaiaId", z.string().nullish()), /* "109965436827872873143"; == Owner[8] and PlaceNode[181][6]; present only on claimed listings */
]);

export const Identifiers = z.positional([
  /* 0 */ z.mapped("bundle", IdentifierBundle.nullish()),
  /* 1 */ z.opaque(/* token */), /* "Q0FF" */
]);

export const AddressComponents = z.positional([
  /* 0 */ z.mapped("district", z.string().nullish()), /* "District XIV." */
  /* 1 */ z.mapped("street", z.string().nullish()), /* "Gundel Károly út 4" */
  /* 2 */ z.mapped("streetDisplay", z.string().nullish()), /* "Gundel Károly út 4" */
  /* 3 */ z.mapped("city", z.string().nullish()), /* "Budapest" */
]);

export const StructuredAddressPart = z.positional([
  /* 0 */ z.mapped("type", z.number()), /* 7 */
  /* 1 */ z.mapped("values", z.array(z.array(z.string().nullish()).nullish())), /* [["Gundel Cafe Patisserie Restaurant"], ["Budapest"], ["Gundel Károly út 4"], ["1146"]] */
]);

export const StructuredAddressFlat = z.positional([
  /* 0 */ z.mapped("district", z.string().nullish()), /* "District XIV." */
  /* 1 */ z.mapped("street", z.string().nullish()), /* "Gundel Károly út 4" */
  /* 2 */ z.mapped("streetDisplay", z.string().nullish()), /* "Gundel Károly út 4" */
  /* 3 */ z.mapped("city", z.string().nullish()), /* "Budapest" */
  /* 4 */ z.mapped("postalCode", z.string().nullish()), /* "1146" */
  /* 5 */ z.mapped("region", z.string().nullish()), /* "Tokyo" */
  /* 6 */ z.mapped("country", z.string()), /* "HU" */
]);

export const PlusCode = z.positional([
  /* 0 */ z.opaque(/* ved token */), /* "2ahUKEwjCk8us-M-XAxUVR_EDHS7VNTsQqtMBKAx6BAgGEBI" */
  /* 1 */ z.mapped("global", z.array(z.string().nullish()).nullish()), /* ["8FVXG38G+XW"] */
  /* 2 */ z.mapped("compound", z.array(z.string().nullish()).nullish()), /* ["G38G+XW Budapest, Hungary"] */
  /* 3 */ z.opaque(/* kind */), /* 2 */
]);

export const StructuredAddress = z.positional([
  /* 0 */ z.mapped("parts", z.array(StructuredAddressPart.nullish())),
  /* 1 */ z.mapped("flat", StructuredAddressFlat.nullish()),
  /* 2 */ z.mapped("plusCode", PlusCode.nullish()), /* direct-hit single-place queries only */
]);

export const HotelOffer = z.positional([
  /* 0 */ z.mapped("provider", z.string().nullish()), /* "Booking.com" */
  /* 1 */ z.mapped("price", z.string().nullish()), /* "29 179 HUF" */
  /* 2 */ z.opaque(/* price (duplicate) */), /* "29 179 HUF" */
  /* 3 */ z.opaque(/* flag */), /* 1 */
  /* 4 */ z.opaque(/* flag */), /* 0 */
  /* 5 */ z.opaque(/* click link [url, provider, null, ved] */), /* ["https://www.google.com/travel/lodging/clk?pc=...", "Booking.com", null, "2ahUKEwi..."] */
  /* 6 */ z.opaque(/* label */), /* "" */
  /* 7 */ z.unused(),
  /* 8 */ z.mapped("logo", z.string().nullish()), /* "//www.gstatic.com/travel-hotels/branding/icon_184.png" */
  /* 9 */ z.mapped("official", z.number().nullish()), /* 1; 1 = hotel's own site */
  /* 10 */ z.opaque(/* flag */), /* 0 */
  /* 11 */ z.mapped("perks", z.array(z.array(z.unknown()).nullish()).nullish()), /* [["Official site", 1], ["Earn Marriott Rewards"]] */
  /* 12 */ z.opaque(/* flag */), /* 1 */
  /* 13 */ z.opaque(/* member price */), /* [null, "137 275 HUF", ..., "137K", ["Get a lower price plus free Wi-Fi with free enrollment", 1]] */
  /* 14 */ z.unused(),
  /* 15 */ z.unused(),
  /* 16 */ z.unused(),
  /* 17 */ z.opaque(/* internal */), /* [2] */
  /* 18 */ z.unused(),
  /* 19 */ z.opaque(/* internal */),
  /* 20 */ z.opaque(/* price */), /* "29 179 HUF" */
  /* 21 */ z.opaque(/* price */), /* "29 179 HUF" */
  /* 22 */ z.opaque(/* price delta (fees/savings?) */), /* "1 122 HUF" */
  /* 23 */ z.opaque(/* ved / tracking token */), /* "2ahUKEwivoK_Z-8-XAxV3bvEDHWSCHTsQ96AIKAB6BAgEEFc" */
  /* 24 */ z.unused(),
  /* 25 */ z.unused(),
  /* 26 */ z.opaque(/* flag */),
  /* 27 */ z.unused(),
  /* 28 */ z.opaque(/* flag */), /* 1 */
]);

export const HotelAdCreative = z.positional([
  /* 0 */ z.mapped("headline", z.string().nullish()), /* "29 179 HUF/night on 3 Nov - 4" */
  /* 1 */ z.mapped("highlight", z.string().nullish()), /* "Free Wi-Fi" */
  /* 2 */ z.mapped("cta", z.string().nullish()), /* "Visit Site" */
  /* 3 */ z.mapped("advertiser", z.string().nullish()), /* "Booking.com" */
  /* 4 */ z.mapped("url", z.string().nullish()), /* "https://www.google.com/aclk?sa=L&ai=...&adurl=" */
  /* 5 */ z.unused(),
  /* 6 */ z.mapped("logo", z.string().nullish()), /* "//www.gstatic.com/travel-hotels/branding/icon_184.png" */
  /* 7 */ z.opaque(/* official-site flag */), /* 0 */
]);

export const HotelBooking = z.positional([
  /* 0 */ z.mapped("checkIn", z.string().nullish()), /* "2026-07-21" */
  /* 1 */ z.mapped("checkOut", z.string().nullish()), /* "2026-07-22" */
  /* 2 */ z.mapped("checkInLabel", z.string().nullish()), /* "Tue, 21 Jul" */
  /* 3 */ z.mapped("checkOutLabel", z.string().nullish()), /* "Wed, 22 Jul" */
  /* 4 */ z.mapped("nights", z.number().nullish()), /* 1 */
  /* 5 */ z.mapped("sponsoredOffers", z.array(HotelOffer.nullish()).nullish()), /* sponsored hotel ads only */
  /* 6 */ z.mapped("starsText", z.string().nullish()), /* "5 stars" */
  /* 7 */ z.mapped("availability", z.unknown().nullish()), /* ["2026-07-21", 1, null, 1, null, null, null, null, [4, 0, 2, 4], null, null, null, null, null, [2], 1, [[2026, 7, 21], [2026, 7, 22], null, 0, null, 0], null, 0, null, null, "Q2hnSW5Ia1NFd2k1d2FyYnQ2cVZBeFhSSTZJREhjbVNKRWM="] */
  /* 8 */ z.mapped("advertiser", z.string().nullish()), /* "Booking.com"; sponsored hotel ads only */
  /* 9 */ z.mapped("priceText", z.string().nullish()), /* "HUF 15,516" */
  /* 10 */ z.opaque(/* token */), /* "CPPMlb7GqpUDFf8qogMdyOwOGQ" */
  /* 11 */ z.opaque(/* session id */), /* "EmZBavqdKt2xwPAP6sLB2A4" */
  /* 12 */ z.opaque(/* ved / tracking token */), /* "0ahUKEwj67oq-xqqVAxXdGBAIHWphEOsQpC0I5gEoEw" */
  /* 13 */ z.opaque(/* currency disclaimer link */), /* ["/help/currency_disclaimer.html", null, null, "0ahUKEwj67oq-xqqVAxXdGBAIHWphEOsQ33IIiAIoCA"] */
  /* 14 */ z.unused(),
  /* 15 */ z.opaque(/* booking url */), /* "/travel/clk/hi?qid=CPPMlb7GqpUDFf8qogMdyOwOGQ&t=APdfbW4s7LT5nBpbcOanXvgFI92YAGCZVYDa5Xi0xB6FAyP6Cg" */
  /* 16 */ z.unused(),
  /* 17 */ z.unused(),
  /* 18 */ z.unused(),
  /* 19 */ z.unused(),
  /* 20 */ z.opaque(/* booking option */), /* [1, ["2026-08-30", "2026-08-31", 1, "Sun, 30 Aug", "Mon, 31 Aug"], "16 418 HUF", 20515, 0, 0, 0, null, null, null, null, null, null, null, "", 0] */
  /* 21 */ z.opaque(/* token */), /* "APdfbW4s7LT5nBpbcOanXvgFI92YAGCZVYDa5Xi0xB6FAyP6Cg" */
  /* 22 */ z.unused(),
  /* 23 */ z.unused(),
  /* 24 */ z.unused(),
  /* 25 */ z.unused(),
  /* 26 */ z.opaque(/* internal */), /* [[2]] */
  /* 27 */ z.unused(),
  /* 28 */ z.opaque(/* advertiser brand [logo, name] (sponsored only) */), /* ["//www.gstatic.com/travel-hotels/branding/icon_184.png", "Booking.com"] */
  /* 29 */ z.opaque(/* internal metadata */),
  /* 30 */ z.unused(),
  /* 31 */ z.opaque(/* flag */), /* 0 */
  /* 32 */ z.opaque(/* amenities */), /* [[[2, [[[null, null, "Pool", 1, 21], [null, null, "Free parking", 1, 15, 2], [null, null, "Free Wi-Fi", 1, 22, 2], [null, null, "Air-conditioned", 1, 2]]], null, null, null, null, null, null, null, null, null, 86917]]] */
  /* 33 */ z.unused(),
  /* 34 */ z.unused(),
  /* 35 */ z.unused(),
  /* 36 */ z.unused(),
  /* 37 */ z.mapped("displayPrice", z.string().nullish()), /* "75,3K"; nightly price as rendered on the card; compact ("75,3K", "HUF 25K") when large, else equal to [9] */
  /* 38 */ z.opaque(/* listing id */), /* "2939934847940497748" */
  /* 39 */ z.opaque(/* flag */), /* 0 */
  /* 40 */ z.unused(),
  /* 41 */ z.unused(),
  /* 42 */ z.unused(),
  /* 43 */ z.unused(),
  /* 44 */ z.mapped("offers", z.array(HotelOffer.nullish()).nullish()),
  /* 45 */ z.opaque(/* prices */), /* ["45 477 HUF", "45 477 HUF", "45 477 HUF"] */
  /* 46 */ z.opaque(/* prices */), /* ["48 330 HUF", "48 330 HUF", "48 330 HUF"] */
  /* 47 */ z.opaque(/* ad click signature (sponsored only) */), /* [["avs=ChMI5I7i2fvPlwMV...&avsig=US_ncteRiaA&opi=79508299"]] */
  /* 48 */ z.unused(),
  /* 49 */ z.opaque(/* price note */), /* [null, 149126, ["This price was customized by the booking partner based on factors such as your device type. Learn more", [[0, 92, [null, [4284441448, 4293454573]]], [92, 102, [null, [4279923688, 4287280376], 0], ["https://support.google.com/travel/answer/6276008?hl=#&ref_topic=7687750"]]]]] */
  /* 50 */ z.opaque(/* internal */),
  /* 51 */ z.opaque(/* internal */), /* [null, 161407] */
  /* 52 */ z.opaque(/* token */), /* "Q2dvSTFLS2trcV9sci1Zb01BRkFBUQ==" */
  /* 53 */ z.opaque(/* ad disclosure: [null, [[aboutthisad url]]] on sponsored, [] otherwise */), /* [] */
  /* 54 */ z.unused(),
  /* 55 */ z.unused(),
  /* 56 */ z.unused(),
  /* 57 */ z.unused(),
  /* 58 */ z.unused(),
  /* 59 */ z.mapped("adCreative", HotelAdCreative.nullish()), /* sponsored hotel ads only */
  /* 60 */ z.opaque(/* partner offer */),
]);

export const HotelAmenity = z.positional([
  /* 0 */ z.unused(),
  /* 1 */ z.unused(),
  /* 2 */ z.mapped("label", z.string().nullish()), /* "Free Wi-Fi" */
  /* 3 */ z.opaque(/* flag */), /* 1 */
  /* 4 */ z.mapped("iconId", z.number().nullish()), /* 22 */
  /* 5 */ z.opaque(/* flag */), /* 2 */
  /* 6 */ z.opaque(/* internal */), /* [[2], [1]] */
]);

export const HotelClass = z.positional([
  /* 0 */ z.mapped("stars", z.number().nullish()), /* 5 */
  /* 1 */ z.unused(),
  /* 2 */ z.mapped("amenities", z.array(HotelAmenity.nullish()).nullish()),
  /* 3 */ z.mapped("label", z.string().nullish()), /* "5-star hotel" */
  /* 4 */ z.opaque(/* vacation-rental capacity specs: sparse [index -> count] entries; index meaning unverified (not a rating breakdown) */), /* [[null, null, null, null, 8], [null, 3], [null, null, 4], [null, null, null, 2], [1], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 80]] */
  /* 5 */ z.opaque(/* flag */), /* 1 */
]);

export const ContainedPlaceCoordinate = z.positional([
  /* 0 */ z.mapped("latitude", z.number().nullish()), /* 40.757207099999995 */
  /* 1 */ z.mapped("longitude", z.number().nullish()), /* -73.9863737 */
]);

export const ContainedPlaceRatings = z.positional([
  /* 0 */ z.mapped("rating", z.number().nullish()), /* 4.3 */
  /* 1 */ z.mapped("histogram", z.array(z.number().nullish()).nullish()), /* [684, 567, 1551, 3663, 10296] */
  /* 2 */ z.mapped("reviewCount", z.number().nullish()), /* 16761 */
]);

export const ContainedPlaceIds = z.positional([
  /* 0 */ z.mapped("featureId", z.string().nullish()), /* "0x89c25854e6657b87:0x1627fdc289dd3acf" */
  /* 1 */ z.unused(),
  /* 2 */ z.unused(),
  /* 3 */ z.mapped("mid", z.string().nullish()), /* "/g/1w1132lq" */
]);

export const ContainedPlace = z.positional([
  /* 0 */ z.mapped("ids", ContainedPlaceIds.nullish()),
  /* 1 */ z.mapped("name", z.string().nullish()), /* "Bubba Gump Shrimp Co." */
  /* 2 */ z.opaque(/* thumbnail */), /* [["https://lh3.googleusercontent.com/grass-cs/...=w86-h86-n-k-no", null, null, null, [86, 86]]] */
  /* 3 */ z.mapped("coordinates", ContainedPlaceCoordinate.nullish()),
  /* 4 */ z.mapped("ratings", ContainedPlaceRatings.nullish()),
  /* 5 */ z.opaque(/* categories */), /* [["Seafood restaurant", "gcid:seafood_restaurant"]] */
  /* 6 */ z.mapped("openingHours", OpeningHours.nullish().catch(null)),
  /* 7 */ z.mapped("price", z.array(z.string().nullish()).nullish()), /* ["$$"] */
  /* 8 */ z.unused(),
  /* 9 */ z.opaque(/* address + floor */), /* [[[1, [["1501 Broadway, New York, NY 10036"]]]], [null, null, null, null, null, null, null, ["Floor 1"]]] */
  /* 10 */ z.opaque(/* search url */), /* "/search?sca_esv=...&tbm=map&q=Bubba+Gump+Shrimp+Co.&ludocid=..." */
]);

export const ContainedPlaceItem = z.positional([
  /* 0 */ z.opaque(/* kind */), /* 2 */
  /* 1 */ z.mapped("place", ContainedPlace.nullish()),
  /* 2 */ z.opaque(/* rich-card flag */), /* 1 */
  /* 3 */ z.opaque(/* flag */), /* 1 */
  /* 4 */ z.opaque(/* flag */), /* 1 */
]);

// PlaceNode[204]: businesses inside a landmark ("At this place"); landmark lookups only
export const ContainedPlaces = z.positional([
  /* 0 */ z.mapped("items", z.array(ContainedPlaceItem.nullish().catch(null)).nullish()),
  /* 1 */ z.opaque(/* section titles */), /* ["At this place", "At this place"] */
]);

export const ReviewSnippet = z.positional([
  /* 0 */ z.opaque(/* author [profileUrl, null, avatar, null, tracking] */), /* ["https://www.google.com/maps/contrib/105387012031483794339?hl=en-US", null, "//lh3.googleusercontent.com/a-/ALV-...=s40-k-cc-rp-mo", null, ",AOvVaw...,,2ahUKEwi...,"] */
  /* 1 */ z.mapped("text", z.string().nullish()), /* "\"Tons of shopping, people watching, food and bar options and more.\"" */
  /* 2 */ z.unused(),
  /* 3 */ z.unused(),
  /* 4 */ z.opaque(/* highlighted spans [[start, end]] */), /* [[1, 5], [19, 25], [36, 40], [49, 56]] */
  /* 5 */ z.opaque(/* type code */), /* 2 */
  /* 6 */ z.opaque(/* avatar block */),
  /* 7 */ z.unused(),
  /* 8 */ z.opaque(/* author gaia id */), /* "105387012031483794339" */
  /* 9 */ z.mapped("rating", z.number().nullish()), /* 5 */
  /* 10 */ z.opaque(/* review id */), /* "ChZDSUhNMG9nS0VJQ0FnSUNzbzhEeFhnEAE" */
  /* 11 */ z.opaque(/* internal */), /* [0, 0] */
]);

// PlaceNode[31]: top review quotes; single-place lookups only
export const ReviewSnippets = z.positional([
  /* 0 */ z.unused(),
  /* 1 */ z.mapped("snippets", z.array(ReviewSnippet.nullish()).nullish()),
]);

export const MerchantDescription = z.positional([
  /* 0 */ z.mapped("text", z.array(z.string().nullish()).nullish()), /* ["Kóstolja meg a magyar gasztronómia ikonikus fogásait a szülőhelyén! ..."] */
  /* 1 */ z.opaque(/* policy links */), /* ["https://www.google.com/local/place/rap/merchantdescription", "https://support.google.com/legal/troubleshooter/1114905#ts=1115658%2C1115689"] */
]);

// PlaceNode[260]: sponsored booking-partner offer on organic hotel cards; rare, ad-auction dependent
export const PartnerOffer = z.positional([
  /* 0 */ z.mapped("clickUrl", z.string().nullish()), /* "https://www.google.com/aclk?sa=L&ai=DChsSEwjdzeXf-8-XAxX_GQYAHWLjKt8YACICCAEQWRoCd3M&...&adurl=" */
  /* 1 */ z.mapped("advertiser", z.string().nullish()), /* "Booking.com" */
  /* 2 */ z.mapped("logo", z.string().nullish()), /* "https://tpc.googlesyndication.com/simgad/17528167228336897850" */
  /* 3 */ z.opaque(/* about-this-ad disclosure */), /* [null, [["https://adssettings.google.com/aboutthisad?source=maps&reasons=...", null, null, null, null, null, 1, ["ata_theme", "dark"]]]] */
  /* 4 */ z.mapped("cta", z.string().nullish()), /* "Book now" */
  /* 5 */ z.mapped("priceText", z.string().nullish()), /* "46 829 HUF" */
  /* 6 */ z.opaque(/* adview impression url */), /* "https://www.google.com/adview?skip=a&avs=..." */
]);

export const PlaceNode = z.positional([
  /* 0 */ z.opaque(/* session token */), /* "dVZBatecE4_-wPAPjOKogAQ" */
  /* 1 */ z.opaque(/* per-result ved token */), /* "0ahUKEwiXq_7Lt6qVAxUPPxAIHQwxCkAQ8BcIBSgA" */
  /* 2 */ z.mapped("addressLines", z.array(z.string().nullish()).nullish()), /* ["Budapest", "Gundel Károly út 4", "1146"] */
  /* 3 */ z.unused(),
  /* 4 */ z.mapped("ratings", Ratings.nullish()),
  /* 5 */ z.unused(),
  /* 6 */ z.unused(),
  /* 7 */ z.mapped("website", Website.nullish()),
  /* 8 */ z.unused(),
  /* 9 */ z.mapped("coordinates", Coordinates.nullish()),
  /* 10 */ z.mapped("featureId", z.string()), /* "0x4741db885b5e3387:0xa0d53c27415e930e" */
  /* 11 */ z.mapped("name", z.string()), /* "Gundel Cafe Patisserie Restaurant" */
  /* 12 */ z.unused(),
  /* 13 */ z.mapped("categories", z.array(z.string().nullish()).nullish()), /* ["Hungarian restaurant", "Catering food and drink supplier", "Wedding venue"] */
  /* 14 */ z.mapped("district", z.string().nullish()), /* "District XIV." */
  /* 15 */ z.unused(),
  /* 16 */ z.unused(),
  /* 17 */ z.opaque(/* flag */), /* 1 */
  /* 18 */ z.mapped("addressWithName", z.string().nullish()), /* "Budapest, Gundel Cafe Patisserie Restaurant, Gundel Károly út 4, 1146" */
  /* 19 */ z.unused(),
  /* 20 */ z.unused(),
  /* 21 */ z.unused(),
  /* 22 */ z.unused(),
  /* 23 */ z.opaque(/* flag */), /* 1 */
  /* 24 */ z.opaque(/* single-element wrapper */), /* [[[[[2, null, null, null, null, [null, null, null, 0, 0], [null, null, null, 7, 0]], [2, null, null, null, null, [null, 30, 11], [null, 0, 22]]]]]] */
  /* 25 */ z.mapped("saveControl", SaveControl.nullish()),
  /* 26 */ z.unused(),
  /* 27 */ z.unused(),
  /* 28 */ z.unused(),
  /* 29 */ z.opaque(/* containing feature */), /* [["0x89c258f52ad45a79:0x8131f549e8af76f4", 0, "1"]] */
  /* 30 */ z.mapped("timezone", z.string().nullish()), /* "Europe/Budapest" (null on sponsored-hotel PlaceNodes) */
  /* 31 */ z.mapped("reviewSnippets", ReviewSnippets.nullish().catch(null)),
  /* 32 */ z.mapped("description", Description.nullish()),
  /* 33 */ z.unused(),
  /* 34 */ z.unused(),
  /* 35 */ z.mapped("hotelBooking", HotelBooking.nullish()),
  /* 36 */ z.unused(),
  /* 37 */ z.mapped("legacyPhotos", LegacyPhotos.nullish()),
  /* 38 */ z.unused(),
  /* 39 */ z.mapped("address", z.string().nullish()), /* "Budapest, Gundel Károly út 4, 1146" */
  /* 40 */ z.opaque(/* flag */), /* 1 */
  /* 41 */ z.unused(),
  /* 42 */ z.unused(),
  /* 43 */ z.unused(),
  /* 44 */ z.opaque(/* geo entity description */), /* [null, null, [["Budapest, Hungary’s capital, is bisected by the River Danube. ..."]]] */
  /* 45 */ z.unused(),
  /* 46 */ z.mapped("reserve", z.array(Website.nullish()).nullish()), /* reservation links = ActionsList type-1 providers[*]; null when only the Reserve-with-Google button exists */
  /* 47 */ z.unused(),
  /* 48 */ z.unused(),
  /* 49 */ z.mapped("claimLink", ClaimLink.nullish()),
  /* 50 */ z.unused(),
  /* 51 */ z.opaque(/* sponsored-card photo carousel: [Photo[] (same ids as [72]/[37]), null, null, ei token]; ad PlaceNodes only */), /* [[["CIABIhACsVHNo_sZDbdNizHtI--e", 99, 27, null, null, null, ["https://lh3.googleusercontent.com/grass-cs/...=k-no", "", [2214, 1476], [203, 100]], ...]], null, null, "8jrbas-0GNGF7NYP2oLwmAg"] */
  /* 52 */ z.unused(),
  /* 53 */ z.unused(),
  /* 54 */ z.unused(),
  /* 55 */ z.unused(),
  /* 56 */ z.unused(),
  /* 57 */ z.mapped("owner", Owner.nullish()),
  /* 58 */ z.unused(),
  /* 59 */ z.unused(),
  /* 60 */ z.unused(),
  /* 61 */ z.opaque(/* flag */), /* 1 */
  /* 62 */ z.unused(),
  /* 63 */ z.unused(),
  /* 64 */ z.mapped("hotelClass", HotelClass.nullish()),
  /* 65 */ z.unused(),
  /* 66 */ z.unused(),
  /* 67 */ z.opaque(/* flag */), /* 1 */
  /* 68 */ z.opaque(/* places at this address */), /* [[["KzjbarLhMtOUxc8PutfEmAg", "2ahUKEw...", null, null, [null, null, null, null, null, null, null, 4.9], ..., "M1 Med Beauty Budapest (VI. kerület)", ...]]] */
  /* 69 */ z.unused(),
  /* 70 */ z.unused(),
  /* 71 */ z.unused(),
  /* 72 */ z.mapped("photos", Photos.nullish()),
  /* 73 */ z.mapped("adFlag", z.number().nullish()), /* 1; set only on sponsored PlaceNodes (AdEntry[15] and sponsored hotel rows) */
  /* 74 */ z.unused(),
  /* 75 */ z.mapped("actions", z.array(z.array(ActionsList.nullish()).nullish()).nullish()),
  /* 76 */ z.mapped("relatedTypes", z.array(RelatedTypeEntry.nullish()).nullish()),
  /* 77 */ z.unused(),
  /* 78 */ z.mapped("placeId", z.string().nullish()), /* "ChIJhzNeW4jbQUcRDpNeQSc81aA" */
  /* 79 */ z.opaque(/* flag */), /* 1 */
  /* 80 */ z.unused(),
  /* 81 */ z.unused(),
  /* 82 */ z.mapped("addressComponents", AddressComponents.nullish()),
  /* 83 */ z.unused(),
  /* 84 */ z.unused(),
  /* 85 */ z.unused(),
  /* 86 */ z.unused(),
  /* 87 */ z.unused(),
  /* 88 */ z.mapped("ranking", Ranking.nullish()),
  /* 89 */ z.mapped("knowledgeGraphId", z.string().nullish()), /* "/m/0frxnw" */
  /* 90 */ z.unused(),
  /* 91 */ z.unused(),
  /* 92 */ z.unused(),
  /* 93 */ z.unused(),
  /* 94 */ z.opaque(/* flag */), /* 1 */
  /* 95 */ z.unused(),
  /* 96 */ z.unused(),
  /* 97 */ z.unused(),
  /* 98 */ z.unused(),
  /* 99 */ z.opaque(/* internal metadata */),
  /* 100 */ z.mapped("attributes", Attributes.nullish()),
  /* 101 */ z.mapped("localName", z.string().nullish()), /* "Gundel Étterem Rendezvényhelyszín és Catering szolgáltató" */
  /* 102 */ z.unused(),
  /* 103 */ z.unused(),
  /* 104 */ z.unused(),
  /* 105 */ z.opaque(/* nested token wrapper */), /* [[[[[2]]], [null, null, null, "lVZBavK_B5iwwPAP7dig0QM"]]] */
  /* 106 */ z.unused(),
  /* 107 */ z.unused(),
  /* 108 */ z.unused(),
  /* 109 */ z.opaque(/* flag */), /* 1 */
  /* 110 */ z.mapped("nameLanguage", z.string().nullish()), /* "en" */
  /* 111 */ z.mapped("localNameLanguage", z.string().nullish()), /* "hu" */
  /* 112 */ z.mapped("translatedLanguageName", z.string().nullish()), /* "English" */
  /* 113 */ z.mapped("translatedLanguageCode", z.string().nullish()), /* "en" */
  /* 114 */ z.unused(),
  /* 115 */ z.unused(),
  /* 116 */ z.unused(),
  /* 117 */ z.unused(),
  /* 118 */ z.mapped("mealHours", z.array(MealService.nullish()).nullish()), /* "More hours" groups: meals, Kitchen, Takeout, Delivery, Drive through, Happy hours, sub-departments */
  /* 119 */ z.mapped("entrance", EntranceLocation.nullish()),
  /* 120 */ z.opaque(/* menu */),
  /* 121 */ z.opaque(/* flag */), /* 1 */
  /* 122 */ z.opaque(/* owner posts / updates */), /* [["Gundel Cafe Patisserie Restaurant", "https://lh3.googleusercontent.com/-LzNCOr0ygq4/.../s40-c-k-mo/photo.jpg"], [[null, [[["Budapest's most iconic table is waiting for you. ", 1], ...]]]], 1] */
  /* 123 */ z.unused(),
  /* 124 */ z.unused(),
  /* 125 */ z.opaque(/* services */), /* [[[null, [[["Hotel"], [[[["Costa Coffee", "We Proudly Serve Costa Coffee"], ["From AED 22.00"]], [["EV Charging Station", "Available for all in-house guests"], ["Free"]]]]]], null, null, 4]]] */
  /* 126 */ z.unused(),
  /* 127 */ z.unused(),
  /* 128 */ z.opaque(/* flag */), /* 1 */
  /* 129 */ z.unused(),
  /* 130 */ z.opaque(/* flag */), /* 0 */
  /* 131 */ z.unused(),
  /* 132 */ z.unused(),
  /* 133 */ z.unused(),
  /* 134 */ z.mapped("affiliatedLink", AffiliatedLink.nullish()),
  /* 135 */ z.unused(),
  /* 136 */ z.opaque(/* flag */), /* 1 */
  /* 137 */ z.unused(),
  /* 138 */ z.unused(),
  /* 139 */ z.unused(),
  /* 140 */ z.unused(),
  /* 141 */ z.unused(),
  /* 142 */ z.mapped("promoted", PromotedServices.nullish().catch(null)), /* card justification block: sponsored service badges at groups[i].services (dark: null for anonymous sessions as of 2026-10) or a review quote at groups[i].quote (also on organic places) */
  /* 143 */ z.unused(),
  /* 144 */ z.unused(),
  /* 145 */ z.unused(),
  /* 146 */ z.opaque(/* constant marker */), /* [9] */
  /* 147 */ z.unused(),
  /* 148 */ z.opaque(/* flag */), /* 1 */
  /* 149 */ z.mapped("localAddress", z.string().nullish()), /* "〒150-0031 東京都渋谷区桜丘町１−4 渋谷サクラステージ SHIBUYAサイド ４階" */
  /* 150 */ z.unused(),
  /* 151 */ z.unused(),
  /* 152 */ z.unused(),
  /* 153 */ z.opaque(/* related topics */),
  /* 154 */ z.mapped("merchantDescription", MerchantDescription.nullish()), /* "From the business" text; single-place lookups only */
  /* 155 */ z.unused(),
  /* 156 */ z.unused(),
  /* 157 */ z.mapped("logo", z.string().nullish()), /* "https://lh3.googleusercontent.com/-LzNCOr0ygq4/AAAAAAAAAAI/AAAAAAAAAAA/FdoZVpgjS44/s44-p-k-no-ns-nd/photo.jpg" */
  /* 158 */ z.unused(),
  /* 159 */ z.unused(),
  /* 160 */ z.opaque(/* single-element wrapper */), /* [1] */
  /* 161 */ z.mapped("summary", LocationSummary.nullish()),
  /* 162 */ z.unused(),
  /* 163 */ z.unused(),
  /* 164 */ z.mapped("relatedSearch", RelatedSearch.nullish()),
  /* 165 */ z.opaque(/* photo-source flag */), /* [1] */
  /* 166 */ z.mapped("locality", z.string().nullish()), /* "New York, NY"; display locality line (city + region/country when non-local); use structuredAddress.flat.city for the bare city */
  /* 167 */ z.unused(),
  /* 168 */ z.unused(),
  /* 169 */ z.unused(),
  /* 170 */ z.opaque(/* flag */), /* 1 */
  /* 171 */ z.unused(),
  /* 172 */ z.unused(),
  /* 173 */ z.unused(),
  /* 174 */ z.opaque(/* local-guide program url */), /* ["https://www.google.com/search?q=local+guide+program&ibp=gwp;0,26,OjAKLiIqR3VuZGVsIENhZmUgUGF0aXNzZXJpZSBSZXN0YXVyYW50IEJ1ZGFwZXN0KAI&pcl=lp"] */
  /* 175 */ z.opaque(/* rate-and-review prompt */), /* [null, [null, 1], 0, null, ["Rate and review", "Share your experience to help others", 1, "Share details of your own experience at this place"], ...] */
  /* 176 */ z.unused(),
  /* 177 */ z.unused(),
  /* 178 */ z.mapped("phones", z.array(PhoneEntry.nullish()).nullish()),
  /* 179 */ z.unused(),
  /* 180 */ z.unused(),
  /* 181 */ z.mapped("listingIds", ListingIds.nullish()),
  /* 182 */ z.unused(),
  /* 183 */ z.mapped("structuredAddress", StructuredAddress.nullish()),
  /* 184 */ z.unused(),
  /* 185 */ z.unused(),
  /* 186 */ z.opaque(/* related */), /* [1, "0ahUKEwjcofbV0aqVAxVD4gIHHdn4M6UQyKAGCCUoEA", [["Lodging", [["0x60f0cfdefb89b549:0x7dac5195995d4d09"]], null, 17]]] */
  /* 187 */ z.unused(),
  /* 188 */ z.unused(),
  /* 189 */ z.unused(),
  /* 190 */ z.unused(),
  /* 191 */ z.unused(),
  /* 192 */ z.unused(),
  /* 193 */ z.unused(),
  /* 194 */ z.unused(),
  /* 195 */ z.unused(),
  /* 196 */ z.mapped("highlights", Highlights.nullish()),
  /* 197 */ z.unused(),
  /* 198 */ z.unused(),
  /* 199 */ z.unused(),
  /* 200 */ z.unused(),
  /* 201 */ z.unused(),
  /* 202 */ z.unused(),
  /* 203 */ z.mapped("openingHours", OpeningHours.nullish()),
  /* 204 */ z.mapped("containedPlaces", ContainedPlaces.nullish().catch(null)),
  /* 205 */ z.opaque(/* rank/tier */), /* 1 */
  /* 206 */ z.unused(),
  /* 207 */ z.unused(),
  /* 208 */ z.mapped("pin", PinLocation.nullish()),
  /* 209 */ z.opaque(/* result token */), /* "CgZHdW5kZWySARRodW5nYXJpYW5fcmVzdGF1cmFudOABAA" */
  /* 210 */ z.unused(),
  /* 211 */ z.unused(),
  /* 212 */ z.unused(),
  /* 213 */ z.unused(),
  /* 214 */ z.opaque(/* rank/tier */), /* 1 */
  /* 215 */ z.unused(),
  /* 216 */ z.unused(),
  /* 217 */ z.unused(),
  /* 218 */ z.unused(),
  /* 219 */ z.unused(),
  /* 220 */ z.unused(),
  /* 221 */ z.unused(),
  /* 222 */ z.unused(),
  /* 223 */ z.unused(),
  /* 224 */ z.unused(),
  /* 225 */ z.unused(),
  /* 226 */ z.mapped("claimSetupLink", ClaimLink.nullish()),
  /* 227 */ z.mapped("identifiers", Identifiers.nullish()),
  /* 228 */ z.unused(),
  /* 229 */ z.opaque(/* directions */),
  /* 230 */ z.unused(),
  /* 231 */ z.unused(),
  /* 232 */ z.unused(),
  /* 233 */ z.unused(),
  /* 234 */ z.unused(),
  /* 235 */ z.unused(),
  /* 236 */ z.unused(),
  /* 237 */ z.unused(),
  /* 238 */ z.unused(),
  /* 239 */ z.unused(),
  /* 240 */ z.opaque(/* flag */), /* 1 */
  /* 241 */ z.opaque(/* contribution policy */),
  /* 242 */ z.unused(),
  /* 243 */ z.mapped("country", z.string().nullish()), /* "HU" */
  /* 244 */ z.unused(),
  /* 245 */ z.mapped("geoHierarchy", GeoHierarchy.nullish()),
  /* 246 */ z.unused(),
  /* 247 */ z.unused(),
  /* 248 */ z.unused(),
  /* 249 */ z.unused(),
  /* 250 */ z.unused(),
  /* 251 */ z.unused(),
  /* 252 */ z.unused(),
  /* 253 */ z.unused(),
  /* 254 */ z.unused(),
  /* 255 */ z.unused(),
  /* 256 */ z.unused(),
  /* 257 */ z.unused(),
  /* 258 */ z.opaque(/* flag */), /* 1 */
  /* 259 */ z.opaque(/* flag */), /* 0 */
  /* 260 */ z.mapped("partnerOffer", PartnerOffer.nullish().catch(null)),
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
  /* 8 */ z.opaque(/* shared result token */), /* "dVZBaqarM8GC1fIPjrCbwAc" */
  /* 9 */ z.opaque(/* per-row ved token */), /* "0ahUKEwjmuZ7Mt6qVAxVBQVUIHQ7YBngQmBkIAigA" */
  /* 10 */ z.opaque(/* header-row metadata */), /* ["restaurants", 0] */
  /* 11 */ z.unused(),
  /* 12 */ z.opaque(/* no-results row: [ved, "search on Google" href] */), /* ["2ahUKEwjKmN2y-M-XAxX7RPEDHZBWIhAQ42ooAHoECAMQAw", "/search?q=nonexistentplacexyzqq&hl=en&authuser=0"] */
  /* 13 */ z.unused(),
  /* 14 */ z.mapped("place", PlaceNode.nullish()),
  /* 15 */ z.unused(),
  /* 16 */ z.unused(),
  /* 17 */ z.unused(),
  /* 18 */ z.opaque(/* no-results row: empty list */), /* [] */
]);

// sponsored hotel card: AdsSection[7][0][i] with our pb, Response[64][i][7] with the web-app pb
export const HotelAdEntry = z.positional([
  /* 0 */ z.mapped("place", PlaceNode.nullish()),
  /* 1 */ z.opaque(/* shared result token (= Response[7]) */), /* "WUDbapeQBZWJ7NYPtJHSQA" */
  /* 2 */ z.opaque(/* per-ad ved token */), /* "2ahUKEwjXoP2UgNCXAxWVBNsEHbSIFAgQ9EsoFXoFCAQQ2RE" */
  /* 3 */ z.unused(),
  /* 4 */ z.opaque(/* flag */), /* 1 */
]);

export const AdDisclosure = z.positional([
  /* 0 */ z.mapped("advertiserDomain", z.string().nullish()), /* "makosguba.hu" */
  /* 1 */ z.opaque(/* why-this-ad sentence (promoted pins only) */), /* "This ad was shown to you based on the map location you're browsing" */
  /* 2 */ z.opaque(/* flag */), /* 0 */
  /* 3 */ z.mapped("reasons", z.array(z.array(z.string().nullish()).nullish()).nullish()), /* [["This ad is based on:"], ["Your current search terms"], ["Google's estimation of your approximate current location"]] */
  /* 4 */ z.mapped("settingsUrl", z.string().nullish()), /* "https://www.google.com/settings/ads/preferences"; ads only */
  /* 5 */ z.mapped("businessName", z.string().nullish()), /* "Mákos Guba Restaurant - Budavár" */
]);

export const AdEntry = z.positional([
  /* 0 */ z.mapped("tagline", z.string().nullish()), /* "Budapest’s award‑winning Neapolitan pizzas promise an unforgettable culinary experience."; HTML (&amp;, <b>); null when the ad has no promo box */
  /* 1 */ z.unused(),
  /* 2 */ z.mapped("cta", z.string().nullish()), /* "Visit Site" */
  /* 3 */ z.mapped("displayUrl", z.string().nullish()), /* "makosguba.hu" */
  /* 4 */ z.mapped("clickUrl", z.string().nullish()), /* "/aclk?sa=L&ai=DChsSEwjd3tqB-8-XAxX8qIMHHaaxIO0YACICCAEQPxoCZWY&co=1&ase=2&gclid=...&adurl&lsa=...&ei=8jrbas-0GNGF7NYP2oLwmAg&rct=j&bp=1&bps=1" */
  /* 5 */ z.opaque(/* map pin for this ad: [[[blockId, position, 0, 0, null, clickUrl], coordinates, name, teaser, ..., featureId@9, ..., headline@12], ..., pinClickUrl@8, ved@10, 7811@11] */), /* [[[[1, 0, 0, 0, null, "/aclk?..."], [null, null, 47.492162, 19.056549], "Traditional Goulash & Langosh Bar by Bonnie", ...]]] */
  /* 6 */ z.opaque(/* flag */), /* 1 */
  /* 7 */ z.unused(),
  /* 8 */ z.unused(),
  /* 9 */ z.opaque(/* shared result token (= Response[7]) */), /* "dVZBaqarM8GC1fIPjrCbwAc" */
  /* 10 */ z.opaque(/* per-ad ved token */), /* "0ahUKEwjmuZ7Mt6qVAxVBQVUIHQ7YBngQkRoI3gooFQ" */
  /* 11 */ z.unused(),
  /* 12 */ z.unused(),
  /* 13 */ z.unused(),
  /* 14 */ z.unused(),
  /* 15 */ z.mapped("place", PlaceNode.nullish()),
  /* 16 */ z.unused(),
  /* 17 */ z.opaque(/* flag */), /* 0 */
  /* 18 */ z.unused(),
  /* 19 */ z.unused(),
  /* 20 */ z.mapped("headline", z.string().nullish()), /* "Skip the Waiting List" */
  /* 21 */ z.mapped("disclosure", AdDisclosure.nullish()),
  /* 22 */ z.opaque(/* tracked click (ctype=99) */), /* "/aclk?sa=L&ai=...&adurl&q&ctype=99" */
  /* 23 */ z.opaque(/* tracked click (bp=1&bps=1), call-tracking ads only */), /* "https://www.google.com/aclk?sa=L&ai=...&adurl=&bp=1&bps=1" */
  /* 24 */ z.opaque(/* call-tracked click */), /* "https://www.google.com/aclk?sa=L&ai=...&adurl=&bp=1&label=local_ad_ps_call_tracked_click" */
  /* 25 */ z.unused(),
  /* 26 */ z.unused(),
  /* 27 */ z.opaque(/* promo-box click */), /* "/aclk?sa=L&ai=...&adurl=&rct=j" */
  /* 28 */ z.opaque(/* promo-box format code */), /* 2 */
  /* 29 */ z.unused(),
  /* 30 */ z.unused(),
  /* 31 */ z.opaque(/* promo-box creative click (label=free_ps_creative) */), /* "/aclk?sa=L&ai=...&adurl&rct=j&bp=1&label=free_ps_creative" */
  /* 32 */ z.unused(),
  /* 33 */ z.unused(),
  /* 34 */ z.mapped("advertiser", z.string().nullish()), /* "By The J.M. Smucker Company"; only when the advertiser is not the place */
  /* 35 */ z.mapped("advertiserIsPlace", z.number().nullish()), /* 1 */
  /* 36 */ z.unused(),
  /* 37 */ z.opaque(/* "About this ad" link: [null, [[aboutThisAdUrl]]] */), /* [null, [["https://adssettings.google.com/aboutthisad?source=maps&reasons=...&hl=en&opi=79508299"]]] */
  /* 38 */ z.unused(),
  /* 39 */ z.opaque(/* absolute tracked click (aclk, adurl empty); exact UI action unverified */), /* "https://www.google.com/aclk?sa=L&ai=...&adurl=" */
  /* 40 */ z.unused(),
  /* 41 */ z.unused(),
  /* 42 */ z.opaque(/* flag */), /* 0 */
  /* 43 */ z.unused(),
  /* 44 */ z.unused(),
  /* 45 */ z.mapped("aiGenerated", z.number().nullish()), /* 1; card shows an "AI" badge (n=2) */
]);

// Response[64][i]: web-app layout, only sent when the pb carries !34m19
export const FeedRow = z.positional([
  /* 0 */ z.unused(),
  /* 1 */ z.mapped("place", PlaceNode.nullish()),
  /* 2 */ z.unused(),
  /* 3 */ z.unused(),
  /* 4 */ z.unused(),
  /* 5 */ z.mapped("ad", AdEntry.nullish().catch(null)),
  /* 6 */ z.unused(),
  /* 7 */ z.mapped("hotelAd", HotelAdEntry.nullish().catch(null)), /* sponsored hotel card ("Sponsored · By Booking.com") */
]);

export const ResultTimezone = z.positional([
  /* 0 */ z.mapped("id", z.string().nullish()), /* "Europe/Budapest" */
  /* 1 */ z.opaque(/* abbreviations and names */), /* ["CET", "Central European Standard Time", "CEST", "Central European Summer Time"] */
  /* 2 */ z.mapped("offsetMinutes", z.number().nullish()), /* 60 */
  /* 3 */ z.opaque(/* DST transitions */), /* [492985, 60, 498025, 0, 501721, 60] */
]);

export const ResultContext = z.positional([
  /* 0 */ z.opaque(/* server time (ms) */), /* "1792751538547" */
  /* 1 */ z.mapped("timezones", z.array(ResultTimezone.nullish()).nullish()), /* timezones covering the results; our pb only */
]);

export const ResultContainer = z.positional([
  /* 0 */ z.mapped("query", z.string().nullish()), /* "restaurants" */
  /* 1 */ z.mapped("rows", z.array(ResultRow.nullish().catch(null)).nullish()),
  /* 2 */ z.unused(),
  /* 3 */ z.opaque(/* page/result flag */), /* 1 */
  /* 4 */ z.unused(),
  /* 5 */ z.mapped("context", ResultContext.nullish()), /* ["1782666870346", [["Europe/Budapest", ["CET", "Central European Standard Time", "CEST", "Central European Summer Time"], 60, [492985, 60, 498025, 0, 501721, 60]]]] */
  /* 6 */ z.unused(),
  /* 7 */ z.unused(),
  /* 8 */ z.unused(),
  /* 9 */ z.opaque(/* lodging result total (some lodging queries) */), /* 3774 */
  /* 10 */ z.unused(),
  /* 11 */ z.opaque(/* flag */), /* 0 */
]);

export const ViewportCamera = z.positional([
  /* 0 */ z.mapped("altitude", z.number().nullish()), /* 2500 */
  /* 1 */ z.mapped("longitude", z.number().nullish()), /* 19.0402 */
  /* 2 */ z.mapped("latitude", z.number().nullish()), /* 47.4979 */
]);

export const ViewportSize = z.positional([
  /* 0 */ z.mapped("width", z.number().nullish()), /* 1024 */
  /* 1 */ z.mapped("height", z.number().nullish()), /* 768 */
]);

export const Viewport = z.positional([
  /* 0 */ z.mapped("camera", ViewportCamera.nullish()),
  /* 1 */ z.opaque(/* camera orientation echo of pb !4m.2 */), /* [0, 0, 0] */
  /* 2 */ z.mapped("size", ViewportSize.nullish()),
  /* 3 */ z.mapped("fieldOfView", z.number().nullish()), /* 13.1 */
]);

export const PromotedPinLabel = z.positional([
  /* 0 */ z.mapped("coordinates", Coordinates.nullish()),
  /* 1 */ z.opaque(/* logo image */), /* "https://tpc.googlesyndication.com/simgad/.../composite_map_square_logo_v2" */
  /* 2 */ z.opaque(/* logo size variants */),
  /* 3 */ z.mapped("headline", z.array(z.string().nullish()).nullish()), /* ["Good Restaurant in Budapest"] */
  /* 4 */ z.unused(),
  /* 5 */ z.opaque(/* flag */), /* 1 */
  /* 6 */ z.mapped("rating", z.number().nullish()), /* 4.8 */
]);

export const PromotedPinCreative = z.positional([
  /* 0 */ z.opaque(/* creative image */), /* "https://tpc.googlesyndication.com/simgad/3654712028956864740" */
  /* 1 */ z.unused(),
  /* 2 */ z.unused(),
  /* 3 */ z.unused(),
  /* 4 */ z.mapped("clickUrl", z.string().nullish()), /* "https://www.google.com/aclk?sa=L&ai=...&adurl&ved=0EO2PAg" */
  /* 5 */ z.mapped("displayUrl", z.string().nullish()), /* "www.makosguba.hu/" */
  /* 6 */ z.unused(),
  /* 7 */ z.mapped("lines", z.array(z.string().nullish()).nullish()), /* ["Good Restaurant in Budapest", "Where tradition is style. ...", "Visit Site"] */
  /* 8 */ z.unused(),
  /* 9 */ z.opaque(/* tour/booking offer: [badge, price, reviewCount, rating, reviewLabel] */), /* ["Free cancellation", "26 900 HUF", 1567, 4.94, "1k+"] */
]);

export const PromotedPin = z.positional([
  /* 0 */ z.mapped("featureId", z.string().nullish()), /* "0x4741dd0067c07c27:0x17279910b3d4d035" */
  /* 1 */ z.mapped("name", z.string().nullish()), /* "Mákos Guba Restaurant - Bazilika" */
  /* 2 */ z.mapped("label", PromotedPinLabel.nullish()),
  /* 3 */ z.mapped("creative", PromotedPinCreative.nullish()),
  /* 4 */ z.opaque(/* adview + click tracking URLs */), /* ["https://www.google.com/adview?skip=a&avs=...", "https://www.google.com/aclk?...", null, null, "https://www.google.com/aclk?...&label=free_ps_website..."] */
  /* 5 */ z.mapped("disclosure", AdDisclosure.nullish()),
  /* 6 */ z.opaque(/* pin style */), /* [16383, 0, null, null, [177, 115, 1469, 179, 248], 0, 1] */
  /* 7 */ z.unused(),
  /* 8 */ z.opaque(/* pin icon/category code */), /* 6 */
  /* 9 */ z.unused(),
  /* 10 */ z.unused(),
  /* 11 */ z.opaque(/* flag */), /* 0 */
  /* 12 */ z.unused(),
  /* 13 */ z.opaque(/* "About this ad" link */), /* [null, [["https://adssettings.google.com/aboutthisad?source=maps&reasons=..."]]] */
  /* 14 */ z.mapped("advertiser", z.string().nullish()), /* "By GetYourGuide" */
  /* 15 */ z.mapped("advertiserIsPlace", z.number().nullish()), /* 1 */
  /* 16 */ z.opaque(/* format codes */), /* [[2], [1]] */
]);

// AdsSection[11]: map-only "promoted pins"; not list cards (no placeId, address, hours)
export const PromotedPins = z.positional([
  /* 0 */ z.mapped("pins", z.array(PromotedPin.nullish().catch(null)).nullish()),
  /* 1 */ z.opaque(/* pin render config (len 41) */), /* [0, 10, null, 1, "https://www.google.com/settings/ads/preferences", null, 32, 40, 27, 30, "https://www.gstatic.com/maps/promotions/promotedpins/square_bg_transparent.png", ...] */
]);

export const AdsSection = z.positional([
  /* 0 */ z.opaque(/* ad block id: random int32 with our pb, 1-based page counter with the web-app pb; = AdEntry[5][0][0][0][0] */), /* 1216951176 */
  /* 1 */ z.mapped("ads", z.array(z.array(AdEntry.nullish().catch(null)).nullish()).nullish()),
  /* 2 */ z.unused(),
  /* 3 */ z.unused(),
  /* 4 */ z.unused(),
  /* 5 */ z.unused(),
  /* 6 */ z.unused(),
  /* 7 */ z.mapped("hotelAds", z.array(z.array(HotelAdEntry.nullish().catch(null)).nullish()).nullish()),
  /* 8 */ z.unused(),
  /* 9 */ z.unused(),
  /* 10 */ z.unused(),
  /* 11 */ z.mapped("promotedPins", PromotedPins.nullish().catch(null)),
  /* 12 */ z.unused(),
  /* 13 */ z.unused(),
  /* 14 */ z.unused(),
  /* 15 */ z.opaque(/* booking-offer index keyed by signed CID, duplicates PlaceNode[260] */), /* [[["1951655465534962032", ["https://www.google.com/aclk?...", "Booking.com", ..., "Book now", "25 232 HUF", ...]]]] */
]);

export const Response = z.positional([
  /* 0 */ z.mapped("results", ResultContainer.nullish()),
  /* 1 */ z.mapped("viewport", Viewport.nullish()),
  /* 2 */ z.mapped("ads", AdsSection.nullish()),
  /* 3 */ z.unused(),
  /* 4 */ z.unused(),
  /* 5 */ z.unused(),
  /* 6 */ z.unused(),
  /* 7 */ z.opaque(/* session token */), /* "dVZBaqarM8GC1fIPjrCbwAc" */
  /* 8 */ z.unused(),
  /* 9 */ z.opaque(/* section/feature type codes */), /* [[[3], [5], [6], [7], [9], [10]]] */
  /* 10 */ z.opaque(/* tile / section descriptors */), /* [["m", [15, 16592, 11268], 12, [784549536, 784549501]]] */
  /* 11 */ z.unused(),
  /* 12 */ z.unused(),
  /* 13 */ z.unused(),
  /* 14 */ z.unused(),
  /* 15 */ z.unused(),
  /* 16 */ z.opaque(/* search-injection / query-refinement metadata */), /* [[[2, "categorical-search-results-injection"]]] */
  /* 17 */ z.unused(),
  /* 18 */ z.unused(),
  /* 19 */ z.unused(),
  /* 20 */ z.unused(),
  /* 21 */ z.opaque(/* section config */), /* [null, null, ["0ahUKEwjmuZ7Mt6qVAxVBQVUIHQ7YBngQnVUIvQsoAA"], [[5, 0, 6, 1, 7, 2, 8, 3, 9, 4], "0ahUKEwjmuZ7Mt6qVAxVBQVUIHQ7YBngQzzgIvgsoAQ"], null, null, null, null, null, null, null, null, null, null, null, "IAE="] */
  /* 22 */ z.unused(),
  /* 23 */ z.opaque(/* category-class flag, meaning unknown (1 on gas/pharmacy/convenience/bank/atm/post/EV and some supermarket queries) */), /* 1 */
  /* 24 */ z.unused(),
  /* 25 */ z.unused(),
  /* 26 */ z.unused(),
  /* 27 */ z.opaque(/* metadata */), /* [9] */
  /* 28 */ z.unused(),
  /* 29 */ z.opaque(/* metadata */), /* [[null, [[3, null, null, "Open now", 1, null, null, null, "0ahUKEwj785y7sKqVAxX22wIHHbexAL4Q_KkBCM8GKBc", [null, null, [1]]]], [[3]], "IAE="]] */
  /* 30 */ z.unused(),
  /* 31 */ z.unused(),
  /* 32 */ z.unused(),
  /* 33 */ z.unused(),
  /* 34 */ z.unused(),
  /* 35 */ z.opaque(/* continuation token */), /* "Q2dBd0Fn" */
  /* 36 */ z.unused(),
  /* 37 */ z.opaque(/* metadata block */), /* [2, "Budapest, 1011", [["0ahUKEwjmuZ7Mt6qVAxVBQVUIHQ7YBngQjqADCMwLKCU", null, "0x4741dc1bf6cc22c1:0xb00c428e9fdf5d3", [null, null, 47.4979, 19.0402], "Budapest, 1011"]]] */
  /* 38 */ z.opaque(/* flag */), /* 0 */
  /* 39 */ z.unused(),
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
  /* 58 */ z.opaque(/* metadata block */), /* [1] */
  /* 59 */ z.unused(),
  /* 60 */ z.unused(),
  /* 61 */ z.unused(),
  /* 62 */ z.unused(),
  /* 63 */ z.unused(),
  /* 64 */ z.mapped("feed", z.array(FeedRow.nullish().catch(null)).nullish()), /* web-app layout (pb !34m19): [[null, PlaceNode], [null x5, AdEntry], [null x7, HotelAdEntry]] */
  /* 65 */ z.unused(),
  /* 66 */ z.opaque(/* ved token */), /* "0ahUKEwjmuZ7Mt6qVAxVBQVUIHQ7YBngQmRkIAQ" */
  /* 67 */ z.unused(),
  /* 68 */ z.unused(),
  /* 69 */ z.opaque(/* flag */), /* 1 */
  /* 70 */ z.unused(),
  /* 71 */ z.opaque(/* metadata block */), /* [1] */
]);

export type Response = z.infer<typeof Response>;
