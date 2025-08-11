<script setup lang="ts">
import { ref, watch, onBeforeMount, computed, nextTick, onMounted } from 'vue';
import Calendar from '../../utils/components/Calendar.vue';
import BIcon from '../BIcon/BIcon.vue';
import { useAriaAttributes, useScreenReader, useKeyboardNavigation } from '../../composables';
import type { 
  BDateComparatorProps, 
  BDateComparatorEmits,
  BDateComparatorModelValue,
  ComparisonOperator,
  ValidationState,
  ComparisonResult,
  OperatorOption,
  AccessibilityConfig,
  KeyboardNavigationState,
  FocusManagement
} from './BDateComparator.types';

const props = withDefaults(defineProps<BDateComparatorProps>(), {
    lang: 'en-US',
    isCompare: false,
    operator: 'between',
    disabled: false,
    required: false,
    invalid: false,
    announceResults: true,
    showFocusIndicators: true,
    reduceMotion: false,
    highContrast: false,
    screenReaderDateFormat: () => ({
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }),
});

const emit = defineEmits<BDateComparatorEmits>();

const selectedDate = ref<BDateComparatorModelValue>(props.isCompare ? [[], []] : []);
const operator = ref<ComparisonOperator>(props.operator || 'between');
const showOperatorDropdown = ref(false);
const isKeyboardMode = ref(false);
const fieldsetRef = ref<HTMLFieldSetElement | null>(null);
const operatorButtonRef = ref<HTMLButtonElement | null>(null);

const initialDates = ref([
    {
        date: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        value: 1,
    },
    {
        date: new Date(),
        value: -1,
    },
]);

// Accessibility composables
const { useAriaId } = useAriaAttributes();
const screenReader = useScreenReader();

// Generate unique IDs for accessibility
const fieldsetId = useAriaId('date-comparator');
const legendId = useAriaId('date-comparator-legend');
const operatorId = useAriaId('operator');
const operatorListId = useAriaId('operator-list');
const instructionsId = useAriaId('instructions');
const errorId = useAriaId('error');
const firstCalendarId = useAriaId('first-calendar');
const secondCalendarId = useAriaId('second-calendar');

// Validation state
const validation = ref<ValidationState>({
    isValid: true,
    errors: []
});

// Keyboard navigation state
const keyboardState = ref<KeyboardNavigationState>({
    currentFocus: 'operator',
    operatorExpanded: false,
    activeOperatorIndex: 0,
    keyboardMode: false
});

// Accessibility configuration
const accessibilityConfig: AccessibilityConfig = {
    legendText: props.isCompare ? 'Date Range Comparison' : 'Date Range Selection',
    keyboardInstructions: 'Use Tab to navigate between controls. Use arrow keys within calendars. Press Enter or Space to select dates.',
    screenReaderInstructions: 'This is a date comparator widget. Navigate between controls using Tab. Select dates using Enter or Space.',
    operatorInstructions: 'Select a comparison operator from the dropdown.',
    errorAnnouncements: {
        required: 'Date selection is required',
        invalidRange: 'Invalid date range selected',
        maxDateExceeded: 'Selected date exceeds maximum allowed date',
        invalidComparison: 'Invalid date comparison'
    },
    successAnnouncements: {
        rangeSelected: 'Date range selected',
        comparisonComplete: 'Date comparison completed',
        operatorChanged: 'Comparison operator changed'
    },
    operatorLabels: {
        equals: { 
            value: 'equals', 
            label: 'Equals', 
            accessibleLabel: 'Date equals comparison',
            description: 'Compare if dates are equal'
        },
        before: { 
            value: 'before', 
            label: 'Before', 
            accessibleLabel: 'Date before comparison',
            description: 'Compare if dates are before'
        },
        after: { 
            value: 'after', 
            label: 'After', 
            accessibleLabel: 'Date after comparison',
            description: 'Compare if dates are after'
        },
        between: { 
            value: 'between', 
            label: 'Between', 
            accessibleLabel: 'Date between comparison',
            description: 'Compare if dates are between range'
        },
        'not-between': { 
            value: 'not-between', 
            label: 'Not Between', 
            accessibleLabel: 'Date not between comparison',
            description: 'Compare if dates are not between range'
        }
    }
};

