import "dotenv/config";
import { filterObject, TreeReturn } from "@doks/common";
import fastify from "fastify";
import { promisify } from "node:util";
import zlib from "node:zlib";
import { createTree } from "./tree.js";
import { read } from "read";

const pBrotli = promisify(zlib.brotliCompress);

(async () => {
  let tree = await createTree();
  const server = fastify({
    logger: true,
  });

  server.get("/all", () =>
    Array.from(tree.values()).map(
      (original) => filterObject({ original, exclude: "content" }) as TreeReturn
    )
  );

  server.get<{
    Params: {
      id: string;
    };
  }>("/content/:id", async (req) => {
    const id = parseInt(req.params.id);
    const treeEntry = tree.get(id);

    if (treeEntry) {
      return await treeEntry.content().then(pBrotli);
    }
  });

  await server.listen({
    port: 8001,
  });

  let key: string;
  while (true) {
    key = await read({});

    const actions: Record<string, () => void> = {
      async r() {
        tree = await createTree();
        server.log.info("tree reloaded");
      },
      async q() {
        await server.close();
        process.exit(0);
      },
    };

    if (key in actions) {
      actions[key]();
    }
  }
})();
