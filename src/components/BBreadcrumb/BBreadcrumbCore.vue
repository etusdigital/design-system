<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch } from "vue";
import { useOptionalModel, useAriaAttributes } from "#composables";
import { useBreadcrumbNavigation } from "#composables/useBreadcrumbNavigation";
import { useBreadcrumbStructuredData } from "#composables/useBreadcrumbStructuredData";
import { useBreadcrumbDropdown } from "#composables/useBreadcrumbDropdown";
import Option from "../../utils/components/Option.vue";
import BIcon from "../BIcon/BIcon.vue";
import BCard from "../BCard/BCard.vue";
import { isObject } from "../../utils";
import type {
  BBreadcrumbItem,
  BreadcrumbItemType,
  MoreOptionsItem,
  ParsedBreadcrumbItem,
  BBreadcrumbProps,
  BBreadcrumbEmits,
} from "./BBreadcrumb.types";
import {
  BREADCRUMB_CONSTANTS,
  BREADCRUMB_ARIA,
} from "./BBreadcrumb.types";

const props = withDefaults(
  defineProps<BBreadcrumbProps>(),
  {
    modelValue: undefined,
    items: undefined,
    labelKey: "label",
    valueKey: "value",
    urlKey: "url",
    getObject: false,
    id: undefined,
    ariaLabel: "Breadcrumb navigation",
    ariaDescribedBy: undefined,
    ariaLabelledBy: undefined,
    includeStructuredData: true,
    separatorText: "Navigate to",
    announceNavigation: true,
    showFocusRing: true,
    respectReducedMotion: true,
    supportHighContrast: true,
    currentPage: undefined,
    navigable: true,
    currentPageIsLink: false,
    maxItems: 5,
    showSeparators: true,
    separator: "chevron_right",
    separatorsDecorative: true,
    size: "medium",
    truncateLabels: false,
    maxLabelLength: 30,
    enableMoreOptions: true,
    moreOptionsLabel: "Show more navigation options",
    disabled: false,
    generateLinks: false,
    baseUrl: "",
    linkTarget: "_self",
  }
);

const emit = defineEmits<BBreadcrumbEmits>();

// Component refs
const breadcrumbRef = ref<HTMLElement>();

// Setup models and composables
const [model] = useOptionalModel<unknown>(props, "modelValue", emit, undefined);
const { useAriaId, useNavigationAria } = useAriaAttributes();

// Setup navigation composable
const navigationOptions = computed(() => ({
  announceNavigation: props.announceNavigation,
  announcementPrefix: "Breadcrumb item",
  disabled: props.disabled,
  navigable: props.navigable,
  currentPageIsLink: props.currentPageIsLink,
  getObject: props.getObject,
}));

const navigation = useBreadcrumbNavigation(
  computed(() => props.items),
  model,
  emit,
  navigationOptions.value
);

// Setup structured data composable
const structuredDataOptions = computed(() => ({
  includeStructuredData: props.includeStructuredData,
  labelKey: props.labelKey,
  urlKey: props.urlKey,
  baseUrl: props.baseUrl,
}));

const structuredData = useBreadcrumbStructuredData(
  computed(() => props.items),
  structuredDataOptions.value
);

// Setup dropdown composable
const dropdownOptions = computed(() => ({
  announceNavigation: props.announceNavigation,
  moreOptionsLabel: props.moreOptionsLabel,
  disabled: props.disabled,
}));

const dropdown = useBreadcrumbDropdown(emit, dropdownOptions.value);

// Generate unique IDs
const breadcrumbId = props.id || useAriaId('breadcrumb');
const listId = useAriaId('breadcrumb-list');
const navigationAriaAttrs = useNavigationAria(undefined, props.ariaLabel);

/**
 * Creates truncated items list with "more" options for better UX
 */
function createTruncatedItems(items: BreadcrumbItemType[], selectedIndex: number): ParsedBreadcrumbItem[] {
  const result: ParsedBreadcrumbItem[] = [];
  const maxItems = props.maxItems || BREADCRUMB_CONSTANTS.DEFAULT_MAX_ITEMS;

  for (let i = 0; i < items.length; i++) {
    if (
      i === 0 ||
      i === items.length - 1 ||
      (selectedIndex === 0 && i < 2) ||
      (selectedIndex === items.length - 1 && i >= items.length - 2) ||
      selectedIndex - 1 === i ||
      selectedIndex + 1 === i ||
      selectedIndex === i
    ) {
      result.push(items[i]);
    } else if (i === 1 && selectedIndex > 1) {
      result.push({
        icon: "more_horiz",
        items: items.slice(1, selectedIndex - 1),
      });
    } else if (i === items.length - 2 && selectedIndex < items.length - 2) {
      result.push({
        icon: "more_horiz",
        items: items.slice(selectedIndex + 2, items.length - 1),
      });
    }
  }

  return result;
}

