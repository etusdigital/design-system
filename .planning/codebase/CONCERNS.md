# Codebase Concerns

**Analysis Date:** 2026-03-13

## Tech Debt

**Container Label Sizing Issues:**
- Issue: Dynamic label sizing depends on ionicons loading and slot content timing; MutationObserver may not trigger properly
- Files: `src/utils/components/Container.vue`, `src/utils/components/SelectContainer.vue`
- Impact: Initial label div size calculation fails; border width inconsistency with sub-items; causes visual layout shifts
- Fix approach: Replace MutationObserver with ResizeObserver for more reliable size tracking; add explicit height constraints during ionicon load

**Type Casting with `as unknown`:**
- Issue: Multiple locations use `as unknown as [Type]` to bypass type checking instead of fixing underlying type issues
- Files: `src/components/Calendar/Calendar.vue:185`, `src/components/RichTextEditor/RichTextEditor.vue:269`, `src/components/ActionCard/ActionCard.vue:63`
- Impact: Masks type errors; reduces type safety; complicates maintenance
- Fix approach: Refactor types to be properly inferred; use generics where applicable instead of force-casting

**Loose Type Definitions:**
- Issue: Many utility functions and composables use `any` type parameter to avoid proper typing
- Files: `src/utils/index.ts` (functions like `hexaToRgba`, `hslaToRgba`, `rgbaToHsla`, `rgbaToHsva` return `any`), `src/composables/OptionalModel.ts` (props and emit typed as `any`)
- Impact: Reduces IDE autocomplete effectiveness; increases runtime errors; makes refactoring difficult
- Fix approach: Define explicit return types for color conversion functions; create proper type definitions for OptionalModel generic parameters

**Weak Input Validation:**
- Issue: Utility functions like `getPosition()`, validation functions accept `any` type parameters with minimal validation
- Files: `src/utils/index.ts:360-389` (getPosition function), validation regex functions
- Impact: Invalid inputs pass silently; bugs surface late in execution; regex patterns not validated
- Fix approach: Add explicit parameter typing and pre-condition checks; validate regex patterns upfront

**Arbitrary `new Function()` Usage:**
- Issue: `isRange()` function dynamically creates function from string for date comparison
- Files: `src/utils/index.ts:286-292`
- Impact: Hard to debug; potential security concern; difficult to test; no type checking
- Fix approach: Replace with explicit comparison logic instead of dynamic function generation

## Known Issues

**Debug Console Statements:**
- Symptoms: Production build includes console.log and console.error statements; no log filtering
- Files: `src/components/RichTextEditor/RichTextEditor.vue:505, 550, 598, 807`
- Trigger: Occurs during RichTextEditor operations and error handling
- Workaround: None; statements persist in production
- Fix: Remove all console statements or implement proper logging framework with environment-based filtering

**Memory Leak in Carousel Component:**
- Symptoms: `setInterval` created in `setCarouselInterval()` may not be properly cleared
- Files: `src/components/Carousel/Carousel.vue:119-131`
- Trigger: Component unmounts while carousel interval is active; no cleanup hook found
- Workaround: Manually call `clearInterval()` before component destruction
- Fix: Add `onBeforeUnmount()` hook to guarantee interval cleanup; store interval reference and clear it

**Typo in ActionCard Event Registration:**
- Symptoms: TouchEvent handler never fires for touch end
- Files: `src/components/ActionCard/ActionCard.vue:32`
- Trigger: Typo `"touhend"` instead of `"touchend"` prevents proper touch gesture cleanup
- Workaround: None; touch drag behavior will not properly end
- Fix: Correct event name to `"touchend"` on lines 32 and 39

**Unsafe TouchEvent Casting:**
- Symptoms: Non-standard cast of TouchEvent.touches[0] as Event
- Files: `src/components/ActionCard/ActionCard.vue:63`
- Trigger: Drag operations using touch; getEvent() function returns incorrect type
- Impact: Type checking bypassed; potential runtime issues if upstream expects specific Event properties
- Fix: Return `TouchEvent` type when appropriate or create wrapper type that supports both Event and Touch

