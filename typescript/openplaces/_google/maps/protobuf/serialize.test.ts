import { describe, expect, it } from "vitest";

import { serialize } from "./serialize";

describe("serialize", () => {
  describe("flat node lists", () => {
    it("serializes a single scalar node to one token", () => {
      expect(serialize([{ tag: 1, type: "s", value: "hello" }])).toBe(
        "!1shello",
      );
    });

    it("serializes a sequence of scalar nodes in order", () => {
      expect(
        serialize([
          { tag: 1, type: "s", value: "hi" },
          { tag: 2, type: "i", value: 7 },
        ]),
      ).toBe("!1shi!2i7");
    });

    it("returns an empty string when given no input nodes", () => {
      expect(serialize([])).toBe("");
    });
  });

  describe("nested message nodes", () => {
    it("emits a message header with its child-token count", () => {
      expect(
        serialize([
          {
            tag: 1,
            type: "m",
            children: [
              { tag: 2, type: "s", value: "x" },
              { tag: 3, type: "i", value: 9 },
            ],
          },
        ]),
      ).toBe("!1m2!2sx!3i9");
    });

    it("counts nested message headers in the parent count", () => {
      expect(
        serialize([
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
        ]),
      ).toBe("!1m3!2m1!3i5!4sx");
    });

    it("emits siblings after a message at the same level", () => {
      expect(
        serialize([
          {
            tag: 1,
            type: "m",
            children: [{ tag: 2, type: "s", value: "x" }],
          },
          { tag: 3, type: "i", value: 9 },
        ]),
      ).toBe("!1m1!2sx!3i9");
    });
  });
});
