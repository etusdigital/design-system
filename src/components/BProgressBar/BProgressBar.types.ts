/**
 * BProgressBar accessibility props interface
 * Implements WCAG 2.1 AA standards for progress bar components
 */
export interface BProgressBarAccessibilityProps {
  /** Accessible label for the progress bar */
  ariaLabel?: string;
  /** Optional text description of current progress */
  ariaValueText?: string;
  /** ID for progress bar element - auto-generated if not provided */
  id?: string;
  /** Description text that appears alongside the progress bar */
  description?: string;
  /** Whether to announce progress changes to screen readers */
  announceProgress?: boolean;
  /** Whether to announce when progress is complete */
  announceCompletion?: boolean;
  /** Custom completion message */
  completionMessage?: string;
  /** Status text that doesn't rely on visual indicators */
  statusText?: string;
  /** Whether progress bar is in an error state */
  isError?: boolean;
  /** Error message for screen readers */
  errorMessage?: string;
  /** Minimum percentage change before announcing (default: 10) */
  announcementThreshold?: number;
  /** Whether to show progress details visually */
  showProgressText?: boolean;
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
  /** Whether to announce step changes for stepped progress */
  announceStepChanges?: boolean;
  /** Whether to announce intermediate milestones */
  announceMilestones?: boolean;
  /** Milestone percentages to announce */
  milestones?: number[];
}

/**
 * Progress bar size variants
 */
export type BProgressBarSize = 'small' | 'medium' | 'large';

/**
 * Progress bar type variants for semantic meaning
 */
export type BProgressBarType = 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'neutral';

/**
 * Progress bar animation types
 */
export type BProgressBarAnimationType = 'indeterminate' | 'query' | undefined;

/**
 * Progress bar percentage display options
 */
export type BProgressBarDisplayPercentage = 'center' | 'bar' | undefined;

/**
 * Progress bar loading states
 */
export type BProgressBarLoadingState = 'idle' | 'loading' | 'complete' | 'error' | 'paused';

/**
 * Progress bar state interface for accessibility
 */
export interface BProgressBarState {
  /** Current progress value (0-1 or 0-steps) */
  currentValue: number;
  /** Previous progress value for comparison */
  previousValue: number;
  /** Whether progress is complete */
  isComplete: boolean;
  /** Whether progress has been announced as complete */
  hasAnnouncedComplete: boolean;
  /** Whether progress is indeterminate */
  isIndeterminate: boolean;
  /** Current loading state */
  loadingState: BProgressBarLoadingState;
  /** Whether progress is in error state */
  hasError: boolean;
  /** Current step (for stepped progress) */
  currentStep: number;
  /** Whether animations are active */
  isAnimating: boolean;
  /** Whether high contrast mode is active */
  isHighContrast: boolean;
  /** Whether animations are disabled */
  isReducedMotion: boolean;
  /** Last announced percentage */
  lastAnnouncedPercentage: number;
}

/**
 * Progress bar ARIA attributes interface
 */
export interface BProgressBarAriaAttributes {
  /** ARIA role (always 'progressbar') */
  role: 'progressbar';
  /** ARIA label for the progress bar */
  'aria-label'?: string;
  /** ARIA labelledby for complex labeling */
  'aria-labelledby'?: string;
  /** ARIA describedby for additional description */
  'aria-describedby'?: string;
  /** Current progress value */
  'aria-valuenow'?: number;
  /** Minimum progress value */
  'aria-valuemin': number;
  /** Maximum progress value */
  'aria-valuemax': number;
  /** Text description of current value */
  'aria-valuetext'?: string;
  /** Whether progress bar is invalid/error state */
  'aria-invalid'?: boolean;
  /** Busy state for loading */
  'aria-busy'?: boolean;
  /** Live region for announcements */
  'aria-live'?: 'polite' | 'assertive' | 'off';
  /** Atomic updates for live regions */
  'aria-atomic'?: boolean;
}

/**
 * Progress bar step configuration
 */
export interface BProgressBarStepConfig {
  /** Number of steps */
  stepCount?: number;
  /** Current step index */
  currentStep?: number;
  /** Step labels */
  stepLabels?: string[];
  /** Step descriptions */
  stepDescriptions?: string[];
  /** Whether steps are interactive */
  interactiveSteps?: boolean;
  /** Step completion states */
  stepStates?: ('pending' | 'current' | 'complete' | 'error')[];
}

/**
 * Progress bar milestone configuration
 */
export interface BProgressBarMilestoneConfig {
  /** Milestone percentages */
  percentages?: number[];
  /** Milestone labels */
  labels?: string[];
  /** Milestone descriptions */
  descriptions?: string[];
  /** Whether to announce milestones */
  announce?: boolean;
  /** Custom milestone messages */
  messages?: Record<number, string>;
}

/**
 * Complete BProgressBar props interface
 */