// Enhanced parsed items with accessibility considerations
const parsedItems = computed((): ParsedBreadcrumbItem[] => {
  if (!props.items?.length) return [];

  const items = [...props.items];
  let selectedIndex = items.findIndex((item) => navigation.isActive(item, props.valueKey));
  if (selectedIndex === -1) selectedIndex = 0;

  // If maxItems is set and items exceed that, apply intelligent truncation
  if (props.maxItems && items.length > props.maxItems && props.enableMoreOptions) {
    return createTruncatedItems(items, selectedIndex);
  }

  return items;
});

// Enhanced navigation ARIA attributes
const navigationAttributes = computed(() => ({
  ...navigationAriaAttrs.value,
  id: breadcrumbId,
  ...(props.ariaDescribedBy && { 'aria-describedby': props.ariaDescribedBy }),
  ...(props.ariaLabelledBy && { 'aria-labelledby': props.ariaLabelledBy }),
}));

/**
 * Enhanced component class computation
 */
const breadcrumbClasses = computed(() => {
  const classes = ['b-breadcrumb'];
  
  if (props.size && props.size !== 'medium') {
    classes.push(`b-breadcrumb--${props.size}`);
  }
  
  if (props.disabled) {
    classes.push('b-breadcrumb--disabled');
  }
  
  if (props.supportHighContrast) {
    classes.push('b-breadcrumb--high-contrast');
  }
  
  if (props.respectReducedMotion) {
    classes.push('b-breadcrumb--reduced-motion');
  }
  
  return classes;
});

/**
 * Gets the display label for an item with truncation support
 */
function getLabel(value: unknown): string {
  if (!value) return '';
  if (dropdown.isMoreOptionsItem(value)) {
    return ''; // "more" items don't have labels
  }
  
  const breadcrumbItem = value as BreadcrumbItemType;
  let label = navigation.getLabel(breadcrumbItem, props.labelKey);

  // Apply truncation if enabled
  if (props.truncateLabels && props.maxLabelLength && label.length > props.maxLabelLength) {
    label = label.substring(0, props.maxLabelLength - 3) + '...';
  }

  return label;
}

/**
 * Gets the full label without truncation (for accessibility)
 */
function getFullLabel(value: unknown): string {
  if (!value) return '';
  if (dropdown.isMoreOptionsItem(value)) return '';
  
  return navigation.getLabel(value as BreadcrumbItemType, props.labelKey);
}

/**
 * Gets ARIA attributes for breadcrumb items
 */
function getItemAriaAttributes(item: BreadcrumbItemType, index: number) {
  const isCurrent = navigation.isCurrentPage(item, props.currentPage, props.valueKey);
  const fullLabel = getFullLabel(item);
  const truncatedLabel = getLabel(item);
  const url = navigation.getUrl(item, props.urlKey, props.baseUrl);
  
  return {
    'data-breadcrumb-index': index,
    ...(isCurrent && { 'aria-current': BREADCRUMB_ARIA.CURRENT_PAGE }),
    ...(fullLabel !== truncatedLabel && { 'aria-label': fullLabel }),
    ...(url && props.generateLinks && { href: url }),
    ...(props.linkTarget && props.generateLinks && { target: props.linkTarget }),
    ...(props.linkTarget === '_blank' && { rel: 'noopener noreferrer' }),
    tabindex: props.disabled ? -1 : 0,
  };
}

/**
 * Generates a unique key for v-for template
 */
function generateKey(item: ParsedBreadcrumbItem, index: number): string {
  if (dropdown.isMoreOptionsItem(item)) {
    return `more-${index}`;
  }
  const breadcrumbItem = item as BreadcrumbItemType;
  if (isObject(breadcrumbItem)) {
    const value = navigation.getValue(breadcrumbItem, props.valueKey);
    return String(value || index);
  }
  return String(breadcrumbItem || index);
}

// Expose public methods for parent components
defineExpose({
  focusItem: (index: number) => navigation.moveFocus(index, true),
  navigateToItem: (item: BreadcrumbItemType) => navigation.navigateToItem(item),
  closeAllDropdowns: () => dropdown.closeAllDropdowns(),
  getNavigationHistory: () => navigation.getNavigationHistory(),
  isNavigating: () => navigation.getIsNavigating(),
});
</script>

