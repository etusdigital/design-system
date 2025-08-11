<script setup lang="ts" generic="T = unknown">
import { ref, shallowRef, shallowReactive, markRaw, watch, computed, nextTick, onMounted } from "vue";
import { useOptionalModel, useKeyboardNavigation, useAriaAttributes, useScreenReader } from "#composables";
import { useVirtualList } from '@vueuse/core';
import { type BContainerModelExtra } from "../../utils/components/BContainerModelExtra.types";
import SelectContent from "../../utils/components/SelectContent.vue";
import Option from "../../utils/components/Option.vue";
import { isObject } from "../../utils";
import type { 
  BSelectAccessibilityConfig,
  BSelectAccessibilityProps,
  BSelectKeyboardNavigation,
  BSelectScreenReaderConfig,
  BSelectFocusManagement,
  BSelectTypeAheadConfig,
  BSelectValidation
} from "./BSelect.types";

/**
 * Extra information for expanded state changes
 */
export type BSelectExpandedExtra = {
  source: BContainerModelExtra["source"] | "value-selected";
};

/**
 * Interface for select items that can be objects with label/value or primitives
 */
export interface BSelectItem<TValue = unknown> {
  [key: string]: unknown;
  /** Whether the item is disabled */
  disabled?: boolean;
}

/**
 * Union type for select items - can be objects or primitive values
 */
export type BSelectItemType<TValue = unknown> = BSelectItem<TValue> | TValue;

const props = withDefaults(
  defineProps<{
    /** Current selected value */
    modelValue?: T;
    /** Label for the select */
    labelValue?: string;
    /** Array of select items */
    items: BSelectItemType<T>[];
    /** Icon to display */
    icon?: string;
    /** Whether the select is expanded */
    expanded?: boolean;
    /** Key to use for labels when items are objects */
    labelKey?: string;
    /** Key to use for values when items are objects */
    valueKey?: string;
    /** Whether search functionality is enabled */
    searchable?: boolean;
    /** Whether the select is disabled */
    disabled?: boolean;
    /** Whether the field is required */
    required?: boolean;
    /** Whether to show error state */
    isError?: boolean;
    /** Error message to display */
    errorMessage?: string;
    /** Info message to display */
    infoMessage?: string;
    /** Whether to use absolute positioning */
    absolute?: boolean;
    /** Whether to use secondary styling */
    secondary?: boolean;
    /** Comprehensive accessibility configuration */
    accessibility?: BSelectAccessibilityConfig;
    /** Loading state */
    loading?: boolean;
    /** Placeholder text when no option is selected */
    placeholder?: string;
    /** Whether to auto-focus on mount */
    autofocus?: boolean;
    /** Maximum height for dropdown */
    maxHeight?: string;
    /** Whether to enable virtual scrolling for large option lists */
    virtualized?: boolean;
    /** Height of each option in pixels for virtual scrolling */
    optionHeight?: number;
    /** Container height for virtual scrolling in pixels */
    virtualContainerHeight?: number;
    /** Number of extra items to render outside visible area for smooth scrolling */
    overscan?: number;
    /** Minimum number of items to enable virtualization */
    virtualizationThreshold?: number;
  }>(),
  {
    modelValue: undefined,
    labelValue: "",
    expanded: undefined,
    labelKey: "label",
    valueKey: "value",
    searchable: false,
    disabled: false,
    required: false,
    isError: false,
    errorMessage: "",
    infoMessage: "",
    absolute: true,
    secondary: false,
    accessibility: () => ({}),
    loading: false,
    placeholder: "Select an option",
    autofocus: false,
    maxHeight: "200px",
    virtualized: false,
    optionHeight: 40,
    virtualContainerHeight: 200,
    overscan: 5,
    virtualizationThreshold: 100,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: T | undefined, extra: { index: number }];
  "update:expanded": [value: boolean, extra: BSelectExpandedExtra];
  "option-focus": [option: BSelectItemType<T>, index: number];
  "option-blur": [option: BSelectItemType<T>, index: number];
  "search": [searchTerm: string, filteredOptions: BSelectItemType<T>[]];
  "keyboard-navigation": [event: KeyboardEvent, action: string];
  "opened": [optionCount: number];
  "closed": [selectedValue?: T];
  "validation": [isValid: boolean, error?: string];
}>();

const [model, setModel] = useOptionalModel<T | undefined>(
  props,
  "modelValue",
  emit,
  undefined
);
const [expandedModel, setExpandedModel] = useOptionalModel<boolean>(
  props,
  "expanded",
  emit,
  false
);

let selectedIndex = ref<number | null>(null);
let searchText = ref("");
const selectContainer = ref<HTMLElement | null>(null);
const selectTrigger = ref<HTMLElement | null>(null);
const dropdownContainer = ref<HTMLElement | null>(null);