// Available operators
const operators = computed<OperatorOption[]>(() => 
    Object.values(accessibilityConfig.operatorLabels)
);

// Current operator option
const currentOperator = computed<OperatorOption>(() => 
    accessibilityConfig.operatorLabels[operator.value]
);

// Keyboard navigation for operators
const { activeIndex: activeOperatorIndex, handleKeydown: handleOperatorKeydown } = useKeyboardNavigation(
    operators,
    (selectedOperator: OperatorOption) => {
        selectOperator(selectedOperator.value);
        showOperatorDropdown.value = false;
    },
    { horizontal: false, loop: true }
);

onMounted(() => {
    checkValidModel();
    // Set initial focus if needed
    if (props['aria-label'] || props.accessibleName) {
        announceComponentReady();
    }
});

onBeforeMount(() => {
    checkValidModel();
});

watch(() => props.modelValue, () => {
    checkValidModel();
    validateSelection();
});

watch(() => props.isCompare, () => {
    checkCompare();
    emit('update:modelValue', selectedDate.value);
    if (props.announceResults) {
        const modeText = props.isCompare ? 'comparison mode' : 'single range mode';
        screenReader.announcePolitely(`Switched to ${modeText}`);
    }
});

watch(() => props.operator, (newOperator) => {
    if (newOperator && newOperator !== operator.value) {
        operator.value = newOperator;
    }
});

watch(operator, (newOperator) => {
    emit('update:operator', newOperator);
    if (props.announceResults) {
        const operatorLabel = accessibilityConfig.operatorLabels[newOperator];
        screenReader.announcePolitely(
            `${accessibilityConfig.successAnnouncements.operatorChanged}: ${operatorLabel.accessibleLabel}`
        );
    }
});

// Watch for validation errors
watch(() => props.error, (newError) => {
    if (newError) {
        validation.value.isValid = false;
        validation.value.errors = Array.isArray(newError) ? newError : [newError];
        announceValidationError(validation.value.errors[0]);
    } else {
        validation.value.isValid = true;
        validation.value.errors = [];
    }
});

// Computed properties for accessibility
const fieldsetAria = computed(() => ({
    id: fieldsetId,
    role: 'group',
    'aria-labelledby': props['aria-labelledby'] || legendId,
    'aria-describedby': [instructionsId, errorId, props['aria-describedby']]
        .filter(Boolean)
        .join(' ') || undefined,
    'aria-invalid': props.invalid || !validation.value.isValid,
    'aria-required': props.required,
    'aria-disabled': props.disabled
}));

const operatorAria = computed(() => ({
    id: operatorId,
    role: 'combobox',
    'aria-expanded': showOperatorDropdown.value,
    'aria-haspopup': 'listbox' as const,
    'aria-controls': operatorListId,
    'aria-activedescendant': showOperatorDropdown.value 
        ? `${operatorListId}-${activeOperatorIndex.value}` 
        : undefined,
    'aria-label': props.accessibleName || 'Select comparison operator',
    'aria-describedby': accessibilityConfig.operatorInstructions,
    'aria-required': props.required,
    'aria-invalid': !validation.value.isValid,
    tabindex: props.disabled ? -1 : 0
}));

const calendarAria = computed(() => [
    {
        id: firstCalendarId,
        'aria-label': props.isCompare ? 'First date range for comparison' : 'Date range selection',
        'aria-describedby': instructionsId,
        tabindex: 0
    },
    ...(props.isCompare ? [{
        id: secondCalendarId,
        'aria-label': 'Second date range for comparison',
        'aria-describedby': instructionsId,
        tabindex: 0
    }] : [])
]);

// Error message computation
const errorMessage = computed(() => {
    if (validation.value.errors.length > 0) {
        return validation.value.errors[0];
    }
    return props.error ? (Array.isArray(props.error) ? props.error[0] : props.error) : '';
});

