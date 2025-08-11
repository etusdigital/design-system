/**
 * Group value type - can be any primitive value used for selection
 */
export type GroupValue = string | number | boolean | null | undefined;

/**
 * Group selection types for different interaction patterns
 */
export type GroupSelectionType = 'radiogroup' | 'group' | 'listbox' | 'none';

/**
 * Group item type for enhanced accessibility
 */
export interface GroupItem {
    /** Unique identifier for the item */
    id: string;
    /** Value associated with the item */
    value: GroupValue;
    /** Display label for the item */
    label: string;
    /** Whether the item is disabled */
    disabled?: boolean;
    /** Whether the item is selected */
    selected?: boolean;
    /** Help text for the item */
    helpText?: string;
    /** Error message for validation */
    errorMessage?: string;
    /** ARIA description for the item */
    ariaDescription?: string;
}

/**
 * State interface for group components (radio groups, etc.)
 */
export interface GroupState {
    /** Currently selected value */
    selected: GroupValue;
    /** Whether the group is disabled */
    disabled: boolean;
    /** Function to update the selected value */
    select: (value: GroupValue) => void;
}

/**
 * Enhanced accessibility props for BGroup component
 */
export interface BGroupAccessibilityProps {
    /** Group selection type determines ARIA role and behavior */
    selectionType?: GroupSelectionType;
    /** ARIA label for the group */
    ariaLabel?: string;
    /** ID of element that labels this group */
    ariaLabelledBy?: string;
    /** ID of element that describes this group */
    ariaDescribedBy?: string;
    /** Group name for form submission and radio groups */
    groupName?: string;
    /** Whether the group is required */
    required?: boolean;
    /** Error message for group validation */
    errorMessage?: string;
    /** Help text for the group */
    helpText?: string;
    /** Whether to announce selection changes to screen readers */
    announceChanges?: boolean;
    /** Custom announcement message template */
    announcementTemplate?: string;
    /** Whether the group supports multiple selections */
    multiselectable?: boolean;
    /** Minimum number of selections required */
    minSelections?: number;
    /** Maximum number of selections allowed */
    maxSelections?: number;
    /** Orientation for keyboard navigation */
    orientation?: 'horizontal' | 'vertical';
    /** Whether to wrap navigation at boundaries */
    wrapNavigation?: boolean;
    /** Whether to show validation errors */
    showValidationErrors?: boolean;
    /** Whether to use enhanced focus management */
    enhancedFocus?: boolean;
    /** High contrast mode support */
    highContrast?: boolean;
    /** Reduced motion support */
    reduceMotion?: boolean;
}

/**
 * Group validation result interface
 */
export interface GroupValidationResult {
    /** Whether the group validation passes */
    isValid: boolean;
    /** List of validation error messages */
    errors: string[];
    /** List of warning messages */
    warnings: string[];
}

/**
 * Group navigation direction
 */
export type GroupNavigationDirection = 'next' | 'previous' | 'first' | 'last' | 'home' | 'end';

/**
 * Group keyboard event handler type
 */
export type GroupKeyboardHandler = (event: KeyboardEvent, currentIndex: number) => boolean;

/**
 * Enhanced group context for accessibility
 */
export interface AccessibleGroupContext {
    /** Group unique identifier */
    groupId: string;
    /** Group selection type */
    selectionType: GroupSelectionType;
    /** Currently selected values (array for multi-select) */
    selectedValues: GroupValue[];
    /** Whether group allows multiple selections */
    multiselectable: boolean;
    /** Whether the group is disabled */
    isDisabled: boolean;
    /** Group orientation for navigation */
    orientation: 'horizontal' | 'vertical';
    /** Whether navigation wraps at boundaries */
    wrapNavigation: boolean;
    /** Group name for form elements */
    groupName: string;
    /** Whether the group is required */
    isRequired: boolean;
    /** Error message for validation */
    errorMessage?: string;
    /** Help text for the group */
    helpText?: string;
    /** Whether to announce changes */
    announceChanges: boolean;
    /** High contrast mode */
    highContrast: boolean;
    /** Reduced motion mode */
    reduceMotion: boolean;
    /** All items in the group */
    items: GroupItem[];
    /** Currently focused item index */
    focusedIndex: number;
    /** Function to select an item */
    selectItem: (value: GroupValue, announce?: boolean) => void;
    /** Function to toggle item selection (for multi-select) */
    toggleItem: (value: GroupValue, announce?: boolean) => void;
    /** Function to navigate the group */
    navigate: (direction: GroupNavigationDirection) => void;
    /** Function to focus an item by index */
    focusItem: (index: number) => void;
    /** Function to focus an item by value */
    focusItemByValue: (value: GroupValue) => void;
    /** Function to register an item */
    registerItem: (item: GroupItem, element: HTMLElement) => void;
    /** Function to unregister an item */
    unregisterItem: (value: GroupValue) => void;
    /** Function to validate the group */
    validate: () => GroupValidationResult;
    /** Function to get item by value */
    getItem: (value: GroupValue) => GroupItem | undefined;
    /** Function to get all registered elements */
    getElements: () => HTMLElement[];
    /** Function to get element by value */
    getElementByValue: (value: GroupValue) => HTMLElement | undefined;
}
