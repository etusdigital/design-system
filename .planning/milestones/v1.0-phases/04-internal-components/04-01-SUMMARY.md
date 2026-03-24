---
phase: 04-internal-components
plan: 01
subsystem: ui
tags: [react, tsx, vitest, testing-library, context, createPortal, tailwind]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: useControllable, useTransition hooks, CSS token system, test infrastructure
  - phase: 02-atomic-components
    provides: clsx usage pattern, smoke test pattern
  - phase: 03-form-components
    provides: RadioGroupContext pattern used as model for GroupContext

provides:
  - useClickOutside hook (mousedown listener with callbackRef stale-closure guard)
  - Option component with role=option, tabindex=0, state class variants
  - Overlay component via createPortal + useTransition 500ms fade
  - Group component providing GroupContext via React createContext
  - 8 test files for all Phase 4 components (Label, Option, Overlay, Group, Container, ExpandableContainer, SelectContainer, SelectContent)

affects:
  - 04-internal-components/04-02 (Container, ExpandableContainer use useClickOutside + Group)
  - 04-internal-components/04-03 (SelectContainer, SelectContent)
  - 06-composite-components (Select, Dropdown, AutoComplete consume all Phase 4 internals)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "GroupContext pattern: createContext<T | null>(null) + useContext hook exported for consumers"
    - "Portal pattern: createPortal(node, document.body) with useTransition for enter/leave lifecycle"
    - "callbackRef stale-closure guard: useRef(callback) updated each render, used inside stable useEffect"
    - "RAF/cAF module-level polyfill in test files (vi.useRealTimers resets beforeEach assignments)"

key-files:
  created:
    - src/hooks/useClickOutside.ts
    - src/hooks/useClickOutside.test.ts
    - src/utils/components/Option.tsx
    - src/utils/styles/Option.css
    - src/utils/components/Overlay.tsx
    - src/utils/components/Overlay.css
    - src/utils/components/Group.tsx
    - src/utils/components/Label.test.tsx
    - src/utils/components/Option.test.tsx
    - src/utils/components/Overlay.test.tsx
    - src/utils/components/Group.test.tsx
    - src/utils/components/Container.test.tsx
    - src/utils/components/ExpandableContainer.test.tsx
    - src/utils/components/SelectContainer.test.tsx
    - src/utils/components/SelectContent.test.tsx
  modified:
    - src/hooks/index.ts

key-decisions:
  - "useClickOutside uses mousedown (not click) per locked decision from RESEARCH.md"
  - "Group uses Tailwind classes inline-flex/flex-col/items-end (no CSS module) matching Vue @apply pattern"
  - "Overlay RAF/cAF polyfill must be at module level in tests — vi.useRealTimers() removes beforeEach assignments"
  - "GroupContext value field is currentValue ?? null to preserve null for unselected state"

patterns-established:
  - "Module-level RAF polyfill pattern in test files to survive vi.useRealTimers() in afterEach"
  - "Smoke stub test files pre-created for Plans 02/03 components with TODO comments"

requirements-completed: [INTL-01, INTL-02, INTL-06, INTL-07]

# Metrics
duration: 3min
completed: 2026-03-16
---

# Phase 4 Plan 01: Internal Components — Option, Overlay, Group, useClickOutside Summary

**React TSX migration of Option (ARIA role=option), Overlay (createPortal + 500ms fade), Group (GroupContext via createContext), and useClickOutside hook with callbackRef stale-closure guard — 30 tests passing across 5 test files.**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-16T23:06:04Z
- **Completed:** 2026-03-16T23:09:25Z
- **Tasks:** 2
- **Files modified:** 16

## Accomplishments
- useClickOutside hook: mousedown listener, callbackRef pattern, enabled flag — 3 tests passing
- Option component faithfully ported from Vue with role=option, tabindex=0, state classes — 10 tests passing
- Overlay component via createPortal to document.body, useTransition 500ms fade, click-dismiss — 5 tests passing
- Group component with React createContext (GroupContext), useControllable for value management — 8 tests passing
- Label tests with real assertions (renders labelValue, required indicator, null guard)
- 8 pre-created stub test files for all Phase 4 components ready for Plans 02/03

