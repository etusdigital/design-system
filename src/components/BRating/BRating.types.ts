/**
 * BRating accessibility props interface
 * Implements WCAG 2.1 AA standards for rating components
 */
export interface BRatingAccessibilityProps {
  /** ARIA label for the rating */
  ariaLabel?: string;
  /** ID of element that labels this rating */
  ariaLabelledBy?: string;
  /** ID of element that describes this rating */
  ariaDescribedBy?: string;
  /** Additional description for screen readers */
  ariaDescription?: string;
  /** Whether to announce rating changes to screen readers */
  announceChanges?: boolean;
  /** Custom error announcement message */
  customErrorAnnouncement?: string;
  /** Custom success announcement message */
  customSuccessAnnouncement?: string;
  /** Help text for rating interactions */
  helpText?: string;
  /** Whether the rating is part of a group */
  groupRole?: 'group' | 'radiogroup' | 'listbox' | undefined;
  /** ARIA expanded state for ratings with additional info */
  ariaExpanded?: boolean;
  /** ARIA controls reference for associated elements */
  ariaControls?: string;
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
  /** Whether rating supports keyboard navigation */
  keyboardNavigation?: boolean;
  /** Whether to show focus indicators */
  showFocusIndicator?: boolean;
  /** Whether to announce individual star focus */
  announceStarFocus?: boolean;
  /** Whether to announce rating validation changes */
  announceValidation?: boolean;
  /** Custom rating format for screen readers */
  ratingFormat?: string;
  /** Custom empty star announcement */
  emptyStarAnnouncement?: string;
  /** Custom filled star announcement */
  filledStarAnnouncement?: string;
  /** Custom half star announcement */
  halfStarAnnouncement?: string;
}

/**
 * Rating icon types
 */
export type BRatingIcon = 'star' | 'heart' | 'thumbs-up' | 'circle' | 'square' | 'diamond' | 'custom';

/**
 * Rating size variants
 */
export type BRatingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Rating validation states
 */
export type BRatingValidationState = 'valid' | 'invalid' | 'pending' | 'none';

/**
 * Rating color themes
 */
export type BRatingColorTheme = 'default' | 'warning' | 'success' | 'error' | 'info' | 'custom';

/**
 * Rating precision modes
 */
export type BRatingPrecision = 'full' | 'half' | 'quarter';

/**
 * Rating interaction modes
 */
export type BRatingInteractionMode = 'click' | 'hover' | 'keyboard' | 'api' | 'disabled';

/**
 * Rating display modes
 */
export type BRatingDisplayMode = 'interactive' | 'readonly' | 'display';

/**
 * Rating value type
 */
export type BRatingValue = number;

/**
 * Rating state interface for accessibility
 */
export interface BRatingState {
  /** Current rating value */
  value: BRatingValue;
  /** Previous rating value */
  previousValue: BRatingValue;
  /** Currently focused star index */
  focusedIndex: number;
  /** Currently hovered star index */
  hoveredIndex: number;
  /** Whether rating has focus */
  hasFocus: boolean;
  /** Whether user is interacting with rating */
  isInteracting: boolean;
  /** Current interaction mode */
  interactionMode: BRatingInteractionMode;
  /** Whether keyboard navigation mode is active */
  keyboardMode: boolean;
  /** Whether rating is disabled */
  isDisabled: boolean;
  /** Whether rating is readonly */
  isReadonly: boolean;
  /** Whether rating is loading */
  isLoading: boolean;
  /** Whether rating has error */
  hasError: boolean;
  /** Current validation state */
  validationState: BRatingValidationState;
  /** Validation message */
  validationMessage: string;
  /** Whether rating is required */
  isRequired: boolean;
  /** Whether high contrast mode is active */
  isHighContrast: boolean;
  /** Whether animations are disabled */
  isReducedMotion: boolean;
  /** Last announced message to prevent duplicates */
  lastAnnouncedMessage: string | null;
  /** Maximum rating value */
  maxRating: number;
  /** Rating precision */
  precision: BRatingPrecision;
  /** Whether to show value text */
  showValue: boolean;
}

/**
 * Rating ARIA attributes interface
 */
