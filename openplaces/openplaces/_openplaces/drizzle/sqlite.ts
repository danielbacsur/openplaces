import { fileURLToPath } from "node:url";

import { type SQLiteAsyncDatabase } from "drizzle-orm/sqlite-core";

export type Database = SQLiteAsyncDatabase<"sync", unknown> & {
  close(): void;
};

const migrationsFolder = fileURLToPath(
  new URL("./migrations", import.meta.url),
);

export const sqlite = async (): Promise<Database> => {
  const { default: Database } = await import("better-sqlite3");
  const { drizzle } = await import("drizzle-orm/better-sqlite3");
  const { migrate } = await import("drizzle-orm/better-sqlite3/migrator");

  const sqlite = new Database(":memory:");
  const db = drizzle(sqlite);
  migrate(db, { migrationsFolder });
  return Object.assign(db, { close: () => sqlite.close() });
};
