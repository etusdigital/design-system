import type { Ref } from 'vue';
import type { BContainerModelExtra } from '../../utils/components/BContainerModelExtra.types';

/**
 * ARIA disclosure pattern configuration for expandable container
 */
export interface DisclosureAccessibilityConfig {
  /** Custom ARIA label for the disclosure button */
  ariaLabel?: string;
  /** Custom ARIA description for the disclosure button */
  ariaDescription?: string;
  /** Custom label for the expanded content region */
  regionLabel?: string;
  /** Custom screen reader announcement when expanding */
  expandAnnouncement?: string;
  /** Custom screen reader announcement when collapsing */
  collapseAnnouncement?: string;
  /** Whether to disable automatic state announcements */
  disableAnnouncements?: boolean;
  /** Whether to respect user's reduced motion preference */
  respectReducedMotion?: boolean;
}

/**
 * Keyboard navigation configuration for expandable container
 */
export interface ExpandableKeyboardConfig {
  /** Keys that should trigger expand/collapse (default: ['Enter', ' ']) */
  activationKeys?: string[];
  /** Whether to prevent default behavior on key press */
  preventDefault?: boolean;
  /** Custom keyboard handler */
  onKeyDown?: (event: KeyboardEvent) => void;
}

/**
 * Focus management configuration for expandable container
 */
export interface ExpandableFocusConfig {
  /** Whether to focus the first focusable element when expanding */
  focusContentOnExpand?: boolean;
  /** Whether to focus the trigger button when collapsing */
  focusTriggerOnCollapse?: boolean;
  /** Custom selector for focusable elements */
  focusableSelector?: string;
}

/**
 * Animation configuration for expandable container
 */
export interface ExpandableAnimationConfig {
  /** Animation duration in milliseconds (150-1000) */
  duration?: number;
  /** CSS timing function for transitions */
  timingFunction?: string;
  /** Whether to disable all animations */
  disableAnimations?: boolean;
  /** Whether to respect user's reduced motion preference */
  respectReducedMotion?: boolean;
}

/**
 * Loading state configuration for expandable container
 */
export interface ExpandableLoadingConfig {
  /** Whether content is currently loading */
  isLoading?: boolean;
  /** Custom loading announcement text */
  loadingText?: string;
  /** Custom loaded announcement text */
  loadedText?: string;
}

/**
 * Progressive disclosure configuration for nested expandable containers
 */
export interface ProgressiveDisclosureConfig {
  /** Whether this is a nested expandable container */
  isNested?: boolean;
  /** Nesting level for hierarchical structure */
  nestingLevel?: number;
  /** Parent expandable container ID */
  parentId?: string;
  /** Whether to collapse siblings when expanding */
  collapseSiblings?: boolean;
}

/**
 * Comprehensive accessibility configuration for expandable container
 */
export interface ExpandableAccessibilityConfig {
  /** ARIA disclosure pattern configuration */
  disclosure?: DisclosureAccessibilityConfig;
  /** Keyboard navigation settings */
  keyboard?: ExpandableKeyboardConfig;
  /** Focus management settings */
  focus?: ExpandableFocusConfig;
  /** Animation and transition settings */
  animation?: ExpandableAnimationConfig;
  /** Loading state settings */
  loading?: ExpandableLoadingConfig;
  /** Progressive disclosure settings for nested containers */
  progressiveDisclosure?: ProgressiveDisclosureConfig;
}

/**
 * Props interface for BExpandableContainer component
 */
