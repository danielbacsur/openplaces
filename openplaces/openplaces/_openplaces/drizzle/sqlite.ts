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

  throw new Error();
};
