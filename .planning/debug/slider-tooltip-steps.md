---
status: diagnosed
trigger: "Investigate two Slider issues: 1) Tooltip uses custom inline div instead of DS Tooltip component with hover mechanic; vertical sliders should show tooltip to the right. 2) Steps render large markers and percentage labels; should be simple small tick marks without labels."
created: 2026-03-16T00:00:00Z
updated: 2026-03-16T00:00:00Z
---

## Current Focus

hypothesis: Both issues confirmed by direct code reading — inline tooltip div with always-visible visibility, and step markers are oversized blocks with label spans rendered unconditionally.
test: Code reading complete — no execution needed, both issues are plainly visible in source.
expecting: N/A — root causes confirmed.
next_action: Deliver structured diagnosis to caller.

## Symptoms

expected:
  tooltip: DS Tooltip component wrapping the cursor thumb, visible on hover only; right-positioned for vertical sliders
  steps: Small tick marks on the track without any label text

actual:
  tooltip: A raw <div className={styles.tooltip}> always rendered when showTooltip=true, no hover mechanic, always visible
  steps: A two-layer structure (stepMarker div + stepLabel span) producing a tall block with text labels below

errors: none — functional but wrong behavior
reproduction: Render <Slider showTooltip /> to see always-on tooltip; render <Slider steps=[...] /> to see large step blocks
started: Initial React port

## Eliminated

- hypothesis: Tooltip might use DS Tooltip internally but hide it
  evidence: Slider.tsx line 429-433 shows a plain <div className={styles.tooltip}> with no import or reference to the Tooltip component
  timestamp: 2026-03-16

- hypothesis: Steps might conditionally hide the label based on a prop
  evidence: Slider.tsx line 445 renders <span className={styles.stepLabel}>{step.label}</span> unconditionally inside each step; no condition guards it
  timestamp: 2026-03-16

## Evidence

- timestamp: 2026-03-16
  checked: Slider.tsx lines 1-5 (imports)
  found: No import of Tooltip component — only React, clsx, useControllable, styles
  implication: DS Tooltip is not used at all; the tooltip is 100% custom

- timestamp: 2026-03-16
  checked: Slider.tsx lines 429-433 (tooltip render block)
  found: |
    {showTooltip && (
      <div className={styles.tooltip}>
        {getTooltipText(modelArray[index])}
      </div>
    )}
  implication: Tooltip is a plain div, rendered whenever showTooltip=true, always visible — no hover state, no DS component

- timestamp: 2026-03-16
  checked: Slider.module.css lines 81-86 (tooltip styles)
  found: |
    .tooltip {
      @apply absolute bottom-full mb-1 bg-neutral-foreground-high text-white text-xs px-2 py-1 rounded whitespace-nowrap;
      left: 50%;
      transform: translateX(-50%);
    }
  implication: Tooltip is positioned above the cursor (bottom-full) with translateX(-50%) centering. For vertical sliders this positioning is NOT overridden anywhere — no .vertical .tooltip rule exists in Slider.module.css.

- timestamp: 2026-03-16
  checked: Slider.module.css lines 113-145 (vertical adjustments block)
  found: Rules exist for .vertical .cursor, .vertical .fillBar, .vertical .step — but NO .vertical .tooltip rule
  implication: Vertical slider tooltip still appears above (not to the right) of the thumb; explicit CSS fix needed.

- timestamp: 2026-03-16
  checked: Tooltip.tsx lines 7-13 (TooltipProps interface)
  found: |
    interface TooltipProps {
      labelValue?: string;
      position?: 'top' | 'bottom' | 'left' | 'right';
      children?: React.ReactNode;
      ...
    }
  implication: DS Tooltip accepts a labelValue string prop for simple text content, and a position prop. It also accepts children as the trigger element.

- timestamp: 2026-03-16
  checked: Tooltip.tsx lines 102-127 (Tooltip render)
  found: |
    - Wraps trigger children in a <div> with onMouseEnter/onMouseLeave handlers
    - Uses useTransition(isHovering) so tooltip fades in/out on hover
    - Portals the tooltip bubble to document.body (fixed positioning)
    - Calls calculatePosition to place bubble relative to the trigger's bounding rect
  implication: To use the DS Tooltip the cursor thumb div must be placed as children of <Tooltip>; labelValue carries the text; position prop controls direction

- timestamp: 2026-03-16
  checked: Tooltip.tsx line 70-71 (rect source)
  found: |
    const rect = (
      contentRef.current.firstElementChild || contentRef.current
    ).getBoundingClientRect();
  implication: DS Tooltip measures its FIRST CHILD's bounding rect for placement. The cursor div must therefore be the first/only child of <Tooltip>.

- timestamp: 2026-03-16
  checked: Slider.tsx lines 437-447 (step render block)
  found: |
    {steps && steps.map((step, i) => (
      <div key={i} className={clsx(styles.step, ...)} style={getStepStyle(step)}>
        <div className={clsx(styles.stepMarker, ...)} />
        {step.label && <span className={styles.stepLabel}>{step.label}</span>}
      </div>
    ))}
  implication: Each step renders as a container div + a stepMarker child div + a conditional stepLabel span. The container and marker both add height/width.

- timestamp: 2026-03-16
  checked: Slider.module.css lines 88-111 (step styles)
  found: |
    .step      — absolute, bg-primary-surface-highlight, rounded-base (a visible block)
    .stepMarker — h-[1.875em] w-[0.3125em] bg-primary-surface-highlight  (30px tall × 5px wide at 1em=16px)
    .stepLabel  — text-xs mt-1 whitespace-nowrap (text visible below marker)
  implication: stepMarker is 1.875em tall (nearly 30px) — far too large. A tick mark should be a thin vertical line ~0.5em tall or a 2-4px dot. The label span is rendered for any step with a truthy label string; the Vue reference is gone but expected behavior is tick marks only — no labels.

- timestamp: 2026-03-16
  checked: Vue source files via glob
  found: No .vue files exist anywhere in src/components/Slider/ — Vue source has been deleted
  implication: Cannot diff against Vue reference; must rely on spec description ("simple small tick marks on the track without labels")

## Resolution

root_cause: |
  ISSUE 1 — TOOLTIP:
  The Slider never imports or uses the DS Tooltip component. The cursor renders a naked <div className={styles.tooltip}> that is always visible when showTooltip=true. The DS Tooltip component (Tooltip.tsx) uses onMouseEnter/onMouseLeave + useTransition for hover-controlled fade-in, portals to document.body, and positions via getBoundingClientRect. None of that behavior exists in the custom div.

  Additionally, no CSS rule overrides the tooltip position for vertical sliders. The .tooltip rule uses bottom-full (above cursor) with translateX(-50%) centering — and there is no .vertical .tooltip override in Slider.module.css. Vertical sliders need the tooltip to the right of the thumb (position="right" in DS Tooltip terms).

  ISSUE 2 — STEPS:
  Step markers use a two-element structure (wrapper div + stepMarker child) with stepMarker at h-[1.875em] — ~30px tall — which is the "large marker" behavior. Labels are rendered via a <span className={styles.stepLabel}> for any step with a non-empty label string. There is no prop or flag to suppress labels; removing them requires either dropping the label render from JSX or stripping label from the step data API. The correct behavior is a single thin tick mark element per step, no label.

fix: not yet applied
verification: not yet verified
files_changed: []
