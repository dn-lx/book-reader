# Content and voice preparation

Book media/text are private build inputs. Public Git contains code and original test fixtures only. Keep credentials and books outside Git. Guests can read/listen to the packaged shared library; accounts enable personal saves, imports and offline copies.

## Restored Manifest edition

The supplied All-Editions bundle contains two 237-page PDFs (page-matched and cozy interactive), reflowable Kindle EPUB, fixed-layout EPUB, proofreading notes and font licences. These are reconstructed user-supplied editions, not a claim of publisher-identical page images. Original inputs are preserved. The complete M4B contains 19 chapters, 13,682.328 seconds, Kokoro `bf_emma`, British English female at a gently slower pace.

Preparation requires ffmpeg/ffprobe, PyMuPDF, plus an isolated alignment environment. The word alignment dependency never ships in the reader. Install CPU PyTorch/torchaudio from the official CPU wheel index before `requirements-alignment.txt`.

```sh
python scripts/restore-manifest.py --bundle /private/Manifest-in-Action-All-Editions.zip --audio /private/manifest.m4b --work /private/manifest-work
python scripts/align-book.py --source /private/manifest-work/source.json --cache /private/manifest-work/alignment
node scripts/bundle-mobile-book.mjs
```

Known EPUB text is forced-aligned to the actual Emma audio using faster-whisper/stable-ts `base.en`. Current audit: 37,139 usable word cues; chapter coverage 90.91–100%. Zero-duration/unmatched words remain visible without invented timings. Word timing is an acoustic estimate, not studio annotation; short headings/index entries need particular care. Text mode highlights real word intervals, keeps silence gaps, follows pages and preserves note/selection offsets. Original/cozy PDF modes follow the source page; they do not draw word overlays on PDF glyphs.

## Durable private develop assets

`pagechime-library` is an isolated capability-authenticated Edge Function. The private bucket is `pagechime-library-develop`. No storage policies grant anonymous or account access. Hashed capabilities are in `book_reader_library_keys`: read-only `build`, expiring upload-only `upload`. There is no privileged client key. File manifests bind immutable version/path, SHA256, size and MIME type; `current.json` changes only after all objects exist. Builds verify every downloaded digest and reject outside origins/paths, redirects, oversized bodies and symlinks.

Owner seeding uses `scripts/seed-private-library.mjs` with endpoint/upload capability in its environment, then deletes the temporary upload capability. Never log bearer or signed URLs. Re-running an upload of existing immutable objects is intentionally denied; use verified inputs/new version or review the incomplete version explicitly. Netlify stores the separate build capability as a secret in build scope, branch-deploy context only, with `PAGECHIME_LIBRARY_URL` and `PAGECHIME_LIBRARY_REQUIRED=1`. A missing or failed configured source fails the build instead of publishing an empty shelf. Clean source-only CI uses original fixtures, without private book content or keys.

## Optional word cue contract

Each segment may have `words: [{start,end,from,to}]`: chapter seconds and original UTF-16 offsets. Cues are bounded, ordered and non-overlapping. Legacy passage-only imports still work. Optional editions list bounded same-book PDF/EPUB URLs. See shared validation and `word-following.ts`.

## Matching British Google Neural2

Owner-selected Google Cloud project: `project-89a9b506-ff91-4cd1-a2d`. Billing/API enablement and authentication still require verification; no paid synthesis has run. The console and Cloud Shell are currently unavailable in the agent browser. Default is British female `en-GB-Neural2-A`, rate `0.95`, starting from the same text as Emma. Audition this and optionally `en-GB-Neural2-F` before choosing the final voice. Match accent, warmth, punctuation and pace by listening; quality and emotional expression cannot be guaranteed from a voice name. Google's documented Neural2 emotion styles apply to specific US voices, so the British setup does not send unsupported emotion controls.

Create a project in the owner's Google Cloud account, attach billing, enable **Cloud Text-to-Speech API**, install Google Cloud CLI, then authenticate outside Pagechime. Never send Google credentials in chat or place ADC/service-account files in Next/Expo/Git.

```sh
gcloud auth application-default login
gcloud auth application-default set-quota-project YOUR_PROJECT
gcloud services enable texttospeech.googleapis.com --project YOUR_PROJECT
# Offline cost preflight, then credential/voice check (no synthesis):
python scripts/google-narration.py --book apps/web/public/books/manifest/book.json
python scripts/google-narration.py --book apps/web/public/books/manifest/book.json --project YOUR_PROJECT --check
# Explicitly budgeted short audition, only after owner approves charges:
python scripts/google-narration.py --book apps/web/public/books/manifest/book.json --project YOUR_PROJECT --sample --generate --max-cost-usd 0.02
# After audition acceptance and full-book cost approval:
python scripts/google-narration.py --book apps/web/public/books/manifest/book.json --project YOUR_PROJECT --generate --max-cost-usd 4
```

Pricing checked 2026-10-24: Neural2 $16/million characters before free quota. SSML (except mark tags) and whitespace count. Current offline full preflight is 233,050 billable characters / upper estimate $3.7288, 1,149 bounded requests. The 110-word audition is 586 characters / $0.0094. These are estimates; confirm current pricing and account quota before generation. An explicit budget must cover the conservative estimate; the script never assumes free quota. See [pricing](https://cloud.google.com/text-to-speech/pricing), [voices](https://cloud.google.com/text-to-speech/docs/voices), [SSML marks](https://cloud.google.com/text-to-speech/docs/ssml#mark).

Every word receives an SSML mark; provider timepoints must exist and be ordered. Missing marks stop preparation without guessing or automatically rebilling the cached response. Cache raw audio/timing privately for resuming. Google gets its own timing track, never Emma's. Only after all chapters succeed does the web voice picker link the alternate. Republish private assets/rebuild develop to distribute it. Native Google voice selection/packaging and live Google synthesis acceptance remain open until generated audio exists.
