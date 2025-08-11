/**
 * BSpinner accessibility props interface
 * Implements WCAG 2.1 AA standards for spinner components
 */
export interface BSpinnerAccessibilityProps {
  /** Accessible label for the spinner */
  ariaLabel?: string;
  /** Whether the spinner should announce loading state */
  ariaLive?: boolean;
  /** Custom message to announce when spinner starts */
  loadingMessage?: string;
  /** Custom message to announce when spinner completes */
  completeMessage?: string;
  /** Whether to show completion announcement */
  announceCompletion?: boolean;
  /** Whether to announce state changes */
  announceStateChanges?: boolean;
  /** Whether to announce progress updates */
  announceProgress?: boolean;
  /** Custom progress announcement template */
  progressAnnouncementTemplate?: string;
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
  /** Whether to show detailed loading information */
  showDetailedInfo?: boolean;
  /** Custom loading context description */
  contextDescription?: string;
  /** Whether to announce estimated completion time */
  announceEstimatedTime?: boolean;
  /** Estimated completion time in milliseconds */
  estimatedTime?: number;
  /** Whether to hide spinner from screen readers */
  hideFromScreenReader?: boolean;
  /** Custom ARIA describedby for additional context */
  ariaDescribedBy?: string;
  /** Whether spinner is part of a larger loading process */
  partOfProcess?: boolean;
  /** Current step in multi-step process */
  currentStep?: number;
  /** Total steps in multi-step process */
  totalSteps?: number;
}

/**
 * Spinner size variants
 */
export type BSpinnerSize = 'small' | 'medium' | 'large' | 'xlarge';

/**
 * Spinner color variants with semantic meaning
 */
export type BSpinnerVariant = 'primary' | 'secondary' | 'neutral' | 'success' | 'warning' | 'error';

/**
 * Spinner animation speed options
 */
export type BSpinnerSpeed = 'slow' | 'normal' | 'fast';

/**
 * Spinner loading states
 */
export type BSpinnerLoadingState = 'idle' | 'loading' | 'complete' | 'error' | 'paused';

/**
 * Spinner animation types
 */
export type BSpinnerAnimationType = 'spin' | 'pulse' | 'fade' | 'bounce' | 'none';

/**
 * Spinner context types for different use cases
 */
export type BSpinnerContext = 'button' | 'page' | 'inline' | 'overlay' | 'card' | 'table';

/**
 * Spinner state interface for accessibility
 */
export interface BSpinnerState {
  /** Whether spinner is currently visible */
  isVisible: boolean;
  /** Whether spinner is actively spinning */
  isActive: boolean;
  /** Current loading state */
  loadingState: BSpinnerLoadingState;
  /** When spinner was started */
  startTime: number | null;
  /** Whether minimum show time has elapsed */
  minTimeElapsed: boolean;
  /** Current progress percentage (0-100) */
  progress: number;
  /** Whether spinner has announced loading start */
  hasAnnouncedStart: boolean;
  /** Whether spinner has announced completion */
  hasAnnouncedComplete: boolean;
  /** Whether high contrast mode is active */
  isHighContrast: boolean;
  /** Whether animations are disabled */
  isReducedMotion: boolean;
  /** Last announced message to prevent duplicates */
  lastAnnouncedMessage: string | null;
}

/**
 * Spinner ARIA attributes interface
 */
export interface BSpinnerAriaAttributes {
  /** ARIA role (always 'status') */
  role: 'status';
  /** ARIA label for the spinner */
  'aria-label'?: string;
  /** ARIA labelledby for complex labeling */
  'aria-labelledby'?: string;
  /** ARIA describedby for additional description */
  'aria-describedby'?: string;
  /** ARIA live region for announcements */
  'aria-live'?: 'polite' | 'assertive' | 'off';
  /** ARIA atomic for live region updates */
  'aria-atomic'?: boolean;
  /** ARIA busy state */
  'aria-busy'?: boolean;
  /** ARIA hidden for decorative spinners */
  'aria-hidden'?: boolean;
  /** ARIA valuenow for progress indication */
  'aria-valuenow'?: number;
  /** ARIA valuemin for progress indication */
  'aria-valuemin'?: number;
  /** ARIA valuemax for progress indication */
  'aria-valuemax'?: number;
  /** ARIA valuetext for progress description */
  'aria-valuetext'?: string;
}

