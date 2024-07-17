import { sortKeys } from "./sortKeys";

export function createList(
  state: Record<string, unknown>,
  container: HTMLElement,
  path: string = ""
) {
  const list = document.createElement("ul");

  for (const key of sortKeys(state)) {
    const isDir = typeof state[key] === "object";

    const entry = document.createElement("li");
    entry.innerText = key;
    entry.setAttribute("data-tree-path", `${path}${key}`);
    list.appendChild(entry);

    if (isDir) {
      // @ts-expect-error -- types are confusing here but there is unfortunately no other good looking way
      const record: Record<string, unknown> = state[key];

      // NOTE(avolgha): Little hack because of some problems with
      //                going down the tree too far.
      if (typeof record[Object.keys(record)[0]] !== "object") {
        entry.classList.add("tree-end");
        continue;
      }

      const childList = createList(record, list, `${path}${key}.`);

      entry.addEventListener("click", () => {
        entry.classList.toggle("tree-arrow-collapse");
        childList.classList.toggle("tree-collapse");
      });
    } else {
      entry.classList.add("tree-end");
    }
  }
  container.appendChild(list);

  return list;
}
