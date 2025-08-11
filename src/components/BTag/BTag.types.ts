/**
 * BTag accessibility props interface
 * Implements WCAG 2.1 AA standards for tag components
 */
export interface BTagAccessibilityProps {
  /** ARIA label for the tag */
  ariaLabel?: string;
  /** ARIA description for complex tags */
  ariaDescription?: string;
  /** Semantic role of the tag */
  role?: BTagSemanticRole;
  /** Whether the tag is currently selected/active */
  selected?: boolean;
  /** Whether the tag is disabled */
  disabled?: boolean;
  /** ARIA described-by reference */
  ariaDescribedBy?: string;
  /** Custom close button label for screen readers */
  closeLabel?: string;
  /** Whether to announce state changes */
  announceChanges?: boolean;
  /** Category/group for related tags */
  category?: string;
  /** Value for selectable tags */
  value?: string | number;
  /** Whether to announce removal actions */
  announceRemovals?: boolean;
  /** Whether to announce selection changes */
  announceSelections?: boolean;
  /** Custom announcement delay in milliseconds */
  announcementDelay?: number;
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
  /** Whether tag supports keyboard navigation */
  keyboardNavigation?: boolean;
  /** Whether to show focus indicators */
  showFocusIndicator?: boolean;
  /** Context description for complex tag usage */
  contextDescription?: string;
  /** Whether to provide removal confirmation */
  requireRemovalConfirmation?: boolean;
  /** Custom confirmation message for removal */
  removalConfirmationMessage?: string;
}

/**
 * Tag semantic roles for accessibility
 */
export type BTagSemanticRole = 'generic' | 'button' | 'link' | 'status' | 'group' | 'listitem' | 'option' | 'tab' | 'checkbox';

/**
 * Tag interaction types for accessibility
 */
export type BTagInteractionType = 'static' | 'removable' | 'clickable' | 'selectable' | 'toggleable' | 'draggable';

/**
 * Tag color variants with semantic meaning
 */
export type BTagColor = 'primary' | 'informative' | 'success' | 'warning' | 'danger' | 'neutral' | 'accent' | 'brand';

/**
 * Tag size variants
 */
export type BTagSize = 'small' | 'medium' | 'large' | 'xlarge';

/**
 * Tag visual variants
 */
export type BTagVariant = 'default' | 'secondary' | 'heavy' | 'outline' | 'ghost' | 'gradient';

/**
 * Tag shape variants
 */
export type BTagShape = 'pill' | 'rounded' | 'square' | 'circle';

/**
 * Tag loading states
 */
export type BTagLoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * Tag validation states
 */
export type BTagValidationState = 'valid' | 'invalid' | 'warning' | 'pending';

/**
 * Tag state interface for accessibility
 */
export interface BTagState {
  /** Whether tag is selected */
  isSelected: boolean;
  /** Whether tag is focused */
  isFocused: boolean;
  /** Whether tag is pressed */
  isPressed: boolean;
  /** Whether tag is hovered */
  isHovered: boolean;
  /** Whether tag is disabled */
  isDisabled: boolean;
  /** Whether tag is loading */
  isLoading: boolean;
  /** Current interaction type */
  interactionType: BTagInteractionType;
  /** Validation state */
  validationState: BTagValidationState;
  /** Whether keyboard navigation mode is active */
  keyboardMode: boolean;
  /** Whether high contrast mode is active */
  isHighContrast: boolean;
  /** Whether animations are disabled */
  isReducedMotion: boolean;
  /** Last announced message to prevent duplicates */
  lastAnnouncedMessage: string | null;
}

/**
 * Tag ARIA attributes interface
 */
export interface BTagAriaAttributes {
  /** ARIA role for the tag */
  role?: string;
  /** ARIA label for the tag */
  'aria-label'?: string;
  /** ARIA labelledby for complex labeling */
  'aria-labelledby'?: string;
  /** ARIA describedby for additional description */
  'aria-describedby'?: string;
  /** ARIA pressed state for toggleable tags */
  'aria-pressed'?: boolean | 'mixed';
  /** ARIA selected state for selectable tags */
  'aria-selected'?: boolean;
  /** ARIA checked state for checkbox-like tags */
  'aria-checked'?: boolean | 'mixed';
  /** ARIA disabled state */
  'aria-disabled'?: boolean;
  /** ARIA expanded state for expandable tags */
  'aria-expanded'?: boolean;
  /** ARIA current state for navigation tags */
  'aria-current'?: boolean | 'page' | 'step' | 'location' | 'date' | 'time';
  /** ARIA hidden for decorative tags */
  'aria-hidden'?: boolean;
  /** ARIA live for dynamic announcements */
  'aria-live'?: 'off' | 'polite' | 'assertive';
  /** ARIA atomic for live region updates */
  'aria-atomic'?: boolean;
  /** Tab index for keyboard navigation */
  tabindex?: number;
}

