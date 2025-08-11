/**
 * BTooltip accessibility props interface
 * Implements WCAG 2.1 AA standards for tooltip components
 */
export interface BTooltipAccessibilityProps {
  /** Whether tooltip content is essential for screen readers (uses aria-describedby) */
  essential?: boolean;
  /** Custom ARIA label for the tooltip trigger element */
  ariaLabel?: string;
  /** Additional ARIA described by IDs */
  ariaDescribedBy?: string;
  /** Custom role for the tooltip (default: 'tooltip') */
  role?: BTooltipRole;
  /** Whether to announce tooltip content to screen readers */
  announceContent?: boolean;
  /** Politeness level for screen reader announcements */
  announcePoliteness?: 'polite' | 'assertive';
  /** Whether tooltip can be dismissed with Escape key */
  dismissible?: boolean;
  /** Whether to provide keyboard navigation instructions */
  provideKeyboardInstructions?: boolean;
  /** Custom keyboard instructions text */
  keyboardInstructions?: string;
  /** Whether to announce tooltip visibility changes */
  announceVisibilityChanges?: boolean;
  /** Custom announcement delay in milliseconds */
  announcementDelay?: number;
  /** High contrast mode support */
  highContrast?: boolean;
  /** Reduced motion support */
  reduceMotion?: boolean;
  /** Whether to use enhanced focus management */
  enhancedFocus?: boolean;
  /** Minimum touch target size (default 44px) */
  minTouchTarget?: boolean;
  /** Screen reader instructions for interaction */
  screenReaderInstructions?: string;
  /** Live region politeness level for announcements */
  liveRegionPoliteness?: 'polite' | 'assertive';
  /** Whether tooltip supports keyboard navigation */
  keyboardNavigation?: boolean;
  /** Whether to show focus indicators */
  showFocusIndicator?: boolean;
  /** Context description for complex tooltips */
  contextDescription?: string;
  /** Whether tooltip content is decorative only */
  decorativeOnly?: boolean;
  /** Whether tooltip provides help information */
  providesHelp?: boolean;
  /** Whether tooltip provides error information */
  providesError?: boolean;
}

/**
 * Tooltip positioning options
 */
export type BTooltipPosition = 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end' | 'auto';

/**
 * Tooltip trigger behavior options
 */
export type BTooltipTrigger = 'hover' | 'focus' | 'click' | 'manual' | 'longpress';

/**
 * Tooltip role types for accessibility
 */
export type BTooltipRole = 'tooltip' | 'status' | 'alert' | 'description' | 'label';

/**
 * Tooltip size variants
 */
export type BTooltipSize = 'small' | 'medium' | 'large' | 'auto';

/**
 * Tooltip visual variants
 */
export type BTooltipVariant = 'default' | 'dark' | 'light' | 'primary' | 'success' | 'warning' | 'error' | 'info';

/**
 * Tooltip animation types
 */
export type BTooltipAnimationType = 'fade' | 'slide' | 'scale' | 'none';

/**
 * Tooltip placement strategy
 */
export type BTooltipPlacementStrategy = 'absolute' | 'fixed' | 'viewport';

/**
 * Tooltip state interface for accessibility
 */
export interface BTooltipState {
  /** Whether tooltip is currently visible */
  isVisible: boolean;
  /** Whether tooltip is animating */
  isAnimating: boolean;
  /** Whether trigger is hovered */
  isHovering: boolean;
  /** Whether trigger is focused */
  isFocused: boolean;
  /** Whether trigger is clicked */
  isClicked: boolean;
  /** Whether tooltip is disabled */
  isDisabled: boolean;
  /** Current position of tooltip */
  position: BTooltipPosition;
  /** Current trigger that activated tooltip */
  activeTrigger: BTooltipTrigger | null;
  /** Whether keyboard navigation mode is active */
  keyboardMode: boolean;
  /** Whether tooltip has essential content */
  hasEssentialContent: boolean;
  /** Whether tooltip content has been announced */
  hasBeenAnnounced: boolean;
  /** Auto-hide timer ID */
  autoHideTimer: number | null;
  /** Show delay timer ID */
  showTimer: number | null;
  /** Hide delay timer ID */
  hideTimer: number | null;
  /** Whether high contrast mode is active */
  isHighContrast: boolean;
  /** Whether animations are disabled */
  isReducedMotion: boolean;
  /** Last announced message to prevent duplicates */
  lastAnnouncedMessage: string | null;
}

