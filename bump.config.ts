import { defineConfig } from "bumpp";
import path from "node:path";

export default defineConfig({
  commit: "chore: publish openplaces v%s to npm registry",
  tag: "v%s",

  install: true,
  push: true,

  execute: (op) => {
    op.update({
      updatedFiles: [
        ...op.state.updatedFiles,
        path.resolve(op.options.cwd, "package-lock.json"),
      ],
    });
  },

  files: ["openplaces/package.json", "openplaces-mcp/package.json"],
});
