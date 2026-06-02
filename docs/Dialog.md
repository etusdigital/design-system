# Name: Dialog
## Component Overview

**Purpose**: A modal dialog React component with overlay and customizable dimensions for displaying content that requires user attention or interaction.

**Import**: Automatic - no need to import any DS components

### Basic Usage

```tsx
const [showDialog, setShowDialog] = useState(false);

<div>
    <button onClick={() => setShowDialog(true)}>
        Show Dialog
    </button>

    <Dialog value={showDialog} onChange={setShowDialog}>
        <div className="flex flex-col p-xl gap-sm">
            <h2 className="font-bold text-lg">Dialog</h2>
            <p className="text-sm text-neutral-foreground-low">
                Lorem ipsum dolor sit amet consectetur. Ultricies urna mattis purus maecenas
                amet hac viverra id feugiat. Et dui maecenas at dui. Sagittis phasellus a
                massa praesent ultricies.
            </p>
            <div className="flex justify-end w-full gap-xs">
                <button variant="plain" onClick={() => setShowDialog(false)}>
                    Cancel
                </button>
                <button onClick={() => setShowDialog(false)}>
                    Save
                </button>
            </div>
        </div>
    </Dialog>
</div>
```

---

### Props API

#### value / onChange
Controls the dialog visibility state. Type: `boolean` (default: `false`)

#### width
Sets the dialog width. Type: `string` (default: `"fit-content"`)

#### height
Sets the dialog height. Type: `string` (default: `"fit-content"`)

#### noOutsideClose
Prevents closing the dialog when clicking outside. When enabled, clicking outside triggers a warning bounce animation to indicate the dialog cannot be closed. Type: `boolean` (default: `false`)

---

### Events API

#### onChange
Triggered when the dialog visibility state changes.

### Children API

#### children
The main content area of the dialog.

```tsx
const [isOpen, setIsOpen] = useState(false);

<Dialog value={isOpen} onChange={setIsOpen}>
    children: default
</Dialog>
```

**Important Notes:**
- Uses portal to render in document body for proper z-index stacking
- Includes smooth bounce animations for open/close transitions
- Supports click-outside-to-close behavior (can be disabled with `noOutsideClose`)
- When `noOutsideClose` is enabled, shows a warning bounce animation on outside clicks
- Automatically centers content and handles responsive sizing
- Built-in overlay component for consistent backdrop behavior
- Maximum dimensions constrained to viewport with padding for mobile compatibility