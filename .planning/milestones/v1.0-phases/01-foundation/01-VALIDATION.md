---
phase: 1
slug: foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-13
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 4.1.0 |
| **Config file** | `vite.config.ts` (must add unit project entry) |
| **Quick run command** | `npx vitest run --project unit` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx tsc --noEmit`
- **After every plan wave:** Run `npx vitest run --project unit && npx tsc --noEmit`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 1-01-01 | 01 | 1 | FOUND-01 | build | `npx tsc --noEmit` | ✅ tsconfig.app.json (needs edit) | ⬜ pending |
| 1-01-02 | 01 | 1 | FOUND-02 | build | `npx vite build` | ✅ vite.config.ts (needs edit) | ⬜ pending |
| 1-01-03 | 01 | 1 | FOUND-03 | manual | `node -e "require('react')"` | ❌ W0: package.json update | ⬜ pending |
| 1-01-04 | 01 | 1 | FOUND-04 | unit | `npx vitest run --project unit src/hooks/useControllable.test.ts` | ❌ W0 | ⬜ pending |
| 1-01-05 | 01 | 1 | FOUND-05 | unit | `npx vitest run --project unit src/components/Input/Input.test.tsx` | ❌ W0 | ⬜ pending |
| 1-01-06 | 01 | 1 | FOUND-06 | unit | `npx vitest run --project unit src/components/Icon/Icon.test.tsx` | ❌ W0 | ⬜ pending |
| 1-01-07 | 01 | 1 | FOUND-07 | build | `npx tsc --noEmit` | ✅ existing index.ts (needs edit) | ⬜ pending |
| 1-01-08 | 01 | 1 | FOUND-08 | manual-only | Code review | N/A | ⬜ pending |
| 1-01-09 | 01 | 1 | FOUND-09 | unit | `npx vitest run --project unit src/hooks/useTransition.test.ts` | ❌ W0 | ⬜ pending |
| 1-01-10 | 01 | 1 | FOUND-10 | e2e | `npm run storybook` + manual check | ✅ .storybook/main.ts (needs edit) | ⬜ pending |
| 1-01-11 | 01 | 1 | FOUND-11 | build | `npx vitest run --project unit` | ✅ vite.config.ts (needs edit) | ⬜ pending |
| 1-01-12 | 01 | 1 | FOUND-12 | build | `npx tsc --noEmit` | ✅ src/index.ts (needs rewrite) | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `vitest.setup.ts` — root-level setup for @testing-library/jest-dom
- [ ] Second Vitest project entry in `vite.config.ts` for `unit` environment with jsdom
- [ ] `src/hooks/useControllable.test.ts` — stubs for FOUND-04
- [ ] `src/hooks/useTransition.test.ts` — stubs for FOUND-09
- [ ] `src/components/Icon/Icon.test.tsx` — stubs for FOUND-06

*Existing infrastructure covers FOUND-01, FOUND-02, FOUND-07, FOUND-10, FOUND-11, FOUND-12 after config edits.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| CSS scoping strategy documented | FOUND-08 | Architecture decision, not runtime behavior | Review that components use Tailwind + component CSS files, accept `className` prop |
| Storybook renders in browser | FOUND-10 | Requires browser + dev server | Run `npm run storybook`, verify story renders visually |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
