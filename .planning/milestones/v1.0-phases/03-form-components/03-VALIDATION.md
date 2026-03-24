---
phase: 3
slug: form-components
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-16
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 3.x (unit project) + React Testing Library |
| **Config file** | `vite.config.ts` — `test.projects[1]` (unit project) |
| **Quick run command** | `npx vitest run --project unit src/components/{Component}/{Component}.test.tsx` |
| **Full suite command** | `npx vitest run --project unit` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run --project unit src/components/{Component}/{Component}.test.tsx`
- **After every plan wave:** Run `npx vitest run --project unit`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 03-01-01 | 01 | 1 | FORM-01 | unit | `npx vitest run --project unit src/components/Input/Input.test.tsx` | ❌ W0 | ⬜ pending |
| 03-01-02 | 01 | 1 | FORM-02 | unit | `npx vitest run --project unit src/components/Textarea/Textarea.test.tsx` | ❌ W0 | ⬜ pending |
| 03-02-01 | 02 | 2 | FORM-03 | unit | `npx vitest run --project unit src/components/Checkbox/Checkbox.test.tsx` | ❌ W0 | ⬜ pending |
| 03-02-02 | 02 | 2 | FORM-04 | unit | `npx vitest run --project unit src/components/Radio/Radio.test.tsx` | ❌ W0 | ⬜ pending |
| 03-02-03 | 02 | 2 | FORM-05 | unit | `npx vitest run --project unit src/components/RadioGroup/RadioGroup.test.tsx` | ❌ W0 | ⬜ pending |
| 03-02-04 | 02 | 2 | FORM-06 | unit | `npx vitest run --project unit src/components/Switch/Switch.test.tsx` | ❌ W0 | ⬜ pending |
| 03-02-05 | 02 | 2 | FORM-07 | unit | `npx vitest run --project unit src/components/Toggle/Toggle.test.tsx` | ❌ W0 | ⬜ pending |
| 03-02-06 | 02 | 2 | FORM-08 | unit | `npx vitest run --project unit src/components/ToggleGroup/ToggleGroup.test.tsx` | ❌ W0 | ⬜ pending |
| 03-03-01 | 03 | 3 | FORM-09 | unit | `npx vitest run --project unit src/components/Slider/Slider.test.tsx` | ❌ W0 | ⬜ pending |
| 03-03-02 | 03 | 3 | FORM-10 | unit | `npx vitest run --project unit src/components/PINInput/PINInput.test.tsx` | ❌ W0 | ⬜ pending |
| 03-03-03 | 03 | 3 | FORM-11 | unit | `npx vitest run --project unit src/components/TagInput/TagInput.test.tsx` | ❌ W0 | ⬜ pending |
| 03-03-04 | 03 | 3 | FORM-12 | unit | `npx vitest run --project unit src/components/FileUpload/FileUpload.test.tsx` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/components/Input/Input.test.tsx` — stubs for FORM-01
- [ ] `src/components/Textarea/Textarea.test.tsx` — stubs for FORM-02
- [ ] `src/components/Checkbox/Checkbox.test.tsx` — stubs for FORM-03
- [ ] `src/components/Radio/Radio.test.tsx` — stubs for FORM-04
- [ ] `src/components/RadioGroup/RadioGroup.test.tsx` — stubs for FORM-05
- [ ] `src/components/Switch/Switch.test.tsx` — stubs for FORM-06
- [ ] `src/components/Toggle/Toggle.test.tsx` — stubs for FORM-07
- [ ] `src/components/ToggleGroup/ToggleGroup.test.tsx` — stubs for FORM-08
- [ ] `src/components/Slider/Slider.test.tsx` — stubs for FORM-09
- [ ] `src/components/PINInput/PINInput.test.tsx` — stubs for FORM-10
- [ ] `src/components/TagInput/TagInput.test.tsx` — stubs for FORM-11
- [ ] `src/components/FileUpload/FileUpload.test.tsx` — stubs for FORM-12

*Test infrastructure (framework, setup file, jsdom environment) is fully configured from Phase 2. No new Wave 0 setup required — only the test files themselves.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Visual match of Checkbox/Radio/Switch/Toggle states | FORM-03, FORM-04, FORM-06, FORM-07 | CSS visual fidelity requires visual inspection | Compare Storybook stories against Vue originals side-by-side |
| Slider thumb drag interaction | FORM-09 | Mouse/touch drag requires browser event simulation beyond jsdom | Test in Storybook: drag thumb, verify value updates |
| FileUpload native drag-and-drop | FORM-12 | Native drag events limited in jsdom | Test in Storybook: drag file onto drop zone |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
