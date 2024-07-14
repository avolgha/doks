import { asyncLazy, type AsyncLazy } from "@doks/common";
import { eq } from "drizzle-orm";
import { db as useDb } from "./db.js";
import { documents } from "./schema.js";

export type Tree = Map<number, TreeObject>;

export interface TreeObject {
  id: number;
  title: string;
  path: string;
  createdAt: Date;
  updatedAt: Date;
  content: AsyncLazy<string>;
}

export async function createTree() {
  const map: Tree = new Map();
  const db = await useDb();

  const entries = await db
    .select({
      id: documents.id,
      title: documents.title,
      path: documents.path,
      createdAt: documents.createdAt,
      updatedAt: documents.updatedAt,
    })
    .from(documents);

  for (const entry of entries) {
    map.set(entry.id, {
      ...entry,
      content: asyncLazy(async function () {
        const contentEntry = await db
          .select({
            content: documents.content,
          })
          .from(documents)
          .where(eq(documents.id, entry.id));

        if (contentEntry.length < 1) {
          throw new Error("Database was modified while server was running.");
        }

        return contentEntry[0].content;
      }),
    });
  }

  return map;
}
