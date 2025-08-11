/**
 * TypeScript interfaces for BRoundButton component with comprehensive accessibility support
 */

export interface BRoundButtonProps {
  /** Button ID - auto-generated if not provided */
  id?: string;
  
  /** Button name attribute */
  name?: string;
  
  /** Text displayed when button is hovered or when alwaysOpen is true */
  text?: string;
  
  /** Icon name to display */
  icon?: string;
  
  /** Custom background color (overrides theme color) */
  background?: string;
  
  /** HTML button type */
  type?: 'button' | 'reset' | 'submit';
  
  /** Theme color variant */
  color?: 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'neutral';
  
  /** Button size affecting touch target and visual scale */
  size?: 'small' | 'medium' | 'large';
  
  /** Visual variant affecting appearance */
  variant?: 'default' | 'secondary' | 'plain' | 'reverse';
  
  /** Whether button is disabled */
  disabled?: boolean;
  
  /** Whether text should always be visible */
  alwaysOpen?: boolean;
  
  // Accessibility Props
  
  /** 
   * Accessible label for screen readers
   * Required for icon-only buttons to meet WCAG guidelines
   * Auto-generated based on icon/color if not provided
   */
  ariaLabel?: string;
  
  /** 
   * ID of element that describes this button
   * Used for aria-describedby relationship
   */
  ariaDescribedby?: string;
  
  /** 
   * Enables toggle button functionality with aria-pressed
   * When true, button toggles between pressed/unpressed states
   */
  toggleButton?: boolean;
  
  /** 
   * Pressed state for toggle buttons
   * Only relevant when toggleButton is true
   */
  ariaPressed?: boolean;
  
  /** 
   * Shows loading spinner and sets aria-busy
   * Disables interaction during loading state
   */
  loading?: boolean;
  
  /** 
   * Text announced to screen readers during loading
   * Used for aria-label when loading is true
   */
  loadingText?: string;
}

export interface BRoundButtonEmits {
  /** Emitted when button is clicked */
  (e: 'click', event: MouseEvent): void;
  
  /** Emitted when toggle state changes (only for toggle buttons) */
  (e: 'change', pressed: boolean): void;
}

export interface BRoundButtonSlots {
  /** Override default icon content */
  icon?: (props: { icon: string; loading: boolean }) => any;
  
  /** Override default text content */
  text?: (props: { text: string; visible: boolean }) => any;
  
  /** Custom loading indicator */
  loading?: (props: { loadingText: string }) => any;
}

/**
 * Accessibility-specific interfaces
 */

export interface AccessibilityFeatures {
  /** Auto-generated unique ID for ARIA relationships */
  readonly buttonId: string;
  
  /** Computed ARIA attributes object */
  readonly ariaAttributes: Record<string, any>;
  
  /** Computed accessible label */
  readonly computedAriaLabel: string;
  
  /** Whether button meets WCAG touch target guidelines */
  readonly hasSufficientTouchTarget: boolean;
  
  /** Current toggle state (for toggle buttons only) */
  readonly pressedState: boolean | undefined;
}

export interface KeyboardInteractionHandlers {
  /** Handles Enter and Space key activation */
  handleKeydown: (event: KeyboardEvent) => void;
  
  /** Handles mouse click events */
  handleClick: (event: MouseEvent) => void;
}

export interface TouchTargetValidation {
  /** Minimum touch target size in pixels (WCAG guideline) */
  readonly MIN_TOUCH_TARGET_SIZE: 44;
  
  /** Current button size mapping */
  readonly sizeMapping: Record<'small' | 'medium' | 'large', number>;
  
  /** Validates if current size meets guidelines */
  readonly isAccessible: boolean;
}

/**
 * Screen reader announcement patterns
 */
export interface ScreenReaderAnnouncements {
  /** Announces button activation */
  announceActivation: (label: string) => void;
  
  /** Announces toggle state change */
  announceToggle: (label: string, pressed: boolean) => void;
  
  /** Announces loading state change */
  announceLoadingChange: (loading: boolean, loadingText: string) => void;
}

/**
 * ARIA attribute mapping for different button states
 */
export interface ARIAStateMapping {
  /** Default button ARIA attributes */
  default: {
    role: 'button';
    'aria-disabled'?: boolean;
    'aria-label'?: string;
    'aria-describedby'?: string;
  };
  
  /** Toggle button specific ARIA attributes */
  toggle: {
    'aria-pressed': boolean;
  };
  
  /** Loading state ARIA attributes */
  loading: {
    'aria-busy': boolean;
    'aria-label': string;
  };
}

/**
 * Focus management interface
 */
export interface FocusManagement {
  /** Whether button currently has focus */
  readonly hasFocus: boolean;
  
  /** Programmatically focus the button */
  focus: () => void;
  
  /** Programmatically blur the button */
  blur: () => void;
  
  /** Get current focus state */
  getFocusState: () => 'focused' | 'blurred';
}

/**
 * Icon labeling system
 */
export interface IconLabeling {
  /** Default icon-to-label mappings */
  readonly iconLabels: Record<string, string>;
  
  /** Color-to-label fallback mappings */
  readonly colorLabels: Record<string, string>;
  
  /** Generate appropriate label for icon/color combination */
  generateLabel: (icon?: string, color?: string) => string;
}

/**
 * Complete component instance interface
 */
export interface BRoundButtonInstance {
  /** Component props */
  $props: BRoundButtonProps;
  
  /** Component emits */
  $emit: BRoundButtonEmits;
  
  /** Accessibility features */
  accessibility: AccessibilityFeatures;
  
  /** Keyboard interaction handlers */
  keyboard: KeyboardInteractionHandlers;
  
  /** Touch target validation */
  touchTarget: TouchTargetValidation;
  
  /** Screen reader utilities */
  screenReader: ScreenReaderAnnouncements;
  
  /** Focus management */
  focus: FocusManagement;
  
  /** Icon labeling system */
  iconLabeling: IconLabeling;
}