# Pagechime verification evidence

Candidate: initial 0.1.0 implementation on feature/leaf-read-along, PR #1. Final SHA and deployment identity are recorded in Current Handoff and GitHub checks.

## Checks

- Shared core tests: passage/seek boundaries, invalid timing imports, validated duration.
- Web TypeScript and production static export.
- Expo TypeScript and Android/iOS Hermes bundle export with complete private assets.
- Playwright desktop + mobile Chromium: actual audio playback, chapters, bookmarks and restore, PDF canvas, voice setup, theme, accessibility, offline download/reload/range playback and persistent imports. Fixtures are original, isolated from the private book.
- Private Manifest runtime: 19 chapters, 986 cues, 237 PDF pages, complete first/last cues and existing audio files. Actual-book desktop/mobile screenshots and playback/PDF smoke checks are inspected separately from fixture tests.
- Static compressed JS/CSS/font budget ≤900 KiB, host per-file budget ≤25 MiB; PDF engine is deferred.
- Strict documentation/agent-stack validation and starter tooling regression suite.
- Independent source/security review required by AGENTS.md; findings repaired before delivery.

The precise command results and remaining verification limits are updated at delivery. A successful export does not prove device behavior. Google synthesis is setup pending and has not run. Private hosting's owner-authenticated browser cannot be substituted with an anonymous test; inspect deployment state and public access-gate behavior separately.

Final local results: 4/4 core checks; 93/93 starter regressions; 12/12 Playwright desktop/mobile checks; Next production export; Expo Android/iOS exports; all workspace TypeScript; strict docs/agent stack checks. Budget: approximately 543 KiB compressed JS/CSS/fonts against 900 KiB. Independent review found no remaining actionable source blocker after fixes. Additional manual negative-path checks confirmed partial offline-cache rollback and manual bookmark page restoration. Actual Manifest first chapter plays, final chapter opens, final PDF page 237 renders/restores. Continuous full-length playback was not performed.

Web/core production dependency audit: zero vulnerabilities. The separate full-monorepo tooling audit reports the open Expo CLI advisory in REQ-005; see docs/SECURITY-REVIEW.md. This is not described as a clean full-monorepo audit.
