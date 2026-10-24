# Manifest library, narration following and Neural2

Accepted 2026-10-24. Work directly on develop; do not change main or the outer Netlify access gate.

## Verified inputs and gaps

- Source ae75d8b; uploaded All-Editions ZIP contains 237-page page-matched/cozy PDFs, reflowable/fixed-layout EPUBs, proofreading notes and font licences. The M4B in Drive is Roxie Nafousi / Manifest in Action, 13,682.328 seconds, 19 chapters, Kokoro bf_emma. Preserve these originals and keep contents outside public Git.
- Clean Git builds have an empty library. The screenshot is a failed catalog state; Netlify logged a 200 JSON catalog response, so successful network responses must not be turned into failures by worker caching. Existing worker is cache-first for catalog/metadata and lets cache writes reject successful requests.
- Current reader supports reflowable text, source PDF and passage following; no word cue contract. Existing Google preparation has passage timings only. Google Cloud credentials/project are unavailable in this runtime.

## Implementation sequence

1. Safely ingest the supplied edition bundle and recover chapter audio from embedded M4B boundaries. Reconstruct page-owned reading text; retain edition choices/licences. Force-align the existing audio to known text locally, cache results, audit coverage/boundaries and label timing provenance. Never invent word timestamps from proportional text length.
2. Extend shared validation and web/native rendering with optional bounded word cues while preserving passage-only imports and selection/notes offsets. Follow actual audio time, page turns and seeks; support pauses and missing cues without a fake active word. Reuse existing Kindle-style appearance and PDF viewing.
3. Repair catalog loading: network-first catalog metadata, safe cache fallbacks, successful network responses survive unavailable cache storage, explicit valid empty state, useful load errors and retry. Preserve account-cache isolation and guest network-only media.
4. Persist private book assets outside Git in an isolated private Supabase bucket. A capability-authenticated library function signs bounded immutable file paths; short-lived upload capability is retired after seeding, build capability is read-only. No unrelated Me+ data/grants change. Netlify develop builds download a verified manifest with SHA256/size checks and fail rather than silently publishing an empty shelf when configured assets are unavailable. No privileged key or book contents in clients, CI logs or Git.
5. Upgrade offline Neural2 preparation to SSML word marks/timepoints, bounded requests, resumable audio+timing cache, voice/credential preflight, explicit cost estimate and generation budget. Match voice selection to actual available audio. Do not claim live Google audio without successful credentials/synthesis; do not incur unquoted full-book charges.
6. Verify contract/worker/private-ingress negative paths, actual Manifest completeness/first-last chapters/PDF, desktop/mobile word following and selection/appearance, accessible loading/empty/error states, budget and native exports. Independent security review before external data/credential writes. Publish only develop and verify exact-head CI/deploy/source/asset checks.

## Compatibility and recovery

Optional words/editions preserve existing book imports and account records. No analytics. Alignment tooling is offline only, not a web dependency. Asset uploads use immutable content-version paths; publishing is atomic, and build downloads verify every digest. Roll back code/deploy without making the bucket public or weakening auth. Retain the original audiobook/editions in their original locations. Missing Google auth remains an explicit final connection step after all setup work is reviewable.

## Owner update — zero Google spend and continued reading work

2026-10-24: Owner reports completing the Cloud API step and requires no billing. The $0 limit supersedes all earlier possible paid auditions/full-book examples. Enforce the pause at CLI entry, credential acquisition and Google HTTP boundaries; neither --check/--generate nor a CLI budget may enable requests. Offline preflight remains available. Retain existing Emma audio. Provider account billing and unrelated usage cannot be verified from this session. Do not assume the free quota or a budget alert is a hard stop.

Continue the reading experience by persisting the chosen packaged PDF edition through chapter changes/reloads in existing account-local preference storage, with an allowlist check on restore. Guest preferences remain ephemeral. No backend schema, secret, API call or paid service is needed for this change. Add regression checks for both cost boundaries and edition restore/rejected addresses, review the cost guard independently, verify web/native builds and targeted desktop/mobile UI, and publish develop only. Preserve the existing Netlify private-log/access blocker; do not repeat its declined sign-in.
