import { unflatten } from "flat";
import { getTree } from "../util/getTree";
import { createList } from "../util/createList";
import RenderBody from "./RenderBody";

export default async function DrawApp(root: HTMLDivElement) {
  const tree = await getTree();

  const workingOn: Record<string, unknown> = unflatten(
    Object.fromEntries(tree.entries())
  );

  const sidebar = document.createElement("aside");
  const main = document.createElement("main");
  createList(workingOn, sidebar).classList.add("tree");

  root.appendChild(sidebar);
  root.appendChild(main);

  document.querySelectorAll(".tree-end").forEach(async (end) => {
    if (!(end instanceof HTMLElement)) return;

    const path = end.dataset.treePath;
    if (!path) {
      throw new Error("Tree was not built successfully.");
    }

    end.addEventListener("click", () => RenderBody(tree, main, path));
  });
}
