<script setup lang="ts">
import { ref, watch, computed, onBeforeMount, nextTick, onMounted, onUnmounted } from 'vue';
import { 
  useOptionalModel, 
  useAriaAttributes, 
  useScreenReader, 
  useKeyboardNavigation, 
  useFocusTrap 
} from '#composables';
import { type BContainerModelExtra } from '../../utils/components/BContainerModelExtra.types';
import BInput from '../BInput/BInput.vue';
import BSpinner from '../BSpinner/BSpinner.vue';
import BIcon from '../BIcon/BIcon.vue';
import BButton from '../BButton/BButton.vue';

/**
 * Smart select item with accessibility properties
 */
export interface BSmartSelectItem {
  /** The display label */
  label: string;
  /** The value */
  value: unknown;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Additional description for screen readers */
  description?: string;
  /** Group this item belongs to */
  group?: string;
  /** Icon to display */
  icon?: string;
  /** Whether item is loading (for async scenarios) */
  loading?: boolean;
  /** Custom properties */
  [key: string]: unknown;
}

/**
 * Union type for select items - can be objects or primitive values
 */
export type BSmartSelectItemType = BSmartSelectItem | string | number;

/**
 * Smart select model value type for multiple selection
 */
export type BSmartSelectMultiValue = BSmartSelectItemType[] | undefined;

/**
 * Smart select model value type for single selection
 */
export type BSmartSelectSingleValue = BSmartSelectItemType | undefined;

/**
 * Smart select model value type - can be single or multiple
 */
export type BSmartSelectModelValue = BSmartSelectSingleValue | BSmartSelectMultiValue;

/**
 * Internal item type with selection state and accessibility info
 */
interface InternalItem {
  id: string;
  label: string;
  value: unknown;
  disabled?: boolean;
  selected?: boolean;
  description?: string;
  group?: string;
  icon?: string;
  loading?: boolean;
  originalItem: BSmartSelectItemType;
  [key: string]: unknown;
}

/**
 * Internal model type - can be single item or array of items with selection state
 */
type InternalModel = InternalItem | InternalItem[] | null;

/**
 * Loading state for async operations
 */
export interface LoadingState {
  loading: boolean;
  message?: string;
}

/**
 * Validation state
 */
export type ValidationState = 'success' | 'error' | 'warning' | undefined;

type BSelectExpandedExtra = {
    source: 'click' | 'value-selected' | 'keyboard' | 'search' | 'focus' | 'blur';
};

export interface BSmartSelectProps {
    /** The current selected value(s) */
    modelValue?: BSmartSelectModelValue;
    /** Label text to display */
    labelValue?: string;
    /** Array of items to select from */
    items: BSmartSelectItemType[];
    /** Icon to display */
    icon?: string;
    /** Whether the dropdown is expanded */
    expanded?: boolean;
    /** Key to use for item value when items are objects */
    valueKey?: string;
    /** Key to use for item label when items are objects */
    labelKey?: string;
    /** Whether search is enabled */
    searchable?: boolean;
    /** Whether the component is disabled */
    disabled?: boolean;
    /** Whether the component is required */
    required?: boolean;
    /** Validation state */
    validationState?: ValidationState;
    /** Whether multiple selection is enabled */
    isMultiple?: boolean;
    /** Whether to return the full object or just the value */
    getObject?: boolean;
    /** Error message to display */
    errorMessage?: string;
    /** Info message to display */
    infoMessage?: string;
    /** Success message to display */
    successMessage?: string;
    /** Warning message to display */
    warningMessage?: string;
    /** Help text for accessibility */
    helpText?: string;
    /** Placeholder text */
    placeholder?: string;
    /** Whether to use absolute positioning */
    absolute?: boolean;
    /** Whether the component is clearable */
    clearable?: boolean;
    /** Loading state for async operations */
    loading?: boolean | LoadingState;
    /** Maximum number of items to show before virtualization */
    maxDisplayItems?: number;
    /** Whether to allow custom values (tags) */
    allowCustom?: boolean;
    /** Filter function for custom search logic */
    filterFunction?: (items: InternalItem[], searchTerm: string) => InternalItem[];
    /** Async function to load items */
    loadItems?: (searchTerm: string) => Promise<BSmartSelectItemType[]>;
    /** Debounce delay for async search */
    debounceDelay?: number;
    /** ARIA label for the combobox */
    ariaLabel?: string;
    /** ARIA described by IDs */
    ariaDescribedBy?: string;
    /** Whether to announce selection changes */
    announceSelections?: boolean;
    /** Custom autocomplete behavior */
    autoComplete?: 'none' | 'list' | 'inline' | 'both';
    /** Whether to show option count in live region */
    announceCount?: boolean;
    /** Custom role for accessibility (defaults to combobox) */
    role?: 'combobox' | 'textbox';
    /** Whether the combobox supports autocomplete */
    autoCompleteList?: boolean;
}