/**
 * Spinner timing configuration
 */
export interface BSpinnerTimingConfig {
  /** Minimum time to show spinner (prevents flashing) */
  minShowTime?: number;
  /** Maximum time before showing timeout message */
  maxShowTime?: number;
  /** Delay before showing spinner */
  showDelay?: number;
  /** Delay before hiding spinner */
  hideDelay?: number;
  /** Debounce time for rapid state changes */
  debounceTime?: number;
  /** Estimated completion time */
  estimatedDuration?: number;
}

/**
 * Spinner progress configuration
 */
export interface BSpinnerProgressConfig {
  /** Whether to show progress */
  enabled?: boolean;
  /** Current progress percentage */
  value?: number;
  /** Minimum progress value */
  min?: number;
  /** Maximum progress value */
  max?: number;
  /** Whether progress is indeterminate */
  indeterminate?: boolean;
  /** Progress update interval */
  updateInterval?: number;
  /** Custom progress formatter */
  formatter?: (value: number, max: number) => string;
}

/**
 * Complete BSpinner props interface
 */
export interface BSpinnerProps extends BSpinnerAccessibilityProps {
  /** Size of the spinner */
  size?: BSpinnerSize;
  /** Color variant of the spinner */
  variant?: BSpinnerVariant;
  /** Speed of the spinner animation */
  speed?: BSpinnerSpeed;
  /** Whether spinner is currently active/visible */
  active?: boolean;
  /** Whether to respect reduced motion preferences */
  respectReducedMotion?: boolean;
  /** Animation type */
  animationType?: BSpinnerAnimationType;
  /** Context where spinner is used */
  context?: BSpinnerContext;
  /** HTML id attribute */
  id?: string;
  /** Additional CSS classes */
  class?: string;
  /** Inline styles */
  style?: string | Record<string, any>;
  /** Timing configuration */
  timingConfig?: BSpinnerTimingConfig;
  /** Progress configuration */
  progressConfig?: BSpinnerProgressConfig;
  /** Custom spinner content */
  content?: string;
  /** Whether spinner is inline with text */
  inline?: boolean;
  /** Whether to center spinner in container */
  centered?: boolean;
  /** Custom color override */
  color?: string;
  /** Stroke width for SVG spinners */
  strokeWidth?: number;
  /** Whether to show background track */
  showTrack?: boolean;
  /** Track opacity */
  trackOpacity?: number;
}

/**
 * BSpinner emits interface
 */
export interface BSpinnerEmits {
  /** Loading started */
  'loading-start': [message: string];
  /** Loading completed */
  'loading-complete': [message: string];
  /** Visibility changed */
  'visibility-change': [visible: boolean];
  /** Loading state changed */
  'state-change': [state: BSpinnerLoadingState];
  /** Progress updated */
  'progress-update': [progress: number];
  /** Minimum show time elapsed */
  'min-time-elapsed': [];
  /** Maximum show time exceeded */
  'max-time-exceeded': [];
  /** Accessibility event */
  'accessibility': [type: string, data: any];
  /** Animation started */
  'animation-start': [];
  /** Animation ended */
  'animation-end': [];
}

/**
 * Spinner validation result
 */
export interface BSpinnerValidationResult {
  /** Whether validation passes */
  isValid: boolean;
  /** Error messages */
  errors: string[];
  /** Warning messages */
  warnings: string[];
  /** Spinner configuration */
  config?: BSpinnerProps;
}

/**
 * Spinner announcement templates
 */