export interface BRatingAriaAttributes {
  /** Unique ID for the rating */
  id: string;
  /** ARIA role (slider for interactive, img for readonly) */
  role: 'slider' | 'img' | 'group';
  /** ARIA label */
  'aria-label'?: string;
  /** ARIA labelled by relationships */
  'aria-labelledby'?: string;
  /** ARIA described by relationships */
  'aria-describedby'?: string;
  /** ARIA value now */
  'aria-valuenow'?: number;
  /** ARIA value min */
  'aria-valuemin'?: number;
  /** ARIA value max */
  'aria-valuemax'?: number;
  /** ARIA value text */
  'aria-valuetext'?: string;
  /** ARIA invalid state */
  'aria-invalid'?: boolean;
  /** ARIA required state */
  'aria-required'?: boolean;
  /** ARIA busy state for loading */
  'aria-busy'?: boolean;
  /** ARIA readonly state */
  'aria-readonly'?: boolean;
  /** ARIA disabled state */
  'aria-disabled'?: boolean;
  /** ARIA orientation */
  'aria-orientation'?: 'horizontal' | 'vertical';
  /** Tab index for keyboard navigation */
  tabindex?: number;
}

/**
 * Rating keyboard configuration
 */
export interface BRatingKeyboardConfig {
  /** Whether keyboard navigation is enabled */
  enabled?: boolean;
  /** Keys for increasing rating */
  increaseKeys?: string[];
  /** Keys for decreasing rating */
  decreaseKeys?: string[];
  /** Keys for selecting current rating */
  selectKeys?: string[];
  /** Keys for clearing rating */
  clearKeys?: string[];
  /** Keys for maximum rating */
  maxKeys?: string[];
  /** Keys for minimum rating */
  minKeys?: string[];
  /** Number keys for direct rating selection */
  numberKeys?: boolean;
  /** Whether to prevent default keyboard behavior */
  preventDefault?: boolean;
  /** Whether to stop keyboard event propagation */
  stopPropagation?: boolean;
  /** Custom keyboard shortcuts */
  shortcuts?: Record<string, () => void>;
  /** Whether to enable arrow key navigation */
  arrowNavigation?: boolean;
  /** Whether to enable home/end key navigation */
  homeEndNavigation?: boolean;
}

/**
 * Rating validation configuration
 */
export interface BRatingValidationConfig {
  /** Whether validation is enabled */
  enabled?: boolean;
  /** Validation mode */
  mode?: 'onChange' | 'onBlur' | 'onSubmit' | 'realtime';
  /** Custom validation function */
  validator?: (value: BRatingValue) => boolean | string;
  /** Debounce time for real-time validation */
  debounceTime?: number;
  /** Whether to show validation feedback */
  showFeedback?: boolean;
  /** Whether to announce validation changes */
  announceChanges?: boolean;
  /** Custom validation messages */
  messages?: {
    required?: string;
    min?: string;
    max?: string;
    invalid?: string;
  };
}

/**
 * Rating theme configuration
 */
export interface BRatingThemeConfig {
  /** Empty star color */
  emptyColor?: string;
  /** Filled star color */
  filledColor?: string;
  /** Half-filled star color */
  halfFilledColor?: string;
  /** Hover color */
  hoverColor?: string;
  /** Focus color */
  focusColor?: string;
  /** Disabled color */
  disabledColor?: string;
  /** Error state color */
  errorColor?: string;
  /** Success state color */
  successColor?: string;
  /** Border color */
  borderColor?: string;
  /** Background color */
  backgroundColor?: string;
}

/**
 * Rating tooltip configuration
 */
export interface BRatingTooltipConfig {
  /** Whether tooltips are enabled */
  enabled?: boolean;
  /** Tooltip labels for each rating value */
  labels?: string[];
  /** Tooltip position */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** Tooltip delay in milliseconds */
  delay?: number;
  /** Whether to show tooltip on keyboard focus */
  showOnFocus?: boolean;
  /** Custom tooltip formatter */
  formatter?: (value: number, maxValue: number) => string;
}

/**
 * Complete BRating props interface
 */
