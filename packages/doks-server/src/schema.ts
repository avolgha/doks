import { serial } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core";
import { pgTable, text } from "drizzle-orm/pg-core";

export const documents = pgTable("documents", {
  id: serial("id").primaryKey().unique(),
  path: text("path").unique().notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
});
