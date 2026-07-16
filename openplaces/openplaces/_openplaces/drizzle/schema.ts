import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

// prettier-ignore
export const places = sqliteTable("places", {
  id: text().primaryKey(),
  name: text().notNull(),
  localName: text(),
  category: text(),
  categories: text({ mode: "json" }).$type<string[]>(),
  description: text(),
  latitude: real().notNull(),
  longitude: real().notNull(),
  timezone: text(),
  address: text(),
  street: text(),
  district: text(),
  city: text(),
  postalCode: text(),
  country: text(),
  phone: text(),
  website: text(),
  logo: text(),
  rating: real(),
  reviews: text(),
  price: text(),
  hours: text({ mode: "json" }).$type<{
    status?: string;
    detail?: string;
    color?: string;
  }>(),
  services: text({ mode: "json" }).$type<{
    label: string;
    available: boolean;
  }[]>(),
  accessible: integer({ mode: "boolean" }),
  reserve: text(),
  sponsored: integer({ mode: "boolean" }),
  image: text(),
});
