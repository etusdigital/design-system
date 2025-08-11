<script setup lang="ts">
import { computed, onBeforeMount, ref, shallowRef, shallowReactive, markRaw, useSlots, nextTick, onMounted, onUnmounted, watch } from "vue";
import { useOptionalModel, useKeyboardNavigation, useAriaAttributes, useScreenReader, useFocusTrap } from "#composables";
import { useVirtualList } from '@vueuse/core';
import Item from "./Item.vue";
import { type Item as ItemType } from "#utils/types/DropItem";
import Items from "./Items.vue";
import { isObject } from "../../utils";
import type { 
  DropdownAccessibilityConfig, 
  DropdownFocusConfig,
  WCAGLevel,
  DropdownAccessibilityMessages
} from "./BDropdown.types";

/**
 * Value type for BDropdown - can be either a string value or full item object
 */
export type BDropdownValue = string | ItemType;

const props = withDefaults(
  defineProps<{
    /** Current selected value - either string value or full item object based on getObject prop */
    modelValue?: BDropdownValue;
    /** Whether the dropdown is expanded */
    expanded?: boolean;
    /** Label for the dropdown */
    labelValue?: string;
    /** Array of dropdown items */
    items: ItemType[];
    /** Whether to use absolute positioning */
    absolute?: boolean;
    /** Whether the dropdown is disabled */
    disabled?: boolean;
    /** Whether to show error state */
    isError?: boolean;
    /** Error message to display */
    errorMessage?: string;
    /** Info message to display */
    infoMessage?: string;
    /** Whether the field is required */
    required?: boolean;
    /** Maximum height of dropdown */
    maxHeight?: string;
    /** Minimum width of dropdown */
    minWidth?: string;
    /** Whether to return the full object instead of just the value */
    getObject?: boolean;
    /** Whether search functionality is enabled */
    searchable?: boolean;
    /** Accessibility configuration */
    accessibility?: DropdownAccessibilityConfig;
    /** Focus management configuration */
    focus?: DropdownFocusConfig;
    /** WCAG compliance level to target */
    wcagLevel?: WCAGLevel;
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
    expanded: false,
    labelValue: "",
    absolute: true,
    disabled: false,
    isError: false,
    errorMessage: "",
    infoMessage: "",
    required: false,
    maxHeight: "40px",
    minWidth: "15em",
    getObject: false,
    searchable: false,
    accessibility: () => ({}),
    focus: () => ({}),
    wcagLevel: 'AA',
    virtualized: false,
    optionHeight: 40,
    virtualContainerHeight: 300,
    overscan: 5,
    virtualizationThreshold: 100,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: BDropdownValue];
  "update:expanded": [value: boolean];
}>();

const [model] = useOptionalModel<BDropdownValue>(props, "modelValue", emit, "");
const [isExpanded] = useOptionalModel<boolean>(props, "expanded", emit, false);
const search = ref("");
const slots = useSlots();
const dropdownContainer = ref<HTMLElement | null>(null);
const triggerRef = ref<HTMLElement | null>(null);
const menuRef = ref<HTMLElement | null>(null);

// Accessibility configuration with defaults - mark as raw for performance since it's static
const accessibilityConfig = computed(() => markRaw({
  pattern: 'listbox',
  announceChanges: true,
  messages: {
    opened: 'Dropdown opened',
    closed: 'Dropdown closed',
    selected: 'Selected',
    itemCount: 'items available',
    filteredCount: 'filtered items available',
    submenuExpanded: 'Submenu expanded',
    submenuCollapsed: 'Submenu collapsed',
    loading: 'Loading...',
    noResults: 'No results found',
  },
  ...props.accessibility,
} as Required<DropdownAccessibilityConfig>));

const focusConfig = computed(() => ({
  trapFocus: true,
  restoreFocus: true,
  focusFirstOnOpen: true,
  ...props.focus,
} as Required<DropdownFocusConfig>));