/**
 * Tag keyboard configuration
 */
export interface BTagKeyboardConfig {
  /** Whether keyboard navigation is enabled */
  enabled?: boolean;
  /** Keys for activation */
  activationKeys?: string[];
  /** Keys for removal */
  removalKeys?: string[];
  /** Keys for selection toggle */
  toggleKeys?: string[];
  /** Whether to prevent default keyboard behavior */
  preventDefault?: boolean;
  /** Whether to stop keyboard event propagation */
  stopPropagation?: boolean;
  /** Custom key handlers */
  customHandlers?: Record<string, (event: KeyboardEvent) => void>;
  /** Whether to enable navigation between tag groups */
  enableGroupNavigation?: boolean;
  /** Navigation keys for group movement */
  groupNavigationKeys?: string[];
}

/**
 * Tag group configuration for related tags
 */
export interface BTagGroupConfig {
  /** Group identifier */
  id?: string;
  /** Group label for screen readers */
  label?: string;
  /** Group description */
  description?: string;
  /** Whether group allows multiple selections */
  multiSelect?: boolean;
  /** Whether group is required */
  required?: boolean;
  /** Maximum number of selections allowed */
  maxSelections?: number;
  /** Minimum number of selections required */
  minSelections?: number;
  /** Custom validation function */
  validator?: (selectedTags: BTagItem[]) => boolean;
}

/**
 * Tag item interface with enhanced properties
 */
export interface BTagItem {
  /** Unique identifier */
  id: string | number;
  /** Display text */
  text: string;
  /** Tag value for forms/selection */
  value?: string | number;
  /** Category/group identifier */
  category?: string;
  /** Icon name */
  icon?: string;
  /** Whether icon is appended */
  isAppendedIcon?: boolean;
  /** Tag color variant */
  color?: BTagColor;
  /** Tag size */
  size?: BTagSize;
  /** Visual variant */
  variant?: BTagVariant;
  /** Whether tag is selected */
  selected?: boolean;
  /** Whether tag is disabled */
  disabled?: boolean;
  /** Whether tag is closeable */
  closeable?: boolean;
  /** Whether tag is clickable */
  clickable?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Custom ARIA label */
  ariaLabel?: string;
  /** Custom ARIA description */
  ariaDescription?: string;
  /** Custom close button label */
  closeLabel?: string;
  /** Badge count or indicator */
  badgeCount?: number;
  /** Badge text */
  badgeText?: string;
  /** Custom CSS classes */
  customClass?: string;
  /** Tooltip text */
  tooltip?: string;
  /** Link URL (if tag acts as a link) */
  href?: string;
  /** Link target */
  target?: '_blank' | '_self' | '_parent' | '_top';
  /** Priority for sorting/ordering */
  priority?: number;
  /** Custom data */
  data?: Record<string, any>;
  /** Additional properties */
  [key: string]: unknown;
}

/**
 * Tag event data interfaces
 */
export interface BTagClickEvent {
  /** Event source */
  event: MouseEvent;
  /** Tag item data */
  tag: BTagItem;
  /** Event type */
  type: 'click';
  /** Interaction source */
  source: 'mouse' | 'keyboard';
}

export interface BTagCloseEvent {
  /** Event source */
  event: MouseEvent | KeyboardEvent;
  /** Tag item data */
  tag: BTagItem;
  /** Event type */
  type: 'close';
  /** Interaction source */
  source: 'mouse' | 'keyboard';
}

export interface BTagSelectEvent {
  /** Tag item data */
  tag: BTagItem;
  /** New selection state */
  selected: boolean;
  /** Tag value */
  value?: string | number;
  /** Event type */
  type: 'select';
  /** Interaction source */
  source: 'mouse' | 'keyboard' | 'api';
}

export interface BTagFocusEvent {
  /** Tag item data */
  tag: BTagItem;
  /** Event type */
  type: 'focus' | 'blur';
  /** Focus source */
  source: 'mouse' | 'keyboard' | 'api';
}

/**
 * Complete BTag props interface
 */
