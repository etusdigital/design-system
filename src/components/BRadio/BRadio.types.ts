/**
 * BRadio TypeScript Type Definitions
 * Comprehensive accessibility interfaces for WCAG 2.1 AA compliance
 */

/**
 * Radio group value type - can be any primitive value used for identification
 */
export type BRadioGroupValue = string | number | boolean | null | undefined;

/**
 * Visual variant options for radio buttons
 */
export type BRadioVariant = "default" | "onboarding";

/**
 * Orientation for radio groups and keyboard navigation
 */
export type BRadioOrientation = "horizontal" | "vertical";

/**
 * Keyboard navigation direction options
 */
export type BRadioNavigationDirection = 'next' | 'previous' | 'first' | 'last';

/**
 * ARIA attributes for individual radio buttons
 */
export interface BRadioAriaAttributes {
  /** ARIA role - should be 'radio' for proper semantics */
  role?: 'radio';
  /** Whether the radio is checked (selected) */
  'aria-checked'?: boolean | 'true' | 'false' | 'mixed';
  /** Whether the radio is disabled */
  'aria-disabled'?: boolean | 'true' | 'false';
  /** ARIA label for the radio button */
  'aria-label'?: string;
  /** ID of element that labels this radio */
  'aria-labelledby'?: string;
  /** ID of element that describes this radio */
  'aria-describedby'?: string;
  /** Whether the radio is required */
  'aria-required'?: boolean | 'true' | 'false';
  /** Position in set for screen reader context */
  'aria-setsize'?: number;
  /** Current position in set */
  'aria-posinset'?: number;
}

/**
 * ARIA attributes for radio groups
 */
export interface BRadioGroupAriaAttributes {
  /** ARIA role - should be 'radiogroup' for proper semantics */
  role?: 'radiogroup';
  /** ARIA label for the radio group */
  'aria-label'?: string;
  /** ID of element that labels the group */
  'aria-labelledby'?: string;
  /** ID of element that describes the group */
  'aria-describedby'?: string;
  /** Whether the group is disabled */
  'aria-disabled'?: boolean | 'true' | 'false';
  /** Whether the group is required */
  'aria-required'?: boolean | 'true' | 'false';
  /** Orientation of the radio group for navigation */
  'aria-orientation'?: BRadioOrientation;
}

/**
 * Accessibility configuration for individual radio buttons
 */
export interface BRadioAccessibilityConfig {
  /** ARIA label for the radio button */
  ariaLabel?: string;
  /** ID of element describing the radio */
  ariaDescribedBy?: string;
  /** ID of element labeling the radio */
  ariaLabelledBy?: string;
  /** Help text for the radio */
  helpText?: string;
  /** Error message for validation feedback */
  errorMessage?: string;
  /** Whether the radio is required */
  required?: boolean;
  /** Whether to announce selection changes */
  announceChanges?: boolean;
  /** Position in group for screen reader announcements (1-based) */
  position?: number;
  /** Total number of radios in group for screen reader announcements */
  total?: number;
  /** Tab index for focus management */
  tabIndex?: number;
  /** Whether the radio supports high contrast mode */
  supportsHighContrast?: boolean;
}

/**
 * Accessibility configuration for radio groups
 */
export interface BRadioGroupAccessibilityConfig {
  /** Orientation for keyboard navigation */
  orientation?: BRadioOrientation;
  /** Group label for screen readers */
  groupLabel?: string;
  /** Help text for the entire group */
  helpText?: string;
  /** Error message for group validation */
  errorMessage?: string;
  /** Whether the group is required */
  required?: boolean;
  /** ARIA label for the radiogroup */
  ariaLabel?: string;
  /** ID of element labeling the group */
  ariaLabelledBy?: string;
  /** ID of element describing the group */
  ariaDescribedBy?: string;
  /** Whether to announce changes to screen readers */
  announceChanges?: boolean;
  /** Whether keyboard navigation should loop */
  navigationLoop?: boolean;
  /** Whether to focus first selected item on mount */
  autoFocus?: boolean;
}

/**
 * Keyboard navigation configuration and utilities
 */
export interface BRadioKeyboardNavigation {
  /** Navigate to next radio in group */
  next: () => void;
  /** Navigate to previous radio in group */
  previous: () => void;
  /** Navigate to first radio in group */
  first: () => void;
  /** Navigate to last radio in group */
  last: () => void;
  /** Select current radio */
  select: () => void;
  /** Get current focused radio index */
  getCurrentIndex: () => number;
  /** Set focus to specific radio by index */
  focusIndex: (index: number) => void;
  /** Whether navigation should loop around */
  isLooping: boolean;
  /** Whether navigation is in horizontal mode */
  isHorizontal: boolean;
}

/**
 * Screen reader announcement configuration
 */
