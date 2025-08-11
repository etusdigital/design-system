import type { ComputedRef, Ref } from 'vue';

/**
 * Color types supported by the picker
 */
export type ColorType = "hexa" | "hsla" | "hwb" | "hsva" | "rgba";

/**
 * RGBA color object
 */
export interface RgbaColor extends GenericColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

/**
 * HSVA color object
 */
export interface HsvaColor extends GenericColor {
  h: number;
  s: number | string;
  v: number | string;
  a: number;
}

/**
 * Color object with arbitrary properties
 */
export interface GenericColor {
  [key: string]: number | string;
}

/**
 * HSLA color object
 */
export interface HslaColor extends GenericColor {
  h: number;
  s: number | string;
  l: number | string;
  a: number;
}

/**
 * HWB color object
 */
export interface HwbColor extends GenericColor {
  h: number;
  w: number | string;
  b: number | string;
  a: number;
}

/**
 * Position coordinates
 */
export interface Position {
  x: number;
  y: number;
}

/**
 * Mouse/Touch event with position
 */
export interface PositionEvent {
  clientX: number;
  clientY: number;
}

/**
 * Color contrast information
 */
export interface ColorContrastInfo {
  ratio: number;
  level: 'AAA' | 'AA' | 'A' | 'fail';
  description: string;
}

/**
 * Accessibility configuration for keyboard navigation
 */
export interface ColorPickerKeyboardConfig {
  /** Step size for color area navigation (pixels) */
  colorAreaStep?: number;
  /** Step size for hue slider (degrees) */
  hueStep?: number;
  /** Step size for opacity slider (0-1) */
  opacityStep?: number;
  /** Whether to announce color changes during navigation */
  announceChanges?: boolean;
  /** Custom key bindings */
  customKeys?: Record<string, (event: KeyboardEvent) => void>;
}

/**
 * Screen reader announcement configuration
 */
export interface ColorAnnouncements {
  /** Whether to announce color format changes */
  announceFormat?: boolean;
  /** Whether to announce color value changes */
  announceValue?: boolean;
  /** Whether to announce contrast information */
  announceContrast?: boolean;
  /** Custom color name mappings for better readability */
  colorNames?: Record<string, string>;
}

/**
 * Color picker accessibility features configuration
 */
export interface ColorPickerAccessibilityConfig {
  /** Keyboard navigation settings */
  keyboard?: ColorPickerKeyboardConfig;
  /** Screen reader announcement settings */
  announcements?: ColorAnnouncements;
  /** Whether to provide contrast validation */
  contrastValidation?: boolean;
  /** Target background color for contrast calculations */
  contrastBackground?: string;
  /** Alternative text input for precise color entry */
  alternativeInput?: boolean;
  /** Preset color palette for quick selection */
  presetColors?: Array<{ color: string; name: string; description?: string }>;
}

/**
 * Main BColorPicker component props with comprehensive accessibility support
 */
export interface BColorPickerProps {
  /** The color value as a string */
  modelValue?: string;
  /** The color format type */
  type?: ColorType;
  /** Whether to hide the card shadow */
  noShadow?: boolean;
  /** Accessibility label for the color picker */
  ariaLabel?: string;
  /** ID of element that describes the color picker */
  ariaDescribedby?: string;
  /** Whether the color picker is disabled */
  disabled?: boolean;
  /** Whether the color picker is in an invalid state */
  invalid?: boolean;
  /** Error message for screen readers */
  errorMessage?: string;
  /** Accessibility configuration */
  accessibility?: ColorPickerAccessibilityConfig;
  /** Whether to show color name in readable format */
  showColorName?: boolean;
  /** Whether to show contrast information */
  showContrast?: boolean;
  /** Custom color name resolver function */
  getColorName?: (color: RgbaColor) => string;
  /** Focus trap container ID for modal usage */
  focusTrapContainer?: string;
  /** Whether to use reduced motion preferences */
  respectReducedMotion?: boolean;
  /** High contrast mode support */
  highContrast?: boolean;
}

