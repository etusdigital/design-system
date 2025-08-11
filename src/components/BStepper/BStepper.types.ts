/**
 * BStepper accessibility props interface
 * Implements WCAG 2.1 AA standards for stepper components
 */
export interface BStepperAccessibilityProps {
  /** ARIA label for the stepper */
  ariaLabel?: string;
  /** ID of element that labels this stepper */
  ariaLabelledBy?: string;
  /** ID of element that describes this stepper */
  ariaDescribedBy?: string;
  /** Additional description for screen readers */
  ariaDescription?: string;
  /** Whether to announce step changes to screen readers */
  announceChanges?: boolean;
  /** Custom announcement template for step changes */
  announcementTemplate?: string;
  /** High contrast mode support */
  highContrast?: boolean;
  /** Reduced motion support */
  reduceMotion?: boolean;
  /** Whether to use enhanced focus management */
  enhancedFocus?: boolean;
  /** Minimum touch target size (default 44px) */
  minTouchTarget?: boolean;
  /** Screen reader instructions for navigation */
  screenReaderInstructions?: string;
  /** Whether to show progress information */
  showProgress?: boolean;
  /** Whether to provide step status announcements */
  announceStepStatus?: boolean;
  /** Live region politeness level for announcements */
  liveRegionPoliteness?: 'polite' | 'assertive';
  /** Role override for the stepper container */
  role?: 'tablist' | 'navigation' | 'group';
  /** Whether stepper supports keyboard navigation */
  keyboardNavigation?: boolean;
  /** Whether to wrap navigation (last to first) */
  wrapNavigation?: boolean;
}

/**
 * Stepper item type with accessibility support
 */
export interface BStepperItemWithAccessibility {
  /** Display label for the step */
  label?: string;
  /** Value associated with the step */
  value?: unknown;
  /** Icon name for the step */
  icon?: string;
  /** ARIA label for this specific step */
  ariaLabel?: string;
  /** Whether this step is disabled */
  disabled?: boolean;
  /** Description for screen readers */
  description?: string;
  /** Status of the step */
  status?: BStepperStepStatus;
  /** Additional properties */
  [key: string]: unknown;
}

/**
 * Stepper item type - can be a string or enhanced object
 */
export type BStepperItem = string | BStepperItemWithAccessibility;

/**
 * Stepper model value type
 */
export type BStepperModelValue = BStepperItem | undefined;

/**
 * Step status types for accessibility
 */
export type BStepperStepStatus = 'current' | 'completed' | 'incomplete' | 'skipped' | 'error' | 'disabled';

/**
 * Stepper size variants
 */
export type BStepperSize = 'small' | 'medium' | 'large';

/**
 * Stepper visual versions
 */
export type BStepperVersion = 1 | 2;

/**
 * Stepper state interface for accessibility
 */
export interface BStepperState {
  /** Current step index */
  currentStep: number;
  /** Total number of steps */
  totalSteps: number;
  /** Whether stepper has focus */
  hasFocus: boolean;
  /** Currently focused step index for keyboard navigation */
  focusedStepIndex: number;
  /** Whether keyboard navigation mode is active */
  keyboardMode: boolean;
  /** Set of completed step indices */
  completedSteps: Set<number>;
  /** Progress percentage */
  progressPercentage: number;
  /** Whether stepper is disabled */
  isDisabled: boolean;
  /** Whether step skipping is allowed */
  allowStepSkipping: boolean;
}

/**
 * Stepper ARIA attributes interface
 */
export interface BStepperAriaAttributes {
  /** ARIA role */
  role: string;
  /** ARIA label */
  'aria-label'?: string;
  /** ARIA labelled by relationships */
  'aria-labelledby'?: string;
  /** ARIA described by relationships */
  'aria-describedby'?: string;
  /** ARIA orientation for the stepper */
  'aria-orientation'?: 'horizontal' | 'vertical';
  /** ARIA current for active step */
  'aria-current'?: 'step' | 'true' | 'false';
  /** ARIA disabled state */
  'aria-disabled'?: boolean;
  /** ARIA live region */
  'aria-live'?: 'polite' | 'assertive';
  /** ARIA atomic for live regions */
  'aria-atomic'?: boolean;
}

/**
 * Step ARIA attributes interface
 */
export interface BStepAriaAttributes {
  /** ARIA role for individual step */
  role: string;
  /** ARIA selected state */
  'aria-selected'?: boolean;
  /** ARIA current state */
  'aria-current'?: 'step' | 'true' | 'false';
  /** ARIA disabled state */
  'aria-disabled'?: boolean;
  /** ARIA label for the step */
  'aria-label'?: string;
  /** ARIA described by relationships */
  'aria-describedby'?: string;
  /** Position in set */
  'aria-posinset'?: number;
  /** Set size */
  'aria-setsize'?: number;
  /** Tab index for keyboard navigation */
  tabindex?: number;
  /** ARIA expanded for expandable steps */
  'aria-expanded'?: boolean;
}

/**
 * Stepper keyboard configuration
 */
export interface BStepperKeyboardConfig {
  /** Whether keyboard navigation is enabled */
  enabled?: boolean;
  /** Keys for moving to next step */
  nextKeys?: string[];
  /** Keys for moving to previous step */
  prevKeys?: string[];
  /** Keys for activating current step */
  activationKeys?: string[];
  /** Keys for jumping to first step */
  firstKeys?: string[];
  /** Keys for jumping to last step */
  lastKeys?: string[];
  /** Whether to enable Home/End navigation */
  homeEndNavigation?: boolean;
  /** Whether to wrap navigation at boundaries */
  wrapNavigation?: boolean;
  /** Whether to support numeric key navigation (1-9) */
  numericNavigation?: boolean;
}

