/**
 * BIcon accessibility props interface
 * Implements WCAG 2.1 AA standards for icon components
 */
export interface BIconAccessibilityProps {
  /** Alternative text for screen readers */
  alt?: string;
  /** ARIA label for the icon */
  ariaLabel?: string;
  /** ID of element that labels this icon */
  ariaLabelledBy?: string;
  /** ID of element that describes this icon */
  ariaDescribedBy?: string;
  /** Additional description for screen readers */
  ariaDescription?: string;
  /** Icon semantic purpose */
  semantic?: BIconSemanticType;
  /** Whether icon is purely decorative */
  decorative?: boolean;
  /** ARIA role override */
  role?: string;
  /** Whether to announce status changes to screen readers */
  announceChanges?: boolean;
  /** Whether to announce interaction states */
  announceInteractions?: boolean;
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
  /** Whether icon supports keyboard navigation */
  keyboardNavigation?: boolean;
  /** Whether to show focus indicators */
  showFocusIndicator?: boolean;
  /** Whether to hide from screen readers */
  hideFromScreenReader?: boolean;
}

/**
 * Icon semantic types for accessibility
 */
export type BIconSemanticType = 'decorative' | 'informative' | 'interactive' | 'status';

/**
 * Color variants for theming
 */
export type BIconColorVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

/**
 * Animation types for enhanced UX
 */
export type BIconAnimationType = 'none' | 'spin' | 'pulse' | 'bounce' | 'fade' | 'shake' | 'flip' | 'swing';

/**
 * Icon sizes with accessibility considerations
 */
export type BIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'custom';

/**
 * Icon loading states
 */
export type BIconLoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * Icon state interface for accessibility
 */
export interface BIconState {
  /** Whether icon has focus */
  hasFocus: boolean;
  /** Whether icon is being hovered */
  isHovered: boolean;
  /** Whether icon is in loading state */
  isLoading: boolean;
  /** Whether icon is interactive */
  isInteractive: boolean;
  /** Whether keyboard navigation mode is active */
  keyboardMode: boolean;
  /** Current animation state */
  animationState: BIconAnimationType;
  /** Whether icon is visible to screen readers */
  isVisible: boolean;
  /** Current semantic context */
  semanticContext: BIconSemanticType;
  /** Whether high contrast mode is active */
  isHighContrast: boolean;
  /** Whether animations are disabled */
  isReducedMotion: boolean;
}

/**
 * Icon ARIA attributes interface
 */
export interface BIconAriaAttributes {
  /** ARIA role */
  role?: string;
  /** ARIA label */
  'aria-label'?: string;
  /** ARIA labelled by relationships */
  'aria-labelledby'?: string;
  /** ARIA described by relationships */
  'aria-describedby'?: string;
  /** ARIA hidden for decorative icons */
  'aria-hidden'?: boolean;
  /** Tab index for keyboard navigation */
  tabindex?: number;
  /** ARIA live region */
  'aria-live'?: 'polite' | 'assertive' | 'off';
  /** ARIA atomic for live regions */
  'aria-atomic'?: boolean;
  /** ARIA current for status indicators */
  'aria-current'?: 'true' | 'false';
  /** ARIA expanded for expandable content */
  'aria-expanded'?: boolean;
  /** ARIA pressed for toggle states */
  'aria-pressed'?: boolean;
  /** ARIA busy for loading states */
  'aria-busy'?: boolean;
}

/**
 * Icon keyboard configuration
 */
export interface BIconKeyboardConfig {
  /** Whether keyboard navigation is enabled */
  enabled?: boolean;
  /** Keys for activating icon */
  activationKeys?: string[];
  /** Keys for toggling icon state */
  toggleKeys?: string[];
  /** Whether to prevent default keyboard behavior */
  preventDefault?: boolean;
  /** Whether to stop keyboard event propagation */
  stopPropagation?: boolean;
  /** Custom keyboard shortcuts */
  shortcuts?: Record<string, () => void>;
}

/**
 * Icon interaction configuration
 */
export interface BIconInteractionConfig {
  /** Whether icon is clickable */
  clickable?: boolean;
  /** Whether icon supports double-click */
  doubleClick?: boolean;
  /** Whether icon supports long press */
  longPress?: boolean;
  /** Long press duration in milliseconds */
  longPressDuration?: number;
  /** Whether to show hover effects */
  showHoverEffects?: boolean;
  /** Whether to show focus effects */
  showFocusEffects?: boolean;
  /** Debounce time for rapid clicks */
  debounceTime?: number;
}

/**
 * Icon animation configuration
 */
