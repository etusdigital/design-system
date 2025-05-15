# Design System Documentation

## Overview

Vue 3 component library built with TypeScript and Vite, published to GCP npm registry.

## Tech Stack

- Vue 3.4+
- TypeScript 5.3+
- Vite 5.x
- Storybook 8.x
- Tailwind CSS
- Node.js 20.11.1

## Project Structure

```
├── src/
│   ├── components/     # Vue components
│   ├── composables/    # Vue composables
│   ├── types/         # TypeScript types
│   ├── utils/         # Utility functions
│   └── index.ts       # Main entry point
├── stories/          # Storybook stories
├── lib/             # Build output
└── vite.config.ts   # Build config
```

## Components

The library exports these core components:

### Layout

- `BExpandableContainer` - Collapsible container
- `BContentScreen` - Screen layout wrapper
- `BDivider` - Visual separator

### Forms & Input

- `BColorPicker` - Color selection
- `BDatePicker` - Date selection
- `BSmartSelect` - Enhanced select dropdown
- `BTagInput` - Tag input field
- `BTagSelect` - Tag selection
- `BSlider` - Single value slider
- `BRangeSlider` - Range slider

### Data Display

- `BProgressBar` - Progress indicator
- `BMetricCard` - Metrics display
- `BCardIcon` - Icon card
- `BActionCard` - Interactive card
- `BHistoric` - History display
- `BPagination` - Page navigation

### Interactive

- `BTooltip` - Hover tooltips
- `BCollapse` - Collapsible content
- `BRoundMenu` - Circular menu
- `BConfirm` - Confirmation dialogs
- `BToast` - Toast notifications
- `BCrop` - Image cropping

### Filters

- `BDateComparator` - Date comparison
- `BDateComparatorFilter` - Date range filtering
- `BStepOption` - Step selection

## Setup

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Build library:

```bash
npm run build
```

4. Run Storybook:

```bash
npm run storybook
```

## Development

### Adding New Components

1. Create component in `src/components`
2. Add types in `src/types`
3. Export from `src/components/index.ts`
4. Add Storybook story
5. Update tests

### Type Checking

```bash
npm run type-check
```

### Building

The library builds to multiple formats:

- ES Modules: `.mjs`
- CommonJS: `.cjs`

Output directory: `lib/`

## Publishing

1. Bump version:

```bash
npm version <patch|minor|major>
```

2. Build:

```bash
npm run build
```

3. Publish to GCP registry:

```bash
npm publish
```

## Usage

```typescript
import { BButton, BCard } from "@your-org/design-system";
```

## Best Practices

1. All components should:

   - Be typed with TypeScript
   - Include Storybook documentation
   - Follow naming convention `B<ComponentName>`
   - Use composables for complex logic
   - Include unit tests

2. Props should:

   - Have type definitions
   - Include default values
   - Use consistent naming

3. Events should:
   - Follow Vue 3 conventions
   - Be properly typed
   - Use consistent naming

## Contributing

1. Branch naming:

   - feature/
   - fix/
   - chore/

2. Commit messages:

   - feat:
   - fix:
   - chore:
   - docs:

3. PR process:
   - Update tests
   - Run type checks
   - Update documentation
   - Add Storybook story if needed