const props = withDefaults(defineProps<BSmartSelectProps>(), {
    modelValue: undefined,
    labelValue: '',
    expanded: undefined,
    valueKey: 'value',
    labelKey: 'label',
    searchable: true,
    disabled: false,
    required: false,
    validationState: undefined,
    isMultiple: false,
    getObject: false,
    errorMessage: '',
    infoMessage: '',
    successMessage: '',
    warningMessage: '',
    helpText: '',
    placeholder: '',
    absolute: false,
    clearable: false,
    loading: false,
    maxDisplayItems: 100,
    allowCustom: false,
    debounceDelay: 300,
    ariaLabel: '',
    ariaDescribedBy: '',
    announceSelections: true,
    autoComplete: 'list',
    announceCount: true,
    role: 'combobox',
    autoCompleteList: true,
});

const emit = defineEmits<{
    'update:modelValue': [value: BSmartSelectModelValue]
    'update:expanded': [value: boolean, extra: BSelectExpandedExtra]
    'search': [searchTerm: string]
    'select': [item: InternalItem, isSelected: boolean]
    'clear': []
    'loadMore': [searchTerm: string]
}>();

// Core refs and composables
const inputRef = ref<HTMLInputElement | null>(null);
const listboxRef = ref<HTMLElement | null>(null);
const containerRef = ref<HTMLElement | null>(null);
const model = ref<InternalModel>(null);
const [expandedModel, setExpandedModel] = useOptionalModel<boolean>(props, 'expanded', emit, false);
const searchTerm = ref('');
const isLoading = ref(false);
const loadedItems = ref<InternalItem[]>([]);
const debounceTimeout = ref<number | null>(null);
const focusedIndex = ref(-1);

// Accessibility composables
const { 
    useAriaId, 
    useComboboxAria, 
    useListboxAria, 
    useOptionAria,
    useBusyAria 
} = useAriaAttributes();
const { announce, announcePolitely } = useScreenReader();
const focusTrap = useFocusTrap(containerRef, expandedModel);

// Generate unique IDs for ARIA relationships
const comboboxId = useAriaId('combobox');
const listboxId = useAriaId('listbox');
const descriptionId = useAriaId('description');
const errorId = useAriaId('error');
const helpId = useAriaId('help');

// Initialize on mount
onBeforeMount(() => {
    buildModel();
    if (props.loadItems && props.items.length === 0) {
        loadItemsAsync('');
    }
});

// Watchers
watch(() => props.modelValue, buildModel, { deep: true, immediate: true });
watch(() => props.items, buildModel, { deep: true });
watch(() => props.isMultiple, () => {
    buildModel();
    updateModel();
});
watch(searchTerm, (newTerm) => {
    if (props.loadItems) {
        debouncedLoadItems(newTerm);
    }
    emit('search', newTerm);
    if (newTerm && !expandedModel.value) {
        setExpandedModel(true, { source: 'search' });
    }
});

function updateModel() {
    const newValue = parseModel();
    emit('update:modelValue', newValue);
    
    // Announce selection changes
    if (props.announceSelections) {
        announceSelectionChange();
    }
}

function updateExpanded(value: boolean, extra: BSelectExpandedExtra) {
    setExpandedModel(value, extra);
    
    if (value) {
        nextTick(() => {
            // Focus management when opening
            if (inputRef.value) {
                inputRef.value.focus();
            }
            // Reset focus index when opening
            focusedIndex.value = props.isMultiple ? -1 : findSelectedIndex();
        });
    } else {
        // Clear search when closing
        searchTerm.value = '';
        focusedIndex.value = -1;
    }
}

