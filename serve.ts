// A tiny static server for looking at the site while building it:
//   node serve.ts            -> http://localhost:8080
//   node serve.ts --port 9000
// It maps a path to a file under app/, guesses the content type from
// the extension, and answers 404 for anything that is not there.
// Only meant for local previews — nothing here is production code.

import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const here = fileURLToPath(new URL(".", import.meta.url));
const root = join(here, "app");
const port = Number(process.argv[process.argv.indexOf("--port") + 1] || 8080);

const CONTENT_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
};

const server = createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  // Strip any ".." so a request can never climb out of app/.
  const rel = normalize(path).replace(/^(\.\.[/\\])+/, "").replace(/^[/\\]/, "");
  const name = join(root, rel === "" ? "index.html" : rel);
  try {
    const body = await readFile(name);
    res.writeHead(200, { "content-type": CONTENT_TYPES[extname(name)] || "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("not found");
  }
});

server.listen(port, () => console.log(`NusaStat at http://localhost:${port}`));