## Task Commits

Each task was committed atomically:

1. **Task 1: Create smoke test stubs + useClickOutside hook** - `2e4a1ea` (feat)
2. **Task 2: Migrate Option, Overlay, Group from Vue to React TSX** - `fb3c585` (feat)

## Files Created/Modified
- `src/hooks/useClickOutside.ts` - Shared hook for click-outside detection via mousedown
- `src/hooks/useClickOutside.test.ts` - 3 tests: outside fires, inside doesn't, disabled skips
- `src/hooks/index.ts` - Added useClickOutside export
- `src/utils/components/Option.tsx` - Presentational option with ARIA role, state class variants
- `src/utils/styles/Option.css` - Tailwind @apply styles for all option states
- `src/utils/components/Overlay.tsx` - Portal backdrop with useTransition fade
- `src/utils/components/Overlay.css` - Fixed full-screen backdrop with opacity transition
- `src/utils/components/Group.tsx` - GroupContext provider + useGroupContext consumer hook
- `src/utils/components/Label.test.tsx` - Real assertions for existing Label component
- `src/utils/components/Option.test.tsx` - 10 real tests for Option
- `src/utils/components/Overlay.test.tsx` - 5 tests with createPortal mock
- `src/utils/components/Group.test.tsx` - 8 tests for context propagation and select callback
- `src/utils/components/Container.test.tsx` - Smoke stub for Plan 02
- `src/utils/components/ExpandableContainer.test.tsx` - Smoke stub for Plan 02
- `src/utils/components/SelectContainer.test.tsx` - Smoke stub for Plan 03
- `src/utils/components/SelectContent.test.tsx` - Smoke stub for Plan 03

## Decisions Made
- useClickOutside uses `mousedown` (not `click`) per RESEARCH.md locked decision
- Group uses Tailwind classes directly (`inline-flex`, `flex-col`, `items-end`) rather than CSS module — matches Vue `@apply` pattern with 3 rules
- GroupContext value is `currentValue ?? null` to preserve null for "nothing selected" state
- RAF/cAF polyfills placed at module level in Overlay.test.tsx (not in beforeEach) because `vi.useRealTimers()` in afterEach removes assignments made in beforeEach, causing `cancelAnimationFrame is not defined` on component unmount cleanup

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] RAF/cAF polyfill placement in Overlay.test.tsx**
- **Found during:** Task 2 (Overlay component migration)
- **Issue:** Tests 3–5 in Overlay.test.tsx failed with `cancelAnimationFrame is not defined` on component unmount. The polyfill was set in `beforeEach` but `vi.useRealTimers()` in `afterEach` removed it before React's passive effect cleanup ran.
- **Fix:** Moved polyfills to module level (outside beforeEach/afterEach) so they persist across timer restoration
- **Files modified:** src/utils/components/Overlay.test.tsx
- **Verification:** All 5 Overlay tests pass
- **Committed in:** fb3c585 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - bug fix)
**Impact on plan:** Single test infrastructure fix, no scope creep, no component behavior change.

## Issues Encountered
None beyond the RAF polyfill placement — resolved inline.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- useClickOutside ready for Container (Plan 02) which uses it for click-outside-to-close
- Group ready for consumer components in Phase 6 composites
- Overlay ready for Dialog, Modal, and Drawer in later phases
- 4 stub test files pre-created — Plans 02/03 expand them with real assertions after migration

---
*Phase: 04-internal-components*
*Completed: 2026-03-16*

## Self-Check: PASSED

- FOUND: src/hooks/useClickOutside.ts
- FOUND: src/utils/components/Option.tsx
- FOUND: src/utils/components/Overlay.tsx
- FOUND: src/utils/components/Group.tsx
- FOUND: src/utils/styles/Option.css
- FOUND: .planning/phases/04-internal-components/04-01-SUMMARY.md
- FOUND commit 2e4a1ea: feat(04-01): add useClickOutside hook and Phase 4 smoke test stubs
- FOUND commit fb3c585: feat(04-01): migrate Option, Overlay, Group components from Vue to React TSX
