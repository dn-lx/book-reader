# Current Handoff

Updated 2026-10-24.

<!-- AGENT_TASK_STATE_START -->
{"task_id":"REQ-012","repository":"dn-lx/pagechime","base":"develop","branch":"develop","pr":null,"status":"testing","last_verified_sha":"99992b6cae14f0eeed5c7f52d356ca8875023e69","next_step":"Publish reviewed Google $0 request lock and PDF edition preferences on develop; verify exact-head CI. Preserve the existing Netlify private-log access blocker, no Google calls or main promotion.","updated_at":"2026-10-24T10:27:08.152041+00:00"}
<!-- AGENT_TASK_STATE_END -->

## Active work and owner policy

REQ-012, directly on develop with null PR. The owner requires **$0 Google spend** and continued development. This supersedes earlier paid audition/full-book examples. Google --check/--generate, credential acquisition and HTTP calls are now blocked in source; budgets/env/cache cannot enable them. Offline estimates and existing Emma recordings remain available. Independent reviewer /root/guest_security_review found no material issue; synthetic Python 6/6, targeted Node 3/3 and diff whitespace passed. This local guard cannot control other applications or verify the Cloud account’s bill.

Owner supplied Cloud project `project-89a9b506-ff91-4cd1-a2d` and reports completing API setup. No authenticated readback, synthesis or provider billing/API change was performed by the agent. Console and Cloud Shell return Site Unavailable; no Cloud Text-to-Speech management connector was found. Do not assume free quota, alerts or provider spend caps guarantee zero charges. Current spend caps do not cover Cloud Text-to-Speech. See docs/CONTENT-AND-VOICES.md.

The reader now restores the account-local packaged PDF edition across chapter changes/reload, accepting only book.pdf/current PDF editions; guests use their memory-only preferences. No sync schema/provider change. Local validation passes:36 unit/contracts (including6 Python cost/word tests),4 targeted desktop/mobile cases, Next export, Android/iOS Hermes exports and 563/900KiB shell. Voice-dialog screenshots were inspected; axe/overflow checks passed. Independent review:6 Python/3 targeted Node checks, no material findings. Develop publication is pending. Keep REQ-012 open for protected hosted/native acceptance; Google synthesis stays paused under the owner policy.

## Verified book and source

Prior implementation source 99992b6cae14f0eeed5c7f52d356ca8875023e69 passed all five suites: Application 40077190791, Security 40077190777, reliability 40077190810, stack 40077190793, version 40077190778. The native tooling advisory remains non-blocking REQ-005. Later documentation checkpoints are not new runtime evidence.

Supplied unmodified Manifest All-Editions ZIP contains page-matched/cozy PDFs (237 pages), Kindle/fixed-layout EPUBs and licences. Complete M4B from Drive: Kokoro bf_emma,19 chapters,13,682.328 s. Recovered private book has 1,136 passages, 207,752 characters, 37,139/37,476 acoustic word cues (99.1% overall; chapter 90.91–100%). Untimed words remain visible without guesses. Text follows words; PDFs follow source pages without glyph overlays. Native/web preserve selection offsets; legacy passage-only books work. Source originals and contents stay outside Git.

Previous actual-book schema/lossless four-layout checks, desktop/mobile opening/chapter10/chapter19/word visibility/both PDFs/axe/pageerrors passed 2/2; fixture browser 50 passed/2 private checks skipped separately; 36 Node tests, Next export, Expo Android/iOS Hermes exports and 563/900KiB shell passed. Independent sensitive review completed with 12 targeted checks. Current changes require current final validation. See docs/REQ-012-VERIFICATION.md and docs/plans/REQ-012-manifest-library.md.

## Private asset source and external writes

Me+ `wbqnctrvxohxwiaignhg`, isolated from unrelated apps/Supabase Auth. Migration 20261024072446 and pagechime-library v1 (`a9cd086a-f612-4524-a8c8-3047a04d7b46`), verify_jwt=false with own capability auth. New book_reader_library_keys: RLS true, no public/anon/authenticated access. Private bucket pagechime-library-develop, 24 MiB file cap, no member/anonymous storage policies.

Immutable version 7e6afd6087edca77f985476fab4019017651843388c6f4d23cc2e24e29d0bdca: 27 files/87,289,918 bytes plus current.json. Fresh download verified every hash/size. Live checks: anonymous/unknown401; build GET200/POST403; upload GET403. Temporary upload key deleted and then401; final 1 build key/0 upload keys. No new provider calls or uploads are needed for current source changes.

Netlify upserts reported success for PAGECHIME_LIBRARY_URL/REQUIRED and secret KEY, requested builds scope/branch-deploy context only; getter returns[] so scope readback is unresolved. Do not broaden scope. Develop builds require the private source and fail rather than silently publishing an empty shelf.

## Hosting blocker and branch policy

Netlify pagechime site 73688a4b-90ab-4eac-be6d-ef305f33ebc3, team don-alex-perera, Git-linked dn-lx/pagechime. Production branch main; only develop branch deploys; npm run build → apps/web/out; reader BFF/media edge. Non-production team-login gate stays unchanged.

Deploy 6adc68a6b6aa5a0945c70a3c (99992b6,develop/branch-deploy) failed building with exit2 before publication. Prior 6adc51ac3c8bc504207106c7 remains live at ae75d8b. Private build log unavailable through connector/public API. Browser sign-in was declined: respect that refusal and do not repeat unless requested. Do not claim the unverified env writes are proven as the failure cause. Hosted inner login/media GET/HEAD/Range/encoded-path acceptance remains open; local checks are separate evidence.

No main promotion: main remains 2396458e46609beb8c448221a647491fb90363c9. Do not create a release PR, reopen superseded PR #2 or alter historical branches. Use GitHub MCP for writes. Preserve leaf.* keys, app.dnlx.leaf IDs, book-reader-api and book_reader_* identities.

## Accounts and remaining acceptance

REQ-011 guest/member, email signup and Show/Hide password are deployed in the prior runtime. Public signup grants reader; admin requires private invite. book-reader-api v3/earlier migration unchanged. Previous disposable test accounts removed. Owner-only single-use admin invite remains private/usable until 2026-10-25T22:48:44Z; reopen its original link. Do not choose an owner password or replace a usable invitation.

Keep REQ-004/006/007/011/012 runtime criteria open; native exports are not signed apps/device/store acceptance. No payments, analytics, unrelated backend or production changes. This session’s maximum approved Google spend remains zero.