// Type-ahead search state
const typeAheadBuffer = ref("");
const typeAheadTimeout = ref<NodeJS.Timeout | null>(null);
const lastTypeAheadTime = ref(0);

// Focus management
const focusedOptionIndex = ref(-1);
const previousFocusElement = ref<HTMLElement | null>(null);

// Validation state
const validationMessage = ref("");
const isValid = ref(true);

// Accessibility configuration with defaults
const accessibilityConfig = computed<BSelectAccessibilityConfig>(() => ({
  props: {
    ariaLabel: props.accessibility?.props?.ariaLabel,
    id: props.accessibility?.props?.id,
    ariaDescription: props.accessibility?.props?.ariaDescription,
    ariaRequired: props.accessibility?.props?.ariaRequired ?? props.required,
    ariaInvalid: props.accessibility?.props?.ariaInvalid ?? props.isError,
    announceSelectionChanges: props.accessibility?.props?.announceSelectionChanges ?? true,
    selectionAnnouncementTemplate: props.accessibility?.props?.selectionAnnouncementTemplate ?? "Selected {item}, {position} of {total}",
    openAnnouncementTemplate: props.accessibility?.props?.openAnnouncementTemplate ?? "Options list opened, {count} options available",
    closeAnnouncementTemplate: props.accessibility?.props?.closeAnnouncementTemplate ?? "Options list closed",
    ...props.accessibility?.props,
  },
  keyboard: {
    enableArrowKeys: true,
    enableHomeEndKeys: true,
    enableTypeAhead: true,
    typeAheadDelay: 1000,
    wrapNavigation: true,
    closeOnEscape: true,
    openOnEnterSpace: true,
    ...props.accessibility?.keyboard,
  },
  screenReader: {
    useLiveRegions: true,
    selectionPoliteness: 'polite' as const,
    focusPoliteness: 'polite' as const,
    announceDropdownState: true,
    announceOptionCount: true,
    announceFilteredResults: true,
    ...props.accessibility?.screenReader,
  },
  focus: {
    trapFocus: false,
    restoreFocus: true,
    focusFirstOption: false,
    focusSelectedOption: true,
    showFocusIndicators: true,
    ...props.accessibility?.focus,
  },
  typeAhead: {
    enabled: true,
    minCharacters: 1,
    resetDelay: 1000,
    caseSensitive: false,
    matchFromStart: false,
    announceMatches: true,
    ...props.accessibility?.typeAhead,
  },
  validation: {
    required: props.required,
    announceErrors: true,
    immediateValidation: false,
    ...props.accessibility?.validation,
  },
}));

// Accessibility setup
const { useAriaId, useComboboxAria, useListboxAria, useOptionAria } = useAriaAttributes();
const screenReader = useScreenReader();
const selectId = accessibilityConfig.value.props?.id || useAriaId('select');
const listboxId = useAriaId('listbox');
const errorId = useAriaId('error');
const descriptionId = useAriaId('description');
const activeDescendantId = ref<string>('');

// Filter items for keyboard navigation (exclude disabled items) - optimized with caching
const navigableItems = computed(() => {
  const filtered = searchItem(searchText.value);
  return filtered.filter(item => !((isObject(item) ? (item as BSelectItem<T>).disabled : false)));
});

// All items (including disabled) for display - use shallowRef since items array structure rarely changes
const displayItems = computed(() => searchItem(searchText.value));

// Auto-enable virtualization if items exceed threshold
const shouldVirtualize = computed(() => {
  return props.virtualized || (displayItems.value.length >= props.virtualizationThreshold);
});

// Virtual scrolling setup for large lists
const virtualScrollContainer = ref<HTMLDivElement | null>(null);
const {
  list: virtualList,
  containerProps: virtualContainerProps,
  wrapperProps: virtualWrapperProps
} = useVirtualList(
  displayItems,
  {
    itemHeight: props.optionHeight,
    overscan: props.overscan
  }
);

// Use virtualized list when enabled, otherwise use regular display items
const renderedItems = computed(() => {
  return shouldVirtualize.value ? virtualList.value : displayItems.value.map((data, index) => ({ data, index }));
});

// Update active descendant for virtual scrolling accessibility
function updateVirtualActiveDescendant() {
  if (keyboardActiveIndex.value >= 0 && shouldVirtualize.value) {
    const visibleIndex = virtualList.value.findIndex(item => item.index === keyboardActiveIndex.value);
    if (visibleIndex >= 0) {
      activeDescendantId.value = `select-option-${getValue(virtualList.value[visibleIndex].data)}`;
    }
  } else if (keyboardActiveIndex.value >= 0) {
    activeDescendantId.value = `select-option-${getValue(displayItems.value[keyboardActiveIndex.value])}`;
  } else {
    activeDescendantId.value = '';
  }
}