export interface BSpinnerAnnouncementTemplates {
  /** Template for loading start announcement */
  loadingStart: string;
  /** Template for loading complete announcement */
  loadingComplete: string;
  /** Template for progress announcement */
  progressUpdate: string;
  /** Template for estimated time announcement */
  estimatedTime: string;
  /** Template for timeout announcement */
  timeout: string;
  /** Template for error announcement */
  error: string;
  /** Template for step progress in multi-step process */
  stepProgress: string;
  /** Template for paused state announcement */
  paused: string;
  /** Template for resumed state announcement */
  resumed: string;
}

/**
 * Spinner theme configuration
 */
export interface BSpinnerThemeConfig {
  /** Primary color */
  primaryColor?: string;
  /** Secondary color */
  secondaryColor?: string;
  /** Track color */
  trackColor?: string;
  /** Success color */
  successColor?: string;
  /** Warning color */
  warningColor?: string;
  /** Error color */
  errorColor?: string;
  /** Background color */
  backgroundColor?: string;
  /** Border radius */
  borderRadius?: string;
  /** Animation duration */
  animationDuration?: string;
}

/**
 * Spinner accessibility helpers
 */
export interface BSpinnerAccessibilityHelpers {
  /** Get ARIA attributes for spinner */
  getSpinnerAriaAttributes: (state: BSpinnerState, props: BSpinnerProps) => BSpinnerAriaAttributes;
  /** Format progress for announcement */
  formatProgressAnnouncement: (progress: number, max: number) => string;
  /** Check if announcement should be made */
  shouldAnnounce: (message: string, lastMessage: string | null) => boolean;
  /** Get appropriate loading message */
  getLoadingMessage: (context: BSpinnerContext, customMessage?: string) => string;
  /** Format estimated time for announcement */
  formatEstimatedTime: (milliseconds: number) => string;
  /** Get completion message */
  getCompletionMessage: (context: BSpinnerContext, customMessage?: string) => string;
}

/**
 * Default configurations
 */
export const DEFAULT_SPINNER_ACCESSIBILITY_CONFIG: Required<BSpinnerAccessibilityProps> = {
  ariaLabel: 'Loading',
  ariaLive: true,
  loadingMessage: '',
  completeMessage: '',
  announceCompletion: true,
  announceStateChanges: true,
  announceProgress: false,
  progressAnnouncementTemplate: '{progress}% complete',
  highContrast: false,
  reduceMotion: false,
  enhancedFocus: false,
  screenReaderInstructions: '',
  liveRegionPoliteness: 'polite',
  showDetailedInfo: false,
  contextDescription: '',
  announceEstimatedTime: false,
  estimatedTime: 0,
  hideFromScreenReader: false,
  ariaDescribedBy: '',
  partOfProcess: false,
  currentStep: 0,
  totalSteps: 0,
};

export const DEFAULT_SPINNER_TIMING_CONFIG: Required<BSpinnerTimingConfig> = {
  minShowTime: 500,
  maxShowTime: 30000,
  showDelay: 0,
  hideDelay: 0,
  debounceTime: 100,
  estimatedDuration: 0,
};

export const DEFAULT_SPINNER_PROGRESS_CONFIG: Required<BSpinnerProgressConfig> = {
  enabled: false,
  value: 0,
  min: 0,
  max: 100,
  indeterminate: true,
  updateInterval: 100,
  formatter: (value: number, max: number) => `${Math.round((value / max) * 100)}%`,
};

export const DEFAULT_SPINNER_ANNOUNCEMENTS: Required<BSpinnerAnnouncementTemplates> = {
  loadingStart: 'Loading started',
  loadingComplete: 'Loading complete',
  progressUpdate: '{progress}% complete',
  estimatedTime: 'Estimated time remaining: {time}',
  timeout: 'Loading is taking longer than expected',
  error: 'Loading failed',
  stepProgress: 'Step {current} of {total}',
  paused: 'Loading paused',
  resumed: 'Loading resumed',
};

/**
 * Spinner size configurations with accessibility considerations
 */
