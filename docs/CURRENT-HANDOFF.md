# Current Handoff

Updated 2026-10-23.

<!-- AGENT_TASK_STATE_START -->
{"task_id":"REQ-009","repository":"dn-lx/pagechime","base":"dev","branch":"feature/ebook-reading","pr":4,"status":"implementing","last_verified_sha":"a47df70064defa7d4e8cf40109304e1b6ddb7d92","next_step":"Finish REQ-009 regression/runtime verification and independent review, update evidence, then merge PR #4 into dev after exact-head CI. Netlify access remains restricted pending owner configuration.","updated_at":"2026-10-23T21:36:08.560925+00:00"}
<!-- AGENT_TASK_STATE_END -->

## Development delivery

PR #3 merged into dev a47df70 with all six final-head workflows passing. Both merged temporary branches were removed. REQ-009 now implements the user-requested interactive text reader on feature/ebook-reading. Production PR #2 remains paused draft; do not publish prod. Keep one development site, pagechime, and dev as the single integration branch.

Local verification: types,14 unit/core tests,93 starter checks, strict docs/agent adapters, Next export and550KiB/900KiB budget pass. All22 desktop/mobile browser checks pass, including notes/account isolation, offline sync and worker/logout failure paths. Pagechime sign-in/library screenshots were inspected on desktop and mobile; wordmark geometry passed at320/390/768/820/1024/1440px with no overflow/close-button collision or page errors. Both full-content iOS/Android Hermes exports pass. The renamed native PDF bridge loads a two-page fixture and renders both pages in Chromium. Native signed/device/store layout and installs remain unverified. Independent source/security review found no blocker. Expo tooling advisory remains REQ-005.

Netlify upload/deployment is still blocked by managed network/CLI authorization. The user received steps to allow api.netlify.com, app.netlify.com, *.netlify.app and wbqnctrvxohxwiaignhg.supabase.co, then authorize a CLI login ticket in their browser. No token should be pasted into chat. The connector manages projects but cannot upload/link Git. Current managed policy allows package-manager hosts only. Do not bypass it or treat a local export as a hosted deploy.

## Verified external writes