// For keyboard navigation, use a simple reactive array
const keyboardActiveIndex = ref(-1);
const isKeyboardNavigating = ref(false);

// Computed properties for accessibility
const hasSelection = computed(() => model.value !== undefined && model.value !== null);
const selectedItemLabel = computed(() => hasSelection.value ? getLabel(model.value as BSelectItemType<T>) : '');
const optionCount = computed(() => navigableItems.value.length);
const selectedOptionIndex = computed(() => {
  if (!hasSelection.value) return -1;
  return navigableItems.value.findIndex(item => getValue(item) === getValue(model.value as BSelectItemType<T>));
});

function handleTypeAhead(char: string): boolean {
  if (!accessibilityConfig.value.typeAhead?.enabled) return false;
  
  const now = Date.now();
  const delay = accessibilityConfig.value.typeAhead.resetDelay || 1000;
  
  // Reset buffer if too much time has passed
  if (now - lastTypeAheadTime.value > delay) {
    typeAheadBuffer.value = '';
  }
  
  // Clear existing timeout
  if (typeAheadTimeout.value) {
    clearTimeout(typeAheadTimeout.value);
  }
  
  // Add character to buffer
  typeAheadBuffer.value += accessibilityConfig.value.typeAhead.caseSensitive ? char : char.toLowerCase();
  lastTypeAheadTime.value = now;
  
  // Set timeout to clear buffer
  typeAheadTimeout.value = setTimeout(() => {
    typeAheadBuffer.value = '';
  }, delay);
  
  // Find matching option
  const matchingIndex = navigableItems.value.findIndex((item, index) => {
    const label = getLabel(item);
    const searchLabel = accessibilityConfig.value.typeAhead?.caseSensitive ? label : label.toLowerCase();
    
    return accessibilityConfig.value.typeAhead?.matchFromStart 
      ? searchLabel.startsWith(typeAheadBuffer.value)
      : searchLabel.includes(typeAheadBuffer.value);
  });
  
  if (matchingIndex >= 0) {
    keyboardActiveIndex.value = matchingIndex;
    focusedOptionIndex.value = matchingIndex;
    updateActiveDescendant();
    
    if (accessibilityConfig.value.typeAhead?.announceMatches) {
      const item = navigableItems.value[matchingIndex];
      const label = getLabel(item);
      screenReader.announcePolitely(`${label}, ${matchingIndex + 1} of ${navigableItems.value.length}`);
    }
    
    return true;
  }
  
  return false;
}

