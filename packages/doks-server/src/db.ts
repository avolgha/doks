import { asyncLazy } from "@doks/common";
import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

const client = new pg.Client({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5433"),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

declare interface AggregateError extends Error {
  errors: Error[];
}

export const db = asyncLazy(async () => {
  await client.connect().catch((error) => {
    if (error instanceof Error && (error as Error).name === "AggregateError") {
      console.log(
        "error: multiple errors occurred while connecting to postgres:"
      );
      (error as AggregateError).errors.forEach((error, i) => {
        console.log(` (${i}) [${error.name}] ${error.message}`);
      });
    } else {
      console.error(`error: could not establish postgres connection: ${error}`);
    }
    process.exit(1);
  });
  return drizzle(client);
});