export interface BRatingProps extends BRatingAccessibilityProps {
  /** Rating value */
  modelValue?: BRatingValue;
  /** Maximum rating value */
  max?: number;
  /** Minimum rating value */
  min?: number;
  /** Rating precision (full, half, quarter) */
  precision?: BRatingPrecision;
  /** Icon type for rating symbols */
  icon?: BRatingIcon;
  /** Custom icon name (when icon is 'custom') */
  customIcon?: string;
  /** Rating size variant */
  size?: BRatingSize;
  /** Color theme */
  colorTheme?: BRatingColorTheme;
  /** Display mode */
  displayMode?: BRatingDisplayMode;
  /** Whether the rating is disabled */
  disabled?: boolean;
  /** Whether the rating is readonly */
  readonly?: boolean;
  /** Whether the rating is required */
  required?: boolean;
  /** Whether the rating is loading */
  loading?: boolean;
  /** Error message to display */
  errorMessage?: string;
  /** Info message to display */
  infoMessage?: string;
  /** Success message to display */
  successMessage?: string;
  /** Whether to show the numeric value */
  showValue?: boolean;
  /** Whether to show rating labels/tooltips */
  showLabels?: boolean;
  /** Custom labels for each rating value */
  labels?: string[];
  /** Whether to allow clearing the rating */
  clearable?: boolean;
  /** Loading state for async operations */
  validationState?: BRatingValidationState;
  /** HTML id attribute */
  id?: string;
  /** Additional CSS classes */
  class?: string;
  /** Inline styles */
  style?: string | Record<string, any>;
  /** Keyboard navigation configuration */
  keyboardConfig?: BRatingKeyboardConfig;
  /** Validation configuration */
  validationConfig?: BRatingValidationConfig;
  /** Theme configuration */
  themeConfig?: BRatingThemeConfig;
  /** Tooltip configuration */
  tooltipConfig?: BRatingTooltipConfig;
  /** Custom rating attributes */
  ratingAttrs?: Record<string, any>;
  /** Whether to auto-focus on mount */
  autoFocus?: boolean;
  /** Whether to show empty stars */
  showEmptyStars?: boolean;
  /** Custom star spacing */
  spacing?: string;
  /** Whether rating is dense (no padding) */
  dense?: boolean;
  /** Custom value formatter */
  valueFormatter?: (value: number, max: number) => string;
}

/**
 * BRating emits interface
 */
export interface BRatingEmits {
  /** Model value updated */
  'update:modelValue': [value: BRatingValue];
  /** Rating value changed */
  'change': [value: BRatingValue, previousValue: BRatingValue];
  /** Rating focused */
  'focus': [event: FocusEvent];
  /** Rating blurred */
  'blur': [event: FocusEvent];
  /** Star hovered */
  'hover': [index: number, value: BRatingValue];
  /** Hover ended */
  'hover-end': [event: MouseEvent];
  /** Validation state changed */
  'validation-change': [state: BRatingValidationState, message?: string];
  /** Keyboard event */
  'keydown': [event: KeyboardEvent];
  /** Key up event */
  'keyup': [event: KeyboardEvent];
  /** Rating cleared */
  'clear': [];
  /** Star clicked */
  'star-click': [index: number, value: BRatingValue, event: MouseEvent];
  /** Rating completed (on max value) */
  'complete': [value: BRatingValue];
  /** Accessibility events */
  'accessibility': [type: string, data: any];
  /** Loading state change */
  'loading-change': [loading: boolean];
  /** Error state */
  'error': [message: string];
  /** Success state */
  'success': [message?: string];
}

/**
 * Rating validation result
 */
export interface BRatingValidationResult {
  /** Whether validation passes */
  isValid: boolean;
  /** Validation state */
  state: BRatingValidationState;
  /** Error messages */
  errors: string[];
  /** Warning messages */
  warnings: string[];
  /** Rating value that was validated */
  value?: BRatingValue;
}

/**
 * Rating announcement templates
 */
export interface BRatingAnnouncementTemplates {
  /** Template for rating change announcement */
  ratingChange: string;
  /** Template for star focus announcement */
  starFocus: string;
  /** Template for validation error announcement */
  validationError: string;
  /** Template for validation success announcement */
  validationSuccess: string;
  /** Template for rating cleared announcement */
  ratingCleared: string;
  /** Template for rating completed announcement */
  ratingCompleted: string;
  /** Template for star hover announcement */
  starHover: string;
  /** Template for keyboard instructions */
  keyboardInstructions: string;
  /** Template for loading state */
  loadingState: string;
  /** Template for readonly state */
  readonlyState: string;
}