function handleSelectKeydown(event: KeyboardEvent): boolean {
  const items = navigableItems.value;
  if (items.length === 0) return false;
  
  let handled = false;
  const config = accessibilityConfig.value.keyboard;
  
  // Handle type-ahead for printable characters
  if (event.key.length === 1 && !event.ctrlKey && !event.altKey && !event.metaKey) {
    handled = handleTypeAhead(event.key);
    if (handled) return true;
  }
  
  switch (event.key) {
    case 'ArrowDown':
      if (config?.enableArrowKeys) {
        event.preventDefault();
        if (config.wrapNavigation) {
          keyboardActiveIndex.value = keyboardActiveIndex.value < items.length - 1 
            ? keyboardActiveIndex.value + 1 
            : 0;
        } else {
          keyboardActiveIndex.value = Math.min(keyboardActiveIndex.value + 1, items.length - 1);
        }
        handled = true;
      }
      break;
      
    case 'ArrowUp':
      if (config?.enableArrowKeys) {
        event.preventDefault();
        if (config.wrapNavigation) {
          keyboardActiveIndex.value = keyboardActiveIndex.value > 0 
            ? keyboardActiveIndex.value - 1 
            : items.length - 1;
        } else {
          keyboardActiveIndex.value = Math.max(keyboardActiveIndex.value - 1, 0);
        }
        handled = true;
      }
      break;
      
    case 'Home':
      if (config?.enableHomeEndKeys) {
        event.preventDefault();
        keyboardActiveIndex.value = 0;
        handled = true;
      }
      break;
      
    case 'End':
      if (config?.enableHomeEndKeys) {
        event.preventDefault();
        keyboardActiveIndex.value = items.length - 1;
        handled = true;
      }
      break;
      
    case 'PageUp':
      if (config?.enablePageUpDownKeys) {
        event.preventDefault();
        keyboardActiveIndex.value = Math.max(0, keyboardActiveIndex.value - 10);
        handled = true;
      }
      break;
      
    case 'PageDown':
      if (config?.enablePageUpDownKeys) {
        event.preventDefault();
        keyboardActiveIndex.value = Math.min(items.length - 1, keyboardActiveIndex.value + 10);
        handled = true;
      }
      break;
      
    case 'Enter':
    case ' ':
      event.preventDefault();
      if (keyboardActiveIndex.value >= 0) {
        const selectedItem = items[keyboardActiveIndex.value];
        const actualIndex = props.items.findIndex(item => getValue(item) === getValue(selectedItem));
        selectItem(selectedItem, actualIndex);
        
        if (accessibilityConfig.value.props?.announceSelectionChanges) {
          const label = getLabel(selectedItem);
          const customAnnouncement = accessibilityConfig.value.screenReader?.customAnnouncements?.selection;
          const template = accessibilityConfig.value.props.selectionAnnouncementTemplate || "Selected {item}, {position} of {total}";
          const announcement = customAnnouncement
            ? (typeof customAnnouncement === 'function'
                ? customAnnouncement(label, keyboardActiveIndex.value + 1, items.length)
                : customAnnouncement)
            : template
                .replace('{item}', label)
                .replace('{position}', (keyboardActiveIndex.value + 1).toString())
                .replace('{total}', items.length.toString());
          screenReader.announcePolitely(announcement);
        }
      }
      handled = true;
      break;
      
    case 'Escape':
      if (config?.closeOnEscape) {
        event.preventDefault();
        setExpandedModel(false, { source: "keyboard" });
        handled = true;
      }
      break;
  }
  
  if (handled) {
    isKeyboardNavigating.value = true;
    focusedOptionIndex.value = keyboardActiveIndex.value;
    updateActiveDescendant();
    
    // Emit keyboard navigation event
    emit('keyboard-navigation', event, event.key);
    
    // Announce focused option
    if (keyboardActiveIndex.value >= 0 && accessibilityConfig.value.screenReader?.focusPoliteness) {
      const item = items[keyboardActiveIndex.value];
      const label = getLabel(item);
      const politeness = accessibilityConfig.value.screenReader.focusPoliteness;
      const customAnnouncement = accessibilityConfig.value.screenReader.customAnnouncements?.focus;
      
      const announcement = customAnnouncement
        ? (typeof customAnnouncement === 'function'
            ? customAnnouncement(label, keyboardActiveIndex.value + 1, items.length)
            : customAnnouncement)
        : `${label}, ${keyboardActiveIndex.value + 1} of ${items.length}`;
      
      if (politeness === 'assertive') {
        screenReader.announceAssertively(announcement);
      } else {
        screenReader.announcePolitely(announcement);
      }
    }
  }
  
  return handled;
}

function updateActiveDescendant() {
  if (shouldVirtualize.value) {
    updateVirtualActiveDescendant();
  } else if (keyboardActiveIndex.value >= 0 && navigableItems.value[keyboardActiveIndex.value]) {
    const activeItem = navigableItems.value[keyboardActiveIndex.value];
    activeDescendantId.value = `select-option-${getValue(activeItem)}`;
  } else {
    activeDescendantId.value = '';
  }
}

// ARIA attributes
const comboboxAriaAttrs = computed(() => ({
  ...useComboboxAria(
    expandedModel,
    true,
    listboxId,
    activeDescendantId
  ).value,
  'aria-label': accessibilityConfig.value.props?.ariaLabel,
  'aria-describedby': [accessibilityConfig.value.props?.ariaDescribedBy, props.errorMessage ? errorId : null, props.infoMessage ? descriptionId : null].filter(Boolean).join(' ') || undefined,
  'aria-labelledby': accessibilityConfig.value.props?.ariaLabelledBy,
  'aria-required': accessibilityConfig.value.props?.ariaRequired,
  'aria-invalid': accessibilityConfig.value.props?.ariaInvalid,
  'aria-busy': props.loading,
  ...accessibilityConfig.value.props?.comboboxAriaAttrs,
}));

const listboxAriaAttrs = computed(() => ({
  ...useListboxAria(false, 'vertical').value,
  'aria-busy': props.loading,
  'aria-label': `Options for ${props.labelValue || 'select'}`,
  ...accessibilityConfig.value.props?.listboxAriaAttrs,
}));

watch(
  () => props.modelValue,
  (newVal) => {
    if (!newVal) selectedIndex.value = null;
    else {
      const index = props.items.findIndex((x: BSelectItemType<T>) => getValue(x) === getValue(newVal as BSelectItemType<T>));
      selectedIndex.value = index < 0 ? null : index;
    }
    model.value = props.modelValue as T | undefined;
    validateSelection();
  }
);

