<script setup lang="ts" generic="T = unknown">
import { computed, ref, shallowRef, shallowReactive, markRaw, watch, nextTick, onMounted, onUnmounted } from "vue";
import { useOptionalModel, useAriaAttributes, useScreenReader, useKeyboardNavigation } from "#composables";
import Option from "@/utils/components/Option.vue";
import { isObject, createDebounce } from "../../utils";
import type {
  AutoCompleteLoadingState
} from './BAutoComplete.types';

// Export interface directly from the component
export interface BAutoCompleteItem<TValue = unknown> {
  [key: string]: unknown;
  disabled?: boolean;
}

export type BAutoCompleteItemType<TValue = unknown> = BAutoCompleteItem<TValue> | TValue;

const props = withDefaults(
  defineProps<{
    /** Current input value */
    modelValue?: T | T[];
    /** Whether the autocomplete dropdown is expanded */
    expanded?: boolean;
    /** Label for the autocomplete field */
    labelValue?: string;
    /** Array of autocomplete items */
    items?: BAutoCompleteItemType<T>[];
    /** Key to use for labels when items are objects */
    labelKey?: string;
    /** Key to use for values when items are objects */
    valueKey?: string;
    /** Whether to use absolute positioning */
    absolute?: boolean;
    /** Whether the field is disabled */
    disabled?: boolean;
    /** Whether to show error state */
    isError?: boolean;
    /** Error message to display */
    errorMessage?: string;
    /** Info message to display */
    infoMessage?: string;
    /** Whether the field is required */
    required?: boolean;
    /** Placeholder text for the input */
    placeholder?: string;
    /** Maximum height for the dropdown */
    maxHeight?: string;
    /** Minimum width for the component */
    minWidth?: string;
    /** Whether to show clear button */
    clearable?: boolean;
    /** Custom clear button ARIA label */
    clearButtonLabel?: string;
    /** Current loading state */
    loadingState?: AutoCompleteLoadingState;
    /** Whether to announce result counts */
    announceResultCount?: boolean;
    /** Custom no results message */
    noResultsMessage?: string;
    /** Whether to loop keyboard navigation */
    keyboardLoop?: boolean;
    /** Whether to auto-select first item */
    autoSelectFirst?: boolean;
    /** Custom ARIA label for combobox */
    comboboxAriaLabel?: string;
    /** Whether to use multi-select */
    multiSelect?: boolean;
    /** Maximum selections for multi-select */
    maxSelections?: number;
    /** Whether search is case sensitive */
    caseSensitive?: boolean;
    /** Custom filter function */
    filterFn?: (item: BAutoCompleteItemType<T>, query: string) => boolean;
    /** Debounce delay for search functionality in milliseconds */
    debounceDelay?: number;
  }>(),
  {
    modelValue: undefined,
    expanded: false,
    labelValue: "",
    labelKey: "label",
    valueKey: "value",
    absolute: true,
    disabled: false,
    isError: false,
    errorMessage: "",
    infoMessage: "",
    required: false,
    placeholder: "",
    maxHeight: "40px",
    minWidth: "15em",
    clearable: false,
    clearButtonLabel: "Clear selection",
    loadingState: "idle",
    announceResultCount: true,
    noResultsMessage: "No results found",
    keyboardLoop: true,
    autoSelectFirst: false,
    comboboxAriaLabel: "",
    multiSelect: false,
    maxSelections: 0,
    caseSensitive: false,
    filterFn: undefined,
    debounceDelay: 300,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: T | T[], extra?: { index: number; item: BAutoCompleteItemType<T> }];
  "update:expanded": [expanded: boolean];
  "update:loadingState": [state: AutoCompleteLoadingState];
  "search": [query: string];
  "select": [item: BAutoCompleteItemType<T>, index: number];
  "deselect": [item: BAutoCompleteItemType<T>, index: number];
  "clear": [];
  "focus": [event: FocusEvent];
  "blur": [event: FocusEvent];
  "accessibility": [event: { type: string; message: string; data?: any }];
}>();

const [model] = useOptionalModel<T | T[]>(props, "modelValue", emit, props.multiSelect ? [] as T[] : undefined as T);
const [isExpanded] = useOptionalModel<boolean>(props, "expanded", emit, false);

// Internal state
const searchQuery = ref<string>("");
const lastAnnouncedCount = ref<number>(-1);
const inputRef = ref<HTMLElement>();
const listboxRef = ref<HTMLElement>();

