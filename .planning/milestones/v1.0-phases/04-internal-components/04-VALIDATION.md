---
phase: 4
slug: internal-components
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-16
---

# Phase 4 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 3.x + React Testing Library + jsdom |
| **Config file** | `vite.config.ts` (test.projects[1] — "unit" project) |
| **Quick run command** | `npx vitest run --project unit src/utils/` |
| **Full suite command** | `npx vitest run --project unit` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run --project unit src/utils/`
- **After every plan wave:** Run `npx vitest run --project unit`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 04-01-01 | 01 | 0 | INTL-01 | unit | `npx vitest run --project unit src/utils/components/Label.test.tsx` | ❌ W0 | ⬜ pending |
| 04-01-02 | 01 | 0 | INTL-02 | unit | `npx vitest run --project unit src/utils/components/Overlay.test.tsx` | ❌ W0 | ⬜ pending |
| 04-01-03 | 01 | 0 | INTL-03 | unit | `npx vitest run --project unit src/utils/components/Container.test.tsx` | ❌ W0 | ⬜ pending |
| 04-01-04 | 01 | 0 | INTL-04 | unit | `npx vitest run --project unit src/utils/components/SelectContainer.test.tsx` | ❌ W0 | ⬜ pending |
| 04-01-05 | 01 | 0 | INTL-05 | unit | `npx vitest run --project unit src/utils/components/SelectContent.test.tsx` | ❌ W0 | ⬜ pending |
| 04-01-06 | 01 | 0 | INTL-06 | unit | `npx vitest run --project unit src/utils/components/Option.test.tsx` | ❌ W0 | ⬜ pending |
| 04-01-07 | 01 | 0 | INTL-07 | unit | `npx vitest run --project unit src/utils/components/Group.test.tsx` | ❌ W0 | ⬜ pending |
| 04-01-08 | 01 | 0 | INTL-08 | unit | `npx vitest run --project unit src/utils/components/ExpandableContainer.test.tsx` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/utils/components/Label.test.tsx` — stubs for INTL-01 (component exists from Phase 3, test missing)
- [ ] `src/utils/components/Overlay.test.tsx` — stubs for INTL-02
- [ ] `src/utils/components/Container.test.tsx` — stubs for INTL-03
- [ ] `src/utils/components/SelectContainer.test.tsx` — stubs for INTL-04
- [ ] `src/utils/components/SelectContent.test.tsx` — stubs for INTL-05
- [ ] `src/utils/components/Option.test.tsx` — stubs for INTL-06
- [ ] `src/utils/components/Group.test.tsx` — stubs for INTL-07
- [ ] `src/utils/components/ExpandableContainer.test.tsx` — stubs for INTL-08
- [ ] `src/hooks/useClickOutside.test.ts` — stubs for useClickOutside hook (INTL-03 dependency)
- [ ] ResizeObserver global mock — add to `vitest.setup.ts` or individual test files

*Existing infrastructure covers framework and config. Wave 0 creates test files and mocks only.*

---

## Manual-Only Verifications

*All phase behaviors have automated verification.*

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
