# Name: ActionCard
## Component Overview

**Purpose**: An interactive card component with drag-and-drop functionality, customizable header styling, and integrated delete actions for creating dynamic content management interfaces.

**Import**: Automatic - no need to import any DS components

### Basic Usage

```tsx
const handleDelete = () => {};
const handleDragStart = (event) => {};
const handleDragEnd = (event) => {};

<ActionCard
    icon="send"
    onDelete={handleDelete}
    onDragstart={handleDragStart}
    onDragend={handleDragEnd}
>
    Label
</ActionCard>
```

---

### Props API

#### icon
Icon displayed in the card header. Type: `string` (default: `""`)

#### color
Background color for the card header. Type: `string` (default: `""`)

#### hideDrag
Hides the drag handle icon when enabled. Type: `boolean` (default: `false`)

---

### Events API

#### onDragstart
Triggered when the user starts dragging the drag handle. Receives the drag event.

#### onDragging
Triggered continuously while the user is dragging. Receives the current drag event.

#### onDragend
Triggered when the user stops dragging. Receives the final drag event.

#### onDelete
Triggered when the delete icon is clicked.

### Children API

#### children
Content displayed as the card title in the header section.

```tsx
<ActionCard icon="settings">
    Slot: default
</ActionCard>
```

#### card (via children composition)
Main content area of the card, displayed below the header.

```tsx
<ActionCard icon="mail">
    <div className="flex justify-between items-center text-neutral-foreground-negative w-full">
        <div className="flex flex-col text-sm">
            <p>Send Message:</p>
            <p className="font-bold">cartaofeito-d-fluxo-cc-dia-05-e12</p>
        </div>
        <icon className="cursor-pointer" name="visibility" />
    </div>
</ActionCard>
```

**Important Notes:**
- Touch and mouse event support for drag operations on both desktop and mobile devices
- Automatic cursor state management (grab/grabbing) during drag interactions
- Hover effects with scale transformation and icon color changes for better user feedback
- Event cleanup on component unmount prevents memory leaks from global event listeners
- Flexible header styling with custom color support and icon integration
- Card structure built on Card component for consistent design system integration
- Delete functionality with clear visual indicator and click handling
- Responsive design adapts to different screen sizes and touch interfaces