export interface BRadioScreenReaderConfig {
  /** Whether to announce changes */
  enabled?: boolean;
  /** Politeness level for announcements */
  politeness?: 'polite' | 'assertive';
  /** Whether to include position information */
  includePosition?: boolean;
  /** Whether to include total count */
  includeTotal?: boolean;
  /** Custom announcement format function */
  formatAnnouncement?: (label: string, position?: number, total?: number) => string;
}

/**
 * Validation state for radio buttons and groups
 */
export interface BRadioValidationState {
  /** Whether the radio/group is in a valid state */
  isValid?: boolean;
  /** Whether the radio/group has been touched/interacted with */
  isTouched?: boolean;
  /** Whether validation is currently running */
  isValidating?: boolean;
  /** Array of validation error messages */
  errors?: string[];
  /** Array of validation warning messages */
  warnings?: string[];
  /** Whether the field is required */
  isRequired?: boolean;
}

/**
 * Radio group context interface for managing radio group behavior
 */
export interface BRadioGroupContext {
  /** Currently selected value */
  selectedValue: BRadioGroupValue;
  /** Group name for radio buttons */
  groupName: string;
  /** Whether the group is disabled */
  isDisabled: boolean;
  /** Orientation of the radio group */
  orientation: BRadioOrientation;
  /** Group label for screen readers */
  groupLabel?: string;
  /** Help text for the group */
  helpText?: string;
  /** Error message for validation */
  errorMessage?: string;
  /** Required status */
  isRequired: boolean;
  /** Validation state */
  validationState?: BRadioValidationState;
  /** Screen reader configuration */
  screenReaderConfig?: BRadioScreenReaderConfig;
  /** Function to select a radio */
  selectRadio: (value: BRadioGroupValue) => void;
  /** Function to navigate with keyboard */
  navigateGroup: (direction: BRadioNavigationDirection) => void;
  /** Function to get all radios in group */
  getGroupRadios: () => HTMLElement[];
  /** Function to register a radio with the group */
  registerRadio: (element: HTMLElement, value: BRadioGroupValue) => void;
  /** Function to unregister a radio from the group */
  unregisterRadio: (element: HTMLElement) => void;
  /** Function to validate the group */
  validateGroup?: () => Promise<boolean> | boolean;
  /** Function to get radio position in group */
  getRadioPosition?: (value: BRadioGroupValue) => number | undefined;
}

/**
 * Props interface for individual BRadio components
 */
export interface BRadioProps {
  /** Whether the radio is selected */
  modelValue?: boolean;
  /** HTML id attribute */
  id?: string;
  /** HTML name attribute */
  name?: string;
  /** Value when used in a radio group */
  groupValue?: BRadioGroupValue;
  /** Whether the radio is disabled */
  disabled?: boolean;
  /** Visual variant of the radio */
  variant?: BRadioVariant;
  /** ARIA label for the radio button */
  ariaLabel?: string;
  /** ID of element that describes this radio */
  ariaDescribedBy?: string;
  /** ID of element that labels this radio */
  ariaLabelledBy?: string;
  /** Help text for the radio */
  helpText?: string;
  /** Error message for validation */
  errorMessage?: string;
  /** Whether the radio is required */
  required?: boolean;
  /** Whether to announce changes to screen readers */
  announceChanges?: boolean;
  /** Position in group for screen reader announcements (1-based) */
  position?: number;
  /** Total number of radios in group for screen reader announcements */
  total?: number;
  /** Custom validation function */
  validator?: (value: boolean) => boolean | string | Promise<boolean | string>;
  /** Whether the radio supports high contrast mode */
  supportsHighContrast?: boolean;
  /** Custom CSS classes */
  class?: string | string[] | Record<string, boolean>;
  /** Custom inline styles */
  style?: string | Record<string, string>;
}

/**
 * Props interface for BRadioGroup components
 */
export interface BRadioGroupProps {
  /** Currently selected value */
  modelValue?: BRadioGroupValue;
  /** Name attribute for all radio buttons in the group */
  name?: string;
  /** Whether the entire group is disabled */
  disabled?: boolean;
  /** Whether the group is required */
  required?: boolean;
  /** Orientation of the radio group */
  orientation?: BRadioOrientation;
  /** ARIA label for the radio group */
  ariaLabel?: string;
  /** ID of element that labels the radio group */
  ariaLabelledBy?: string;
  /** ID of element that describes the radio group */
  ariaDescribedBy?: string;
  /** Help text for the group */
  helpText?: string;
  /** Error message for validation */
  errorMessage?: string;
  /** Whether to announce changes to screen readers */
  announceChanges?: boolean;
  /** Group label for screen readers */
  groupLabel?: string;
  /** Custom validation function for the group */
  validator?: (value: BRadioGroupValue) => boolean | string | Promise<boolean | string>;
  /** Whether keyboard navigation should loop */
  navigationLoop?: boolean;
  /** Whether to focus first selected item on mount */
  autoFocus?: boolean;
  /** Screen reader configuration */
  screenReaderConfig?: BRadioScreenReaderConfig;
  /** Custom CSS classes */
  class?: string | string[] | Record<string, boolean>;
  /** Custom inline styles */
  style?: string | Record<string, string>;
}