- Me+ project wbqnctrvxohxwiaignhg: applied migrations20261023183634_book_reader_accounts and20261023185057_book_reader_payload_retention after independent review. Added only book_reader_* tables/RPCs; no auth.users, profiles or unrelated app changes.
- Deployed dedicated book-reader-api Edge Function v1 with custom opaque-session authentication, verify_jwt=false. Built-in privileged environment stays server-side.
- Rolled-back real SQL checks passed single-use invitation, CAS, session generation revocation, anon table SELECT denial, authenticated RPC denial and10,000-character Unicode note. No real user/bootstrap invite created. All client table/function grants are denied. Advisors' RLS-without-policy/unused-index INFO is intentional for server-only/new tables.
- Hosted backend [contract run](https://github.com/dn-lx/pagechime/actions/runs/40007820279) passed real401/400 contracts, including unknown-user login through the live DB. Positive account HTTP flows still need verification.
- Netlify site73688a4b-90ab-4eac-be6d-ef305f33ebc3, pagechime, teamdon-alex-perera, is created and requires team login on all deploys. No upload/deploy succeeded. Validate reader media paths inside that outer gate before opening visibility for intended readers. Git branch deploy/CD is not configured; `--context branch-deploy` is not a real branch deploy.
- Private ChatGPT Site appgprj_6adb96d58e38819192c282543ada4aed remains unused/unpublished. User selected Netlify; do not publish that Site.

## Content and completed downloads

Full Manifest narration:19 chapters,986 timed passages,237 PDF pages,13,682.328 seconds; British female Kokoro Emma, slightly slowed with subtle emotion. Private inputs are under ignored apps/web/public/books and apps/mobile/assets/books. Originals and full-length download copies persist under /workspace/output. Google Neural2 remains setup-only at the user's request.

Audio downloads completed in owner's Google Drive with size/type/link readback verification; no sharing changes:

- [MP3](https://drive.google.com/file/d/12SV0QCUGaME3YHL32GxYOZ83ckYiZ4dX/view),95,778,068 bytes.
- [M4B](https://drive.google.com/file/d/1BeSTvCQmLnXw7WV2MmVmnZMTWcsebFRg/view),84,651,639 bytes; chapter markers retained.

Both copies contain the complete3h48m narration, re-encoded below the connector100MiB limit; original109/142MiB files unchanged. User's Drive instruction superseded GitHub audio upload.

The user selected **Pagechime** (page + sound) and explicitly requested the name everywhere with one development environment. It is applied to current branding, workspace packages, install metadata and documentation. `dev` remains the single integration branch and the existing Netlify project was renamed in place; no second site was created. Domain registration/purchase is not authorized or completed.

## Finish safely

Resume with docs/READER-ACCOUNTS.md, current source/PR checks and independent review. First-admin bootstrap uses scripts/create-reader-invite.mjs after the final website origin is known; keep raw invitation outside public Git. Complete actual Netlify routing tests (anonymous GET/HEAD/Range and encoded paths), real-account notes/access tests, ready deploy URL and dev source revision. Before merging PR #3, reset task state to idle in the final candidate, rerun its checks, merge into dev only and clean the feature branch. Keep acceptance REQ-006/007 unchecked until remaining hosted criteria are verified.


## 2026-10-23 Pagechime rename

The same Netlify site ID was renamed to **pagechime** and read back under team don-alex-perera with team-login protection still enabled for all deploys. Dashboard: https://app.netlify.com/projects/pagechime. No deploy was uploaded, no duplicate site was created, and production PR #2 stays paused.

The user renamed the existing GitHub repository to **dn-lx/pagechime** manually. Readback verified the same repository ID1431335742, PR #3 still open/draft targeting dev with the same source head, and production PR #2 still paused draft. The local origin and maintained repository links now use the canonical new URL. The backend workflow guard uses dn-lx/pagechime. No second repository was created.

Keep the legacy `leaf.*` local storage/IndexedDB/cache names and `app.dnlx.leaf` native application IDs for compatibility; they are not user-visible product branding. Changing native IDs would create a separate installed app. Renaming a Netlify hostname creates a new browser origin, so any old-origin device imports/offline copies do not migrate automatically. No successful deployment or signed native installation has been verified. Server-synced notes/bookmarks remain tied to the same account/database. Keep the deployed book-reader-api endpoint and book_reader_* schema stable.

Current managed networking still allows package-manager hosts only; Netlify CLI authorization/deployment remains blocked. Do not bypass that policy or represent a local export as a hosted deploy.

Recovery is complete: forward repair3f653c5 restored the entire source tree (256 tracked files; tree00d751f150c32e5227f8b7ead07d8d43cbd9f67d) after incomplete documentation trees were created in e2fcc9b/c685e0c. No deployment or integration branch changed. The exact historical Gitleaks exception is independently reviewed and the full history scan passed; retain all other scanning rules.

Owner renamed the same Netlify site to pagechime; connector readback confirms ID/team/privacy unchanged. Workspace spec44 still permits only package-manager hosts and an actual Netlify request receives proxy403. User was asked to apply the necessary workspace allowlist while reader implementation continues.

## Interactive reader checkpoint

REQ-009 source implements shared lossless pagination, reflow anchors, independent reading/audio positions, appearance controls, exact quotation selection and account-owned notes/highlights on web and Expo. Draft PR #4 is open into dev. Twenty unit/contracts and the Next export passed; new browser corpus tests are being repaired to use isolated test-server fixtures through the real worker/account path. Independent review approved the additive server metadata validator and identified web PDF/synced-anchor restore issues; fixes are under verification. Both platforms need final export/runtime evidence before completion. No private content is tracked.

Managed workspace spec50 enforces restricted networking with package-manager hosts only. The owner located Additional allowed domains in an Environment editor (screenshot labelled me-plus); requested domains must be applied to this chat's environment and published. Earlier cloud-icon/menu guidance was unverified and should not be repeated. No Netlify upload has occurred.
