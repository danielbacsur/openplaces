import { z } from "zod";

type Mapped<K extends string, S extends z.ZodType> = {
  type: "mapped";
  key: K;
  schema: S;
};

export const mapped = <K extends string, S extends z.ZodType>(
  key: K,
  schema: S,
): Mapped<K, S> => ({ type: "mapped", key, schema });

type Unused = { type: "unused" };

export const unused = (): Unused => ({ type: "unused" });

type Opaque = { type: "opaque" };

export const opaque = (): Opaque => ({ type: "opaque" });

type Item = Mapped<string, z.ZodType> | Unused | Opaque;

type Entry<T> =
  T extends Mapped<infer K, infer S> ? { [P in K]: z.output<S> } : {};

type Intersect<U> = (U extends unknown ? (arg: U) => void : never) extends (
  arg: infer I,
) => void
  ? I
  : never;

type Simplify<T> = { [K in keyof T]: T[K] } & {};

type Shape<Items extends readonly Item[]> = Simplify<
  Intersect<{ [I in keyof Items]: Entry<Items[I]> }[number]>
>;

export function positional<const Items extends readonly Item[]>(
  items: Items,
): z.ZodType<Shape<Items>, unknown> {
  return z.unknown().transform((input, ctx) => {
    if (!Array.isArray(input)) {
      ctx.addIssue({
        code: "custom",
        message: `Expected an array, received ${typeof input}`,
      });

      return z.NEVER;
    }

    const out: Record<string, unknown> = {};

    items.forEach((slot, index) => {
      if (slot.type !== "mapped") return;

      const result = slot.schema.safeParse(input[index]);

      if (result.success) {
        out[slot.key] = result.data;
      } else {
        for (const issue of result.error.issues) {
          ctx.addIssue({
            code: "custom",
            message: issue.message,
            path: [index, ...issue.path],
            input: input[index],
          });
        }
      }
    });

    return out as Shape<Items>;
  }) as unknown as z.ZodType<Shape<Items>, unknown>;
}

export * from "zod";