// Debounced search handling
const debouncedSearchEmit = createDebounce((query: string) => {
  emit('search', query);
}, props.debounceDelay);

// Accessibility setup
const { 
  useAriaId, 
  useComboboxAria, 
  useListboxAria, 
  useOptionAria,
  useBusyAria 
} = useAriaAttributes();

const screenReader = useScreenReader();
const { liveRegion, updateLiveRegion } = screenReader.useLiveRegion('polite');

// Generate unique IDs
const autocompleteId = useAriaId('autocomplete');
const listboxId = useAriaId('autocomplete-listbox');
const liveRegionId = useAriaId('autocomplete-live');
const activeDescendantId = ref<string>('');

// Computed values
const currentSearchValue = computed(() => {
  if (props.multiSelect) {
    return searchQuery.value;
  }
  if (Array.isArray(model.value)) {
    return searchQuery.value;
  }
  return searchQuery.value || getLabel(model.value as T);
});

const selectedValues = computed(() => {
  if (!props.multiSelect) {
    return model.value ? [model.value as T] : [];
  }
  return Array.isArray(model.value) ? model.value : [];
});

// Filter items for keyboard navigation (exclude disabled items) - optimized for large datasets
const navigableItems = computed(() => 
  filteredItems.value.filter(item => !getItemDisabled(item))
);

// Keyboard navigation setup
const keyboardNavigation = useKeyboardNavigation(
  navigableItems,
  (item, index) => selectItem(item, getOriginalIndex(item)),
  {
    loop: props.keyboardLoop,
    horizontal: false,
  }
);

// ARIA attributes
const comboboxAriaAttrs = useComboboxAria(
  isExpanded,
  true,
  listboxId,
  activeDescendantId
);

const listboxAriaAttrs = useListboxAria(props.multiSelect, 'vertical');

const busyAriaAttrs = useBusyAria(
  computed(() => props.loadingState === 'loading'),
  'Loading search results'
);

/**
 * Gets the display label for an item
 */
function getLabel(item: BAutoCompleteItemType<T>): string {
  if (item === null || item === undefined) return '';
  return isObject(item) ? String((item as any)[props.labelKey] || '') : String(item);
}

/**
 * Gets the value from an item
 */
function getValue(item: BAutoCompleteItemType<T>): T {
  if (item === null || item === undefined) return item as T;
  return isObject(item) ? (item as any)[props.valueKey] as T : item as T;
}

/**
 * Gets whether an item is disabled
 */
function getItemDisabled(item: BAutoCompleteItemType<T>): boolean {
  if (!isObject(item)) return false;
  return Boolean((item as any).disabled);
}

/**
 * Gets the original index of an item in the full items array
 */
function getOriginalIndex(item: BAutoCompleteItemType<T>): number {
  return props.items?.indexOf(item) ?? -1;
}

/**
 * Checks if an item is selected
 */
function isItemSelected(item: BAutoCompleteItemType<T>): boolean {
  const itemValue = getValue(item);
  if (props.multiSelect) {
    const values = Array.isArray(model.value) ? model.value : [];
    return values.some(v => getValue({ [props.valueKey]: v } as any) === itemValue);
  }
  return getValue({ [props.valueKey]: model.value } as any) === itemValue;
}

/**
 * Custom filter function or default implementation
 */
function filterItem(item: BAutoCompleteItemType<T>, query: string): boolean {
  if (props.filterFn) {
    return props.filterFn(item, query);
  }
  
  const itemLabel = getLabel(item);
  const searchTerm = props.caseSensitive ? query : query.toLowerCase();
  const labelText = props.caseSensitive ? itemLabel : itemLabel.toLowerCase();
  
  return labelText.includes(searchTerm);
}

/**
 * Filters items based on current search query
 */
const filteredItems = computed(() => {
  if (!props.items) return [];
  if (!currentSearchValue.value) return props.items;
  
  return props.items.filter((item: BAutoCompleteItemType<T>) => 
    filterItem(item, currentSearchValue.value)
  );
});

/**
 * Announces search results count
 */
function announceSearchResults(): void {
  if (!props.announceResultCount) return;
  
  const count = filteredItems.value.length;
  if (count === lastAnnouncedCount.value) return;
  
  lastAnnouncedCount.value = count;
  
  let message: string;
  if (count === 0) {
    message = props.noResultsMessage;
  } else {
    message = `${count} ${count === 1 ? 'result' : 'results'} available`;
  }
  
  updateLiveRegion(message);
  emit('accessibility', { type: 'search-results', message, data: { count } });
}

