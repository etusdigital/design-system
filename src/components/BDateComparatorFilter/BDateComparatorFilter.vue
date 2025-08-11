<script setup lang="ts">
import { ref, watch, onBeforeMount, computed, nextTick } from "vue";
import { dateOptions } from "../../utils";
import Option from "../../utils/components/Option.vue";
import { useAriaAttributes, useScreenReader, useKeyboardNavigation } from "#composables";
import type {
  BDateComparatorFilterProps,
  BDateComparatorFilterEmits,
  DateOption,
  BDateComparatorFilterModelValue,
  DateTemplate,
  FilterLoadingState,
  FilterResultInfo
} from './BDateComparatorFilter.types';

const props = withDefaults(defineProps<BDateComparatorFilterProps>(), {
    lang: "en-US",
    labelValue: "",
    isCompare: false,
    disabled: false,
    required: false,
    isError: false,
    errorMessage: "",
    absolute: false,
    expanded: false,
    alignRight: false,
    options: () => dateOptions as DateOption[],
    loadingState: 'idle',
    highContrast: false,
    respectReducedMotion: false,
    ariaLabel: "Date filter",
    accessibility: () => ({}),
    keyboardNavigation: () => ({}),
});

onBeforeMount(() => {
  if (optionSelected.value) {
    let option: DateOption | undefined = props.options.find(
      (o: DateOption) => o.value == optionSelected.value
    );
    if (option) {
      setModel(option.calculate());
      isMulti.value = false;
      emit("update:isCompare", isMulti.value);
    }
  } else if (props.modelValue) {
    if (
      props.modelValue &&
      Array.isArray(props.modelValue[0]) &&
      !isMulti.value
    ) {
      (isMulti.value = true), emit("update:isCompare", true);
    } else {
      if (isMulti.value) {
        (isMulti.value = false), emit("update:isCompare", false);
      }
    }
    setFormatedDate(true);
  }
});

watch(
  () => props.modelValue,
  (cur) => {
    if (cur && Array.isArray(cur[0])) {
      if (!isMulti.value) {
        (isMulti.value = true), emit("update:isCompare", true);
      }
    } else {
      if (isMulti.value) {
        (isMulti.value = false), emit("update:isCompare", false);
      }
    }
    model.value = cur;
  }
);
watch(
  () => props.isCompare,
  () => {
    isMulti.value = props.isCompare;
    if (!isMulti.value) {
      optionSelected.value =
        props.options.find((o: DateOption) => o.selected)?.value || "";
    } else {
      optionSelected.value = "";
    }
  }
);
watch(
  () => props.expanded,
  () => (isExpanded.value = props.expanded)
);

const emit = defineEmits<BDateComparatorFilterEmits>();

// Accessibility setup
const { useAriaId, useBusyAria } = useAriaAttributes();
const { announcePolitely, announceAssertively, useLiveRegion } = useScreenReader();

// Generate unique IDs for accessibility
const filterTriggerId = useAriaId('date-filter-trigger');
const optionsListId = useAriaId('date-filter-options');
const clearButtonId = useAriaId('date-filter-clear');
const applyButtonId = useAriaId('date-filter-apply');
const liveRegionId = useAriaId('date-filter-live');
const descriptionId = useAriaId('date-filter-desc');

// Live region for announcements
const { liveRegion, updateLiveRegion } = useLiveRegion('polite');

// State management
let currentLoadingState = ref<FilterLoadingState>(props.loadingState);
let isExpanded = ref(props.expanded);
let isMulti = ref(false);
let optionSelected = ref(
  props.options.length && !props.isCompare
    ? props.options.find((o: DateOption) => o.selected)?.value || ""
    : ""
);
let model = ref<BDateComparatorFilterModelValue>(
  props.modelValue ? props.modelValue : props.isCompare ? [[], []] : []
);
let formatedDate = ref("");

// Keyboard navigation for options
const optionElements = ref<HTMLElement[]>([]);
const { activeIndex, handleKeydown: handleOptionsKeydown } = useKeyboardNavigation(
  computed(() => props.options || []),
  (option, index) => {
    if (!option.disabled) {
      changeDate(option);
      announceSelection(option.label);
    }
  }
);

// Computed values for accessibility
const busyAriaAttrs = useBusyAria(computed(() => currentLoadingState.value !== 'idle'));

