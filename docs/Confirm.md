# Name: confirm
## Function Overview

**Purpose**: A programmatic confirmation dialog function that displays modal dialogs for user confirmation, returning a promise that resolves based on user interaction for critical action validation.

**Usage**: Hook-based API - access via `useConfirm` hook

**Import**: `import { useConfirm } from 'your-design-system'`

<br />
### Basic Usage

```tsx
const { confirm } = useConfirm();

const handleDelete = async () => {
    const result = await confirm({
        title: 'Confirm Action',
        message: 'Are you sure you want to proceed?',
        acceptLabel: 'Confirm',
        cancelLabel: 'Cancel'
    });

    if (result) {
        console.log('Item deleted');
    }
};

<button onClick={handleDelete}>Delete Item</button>
```

---

### Function API

#### confirm(options)
Displays a confirmation dialog and returns a promise that resolves to a boolean.

**Parameters**: `ConfirmOptions` (required)

```typescript
type ConfirmOptions = {
  title?: string;      // Dialog title text
  message: string;     // Main confirmation message
  acceptLabel: string;  // Accept button label
  cancelLabel: string;  // Cancel button label
}
```

**Returns**: `Promise<boolean>`
- `true` when user clicks accept button
- `false` when user clicks cancel button or closes dialog

#### Access Methods

**Hook API (Recommended)**
```tsx

const { confirm } = useConfirm();
```

---

### Usage Patterns

#### Async/Await Pattern
```tsx
const handleCriticalAction = async () => {
    const confirmed = await confirm({
        title: 'Critical Action',
        message: 'This will permanently delete all data. Continue?',
        acceptLabel: 'Yes, Delete All',
        cancelLabel: 'Cancel'
    });

    if (confirmed) {
        await performCriticalAction();
    }
};
```

#### Promise Chain Pattern
```tsx
const handleAction = () => {
    confirm({
        message: 'Save changes before leaving?',
        acceptLabel: 'Save',
        cancelLabel: 'Discard'
    }).then((result) => {
        if (result) {
            saveChanges();
        }
        navigateAway();
    });
};
```

### Setup Requirements

#### Provider Registration
The `DesignSystemProvider` (which includes `ConfirmProvider`) must be included **only once** at your application root:

```tsx
// App.tsx

function App() {
    return (
        <DesignSystemProvider>
            {/* Your app content */}
        </DesignSystemProvider>
    );
}
```

**Important**: Do not nest `DesignSystemProvider`. It should only be present once in your entire application.

---

### Event System

The confirm dialog uses an internal context to communicate between the hook call and the dialog component:

- **Hook Call** → Triggers dialog open via context
- **User Action** → Resolves the returned Promise
- **Promise Resolution** → Based on user choice

**Important Notes:**
- Returns `Promise<boolean>` for easy async/await usage
- Modal dialog prevents outside clicks when active
- Only one confirmation dialog can be active at a time
- Requires `DesignSystemProvider` (or `ConfirmProvider`) wrapping your application root
- Uses React context for clean API access
- Handles both accept and cancel scenarios gracefully
- No direct component props — all configuration through function parameters