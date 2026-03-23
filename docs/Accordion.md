# Name: Accordion
## Component Overview

**Purpose**: A collapsible content component with smooth animations and customizable header sections for organizing content in expandable panels.

**Import**: Automatic - no need to import any DS components

### Basic Usage

```tsx
const [isOpen, setIsOpen] = useState(false);

<Accordion value={isOpen} onChange={setIsOpen} header={<h4 className="text-neutral-foreground-high">Accordion component</h4>}>
    <div className="flex items-end justify-start gap-base">
        <p>
            Lorem ipsum dolor sit amet consectetur. Ultricies urna mattis purus maecenas
            amet hac viverra id feugiat. Et dui maecenas at dui. Sagittis phasellus a
            massa praesent ultricies.
        </p>
    </div>
</Accordion>
```

---

### Props API

#### value / onChange
Controls the accordion state (open/closed). Type: `boolean` (default: `false`)

#### duration
Controls the animation duration in milliseconds. Type: `number` (default: `150`, min: `150`, max: `1000`)

#### noShadow
Removes the card shadow and border. Type: `boolean` (default: `false`)

---

### Events API

#### onChange
Triggered when the accordion state changes.

### Children / Props API

#### children
The collapsible content that appears when the component is expanded.

```tsx
const [isOpen, setIsOpen] = useState(false);

<Accordion value={isOpen} onChange={setIsOpen} header="Form Section">
    Slot: default
</Accordion>
```

#### header
Content displayed in the accordion header section, next to the expand/accordion icon. Accepts a React node.

```tsx
const [isOpen, setIsOpen] = useState(false);

<Accordion value={isOpen} onChange={setIsOpen} header={<span>Header</span>}>
    <p>Settings content goes here.</p>
</Accordion>
```

**Important Notes:**
- The component automatically handles smooth height transitions during expand/accordion
- Duration is automatically clamped between 150ms and 1000ms for optimal UX
- Uses ResizeObserver to handle dynamic content height changes