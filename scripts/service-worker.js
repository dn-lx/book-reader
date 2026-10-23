const SHELL = "leaf-shell-__VERSION__";
const BOOKS = "leaf-books-v1";
const FILES = __SHELL__;
self.addEventListener("install", (event) =>
  event.waitUntil(
    caches
      .open(SHELL)
      .then((cache) => cache.addAll(FILES))
      .then(() => self.skipWaiting()),
  ),
);
self.addEventListener("activate", (event) =>
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k.startsWith("leaf-shell-") && k !== SHELL)
            .map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  ),
);
self.addEventListener("fetch", (event) => {
  const req = event.request,
    url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== self.location.origin) return;
  event.respondWith(
    (async () => {
      const stored = await (await caches.open(BOOKS)).match(url.href);
      if (stored) {
        const range = req.headers.get("range");
        if (!range) return stored;
        const bytes = await stored.arrayBuffer(),
          match = /^bytes=(\d*)-(\d*)$/.exec(range);
        if (!match || (!match[1] && !match[2]))
          return new Response(null, {
            status: 416,
            headers: { "Content-Range": `bytes */${bytes.byteLength}` },
          });
        let start = match[1]
          ? Number(match[1])
          : Math.max(0, bytes.byteLength - Number(match[2]));
        const end =
          match[1] && match[2]
            ? Math.min(Number(match[2]), bytes.byteLength - 1)
            : bytes.byteLength - 1;
        if (start > end || start >= bytes.byteLength)
          return new Response(null, {
            status: 416,
            headers: { "Content-Range": `bytes */${bytes.byteLength}` },
          });
        const headers = new Headers(stored.headers);
        headers.set(
          "Content-Range",
          `bytes ${start}-${end}/${bytes.byteLength}`,
        );
        headers.set("Content-Length", String(end - start + 1));
        headers.set("Accept-Ranges", "bytes");
        return new Response(bytes.slice(start, end + 1), {
          status: 206,
          headers,
        });
      }
      const cached = await caches.match(req);
      if (req.mode === "navigate") {
        try {
          return await fetch(req);
        } catch {
          return (await caches.match("/index.html")) || Response.error();
        }
      }
      if (cached) return cached;
      return fetch(req);
    })(),
  );
});
