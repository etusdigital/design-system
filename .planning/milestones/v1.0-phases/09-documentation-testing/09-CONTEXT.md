# Phase 9: Documentation & Testing - Context

**Gathered:** 2026-03-24
**Status:** Ready for planning

<domain>
## Phase Boundary

Ensure every component has a working Storybook story, all 12 form components have RTL tests covering controlled/uncontrolled/ref forwarding, and the full test suite passes. Visual parity has already been verified in prior phases. Stories and MDX documentation are already complete and should not be modified.

</domain>

<decisions>
## Implementation Decisions

### Story completeness
- All 57 `.stories.tsx` files already exist and are correct — do NOT modify stories or MDX files
- `build-storybook` must complete with zero errors as a phase gate
- MDX documentation was already updated to React in Phase 8 — no changes needed

### Form component test depth
- Each of the 12 form components must have RTL tests covering exactly 3 scenarios: (1) controlled mode, (2) uncontrolled mode, (3) ref forwarding
- Verify existing tests pass first; only write new tests for components missing the 3 required scenarios
- Run `vitest run` to confirm — existing tests that already cover these scenarios are kept as-is

### Test infrastructure
- Add `"test": "vitest run"` and `"test:watch": "vitest"` scripts to package.json
- All tests across the entire suite must pass with zero failures as a phase gate

### Stub test policy
- 18 atomic component smoke stubs (10-line `renders without crashing`) are sufficient — do NOT upgrade to real tests
- Composite/complex component tests left as-is — no new tests or coverage expansion

### Visual parity verification
- Visual parity was already verified in prior UAT rounds — no additional visual review needed
- `build-storybook` passing cleanly serves as the validation that stories render correctly

### Claude's Discretion
- Which form components already meet the 3-test requirement vs need new tests
- Test implementation details (how to test controlled/uncontrolled/ref for each specific component)
- Order of test writing
- How to fix any failing tests discovered during the vitest run

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Test configuration
- `vite.config.ts` — Vitest configuration with unit and storybook test projects
- `.storybook/main.ts` — Storybook config with React-Vite framework
- `.storybook/vitest.setup.ts` — Storybook test setup

### Form components (test targets)
- `src/components/Input/Input.test.tsx` — Existing Input tests (69 lines)
- `src/components/Checkbox/Checkbox.test.tsx` — Existing Checkbox tests (53 lines)
- `src/components/Radio/Radio.test.tsx` — Existing Radio tests (96 lines)
- `src/components/RadioGroup/RadioGroup.test.tsx` — Existing RadioGroup tests (88 lines)
- `src/components/Slider/Slider.test.tsx` — Existing Slider tests (114 lines)
- `src/components/Switch/Switch.test.tsx` — Existing Switch tests
- `src/components/Toggle/Toggle.test.tsx` — Existing Toggle tests
- `src/components/ToggleGroup/ToggleGroup.test.tsx` — Existing ToggleGroup tests
- `src/components/Textarea/Textarea.test.tsx` — Existing Textarea tests
- `src/components/PINInput/PINInput.test.tsx` — Existing PINInput tests
- `src/components/TagInput/TagInput.test.tsx` — Existing TagInput tests
- `src/components/FileUpload/FileUpload.test.tsx` — Existing FileUpload tests

### Package manifest
- `package.json` — Add test scripts here

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `useControllable` hook — used by all form components for controlled/uncontrolled pattern; test it via component tests
- `@testing-library/react` + `vitest` — already configured and used across 57+ test files
- Existing form test patterns (Input, Checkbox, Slider) — use as templates for missing tests

### Established Patterns
- Smoke test pattern: `render(<Component />); expect(document.body).toBeTruthy()`
- Controlled test pattern: pass `value` + `onChange`, assert onChange called with new value
- Uncontrolled test pattern: pass `defaultValue`, interact, assert DOM updates
- Ref forwarding test pattern: `createRef<HTMLElement>()`, pass as `ref`, assert `ref.current instanceof HTMLElement`
- `fireEvent` preferred over `userEvent` when `vi.useFakeTimers()` is active (avoids async queue hangs)

### Integration Points
- `package.json` scripts — needs `test` and `test:watch` entries
- Vitest config in `vite.config.ts` — unit test project already configured with jsdom + RTL
- `.storybook/main.ts` — `build-storybook` command validation

</code_context>

<specifics>
## Specific Ideas

- User explicitly stated: "Don't change any stories or MDX, they are already configured right"
- User explicitly stated: "The visual have been verified already"
- Phase scope is narrower than original success criteria suggests — primarily about form test coverage and ensuring the test suite passes cleanly

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 09-documentation-testing*
*Context gathered: 2026-03-24*