// Watch for search text changes to emit search events
watch(searchText, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    const filtered = searchItem(newVal);
    emit('search', newVal, filtered);
    
    // Reset keyboard navigation when search changes
    keyboardActiveIndex.value = -1;
    focusedOptionIndex.value = -1;
    
    // Announce filtered results
    if (accessibilityConfig.value.screenReader?.announceFilteredResults && newVal) {
      const customAnnouncement = accessibilityConfig.value.screenReader.customAnnouncements?.filtered;
      let announcement: string;
      
      if (customAnnouncement) {
        if (typeof customAnnouncement === 'function') {
          announcement = customAnnouncement(filtered.length, newVal);
        } else {
          announcement = customAnnouncement
            .replace('{count}', filtered.length.toString())
            .replace('{search}', newVal);
        }
      } else {
        announcement = `Found ${filtered.length} options matching '${newVal}'`;
      }
      
      screenReader.announcePolitely(announcement);
    }
  }
});

// Watch for expanded state changes
watch(expandedModel, (isExpanded, wasExpanded) => {
  if (isExpanded && !wasExpanded) {
    handleDropdownOpen();
  } else if (!isExpanded && wasExpanded) {
    handleDropdownClose();
  }
});

/**
 * Gets the display label for an item
 */
function getLabel(item: BSelectItemType<T>): string {
  if (item === null || item === undefined) return '';
  return isObject(item) ? String((item as BSelectItem<T>)[props.labelKey] || '') : String(item);
}

/**
 * Gets the value from an item
 */
function getValue(item: BSelectItemType<T>): T {
  if (item === null || item === undefined) return item as T;
  return isObject(item) ? (item as BSelectItem<T>)[props.valueKey] as T : item as T;
}

/**
 * Handles dropdown opening
 */
function handleDropdownOpen(): void {
  // Store previous focus element for restoration
  if (accessibilityConfig.value.focus?.restoreFocus) {
    previousFocusElement.value = document.activeElement as HTMLElement;
  }
  
  // Set initial keyboard focus
  if (accessibilityConfig.value.focus?.focusSelectedOption && selectedOptionIndex.value >= 0) {
    keyboardActiveIndex.value = selectedOptionIndex.value;
    focusedOptionIndex.value = selectedOptionIndex.value;
  } else if (accessibilityConfig.value.focus?.focusFirstOption && navigableItems.value.length > 0) {
    keyboardActiveIndex.value = 0;
    focusedOptionIndex.value = 0;
  }
  
  updateActiveDescendant();
  
  // Announce dropdown opening with virtual scrolling context
  if (accessibilityConfig.value.screenReader?.announceDropdownState) {
    const customAnnouncement = accessibilityConfig.value.screenReader.customAnnouncements?.opened;
    let template = accessibilityConfig.value.props?.openAnnouncementTemplate
      || "Options list opened, {count} options available";
    
    // Add virtual scrolling context to announcement
    if (shouldVirtualize.value) {
      template += ". Virtual scrolling enabled for better performance with large lists.";
    }
    
    const announcement = customAnnouncement
      ? (typeof customAnnouncement === 'function'
          ? customAnnouncement(optionCount.value)
          : customAnnouncement)
      : template.replace('{count}', optionCount.value.toString());
    screenReader.announcePolitely(announcement);
  }
  
  emit('opened', optionCount.value);
}

/**
 * Handles dropdown closing
 */
function handleDropdownClose(): void {
  // Restore focus if configured
  if (accessibilityConfig.value.focus?.restoreFocus && previousFocusElement.value) {
    nextTick(() => {
      previousFocusElement.value?.focus();
      previousFocusElement.value = null;
    });
  }
  
  // Reset keyboard navigation state
  keyboardActiveIndex.value = -1;
  focusedOptionIndex.value = -1;
  isKeyboardNavigating.value = false;
  activeDescendantId.value = '';
  
  // Clear type-ahead buffer
  typeAheadBuffer.value = '';
  if (typeAheadTimeout.value) {
    clearTimeout(typeAheadTimeout.value);
    typeAheadTimeout.value = null;
  }
  
  // Announce dropdown closing
  if (accessibilityConfig.value.screenReader?.announceDropdownState) {
    const customAnnouncement = accessibilityConfig.value.screenReader.customAnnouncements?.closed;
    const template = accessibilityConfig.value.props?.closeAnnouncementTemplate || "Options list closed";
    const announcement = customAnnouncement
      ? (typeof customAnnouncement === 'function'
          ? customAnnouncement(hasSelection.value ? selectedItemLabel.value : undefined)
          : customAnnouncement)
      : (hasSelection.value 
          ? template.replace('{selected}', selectedItemLabel.value)
          : template);
    screenReader.announcePolitely(announcement);
  }
  
  emit('closed', model.value);
}

/**
 * Validates the current selection
 */