export interface BIconAnimationConfig {
  /** Animation type */
  type?: BIconAnimationType;
  /** Animation duration in milliseconds */
  duration?: number;
  /** Animation easing function */
  easing?: string;
  /** Whether animation loops */
  loop?: boolean;
  /** Animation delay in milliseconds */
  delay?: number;
  /** Whether to respect reduced motion preference */
  respectReducedMotion?: boolean;
}

/**
 * Complete BIcon props interface
 */
export interface BIconProps extends BIconAccessibilityProps {
  /** Material icon name or custom icon identifier */
  name?: string;
  /** Icon size (CSS units or predefined size) */
  size?: BIconSize | string;
  /** Whether to use filled variant */
  filled?: boolean;
  /** Color theme variant */
  color?: BIconColorVariant;
  /** Animation type */
  animation?: BIconAnimationType;
  /** Whether icon is clickable/interactive */
  clickable?: boolean;
  /** Loading state for status icons */
  loading?: boolean;
  /** Custom CSS class */
  customClass?: string;
  /** Icon rotation in degrees */
  rotation?: number;
  /** HTML id attribute */
  id?: string;
  /** Additional CSS classes */
  class?: string;
  /** Inline styles */
  style?: string | Record<string, any>;
  /** Keyboard navigation configuration */
  keyboardConfig?: BIconKeyboardConfig;
  /** Interaction configuration */
  interactionConfig?: BIconInteractionConfig;
  /** Animation configuration */
  animationConfig?: BIconAnimationConfig;
  /** Custom click handler */
  onClick?: (event: MouseEvent) => void;
  /** Custom keydown handler */
  onKeydown?: (event: KeyboardEvent) => void;
  /** Whether to show tooltip on hover */
  showTooltip?: boolean;
  /** Tooltip text */
  tooltip?: string;
  /** Icon variant for different styles */
  variant?: 'filled' | 'outlined' | 'rounded' | 'sharp' | 'two-tone';
  /** Icon weight/thickness */
  weight?: 'thin' | 'light' | 'regular' | 'medium' | 'bold' | 'heavy';
}

/**
 * BIcon emits interface
 */
export interface BIconEmits {
  /** Icon clicked */
  'click': [event: MouseEvent];
  /** Icon double-clicked */
  'double-click': [event: MouseEvent];
  /** Icon long pressed */
  'long-press': [event: MouseEvent | TouchEvent];
  /** Keyboard event */
  'keydown': [event: KeyboardEvent];
  /** Icon focused */
  'focus': [event: FocusEvent];
  /** Icon blurred */
  'blur': [event: FocusEvent];
  /** Icon hovered */
  'mouseenter': [event: MouseEvent];
  /** Icon unhovered */
  'mouseleave': [event: MouseEvent];
  /** Loading state changed */
  'loading-change': [loading: boolean];
  /** Animation started */
  'animation-start': [animation: BIconAnimationType];
  /** Animation ended */
  'animation-end': [animation: BIconAnimationType];
  /** Status changed for status icons */
  'status-change': [status: string];
  /** Accessibility event */
  'accessibility': [type: string, data: any];
  /** Context menu requested */
  'context-menu': [event: MouseEvent];
}

/**
 * Icon validation result
 */
export interface BIconValidationResult {
  /** Whether validation passes */
  isValid: boolean;
  /** Error messages */
  errors: string[];
  /** Warning messages */
  warnings: string[];
  /** Icon configuration */
  config?: BIconProps;
}

/**
 * Icon announcement templates
 */
export interface BIconAnnouncementTemplates {
  /** Template for icon activation announcement */
  iconActivated: string;
  /** Template for icon focus announcement */
  iconFocused: string;
  /** Template for loading state announcement */
  loadingState: string;
  /** Template for status change announcement */
  statusChange: string;
  /** Template for interactive icon instructions */
  interactiveHelp: string;
  /** Template for animation state announcement */
  animationState: string;
  /** Template for role change announcement */
  roleChange: string;
}

/**
 * Icon context for grouped icons
 */
export interface BIconGroupContext {
  /** Group ID */
  groupId: string;
  /** Icons in group */
  icons: BIconProps[];
  /** Currently focused icon index */
  focusedIndex: number;
  /** Group label */
  groupLabel?: string;
  /** Group navigation pattern */
  navigationPattern?: 'horizontal' | 'vertical' | 'grid';
  /** Whether group allows multiple selection */
  multiSelect?: boolean;
}

/**
 * Icon accessibility helpers
 */
export interface BIconAccessibilityHelpers {
  /** Get appropriate ARIA role for icon */
  getAriaRole: (semantic: BIconSemanticType, interactive: boolean) => string;
  /** Get appropriate ARIA label */
  getAriaLabel: (name?: string, semantic?: BIconSemanticType) => string;
  /** Check if icon should be hidden from screen readers */
  shouldHideFromScreenReader: (semantic: BIconSemanticType, decorative: boolean) => boolean;
  /** Get appropriate tab index */
  getTabIndex: (interactive: boolean, clickable: boolean) => number;
  /** Announce status change */
  announceStatusChange: (message: string, politeness?: 'polite' | 'assertive') => void;
}

