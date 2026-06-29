import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["openplaces-atlas/index.ts"],

  format: "esm",

  clean: true,
});
