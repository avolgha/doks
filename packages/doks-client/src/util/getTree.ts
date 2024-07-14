import { TreeObject } from "@doks/common";

export async function getTree() {
  const url = `http://${window.location.hostname}:8001/all`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request ended with status code: ${response.status}`);
  }

  const entries: TreeObject[] = await response.json();
  const map = new Map<
    string,
    {
      id: number;
      title: string;
      updatedAt: Date;
      createdAt: Date;
      content: string | undefined;
    }
  >();

  for (const entry of entries) {
    map.set(entry.path.substring(1).replace(/\//g, "."), {
      id: entry.id,
      title: entry.title,
      updatedAt: new Date(entry.updatedAt),
      createdAt: new Date(entry.createdAt),
      content: undefined,
    });
  }

  return map;
}
