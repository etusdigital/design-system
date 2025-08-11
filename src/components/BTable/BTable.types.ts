/**
 * BTable accessibility props interface
 * Implements WCAG 2.1 AA standards for table components
 */
export interface BTableAccessibilityProps {
  /** ARIA label for the table */
  ariaLabel?: string;
  /** Table caption for screen readers */
  caption?: string;
  /** Additional description for screen readers */
  ariaDescription?: string;
  /** Accessible label for loading state */
  loadingLabel?: string;
  /** Whether to announce sort changes */
  announceSortChanges?: boolean;
  /** Whether to announce selection changes */
  announceSelectionChanges?: boolean;
  /** Whether to announce pagination changes */
  announcePaginationChanges?: boolean;
  /** Whether to announce cell focus changes */
  announceCellFocus?: boolean;
  /** Custom announcement delay in milliseconds */
  announcementDelay?: number;
  /** High contrast mode support */
  highContrast?: boolean;
  /** Reduced motion support */
  reduceMotion?: boolean;
  /** Whether to use enhanced focus management */
  enhancedFocus?: boolean;
  /** Screen reader instructions for interaction */
  screenReaderInstructions?: string;
  /** Live region politeness level for announcements */
  liveRegionPoliteness?: 'polite' | 'assertive';
  /** Whether table supports keyboard navigation */
  keyboardNavigation?: boolean;
  /** Whether to show focus indicators */
  showFocusIndicator?: boolean;
  /** Whether to support row expansion */
  supportExpansion?: boolean;
  /** Whether to announce row expansion changes */
  announceExpansion?: boolean;
  /** Whether to support column reordering */
  supportColumnReordering?: boolean;
  /** Whether to announce column reordering */
  announceColumnReordering?: boolean;
  /** Custom context description for complex tables */
  contextDescription?: string;
  /** Whether to use sticky headers for accessibility */
  useStickyHeaders?: boolean;
  /** Whether to provide cell editing instructions */
  provideCellEditingInstructions?: boolean;
}

/**
 * Table header interface
 */
export interface BTableHeader {
  /** Display label for the header */
  label?: string;
  /** Key to access the value in the data object */
  value: string;
  /** Whether this column is sortable */
  sortable?: boolean;
  /** Width of the column */
  width?: string;
  /** Alignment of the column content */
  align?: 'left' | 'center' | 'right';
  /** ARIA label for the column */
  ariaLabel?: string;
  /** Description for screen readers */
  ariaDescription?: string;
  /** Whether this is a numeric column (for sorting announcements) */
  numeric?: boolean;
  /** Whether column is resizable */
  resizable?: boolean;
  /** Whether column is hideable */
  hideable?: boolean;
  /** Custom cell renderer function */
  cellRenderer?: (value: any, item: any, index: number) => any;
  /** Custom header renderer function */
  headerRenderer?: (header: BTableHeader) => any;
  /** Whether column supports filtering */
  filterable?: boolean;
  /** Custom sort function */
  customSort?: (a: any, b: any) => number;
  /** Data type for accessibility announcements */
  dataType?: 'text' | 'number' | 'date' | 'boolean' | 'currency' | 'percentage';
  /** Whether column is required for accessibility */
  required?: boolean;
  /** Minimum width for responsive design */
  minWidth?: string;
  /** Maximum width for responsive design */
  maxWidth?: string;
}

/**
 * Table item interface with optional selection and expansion state
 */
export interface BTableItem extends Record<string, unknown> {
  /** Unique identifier for the row */
  id?: string | number;
  /** Whether the item is selected (when selection is enabled) */
  selected?: boolean;
  /** Whether the item is expanded (for nested rows) */
  expanded?: boolean;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Custom ARIA label for the row */
  ariaLabel?: string;
  /** Additional description for screen readers */
  ariaDescription?: string;
  /** Row level (for hierarchical data) */
  level?: number;
  /** Parent row ID (for hierarchical data) */
  parentId?: string | number;
  /** Whether row has children */
  hasChildren?: boolean;
  /** Loading state for async row expansion */
  loading?: boolean;
  /** Custom CSS classes for the row */
  customClass?: string;
  /** Additional data for the row */
  metadata?: Record<string, unknown>;
}

/**
 * Table configuration options
 */
