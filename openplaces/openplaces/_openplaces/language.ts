type Prototype = { query: string; location?: string };

const TOKENS = /"[^"]*"|\(|\)|(?<![^\s()])(?:and|or|in)(?![^\s()])|[^\s()]+/gi;
const KEYWORDS = new Set(["(", ")", "and", "or", "in"]);

export function parse(input: string): Prototype[] {
  const tokens = input.match(TOKENS) ?? [];
  if (tokens.length === 0) return [];

  let index = 0;

  const consume = (): string => {
    return tokens[index++];
  };

  const expect = (token: string): boolean => {
    if (peek() !== token) return false;
    index++;
    return true;
  };

  const peek = (): string | undefined => {
    return tokens[index]?.toLowerCase();
  };

  const unquote = (string: string): string => {
    return /^".*"$/.test(string) ? string.slice(1, -1) : string;
  };

  const IN = (): Prototype[] => {
    const results: Prototype[] = [];

    const lefts = OR();
    if (!expect("in")) return lefts;

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
    while (expect("or")) results.push(...AND());
    return results;
  };

  const AND = (): Prototype[] => {
    const results = ATOM();
    while (expect("and")) results.push(...ATOM());
    return results;
  };

  const ATOM = (): Prototype[] => {
    if (expect("(")) {
      const results = IN();
      if (!expect(")")) throw new Error("expected ')'");
      return results;
    }

    const query: string[] = [];

    while (index < tokens.length && !KEYWORDS.has(peek()!)) {
      query.push(unquote(consume()));
    }

    if (query.length === 0) {
      throw new Error(`unexpected ${peek() ? `'${peek()}'` : "end of input"}`);
    }

    return [{ query: query.join(" ") }];
  };

  const results = IN();
  if (index < tokens.length) throw new Error(`unexpected '${peek()}'`);
  return results;
}
