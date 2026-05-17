export function prompt(strings: TemplateStringsArray, ...values: unknown[]) {
  return strings
    .reduce((acc, str, i) => acc + str + (values[i] ?? ""), "")
    .trim()
    .split("\n")
    .map((line) => line.trim())
    .join("\n");
}
