# Current Handoff

Updated 2026-10-24.

<!-- AGENT_TASK_STATE_START -->
{"task_id":"REQ-012","repository":"dn-lx/pagechime","base":"develop","branch":"develop","pr":null,"status":"implementing","last_verified_sha":"6e38106e49e7141390d6b1530e8fe25d63c432d9","next_step":"Develop library/deploy and early-seek fix are live. Review member/native runtime acceptance and book timing quality; Google remains paused under owner zero-spend policy. Main promotion requires owner request.","updated_at":"2026-10-24T11:15:53.012035+00:00"}
<!-- AGENT_TASK_STATE_END -->

## Active work and owner policy

REQ-012, directly on develop with null PR. The owner requires **$0 Google spend** and continued development. This supersedes earlier paid audition/full-book examples. Google --check/--generate, credential acquisition and HTTP calls are now blocked in source; budgets/env/cache cannot enable them. Offline estimates and existing Emma recordings remain available. Independent reviewer /root/guest_security_review found no material issue; synthetic Python 6/6, targeted Node 3/3 and diff whitespace passed. This local guard cannot control other applications or verify the Cloud account’s bill.

Owner supplied Cloud project `project-89a9b506-ff91-4cd1-a2d` and reports completing API setup. No authenticated readback, synthesis or provider billing/API change was performed by the agent. Console and Cloud Shell return Site Unavailable; no Cloud Text-to-Speech management connector was found. Do not assume free quota, alerts or provider spend caps guarantee zero charges. Current spend caps do not cover Cloud Text-to-Speech. See docs/CONTENT-AND-VOICES.md.

The reader restores only packaged PDF editions in account-local preferences; guests retain memory-only settings. Word-following and the early-seek metadata fix are live on develop. Current local checks:36 unit/contracts (including6 Python cost/word tests), all types, Next export,8 targeted word browser cases,2 actual-book desktop/mobile cases and563/900KiB shell. Independent source/security review has no material findings. REQ-012 stays open for member/native acceptance and timing-quality review; Google synthesis remains paused.

## Verified book and source

Historical CI and runtime evidence is in docs/REQ-012-VERIFICATION.md. Native tooling advisories remain non-blocking REQ-005; documentation checkpoints are not new runtime evidence.

Supplied unmodified Manifest All-Editions ZIP contains page-matched/cozy PDFs (237 pages), Kindle/fixed-layout EPUBs and licences. Complete M4B from Drive: Kokoro bf_emma,19 chapters,13,682.328 s. Recovered private book has 1,136 passages, 207,752 characters, 37,139/37,476 acoustic word cues (99.1% overall; chapter 90.91–100%). Untimed words remain visible without guesses. Text follows words; PDFs follow source pages without glyph overlays. Native/web preserve selection offsets; legacy passage-only books work. Source originals and contents stay outside Git.

Previous actual-book schema/lossless four-layout checks, desktop/mobile opening/chapter10/chapter19/word visibility/both PDFs/axe/pageerrors passed 2/2; fixture browser 50 passed/2 private checks skipped separately; 36 Node tests, Next export, Expo Android/iOS Hermes exports and 563/900KiB shell passed. Independent sensitive review completed with 12 targeted checks. Current changes require current final validation. See docs/REQ-012-VERIFICATION.md and docs/plans/REQ-012-manifest-library.md.

## Private asset source and external writes

Me+ `wbqnctrvxohxwiaignhg`, isolated from unrelated apps/Supabase Auth. Migration 20261024072446 and pagechime-library v1 (`a9cd086a-f612-4524-a8c8-3047a04d7b46`), verify_jwt=false with own capability auth. New book_reader_library_keys: RLS true, no public/anon/authenticated access. Private bucket pagechime-library-develop, 24 MiB file cap, no member/anonymous storage policies.

Immutable version 7e6afd6087edca77f985476fab4019017651843388c6f4d23cc2e24e29d0bdca: 27 files/87,289,918 bytes plus current.json. Fresh download verified every hash/size. Live checks: anonymous/unknown401; build GET200/POST403; upload GET403. Temporary upload key deleted and then401; final 1 build key/0 upload keys. No new provider calls or uploads are needed for current source changes.

Netlify repair 2026-10-24: prior Builds-only upserts did not persist. Independent review passed before saving the existing read-only key with the plan’s minimum secret scopes Builds/Functions/Runtime, no Post processing, branch-deploy only. Getter confirms is_secret=true and only that context. Runtime consumers do not use the key. Connected build verifies 27 files and exports successfully; 36 tests/typechecks pass, shell 563/900 KiB, zero credential scan matches. Library remains required.

## Hosting blocker and branch policy

Netlify pagechime site 73688a4b-90ab-4eac-be6d-ef305f33ebc3, team don-alex-perera, Git-linked dn-lx/pagechime. Production branch main; only develop branch deploys; npm run build → apps/web/out; reader BFF/media edge. Non-production team-login gate stays unchanged.

Current runtime source6e38106e49e7141390d6b1530e8fe25d63c432d9 deploy6adc929cc4e8e1686f1b482d: ready, develop/branch-deploy, reader function/media edge. Hosted guest catalog shows1 book/19 chapters after reload; Emma advances, active word renders, chapters10/19 and both PDF editions render. Google disabled; main/gate unchanged. Prior source0ef9efd repaired the connection. CI exposed the early-seek race; deterministic regression failed4.2→0 before the reviewed fix and passes after. All5 exact-source CI suites pass (54 fixture browser cases;2 private cases pass separately; Android/iOS exports). Details: docs/REQ-012-VERIFICATION.md. Member login and native/device acceptance remain separate.

No main promotion: main remains 2396458e46609beb8c448221a647491fb90363c9. Do not create a release PR, reopen superseded PR #2 or alter historical branches. Use GitHub MCP for writes. Preserve leaf.* keys, app.dnlx.leaf IDs, book-reader-api and book_reader_* identities.

## Accounts and remaining acceptance

REQ-011 guest/member, email signup and Show/Hide password are deployed in the prior runtime. Public signup grants reader; admin requires private invite. book-reader-api v3/earlier migration unchanged. Previous disposable test accounts removed. Owner-only single-use admin invite remains private/usable until 2026-10-25T22:48:44Z; reopen its original link. Do not choose an owner password or replace a usable invitation.

Keep REQ-004/006/007/011/012 runtime criteria open; native exports are not signed apps/device/store acceptance. No payments, analytics, unrelated backend or production changes. This session’s maximum approved Google spend remains zero.