// Instructions text computation
const instructionsText = computed(() => {
    return props.instructions || 
        (props.isCompare 
            ? 'Select date ranges for comparison. Use Tab to navigate between controls and calendars.'
            : 'Select a date range. Use Tab to navigate and arrow keys within the calendar.');
});

function checkValidModel() {
    if(props.modelValue) {
        selectedDate.value = props.modelValue;
    } else {
        checkCompare();
    }
}

function checkCompare() {
    if(props.isCompare) {
        selectedDate.value = [[], []];
    } else {
        selectedDate.value = [];
    }
}

/**
 * Validates the current selection
 */
function validateSelection(): ValidationState {
    const errors: string[] = [];
    
    // Check required
    if (props.required && (!selectedDate.value || selectedDate.value.length === 0)) {
        errors.push(accessibilityConfig.errorAnnouncements.required);
    }
    
    // Check date range validity
    if (Array.isArray(selectedDate.value) && selectedDate.value.length > 0) {
        if (Array.isArray(selectedDate.value[0])) {
            // Date[][] - comparison mode
            const ranges = selectedDate.value as Date[][];
            for (const range of ranges) {
                if (range.length === 2 && range[0] > range[1]) {
                    errors.push(accessibilityConfig.errorAnnouncements.invalidRange);
                    break;
                }
            }
        } else {
            // Date[] - single range
            const range = selectedDate.value as Date[];
            if (range.length === 2 && range[0] > range[1]) {
                errors.push(accessibilityConfig.errorAnnouncements.invalidRange);
            }
        }
    }
    
    // Check max dates
    const checkMaxDate = (date: Date) => {
        if (props.maxInit && date <= props.maxInit) return true;
        if (props.maxEnd && date >= props.maxEnd) return true;
        return false;
    };
    
    if (Array.isArray(selectedDate.value) && selectedDate.value.length > 0) {
        const flatDates = Array.isArray(selectedDate.value[0]) 
            ? (selectedDate.value as Date[][]).flat()
            : selectedDate.value as Date[];
            
        if (flatDates.some(checkMaxDate)) {
            errors.push(accessibilityConfig.errorAnnouncements.maxDateExceeded);
        }
    }
    
    validation.value = {
        isValid: errors.length === 0,
        errors
    };
    
    emit('validation-change', validation.value);
    return validation.value;
}

/**
 * Handles date selection from calendar
 */
function selectDate(date: BDateComparatorModelValue){
    if (!Array.isArray(date)) return;

    selectedDate.value = date;
    emit('update:modelValue', selectedDate.value);
    
    // Determine range index for comparison mode
    let rangeIndex: number | undefined = undefined;
    if (props.isCompare && Array.isArray(selectedDate.value[0])) {
        const ranges = selectedDate.value as Date[][];
        // Find which range was updated (simple heuristic: first non-empty or last updated)
        for (let i = 0; i < ranges.length; i++) {
            if (ranges[i].length > 0) {
                rangeIndex = i;
                break;
            }
        }
    }
    
    emit('date-selected', date as Date[], rangeIndex);
    
    // Validate the new selection
    const validationResult = validateSelection();
    
    if (props.announceResults && validationResult.isValid) {
        announceRangeSelection(date as Date[], rangeIndex);
        
        // If in comparison mode and both ranges are selected, announce completion
        if (props.isCompare && Array.isArray(selectedDate.value[0]) && 
            (selectedDate.value as Date[][]).every(range => range.length > 0)) {
            announceComparisonComplete();
        }
    }
}

/**
 * Selects a comparison operator
 */
function selectOperator(newOperator: ComparisonOperator) {
    operator.value = newOperator;
    showOperatorDropdown.value = false;
    
    // Focus back to operator button after selection
    nextTick(() => {
        operatorButtonRef.value?.focus();
    });
}

/**
 * Toggles operator dropdown
 */
function toggleOperatorDropdown() {
    if (props.disabled) return;
    
    showOperatorDropdown.value = !showOperatorDropdown.value;
    keyboardState.value.operatorExpanded = showOperatorDropdown.value;
    
    if (showOperatorDropdown.value) {
        // Find current operator index
        const currentIndex = operators.value.findIndex(op => op.value === operator.value);
        activeOperatorIndex.value = Math.max(0, currentIndex);
        
        if (props.announceResults) {
            screenReader.announcePolitely('Operator selection opened');
        }
    }
}

