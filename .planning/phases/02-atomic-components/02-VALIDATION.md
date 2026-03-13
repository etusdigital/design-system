---
phase: 2
slug: atomic-components
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-13
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest + React Testing Library |
| **Config file** | `vite.config.ts` — `test.projects[1]` (unit project) |
| **Quick run command** | `npx vitest run --project unit src/components/[ComponentName]` |
| **Full suite command** | `npx vitest run --project unit` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run --project unit src/components/[ComponentName]/[ComponentName].test.tsx`
- **After every plan wave:** Run `npx vitest run --project unit`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 1 | ATOM-01 | unit | `npx vitest run --project unit src/components/Button/Button.test.tsx` | ❌ W0 | ⬜ pending |
| 02-01-02 | 01 | 1 | ATOM-06 | unit | `npx vitest run --project unit src/components/Spinner/Spinner.test.tsx` | ❌ W0 | ⬜ pending |
| 02-01-03 | 01 | 1 | ATOM-07 | unit | `npx vitest run --project unit src/components/Skeleton/Skeleton.test.tsx` | ❌ W0 | ⬜ pending |
| 02-01-04 | 01 | 1 | ATOM-08 | unit | `npx vitest run --project unit src/components/Separator/Separator.test.tsx` | ❌ W0 | ⬜ pending |
| 02-02-01 | 02 | 2 | ATOM-03 | unit | `npx vitest run --project unit src/components/Badge/Badge.test.tsx` | ❌ W0 | ⬜ pending |
| 02-02-02 | 02 | 2 | ATOM-04 | unit | `npx vitest run --project unit src/components/StatusBadge/StatusBadge.test.tsx` | ❌ W0 | ⬜ pending |
| 02-02-03 | 02 | 2 | ATOM-05 | unit | `npx vitest run --project unit src/components/Avatar/Avatar.test.tsx` | ❌ W0 | ⬜ pending |
| 02-02-04 | 02 | 2 | ATOM-09 | unit | `npx vitest run --project unit src/components/ProgressBar/ProgressBar.test.tsx` | ❌ W0 | ⬜ pending |
| 02-02-05 | 02 | 2 | ATOM-10 | unit | `npx vitest run --project unit src/components/Alert/Alert.test.tsx` | ❌ W0 | ⬜ pending |
| 02-03-01 | 03 | 3 | ATOM-11 | unit | `npx vitest run --project unit src/components/Tooltip/Tooltip.test.tsx` | ❌ W0 | ⬜ pending |
| 02-03-02 | 03 | 3 | ATOM-12 | unit | `npx vitest run --project unit src/components/Breadcrumb/Breadcrumb.test.tsx` | ❌ W0 | ⬜ pending |
| 02-03-03 | 03 | 3 | ATOM-13 | unit | `npx vitest run --project unit src/components/Card/Card.test.tsx` | ❌ W0 | ⬜ pending |
| 02-03-04 | 03 | 3 | ATOM-14 | unit | `npx vitest run --project unit src/components/ActionCard/ActionCard.test.tsx` | ❌ W0 | ⬜ pending |
| 02-03-05 | 03 | 3 | ATOM-15 | unit | `npx vitest run --project unit src/components/IconCard/IconCard.test.tsx` | ❌ W0 | ⬜ pending |
| 02-03-06 | 03 | 3 | ATOM-16 | unit | `npx vitest run --project unit src/components/MetricCard/MetricCard.test.tsx` | ❌ W0 | ⬜ pending |
| 02-04-01 | 04 | 4 | ATOM-17 | unit | `npx vitest run --project unit src/components/FloatCard/FloatCard.test.tsx` | ❌ W0 | ⬜ pending |
| 02-04-02 | 04 | 4 | ATOM-18 | unit | `npx vitest run --project unit src/components/Image/Image.test.tsx` | ❌ W0 | ⬜ pending |
| 02-04-03 | 04 | 4 | ATOM-19 | unit | `npx vitest run --project unit src/components/Connector/Connector.test.tsx` | ❌ W0 | ⬜ pending |
| 02-04-04 | 04 | 4 | ATOM-20 | unit | `npx vitest run --project unit src/components/Profile/Profile.test.tsx` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/components/Button/Button.test.tsx` — stubs for ATOM-01
- [ ] `src/components/Badge/Badge.test.tsx` — stubs for ATOM-03
- [ ] `src/components/StatusBadge/StatusBadge.test.tsx` — stubs for ATOM-04
- [ ] `src/components/Avatar/Avatar.test.tsx` — stubs for ATOM-05
- [ ] `src/components/Spinner/Spinner.test.tsx` — stubs for ATOM-06
- [ ] `src/components/Skeleton/Skeleton.test.tsx` — stubs for ATOM-07
- [ ] `src/components/Separator/Separator.test.tsx` — stubs for ATOM-08
- [ ] `src/components/ProgressBar/ProgressBar.test.tsx` — stubs for ATOM-09
- [ ] `src/components/Alert/Alert.test.tsx` — stubs for ATOM-10
- [ ] `src/components/Tooltip/Tooltip.test.tsx` — stubs for ATOM-11
- [ ] `src/components/Breadcrumb/Breadcrumb.test.tsx` — stubs for ATOM-12
- [ ] `src/components/Card/Card.test.tsx` — stubs for ATOM-13
- [ ] `src/components/ActionCard/ActionCard.test.tsx` — stubs for ATOM-14
- [ ] `src/components/IconCard/IconCard.test.tsx` — stubs for ATOM-15
- [ ] `src/components/MetricCard/MetricCard.test.tsx` — stubs for ATOM-16
- [ ] `src/components/FloatCard/FloatCard.test.tsx` — stubs for ATOM-17
- [ ] `src/components/Image/Image.test.tsx` — stubs for ATOM-18
- [ ] `src/components/Connector/Connector.test.tsx` — stubs for ATOM-19
- [ ] `src/components/Profile/Profile.test.tsx` — stubs for ATOM-20

Existing: `src/components/Icon/Icon.test.tsx` — covers ATOM-02

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Visual parity with Vue version | All ATOM-* | Pixel-level visual match requires human eye | Compare React Storybook stories side-by-side with Vue Storybook |
| Tooltip/FloatCard portal positioning | ATOM-11, ATOM-17 | Position depends on viewport context | Verify tooltip appears near trigger element, not at page corner |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
