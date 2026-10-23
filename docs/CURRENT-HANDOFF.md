# Current Handoff

Updated 2026-10-23.

<!-- AGENT_TASK_STATE_START -->
{"task_id":"REQ-007","repository":"dn-lx/book-reader","base":"dev","branch":"feature/netlify-development","pr":3,"status":"blocked","last_verified_sha":"94b70cd82691822c777cd774b7ac1c8e7e4efc93","next_step":"Finish Netlify CLI/network connection, final CI/review and dev merge, then deploy/verify protected Manifest. See docs/READER-ACCOUNTS.md.","updated_at":"2026-10-23T19:05:00Z"}
<!-- AGENT_TASK_STATE_END -->

## Active delivery

PR #3 implements standalone username/password accounts in isolated Me+ tables, independently of Supabase Auth, plus private bookmarks/notes/progress, Next/Expo gates, offline scoping and Netlify API/media guards. Current branch is feature/netlify-development from dev. Implementation checkpoint397b1e9; expanded checks94b70cd. Production PR #2 stays paused draft. PR #1 previously merged to dev61ecff8. Do not publish prod.

14 unit/core tests,93 starter tests, types, Next export, budget550KiB/900KiB and both full-content Expo Hermes exports pass locally. All10 new account browser cases pass on desktop/mobile; the12 existing reader/PDF/audio/import/offline cases passed earlier in this increment. Screenshots inspected; axe sign-in/library/reader checks pass. All six GitHub workflow suites passed on94b70cd, including all22 browser checks and clean-checkout web/native builds. Final docs/native conflict-action commit will trigger fresh CI; inspect exact final-head checks before merge. Native signed/device/store testing remains pending. The Expo tooling advisory remains tracked in REQ-005.

The user asked for connection setup steps and received them: allow api.netlify.com, app.netlify.com, *.netlify.app and wbqnctrvxohxwiaignhg.supabase.co in managed workspace networking; then generate a Netlify login ticket and let the user authorize in their browser. No token should be pasted into chat. The Netlify connector manages projects but has no upload/Git-link operation. Real CLI link now fails **Authentication required**. Current managed policy spec29 allows package-manager hosts only; direct Supabase HTTP got proxy403. Do not bypass the policy. Recheck actual environment policy after the user applies settings; restarts preserve workspace files but invalidate old PTYs.

## Verified external writes

- Me+ project wbqnctrvxohxwiaignhg: applied migrations20261023183634_book_reader_accounts and20261023185057_book_reader_payload_retention after independent review. Added only book_reader_* tables/RPCs; no auth.users, profiles or unrelated app changes.
- Deployed new book-reader-api Edge Function v1, IDf61b725d-3ab2-45ae-99c6-71dbe15093ac; custom opaque-session authentication, verify_jwt=false. Built-in privileged environment stays server-side.
- Rolled-back real SQL checks passed single-use invitation, CAS, session generation revocation, anon table SELECT denial, authenticated RPC denial and10,000-character Unicode note. No real user/bootstrap invite created. All client table/function grants are denied. Advisors' RLS-without-policy/unused-index INFO is intentional for server-only/new tables.
- Hosted backend [contract run](https://github.com/dn-lx/book-reader/actions/runs/40007820279) passed real401/400 contracts, including unknown-user login through the live DB. Positive account HTTP flows still need verification.
- Netlify site73688a4b-90ab-4eac-be6d-ef305f33ebc3, book-reader-dnlx-dev, teamdon-alex-perera, is created and requires team login on all deploys. No upload/deploy succeeded. Validate reader media paths inside that outer gate before opening visibility for intended readers. Git branch deploy/CD is not configured; `--context branch-deploy` is not a real branch deploy.
- Private ChatGPT Site appgprj_6adb96d58e38819192c282543ada4aed remains unused/unpublished. User selected Netlify; do not publish that Site.

## Content and completed downloads

Full Manifest narration:19 chapters,986 timed passages,237 PDF pages,13,682.328 seconds; British female Kokoro Emma, slightly slowed with subtle emotion. Private inputs are under ignored apps/web/public/books and apps/mobile/assets/books. Originals and full-length download copies persist under /workspace/output. Google Neural2 remains setup-only at the user's request.

Audio downloads completed in owner's Google Drive with size/type/link readback verification; no sharing changes:

- [MP3](https://drive.google.com/file/d/12SV0QCUGaME3YHL32GxYOZ83ckYiZ4dX/view),95,778,068 bytes.
- [M4B](https://drive.google.com/file/d/1BeSTvCQmLnXw7WV2MmVmnZMTWcsebFRg/view),84,651,639 bytes; chapter markers retained.

Both copies contain the complete3h48m narration, re-encoded below the connector100MiB limit; original109/142MiB files unchanged. User's Drive instruction superseded GitHub audio upload.

Working name Leaf is temporary because existing readers use it. User rejected Foliohush/Liltfolio. New options sent:Reverli,Reverune,Liltmere; no exact search matches found, domains/trademarks unconfirmed. Do not rebrand until chosen.

## Finish safely

Resume with docs/READER-ACCOUNTS.md, current source/PR checks and independent review. First-admin bootstrap uses scripts/create-reader-invite.mjs after the final website origin is known; keep raw invitation outside public Git. Complete actual Netlify routing tests (anonymous GET/HEAD/Range and encoded paths), real-account notes/access tests, ready deploy URL and dev source revision. Before merging PR #3, reset task state to idle in the final candidate, rerun its checks, merge into dev only and clean the feature branch. Keep acceptance REQ-006/007 unchecked until remaining hosted criteria are verified.
