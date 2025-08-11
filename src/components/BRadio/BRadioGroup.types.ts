/**
 * BRadioGroup TypeScript Type Definitions
 * Comprehensive accessibility interfaces for WCAG 2.1 AA compliance
 */

import type { 
  BRadioGroupValue, 
  BRadioOrientation, 
  BRadioNavigationDirection,
  BRadioScreenReaderConfig,
  BRadioValidationState,
  BRadioGroupContext
} from './BRadio.types';

/**
 * Fieldset semantic configuration for radio groups
 */
export interface BRadioGroupFieldsetConfig {
  /** Whether to use fieldset/legend semantics */
  useFieldset?: boolean;
  /** Legend text for the fieldset */
  legend?: string;
  /** Whether legend should be visually hidden but screen reader accessible */
  hideLegend?: boolean;
  /** Additional CSS classes for the fieldset element */
  fieldsetClass?: string | string[] | Record<string, boolean>;
  /** Additional CSS classes for the legend element */
  legendClass?: string | string[] | Record<string, boolean>;
}

/**
 * Group-level keyboard navigation configuration
 */
export interface BRadioGroupKeyboardConfig {
  /** Orientation affects arrow key behavior */
  orientation?: BRadioOrientation;
  /** Whether navigation should wrap around (first to last, last to first) */
  loop?: boolean;
  /** Whether to auto-focus first selected radio on mount */
  autoFocus?: boolean;
  /** Whether to focus first radio if none selected */
  focusFirstIfNoneSelected?: boolean;
  /** Custom key mappings for navigation */
  keyMappings?: {
    next?: string[];
    previous?: string[];
    first?: string[];
    last?: string[];
    select?: string[];
  };
}

/**
 * Group-level validation configuration
 */
export interface BRadioGroupValidationConfig {
  /** Whether the group selection is required */
  required?: boolean;
  /** Custom validation function */
  validator?: (value: BRadioGroupValue) => boolean | string | Promise<boolean | string>;
  /** Error message for required validation */
  requiredMessage?: string;
  /** Whether to validate on change */
  validateOnChange?: boolean;
  /** Whether to validate on mount */
  validateOnMount?: boolean;
  /** Whether to clear errors when valid selection is made */
  clearErrorsOnValid?: boolean;
}

/**
 * Group-level accessibility announcements configuration
 */
export interface BRadioGroupAnnouncementConfig {
  /** Whether to announce group changes */
  announceChanges?: boolean;
  /** Whether to include position in announcements (e.g., "2 of 4") */
  includePosition?: boolean;
  /** Whether to include group label in announcements */
  includeGroupLabel?: boolean;
  /** Custom announcement format function */
  formatAnnouncement?: (
    selectedLabel: string,
    position?: number,
    total?: number,
    groupLabel?: string
  ) => string;
  /** Politeness level for announcements */
  politeness?: 'polite' | 'assertive';
  /** Delay before announcement (ms) */
  announcementDelay?: number;
}

/**
 * Focus management configuration for radio groups
 */
export interface BRadioGroupFocusConfig {
  /** Strategy for initial focus */
  initialFocus?: 'none' | 'first' | 'selected' | 'last';
  /** Whether to maintain focus within group during navigation */
  trapFocus?: boolean;
  /** Whether to restore focus when group is re-entered */
  restoreFocus?: boolean;
  /** Focus ring styling options */
  focusRing?: {
    offset?: string;
    width?: string;
    color?: string;
    style?: 'solid' | 'dashed' | 'dotted';
  };
}

/**
 * High contrast and theme support configuration
 */
export interface BRadioGroupThemeConfig {
  /** Whether to support high contrast mode */
  supportsHighContrast?: boolean;
  /** Whether to support forced colors mode */
  supportsForcedColors?: boolean;
  /** Whether to support reduced motion preferences */
  supportsReducedMotion?: boolean;
  /** Whether to support dark mode */
  supportsDarkMode?: boolean;
  /** Custom theme class prefix */
  themePrefix?: string;
}

/**
 * Comprehensive props interface for BRadioGroup components
 */
export interface BRadioGroupProps {
  /** Currently selected value (v-model) */
  modelValue?: BRadioGroupValue;
  
  /** Basic configuration */
  name?: string;
  disabled?: boolean;
  readonly?: boolean;
  
  /** Fieldset and legend configuration */
  fieldset?: BRadioGroupFieldsetConfig;
  groupLabel?: string;
  
