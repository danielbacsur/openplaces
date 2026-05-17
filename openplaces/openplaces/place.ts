import { z } from "zod";

export const Place = z.object({
  id: z.string(),
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  phone: z.string().optional(),
  website: z.string().optional(),
});

export type Place = z.infer<typeof Place>;