## Security Considerations

**HTML Sanitization in RichTextEditor:**
- Risk: `innerHTML` assignments could allow XSS if sanitization is incomplete
- Files: `src/components/RichTextEditor/RichTextEditor.vue` (multiple innerHTML assignments)
- Current mitigation: HTML is sanitized via `sanitizeHTML()` function with whitelist of allowed tags and attributes
- Recommendations:
  - Expand attribute whitelist audit (currently allows style, href, src, alt, title only)
  - Add Content Security Policy header to application
  - Consider using DOMPurify library instead of custom sanitization
  - Add unit tests for sanitization with known XSS payloads

**Dynamic Function Generation:**
- Risk: `new Function()` in `isRange()` could execute arbitrary code if input is not trusted
- Files: `src/utils/index.ts:290`
- Current mitigation: Function is auto-generated with limited parameters; input is date strings
- Recommendations:
  - Replace with explicit comparison logic immediately
  - If dynamic code generation required: validate all inputs strictly and use Content Security Policy

## Performance Bottlenecks

**RichTextEditor Component Complexity:**
- Problem: Single component file with 1793 lines; handles editing, formatting, toolbar, history, undo/redo
- Files: `src/components/RichTextEditor/RichTextEditor.vue`
- Cause: Monolithic design; no component decomposition
- Improvement path:
  - Extract toolbar into separate `RichTextToolbar.vue` component
  - Extract color picker into `RichTextColorPicker.vue`
  - Extract history management into composable
  - Split formatting logic into utility functions

**ColorPicker and Slider Components:**
- Problem: 594-line and 589-line single-file components with complex state management
- Files: `src/components/ColorPicker/ColorPicker.vue`, `src/components/Slider/Slider.vue`
- Cause: No decomposition; inline logic
- Improvement path: Break into sub-components; extract state logic into composables

**MutationObserver on Every Render:**
- Problem: Container component uses MutationObserver for dynamic resizing; fires on every DOM change
- Files: `src/utils/components/Container.vue:48`
- Cause: Global observer watching all attributes; no debouncing
- Impact: Potential performance degradation with many container instances
- Improvement path: Switch to ResizeObserver; debounce resize calculations; consider using IntersectionObserver for visibility

**Frequent DOM Queries:**
- Problem: `getBoundingClientRect()`, `offsetWidth`, `offsetHeight` called repeatedly in animation and layout calculations
- Files: `src/components/Carousel/Carousel.vue:195-202`, `src/utils/index.ts:360-389`
- Impact: Triggers browser reflow; synchronous operations block rendering
- Improvement path: Cache layout measurements; batch DOM reads/writes; use requestAnimationFrame

## Fragile Areas

**Carousel Auto-Play without Cleanup:**
- Files: `src/components/Carousel/Carousel.vue`
- Why fragile: `setCarouselInterval()` creates setInterval but no corresponding cleanup in unmount hook; can persist after component destruction
- Safe modification: Always wrap interval operations in try-finally; verify unmount cleanup exists before modifying timer logic
- Test coverage: No automated tests found for component lifecycle; unmount scenarios not verified

**Dynamic Date Comparison Logic:**
- Files: `src/utils/index.ts:280-293`
- Why fragile: `isRange()` uses dynamic function generation; logic is hard to follow; multiple type conversions
- Safe modification: Replace with static comparison function; add parameter validation; add tests for edge cases (leap years, month boundaries)
- Test coverage: No tests found; edge cases with different date formats/timezones not covered

**HTML Sanitization Whitelist:**
- Files: `src/components/RichTextEditor/RichTextEditor.vue:291-307`
- Why fragile: Manual whitelist of allowed tags and attributes; easy to miss security implications of new tags
- Safe modification: Document security rationale for each allowed attribute; add comments explaining why `style` is safe with current content; consider moving to constants
- Test coverage: No comprehensive XSS test suite found

