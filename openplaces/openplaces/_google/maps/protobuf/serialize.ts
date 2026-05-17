import { Node, Token } from "./schema";

export function serialize(nodes: Node[]): string {
  const flatten = (nodes: Node[]): Token[] => {
    const tokens: Token[] = [];

    for (const node of nodes) {
      if (node.type === "m") {
        const children = flatten(node.children);

        tokens.push(
          Token.parse({ tag: node.tag, type: "m", value: children.length }),
          ...children,
        );
      } else {
        tokens.push(Token.parse(node));
      }
    }

    return tokens;
  };

  return flatten(nodes)
    .map((t) => `!${t.tag}${t.type}${t.value}`)
    .join("");
}
