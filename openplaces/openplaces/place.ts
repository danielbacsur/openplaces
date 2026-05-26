import { z } from "zod";

export const Place = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string().optional(),
  categories: z.array(z.string()).optional(),
  latitude: z.number(),
  longitude: z.number(),
  address: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().optional(),
  rating: z.number().optional(),
  reviews: z.string().optional(),
  price: z.string().optional(),
});

export type Place = z.infer<typeof Place>;
