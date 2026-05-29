import { z } from "zod";

export const Place = z.object({
  id: z.string(),
  name: z.string(),
  localName: z.string().optional(),
  category: z.string().optional(),
  categories: z.array(z.string()).optional(),
  description: z.string().optional(),
  latitude: z.number(),
  longitude: z.number(),
  timezone: z.string().optional(),
  address: z.string().optional(),
  street: z.string().optional(),
  district: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().optional(),
  logo: z.string().optional(),
  rating: z.number().optional(),
  reviews: z.string().optional(),
  price: z.string().optional(),

  hours: z
    .object({
      status: z.string().optional(),
      detail: z.string().optional(),
      color: z.string().optional(),
    })
    .optional(),

  services: z
    .array(z.object({ label: z.string(), available: z.boolean() }))
    .optional(),
  accessible: z.boolean().optional(),

  image: z.string().optional(),
});

export type Place = z.infer<typeof Place>;
