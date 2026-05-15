import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["openplaces/index.ts"],

  format: "esm",

  treeshake: true,
  clean: true,
  dts: true,
});
