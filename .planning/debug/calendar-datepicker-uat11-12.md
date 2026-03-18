---
status: diagnosed
trigger: "Investigate Calendar (test 11) and DatePicker (test 12) issues — research only"
created: 2026-03-18T00:00:00Z
updated: 2026-03-18T00:00:00Z
---

## Current Focus

hypothesis: All issues traced to code — no ambiguity remains
test: read-only investigation complete
expecting: structured root cause report delivered to caller
next_action: report delivered

## Symptoms

expected: Calendar dialog absolutely positioned, compare mode tracking two ranges, hover preview working, compare range dual-color rendering; DatePicker with correct sizing/proportions and trigger showing icon+date text
actual: Dialog shifts layout, dialog starts closed, compare fills only first range, hover preview absent, compare renders single-color; DatePicker too small, no proportions, buttons under-styled
errors: none (runtime logic errors only)
reproduction: render <Calendar type="compare">, click header, hover days
started: introduced during Vue→React translation

## Eliminated

- hypothesis: checkDateType utility is broken
  evidence: utility is correct and handles compare mode (returns [[], []] when empty)
  timestamp: 2026-03-18

- hypothesis: ExpandableContainer doesn't support absolute prop
  evidence: ExpandableContainer does support absolute prop and applies position:absolute z-[80] via isAbsolute flag; DatePicker passes it through
  timestamp: 2026-03-18

## Evidence

- timestamp: 2026-03-18
  checked: Calendar.tsx — CalendarDateDialog rendering site (line 439-448)
  found: rendered with `{showDateDialog && <CalendarDateDialog ... />}` — always in normal document flow, no absolute/overlay wrapper
  implication: dialog pushes calendar content down; Vue DateDialog.vue uses `class="absolute z-[1]"` on its Card

- timestamp: 2026-03-18
  checked: CalendarDateDialog state (line 100)
  found: `const [activePanel, setActivePanel] = useState<'month' | 'year' | null>(null)` — starts null (no panel open)
  implication: dialog opens but shows only header buttons; month grid not visible until user clicks "month" button; Vue showPopup opens month panel immediately on header click

- timestamp: 2026-03-18
  checked: handleDayClick compare branch (lines 363-378)
  found: logic always fills range0 first then stops — range1 is never written to; after range0 is complete (length >= 2) the condition `range0.length === 0 || range0.length >= 2` is true again and RESETS range0 to [date], discarding both ranges
  implication: compare mode never fills range1; clicking 3rd date resets range0 instead of starting range1

- timestamp: 2026-03-18
  checked: Vue Calendar.vue setModel (lines 181-199) + sortDate
  found: Vue uses `selectedDate[0].length > 1` to decide index=1, then calls sortDate on selectedDate[index]; this correctly fills range0 then range1 sequentially
  implication: React translation skipped the index-selection logic entirely

- timestamp: 2026-03-18
  checked: CalendarDay / getDayProps — hover handling
  found: CalendarDay has no onMouseEnter/onMouseLeave props; getDayProps has no hoveredDate parameter; Calendar has no hoveredDate state
  implication: hover-preview feature (light background between selected start and hovered day) was never implemented in the React translation; Vue Day.vue has v-model:hovered and getHovered() which does this

- timestamp: 2026-03-18
  checked: getDayProps compare branch (lines 235-244)
  found: only inspects ranges[0]; range1 (ranges[1]) is never evaluated for selected/inRange/isRangeStart/isRangeEnd; no secondary color classes exist in CalendarDay or Calendar.module.css
  implication: even if range1 were populated, it would render invisibly; Vue Day.vue has selected-primary / selected-secondary / range-primary / range-secondary / hovered-primary / hovered-secondary CSS classes for dual-color compare rendering

- timestamp: 2026-03-18
  checked: DatePicker.module.css
  found: only 6 rules total; .datePickerCard has @apply p-sm; no size/padding/proportion rules for calendar cells, buttons, or card dimensions
  implication: relies 100% on Calendar's own small sizing; Vue DatePicker wraps Calendar with class="px-sm pt-xxs" and uses a proper card sizing from ExpandableContainer

- timestamp: 2026-03-18
  checked: DatePicker triggerContent (lines 216-234)
  found: Icon rendered + displayLabel text in a span — structure is correct. However displayLabel derives from controlledValue (committed value) not workingValue, which is correct. The container class uses tailwind text-lg h-xl but displayLabel uses text-sm font-normal truncate from styles.displayLabel.
  implication: trigger button layout is technically complete but visually cramped because no explicit width/min-width is set on the trigger container, and the icon+text flex container has no gap

- timestamp: 2026-03-18
  checked: Calendar.module.css — .dayCell sizing
  found: .dayCell has only @apply text-sm cursor-pointer p-xxs rounded-xs; no explicit width/height; .grid uses grid-cols-7 py-xxs with no column sizing
  implication: cells are undersized; Vue Day.vue uses p-xs (larger than p-xxs) plus font-semibold; the grid cells have no min-width, so they compress to content width

- timestamp: 2026-03-18
  checked: Calendar.module.css — .navButton sizing and DatePicker nav
  found: Calendar already has .navButton with w-[32px] h-[32px] border box — this is correct. But DatePicker does not render its own nav; it delegates entirely to Calendar. Calendar's nav is correct but embedded in a card that has insufficient padding.
  implication: nav buttons are correctly styled but look cramped because of parent container padding deficiency

## Resolution

root_cause: >
  Multiple distinct root causes — see per-issue breakdown below.
fix: not applied (research-only mode)
verification: n/a
files_changed: []
