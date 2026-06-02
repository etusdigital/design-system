---
phase: 6
slug: composite-components
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-17
---

# Phase 6 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 3.x with jsdom + React Testing Library |
| **Config file** | `vite.config.ts` (unit project at test.projects[1]) |
| **Quick run command** | `npx vitest run --reporter=verbose --project=unit src/components/ComponentName/ComponentName.test.tsx` |
| **Full suite command** | `npx vitest run --project=unit` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run --project=unit src/components/[ComponentName]/[ComponentName].test.tsx`
- **After every plan wave:** Run `npx vitest run --project=unit`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 06-00-01 | 00 | 0 | all (stubs) | unit | `npx vitest run --project=unit` | ❌ W0 | ⬜ pending |
| 06-01-01 | 01 | 1 | COMP-05 | unit | `npx vitest run --project=unit src/components/Dialog/Dialog.test.tsx` | ✅ | ⬜ pending |
| 06-01-02 | 01 | 1 | COMP-06 | unit | `npx vitest run --project=unit src/components/Drawer/Drawer.test.tsx` | ❌ W0 | ⬜ pending |
| 06-01-03 | 01 | 1 | COMP-07 | unit | `npx vitest run --project=unit src/components/Accordion/Accordion.test.tsx` | ❌ W0 | ⬜ pending |
| 06-02-01 | 02 | 1 | COMP-09 | unit | `npx vitest run --project=unit src/components/Tab/Tab.test.tsx` | ❌ W0 | ⬜ pending |
| 06-02-02 | 02 | 1 | COMP-10 | unit | `npx vitest run --project=unit src/components/Pagination/Pagination.test.tsx` | ❌ W0 | ⬜ pending |
| 06-02-03 | 02 | 1 | COMP-12 | unit | `npx vitest run --project=unit src/components/Stepper/Stepper.test.tsx` | ❌ W0 | ⬜ pending |
| 06-03-01 | 03 | 1 | COMP-01 | unit | `npx vitest run --project=unit src/components/Select/Select.test.tsx` | ❌ W0 | ⬜ pending |
| 06-03-02 | 03 | 1 | COMP-02 | unit | `npx vitest run --project=unit src/components/AutoComplete/AutoComplete.test.tsx` | ❌ W0 | ⬜ pending |
| 06-04-01 | 04 | 1 | COMP-04 | unit | `npx vitest run --project=unit src/components/Dropdown/Dropdown.test.tsx` | ❌ W0 | ⬜ pending |
| 06-05-01 | 05 | 2 | COMP-03 | unit | `npx vitest run --project=unit src/components/TagSelect/TagSelect.test.tsx` | ❌ W0 | ⬜ pending |
| 06-05-02 | 05 | 2 | COMP-11 | unit | `npx vitest run --project=unit src/components/Filter/Filter.test.tsx` | ❌ W0 | ⬜ pending |
| 06-06-01 | 06 | 1 | COMP-08 | unit | `npx vitest run --project=unit src/components/Carousel/Carousel.test.tsx` | ❌ W0 | ⬜ pending |
| 06-06-02 | 06 | 1 | COMP-14 | unit | `npx vitest run --project=unit src/components/RoundMenu/RoundMenu.test.tsx` | ❌ W0 | ⬜ pending |
| 06-07-01 | 07 | 1 | COMP-17 | unit | `npx vitest run --project=unit src/components/Calendar/Calendar.test.tsx` | ❌ W0 | ⬜ pending |
| 06-08-01 | 08 | 2 | COMP-16 | unit | `npx vitest run --project=unit src/components/DatePicker/DatePicker.test.tsx` | ❌ W0 | ⬜ pending |
| 06-08-02 | 08 | 2 | COMP-13 | unit | `npx vitest run --project=unit src/components/Navbar/Navbar.test.tsx` | ❌ W0 | ⬜ pending |
| 06-09-01 | 09 | 1 | COMP-15 | unit | `npx vitest run --project=unit src/components/ColorPicker/ColorPicker.test.tsx` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/components/Tab/Tab.test.tsx` — stubs for COMP-09
- [ ] `src/components/Pagination/Pagination.test.tsx` — stubs for COMP-10
- [ ] `src/components/RoundMenu/RoundMenu.test.tsx` — stubs for COMP-14
- [ ] `src/components/Stepper/Stepper.test.tsx` — stubs for COMP-12
- [ ] `src/components/Accordion/Accordion.test.tsx` — stubs for COMP-07
- [ ] `src/components/Carousel/Carousel.test.tsx` — stubs for COMP-08
- [ ] `src/components/Drawer/Drawer.test.tsx` — stubs for COMP-06
- [ ] `src/components/Select/Select.test.tsx` — stubs for COMP-01
- [ ] `src/components/AutoComplete/AutoComplete.test.tsx` — stubs for COMP-02
- [ ] `src/components/TagSelect/TagSelect.test.tsx` — stubs for COMP-03
- [ ] `src/components/Dropdown/Dropdown.test.tsx` — stubs for COMP-04
- [ ] `src/components/Filter/Filter.test.tsx` — stubs for COMP-11
- [ ] `src/components/Navbar/Navbar.test.tsx` — stubs for COMP-13
- [ ] `src/components/Calendar/Calendar.test.tsx` — stubs for COMP-17
- [ ] `src/components/DatePicker/DatePicker.test.tsx` — stubs for COMP-16
- [ ] `src/components/ColorPicker/ColorPicker.test.tsx` — stubs for COMP-15 (smoke + window listener tests only)

Framework install: None required — vitest + jsdom + @testing-library/react already installed and configured.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| ColorPicker canvas color rendering | COMP-15 | jsdom has no canvas 2d context | Verify color area renders correct gradient in Storybook |
| Calendar slide-fade direction animation | COMP-17 | CSS transitions not testable in jsdom | Navigate months in Storybook, verify slide direction |
| Drawer slide position animation | COMP-06 | CSS transitions not testable in jsdom | Open Drawer in each position in Storybook, verify slide direction |
| Carousel autoplay visual timing | COMP-08 | setInterval timing unreliable in jsdom | Run Carousel story with autoplay, verify smooth transitions |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
