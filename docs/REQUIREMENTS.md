# Pagechime requirements

Accepted scope: Next.js website and Expo React Native app, based on Agent Project Starter. Updated 2026-10-23.

## [x] REQ-001 — Complete Manifest read-along
- All 19 narration chapters and all PDF pages are available from beginning to end.
- Timed passages highlight as audio plays. Original PDF follows passage page cues.
- Play/pause, seek, chapters, speed and sleep timer work; recorded British female voice is retained.
- No transcript, PDF or book audio is committed to the public GitHub source repository.
- Acceptance: unit tests on timing boundaries and browser tests using the actual book, including chapter changes and reload.

## [x] REQ-002 — A polished accessible reading room
- Responsive library and reader, warm paper/olive design, readable editorial typography, keyboard controls, usable mobile touch targets.
- Light/night themes, text sizing, reduced motion, focused reading mode and purposeful transitions.
- Acceptance: inspected desktop/mobile screenshots, no overflow, critical axe checks, no application console errors.

## [x] REQ-003 — Grow the personal library
- Import PDF and audio, with optional timed-book JSON. Imports without timings use manual pages.
- Device-local progress/bookmarks and offline saving are explicit and recoverable.
- Acceptance: import validation, persistence, empty/error states and offline-range playback checks.

## [ ] REQ-004 — Next.js and Expo delivery
- A shared typed core package provides the book contract and timing logic.
- Website is built/exported and privately deployed. Expo native app uses native audio and reading controls with bundled private book assets.
- Android/iOS bundles are verified. Native signing/store publication requires the owner's build-service credentials and is not represented as verified without a build.
- Starter's branch, continuity, project memory and CI conventions are adapted and checked.

Evidence for REQ-001–003: 4 core tests; 12 desktop/mobile browser checks; actual Manifest first/last chapter audio/PDF checks; independent review. See docs/PAGECHIME-VERIFICATION.md. Native sleep timer is foreground-only and device testing remains separate.

## [ ] REQ-005 — Recheck Expo CLI advisory before native signing/OTA delivery
- Track GHSA-86w9-cpqp-85rv in node-forge 1.4.0 via Expo CLI; upstream has no patched release as of 2026-10-23.
- Web/core production dependency audit must remain blocking and pass.
- Keep full tooling audit visible; update the dependency when a verified patch becomes available.
- Signed/native store and Expo OTA workflows require renewed dependency/security review and real-device verification.
- Evidence and reachability assessment: docs/SECURITY-REVIEW.md.

## [ ] REQ-006 — Netlify development delivery
- Deploy from the existing dev integration branch; keep prod release paused.
- Use Netlify team don-alex-perera and site pagechime-dev; preserve privacy until app access is enforced.
- Verify a real ready deploy, source revision, assets and access controls; report any necessary account connection action precisely.

## [ ] REQ-007 — Me+ standalone reader accounts and personal notes
- Custom username/password accounts live in isolated Me+ tables; passwords are salted hashes, never plain text. Supabase Auth users are not required.
- Server-side access checks, expiring/revocable sessions and login rate limits protect both data and book files.
- Bookmarks, notes and reading places belong to the authenticated account across web and mobile. Account switching does not expose another reader's device or server data.
- Readers can create/edit/delete notes at a passage/page. Administrators can provision and disable access without sending unsolicited messages.
- Acceptance: independent security review; two-account ownership/negative-path tests; browser login, notes, logout/switch and offline-isolation checks; native types/exports with device limits stated.
- Plan: docs/plans/REQ-007-reader-accounts.md.

REQ-006/007 implementation is in PR #3. Custom Me+ schema/API are live and tested; web/native source, private notes, scoped offline data, revocation and fixture flows pass. Actual Netlify deployment/media routing and positive hosted account verification remain pending CLI/network setup. See docs/READER-ACCOUNTS.md for evidence and precise remaining steps. Do not mark these items complete from source checks alone.


## [x] REQ-008 — Pagechime identity and one development environment
- Use Pagechime in website/mobile wordmarks, titles, install metadata, workspace packages and maintained project documentation.
- Rename the existing Netlify project in place to pagechime-dev; retain dev as the single integration branch and keep production paused.
- Rename the existing GitHub repository to dn-lx/pagechime without creating another repository; verify its canonical name before changing source-control bindings.
- Preserve existing accounts, notes/bookmarks, pending logout and account-scoped offline data. Keep deployed API/database and native application identities stable.
- Acceptance: web/native checks and exports, desktop/mobile visual verification, independent review and readback of external identities/privacy settings.
- Plan: docs/plans/REQ-008-pagechime.md. Netlify and GitHub canonical names/unchanged IDs and privacy/PR continuity are verified. Types,14 unit tests,93 starter checks,22 browser checks, both full-content native exports and web budget pass; desktop/mobile branding was inspected, including320–1440px wordmark geometry. Independent review found no blocker. No duplicate development site was created.


## [ ] REQ-009 — Interactive book reading
- Default to a reflowable Kindle-style text reader for timed books; original PDF is optional.
- Turn reading pages with touch/buttons/keyboard, retain place independently of PDF pagination, and preserve text through font/viewport changes.
- Offer readable serif/sans typography, text size, line spacing, page width, paper/sepia/night surfaces, focus mode and reduced-motion transitions.
- Follow narrated passages; manual page turns pause following without losing audio position. Resume following explicitly.
- Readers can select a quotation, highlight it or attach a note. Notes/highlights and reading place stay account-specific and sync through the existing API.
- Web and Expo share pagination/anchor semantics; preserve the full Manifest text and existing audio, imports, accounts, notes and bookmarks.
- Acceptance: meaningful pagination/anchor tests, desktop/mobile browser reading/selection/appearance/persistence tests, accessibility and inspected runtime screenshots, web/native exports and performance checks. Native device/signing limitations remain explicit.
- Plan: docs/plans/REQ-009-ebook-reading.md. Continue single Netlify project ID73688a4b-90ab-4eac-be6d-ef305f33ebc3, now named pagechime by the owner; dev remains integration and prod stays paused.
