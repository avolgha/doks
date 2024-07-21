import * as fs from "node:fs";
import http from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { watch } from "rollup";

const mainDir = join(dirname(fileURLToPath(import.meta.url)), "..");

(async () => {
  const { default: config } = await import("../rollup.config.mjs");
  const watcher = watch(config);

  // Because we dont build two different bundles **yet**
  // "START" and "END" codes are redundant.
  // They will be only usefull when used with multiple different
  // bundles.
  watcher.on("event", (event) => {
    switch (event.code) {
      case "START":
        // console.log("info : rollup started");
        break;
      case "END":
        // console.log("info : rollup ended");
        break;
      case "BUNDLE_START":
        console.log("info : starting creating bundle...");
        break;
      case "BUNDLE_END":
        console.log(
          `info : bundle created after ${(event.duration / 1000).toFixed(
            3
          )}sec in ${event.output.join(", ")}.`
        );
        break;
      case "ERROR":
        console.error({ event });
        break;
      default:
        console.error("error : unknown watcher event : " + event.code);
        break;
    }

    if (event.result) {
      event.result.close();
    }
  });

  http
    .createServer((req, res) => {
      const urlPart = (req.url || "/").slice(1);
      const pathname = join(mainDir, urlPart);

      if (
        !fs.existsSync(pathname) ||
        !/index\.html|^(?:assets|dist)\//g.test(urlPart)
      ) {
        res.writeHead(404);
        res.write(`Error 404: Could not find Route "${req.url || "/"}".`);
        res.end();
        return;
      }

      res.writeHead(200, { "Content-Type": getMimeType(urlPart) });

      const stream = fs.createReadStream(pathname);
      stream.pipe(res);
    })
    .listen(5173, "127.0.0.1", undefined, () => {
      console.log("info : started http server on port 5173.");
    });
})();

function getMimeType(filePath) {
  const ext = filePath.split(".").pop().toLowerCase();

  const mimeTypes = {
    html: "text/html",
    js: "text/javascript",
    map: "application/json",
    css: "text/css",
    ttf: "font/ttf",
    woff: "font/woff",
    woff2: "font/woff2",
  };

  return mimeTypes[ext] || "application/octet-stream";
}