export const SPINNER_SIZE_CONFIG: Record<BSpinnerSize, {
  width: string;
  height: string;
  strokeWidth: string;
  minTouchTarget: boolean;
}> = {
  small: {
    width: '1rem',
    height: '1rem',
    strokeWidth: '2px',
    minTouchTarget: false,
  },
  medium: {
    width: '1.5rem',
    height: '1.5rem',
    strokeWidth: '3px',
    minTouchTarget: false,
  },
  large: {
    width: '2rem',
    height: '2rem',
    strokeWidth: '4px',
    minTouchTarget: false,
  },
  xlarge: {
    width: '3rem',
    height: '3rem',
    strokeWidth: '5px',
    minTouchTarget: false,
  },
};

/**
 * Spinner variant configurations with semantic meanings
 */
export const SPINNER_VARIANT_CONFIG: Record<BSpinnerVariant, {
  color: string;
  semanticMeaning: string;
  contrastRatio: number;
}> = {
  primary: {
    color: 'var(--primary-interaction-default)',
    semanticMeaning: 'Primary loading indicator',
    contrastRatio: 4.5,
  },
  secondary: {
    color: 'var(--neutral-interaction-hover)',
    semanticMeaning: 'Secondary loading indicator',
    contrastRatio: 4.5,
  },
  neutral: {
    color: 'var(--neutral-interaction-default)',
    semanticMeaning: 'Neutral loading indicator',
    contrastRatio: 4.5,
  },
  success: {
    color: 'var(--success-interaction-default)',
    semanticMeaning: 'Success loading indicator',
    contrastRatio: 4.5,
  },
  warning: {
    color: 'var(--warning-interaction-default)',
    semanticMeaning: 'Warning loading indicator',
    contrastRatio: 4.5,
  },
  error: {
    color: 'var(--danger-interaction-default)',
    semanticMeaning: 'Error loading indicator',
    contrastRatio: 4.5,
  },
};

/**
 * Spinner context configurations
 */
export const SPINNER_CONTEXT_CONFIG: Record<BSpinnerContext, {
  defaultSize: BSpinnerSize;
  defaultMessage: string;
  minTouchTarget: boolean;
  positioning: string;
}> = {
  button: {
    defaultSize: 'small',
    defaultMessage: 'Processing request',
    minTouchTarget: true,
    positioning: 'inline',
  },
  page: {
    defaultSize: 'large',
    defaultMessage: 'Loading page content',
    minTouchTarget: false,
    positioning: 'centered',
  },
  inline: {
    defaultSize: 'small',
    defaultMessage: 'Loading',
    minTouchTarget: false,
    positioning: 'inline',
  },
  overlay: {
    defaultSize: 'xlarge',
    defaultMessage: 'Loading content',
    minTouchTarget: false,
    positioning: 'fixed',
  },
  card: {
    defaultSize: 'medium',
    defaultMessage: 'Loading card content',
    minTouchTarget: false,
    positioning: 'centered',
  },
  table: {
    defaultSize: 'medium',
    defaultMessage: 'Loading table data',
    minTouchTarget: false,
    positioning: 'centered',
  },
};

/**
 * Animation duration configurations based on speed
 */
export const SPINNER_SPEED_CONFIG: Record<BSpinnerSpeed, {
  duration: string;
  description: string;
}> = {
  slow: {
    duration: '3s',
    description: 'Slow, gentle animation for relaxed contexts',
  },
  normal: {
    duration: '2s',
    description: 'Standard animation speed for most use cases',
  },
  fast: {
    duration: '1s',
    description: 'Fast animation for urgent or quick operations',
  },
};

/**
 * Export all types for easy importing
 */
export type {
  BSpinnerAccessibilityProps as AccessibilityProps,
  BSpinnerProps as Props,
  BSpinnerState as State,
  BSpinnerAriaAttributes as AriaAttributes,
  BSpinnerTimingConfig as TimingConfig,
  BSpinnerProgressConfig as ProgressConfig,
  BSpinnerEmits as Emits,
  BSpinnerValidationResult as ValidationResult,
  BSpinnerAnnouncementTemplates as AnnouncementTemplates,
  BSpinnerThemeConfig as ThemeConfig,
  BSpinnerAccessibilityHelpers as AccessibilityHelpers,
};