/**
 * Tooltip ARIA attributes interface
 */
export interface BTooltipAriaAttributes {
  /** ARIA role for the tooltip */
  role: BTooltipRole;
  /** ARIA label for the tooltip */
  'aria-label'?: string;
  /** ARIA labelledby for complex labeling */
  'aria-labelledby'?: string;
  /** ARIA describedby for additional description */
  'aria-describedby'?: string;
  /** ARIA hidden state */
  'aria-hidden'?: boolean;
  /** ARIA live region for announcements */
  'aria-live'?: 'off' | 'polite' | 'assertive';
  /** ARIA atomic for live region updates */
  'aria-atomic'?: boolean;
  /** ARIA expanded for expandable tooltips */
  'aria-expanded'?: boolean;
  /** ARIA controls for what the tooltip controls */
  'aria-controls'?: string;
  /** ARIA owns for ownership relationships */
  'aria-owns'?: string;
}

/**
 * Tooltip trigger ARIA attributes interface
 */
export interface BTooltipTriggerAriaAttributes {
  /** ARIA label for the trigger */
  'aria-label'?: string;
  /** ARIA labelledby for complex labeling */
  'aria-labelledby'?: string;
  /** ARIA describedby for tooltip reference */
  'aria-describedby'?: string;
  /** ARIA expanded for tooltip state */
  'aria-expanded'?: boolean;
  /** ARIA haspopup for tooltip indication */
  'aria-haspopup'?: boolean | 'dialog' | 'menu';
  /** Tab index for keyboard navigation */
  tabindex?: number;
}

/**
 * Tooltip timing configuration
 */
export interface BTooltipTimingConfig {
  /** Delay before showing tooltip (milliseconds) */
  showDelay?: number;
  /** Delay before hiding tooltip (milliseconds) */
  hideDelay?: number;
  /** Maximum time to show tooltip before auto-hide (0 = no auto-hide) */
  maxShowTime?: number;
  /** Minimum time tooltip must be visible */
  minShowTime?: number;
  /** Debounce delay for rapid show/hide */
  debounceDelay?: number;
  /** Animation duration in milliseconds */
  animationDuration?: number;
}

/**
 * Tooltip keyboard configuration
 */
export interface BTooltipKeyboardConfig {
  /** Whether keyboard navigation is enabled */
  enabled?: boolean;
  /** Keys for showing tooltip */
  showKeys?: string[];
  /** Keys for hiding tooltip */
  hideKeys?: string[];
  /** Keys for dismissing tooltip */
  dismissKeys?: string[];
  /** Whether to prevent default keyboard behavior */
  preventDefault?: boolean;
  /** Whether to stop keyboard event propagation */
  stopPropagation?: boolean;
  /** Custom key handlers */
  customHandlers?: Record<string, (event: KeyboardEvent) => void>;
  /** Whether to trap focus within tooltip */
  trapFocus?: boolean;
}

/**
 * Tooltip positioning configuration
 */
export interface BTooltipPositioningConfig {
  /** Preferred position */
  position?: BTooltipPosition;
  /** Fallback positions in order of preference */
  fallbacks?: BTooltipPosition[];
  /** Offset from trigger element */
  offset?: number;
  /** Whether to flip position if doesn't fit */
  flip?: boolean;
  /** Boundary element for positioning */
  boundary?: HTMLElement | string;
  /** Placement strategy */
  strategy?: BTooltipPlacementStrategy;
  /** Whether to adjust position for viewport */
  adjustForViewport?: boolean;
}

/**
 * Tooltip content configuration
 */
export interface BTooltipContentConfig {
  /** Maximum width of tooltip */
  maxWidth?: number | string;
  /** Maximum height of tooltip */
  maxHeight?: number | string;
  /** Whether to wrap long text */
  wordWrap?: boolean;
  /** Text alignment */
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  /** Whether to allow HTML content */
  allowHtml?: boolean;
  /** Whether content is rich text */
  richText?: boolean;
}

