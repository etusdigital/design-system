/**
 * Comprehensive TypeScript interfaces for BHistory component with WCAG 2.1 AA accessibility support
 */

// Import the base types from the main component file
import type { BHistoryItem, BHistorySelectionEvent } from './BHistory.vue';

/**
 * Accessibility-specific props for BHistory component
 */
export interface BHistoryAccessibilityProps {
  /** ARIA label for the entire history/timeline widget */
  'aria-label'?: string;
  /** ID of element that labels the history widget */
  'aria-labelledby'?: string;
  /** ID of element that describes the history widget */
  'aria-describedby'?: string;
  /** Custom role override (defaults to appropriate timeline/list semantics) */
  role?: 'region' | 'log' | 'feed' | 'list';
  /** Whether to announce history navigation to screen readers */
  announceNavigation?: boolean;
  /** Custom announcement prefix for history item selection */
  announcementPrefix?: string;
  /** Whether to use reduced motion for focus indicators */
  reduceMotion?: boolean;
  /** Custom ARIA live region politeness level */
  liveRegionPoliteness?: 'polite' | 'assertive';
}

/**
 * History navigation accessibility options
 */
export interface BHistoryNavigationOptions {
  /** Whether keyboard navigation is enabled */
  keyboardNavigation?: boolean;
  /** Whether to loop navigation at boundaries */
  loopNavigation?: boolean;
  /** Whether to focus items on keyboard navigation */
  focusOnNavigation?: boolean;
  /** Custom key bindings for navigation */
  customKeyBindings?: Record<string, (event: KeyboardEvent, index: number) => void>;
}

/**
 * Props for the BHistory component with comprehensive accessibility support
 */
export interface BHistoryProps extends BHistoryAccessibilityProps, BHistoryNavigationOptions {
  /** Currently selected history item */
  modelValue?: BHistoryItem | null;
  /** Array of history items to display */
  items: BHistoryItem[];
  /** Position of the history timeline */
  position?: "top" | "bottom" | "left" | "right";
  /** Default type for items that don't specify their own type */
  type?: "primary" | "info" | "success" | "warning" | "danger" | "neutral";
  /** Whether the history component is disabled */
  disabled?: boolean;
  /** Maximum number of items to display (for virtualization) */
  maxVisibleItems?: number;
  /** Whether to show pagination controls for large datasets */
  showPagination?: boolean;
  /** Current page for pagination */
  currentPage?: number;
  /** Items per page for pagination */
  itemsPerPage?: number;
  /** Date format options for accessibility */
  dateFormatOptions?: Intl.DateTimeFormatOptions;
  /** Locale for date formatting */
  locale?: string;
  /** Whether to automatically announce item counts */
  announceItemCounts?: boolean;
  /** Whether to announce date information */
  announceDateInfo?: boolean;
  /** Whether to provide timeline orientation context */
  announceOrientation?: boolean;
}

/**
 * Events emitted by the BHistory component
 */
export interface BHistoryEmits {
  /** Emitted when a history item is selected */
  "update:modelValue": [value: BHistoryItem | null];
  /** Emitted when pagination changes */
  "update:currentPage": [page: number];
  /** Emitted when keyboard navigation occurs */
  "navigate": [item: BHistoryItem, index: number, direction: 'next' | 'previous' | 'first' | 'last'];
  /** Emitted when focus changes */
  "focus-change": [item: BHistoryItem | null, index: number];
}

/**
 * History item accessibility context
 */
export interface BHistoryItemContext {
  /** The history item data */
  item: BHistoryItem;
  /** Index in the items array */
  index: number;
  /** Whether this item is currently active/selected */
  active: boolean;
  /** Whether this item has keyboard focus */
  focused: boolean;
  /** Total number of items in the history */
  totalItems: number;
  /** Formatted position text for screen readers */
  positionText: string;
  /** Formatted date string for accessibility */
  accessibleDate: string;
  /** ARIA attributes for the item */
  itemAriaAttrs: Record<string, string | number | boolean>;
}

/**
 * Timeline accessibility metadata
 */
export interface BHistoryTimelineMetadata {
  /** Total number of history items */
  totalItems: number;
  /** Currently selected item index */
  selectedIndex: number;
  /** Date range of the history items */
  dateRange?: {
    earliest: Date;
    latest: Date;
  };
  /** Whether the timeline is chronological */
  isChronological: boolean;
  /** Timeline orientation based on position */
  orientation: 'horizontal' | 'vertical';
}

/**
 * Pagination accessibility context
 */
export interface BHistoryPaginationContext {
  /** Current page number (1-indexed) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Number of items per page */
  itemsPerPage: number;
  /** Total number of items */
  totalItems: number;
  /** Whether there is a previous page */
  hasPreviousPage: boolean;
  /** Whether there is a next page */
  hasNextPage: boolean;
  /** Range of items on current page */
  itemRange: {
    start: number;
    end: number;
  };
}

/**
 * Screen reader announcement templates for history actions
 */
export interface BHistoryAnnouncementTemplates {
  /** Template for item selection */
  itemSelected: (item: BHistoryItem, position: number, total: number) => string;
  /** Template for navigation */
  navigationChanged: (direction: string, item: BHistoryItem) => string;
  /** Template for pagination */
  pageChanged: (page: number, totalPages: number) => string;
  /** Template for timeline description */
  timelineDescription: (metadata: BHistoryTimelineMetadata) => string;
}

/**
 * Focus management configuration
 */
export interface BHistoryFocusConfig {
  /** Whether to trap focus within the history component */
  trapFocus?: boolean;
  /** Whether to restore focus when component unmounts */
  restoreFocus?: boolean;
  /** Custom focus selector */
  focusSelector?: string;
  /** Whether to skip focus management */
  skipFocusManagement?: boolean;
}

/**
 * Comprehensive accessibility configuration for BHistory
 */
export interface BHistoryA11yConfig 
  extends BHistoryAccessibilityProps, 
          BHistoryNavigationOptions, 
          BHistoryFocusConfig {
  /** Custom announcement templates */
  announcementTemplates?: Partial<BHistoryAnnouncementTemplates>;
  /** Whether to automatically announce item counts */
  announceItemCounts?: boolean;
  /** Whether to announce date information */
  announceDateInfo?: boolean;
  /** Whether to provide timeline orientation context */
  announceOrientation?: boolean;
}