export interface BTagProps extends BTagAccessibilityProps {
  /** Tag text content */
  text?: string;
  /** Tag color variant with semantic meaning */
  color?: BTagColor;
  /** Tag size */
  size?: BTagSize;
  /** Visual variant */
  variant?: BTagVariant;
  /** Tag shape */
  shape?: BTagShape;
  /** Loading state */
  loading?: boolean;
  /** Loading state enum */
  loadingState?: BTagLoadingState;
  /** Whether the tag can be removed */
  closeable?: boolean;
  /** Icon name */
  icon?: string;
  /** Whether icon appears after text */
  isAppendedIcon?: boolean;
  /** Interaction behavior */
  interaction?: BTagInteractionType;
  /** Whether tag is clickable */
  clickable?: boolean;
  /** Whether tag is draggable */
  draggable?: boolean;
  /** Maximum width before truncation */
  maxWidth?: string;
  /** Truncate long text */
  truncate?: boolean;
  /** Custom CSS classes */
  customClass?: string;
  /** Badge count */
  badgeCount?: number;
  /** Badge text */
  badgeText?: string;
  /** Tooltip text */
  tooltip?: string;
  /** Link URL (if tag acts as a link) */
  href?: string;
  /** Link target */
  target?: '_blank' | '_self' | '_parent' | '_top';
  /** Whether link should open in new tab */
  external?: boolean;
  /** Tag priority */
  priority?: number;
  /** HTML id attribute */
  id?: string;
  /** Additional CSS classes */
  class?: string;
  /** Inline styles */
  style?: string | Record<string, any>;
  /** Keyboard navigation configuration */
  keyboardConfig?: BTagKeyboardConfig;
  /** Tag group configuration */
  groupConfig?: BTagGroupConfig;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Whether to animate state changes */
  animated?: boolean;
  /** Custom renderer function */
  renderer?: (props: BTagProps, state: BTagState) => any;
}

/**
 * BTag emits interface
 */
export interface BTagEmits {
  /** Tag clicked */
  'click': [event: BTagClickEvent];
  /** Tag closed/removed */
  'close': [event: BTagCloseEvent];
  /** Tag selection changed */
  'select': [event: BTagSelectEvent];
  /** Tag focused */
  'focus': [event: BTagFocusEvent];
  /** Tag blurred */
  'blur': [event: BTagFocusEvent];
  /** Keyboard event */
  'keydown': [event: KeyboardEvent];
  /** Mouse enter */
  'mouseenter': [event: MouseEvent];
  /** Mouse leave */
  'mouseleave': [event: MouseEvent];
  /** Drag start */
  'dragstart': [event: DragEvent];
  /** Drag end */
  'dragend': [event: DragEvent];
  /** Loading state changed */
  'loading-change': [isLoading: boolean, state: BTagLoadingState];
  /** Validation state changed */
  'validation-change': [state: BTagValidationState, message?: string];
  /** Accessibility event */
  'accessibility': [type: string, data: any];
}

/**
 * Tag validation result
 */
export interface BTagValidationResult {
  /** Whether validation passes */
  isValid: boolean;
  /** Error messages */
  errors: string[];
  /** Warning messages */
  warnings: string[];
  /** Tag configuration */
  config?: BTagProps;
}

/**
 * Tag announcement templates
 */
export interface BTagAnnouncementTemplates {
  /** Template for selection announcement */
  selection: string;
  /** Template for deselection announcement */
  deselection: string;
  /** Template for removal announcement */
  removal: string;
  /** Template for activation announcement */
  activation: string;
  /** Template for loading announcement */
  loading: string;
  /** Template for loaded announcement */
  loaded: string;
  /** Template for error announcement */
  error: string;
  /** Template for validation error announcement */
  validationError: string;
  /** Template for group selection announcement */
  groupSelection: string;
  /** Template for keyboard instructions */
  keyboardInstructions: string;
  /** Template for state change announcement */
  stateChange: string;
}

/**
 * Tag theme configuration
 */
export interface BTagThemeConfig {
  /** Primary color */
  primaryColor?: string;
  /** Secondary color */
  secondaryColor?: string;
  /** Success color */
  successColor?: string;
  /** Warning color */
  warningColor?: string;
  /** Danger color */
  dangerColor?: string;
  /** Neutral color */
  neutralColor?: string;
  /** Background color */
  backgroundColor?: string;
  /** Text color */
  textColor?: string;
  /** Border color */
  borderColor?: string;
  /** Focus ring color */
  focusRingColor?: string;
  /** Hover background color */
  hoverBackgroundColor?: string;
  /** Selected background color */
  selectedBackgroundColor?: string;
  /** Disabled color */
  disabledColor?: string;
  /** Border radius */
  borderRadius?: string;
  /** Font family */
  fontFamily?: string;
}

