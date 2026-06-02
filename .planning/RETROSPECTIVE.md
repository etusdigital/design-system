# Project Retrospective

*A living document updated after each milestone. Lessons feed forward into future planning.*

## Milestone: v1.0 — Vue to React Migration

**Shipped:** 2026-03-24
**Phases:** 9 | **Plans:** 84

### What Was Built
- Complete migration of 60+ Vue 3 components to React TSX functional components
- useControllable hook providing unified controlled/uncontrolled pattern across all form inputs
- React context providers (DesignSystemProvider, ConfirmProvider, ToastProvider) replacing Vue globals
- Portal-based overlay system for Dialog, Drawer, Tooltip, Select, ColorPicker, DatePicker
- Multi-format build output (ES, CJS, UMD) with TypeScript declarations
- 396-test suite with React Testing Library across 68 test files

### What Worked
- Dependency-ordered phase structure (foundation → atoms → forms → internal → providers → composites → complex → build → docs) eliminated circular dependency issues
- Smoke test stubs (Nyquist compliance) in Wave 0 plans caught integration issues early
- UAT gap closure rounds (R1, R2, R3 in Phase 6) systematically caught visual/behavioral mismatches
- useControllable abstraction enabled consistent controlled/uncontrolled API across all 12 form components
- CSS class toggling for transitions avoided react-transition-group dependency while matching Vue animations

### What Was Inefficient
- Phase 6 (Composite Components) grew to 33 plans due to 3 rounds of UAT gap closure — earlier visual verification could have reduced rework
- Phases 1 and 2 plan checkboxes in ROADMAP.md never updated from `[ ]` to `[x]` despite being complete — progress tracking was inconsistent for early phases
- Some summary files lacked structured one_liner fields, making automated extraction fail

### Patterns Established
- Smoke test pattern: import from ./index, render with minimal props, assert document.body.toBeTruthy()
- Portal-aware test pattern: use document.querySelector for portal-rendered content
- Mutable ref pattern (isExpandedRef) for observer/listener callbacks avoiding stale closures
- Plain CSS for portal components, CSS Modules for scoped components
- Material Symbols Rounded font via CSS (not @mdi/react package)

### Key Lessons
1. UAT verification should happen per-wave within a phase, not as a batch at the end — Phase 6's 3 gap closure rounds were expensive
2. Form components with forwardRef need it from the start — retrofitting Checkbox/Radio/Switch/Toggle later is tech debt
3. Compound sub-component declarations must be at module scope (not inside parent component) to avoid React re-mounting
4. fireEvent (not userEvent) is required with vi.useFakeTimers() — userEvent's async queue hangs fake timers

### Cost Observations
- Model mix: balanced profile (mix of opus and sonnet agents)
- Notable: Parallelized phase execution (Phases 2-4 ran concurrently due to independent deps) saved significant time

---

## Cross-Milestone Trends

### Process Evolution

| Milestone | Phases | Plans | Key Change |
|-----------|--------|-------|------------|
| v1.0 | 9 | 84 | Initial migration — established all patterns |

### Cumulative Quality

| Milestone | Tests | Files | Components |
|-----------|-------|-------|------------|
| v1.0 | 396 | 68 | 60+ |

### Top Lessons (Verified Across Milestones)

1. Dependency-ordered phases eliminate integration surprises
2. Smoke test stubs before implementation catch import/export issues early
