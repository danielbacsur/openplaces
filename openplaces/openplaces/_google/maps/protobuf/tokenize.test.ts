import { describe, expect, it } from "vitest";

import { tokenize } from "./tokenize";

describe("tokenize", () => {
  describe("scalar tokens", () => {
    it("captures a string token alongside its tag and value", () => {
      expect(tokenize("!1shello")).toEqual([
        { tag: 1, type: "s", value: "hello" },
      ]);
    });

    it("coerces integer token values into actual numbers", () => {
      expect(tokenize("!2i42")).toEqual([
        { tag: 2, type: "i", value: 42 },
      ]);
    });

    it("coerces double token values into floating-point", () => {
      expect(tokenize("!3d3.14")).toEqual([
        { tag: 3, type: "d", value: 3.14 },
      ]);
    });

    it("captures a message token with its child-token count", () => {
      expect(tokenize("!4m2")).toEqual([
        { tag: 4, type: "m", value: 2 },
      ]);
    });
  });

  describe("token sequences", () => {
    it("tokenizes a flat sequence in left-to-right order", () => {
      expect(tokenize("!1shi!2i7")).toEqual([
        { tag: 1, type: "s", value: "hi" },
        { tag: 2, type: "i", value: 7 },
      ]);
    });

    it("handles message headers mixed with scalar tokens", () => {
      expect(tokenize("!1m2!2sx!3i9")).toEqual([
        { tag: 1, type: "m", value: 2 },
        { tag: 2, type: "s", value: "x" },
        { tag: 3, type: "i", value: 9 },
      ]);
    });

    it("returns an empty array when given an empty string", () => {
      expect(tokenize("")).toEqual([]);
    });

    it("skips leading characters that do not start a token", () => {
      expect(tokenize("garbage!1shello")).toEqual([
        { tag: 1, type: "s", value: "hello" },
      ]);
    });
  });
});
