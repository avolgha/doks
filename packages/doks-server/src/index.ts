import "dotenv/config";
import { filterObject, TreeReturn } from "@doks/common";
import fastify from "fastify";
import { promisify } from "node:util";
import zlib from "node:zlib";
import { createTree } from "./tree.js";

const pBrotli = promisify(zlib.brotliCompress);

(async () => {
  const tree = await createTree();
  const server = fastify({
    logger: true,
  });

  console.log(Array.from(tree.entries()));

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
})();
