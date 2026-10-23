# Leaf requirements

Accepted scope: Next.js website and Expo React Native app, based on Agent Project Starter. Updated 2026-10-23.

## [ ] REQ-001 — Complete Manifest read-along
- All 19 narration chapters and all PDF pages are available from beginning to end.
- Timed passages highlight as audio plays. Original PDF follows passage page cues.
- Play/pause, seek, chapters, speed and sleep timer work; recorded British female voice is retained.
- No transcript, PDF or book audio is committed to the public GitHub source repository.
- Acceptance: unit tests on timing boundaries and browser tests using the actual book, including chapter changes and reload.

## [ ] REQ-002 — A polished accessible reading room
- Responsive library and reader, warm paper/olive design, readable editorial typography, keyboard controls, usable mobile touch targets.
- Light/night themes, text sizing, reduced motion, focused reading mode and purposeful transitions.
- Acceptance: inspected desktop/mobile screenshots, no overflow, critical axe checks, no application console errors.

## [ ] REQ-003 — Grow the personal library
- Import PDF and audio, with optional timed-book JSON. Imports without timings use manual pages.
- Device-local progress/bookmarks and offline saving are explicit and recoverable.
- Acceptance: import validation, persistence, empty/error states and offline-range playback checks.

## [ ] REQ-004 — Next.js and Expo delivery
- A shared typed core package provides the book contract and timing logic.
- Website is built/exported and privately deployed. Expo native app uses native audio and reading controls with bundled private book assets.
- Android/iOS bundles are verified. Native signing/store publication requires the owner's build-service credentials and is not represented as verified without a build.
- Starter's branch, continuity, project memory and CI conventions are adapted and checked.