/**
 * Announces item selection
 */
function announceSelection(item: BAutoCompleteItemType<T>, isSelected: boolean): void {
  const label = getLabel(item);
  const action = isSelected ? 'Selected' : 'Deselected';
  const message = `${action} ${label}`;
  
  screenReader.announcePolitely(message);
  emit('accessibility', { type: 'selection', message, data: { item, isSelected } });
}

/**
 * Announces loading state changes
 */
function announceLoadingState(state: AutoCompleteLoadingState): void {
  let message = '';
  
  switch (state) {
    case 'loading':
      message = 'Loading search results';
      break;
    case 'success':
      message = 'Search results loaded';
      break;
    case 'error':
      message = 'Error loading search results';
      break;
    default:
      return;
  }
  
  screenReader.announcePolitely(message);
  emit('accessibility', { type: 'loading-state', message, data: { state } });
}

/**
 * Handles focus event on the input
 */
function onFocus(event: FocusEvent): void {
  if (props.disabled) return;
  
  isExpanded.value = true;
  emit('focus', event);
  
  // Auto-select first item if configured
  if (props.autoSelectFirst && navigableItems.value.length > 0) {
    keyboardNavigation.setActiveIndex(0);
    updateActiveDescendant();
  }
}

/**
 * Handles blur event on the input
 */
function onBlur(event: FocusEvent): void {
  emit('blur', event);
  
  // Close dropdown after a delay to allow for item selection
  setTimeout(() => {
    isExpanded.value = false;
    keyboardNavigation.reset();
    activeDescendantId.value = '';
  }, 150);
}

/**
 * Handles input value changes with debounced search
 */
function handleInputChange(value: string): void {
  searchQuery.value = value;
  
  if (!props.multiSelect) {
    model.value = value as T;
  }
  
  isExpanded.value = true;
  keyboardNavigation.reset();
  
  // Emit search with debouncing for performance
  debouncedSearchEmit(value);
  
  // Announce results after a short delay
  nextTick(() => {
    setTimeout(announceSearchResults, 100);
  });
}

/**
 * Handles item selection from the dropdown
 */
function selectItem(item: BAutoCompleteItemType<T>, index: number): void {
  if (props.disabled || getItemDisabled(item)) return;
  
  const value = getValue(item);
  const wasSelected = isItemSelected(item);
  
  if (props.multiSelect) {
    handleMultiSelect(value, item, index);
  } else {
    handleSingleSelect(value, item, index);
  }
  
  // Announce selection
  announceSelection(item, !wasSelected);
  
  emit('select', item, index);
}

/**
 * Handles single selection
 */
function handleSingleSelect(value: T, item: BAutoCompleteItemType<T>, index: number): void {
  model.value = value;
  searchQuery.value = getLabel(item);
  emit("update:modelValue", value, { index, item });
  isExpanded.value = false;
  keyboardNavigation.reset();
}

/**
 * Handles multi-selection
 */
function handleMultiSelect(value: T, item: BAutoCompleteItemType<T>, index: number): void {
  const currentValues = Array.isArray(model.value) ? [...model.value] : [];
  const valueIndex = currentValues.findIndex(v => 
    getValue({ [props.valueKey]: v } as any) === value
  );
  
  if (valueIndex > -1) {
    // Deselect
    currentValues.splice(valueIndex, 1);
    emit('deselect', item, index);
  } else {
    // Select
    if (props.maxSelections > 0 && currentValues.length >= props.maxSelections) {
      screenReader.announceAssertively(`Maximum ${props.maxSelections} selections allowed`);
      return;
    }
    currentValues.push(value);
  }
  
  model.value = currentValues as T | T[];
  emit("update:modelValue", model.value, { index, item });
}

/**
 * Updates active descendant ID for screen readers
 */
function updateActiveDescendant(): void {
  const activeIndex = keyboardNavigation.activeIndex.value;
  if (activeIndex >= 0 && activeIndex < navigableItems.value.length) {
    activeDescendantId.value = `${autocompleteId}-option-${activeIndex}`;
  } else {
    activeDescendantId.value = '';
  }
}

/**
 * Handles keyboard navigation for autocomplete
 */