/**
 * Handles keyboard events for the component
 */
function handleComponentKeydown(event: KeyboardEvent) {
    // Enable keyboard mode
    isKeyboardMode.value = true;
    keyboardState.value.keyboardMode = true;
    
    // Handle global component shortcuts
    switch (event.key) {
        case 'Escape':
            if (showOperatorDropdown.value) {
                event.preventDefault();
                showOperatorDropdown.value = false;
                keyboardState.value.operatorExpanded = false;
                operatorButtonRef.value?.focus();
            }
            break;
            
        case 'Tab':
            // Let natural tab behavior handle focus management
            break;
    }
}

/**
 * Handles operator dropdown keydown events
 */
function handleOperatorDropdownKeydown(event: KeyboardEvent) {
    if (!showOperatorDropdown.value) return;
    
    const handled = handleOperatorKeydown(event);
    
    if (!handled) {
        switch (event.key) {
            case 'Escape':
                event.preventDefault();
                showOperatorDropdown.value = false;
                keyboardState.value.operatorExpanded = false;
                operatorButtonRef.value?.focus();
                break;
        }
    }
}

/**
 * Announces component ready state
 */
function announceComponentReady() {
    const componentName = props.accessibleName || 
        (props.isCompare ? 'Date Range Comparator' : 'Date Range Selector');
    
    screenReader.announcePolitely(
        `${componentName} ready. ${accessibilityConfig.screenReaderInstructions}`
    );
}

/**
 * Announces range selection to screen readers
 */
function announceRangeSelection(dates: Date[], rangeIndex?: number) {
    if (!props.announceResults || dates.length === 0) return;
    
    const formatDate = (date: Date) => 
        date.toLocaleDateString(props.lang, props.screenReaderDateFormat);
    
    let message = '';
    
    if (dates.length === 1) {
        message = `Selected date: ${formatDate(dates[0])}`;
    } else if (dates.length === 2) {
        message = `Selected date range: ${formatDate(dates[0])} to ${formatDate(dates[1])}`;
    }
    
    if (props.isCompare && typeof rangeIndex === 'number') {
        message = `${rangeIndex === 0 ? 'First' : 'Second'} ${message.toLowerCase()}`;
    }
    
    screenReader.announcePolitely(message);
}

/**
 * Announces comparison completion
 */
function announceComparisonComplete() {
    if (!props.announceResults || !props.isCompare) return;
    
    const ranges = selectedDate.value as Date[][];
    const formatDate = (date: Date) => 
        date.toLocaleDateString(props.lang, props.screenReaderDateFormat);
    
    const firstRangeText = ranges[0].length === 1 
        ? formatDate(ranges[0][0])
        : `${formatDate(ranges[0][0])} to ${formatDate(ranges[0][1])}`;
    
    const secondRangeText = ranges[1].length === 1
        ? formatDate(ranges[1][0])
        : `${formatDate(ranges[1][0])} to ${formatDate(ranges[1][1])}`;
    
    const operatorLabel = currentOperator.value.accessibleLabel;
    
    const comparisonResult: ComparisonResult = {
        operator: operator.value,
        firstRange: ranges[0],
        secondRange: ranges[1],
        isValid: validation.value.isValid,
        description: `Comparing ${firstRangeText} ${operatorLabel} ${secondRangeText}`,
        accessibleDescription: `Date comparison: ${firstRangeText} ${operatorLabel} ${secondRangeText}`
    };
    
    emit('comparison-complete', comparisonResult);
    screenReader.announcePolitely(comparisonResult.accessibleDescription);
}

/**
 * Announces validation errors
 */
function announceValidationError(errorMessage: string) {
    screenReader.announceAssertively(`Error: ${errorMessage}`);
}

/**
 * Handles focus events
 */
function handleFocus(event: FocusEvent) {
    emit('focus', event);
}

