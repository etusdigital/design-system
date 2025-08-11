/**
 * BAvatar accessibility props interface
 * Implements WCAG 2.1 AA standards for avatar components
 */
export interface BAvatarAccessibilityProps {
  /** Alternative text for the avatar image */
  alt?: string;
  /** ARIA label for the avatar */
  ariaLabel?: string;
  /** ID of element that labels this avatar */
  ariaLabelledBy?: string;
  /** ID of element that describes this avatar */
  ariaDescribedBy?: string;
  /** Additional description for screen readers */
  ariaDescription?: string;
  /** Whether avatar is interactive (clickable) */
  interactive?: boolean;
  /** Semantic role of the avatar */
  role?: BAvatarSemanticRole;
  /** Whether to announce status changes to screen readers */
  announceStatusChanges?: boolean;
  /** Whether to announce image loading states */
  announceImageStates?: boolean;
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
  /** Live region politeness level for announcements */
  liveRegionPoliteness?: 'polite' | 'assertive';
  /** Whether avatar supports keyboard navigation */
  keyboardNavigation?: boolean;
  /** Whether to show focus indicators */
  showFocusIndicator?: boolean;
}

/**
 * Avatar semantic roles for accessibility
 */
export type BAvatarSemanticRole = 'img' | 'button' | 'presentation' | 'none';

/**
 * Avatar status indicators for user presence
 */
export type BAvatarStatus = 'online' | 'offline' | 'away' | 'busy' | 'none';

/**
 * Avatar size variants with accessibility considerations
 */
export type BAvatarSize = 'small' | 'medium' | 'large' | 'xl';

/**
 * Avatar shape variants
 */
export type BAvatarShape = 'circle' | 'square' | 'rounded';

/**
 * Avatar loading states
 */
export type BAvatarLoadingState = 'idle' | 'loading' | 'loaded' | 'error';

/**
 * Avatar state interface for accessibility
 */
export interface BAvatarState {
  /** Whether avatar has focus */
  hasFocus: boolean;
  /** Whether avatar image is loaded */
  imageLoaded: boolean;
  /** Whether image loading failed */
  imageError: boolean;
  /** Current loading state */
  loadingState: BAvatarLoadingState;
  /** Whether avatar is interactive */
  isInteractive: boolean;
  /** Whether keyboard navigation mode is active */
  keyboardMode: boolean;
  /** Current status */
  currentStatus: BAvatarStatus;
  /** Whether avatar is in high contrast mode */
  isHighContrast: boolean;
  /** Whether animations are disabled */
  isReducedMotion: boolean;
}

/**
 * Avatar ARIA attributes interface
 */
export interface BAvatarAriaAttributes {
  /** ARIA role */
  role: string;
  /** ARIA label */
  'aria-label'?: string;
  /** ARIA labelled by relationships */
  'aria-labelledby'?: string;
  /** ARIA described by relationships */
  'aria-describedby'?: string;
  /** ARIA hidden for decorative avatars */
  'aria-hidden'?: boolean;
  /** Tab index for keyboard navigation */
  tabindex?: number;
  /** ARIA live region */
  'aria-live'?: 'polite' | 'assertive';
  /** ARIA atomic for live regions */
  'aria-atomic'?: boolean;
  /** ARIA current for active user indication */
  'aria-current'?: 'true' | 'false';
  /** ARIA expanded for expandable avatars */
  'aria-expanded'?: boolean;
  /** ARIA pressed for toggle avatars */
  'aria-pressed'?: boolean;
}

/**
 * Avatar keyboard configuration
 */
export interface BAvatarKeyboardConfig {
  /** Whether keyboard navigation is enabled */
  enabled?: boolean;
  /** Keys for activating avatar */
  activationKeys?: string[];
  /** Keys for toggling avatar state */
  toggleKeys?: string[];
  /** Keys for showing avatar menu */
  menuKeys?: string[];
  /** Whether to prevent default keyboard behavior */
  preventDefault?: boolean;
  /** Whether to stop keyboard event propagation */
  stopPropagation?: boolean;
}

/**
 * Avatar interaction configuration
 */
export interface BAvatarInteractionConfig {
  /** Whether avatar is clickable */
  clickable?: boolean;
  /** Whether avatar supports double-click */
  doubleClick?: boolean;
  /** Whether avatar supports long press */
  longPress?: boolean;
  /** Long press duration in milliseconds */
  longPressDuration?: number;
  /** Whether to show hover effects */
  showHoverEffects?: boolean;
  /** Whether to show focus effects */
  showFocusEffects?: boolean;
}