/**
 * Rating accessibility helpers
 */
export interface BRatingAccessibilityHelpers {
  /** Get ARIA describedby relationships */
  getAriaDescribedBy: (props: BRatingProps, state: BRatingState) => string | undefined;
  /** Get appropriate ARIA role for rating */
  getAriaRole: (displayMode: BRatingDisplayMode) => 'slider' | 'img' | 'group';
  /** Announce rating change */
  announceRatingChange: (value: number, maxValue: number) => void;
  /** Announce star focus */
  announceStarFocus: (index: number, value: number, maxValue: number) => void;
  /** Get validation message for state */
  getValidationMessage: (state: BRatingValidationState, errorMessage?: string) => string;
  /** Format rating value for screen readers */
  formatRatingForScreenReader: (value: number, maxValue: number, precision: BRatingPrecision) => string;
  /** Get keyboard instructions */
  getKeyboardInstructions: (displayMode: BRatingDisplayMode, clearable: boolean) => string;
}

/**
 * Default configurations
 */
export const DEFAULT_RATING_KEYBOARD_CONFIG: Required<BRatingKeyboardConfig> = {
  enabled: true,
  increaseKeys: ['ArrowRight', 'ArrowUp'],
  decreaseKeys: ['ArrowLeft', 'ArrowDown'],
  selectKeys: ['Enter', ' '],
  clearKeys: ['Delete', 'Backspace'],
  maxKeys: ['End'],
  minKeys: ['Home'],
  numberKeys: true,
  preventDefault: true,
  stopPropagation: false,
  shortcuts: {},
  arrowNavigation: true,
  homeEndNavigation: true,
};

export const DEFAULT_RATING_ACCESSIBILITY_CONFIG: Required<BRatingAccessibilityProps> = {
  ariaLabel: '',
  ariaLabelledBy: '',
  ariaDescribedBy: '',
  ariaDescription: '',
  announceChanges: true,
  customErrorAnnouncement: '',
  customSuccessAnnouncement: '',
  helpText: '',
  groupRole: undefined,
  ariaExpanded: undefined,
  ariaControls: '',
  highContrast: false,
  reduceMotion: false,
  enhancedFocus: true,
  minTouchTarget: true,
  screenReaderInstructions: 'Use arrow keys to select rating, Enter to confirm, Delete to clear',
  liveRegionPoliteness: 'polite',
  keyboardNavigation: true,
  showFocusIndicator: true,
  announceStarFocus: false,
  announceValidation: true,
  ratingFormat: '{value} out of {max} stars',
  emptyStarAnnouncement: 'empty star',
  filledStarAnnouncement: 'filled star',
  halfStarAnnouncement: 'half filled star',
};

export const DEFAULT_RATING_VALIDATION_CONFIG: Required<BRatingValidationConfig> = {
  enabled: false,
  mode: 'onChange',
  validator: undefined,
  debounceTime: 300,
  showFeedback: true,
  announceChanges: true,
  messages: {
    required: 'Please provide a rating',
    min: 'Rating must be at least {min}',
    max: 'Rating cannot exceed {max}',
    invalid: 'Please provide a valid rating',
  },
};

export const DEFAULT_RATING_THEME_CONFIG: Required<BRatingThemeConfig> = {
  emptyColor: '#e5e7eb',
  filledColor: '#fbbf24',
  halfFilledColor: '#fbbf24',
  hoverColor: '#f59e0b',
  focusColor: '#3b82f6',
  disabledColor: '#9ca3af',
  errorColor: '#ef4444',
  successColor: '#10b981',
  borderColor: '#d1d5db',
  backgroundColor: 'transparent',
};

export const DEFAULT_RATING_TOOLTIP_CONFIG: Required<BRatingTooltipConfig> = {
  enabled: false,
  labels: [],
  position: 'top',
  delay: 500,
  showOnFocus: true,
  formatter: (value: number, maxValue: number) => `${value} out of ${maxValue}`,
};

