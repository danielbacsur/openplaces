import { cp, glob, readFile, writeFile } from "node:fs/promises";
import { dirname, relative } from "node:path";

import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["openplaces/**/*.ts", "!openplaces/**/*.test.ts"],

  format: "esm",

  treeshake: true,
  unbundle: true,
  clean: true,
  dts: true,

  hooks: {
    "build:done": async () => {
      const entry = "dist/index.d.mts";

      const imports: string[] = [];

      for await (const file of glob("dist/**/*.d.mts")) {
        if (file === entry) continue;

        const content = await readFile(file, "utf8");
        if (!content.includes('declare module "openplaces"')) continue;

        const rel =
          "./" + relative(dirname(entry), file).replace(/\.d\.mts$/, ".mjs");
        imports.push(`import "${rel}";`);
      }

      if (imports.length > 0) {
        const banner = imports.join("\n") + "\n\n";

        const current = await readFile(entry, "utf8");

        if (!current.startsWith(imports[0])) {
          await writeFile(entry, banner + current);
        }
      }

      await cp(
        "openplaces/_openplaces/drizzle/migrations",
        "dist/_openplaces/drizzle/migrations",
        { recursive: true },
      );
    },
  },
});
