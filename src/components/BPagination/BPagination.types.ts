/**
 * WCAG 2.1 AA Accessibility Types for BPagination Component
 * 
 * Comprehensive TypeScript interfaces for pagination accessibility configuration,
 * supporting screen readers, keyboard navigation, and ARIA standards.
 */

export interface BPaginationAccessibilityProps {
  /** Accessible label for the pagination navigation landmark */
  ariaLabel?: string;
  
  /** ID for the pagination navigation element */
  id?: string;
  
  /** Label for the previous page button */
  previousLabel?: string;
  
  /** Label for the next page button */
  nextLabel?: string;
  
  /** Label for the first page button */
  firstLabel?: string;
  
  /** Label for the last page button */
  lastLabel?: string;
  
  /** Template for page button labels (e.g., "Go to page {page}") */
  pageLabel?: string;
  
  /** Template for current page button labels (e.g., "Current page, page {page}") */
  currentPageLabel?: string;
  
  /** Template for page range announcements (e.g., "Page {current} of {total}") */
  pageRangeTemplate?: string;
  
  /** Whether to announce page changes to screen readers */
  announcePageChanges?: boolean;
  
  /** Whether to show page number context in button labels */
  showPageContext?: boolean;
  
  /** Additional ARIA attributes for the navigation element */
  navigationAriaAttrs?: Record<string, string>;
}

export interface BPaginationKeyboardNavigation {
  /** Whether to enable arrow key navigation between pages */
  enableArrowKeys?: boolean;
  
  /** Whether to enable Home/End key navigation to first/last pages */
  enableHomeEndKeys?: boolean;
  
  /** Whether to enable Page Up/Page Down key navigation */
  enablePageUpDownKeys?: boolean;
  
  /** Whether to focus the active page button on navigation */
  focusActiveButton?: boolean;
  
  /** Custom keyboard event handlers */
  customKeyHandlers?: Record<string, (event: KeyboardEvent) => void>;
}

export interface BPaginationScreenReaderConfig {
  /** Whether to use live regions for page change announcements */
  useLiveRegions?: boolean;
  
  /** Politeness level for page change announcements */
  announcementPoliteness?: 'polite' | 'assertive';
  
  /** Whether to announce when reaching first or last page */
  announceBoundaryReached?: boolean;
  
  /** Whether to announce the total number of pages */
  announceTotalPages?: boolean;
  
  /** Custom announcement templates */
  customAnnouncements?: {
    pageChange?: (current: number, total: number) => string;
    firstPage?: () => string;
    lastPage?: () => string;
    boundaryReached?: (boundary: 'first' | 'last') => string;
  };
}

export interface BPaginationFocusManagement {
  /** Whether to trap focus within pagination when using keyboard navigation */
  trapFocus?: boolean;
  
  /** Whether to restore focus to trigger element after navigation */
  restoreFocus?: boolean;
  
  /** Whether to focus the active page button on navigation */
  focusActiveButton?: boolean;
  
  /** CSS selector for elements that should receive focus */
  focusableSelector?: string;
  
  /** Whether to skip to main content link should be provided */
  provideSkipLink?: boolean;
  
  /** Skip link text */
  skipLinkText?: string;
}

export interface BPaginationDisplayOptions {
  /** Maximum number of page buttons to show before using ellipsis */
  maxVisiblePages?: number;
  
  /** Whether to show first/last page buttons */
  showFirstLast?: boolean;
  
  /** Whether to show previous/next buttons */
  showPreviousNext?: boolean;
  
  /** Whether to show ellipsis for truncated page ranges */
  showEllipsis?: boolean;
  
  /** Position of ellipsis relative to visible pages */
  ellipsisPosition?: 'start' | 'end' | 'both';
  
  /** Whether to show page count information (e.g., "Page 3 of 10") */
  showPageInfo?: boolean;
  
  /** Position of page info text */
  pageInfoPosition?: 'before' | 'after' | 'inline';
}

export interface BPaginationJumpToPage {
  /** Whether to provide a "jump to page" input field */
  enableJumpToPage?: boolean;
  
