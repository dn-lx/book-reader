# Project Memory

## Identity

- **Project name:** Leaf · Read & Listen
- **Purpose:** Read book pages while listening to synchronized narration.
- **Repository / owner:** dn-lx/book-reader / dn-lx
- **Foundation:** dn-lx/agent-project-starter; preserve canonical branch and continuity policy.

## Architecture

- **Website:** Next.js 16 App Router, React, TypeScript, static export; PDF.js legacy bundle loaded on demand. Motion respects reduced-motion preferences. Installable PWA.
- **Native:** Expo 58 / React Native for iOS and Android; native Expo audio, platform controls, offline PDF.js inside a restricted WebView. Native bundles are separate from signed installs.
- **Shared core:** packages/core exports typed book/chapters/passages, schema validation, seeking and timing selection.
- **Storage:** Web IndexedDB for imported books; localStorage for progress, bookmarks/preferences; Cache Storage for explicit downloads. Native document directory plus AsyncStorage. Imported files and preferences are device local; bookmarks, notes and reading positions sync through a custom Me+ API. No analytics.
- **Hosting:** Netlify development project book-reader-dnlx-dev, configured but deployment blocked by CLI/network setup. The unused private ChatGPT Site is not deployed. Code is public; private book media/transcripts are ignored build inputs.
- **Voices:** Full private Kokoro Emma British female narration; Google Neural2 setup pending at the user's request. Optional generation runs locally with Google Cloud ADC, never in either client. Timings are generated separately for each voice.

## Important paths

| Area | Path |
| --- | --- |
| Website | apps/web/ |
| Native app | apps/mobile/ |
| Shared contract | packages/core/src/index.ts |
| Tests | tests/ |
| Private web inputs | apps/web/public/books/ and library.json (ignored) |
| Private native inputs | apps/mobile/assets/books/ and generated catalog (ignored) |
| Infrastructure | .github/workflows/; apps/web/next.config.mjs |

## Commands

| Purpose | Command |
| --- | --- |
| Install | npm ci |
| Prepare clean checkout | npm run prepare:assets |
| Web / mobile development | npm run dev / npm run dev:mobile |
| Type and core checks | npm run check |
| Web / native exports | npm run build / npm run build:mobile |
| Browser / accessibility | npm run test:e2e |
| Performance | npm run check:budget |
| Starter tooling | node scripts/test-starter.mjs |

## Runtime and security boundaries

Code promotion is feature → dev → prod. Runtime identity and rollback are recorded in Operations and Current Handoff. Me+ standalone account tables and a dedicated Edge Function verify custom opaque sessions, independently of Supabase Auth. Netlify BFF uses HttpOnly cookies; native uses SecureStore. Media is gated at Netlify edge requests. No privileged client credential. See docs/READER-ACCOUNTS.md. Imported data stays on-device; deleting browser/app storage removes it. Failed offline downloads and failed native imports clean up their partial files. No payments, telemetry or microphone access.

Source/tests/runtime evidence override stale documentation. See docs/CONTENT-AND-VOICES.md, docs/NATIVE-DELIVERY.md and docs/LEAF-VERIFICATION.md.
