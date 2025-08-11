<script setup lang="ts">
import { ref, watch, onBeforeMount, computed, nextTick, onMounted, onUnmounted } from "vue";
import { dateOptions } from "../../utils";
import Option from "../../utils/components/Option.vue";
import { useAriaAttributes, useScreenReader, useKeyboardNavigation } from "../../composables";
import type {
  BDateFilterOption,
  BDateFilterModelValue,
} from "./BDateFilter.types";

// Re-export types for backward compatibility
export type { BDateFilterOption, BDateFilterModelValue };
export interface BDateFilterPropsLegacy {
    /** The selected date range */
    modelValue?: BDateFilterModelValue;
    /** Label text to display */
    labelValue?: string;
    /** Language locale for date formatting */
    lang?: string;
    /** Maximum allowed initial date */
    maxInit?: Date;
    /** Maximum allowed end date */
    maxEnd?: Date;
    /** Whether the component is disabled */
    disabled?: boolean;
    /** Whether the component is in error state */
    isError?: boolean;
    /** Error message to display */
    errorMessage?: string;
    /** Whether to use absolute positioning */
    absolute?: boolean;
    /** Whether the component is required */
    required?: boolean;
    /** Available date options */
    options?: BDateFilterOption[];
    // New accessibility props
    /** ARIA label for the date filter */
    ariaLabel?: string;
    /** ARIA description for the date filter */
    ariaDescription?: string;
    /** ID for ARIA describedby */
    ariaDescribedBy?: string;
    /** Enable screen reader announcements */
    enableAnnouncements?: boolean;
}

const props = withDefaults(defineProps<BDateFilterPropsLegacy>(), {
    labelValue: "",
    lang: "en-US",
    disabled: false,
    isError: false,
    errorMessage: "",
    absolute: true,
    options: () => dateOptions as BDateFilterOption[],
    ariaLabel: "Date filter",
    enableAnnouncements: true,
});

// Accessibility composables
const { useAriaId, useComboboxAria, useListboxAria, useOptionAria } = useAriaAttributes();
const { announce, announcePolitely, useLiveRegion } = useScreenReader();

// Generate unique IDs for ARIA relationships
const filterId = useAriaId('date-filter');
const listboxId = useAriaId('date-filter-listbox');
const liveRegionId = useAriaId('date-filter-live');
const descriptionId = props.ariaDescribedBy || useAriaId('date-filter-desc');

// Component state
let isExpanded = ref(false);
let model = ref<BDateFilterModelValue>(props.modelValue ? props.modelValue : []);
let optionSelected = ref(
  props.options.length
    ? props.options.find((o: BDateFilterOption) => o.selected)?.value || ""
    : ""
);
let formatedDate = ref("");
let focusedOptionIndex = ref(-1);
let isKeyboardNavigation = ref(false);

// Live region for announcements
const { liveRegion, updateLiveRegion } = useLiveRegion('polite');

// Initialize formatted date
if (model.value && model.value.length) {
  formatedDate.value =
    formatDate(model.value[0]) +
    (model.value[1] ? " - " + formatDate(model.value[1]) : "");
}

onBeforeMount(() => {
  if (optionSelected.value) {
    let option: BDateFilterOption | undefined = props.options.find(
      (o: BDateFilterOption) => o.value == optionSelected.value
    );
    if (option) {
      model.value = option.calculate();
    }
  }
});

const emit = defineEmits<{
  "update:modelValue": [value: BDateFilterModelValue];
  "apply": [value: BDateFilterModelValue];
  "preset-selected": [preset: BDateFilterOption];
  "date-range-selected": [dateRange: Date[]];
  "filter-cleared": [];
  "filter-opened": [];
  "filter-closed": [];
}>();

watch(
  () => props.modelValue,
  (cur) => (model.value = cur)
);

/**
 * Formats a date according to the specified locale
 */