const filterAriaAttrs = computed(() => ({
  role: 'search',
  'aria-label': props.ariaLabel || 'Date filter',
  'aria-describedby': `${descriptionId} ${liveRegionId}`,
  ...busyAriaAttrs.value,
}));

const triggerAriaAttrs = computed(() => ({
  'aria-haspopup': 'listbox',
  'aria-expanded': isExpanded.value,
  'aria-controls': isExpanded.value ? optionsListId : undefined,
  'aria-describedby': descriptionId,
  'aria-label': getFilterStatusDescription(),
}));

const optionsListAriaAttrs = computed(() => ({
  role: 'listbox',
  id: optionsListId,
  'aria-label': 'Date filter options',
  'aria-multiselectable': false,
}));

const clearButtonAriaAttrs = computed(() => ({
  id: clearButtonId,
  'aria-label': `Clear filter. ${getActiveFilterCount()} active filters`,
  'aria-describedby': liveRegionId,
}));

const applyButtonAriaAttrs = computed(() => ({
  id: applyButtonId,
  'aria-label': `Apply filter changes. ${getActiveFilterCount()} filters will be applied`,
  'aria-describedby': liveRegionId,
}));

// Accessibility helper functions
function getActiveFilterCount(): number {
  if (!model.value) return 0;
  if (isMulti.value && Array.isArray(model.value) && Array.isArray(model.value[0])) {
    const dateArray = model.value as Date[][];
    return dateArray.filter(range => range && range.length > 0).length;
  }
  if (Array.isArray(model.value) && model.value.length > 0) {
    return 1;
  }
  return 0;
}

function getFilterStatusDescription(): string {
  const activeCount = getActiveFilterCount();
  const loadingText = currentLoadingState.value !== 'idle' ? `, ${currentLoadingState.value}` : '';
  
  if (activeCount === 0) {
    return `No date filters active${loadingText}`;
  }
  if (activeCount === 1) {
    const filterDesc = formatedDate.value || optionSelected.value || 'date filter';
    return `1 active filter: ${filterDesc}${loadingText}`;
  }
  return `${activeCount} active date filters${loadingText}`;
}

function announceFilterChange(message: string, assertive: boolean = false): void {
  if (props.accessibility?.announceChanges !== false) {
    if (assertive) {
      announceAssertively(message);
    } else {
      announcePolitely(message);
    }
    updateLiveRegion(message);
  }
}

function announceLoadingState(state: FilterLoadingState): void {
  if (props.accessibility?.announceLoadingStates !== false) {
    const messages = props.accessibility?.messages || {};
    let message = '';
    
    switch (state) {
      case 'loading':
        message = messages.loading || 'Loading filter options';
        break;
      case 'applying':
        message = messages.applied || 'Applying filters';
        break;
      case 'clearing':
        message = messages.cleared || 'Clearing filters';
        break;
      case 'idle':
        message = 'Filter operation complete';
        break;
    }
    
    announceFilterChange(message, state === 'applying' || state === 'clearing');
  }
}

function announceSelection(selectedOption: string): void {
  const message = `Selected ${selectedOption}`;
  announceFilterChange(message);
}

function announceComparisonModeChange(enabled: boolean): void {
  const message = enabled 
    ? (props.accessibility?.messages?.compareEnabled || 'Comparison mode enabled')
    : (props.accessibility?.messages?.compareDisabled || 'Comparison mode disabled');
  announceFilterChange(message);
}

// Watch for loading state changes
watch(() => currentLoadingState.value, (newState) => {
  announceLoadingState(newState);
  emit('update:loadingState', newState);
});

// Watch for props.loadingState changes
watch(() => props.loadingState, (newState) => {
  currentLoadingState.value = newState;
});

// Handle keyboard navigation in the dropdown
function handleDropdownKeydown(event: KeyboardEvent): void {
  if (isExpanded.value && props.keyboardNavigation?.enableArrowKeyNavigation !== false) {
    const handled = handleOptionsKeydown(event);
    if (!handled && event.key === 'Escape') {
      isExpanded.value = false;
      emit('update:expanded', false);
      announceFilterChange('Filter dropdown closed');
    }
  }
}

/**
 * Formats a date according to the specified locale and template
 */
function formatDate(date: Date, template?: DateTemplate) {
  return date.toLocaleDateString(
    props.lang,
    template || { year: "numeric", month: "short", day: "2-digit" }
  );
}

