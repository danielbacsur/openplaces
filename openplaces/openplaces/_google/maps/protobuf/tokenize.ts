import { Token } from "./schema";

export function tokenize(input: string): Token[] {
  const matches = Array.from(input.matchAll(/!(\d+)([bdefiszm])([^!]*)/g));

  return matches.map(([, tag, type, value]) =>
    Token.parse({ tag, type, value }),
  );
}