/**
 * Tooltip event data interfaces
 */
export interface BTooltipShowEvent {
  /** Whether tooltip is visible */
  visible: boolean;
  /** Trigger that caused the show */
  trigger: BTooltipTrigger;
  /** Tooltip state */
  state: BTooltipState;
  /** Event source */
  source: Event | null;
}

export interface BTooltipHideEvent {
  /** Whether tooltip is visible */
  visible: boolean;
  /** Reason for hiding */
  reason: 'blur' | 'click' | 'escape' | 'timeout' | 'scroll' | 'manual';
  /** Tooltip state */
  state: BTooltipState;
  /** Event source */
  source: Event | null;
}

export interface BTooltipFocusEvent {
  /** Focus event */
  event: FocusEvent;
  /** Tooltip state */
  state: BTooltipState;
  /** Event type */
  type: 'focus' | 'blur';
}

export interface BTooltipKeyboardEvent {
  /** Keyboard event */
  event: KeyboardEvent;
  /** Tooltip state */
  state: BTooltipState;
  /** Whether action was handled */
  handled: boolean;
}

/**
 * Complete BTooltip props interface
 */
export interface BTooltipProps extends BTooltipAccessibilityProps {
  /** Tooltip text content */
  text?: string;
  /** Position of the tooltip relative to the trigger */
  position?: BTooltipPosition;
  /** How the tooltip should be triggered */
  trigger?: BTooltipTrigger | BTooltipTrigger[];
  /** Whether the tooltip should be triggered by focus (keyboard accessible) */
  focusable?: boolean;
  /** Whether to show tooltip on hover */
  showOnHover?: boolean;
  /** Whether to show tooltip on focus */
  showOnFocus?: boolean;
  /** Whether to show tooltip on click */
  showOnClick?: boolean;
  /** Whether to show tooltip on long press (mobile) */
  showOnLongPress?: boolean;
  /** Timing configuration for tooltip display */
  timing?: BTooltipTimingConfig;
  /** Delay before showing tooltip (milliseconds) - shorthand for timing.showDelay */
  showDelay?: number;
  /** Delay before hiding tooltip (milliseconds) - shorthand for timing.hideDelay */
  hideDelay?: number;
  /** Custom ID for the tooltip */
  tooltipId?: string;
  /** Whether tooltip can be dismissed with Escape key */
  dismissible?: boolean;
  /** Whether to respect user's reduced motion preference */
  respectsReducedMotion?: boolean;
  /** Whether tooltip should be persistent (not auto-hide on scroll/resize) */
  persistent?: boolean;
  /** Custom CSS classes for the tooltip */
  tooltipClass?: string | string[];
  /** Whether tooltip is disabled */
  disabled?: boolean;
  /** Tooltip size variant */
  size?: BTooltipSize;
  /** Tooltip visual variant */
  variant?: BTooltipVariant;
  /** Animation type */
  animationType?: BTooltipAnimationType;
  /** Whether to show arrow/pointer */
  showArrow?: boolean;
  /** Custom arrow size */
  arrowSize?: number;
  /** Z-index for tooltip positioning */
  zIndex?: number;
  /** HTML id attribute */
  id?: string;
  /** Additional CSS classes */
  class?: string;
  /** Inline styles */
  style?: string | Record<string, any>;
  /** Keyboard navigation configuration */
  keyboardConfig?: BTooltipKeyboardConfig;
  /** Positioning configuration */
  positioningConfig?: BTooltipPositioningConfig;
  /** Content configuration */
  contentConfig?: BTooltipContentConfig;
  /** Whether tooltip is interactive */
  interactive?: boolean;
  /** Whether tooltip can be hovered */
  hoverable?: boolean;
  /** Custom renderer function */
  renderer?: (props: BTooltipProps, state: BTooltipState) => any;
}

/**
 * BTooltip emits interface
 */
