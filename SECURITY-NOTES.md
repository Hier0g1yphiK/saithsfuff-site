# Security Scan Notes

**Scanned**: June 24, 2026  
**Tool**: Snyk (SAST + SCA)

## Code Scan (SAST)

✅ No vulnerabilities found in source code.

## Dependency Scan (SCA)

⚠️ **15 vulnerabilities** found — all in `next` and `postcss`.

### Summary

| Severity | Count |
| -------- | ----- |
| High     | 7     |
| Medium   | 6     |
| Low      | 1     |

### Details

#### next@14.2.35 (direct dependency) — 14 issues

| Severity | Title                                                | CVE            | Fixed In |
| -------- | ---------------------------------------------------- | -------------- | -------- |
| High     | Allocation of Resources Without Limits or Throttling | CVE-2025-59471 | 15.5.10  |
| High     | Allocation of Resources Without Limits or Throttling | CVE-2026-23864 | 15.0.8   |
| High     | Allocation of Resources Without Limits or Throttling | CVE-2026-23869 | 15.5.15  |
| High     | Allocation of Resources Without Limits or Throttling | CVE-2026-23870 | 15.5.16  |
| High     | Allocation of Resources Without Limits or Throttling | CVE-2026-44577 | 15.5.16  |
| High     | Server-side Request Forgery (SSRF)                   | CVE-2026-44578 | 15.5.16  |
| High     | Incorrect Authorization                              | CVE-2026-44573 | 15.5.16  |
| Medium   | Allocation of Resources Without Limits or Throttling | CVE-2026-27980 | 16.1.7   |
| Medium   | HTTP Request Smuggling                               | CVE-2026-29057 | 15.5.13  |
| Medium   | Acceptance of Extraneous Untrusted Data              | CVE-2026-44572 | 15.5.16  |
| Medium   | Interpretation Conflict                              | CVE-2026-44576 | 15.5.16  |
| Medium   | Use of Weak Hash                                     | CVE-2026-44582 | 15.5.16  |
| Medium   | Cross-site Scripting (XSS)                           | CVE-2026-44580 | 15.5.16  |
| Low      | Cross-site Scripting (XSS)                           | CVE-2026-44581 | 15.5.16  |

#### postcss@8.4.31 (transitive via next) — 1 issue

| Severity | Title                      | CVE            | Fixed In |
| -------- | -------------------------- | -------------- | -------- |
| Medium   | Cross-site Scripting (XSS) | CVE-2026-41305 | 8.5.10   |

### Recommended Fix

Upgrade `next` from `14.2.35` → `15.5.16` (major version bump — expect breaking changes).

This resolves 13 of 14 Next.js issues. One medium-severity issue (CVE-2026-27980) requires `next@16.1.7`.

The `postcss` issue should resolve automatically when Next.js is upgraded (it pulls in a newer transitive version).

### Notes

- Next.js 14 → 15 is a **major upgrade** requiring migration work (React 19, changed APIs, etc.)
- Plan this as a dedicated effort rather than a quick patch
- No urgent action needed if the site is not handling sensitive user data or auth flows