export interface BExpandableContainerProps {
  /** Controls expanded state */
  modelValue?: boolean;
  /** Label text for the expandable trigger */
  labelValue?: string;
  /** Whether content should be positioned absolutely */
  absolute?: boolean;
  /** Whether the expandable container is disabled */
  disabled?: boolean;
  /** Whether the expandable container has an error state */
  isError?: boolean;
  /** Error message to display */
  errorMessage?: string;
  /** Info message to display */
  infoMessage?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Whether to close when clicking outside */
  closeOnBlur?: boolean;
  /** Whether to align content to the right */
  alignRight?: boolean;
  /** Maximum height for the content area */
  maxHeight?: string;
  /** Minimum width for the expandable container */
  minWidth?: string;
  /** Minimum width for the content card */
  minWidthCard?: string;
  /** Whether to use secondary styling */
  secondary?: boolean;
  /** Whether to hide the expand/collapse arrow */
  hideArrow?: boolean;
  /** Accessible label for screen readers */
  ariaLabel?: string;
  /** Whether content is currently loading */
  loading?: boolean;
  /** Custom loading text */
  loadingText?: string;
  /** Comprehensive accessibility configuration */
  accessibility?: ExpandableAccessibilityConfig;
}

/**
 * Emits interface for BExpandableContainer component
 */
export interface BExpandableContainerEmits {
  /** Emitted when the expanded state changes */
  'update:modelValue': [value: boolean, extra: BContainerModelExtra];
  /** Emitted when expansion starts */
  'expand-start': [event: Event];
  /** Emitted when expansion completes */
  'expand-end': [event: Event];
  /** Emitted when collapse starts */
  'collapse-start': [event: Event];
  /** Emitted when collapse completes */
  'collapse-end': [event: Event];
  /** Emitted when keyboard activation occurs */
  'keyboard-activate': [event: KeyboardEvent];
  /** Emitted when focus is received */
  'focus': [event: FocusEvent];
  /** Emitted when focus is lost */
  'blur': [event: FocusEvent];
  /** Emitted when loading state changes */
  'loading-change': [isLoading: boolean];
}

/**
 * State interface for expandable container
 */
export interface ExpandableState {
  /** Current expanded state */
  isExpanded: Ref<boolean>;
  /** Current loading state */
  isLoading: Ref<boolean>;
  /** Whether animation is in progress */
  isAnimating: Ref<boolean>;
  /** Generated component IDs */
  ids: {
    trigger: string;
    content: string;
    region: string;
  };
  /** DOM element references */
  refs: {
    trigger: Ref<HTMLElement | null>;
    content: Ref<HTMLElement | null>;
    container: Ref<HTMLElement | null>;
  };
}

/**
 * Return type for useExpandableContainer composable
 */
export interface UseExpandableContainerReturn {
  /** Component state */
  state: ExpandableState;
  /** ARIA attributes for trigger element */
  triggerAttrs: Ref<Record<string, any>>;
  /** ARIA attributes for content region */
  contentAttrs: Ref<Record<string, any>>;
  /** Event handlers */
  handlers: {
    toggle: () => void;
    expand: () => void;
    collapse: () => void;
    handleKeydown: (event: KeyboardEvent) => void;
    handleFocus: (event: FocusEvent) => void;
    handleBlur: (event: FocusEvent) => void;
  };
  /** Screen reader utilities */
  screenReader: {
    announce: (message: string, priority?: 'polite' | 'assertive') => void;
    announceExpanded: () => void;
    announceCollapsed: () => void;
    announceLoading: () => void;
    announceLoaded: () => void;
  };
  /** Animation utilities */
  animation: {
    getDuration: () => number;
    shouldAnimate: () => boolean;
    getTransitionStyle: () => Record<string, string>;
  };
}

/**
 * Expandable container size variants
 */
export type ExpandableContainerSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Expandable container visual states
 */
export type ExpandableContainerState = 'default' | 'hover' | 'focus' | 'expanded' | 'disabled' | 'error' | 'loading';

/**
 * Content alignment options
 */
export type ContentAlignment = 'left' | 'right' | 'center' | 'full-width';

/**
 * Animation timing functions
 */
export type AnimationTimingFunction = 
  | 'ease' 
  | 'ease-in' 
  | 'ease-out' 
  | 'ease-in-out' 
  | 'linear'
  | string;