<template>
  <!-- Breadcrumb Navigation with Enhanced Accessibility -->
  <nav
    v-bind="navigationAttributes"
    :class="breadcrumbClasses"
    ref="breadcrumbRef"
  >
    <!-- Screen Reader Only Context -->
    <div class="sr-only" aria-live="polite" aria-atomic="true">
      Breadcrumb navigation with {{ parsedItems.length }} items
    </div>
    
    <!-- Breadcrumb List -->
    <ol
      :id="listId"
      class="breadcrumb-list flex items-center gap-xs"
      role="list"
    >
      <li
        v-for="(item, index) in parsedItems"
        :key="generateKey(item, index)"
        class="breadcrumb-item flex items-center gap-xs"
        role="listitem"
      >
        
        <!-- More Options Button -->
        <button
          v-if="dropdown.isMoreOptionsItem(item)"
          type="button"
          class="more-button"
          v-bind="dropdown.getMoreOptionsAriaAttributes(index, item.items)"
          @click="dropdown.showMoreItems($event, index, parsedItems)"
          @keydown="(e) => dropdown.handleMoreOptionsKeydown(e, index)"
          @focus="navigation.handleItemFocus(item, index, $event)"
          @blur="navigation.handleItemBlur(item, index, $event)"
        >
          <BIcon 
            name="more_horiz" 
            aria-hidden="true" 
          />
          <span class="sr-only">{{ item.items.length }} hidden items</span>
        </button>
        
        <!-- Regular Breadcrumb Items -->
        <template v-else>
          <!-- Link Version -->
          <a
            v-if="props.generateLinks && (props.navigable && (!navigation.isCurrentPage(item, props.currentPage, props.valueKey) || props.currentPageIsLink))"
            :class="['item', { 'active': navigation.isCurrentPage(item, props.currentPage, props.valueKey) }]"
            v-bind="getItemAriaAttributes(item, index)"
            @click="navigation.navigateToItem(item, $event)"
            @keydown="(e) => navigation.handleKeydown(e, item, index)"
            @focus="navigation.handleItemFocus(item, index, $event)"
            @blur="navigation.handleItemBlur(item, index, $event)"
          >
            {{ getLabel(item) }}
          </a>
          
          <!-- Button Version -->
          <button
            v-else-if="!props.generateLinks && props.navigable && (!navigation.isCurrentPage(item, props.currentPage, props.valueKey) || props.currentPageIsLink)"
            type="button"
            :class="['item', { 'active': navigation.isCurrentPage(item, props.currentPage, props.valueKey) }]"
            v-bind="getItemAriaAttributes(item, index)"
            @click="navigation.navigateToItem(item, $event)"
            @keydown="(e) => navigation.handleKeydown(e, item, index)"
            @focus="navigation.handleItemFocus(item, index, $event)"
            @blur="navigation.handleItemBlur(item, index, $event)"
          >
            {{ getLabel(item) }}
          </button>
          
          <!-- Current Page (Non-navigable) -->
          <span
            v-else
            :class="['item', 'active', { 'current-page': navigation.isCurrentPage(item, props.currentPage, props.valueKey) }]"
            v-bind="getItemAriaAttributes(item, index)"
            role="text"
          >
            {{ getLabel(item) }}
          </span>
        </template>
        
        <!-- Separator with Screen Reader Support -->
        <template v-if="index < parsedItems.length - 1 && props.showSeparators">
          <BIcon
            :name="props.separator"
            :aria-hidden="props.separatorsDecorative"
            class="separator" 
          />
          <span 
            v-if="!props.separatorsDecorative"
            class="sr-only"
          >
            {{ props.separatorText }}
          </span>
        </template>
          
        <!-- More Options Dropdown -->
        <Teleport
          v-if="dropdown.isMoreOptionsItem(item)"
          to="body"
        >
          <Transition 
            name="fade"
            :duration="props.respectReducedMotion ? 0 : 200"
          >
            <div
              v-if="dropdown.isExpanded(index)"
              class="more-options"
              :id="`more-options-${index}`"
              :data-index="index"
              role="menu"
              :aria-label="`Additional navigation options (${item.items.length} items)`"
            >
              <button
                v-for="(option, optionIndex) in item.items"
                :key="generateKey(option, optionIndex)"
                type="button"
                role="menuitem"
                class="menu-option"
                :aria-label="getFullLabel(option)"
                @click="navigation.navigateToItem(option, $event)"
                @keydown="(e) => navigation.handleKeydown(e, option, optionIndex)"
              >
                {{ getLabel(option) }}
              </button>
            </div>
          </Transition>
        </Teleport>
      </li>
    </ol>
    
    <!-- Screen Reader Instructions -->
    <div class="sr-only" id="breadcrumb-instructions">
      Use arrow keys to navigate between breadcrumb items. Press Enter or Space to activate.
    </div>
  </nav>
</template>

