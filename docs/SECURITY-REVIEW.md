# Security review — initial Leaf implementation

Reviewed 2026-10-23 by an independent read-only agent under AGENTS.md. Findings were repaired: imported-book availability during library/network failure; manual page/bookmark persistence; partial offline download cleanup; native import persistence/cleanup; PDF error recovery; legacy WebKit PDF compatibility; native per-source player identity and asynchronous generation guards; schema validation before rendering.

No application secrets are committed or embedded in clients. There is no backend, payment flow, analytics or microphone requirement. The full book is restricted to ignored private build inputs and owner-private hosting. Imports use parsed PDF/text data, never injected HTML. Cached downloads reject redirects/HTML login pages. Native PDF WebView permits only its synthetic local document and blob worker URLs.

## Open tooling advisory — REQ-005

Full-monorepo `npm audit --omit=dev --audit-level=high` reports four high-severity affected dependency nodes from one advisory: [GHSA-86w9-cpqp-85rv](https://github.com/advisories/GHSA-86w9-cpqp-85rv), node-forge <=1.4.0, via Expo CLI and @expo/code-signing-certificates. npm latest is 1.4.0 and upstream lists no patched version. Downgrading to Expo 44 is not an acceptable repair. No crypto fork or audit-result suppression is introduced.

The issue concerns RSA PKCS#1 v1.5 signature verification accepting extra nested DigestAlgorithm elements. Independent review traced the affected code to Expo CLI certificate/signature utilities. This app does not configure Expo Updates, an EAS project ID or signed OTA manifests. Static Next.js output and Metro app bundles do not include node-forge or code-signing-certificates. Metro export does not invoke the CLI's manifest signature verification boundary. No affected verification boundary was demonstrated in the deployed web reader or unsigned exported bundles; this does not certify future signing/OTA paths.

The **blocking web release audit** is `npm audit --workspace @leaf/web --workspace @leaf/core --omit=dev --audit-level=high` and returns zero vulnerabilities. CI additionally runs the full tooling audit as a clearly named, non-blocking diagnostic job; it remains failing and visible until upstream remediation. The whole repository is not claimed audit-clean.

Recheck when node-forge/Expo releases a fix, and before any signed native, app-store or Expo OTA delivery. REQ-005 remains open. Real-device, signing and OTA verification are outside the completed initial export evidence.