  /** Label for the jump to page input */
  jumpToPageLabel?: string;
  
  /** Placeholder text for the jump to page input */
  jumpToPagePlaceholder?: string;
  
  /** Button text for the jump to page action */
  jumpToPageButtonText?: string;
  
  /** Whether to validate jump to page input */
  validateJumpInput?: boolean;
  
  /** Position of jump to page control */
  jumpToPagePosition?: 'before' | 'after' | 'inline';
}

export interface BPaginationProps extends BPaginationAccessibilityProps {
  /** Current page number (v-model) */
  modelValue: number;
  
  /** Total number of pages */
  length: number;
  
  /** Accessibility configuration */
  accessibility?: BPaginationAccessibilityProps;
  
  /** Keyboard navigation configuration */
  keyboardNavigation?: BPaginationKeyboardNavigation;
  
  /** Screen reader configuration */
  screenReader?: BPaginationScreenReaderConfig;
  
  /** Focus management configuration */
  focusManagement?: BPaginationFocusManagement;
  
  /** Display options configuration */
  display?: BPaginationDisplayOptions;
  
  /** Jump to page configuration */
  jumpToPage?: BPaginationJumpToPage;
  
  /** Whether the pagination is disabled */
  disabled?: boolean;
  
  /** Loading state for async page changes */
  loading?: boolean;
  
  /** Custom CSS classes */
  class?: string;
  
  /** Custom inline styles */
  style?: Record<string, string>;
}

export interface BPaginationEmits {
  /** Emitted when the current page changes */
  'update:modelValue': [value: number];
  
  /** Emitted when a page change is initiated (before update:modelValue) */
  'page-changing': [from: number, to: number];
  
  /** Emitted when a page change is completed (after update:modelValue) */
  'page-changed': [current: number, previous: number];
  
  /** Emitted when first page is reached */
  'first-page': [current: number];
  
  /** Emitted when last page is reached */
  'last-page': [current: number];
  
  /** Emitted when jump to page is triggered */
  'jump-to-page': [page: number];
  
  /** Emitted for keyboard navigation events */
  'keyboard-navigation': [event: KeyboardEvent, action: string];
  
  /** Emitted for focus events */
  'focus-changed': [element: HTMLElement | null, page?: number];
}

export interface BPaginationSlots {
  /** Custom previous button content */
  'previous-button'?: (props: { disabled: boolean; onClick: () => void }) => any;
  
  /** Custom next button content */
  'next-button'?: (props: { disabled: boolean; onClick: () => void }) => any;
  
  /** Custom first button content */
  'first-button'?: (props: { disabled: boolean; onClick: () => void }) => any;
  
  /** Custom last button content */
  'last-button'?: (props: { disabled: boolean; onClick: () => void }) => any;
  
  /** Custom page button content */
  'page-button'?: (props: { page: number; isActive: boolean; onClick: () => void }) => any;
  
  /** Custom ellipsis content */
  'ellipsis'?: (props: { position: 'start' | 'end' }) => any;
  
  /** Custom page info content */
  'page-info'?: (props: { current: number; total: number }) => any;
  
  /** Custom jump to page content */
  'jump-to-page'?: (props: { onJump: (page: number) => void; currentPage: number; totalPages: number }) => any;
  
  /** Custom skip link content */
  'skip-link'?: (props: { onSkip: () => void }) => any;
}

export interface BPaginationExpose {
  /** Focus the current page button */
  focusCurrentPage: () => void;
  
  /** Focus the first page button */
  focusFirstPage: () => void;
  
  /** Focus the last page button */
  focusLastPage: () => void;
  
  /** Go to a specific page */
  goToPage: (page: number) => void;
  
  /** Go to previous page */
  goToPreviousPage: () => void;
  
  /** Go to next page */
  goToNextPage: () => void;
  
  /** Announce a custom message to screen readers */
  announceToScreenReader: (message: string, politeness?: 'polite' | 'assertive') => void;
  
  /** Get the current accessibility state */
  getAccessibilityState: () => {
    currentPage: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
    isFirstPage: boolean;
    isLastPage: boolean;
  };
}

export type { BPaginationProps as default };