import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./openplaces", import.meta.url)),
    },
  },

  test: {
    reporters: ["tree"],
  },
});
