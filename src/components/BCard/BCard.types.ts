/**
 * Type definitions for the BCard component
 * Comprehensive accessibility and interaction interfaces
 */

export type BCardRole = 
  | "article" 
  | "section" 
  | "region" 
  | "complementary" 
  | "main" 
  | "banner" 
  | "contentinfo" 
  | "navigation" 
  | "button"
  | "group"
  | "listitem"
  | "tabpanel";

export type BCardVariant = 
  | "default" 
  | "elevated" 
  | "outlined" 
  | "filled";

export type BCardSize = 
  | "small" 
  | "medium" 
  | "large";

export type BCardLoadingState = 
  | "idle" 
  | "loading" 
  | "success" 
  | "error";

/**
 * Configuration for card group/collection accessibility
 */
export interface BCardGroupConfig {
  /** ARIA setsize - total number of cards in collection */
  setSize?: number;
  /** ARIA posinset - position of this card in collection */
  posInSet?: number;
  /** Whether this card is part of a selectable group */
  multiSelectable?: boolean;
  /** Orientation of the card group */
  orientation?: 'horizontal' | 'vertical';
  /** Group label for screen readers */
  groupLabel?: string;
}

/**
 * Card interaction configuration
 */
export interface BCardInteractionConfig {
  /** Whether the card supports keyboard navigation */
  keyboardNavigable?: boolean;
  /** Whether to announce state changes to screen readers */
  announceChanges?: boolean;
  /** Custom keyboard shortcuts */
  shortcuts?: {
    [key: string]: () => void;
  };
  /** Whether to prevent default keyboard behavior */
  preventDefaultKeys?: string[];
}

/**
 * Card media accessibility configuration
 */
export interface BCardMediaConfig {
  /** Alt text for card images */
  imageAlt?: string;
  /** Whether the card contains decorative images only */
  decorativeImages?: boolean;
  /** Description for complex media content */
  mediaDescription?: string;
}

/**
 * Card skip links configuration
 */
export interface BCardSkipLinksConfig {
  /** Whether to show skip links for card navigation */
  enabled?: boolean;
  /** Custom skip link text */
  skipToContentText?: string;
  /** Skip to footer text */
  skipToActionsText?: string;
  /** Additional skip link targets */
  customSkipLinks?: Array<{
    href: string;
    text: string;
  }>;
}

/**
 * Comprehensive props interface for BCard component
 */
export interface BCardProps {
  // Basic Props
  /** Custom CSS class */
  className?: string;
  /** Unique identifier for the card */
  id?: string;
  /** Card visual variant */
  variant?: BCardVariant;
  /** Card size variant */
  size?: BCardSize;

  // Semantic Props
  /** Semantic role for the card */
  role?: BCardRole;
  /** ARIA label for the card */
  ariaLabel?: string;
  /** ARIA labelledby reference */
  ariaLabelledBy?: string;
  /** ARIA describedby reference */
  ariaDescribedBy?: string;

  // State Props
  /** Whether the card can be focused */
  focusable?: boolean;
  /** Whether the card is interactive (clickable) */
  interactive?: boolean;
  /** Whether the card is selected/active */
  selected?: boolean;
  /** Whether the card is disabled */
  disabled?: boolean;
  /** Loading state of the card */
  loadingState?: BCardLoadingState;
  /** Whether the card is expandable */
  expandable?: boolean;
  /** Whether the card is expanded (if expandable) */
  expanded?: boolean;

  // Advanced Accessibility Props
  /** Whether to trap focus within the card */
  trapFocus?: boolean;
  /** Card group configuration */
  groupConfig?: BCardGroupConfig;
  /** Interaction configuration */
  interactionConfig?: BCardInteractionConfig;
  /** Media accessibility configuration */
  mediaConfig?: BCardMediaConfig;
  /** Skip links configuration */
  skipLinksConfig?: BCardSkipLinksConfig;

  // Content Props
  /** Card title for screen readers */
  title?: string;
  /** Card description for screen readers */
  description?: string;
  /** Loading message for screen readers */
  loadingMessage?: string;
  /** Error message for screen readers */
  errorMessage?: string;
}

/**
 * Events emitted by the BCard component
 */
export interface BCardEmits {
  /** Card click event */
  "click": [event: MouseEvent];
  /** Card keyboard event */
  "keydown": [event: KeyboardEvent];
  /** Card focus event */
  "focus": [event: FocusEvent];
  /** Card blur event */
  "blur": [event: FocusEvent];
  /** Card selection change */
  "select": [selected: boolean];
  /** Card expansion change */
  "expand": [expanded: boolean];
  /** Card loading state change */
  "loading-state-change": [state: BCardLoadingState];
  /** Card action performed */
  "action": [action: string, data?: any];
}

/**
 * Slots available in BCard component
 */
export interface BCardSlots {
  /** Default slot for card content */
  default: () => any;
  /** Header slot for card title and metadata */
  header: () => any;
  /** Footer slot for card actions */
  footer: () => any;
  /** Media slot for images/videos */
  media: () => any;
  /** Actions slot for interactive elements */
  actions: () => any;
  /** Skip links slot for custom navigation */
  skipLinks: () => any;
  /** Loading state slot for custom loading UI */
  loading: () => any;
  /** Error state slot for custom error UI */
  error: () => any;
}

/**
 * Card context for child components
 */
export interface BCardContext {
  /** Card ID */
  cardId: string;
  /** Whether card is interactive */
  interactive: boolean;
  /** Whether card is disabled */
  disabled: boolean;
  /** Whether card is selected */
  selected: boolean;
  /** Current loading state */
  loadingState: BCardLoadingState;
  /** Register child action element */
  registerAction: (id: string, element: HTMLElement) => void;
  /** Unregister child action element */
  unregisterAction: (id: string) => void;
  /** Announce message to screen readers */
  announceMessage: (message: string, assertive?: boolean) => void;
}

/**
 * Utility type for card accessibility attributes
 */
export type BCardAriaAttributes = {
  [K in `aria-${string}`]?: string | boolean | number;
} & {
  role?: string;
  tabindex?: number;
  id?: string;
};

/**
 * Card keyboard navigation keys
 */
export const CARD_NAVIGATION_KEYS = {
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  HOME: 'Home',
  END: 'End',
  TAB: 'Tab'
} as const;

export type BCardNavigationKey = typeof CARD_NAVIGATION_KEYS[keyof typeof CARD_NAVIGATION_KEYS];

/**
 * Card accessibility test helpers
 */
export interface BCardA11yHelpers {
  /** Check if card has proper ARIA attributes */
  hasValidAria: () => boolean;
  /** Check if card is keyboard accessible */
  isKeyboardAccessible: () => boolean;
  /** Check if card has proper focus management */
  hasFocusManagement: () => boolean;
  /** Check if card announces state changes */
  announcesStateChanges: () => boolean;
  /** Simulate keyboard interaction */
  simulateKeyboard: (key: BCardNavigationKey) => void;
  /** Get all focusable elements in card */
  getFocusableElements: () => HTMLElement[];
}