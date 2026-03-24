# Phase 9: Documentation & Testing - Research

**Researched:** 2026-03-24
**Domain:** React Testing Library + Vitest + Storybook (form component test coverage, test script wiring, build validation)
**Confidence:** HIGH — all findings derived from direct inspection of existing project files

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- All 57 `.stories.tsx` files already exist and are correct — do NOT modify stories or MDX files
- `build-storybook` must complete with zero errors as a phase gate
- MDX documentation was already updated to React in Phase 8 — no changes needed
- Each of the 12 form components must have RTL tests covering exactly 3 scenarios: (1) controlled mode, (2) uncontrolled mode, (3) ref forwarding
- Verify existing tests pass first; only write new tests for components missing the 3 required scenarios
- Run `vitest run` to confirm — existing tests that already cover these scenarios are kept as-is
- Add `"test": "vitest run"` and `"test:watch": "vitest"` scripts to package.json
- All tests across the entire suite must pass with zero failures as a phase gate
- 18 atomic component smoke stubs (10-line `renders without crashing`) are sufficient — do NOT upgrade to real tests
- Composite/complex component tests left as-is — no new tests or coverage expansion
- Visual parity was already verified in prior UAT rounds — no additional visual review needed
- `build-storybook` passing cleanly serves as the validation that stories render correctly

### Claude's Discretion

- Which form components already meet the 3-test requirement vs need new tests
- Test implementation details (how to test controlled/uncontrolled/ref for each specific component)
- Order of test writing
- How to fix any failing tests discovered during the vitest run

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| TEST-01 | Storybook stories migrated for all 57 components (.stories.tsx) | Stories already exist; `build-storybook` run validates completeness |
| TEST-02 | Component tests written with RTL for all 12 form components (controlled, uncontrolled, ref forwarding) | Gap analysis below maps exact missing scenarios per component |
| TEST-03 | Visual output matches Vue version for all components | Declared satisfied by prior UAT; `build-storybook` clean serves as final gate |
</phase_requirements>

---

## Summary

Phase 9 is a targeted cleanup phase, not a greenfield effort. The infrastructure is 100% complete: Vitest is configured with a `unit` test project (jsdom + RTL), 57 stories exist, MDX docs are updated, and all 12 form components already have test files. The work is:

1. Add two missing `package.json` scripts (`test` and `test:watch`).
2. Perform a `vitest run` baseline to discover any currently failing tests and fix them.
3. For each of the 12 form components, check whether the 3 required scenarios (controlled, uncontrolled, ref forwarding) are covered; write only the missing tests.
4. Run `build-storybook` to confirm the TEST-01 and TEST-03 gates pass.

The gap analysis below (HIGH confidence, based on direct file inspection) shows that 9 out of 12 form components are missing at least one of the 3 required test scenarios. Slider is the only form component with all 3 covered. Input and Textarea have 2 of 3; the remaining 9 have 1 or 2 of 3.

**Primary recommendation:** Fix package.json scripts first, then baseline vitest run, then add missing test cases per the gap table below — all additive, no rewrites.

---

## Standard Stack

### Core (already installed — no new packages needed)

| Library | Version (from package.json) | Purpose | Status |
|---------|----------------------------|---------|--------|
| vitest | ^3.2.4 | Test runner | Installed |
| @testing-library/react | ^16.3.2 | RTL render/query utilities | Installed |
| @testing-library/jest-dom | ^6.9.1 | Custom matchers (toBeInTheDocument, etc.) | Installed |
| jsdom | ^28.1.0 | DOM environment for unit tests | Installed |
| storybook | 9.1.3 | Component story runner | Installed |
| @storybook/react-vite | ^9.1.3 | Storybook React framework | Installed |
| @storybook/addon-vitest | 9.1.3 | Storybook-Vitest integration | Installed |

**Installation:** No new packages required. All dependencies are present.

---

## Architecture Patterns

### Test Project Structure (existing — do not change)

```
vite.config.ts
├── test.projects[0]  → name: "storybook"  (browser, playwright, chromium)
│   └── setupFiles: ['.storybook/vitest.setup.ts']
└── test.projects[1]  → name: "unit"  (jsdom, globals: true)
    ├── include: ['src/**/*.test.ts', 'src/**/*.test.tsx']
    └── setupFiles: ['./vitest.setup.ts']
```

`vitest run` executes both projects. The storybook project requires a running browser (playwright/chromium). For unit-only runs:
```bash
vitest run --project unit
```

### Test Commands (post-script addition)

