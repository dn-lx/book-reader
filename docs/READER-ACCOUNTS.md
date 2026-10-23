# Reader accounts and Netlify development setup

Updated 2026-10-23. Accounts are standalone rows in the Me+ project; no `auth.users` identity is created or required.

## Account data

`book_reader_accounts` holds a normalized unique username, display name, salted PBKDF2-SHA256 password hash, active flag, reader/admin role and session generation. Passwords require at least 12 characters. `book_reader_sessions` stores SHA256 hashes of random 256-bit bearer tokens with a seven-day absolute expiry. Account access changes and session creation lock the same row; pausing/restoring access invalidates older sessions.

`book_reader_state` stores account-owned bookmark, note and progress records. Optional reading anchors and quotation/highlight ranges use this same JSON state; legacy records remain accepted. Edge Function v2 validates the additive fields without schema/grant changes. The authenticated session supplies ownership; a client-supplied account binding also rejects stale-tab writes. Updates compare revisions; null tombstones preserve deletions across devices. Pending edits and their original revisions survive offline reloads. Conflicts keep the local copy and offer **Keep changes from this device** in account settings. Cloud changes load when signing in/reopening the reader; this is not realtime collaboration. Imported book files stay on the device.

Web uses a secure HttpOnly host-only cookie through the Netlify function. Expo stores its token in SecureStore. Passwords are never persisted on the device. Logout clears private UI/audio first and revokes the server session. If offline, the browser retains the HttpOnly token plus a local logout intent; Expo retains a separate SecureStore revocation token. Retry happens before a new sign-in. The BFF deliberately avoids clearing cookies in delayed responses that could overwrite a newer login in another tab; a revoked cookie has no server authority.

Browser/Expo device data and offline book caches are scoped by account ID. The web worker persists client scopes with absolute expiry and clears matching scopes on logout. Online access is rechecked on foreground and every minute; saved offline access lasts only until the existing session expiry. Account disabling cannot be detected by a disconnected device until it reconnects. Existing pre-account local data is preserved without automatically assigning it to a new reader.

All five tables enable RLS and revoke PUBLIC/anon/authenticated grants. RPCs are security invoker with empty search paths and service-role-only execution. The dedicated `book-reader-api` function validates custom sessions itself (`verify_jwt=false`); its built-in service-role environment stays on the server. It is independent of other Me+ apps. Login uses global, username and best-effort gateway-IP rate budgets; IP values are HMAC hashed. Expired rate/session/invite cleanup uses indexed batches of 500.

## First administrator

After the website origin is ready, generate a private activation file outside the repository:

```sh
node scripts/create-reader-invite.mjs https://your-reader.netlify.app /tmp/reader-invite.json
```

The file is created exclusively with owner-only permissions. Apply its `sql` in Me+ using the connected SQL tool or dashboard, then privately open `activationUrl` to choose a username and password. Do not commit the file, paste its raw token into GitHub, or send it to others. The invitation expires in 48 hours and is single use. Subsequent reader invitations and access pausing are available in the administrator's web account panel. Native accepts the same private invitation link in its account creation form.

There is no public signup or automatic email. Password reset/self-service password change is not included in this increment.

## Deploy the development version

The authorized project is `pagechime`, ID `73688a4b-90ab-4eac-be6d-ef305f33ebc3`, team `don-alex-perera`. Production PR #2 stays paused. No Netlify upload has succeeded yet.

`netlify.toml` publishes `apps/web/out`, bundles the BFF, and routes the media edge guard over `/books/*` and `/library.json`. Private media responses are no-store. The original Manifest files are ignored inputs already present in the execution workspace. A clean Git continuous deployment build does not include them; do not call an empty-library Git deploy the complete Manifest deployment.

The Netlify connector can manage projects/access settings, but does not expose upload or Git-link operations. CLI linking currently reports **Authentication required**. The managed workspace only allows package-manager hosts. Enable the supported network configuration for `api.netlify.com`, `app.netlify.com`, the resulting `*.netlify.app` deployment and `wbqnctrvxohxwiaignhg.supabase.co`, then authenticate Netlify CLI through its normal browser authorization. Do not paste a token into chat or Git.

For a local prebuilt development preview, after checking out the verified `develop` revision and restoring private inputs:

```sh
npm ci
npm run build
npx netlify-cli@27.14.2 link --filter @pagechime/web --id 73688a4b-90ab-4eac-be6d-ef305f33ebc3
npx netlify-cli@27.14.2 deploy --filter @pagechime/web --dir apps/web/out --no-build --context branch-deploy
```

Confirm the CLI's resolved publish/functions/edge directories before upload. `--context branch-deploy` selects environment context; it does not create a Git branch deploy. A real `develop` branch subdomain requires linking Git and enabling that branch in Netlify. An alias does not establish that configuration. Keep these delivery states distinct in reporting.

Keep the outer Netlify team-login gate until the app/media checks below pass. Then allow intended readers through the site visibility layer while preserving reader authentication. Do not publish `main` or the unrelated unused ChatGPT Site.

## Verification evidence and remaining hosted checks

- 14 unit/core tests cover salted hashing, ownership, account binding, expiry/logout, access revocation, invitations, input/rate limits, CAS, CSRF/cookie/media boundaries, durable outbox conflicts, status-preserving HTTP errors and delayed-cookie races.
- 22 desktop/mobile browser cases cover reading/PDF/audio/imports and account login, notes CRUD/fresh-browser sync, user switching, offline reload/reconnect, worker termination, two-tab logout, expiry, storage failure and revocation retry. Screenshots inspected; axe passes the sign-in and existing reader/library states.
- All TypeScript checks, Next export, Expo Android/iOS Hermes exports, performance budget and 93 starter checks pass locally. Native device/signing/store verification remains pending.
- Both reader migrations applied to Me+. Rolled-back live SQL checks verify invite reuse denial, CAS, session generation invalidation, anon SELECT denial, authenticated RPC denial and 10,000-character Unicode notes. No fixture accounts remain. Security advisor INFO for RLS without policies is intentional deny-by-default; unused-index INFO is expected for new tables. No unrelated Me+ advisor changes were made.
- [Hosted backend contract run](https://github.com/dn-lx/pagechime/actions/runs/40007820279) passed actual `/me` 401, `/state` 401, malformed login 400, and unknown-user login 401, exercising the live function/database without credentials or private reads.

Still required: successful real-account HTTP login/state flows, actual Netlify edge routing and file access (including anonymous GET/HEAD/Range and encoded-path cases inside the outer team gate), the final deploy URL/revision, and native device checks. Never treat the outer Netlify login page as proof that the reader guard works. See `docs/SECURITY-REVIEW.md` for the separate Expo tooling advisory.

## Pagechime compatibility

The same Netlify project is now pagechime. Retain the legacy leaf.* device-storage/cache namespaces, native app.dnlx.leaf identifiers, custom account tables and deployed book-reader-api endpoint. These stable internal identities preserve account data and installed-app upgrade paths. Host-only cookies and device-only browser imports/caches are bound to the original hostname and do not migrate to a renamed Netlify origin; sign in again to restore server-synced notes/bookmarks. No successful old-origin deploy has been verified.