/**
 * Tag accessibility helpers
 */
export interface BTagAccessibilityHelpers {
  /** Get ARIA attributes for tag */
  getTagAriaAttributes: (state: BTagState, props: BTagProps) => BTagAriaAttributes;
  /** Format selection announcement */
  formatSelectionAnnouncement: (tag: BTagItem, selected: boolean) => string;
  /** Format removal announcement */
  formatRemovalAnnouncement: (tag: BTagItem) => string;
  /** Check if announcement should be made */
  shouldAnnounce: (message: string, lastMessage: string | null) => boolean;
  /** Get keyboard instructions */
  getKeyboardInstructions: (interaction: BTagInteractionType, features: string[]) => string;
  /** Get appropriate role for tag */
  getSemanticRole: (interaction: BTagInteractionType, context?: string) => BTagSemanticRole;
  /** Announce tag state change */
  announceTagStateChange: (type: string, tag: BTagItem, data?: any) => void;
  /** Validate tag accessibility */
  validateAccessibility: (props: BTagProps) => BTagValidationResult;
}

/**
 * Default configurations
 */
export const DEFAULT_TAG_KEYBOARD_CONFIG: Required<BTagKeyboardConfig> = {
  enabled: true,
  activationKeys: ['Enter', ' '],
  removalKeys: ['Delete', 'Backspace'],
  toggleKeys: ['Enter', ' '],
  preventDefault: true,
  stopPropagation: false,
  customHandlers: {},
  enableGroupNavigation: false,
  groupNavigationKeys: ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'],
};

export const DEFAULT_TAG_ACCESSIBILITY_CONFIG: Required<BTagAccessibilityProps> = {
  ariaLabel: '',
  ariaDescription: '',
  role: 'generic',
  selected: false,
  disabled: false,
  ariaDescribedBy: '',
  closeLabel: 'Remove tag',
  announceChanges: false,
  category: '',
  value: '',
  announceRemovals: true,
  announceSelections: true,
  announcementDelay: 0,
  highContrast: false,
  reduceMotion: false,
  enhancedFocus: true,
  minTouchTarget: true,
  screenReaderInstructions: 'Press Enter or Space to activate, Delete to remove',
  liveRegionPoliteness: 'polite',
  keyboardNavigation: true,
  showFocusIndicator: true,
  contextDescription: '',
  requireRemovalConfirmation: false,
  removalConfirmationMessage: 'Are you sure you want to remove this tag?',
};

export const DEFAULT_TAG_GROUP_CONFIG: Required<BTagGroupConfig> = {
  id: '',
  label: '',
  description: '',
  multiSelect: false,
  required: false,
  maxSelections: 0,
  minSelections: 0,
  validator: () => true,
};

export const DEFAULT_TAG_ANNOUNCEMENTS: Required<BTagAnnouncementTemplates> = {
  selection: '{text} selected',
  deselection: '{text} deselected',
  removal: '{text} removed',
  activation: '{text} activated',
  loading: '{text} loading',
  loaded: '{text} loaded',
  error: 'Error in {text}',
  validationError: '{text} validation failed: {message}',
  groupSelection: '{count} items selected in {group}',
  keyboardInstructions: 'Use Enter or Space to activate, Delete to remove',
  stateChange: '{text} state changed to {state}',
};

/**
 * Tag interaction patterns
 */
export const TAG_INTERACTION_PATTERNS = {
  /** Static display tag */
  STATIC: 'static',
  /** Removable filter tag */
  REMOVABLE: 'removable',
  /** Clickable action tag */
  CLICKABLE: 'clickable',
  /** Selectable option tag */
  SELECTABLE: 'selectable',
  /** Toggle switch tag */
  TOGGLEABLE: 'toggleable',
  /** Draggable reorder tag */
  DRAGGABLE: 'draggable',
} as const;

/**
 * Tag semantic contexts
 */