/**
 * Default configurations
 */
export const DEFAULT_ICON_KEYBOARD_CONFIG: Required<BIconKeyboardConfig> = {
  enabled: true,
  activationKeys: ['Enter', ' '],
  toggleKeys: [],
  preventDefault: true,
  stopPropagation: false,
  shortcuts: {},
};

export const DEFAULT_ICON_ACCESSIBILITY_CONFIG: Required<BIconAccessibilityProps> = {
  alt: '',
  ariaLabel: '',
  ariaLabelledBy: '',
  ariaDescribedBy: '',
  ariaDescription: '',
  semantic: 'decorative',
  decorative: false,
  role: '',
  announceChanges: false,
  announceInteractions: false,
  highContrast: false,
  reduceMotion: false,
  enhancedFocus: true,
  minTouchTarget: true,
  screenReaderInstructions: 'Press Enter or Space to activate icon',
  liveRegionPoliteness: 'polite',
  keyboardNavigation: true,
  showFocusIndicator: true,
  hideFromScreenReader: false,
};

export const DEFAULT_ICON_INTERACTION_CONFIG: Required<BIconInteractionConfig> = {
  clickable: false,
  doubleClick: false,
  longPress: false,
  longPressDuration: 500,
  showHoverEffects: true,
  showFocusEffects: true,
  debounceTime: 100,
};

export const DEFAULT_ICON_ANIMATION_CONFIG: Required<BIconAnimationConfig> = {
  type: 'none',
  duration: 1000,
  easing: 'ease',
  loop: false,
  delay: 0,
  respectReducedMotion: true,
};

export const DEFAULT_ICON_ANNOUNCEMENTS: Required<BIconAnnouncementTemplates> = {
  iconActivated: 'Icon activated: {name}',
  iconFocused: 'Icon focused: {name}',
  loadingState: 'Icon {state}: {name}',
  statusChange: 'Status changed: {status}',
  interactiveHelp: 'Interactive icon. Press Enter or Space to activate',
  animationState: 'Icon animation: {animation}',
  roleChange: 'Icon role changed to {role}',
};

/**
 * Icon size configurations with accessibility considerations
 */
export const ICON_SIZE_CONFIG: Record<BIconSize, {
  size: string;
  minTouchTarget: boolean;
  focusRingSize: string;
}> = {
  xs: {
    size: '16px',
    minTouchTarget: true,
    focusRingSize: '2px',
  },
  sm: {
    size: '20px',
    minTouchTarget: true,
    focusRingSize: '2px',
  },
  md: {
    size: '24px',
    minTouchTarget: false,
    focusRingSize: '2px',
  },
  lg: {
    size: '32px',
    minTouchTarget: false,
    focusRingSize: '3px',
  },
  xl: {
    size: '48px',
    minTouchTarget: false,
    focusRingSize: '3px',
  },
  custom: {
    size: 'inherit',
    minTouchTarget: false,
    focusRingSize: '2px',
  },
};

/**
 * Semantic type configurations
 */
export const ICON_SEMANTIC_CONFIG: Record<BIconSemanticType, {
  defaultRole: string;
  requiresLabel: boolean;
  allowsInteraction: boolean;
  defaultAnnouncement: string;
}> = {
  decorative: {
    defaultRole: 'presentation',
    requiresLabel: false,
    allowsInteraction: false,
    defaultAnnouncement: '',
  },
  informative: {
    defaultRole: 'img',
    requiresLabel: true,
    allowsInteraction: false,
    defaultAnnouncement: 'Informational icon',
  },
  interactive: {
    defaultRole: 'button',
    requiresLabel: true,
    allowsInteraction: true,
    defaultAnnouncement: 'Interactive icon',
  },
  status: {
    defaultRole: 'status',
    requiresLabel: true,
    allowsInteraction: false,
    defaultAnnouncement: 'Status indicator',
  },
};

/**
 * Export all types for easy importing
 */
export type {
  BIconAccessibilityProps as AccessibilityProps,
  BIconProps as Props,
  BIconState as State,
  BIconAriaAttributes as AriaAttributes,
  BIconKeyboardConfig as KeyboardConfig,
  BIconInteractionConfig as InteractionConfig,
  BIconAnimationConfig as AnimationConfig,
  BIconEmits as Emits,
  BIconValidationResult as ValidationResult,
  BIconAnnouncementTemplates as AnnouncementTemplates,
  BIconGroupContext as GroupContext,
  BIconAccessibilityHelpers as AccessibilityHelpers,
};