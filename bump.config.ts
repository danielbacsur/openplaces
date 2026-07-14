import { defineConfig } from "bumpp";
import path from "node:path";

export default defineConfig({
  commit: "chore: publish openplaces v%s to npm registry",
  tag: "v%s",

  install: true,
  push: true,

  execute: (operation) => {
    operation.update({
      updatedFiles: [
        ...operation.state.updatedFiles,
        path.resolve(operation.options.cwd, "package-lock.json"),
      ],
    });
  },

  files: [
    "openplaces/package.json",
    "openplaces-atlas/package.json",
    "openplaces-mcp/package.json",
  ],
});