function handleKeydown(event: KeyboardEvent): boolean {
  if (!isExpanded.value || navigableItems.value.length === 0) {
    // Handle opening dropdown
    if (['ArrowDown', 'ArrowUp'].includes(event.key)) {
      event.preventDefault();
      isExpanded.value = true;
      
      if (navigableItems.value.length > 0) {
        keyboardNavigation.setActiveIndex(event.key === 'ArrowUp' ? navigableItems.value.length - 1 : 0);
        updateActiveDescendant();
      }
      
      return true;
    }
    return false;
  }

  const handled = keyboardNavigation.handleKeydown(event);
  
  if (handled) {
    updateActiveDescendant();
    
    // Handle special keys
    switch (event.key) {
      case 'Escape':
        isExpanded.value = false;
        activeDescendantId.value = '';
        if (!props.multiSelect) {
          searchQuery.value = getLabel(model.value as T);
        }
        break;
        
      case 'Tab':
        // Allow tab to close dropdown and move focus
        isExpanded.value = false;
        activeDescendantId.value = '';
        // Don't prevent default - allow natural tab behavior
        return false;
    }
  }
  
  return handled;
}

/**
 * Clears the selection
 */
function clearSelection(): void {
  if (props.disabled) return;
  
  if (props.multiSelect) {
    model.value = [] as T | T[];
  } else {
    model.value = undefined as T;
  }
  
  searchQuery.value = '';
  isExpanded.value = false;
  keyboardNavigation.reset();
  activeDescendantId.value = '';
  
  emit('clear');
  screenReader.announcePolitely('Selection cleared');
}

/**
 * Gets ARIA attributes for an option
 */
function getOptionAriaAttributes(item: BAutoCompleteItemType<T>, index: number): Record<string, any> {
  const isSelected = isItemSelected(item);
  const isActive = keyboardNavigation.activeIndex.value === index;
  const isDisabled = getItemDisabled(item);
  
  return {
    role: 'option',
    id: `${autocompleteId}-option-${index}`,
    'aria-selected': isSelected,
    'aria-disabled': isDisabled,
    ...(isActive && { 'aria-current': 'true' }),
  };
}

// Watch for loading state changes
watch(() => props.loadingState, (newState, oldState) => {
  if (newState !== oldState) {
    announceLoadingState(newState);
    emit('update:loadingState', newState);
  }
});

// Watch for items changes and announce results
watch(filteredItems, () => {
  if (isExpanded.value) {
    nextTick(() => {
      setTimeout(announceSearchResults, 100);
    });
  }
}, { deep: true });

// Auto-select first item when enabled
watch([isExpanded, navigableItems], ([expanded, items]) => {
  if (expanded && props.autoSelectFirst && items.length > 0 && keyboardNavigation.activeIndex.value === -1) {
    keyboardNavigation.setActiveIndex(0);
    updateActiveDescendant();
  }
});

// Initialize component
onMounted(() => {
  // Set initial search query for single select
  if (!props.multiSelect && model.value) {
    searchQuery.value = getLabel(model.value as T);
  }
});

// Cleanup debounced functions on unmount
onUnmounted(() => {
  debouncedSearchEmit.cancel();
});
</script>