export interface BTableOptions {
  /** Initial sort column */
  sortBy?: string;
  /** Initial sort direction (true = descending) */
  sortDesc?: boolean;
  /** Multiple column sorting support */
  multiSort?: boolean;
  /** Default items per page */
  itemsPerPage?: number;
  /** Available page size options */
  pageSizeOptions?: number[];
  /** Whether to show all items option */
  showAllOption?: boolean;
  /** Custom sort comparator */
  customSort?: (a: any, b: any, sortBy: string, sortDesc: boolean) => number;
}

/**
 * Table sort state
 */
export interface BTableSortState {
  /** Column being sorted */
  column: string;
  /** Sort direction (true = ascending, false = descending) */
  ascending: boolean;
  /** Sort priority (for multi-column sorting) */
  priority: number;
}

/**
 * Table selection state
 */
export interface BTableSelectionState {
  /** Currently selected item IDs */
  selectedIds: Set<string | number>;
  /** Whether all items are selected */
  allSelected: boolean;
  /** Whether selection is indeterminate */
  indeterminate: boolean;
  /** Number of selected items */
  selectedCount: number;
  /** Total number of selectable items */
  totalCount: number;
}

/**
 * Table pagination state
 */
export interface BTablePaginationState {
  /** Current page number (1-based) */
  page: number;
  /** Items per page */
  itemsPerPage: number;
  /** Total number of items */
  totalItems: number;
  /** Total number of pages */
  totalPages: number;
  /** Start index of current page */
  startIndex: number;
  /** End index of current page */
  endIndex: number;
}

/**
 * Table state interface for accessibility
 */
export interface BTableState {
  /** Current sort states */
  sortStates: BTableSortState[];
  /** Selection state */
  selection: BTableSelectionState;
  /** Pagination state */
  pagination: BTablePaginationState;
  /** Currently focused cell coordinates */
  focusedCell: { row: number; col: number } | null;
  /** Whether keyboard navigation mode is active */
  keyboardMode: boolean;
  /** Whether table is in loading state */
  isLoading: boolean;
  /** Whether table has focus */
  hasFocus: boolean;
  /** Expanded row IDs */
  expandedRows: Set<string | number>;
  /** Filter states */
  filters: Record<string, any>;
  /** Column visibility states */
  visibleColumns: Set<string>;
  /** Column order */
  columnOrder: string[];
  /** Whether high contrast mode is active */
  isHighContrast: boolean;
  /** Whether animations are disabled */
  isReducedMotion: boolean;
}

/**
 * Table ARIA attributes interface
 */
export interface BTableAriaAttributes {
  /** ARIA role for table */
  role: 'table' | 'grid';
  /** ARIA label for the table */
  'aria-label'?: string;
  /** ARIA labelledby for complex labeling */
  'aria-labelledby'?: string;
  /** ARIA describedby for additional description */
  'aria-describedby'?: string;
  /** ARIA rowcount for total rows */
  'aria-rowcount': number;
  /** ARIA colcount for total columns */
  'aria-colcount': number;
  /** ARIA multiselectable for selection support */
  'aria-multiselectable'?: boolean;
  /** ARIA busy for loading states */
  'aria-busy'?: boolean;
  /** ARIA live for announcements */
  'aria-live'?: 'polite' | 'assertive';
  /** ARIA atomic for live region updates */
  'aria-atomic'?: boolean;
}

/**
 * Table row ARIA attributes interface
 */
export interface BTableRowAriaAttributes {
  /** ARIA role for row */
  role: 'row';
  /** ARIA rowindex for position */
  'aria-rowindex': number;
  /** ARIA selected state */
  'aria-selected'?: boolean;
  /** ARIA expanded state (for expandable rows) */
  'aria-expanded'?: boolean;
  /** ARIA level (for hierarchical data) */
  'aria-level'?: number;
  /** ARIA setsize (for hierarchical data) */
  'aria-setsize'?: number;
  /** ARIA posinset (for hierarchical data) */
  'aria-posinset'?: number;
  /** ARIA disabled state */
  'aria-disabled'?: boolean;
  /** ARIA label for the row */
  'aria-label'?: string;
  /** ARIA describedby for additional description */
  'aria-describedby'?: string;
}

/**
 * Table cell ARIA attributes interface
 */
export interface BTableCellAriaAttributes {
  /** ARIA role for cell */
  role: 'cell' | 'gridcell' | 'columnheader' | 'rowheader';
  /** ARIA colindex for position */
  'aria-colindex'?: number;
  /** ARIA label for the cell */
  'aria-label'?: string;
  /** ARIA describedby for additional description */
  'aria-describedby'?: string;
  /** ARIA sort state (for headers) */
  'aria-sort'?: 'ascending' | 'descending' | 'none' | 'other';
  /** ARIA readonly state (for editable cells) */
  'aria-readonly'?: boolean;
  /** ARIA required state (for editable cells) */
  'aria-required'?: boolean;
  /** ARIA invalid state (for validation) */
  'aria-invalid'?: boolean;
}

