import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    hookTimeout: 20000,
    testTimeout: 20000,
    slowTestThreshold: 10000,
    reporters: ["tree"],
  },
});