<template>
  <div class="relative">
    <BSelectContainer
      v-model="isExpanded"
      :absolute="absolute"
      :label-value="labelValue"
      :disabled="disabled"
      :is-error="isError"
      :error-message="errorMessage"
      :info-message="infoMessage"
      :required="required"
      :max-height="maxHeight"
      :min-width="minWidth"
      :id="autocompleteId"
      v-bind="{ ...comboboxAriaAttrs, ...busyAriaAttrs }"
      :aria-label="comboboxAriaLabel || `${labelValue} autocomplete`"
      @keydown="handleKeydown"
    >
      <template #label>
        <div class="relative flex items-center">
          <BInput
            ref="inputRef"
            :model-value="currentSearchValue"
            @update:model-value="handleInputChange"
            :disabled="disabled"
            :is-error="isError"
            :info-message="infoMessage"
            :placeholder="placeholder"
            :min-width="minWidth"
            :icon="props.loadingState === 'loading' ? 'hourglass_empty' : 'unfold_more'"
            append-icon
            autocomplete="off"
            role="combobox"
            :aria-expanded="isExpanded"
            :aria-haspopup="'listbox'"
            :aria-controls="listboxId"
            :aria-activedescendant="activeDescendantId"
            :aria-describedby="props.infoMessage ? `${autocompleteId}-description` : undefined"
            @focus="onFocus"
            @blur="onBlur"
          />
          
          <!-- Clear button -->
          <button
            v-if="clearable && (currentSearchValue || (multiSelect && selectedValues.length > 0))"
            type="button"
            class="absolute right-8 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
            :aria-label="clearButtonLabel"
            :disabled="disabled"
            @click="clearSelection"
          >
            <span class="sr-only">{{ clearButtonLabel }}</span>
            ✕
          </button>
        </div>
      </template>

      <template #items>
        <div
          ref="listboxRef"
          :id="listboxId"
          v-bind="listboxAriaAttrs"
          class="max-h-60 overflow-auto"
        >
          <!-- Loading indicator -->
          <div
            v-if="loadingState === 'loading'"
            class="px-4 py-2 text-sm text-gray-500 flex items-center gap-2"
            role="status"
            :aria-label="'Loading search results'"
          >
            <span class="animate-spin">⟳</span>
            Loading...
          </div>
          
          <!-- No results message -->
          <div
            v-else-if="filteredItems.length === 0 && currentSearchValue"
            class="px-4 py-2 text-sm text-gray-500"
            role="status"
          >
            {{ noResultsMessage }}
          </div>
          
          <!-- Options -->
          <Option
            v-for="(item, index) in filteredItems"
            v-else
            :key="`option-${index}-${getLabel(item)}`"
            v-bind="getOptionAriaAttributes(item, index)"
            :disabled="getItemDisabled(item)"
            :class="{
              'font-bold bg-primary-50': isItemSelected(item),
              'bg-primary-100 ring-2 ring-primary-500': keyboardNavigation.activeIndex.value === index,
              'opacity-50 cursor-not-allowed': getItemDisabled(item)
            }"
            @click="selectItem(item, index)"
            @keydown.space.prevent="selectItem(item, index)"
            @keydown.enter.prevent="selectItem(item, index)"
          >
            <div class="flex items-center justify-between w-full">
              <div class="flex items-center gap-2">
                <!-- Multi-select checkbox indicator -->
                <span
                  v-if="multiSelect"
                  class="flex-shrink-0 w-4 h-4 border border-gray-300 rounded flex items-center justify-center"
                  :class="{
                    'bg-primary-500 border-primary-500 text-white': isItemSelected(item)
                  }"
                  aria-hidden="true"
                >
                  <span v-if="isItemSelected(item)" class="text-xs">✓</span>
                </span>
                
                <!-- Item content -->
                <slot name="item" :item="item" :index="index" :selected="isItemSelected(item)">
                  {{ getLabel(item) }}
                </slot>
              </div>
              
              <!-- Selection indicator for single select -->
              <span
                v-if="!multiSelect && isItemSelected(item)"
                class="text-primary-500 ml-2"
                aria-hidden="true"
              >
                ✓
              </span>
            </div>
          </Option>
        </div>
        
        <!-- Multi-select summary -->
        <div
          v-if="multiSelect && selectedValues.length > 0 && !isExpanded"
          class="px-4 py-2 text-xs text-gray-600 border-t bg-gray-50"
          role="status"
          :aria-label="`${selectedValues.length} ${selectedValues.length === 1 ? 'item' : 'items'} selected`"
        >
          {{ selectedValues.length }} {{ selectedValues.length === 1 ? 'item' : 'items' }} selected
        </div>
      </template>
    </BSelectContainer>
    
    <!-- Live region for screen reader announcements -->
    <div
      ref="liveRegion"
      :id="liveRegionId"
      class="sr-only"
      aria-live="polite"
      aria-atomic="true"
      aria-relevant="text"
    ></div>
    
    <!-- Additional description for screen readers -->
    <div
      v-if="infoMessage"
      :id="`${autocompleteId}-description`"
      class="sr-only"
    >
      {{ infoMessage }}
      {{ multiSelect ? 'Multiple selections allowed.' : 'Single selection only.' }}
      Use arrow keys to navigate options, Enter to select, Escape to close.
    </div>
  </div>
</template>

<style scoped>
@import "../../assets/main.css";

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

/* Focus ring for keyboard navigation */
.keyboard-focus {
  @apply ring-2 ring-primary-500 ring-offset-1;
}

/* Loading animation */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .bg-primary-50 {
    background-color: highlight;
    color: highlighttext;
  }
  
  .bg-primary-100 {
    outline: 2px solid highlighttext;
  }
  
  .ring-primary-500,
  .ring-2 {
    outline: 2px solid highlight;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .animate-spin {
    animation: none;
  }
  
  * {
    transition: none !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
</style>