/**
 * Table keyboard configuration
 */
export interface BTableKeyboardConfig {
  /** Whether keyboard navigation is enabled */
  enabled?: boolean;
  /** Keys for cell navigation */
  navigationKeys?: string[];
  /** Keys for row selection */
  selectionKeys?: string[];
  /** Keys for sorting */
  sortKeys?: string[];
  /** Keys for row expansion */
  expansionKeys?: string[];
  /** Keys for pagination */
  paginationKeys?: string[];
  /** Whether to prevent default keyboard behavior */
  preventDefault?: boolean;
  /** Whether to stop keyboard event propagation */
  stopPropagation?: boolean;
  /** Custom key handlers */
  customHandlers?: Record<string, (event: KeyboardEvent) => void>;
  /** Whether to enable vim-style navigation */
  vimMode?: boolean;
  /** Whether to enable cell editing shortcuts */
  enableEditingShortcuts?: boolean;
}

/**
 * Table filter configuration
 */
export interface BTableFilterConfig {
  /** Whether filtering is enabled */
  enabled?: boolean;
  /** Filter mode */
  mode?: 'local' | 'remote';
  /** Debounce delay for filter changes */
  debounceDelay?: number;
  /** Whether to show filter UI */
  showFilterUI?: boolean;
  /** Custom filter function */
  customFilter?: (items: BTableItem[], filters: Record<string, any>) => BTableItem[];
  /** Whether to announce filter results */
  announceResults?: boolean;
}

/**
 * Table cell focus event data
 */
export interface BTableCellFocusEvent {
  /** Focused item */
  item: BTableItem;
  /** Row index */
  rowIndex: number;
  /** Column index */
  colIndex: number;
  /** Header information */
  header: BTableHeader;
  /** Cell value */
  value: any;
  /** Event source */
  source: 'keyboard' | 'mouse' | 'api';
}

/**
 * Table row event data
 */
export interface BTableRowEvent {
  /** Row item */
  item: BTableItem;
  /** Row index */
  index: number;
  /** Event source */
  source: 'click' | 'keyboard' | 'api';
}

/**
 * Table selection event data
 */
export interface BTableSelectionEvent {
  /** Selected/deselected item */
  item: BTableItem;
  /** Row index */
  index: number;
  /** Whether item is now selected */
  selected: boolean;
  /** Current selection state */
  selectionState: BTableSelectionState;
  /** Event source */
  source: 'click' | 'keyboard' | 'api';
}

/**
 * Table sort event data
 */
export interface BTableSortEvent {
  /** Column key being sorted */
  key: string;
  /** Sort direction (true = descending) */
  descending: boolean;
  /** Header information */
  header: BTableHeader;
  /** Current sort states */
  sortStates: BTableSortState[];
  /** Event source */
  source: 'click' | 'keyboard' | 'api';
}

/**
 * Complete BTable props interface
 */
