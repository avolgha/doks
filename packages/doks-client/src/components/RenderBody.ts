import { fetchContent } from "../util/fetchContent";
import { getTree } from "../util/getTree";
import { renderContent } from "../util/renderContent";
import type { Unpromise } from "../util/types";

export default async function RenderBody(
  tree: Unpromise<typeof getTree>,
  main: HTMLElement,
  path: string
) {
  const treeObject = tree.get(path);
  if (!treeObject) {
    throw new Error("Tree was not built successfully.");
  }

  const { id, title, createdAt, updatedAt } = treeObject;
  let content;
  if (!treeObject.content) {
    content = await fetchContent(id);
    content = await renderContent(content);
    treeObject.content = content;
    tree.set(path, treeObject);
  } else {
    content = treeObject.content;
  }

  const header = document.createElement("h1");
  header.innerText = title;

  const subheader = document.createElement("span");
  const timeFormat = new Intl.DateTimeFormat("de", {
    dateStyle: "short",
    timeStyle: "short",
  });
  if (createdAt.getTime() === updatedAt.getTime()) {
    subheader.innerText = `(${timeFormat.format(createdAt)})`;
  } else {
    subheader.innerText = `(Created: ${timeFormat.format(
      createdAt
    )} / Updated: ${timeFormat.format(updatedAt)})`;
  }

  const body = document.createElement("div");
  body.innerHTML = content;

  main.innerHTML = "";
  main.append(header, subheader, body);
}