/**
 * Complete BAvatar props interface
 */
export interface BAvatarProps extends BAvatarAccessibilityProps {
  /** User's full name for initials generation */
  name?: string;
  /** Avatar image source URL */
  src?: string;
  /** Avatar size variant */
  size?: BAvatarSize;
  /** User's status indicator */
  status?: BAvatarStatus;
  /** Loading state for async image loading */
  loading?: boolean;
  /** Custom initials override */
  initials?: string;
  /** Avatar shape variant */
  shape?: BAvatarShape;
  /** Border styling */
  border?: boolean;
  /** HTML id attribute */
  id?: string;
  /** Additional CSS classes */
  class?: string;
  /** Inline styles */
  style?: string | Record<string, any>;
  /** Keyboard navigation configuration */
  keyboardConfig?: BAvatarKeyboardConfig;
  /** Interaction configuration */
  interactionConfig?: BAvatarInteractionConfig;
  /** Custom click handler */
  onClick?: (event: MouseEvent) => void;
  /** Custom status change handler */
  onStatusChange?: (status: BAvatarStatus) => void;
  /** Custom image load handler */
  onImageLoad?: () => void;
  /** Custom image error handler */
  onImageError?: () => void;
  /** Whether to lazy load the image */
  lazyLoad?: boolean;
  /** Image loading strategy */
  loadingStrategy?: 'eager' | 'lazy';
  /** Fallback image URL */
  fallbackSrc?: string;
}

/**
 * BAvatar emits interface
 */
export interface BAvatarEmits {
  /** Avatar clicked */
  'click': [event: MouseEvent];
  /** Avatar double-clicked */
  'double-click': [event: MouseEvent];
  /** Avatar long pressed */
  'long-press': [event: MouseEvent | TouchEvent];
  /** Keyboard event */
  'keydown': [event: KeyboardEvent];
  /** Avatar focused */
  'focus': [event: FocusEvent];
  /** Avatar blurred */
  'blur': [event: FocusEvent];
  /** Avatar image loaded successfully */
  'image-load': [];
  /** Avatar image failed to load */
  'image-error': [];
  /** Avatar status changed */
  'status-change': [status: BAvatarStatus];
  /** Avatar loading state changed */
  'loading-state-change': [state: BAvatarLoadingState];
  /** Accessibility event */
  'accessibility': [type: string, data: any];
  /** Avatar menu requested */
  'menu-request': [event: MouseEvent | KeyboardEvent];
  /** Avatar context menu */
  'context-menu': [event: MouseEvent];
}

/**
 * Avatar validation result
 */
export interface BAvatarValidationResult {
  /** Whether validation passes */
  isValid: boolean;
  /** Error messages */
  errors: string[];
  /** Warning messages */
  warnings: string[];
  /** Avatar configuration */
  config?: BAvatarProps;
}

/**
 * Avatar announcement templates
 */
export interface BAvatarAnnouncementTemplates {
  /** Template for avatar focus announcement */
  avatarFocused: string;
  /** Template for avatar activation announcement */
  avatarActivated: string;
  /** Template for status change announcement */
  statusChanged: string;
  /** Template for image load success announcement */
  imageLoaded: string;
  /** Template for image load error announcement */
  imageError: string;
  /** Template for initials fallback announcement */
  initialsShown: string;
  /** Template for interactive avatar instructions */
  interactiveHelp: string;
  /** Template for loading state announcement */
  loadingState: string;
}

/**
 * Avatar group configuration
 */
export interface BAvatarGroupConfig {
  /** Maximum number of avatars to show */
  maxVisible?: number;
  /** Whether avatars overlap */
  overlap?: boolean;
  /** Overlap amount in pixels */
  overlapAmount?: number;
  /** Whether to show overflow count */
  showOverflow?: boolean;
  /** Text template for overflow count */
  overflowTemplate?: string;
  /** Group ARIA label */
  groupLabel?: string;
  /** Individual avatar labels */
  avatarLabels?: string[];
}

/**
 * Avatar context menu configuration
 */
export interface BAvatarContextMenuConfig {
  /** Whether context menu is enabled */
  enabled?: boolean;
  /** Menu items */
  items?: Array<{
    id: string;
    label: string;
    icon?: string;
    action: () => void;
    disabled?: boolean;
    separator?: boolean;
  }>;
  /** Menu position */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** Whether menu is modal */
  modal?: boolean;
}

/**
 * Default configurations
 */