<style scoped>
  @import "../../assets/main.css";
  
  /* Base breadcrumb styles */
  .b-breadcrumb {
    @apply flex items-center gap-xs;
  }

  /* Size variants */
  .b-breadcrumb--small {
    @apply text-sm gap-xxs;
  }

  .b-breadcrumb--large {
    @apply text-lg gap-sm;
  }

  /* State variants */
  .b-breadcrumb--disabled {
    @apply opacity-50 pointer-events-none;
  }

  .b-breadcrumb--high-contrast {
    @apply contrast-more;
  }

  .b-breadcrumb--reduced-motion * {
    @apply transition-none;
  }

  /* List styles */
  .breadcrumb-list {
    @apply list-none m-0 p-0;
  }

  .breadcrumb-item {
    @apply list-none;
  }

  /* Item styles */
  .item {
    @apply 
      text-neutral-interaction-default 
      cursor-pointer 
      hover:text-primary-interaction-hover 
      bg-transparent 
      border-0 
      focus:outline-none 
      focus:ring-2 
      focus:ring-primary-foreground-low 
      rounded-xs 
      px-base 
      py-sm 
      min-h-[44px] /* Minimum touch target */
      flex 
      items-center
      transition-colors 
      duration-150;
  }

  .item:hover {
    @apply text-primary-interaction-hover bg-primary-surface-hover;
  }

  .item.active {
    @apply 
      pointer-events-none 
      text-neutral-foreground-high 
      font-medium 
      cursor-default;
  }

  .item.current-page {
    @apply 
      text-primary-foreground-default 
      font-semibold 
      relative;
  }

  .item.current-page::after {
    content: "";
    @apply 
      absolute 
      bottom-0 
      left-0 
      right-0 
      h-0.5 
      bg-primary-foreground-default 
      rounded-full;
  }

  /* Focus styles */
  .item:focus-visible {
    @apply 
      outline-2 
      outline-primary-foreground-default 
      outline-offset-2;
  }

  /* Link specific styles */
  a.item {
    @apply 
      text-decoration-none 
      no-underline;
  }

  a.item:hover {
    @apply text-decoration-none;
  }

  a.item:visited {
    @apply text-neutral-interaction-default;
  }

  /* More button styles */
  .more-button {
    @apply 
      bg-transparent 
      border-0 
      cursor-pointer 
      text-neutral-interaction-default 
      hover:text-primary-interaction-hover 
      hover:bg-primary-surface-hover 
      focus:outline-none 
      focus:ring-2 
      focus:ring-primary-foreground-low 
      rounded-xs 
      p-base 
      min-h-[44px] 
      min-w-[44px] 
      flex 
      items-center 
      justify-center 
      transition-colors 
      duration-150;
  }

  .more-button:focus-visible {
    @apply 
      outline-2 
      outline-primary-foreground-default 
      outline-offset-2;
  }

  /* Menu option styles */
  .menu-option {
    @apply 
      w-full 
      text-left 
      bg-transparent 
      border-0 
      cursor-pointer 
      hover:bg-primary-surface-hover 
      focus:outline-none 
      focus:bg-primary-surface-hover 
      p-base 
      min-h-[44px] 
      flex 
      items-center
      transition-colors 
      duration-150
      text-neutral-foreground-default;
  }

  .menu-option:focus-visible {
    @apply 
      outline-2 
      outline-primary-foreground-default 
      outline-offset-2;
  }

  /* Separator styles */
  .separator {
    @apply 
      text-neutral-interaction-disabled 
      flex-shrink-0 
      select-none;
  }

  /* Dropdown styles */
  .more-options {
    @apply 
      z-1000 
      fixed 
      overflow-auto 
      min-w-9xl 
      max-h-9xl 
      p-xxs 
      shadow-lg 
      border 
      border-neutral-border-default 
      rounded-sm 
      bg-neutral-surface-default;
  }

  .more-options [role="menuitem"] {
    @apply p-xs rounded-xs;
  }

  /* Animation styles */
  .fade-enter-active,
  .fade-leave-active {
    @apply transition-opacity duration-200;
  }

  .fade-enter-from,
  .fade-leave-to {
    @apply opacity-0;
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .b-breadcrumb--reduced-motion .fade-enter-active,
    .b-breadcrumb--reduced-motion .fade-leave-active {
      @apply transition-none duration-0;
    }
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .b-breadcrumb--high-contrast .item,
    .b-breadcrumb--high-contrast .more-button {
      @apply border border-current;
    }
    
    .b-breadcrumb--high-contrast .item:focus,
    .b-breadcrumb--high-contrast .more-button:focus {
      @apply border-2;
    }
  }

  /* Screen reader only styles */
  .sr-only {
    @apply 
      absolute 
      w-px 
      h-px 
      p-0 
      -m-px 
      overflow-hidden 
      whitespace-nowrap 
      border-0;
    clip: rect(0, 0, 0, 0);
    clip-path: inset(50%);
  }

  /* Print styles */
  @media print {
    .b-breadcrumb {
      @apply text-black;
    }
    
    .item {
      @apply text-black no-underline;
    }
    
    .more-options {
      @apply hidden;
    }
    
    .separator {
      @apply text-black;
    }
  }
</style>