export interface BTableProps<T = Record<string, unknown>> extends BTableAccessibilityProps {
  /** Table column definitions */
  headers: BTableHeader[];
  /** Table data items */
  items: (T & BTableItem)[];
  /** Table configuration options */
  options?: BTableOptions;
  /** Current page number */
  page?: number;
  /** Number of items per page */
  itemsPerPage?: number;
  /** Total number of items (for backend pagination) */
  numberOfItems?: number;
  /** Whether pagination is handled by backend */
  renderPaginationInBackEnd?: boolean;
  /** Whether to hide the footer */
  hideFooter?: boolean;
  /** Whether to fix the header when scrolling */
  isHeaderFixed?: boolean;
  /** Whether to enable row selection */
  enableSelection?: boolean;
  /** Whether to enable aggregation column */
  enableAggregation?: boolean;
  /** Whether the table is in loading state */
  loading?: boolean;
  /** Whether to hide the shadow */
  noShadow?: boolean;
  /** Whether to enable hover effects on rows */
  hasHover?: boolean;
  /** Table size variant */
  size?: 'small' | 'medium' | 'large';
  /** Table density */
  density?: 'compact' | 'comfortable' | 'spacious';
  /** Whether table is selectable */
  selectable?: boolean;
  /** Whether table supports multi-select */
  multiSelect?: boolean;
  /** Whether table is editable */
  editable?: boolean;
  /** Whether table supports row expansion */
  expandable?: boolean;
  /** Whether table supports column resizing */
  resizable?: boolean;
  /** Whether table supports column reordering */
  reorderable?: boolean;
  /** Whether table supports filtering */
  filterable?: boolean;
  /** Whether table is virtualized */
  virtualized?: boolean;
  /** Row height for virtualization */
  rowHeight?: number;
  /** Container height for virtual scrolling (required when virtualized) */
  containerHeight?: number;
  /** Number of extra items to render outside visible area (overscan) */
  overscan?: number;
  /** Whether table is responsive */
  responsive?: boolean;
  /** Breakpoints for responsive behavior */
  breakpoints?: Record<string, number>;
  /** HTML id attribute */
  id?: string;
  /** Additional CSS classes */
  class?: string;
  /** Inline styles */
  style?: string | Record<string, any>;
  /** Keyboard navigation configuration */
  keyboardConfig?: BTableKeyboardConfig;
  /** Filter configuration */
  filterConfig?: BTableFilterConfig;
  /** Custom row renderer */
  rowRenderer?: (item: BTableItem, index: number) => any;
  /** Custom cell renderer */
  cellRenderer?: (value: any, item: BTableItem, header: BTableHeader, index: number) => any;
  /** Custom empty state renderer */
  emptyStateRenderer?: () => any;
  /** Custom loading state renderer */
  loadingStateRenderer?: () => any;
}

/**
 * BTable emits interface
 */
export interface BTableEmits<T = Record<string, unknown>> {
  /** Page updated */
  'update:page': [value: number];
  /** Items per page updated */
  'update:itemsPerPage': [value: number];
  /** Sort changed */
  'sortBy': [key: string, isSortDesc: boolean];
  /** Page items changed */
  'pageItems': [page: number, itemsPerPage: number];
  /** Select all toggled */
  'selectAll': [value: boolean];
  /** Row clicked */
  'row-click': [event: BTableRowEvent];
  /** Row focused */
  'row-focus': [event: BTableRowEvent];
  /** Row selected */
  'row-select': [event: BTableSelectionEvent];
  /** Row expanded/collapsed */
  'row-expand': [item: T & BTableItem, index: number, expanded: boolean];
  /** Cell focused */
  'cell-focus': [event: BTableCellFocusEvent];
  /** Cell edited */
  'cell-edit': [item: T & BTableItem, header: BTableHeader, newValue: any, oldValue: any];
  /** Cell validation failed */
  'cell-validation-error': [item: T & BTableItem, header: BTableHeader, value: any, errors: string[]];
  /** Sort changed with full event data */
  'sort-change': [event: BTableSortEvent];
  /** Filter changed */
  'filter-change': [filters: Record<string, any>, filteredItems: BTableItem[]];
  /** Column resized */
  'column-resize': [header: BTableHeader, newWidth: number];
  /** Column reordered */
  'column-reorder': [fromIndex: number, toIndex: number, headers: BTableHeader[]];
  /** Column visibility changed */
  'column-visibility': [header: BTableHeader, visible: boolean];
  /** Loading state changed */
  'loading-change': [isLoading: boolean];
  /** Accessibility event */
  'accessibility': [type: string, data: any];
  /** Keyboard navigation event */
  'keyboard-nav': [event: KeyboardEvent, cell: { row: number; col: number }];
}

/**
 * Table validation result
 */
export interface BTableValidationResult {
  /** Whether validation passes */
  isValid: boolean;
  /** Error messages */
  errors: string[];
  /** Warning messages */
  warnings: string[];
  /** Table configuration */
  config?: BTableProps;
  /** Cell-specific validation results */
  cellValidation?: Record<string, { isValid: boolean; errors: string[] }>;
}

/**
 * Table announcement templates
 */
export interface BTableAnnouncementTemplates {
  /** Template for sort change announcement */
  sortChange: string;
  /** Template for selection change announcement */
  selectionChange: string;
  /** Template for select all announcement */
  selectAll: string;
  /** Template for deselect all announcement */
  deselectAll: string;
  /** Template for page change announcement */
  pageChange: string;
  /** Template for cell focus announcement */
  cellFocus: string;
  /** Template for row expansion announcement */
  rowExpand: string;
  /** Template for row collapse announcement */
  rowCollapse: string;
  /** Template for filter applied announcement */
  filterApplied: string;
  /** Template for filter cleared announcement */
  filterCleared: string;
  /** Template for loading announcement */
  loadingStart: string;
  /** Template for loading complete announcement */
  loadingComplete: string;
  /** Template for keyboard navigation instructions */
  keyboardInstructions: string;
  /** Template for empty state announcement */
  emptyState: string;
  /** Template for column reorder announcement */
  columnReorder: string;
}