export const DEFAULT_AVATAR_KEYBOARD_CONFIG: Required<BAvatarKeyboardConfig> = {
  enabled: true,
  activationKeys: ['Enter', ' '],
  toggleKeys: [],
  menuKeys: ['ArrowDown', 'F10'],
  preventDefault: true,
  stopPropagation: false,
};

export const DEFAULT_AVATAR_ACCESSIBILITY_CONFIG: Required<BAvatarAccessibilityProps> = {
  alt: '',
  ariaLabel: '',
  ariaLabelledBy: '',
  ariaDescribedBy: '',
  ariaDescription: '',
  interactive: false,
  role: 'img',
  announceStatusChanges: false,
  announceImageStates: false,
  highContrast: false,
  reduceMotion: false,
  enhancedFocus: true,
  minTouchTarget: true,
  screenReaderInstructions: 'Press Enter or Space to interact with avatar',
  liveRegionPoliteness: 'polite',
  keyboardNavigation: true,
  showFocusIndicator: true,
};

export const DEFAULT_AVATAR_INTERACTION_CONFIG: Required<BAvatarInteractionConfig> = {
  clickable: true,
  doubleClick: false,
  longPress: false,
  longPressDuration: 500,
  showHoverEffects: true,
  showFocusEffects: true,
};

export const DEFAULT_AVATAR_ANNOUNCEMENTS: Required<BAvatarAnnouncementTemplates> = {
  avatarFocused: 'Avatar focused: {name}',
  avatarActivated: 'Avatar activated: {name}',
  statusChanged: '{name} status changed to {status}',
  imageLoaded: 'Avatar image loaded for {name}',
  imageError: 'Avatar image failed to load, showing initials {initials}',
  initialsShown: 'Showing initials {initials} for {name}',
  interactiveHelp: 'Avatar is interactive. Press Enter or Space to activate',
  loadingState: 'Avatar {state}: {name}',
};

/**
 * Avatar size configurations with accessibility considerations
 */
export const AVATAR_SIZE_CONFIG: Record<BAvatarSize, {
  width: string;
  height: string;
  fontSize: string;
  minTouchTarget: boolean;
  focusRingSize: string;
}> = {
  small: {
    width: '2rem',
    height: '2rem',
    fontSize: '0.625rem',
    minTouchTarget: true, // Will be enforced to 44px for interactive avatars
    focusRingSize: '2px',
  },
  medium: {
    width: '2.5rem',
    height: '2.5rem',
    fontSize: '0.75rem',
    minTouchTarget: false,
    focusRingSize: '2px',
  },
  large: {
    width: '3rem',
    height: '3rem',
    fontSize: '0.875rem',
    minTouchTarget: false,
    focusRingSize: '3px',
  },
  xl: {
    width: '4rem',
    height: '4rem',
    fontSize: '1rem',
    minTouchTarget: false,
    focusRingSize: '3px',
  },
};

/**
 * Status color mappings with contrast ratios
 */
export const AVATAR_STATUS_CONFIG: Record<BAvatarStatus, {
  color: string;
  contrastRatio: number;
  ariaLabel: string;
  announcement: string;
}> = {
  online: {
    color: '#059669',
    contrastRatio: 4.5,
    ariaLabel: 'Online',
    announcement: 'User is online',
  },
  offline: {
    color: '#9ca3af',
    contrastRatio: 4.5,
    ariaLabel: 'Offline',
    announcement: 'User is offline',
  },
  away: {
    color: '#d97706',
    contrastRatio: 4.5,
    ariaLabel: 'Away',
    announcement: 'User is away',
  },
  busy: {
    color: '#dc2626',
    contrastRatio: 4.5,
    ariaLabel: 'Busy',
    announcement: 'User is busy',
  },
  none: {
    color: 'transparent',
    contrastRatio: 0,
    ariaLabel: 'No status',
    announcement: 'No status indicator',
  },
};

/**
 * Export all types for easy importing
 */
export type {
  BAvatarAccessibilityProps as AccessibilityProps,
  BAvatarProps as Props,
  BAvatarState as State,
  BAvatarAriaAttributes as AriaAttributes,
  BAvatarKeyboardConfig as KeyboardConfig,
  BAvatarInteractionConfig as InteractionConfig,
  BAvatarEmits as Emits,
  BAvatarValidationResult as ValidationResult,
  BAvatarAnnouncementTemplates as AnnouncementTemplates,
  BAvatarGroupConfig as GroupConfig,
  BAvatarContextMenuConfig as ContextMenuConfig,
};