| Command | What it runs |
|---------|-------------|
| `npm test` | `vitest run` — runs all projects (unit + storybook) |
| `npm run test:watch` | `vitest` — watch mode |
| `vitest run --project unit` | Unit tests only (fast, no browser) |
| `npm run build-storybook` | Build Storybook, validates all stories |

### Pattern 1: Controlled Mode Test
**What:** Pass `value` + `onChange`, fire event, assert `onChange` was called with the new value.
**When to use:** Every form component.
**Example (from existing Input.test.tsx):**
```typescript
// Source: src/components/Input/Input.test.tsx
it('fires onChange on input', () => {
  const handleChange = vi.fn();
  const { container } = render(<Input value="" onChange={handleChange} />);
  const input = container.querySelector('input') as HTMLInputElement;
  fireEvent.change(input, { target: { value: 'hello' } });
  expect(handleChange).toHaveBeenCalledWith('hello');
});
```

### Pattern 2: Uncontrolled Mode Test
**What:** Pass `defaultValue`, interact, assert the DOM updates without an external `value` prop.
**When to use:** Every form component.
**Example (from existing Checkbox.test.tsx):**
```typescript
// Source: src/components/Checkbox/Checkbox.test.tsx
it('toggles value on click', () => {
  render(<Checkbox defaultValue={false} />);
  const checkbox = document.querySelector('[role="checkbox"]')!;
  expect(checkbox).toHaveAttribute('aria-checked', 'false');
  fireEvent.click(checkbox);
  expect(checkbox).toHaveAttribute('aria-checked', 'true');
});
```

### Pattern 3: Ref Forwarding Test
**What:** `createRef<HTMLElement>()`, pass as `ref`, after render assert `ref.current instanceof HTMLElement`.
**When to use:** Every form component that uses `forwardRef`.
**Example (from existing Input.test.tsx):**
```typescript
// Source: src/components/Input/Input.test.tsx
it('forwards ref to native input', () => {
  const ref = createRef<HTMLInputElement>();
  render(<Input ref={ref} />);
  expect(ref.current).toBeInstanceOf(HTMLInputElement);
});
```

### Pattern 4: Imperative Handle Ref (PINInput special case)
PINInput exposes a custom handle (`PINInputHandle`) with `focus()` and `clear()` methods, not a DOM element. The ref test should use `createRef<PINInputHandle>()` — this is already covered in the existing PINInput.test.tsx.

### Pattern 5: fireEvent vs userEvent
**Rule:** Use `fireEvent` (not `userEvent`) when `vi.useFakeTimers()` is active, or when testing simple DOM events. `userEvent` has an async queue that hangs with fake timers. This is already established project convention.

### Anti-Patterns to Avoid
- **Do NOT use `userEvent` with fake timers** — hangs the test runner. Use `fireEvent` instead.
- **Do NOT modify stories or MDX files** — locked by user decision.
- **Do NOT expand composite/complex component test coverage** — out of scope.
- **Do NOT upgrade atomic component smoke stubs** — 10-line stubs are sufficient per user decision.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| DOM queries in tests | Custom query helpers | RTL built-ins (`screen.getByRole`, `container.querySelector`) | Already established in project |
| Fake timer management | Manual `setTimeout` mocking | `vi.useFakeTimers()` + `vi.advanceTimersByTime()` | TagInput pattern already uses this |
| Ref access in tests | Manual DOM manipulation | `createRef` + `expect(ref.current).toBeInstanceOf()` | Established across Input, Slider, Textarea |
| Browser environment | Real browser | jsdom + vitest `unit` project | Already configured, sufficient for RTL |

---

## Common Pitfalls

### Pitfall 1: Running `vitest run` without `--project unit` triggers playwright
**What goes wrong:** `vitest run` with both projects configured will attempt to launch a Chromium browser for the storybook project. If playwright browsers are not installed this fails.
**Why it happens:** The storybook test project uses `browser.provider: 'playwright'`.
**How to avoid:** For unit-only work, run `vitest run --project unit`. For the full gate, run `npm run build-storybook` separately from the unit test run.
**Warning signs:** Errors mentioning `playwright`, `chromium`, or `browser not found`.

### Pitfall 2: Missing `act()` wrapper for imperative handle calls
**What goes wrong:** `ref.current.clear()` triggers a React state update outside a React event — test will warn or fail without `act()`.
**Why it happens:** Imperative handle methods that call `setState` internally run outside React's event batching.
**How to avoid:** Wrap imperative calls in `act(() => { ref.current?.clear(); })`. Already demonstrated in PINInput.test.tsx.
**Warning signs:** "Warning: An update to ... inside a test was not wrapped in act(...)".