/**
 * Event interfaces for BRadio components
 */
export interface BRadioEvents {
  /** Emitted when radio receives focus */
  focus: [event: FocusEvent];
  /** Emitted when radio loses focus */
  blur: [event: FocusEvent];
  /** Emitted when radio selection changes */
  change: [value: BRadioGroupValue, selected: boolean];
  /** Emitted when model value updates */
  'update:modelValue': [value: boolean];
  /** Emitted when validation state changes */
  'validation-change': [isValid: boolean, errors: string[]];
}

/**
 * Event interfaces for BRadioGroup components
 */
export interface BRadioGroupEvents {
  /** Emitted when selection changes */
  change: [value: BRadioGroupValue];
  /** Emitted when group receives focus */
  focus: [event: FocusEvent];
  /** Emitted when group loses focus */
  blur: [event: FocusEvent];
  /** Emitted when model value updates */
  'update:modelValue': [value: BRadioGroupValue];
  /** Emitted when validation state changes */
  'validation-change': [isValid: boolean, errors: string[]];
}

/**
 * Slot interfaces for BRadio components
 */
export interface BRadioSlots {
  /** Default slot for radio label content */
  default: () => any;
  /** Slot for help text content */
  help: () => any;
  /** Slot for error message content */
  error: () => any;
}

/**
 * Slot interfaces for BRadioGroup components
 */
export interface BRadioGroupSlots {
  /** Default slot for radio button children */
  default: () => any;
  /** Slot for group label content */
  label: () => any;
  /** Slot for group help text */
  help: () => any;
  /** Slot for group error message */
  error: () => any;
}

/**
 * Testing utilities and selectors
 */
export interface BRadioTestingUtils {
  /** Data test ID for the radio element */
  radioSelector: string;
  /** Data test ID for the radio input element */
  inputSelector: string;
  /** Data test ID for the radio label */
  labelSelector: string;
  /** Data test ID for help text */
  helpTextSelector: string;
  /** Data test ID for error message */
  errorSelector: string;
  /** Data test ID for radio group */
  groupSelector: string;
  /** Data test ID for group legend */
  legendSelector: string;
}

/**
 * Default testing selectors
 */
export const BRadioTestSelectors: BRadioTestingUtils = {
  radioSelector: '[data-testid="b-radio"]',
  inputSelector: '[data-testid="b-radio-input"]',
  labelSelector: '[data-testid="b-radio-label"]',
  helpTextSelector: '[data-testid="b-radio-help"]',
  errorSelector: '[data-testid="b-radio-error"]',
  groupSelector: '[data-testid="b-radio-group"]',
  legendSelector: '[data-testid="b-radio-group-legend"]',
};

/**
 * Accessibility compliance checklist
 */
export interface BRadioAccessibilityChecklist {
  /** Whether radio has proper role attribute */
  hasProperRole: boolean;
  /** Whether radio has accessible name */
  hasAccessibleName: boolean;
  /** Whether radio state is properly communicated */
  hasProperState: boolean;
  /** Whether radio is keyboard accessible */
  isKeyboardAccessible: boolean;
  /** Whether radio provides proper focus indication */
  hasVisibleFocus: boolean;
  /** Whether radio meets minimum size requirements (44px) */
  meetsMinimumSize: boolean;
  /** Whether radio provides sufficient color contrast */
  hasSufficientContrast: boolean;
  /** Whether radio supports screen readers */
  supportsScreenReaders: boolean;
  /** Whether radio group provides proper navigation */
  hasProperGroupNavigation: boolean;
  /** Whether validation errors are accessible */
  hasAccessibleErrors: boolean;
}

/**
 * Component composition utilities
 */
export interface BRadioCompositionUtils {
  /** Create a radio with accessibility defaults */
  createAccessibleRadio: (props: Partial<BRadioProps>) => BRadioProps;
  /** Create a radio group with accessibility defaults */
  createAccessibleRadioGroup: (props: Partial<BRadioGroupProps>) => BRadioGroupProps;
  /** Validate radio accessibility compliance */
  validateAccessibility: (element: HTMLElement) => BRadioAccessibilityChecklist;
  /** Get WCAG compliance score (0-100) */
  getAccessibilityScore: (element: HTMLElement) => number;
}