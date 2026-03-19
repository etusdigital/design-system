---
phase: 06-composite-components
verified: 2026-03-18T22:00:00Z
status: gaps_found
score: 5/5 success criteria verified (test-code mismatches still unresolved)
re_verification: true
previous_status: gaps_found
previous_score: 4/5 (1 blocked by test regressions)
gaps_closed:
  - "ExpandableContainer h-0 clipping removed — opacity/visibility transition animates smoothly (plan 24)"
  - "Select renders option labels via getLabel(option) — no children fallback (plan 24)"
  - "AutoComplete searchText syncs from model via useEffect; unfold_more appendIcon added to SelectContent (plan 25)"
  - "Input type=color JSX order fixed — hex text left, color swatch right (plan 25)"
  - "Stepper past steps render original icon (no checkmark substitution); allowSkip adjacency guard added; future step uses lighter --neutral-surface-secondary token (plan 26)"
  - "RoundMenu items anchored with left:0;top:0 on .menuItem; label expands rightward via transform-origin:left center; default radius 110px (plan 26)"
  - "Dropdown groups render as clickable flyout rows with chevron_right and absolutely-positioned sub-card (plan 27)"
  - "TagSelect isIncluded fixed to compare valueKey values; createdOptions state for creatable mode; leadingComplement for left-side icon (plan 28)"
  - "Navbar actions prop added for custom right-section content; 6 story variants added (plan 28)"
  - "Calendar dialog position:absolute overlays grid; activePanel defaults to month; activeRangeIndex routes compare-mode clicks; hoveredDate range preview (plan 29)"
  - "DatePicker card min-width:280px + p-md; day cells min 36x36px; actions bar px-sm; trigger min-width:160px; calendar wrapper px-sm pt-xxs (plan 30)"
gaps_remaining:
  - truth: "All automated tests pass for components modified in gap closure plans"
    status: failed
    reason: "14 test-code mismatches across 6 test files remain from plans 19, 23, and 27. Plans 24-30 did not update the affected test files."
    artifacts:
      - path: "src/utils/components/ExpandableContainer.test.tsx"
        issue: "Test checks toBeNull() for collapsed state — ExpandableContainer now uses CSS opacity/visibility and keeps element in DOM"
      - path: "src/utils/components/SelectContainer.test.tsx"
        issue: "Test checks toBeNull() for non-expanded wrapper — wrapper is always in DOM with CSS-hidden content"
      - path: "src/components/TagSelect/TagSelect.test.tsx"
        issue: "3 tests: getByText duplicates (tag chip + always-present option in DOM); disabled test expects 0 open elements but CSS-always-rendered ExpandableContainer is present"
      - path: "src/components/RoundMenu/RoundMenu.test.tsx"
        issue: "6 tests use getByLabelText() targeting Button elements — aria-label is on wrapper div, not Button"
      - path: "src/components/Navbar/Navbar.test.tsx"
        issue: "3 tests reference removed props (title, profile) and old plain-item rendering replaced by Dropdown"
      - path: "src/components/Dropdown/Dropdown.test.tsx"
        issue: "1 test (renders group headers for nested options) expects child options directly visible — plan 27 moved them behind collapsed flyout; test must expand the group row first"
    missing:
      - "Update ExpandableContainer.test.tsx: replace toBeNull() check with not.toBeVisible() for collapsed state"
      - "Update SelectContainer.test.tsx: replace null DOM check with visibility/pointer-events check for non-expanded state"
      - "Update TagSelect.test.tsx: use getAllByText or within() to distinguish tag chips from always-present option list; fix disabled test to check pointer-events-none or aria-disabled"
      - "Update RoundMenu.test.tsx: query wrapper div by aria-label (not Button) OR add data-testid to trigger button"
      - "Update Navbar.test.tsx: remove/replace tests for removed title/profile props; add tests for new Dropdown-based nav and Avatar API"
      - "Update Dropdown.test.tsx: click/expand groupRow before asserting child option visibility"