  /** ARIA attributes */
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  
  /** Orientation and layout */
  orientation?: BRadioOrientation;
  
  /** Help text and descriptions */
  helpText?: string;
  description?: string;
  
  /** Validation and error handling */
  validation?: BRadioGroupValidationConfig;
  errorMessage?: string;
  required?: boolean;
  
  /** Keyboard navigation */
  keyboard?: BRadioGroupKeyboardConfig;
  navigationLoop?: boolean;
  autoFocus?: boolean;
  
  /** Screen reader and announcements */
  screenReader?: BRadioGroupAnnouncementConfig;
  announceChanges?: boolean;
  
  /** Focus management */
  focus?: BRadioGroupFocusConfig;
  
  /** Theme and accessibility */
  theme?: BRadioGroupThemeConfig;
  supportsHighContrast?: boolean;
  
  /** Custom styling */
  class?: string | string[] | Record<string, boolean>;
  style?: string | Record<string, string>;
  
  /** Advanced configuration */
  size?: 'sm' | 'md' | 'lg';
  density?: 'comfortable' | 'compact';
  
  /** Testing attributes */
  testId?: string;
  dataTestId?: string;
}

/**
 * Event interfaces for BRadioGroup components
 */
export interface BRadioGroupEvents {
  /** Emitted when selection changes */
  change: [value: BRadioGroupValue, previousValue?: BRadioGroupValue];
  
  /** Emitted when model value updates */
  'update:modelValue': [value: BRadioGroupValue];
  
  /** Focus events */
  focus: [event: FocusEvent, radioValue?: BRadioGroupValue];
  blur: [event: FocusEvent, radioValue?: BRadioGroupValue];
  
  /** Validation events */
  'validation-change': [isValid: boolean, errors: string[]];
  'validation-error': [errors: string[]];
  'validation-success': [];
  
  /** Keyboard navigation events */
  'keyboard-navigate': [
    direction: BRadioNavigationDirection, 
    from: BRadioGroupValue, 
    to: BRadioGroupValue
  ];
  
  /** Group lifecycle events */
  mounted: [];
  'radio-registered': [value: BRadioGroupValue, element: HTMLElement];
  'radio-unregistered': [value: BRadioGroupValue, element: HTMLElement];
  
  /** Accessibility events */
  'screen-reader-announce': [message: string, politeness: 'polite' | 'assertive'];
}

/**
 * Slot interfaces for BRadioGroup components
 */
export interface BRadioGroupSlots {
  /** Default slot for radio button children */
  default: () => any;
  
  /** Slot for custom group label */
  label: (props: { required: boolean; groupLabel?: string }) => any;
  
  /** Slot for custom legend content */
  legend: (props: { required: boolean; groupLabel?: string }) => any;
  
  /** Slot for help text content */
  help: (props: { helpText?: string; description?: string }) => any;
  
  /** Slot for error message content */
  error: (props: { errorMessage?: string; errors: string[] }) => any;
  
  /** Slot for additional group description */
  description: (props: { description?: string }) => any;
  
  /** Slot for group prefix content */
  prefix: () => any;
  
  /** Slot for group suffix content */
  suffix: () => any;
}

/**
 * Extended radio group context with additional group-specific functionality
 */
export interface BRadioGroupContextExtended extends BRadioGroupContext {
  /** Group configuration */
  config: {
    fieldset: BRadioGroupFieldsetConfig;
    keyboard: BRadioGroupKeyboardConfig;
    validation: BRadioGroupValidationConfig;
    announcements: BRadioGroupAnnouncementConfig;
    focus: BRadioGroupFocusConfig;
    theme: BRadioGroupThemeConfig;
  };
  
  /** Group state */
  state: {
    isValid: boolean;
    isTouched: boolean;
    isValidating: boolean;
    errors: string[];
    focusedValue?: BRadioGroupValue;
    lastAnnouncementTime?: number;
  };
  
