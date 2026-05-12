type Prototype = { query: string; location?: string };

const KEYWORDS = new Set(["(", ")", "and", "or", "in"]);

export function parse(input: string): Prototype[] {
  const tokens =
    input.match(
      /"[^"]*"|\(|\)|(?<![^\s()])(?:and|or|in)(?![^\s()])|[^\s()]+/gi,
    ) ?? [];

  if (tokens.length === 0) return [];

  const peek = () => tokens[index]?.toLowerCase();

  let index = 0;

  const IN = (): Prototype[] => {
    const results: Prototype[] = [];
    const lefts = OR();
    if (peek() !== "in") return lefts;
    index++;
    const rights = OR();
    for (const left of lefts) {
      for (const right of rights) {
        results.push({ ...left, location: right.query });
      }
    }
    return results;
  };

  const OR = (): Prototype[] => {
    const results = AND();
    while (peek() === "or") {
      index++;
      results.push(...AND());
    }
    return results;
  };

  const AND = (): Prototype[] => {
    const results = ATOM();
    while (peek() === "and") {
      index++;
      results.push(...ATOM());
    }
    return results;
  };

  const ATOM = (): Prototype[] => {
    if (peek() === "(") {
      index++;
      const results = IN();
      if (peek() !== ")") throw new Error("expected ')'");
      index++;
      return results;
    }
    const query: string[] = [];
    while (index < tokens.length && !KEYWORDS.has(peek()!)) {
      const token = tokens[index++];
      query.push(/^".*"$/.test(token) ? token.slice(1, -1) : token);
    }
    if (query.length === 0) {
      const token = peek();
      throw new Error(
        token ? `unexpected '${token}'` : "unexpected end of input",
      );
    }
    return [{ query: query.join(" ") }];
  };

  const results = IN();

  if (index < tokens.length) {
    throw new Error(`unexpected '${peek()}'`);
  }

  return results;
}