function validateSelection(): void {
  const config = accessibilityConfig.value.validation;
  if (!config) return;
  
  let valid = true;
  let errorMessage = '';
  
  // Required validation
  if (config.required && (!model.value || model.value === null || model.value === undefined)) {
    valid = false;
    errorMessage = props.errorMessage || config.errorMessage || `${props.labelValue || 'Selection'} is required`;
  }
  
  // Custom validation
  if (valid && config.validator && model.value !== undefined) {
    const result = config.validator(model.value);
    if (typeof result === 'string') {
      valid = false;
      errorMessage = result;
    } else if (!result) {
      valid = false;
      errorMessage = props.errorMessage || config.errorMessage || `${props.labelValue || 'Selection'} is invalid`;
    }
  }
  
  isValid.value = valid;
  validationMessage.value = errorMessage;
  
  // Announce validation errors
  if (!valid && config.announceErrors) {
    screenReader.announceAssertively(`Error: ${errorMessage}`);
  }
  
  emit('validation', valid, errorMessage || undefined);
}

/**
 * Handles item selection
 */
function selectItem(item: BSelectItemType<T>, index: number): void {
  if (props.disabled) return;
  
  // Check if item is disabled
  if (isObject(item) && (item as BSelectItem<T>).disabled) {
    return;
  }
  
  setModel(getValue(item), { index });
  selectedIndex.value = index;
  setExpandedModel(false, { source: "value-selected" });
  
  // Trigger validation
  validateSelection();
}

/**
 * Handles keyboard events for the select
 */
function onKeyUp(e: KeyboardEvent) {
  const config = accessibilityConfig.value.keyboard;
  
  if (!expandedModel.value) {
    // Open dropdown on Enter, Space, or Arrow keys
    const openKeys = [];
    if (config?.openOnEnterSpace) {
      openKeys.push('Enter', ' ');
    }
    if (config?.enableArrowKeys) {
      openKeys.push('ArrowDown', 'ArrowUp');
    }
    
    if (openKeys.includes(e.key)) {
      e.preventDefault();
      setExpandedModel(true, { source: "keyboard" });
      return;
    }
    
    // Handle type-ahead when closed
    if (config?.enableTypeAhead && e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
      e.preventDefault();
      
      // Find and select matching item
      const matchingIndex = navigableItems.value.findIndex(item => {
        const label = getLabel(item);
        const searchLabel = accessibilityConfig.value.typeAhead?.caseSensitive ? label : label.toLowerCase();
        const char = accessibilityConfig.value.typeAhead?.caseSensitive ? e.key : e.key.toLowerCase();
        
        return accessibilityConfig.value.typeAhead?.matchFromStart 
          ? searchLabel.startsWith(char)
          : searchLabel.includes(char);
      });
      
      if (matchingIndex >= 0) {
        const item = navigableItems.value[matchingIndex];
        const actualIndex = props.items.findIndex(i => getValue(i) === getValue(item));
        selectItem(item, actualIndex);
      }
      return;
    }
  }
  
  // Handle keyboard navigation when expanded
  const handled = handleSelectKeydown(e);
  
  if (handled) {
    // Emit option focus event
    if (keyboardActiveIndex.value >= 0) {
      const activeItem = navigableItems.value[keyboardActiveIndex.value];
      if (activeItem) {
        emit('option-focus', activeItem, keyboardActiveIndex.value);
      }
    }
  }
}

/**
 * Handles option mouse enter events
 */
function onOptionMouseEnter(item: BSelectItemType<T>, index: number): void {
  if (!isKeyboardNavigating.value) {
    const actualIndex = navigableItems.value.findIndex(i => getValue(i) === getValue(item));
    focusedOptionIndex.value = actualIndex;
    keyboardActiveIndex.value = actualIndex;
    updateActiveDescendant();
  }
  emit('option-focus', item, index);
}

/**
 * Handles option mouse leave events
 */
function onOptionMouseLeave(item: BSelectItemType<T>, index: number): void {
  if (!isKeyboardNavigating.value) {
    focusedOptionIndex.value = -1;
  }
  emit('option-blur', item, index);
}

/**
 * Focus management methods for expose API
 */
function focus(): void {
  nextTick(() => {
    selectTrigger.value?.focus();
  });
}

function blur(): void {
  selectTrigger.value?.blur();
}

function open(): void {
  if (!props.disabled) {
    setExpandedModel(true, { source: "api" });
  }
}

function close(): void {
  setExpandedModel(false, { source: "api" });
}

function selectOptionByIndex(index: number): void {
  const item = navigableItems.value[index];
  if (item) {
    const actualIndex = props.items.findIndex(i => getValue(i) === getValue(item));
    selectItem(item, actualIndex);
  }
}

function focusOption(index: number): void {
  keyboardActiveIndex.value = index;
  focusedOptionIndex.value = index;
  updateActiveDescendant();
  
  if (navigableItems.value[index]) {
    emit('option-focus', navigableItems.value[index], index);
  }
}

function clearSelection(): void {
  setModel(undefined as T, { index: -1 });
  selectedIndex.value = null;
  validateSelection();
}