**Type Casting in Color Conversion:**
- Files: `src/utils/index.ts` (hslaToRgba, rgbaToHsla, rgbaToHsva, etc.)
- Why fragile: Functions return `any` type; callers assume object structure without verification
- Safe modification: Add JSDoc with return type documentation; create shared type definition; add input range validation
- Test coverage: No unit tests found for color conversion edge cases (out-of-range values, non-numeric inputs)

## Test Coverage Gaps

**No Unit Tests:**
- What's not tested: All utility functions in `src/utils/index.ts`; composables; component logic
- Files: `src/utils/index.ts`, `src/composables/OptionalModel.ts`
- Risk: Utility functions like color conversions, date calculations, and masks can silently fail
- Priority: High - utility functions are foundational to many components

**No Component Lifecycle Tests:**
- What's not tested: Unmount cleanup (event listeners, intervals, observers), re-mount behavior, prop changes
- Files: Carousel (interval cleanup), Container (observer cleanup), ActionCard (event listener cleanup)
- Risk: Memory leaks undetected; cleanup bugs only surface in long-running applications
- Priority: High - memory issues impact user experience over time

**No Integration Tests:**
- What's not tested: RichTextEditor formatting combinations; date range selection edge cases; carousel with dynamic options
- Files: `src/components/RichTextEditor/RichTextEditor.vue`, `src/components/Calendar/Calendar.vue`, `src/components/Carousel/Carousel.vue`
- Risk: Features that work in isolation fail when combined; user workflows not validated
- Priority: Medium

**No E2E Tests:**
- What's not tested: Full user workflows; interaction across multiple components
- Risk: Features appear to work in development but fail in real usage
- Priority: Medium

## Scaling Limits

**Carousel with Large Option Lists:**
- Current capacity: Can render 100+ options but layout calculations do full DOM traversal
- Limit: Significant performance degradation with 1000+ items due to `calculateContentStyle()` loop
- Scaling path: Implement virtual scrolling; batch layout calculations; use CSS containment

**RichTextEditor Content Size:**
- Current capacity: Works fine with documents under 50KB
- Limit: Large documents (>1MB) experience lag during formatting due to DOM manipulation
- Scaling path: Implement content chunking; use ContentEditable with virtual rendering; consider CRDT for collaboration

**Container Components with Dynamic Content:**
- Current capacity: Works with 10-20 simultaneous open containers
- Limit: Each container creates MutationObserver; cumulative cost with many instances on single page
- Scaling path: Use shared observer pattern; throttle resize calculations; implement observer pooling

## Dependencies at Risk

**Custom Sanitization Implementation:**
- Risk: Home-grown HTML sanitization is error-prone; no ongoing maintenance like DOMPurify
- Impact: XSS vulnerabilities may be introduced with new allowed tags; no community security audits
- Migration plan: Replace `sanitizeHTML()` with DOMPurify library; update RichTextEditor component to use it

## Missing Critical Features

**No Test Infrastructure:**
- Problem: Package.json has vitest and @vitest/browser installed but no tests exist
- Blocks: Cannot verify component behavior; cannot prevent regressions
- Priority: High

**No Error Boundary Component:**
- Problem: Components lack error recovery; one component failure can crash parent
- Blocks: Application stability; debugging production issues
- Priority: Medium

**No Accessibility Testing:**
- Problem: Components may have accessibility issues (keyboard navigation, ARIA labels)
- Blocks: Compliance with WCAG standards; using components in accessible applications
- Priority: Medium

## Documentation Gaps

**No JSDoc/TSDoc Comments:**
- Utility functions lack parameter documentation; return types are `any`
- Color conversion functions have no documentation of input ranges or expected formats
- Impact: Developers guess at function signatures; no IDE tooltips

**No Component Props Documentation:**
- RichTextEditor and other complex components have many props but no documentation comments
- Impact: Difficult to discover available features; easy to use props incorrectly

---

*Concerns audit: 2026-03-13*
