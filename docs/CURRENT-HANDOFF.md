# Current Handoff

Updated 2026-10-24.

<!-- AGENT_TASK_STATE_START -->
{"task_id":"REQ-012","repository":"dn-lx/pagechime","base":"develop","branch":"develop","pr":null,"status":"blocked","last_verified_sha":"99992b6cae14f0eeed5c7f52d356ca8875023e69","next_step":"Resume Netlify failed develop build diagnosis using private build log after owner enables access; connector env writes report success but readback is empty. Google Cloud project/billing sign-in also remains required. Do not promote main.","updated_at":"2026-10-24T08:24:16.211964+00:00"}
<!-- AGENT_TASK_STATE_END -->

## Current implementation

REQ-012 restores the supplied Manifest in Action All-Editions bundle: page-matched/cozy interactive PDFs (237 pages), Kindle/fixed-layout EPUBs and font credits. Complete Kokoro bf_emma M4B from Drive is 19 chapters, 13,682.328 seconds. Originals remain unmodified and outside Git. Recovered MP3s, EPUB reading text and acoustic alignment produce 1,136 passages, 207,752 characters and 37,139/37,476 usable word cues (99.1% overall; chapter coverage 90.91–100%). Unmatched/zero-duration words stay visible without guessed timings. Word cues are acoustic estimates, not studio annotations.

Web/native preserve UTF-16 note/selection offsets and legacy passage-only imports. Web samples the live audio clock per word; mixed-cue passages keep following. Text mode highlights/follows words and brings overflowing words into view. Page-matched/cozy PDF modes follow physical pages without word overlays. Download editions require member UI. Catalog/metadata are network-first; failed cache reads/writes cannot hide successful responses. Old offline worker remains active if a replacement shell cannot be fully cached. Guest network-only and account-cache isolation remain enforced.

Google preparation now uses independent provider SSML word timepoints, bounded requests, resumable private cache, credential/voice checks and explicit charge budget. British female en-GB-Neural2-A at .95 rate is the initial Emma match; audition A/optionally F before selecting. No unsupported British emotion style is claimed. Offline full preflight: 233,050 billable characters / conservative $3.7288 before free quota, 1,149 requests; short audition $0.0094. Owner selected a new Google Cloud project; no project credentials, billing connection or live synthesis exist here. No paid requests were made. Direct new-project console navigation returned Site Unavailable in this cloud browser; no project was created and no Google sign-in attempted. See docs/CONTENT-AND-VOICES.md and docs/plans/REQ-012-manifest-library.md.

## Private asset source — external writes

Me+ wbqnctrvxohxwiaignhg remains isolated from unrelated apps and Supabase Auth. Applied 20261024072446_private_reader_library.sql; deployed dedicated pagechime-library v1 (a9cd086a-f612-4524-a8c8-3047a04d7b46), verify_jwt=false because its handler verifies opaque capability keys. New RLS-enabled book_reader_library_keys revokes public/anon/authenticated access. Private bucket pagechime-library-develop has a 24 MiB per-file limit and no anonymous/member storage policies.

Published immutable version 7e6afd6087edca77f985476fab4019017651843388c6f4d23cc2e24e29d0bdca: 27 files, 87,289,918 bytes, plus current.json. Fresh restore downloaded all 27 and verified every size/SHA256. Live checks: anonymous/unknown capability401; build read200/write403; upload read403. The temporary upload key was deleted; subsequent upload request401. Readback: one build key, zero upload keys; RLS true; anon/authenticated SELECT false; bucket private. Source originals and secrets are never Git inputs.

Netlify connector reported three upserts for PAGECHIME_LIBRARY_URL, PAGECHIME_LIBRARY_REQUIRED and secret PAGECHIME_LIBRARY_KEY, requested builds scope and branch-deploy context only. Its getAllEnvVars returns an empty list, so independent scope readback is unresolved. Develop branch builds now require the private source automatically using Netlify CONTEXT/BRANCH, preventing a silently empty catalog if configuration is missing. Verify actual branch build success before claiming deploy acceptance. Do not broaden variable scope or change production settings.

## Verification and review

Independent read-only reviewer /root/guest_security_review reviewed the complete sensitive dirty diff against ae75d8b. Found/repaired upload-read capability separation, config-driven JWT gateway mismatch, mixed-cue following and incomplete-worker replacement. Final sensitive re-review found no material unresolved source issue; independent targeted checks12/12 and diff whitespace passed. Later source hardening bounds editions/credits to the same book and rejects traversal; final review/checks are recorded in REQ-012 verification evidence.

Actual private book schema and lossless pagination passed all 19 chapters at four page budgets. Fresh asset-source and capability checks passed as above. Workspace/server types, unit/policy checks, Next export, Expo Android/iOS Hermes exports and browser word/selection/mixed-cue tests passed at the prior checkpoint. Final actual-book desktop/mobile opening/chapter10/chapter19/visible words/both PDFs/axe/pageerrors passed2/2. Screenshots were inspected. Full fixture browser regression:50 passed/2 private-book checks skipped; those separate actual-book checks passed2/2. Final native Android/iOS exports passed; shell563KiB/900KiB. All source CI suites passed at 99992b6; Netlify deployment is blocked as recorded below. Physical native devices, signed apps and hosted inner media edge acceptance are separate open checks.

## Owner workflow and hosting

Work/deploy directly on develop only. Main remains 2396458e46609beb8c448221a647491fb90363c9 until explicit owner promotion. Direct integration policy permits null PR. Do not create/reopen a release PR; superseded #2 remains closed. Historical branches are preserved.

Existing Netlify pagechime, site 73688a4b-90ab-4eac-be6d-ef305f33ebc3, team don-alex-perera, is Git-linked to dn-lx/pagechime. Production branch main; only develop branch deploys. Root npm run build, publish apps/web/out, reader BFF/media edge. No access settings changed: non-production deploys require Netlify team login. Source 99992b6cae14f0eeed5c7f52d356ca8875023e69 passes all five exact-head suites: Application 40077190791, Security 40077190777, Agent reliability 40077190810, Agent stack 40077190793, Version 40077190778. The tracked native tooling advisory remains non-blocking REQ-005. Netlify develop deploy 6adc68a6b6aa5a0945c70a3c failed during building site (exit2) before publishing; prior 6adc51ac3c8bc504207106c7 remains live at ae75d8b. Private log is not available through the connector/public API. Browser reaches a Netlify login wall; secure sign-in request was declined. Respect that choice; do not repeat sign-in unless requested. No hosted REQ-012 acceptance is claimed.

## Guest/accounts and remaining acceptance

REQ-011 email/username signup, Show/Hide password, guest reading/listening and member-only personal saves/imports/offline are deployed. Public signup always grants reader role. Dedicated book-reader-api v3 and earlier migration remain intact. Disposable previous test accounts were removed; owner invitation preserved. Raw single-use admin invite remains private and usable until 2026-10-25T22:48:44Z. Reopen its original link; do not choose an owner password or create a replacement while usable.

The outer Netlify gate prevents unauthenticated hosted inner-UI verification; do not weaken it or claim hosted login/GET/HEAD/Range/encoded-path acceptance. Local rendered flows and live backend contracts are separate evidence. Keep REQ-004/006/007/011/012 open for their remaining runtime/Google acceptance. REQ-005 tracks Expo tooling advisory. Preserve leaf.* storage keys, app.dnlx.leaf native IDs, book-reader-api and book_reader_* identities. No main promotion, payments, analytics or unrelated backend changes.