function clearSelection() {
    if (!model.value) return;

    if (props.isMultiple && Array.isArray(model.value)) {
        model.value.forEach((item: InternalItem) => {
            item.selected = false
        })
    } else {
        model.value = null
    }
    
    searchTerm.value = '';
    focusedIndex.value = -1;
    updateModel();
    emit('clear');
    
    // Announce clear action
    if (props.announceSelections) {
        announcePolitely(props.isMultiple ? 'All selections cleared' : 'Selection cleared');
    }
    
    // Focus input after clear
    nextTick(() => {
        if (inputRef.value) {
            inputRef.value.focus();
        }
    });
}

function parseModel(): BSmartSelectModelValue {
    if (!model.value) return undefined;

    if (props.isMultiple && Array.isArray(model.value)) {
        return model.value.filter((item: InternalItem) => item.selected).map((item: InternalItem) => getItem(item));
    }
    return getItem(model.value as InternalItem);
}

function buildModel() {
    if (props.isMultiple) {
        const selected = (Array.isArray(props.modelValue) ? props.modelValue : []) as BSmartSelectItemType[];
        model.value = props.items.map((item: BSmartSelectItemType, index: number) => {
            const parsedItem = normalizeItem(item, index);
            parsedItem.selected = selected.findIndex((selectedItem: BSmartSelectItemType) => getItemValue(item) == getSelected(selectedItem)) > -1;
            return parsedItem;
        })
    }
    else {
        // In single mode, modelValue should not be an array
        const singleValue = Array.isArray(props.modelValue) ? props.modelValue[0] : props.modelValue;
        const foundItem = props.items.find((item: BSmartSelectItemType) => getItemValue(item) == getSelected(singleValue));
        if (foundItem) {
            const foundIndex = props.items.findIndex(item => item === foundItem);
            model.value = normalizeItem(foundItem, foundIndex);
        } else {
            model.value = null;
        }
    }
}

/**
 * Gets the value to emit from an internal item
 */
function getItem(item: InternalItem): BSmartSelectItemType {
    if (!props.getObject) {
        return item.value as BSmartSelectItemType;
    }
    return item.originalItem;
}

/**
 * Gets the comparison value from a selected item
 */
function getSelected(item: BSmartSelectItemType | undefined): unknown {
    if (!props.getObject) {
        return item;
    }
    return getItemValue(item);
}

/**
 * Gets the value from an item using the valueKey
 */
function getItemValue(item: BSmartSelectItemType | InternalItem | undefined): unknown {
    if (!item) return item;
    
    if (typeof item === 'string' || typeof item === 'number') {
        return item;
    }
    
    if (typeof item === 'object' && item !== null) {
        if ('value' in item && item.value !== undefined) {
            return item.value;
        }
        return (item as any)[props.valueKey] || item;
    }
    
    return item;
}

// New accessibility and filtering functions
function normalizeItem(item: BSmartSelectItemType, index: number): InternalItem {
    if (typeof item === 'string' || typeof item === 'number') {
        const stringValue = String(item);
        return {
            id: `item-${index}`,
            label: stringValue,
            value: item,
            originalItem: item,
            disabled: false,
            selected: false
        };
    }
    
    const objItem = item as BSmartSelectItem;
    const label = String(objItem[props.labelKey as keyof BSmartSelectItem] || objItem.label || objItem.value || 'Unknown');
    const value = objItem[props.valueKey as keyof BSmartSelectItem] || objItem.value;
    
    return {
        id: `item-${index}`,
        label,
        value,
        originalItem: item,
        disabled: objItem.disabled || false,
        selected: false,
        description: objItem.description,
        group: objItem.group,
        icon: objItem.icon,
        loading: objItem.loading || false
    };
}