pre_existing_failures:
  - "src/hooks/useTransition.test.ts: 3 failing tests — confirmed pre-existing at bb02c4e baseline"
  - "src/utils/components/Overlay.test.tsx: 3 failing tests — confirmed pre-existing at bb02c4e baseline"
  - "src/components/Icon/Icon.test.tsx: 2 failing tests (size prop not in component) — confirmed pre-existing at bb02c4e baseline"
  - "src/components/Slider/Slider.test.tsx: 2 failing tests (defaultValue mock check) — confirmed pre-existing at bb02c4e baseline"
  - "src/components/Textarea/Textarea.test.tsx: 1 failing test (character counter text split across elements) — confirmed pre-existing at bb02c4e baseline"
uncommitted_changes:
  - "src/components/Calendar/Calendar.tsx: noDate CSS class reference (empty date cells) — unstaged, does not break Calendar tests (all 11 pass)"
  - "src/components/Calendar/Calendar.module.css: .dayCell.noDate pointer-events-none rule — unstaged"
human_verification:
  - test: "Verify icon glyph rendering in Pagination, Tab, Stepper, RoundMenu, Calendar, Navbar stories"
    expected: "All Icon components display actual Material Symbols glyphs (arrows, chevrons, check marks), not the text string of the icon name"
    why_human: "Google Fonts CDN is not loaded in jsdom — plan 16 font fix can only be confirmed visually in a live browser"
  - test: "Verify Accordion expansion animation in a browser"
    expected: "Panel expands/collapses with smooth max-height transition; no phantom gap below header when collapsed"
    why_human: "ResizeObserver + max-height transition pattern not exercised in jsdom"
  - test: "Verify Stepper visual design in a browser"
    expected: "Active step shows conic-gradient ring and scale(1.2); past steps show original icon in filled primary green circle; future steps show lighter neutral-surface-secondary; connector lines green before current step, gray after"
    why_human: "Conic-gradient, scale transform, and connector geometry require real rendering engine"
  - test: "Verify ExpandableContainer opacity animation in Select/Dropdown/AutoComplete/TagSelect/DatePicker"
    expected: "Options panel appears floating absolutely below trigger without pushing content; panel animates in/out with opacity transition (no instant clip jump)"
    why_human: "CSS opacity/visibility animation requires real browser; plan 24 removed h-0 clipping — effect only verifiable visually"
  - test: "Verify Dropdown flyout submenus in browser"
    expected: "Groups show as clickable rows with chevron_right; clicking a group reveals a flyout card to the right containing nested options; selecting a nested option closes both panels"
    why_human: "Flyout card positioning (left:100% top:0), hover states, and keyboard behavior require real browser"
  - test: "Verify AutoComplete in browser: selection sync and unfold_more icon"
    expected: "Typing filters options; selecting an option updates the displayed text to the option label; unfold_more icon visible on right side of trigger"
    why_human: "useEffect model sync and appendIcon rendering require real browser to confirm visual result"
  - test: "Verify Navbar layout in browser"
    expected: "SVG gradient circle logo on left, vertical divider, Dropdown navigation in center, notification bell (FloatCard) on right, Avatar to right of bell; actions prop replaces right section when provided"
    why_human: "Visual layout, SVG rendering, FloatCard popover positioning require real browser"
  - test: "Verify Calendar compare mode and range hover preview in browser"
    expected: "Calendar dialog overlays grid without pushing content; opening month/year picker shows month panel first; in compare mode first two clicks fill primary range, next two fill secondary (lighter token); hovering over days after first click shows live range preview"
    why_human: "CSS absolute positioning overlay, token color differences, and hover state require real browser"
  - test: "Verify DatePicker proportions in browser"
    expected: "DatePicker card is at least 280px wide with generous padding; day cells are at least 36x36px; actions bar (Clear/Apply) has horizontal padding; trigger shows date text without wrapping"
    why_human: "CSS min-width, min-height, and layout proportions require real browser"
---

# Phase 6: Composite Components Verification Report (Round 4)