function getAnd() {
  if (props.lang.includes("pt")) {
    return "e";
  }
  return "and";
}

function setFormatedDate(dontEmit = false) {
  if (model.value && isMulti.value) {
    // Handle Date[][] format for comparison mode
    if (Array.isArray(model.value) && Array.isArray(model.value[0])) {
      const dateArray = model.value as Date[][];
      if (dateArray.length > 1 && Array.isArray(dateArray[1]) && dateArray[1].length > 0) {
        formatedDate.value = `${
          formatDate(dateArray[0][0]) +
          (dateArray[0][1]
            ? " - " +
              formatDate(dateArray[0][1])
            : "")
        } ${props.separator || getAnd()} ${
          formatDate(dateArray[1][0]) +
          (dateArray[1][1]
            ? " - " +
              formatDate(dateArray[1][1])
            : "")
        }`;
      } else if (dateArray[0].length > 0) {
        formatedDate.value =
          formatDate(dateArray[0][0]) +
          (dateArray[0][1] ? " - " + formatDate(dateArray[0][1]) : "");
      } else {
        formatedDate.value = "";
      }
    }
  } else if (model.value && Array.isArray(model.value) && model.value.length > 0) {
    // Handle Date[] format for single date range
    const dateArray = model.value as Date[];
    formatedDate.value =
      formatDate(dateArray[0]) +
      (dateArray[1] ? " - " + formatDate(dateArray[1]) : "");
  } else {
    formatedDate.value = "";
  }
  
  // Emit filter result change for accessibility tracking
  if (!dontEmit) {
    emit("update:modelValue", model.value);
    const resultInfo: FilterResultInfo = {
      activeFilterCount: getActiveFilterCount(),
      activeFilterDescription: getFilterStatusDescription(),
      hasActiveFilters: getActiveFilterCount() > 0,
      loadingState: currentLoadingState.value,
    };
    emit('filterResultChange', resultInfo);
  }
}

/**
 * Updates the model value
 */
function setModel(value: BDateComparatorFilterModelValue) {
  model.value = value;
  emit("update:modelValue", model.value);
}

/**
 * Handles date option selection
 */
function changeDate(option: DateOption) {
  if (option.disabled) return;
  
  currentLoadingState.value = 'loading';
  isMulti.value = false;
  emit("update:isCompare", false);
  announceComparisonModeChange(false);
  optionSelected.value = option.value;
  formatedDate.value = "";
  
  setTimeout(() => {
    setModel(option.calculate());
    currentLoadingState.value = 'idle';
    announceSelection(option.label);
  }, 100);
}

function clear() {
  currentLoadingState.value = 'clearing';
  
  const previousCount = getActiveFilterCount();
  setModel(undefined);
  optionSelected.value = '';
  formatedDate.value = '';
  
  currentLoadingState.value = 'idle';
  
  // Announce clearing result
  const message = props.accessibility?.messages?.cleared || 
    `Filters cleared. ${previousCount} filter${previousCount !== 1 ? 's' : ''} removed.`;
  announceFilterChange(message, true);
  
  emit('clear');
}

function applyFilters() {
  currentLoadingState.value = 'applying';
  
  setTimeout(() => {
    emit('apply', model.value);
    currentLoadingState.value = 'idle';
    
    const count = getActiveFilterCount();
    const message = props.accessibility?.messages?.applied || 
      `${count} filter${count !== 1 ? 's' : ''} applied successfully`;
    announceFilterChange(message, true);
  }, 100);
}
</script>