// Accessibility setup
const { 
  useAriaId, 
  useComboboxAria, 
  useListboxAria, 
  useMenuAria, 
  useMenuBarAria, 
  useButtonAria 
} = useAriaAttributes();
const screenReader = useScreenReader();
const focusTrap = useFocusTrap(menuRef, isExpanded);

const dropdownId = useAriaId('dropdown');
const listboxId = useAriaId('listbox');
const menuId = useAriaId('menu');
const triggerId = useAriaId('trigger');
const activeDescendantId = ref<string>('');
const isLoading = ref(false);

// Reactive state for expanded items to avoid prop mutations - use shallowRef for Set since we only care about add/delete operations
const expandedItems = shallowRef<Set<string>>(new Set());

// Flatten items for keyboard navigation
const flattenedItems = computed(() => {
  const flatten = (items: ItemType[]): ItemType[] => {
    const result: ItemType[] = [];
    for (const item of items) {
      if (!item.disabled) {
        result.push(item);
        if (item.items && expandedItems.value.has(item.value)) {
          result.push(...flatten(item.items));
        }
      }
    }
    return result;
  };
  return flatten(filteredItems.value);
});

// Auto-enable virtualization if items exceed threshold
const shouldVirtualize = computed(() => {
  return props.virtualized || (flattenedItems.value.length >= props.virtualizationThreshold);
});

// Virtual scrolling setup for large lists
const virtualScrollContainer = ref<HTMLDivElement | null>(null);
const {
  list: virtualList,
  containerProps: virtualContainerProps,
  wrapperProps: virtualWrapperProps
} = useVirtualList(
  flattenedItems,
  {
    itemHeight: props.optionHeight,
    overscan: props.overscan
  }
);

// Use virtualized list when enabled, otherwise use regular flattened items
const renderedItems = computed(() => {
  return shouldVirtualize.value ? virtualList.value : flattenedItems.value.map((data, index) => ({ data, index }));
});

// Keyboard navigation with enhanced accessibility
const { activeIndex, handleKeydown, setActiveByValue, selectActive, reset: resetNavigation } = useKeyboardNavigation(
  flattenedItems,
  (item, index) => {
    selectItem(getValue(item));
    if (accessibilityConfig.value.announceChanges) {
      const message = `${accessibilityConfig.value.messages.selected} ${item.label}, ${index + 1} of ${flattenedItems.value.length}`;
      screenReader.announcePolitely(message);
    }
  },
  {
    loop: true,
    customHandlers: {
      'Escape': (event) => {
        event.preventDefault();
        closeDropdown();
      },
      'Tab': (event) => {
        if (isExpanded.value) {
          event.preventDefault();
          closeDropdown();
        }
      },
      'ArrowRight': (event) => {
        const currentItem = flattenedItems.value[activeIndex.value];
        if (currentItem?.items?.length && !expandedItems.value.has(currentItem.value)) {
          event.preventDefault();
          expandSubmenu(currentItem);
        }
      },
      'ArrowLeft': (event) => {
        const currentItem = flattenedItems.value[activeIndex.value];
        if (expandedItems.value.has(currentItem.value)) {
          event.preventDefault();
          collapseSubmenu(currentItem);
        }
      }
    }
  }
);

// Dynamic ARIA attributes based on pattern
const ariaAttrs = computed(() => {
  const pattern = accessibilityConfig.value.pattern;
  
  if (pattern === 'menu') {
    return {
      trigger: useButtonAria(
        undefined, // not pressed
        isExpanded,
        menuId,
        props.errorMessage ? `${triggerId}-error` : undefined
      ).value,
      container: useMenuAria(
        'vertical',
        triggerId,
        accessibilityConfig.value.label
      ).value,
    };
  } else {
    return {
      trigger: useComboboxAria(
        isExpanded,
        true,
        listboxId,
        activeDescendantId
      ).value,
      container: useListboxAria(false, 'vertical').value,
    };
  }
});