**Phase Goal:** All 17 composite components render and interact correctly, including portal-based overlays and transition animations
**Verified:** 2026-03-18T22:00:00Z
**Status:** GAPS_FOUND
**Re-verification:** Yes — fourth pass, after UAT-driven gap closure plans 24-30

---

## Re-Verification Summary

Previous verification (2026-03-18T15:30:00Z): GAPS_FOUND (4/5 success criteria) — 13 test regressions from plans 19 and 23 remained.

UAT round 3 gap closure plans 24-30 were created and executed. All 7 plans are confirmed executed via SUMMARY.md files and verified against actual codebase. Plans 24-30 close all 10 UAT round 3 behavioral issues but do not update any test files.

This re-verification confirms:
- All 10 UAT round 3 behavioral fixes are implemented in code (plans 24-30)
- All 17 COMP requirements are satisfied in code
- 5/5 success criteria have supporting evidence
- **14 test-code mismatches** persist across 6 test files (up from 13 — plan 27 added 1 new Dropdown test mismatch)
- 11 pre-existing test failures (Icon, Slider, Textarea, useTransition, Overlay) remain unchanged from bb02c4e baseline
- **Total failing: 25** (14 plan-introduced mismatches + 11 pre-existing)
- 2 uncommitted changes in Calendar.tsx and Calendar.module.css are safe (all Calendar tests pass)

---

## Goal Achievement

### Observable Truths (Success Criteria from ROADMAP.md)

| # | Truth | Status | Evidence |
|---|-------|--------|---------|
| 1 | Dialog and Drawer open and close with portal rendering into `document.body` | VERIFIED | Dialog.test.tsx and Drawer.test.tsx both pass; Overlay + useTransition wiring confirmed; unchanged by plans 24-30 |
| 2 | Select, AutoComplete, TagSelect support controlled and uncontrolled modes | VERIFIED | Select: useControllable + icon + keyboard nav (plan 21); AutoComplete: useEffect model sync + unfold_more (plan 25); TagSelect: expanded/onExpandedChange + createdOptions + leadingComplement (plans 18, 28) |
| 3 | Dropdown, ColorPicker, DatePicker position popover relative to trigger | VERIFIED | ExpandableContainer: opacity/visibility CSS hide without h-0 clip (plan 24); DatePicker: 11 props + preset sidebar (plan 21) + proportions (plan 30); ColorPicker: noShadow prop unchanged |
| 4 | Accordion, Tab, Stepper maintain correct active state | VERIFIED | Accordion: stale closure fixed (plan 17); Tab: isIcon + Icon rendering (plan 17); Stepper: biggerStepSelected as number + allowSkip + original icons + correct future token (plans 20, 26) |
| 5 | Calendar renders correct month grid and responds to date selection with `onChange` | VERIFIED | Calendar: visual overhaul + Card panels (plan 22); dialog absolute positioning + compare mode + hover preview (plan 29); DatePicker proportions (plan 30); all 11 Calendar tests pass |

**Score:** 5/5 success criteria verified in code

However: 14 test-code mismatches across 6 test files block a clean automated pass. All are test maintenance issues, not implementation bugs.

---

## Gap Closure Plan Execution Verification (Plans 24-30)

### Plan 24: ExpandableContainer Animation + Select Label Fix

| Artifact | Must-Have | Status | Evidence |
|----------|-----------|--------|---------|
| `src/utils/components/ExpandableContainer.tsx` | No h-0/overflow-hidden in collapsed state | VERIFIED | grep confirms 0 occurrences of h-0 or overflow-hidden |
| `src/components/Select/Select.tsx` | `<span>{getLabel(option)}</span>` default rendering | VERIFIED | Line 250: `<span>{getLabel(option)}</span>` — no children fallback |

### Plan 25: AutoComplete Sync/Icon + Input Color Swatch Position

