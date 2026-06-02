---
status: diagnosed
trigger: "Accordion doesn't expand when clicked and has strange extra height below title when closed"
created: 2026-03-18T00:00:00Z
updated: 2026-03-18T00:00:00Z
---

## Current Focus

hypothesis: Two bugs - (1) defaultValue ignored so controlled mode uses stale false, (2) gap-sm on card wrapper adds visible spacing below header even when content is collapsed
test: Code review of useControllable call and card wrapper layout
expecting: Confirmed both issues from reading code
next_action: Return diagnosis

## Symptoms

expected: Accordion expands on click; no extra space below title when collapsed
actual: Click does nothing; visible gap below header when closed
errors: none
reproduction: Render Primary story, click header
started: Since React conversion

## Eliminated

(none needed - root cause found on first pass)

## Evidence

- timestamp: 2026-03-18
  checked: Accordion.tsx line 29 - useControllable call
  found: `defaultValue` prop from AccordionProps is accepted but NEVER passed to useControllable. The hook call hardcodes `defaultValue: false`. However, the real issue is that the stories pass `value={expanded}` making it controlled mode, and inside useControllable, controlled mode means `setValue` does NOT call `setInternalValue` — it only calls `onChange`. That part is correct. The stories wire `onChange={setExpanded}` which updates `expanded` state, which feeds back as `value`. So the controlled path should work... BUT the `resize()` function is defined inside the component and captures `isExpanded` via closure. The `ResizeObserver` and `MutationObserver` callbacks on lines 54-55 capture a stale `resize` closure from the initial mount (the effect has `[]` deps). So observers call a stale `resize` that always sees `isExpanded = false`. Meanwhile the unconditional `useEffect(() => { resize(); })` on line 75-77 DOES run with fresh closure on every render and should set the correct maxHeight. So that path works. Let me re-examine...

- timestamp: 2026-03-18
  checked: Re-examined the interaction between observers and the render effect
  found: The unconditional useEffect on line 75-77 calls resize() after every render with fresh isExpanded. This SHOULD set maxHeight correctly. BUT the ResizeObserver on the card and content elements fires AFTER the layout settles, and its callback uses the STALE closure where isExpanded=false. So the sequence is: (1) user clicks, setExpanded(true), (2) re-render, (3) useEffect fires resize() with isExpanded=true -> sets maxHeight to scrollHeight, (4) content element resizes, (5) ResizeObserver fires with stale resize() where isExpanded=false -> sets maxHeight back to 0px. This is the bug: the ResizeObserver immediately undoes the expansion.

- timestamp: 2026-03-18
  checked: Card wrapper layout - line 93
  found: `className="w-full flex flex-col gap-sm"` applies gap-sm between the header div and the content div. Even when content has maxHeight:0 and overflow:hidden, the flex gap still applies because the content div is still a flex child with non-zero presence in the layout (it's not display:none). This creates the "strange height below the title" when closed.

## Resolution

root_cause: |
  TWO BUGS:
  1. ResizeObserver/MutationObserver stale closure: observers are created in a mount-only useEffect ([] deps) and capture the initial `resize` function where `isExpanded` is always `false`. When the unconditional useEffect correctly expands the content, the ResizeObserver fires (because content size changed) and immediately collapses it back to 0px using its stale closure.
  2. Flex gap on card wrapper: `gap-sm` between header and content divs produces visible spacing even when content is collapsed (maxHeight:0, overflow:hidden), because the content div is still a flex child.

fix: (not applied - diagnosis only)
verification: (not applied)
files_changed: []
