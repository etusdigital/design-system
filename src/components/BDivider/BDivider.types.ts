/**
 * BDivider Component Types
 * 
 * Comprehensive TypeScript interfaces for the BDivider component with full
 * WCAG 2.1 AA accessibility support. Supports both decorative and semantic
 * divider patterns with proper ARIA attributes and screen reader control.
 */

export interface BDividerProps {
  /**
   * Position of the divider line relative to the slot content
   * @default 'right'
   */
  position?: 'left' | 'both' | 'right';

  /**
   * Orientation of the divider for accessibility context
   * Helps screen readers understand the layout structure
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';

  /**
   * Whether the divider is decorative or semantic
   * - 'decorative': Hidden from screen readers (aria-hidden="true")
   * - 'semantic': Announced as a separator by screen readers
   * @default 'decorative'
   */
  role?: 'decorative' | 'semantic';

  /**
   * Accessible label for semantic dividers
   * Used with aria-label when role is 'semantic'
   * Should describe the purpose of the section separation
   */
  ariaLabel?: string;

  /**
   * Whether to hide the divider from screen readers
   * Overrides role setting when explicitly set
   * @default undefined (determined by role)
   */
  ariaHidden?: boolean;

  /**
   * Custom ARIA attributes for advanced accessibility scenarios
   * Merged with computed ARIA attributes
   */
  ariaAttributes?: Record<string, string | boolean | number>;

  /**
   * Visual variant affecting appearance and accessibility
   * @default 'default'
   */
  variant?: 'default' | 'strong' | 'subtle';

  /**
   * Whether to enhance visibility in high contrast mode
   * Adds additional styling for better visibility
   * @default true
   */
  highContrastMode?: boolean;

  /**
   * Whether the divider content has text that needs accessibility labeling
   * When true, ensures proper text content accessibility
   * @default true (when slot content exists)
   */
  hasTextContent?: boolean;

  /**
   * Size variant affecting visual prominence
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Whether to respect user's reduced motion preferences
   * Disables any animations when user prefers reduced motion
   * @default true
   */
  respectReducedMotion?: boolean;
}

/**
 * Computed ARIA attributes for the divider component
 */
export interface BDividerAriaAttributes {
  role?: 'separator' | 'presentation';
  'aria-orientation'?: 'horizontal' | 'vertical';
  'aria-label'?: string;
  'aria-hidden'?: boolean;
  'aria-labelledby'?: string;
}

/**
 * Divider accessibility configuration
 */
export interface BDividerAccessibilityConfig {
  /**
   * Whether the divider provides semantic meaning
   */
  isSemantic: boolean;
  
  /**
   * Whether the divider should be announced by screen readers
   */
  isAnnounced: boolean;
  
  /**
   * Computed ARIA role based on configuration
   */
  computedRole: 'separator' | 'presentation';
  
  /**
   * Whether high contrast enhancements are applied
   */
  hasHighContrastEnhancements: boolean;
  
  /**
   * Whether text content accessibility is enabled
   */
  hasTextAccessibility: boolean;
}

/**
 * Events emitted by BDivider component
 */
export interface BDividerEvents {
  /**
   * Emitted when divider becomes visible (for analytics/tracking)
   */
  visible: () => void;
  
  /**
   * Emitted when divider focus state changes
   */
  focusChange: (focused: boolean) => void;
}

/**
 * Slots available in BDivider component
 */
export interface BDividerSlots {
  /**
   * Default slot for divider content/text
   * When provided, enables text content accessibility features
   */
  default: () => any;
}

/**
 * BDivider component instance type
 */
export interface BDividerInstance {
  /**
   * Component props
   */
  $props: BDividerProps;
  
  /**
   * Focus the divider (for semantic dividers with tabindex)
   */
  focus: () => void;
  
  /**
   * Get current accessibility configuration
   */
  getAccessibilityConfig: () => BDividerAccessibilityConfig;
}

/**
 * Divider positioning configuration
 */
export interface BDividerPositioning {
  /**
   * Whether to show left divider line
   */
  showLeft: boolean;
  
  /**
   * Whether to show right divider line
   */
  showRight: boolean;
  
  /**
   * Whether content is positioned between dividers
   */
  hasBothSides: boolean;
}

/**
 * Divider styling configuration for accessibility
 */
export interface BDividerStyling {
  /**
   * Container classes for the divider wrapper
   */
  containerClasses: string[];
  
  /**
   * Divider line classes
   */
  dividerLineClasses: string[];
  
  /**
   * Text content classes for accessibility
   */
  textContentClasses: string[];
  
  /**
   * High contrast mode additional classes
   */
  highContrastClasses: string[];
}