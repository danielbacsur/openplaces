import { describe, expect, it } from "vitest";

import { parse } from "./language";

describe("parse", () => {
  describe("bare queries", () => {
    it("parses a single bare word as one query result", () => {
      expect(parse("a")).toEqual([{ query: "a" }]);
    });

    it("joins consecutive words into a single query", () => {
      expect(parse("a b")).toEqual([{ query: "a b" }]);
    });
  });

  describe("and / or", () => {
    it("splits queries with the 'and' or 'or' keywords", () => {
      expect(parse("a and b")).toEqual([{ query: "a" }, { query: "b" }]);
      expect(parse("a or b")).toEqual([{ query: "a" }, { query: "b" }]);
    });

    it("chains many 'and' or 'or' separators in a row", () => {
      expect(parse("a and b and c")).toEqual([
        { query: "a" },
        { query: "b" },
        { query: "c" },
      ]);

      expect(parse("a or b or c")).toEqual([
        { query: "a" },
        { query: "b" },
        { query: "c" },
      ]);
    });

    it("interleaves the 'and' and 'or' keywords freely", () => {
      expect(parse("a and b or c")).toEqual([
        { query: "a" },
        { query: "b" },
        { query: "c" },
      ]);
    });
  });

  describe("in", () => {
    it("attaches one location with the 'in' keyword", () => {
      expect(parse("a in x")).toEqual([{ query: "a", location: "x" }]);
    });

    it("shares a single location across many queries", () => {
      expect(parse("a and b in x")).toEqual([
        { query: "a", location: "x" },
        { query: "b", location: "x" },
      ]);
    });

    it("shares a single query across many locations", () => {
      expect(parse("a in x and y")).toEqual([
        { query: "a", location: "x" },
        { query: "a", location: "y" },
      ]);
    });

    it("cross-products many queries with many locations", () => {
      expect(parse("a and b in x and y")).toEqual([
        { query: "a", location: "x" },
        { query: "a", location: "y" },
        { query: "b", location: "x" },
        { query: "b", location: "y" },
      ]);
    });
  });

  describe("parentheses", () => {
    it("ignores parentheses around a single bare query", () => {
      expect(parse("(a)")).toEqual([{ query: "a" }]);
    });

    it("scopes the 'in' keyword inside parentheses", () => {
      expect(parse("a and (b in x)")).toEqual([
        { query: "a" },
        { query: "b", location: "x" },
      ]);
    });

    it("groups many queries inside parentheses with in", () => {
      expect(parse("(a and b) in x")).toEqual([
        { query: "a", location: "x" },
        { query: "b", location: "x" },
      ]);
    });

    it("handles arbitrarily deep nested expressions", () => {
      expect(parse("a and (((b and c) in x) or (d in y))")).toEqual([
        { query: "a" },
        { query: "b", location: "x" },
        { query: "c", location: "x" },
        { query: "d", location: "y" },
      ]);
    });
  });

  describe("malformed input", () => {
    it("returns an empty result for blank or empty input", () => {
      expect(parse("")).toEqual([]);
      expect(parse("   ")).toEqual([]);
    });

    it("throws when a query is missing before a keyword", () => {
      expect(() => parse("and a")).toThrow(/unexpected 'and'/);
      expect(() => parse("or a")).toThrow(/unexpected 'or'/);
      expect(() => parse("in x")).toThrow(/unexpected 'in'/);
    });

    it("throws when a query is missing after a keyword", () => {
      expect(() => parse("a and")).toThrow(/unexpected end of input/);
      expect(() => parse("a or")).toThrow(/unexpected end of input/);
      expect(() => parse("a in")).toThrow(/unexpected end of input/);
    });

    it("throws for unbalanced parentheses in the input", () => {
      expect(() => parse("(a")).toThrow(/expected '\)'/);
      expect(() => parse("a)")).toThrow(/unexpected '\)'/);
    });

    it("throws on empty parentheses with no inner query", () => {
      expect(() => parse("()")).toThrow(/unexpected '\)'/);
    });

    it("throws when there are unconsumed trailing tokens", () => {
      expect(() => parse("a in x in y")).toThrow(/unexpected 'in'/);
    });
  });
});