| Artifact | Must-Have | Status | Evidence |
|----------|-----------|--------|---------|
| `src/components/AutoComplete/AutoComplete.tsx` | useEffect syncing searchText from model; appendIcon="unfold_more" | VERIFIED | Line 56: useEffect on model; Line 123: appendIcon="unfold_more" |
| `src/utils/components/SelectContent.tsx` | appendIcon prop rendered after search input | VERIFIED | Confirmed via SUMMARY.md |
| `src/components/Input/Input.tsx` | Hex input before FloatCard in JSX (swatch on right) | VERIFIED | Line 214 comment + FloatCard import confirmed |

### Plan 26: Stepper Icon/AllowSkip + RoundMenu Anchoring

| Artifact | Must-Have | Status | Evidence |
|----------|-----------|--------|---------|
| `src/components/Stepper/Stepper.tsx` | allowSkip prop + adjacency guard; no checkmark substitution | VERIFIED | Line 19: allowSkip; Line 71: Math.abs guard; no 'check' icon override in render path |
| `src/components/Stepper/Stepper.module.css` | .backgroundFuture uses --neutral-surface-secondary | VERIFIED | Confirmed via SUMMARY.md |
| `src/components/RoundMenu/RoundMenu.tsx` | Button without size="small"; radius 110 | VERIFIED | Confirmed via SUMMARY.md |
| `src/components/RoundMenu/RoundMenu.module.css` | .menuItem left:0;top:0; .trigger transform-origin:left center | VERIFIED | Confirmed via SUMMARY.md |

### Plan 27: Dropdown Flyout Submenu

| Artifact | Must-Have | Status | Evidence |
|----------|-----------|--------|---------|
| `src/components/Dropdown/Dropdown.tsx` | subExpanded state; flyoutCard div; groupRow clickable | VERIFIED | Lines 45, 53, 59, 64-65: subExpanded useState, groupRow class, flyoutCard render |
| `src/components/Dropdown/Dropdown.module.css` | .groupRow, .flyoutCard with position:absolute left:100% top:0 | VERIFIED | Confirmed via SUMMARY.md |
| `src/components/Dropdown/Dropdown.stories.tsx` | WithGroups story | VERIFIED | Confirmed via SUMMARY.md |

**TEST REGRESSION (plan 27):** "renders group headers for nested options" test expected child options directly visible in DOM. Flyout pattern hides them behind collapsed subExpanded state. Test must expand groupRow before querying child options.

### Plan 28: TagSelect Creatable + Navbar Actions/Stories

| Artifact | Must-Have | Status | Evidence |
|----------|-----------|--------|---------|
| `src/components/TagSelect/TagSelect.tsx` | createdOptions state; isIncluded valueKey comparison; leadingComplement for icon | VERIFIED | Lines 67, 85, 283: all three patterns confirmed |
| `src/utils/components/Container.tsx` | leadingComplement prop | VERIFIED | Confirmed via SUMMARY.md |
| `src/utils/components/ExpandableContainer.tsx` + `SelectContainer.tsx` | Thread leadingComplement | VERIFIED | Confirmed via SUMMARY.md |
| `src/components/Navbar/Navbar.tsx` | actions prop | VERIFIED | Line 24: actions prop; Line 88-89: conditional render |
| `src/components/Navbar/Navbar.stories.tsx` | 6 stories | VERIFIED | Confirmed via SUMMARY.md — 4 new stories added |

### Plan 29: Calendar Dialog Positioning + Compare Mode + Hover Preview

| Artifact | Must-Have | Status | Evidence |
|----------|-----------|--------|---------|
| `src/components/Calendar/Calendar.tsx` | activeRangeIndex state; hoveredDate state; compare mode routing | VERIFIED | Lines 338-339: both states; Lines 420-425: compare routing |
| `src/components/Calendar/Calendar.module.css` | .dateDialog position:absolute; .rangeHover; .inSecondaryRange; .selectedSecondary | VERIFIED | Confirmed via SUMMARY.md |

### Plan 30: DatePicker Proportions and Spacing