function getFilteredItems(): InternalItem[] {
    let items = props.loadItems ? loadedItems.value : allInternalItems.value;
    
    if (!searchTerm.value) {
        return items.slice(0, props.maxDisplayItems);
    }
    
    const filtered = props.filterFunction 
        ? props.filterFunction(items, searchTerm.value)
        : defaultFilter(items, searchTerm.value);
    
    return filtered.slice(0, props.maxDisplayItems);
}

function defaultFilter(items: InternalItem[], term: string): InternalItem[] {
    const lowerTerm = term.toLowerCase();
    return items.filter(item => 
        item.label.toLowerCase().includes(lowerTerm) ||
        (item.description && item.description.toLowerCase().includes(lowerTerm))
    );
}

function findSelectedIndex(): number {
    if (props.isMultiple) return -1;
    
    const filtered = filteredItems.value;
    const selectedItem = model.value as InternalItem;
    
    if (!selectedItem) return -1;
    
    return filtered.findIndex(item => 
        getItemValue(item) === getItemValue(selectedItem)
    );
}

function announceSelectionChange(): void {
    if (!props.announceSelections) return;
    
    if (props.isMultiple && Array.isArray(model.value)) {
        const selectedCount = model.value.filter(item => item.selected).length;
        const totalCount = props.loadItems ? loadedItems.value.length : props.items.length;
        
        if (selectedCount === 0) {
            announcePolitely('All selections cleared');
        } else {
            const countText = `${selectedCount} of ${totalCount} item${totalCount === 1 ? '' : 's'}`;
            announcePolitely(`${countText} selected`);
        }
    } else if (model.value) {
        const item = model.value as InternalItem;
        const position = filteredItems.value.findIndex(filterItem => filterItem.id === item.id);
        const positionText = position >= 0 ? ` (${position + 1} of ${filteredItems.value.length})` : '';
        announcePolitely(`Selected ${item.label}${positionText}`);
    } else {
        announcePolitely('Selection cleared');
    }
}

function announceFilterResults(): void {
    if (!props.announceCount) return;
    
    const filtered = filteredItems.value;
    const total = props.loadItems ? loadedItems.value.length : props.items.length;
    
    if (searchTerm.value) {
        if (filtered.length === 0) {
            announcePolitely('No options available');
        } else if (filtered.length === 1) {
            announcePolitely(`1 option available: ${filtered[0].label}`);
        } else {
            const message = total === filtered.length 
                ? `${filtered.length} options available`
                : `${filtered.length} of ${total} options available`;
            announcePolitely(message);
        }
    }
}

// Async loading functions
function debouncedLoadItems(searchTerm: string): void {
    if (debounceTimeout.value) {
        clearTimeout(debounceTimeout.value);
    }
    
    debounceTimeout.value = window.setTimeout(() => {
        loadItemsAsync(searchTerm);
    }, props.debounceDelay);
}

async function loadItemsAsync(searchTerm: string): Promise<void> {
    if (!props.loadItems) return;
    
    try {
        isLoading.value = true;
        const items = await props.loadItems(searchTerm);
        const normalizedItems = items.map((item, index) => normalizeItem(item, index));
        loadedItems.value = normalizedItems;
        
        // Update model after loading
        if (props.modelValue) {
            updateModelSelection(normalizedItems);
        }
        
        // Announce results
        if (searchTerm) {
            nextTick(() => {
                announceFilterResults();
            });
        }
        
    } catch (error) {
        console.error('Error loading items:', error);
        announcePolitely('Error loading options');
    } finally {
        isLoading.value = false;
    }
}

function updateModelSelection(items: InternalItem[]): void {
    if (props.isMultiple && Array.isArray(props.modelValue)) {
        const modelValueArray = props.modelValue as BSmartSelectItemType[];
        items.forEach(item => {
            const isSelected = modelValueArray.findIndex((selectedItem: BSmartSelectItemType) => 
                getItemValue(item.originalItem) === getSelected(selectedItem)
            ) > -1;
            item.selected = isSelected;
        });
        
        if (Array.isArray(model.value)) {
            model.value = items.filter(item => item.selected);
        }
    }
}

// Computed properties
const allInternalItems = computed(() => {
    return props.items.map((item, index) => normalizeItem(item, index));
});

const filteredItems = computed(() => {
    return getFilteredItems();
});

