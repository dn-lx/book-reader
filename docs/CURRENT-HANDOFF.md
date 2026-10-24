# Current Handoff

Updated 2026-10-24.

<!-- AGENT_TASK_STATE_START -->
{"task_id":"REQ-011","repository":"dn-lx/pagechime","base":"develop","branch":"develop","pr":null,"status":"testing","last_verified_sha":"2c519bc569167b45bf2689ba316cf16289f38993","next_step":"Owner acceptance on protected develop; hosted inner media edge and native device acceptance remain open. Do not promote main.","updated_at":"2026-10-24T06:35:03.255215+00:00"}
<!-- AGENT_TASK_STATE_END -->

## Owner workflow

Work/deploy directly on develop only. Main stays unchanged until the owner explicitly requests promotion after development. Direct integration policy allows a null PR. Do not open a release PR or merge main. Main remains 2396458e46609beb8c448221a647491fb90363c9. Superseded release PR #2 was closed without merging; historical branches preserved.

## Delivered guest/account changes

Source 2c519bc569167b45bf2689ba316cf16289f38993 implements REQ-011: guest reading/listening; account-only bookmarks, notes/highlights, imports, saved progress and offline copies; email/username signup; show/hide password on web/native. The screenshot failure came from the old API/DB username check rejecting @. Public signup always creates reader role; administrator access still requires invitation. Guest state is memory-only, never synced or copied to accounts, and cannot open account caches. Web guest entry requires successful revocation and worker cleanup. A generated server-side allowlist exposes only packaged shared catalog references for guest GET/HEAD; unlisted media stays authenticated. Creation followed by initial-sync failure switches to explicit sign-in recovery.

Plan: docs/plans/REQ-011-guest-accounts.md. Detailed evidence: docs/REQ-011-VERIFICATION.md. Independent reviewer /root/guest_security_review found guest cleanup, signup recovery and guest-import persistence defects; repaired and re-reviewed with no unresolved material findings. Independent targeted checks passed 17/17.

Local verification: npm run check (26 tests, all types/policy validators), Next export, 44 desktop/mobile browser cases, 4 final guest/signup assertions, Expo Android/iOS Hermes exports and 643 KiB/900 KiB shell budget pass. Final desktop/mobile signup/reveal screenshots and guest-reader screenshots inspected; axe and pageerror checks pass. Browser outage fixtures act at the backend so service-worker requests cannot bypass them.

## Hosting and backend

Existing Netlify pagechime, site 73688a4b-90ab-4eac-be6d-ef305f33ebc3, team don-alex-perera, is Git-linked to dn-lx/pagechime. Production branch main; only develop branch deploys enabled. Root npm run build, publish apps/web/out, one reader function and one media edge function. No access setting changed; latest readback requires Netlify team login on non-production deployments.

Deploy 6adc50a3d4d1a00283bfc9c0 is ready: branch develop, context branch-deploy, source 2c519bc569167b45bf2689ba316cf16289f38993, https://develop--pagechime.netlify.app. One API proxy, one edge function, no secret-scan matches. Code-head GitHub Application run 40070514452 passed all substantive stages (types/tests, build/budget, browser, native export, evidence upload); Security checks, Agent reliability, Agent stack validation and Version validation also passed. A subsequent documentation-only checkpoint may have a new head/deploy; verify its status before treating it as exact-head evidence.

Me+ wbqnctrvxohxwiaignhg remains isolated from Supabase Auth and other apps. Migration 20261024051920_guest_reader_accounts.sql applied; dedicated book-reader-api v3 deployed with existing custom opaque-session auth (verify_jwt=false retained). Positive live HTTP checks passed registration, normalized email login, duplicate rejection, reader-only role/admin denial, anonymous state denial, account binding/isolation, logout and revocation. Four disposable test accounts were removed. Final readback: zero accounts, zero state rows, one usable owner admin invitation. RLS-without-policy INFO is intentional deny-by-default; no unrelated advisor fixes.

## Owner invitation and acceptance limits

The owner-only single-use administrator invitation remains usable until 2026-10-25T22:48:44Z. Raw token was supplied privately, never committed. Reopen the original link to activate the owner account; generic signup creates a reader. No owner password/account was chosen automatically. Do not create another invitation unless expired or deliberately invalidated.

Unauthenticated HTTP and a fresh cloud browser both reach the existing Netlify team gate. The deploy screenshot shows the new guest entry, but is not proof of a hosted form submission. Signed-in hosted inner media GET/HEAD/Range/encoded-path acceptance remains open; local rendered flows and live backend contracts are verified separately. Do not remove privacy or claim hosted account UI/native-device acceptance. REQ-011 stays open for that acceptance.

## Remaining delivery

Private original Manifest PDF, cover, 19 chapter audio files and 986 timed passages are absent from this checkout. A clean Git build has an empty shared shelf with member imports; not complete Manifest delivery. Restore private inputs without public Git book contents. Complete MP3 Drive ID 12SV0QCUGaME3YHL32GxYOZ83ckYiZ4dX (95,778,068 bytes); prior M4B ID 1BeSTvCQmLnXw7WV2MmVmnZMTWcsebFRg. These alone do not reconstruct prepared timings/library.

Keep REQ-004/006/007 and hosted/native runtime acceptance open. REQ-005 tracks the Expo tooling advisory; web production audit remains blocking. Hermes exports are not signed APK/IPA/device/store verification. Google narration remains setup-only. Preserve legacy leaf.* keys, app.dnlx.leaf IDs, book-reader-api and book_reader_* identities.