/**
 * Table theme configuration
 */
export interface BTableThemeConfig {
  /** Header background color */
  headerBackgroundColor?: string;
  /** Header text color */
  headerTextColor?: string;
  /** Row background color */
  rowBackgroundColor?: string;
  /** Row text color */
  rowTextColor?: string;
  /** Row hover background color */
  rowHoverBackgroundColor?: string;
  /** Selected row background color */
  selectedRowBackgroundColor?: string;
  /** Border color */
  borderColor?: string;
  /** Focus ring color */
  focusRingColor?: string;
  /** Sort indicator color */
  sortIndicatorColor?: string;
  /** Loading overlay color */
  loadingOverlayColor?: string;
  /** Empty state text color */
  emptyStateTextColor?: string;
}

/**
 * Table accessibility helpers
 */
export interface BTableAccessibilityHelpers {
  /** Get ARIA attributes for table */
  getTableAriaAttributes: (state: BTableState, props: BTableProps) => BTableAriaAttributes;
  /** Get ARIA attributes for row */
  getRowAriaAttributes: (item: BTableItem, index: number, state: BTableState) => BTableRowAriaAttributes;
  /** Get ARIA attributes for cell */
  getCellAriaAttributes: (value: any, item: BTableItem, header: BTableHeader, rowIndex: number, colIndex: number) => BTableCellAriaAttributes;
  /** Format sort announcement */
  formatSortAnnouncement: (header: BTableHeader, direction: 'ascending' | 'descending') => string;
  /** Format selection announcement */
  formatSelectionAnnouncement: (count: number, total: number, action: 'select' | 'deselect') => string;
  /** Format cell focus announcement */
  formatCellFocusAnnouncement: (value: any, header: BTableHeader, rowIndex: number) => string;
  /** Get keyboard instructions */
  getKeyboardInstructions: (features: string[]) => string;
  /** Announce table state change */
  announceTableStateChange: (type: string, data: any) => void;
  /** Check if cell should be focusable */
  isCellFocusable: (header: BTableHeader, item: BTableItem) => boolean;
}

/**
 * Default configurations
 */
export const DEFAULT_TABLE_KEYBOARD_CONFIG: Required<BTableKeyboardConfig> = {
  enabled: true,
  navigationKeys: ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown'],
  selectionKeys: [' ', 'Enter'],
  sortKeys: ['Enter', ' '],
  expansionKeys: ['Enter', ' '],
  paginationKeys: ['PageUp', 'PageDown'],
  preventDefault: true,
  stopPropagation: false,
  customHandlers: {},
  vimMode: false,
  enableEditingShortcuts: false,
};

export const DEFAULT_TABLE_ACCESSIBILITY_CONFIG: Required<BTableAccessibilityProps> = {
  ariaLabel: 'Data table',
  caption: '',
  ariaDescription: '',
  loadingLabel: 'Loading table data',
  announceSortChanges: true,
  announceSelectionChanges: true,
  announcePaginationChanges: true,
  announceCellFocus: true,
  announcementDelay: 0,
  highContrast: false,
  reduceMotion: false,
  enhancedFocus: true,
  screenReaderInstructions: 'Use arrow keys to navigate cells, Enter to select rows, Space to sort columns',
  liveRegionPoliteness: 'polite',
  keyboardNavigation: true,
  showFocusIndicator: true,
  supportExpansion: false,
  announceExpansion: true,
  supportColumnReordering: false,
  announceColumnReordering: true,
  contextDescription: '',
  useStickyHeaders: false,
  provideCellEditingInstructions: false,
};

export const DEFAULT_TABLE_FILTER_CONFIG: Required<BTableFilterConfig> = {
  enabled: false,
  mode: 'local',
  debounceDelay: 300,
  showFilterUI: true,
  customFilter: undefined,
  announceResults: true,
};