const selectedItems = computed(() => {
    if (!model.value) return [];
    
    if (props.isMultiple && Array.isArray(model.value)) {
        return model.value.filter(item => item.selected);
    }
    
    return model.value ? [model.value as InternalItem] : [];
});

const displayValue = computed(() => {
    const selected = selectedItems.value;
    
    if (selected.length === 0) {
        return props.placeholder || `Select ${props.isMultiple ? 'items' : 'an item'}...`;
    }
    
    if (props.isMultiple) {
        return `${selected.length} item${selected.length === 1 ? '' : 's'} selected`;
    }
    
    return selected[0].label;
});

const isError = computed(() => props.validationState === 'error');
const isSuccess = computed(() => props.validationState === 'success');
const isWarning = computed(() => props.validationState === 'warning');

const validationMessage = computed(() => {
    if (props.validationState === 'error' && props.errorMessage) {
        return props.errorMessage;
    }
    if (props.validationState === 'success' && props.successMessage) {
        return props.successMessage;
    }
    if (props.validationState === 'warning' && props.warningMessage) {
        return props.warningMessage;
    }
    return '';
});

const currentLoadingState = computed(() => {
    if (typeof props.loading === 'boolean') {
        return { loading: props.loading, message: 'Loading...' };
    }
    return props.loading || { loading: false, message: '' };
});

// ARIA attributes  
const activeDescendant = ref<string | undefined>(undefined);
const comboboxAria = useComboboxAria(
    expandedModel,
    true,
    listboxId,
    activeDescendant
);

// Enhanced ARIA attributes for input
const inputAriaAttributes = computed(() => ({
    ...comboboxAria.value,
    'aria-autocomplete': props.autoComplete,
    'aria-label': props.ariaLabel || props.labelValue || 'Select option',
    'aria-describedby': describedByIds.value,
    'aria-busy': busyState.value,
    'aria-invalid': isError.value,
    'aria-required': props.required
}));

// Update active descendant when focused index changes
watch(focusedIndex, (newIndex) => {
    activeDescendant.value = newIndex >= 0 ? `${listboxId}-option-${newIndex}` : undefined;
});

const listboxAria = useListboxAria(props.isMultiple);

const busyState = computed(() => isLoading.value || currentLoadingState.value.loading);

const describedByIds = computed(() => {
    const ids: string[] = [];
    
    if (props.helpText) ids.push(helpId);
    if (props.ariaDescribedBy) ids.push(props.ariaDescribedBy);
    if (validationMessage.value) {
        ids.push(errorId);
    }
    
    return ids.length > 0 ? ids.join(' ') : undefined;
});

// Keyboard navigation setup
const keyboardNav = useKeyboardNavigation(
    filteredItems,
    (item: InternalItem, index: number) => {
        selectItem(item);
    },
    {
        customHandlers: {
            'Enter': (event: KeyboardEvent) => {
                event.preventDefault();
                if (focusedIndex.value >= 0) {
                    const item = filteredItems.value[focusedIndex.value];
                    if (item && !item.disabled) {
                        selectItem(item);
                    }
                }
            },
            'Escape': (event: KeyboardEvent) => {
                event.preventDefault();
                if (expandedModel.value) {
                    updateExpanded(false, { source: 'keyboard' });
                }
            },
            'Backspace': (event: KeyboardEvent) => {
                if (props.isMultiple && selectedItems.value.length > 0 && searchTerm.value === '') {
                    event.preventDefault();
                    const lastSelected = selectedItems.value[selectedItems.value.length - 1];
                    selectItem(lastSelected);
                }
            },
            'Delete': (event: KeyboardEvent) => {
                if (props.isMultiple && focusedIndex.value >= 0) {
                    event.preventDefault();
                    const item = filteredItems.value[focusedIndex.value];
                    if (item && item.selected) {
                        selectItem(item);
                    }
                }
            },
            'PageDown': (event: KeyboardEvent) => {
                event.preventDefault();
                const newIndex = Math.min(focusedIndex.value + 10, filteredItems.value.length - 1);
                keyboardNav.setActiveIndex(newIndex);
                focusedIndex.value = newIndex;
            },
            'PageUp': (event: KeyboardEvent) => {
                event.preventDefault();
                const newIndex = Math.max(focusedIndex.value - 10, 0);
                keyboardNav.setActiveIndex(newIndex);
                focusedIndex.value = newIndex;
            }
        }
    }
);