const selectedItem = computed(() => {
  if (!props.items) return undefined;
  return findItem(props.items, model.value)?.label;
});
const filteredItems = computed(() => {
  if (!props.items) return [];
  else if (!search.value) return props.items;
  return filterItems(props.items, search.value);
});

onBeforeMount(() => {
  updateSearch();
});

/**
 * Recursively finds an item in the items tree by value
 */
function findItem(items: ItemType[], value: BDropdownValue): ItemType | undefined {
  for (const item of items) {
    if (item.value === getValue(value)) {
      return item;
    }
    if (item.items) {
      const found = findItem(item.items, value);
      if (found) return found;
    }
  }
  return undefined;
}

/**
 * Recursively filters items based on search value
 */
function filterItems(items: ItemType[], value: string): ItemType[] {
  const filteredItems: ItemType[] = [];
  for (const item of items) {
    let found: ItemType[] = [];

    if (item.items && item.items.length) found = filterItems(item.items, value);

    if (
      item.label.toLowerCase().includes(value.toLowerCase()) ||
      found.length
    ) {
      if (found.length) item.items = found;
      filteredItems.push(item);
    }
  }

  return filteredItems;
}

/**
 * Recursively updates selected state for all items based on current value
 */
function changeSelected(items: ItemType[], value: BDropdownValue): boolean {
  let selected = false;
  for (const item of items) {
    if (item.items && item.items.length) item.selected = changeSelected(item.items, value);
    else item.selected = item.value == getValue(value);

    if (item.selected) selected = true;
  }
  return selected;
}

/**
 * Opens dropdown with proper focus management
 */
function openDropdown(): void {
  isExpanded.value = true;
  search.value = "";
  
  nextTick(() => {
    // Focus trap is handled automatically by the composable
    // based on the isExpanded ref
    
    if (focusConfig.value.focusFirstOnOpen) {
      // Set initial focus to selected item or first item
      if (model.value) {
        const selectedIndex = flattenedItems.value.findIndex(item => getValue(item) === getValue(model.value));
        if (selectedIndex !== -1) {
          setActiveByValue(flattenedItems.value[selectedIndex]);
        }
      } else if (flattenedItems.value.length > 0) {
        setActiveByValue(flattenedItems.value[0]);
      }
    }
    
    // Announce dropdown state with virtual scrolling context
    if (accessibilityConfig.value.announceChanges) {
      const count = flattenedItems.value.length;
      let openedMessage = accessibilityConfig.value.messages?.opened || 'Dropdown opened';
      const itemCountMessage = accessibilityConfig.value.messages?.itemCount || 'items available';
      
      // Add virtual scrolling context to announcement
      if (shouldVirtualize.value) {
        openedMessage += ' with virtual scrolling for better performance';
      }
      
      const message = `${openedMessage}, ${count} ${itemCountMessage}`;
      screenReader.announcePolitely(message);
    }
  });
}

/**
 * Closes dropdown with proper focus management
 */
function closeDropdown(): void {
  isExpanded.value = false;
  
  // Focus trap deactivation is handled automatically
  
  if (focusConfig.value.restoreFocus && triggerRef.value) {
    triggerRef.value.focus();
  }
  
  resetNavigation();
  updateSearch();
  
  // Announce dropdown state
  if (accessibilityConfig.value.announceChanges) {
    const closedMessage = accessibilityConfig.value.messages?.closed || 'Dropdown closed';
    screenReader.announcePolitely(closedMessage);
  }
}

/**
 * Expands a submenu item
 */
function expandSubmenu(item: ItemType): void {
  // For shallowRef Set, create a new Set to trigger reactivity
  const newSet = new Set(expandedItems.value);
  newSet.add(item.value);
  expandedItems.value = newSet;
  
  if (accessibilityConfig.value.announceChanges) {
    screenReader.announcePolitely(`${item.label} ${accessibilityConfig.value.messages.submenuExpanded}`);
  }
}

