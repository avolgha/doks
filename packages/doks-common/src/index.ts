import { AsyncLazy } from "./lazy.js";

export interface TreeObject {
  id: number;
  title: string;
  path: string;
  createdAt: Date;
  updatedAt: Date;
  content: AsyncLazy<string>;
}

export type TreeReturn = Omit<TreeObject, "content">;

export * from "./filterObject.js";
export * from "./lazy.js";
