# Testing Patterns

**Analysis Date:** 2026-03-13

## Test Framework

**Runner:**
- Vitest 3.2.4
- Config: `vite.config.ts` (test configuration embedded in Vite config)
- Browser testing enabled via Playwright provider for Storybook integration

**Assertion Library:**
- Storybook's built-in assertion support with Vitest addon
- No traditional unit test assertions detected (Jest/Vitest expect not used directly)

**Run Commands:**
```bash
pnpm run storybook              # Start Storybook dev server
pnpm run build-storybook        # Build Storybook for production
pnpm run build:lib              # Build library with tests included
```

**Note:** Explicit test commands not defined in `package.json` - testing via Storybook stories is the primary test mechanism.

## Test File Organization

**Location:**
- Stories co-located with components in same directory
- Pattern: One `.stories.ts` file per component
- Example: `src/components/RadioGroup/RadioGroup.stories.ts` alongside `RadioGroup.vue`

**Naming:**
- Format: `[ComponentName].stories.ts`
- Examples: `Button.stories.ts`, `RadioGroup.stories.ts`, `Dropdown.stories.ts`

**Structure:**
```
src/components/[ComponentName]/
├── [ComponentName].vue          # Component implementation
├── [ComponentName].stories.ts   # Storybook stories
├── [ComponentName].mdx          # Documentation (optional)
├── index.ts                     # Plugin export
└── (additional files as needed)
```

## Test Structure

**Suite Organization:**

From `src/components/RadioGroup/RadioGroup.stories.ts`:

```typescript
import type { Meta, StoryObj } from "@storybook/vue3";
import RadioGroup from "./RadioGroup.vue";

// Meta defines component configuration
export default {
  component: RadioGroup,
  argTypes: {
    modelValue: {
      type: { name: "other", value: "any" },
      table: {
        defaultValue: { summary: "undefined" },
      },
    },
    // ... other props
  },
} satisfies Meta<typeof RadioGroup>;

type Story = StoryObj<typeof RadioGroup>;

// Default args for all stories
const defaultArgs = {
  modelValue: 1,
  vertical: false,
  options: [...],
};

// Render function template
const defaultHtml = `...`;
const defaultRender = (args: any) => ({
  components: { RadioGroup },
  setup() {
    return { args };
  },
  template: defaultHtml,
});

// Individual story variants
export const Primary: Story = {
  render: defaultRender,
  args: defaultArgs,
};

export const Vertical: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    vertical: true,
  },
};
```

**Patterns:**
- Use `satisfies Meta<typeof Component>` for type-safe story metadata
- Define `defaultArgs` object to reduce duplication across stories
- Create reusable `defaultRender` function for stories with same template
- Stories test component states by varying props (Primary, Disabled, Vertical variants)
- No setup/teardown hooks; props handle state initialization

## Mocking

**Framework:** Storybook with Vitest integration via `@storybook/addon-vitest`

**Patterns:**
- Mocking handled at Storybook level via decorators in `.storybook/preview.ts`
- Global theme decorator wraps all stories:
```typescript
const withTheme = (story: any, context: any) => {
  const theme = context.globals.theme || "etus";
  return {
    setup() {
      const storyResult = story();
      return { storyResult };
    },
    template: `<div class="${theme}-theme"><story /></div>`,
  };
};
```

**What to Mock:**
- Global providers (theme, design system) via Storybook decorators
- External dependencies (Material Symbols font) loaded in `.storybook/preview.ts`
- Global components registered via `app.use(DesignSystem)`

**What NOT to Mock:**
- Component props/events - test actual component behavior
- Internal Vue 3 APIs (ref, computed, watch)
- DOM interactions - use real browser environment (Playwright)

## Fixtures and Factories

**Test Data:**

From `src/components/RadioGroup/RadioGroup.stories.ts`:
```typescript
const defaultArgs = {
  modelValue: 1,
  vertical: false,
  disabled: false,
  options: [
    { label: "First", value: 1 },
    { label: "Second", value: 2 },
    { label: "Third", value: 3 },
  ],
  labelKey: "label",
  valueKey: "value",
  getObject: false,
};
```

**Location:**
- Test data defined inline in story files
- Complex options stored in `defaultArgs` object
- Reused across multiple story variants

## Coverage

**Requirements:** Not enforced

**View Coverage:**
- No coverage reporting configured
- Storybook stories serve as living documentation + testing
- A11y testing configured but set to 'todo' mode (warnings only, no failures)

## Test Types

**Unit Tests:**
- Handled by Storybook story variants
- Each story represents a test case for a specific prop combination
- No dedicated unit test files (`.test.ts`, `.spec.ts`) found in codebase
- Testing scope: Component rendering with different prop values

**Integration Tests:**
- Storybook project configuration in `vite.config.ts`:
```typescript
test: {
  projects: [{
    extends: true,
    plugins: [storybookTest({
      configDir: path.join(__dirname, '.storybook')
    })],
    test: {
      name: 'storybook',
      browser: {
        enabled: true,
        headless: true,
        provider: 'playwright',
        instances: [{
          browser: 'chromium'
        }]
      },
      setupFiles: ['.storybook/vitest.setup.ts']
    }
  }]
}
```
- Playwright browser testing enabled for story interactions
- Storybook addon-vitest runs tests in real browser environment

**E2E Tests:**
- Framework: Playwright (via `@vitest/browser`)
- Setup file: `.storybook/vitest.setup.ts` initializes Storybook project annotations
- Headless Chromium runs story tests
- Not explicitly configured for full application E2E flows

## Common Patterns

**Async Testing:**
- Vue 3 composition API handles async state via reactive refs
- Components with async data use refs + watch pattern
- Example from `src/components/Dropdown/Dropdown.vue`:
```typescript
onBeforeMount(() => {
  updateSearch();
});
```
- Storybook decorators and preview setup manage async initialization

**Error Testing:**
- Components accept `isError` and `errorMessage` props to test error states
- Example from `Dropdown.vue` props:
```typescript
isError?: boolean;
errorMessage?: string;
infoMessage?: string;
```
- Story variants test error state visually:
```typescript
export const Error: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    isError: true,
    errorMessage: "This field is required",
  },
};
```

**Accessibility Testing:**
- Storybook addon-a11y integrated in `.storybook/preview.ts`
- A11y tests configured to 'todo' mode (warnings in test UI only)
- Can be changed to 'error' mode to fail CI on violations
- Setup in preview:
```typescript
parameters: {
  a11y: {
    // 'todo' - show a11y violations in the test UI only
    // 'error' - fail CI on a11y violations
    // 'off' - skip a11y checks entirely
    test: 'todo'
  },
}
```

## Testing Best Practices Observed

1. **Story-Driven Testing:** Components tested through Storybook stories rather than traditional test files
2. **Prop-Based Variants:** Each prop combination creates a story variant (Primary, Disabled, Vertical, etc.)
3. **Visual Regression:** Chromatic addon (`@chromatic-com/storybook`) integrated for visual regression testing
4. **Living Documentation:** Stories serve dual purpose as tests and interactive documentation
5. **Type Safety:** Stories use TypeScript types (`StoryObj<typeof Component>`) for compile-time validation

---

*Testing analysis: 2026-03-13*