function announce(message: string, politeness: 'polite' | 'assertive' = 'polite'): void {
  if (politeness === 'assertive') {
    screenReader.announceAssertively(message);
  } else {
    screenReader.announcePolitely(message);
  }
}

function getAccessibilityState() {
  return {
    isOpen: expandedModel.value,
    selectedIndex: selectedOptionIndex.value,
    selectedValue: model.value,
    optionCount: optionCount.value,
    focusedIndex: focusedOptionIndex.value,
    searchTerm: searchText.value,
  };
}

// Expose methods for parent components
defineExpose({
  focus,
  blur,
  open,
  close,
  selectOption: selectOptionByIndex,
  focusOption,
  clearSelection,
  validate: validateSelection,
  announce,
  getAccessibilityState,
});

// Mount lifecycle
onMounted(() => {
  if (props.autofocus) {
    focus();
  }
  
  // Initial validation
  validateSelection();
});

/**
 * Filters items based on search text
 */
function searchItem(search: string): BSelectItemType<T>[] {
  if (!search || !props.searchable) {
    return props.items;
  }
  
  const filtered = props.items.filter((item: BSelectItemType<T>) => {
    const label = getLabel(item).toLowerCase();
    return label.includes(search.toLowerCase());
  });
  
  // Announce no results if search returns empty
  if (search && filtered.length === 0 && accessibilityConfig.value.screenReader?.announceFilteredResults) {
    const customAnnouncement = accessibilityConfig.value.screenReader.customAnnouncements?.noResults;
    let announcement: string;
    
    if (customAnnouncement) {
      if (typeof customAnnouncement === 'function') {
        announcement = customAnnouncement(search);
      } else {
        announcement = customAnnouncement.replace('{search}', search);
      }
    } else {
      announcement = `No options found matching '${search}'`;
    }
    
    screenReader.announcePolitely(announcement);
  }
  
  return filtered;
}

/**
 * Handles expanded state changes
 */
function changeExpanded(value: boolean, extra: BSelectExpandedExtra): void {
  if (props.searchable && extra?.source === "click") {
    setExpandedModel(true, extra);
  } else {
    setExpandedModel(value, extra);
  }
}
// Watch for items changes to update keyboard navigation
watch(
  () => props.items,
  () => {
    // Reset keyboard navigation when items change
    keyboardActiveIndex.value = -1;
    focusedOptionIndex.value = -1;
    updateActiveDescendant();
  }
);

// Watch for disabled state changes
watch(
  () => props.disabled,
  (newDisabled) => {
    if (newDisabled && expandedModel.value) {
      setExpandedModel(false, { source: "disabled" });
    }
  }
);
</script>

