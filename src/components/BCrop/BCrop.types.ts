/**
 * BCrop Component Types
 * Comprehensive accessibility interface for image cropping widget
 */

/**
 * Accessibility configuration for the BCrop component
 */
export interface BCropAccessibilityProps {
  /** ARIA label for the crop widget */
  ariaLabel?: string;
  /** ID of element that describes the crop widget */
  ariaDescribedBy?: string;
  /** Alternative text for the source image */
  imageAlt?: string;
  /** Alternative text for the cropped result */
  croppedImageAlt?: string;
  /** Label for the crop area */
  cropAreaLabel?: string;
  /** Instructions for screen readers */
  instructions?: string;
  /** Whether to announce crop changes */
  announceChanges?: boolean;
  /** Custom announcement messages */
  announcements?: {
    cropMoved?: string;
    cropResized?: string;
    zoomChanged?: string;
    imageLoading?: string;
    imageLoaded?: string;
    cropCompleted?: string;
  };
}

/**
 * Keyboard navigation configuration
 */
export interface BCropKeyboardConfig {
  /** Step size for fine crop area movement (in pixels) */
  moveStep?: number;
  /** Step size for large crop area movement (in pixels) */
  largeMoveStep?: number;
  /** Step size for crop area resizing (in pixels) */
  resizeStep?: number;
  /** Step size for large crop area resizing (in pixels) */
  largeResizeStep?: number;
  /** Zoom step increment */
  zoomStep?: number;
  /** Enable keyboard navigation */
  enabled?: boolean;
}

/**
 * Crop preset configuration
 */
export interface BCropPreset {
  /** Preset identifier */
  id: string;
  /** Display label */
  label: string;
  /** Width ratio or absolute value */
  width: number | string;
  /** Height ratio or absolute value */
  height: number | string;
  /** Description for screen readers */
  description?: string;
}

/**
 * Crop area position and dimensions
 */
export interface BCropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Loading state configuration
 */
export interface BCropLoadingState {
  /** Whether image is currently loading */
  loading?: boolean;
  /** Loading message for screen readers */
  loadingMessage?: string;
  /** Progress value for loading (0-100) */
  progress?: number;
}

/**
 * Focus trap configuration for modal-style crop interactions
 */
export interface BCropFocusConfig {
  /** Enable focus trapping */
  trapFocus?: boolean;
  /** Element to focus when crop widget activates */
  initialFocus?: HTMLElement | string;
  /** Element to return focus to when crop completes */
  returnFocusTo?: HTMLElement | string;
}

/**
 * Enhanced BCrop Props with comprehensive accessibility support
 */
export interface BCropProps {
  /** Base64 encoded cropped image result */
  modelValue?: string;
  /** Source image URL */
  src: string;
  /** Width of the crop area */
  width?: string;
  /** Height of the crop area */
  height?: string;
  /** Accessibility configuration */
  accessibility?: BCropAccessibilityProps;
  /** Keyboard navigation configuration */
  keyboard?: BCropKeyboardConfig;
  /** Available crop presets */
  presets?: BCropPreset[];
  /** Loading state configuration */
  loading?: BCropLoadingState;
  /** Focus management configuration */
  focus?: BCropFocusConfig;
  /** Whether the crop widget is disabled */
  disabled?: boolean;
  /** High contrast mode support */
  highContrast?: boolean;
  /** Minimum zoom level */
  minZoom?: number;
  /** Maximum zoom level */
  maxZoom?: number;
  /** Quality of the output image (0-1) */
  quality?: number;
  /** Output format ('image/png', 'image/jpeg', etc.) */
  format?: string;
}

/**
 * Events emitted by BCrop component
 */