  /** Enhanced methods */
  methods: {
    /** Focus specific radio by value */
    focusRadio: (value: BRadioGroupValue) => void;
    /** Get radio element by value */
    getRadioElement: (value: BRadioGroupValue) => HTMLElement | undefined;
    /** Get all registered radio values */
    getRadioValues: () => BRadioGroupValue[];
    /** Validate the entire group */
    validateGroup: () => Promise<{ isValid: boolean; errors: string[] }>;
    /** Reset group state */
    resetGroup: () => void;
    /** Clear validation errors */
    clearErrors: () => void;
    /** Force announcement */
    announceToScreenReader: (message: string, politeness?: 'polite' | 'assertive') => void;
    /** Get radio at specific index */
    getRadioAtIndex: (index: number) => { value: BRadioGroupValue; element: HTMLElement } | undefined;
    /** Get index of radio by value */
    getRadioIndex: (value: BRadioGroupValue) => number;
  };
}

/**
 * Testing utilities and selectors for BRadioGroup
 */
export interface BRadioGroupTestingUtils {
  /** Data test ID for the radio group */
  groupSelector: string;
  /** Data test ID for the fieldset element */
  fieldsetSelector: string;
  /** Data test ID for the legend element */
  legendSelector: string;
  /** Data test ID for group help text */
  helpTextSelector: string;
  /** Data test ID for group error message */
  errorSelector: string;
  /** Data test ID for group description */
  descriptionSelector: string;
  /** Get selector for specific radio by value */
  getRadioSelector: (value: BRadioGroupValue) => string;
  /** Get selector for radio at index */
  getRadioByIndexSelector: (index: number) => string;
}

/**
 * Default testing selectors for BRadioGroup
 */
export const BRadioGroupTestSelectors: BRadioGroupTestingUtils = {
  groupSelector: '[data-testid^="b-radio-group"]',
  fieldsetSelector: '[data-testid^="b-radio-group"] fieldset',
  legendSelector: '[data-testid^="b-radio-group-legend"]',
  helpTextSelector: '[data-testid^="b-radio-group-help"]',
  errorSelector: '[data-testid^="b-radio-group-error"]',
  descriptionSelector: '[data-testid^="b-radio-group-description"]',
  getRadioSelector: (value: BRadioGroupValue) => `[data-testid="b-radio"][data-radio-value="${value}"]`,
  getRadioByIndexSelector: (index: number) => `[data-testid="b-radio"]:nth-of-type(${index + 1})`,
};

/**
 * Accessibility compliance checklist for BRadioGroup
 */
export interface BRadioGroupAccessibilityChecklist {
  /** Whether group has proper fieldset/radiogroup semantics */
  hasProperGroupSemantics: boolean;
  
  /** Whether group has accessible name (legend or aria-label) */
  hasAccessibleGroupName: boolean;
  
  /** Whether required state is properly communicated */
  hasProperRequiredState: boolean;
  
  /** Whether keyboard navigation works correctly */
  hasProperKeyboardNavigation: boolean;
  
  /** Whether arrow keys navigate within group */
  hasArrowKeyNavigation: boolean;
  
  /** Whether tab key moves between groups */
  hasProperTabBehavior: boolean;
  
  /** Whether focus management works correctly */
  hasProperFocusManagement: boolean;
  
  /** Whether screen reader announcements work */
  hasScreenReaderSupport: boolean;
  
  /** Whether validation errors are accessible */
  hasAccessibleErrors: boolean;
  
  /** Whether help text is properly associated */
  hasAccessibleHelpText: boolean;
  
  /** Whether high contrast mode is supported */
  hasHighContrastSupport: boolean;
  
  /** Whether reduced motion is respected */
  hasReducedMotionSupport: boolean;
  
  /** Whether touch targets meet minimum size (44px) */
  meetsTouchTargetSize: boolean;
  
  /** Whether color contrast meets WCAG AA standards */
  meetsColorContrast: boolean;
  
  /** Overall WCAG 2.1 AA compliance score (0-100) */
  overallComplianceScore: number;
}

/**
 * Composition utilities for creating accessible radio groups
 */
export interface BRadioGroupCompositionUtils {
  /** Create radio group with accessibility defaults */
  createAccessibleRadioGroup: (
    options: Partial<BRadioGroupProps>
  ) => BRadioGroupProps;
  
  /** Create fieldset configuration with accessibility defaults */
  createFieldsetConfig: (
    legend: string,
    options?: Partial<BRadioGroupFieldsetConfig>
  ) => BRadioGroupFieldsetConfig;
  
  /** Create keyboard configuration with accessibility defaults */
  createKeyboardConfig: (
    orientation?: BRadioOrientation,
    options?: Partial<BRadioGroupKeyboardConfig>
  ) => BRadioGroupKeyboardConfig;
  
