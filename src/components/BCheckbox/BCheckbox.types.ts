/**
 * Comprehensive TypeScript definitions for BCheckbox component
 * Provides full type safety and documentation for all accessibility features
 */

/**
 * Validation states for checkbox component
 */
export type ValidationState = 'valid' | 'invalid' | 'pending' | 'none';

/**
 * Checkbox state type - supports boolean values and null for indeterminate state
 */
export type CheckState = boolean | null;

/**
 * Checkbox group roles for semantic grouping
 */
export type CheckboxGroupRole = 'group' | 'radiogroup' | 'listbox' | undefined;

/**
 * Comprehensive accessibility properties for checkbox component
 * Implements WCAG 2.1 AA guidelines for form controls
 */
export interface CheckboxAccessibilityProps {
  /** 
   * ARIA label override for the checkbox
   * @description Provides alternative accessible name when label content is not sufficient
   * @example "Accept marketing emails from our company"
   */
  ariaLabel?: string;

  /** 
   * ARIA description for complex checkboxes
   * @description Provides additional context that screen readers will announce
   * @example "By checking this box, you consent to receiving promotional emails"
   */
  ariaDescription?: string;

  /** 
   * Whether to announce state changes to screen readers
   * @description Controls automatic announcements when checkbox state changes
   * @default true
   */
  announceChanges?: boolean;

  /** 
   * Custom state change announcement message
   * @description Override default state announcements with custom messages
   * @example "Marketing preference updated"
   */
  customStateAnnouncement?: string;

  /** 
   * Help text for complex checkbox patterns
   * @description Provides visible help text that's also read by screen readers
   * @example "You can unsubscribe at any time"
   */
  helpText?: string;

  /** 
   * Whether the checkbox is part of a group
   * @description Defines the semantic role for grouped checkboxes
   * @example "group" for related preferences
   */
  groupRole?: CheckboxGroupRole;

  /** 
   * Custom error announcement message
   * @description Override default error announcements with custom messages
   * @example "Please accept the terms to continue with registration"
   */
  customErrorAnnouncement?: string;

  /** 
   * Error message for validation
   * @description Displays validation error and associates it with the checkbox
   * @example "You must accept the terms to continue"
   */
  errorMessage?: string;

  /** 
   * Required field indicator
   * @description Marks checkbox as required with visual and ARIA indicators
   * @default false
   */
  required?: boolean;

  /** 
   * Validation state for styling and announcements
   * @description Controls visual styling and screen reader announcements
   * @default 'none'
   */
  validationState?: ValidationState;
}

/**
 * Core checkbox properties with comprehensive accessibility support
 */
export interface BCheckboxProps extends CheckboxAccessibilityProps {
  /** 
   * Unique identifier for the checkbox
   * @description Used for label association and form submission
   */
  id?: string;

  /** 
   * Name attribute for form submission
   * @description Groups related checkboxes in forms
   */
  name?: string;

  /** 
   * Checkbox state (v-model)
   * @description Can be boolean or null if allowIndeterminate is true
   * @default false
   */
  modelValue?: CheckState;

  /** 
   * Position checkbox to the right of the label
   * @description Changes visual layout while maintaining accessibility
   * @default false
   */
  rhs?: boolean;

  /** 
   * Allow checkbox to have an indeterminate state
   * @description Enables tri-state checkbox behavior
   * @default false
   */
  allowIndeterminate?: boolean;

  /** 
   * Disable the checkbox
   * @description Makes checkbox non-interactive with proper ARIA attributes
   * @default false
   */
  disabled?: boolean;
}

/**
 * Checkbox component events with comprehensive typing
 */
export interface BCheckboxEvents {
  /** 
   * Emitted when checkbox state changes
   * @param value - New checkbox state
   */
  'update:modelValue': [value: CheckState];

  /** 
   * Emitted when validation state changes
   * @param state - New validation state
   */
  'validation-change': [state: ValidationState];

  /** 
   * Emitted when checkbox receives focus
   * @param event - Focus event object
   */
  'focus': [event: FocusEvent];

  /** 
   * Emitted when checkbox loses focus
   * @param event - Blur event object
   */
  'blur': [event: FocusEvent];
}

/**
 * Checkbox component slots for flexible content
 */
export interface BCheckboxSlots {
  /** 
   * Default slot for checkbox label content
   * @description Main label text or HTML content
   */
  default?: () => any;

  /** 
   * Slot for group label when used in checkbox groups
   * @description Used with groupRole prop for semantic grouping
   */
  groupLabel?: () => any;
}

/**
 * Checkbox component exposed methods
 */
export interface BCheckboxExpose {
  /** 
   * Programmatically focus the checkbox
   * @description Useful for form validation and keyboard navigation
   */
  focus: () => void;

  /** 
   * Programmatically toggle the checkbox state
   * @description Useful for custom interactions
   */
  toggle: () => void;

  /** 
   * Validate the checkbox based on required state
   * @returns true if valid, false if invalid
   */
  validate: () => boolean;
}

/**
 * Complete checkbox component interface combining all aspects
 */
export interface BCheckboxComponent {
  props: BCheckboxProps;
  events: BCheckboxEvents;
  slots: BCheckboxSlots;
  expose: BCheckboxExpose;
}

/**
 * Checkbox group configuration for managing multiple related checkboxes
 */
export interface CheckboxGroupConfig {
  /** 
   * Group label for accessibility
   * @description Provides context for the group of checkboxes
   */
  label: string;

  /** 
   * Group description for screen readers
   * @description Additional context about the checkbox group
   */
  description?: string;

  /** 
   * Whether the group is required
   * @description Indicates if at least one checkbox must be selected
   */
  required?: boolean;

  /** 
   * Error message for group validation
   * @description Displayed when group validation fails
   */
  errorMessage?: string;

  /** 
   * Individual checkbox configurations
   * @description Array of checkbox configurations within the group
   */
  checkboxes: Array<{
    id: string;
    label: string;
    value: CheckState;
    disabled?: boolean;
    helpText?: string;
  }>;
}

/**
 * Accessibility testing utilities for BCheckbox component
 */
export interface CheckboxAccessibilityTest {
  /** 
   * Test keyboard navigation
   * @description Verifies Tab, Space, and Enter key functionality
   */
  testKeyboardNavigation: () => boolean;

  /** 
   * Test screen reader announcements
   * @description Verifies proper ARIA attributes and live regions
   */
  testScreenReaderSupport: () => boolean;

  /** 
   * Test focus management
   * @description Verifies visible focus indicators and focus trapping
   */
  testFocusManagement: () => boolean;

  /** 
   * Test validation states
   * @description Verifies error handling and validation feedback
   */
  testValidationStates: () => boolean;

  /** 
   * Test semantic structure
   * @description Verifies proper HTML semantics and ARIA relationships
   */
  testSemanticStructure: () => boolean;
}