| Artifact | Must-Have | Status | Evidence |
|----------|-----------|--------|---------|
| `src/components/DatePicker/DatePicker.module.css` | p-md + min-width:280px on card; px-sm on actions | VERIFIED | Lines 4-5: p-md + min-width:280px; Line 7: px-sm on .actions |
| `src/components/Calendar/Calendar.module.css` | day cell p-xs + min-width:36px + min-height:36px | VERIFIED | Confirmed via SUMMARY.md |
| `src/components/DatePicker/DatePicker.tsx` | trigger min-width:160px; Calendar wrapper px-sm pt-xxs | VERIFIED | Confirmed via SUMMARY.md |

---

## Requirements Coverage

| Requirement | Plans | Description | Status | Evidence |
|-------------|-------|-------------|--------|---------|
| COMP-01 | 06-03, 06-21 | Select with controlled/uncontrolled support | SATISFIED | Select.tsx: useControllable + icon + expanded + keyboard nav |
| COMP-02 | 06-03, 06-19, 06-24, 06-25 | AutoComplete migrated to React TSX | SATISFIED | ExpandableContainer animation fixed; AutoComplete searchText sync + unfold_more added |
| COMP-03 | 06-05, 06-18, 06-28 | TagSelect migrated to React TSX | SATISFIED | 4 missing props + keyboard nav + creatable + leadingComplement icon |
| COMP-04 | 06-04, 06-18, 06-27 | Dropdown migrated with portal | SATISFIED | 5 missing props + flyout group submenus with chevron_right |
| COMP-05 | 06-01 | Dialog migrated with portal and transition | SATISFIED | Dialog.tsx: unchanged; 7 tests pass |
| COMP-06 | 06-01, 06-28 | Drawer migrated with portal and transition | SATISFIED | Drawer.tsx unchanged; 7 tests pass; Navbar actions slot added (plan 28 claims COMP-06) |
| COMP-07 | 06-01, 06-17 | Accordion migrated with transition | SATISFIED | Stale closure fixed, gap-sm removed |
| COMP-08 | 06-06, 06-20 | Carousel migrated to React TSX | SATISFIED | disabled/circular/section-wrappers added |
| COMP-09 | 06-02, 06-17 | Tab migrated to React TSX | SATISFIED | isIcon + Icon rendering added |
| COMP-10 | 06-02 | Pagination migrated to React TSX | SATISFIED | Material Symbols font fix enables icon glyphs |
| COMP-11 | 06-05, 06-30 | Filter migrated to React TSX | SATISFIED | Filter.tsx unchanged; DatePicker proportions (plan 30 claims COMP-11) |
| COMP-12 | 06-02, 06-20, 06-26 | Stepper migrated to React TSX | SATISFIED | Full visual rework + allowSkip + original icon rendering + lighter future token |
| COMP-13 | 06-08, 06-23, 06-28 | Navbar migrated to React TSX | SATISFIED | Restructured with Dropdown + Avatar + FloatCard + SVG logo + actions prop |
| COMP-14 | 06-06, 06-19, 06-26, 06-28 | RoundMenu migrated to React TSX | SATISFIED | Button replaces raw buttons; anchored positioning; rightward label expansion |
| COMP-15 | 06-09, 06-17, 06-25 | ColorPicker migrated with controlled/uncontrolled | SATISFIED | noShadow prop added; Input color swatch position fixed |
| COMP-16 | 06-08, 06-21 | DatePicker migrated with controlled/uncontrolled | SATISFIED | 11 missing props + preset sidebar + proportions (plan 30) |
| COMP-17 | 06-07, 06-22, 06-29 | Calendar migrated to React TSX | SATISFIED | Visual overhaul + CalendarDateDialog + compare mode + hover preview |

All 17 requirements satisfied. No orphaned requirements.

---

## Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `src/utils/components/ExpandableContainer.test.tsx` | ~30 | `toBeNull()` on element that is CSS-hidden not absent from DOM | Blocker | 1 failing test |
| `src/utils/components/SelectContainer.test.tsx` | 24 | `toBeNull()` on wrapper that is always in DOM | Blocker | 1 failing test |
| `src/components/TagSelect/TagSelect.test.tsx` | 23, 31, 55 | `getByText()` duplicates; disabled test expects empty DOM | Blocker | 3 failing tests |
| `src/components/RoundMenu/RoundMenu.test.tsx` | 14, 22, 28, 38, 52, 69 | `getByLabelText()` on Button — aria-label is on wrapper div | Blocker | 6 failing tests |
| `src/components/Navbar/Navbar.test.tsx` | 30, 49, 57 | Tests for removed props: `profile`, old plain-item buttons, `title` | Blocker | 3 failing tests |
| `src/components/Dropdown/Dropdown.test.tsx` | 107-110 | Expects flyout child options directly visible without expanding groupRow | Blocker | 1 failing test |

No implementation stubs or TODO markers found in any of the 17 component TSX files.

**Uncommitted changes (safe):** `src/components/Calendar/Calendar.tsx` and `src/components/Calendar/Calendar.module.css` have 2 unstaged changes (noDate CSS class for empty day cells). These do not break any tests — all 11 Calendar tests pass. These should be committed.

---

## Test Summary

| Category | Count |
|----------|-------|
| Total tests | 364 |
| Passing | 339 |
| Failing total | 25 |
| Pre-existing failures (before bb02c4e baseline) | 11 |
| Regressions introduced by plans 19, 23, 27 (test-code mismatches) | 14 |

**Test-code mismatch breakdown by root cause:**

- **Root cause 1 (plan 19 — ExpandableContainer CSS show/hide):** 5 tests across ExpandableContainer, SelectContainer, TagSelect — tests assumed DOM absence for collapsed state; implementation correctly keeps element in DOM for CSS animation. Fix: `not.toBeVisible()` instead of `toBeNull()`; `within()`/`getAllByText` to scope queries.
- **Root cause 2 (plan 23 — Navbar API change):** 3 tests reference removed `title` and `profile` props and old plain-item rendering. Fix: rewrite for new Dropdown-based nav and Avatar API.
- **Root cause 3 (plan 19 — RoundMenu aria-label location):** 6 tests use `getByLabelText()` expecting to find a Button — aria-label is on wrapper div. Fix: query wrapper div by aria-label, or add data-testid to trigger.
- **Root cause 4 (plan 27 — Dropdown flyout pattern):** 1 test expects child options visible without clicking group row. Fix: `fireEvent.click(groupRow)` before asserting child option visibility.

---

## Human Verification Required

### 1. Icon Glyph Rendering (Pagination, Tab, Stepper, RoundMenu, Calendar, Navbar)

**Test:** Open Storybook. Navigate to stories for Pagination, Tab (icon variants), Stepper, RoundMenu, Calendar, and Navbar.
**Expected:** All Icon components display actual Material Symbols glyphs (arrows, chevrons, check marks) rather than the text string of the icon name.
**Why human:** Google Fonts CDN is not loaded in jsdom. The plan 16 font fix is architecturally correct but can only be confirmed visually in a live browser.

### 2. Accordion Expansion Animation

**Test:** Open Accordion story. Click a collapsed panel header.
**Expected:** Panel expands smoothly with max-height CSS transition; no visible gap below the header when the panel is collapsed.
**Why human:** The isExpandedRef + ResizeObserver + max-height transition pattern is not exercised in jsdom.

### 3. Stepper Visual Design

**Test:** Open Stepper story. Advance through steps.
**Expected:** Active step has conic-gradient ring and is visibly larger (scale 1.2). Past steps show original icon in filled primary green circles. Future steps show lighter neutral-surface-secondary. Connector lines before current step are green, after are gray. Clicking a non-adjacent step with allowSkip=false does nothing.
**Why human:** Conic-gradient rendering, scale transform, and connector geometry require a real rendering engine.

### 4. ExpandableContainer Opacity Animation