/**
 * Color picker component emits with accessibility events
 */
export interface BColorPickerEmits {
  'update:modelValue': [value: string];
  'update:type': [value: string];
  'focus': [event: FocusEvent];
  'blur': [event: FocusEvent];
  'colorChange': [color: RgbaColor, colorName: string];
  'formatChange': [format: ColorType];
  'contrastChange': [contrast: ColorContrastInfo];
}

/**
 * Internal color picker state for accessibility
 */
export interface ColorPickerAccessibilityState {
  /** Current focused element */
  focusedElement: Ref<'area' | 'hue' | 'opacity' | 'input' | 'format' | null>;
  /** Whether keyboard navigation is active */
  keyboardActive: Ref<boolean>;
  /** Current color description for screen readers */
  colorDescription: ComputedRef<string>;
  /** Current contrast information */
  contrastInfo: ComputedRef<ColorContrastInfo | null>;
  /** Readable color name */
  colorName: ComputedRef<string>;
  /** Live region for announcements */
  liveRegion: Ref<HTMLElement | null>;
}

/**
 * Color space conversion utilities with accessibility descriptions
 */
export interface ColorSpaceUtils {
  /** Convert color to accessible description */
  toAccessibleDescription: (color: RgbaColor, format: ColorType) => string;
  /** Get readable color name */
  getReadableColorName: (color: RgbaColor) => string;
  /** Calculate contrast ratio */
  getContrastRatio: (color1: RgbaColor, color2: RgbaColor) => number;
  /** Get contrast level description */
  getContrastLevel: (ratio: number) => ColorContrastInfo;
  /** Convert to specific format with validation */
  convertToFormat: (color: RgbaColor, format: ColorType) => string;
}

/**
 * Keyboard event handlers for different picker areas
 */
export interface ColorPickerKeyboardHandlers {
  /** Handle color area keyboard navigation */
  handleColorAreaKeyDown: (event: KeyboardEvent) => void;
  /** Handle hue slider keyboard navigation */
  handleHueSliderKeyDown: (event: KeyboardEvent) => void;
  /** Handle opacity slider keyboard navigation */
  handleOpacitySliderKeyDown: (event: KeyboardEvent) => void;
  /** Handle format selector keyboard navigation */
  handleFormatKeyDown: (event: KeyboardEvent) => void;
  /** Handle text input keyboard events */
  handleTextInputKeyDown: (event: KeyboardEvent) => void;
  /** Global keyboard event coordinator */
  handleGlobalKeyDown: (event: KeyboardEvent) => void;
}

/**
 * ARIA attributes for different color picker elements
 */
export interface ColorPickerAriaAttributes {
  /** Main color picker container attributes */
  colorPickerAria: ComputedRef<Record<string, any>>;
  /** Color selection area attributes */
  colorAreaAria: ComputedRef<Record<string, any>>;
  /** Hue slider attributes */
  hueSliderAria: ComputedRef<Record<string, any>>;
  /** Opacity slider attributes */
  opacitySliderAria: ComputedRef<Record<string, any>>;
  /** Text input attributes */
  textInputAria: ComputedRef<Record<string, any>>;
  /** Format selector attributes */
  formatSelectorAria: ComputedRef<Record<string, any>>;
}

/**
 * Preset color configuration
 */
export interface PresetColor {
  /** Color value in hex format */
  color: string;
  /** Accessible name for the color */
  name: string;
  /** Additional description for screen readers */
  description?: string;
  /** Whether this color meets contrast requirements */
  accessible?: boolean;
}

/**
 * Color validation result
 */
export interface ColorValidationResult {
  /** Whether the color value is valid */
  isValid: boolean;
  /** Error message if invalid */
  errorMessage?: string;
  /** Suggested correction if available */
  suggestion?: string;
  /** Contrast information if applicable */
  contrast?: ColorContrastInfo;
}