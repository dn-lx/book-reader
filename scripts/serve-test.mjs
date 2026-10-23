import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname } from "node:path";
const root = resolve("apps/web/out");
const types = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".json": "application/json",
  ".css": "text/css",
  ".pdf": "application/pdf",
  ".wav": "audio/wav",
  ".woff2": "font/woff2",
  ".svg": "image/svg+xml",
  ".png": "image/png",
};
http
  .createServer(async (req, res) => {
    try {
      const path = decodeURIComponent(
        new URL(req.url, "http://localhost").pathname,
      );
      let body, type;
      if (path === "/library.json") {
        body = Buffer.from(
          JSON.stringify({ books: [{ url: "/books/demo/book.json" }] }),
        );
        type = "application/json";
      } else if (path.startsWith("/books/demo/")) {
        const name = path.endsWith("book.json")
          ? "book.json"
          : path.endsWith(".pdf")
            ? "book.pdf"
            : "audio.wav";
        body = await readFile(resolve("tests/fixtures", name));
        type = types[extname(name)];
      } else {
        let file = resolve(root, "." + path);
        if (file !== root && !file.startsWith(root + "/")) throw Error();
        if ((await stat(file)).isDirectory()) file += "/index.html";
        body = await readFile(file);
        type = types[extname(file)] || "application/octet-stream";
      }
      res.setHeader("Content-Type", type);
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Accept-Ranges", "bytes");
      const match = /^bytes=(\d+)-(\d*)$/.exec(req.headers.range || "");
      if (match) {
        const start = Number(match[1]),
          end = Math.min(Number(match[2] || body.length - 1), body.length - 1);
        res.writeHead(206, {
          "Content-Range": `bytes ${start}-${end}/${body.length}`,
          "Content-Length": end - start + 1,
        });
        res.end(body.subarray(start, end + 1));
      } else {
        res.writeHead(200, { "Content-Length": body.length });
        res.end(body);
      }
    } catch {
      res.writeHead(404);
      res.end("Not found");
    }
  })
  .listen(4174, "0.0.0.0");