### Pitfall 3: Controlled mode test using only `onChange` without `value` prop
**What goes wrong:** Passing `onChange` without `value` is still uncontrolled — `useControllable` treats absence of `value` as uncontrolled.
**Why it happens:** Confusion between "I provided onChange" and "I provided value+onChange".
**How to avoid:** A proper controlled test MUST pass both `value` and `onChange`. Example: `<Toggle value={false} onChange={handleChange} />`.
**Warning signs:** Test "calls onChange" but never passes a `value` prop.

### Pitfall 4: `vi.fn()` used without import in test files missing the `vi` import
**What goes wrong:** Toggle.test.tsx and ToggleGroup.test.tsx use `vi.fn()` without importing `vi` from vitest. This works because `globals: true` is set in the unit test project config — `vi` is available globally.
**Why it happens:** `globals: true` in vite.config.ts unit project injects `vi`, `describe`, `it`, `expect` into scope.
**How to avoid:** Either import explicitly (`import { vi } from 'vitest'`) or rely on globals — both work. New tests can use either style; stay consistent with the file being edited.

### Pitfall 5: `ToggleGroup` and `Toggle` controlled tests need the `value` + `onChange` combo
**What goes wrong:** `ToggleGroup` currently tests `onChange` but passes no `value` prop — this is uncontrolled, not controlled mode.
**How to avoid:** Controlled test: `<ToggleGroup value={1} onChange={handleChange} options={...} />`, click a different option, assert `onChange` was called.

### Pitfall 6: Ref type for composite form components
**What goes wrong:** Using `createRef<HTMLInputElement>()` on a component that forwards to a `div` or returns `null` fails the instanceof check.
**How to avoid:** Check the component's `forwardRef` signature. For example: Slider forwards to `HTMLDivElement` (confirmed in Slider.test.tsx), Textarea to `HTMLTextAreaElement`, Input to `HTMLInputElement`.

---

## Form Component Test Gap Analysis

This is the core planning artifact. Based on direct inspection of all 12 test files.

| Component | Controlled? | Uncontrolled? | Ref Forwarding? | Action Needed |
|-----------|-------------|---------------|-----------------|---------------|
| Input | YES | NO | YES | Add uncontrolled test (render with `defaultValue`, type, assert DOM value) |
| Checkbox | YES | YES | NO | Add ref forwarding test (`createRef<HTMLDivElement>` or root element type — check component) |
| Radio | YES (standalone click + onChange) | YES (standalone click) | NO | Add ref forwarding test |
| RadioGroup | YES | YES | NO | Add ref forwarding test |
| Slider | YES | YES | YES | All 3 covered — no action needed |
| Switch | YES | YES | NO | Add ref forwarding test |
| Toggle | NO | YES | NO | Add controlled test + ref forwarding test |
| ToggleGroup | NO (onChange only, no value prop) | YES | NO | Add proper controlled test (value + onChange) + ref forwarding test |
| Textarea | YES | NO | YES | Add uncontrolled test (render with `defaultValue`, type, assert DOM value) |
| PINInput | NO | YES | YES (imperative handle) | Add controlled test (value + onChange) |
| TagInput | NO | YES | NO | Add controlled test (value + onChange) + ref forwarding test |
| FileUpload | PARTIAL (onChange only) | YES | NO | Add proper controlled test (value + onChange) + ref forwarding test |

**Summary:** 1 component fully covered (Slider). 11 components need at least 1 additional test case. Total new test cases to write: approximately 17.

---

## Code Examples

### Uncontrolled Test — Input
```typescript
// Pattern: defaultValue + interact + assert DOM
it('renders with defaultValue (uncontrolled)', () => {
  const { container } = render(<Input defaultValue="initial" />);
  const input = container.querySelector('input') as HTMLInputElement;
  expect(input.value).toBe('initial');
});
```

### Controlled Test — Toggle
```typescript
// Pattern: value + onChange + fireEvent
it('controlled mode calls onChange', () => {
  const handleChange = vi.fn();
  const { getByRole } = render(<Toggle value={false} onChange={handleChange}>Label</Toggle>);
  fireEvent.click(getByRole('button'));
  expect(handleChange).toHaveBeenCalledWith(true);
});
```

### Controlled Test — PINInput
```typescript
// PINInput controlled: value is string (e.g. '1234'), onChange called with new string
it('controlled mode calls onChange', () => {
  const handleChange = vi.fn();
  render(<PINInput value="0000" onChange={handleChange} length={4} />);
  const inputs = document.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
  fireEvent.change(inputs[0], { target: { value: '5' } });
  expect(handleChange).toHaveBeenCalled();
});
```