export interface BCropEvents {
  /** Emitted when crop value changes */
  'update:modelValue': [value: string];
  /** Emitted when crop area changes */
  'crop-change': [area: BCropArea];
  /** Emitted when zoom level changes */
  'zoom-change': [zoom: number];
  /** Emitted when image starts loading */
  'loading-start': [];
  /** Emitted when image finishes loading */
  'loading-complete': [];
  /** Emitted when cropping operation completes */
  'crop-complete': [result: string];
  /** Emitted when preset is applied */
  'preset-applied': [preset: BCropPreset];
  /** Emitted when focus enters crop area */
  'focus-enter': [];
  /** Emitted when focus leaves crop area */
  'focus-leave': [];
}

/**
 * Crop manipulation methods
 */
export interface BCropMethods {
  /** Move crop area by specified offset */
  moveCrop: (deltaX: number, deltaY: number) => void;
  /** Resize crop area by specified amounts */
  resizeCrop: (deltaWidth: number, deltaHeight: number) => void;
  /** Set crop area to specific position and size */
  setCropArea: (area: BCropArea) => void;
  /** Apply a preset crop configuration */
  applyPreset: (preset: BCropPreset) => void;
  /** Reset crop to default position and size */
  resetCrop: () => void;
  /** Set zoom level */
  setZoom: (level: number) => void;
  /** Focus the crop widget */
  focus: () => void;
  /** Generate and return cropped image */
  getCroppedImage: () => Promise<string>;
}

/**
 * Keyboard shortcuts for crop manipulation
 */
export const CROP_KEYBOARD_SHORTCUTS = {
  // Crop area movement
  MOVE_LEFT: 'ArrowLeft',
  MOVE_RIGHT: 'ArrowRight', 
  MOVE_UP: 'ArrowUp',
  MOVE_DOWN: 'ArrowDown',
  
  // Large movement (with modifier)
  MOVE_LEFT_LARGE: 'Shift+ArrowLeft',
  MOVE_RIGHT_LARGE: 'Shift+ArrowRight',
  MOVE_UP_LARGE: 'Shift+ArrowUp', 
  MOVE_DOWN_LARGE: 'Shift+ArrowDown',
  
  // Crop area resizing
  RESIZE_SMALLER: '-',
  RESIZE_LARGER: '+',
  RESIZE_SMALLER_LARGE: 'Shift+-',
  RESIZE_LARGER_LARGE: 'Shift+=',
  
  // Zoom controls
  ZOOM_IN: 'Ctrl+=',
  ZOOM_OUT: 'Ctrl+-',
  ZOOM_RESET: 'Ctrl+0',
  
  // Presets and shortcuts
  RESET_CROP: 'r',
  APPLY_CROP: 'Enter',
  CANCEL_CROP: 'Escape',
  
  // Help
  SHOW_HELP: '?',
} as const;

/**
 * Default accessibility messages
 */
export const DEFAULT_CROP_ANNOUNCEMENTS = {
  cropMoved: 'Crop area moved to position {x}, {y}',
  cropResized: 'Crop area resized to {width} by {height}',
  zoomChanged: 'Zoom level set to {zoom}',
  imageLoading: 'Loading image for cropping',
  imageLoaded: 'Image loaded. Ready to crop.',
  cropCompleted: 'Image cropped successfully',
  keyboardHelp: 'Use arrow keys to move crop area, plus and minus to resize, Ctrl plus zoom controls',
  focusEntered: 'Crop area focused. Use keyboard to adjust position and size.',
  focusLeft: 'Left crop area',
} as const;

/**
 * ARIA roles and properties for crop widget components
 */
export const CROP_ARIA_CONFIG = {
  widget: {
    role: 'application',
    'aria-roledescription': 'image cropping widget',
  },
  cropArea: {
    role: 'slider',
    'aria-roledescription': 'crop area selector',
  },
  zoomControl: {
    role: 'slider',
    'aria-orientation': 'horizontal',
    'aria-valuemin': 0,
    'aria-valuemax': 200,
  },
  presetButton: {
    role: 'button',
  },
  image: {
    role: 'img',
  },
} as const;