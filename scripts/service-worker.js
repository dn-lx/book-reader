// Retain the original cache namespaces for existing account-scoped offline downloads.
const SHELL = "leaf-shell-__VERSION__";
const SCOPES = "leaf-reader-scopes-v1";
const scopeUrl = (id) =>
  new URL("/__reader-scope/" + id, self.location.origin).href;
async function readScope(id) {
  if (!id) return null;
  const response = await (await caches.open(SCOPES)).match(scopeUrl(id));
  if (!response) return null;
  const scope = await response.json();
  return scope.expires > Date.now() ? scope : null;
}
self.addEventListener("message", (event) => {
  if (event.data?.type !== "reader-account" || !event.source?.id) return;
  event.waitUntil(
    (async () => {
      const cache = await caches.open(SCOPES),
        previous = await readScope(event.source.id);
      if (
        event.data.account &&
        /^[a-f0-9-]{36}$/.test(event.data.account) &&
        Date.parse(event.data.expiresAt) > Date.now()
      ) {
        await cache.put(
          scopeUrl(event.source.id),
          new Response(
            JSON.stringify({
              account: event.data.account,
              expires: Date.parse(event.data.expiresAt),
            }),
          ),
        );
      } else {
        await cache.delete(scopeUrl(event.source.id));
        if (previous) {
          for (const key of await cache.keys()) {
            const row = await cache.match(key);
            if (row && (await row.json()).account === previous.account)
              await cache.delete(key);
          }
          await caches.delete("leaf-books-account-" + previous.account);
        }
      }
      event.ports[0]?.postMessage({ ok: true });
    })(),
  );
});
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
            .filter(
              (k) =>
                (k.startsWith("leaf-shell-") && k !== SHELL) ||
                k === "leaf-books-v1",
            )
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
      const privateFile =
        url.pathname.startsWith("/books/") || url.pathname === "/library.json";
      const account = (await readScope(event.clientId))?.account;
      if (privateFile && !account) return fetch(event.request); // Guests never read or populate account caches.
      const bookCache = account
        ? await caches.open("leaf-books-account-" + account)
        : null;
      const stored = privateFile ? await bookCache?.match(url.href) : null;
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
      if (privateFile) {
        const response = await fetch(req);
        if (
          response.ok &&
          (url.pathname === "/library.json" ||
            url.pathname.endsWith("/book.json"))
        )
          await bookCache?.put(req, response.clone());
        return response;
      }
      if (
        url.pathname.startsWith("/api/") ||
        url.pathname.startsWith("/.netlify/")
      )
        return fetch(req);
      const cached = await (await caches.open(SHELL)).match(req);
      if (req.mode === "navigate") {
        try {
          return await fetch(req);
        } catch {
          return (
            (await (await caches.open(SHELL)).match("/index.html")) ||
            Response.error()
          );
        }
      }
      if (cached) return cached;
      return fetch(req);
    })(),
  );
});