**Test:** Open Select, Dropdown, AutoComplete, TagSelect, and DatePicker stories. Open and close each component's dropdown.
**Expected:** Options panel appears floating absolutely below the trigger without pushing surrounding content. Panel animates in and out with opacity transition — no instant hard show/hide jump.
**Why human:** CSS opacity/visibility animation and getBoundingClientRect positioning require a real browser. Plan 24 removed h-0 clipping — smooth animation is only verifiable visually.

### 5. Dropdown Flyout Submenus

**Test:** Open Dropdown story (WithGroups variant). Click the "Publisher" group row.
**Expected:** A flyout card appears to the right of the group row containing nested options. Clicking a nested option closes both panels and selects the value.
**Why human:** Flyout card positioning (left:100% top:0), z-index stacking, and keyboard behavior require a real browser.

### 6. AutoComplete Selection Sync and Icon

**Test:** Open AutoComplete story. Type to filter options, then click an option to select it.
**Expected:** The text input updates to the selected option's label. An unfold_more icon is visible on the right side of the trigger at all times.
**Why human:** useEffect model-to-display sync and appendIcon rendering require a real browser to confirm visual result.

### 7. Navbar Layout

**Test:** Open Navbar story (Complete and WithNotifications variants) in Storybook.
**Expected:** SVG gradient circle logo on far left, vertical divider line, Dropdown for navigation, notification bell (opens FloatCard popover on click), Avatar on right. Actions prop variant replaces entire right section.
**Why human:** Visual layout quality, SVG gradient rendering, and FloatCard popover positioning require a real browser.

### 8. Calendar Compare Mode and Range Hover Preview

**Test:** Open Calendar story. (a) Click the month text in header — confirm dialog overlays grid without pushing content. (b) Enable compare mode, make 4 date clicks, observe two distinct ranges. (c) After first click, hover over other dates to see live range preview.
**Expected:** Dialog overlays grid. Primary range uses dark primary token; secondary range uses lighter highlight token. Hover preview shows tentative range end before second click.
**Why human:** CSS absolute positioning overlay, token color differences, and hover state require a real browser.

### 9. DatePicker Proportions

**Test:** Open DatePicker story in Storybook.
**Expected:** Card is at least 280px wide with comfortable padding. Day cells are at least 36x36px and easy to click. Clear/Apply action buttons have horizontal padding. Date range trigger text does not wrap.
**Why human:** CSS min-width, min-height, and layout proportions require a real browser.

---

## Gaps Summary

The phase goal is achieved at the implementation level. All 7 UAT round 3 gap closure plans (24-30) are executed, all 10 UAT round 3 behavioral issues are fixed in code, and all 17 COMP requirements are satisfied.

However, plans 19, 23, and 27 introduced 14 test-code mismatches across 6 test files by changing component APIs or behaviors without updating the corresponding test files. These are test maintenance gaps, not implementation bugs.

**What must happen before this phase can be marked clean:**

1. **Update 6 test files** to reflect the new implementations:
   - `src/utils/components/ExpandableContainer.test.tsx` — visibility check instead of null check
   - `src/utils/components/SelectContainer.test.tsx` — visibility check instead of null check
   - `src/components/TagSelect/TagSelect.test.tsx` — scope queries with within() or getAllByText
   - `src/components/RoundMenu/RoundMenu.test.tsx` — query wrapper div by aria-label or add data-testid to trigger
   - `src/components/Navbar/Navbar.test.tsx` — remove/rewrite tests for old props; test new Dropdown/Avatar API
   - `src/components/Dropdown/Dropdown.test.tsx` — expand groupRow before asserting child option visibility

2. **Commit uncommitted Calendar changes** (Calendar.tsx noDate class reference, Calendar.module.css noDate rule) — safe, all tests pass.

---

*Verified: 2026-03-18T22:00:00Z*
*Verifier: Claude (gsd-verifier)*
*Previous verification: 2026-03-18T15:30:00Z (gaps_found, 4/5 — 13 test regressions)*
*UAT round 3 gap closure plans 24-30: all confirmed executed in codebase*
*Baseline for pre-existing failures: bb02c4e*
