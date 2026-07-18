import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      openplaces: fileURLToPath(
        new URL("./openplaces/openplaces/index.ts", import.meta.url),
      ),
    },
  },
  test: {
    reporters: ["tree"],
  },
});
