---
phase: 8
slug: build-distribution
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-23
---

# Phase 8 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 3.2.4 (unit project, jsdom) |
| **Config file** | `vite.config.ts` (test.projects[1]) |
| **Quick run command** | `npm run build:lib` |
| **Full suite command** | `npm run build:lib && node scripts/verify-imports.cjs && npm publish --dry-run` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build:lib`
- **After every plan wave:** Run `npm run build:lib && node scripts/verify-imports.cjs && npm publish --dry-run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 08-01-01 | 01 | 1 | DIST-01 | smoke (build) | `npm run build:lib` | ✅ | ⬜ pending |
| 08-01-02 | 01 | 1 | DIST-01 | smoke (file check) | `node scripts/verify-imports.cjs` | ❌ W0 | ⬜ pending |
| 08-02-01 | 02 | 1 | DIST-02 | smoke (file check) | `node scripts/verify-imports.cjs` | ❌ W0 | ⬜ pending |
| 08-03-01 | 03 | 1 | DIST-03 | smoke (file check) | `node scripts/verify-imports.cjs` | ❌ W0 | ⬜ pending |
| 08-04-01 | 04 | 2 | DIST-04 | smoke (npm) | `npm publish --dry-run` | ✅ | ⬜ pending |
| 08-04-02 | 04 | 2 | DIST-04 | static check | `node -e "const p=require('./package.json');..."` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `scripts/verify-imports.cjs` — verification script covering DIST-01 output file existence, DIST-02 `.d.ts` generation, DIST-03 tailwind config importability

*Existing infrastructure covers test framework — Vitest already configured.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| TypeScript autocomplete works for component props | DIST-02 | IDE-level verification | Open a TS file, import Button, verify IntelliSense shows all props |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