### Controlled Test — TagInput
```typescript
// TagInput controlled: value is string[], onChange called with new array
it('controlled mode calls onChange', () => {
  const handleChange = vi.fn();
  render(<TagInput value={['existing']} onChange={handleChange} />);
  const textarea = document.querySelector('textarea')!;
  fireEvent.change(textarea, { target: { value: 'newtag' } });
  fireEvent.keyDown(textarea, { key: 'Enter' });
  expect(handleChange).toHaveBeenCalled();
});
```

### Ref Forwarding Test — Generic template
```typescript
// Adapt HTMLElement subtype to what the component actually forwards to
it('forwards ref to root element', () => {
  const ref = createRef<HTMLDivElement>(); // or HTMLButtonElement, HTMLInputElement, etc.
  render(<ComponentName ref={ref} />);
  expect(ref.current).toBeInstanceOf(HTMLDivElement);
});
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `@testing-library/user-event` async | `fireEvent` for fake-timer tests | Phase 5 decision | No async queue issues |
| Vue test utils | RTL | Phase 1 migration | Aligned with React ecosystem |
| No test scripts in package.json | Add `test` + `test:watch` | Phase 9 | Enables `npm test` |

---

## Open Questions

1. **Ref forwarding element type for Checkbox, Radio, RadioGroup, Switch, Toggle, ToggleGroup, TagInput, FileUpload**
   - What we know: These components use `forwardRef` (established in FORM-01–12 requirements) but the test files have not yet verified the ref type
   - What's unclear: Whether they forward to a specific HTML element (div, button, input) or a custom handle
   - Recommendation: Read each component's source to confirm the ref type before writing the test. The planner should add a "read source" step before each ref test task, or batch all ref type lookups into a single discovery task.

2. **FileUpload `value` prop interface for controlled mode**
   - What we know: FileUpload supports `onChange` with `File | File[]`; the existing test calls `onChange` but never passes `value`
   - What's unclear: Whether FileUpload accepts a `value` prop as a controlled `File | File[]`, or only exposes `onChange`
   - Recommendation: Read `FileUpload.tsx` source to confirm the prop interface before writing the controlled test.

3. **Vitest storybook project baseline failures**
   - What we know: The storybook project runs in browser via playwright; stories exist for all 57 components
   - What's unclear: Whether any stories currently throw runtime errors that would fail the storybook vitest project
   - Recommendation: `npm run build-storybook` as a first task to surface any compilation errors in stories before running story-level tests.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | vitest 3.2.4 |
| Config file | `vite.config.ts` (test.projects array) |
| Unit run command | `vitest run --project unit` |
| Full suite command | `vitest run` (unit + storybook browser tests) |
| Build gate | `npm run build-storybook` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| TEST-01 | All 57 stories build without errors | build | `npm run build-storybook` | N/A (build command) |
| TEST-02 | 12 form components have controlled/uncontrolled/ref tests | unit | `vitest run --project unit` | Partial — 12 files exist, gaps documented above |
| TEST-03 | Visual parity with Vue version | manual/build | `npm run build-storybook` | N/A (declared satisfied by prior UAT) |

### Sampling Rate

- **Per task commit:** `vitest run --project unit`
- **Per wave merge:** `vitest run --project unit` (browser storybook project is the final gate, not per-task)
- **Phase gate:** `npm run build-storybook` + `vitest run --project unit` both green before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] `package.json` — add `"test": "vitest run"` and `"test:watch": "vitest"` scripts (none currently exist)

All test files exist; only gaps are missing test cases within existing files and the package.json scripts.

---

## Sources

### Primary (HIGH confidence)
- Direct file inspection: `src/components/*/test.tsx` — all 12 form component test files read in full
- Direct file inspection: `vite.config.ts` — vitest configuration confirmed
- Direct file inspection: `vitest.setup.ts` — RTL jest-dom setup confirmed
- Direct file inspection: `package.json` — confirmed absence of `test` and `test:watch` scripts
- Direct file inspection: `.storybook/main.ts` — Storybook React-Vite config confirmed
- Direct file inspection: `.planning/phases/09-documentation-testing/09-CONTEXT.md` — user decisions

### Secondary (MEDIUM confidence)
- `.planning/STATE.md` accumulated context — documents established test patterns from prior phases

---

## Metadata

**Confidence breakdown:**
- Gap analysis: HIGH — based on direct file inspection, not inference
- Standard stack: HIGH — read from package.json and vite.config.ts directly
- Architecture/patterns: HIGH — read from existing test files and vitest config
- Open questions: MEDIUM — ref element types require reading component source files

**Research date:** 2026-03-24
**Valid until:** 2026-04-23 (stable domain — test infrastructure won't change within phase)
