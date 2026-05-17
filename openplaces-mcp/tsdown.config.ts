import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["openplaces-mcp/index.ts"],

  format: "esm",
  
  clean: true,
});