/**
 * Handles blur events
 */
function handleBlur(event: FocusEvent) {
    // Reset keyboard mode after a delay to allow for focus changes within component
    setTimeout(() => {
        if (!fieldsetRef.value?.contains(document.activeElement)) {
            isKeyboardMode.value = false;
            keyboardState.value.keyboardMode = false;
        }
    }, 100);
    
    emit('blur', event);
}

/**
 * Resets mouse interaction mode
 */
function handleMouseInteraction() {
    isKeyboardMode.value = false;
    keyboardState.value.keyboardMode = false;
}
</script>

<template>
    <fieldset 
        ref="fieldsetRef"
        v-bind="fieldsetAria"
        :class="[
            'b-date-comparator',
            'border-neutral-border-default border-xxs',
            'rounded-base p-base',
            'focus-within:ring-2 focus-within:ring-primary-interaction-default',
            { 
                'opacity-50 cursor-not-allowed': disabled,
                'border-danger-border-default': invalid || !validation.isValid,
                'high-contrast': highContrast,
                'reduce-motion': reduceMotion
            }
        ]"
        :disabled="disabled"
        @keydown="handleComponentKeydown"
        @focus="handleFocus"
        @blur="handleBlur"
        @mousedown="handleMouseInteraction"
        @click="handleMouseInteraction">
        
        <!-- Legend -->
        <legend 
            :id="legendId"
            class="text-base font-medium text-neutral-foreground-high px-xs">
            {{ accessibleName || accessibilityConfig.legendText }}
            <span v-if="required" class="text-danger-foreground-default ml-xxs" aria-label="required">*</span>
        </legend>
        
        <!-- Instructions for screen readers -->
        <div 
            :id="instructionsId" 
            class="sr-only">
            {{ instructionsText }}
        </div>
        
        <!-- Comparison operator selection (only in compare mode) -->
        <div 
            v-if="isCompare" 
            class="mb-base relative">
            <label 
                :for="operatorId"
                class="block text-sm font-medium text-neutral-foreground-high mb-xs">
                Comparison Type
            </label>
            
            <div class="relative">
                <button
                    ref="operatorButtonRef"
                    v-bind="operatorAria"
                    :class="[
                        'w-full px-base py-sm',
                        'border-neutral-border-default border-xxs rounded-base',
                        'bg-neutral-surface-default',
                        'text-left text-neutral-foreground-high',
                        'hover:bg-neutral-surface-hover hover:border-neutral-border-hover',
                        'focus:outline-none focus:ring-2 focus:ring-primary-interaction-default',
                        'disabled:opacity-50 disabled:cursor-not-allowed',
                        {
                            'border-primary-border-default': showOperatorDropdown,
                            'keyboard-focus': isKeyboardMode && keyboardState.currentFocus === 'operator'
                        }
                    ]"
                    type="button"
                    :disabled="disabled"
                    @click="toggleOperatorDropdown"
                    @keydown.enter.space="toggleOperatorDropdown"
                    @keydown="handleOperatorDropdownKeydown">
                    {{ currentOperator.label }}
                    <BIcon 
                        name="expand_more" 
                        :class="[
                            'absolute right-sm top-1/2 transform -translate-y-1/2',
                            'transition-transform duration-200',
                            { 'rotate-180': showOperatorDropdown }
                        ]"
                        aria-hidden="true" />
                </button>
                
                <!-- Operator dropdown -->
                <Transition name="dropdown">
                    <ul
                        v-if="showOperatorDropdown"
                        :id="operatorListId"
                        role="listbox"
                        :aria-labelledby="operatorId"
                        class="absolute z-10 w-full mt-xs bg-neutral-surface-default border-neutral-border-default border-xxs rounded-base shadow-lg max-h-48 overflow-auto">
                        <li
                            v-for="(option, index) in operators"
                            :key="option.value"
                            :id="`${operatorListId}-${index}`"
                            role="option"
                            :aria-selected="option.value === operator"
                            :class="[
                                'px-base py-sm cursor-pointer',
                                'hover:bg-neutral-surface-hover',
                                'focus:bg-neutral-surface-hover focus:outline-none',
                                {
                                    'bg-primary-surface-default text-primary-foreground-default': option.value === operator,
                                    'bg-neutral-surface-hover': activeOperatorIndex === index && showOperatorDropdown
                                }
                            ]"
                            @click="selectOperator(option.value)"
                            @keydown.enter.space="selectOperator(option.value)">
                            <div class="font-medium">{{ option.label }}</div>
                            <div class="text-xs text-neutral-foreground-low mt-xxs">{{ option.description }}</div>
                        </li>
                    </ul>
                </Transition>
            </div>
        </div>
        
        <!-- Date range calendars -->
        <div 
            :class="[
                'flex gap-base',
                { 'flex-col sm:flex-row': isCompare }
            ]">
            <div 
                v-for="(calendarProps, index) in calendarAria"
                :key="index"
                :class="[
                    'flex-1',
                    { 'border-neutral-border-default border-xxs rounded-base p-sm': isCompare }
                ]">
                <div 
                    v-if="isCompare" 
                    class="text-sm font-medium text-neutral-foreground-high mb-xs">
                    {{ index === 0 ? 'First Range' : 'Second Range' }}
                </div>
                
                <Calendar
                    v-model="selectedDate"
                    v-bind="calendarProps"
                    :initial-dates="initialDates"
                    :is-compare="isCompare"
                    :lang="lang"
                    :max-init="maxInit"
                    :max-end="maxEnd"
                    :class="{
                        'keyboard-focus': isKeyboardMode && 
                            ((index === 0 && keyboardState.currentFocus === 'first-range') ||
                             (index === 1 && keyboardState.currentFocus === 'second-range'))
                    }"
                    @update:model-value="selectDate"
                    @focus="keyboardState.currentFocus = index === 0 ? 'first-range' : 'second-range'"
                />
            </div>
        </div>
        
        <!-- Error messages -->
        <div 
            v-if="errorMessage"
            :id="errorId"
            role="alert"
            class="mt-xs text-sm text-danger-foreground-default">
            <BIcon name="error" class="inline mr-xxs" aria-hidden="true" />
            {{ errorMessage }}
        </div>
        
        <!-- Live region for screen reader announcements -->
        <div 
            aria-live="polite" 
            aria-atomic="true" 
            class="sr-only">
            <!-- This will be populated by screen reader announcements -->
        </div>
        
    </fieldset>