/**
 * Collapses a submenu item
 */
function collapseSubmenu(item: ItemType): void {
  // For shallowRef Set, create a new Set to trigger reactivity
  const newSet = new Set(expandedItems.value);
  newSet.delete(item.value);
  expandedItems.value = newSet;
  
  if (accessibilityConfig.value.announceChanges) {
    screenReader.announcePolitely(`${item.label} ${accessibilityConfig.value.messages.submenuCollapsed}`);
  }
}

/**
 * Handles item selection with enhanced accessibility
 */
function selectItem(value: BDropdownValue): void {
  model.value = value;
  changeSelected(props.items, value);
  
  // Update keyboard navigation to reflect selection
  const selectedIndex = flattenedItems.value.findIndex(item => getValue(item) === getValue(value));
  if (selectedIndex !== -1) {
    setActiveByValue(flattenedItems.value[selectedIndex]);
  }
  
  closeDropdown();
}

/**
 * Handles input focus event
 */
function onFocus(): void {
  openDropdown();
}

/**
 * Handles keyboard events for the dropdown with comprehensive WCAG support
 */
function onKeydown(event: KeyboardEvent): void {
  // Prevent action when disabled
  if (props.disabled) {
    return;
  }
  
  if (!isExpanded.value) {
    // Open dropdown on Enter, Space, or Arrow keys
    if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(event.key)) {
      event.preventDefault();
      openDropdown();
    }
    return;
  }
  
  // Handle keyboard navigation when expanded
  const handled = handleKeydown(event);
  
  // Update active descendant for screen readers
  if (handled && activeIndex.value >= 0) {
    const activeItem = flattenedItems.value[activeIndex.value];
    if (activeItem) {
      activeDescendantId.value = `dropdown-item-${activeItem.value}`;
    }
  }
}

/**
 * Updates search field with current selection
 */
function updateSearch(): void {
  setTimeout(() => {
    if (!isExpanded.value && !slots.default && props.searchable)
      search.value = selectedItem.value || "";
  });
}

/**
 * Gets the string value from either a string or item object
 */
function getValue(item: BDropdownValue): string {
  return isObject(item) ? (item as ItemType).value : String(item);
}

/**
 * Handles click outside to close dropdown
 */
function handleClickOutside(event: Event): void {
  if (dropdownContainer.value && !dropdownContainer.value.contains(event.target as Node)) {
    closeDropdown();
  }
}

// Mount/unmount lifecycle for click outside handling
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

// Watch for search changes to announce filtered results
const filteredCount = computed(() => {
  if (props.searchable && search.value && filteredItems.value.length !== props.items.length) {
    return filteredItems.value.length;
  }
  return null;
});

// Announce filtered results
watch(filteredCount, (newCount) => {
  if (newCount !== null && accessibilityConfig.value.announceChanges) {
    const message = `${newCount} ${accessibilityConfig.value.messages.filteredCount}`;
    screenReader.announcePolitely(message);
  }
});
</script>

<style scoped>
.dropdown-trigger {
  @apply flex items-center justify-between;
  min-height: 2.5rem;
}

.keyboard-active {
  @apply outline-none ring-2 ring-primary-stroke-default;
}

.focus-visible {
  @apply outline-none ring-2 ring-primary-stroke-default;
}

