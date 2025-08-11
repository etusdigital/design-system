/**
 * BStepOption accessibility props interface
 * Implements WCAG 2.1 AA standards for step option components
 */
export interface BStepOptionAccessibilityProps {
  /** ARIA label for the step option */
  ariaLabel?: string;
  /** ID of element that labels this step option */
  ariaLabelledBy?: string;
  /** ID of element that describes this step option */
  ariaDescribedBy?: string;
  /** Whether this step option is currently selected/active */
  selected?: boolean;
  /** Whether this step option has been completed */
  completed?: boolean;
  /** Position in the step sequence */
  stepNumber?: number;
  /** Total number of steps */
  totalSteps?: number;
  /** Whether to announce state changes to screen readers */
  announceChanges?: boolean;
  /** Custom announcement template for state changes */
  announcementTemplate?: string;
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
  /** Whether the step option is clickable/interactive */
  interactive?: boolean;
  /** Role override for the step option */
  role?: 'button' | 'listitem' | 'option' | 'tab';
}

/**
 * Step option state interface for accessibility
 */
export interface BStepOptionState {
  /** Whether the step option is selected */
  isSelected: boolean;
  /** Whether the step option is disabled */
  isDisabled: boolean;
  /** Whether the step option has been completed */
  isCompleted: boolean;
  /** Whether the step option has focus */
  hasFocus: boolean;
  /** Whether the step option is interactive */
  isInteractive: boolean;
  /** Current step number */
  currentStep?: number;
  /** Total steps in the sequence */
  totalSteps?: number;
}

/**
 * Step option ARIA attributes interface
 */
export interface BStepOptionAriaAttributes {
  /** ARIA role */
  role: string;
  /** ARIA pressed state for interactive buttons */
  'aria-pressed'?: boolean;
  /** ARIA selected state for selectable options */
  'aria-selected'?: boolean;
  /** ARIA current state for current step */
  'aria-current'?: 'step' | 'true' | 'false';
  /** ARIA disabled state */
  'aria-disabled'?: boolean;
  /** ARIA described by relationships */
  'aria-describedby'?: string;
  /** ARIA labelled by relationships */
  'aria-labelledby'?: string;
  /** ARIA label */
  'aria-label'?: string;
  /** Position in set for screen readers */
  'aria-posinset'?: number;
  /** Set size for screen readers */
  'aria-setsize'?: number;
  /** ARIA expanded for expandable step options */
  'aria-expanded'?: boolean;
}

/**
 * Step option keyboard configuration
 */
export interface BStepOptionKeyboardConfig {
  /** Whether keyboard navigation is enabled */
  enabled?: boolean;
  /** Keys that activate the step option */
  activationKeys?: string[];
  /** Keys that navigate to next step */
  nextKeys?: string[];
  /** Keys that navigate to previous step */
  prevKeys?: string[];
  /** Whether to support Enter key activation */
  enterActivation?: boolean;
  /** Whether to support Space key activation */
  spaceActivation?: boolean;
}

/**
 * Complete BStepOption props interface
 */
export interface BStepOptionProps extends BStepOptionAccessibilityProps {
  /** Title/name of the step */
  title?: string;
  /** Description text for the step */
  description?: string;
  /** Icon name to display */
  icon?: string;
  /** Color theme for the step option */
  color?: string;
  /** Whether the step option is disabled */
  disabled?: boolean;
  /** Whether to render icon without background circle */
  isIconRound?: boolean;
  /** HTML id attribute */
  id?: string;
  /** Additional CSS classes */
  class?: string;
  /** Inline styles */
  style?: string | Record<string, any>;
  /** Keyboard navigation configuration */
  keyboardConfig?: BStepOptionKeyboardConfig;
}

/**
 * BStepOption emits interface
 */
export interface BStepOptionEmits {
  /** Step option clicked/activated */
  'click': [event: MouseEvent, state: BStepOptionState];
  /** Step option selected */
  'select': [selected: boolean, state: BStepOptionState];
  /** Step option completed */
  'complete': [completed: boolean, state: BStepOptionState];
  /** Focus change event */
  'focus': [event: FocusEvent, state: BStepOptionState];
  /** Blur event */
  'blur': [event: FocusEvent, state: BStepOptionState];
  /** Keyboard event */
  'keyboard': [event: KeyboardEvent, action: string];
  /** Accessibility event */
  'accessibility': [type: string, data: any];
}

/**
 * Step option validation result
 */
export interface BStepOptionValidationResult {
  /** Whether validation passes */
  isValid: boolean;
  /** Error messages */
  errors: string[];
  /** Warning messages */
  warnings: string[];
  /** Field name for error reporting */
  fieldName?: string;
}

/**
 * Step option announcement templates
 */
export interface BStepOptionAnnouncementTemplates {
  /** Template for selection announcement */
  selected: string;
  /** Template for completion announcement */
  completed: string;
  /** Template for focus announcement */
  focused: string;
  /** Template for error announcement */
  error: string;
  /** Template for disabled state */
  disabled: string;
  /** Template for step navigation */
  navigation: string;
}

/**
 * Step option size variants for accessibility compliance
 */
export type BStepOptionSize = 'sm' | 'md' | 'lg';

/**
 * Step option visual variants
 */
export type BStepOptionVariant = 'default' | 'card' | 'minimal' | 'timeline';

/**
 * Step option status types
 */
export type BStepOptionStatus = 'pending' | 'current' | 'completed' | 'error' | 'disabled';

/**
 * Default configurations
 */
export const DEFAULT_STEP_OPTION_KEYBOARD_CONFIG: Required<BStepOptionKeyboardConfig> = {
  enabled: true,
  activationKeys: ['Enter', ' '],
  nextKeys: ['ArrowRight', 'ArrowDown'],
  prevKeys: ['ArrowLeft', 'ArrowUp'],
  enterActivation: true,
  spaceActivation: true,
};

export const DEFAULT_STEP_OPTION_ACCESSIBILITY_CONFIG: Required<BStepOptionAccessibilityProps> = {
  ariaLabel: '',
  ariaLabelledBy: '',
  ariaDescribedBy: '',
  selected: false,
  completed: false,
  stepNumber: 1,
  totalSteps: 1,
  announceChanges: true,
  announcementTemplate: '{action} step {stepNumber} of {totalSteps}: {title}',
  highContrast: false,
  reduceMotion: false,
  enhancedFocus: true,
  minTouchTarget: true,
  screenReaderInstructions: 'Use Enter or Space to select this step option',
  interactive: false,
  role: 'button',
};

export const DEFAULT_STEP_OPTION_ANNOUNCEMENTS: Required<BStepOptionAnnouncementTemplates> = {
  selected: 'Selected step {stepNumber}: {title}',
  completed: 'Completed step {stepNumber}: {title}',
  focused: 'Focused on step {stepNumber} of {totalSteps}: {title}. {description}',
  error: 'Error in step {stepNumber}: {title}. {errorMessage}',
  disabled: 'Step {stepNumber}: {title} is disabled',
  navigation: 'Navigated to step {stepNumber} of {totalSteps}',
};

/**
 * Export all types for easy importing
 */
export type {
  BStepOptionAccessibilityProps as AccessibilityProps,
  BStepOptionProps as Props,
  BStepOptionState as State,
  BStepOptionAriaAttributes as AriaAttributes,
  BStepOptionKeyboardConfig as KeyboardConfig,
  BStepOptionEmits as Emits,
  BStepOptionValidationResult as ValidationResult,
  BStepOptionAnnouncementTemplates as AnnouncementTemplates,
};