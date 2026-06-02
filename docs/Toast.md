# Name: toast
## Function Overview

**Purpose**: A programmatic toast notification function that displays temporary messages with various types, positioning options, and action buttons for user feedback and status updates.

**Usage**: Hook-based API - access via `useToast()` hook

**Import**: `import { useToast } from '@etus/design-system'`

<br />
### Basic Usage

```tsx

function MyComponent() {
    const { toast } = useToast()

    const showToast = () => {
        toast({
            title: 'Success',
            message: 'Your changes have been saved successfully!',
            type: 'success',
            top: true,
            right: true,
            timeout: 3500
        })
    }

    return <button onClick={showToast}>Show Toast</button>
}
```

---

### Function API

#### toast(options)
Displays a toast notification with the specified configuration.

**Parameters**: `ToastOptions` (required)

```typescript
type ToastOptions = {
  title?: string;          // Toast title text
  message: string;         // Main toast message
  type?: 'info' | 'success' | 'warning' | 'danger' | 'neutral'; // Toast type (default: 'danger')
  top?: boolean;           // Position at top of screen
  bottom?: boolean;        // Position at bottom of screen
  right?: boolean;         // Position at right of screen
  left?: boolean;          // Position at left of screen
  timeout?: number;        // Auto-dismiss time in milliseconds
  buttonLabel?: string;    // Action button text
  action?: () => void;     // Function executed when button is clicked
}
```

**Returns**: `void` (fire-and-forget function)

---

### Usage Patterns

#### Action Button
```tsx
const { toast } = useToast()

const showLowStorageWarning = () => {
    toast({
        title: 'Storage Warning',
        message: 'You are running low on storage space.',
        type: 'warning',
        bottom: true,
        left: true,
        buttonLabel: 'Manage Storage',
        action: () => {
            navigateToStorageSettings()
        },
        timeout: 5000
    })
}
```

#### Positioning Examples
```tsx
const { toast } = useToast()

toast({ message: 'Success!', type: 'success', top: true, right: true })
toast({ message: 'Success!', type: 'success', top: true, left: true })
toast({ message: 'Success!', type: 'success', bottom: true, left: true })
toast({ message: 'Success!', type: 'success', bottom: true, right: true })
```

---

### Setup Requirements

#### Provider Setup
Wrap your application with `DesignSystemProvider` which includes toast support:

```tsx

function App() {
    return (
        <DesignSystemProvider>
            {/* Your app content */}
        </DesignSystemProvider>
    )
}
```

---

### Event System

The toast system uses an internal event system to communicate between the hook call and the toast component:

- **Hook Call** → Triggers `open-toast` event
- **Auto-dismiss/Manual Close** → Triggers `close-toast` event
- **Action Button Click** → Executes provided action function

**Important Notes:**
- Multiple toasts can be displayed simultaneously in different positions
- Toasts auto-dismiss based on timeout (if specified)
- Position constraints: use only one vertical (top/bottom) and one horizontal (left/right) position
- Requires `DesignSystemProvider` wrapping your application
- Use `useToast()` hook for clean API access anywhere in the component tree
- Fire-and-forget function - no return value needed
- Responsive design automatically adjusts toast width on mobile devices