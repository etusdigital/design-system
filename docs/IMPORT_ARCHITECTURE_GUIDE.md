# Import Architecture Guide - Optimal Strategy

## 🎯 Current vs Ideal Import Strategy

### Current Package.json Configuration

```json
"imports": {
  "#composables": "./src/composables/index.ts",
  "#composables/*": "./src/composables/*.ts", 
  "#components/*": "./src/components/*/*.vue",
  "#utils/*": "./src/utils/*.ts",
  "#modules/*": "./src/modules/*/index.ts"
}
```

## 🚀 **OPTIMAL Import Strategy for All Use Cases**

### 1. **Components** (Most Efficient)

```typescript
// ✅ BEST: Modular imports (tree-shakable)
import { Alert, Toast } from "#modules/feedback";
import { Icon, Button } from "#modules/core";
import { Input, Select } from "#modules/forms";

// ✅ GOOD: Backward compatibility  
import { BAlert } from "#components/BAlert";

// ❌ AVOID: Direct .vue imports
import BAlert from "#components/BAlert/BAlert.vue";
```

### 2. **Utils** (Multiple Strategies)

```typescript
// ✅ BEST: Named imports (tree-shakable)
import { calculateDate, hexaToRgba } from "#utils/index";

// ✅ GOOD: Specific utility files
import { calculateDate } from "#utils/date";
import { hexaToRgba } from "#utils/color";

// ✅ GOOD: Event utilities
import event from "#utils/event";
```

### 3. **Composables** (Optimized)

```typescript
// ✅ BEST: Named imports from index
import { useCard, useClickOutside } from "#composables";

// ✅ GOOD: Direct imports
import { useCard } from "#composables/useCard";
```

## 📁 **Recommended Directory Structure**

```
src/
├── modules/                    # UI Components (modular)
│   ├── core/                  # Basic components
│   │   ├── Icon/
│   │   ├── Button/ 
│   │   └── index.ts           # export { Icon, Button }
│   ├── feedback/              # User feedback
│   │   ├── Alert/
│   │   ├── Toast/
│   │   └── index.ts           # export { Alert, Toast }
│   └── forms/                 # Form components
│       ├── Input/
│       ├── Select/
│       └── index.ts           # export { Input, Select }
├── utils/                     # Pure functions
│   ├── index.ts              # Re-export everything
│   ├── date.ts               # Date utilities
│   ├── color.ts              # Color utilities
│   ├── validation.ts         # Validation utilities
│   └── event.ts              # Event system
├── composables/              # Vue composables  
│   ├── index.ts              # Re-export everything
│   ├── useCard.ts
│   └── useClickOutside.ts
└── components/               # Legacy (compatibility)
    ├── BAlert/index.ts       # Re-export from modules
    └── BToast/index.ts       # Re-export from modules
```

## 🎯 **Enhanced Package.json Configuration**

```json
{
  "imports": {
    "#composables": "./src/composables/index.ts",
    "#composables/*": "./src/composables/*.ts",
    "#components/*": "./src/components/*/index.ts",
    "#utils": "./src/utils/index.ts", 
    "#utils/*": "./src/utils/*.ts",
    "#modules/*": "./src/modules/*/index.ts"
  },
  "exports": {
    "./core": {
      "types": "./lib/src/modules/core/index.d.ts",
      "import": "./lib/core.es.js",
      "require": "./lib/core.cjs.js"
    },
    "./feedback": {
      "types": "./lib/src/modules/feedback/index.d.ts", 
      "import": "./lib/feedback.es.js",
      "require": "./lib/feedback.cjs.js"
    },
    "./forms": {
      "types": "./lib/src/modules/forms/index.d.ts",
      "import": "./lib/forms.es.js", 
      "require": "./lib/forms.cjs.js"
    },
    "./utils": {
      "types": "./lib/src/utils/index.d.ts",
      "import": "./lib/utils.es.js",
      "require": "./lib/utils.cjs.js"
    }
  }
}
```

## 💡 **Best Practices by File Type**

### Utils Organization

```typescript
// src/utils/index.ts
export * from './date';
export * from './color';
export * from './validation';
export { default as event } from './event';

// Usage (tree-shakable)
import { calculateDate, hexaToRgba, isValidEmail } from "#utils";
```

### Component Organization

```typescript
// src/modules/forms/index.ts  
export { Input } from './Input';
export { Select } from './Select';
export { Checkbox } from './Checkbox';

// Usage (tree-shakable)
import { Input, Select } from "#modules/forms";
```

### Type Definitions

```typescript
// src/utils/types.ts
export type DateRange = [Date, Date];
export type ColorFormat = 'hex' | 'rgb' | 'hsl';

// Usage
import type { DateRange, ColorFormat } from "#utils/types";
```

## 🚨 **Import Priority Rules**

### Priority Order (Most → Least Efficient)

1. **Named imports from modules** - `import { Alert } from "#modules/feedback"`
2. **Named imports from utils** - `import { calculateDate } from "#utils"`
3. **Index imports** - `import { useCard } from "#composables"`
4. **Backward compatibility** - `import { BAlert } from "#components/BAlert"`
5. **Direct file imports** - `import event from "#utils/event"`

## 🔧 **Migration Strategy**

### Phase 1: Utils Reorganization
```bash
# Organize utils by category
src/utils/
├── date.ts      # Date functions
├── color.ts     # Color functions  
├── validation.ts # Validation functions
└── index.ts     # Re-export all
```

### Phase 2: Enhanced Imports
```json
// Add to package.json
"#utils": "./src/utils/index.ts"
```

### Phase 3: Gradual Migration
```typescript
// Old way
import { calculateDate } from "#utils/index";

// New way  
import { calculateDate } from "#utils";
```

## 📊 **Benefits of This Architecture**

1. **Tree Shaking** - Only import what you use
2. **Type Safety** - Full TypeScript support
3. **Developer Experience** - Clean imports
4. **Bundle Size** - Smaller production bundles
5. **Maintenance** - Easy to refactor and organize
6. **Backward Compatibility** - Legacy imports still work

## ⚠️ **What NOT to do**

```typescript
// ❌ DON'T: Import entire modules
import * as utils from "#utils";

// ❌ DON'T: Deep component imports  
import Icon from "#modules/core/Icon/Icon.vue";

// ❌ DON'T: Mix import styles
import { Alert } from "#modules/feedback";
import BToast from "#components/BToast/BToast.vue";
```

---

**Key Takeaway**: Use modular imports (`#modules/*`) for components and named imports (`#utils`) for utilities to maximize tree-shaking and maintainability.