export interface BProgressBarProps extends BProgressBarAccessibilityProps {
  /** Current progress value (0-1 for percentage, 0-steps for stepped) */
  modelValue?: number;
  /** Size variant */
  size?: BProgressBarSize;
  /** Semantic type */
  type?: BProgressBarType;
  /** Custom progress color */
  color?: string;
  /** Icon to display */
  icon?: string;
  /** Info message for tooltip */
  infoMessage?: string;
  /** Number of steps (for stepped progress bar) */
  steps?: number;
  /** Animation type for indeterminate progress */
  animationType?: BProgressBarAnimationType;
  /** Where to display percentage text */
  displayPercentage?: BProgressBarDisplayPercentage;
  /** Whether to use neutral background */
  neutralBackground?: boolean;
  /** HTML id attribute */
  id?: string;
  /** Additional CSS classes */
  class?: string;
  /** Inline styles */
  style?: string | Record<string, any>;
  /** Step configuration for complex stepped progress */
  stepConfig?: BProgressBarStepConfig;
  /** Milestone configuration */
  milestoneConfig?: BProgressBarMilestoneConfig;
  /** Whether progress bar is disabled */
  disabled?: boolean;
  /** Maximum width of the progress bar */
  maxWidth?: string;
  /** Whether to show animation on value changes */
  animate?: boolean;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Buffer value for buffer progress bars */
  bufferValue?: number;
  /** Whether to show buffer indicator */
  showBuffer?: boolean;
}

/**
 * BProgressBar emits interface
 */
export interface BProgressBarEmits {
  /** Model value updated */
  'update:modelValue': [value: number];
  /** Progress completed */
  'complete': [finalValue: number];
  /** Progress started */
  'start': [initialValue: number];
  /** Progress error occurred */
  'error': [error: string];
  /** Progress paused */
  'pause': [currentValue: number];
  /** Progress resumed */
  'resume': [currentValue: number];
  /** Step changed (for stepped progress) */
  'step-change': [currentStep: number, totalSteps: number];
  /** Milestone reached */
  'milestone': [milestone: number, percentage: number];
  /** Progress value changed */
  'change': [newValue: number, oldValue: number];
  /** Animation started */
  'animation-start': [];
  /** Animation ended */
  'animation-end': [];
  /** Accessibility event */
  'accessibility': [type: string, data: any];
  /** Buffer value changed */
  'buffer-change': [bufferValue: number];
}

/**
 * Progress bar validation result
 */
export interface BProgressBarValidationResult {
  /** Whether validation passes */
  isValid: boolean;
  /** Error messages */
  errors: string[];
  /** Warning messages */
  warnings: string[];
  /** Progress bar configuration */
  config?: BProgressBarProps;
}

/**
 * Progress bar announcement templates
 */
export interface BProgressBarAnnouncementTemplates {
  /** Template for progress change announcement */
  progressChange: string;
  /** Template for completion announcement */
  progressComplete: string;
  /** Template for error announcement */
  progressError: string;
  /** Template for step change announcement */
  stepChange: string;
  /** Template for milestone announcement */
  milestoneReached: string;
  /** Template for progress start announcement */
  progressStart: string;
  /** Template for progress pause announcement */
  progressPause: string;
  /** Template for progress resume announcement */
  progressResume: string;
  /** Template for indeterminate progress */
  indeterminateProgress: string;
  /** Template for buffer change announcement */
  bufferChange: string;
}

/**
 * Progress bar theme configuration
 */
export interface BProgressBarThemeConfig {
  /** Background color */
  backgroundColor?: string;
  /** Progress fill color */
  fillColor?: string;
  /** Buffer color */
  bufferColor?: string;
  /** Text color */
  textColor?: string;
  /** Error color */
  errorColor?: string;
  /** Success color */
  successColor?: string;
  /** Border radius */
  borderRadius?: string;
  /** Height for each size */
  heights?: Record<BProgressBarSize, string>;
}

/**
 * Progress bar accessibility helpers
 */
export interface BProgressBarAccessibilityHelpers {
  /** Get ARIA attributes for current state */
  getAriaAttributes: (state: BProgressBarState, props: BProgressBarProps) => BProgressBarAriaAttributes;
  /** Get appropriate value text */
  getValueText: (value: number, max: number, type: 'percentage' | 'steps') => string;
  /** Check if announcement threshold is met */
  shouldAnnounceChange: (newValue: number, oldValue: number, threshold: number) => boolean;
  /** Get completion status */
  getCompletionStatus: (value: number, max: number) => boolean;
  /** Format percentage for announcement */
  formatPercentageForAnnouncement: (percentage: number) => string;
  /** Format step progress for announcement */
  formatStepForAnnouncement: (current: number, total: number) => string;
}

/**
 * Default configurations
 */
