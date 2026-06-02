---
phase: 06-composite-components
plan: 26
subsystem: ui
tags: [react, css-modules, stepper, round-menu, tailwind]

requires:
  - phase: 06-composite-components
    provides: Stepper and RoundMenu component implementations

provides:
  - Stepper original icon rendering for past steps (no checkmark substitution)
  - Stepper allowSkip prop with adjacency guard preventing non-adjacent step clicks
  - Stepper future step lighter background via --neutral-surface-secondary token
  - RoundMenu stable item positioning via left:0/top:0 anchor on .menuItem
  - RoundMenu rightward label expansion via transform-origin: left center on trigger
  - RoundMenu properly-sized buttons (medium default, not small)

affects: [06-composite-components]

tech-stack:
  added: []
  patterns:
    - "allowSkip adjacency guard: Math.abs(index - current) > 1 check before step navigation"
    - "CSS anchor pattern: left:0;top:0 on position:absolute children for stable translate3d origin"

key-files:
  created: []
  modified:
    - src/components/Stepper/Stepper.tsx
    - src/components/Stepper/Stepper.module.css
    - src/components/RoundMenu/RoundMenu.tsx
    - src/components/RoundMenu/RoundMenu.module.css

key-decisions:
  - "Stepper past steps always render original icon (getIcon(option)) — green filled background is the visual distinction, not icon change"
  - "allowSkip defaults to false; adjacency guard uses Math.abs(index - current) > 1 allowing current±1 only"
  - "backgroundFuture uses --neutral-surface-secondary (light surface) instead of --neutral-border-default (solid gray disc)"
  - "RoundMenu .menuItem gets left:0;top:0 so translate3d offsets from known zero-point regardless of container width"
  - "RoundMenu trigger uses transform-origin: left center so pill expansion goes rightward from fixed circle origin"
  - "RoundMenu default radius increased from 80 to 110px for better item spacing with medium-sized buttons"

requirements-completed: [COMP-04, COMP-12]

duration: 8min
completed: 2026-03-18
---

# Phase 6 Plan 26: Stepper and RoundMenu Bug Fixes Summary

**Stepper original-icon rendering restored, allowSkip adjacency guard added, and RoundMenu anchored with rightward label expansion and properly-sized items**

## Performance

- **Duration:** 8 min
- **Started:** 2026-03-18T20:35:00Z
- **Completed:** 2026-03-18T20:43:00Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Removed past-step hardcoded checkmark; all Stepper steps now display their original icon (green filled circle is the visual indicator for past state)
- Added `allowSkip` prop (default `false`) with `Math.abs(index - current) > 1` adjacency guard in `handleStepClick`
- Fixed `.backgroundFuture` CSS from `--neutral-border-default` (solid gray disc) to `--neutral-surface-secondary` (lighter neutral surface)
- Added `left: 0; top: 0;` to `.menuItem` so `translate3d` offsets from a stable zero-point regardless of trigger button width
- Added `transform-origin: left center` on `.trigger` so label pill expansion grows rightward while keeping the circle origin fixed
- Removed `size="small"` from all RoundMenu `Button` usages and increased default `radius` from 80 to 110px

## Task Commits

Each task was committed atomically:

1. **Task 1: Fix Stepper icon, allowSkip, and future step visual** - `f57d630` (fix)
2. **Task 2: Fix RoundMenu button position anchoring and item sizing** - `944a8be` (fix)

## Files Created/Modified
- `src/components/Stepper/Stepper.tsx` - Added `allowSkip` prop, adjacency guard, removed checkmark substitution
- `src/components/Stepper/Stepper.module.css` - Changed `.backgroundFuture` token to `--neutral-surface-secondary`
- `src/components/RoundMenu/RoundMenu.tsx` - Removed `size="small"`, increased default radius to 110
- `src/components/RoundMenu/RoundMenu.module.css` - Added `left:0;top:0` anchor to `.menuItem`, `transform-origin: left center` to `.trigger`

## Decisions Made
- Stepper past steps never show checkmark — green filled background (`bg-primary-interaction-default`) is the visual indicator; icon stays original per Vue source behavior
- `allowSkip=false` blocks only non-adjacent steps; adjacent (current+1, current-1) and current step itself remain clickable
- `--neutral-surface-secondary` chosen over `--neutral-surface-default` for future steps — lighter than the active/past primary green without disappearing
- `transform-origin: left center` on trigger (not the menuItem wrapper) because the Button's pill expansion is the source of position drift

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
- Pre-commit hook's `generate-docs` script caused a `fatal: cannot lock ref 'HEAD'` error on the RoundMenu commit attempt (concurrent write from hook and git). The commit succeeded on the second attempt with the already-staged files.

## Next Phase Readiness
- Stepper and RoundMenu UAT round 3 gaps (test 4 and test 10) are now addressed
- Remaining UAT round 3 gap closure plans can continue

---
*Phase: 06-composite-components*
*Completed: 2026-03-18*