</template>

<style scoped>
@import "../../assets/main.css";

.b-date-comparator {
    @apply relative;
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

/* Focus indicators for keyboard navigation */
.keyboard-focus {
    outline: 2px solid var(--primary-interaction-default);
    outline-offset: 2px;
}

/* High contrast mode support */
.high-contrast {
    @apply border-2;
}

.high-contrast .keyboard-focus {
    outline: 3px solid;
    outline-color: Highlight;
}

/* Reduced motion support */
.reduce-motion * {
    transition: none !important;
    animation: none !important;
}

/* Dropdown transitions */
.dropdown-enter-active,
.dropdown-leave-active {
    transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
    opacity: 0;
    transform: translateY(-4px);
}

.reduce-motion .dropdown-enter-active,
.reduce-motion .dropdown-leave-active {
    transition: none;
}

/* Focus styles */
fieldset:focus-within {
    outline: none;
}

button:focus {
    outline: 2px solid var(--primary-interaction-default);
    outline-offset: 1px;
}

/* Disabled state */
fieldset[disabled] {
    pointer-events: none;
}

/* Error state */
.border-danger-border-default {
    border-color: var(--danger-border-default);
}

/* Operator dropdown styling */
[role="listbox"] {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

[role="option"][aria-selected="true"] {
    background-color: var(--primary-surface-default);
    color: var(--primary-foreground-default);
}

/* Calendar container spacing */
.flex > .flex-1 + .flex-1 {
    margin-top: 1rem;
}

@media (min-width: 640px) {
    .flex-col.sm\:flex-row > .flex-1 + .flex-1 {
        margin-top: 0;
        margin-left: 1rem;
    }
}
</style>