export const DEFAULT_PROGRESS_BAR_ACCESSIBILITY_CONFIG: Required<BProgressBarAccessibilityProps> = {
  ariaLabel: 'Progress',
  ariaValueText: '',
  id: '',
  description: '',
  announceProgress: true,
  announceCompletion: true,
  completionMessage: 'Progress completed',
  statusText: '',
  isError: false,
  errorMessage: '',
  announcementThreshold: 10,
  showProgressText: false,
  highContrast: false,
  reduceMotion: false,
  enhancedFocus: false,
  screenReaderInstructions: '',
  liveRegionPoliteness: 'polite',
  announceStepChanges: true,
  announceMilestones: true,
  milestones: [25, 50, 75],
};

export const DEFAULT_PROGRESS_BAR_ANNOUNCEMENTS: Required<BProgressBarAnnouncementTemplates> = {
  progressChange: '{percentage}% complete',
  progressComplete: 'Progress completed at 100%',
  progressError: 'Progress failed: {error}',
  stepChange: 'Step {current} of {total}',
  milestoneReached: 'Milestone reached: {percentage}% complete',
  progressStart: 'Progress started',
  progressPause: 'Progress paused at {percentage}%',
  progressResume: 'Progress resumed from {percentage}%',
  indeterminateProgress: 'Progress in progress',
  bufferChange: 'Buffer at {percentage}%',
};

/**
 * Progress bar size configurations with accessibility considerations
 */
export const PROGRESS_BAR_SIZE_CONFIG: Record<BProgressBarSize, {
  height: string;
  fontSize: string;
  iconSize: string;
  borderRadius: string;
}> = {
  small: {
    height: '0.5rem',
    fontSize: '0.625rem',
    fontSize: '1rem',
    borderRadius: '0.25rem',
  },
  medium: {
    height: '0.75rem',
    fontSize: '0.75rem',
    iconSize: '1.5rem',
    borderRadius: '0.375rem',
  },
  large: {
    height: '1rem',
    fontSize: '0.875rem',
    iconSize: '2rem',
    borderRadius: '0.5rem',
  },
};

/**
 * Progress bar type configurations with semantic colors
 */
export const PROGRESS_BAR_TYPE_CONFIG: Record<BProgressBarType, {
  backgroundColor: string;
  fillColor: string;
  semanticMeaning: string;
  contrastRatio: number;
}> = {
  primary: {
    backgroundColor: 'var(--primary-surface-highlight)',
    fillColor: 'var(--primary-foreground-low)',
    semanticMeaning: 'Primary progress indicator',
    contrastRatio: 4.5,
  },
  info: {
    backgroundColor: 'var(--informative-surface-highlight)',
    fillColor: 'var(--informative-foreground-low)',
    semanticMeaning: 'Informational progress',
    contrastRatio: 4.5,
  },
  success: {
    backgroundColor: 'var(--success-surface-highlight)',
    fillColor: 'var(--success-foreground-low)',
    semanticMeaning: 'Success progress indicator',
    contrastRatio: 4.5,
  },
  warning: {
    backgroundColor: 'var(--warning-surface-highlight)',
    fillColor: 'var(--warning-foreground-low)',
    semanticMeaning: 'Warning progress indicator',
    contrastRatio: 4.5,
  },
  danger: {
    backgroundColor: 'var(--danger-surface-highlight)',
    fillColor: 'var(--danger-foreground-low)',
    semanticMeaning: 'Error progress indicator',
    contrastRatio: 4.5,
  },
  neutral: {
    backgroundColor: 'var(--neutral-surface-highlight)',
    fillColor: 'var(--neutral-foreground-low)',
    semanticMeaning: 'Neutral progress indicator',
    contrastRatio: 4.5,
  },
};

/**
 * Common milestone percentages for progress announcements
 */
export const COMMON_PROGRESS_MILESTONES = [10, 25, 50, 75, 90, 100];

/**
 * Animation duration configurations
 */
export const PROGRESS_BAR_ANIMATION_CONFIG = {
  /** Default animation duration for value changes */
  valueTransition: 500,
  /** Indeterminate animation duration */
  indeterminate: 2000,
  /** Query animation duration */
  query: 2700,
  /** Reduced motion duration */
  reducedMotion: 0,
};

/**
 * Export all types for easy importing
 */
export type {
  BProgressBarAccessibilityProps as AccessibilityProps,
  BProgressBarProps as Props,
  BProgressBarState as State,
  BProgressBarAriaAttributes as AriaAttributes,
  BProgressBarStepConfig as StepConfig,
  BProgressBarMilestoneConfig as MilestoneConfig,
  BProgressBarEmits as Emits,
  BProgressBarValidationResult as ValidationResult,
  BProgressBarAnnouncementTemplates as AnnouncementTemplates,
  BProgressBarThemeConfig as ThemeConfig,
  BProgressBarAccessibilityHelpers as AccessibilityHelpers,
};