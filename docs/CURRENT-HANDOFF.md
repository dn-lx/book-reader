# Current Handoff

Updated 2026-10-23.

<!-- AGENT_TASK_STATE_START -->
{"task_id":"REQ-009","repository":"dn-lx/pagechime","base":"dev","branch":"feature/ebook-reading","pr":4,"status":"testing","last_verified_sha":"d94640fba0d6aee91b32b83530fb667ddaede6fc","next_step":"Finish native markup/Manifest runtime verification, exact-head gates and PR #4 dev merge. Netlify requires the owner to update this chat's environment; me-plus changes did not apply.","updated_at":"2026-10-23T21:40:10.131206+00:00"}
<!-- AGENT_TASK_STATE_END -->

## Active delivery

REQ-009 / [PR #4](https://github.com/dn-lx/pagechime/pull/4) adds an interactive text reader to web and Expo on feature/ebook-reading. Checkpoint d94640f is pushed. Current dev a47df70 includes merged PR #3; its temporary branches were removed. Production PR #2 stays paused draft. Use dev as the only integration branch and the existing Netlify site; no production publish or duplicate project.

Shared lossless pagination and anchors preserve reading independently of audio; both readers add appearance controls and quotation notes/highlights. Independent review approved server metadata validation and native context/escaping/navigation guards. Web saved-PDF and missing-follow-preference restore findings were fixed; ten new desktop/mobile reading regressions pass. Twenty unit/contracts, types, Next export and both full-content Hermes iOS/Android exports pass. All 986 Manifest passages across19 chapters retain every character at four layouts (2,273 pages checked). All fourteen new browser/native-markup checks,93 starter regressions and strict docs/adapters now pass. Actual Manifest opening/ending rendered on desktop/mobile with no page errors/overflow; screenshots inspected. Final exact-head CI remains pending. No signed native build/device test is claimed. See docs/plans/REQ-009-ebook-reading.md; existing advisory remains REQ-005.

## External identities and writes

- GitHub canonical dn-lx/pagechime, same repository ID1431335742; owner renamed it manually.
- Netlify pagechime, ID73688a4b-90ab-4eac-be6d-ef305f33ebc3, teamdon-alex-perera. Same site renamed in place, team login retained on all deploys. No upload/deploy succeeded; Git CD is not linked. The connector cannot upload/link Git. Private ChatGPT Site appgprj_6adb96d58e38819192c282543ada4aed remains unused/unpublished.
- Me+ wbqnctrvxohxwiaignhg: isolated book_reader_* migrations20261023183634_book_reader_accounts /20261023185057_book_reader_payload_retention applied; other app data/auth untouched. Dedicated book-reader-api v2 is ACTIVE after deploying the independently reviewed optional quotation/reading validation from d94640f. Custom opaque sessions enforce authentication (verify_jwt=false intentionally); legacy metadata remains accepted. No DB/grant change for v2. Prior rollback SQL ownership/revocation/CAS/grant checks passed; positive hosted account verification/bootstrap is still pending. See docs/READER-ACCOUNTS.md.

## Deployment blocker

Managed spec54 enforces restricted networking with package-manager hosts only and no additional hosts. Safe Netlify/Supabase requests return proxy403. The owner confirmed **me-plus** is the only environment; this chat's tooltip also shows me-plus. Earlier guidance claiming a separate Pagechime environment was incorrect. Owner reports saving/publishing api.netlify.com, app.netlify.com, *.netlify.app and wbqnctrvxohxwiaignhg.supabase.co, but spec54 still reports no additional hosts and the same old source config version. Confirm the persisted list and apply the published change to the running environment; do not invent another environment or unverified restart controls. Do not repeat unverified cloud-icon/menu directions, bypass restrictions, or request tokens in chat. Netlify CLI OAuth authorization will follow once accessible. Keep REQ-004/006/007 hosted criteria unchecked until a real ready dev deploy and account/media boundary checks pass.

## Private content and compatibility

Ignored web/native assets and /workspace/output retain full Manifest:19 chapters,986 timed passages,237 PDF pages,13,682.328 seconds (~3h48m), British female Kokoro Emma, slightly slowed/subtle emotion. Google Neural2 remains setup-only. Never commit transcripts/PDF/audio to public Git.

Owner Drive downloads are complete and verified without sharing changes: [MP3](https://drive.google.com/file/d/12SV0QCUGaME3YHL32GxYOZ83ckYiZ4dX/view),95,778,068 bytes; [M4B](https://drive.google.com/file/d/1BeSTvCQmLnXw7WV2MmVmnZMTWcsebFRg/view),84,651,639 bytes, chapter markers retained. Originals remain unchanged.

Retain legacy leaf.* storage/cache namespaces, app.dnlx.leaf native IDs, book-reader-api and book_reader_* backend names. Renamed browser origins require fresh sign-in; browser-only imports/offline copies do not migrate. Source recovery3f653c5 is complete; retain the narrow historical public-identifier Gitleaks exception and all scanning rules.
