import { fileURLToPath } from "node:url";

import { type SQLiteAsyncDatabase } from "drizzle-orm/sqlite-core";

export type Database = SQLiteAsyncDatabase<"sync", unknown> & {
  close(): void;
};

const _import = (specifier: string) => import(specifier);

const migrationsFolder = fileURLToPath(
  new URL("./migrations", import.meta.url),
);

export const sqlite = async (): Promise<Database> => {
  try {
    const { Database } = await _import("bun:sqlite");
    const { drizzle } = await import("drizzle-orm/bun-sqlite");
    const { migrate } = await import("drizzle-orm/bun-sqlite/migrator");

    const sqlite = new Database(":memory:");
    const db = drizzle(sqlite);
    migrate(db, { migrationsFolder });
    return Object.assign(db, { close: () => sqlite.close() });
  } catch {}

  try {
    const { default: Database } = await _import("better-sqlite3");
    const { drizzle } = await import("drizzle-orm/better-sqlite3");
    const { migrate } = await import("drizzle-orm/better-sqlite3/migrator");

    const sqlite = new Database(":memory:");
    const db = drizzle(sqlite);
    migrate(db, { migrationsFolder });
    return Object.assign(db, { close: () => sqlite.close() });
  } catch {}

  try {
    const { DatabaseSync } = await _import("node:sqlite");
    const { drizzle } = await import("drizzle-orm/node-sqlite");
    const { migrate } = await import("drizzle-orm/node-sqlite/migrator");

    const sqlite = new DatabaseSync(":memory:");
    const db = drizzle(sqlite);
    migrate(db, { migrationsFolder });
    return Object.assign(db, { close: () => sqlite.close() });
  } catch {}

  const reset = "\x1b[0m";
  const bold = "\x1b[1m";
  const dim = "\x1b[2m";
  const red = "\x1b[31m";
  const cyan = "\x1b[36m";

  console.error(
    `\n${red}${bold}Error:${reset} ` +
      `No SQLite driver is available for the where option\n\n` +
      `${dim}The where filter runs on SQLite. ` +
      `Install ${reset}${cyan}better-sqlite3${reset}${dim}, ` +
      `or use ${reset}${cyan}Node.js 22.13+${reset}${dim}, ` +
      `${reset}${cyan}Bun 1.0+${reset}${dim}, or ${reset}${cyan}Deno 2.2+${reset}${dim}, ` +
      `which ship SQLite built in.${reset}\n`,
  );

  process.exit(1);
};
