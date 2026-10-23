# Leaf requirements

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

Evidence for REQ-001–003: 4 core tests; 12 desktop/mobile browser checks; actual Manifest first/last chapter audio/PDF checks; independent review. See docs/LEAF-VERIFICATION.md. Native sleep timer is foreground-only and device testing remains separate.

## [ ] REQ-005 — Recheck Expo CLI advisory before native signing/OTA delivery
- Track GHSA-86w9-cpqp-85rv in node-forge 1.4.0 via Expo CLI; upstream has no patched release as of 2026-10-23.
- Web/core production dependency audit must remain blocking and pass.
- Keep full tooling audit visible; update the dependency when a verified patch becomes available.
- Signed/native store and Expo OTA workflows require renewed dependency/security review and real-device verification.
- Evidence and reachability assessment: docs/SECURITY-REVIEW.md.