<template>
  <!-- Live region for screen reader announcements -->
  <div
    ref="liveRegion"
    :id="liveRegionId"
    aria-live="polite"
    aria-atomic="true"
    class="sr-only"
  ></div>
  
  <!-- Filter description for screen readers -->
  <div :id="descriptionId" class="sr-only">
    Date filter widget. Use arrow keys to navigate options when expanded. 
    Press Enter or Space to select options.
  </div>
  
  <div v-bind="filterAriaAttrs" @keydown="handleDropdownKeydown">
    <BExpandableContainer
      v-model="isExpanded"
      :disabled="disabled"
      :required="required"
      :absolute="absolute"
      :label-value="labelValue"
      :is-error="isError"
      :error-message="errorMessage"
      :align-right="alignRight"
      :id="filterTriggerId"
      v-bind="triggerAriaAttrs"
      hide-arrow
      @update:modelValue="emit('update:expanded', isExpanded)"
    >
      <div
        class="flex items-center text-lg h-xl text-neutral-interaction-default"
        :class="{
          'text-primary-interaction-default': isExpanded,
          'text-danger-interaction-default': isError,
          'opacity-50': currentLoadingState !== 'idle',
        }"
        aria-hidden="true"
      >
        <BIcon 
          :name="currentLoadingState === 'loading' ? 'hourglass_empty' : 'calendar_month'" 
          size="lg" 
        />
      </div>
      <h5 
        class="whitespace-nowrap" 
        :class="{ 
          'font-bold': isExpanded,
          'opacity-70': currentLoadingState !== 'idle' 
        }"
      >
        <span
          v-if="formatedDate || options.find((o: DateOption) => o.value == optionSelected)?.label"
        >
          {{
            formatedDate ||
            options.find((o: DateOption) => o.value == optionSelected)?.label
          }}
        </span>
        <slot v-else />
        
        <!-- Loading indicator for screen readers -->
        <span v-if="currentLoadingState !== 'idle'" class="sr-only">
          , {{ currentLoadingState }}
        </span>
      </h5>
      <template #content>
        <div class="flex">
          <div
            class="flex flex-col justify-between border-r-xxs border-neutral-default w-fit truncate rounded-l-sm overflow-hidden p-xs"
          >
            <div 
              class="flex flex-col"
              v-bind="optionsListAriaAttrs"
              role="listbox"
            >
              <Option
                v-for="(option, index) in options"
                :key="index"
                ref="optionElements"
                class="px-xs py-sm"
                :class="{
                  'ring-2 ring-primary-border-default ring-offset-1': activeIndex === index,
                  'focus:ring-2 focus:ring-primary-border-default focus:ring-offset-1': true,
                }"
                :selected="optionSelected == option.value"
                :disabled="option.disabled"
                role="option"
                :id="`${optionsListId}-option-${index}`"
                :aria-selected="optionSelected == option.value"
                :aria-disabled="option.disabled"
                :aria-posinset="index + 1"
                :aria-setsize="options.length"
                tabindex="-1"
                @click="changeDate(option)"
                @keydown.enter.prevent="changeDate(option)"
                @keydown.space.prevent="changeDate(option)"
              >
                {{ option.label }}
                <span v-if="optionSelected == option.value" class="sr-only">
                  , selected
                </span>
              </Option>
            </div>
            <div class="px-xs py-sm">
              <BCheckbox
                v-model="isMulti"
                :aria-label="`Compare two periods. Currently ${isMulti ? 'enabled' : 'disabled'}`"
                @update:modelValue="(value: boolean) => {
                  emit('update:isCompare', value);
                  optionSelected = '';
                  announceComparisonModeChange(value);
                }"
              >
                <slot name="compare-text"> Compare two periods </slot>
              </BCheckbox>
            </div>
          </div>
        <div class="flex flex-col items-end gap-base relative overflow-hidden">
          <BDateComparator
            class="px-sm pt-xxs"
            v-model="model"
            :lang="lang"
            :is-compare="isMulti"
            :max-init="maxInit"
            :max-end="maxEnd"
            @update:model-value="setFormatedDate(false)"
          />
          <div
            class="flex items-center justify-end gap-xs w-full border-t-xxs border-neutral-default p-sm"
            role="group"
            aria-label="Filter actions"
          >
            <slot name="actions">
              <BButton
                size="small"
                variant="plain"
                v-bind="clearButtonAriaAttrs"
                :disabled="currentLoadingState !== 'idle' || getActiveFilterCount() === 0"
                @click="clear"
              >
                <slot name="clear-text"> Clear </slot>
                <span v-if="currentLoadingState === 'clearing'" class="sr-only">
                  , clearing filters
                </span>
              </BButton>
              <BButton
                size="small"
                v-bind="applyButtonAriaAttrs"
                :disabled="currentLoadingState !== 'idle'"
                @click="applyFilters"
              >
                <slot name="apply-text"> Apply </slot>
                <span v-if="currentLoadingState === 'applying'" class="sr-only">
                  , applying filters
                </span>
              </BButton>
            </slot>
          </div>
        </div>
      </div>
      </template>
    </BExpandableContainer>
  </div>
</template>