export interface BTooltipEmits {
  /** Tooltip shown */
  'tooltip-show': [event: BTooltipShowEvent];
  /** Tooltip hidden */
  'tooltip-hide': [event: BTooltipHideEvent];
  /** Tooltip focused */
  'tooltip-focus': [event: BTooltipFocusEvent];
  /** Tooltip blurred */
  'tooltip-blur': [event: BTooltipFocusEvent];
  /** Escape key pressed */
  'tooltip-escape': [event: BTooltipKeyboardEvent];
  /** Position changed */
  'position-change': [oldPosition: BTooltipPosition, newPosition: BTooltipPosition];
  /** Content changed */
  'content-change': [newContent: string, oldContent: string];
  /** Animation started */
  'animation-start': [type: BTooltipAnimationType];
  /** Animation ended */
  'animation-end': [type: BTooltipAnimationType];
  /** Accessibility event */
  'accessibility': [type: string, data: any];
  /** Keyboard navigation event */
  'keydown': [event: BTooltipKeyboardEvent];
}

/**
 * Tooltip validation result
 */
export interface BTooltipValidationResult {
  /** Whether validation passes */
  isValid: boolean;
  /** Error messages */
  errors: string[];
  /** Warning messages */
  warnings: string[];
  /** Tooltip configuration */
  config?: BTooltipProps;
}

/**
 * Tooltip announcement templates
 */
export interface BTooltipAnnouncementTemplates {
  /** Template for tooltip shown announcement */
  tooltipShown: string;
  /** Template for tooltip hidden announcement */
  tooltipHidden: string;
  /** Template for essential content announcement */
  essentialContent: string;
  /** Template for help content announcement */
  helpContent: string;
  /** Template for error content announcement */
  errorContent: string;
  /** Template for keyboard instructions */
  keyboardInstructions: string;
  /** Template for dismissal instructions */
  dismissalInstructions: string;
  /** Template for position change announcement */
  positionChange: string;
  /** Template for interactive tooltip announcement */
  interactiveTooltip: string;
  /** Template for timeout warning */
  timeoutWarning: string;
}

/**
 * Tooltip theme configuration
 */
export interface BTooltipThemeConfig {
  /** Background color */
  backgroundColor?: string;
  /** Text color */
  textColor?: string;
  /** Border color */
  borderColor?: string;
  /** Arrow color */
  arrowColor?: string;
  /** Shadow color */
  shadowColor?: string;
  /** Focus ring color */
  focusRingColor?: string;
  /** Maximum width */
  maxWidth?: string;
  /** Padding */
  padding?: string;
  /** Border radius */
  borderRadius?: string;
  /** Font size */
  fontSize?: string;
  /** Font weight */
  fontWeight?: string;
  /** Line height */
  lineHeight?: string;
  /** Z-index */
  zIndex?: number;
}

/**
 * Tooltip accessibility helpers
 */
export interface BTooltipAccessibilityHelpers {
  /** Get ARIA attributes for tooltip */
  getTooltipAriaAttributes: (state: BTooltipState, props: BTooltipProps) => BTooltipAriaAttributes;
  /** Get ARIA attributes for trigger */
  getTriggerAriaAttributes: (state: BTooltipState, props: BTooltipProps) => BTooltipTriggerAriaAttributes;
  /** Format tooltip announcement */
  formatTooltipAnnouncement: (content: string, role: BTooltipRole) => string;
  /** Check if announcement should be made */
  shouldAnnounce: (message: string, lastMessage: string | null) => boolean;
  /** Get keyboard instructions */
  getKeyboardInstructions: (triggers: BTooltipTrigger[], features: string[]) => string;
  /** Get appropriate role for tooltip */
  getSemanticRole: (content: string, context: string) => BTooltipRole;
  /** Announce tooltip state change */
  announceTooltipStateChange: (visible: boolean, content: string, props: BTooltipProps) => void;
  /** Validate tooltip accessibility */
  validateAccessibility: (props: BTooltipProps) => BTooltipValidationResult;
  /** Check if content is essential */
  isContentEssential: (content: string, context: string) => boolean;
}

/**
 * Default configurations
 */
export const DEFAULT_TOOLTIP_KEYBOARD_CONFIG: Required<BTooltipKeyboardConfig> = {
  enabled: true,
  showKeys: ['Enter', ' '],
  hideKeys: ['Escape'],
  dismissKeys: ['Escape'],
  preventDefault: true,
  stopPropagation: false,
  customHandlers: {},
  trapFocus: false,
};

