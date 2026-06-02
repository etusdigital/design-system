# Coding Conventions

**Analysis Date:** 2026-03-13

## Naming Patterns

**Files:**
- Vue components: PascalCase with .vue extension (`Button.vue`, `RadioGroup.vue`, `Dropdown.vue`)
- TypeScript files: camelCase or PascalCase depending on exports (`event.ts`, `OptionalModel.ts`)
- Type definition files: Named with .ts extension in `src/utils/types/` directory (`Option.ts`, `Group.ts`, `DropOption.ts`)
- Story files: `[ComponentName].stories.ts` (e.g., `RadioGroup.stories.ts`, `Button.stories.ts`)
- Index files: Always `index.ts` for barrel exports (`src/components/index.ts`, `src/composables/index.ts`)
- Utility functions: camelCase in utility files (`calculateDate`, `hexaToRgba`, `isNilAndBlank`)

**Functions:**
- Exported utility functions: camelCase (`applyMask`, `blendColors`, `checkPath`, `isValidEmail`)
- Vue composables: camelCase prefixed with `use` (`useOptionalModel`)
- Internal component methods: camelCase (`getValue`, `getLabel`, `setModel`, `findOption`, `filterOptions`)
- Event handlers and callbacks: camelCase descriptive names (`handleClick`, `updateSearch`, `setModel`)

**Variables:**
- Reactive refs: camelCase (`model`, `isExpanded`, `search`, `isHovering`)
- Computed properties: camelCase (`selectedOption`, `filteredOptions`, `isLoading`, `computedIcon`)
- Object properties: camelCase in defineProps and defineEmits (`modelValue`, `labelKey`, `valueKey`, `getObject`, `isError`)
- Constants: UPPER_SNAKE_CASE for true constants, camelCase for exported objects

**Types:**
- Type names: PascalCase (`OptionType`, `DropOption`, `Option`, `Group`, `SidebarOption`, `ContainerModelExtra`)
- Type file exports: Type definitions prefixed with `type` keyword (`export type Option = { ... }`)
- Interface names: PascalCase (`OptionsConfirm`, `OptionsToast`)
- Props interface names: Use component name + Props pattern in Vue 3 (implicit with `defineProps<T>`)

## Code Style

**Formatting:**
- TypeScript strict mode enabled: `"strict": true` in `tsconfig.app.json`
- ES modules: `"type": "module"` in package.json
- Indentation: 2 spaces (implied by Vue conventions)
- Line length: No explicit limit but commitlint enforces 100-character header limit

**Linting:**
- TypeScript compiler: `vue-tsc` for type checking with Vue 3
- Unused locals/parameters flagged: `noUnusedLocals: true`, `noUnusedParameters: true`
- Strict type checking: `noUncheckedSideEffectImports: true`, `noFallthroughCasesInSwitch: true`
- No explicit ESLint or Prettier config found; formatting handled by vue-tsc and TypeScript
- Pre-commit hook: Runs `pnpm run generate-docs` before commits via husky

## Import Organization

**Order:**
1. External Vue/framework imports (`vue`, `@storybook/vue3`)
2. Component imports (local components from paths)
3. Composable/utility imports (from `#composables`, `#utils`, relative paths)
4. Style imports (if present)

**Path Aliases:**
- `@/*`: Maps to `src/*` - general imports
- `#composables`: Maps to `src/composables` - for composable functions
- `#utils/*`: Maps to `src/utils/*.ts` - for utility functions
- `#components/*`: Maps to `src/components/*/*.vue` - for component imports (though components use relative paths in practice)
- `vue`: Explicitly aliased to `vue/dist/vue.esm-bundler.js` for SSR compatibility

**Example from `src/components/Dropdown/Dropdown.vue`:**
```typescript
import { computed, onBeforeMount, ref, useSlots } from "vue";
import { useOptionalModel } from "#composables";
import { type Option as OptionType } from "#utils/types/DropOption";
import ExpandableContainer from "../../utils/components/ExpandableContainer.vue";
```

## Error Handling

**Patterns:**
- Defensive checks with `isObject()`, `isNilAndBlank()`, `isNilAndEmpty()` utility functions
- Optional chaining implicit in template null-safety
- Type guards using `isObject(value)` before accessing object properties
- No explicit try-catch blocks visible; validation happens at prop level with defaults
- Fallback values provided via `withDefaults()` in every component

**Example from `src/components/RadioGroup/RadioGroup.vue`:**
```typescript
function getDisabled(option: any): boolean {
  return isObject(option) ? option.disabled : false;
}
```

## Logging

**Framework:** `console` (no structured logging library detected)

**Patterns:**
- No logging calls found in component code; logging appears unused in the codebase
- Storybook decorators use standard JS for DOM manipulation (no logging)
- Design system components don't expose internal logging

## Comments

**When to Comment:**
- Composable functions include JSDoc comments explaining usage and requirements
- Example from `src/composables/OptionalModel.ts`:
```typescript
/** Make sure to set the prop default to undefined manually.
 * Ex.: const props = withDefaults(defineProps<{ modelValue?: string }>(), { modelValue: undefined });
 */
```
- Complex utility functions like `blendColors()` lack comments but are self-documenting
- Vue components use no inline comments; logic flow is clear from prop/event names

**TSDoc/JSDoc:**
- Used selectively for composables and exported utility functions
- Not enforced across the codebase

## Function Design

**Size:**
- Utility functions range from 1-50 lines; most are 10-30 lines
- Component functions stay compact (5-15 lines)
- Complex logic (e.g., date calculations) extracted into utility functions in `src/utils/index.ts`

**Parameters:**
- Props passed as destructured objects with defaults via `withDefaults()`
- Composables accept `props`, `propKey`, `emit`, and `defaultValue` as parameters
- Utility functions accept simple typed parameters: `(value: string)`, `(options: T[], searchValue: string)`

**Return Values:**
- Composables return tuples: `[WritableComputedRef<T>, (value: T, extra?: any) => void]`
- Utility functions return primitives or objects: `Date[]`, `any` (color objects)
- Vue 3 setup functions don't explicitly return; use template binding instead
- Event handlers return nothing (void) or trigger emit

**Example from `src/composables/OptionalModel.ts`:**
```typescript
export function useOptionalModel<T>(
props: any, propKey: string, emit: any, defaultValue: T,
): [WritableComputedRef<T>, (value: T, extra?: any) => void] {
    // ... implementation
    return [model, set];
}
```

## Module Design

**Exports:**
- Components exported via plugin pattern in `index.ts`:
```typescript
export default {
  install(Vue: App) {
    Vue.component("RadioGroup", RadioGroup);
  },
} as Plugin;

export { RadioGroup };
```
- Main entry point `src/index.ts` re-exports all components and composables
- Utilities exported as named functions from `src/utils/index.ts`
- Types exported with `type` keyword from `src/utils/types/*.ts`

**Barrel Files:**
- `src/components/index.ts` - exports all 66 components
- `src/composables/index.ts` - exports all composables
- `src/utils/index.ts` - exports 30+ utility functions
- Each component directory has `index.ts` with plugin install + component export

**Example barrel pattern from `src/components/RadioGroup/index.ts`:**
```typescript
import type { App, Plugin } from "vue";
import RadioGroup from "./RadioGroup.vue";

export default {
  install(Vue: App) {
    Vue.component("RadioGroup", RadioGroup);
  },
} as Plugin;

export { RadioGroup };
```

---

*Convention analysis: 2026-03-13*
