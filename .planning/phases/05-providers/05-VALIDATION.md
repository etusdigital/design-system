---
phase: 5
slug: providers
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-16
---

# Phase 5 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest |
| **Config file** | vitest.config.ts |
| **Quick run command** | `npx vitest run --reporter=verbose` |
| **Full suite command** | `npx vitest run --reporter=verbose` |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run --reporter=verbose`
- **After every plan wave:** Run `npx vitest run --reporter=verbose`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 05-01-01 | 01 | 1 | PROV-01 | unit | `npx vitest run src/components/Dialog` | ❌ W0 | ⬜ pending |
| 05-02-01 | 02 | 1 | PROV-02 | unit | `npx vitest run src/providers/ConfirmProvider` | ❌ W0 | ⬜ pending |
| 05-02-02 | 02 | 1 | PROV-03 | unit | `npx vitest run src/providers/useConfirm` | ❌ W0 | ⬜ pending |
| 05-03-01 | 03 | 1 | PROV-04 | unit | `npx vitest run src/providers/ToastProvider` | ❌ W0 | ⬜ pending |
| 05-03-02 | 03 | 1 | PROV-05 | unit | `npx vitest run src/providers/useToast` | ❌ W0 | ⬜ pending |
| 05-04-01 | 04 | 2 | PROV-01 | integration | `npx vitest run src/providers/DesignSystemProvider` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] Test stubs for Dialog, ConfirmProvider, ToastProvider, DesignSystemProvider
- [ ] Shared test utilities for rendering with providers

*Existing vitest infrastructure covers framework needs.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Toast slide animation timing | PROV-04 | CSS animation visual verification | Open toast, verify 600ms slide-in/out transition |
| Dialog shake animation on outside click | PROV-02 | CSS animation visual verification | Click outside confirm dialog, verify shake animation |
| Toast 4-corner positioning | PROV-04 | Layout visual verification | Show toasts in all 4 corners, verify positioning |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