function formatDate(date: Date): string | undefined {
  if (!date) return;
  return date.toLocaleDateString(props.lang, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

/**
 * Format date range for screen readers with full context
 */
function formatDateRangeForScreenReader(startDate: Date, endDate?: Date): string {
  const startStr = startDate.toLocaleDateString(props.lang, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  if (!endDate) {
    return startStr;
  }
  
  const endStr = endDate.toLocaleDateString(props.lang, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return `from ${startStr} to ${endStr}`;
}

/**
 * Handle keyboard navigation for filter presets
 */
function handleKeydown(event: KeyboardEvent) {
  if (!isExpanded.value) return;
  
  const { key } = event;
  const optionsCount = props.options.length;
  
  if (optionsCount === 0) return;
  
  let handled = false;
  isKeyboardNavigation.value = true;
  
  switch (key) {
    case 'ArrowDown':
      event.preventDefault();
      focusedOptionIndex.value = focusedOptionIndex.value < optionsCount - 1 
        ? focusedOptionIndex.value + 1 
        : 0;
      handled = true;
      break;
      
    case 'ArrowUp':
      event.preventDefault();
      focusedOptionIndex.value = focusedOptionIndex.value > 0 
        ? focusedOptionIndex.value - 1 
        : optionsCount - 1;
      handled = true;
      break;
      
    case 'Home':
      event.preventDefault();
      focusedOptionIndex.value = 0;
      handled = true;
      break;
      
    case 'End':
      event.preventDefault();
      focusedOptionIndex.value = optionsCount - 1;
      handled = true;
      break;
      
    case 'Enter':
    case ' ':
      event.preventDefault();
      if (focusedOptionIndex.value >= 0 && focusedOptionIndex.value < optionsCount) {
        const option = props.options[focusedOptionIndex.value];
        if (!option.disabled) {
          changeDate(option);
        }
      }
      handled = true;
      break;
      
    case 'Escape':
      event.preventDefault();
      isExpanded.value = false;
      focusedOptionIndex.value = -1;
      handled = true;
      break;
  }
  
  if (handled) {
    // Announce focused option for screen readers
    if (focusedOptionIndex.value >= 0 && props.enableAnnouncements) {
      const option = props.options[focusedOptionIndex.value];
      const announcement = option.ariaDescription || 
        `${option.label}${option.disabled ? ' (disabled)' : ''}`;
      updateLiveRegion(announcement);
    }
  }
}

/**
 * Handle filter expansion state changes
 */
function handleExpansionChange(expanded: boolean) {
  isExpanded.value = expanded;
  
  if (expanded) {
    focusedOptionIndex.value = optionSelected.value ? 
      props.options.findIndex(o => o.value === optionSelected.value) : 0;
    
    if (props.enableAnnouncements) {
      announcePolitely("Date filter opened. Use arrow keys to navigate presets.");
    }
    emit("filter-opened");
  } else {
    focusedOptionIndex.value = -1;
    isKeyboardNavigation.value = false;
    
    if (props.enableAnnouncements) {
      announcePolitely("Date filter closed");
    }
    emit("filter-closed");
  }
}

/**
 * Apply the current filter with announcement
 */
function applyFilter() {
  if (props.enableAnnouncements && model.value && model.value.length > 0) {
    const dateRangeText = formatDateRangeForScreenReader(model.value[0], model.value[1]);
    announcePolitely(`Date filter applied: ${dateRangeText}`);
  }
  emit("apply", model.value);
}

// Computed accessibility attributes
const containerAria = computed(() => ({
  role: 'search',
  'aria-label': props.ariaLabel,
  'aria-describedby': props.ariaDescription ? descriptionId : undefined,
}));

const triggerAria = computed(() => ({
  'aria-expanded': isExpanded.value,
  'aria-haspopup': 'listbox' as const,
  'aria-controls': listboxId,
  'aria-describedby': `${descriptionId} ${liveRegionId}`,
  'aria-label': `Date filter. Current selection: ${getCurrentSelectionText()}`,
}));

const presetListAria = computed(() => ({
  role: 'listbox',
  id: listboxId,
  'aria-label': 'Date filter presets',
  'aria-activedescendant': focusedOptionIndex.value >= 0 ? 
    `${filterId}-option-${focusedOptionIndex.value}` : undefined,
}));

/**
 * Get current selection text for screen readers
 */
function getCurrentSelectionText(): string {
  if (formatedDate.value) {
    return formatedDate.value;
  }
  
  const selectedOption = props.options.find(o => o.value === optionSelected.value);
  if (selectedOption) {
    return selectedOption.label;
  }
  
  return 'No date selected';
}

/**
 * Generate option ARIA attributes
 */
function getOptionAria(option: BDateFilterOption, index: number) {
  return {
    role: 'option',
    id: `${filterId}-option-${index}`,
    'aria-selected': optionSelected.value === option.value,
    'aria-disabled': option.disabled,
    'aria-describedby': option.ariaDescription ? `${filterId}-desc-${index}` : undefined,
    tabindex: focusedOptionIndex.value === index ? 0 : -1,
  };
}

/**
 * Handles date option selection with accessibility announcements
 */
function changeDate(option: BDateFilterOption) {
  const resultDate = option.calculate();
  let firstDate = resultDate[0];
  let secondDate = resultDate[1];
  
  // Validate date range
  if (
    (props.maxInit &&
      props.maxInit.toISOString().substr(0, 10) >=
        firstDate.toISOString().substr(0, 10)) ||
    (props.maxEnd &&
      props.maxEnd.toISOString().substr(0, 10) <=
        secondDate.toISOString().substr(0, 10))
  ) {
    // Announce validation error
    if (props.enableAnnouncements) {
      announce(`Cannot select ${option.label}. Date range is outside allowed bounds.`, 'assertive');
    }
    return;
  }
  
  formatedDate.value = "";
  model.value = [firstDate, secondDate];
  optionSelected.value = option.value;
  
  // Announce selection with formatted date range
  if (props.enableAnnouncements) {
    const dateRangeText = formatDateRangeForScreenReader(firstDate, secondDate);
    const announcement = option.announcement || 
      `Selected ${option.label}. Date range: ${dateRangeText}`;
    announcePolitely(announcement);
  }
  
  emit("update:modelValue", model.value);
  emit("preset-selected", option);
}

/**
 * Resets the model to empty state with accessibility announcements
 */
function resetModel() {
  optionSelected.value = "";
  formatedDate.value = "";
  model.value = [];
  
  // Announce filter clearing
  if (props.enableAnnouncements) {
    announcePolitely("Date filter cleared");
  }
  
  emit("update:modelValue", model.value);
  emit("filter-cleared");
}

/**
 * Updates the formatted date display based on current model value with accessibility
 */
function setFormatedDate() {
  if (model.value && model.value.length > 0) {
    const firstDateStr = formatDate(model.value[0]);
    const secondDateStr = model.value[1] ? formatDate(model.value[1]) : undefined;
    formatedDate.value = firstDateStr + (secondDateStr ? " - " + secondDateStr : "");
    
    // Announce custom date range selection
    if (props.enableAnnouncements) {
      const dateRangeText = formatDateRangeForScreenReader(model.value[0], model.value[1]);
      announcePolitely(`Custom date range selected: ${dateRangeText}`);
    }
    
    emit("date-range-selected", model.value);
  } else {
    formatedDate.value = "";
  }
  optionSelected.value = "";
  emit("update:modelValue", model.value);
}

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
});

// Watch for model changes to update formatted date
watch(
  () => props.modelValue,
  (cur) => {
    model.value = cur;
    if (cur && cur.length) {
      formatedDate.value =
        formatDate(cur[0]) + (cur[1] ? " - " + formatDate(cur[1]) : "");
    }
  }
);
</script>

<template>
  <!-- Hidden description for screen readers -->
  <div
    v-if="props.ariaDescription"
    :id="descriptionId"
    class="sr-only"
  >
    {{ props.ariaDescription }}
  </div>
  
  <!-- Live region for announcements -->
  <div
    :id="liveRegionId"
    ref="liveRegion"
    class="sr-only"
    aria-live="polite"
    aria-atomic="true"
  ></div>
  
  <BSelectContainer
    v-model="isExpanded"
    :label-value="labelValue"
    :required="required"
    class="b-select"
    v-bind="containerAria"
    aria-multiselectable="false"
    dont-have-max-height
    :absolute="absolute"
    :disabled="disabled"
    :is-error="isError"
    :error-message="errorMessage"
    hide-arrow
    @update:modelValue="handleExpansionChange"
    @click="() => {}"
  >
    <div
      class="flex items-center text-lg h-xl text-neutral-interaction-default"
      :class="{ 'text-primary-interaction-default': isExpanded }"
      v-bind="triggerAria"
    >
      <BIcon 
        name="calendar_month" 
        size="lg" 
        :aria-hidden="true"
      />
    </div>
    <h5 
      class="whitespace-nowrap" 
      :class="{ 'font-bold': isExpanded }"
    >
      <span
        v-if="formatedDate || options.find((o: BDateFilterOption) => o.value == optionSelected)?.label"
      >
        {{
          formatedDate ||
          options.find((o: BDateFilterOption) => o.value == optionSelected)?.label
        }}
      </span>
      <slot v-else />
    </h5>

    <template #items>
      <div
        class="flex flex-col items-center divide-y-xxs divide-neutral-default overflow-x-hidden"
        role="region"
        :aria-label="'Date filter options'"
      >
        <!-- Custom Date Range Calendar -->
        <div 
          class="w-full"
          role="group"
          aria-label="Custom date range selection"
        >
          <BDate
            v-model="model"
            :lang="lang"
            is-period
            :max-init="maxInit"
            :max-end="maxEnd"
            aria-label="Select custom date range"
            @update:modelValue="setFormatedDate"
          />
        </div>
        
        <!-- Preset Options List -->
        <div 
          class="flex flex-col w-full p-xs"
          v-bind="presetListAria"
        >
          <h6 class="sr-only">Date filter presets</h6>
          <Option
            v-for="(option, index) in options"
            :key="index"
            class="px-xs py-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary-interaction-default focus:ring-offset-2"
            :class="{
              'bg-primary-base text-primary-contrast': optionSelected === option.value,
              'bg-primary-light': focusedOptionIndex === index && isKeyboardNavigation,
              'opacity-50 cursor-not-allowed': option.disabled,
              'hover:bg-neutral-light': !option.disabled && optionSelected !== option.value
            }"
            :selected="optionSelected === option.value"
            :disabled="option.disabled"
            v-bind="getOptionAria(option, index)"
            @click="!option.disabled && changeDate(option)"
            @mouseenter="focusedOptionIndex = index; isKeyboardNavigation = false"
            @focus="focusedOptionIndex = index"
          >
            {{ option.label }}
            <!-- Hidden description for complex date ranges -->
            <span
              v-if="option.ariaDescription"
              :id="`${filterId}-desc-${index}`"
              class="sr-only"
            >
              {{ option.ariaDescription }}
            </span>
          </Option>
        </div>
      </div>
    </template>

    <template #actions>
      <div 
        class="flex items-center justify-end gap-xs w-full"
        role="group"
        aria-label="Date filter actions"
      >
        <slot name="actions">
          <BButton 
            size="small" 
            variant="plain" 
            type="button"
            aria-label="Clear date filter selection"
            :aria-describedby="model?.length ? liveRegionId : undefined"
            @click="resetModel"
          >
            <slot name="clear-text"> Clear </slot>
          </BButton>
          <BButton 
            size="small" 
            type="button"
            aria-label="Apply selected date filter"
            :aria-describedby="model?.length ? liveRegionId : undefined"
            @click="applyFilter"
          >
            <slot name="apply-text"> Apply </slot>
          </BButton>
        </slot>
      </div>
    </template>
  </BSelectContainer>
</template>

<style scoped>
/* Screen reader only class for accessibility */
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

/* Focus indicators for high contrast mode */
@media (prefers-contrast: high) {
  .focus\:ring-2:focus {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
}

/* Reduce motion for users who prefer it */
@media (prefers-reduced-motion: reduce) {
  .transition-colors {
    transition: none;
  }
}

/* Enhanced focus visibility */
.focus\:outline-none:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.focus\:ring-2:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}

/* Keyboard navigation styling */
.keyboard-focus {
  background-color: var(--color-primary-light);
  border-radius: 0.25rem;
}

/* High contrast mode support */
@media (forced-colors: active) {
  .bg-primary-base {
    background-color: Highlight;
    color: HighlightText;
  }
  
  .opacity-50 {
    opacity: 1;
    color: GrayText;
  }
}
</style>
