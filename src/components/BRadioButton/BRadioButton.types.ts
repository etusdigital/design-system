import type { GroupValue } from "../BGroup/BGroup.types";

/**
 * BRadioButton accessibility props interface
 * Implements WCAG 2.1 AA standards for radio button components with button-style appearance
 */
export interface BRadioButtonAccessibilityProps {
  /** ARIA label for the radio button */
  ariaLabel?: string;
  /** ID of element that labels this radio button */
  ariaLabelledBy?: string;
  /** ID of element that describes this radio button */
  ariaDescribedBy?: string;
  /** Help text for screen readers */
  helpText?: string;
  /** Error message for validation */
  errorMessage?: string;
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
  /** Whether radio button is required (part of required group) */
  required?: boolean;
  /** Position in group for screen reader announcements */
  positionInGroup?: { current: number; total: number };
}

/**
 * Complete BRadioButton props interface
 * Combines all functionality with accessibility features
 */
export interface BRadioButtonProps extends BRadioButtonAccessibilityProps {
  /** Current model value (selected state) */
  modelValue?: boolean;
  /** HTML id attribute */
  id?: string;
  /** HTML name attribute for grouping */
  name?: string;
  /** Value associated with this radio button when used in BGroup */
  groupValue?: GroupValue;
  /** Whether the radio button is disabled */
  disabled?: boolean;
  /** Whether to render with alternative div styling */
  isDiv?: boolean;
  /** HTML tabindex attribute (managed by group context) */
  tabindex?: number;
  /** Additional CSS classes */
  class?: string;
  /** Inline styles */
  style?: string | Record<string, any>;
}

/**
 * Radio button state interface for accessibility
 */
export interface RadioButtonState {
  /** Whether the radio button is selected */
  isSelected: boolean;
  /** Whether the radio button is disabled */
  isDisabled: boolean;
  /** Whether the radio button has focus */
  hasFocus: boolean;
  /** Whether the radio button is in an error state */
  hasError: boolean;
  /** Whether the radio button is required */
  isRequired: boolean;
  /** Position information for screen readers */
  position?: { current: number; total: number };
}

/**
 * Radio button ARIA attributes interface
 */
export interface RadioButtonAriaAttributes {
  /** ARIA role */
  role: 'radio';
  /** ARIA checked state */
  'aria-checked': boolean;
  /** ARIA disabled state */
  'aria-disabled'?: boolean;
  /** ARIA described by relationships */
  'aria-describedby'?: string;
  /** ARIA labelled by relationships */
  'aria-labelledby'?: string;
  /** ARIA label */
  'aria-label'?: string;
  /** ARIA invalid state */
  'aria-invalid'?: boolean;
  /** ARIA required state */
  'aria-required'?: boolean;
  /** Position in set for screen readers */
  'aria-posinset'?: number;
  /** Set size for screen readers */
  'aria-setsize'?: number;
}

/**
 * Radio button keyboard event handlers
 */
export interface RadioButtonKeyboardHandlers {
  /** Handle Space key press to select */
  onSpace: (event: KeyboardEvent) => void;
  /** Handle Enter key press to select */
  onEnter: (event: KeyboardEvent) => void;
  /** Handle arrow key navigation */
  onArrow: (event: KeyboardEvent) => void;
  /** Handle focus events */
  onFocus: (event: FocusEvent) => void;
  /** Handle blur events */
  onBlur: (event: FocusEvent) => void;
}

/**
 * Radio button group context interface
 * Extended from base GroupState for radio button specific behavior
 */
export interface RadioButtonGroupContext {
  /** Group name for HTML name attribute */
  groupName: string;
  /** Currently selected value in the group */
  selectedValue: GroupValue;
  /** Whether the entire group is disabled */
  groupDisabled: boolean;
  /** Whether the group is required */
  groupRequired: boolean;
  /** Group orientation for keyboard navigation */
  orientation: 'horizontal' | 'vertical';
  /** Function to select this radio button */
  selectRadio: (value: GroupValue) => void;
  /** Function to register radio button with group */
  registerRadio: (value: GroupValue, element: HTMLElement) => void;
  /** Function to unregister radio button from group */
  unregisterRadio: (value: GroupValue) => void;
  /** Function to handle keyboard navigation */
  handleNavigation: (event: KeyboardEvent, currentValue: GroupValue) => void;
  /** Function to announce selection change */
  announceSelection: (value: GroupValue, label: string) => void;
  /** Get position info for a radio button */
  getPositionInfo: (value: GroupValue) => { current: number; total: number } | undefined;
}

/**
 * Radio button announcement templates
 */
export interface RadioButtonAnnouncementTemplates {
  /** Template for selection announcement */
  selected: string;
  /** Template for deselection (when switching) */
  deselected: string;
  /** Template for focus announcement */
  focused: string;
  /** Template for error announcement */
  error: string;
  /** Template for disabled state */
  disabled: string;
}

/**
 * Radio button focus management options
 */
export interface RadioButtonFocusOptions {
  /** Whether to use enhanced focus indicators */
  enhanced: boolean;
  /** Whether to trap focus within group */
  trapFocus: boolean;
  /** Whether to auto-focus on selection */
  autoFocus: boolean;
  /** Focus ring color customization */
  focusRingColor?: string;
  /** Focus ring width */
  focusRingWidth?: string;
}

/**
 * Radio button validation result
 */
export interface RadioButtonValidationResult {
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
 * Radio button size variants for accessibility compliance
 */
export type RadioButtonSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Radio button color schemes with accessibility compliance
 */
export type RadioButtonColorScheme = 'default' | 'primary' | 'success' | 'warning' | 'danger';

/**
 * Export all types for easy importing
 */
export type {
  BRadioButtonAccessibilityProps as AccessibilityProps,
  BRadioButtonProps as Props,
  RadioButtonState as State,
  RadioButtonAriaAttributes as AriaAttributes,
  RadioButtonKeyboardHandlers as KeyboardHandlers,
  RadioButtonGroupContext as GroupContext,
  RadioButtonAnnouncementTemplates as AnnouncementTemplates,
  RadioButtonFocusOptions as FocusOptions,
  RadioButtonValidationResult as ValidationResult,
};