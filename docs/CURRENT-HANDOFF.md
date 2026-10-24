# Current Handoff

Updated 2026-10-24.

<!-- AGENT_TASK_STATE_START -->
{"task_id":"REQ-011","repository":"dn-lx/pagechime","base":"develop","branch":"develop","pr":null,"status":"testing","last_verified_sha":"70ed06788626fd248dfb7cf5fd82c506d3b1b1e0","next_step":"Publish reviewed guest/email/password-reveal implementation to develop, verify CI and branch deploy; keep main unchanged.","updated_at":"2026-10-24T06:26:48.365352+00:00"}
<!-- AGENT_TASK_STATE_END -->

## Current work

REQ-011 implements the owner's guest/member flow and repairs account creation from the screenshot. Plan: docs/plans/REQ-011-guest-accounts.md. The old database username check rejected email addresses. Shared email/username validation, reader-only public registration, web/native reveal controls and account-created recovery are implemented. Guests use memory-only state, no cloud sync or account cache, and cannot import/persist personal books. Web guest entry requires completed session/worker cleanup. Packaged shared media uses a generated server-side exact-path allowlist.

Migration 20261024051920_guest_reader_accounts.sql applied and dedicated book-reader-api deployed v3 on 2026-10-24. Positive live HTTP checks passed for registration/email normalization/login, duplicate rejection, reader-only role, personal API denial/isolation, and logout revocation. Four disposable verification accounts (including two from an initially incomplete test request) were deleted. Readback: zero accounts, zero state rows, exactly one usable owner admin invitation. The owner invitation is preserved.

Independent read-only reviewer /root/guest_security_review identified failed-revocation guest entry and signup/sync recovery defects; both were fixed and re-reviewed with no remaining material findings. Independent targeted tests passed 17/17. Local npm run check passes 26 tests, all workspace/server types and policy validators; Next export and Expo Android/iOS Hermes exports pass; compressed shell is 643 KiB/900 KiB. Browser regression recovery fault is injected in the fixture backend, because page routing does not intercept service-worker requests. Final full browser run passes 44/44 desktop/mobile cases. Develop publish is pending. Final inspected desktop/mobile screenshots show the reveal control/form and guest reader without clipping or horizontal overflow.

## Owner workflow

Work exclusively on develop. Main stays unchanged until the owner explicitly requests promotion after development. The opt-in direct integration policy allows a null PR on develop. Historical branches were preserved; superseded release PR #2 was closed without merging. Do not reopen it.

Develop began at the merged interactive-reader source 1db560129f6769c1c52f9d8737c120817f12098c. The workflow migration and bootstrap corrections are f99a2b224955f924886dff352922792f6af0ba3c. All five exact-head GitHub suites passed: Application, Security checks, Agent reliability, Agent stack validation and Version validation. CI includes full reader/browser/native export checks. Local targeted branch/bootstrap/documentation tests passed 18/18. Initial bootstrap CI failures were repaired by aligning inherited fixtures with the new branch names and isolating disposable task state; no release/security checks were removed.

## Hosting writes and evidence

Existing Netlify pagechime, ID 73688a4b-90ab-4eac-be6d-ef305f33ebc3, team don-alex-perera, is now linked to dn-lx/pagechime through the already-authorized GitHub app. Root build command npm run build; publish apps/web/out; functions netlify/functions; the repository config deploys the API and media edge guard. Current readback protects non-production deployments with team login; this task does not change that setting.

Initial develop-source deployment 6adbe0d674ba4dbeb313e0b2 is ready at f99a2b224955f924886dff352922792f6af0ba3c. Netlify confirms one reader function and one edge function, and no secret-scan matches. It began as the initial primary-site development deployment (context production); that alone is not evidence of a branch-deploy context.

The dashboard subsequently saved Production branch = main and Branch deploys = develop only. This reserves main for the later owner-approved promotion without changing or building main. A real branch-deploy is now verified ready at https://develop--pagechime.netlify.app: deploy 6adbe48e6d265f521861abbc, context branch-deploy, source 724444ec6cc5c34e38cc58af19e66cbf159e4c0a. It includes reader plus the media edge function. The current project readback retains team-login protection on non-production deploys. Main readback remains 2396458e46609beb8c448221a647491fb90363c9, unchanged. This evidence comes from the deployment API and the saved dashboard mapping; complete account/media browser behavior remains unverified.

The execution environment became unavailable during the first live-reader browser verification. No successful live sign-in, account sync, media-range/encoded-path test or screenshot is claimed. Connected GitHub/Netlify/Supabase operations still work. Do not repeat obsolete cloud-network settings instructions or request API tokens in chat.

## First administrator

Readback found zero reader accounts and no usable invitations before setup. One private single-use admin activation invitation was created using the existing reviewed invite-table contract, expiring 2026-10-25T22:48:44Z (48 hours). An initial unused invite whose link failed to return was expired; readback confirms exactly one usable invitation. The raw activation token is supplied only to the owner, never Git. The owner chooses username/password. No password or account was created automatically.

The Me+ spec router returned no matching Pagechime/reader-account/book-reader-api specification; repository requirements and the reviewed standalone-reader contract govern this isolated setup. No schema, grants, Supabase Auth users or unrelated Me+ data changed.

Latest 724444e CI has passed types/unit checks, the web build, performance budget and all desktop/mobile browser tests; its native export stage was still running at the final evidence checkpoint. Check the final docs-only head for its own workflow/deploy status before relying on exact-head evidence. Earlier f99a2b2 is fully green across all five suites.

## Remaining delivery

REQ-001–003 and REQ-008–009 implementation is merged. Keep REQ-004/006/007 and hosted/browser acceptance unchecked until their runtime criteria pass. REQ-005 remains the tracked Expo tooling advisory. Native exports are not signed APK/IPA/device/store verification. Google narration remains setup-only.

The Windows workspace did not inherit the original prepared 19 chapter audio files, 986 timed passages, PDF or cover. A clean Git build has an empty importable library; it is not complete Manifest delivery. Restore those private inputs without putting book contents in public Git.

The complete MP3 Drive file 12SV0QCUGaME3YHL32GxYOZ83ckYiZ4dX was read back (95,778,068 bytes). The previously recorded M4B is 1BeSTvCQmLnXw7WV2MmVmnZMTWcsebFRg. These single audio files alone do not reconstruct the existing prepared timed-book library.

Keep legacy leaf.* device/cache keys, app.dnlx.leaf native IDs and book-reader-api/book_reader_* backend identities stable. Me+ remains wbqnctrvxohxwiaignhg; the dedicated reader backend is now v3 as recorded above.
