import type { Ref } from 'vue';

/**
 * Accessibility configuration for BCollapse component
 */
export interface CollapseAccessibilityConfig {
  /** Accessible label for the collapse toggle button */
  ariaLabel?: string;
  
  /** Description for the collapse content region */
  ariaDescription?: string;
  
  /** Label text that describes the collapsible region */
  regionLabel?: string;
  
  /** Whether this collapse is part of an accordion group */
  accordion?: boolean;
  
  /** Unique identifier for accordion group coordination */
  accordionId?: string;
  
  /** Whether only one item can be expanded in the accordion */
  accordionExclusive?: boolean;
  
  /** Custom announcement text for expand action */
  expandAnnouncement?: string;
  
  /** Custom announcement text for collapse action */
  collapseAnnouncement?: string;
  
  /** Whether to disable automatic screen reader announcements */
  disableAnnouncements?: boolean;
  
  /** Loading state configuration */
  loading?: CollapseLoadingConfig;
  
  /** Reduced motion preferences */
  respectReducedMotion?: boolean;
}

/**
 * Loading state configuration for dynamic content
 */
export interface CollapseLoadingConfig {
  /** Whether content is currently loading */
  isLoading: boolean;
  
  /** Loading announcement text */
  loadingText?: string;
  
  /** Text announced when loading completes */
  loadedText?: string;
  
  /** Whether to show loading indicator */
  showIndicator?: boolean;
}

/**
 * Keyboard navigation configuration
 */
export interface CollapseKeyboardConfig {
  /** Keys that trigger expand/collapse (default: Enter, Space) */
  activationKeys?: string[];
  
  /** Whether to prevent default on activation keys */
  preventDefault?: boolean;
  
  /** Custom keyboard event handler */
  onKeyDown?: (event: KeyboardEvent) => void;
}

/**
 * Focus management configuration
 */
export interface CollapseFocusConfig {
  /** Whether to focus content when expanded */
  focusContentOnExpand?: boolean;
  
  /** Whether to focus trigger when collapsed */
  focusTriggerOnCollapse?: boolean;
  
  /** Selector for focusable elements within content */
  focusableSelector?: string;
  
  /** Whether to trap focus within expanded content */
  trapFocus?: boolean;
}

/**
 * Animation and motion configuration
 */
export interface CollapseAnimationConfig {
  /** Animation duration in milliseconds */
  duration?: number;
  
  /** Whether to respect prefers-reduced-motion */
  respectReducedMotion?: boolean;
  
  /** Custom transition timing function */
  timingFunction?: string;
  
  /** Whether to disable animations entirely */
  disableAnimations?: boolean;
}

/**
 * Complete props interface for BCollapse component
 */
export interface CollapseProps {
  /** The collapse state */
  modelValue: boolean;
  
  /** Animation duration in milliseconds */
  duration?: number;
  
  /** Remove shadow styling */
  noShadow?: boolean;
  
  /** Accessibility configuration */
  accessibility?: CollapseAccessibilityConfig;
  
  /** Keyboard navigation configuration */
  keyboard?: CollapseKeyboardConfig;
  
  /** Focus management configuration */
  focus?: CollapseFocusConfig;
  
  /** Animation configuration */
  animation?: CollapseAnimationConfig;
  
  /** Backward compatibility - accessible label */
  ariaLabel?: string;
  
  /** Backward compatibility - loading state */
  loading?: boolean;
  
  /** Backward compatibility - loading text */
  loadingText?: string;
}

/**
 * Events emitted by BCollapse component
 */
export interface CollapseEmits {
  /** Model value update event */
  'update:modelValue': [value: boolean];
  
  /** Triggered when collapse starts expanding */
  'expand-start': [event: Event];
  
  /** Triggered when expand animation completes */
  'expand-complete': [event: Event];
  
  /** Triggered when collapse starts collapsing */
  'collapse-start': [event: Event];
  
  /** Triggered when collapse animation completes */
  'collapse-complete': [event: Event];
  
  /** Triggered on keyboard activation */
  'keyboard-activate': [event: KeyboardEvent];
  
  /** Focus events */
  'focus': [event: FocusEvent];
  'blur': [event: FocusEvent];
}

/**
 * Collapse state management interface
 */
export interface CollapseState {
  /** Current expanded state */
  isExpanded: Ref<boolean>;
  
  /** Loading state */
  isLoading: Ref<boolean>;
  
  /** Animation in progress */
  isAnimating: Ref<boolean>;
  
  /** Unique identifiers */
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
 * Accordion coordination interface
 */
export interface AccordionState {
  /** All collapse instances in the accordion */
  instances: Map<string, CollapseState>;
  
  /** Currently expanded instance (for exclusive accordions) */
  activeInstance: Ref<string | null>;
  
  /** Register a collapse instance */
  register: (id: string, instance: CollapseState) => void;
  
  /** Unregister a collapse instance */
  unregister: (id: string) => void;
  
  /** Expand a specific instance */
  expand: (id: string) => void;
  
  /** Collapse a specific instance */
  collapse: (id: string) => void;
  
  /** Toggle a specific instance */
  toggle: (id: string) => void;
}

/**
 * Composable return type for useCollapse
 */
export interface UseCollapseReturn {
  /** Component state */
  state: CollapseState;
  
  /** ARIA attributes for trigger */
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