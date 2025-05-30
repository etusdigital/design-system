# Component Dependencies Analysis

## Components with Direct Dependencies on Other B* Components

### 1. **BAlert**
   - Imports: `BIcon`
   - Used for: Displaying icon within alert messages

### 2. **BButton**
   - Imports: `BSpinner`
   - Used for: Loading state indicator

### 3. **BConfirm**
   - Imports: `BButton`, `BDialog`
   - Used for: Confirmation dialog with action buttons

### 4. **BInput**
   - Imports: `BIcon`
   - Used for: Input field icons and decorations

### 5. **BToast**
   - Imports: `BAlert`, `BIcon`
   - Used for: Toast notifications with alert styling and icons

### 6. **BRadio**
   - Imports: Type from `BGroup`
   - Used for: Group state management

### 7. **BRadioButton**
   - Imports: Type from `BGroup`
   - Used for: Group state management

### 8. **BDropdown**
   - Imports: Internal components `Item.vue`, `Items.vue`
   - Used for: Dropdown item rendering

### 9. **BSideMenu**
   - Imports: Internal component `Item.vue`
   - Used for: Menu item rendering

## Components Using Utility Components

Many components depend on shared utility components from `utils/components/`:

### Components using `Container.vue`:
- BExpandableContainer
- BFilter

### Components using `SelectContent.vue`:
- BFilter
- BMultiSelect
- BSelect
- BTagSelect

### Components using `Option.vue`:
- BFilter
- BMultiSelect
- BSelect
- BTagSelect

### Components using `Label.vue`:
- BInput
- BTagInput

### Components using `Calendar.vue`:
- BDate
- BDateComparator

### Components using `Overlay.vue`:
- BDialog
- BSidebar

### Components using `MenuOption.vue`:
- BMenu
- BSideMenu/Item.vue

### Components using `Slider.vue`:
- BSlider
- BRangeSlider

### Components using `DateDialog.vue`:
- BDateFilter
- BDateComparatorFilter

## Circular Dependencies

No circular dependencies were detected between B* components. The dependency graph is acyclic.

## Most Depended Upon Components

1. **BIcon** - Used by BAlert, BInput, BToast
2. **BButton** - Used by BConfirm
3. **BDialog** - Used by BConfirm
4. **BAlert** - Used by BToast
5. **BSpinner** - Used by BButton
6. **BGroup** (type imports) - Used by BRadio, BRadioButton

## Components with No Dependencies on Other B* Components

Most components (approximately 36 out of 50+) have no direct dependencies on other B* components, making them highly reusable and independent.

## Shared Composables

Many components use shared composables:
- `useOptionalModel` - Used by most input components
- `useClickOutside` - Used by components with dropdowns/modals
- `useCard` - Used by card-related components

## Potential Areas of Concern

1. **BToast depends on BAlert** - This creates a two-level dependency chain (BToast → BAlert → BIcon)
2. **BConfirm depends on both BButton and BDialog** - This is the component with the most B* dependencies
3. **Utility components are widely used** - Changes to utility components like `Container.vue`, `SelectContent.vue`, or `Option.vue` could impact many components

## Recommendations

1. The dependency structure is generally clean with no circular dependencies
2. Most components are independent, which is good for maintainability
3. Consider documenting the utility components well as they are critical shared dependencies
4. The BToast → BAlert → BIcon chain could potentially be simplified if needed