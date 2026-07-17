import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./openplaces/_openplaces/drizzle/schema.ts",
  out: "./openplaces/_openplaces/drizzle/migrations",
});
