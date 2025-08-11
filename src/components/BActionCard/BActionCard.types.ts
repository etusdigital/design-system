export interface BActionCardAccessibilityProps {
  /** ARIA label for the card */
  ariaLabel?: string;
  /** Custom aria-describedby ID */
  ariaDescribedBy?: string;
  /** Custom aria-labelledby ID */
  ariaLabelledBy?: string;
  /** Whether the card is interactive (clickable) */
  interactive?: boolean;
  /** Role for the card container */
  cardRole?: 'article' | 'region' | 'group' | 'button' | 'listitem';
  /** Context description for actions (helps screen readers understand purpose) */
  actionContext?: string;
  /** Whether to announce actions to screen readers */
  announceActions?: boolean;
  /** Custom announcement for screen readers when card is activated */
  activationAnnouncement?: string;
  /** Custom announcement for screen readers when card is selected/deselected */
  selectionAnnouncement?: string;
  /** Whether the drag action is disabled for accessibility reasons */
  dragDisabled?: boolean;
  /** Custom aria-label for drag handle */
  dragLabel?: string;
  /** Custom aria-label for delete button */
  deleteLabel?: string;
  /** Whether to support high contrast mode */
  supportHighContrast?: boolean;
  /** Whether to respect reduced motion preferences */
  respectReducedMotion?: boolean;
  /** Whether to enforce minimum touch target sizes (44px) */
  enforceMinimumTouchTarget?: boolean;
  /** Tab index for the main card element */
  tabIndex?: number;
  /** ARIA current state for navigation contexts */
  ariaCurrent?: boolean | 'page' | 'step' | 'location' | 'date' | 'time';
  /** ARIA level for hierarchical content */
  ariaLevel?: number;
  /** ARIA position in set (for lists/grids) */
  ariaPosInSet?: number;
  /** ARIA set size (total items in set) */
  ariaSetSize?: number;
  /** Whether the card represents an error state */
  hasError?: boolean;
  /** Error message for screen readers */
  errorMessage?: string;
  /** Whether the card is in a loading/busy state */
  loading?: boolean;
  /** Loading announcement for screen readers */
  loadingAnnouncement?: string;
  /** Keyboard shortcuts configuration */
  keyboardShortcuts?: {
    activate?: string[];
    delete?: string[];
    drag?: string[];
  };
}

export interface BActionCardInteractionProps {
  /** Icon displayed in the card header */
  icon?: string;
  /** Custom color for the card header background */
  color?: string;
  /** Hide the drag indicator icon */
  hideDrag?: boolean;
  /** Whether the card is in a dragging state */
  isDragging?: boolean;
  /** Whether the card is disabled */
  disabled?: boolean;
  /** Whether the card is selected */
  selected?: boolean;
}

export interface BActionCardEmits {
  /** Emitted when drag operation starts */
  dragstart: [event: Event];
  /** Emitted during drag operation */
  dragging: [event: Event];
  /** Emitted when drag operation ends */
  dragend: [event: Event];
  /** Emitted when delete action is triggered */
  delete: [];
  /** Emitted when card is clicked (interactive mode) */
  click: [event: MouseEvent];
  /** Emitted when card is activated via keyboard */
  activate: [event: KeyboardEvent];
  /** Emitted when focus enters the card */
  focus: [event: FocusEvent];
  /** Emitted when focus leaves the card */
  blur: [event: FocusEvent];
  /** Emitted when loading state changes */
  'loading-change': [loading: boolean];
  /** Emitted when error state changes */
  'error-change': [hasError: boolean, errorMessage?: string];
  /** Emitted when keyboard shortcut is triggered */
  'keyboard-shortcut': [shortcut: string, event: KeyboardEvent];
}

export interface BActionCardSlots {
  /** Default slot for card header content */
  default: () => any;
  /** Slot for additional card content */
  card: () => any;
  /** Slot for custom drag handle */
  dragHandle?: () => any;
  /** Slot for custom delete button */
  deleteButton?: () => any;
}

export type BActionCardProps = BActionCardAccessibilityProps & BActionCardInteractionProps;