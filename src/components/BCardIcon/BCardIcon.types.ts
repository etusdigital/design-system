/**
 * Type definitions for the BCardIcon component
 * Comprehensive accessibility and interaction interfaces
 */

/**
 * Icon semantic types for accessibility
 */
export type BCardIconSemantic = 'decorative' | 'informative' | 'interactive' | 'status';

/**
 * Card icon interaction types
 */
export type BCardIconInteractionType = 'none' | 'button' | 'link' | 'toggle' | 'selectable';

/**
 * Card icon size variants
 */
export type BCardIconSize = 'small' | 'medium' | 'large';

/**
 * Card icon variants
 */
export type BCardIconVariant = 'default' | 'elevated' | 'outlined' | 'filled';

/**
 * Loading states for card icon
 */
export type BCardIconLoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * Keyboard navigation keys for card icon
 */
export const CARD_ICON_NAVIGATION_KEYS = {
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

export type BCardIconNavigationKey = typeof CARD_ICON_NAVIGATION_KEYS[keyof typeof CARD_ICON_NAVIGATION_KEYS];

/**
 * Icon accessibility configuration
 */
export interface BCardIconIconConfig {
  /** Alternative text for the icon */
  iconAlt?: string;
  /** Whether the icon is purely decorative */
  iconDecorative?: boolean;
  /** Icon semantic purpose */
  iconSemantic?: BCardIconSemantic;
  /** ARIA label for the icon specifically */
  iconAriaLabel?: string;
  /** Whether the icon conveys status information */
  iconConveysStatus?: boolean;
  /** Custom icon role override */
  iconRole?: string;
}

/**
 * Card group configuration for accessibility
 */
export interface BCardIconGroupConfig {
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
  /** Whether cards in group support multi-selection */
  allowMultipleSelection?: boolean;
}

/**
 * Card interaction configuration
 */
export interface BCardIconInteractionConfig {
  /** Type of interaction supported */
  type?: BCardIconInteractionType;
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
  /** Minimum touch target size in pixels */
  minTouchTarget?: number;
  /** Whether interactions are disabled */
  disabled?: boolean;
  /** Custom interaction handler */
  onInteract?: (event: Event) => void;
}

/**
 * Card accessibility configuration
 */
export interface BCardIconAccessibilityConfig {
  /** Whether to use enhanced focus management */
  enhancedFocus?: boolean;
  /** Whether to trap focus within the card */
  trapFocus?: boolean;
  /** Custom ARIA role for the card */
  cardRole?: string;
  /** Whether the card is a landmark */
  isLandmark?: boolean;
  /** Live region politeness for announcements */
  liveRegionPoliteness?: 'polite' | 'assertive';
  /** Whether to provide skip links */
  skipLinksEnabled?: boolean;
  /** Custom skip link text */
  skipLinkText?: string;
}

/**
 * Loading state configuration
 */
export interface BCardIconLoadingConfig {
  /** Current loading state */
  state?: BCardIconLoadingState;
  /** Loading message for screen readers */
  loadingMessage?: string;
  /** Success message for screen readers */
  successMessage?: string;
  /** Error message for screen readers */
  errorMessage?: string;
  /** Whether to show loading spinner */
  showSpinner?: boolean;
  /** Timeout for loading state in ms */
  timeout?: number;
}

/**
 * Comprehensive props interface for BCardIcon component
 */
export interface BCardIconProps {
  // Basic Props
  /** Card title */
  title?: string;
  /** Icon name (Material Icons) */
  icon?: string;
  /** Custom color for icon and title */
  color?: string;
  /** Whether icon should be displayed without background circle */
  isIconRound?: boolean;
  /** Custom CSS class */
  className?: string;
  /** Unique identifier for the card */
  id?: string;
  /** Card variant */
  variant?: BCardIconVariant;
  /** Card size */
  size?: BCardIconSize;

  // Accessibility Props
  /** ARIA label for the entire card */
  ariaLabel?: string;
  /** ARIA labelledby reference */
  ariaLabelledBy?: string;
  /** ARIA describedby reference */
  ariaDescribedBy?: string;
  /** Card role for screen readers */
  role?: string;

  // Icon Accessibility
  /** Icon accessibility configuration */
  iconConfig?: BCardIconIconConfig;

  // Interaction Props
  /** Whether the card is interactive */
  interactive?: boolean;
  /** Whether the card is selected/active */
  selected?: boolean;
  /** Whether the card is disabled */
  disabled?: boolean;
  /** Interaction configuration */
  interactionConfig?: BCardIconInteractionConfig;

  // Group Props
  /** Configuration for card groups */
  groupConfig?: BCardIconGroupConfig;

  // Accessibility Props
  /** Accessibility configuration */
  accessibilityConfig?: BCardIconAccessibilityConfig;

  // Loading Props
  /** Loading state configuration */
  loadingConfig?: BCardIconLoadingConfig;

  // Content Props
  /** Description for complex card content */
  description?: string;
  /** Summary text for screen readers */
  summary?: string;
  /** Context information for the card */
  context?: string;

  // Advanced Props
  /** Whether card can be focused */
  focusable?: boolean;
  /** Tab index override */
  tabIndex?: number;
  /** Whether card is expandable */
  expandable?: boolean;
  /** Whether card is expanded */
  expanded?: boolean;
  /** Custom data attributes */
  dataAttributes?: Record<string, string>;
}

/**
 * Events emitted by the BCardIcon component
 */
export interface BCardIconEmits {
  /** Card click event */
  'click': [event: MouseEvent];
  /** Card keyboard event */
  'keydown': [event: KeyboardEvent];
  /** Card focus event */
  'focus': [event: FocusEvent];
  /** Card blur event */
  'blur': [event: FocusEvent];
  /** Card selection change */
  'select': [selected: boolean];
  /** Card interaction event */
  'interact': [type: BCardIconInteractionType, event: Event];
  /** Card activation event */
  'activate': [event: Event];
  /** Card loading state change */
  'loading-state-change': [state: BCardIconLoadingState];
  /** Card expansion change */
  'expand': [expanded: boolean];
  /** Custom action event */
  'action': [action: string, data?: any];
}

/**
 * Slots available in BCardIcon component
 */
export interface BCardIconSlots {
  /** Default slot for card content */
  default: () => any;
  /** Title actions slot */
  'title-actions': () => any;
  /** Icon slot for custom icon content */
  icon: () => any;
  /** Loading state slot */
  loading: () => any;
  /** Error state slot */
  error: () => any;
  /** Footer slot for additional actions */
  footer: () => any;
}

/**
 * Card icon context for child components
 */
export interface BCardIconContext {
  /** Card ID */
  cardId: string;
  /** Whether card is interactive */
  interactive: boolean;
  /** Whether card is disabled */
  disabled: boolean;
  /** Whether card is selected */
  selected: boolean;
  /** Current loading state */
  loadingState: BCardIconLoadingState;
  /** Announce message to screen readers */
  announceMessage: (message: string, assertive?: boolean) => void;
  /** Focus the card */
  focusCard: () => void;
}

/**
 * Accessibility test helpers
 */
export interface BCardIconA11yHelpers {
  /** Check if card has proper ARIA attributes */
  hasValidAria: () => boolean;
  /** Check if card is keyboard accessible */
  isKeyboardAccessible: () => boolean;
  /** Check if icon has proper accessibility attributes */
  hasAccessibleIcon: () => boolean;
  /** Check if card has proper focus management */
  hasFocusManagement: () => boolean;
  /** Check if card announces state changes */
  announcesStateChanges: () => boolean;
  /** Simulate keyboard interaction */
  simulateKeyboard: (key: BCardIconNavigationKey) => void;
  /** Get all focusable elements in card */
  getFocusableElements: () => HTMLElement[];
  /** Check touch target size compliance */
  hasValidTouchTargets: () => boolean;
}

/**
 * Default configuration values
 */
export const CARD_ICON_DEFAULTS = {
  size: 'medium' as BCardIconSize,
  variant: 'default' as BCardIconVariant,
  iconSemantic: 'informative' as BCardIconSemantic,
  interactionType: 'none' as BCardIconInteractionType,
  loadingState: 'idle' as BCardIconLoadingState,
  minTouchTarget: 44, // WCAG AA minimum
  liveRegionPoliteness: 'polite' as const,
  loadingMessage: 'Loading card content',
  successMessage: 'Card content loaded successfully',
  errorMessage: 'Error loading card content'
} as const;

/**
 * Card icon accessibility utilities
 */
export const cardIconA11yUtils = {
  /**
   * Generate appropriate ARIA label for card icon
   */
  generateCardLabel: (title?: string, context?: string, selected?: boolean, disabled?: boolean): string => {
    const parts: string[] = [];
    
    if (title) parts.push(title);
    if (context) parts.push(context);
    if (selected) parts.push('selected');
    if (disabled) parts.push('disabled');
    
    return parts.join(', ');
  },

  /**
   * Determine appropriate role for card icon
   */
  determineRole: (interactive: boolean, expandable: boolean, interactionType: BCardIconInteractionType): string => {
    if (interactionType === 'button' || (interactive && !expandable)) return 'button';
    if (interactionType === 'link') return 'link';
    if (interactionType === 'toggle') return 'button';
    if (interactionType === 'selectable') return 'option';
    if (expandable) return 'button';
    return 'article';
  },

  /**
   * Generate icon accessibility attributes
   */
  generateIconAttributes: (
    iconConfig?: BCardIconIconConfig,
    cardTitle?: string
  ): { role?: string; 'aria-label'?: string; 'aria-hidden'?: string } => {
    if (iconConfig?.iconDecorative || iconConfig?.iconSemantic === 'decorative') {
      return { 'aria-hidden': 'true' };
    }

    const label = iconConfig?.iconAriaLabel || 
                 iconConfig?.iconAlt || 
                 (cardTitle ? `${cardTitle} icon` : 'Icon');

    return {
      role: iconConfig?.iconRole || 'img',
      'aria-label': label
    };
  },

  /**
   * Validate touch target size
   */
  validateTouchTarget: (element: HTMLElement, minSize: number = 44): boolean => {
    const rect = element.getBoundingClientRect();
    return rect.width >= minSize && rect.height >= minSize;
  }
};