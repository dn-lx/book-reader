import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { mkdirSync, existsSync, copyFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
const root = dirname(dirname(fileURLToPath(import.meta.url))),
  req = createRequire(join(root, "apps/web/package.json")),
  pub = join(root, "apps/web/public");
mkdirSync(pub, { recursive: true });
if (!existsSync(join(pub, "library.json")))
  writeFileSync(join(pub, "library.json"), '{"books":[]}');
try {
  copyFileSync(
    req.resolve("pdfjs-dist/legacy/build/pdf.worker.min.mjs"),
    join(pub, "pdf.worker.min.mjs"),
  );
} catch {}
const generated = join(root, "apps/mobile/assets/catalog.generated.ts");
if (!existsSync(generated))
  writeFileSync(
    generated,
    'import type {Book} from "@pagechime/core";\nexport const catalog:{book:Book;audio:number[];pdf:number;cover:number}[]=[];\n',
  );

await import("./build-pdf-viewer.mjs");