export const DEFAULT_TABLE_ANNOUNCEMENTS: Required<BTableAnnouncementTemplates> = {
  sortChange: 'Sorted by {column} {direction}',
  selectionChange: '{action} {count} of {total} rows',
  selectAll: 'Selected all {total} rows',
  deselectAll: 'Deselected all rows',
  pageChange: 'Page {page} of {totalPages}, showing {startIndex} to {endIndex} of {total} items',
  cellFocus: 'Row {row}, {column}: {value}',
  rowExpand: 'Expanded row {row}',
  rowCollapse: 'Collapsed row {row}',
  filterApplied: 'Filter applied, showing {count} of {total} items',
  filterCleared: 'Filter cleared, showing all {total} items',
  loadingStart: 'Loading table data',
  loadingComplete: 'Table data loaded',
  keyboardInstructions: 'Use arrow keys to navigate, Enter to select, Space to sort',
  emptyState: 'No data available in table',
  columnReorder: 'Moved {column} from position {from} to {to}',
};

/**
 * Table interaction patterns
 */
export const TABLE_INTERACTION_PATTERNS = {
  /** Standard data table */
  DATA_TABLE: 'data-table',
  /** Grid pattern with cell editing */
  GRID: 'grid',
  /** Hierarchical tree table */
  TREE_TABLE: 'tree-table',
  /** Master-detail table */
  MASTER_DETAIL: 'master-detail',
  /** Pivot table */
  PIVOT_TABLE: 'pivot-table',
} as const;

/**
 * Keyboard navigation key mappings
 */
export const TABLE_KEY_MAPPINGS: Record<string, {
  action: string;
  description: string;
  context?: string;
}> = {
  ArrowDown: { action: 'nextRow', description: 'Move to next row' },
  ArrowUp: { action: 'previousRow', description: 'Move to previous row' },
  ArrowRight: { action: 'nextCell', description: 'Move to next cell' },
  ArrowLeft: { action: 'previousCell', description: 'Move to previous cell' },
  Home: { action: 'firstCell', description: 'Move to first cell in row' },
  End: { action: 'lastCell', description: 'Move to last cell in row' },
  'Control+Home': { action: 'firstCellTable', description: 'Move to first cell in table' },
  'Control+End': { action: 'lastCellTable', description: 'Move to last cell in table' },
  PageUp: { action: 'previousPage', description: 'Go to previous page' },
  PageDown: { action: 'nextPage', description: 'Go to next page' },
  Enter: { action: 'activate', description: 'Activate focused element' },
  Space: { action: 'select', description: 'Select/deselect row or sort column' },
  'Control+A': { action: 'selectAll', description: 'Select all rows' },
  Escape: { action: 'cancel', description: 'Cancel current action' },
  F2: { action: 'edit', description: 'Edit focused cell', context: 'editable' },
  Delete: { action: 'delete', description: 'Delete selected rows', context: 'editable' },
};

/**
 * Table size configurations with accessibility considerations
 */
export const TABLE_SIZE_CONFIG: Record<'small' | 'medium' | 'large', {
  cellPadding: string;
  fontSize: string;
  headerHeight: string;
  rowHeight: string;
  minTouchTarget: boolean;
}> = {
  small: {
    cellPadding: '0.25rem 0.5rem',
    fontSize: '0.875rem',
    headerHeight: '2rem',
    rowHeight: '2rem',
    minTouchTarget: true,
  },
  medium: {
    cellPadding: '0.5rem 0.75rem',
    fontSize: '1rem',
    headerHeight: '2.5rem',
    rowHeight: '2.5rem',
    minTouchTarget: false,
  },
  large: {
    cellPadding: '0.75rem 1rem',
    fontSize: '1.125rem',
    headerHeight: '3rem',
    rowHeight: '3rem',
    minTouchTarget: false,
  },
};

/**
 * Export all types for easy importing
 */
export type {
  BTableAccessibilityProps as AccessibilityProps,
  BTableProps as Props,
  BTableState as State,
  BTableAriaAttributes as AriaAttributes,
  BTableRowAriaAttributes as RowAriaAttributes,
  BTableCellAriaAttributes as CellAriaAttributes,
  BTableKeyboardConfig as KeyboardConfig,
  BTableFilterConfig as FilterConfig,
  BTableHeader as Header,
  BTableItem as Item,
  BTableOptions as Options,
  BTableSortState as SortState,
  BTableSelectionState as SelectionState,
  BTablePaginationState as PaginationState,
  BTableCellFocusEvent as CellFocusEvent,
  BTableRowEvent as RowEvent,
  BTableSelectionEvent as SelectionEvent,
  BTableSortEvent as SortEvent,
  BTableEmits as Emits,
  BTableValidationResult as ValidationResult,
  BTableAnnouncementTemplates as AnnouncementTemplates,
  BTableThemeConfig as ThemeConfig,
  BTableAccessibilityHelpers as AccessibilityHelpers,
};