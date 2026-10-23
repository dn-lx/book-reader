# Content and voice preparation

Book media and text are private inputs. The public GitHub repository contains code and an original test fixture only. Keep credentials and private books outside Git.

## Complete Manifest

The prepared book contains 237 PDF pages, 19 audio chapters, 986 timed passages and approximately 3 h 48 min of Kokoro Emma narration. British female voice, slightly slower pace, with subtle phrasing/pause variation. Cues follow source narration chunks; they are passage cues, not word-level forced alignment.

```sh
python -m pip install pymupdf soundfile
python scripts/prepare_manifest.py --pdf /private/book.pdf --narration-dir /private/manifest-complete-audiobook --chunks-dir /private/complete-chunks
node scripts/bundle-mobile-book.mjs
```

The preparation script needs the existing narration manifest and chunk WAVs plus ffmpeg/ffprobe. It copies the original PDF, maps text to physical PDF pages, measures audio and compresses oversized files to fit the host's per-file limit. Output lives under ignored `apps/web/public/books/manifest`. The mobile bundler copies private inputs into ignored local asset paths.

## Book contract

`library.json` contains `{ "books": [{ "url": "/books/my-book/book.json" }] }`. A book has id, title, author, pageCount, pdf, chapters and duration. Each chapter contains title, audio URL, file name, duration in seconds, firstPage and segments. Each segment contains start/end seconds, physical PDF page (1-based) and text. See `packages/core/src/index.ts` and `tests/fixtures/book.json`.

User imports accept a PDF plus one full audio file or naturally sorted chapter files. An optional JSON with a chapters list in this format enables automatic following. Without timings the reader uses manual PDF pages. Local imports do not need a cloud account.

## Google Neural2 — setup pending

The user selected **Leave Google as a setup option for now**. No paid Google requests have been made. Both apps show Google as unavailable until prepared. Neural2 is Google's cloud neural speech synthesis, distinct from the local Kokoro engine; it is not an emotion-control guarantee.

When ready, enable the Cloud Text-to-Speech API and billing in the owner's Google Cloud project, authenticate locally with application-default credentials and check current [Google pricing](https://cloud.google.com/text-to-speech/pricing) and [voice availability](https://cloud.google.com/text-to-speech/docs/voices). Default requested voice: `en-GB-Neural2-A`, British English female. Do not put a service-account file or API key in Next/Expo.

```sh
gcloud auth application-default login
# Local preflight only; makes no synthesis requests:
python scripts/google-narration.py --book apps/web/public/books/manifest/book.json --project YOUR_PROJECT
# Only after deciding to incur Google synthesis charges:
python scripts/google-narration.py --book apps/web/public/books/manifest/book.json --project YOUR_PROJECT --generate
```

The script makes one request per passage (986 for this book, about 207,902 text characters), caches chunk WAVs for resuming, and builds independent Google timings. It links the alternate manifest for the web voice picker only after all chapters succeed. Cloud authentication, synthesis and the generated Google voice have not been tested against a live account. Native Google asset packaging remains a later integration step; the current native selector accurately shows setup pending. The CLI preflight is verified locally.