export const DEFAULT_TOOLTIP_ACCESSIBILITY_CONFIG: Required<BTooltipAccessibilityProps> = {
  essential: false,
  ariaLabel: '',
  ariaDescribedBy: '',
  role: 'tooltip',
  announceContent: false,
  announcePoliteness: 'polite',
  dismissible: true,
  provideKeyboardInstructions: false,
  keyboardInstructions: 'Press Escape to close tooltip',
  announceVisibilityChanges: false,
  announcementDelay: 0,
  highContrast: false,
  reduceMotion: false,
  enhancedFocus: true,
  minTouchTarget: true,
  screenReaderInstructions: 'Tooltip available, press Enter to show',
  liveRegionPoliteness: 'polite',
  keyboardNavigation: true,
  showFocusIndicator: true,
  contextDescription: '',
  decorativeOnly: false,
  providesHelp: false,
  providesError: false,
};

export const DEFAULT_TOOLTIP_TIMING_CONFIG: Required<BTooltipTimingConfig> = {
  showDelay: 500,
  hideDelay: 200,
  maxShowTime: 0,
  minShowTime: 0,
  debounceDelay: 100,
  animationDuration: 300,
};

export const DEFAULT_TOOLTIP_POSITIONING_CONFIG: Required<BTooltipPositioningConfig> = {
  position: 'top',
  fallbacks: ['bottom', 'left', 'right'],
  offset: 8,
  flip: true,
  boundary: undefined,
  strategy: 'absolute',
  adjustForViewport: true,
};

export const DEFAULT_TOOLTIP_CONTENT_CONFIG: Required<BTooltipContentConfig> = {
  maxWidth: 300,
  maxHeight: 0,
  wordWrap: true,
  textAlign: 'left',
  allowHtml: false,
  richText: false,
};

export const DEFAULT_TOOLTIP_ANNOUNCEMENTS: Required<BTooltipAnnouncementTemplates> = {
  tooltipShown: 'Tooltip shown: {content}',
  tooltipHidden: 'Tooltip hidden',
  essentialContent: 'Important: {content}',
  helpContent: 'Help: {content}',
  errorContent: 'Error: {content}',
  keyboardInstructions: 'Use Enter to show tooltip, Escape to hide',
  dismissalInstructions: 'Press Escape to close this tooltip',
  positionChange: 'Tooltip moved to {position}',
  interactiveTooltip: 'Interactive tooltip available',
  timeoutWarning: 'Tooltip will close in {seconds} seconds',
};

/**
 * Tooltip interaction patterns
 */
export const TOOLTIP_INTERACTION_PATTERNS = {
  /** Informational tooltip */
  INFORMATIONAL: 'informational',
  /** Help tooltip */
  HELP: 'help',
  /** Error tooltip */
  ERROR: 'error',
  /** Definition tooltip */
  DEFINITION: 'definition',
  /** Status tooltip */
  STATUS: 'status',
  /** Interactive tooltip */
  INTERACTIVE: 'interactive',
} as const;

/**
 * Tooltip semantic contexts
 */
export const TOOLTIP_SEMANTIC_CONTEXTS = {
  /** Additional information */
  DESCRIPTION: 'description',
  /** Form help text */
  FORM_HELP: 'form-help',
  /** Error message */
  ERROR_MESSAGE: 'error-message',
  /** Status indicator */
  STATUS_INDICATOR: 'status-indicator',
  /** Navigation aid */
  NAVIGATION_AID: 'navigation-aid',
  /** Content preview */
  PREVIEW: 'preview',
} as const;

/**
 * Keyboard navigation key mappings
 */
export const TOOLTIP_KEY_MAPPINGS: Record<string, {
  action: string;
  description: string;
  context?: string;
}> = {
  Enter: { action: 'show', description: 'Show tooltip' },
  Space: { action: 'show', description: 'Show tooltip' },
  Escape: { action: 'hide', description: 'Hide tooltip' },
  Tab: { action: 'next', description: 'Move to next element' },
  'Shift+Tab': { action: 'previous', description: 'Move to previous element' },
  'Control+?': { action: 'help', description: 'Show help tooltip', context: 'help' },
};

/**
 * Tooltip position configurations
 */
