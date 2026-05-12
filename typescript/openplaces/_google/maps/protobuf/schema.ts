import { z } from "zod";

export const Type = z.enum(["b", "d", "e", "f", "i", "s", "z", "m"]);
export type Type = z.infer<typeof Type>;

const B = z.object({
  tag: z.coerce.number().int().nonnegative(),
  type: z.literal("b"),
  value: z.coerce.number().int(),
});

const D = z.object({
  tag: z.coerce.number().int().nonnegative(),
  type: z.literal("d"),
  value: z.coerce.number(),
});

const E = z.object({
  tag: z.coerce.number().int().nonnegative(),
  type: z.literal("e"),
  value: z.coerce.number().int(),
});

const F = z.object({
  tag: z.coerce.number().int().nonnegative(),
  type: z.literal("f"),
  value: z.coerce.number(),
});

const I = z.object({
  tag: z.coerce.number().int().nonnegative(),
  type: z.literal("i"),
  value: z.coerce.number().int(),
});

const S = z.object({
  tag: z.coerce.number().int().nonnegative(),
  type: z.literal("s"),
  value: z.string(),
});

const Z = z.object({
  tag: z.coerce.number().int().nonnegative(),
  type: z.literal("z"),
  value: z.string(),
});

export const Token = z.union([
  B, D, E, F, I, S, Z,
  z.object({
    tag: z.coerce.number().int().nonnegative(),
    type: z.literal("m"),
    value: z.coerce.number().int(),
  }),
]);

export type Token = z.infer<typeof Token>;

export const Node = z.union([
  B, D, E, F, I, S, Z,
  z.object({
    tag: z.coerce.number().int().nonnegative(),
    type: z.literal("m"),
    get children() { return z.array(Node); },
  }),
]);

export type Node = z.infer<typeof Node>;
