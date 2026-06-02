# Name: Pagination
## Component Overview

**Purpose**: A pagination component with intelligent page display logic, navigation controls, and responsive ellipsis handling for large page sets.

**Import**: Automatic - no need to import any DS components

### Basic Usage

```tsx

const [currentPage, setCurrentPage] = useState(1)
const totalPages = 10

<Pagination
    value={currentPage}
    onChange={setCurrentPage}
    length={totalPages}
/>
```

---

### Props API

#### value
Controls the current active page number. Type: `number` (default: `1`)

#### onChange
Callback fired when the current page changes. Type: `(page: number) => void`

#### length
Total number of pages available for navigation. Type: `number` (default: `1`)

---

### Events API

#### onChange
Triggered when the current page changes. Receives the new page number and additional context.

### Children API

This component uses internal logic for page display and doesn't accept custom children.

**Important Notes:**
- Automatically handles ellipsis (...) for large page sets with intelligent positioning
- Navigation arrows are disabled at first/last pages to prevent invalid navigation
- Smart page display algorithm shows relevant pages around current selection
- Always displays first and last pages for quick navigation
- Hover effects and visual feedback for better user experience
- Responsive design adapts to different page ranges automatically
- Optimized rendering prevents unnecessary DOM updates for performance