# Module Import Rules - NEVER FORGET! 🚨

## Critical Rules to Prevent Import Errors

### ❌ NEVER do this:
```typescript
// DON'T: Import specific .vue files from modules
import Icon from "#modules/core/Icon/Icon.vue";

// DON'T: Create module imports without configuring them first
import { SomeComponent } from "#modules/newmodule";
```

### ✅ ALWAYS do this:
```typescript
// DO: Import from module index exports
import { Icon } from "#modules/core";
import { Alert, Toast } from "#modules/feedback";
```

## Configuration Checklist for New Modules

When creating a new module (e.g., `src/modules/newmodule/`):

### 1. package.json Configuration
```json
{
  "imports": {
    "#modules/*": "./src/modules/*/index.ts"
  },
  "exports": {
    "./newmodule": {
      "types": "./lib/src/modules/newmodule/index.d.ts",
      "import": "./lib/src/modules/newmodule/index.js",
      "require": "./lib/src/modules/newmodule/index.cjs"
    }
  }
}
```

### 2. vite.config.ts Configuration
```typescript
{
  lib: {
    entry: {
      main: path.resolve(__dirname, "src/index.ts"),
      core: path.resolve(__dirname, "src/modules/core/index.ts"),
      newmodule: path.resolve(__dirname, "src/modules/newmodule/index.ts"),
    }
  },
  rollupOptions: {
    input: {
      main: path.resolve(__dirname, "src/index.ts"),
      core: path.resolve(__dirname, "src/modules/core/index.ts"),
      newmodule: path.resolve(__dirname, "src/modules/newmodule/index.ts"),
    }
  }
}
```

### 3. Module Structure
```
src/modules/newmodule/
├── index.ts          // ← MUST exist and export components
├── Component1/
│   ├── Component1.vue
│   ├── Component1.stories.ts
│   └── index.ts      // ← Export Component1
└── Component2/
    ├── Component2.vue
    ├── Component2.stories.ts
    └── index.ts      // ← Export Component2
```

### 4. Module index.ts Example
```typescript
// src/modules/newmodule/index.ts
export { Component1 } from './Component1';
export { Component2 } from './Component2';
```

## Error Prevention Workflow

### Before Creating Module Imports:
1. ✅ Check if path alias exists in package.json `imports`
2. ✅ Check if module is configured in vite.config.ts
3. ✅ Check if module has proper export in package.json `exports`
4. ✅ Check if module index.ts exports the components
5. ✅ Test with `npm run type-check`

### Debugging Import Errors:
1. 🔍 Error: "Missing '#modules/xyz' specifier"
   - **Fix**: Add path alias to package.json imports
   
2. 🔍 Error: Module not found during build
   - **Fix**: Add entry to vite.config.ts lib.entry and rollupOptions.input
   
3. 🔍 Error: Component not exported
   - **Fix**: Check module's index.ts exports

## Memory Aid: The 4-Step Rule

**Remember: P.V.E.T - Package, Vite, Export, Test**

1. **P**ackage.json - Add imports and exports
2. **V**ite.config.ts - Add build entries  
3. **E**xport - Create module index.ts with exports
4. **T**est - Run npm run type-check

## Examples of Correct Usage

```typescript
// ✅ Correct: Import from feedback module
import { Alert, Toast } from "#modules/feedback";

// ✅ Correct: Import from core module  
import { Icon, Button, Spinner } from "#modules/core";

// ✅ Correct: Import from forms module (when created)
import { Input, Select, Checkbox } from "#modules/forms";
```

---

**🚨 CRITICAL**: Never create `#modules/*` imports without following the P.V.E.T checklist!