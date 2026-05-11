type Prototype = { query: string; location?: string };

const KEYWORDS = new Set(["(", ")", "and", "or", "in"]);

export function parse(input: string): Prototype[] {
  const tokens = input.match(/\(|\)|\band\b|\bor\b|\bin\b|[^\s()]+/gi) ?? [];

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
      index++;
      return results;
    }
    const query: string[] = [];
    while (index < tokens.length && !KEYWORDS.has(peek()!)) {
      query.push(tokens[index++]);
    }
    return [{ query: query.join(" ") }];
  };

  return IN();
}