export const TOOLTIP_POSITION_CONFIG: Record<BTooltipPosition, {
  arrowPosition: string;
  transformOrigin: string;
  preferredFallbacks: BTooltipPosition[];
}> = {
  top: {
    arrowPosition: 'bottom',
    transformOrigin: 'bottom center',
    preferredFallbacks: ['bottom', 'left', 'right'],
  },
  bottom: {
    arrowPosition: 'top',
    transformOrigin: 'top center',
    preferredFallbacks: ['top', 'left', 'right'],
  },
  left: {
    arrowPosition: 'right',
    transformOrigin: 'right center',
    preferredFallbacks: ['right', 'top', 'bottom'],
  },
  right: {
    arrowPosition: 'left',
    transformOrigin: 'left center',
    preferredFallbacks: ['left', 'top', 'bottom'],
  },
  'top-start': {
    arrowPosition: 'bottom-left',
    transformOrigin: 'bottom left',
    preferredFallbacks: ['bottom-start', 'top', 'left'],
  },
  'top-end': {
    arrowPosition: 'bottom-right',
    transformOrigin: 'bottom right',
    preferredFallbacks: ['bottom-end', 'top', 'right'],
  },
  'bottom-start': {
    arrowPosition: 'top-left',
    transformOrigin: 'top left',
    preferredFallbacks: ['top-start', 'bottom', 'left'],
  },
  'bottom-end': {
    arrowPosition: 'top-right',
    transformOrigin: 'top right',
    preferredFallbacks: ['top-end', 'bottom', 'right'],
  },
  'left-start': {
    arrowPosition: 'right-top',
    transformOrigin: 'right top',
    preferredFallbacks: ['right-start', 'left', 'top'],
  },
  'left-end': {
    arrowPosition: 'right-bottom',
    transformOrigin: 'right bottom',
    preferredFallbacks: ['right-end', 'left', 'bottom'],
  },
  'right-start': {
    arrowPosition: 'left-top',
    transformOrigin: 'left top',
    preferredFallbacks: ['left-start', 'right', 'top'],
  },
  'right-end': {
    arrowPosition: 'left-bottom',
    transformOrigin: 'left bottom',
    preferredFallbacks: ['left-end', 'right', 'bottom'],
  },
  auto: {
    arrowPosition: 'auto',
    transformOrigin: 'center',
    preferredFallbacks: ['top', 'bottom', 'left', 'right'],
  },
};

/**
 * Tooltip role configurations
 */
export const TOOLTIP_ROLE_CONFIG: Record<BTooltipRole, {
  semanticMeaning: string;
  ariaLive?: 'polite' | 'assertive';
  essential?: boolean;
}> = {
  tooltip: {
    semanticMeaning: 'Additional information',
    essential: false,
  },
  status: {
    semanticMeaning: 'Status information',
    ariaLive: 'polite',
    essential: true,
  },
  alert: {
    semanticMeaning: 'Important alert information',
    ariaLive: 'assertive',
    essential: true,
  },
  description: {
    semanticMeaning: 'Descriptive content',
    essential: true,
  },
  label: {
    semanticMeaning: 'Label information',
    essential: true,
  },
};

/**
 * Export all types for easy importing
 */
export type {
  BTooltipAccessibilityProps as AccessibilityProps,
  BTooltipProps as Props,
  BTooltipState as State,
  BTooltipAriaAttributes as AriaAttributes,
  BTooltipTriggerAriaAttributes as TriggerAriaAttributes,
  BTooltipKeyboardConfig as KeyboardConfig,
  BTooltipTimingConfig as TimingConfig,
  BTooltipPositioningConfig as PositioningConfig,
  BTooltipContentConfig as ContentConfig,
  BTooltipShowEvent as ShowEvent,
  BTooltipHideEvent as HideEvent,
  BTooltipFocusEvent as FocusEvent,
  BTooltipKeyboardEvent as KeyboardEvent,
  BTooltipEmits as Emits,
  BTooltipValidationResult as ValidationResult,
  BTooltipAnnouncementTemplates as AnnouncementTemplates,
  BTooltipThemeConfig as ThemeConfig,
  BTooltipAccessibilityHelpers as AccessibilityHelpers,
};