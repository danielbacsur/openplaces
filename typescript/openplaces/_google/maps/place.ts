import { z } from "zod";

export const Place = z.preprocess(
  (raw: any) => ({
    id: raw?.[14]?.[78],
    name: raw?.[14]?.[11],
    latitude: raw?.[14]?.[9]?.[2],
    longitude: raw?.[14]?.[9]?.[3],
    phone: raw?.[14]?.[178]?.[0]?.[0] ?? undefined,
    website: raw?.[14]?.[7]?.[1] ?? undefined,
  }),
  z.object({
    id: z.string(),
    name: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    phone: z.string().optional(),
    website: z.string().optional(),
  }),
);

export type Place = z.infer<typeof Place>;
