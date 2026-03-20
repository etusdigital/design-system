---
phase: 7
slug: complex-components
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-20
---

# Phase 7 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 3.2.x + React Testing Library 16.x |
| **Config file** | `vite.config.ts` — `test.projects[1]` (unit project, name: "unit") |
| **Quick run command** | `npx vitest run --project unit src/components/{ComponentName}/{ComponentName}.test.tsx` |
| **Full suite command** | `npx vitest run --project unit` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run --project unit src/components/{ComponentName}/{ComponentName}.test.tsx`
- **After every plan wave:** Run `npx vitest run --project unit`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 07-01-01 | 01 | 1 | CPLX-01 | unit | `npx vitest run --project unit src/components/Table/Table.test.tsx` | ❌ W0 | ⬜ pending |
| 07-01-02 | 01 | 1 | CPLX-01 | unit | same file | ❌ W0 | ⬜ pending |
| 07-01-03 | 01 | 1 | CPLX-01 | unit | same file | ❌ W0 | ⬜ pending |
| 07-02-01 | 02 | 1 | CPLX-02 | unit | `npx vitest run --project unit src/components/Tree/Tree.test.tsx` | ❌ W0 | ⬜ pending |
| 07-02-02 | 02 | 1 | CPLX-02 | unit | same file | ❌ W0 | ⬜ pending |
| 07-03-01 | 03 | 1 | CPLX-03 | unit | `npx vitest run --project unit src/components/Sidebar/Sidebar.test.tsx` | ❌ W0 | ⬜ pending |
| 07-04-01 | 04 | 1 | CPLX-04 | unit | `npx vitest run --project unit src/components/RichTextEditor/RichTextEditor.test.tsx` | ❌ W0 | ⬜ pending |
| 07-04-02 | 04 | 1 | CPLX-04 | unit | same file | ❌ W0 | ⬜ pending |
| 07-05-01 | 05 | 2 | CPLX-05 | unit | `npx vitest run --project unit src/components/Crop/Crop.test.tsx` | ❌ W0 | ⬜ pending |
| 07-06-01 | 06 | 2 | CPLX-06 | unit | `npx vitest run --project unit src/components/History/History.test.tsx` | ❌ W0 | ⬜ pending |
| 07-06-02 | 06 | 2 | CPLX-06 | unit | same file | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/components/Table/Table.test.tsx` — stubs for CPLX-01
- [ ] `src/components/Tree/Tree.test.tsx` — stubs for CPLX-02
- [ ] `src/components/Sidebar/Sidebar.test.tsx` — stubs for CPLX-03
- [ ] `src/components/RichTextEditor/RichTextEditor.test.tsx` — stubs for CPLX-04
- [ ] `src/components/Crop/Crop.test.tsx` — stubs for CPLX-05
- [ ] `src/components/History/History.test.tsx` — stubs for CPLX-06

*Existing infrastructure covers framework setup. Only test file stubs needed.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| RichTextEditor toolbar execCommand visual formatting | CPLX-04 | jsdom doesn't support contenteditable/execCommand | Open Storybook, type text, apply bold/italic/underline, verify formatting persists |
| Crop drag/zoom visual result | CPLX-05 | Drag interactions require real pointer events + visual verification | Open Storybook, load image, drag to reposition, zoom slider, verify crop preview updates |
| Sidebar height calculation from navbar | CPLX-03 | Requires real DOM layout with navbar element | Open Storybook with navbar fixture, verify sidebar fills remaining viewport height |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