export const TAG_SEMANTIC_CONTEXTS = {
  /** Status indicator */
  STATUS: 'status',
  /** Filter or category */
  FILTER: 'filter',
  /** Navigation element */
  NAVIGATION: 'navigation',
  /** Form option */
  FORM_OPTION: 'form-option',
  /** Metadata label */
  METADATA: 'metadata',
  /** Action trigger */
  ACTION: 'action',
} as const;

/**
 * Keyboard navigation key mappings
 */
export const TAG_KEY_MAPPINGS: Record<string, {
  action: string;
  description: string;
}> = {
  Enter: { action: 'activate', description: 'Activate tag' },
  Space: { action: 'activate', description: 'Activate tag' },
  Delete: { action: 'remove', description: 'Remove tag' },
  Backspace: { action: 'remove', description: 'Remove tag' },
  ArrowLeft: { action: 'previousTag', description: 'Focus previous tag' },
  ArrowRight: { action: 'nextTag', description: 'Focus next tag' },
  ArrowUp: { action: 'previousRow', description: 'Focus tag in previous row' },
  ArrowDown: { action: 'nextRow', description: 'Focus tag in next row' },
  Home: { action: 'firstTag', description: 'Focus first tag' },
  End: { action: 'lastTag', description: 'Focus last tag' },
  Escape: { action: 'cancel', description: 'Cancel current action' },
};

/**
 * Tag size configurations with accessibility considerations
 */
export const TAG_SIZE_CONFIG: Record<BTagSize, {
  minHeight: string;
  padding: string;
  fontSize: string;
  iconSize: string;
  closeButtonSize: string;
  minTouchTarget: boolean;
}> = {
  small: {
    minHeight: '1.5rem',
    padding: '0.125rem 0.5rem',
    fontSize: '0.75rem',
    iconSize: '1rem',
    closeButtonSize: '1rem',
    minTouchTarget: false,
  },
  medium: {
    minHeight: '2rem',
    padding: '0.25rem 0.75rem',
    fontSize: '0.875rem',
    iconSize: '1.125rem',
    closeButtonSize: '1.25rem',
    minTouchTarget: false,
  },
  large: {
    minHeight: '2.5rem',
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    iconSize: '1.25rem',
    closeButtonSize: '1.5rem',
    minTouchTarget: false,
  },
  xlarge: {
    minHeight: '3rem',
    padding: '0.75rem 1.25rem',
    fontSize: '1.125rem',
    iconSize: '1.5rem',
    closeButtonSize: '1.75rem',
    minTouchTarget: false,
  },
};

/**
 * Tag color configurations with semantic meanings
 */
export const TAG_COLOR_CONFIG: Record<BTagColor, {
  semanticMeaning: string;
  ariaLabel?: string;
  contrastRatio: number;
}> = {
  primary: {
    semanticMeaning: 'Primary action or selection',
    contrastRatio: 4.5,
  },
  informative: {
    semanticMeaning: 'Informational content',
    ariaLabel: 'informational',
    contrastRatio: 4.5,
  },
  success: {
    semanticMeaning: 'Success or completion',
    ariaLabel: 'success',
    contrastRatio: 4.5,
  },
  warning: {
    semanticMeaning: 'Warning or caution',
    ariaLabel: 'warning',
    contrastRatio: 4.5,
  },
  danger: {
    semanticMeaning: 'Error or danger',
    ariaLabel: 'error',
    contrastRatio: 4.5,
  },
  neutral: {
    semanticMeaning: 'Neutral or default',
    contrastRatio: 4.5,
  },
  accent: {
    semanticMeaning: 'Accent or highlight',
    ariaLabel: 'highlighted',
    contrastRatio: 4.5,
  },
  brand: {
    semanticMeaning: 'Brand or identity',
    ariaLabel: 'brand',
    contrastRatio: 4.5,
  },
};

/**
 * Export all types for easy importing
 */
export type {
  BTagAccessibilityProps as AccessibilityProps,
  BTagProps as Props,
  BTagState as State,
  BTagAriaAttributes as AriaAttributes,
  BTagKeyboardConfig as KeyboardConfig,
  BTagGroupConfig as GroupConfig,
  BTagItem as Item,
  BTagClickEvent as ClickEvent,
  BTagCloseEvent as CloseEvent,
  BTagSelectEvent as SelectEvent,
  BTagFocusEvent as FocusEvent,
  BTagEmits as Emits,
  BTagValidationResult as ValidationResult,
  BTagAnnouncementTemplates as AnnouncementTemplates,
  BTagThemeConfig as ThemeConfig,
  BTagAccessibilityHelpers as AccessibilityHelpers,
};