// Selection logic
function selectItem(item: InternalItem): void {
    if (item.disabled) return;
    
    if (props.isMultiple && Array.isArray(model.value)) {
        const existingItem = model.value.find(modelItem => 
            getItemValue(modelItem.originalItem) === getItemValue(item.originalItem)
        );
        
        if (existingItem) {
            existingItem.selected = !existingItem.selected;
        } else {
            const newItem = { ...item, selected: true };
            model.value.push(newItem);
        }
    } else {
        model.value = { ...item, selected: true };
        updateExpanded(false, { source: 'value-selected' });
    }
    
    updateModel();
    emit('select', item, item.selected || false);
    
    // Clear search after selection
    if (!props.isMultiple) {
        searchTerm.value = '';
    }
}

function removeSelectedItem(item: InternalItem): void {
    if (props.isMultiple && Array.isArray(model.value)) {
        const index = model.value.findIndex(modelItem => 
            getItemValue(modelItem.originalItem) === getItemValue(item.originalItem)
        );
        
        if (index > -1) {
            model.value.splice(index, 1);
            updateModel();
            
            if (props.announceSelections) {
                announcePolitely(`Removed ${item.label}`);
            }
        }
    }
}

// Event handlers
function handleInputKeydown(event: KeyboardEvent): void {
    if (!expandedModel.value && ['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
        event.preventDefault();
        updateExpanded(true, { source: 'keyboard' });
        return;
    }
    
    if (expandedModel.value) {
        keyboardNav.handleKeydown(event);
        
        // Update focused index for ARIA
        if (keyboardNav.activeIndex.value !== focusedIndex.value) {
            focusedIndex.value = keyboardNav.activeIndex.value;
        }
    }
}

function handleInputFocus(): void {
    if (!expandedModel.value && props.searchable) {
        updateExpanded(true, { source: 'focus' });
    }
}

function handleInputBlur(event: FocusEvent): void {
    // Don't close if focus moved to listbox or its children
    const relatedTarget = event.relatedTarget as HTMLElement;
    if (relatedTarget && (listboxRef.value?.contains(relatedTarget) || containerRef.value?.contains(relatedTarget))) {
        return;
    }
    
    // Small delay to allow for click events
    setTimeout(() => {
        if (!containerRef.value?.contains(document.activeElement)) {
            updateExpanded(false, { source: 'blur' });
        }
    }, 150);
}

function handleOptionClick(item: InternalItem): void {
    selectItem(item);
}

function handleOptionMouseEnter(index: number): void {
    focusedIndex.value = index;
    keyboardNav.setActiveIndex(index);
}

// Watch for search term changes and announce results
watch(filteredItems, () => {
    if (searchTerm.value && expandedModel.value) {
        nextTick(() => {
            announceFilterResults();
        });
    }
}, { flush: 'post' });

// Cleanup
onUnmounted(() => {
    if (debounceTimeout.value) {
        clearTimeout(debounceTimeout.value);
    }
});

</script>

<template>
  <div 
    ref="containerRef"
    class="b-smart-select relative w-full"
    :class="{
      'b-smart-select--disabled': disabled,
      'b-smart-select--error': isError,
      'b-smart-select--success': isSuccess,
      'b-smart-select--warning': isWarning,
      'b-smart-select--loading': isLoading || currentLoadingState.loading,
      'b-smart-select--multiple': isMultiple
    }"
  >
    <!-- Label -->
    <label 
      v-if="labelValue" 
      :for="comboboxId"
      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
      :class="{
        'text-red-600 dark:text-red-400': isError,
        'text-green-600 dark:text-green-400': isSuccess,
        'text-yellow-600 dark:text-yellow-400': isWarning
      }"
    >
      <BIcon v-if="icon" :name="icon" class="inline mr-1" />
      {{ labelValue }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>

    <!-- Main input container -->
    <div class="relative">
      <!-- Selected items (multiple mode) -->
      <div 
        v-if="isMultiple && selectedItems.length > 0"
        class="flex flex-wrap gap-1 p-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 mb-2"
        :class="{
          'border-red-500 dark:border-red-400': isError,
          'border-green-500 dark:border-green-400': isSuccess,
          'border-yellow-500 dark:border-yellow-400': isWarning
        }"
      >
        <div
          v-for="item in selectedItems"
          :key="item.id"
          class="inline-flex items-center bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm"
        >
          <BIcon v-if="item.icon" :name="item.icon" class="mr-1 text-xs" />
          <span>{{ item.label }}</span>
          <button
            type="button"
            @click="removeSelectedItem(item)"
            class="ml-1 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            :aria-label="`Remove ${item.label}`"
          >
            <BIcon name="close" class="text-xs" />
          </button>
        </div>
      </div>

      <!-- Input field -->
      <div class="relative">
        <input
          :id="comboboxId"
          ref="inputRef"
          v-model="searchTerm"
          type="text"
          :disabled="disabled"
          :readonly="!searchable"
          :placeholder="displayValue"
          v-bind="inputAriaAttributes"
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          :class="{
            'border-red-500 dark:border-red-400 focus:ring-red-500 focus:border-red-500': isError,
            'border-green-500 dark:border-green-400 focus:ring-green-500 focus:border-green-500': isSuccess,
            'border-yellow-500 dark:border-yellow-400 focus:ring-yellow-500 focus:border-yellow-500': isWarning,
            'pr-20': clearable || isLoading,
            'pr-10': !clearable && !isLoading
          }"
          @keydown="handleInputKeydown"
          @focus="handleInputFocus"
          @blur="handleInputBlur"
        />

        <!-- Right side icons -->
        <div class="absolute inset-y-0 right-0 flex items-center pr-2">
          <!-- Loading spinner -->
          <BSpinner 
            v-if="isLoading || currentLoadingState.loading" 
            size="small" 
            class="mr-2"
          />
          
          <!-- Clear button -->
          <button
            v-else-if="clearable && (selectedItems.length > 0 || searchTerm)"
            type="button"
            @click="clearSelection"
            class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1 mr-1"
            :aria-label="'Clear ' + (isMultiple ? 'all selections' : 'selection')"
          >
            <BIcon name="close" class="text-sm" />
          </button>
          
          <!-- Dropdown arrow -->
          <button
            type="button"
            @click="updateExpanded(!expandedModel, { source: 'click' })"
            class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
            :aria-label="expandedModel ? 'Close options' : 'Open options'"
            :disabled="disabled"
          >
            <BIcon 
              name="expand_more" 
              class="text-lg transform transition-transform"
              :class="{ 'rotate-180': expandedModel }"
            />
          </button>
        </div>
      </div>
    </div>

    <!-- Options listbox -->
    <div
      v-if="expandedModel"
      ref="listboxRef"
      :id="listboxId"
      v-bind="listboxAria"
      class="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto"
      :class="{ 'top-auto bottom-full mb-1': absolute }"
    >
      <!-- Loading state -->
      <div 
        v-if="isLoading || currentLoadingState.loading"
        class="px-3 py-2 text-sm text-gray-500 dark:text-gray-400 flex items-center"
      >
        <BSpinner size="small" class="mr-2" />
        {{ currentLoadingState.message || 'Loading options...' }}
      </div>
      
      <!-- Empty state -->
      <div 
        v-else-if="filteredItems.length === 0"
        class="px-3 py-2 text-sm text-gray-500 dark:text-gray-400"
        role="status"
      >
        <slot name="empty-state">
          {{ searchTerm ? 'No options found' : 'No options available' }}
        </slot>
      </div>
      
      <!-- Options -->
      <template v-else>
        <div
          v-for="(item, index) in filteredItems"
          :key="item.id"
          :id="`${listboxId}-option-${index}`"
          role="option"
          :aria-selected="item.selected || false"
          :aria-disabled="item.disabled || false"
          :aria-describedby="item.description ? `${listboxId}-option-${index}-desc` : undefined"
          :aria-posinset="index + 1"
          :aria-setsize="filteredItems.length"
          class="px-3 py-2 cursor-pointer flex items-center justify-between text-sm transition-colors"
          :class="{
            'bg-blue-50 dark:bg-blue-900/50': index === focusedIndex,
            'bg-blue-100 dark:bg-blue-900': item.selected,
            'text-gray-900 dark:text-gray-100': !item.disabled,
            'text-gray-400 dark:text-gray-500 cursor-not-allowed': item.disabled,
            'hover:bg-gray-50 dark:hover:bg-gray-700': !item.disabled && index !== focusedIndex
          }"
          @click="handleOptionClick(item)"
          @mouseenter="handleOptionMouseEnter(index)"
        >
          <div class="flex items-center flex-1">
            <!-- Custom item slot -->
            <slot name="item" :item="item" :index="index" :selected="item.selected">
              <!-- Default item content -->
              <div class="flex items-center flex-1">
                <BIcon v-if="item.icon" :name="item.icon" class="mr-2 text-base" />
                <div class="flex-1">
                  <div class="font-medium">{{ item.label }}</div>
                  <div 
                    v-if="item.description" 
                    :id="`${listboxId}-option-${index}-desc`"
                    class="text-xs text-gray-500 dark:text-gray-400"
                  >
                    {{ item.description }}
                  </div>
                </div>
              </div>
            </slot>
          </div>
          
          <!-- Selection indicator -->
          <div class="ml-2 flex items-center">
            <BSpinner v-if="item.loading" size="small" />
            <BIcon 
              v-else-if="item.selected" 
              name="check" 
              class="text-blue-600 dark:text-blue-400 text-sm" 
            />
          </div>
        </div>
      </template>
    </div>

    <!-- Help text -->
    <div v-if="helpText" :id="helpId" class="mt-1 text-xs text-gray-500 dark:text-gray-400">
      {{ helpText }}
    </div>
    
    <!-- Validation message -->
    <div 
      v-if="validationMessage" 
      :id="errorId"
      class="mt-1 text-xs"
      :class="{
        'text-red-600 dark:text-red-400': isError,
        'text-green-600 dark:text-green-400': isSuccess,
        'text-yellow-600 dark:text-yellow-400': isWarning
      }"
      role="alert"
      :aria-live="isError ? 'assertive' : 'polite'"
    >
      {{ validationMessage }}
    </div>
    
    <!-- Screen reader status region -->
    <div 
      :id="`${comboboxId}-status`"
      aria-live="polite" 
      aria-atomic="true" 
      class="sr-only"
    >
      <template v-if="expandedModel && filteredItems.length > 0">
        {{ filteredItems.length }} {{ filteredItems.length === 1 ? 'option' : 'options' }} available{{ searchTerm ? ` for "${searchTerm}"` : '' }}.
        {{ focusedIndex >= 0 ? `Currently focused: ${filteredItems[focusedIndex]?.label}` : 'Use arrow keys to navigate.' }}
      </template>
      <template v-else-if="expandedModel">
        {{ searchTerm ? `No options found for "${searchTerm}"` : 'No options available' }}.
      </template>
    </div>
    
    <!-- Additional screen reader announcements -->
    <div aria-live="assertive" aria-atomic="true" class="sr-only">
      <!-- Error announcements will be made here -->
    </div>
  </div>
</template>

<style scoped>
/* Custom styles for the smart select component */
.b-smart-select {
  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .b-smart-select input {
      border-width: 2px;
    }
    
    .b-smart-select [role="option"]:focus {
      outline: 2px solid;
    }
  }
}

/* Screen reader only class */
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

/* Focus visible support for better keyboard navigation */
.b-smart-select button:focus-visible,
.b-smart-select input:focus-visible {
  outline: 2px solid;
  outline-color: currentColor;
  outline-offset: 2px;
}

/* Smooth transitions for better UX */
.b-smart-select [role="listbox"] {
  transition: opacity 0.15s ease-in-out, transform 0.15s ease-in-out;
}

.b-smart-select [role="option"] {
  transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;
}

/* Loading state styles */
.b-smart-select--loading {
  opacity: 0.8;
}

.b-smart-select--loading input {
  cursor: wait;
}
</style>