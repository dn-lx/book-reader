# Current Handoff

Updated 2026-10-23.

<!-- AGENT_TASK_STATE_START -->
{"task_id":"REQ-007","repository":"dn-lx/book-reader","base":"dev","branch":"feature/netlify-development","pr":3,"status":"implementing","last_verified_sha":"397b1e97383f89fb211123bc26b6bac5d5379282","next_step":"Implement custom Me+ reader accounts, notes and Netlify dev deployment in PR #3. Follow docs/plans/REQ-007-reader-accounts.md.","updated_at":"2026-10-23T18:30:00Z"}
<!-- AGENT_TASK_STATE_END -->

GitHub main was an empty repository and received an initial README commit. Created dev, prod and feature/leaf-read-along from that commit. Starter copied and bootstrapped for Leaf. A private Site was registered as appgprj_6adb96d58e38819192c282543ada4aed (not deployed yet); deployment checkout /workspace/sites/leaf-read-and-listen. User explicitly selected Next.js and Expo after initial static-PWA planning; those are the active stack. Manifest assets stay outside public Git history.

Native device/signing/store publication is not verified. No analytics, payments or global host changes are in scope. Account data now uses isolated Me+ tables (REQ-007).

Local checks: all workspace types, 4 core tests, 93 starter tests, Next export, Expo Android/iOS export and 12 browser checks passed. Independent review findings repaired; web/core audit zero; Expo CLI advisory tracked in REQ-005/security review. Native signed/device testing and Google synthesis remain pending.


## Current steering

PR #1 merged into dev at 61ecff86e418256dc24f4bd0dd21f90b9c36b72c. All five workflow suites passed on its final feature SHA. Production PR #2 is now a paused draft: user specifically requested Netlify development deployment instead. No Site/Netlify publish has happened.

Netlify connection verified; team don-alex-perera; new private site book-reader-dnlx-dev (73688a4b-90ab-4eac-be6d-ef305f33ebc3), requires team login on all deploys. CLI credentials absent and connector has no upload/Git-link capability. Complete deployment configuration before requesting a necessary final connection action.

Me+ project wbqnctrvxohxwiaignhg is active. Read schema only so far; no database changes. User explicitly wants standalone account tables, no Supabase Auth requirement. Me+ source reference is dn-lx/me-plus (prod), cloned read-only at /workspace/me-plus-reference. New accepted plan: docs/plans/REQ-007-reader-accounts.md.

Audio download request completed via Google Drive: full-length MP3 95,778,068 bytes and M4B 84,651,639 bytes; both 13,682.328 seconds. Provider metadata readback verified. No public sharing change. Original 109/142 MiB files remain unchanged. GitHub upload request was superseded by the user's Drive instruction.

Naming: Leaf conflicts with existing reading apps. User rejected Foliohush/Liltfolio; provide different checked candidates. No new brand selected; domain registration is unverified.

## REQ-007 implementation checkpoint

Custom account API/schema and web/Expo gates are implemented locally; PR #3 is a draft. 13 deterministic tests and all TypeScript checks passed. Web export and both native Hermes exports passed. Initial browser run passed 14/18; four new account-flow tests used the wrong capitalization for the fixture library book title (fixed, rerun pending). Existing 12 reading/PDF/offline/import checks passed.

Applied 20261023183634_book_reader_accounts.sql to Me+ after independent SQL/backend review. Deployed new book-reader-api Edge Function v1 (f61b725d-3ab2-45ae-99c6-71dbe15093ac), custom session verification, verify_jwt=false. No unrelated tables/functions changed. Live transaction-rolled-back checks passed single-use invite, CAS, session generation revocation, anon table-read denial and authenticated RPC denial. Anonymous/authenticated table/function grants are false. No real account or bootstrap invitation created yet.

Supabase security advisors report INFO for RLS tables without policies: intentional server-only deny-by-default tables with all client grants revoked. Do not add permissive client policies. Payload/retention follow-up migration 20261023185057 is applied after independent review: 64KiB values, FK/expiry indexes, indexed cleanup batches of500.

Independent reviewer repairs: atomic access/session RPC locking + session generations; exact-count pagination; null input validation; persistent expiring service worker scopes; cross-tab logout; bounded offline session validity; HttpOnly/Secure cookies and native SecureStore; pending logout revocation retry; durable account-scoped sync outbox with CAS and tombstones. Final client review and browser rerun pending.

Managed workspace network spec29 allows package-manager hosts only; Supabase and Netlify HTTP endpoints return proxy403. Connected tools permit DB/API deployment and Netlify project management, but no Netlify upload/Git-link operation. Do not bypass network policy. Need supported allowlist update plus Netlify CLI authentication to finish hosted validation/deployment. CLI actual current deploy attempt still pending.

PR #3 implementation checkpoint committed at397b1e97383f89fb211123bc26b6bac5d5379282. Independent reviewer confirmed no remaining source blockers after latest repairs. All6 new desktop/mobile account browser tests passed (privacy, fresh browser sync, durable offline outbox, worker restart, cross-tab logout);14 unit/core tests and93 starter regressions pass. Additional expiry/storage-failure/logout-retry browser checks are running. Native exports need one final run after gate refinements. Public API denied-path smoke workflow added; it uses no credentials and probes only401/400 contracts.