/**
 * Complete BStepper props interface
 */
export interface BStepperProps extends BStepperAccessibilityProps {
  /** The currently selected step */
  modelValue?: BStepperModelValue;
  /** Array of step items */
  items: BStepperItem[];
  /** Size of the stepper */
  size?: BStepperSize;
  /** Whether the stepper is disabled */
  disabled?: boolean;
  /** Whether users can skip steps */
  allowedSkip?: boolean;
  /** Background color CSS value */
  background?: string;
  /** Visual version of the stepper */
  version?: BStepperVersion;
  /** HTML id attribute */
  id?: string;
  /** Additional CSS classes */
  class?: string;
  /** Inline styles */
  style?: string | Record<string, any>;
  /** Keyboard navigation configuration */
  keyboardConfig?: BStepperKeyboardConfig;
  /** Whether to show step numbers */
  showStepNumbers?: boolean;
  /** Whether to show step labels */
  showStepLabels?: boolean;
  /** Custom step completion validator */
  stepValidator?: (stepIndex: number, stepItem: BStepperItem) => boolean;
}

/**
 * BStepper emits interface
 */
export interface BStepperEmits {
  /** Model value updated */
  'update:modelValue': [value: BStepperModelValue];
  /** Step changed */
  'changeStep': [item: BStepperItem, index: number];
  /** Step focused */
  'step-focus': [item: BStepperItem, index: number];
  /** Step blurred */
  'step-blur': [item: BStepperItem, index: number];
  /** Keyboard event on stepper */
  'keyboard': [event: KeyboardEvent, action: string];
  /** Step validation event */
  'step-validate': [stepIndex: number, stepItem: BStepperItem, isValid: boolean];
  /** Progress change event */
  'progress-change': [percentage: number, currentStep: number, totalSteps: number];
  /** Accessibility event */
  'accessibility': [type: string, data: any];
  /** Step status change event */
  'step-status-change': [stepIndex: number, oldStatus: BStepperStepStatus, newStatus: BStepperStepStatus];
}

/**
 * Stepper validation result
 */
export interface BStepperValidationResult {
  /** Whether validation passes */
  isValid: boolean;
  /** Error messages */
  errors: string[];
  /** Warning messages */
  warnings: string[];
  /** Step index for error reporting */
  stepIndex?: number;
}

/**
 * Stepper announcement templates
 */
export interface BStepperAnnouncementTemplates {
  /** Template for step change announcement */
  stepChange: string;
  /** Template for step completion announcement */
  stepComplete: string;
  /** Template for step focus announcement */
  stepFocus: string;
  /** Template for progress announcement */
  progress: string;
  /** Template for navigation instruction */
  navigationHelp: string;
  /** Template for step error announcement */
  stepError: string;
  /** Template for stepper completion */
  stepperComplete: string;
}

/**
 * Default configurations
 */
export const DEFAULT_STEPPER_KEYBOARD_CONFIG: Required<BStepperKeyboardConfig> = {
  enabled: true,
  nextKeys: ['ArrowRight', 'ArrowDown'],
  prevKeys: ['ArrowLeft', 'ArrowUp'],
  activationKeys: ['Enter', ' '],
  firstKeys: ['Home'],
  lastKeys: ['End'],
  homeEndNavigation: true,
  wrapNavigation: false,
  numericNavigation: true,
};

export const DEFAULT_STEPPER_ACCESSIBILITY_CONFIG: Required<BStepperAccessibilityProps> = {
  ariaLabel: '',
  ariaLabelledBy: '',
  ariaDescribedBy: '',
  ariaDescription: '',
  announceChanges: true,
  announcementTemplate: 'Moved to step {stepNumber} of {totalSteps}: {stepLabel}',
  highContrast: false,
  reduceMotion: false,
  enhancedFocus: true,
  minTouchTarget: true,
  screenReaderInstructions: 'Use arrow keys to navigate steps, Enter or Space to select',
  showProgress: true,
  announceStepStatus: true,
  liveRegionPoliteness: 'polite',
  role: 'tablist',
  keyboardNavigation: true,
  wrapNavigation: false,
};

export const DEFAULT_STEPPER_ANNOUNCEMENTS: Required<BStepperAnnouncementTemplates> = {
  stepChange: 'Moved to step {stepNumber} of {totalSteps}: {stepLabel}',
  stepComplete: 'Completed step {stepNumber}: {stepLabel}',
  stepFocus: 'Focused on step {stepNumber} of {totalSteps}: {stepLabel}. {description}',
  progress: '{progressPercentage}% complete. Step {stepNumber} of {totalSteps}',
  navigationHelp: 'Use arrow keys to navigate between steps, Enter or Space to select',
  stepError: 'Error in step {stepNumber}: {stepLabel}. {errorMessage}',
  stepperComplete: 'All steps completed successfully',
};

/**
 * Export all types for easy importing
 */
export type {
  BStepperAccessibilityProps as AccessibilityProps,
  BStepperProps as Props,
  BStepperState as State,
  BStepperAriaAttributes as AriaAttributes,
  BStepAriaAttributes as StepAriaAttributes,
  BStepperKeyboardConfig as KeyboardConfig,
  BStepperEmits as Emits,
  BStepperValidationResult as ValidationResult,
  BStepperAnnouncementTemplates as AnnouncementTemplates,
  BStepperItemWithAccessibility as ItemWithAccessibility,
};