<template>
  <BSelectContainer
    ref="selectContainer"
    v-model="expandedModel"
    :label-value="labelValue"
    :absolute="absolute"
    class="b-select"
    :disabled="disabled"
    :required="required"
    :is-error="isError"
    :error-message="errorMessage"
    :info-message="infoMessage"
    :secondary="secondary"
    :id="selectId"
    v-bind="comboboxAriaAttrs"
    @keyup="onKeyUp"
    @update:model-value="changeExpanded"
  >
    <SelectContent
      v-model="searchText"
      v-model:expanded="expandedModel"
      :disabled="disabled"
      :icon="icon"
      :secondary="secondary"
      :items="items"
      :searchable="searchable"
      @update:expanded="changeExpanded"
    >
      <template #searchText v-if="$slots.searchText">
        <slot name="searchText" />
      </template>
      <template #status>
        <slot
          name="status"
          :item="model"
          v-if="model && ((!expandedModel && searchable) || !searchable)"
        >
          {{ getLabel(model) }}
        </slot>
        <slot v-else-if="(!expandedModel && searchable) || !searchable" />
      </template>
    </SelectContent>

      <template #items>
        <div
          :id="listboxId"
          v-bind="listboxAriaAttrs"
          class="select-options"
          :style="{ maxHeight: maxHeight }"
        >
          <!-- Loading state in dropdown -->
          <div v-if="loading" class="option-loading flex items-center justify-center p-md">
            <BSpinner class="w-5 h-5 mr-sm" />
            <span>{{ accessibilityConfig.loading?.loadingMessage || 'Loading options...' }}</span>
          </div>
          
          <!-- No options message -->
          <div 
            v-else-if="displayItems.length === 0"
            class="no-options p-md text-neutral-foreground-low text-center"
            role="status"
          >
            <slot name="no-options">
              {{ searchText ? `No options found matching "${searchText}"` : 'No options available' }}
            </slot>
          </div>
          
          <!-- Options list -->
          <template v-else>
            <!-- Virtual scrolling container -->
            <div v-if="shouldVirtualize" 
                 ref="virtualScrollContainer"
                 v-bind="virtualContainerProps"
                 :style="{ height: `${virtualContainerHeight}px`, overflow: 'auto' }"
                 role="listbox"
                 :aria-label="`${renderedItems.length} options available, use arrow keys to navigate`">
              <div v-bind="virtualWrapperProps">
                <Option
                  v-for="{ data: item, index } in renderedItems"
                  :key="`virtual-${getValue(item)}-${index}`"
                  :id="`select-option-${getValue(item)}`"
                  :aria-selected="getValue(model || '' as T) == getValue(item)"
                  :secondary="secondary"
                  :disabled="isObject(item) ? (item as BSelectItem<T>).disabled : false"
                  :selected="getValue(model || '' as T) == getValue(item)"
                  :style="{ height: `${optionHeight}px` }"
                  :class="{ 
                    'keyboard-active': keyboardActiveIndex === index,
                    'mouse-focused': focusedOptionIndex === index
                  }"
                  @click="selectItem(item, props.items.findIndex(originalItem => getValue(originalItem) === getValue(item)))"
                  @keyup.enter="selectItem(item, props.items.findIndex(originalItem => getValue(originalItem) === getValue(item)))"
                  @keyup.space="selectItem(item, props.items.findIndex(originalItem => getValue(originalItem) === getValue(item)))"
                  @mouseenter="onOptionMouseEnter(item, index)"
                  @mouseleave="onOptionMouseLeave(item, index)">
                  <slot 
                    name="item" 
                    :item="item" 
                    :index="index" 
                    :selected="getValue(model || '' as T) == getValue(item)"
                    :focused="focusedOptionIndex === index">
                    {{ getLabel(item) }}
                  </slot>
                </Option>
              </div>
            </div>
            <!-- Regular non-virtual scrolling -->
            <template v-else>
              <Option
                v-for="(item, index) in displayItems"
                :key="`${getValue(item)}-${index}`"
                :id="`select-option-${getValue(item)}`"
                :aria-selected="getValue(model || '' as T) == getValue(item)"
                :secondary="secondary"
                :disabled="isObject(item) ? (item as BSelectItem<T>).disabled : false"
                :selected="getValue(model || '' as T) == getValue(item)"
                :class="{ 
                  'keyboard-active': keyboardActiveIndex === navigableItems.findIndex(navItem => getValue(navItem) === getValue(item)),
                  'mouse-focused': focusedOptionIndex === navigableItems.findIndex(navItem => getValue(navItem) === getValue(item))
                }"
                @click="selectItem(item, props.items.findIndex(originalItem => getValue(originalItem) === getValue(item)))"
                @keyup.enter="selectItem(item, props.items.findIndex(originalItem => getValue(originalItem) === getValue(item)))"
                @keyup.space="selectItem(item, props.items.findIndex(originalItem => getValue(originalItem) === getValue(item)))"
                @mouseenter="onOptionMouseEnter(item, index)"
                @mouseleave="onOptionMouseLeave(item, index)"
              >
                <slot 
                  name="item" 
                  :item="item" 
                  :index="index" 
                  :selected="getValue(model || '' as T) == getValue(item)"
                  :focused="focusedOptionIndex === navigableItems.findIndex(navItem => getValue(navItem) === getValue(item))"
                >
                  {{ getLabel(item) }}
                </slot>
              </Option>
            </template>
          </template>
        </div>
      </template>

      <template v-if="$slots.actions" #actions>
        <slot name="actions" :close="() => setExpandedModel(false, { source: 'actions' })" />
      </template>
    </BSelectContainer>
</template>

<style scoped>
@import "../../assets/main.css";

.b-select-wrapper {
  position: relative;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.select-options {
  overflow-y: auto;
}

.option-loading {
  @apply text-neutral-foreground-default;
}

.no-options {
  @apply text-sm italic;
}

.keyboard-active {
  @apply bg-primary-background-default ring-2 ring-primary-interaction-default;
}

.mouse-focused {
  @apply bg-neutral-background-low;
}

/* Focus indicators for keyboard navigation */
.keyboard-active:focus-visible,
.keyboard-active:focus {
  @apply outline-none ring-2 ring-primary-interaction-default ring-offset-2;
}

/* Ensure proper color contrast for disabled items */
.option-container.disabled {
  @apply text-neutral-foreground-low cursor-not-allowed;
}

.option-container.disabled:hover {
  @apply bg-transparent;
}

/* Loading spinner styling */
.option-loading .b-spinner {
  @apply text-primary-interaction-default;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .keyboard-active {
    @apply border-2 border-solid border-current;
  }
  
  .option-container.selected {
    @apply font-bold;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .option-container {
    transition: none;
  }
  
  .select-options {
    scroll-behavior: auto;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .keyboard-active {
    @apply bg-primary-background-low;
  }
  
  .mouse-focused {
    @apply bg-neutral-background-default;
  }
}
</style>