  /** Create validation configuration */
  createValidationConfig: (
    required?: boolean,
    options?: Partial<BRadioGroupValidationConfig>
  ) => BRadioGroupValidationConfig;
  
  /** Validate radio group accessibility compliance */
  validateGroupAccessibility: (
    element: HTMLElement
  ) => BRadioGroupAccessibilityChecklist;
  
  /** Get accessibility score for radio group */
  getGroupAccessibilityScore: (element: HTMLElement) => number;
  
  /** Generate ARIA attributes for radio group */
  generateGroupAriaAttributes: (
    props: BRadioGroupProps,
    state: { hasError: boolean; isRequired: boolean }
  ) => Record<string, string | boolean | undefined>;
}

/**
 * Performance optimization configuration
 */
export interface BRadioGroupPerformanceConfig {
  /** Whether to use virtual scrolling for large groups */
  useVirtualScrolling?: boolean;
  
  /** Debounce delay for validation (ms) */
  validationDebounce?: number;
  
  /** Debounce delay for announcements (ms) */
  announcementDebounce?: number;
  
  /** Whether to lazy load non-visible radios */
  lazyLoad?: boolean;
  
  /** Maximum number of radios before performance optimizations kick in */
  performanceThreshold?: number;
}

/**
 * Complete configuration interface combining all aspects
 */
export interface BRadioGroupConfig extends BRadioGroupProps {
  /** Performance optimizations */
  performance?: BRadioGroupPerformanceConfig;
  
  /** Development and debugging options */
  debug?: {
    logKeyboardEvents?: boolean;
    logValidationEvents?: boolean;
    logAnnouncementEvents?: boolean;
    logFocusEvents?: boolean;
  };
}

/**
 * Type guards for runtime type checking
 */
export const BRadioGroupTypeGuards = {
  /** Check if value is valid BRadioGroupValue */
  isValidGroupValue: (value: unknown): value is BRadioGroupValue => {
    return value !== null && 
           (typeof value === 'string' || 
            typeof value === 'number' || 
            typeof value === 'boolean' || 
            value === undefined);
  },
  
  /** Check if orientation is valid */
  isValidOrientation: (value: unknown): value is BRadioOrientation => {
    return value === 'horizontal' || value === 'vertical';
  },
  
  /** Check if element is radio group element */
  isRadioGroupElement: (element: HTMLElement): boolean => {
    return element.getAttribute('role') === 'radiogroup' || 
           element.tagName.toLowerCase() === 'fieldset';
  },
  
  /** Check if element is radio element */
  isRadioElement: (element: HTMLElement): boolean => {
    return element.getAttribute('role') === 'radio' || 
           (element.tagName.toLowerCase() === 'input' && 
            (element as HTMLInputElement).type === 'radio');
  },
};

/**
 * Default configurations for common use cases
 */
export const BRadioGroupDefaults = {
  /** Basic radio group configuration */
  basic: (): BRadioGroupProps => ({
    orientation: 'vertical',
    announceChanges: true,
    navigationLoop: true,
    supportsHighContrast: true,
  }),
  
  /** Accessible radio group with all features enabled */
  accessible: (): BRadioGroupProps => ({
    orientation: 'vertical',
    announceChanges: true,
    navigationLoop: true,
    autoFocus: false,
    supportsHighContrast: true,
    fieldset: {
      useFieldset: true,
      hideLegend: false,
    },
    validation: {
      validateOnChange: true,
      clearErrorsOnValid: true,
    },
    screenReader: {
      includePosition: true,
      includeGroupLabel: true,
      politeness: 'polite',
    },
  }),
  
  /** Horizontal radio group for options like sizes */
  horizontal: (): BRadioGroupProps => ({
    orientation: 'horizontal',
    announceChanges: true,
    navigationLoop: true,
    supportsHighContrast: true,
    keyboard: {
      loop: true,
      autoFocus: false,
    },
  }),
  
  /** Required radio group with validation */
  required: (groupLabel: string, errorMessage?: string): BRadioGroupProps => ({
    required: true,
    groupLabel,
    errorMessage,
    orientation: 'vertical',
    announceChanges: true,
    validation: {
      required: true,
      requiredMessage: errorMessage || `${groupLabel} is required`,
      validateOnChange: true,
    },
    fieldset: {
      useFieldset: true,
      legend: groupLabel,
    },
  }),
};