export const DEFAULT_RATING_ANNOUNCEMENTS: Required<BRatingAnnouncementTemplates> = {
  ratingChange: 'Rating changed to {value} out of {max}',
  starFocus: 'Star {index}, {value} out of {max}',
  validationError: 'Rating error: {message}',
  validationSuccess: 'Rating is valid',
  ratingCleared: 'Rating cleared',
  ratingCompleted: 'Maximum rating of {max} selected',
  starHover: 'Hover: {value} out of {max}',
  keyboardInstructions: 'Use arrow keys to navigate, Enter to select, Delete to clear',
  loadingState: 'Rating is loading',
  readonlyState: 'Rating is {value} out of {max}, read-only',
};

/**
 * Rating icon configurations
 */
export const RATING_ICON_CONFIG: Record<BRatingIcon, {
  defaultIcon: string;
  filledIcon?: string;
  halfIcon?: string;
  ariaLabel: string;
}> = {
  star: {
    defaultIcon: 'star',
    filledIcon: 'star-filled',
    halfIcon: 'star-half',
    ariaLabel: 'star',
  },
  heart: {
    defaultIcon: 'heart',
    filledIcon: 'heart-filled',
    halfIcon: 'heart-half',
    ariaLabel: 'heart',
  },
  'thumbs-up': {
    defaultIcon: 'thumbs-up',
    filledIcon: 'thumbs-up-filled',
    ariaLabel: 'thumbs up',
  },
  circle: {
    defaultIcon: 'circle',
    filledIcon: 'circle-filled',
    halfIcon: 'circle-half',
    ariaLabel: 'circle',
  },
  square: {
    defaultIcon: 'square',
    filledIcon: 'square-filled',
    halfIcon: 'square-half',
    ariaLabel: 'square',
  },
  diamond: {
    defaultIcon: 'diamond',
    filledIcon: 'diamond-filled',
    halfIcon: 'diamond-half',
    ariaLabel: 'diamond',
  },
  custom: {
    defaultIcon: 'custom',
    ariaLabel: 'rating',
  },
};

/**
 * Rating size configurations with accessibility considerations
 */
export const RATING_SIZE_CONFIG: Record<BRatingSize, {
  iconSize: string;
  spacing: string;
  minTouchTarget: boolean;
  fontSize: string;
}> = {
  xs: {
    iconSize: '1rem',
    spacing: '0.125rem',
    minTouchTarget: true,
    fontSize: '0.75rem',
  },
  sm: {
    iconSize: '1.25rem',
    spacing: '0.25rem',
    minTouchTarget: true,
    fontSize: '0.875rem',
  },
  md: {
    iconSize: '1.5rem',
    spacing: '0.375rem',
    minTouchTarget: false,
    fontSize: '1rem',
  },
  lg: {
    iconSize: '2rem',
    spacing: '0.5rem',
    minTouchTarget: false,
    fontSize: '1.125rem',
  },
  xl: {
    iconSize: '2.5rem',
    spacing: '0.625rem',
    minTouchTarget: false,
    fontSize: '1.25rem',
  },
};

/**
 * Rating precision configurations
 */
export const RATING_PRECISION_CONFIG: Record<BRatingPrecision, {
  step: number;
  snapThreshold: number;
  announcement: string;
}> = {
  full: {
    step: 1,
    snapThreshold: 0.5,
    announcement: 'full rating precision',
  },
  half: {
    step: 0.5,
    snapThreshold: 0.25,
    announcement: 'half rating precision',
  },
  quarter: {
    step: 0.25,
    snapThreshold: 0.125,
    announcement: 'quarter rating precision',
  },
};

/**
 * Export all types for easy importing
 */
export type {
  BRatingAccessibilityProps as AccessibilityProps,
  BRatingProps as Props,
  BRatingState as State,
  BRatingAriaAttributes as AriaAttributes,
  BRatingKeyboardConfig as KeyboardConfig,
  BRatingValidationConfig as ValidationConfig,
  BRatingThemeConfig as ThemeConfig,
  BRatingTooltipConfig as TooltipConfig,
  BRatingEmits as Emits,
  BRatingValidationResult as ValidationResult,
  BRatingAnnouncementTemplates as AnnouncementTemplates,
  BRatingAccessibilityHelpers as AccessibilityHelpers,
};