.sr-only {
  @apply absolute w-1 h-1 p-0 -m-1 overflow-hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>

<template>
  <BExpandableContainer
    ref="dropdownContainer"
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
    :id="dropdownId"
    v-bind="ariaAttrs.trigger"
    @update:model-value="updateSearch"
    @keydown="onKeydown"
  >
    {{ selectedItem }}
    <template #label>
      <slot>
        <div 
          ref="triggerRef"
          :id="triggerId"
          tabindex="0"
          @focus="onFocus"
          @keydown="onKeydown"
        >
          <BInput
            v-if="props.searchable"
            v-model="search"
            :disabled="disabled"
            :is-error="isError"
            icon="unfold_more"
            append-icon
            :aria-label="accessibilityConfig.label || 'Search dropdown items'"
            :aria-describedby="props.errorMessage ? `${triggerId}-error` : undefined"
            @focus="onFocus"
          />
          <div 
            v-else
            class="dropdown-trigger px-base py-sm cursor-pointer border border-neutral-stroke-default rounded-base bg-neutral-surface-default"
            :class="{
              'opacity-50 cursor-not-allowed': disabled,
              'border-danger-stroke-default': isError
            }"
            :aria-label="selectedItem || 'Select an option'"
          >
            {{ selectedItem || 'Select an option' }}
            <BIcon name="unfold_more" class="ml-auto" />
          </div>
        </div>
      </slot>
    </template>
    
    <template #card>
      <!-- Loading state -->
      <div 
        v-if="isLoading"
        class="px-base py-sm text-center"
        role="status"
        :aria-label="accessibilityConfig.messages.loading"
      >
        <BSpinner class="mr-xs" />
        {{ accessibilityConfig.messages.loading }}
      </div>
      
      <!-- No results state -->
      <div 
        v-else-if="filteredItems.length === 0"
        class="px-base py-sm text-center text-neutral-interaction-disabled"
        role="status"
        :aria-label="accessibilityConfig.messages.noResults"
      >
        {{ accessibilityConfig.messages.noResults }}
      </div>
      
      <!-- Menu/Listbox items -->
      <div
        v-else
        ref="menuRef"
        :id="accessibilityConfig.pattern === 'menu' ? menuId : listboxId"
        v-bind="ariaAttrs.container"
        :aria-labelledby="triggerId"
        :aria-activedescendant="activeDescendantId || undefined"
      >
        <!-- Virtual scrolling container -->
        <div v-if="shouldVirtualize" 
             ref="virtualScrollContainer"
             v-bind="virtualContainerProps"
             :style="{ height: `${virtualContainerHeight}px`, overflow: 'auto' }"
             role="listbox"
             :aria-label="`${renderedItems.length} options available, use arrow keys to navigate`">
          <div v-bind="virtualWrapperProps">
            <Item
              v-for="{ data: item, index } in renderedItems"
              :key="`virtual-${item.value}`"
              v-model="model"
              v-model:selected="item.selected"
              :item="item"
              :get-object="getObject"
              :id="`dropdown-item-${item.value}`"
              :pattern="accessibilityConfig.pattern"
              :style="{ height: `${optionHeight}px` }"
              :class="{ 
                'keyboard-active': activeIndex === index,
                'focus-visible': activeIndex === index
              }"
              @update:model-value="selectItem"
              @expand-submenu="expandSubmenu"
              @collapse-submenu="collapseSubmenu"
            />
          </div>
        </div>
        <!-- Regular non-virtual scrolling -->
        <Items v-else :items="filteredItems">
          <template #default="{ items }">
            <Item
              v-for="(item, index) in items"
              :key="item.value"
              v-model="model"
              v-model:selected="item.selected"
              :item="item"
              :get-object="getObject"
              :id="`dropdown-item-${item.value}`"
              :pattern="accessibilityConfig.pattern"
              :class="{ 
                'keyboard-active': activeIndex === flattenedItems.findIndex(i => i.value === item.value),
                'focus-visible': activeIndex === flattenedItems.findIndex(i => i.value === item.value)
              }"
              @update:model-value="selectItem"
              @expand-submenu="expandSubmenu"
              @collapse-submenu="collapseSubmenu"
            />
          </template>
        </Items>
      </div>
      
      <!-- Error message for screen readers -->
      <div
        v-if="isError && errorMessage"
        :id="`${triggerId}-error`"
        class="sr-only"
        role="alert"
        aria-live="polite"
      >
        {{ errorMessage }}
      </div>
    </template>
  </BExpandableContainer>
</template>
