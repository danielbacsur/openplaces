import { describe, expect, it } from "vitest";

import { parse } from "./parse";

describe("parse", () => {
  describe("flat token streams", () => {
    it("parses a single scalar token as one flat tree node", () => {
      expect(parse("!1shello")).toEqual([
        { tag: 1, type: "s", value: "hello" },
      ]);
    });

    it("parses a sequence of scalar tokens in source order", () => {
      expect(parse("!1shi!2i7")).toEqual([
        { tag: 1, type: "s", value: "hi" },
        { tag: 2, type: "i", value: 7 },
      ]);
    });

    it("returns an empty array when input has no tokens", () => {
      expect(parse("")).toEqual([]);
    });
  });

  describe("nested message tokens", () => {
    it("groups the next n tokens as children of a message", () => {
      expect(parse("!1m2!2sx!3i9")).toEqual([
        {
          tag: 1,
          type: "m",
          children: [
            { tag: 2, type: "s", value: "x" },
            { tag: 3, type: "i", value: 9 },
          ],
        },
      ]);
    });

    it("nests a message inside another message correctly", () => {
      expect(parse("!1m3!2m1!3i5!4sx")).toEqual([
        {
          tag: 1,
          type: "m",
          children: [
            {
              tag: 2,
              type: "m",
              children: [{ tag: 3, type: "i", value: 5 }],
            },
            { tag: 4, type: "s", value: "x" },
          ],
        },
      ]);
    });

    it("keeps siblings beside a message at the same level", () => {
      expect(parse("!1m1!2sx!3i9")).toEqual([
        {
          tag: 1,
          type: "m",
          children: [{ tag: 2, type: "s", value: "x" }],
        },
        { tag: 3, type: "i", value: 9 },
      ]);
    });
  });
});
