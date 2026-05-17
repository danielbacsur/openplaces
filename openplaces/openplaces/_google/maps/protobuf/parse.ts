import { Node } from "./schema";
import { tokenize } from "./tokenize";

export function parse(input: string): Node[] {
  const tokens = tokenize(input);

  const consume = (from: number, to: number): Node[] => {
    const nodes: Node[] = [];

    let index = from;

    while (index < to) {
      const token = tokens[index++];

      if (token.type === "m") {
        const children = consume(index, Math.min(index + token.value, to));

        nodes.push(Node.parse({ tag: token.tag, type: "m", children }));
        index = Math.min(index + token.value, to);
      } else {
        nodes.push(Node.parse(token));
      }
    }

    return nodes;
  };

  return consume(0, tokens.length);
}
