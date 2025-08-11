<script setup lang="ts">
import { ref, watch, onBeforeMount, computed, onMounted, onUnmounted, nextTick } from 'vue';
import Calendar from '../../utils/components/Calendar.vue';
import { useAriaAttributes, useScreenReader } from '#composables';
import type { 
    BDateProps, 
    BDateEmits, 
    BDateFormat, 
    BDateSelectionEvent,
    BDateKeyboardEvent,
    BDateSelectionMode,
    RelativeTimeUnit,
    BDateAccessibilityConfig,
    BDateAnnouncementConfig,
    BDateTimezoneConfig,
    BDateLocaleConfig,
    defaultBDateAccessibilityConfig,
    defaultBDateAnnouncementConfig
} from './BDate.types';

const props = withDefaults(defineProps<BDateProps>(), {
    lang: 'en-US',
    isPeriod: false,
    format: 'medium' as BDateFormat,
    selectionMode: 'single' as BDateSelectionMode,
    showRelativeTime: false,
    autoUpdateRelativeTime: false,
    relativeTimeUpdateInterval: 60000, // 1 minute
    useTimeElement: true,
    liveRegionPoliteness: 'polite',
    screenReaderInstructions: 'Use arrow keys to navigate dates. Enter or Space to select. Page Up/Page Down to change months. Home/End for first/last day of month.',
    accessibilityConfig: () => defaultBDateAccessibilityConfig,
    announcementConfig: () => defaultBDateAnnouncementConfig,
    keyboardConfig: () => ({
        enableArrowKeys: true,
        enablePageKeys: true,
        enableHomeEndKeys: true,
        enableEscapeKey: true,
        customKeyBindings: {},
    }),
});

const emit = defineEmits<BDateEmits>();

// Accessibility composables
const { useAriaId } = useAriaAttributes();
const screenReader = useScreenReader();

// Component state
const selectedDate = ref<Date[]>([]);
const initialDates = ref([{ date: new Date() }]);
const relativeTimeInterval = ref<NodeJS.Timeout | null>(null);
const currentRelativeTime = ref<string>('');
const isKeyboardMode = ref(false);
const hasErrors = ref(false);
const isLoading = ref(false);

// ARIA IDs
const dateId = useAriaId('date');
const timeId = useAriaId('time');
const descriptionId = useAriaId('date-description');
const instructionsId = useAriaId('date-instructions');
const errorId = useAriaId('date-error');

// Computed properties for accessibility
const accessibilityState = computed(() => ({
    currentFormat: props.format || 'medium',
    relativeTime: currentRelativeTime.value,
    timezone: props.timezoneConfig?.timezone,
    locale: props.lang || 'en-US',
    isKeyboardMode: isKeyboardMode.value,
    hasErrors: hasErrors.value || props.error || false,
    isLoading: isLoading.value || props.loading || false,
}));

const currentDateValue = computed(() => {
    if (!selectedDate.value.length) return null;
    return props.isPeriod ? selectedDate.value : selectedDate.value[0];
});

const formattedDate = computed(() => {
    const date = currentDateValue.value;
    if (!date) return '';
    
    if (Array.isArray(date)) {
        // Handle date range
        const [start, end] = date;
        if (!start) return '';
        
        const startFormatted = formatAccessibleDate(start);
        const endFormatted = end ? formatAccessibleDate(end) : '';
        
        return endFormatted ? `${startFormatted} to ${endFormatted}` : startFormatted;
    }
    
    return formatAccessibleDate(date);
});

const datetimeAttribute = computed(() => {
    if (props.datetime) return props.datetime;
    
    const date = currentDateValue.value;
    if (!date) return undefined;
    
    if (Array.isArray(date)) {
        return date[0]?.toISOString();
    }
    
    return date.toISOString();
});

const ariaAttributes = computed(() => ({
    id: dateId,
    'aria-label': props.ariaLabel || `Date selection: ${formattedDate.value}`,
    'aria-describedby': [
        props.ariaDescribedBy,
        descriptionId,
        instructionsId,
        accessibilityState.value.hasErrors ? errorId : null,
    ].filter(Boolean).join(' '),
    'aria-required': props.required ? 'true' : undefined,
    'aria-disabled': props.disabled ? 'true' : undefined,
    'aria-readonly': props.readonly ? 'true' : undefined,
    'aria-invalid': accessibilityState.value.hasErrors ? 'true' : undefined,
    'aria-busy': accessibilityState.value.isLoading ? 'true' : undefined,
}));

const timeElementAttributes = computed(() => ({
    ...props.timeAttributes,
    id: timeId,
    datetime: datetimeAttribute.value,
    'aria-label': props.ariaLabel || `Date: ${formattedDate.value}`,
}));

// Date formatting with accessibility considerations
function formatAccessibleDate(date: Date, format?: BDateFormat): string {
    const targetFormat = format || props.format || 'medium';
    const locale = props.localeConfig?.locale || props.lang || 'en-US';
    const timezone = props.timezoneConfig?.timezone;
    
    const options: Intl.DateTimeFormatOptions = { timeZone: timezone };
    
    switch (targetFormat) {
        case 'full':
            options.dateStyle = 'full';
            break;
        case 'long':
            options.dateStyle = 'long';
            break;
        case 'medium':
            options.dateStyle = 'medium';
            break;
        case 'short':
            options.dateStyle = 'short';
            break;
        case 'time':
            options.timeStyle = 'short';
            break;
        case 'datetime':
            options.dateStyle = 'medium';
            options.timeStyle = 'short';
            break;
        case 'relative':
            return getRelativeTime(date);
        case 'custom':
            return props.customFormat ? formatCustomDate(date, props.customFormat) : date.toLocaleDateString(locale, options);
        default:
            options.dateStyle = 'medium';
    }
    
    try {
        return date.toLocaleDateString(locale, options);
    } catch (error) {
        console.warn('BDate: Invalid date formatting options, falling back to default', error);
        return date.toLocaleDateString(locale);
    }
}

function formatCustomDate(date: Date, format: string): string {
    // Simple custom format implementation
    // This could be enhanced with a more robust formatting library
    return format
        .replace('YYYY', date.getFullYear().toString())
        .replace('MM', (date.getMonth() + 1).toString().padStart(2, '0'))
        .replace('DD', date.getDate().toString().padStart(2, '0'));
}

function getRelativeTime(date: Date, relativeTo?: Date): string {
    const reference = relativeTo || props.relativeTo || new Date();
    const diffMs = date.getTime() - reference.getTime();
    const absDiffMs = Math.abs(diffMs);
    
    const units: Array<[RelativeTimeUnit, number]> = [
        ['year', 365 * 24 * 60 * 60 * 1000],
        ['month', 30 * 24 * 60 * 60 * 1000],
        ['week', 7 * 24 * 60 * 60 * 1000],
        ['day', 24 * 60 * 60 * 1000],
        ['hour', 60 * 60 * 1000],
        ['minute', 60 * 1000],
        ['second', 1000],
    ];
    
    for (const [unit, ms] of units) {
        if (absDiffMs >= ms) {
            const value = Math.floor(absDiffMs / ms);
            const isNegative = diffMs < 0;
            
            if (props.announcementConfig?.customAnnouncements?.relativeTime) {
                return props.announcementConfig.customAnnouncements.relativeTime(
                    isNegative ? -value : value, 
                    unit
                );
            }
            
            const suffix = isNegative ? 'ago' : 'from now';
            const pluralUnit = value !== 1 ? `${unit}s` : unit;
            return `${value} ${pluralUnit} ${suffix}`;
        }
    }
    
    return 'now';
}

// Screen reader announcements
function announceDateSelection(date: Date | Date[], viaKeyboard = false): void {
    if (!props.announcementConfig?.announceFormatChanges) return;
    
    let message: string;
    
    if (Array.isArray(date)) {
        const [start, end] = date;
        if (props.announcementConfig.customAnnouncements?.rangeSelected && end) {
            message = props.announcementConfig.customAnnouncements.rangeSelected(start, end);
        } else {
            const startFormatted = formatAccessibleDate(start);
            const endFormatted = end ? formatAccessibleDate(end) : '';
            message = endFormatted ? 
                `Selected date range from ${startFormatted} to ${endFormatted}` :
                `Selected start date ${startFormatted}`;
        }
    } else {
        if (props.announcementConfig.customAnnouncements?.dateSelected) {
            message = props.announcementConfig.customAnnouncements.dateSelected(date);
        } else {
            const formatted = formatAccessibleDate(date);
            const relativeTime = props.showRelativeTime ? ` (${getRelativeTime(date)})` : '';
            message = `Selected ${formatted}${relativeTime}`;
        }
    }
    
    screenReader.announcePolitely(message);
    
    // Emit accessibility event
    emit('accessibilityAnnouncement', message, 'polite');
}

function announceFormatChange(format: BDateFormat): void {
    if (!props.announcementConfig?.announceFormatChanges) return;
    
    const message = `Date format changed to ${format}`;
    screenReader.announcePolitely(message);
    emit('accessibilityAnnouncement', message, 'polite');
}

function announceTimezoneChange(timezone: string): void {
    if (!props.announcementConfig?.announceTimezone) return;
    
    const message = `Timezone changed to ${timezone}`;
    screenReader.announcePolitely(message);
    emit('accessibilityAnnouncement', message, 'polite');
}

function announceLocaleChange(locale: string): void {
    if (!props.announcementConfig?.announceLocale) return;
    
    const message = `Language changed to ${locale}`;
    screenReader.announcePolitely(message);
    emit('accessibilityAnnouncement', message, 'polite');
}

function updateRelativeTime(): void {
    if (!props.showRelativeTime || !currentDateValue.value) return;
    
    const date = Array.isArray(currentDateValue.value) ? currentDateValue.value[0] : currentDateValue.value;
    if (!date) return;
    
    const newRelativeTime = getRelativeTime(date);
    if (newRelativeTime !== currentRelativeTime.value) {
        currentRelativeTime.value = newRelativeTime;
        
        if (props.announcementConfig?.announceRelativeTime) {
            screenReader.announcePolitely(`Time updated: ${newRelativeTime}`);
        }
        
        emit('relativeTimeUpdated', newRelativeTime);
    }
}

function startAutoUpdate(): void {
    if (!props.autoUpdateRelativeTime || relativeTimeInterval.value) return;
    
    relativeTimeInterval.value = setInterval(
        updateRelativeTime,
        props.relativeTimeUpdateInterval
    );
}

function stopAutoUpdate(): void {
    if (relativeTimeInterval.value) {
        clearInterval(relativeTimeInterval.value);
        relativeTimeInterval.value = null;
    }
}

// Original component logic with accessibility enhancements
onBeforeMount(checkIsArray);

watch(() => props.modelValue, checkIsArray);
watch(() => props.isPeriod, () => {
    selectedDate.value = [];
    if (props.isPeriod && props.announcementConfig?.announceFormatChanges) {
        screenReader.announcePolitely('Date range selection mode enabled');
    }
});

watch(() => props.format, (newFormat) => {
    if (newFormat) {
        announceFormatChange(newFormat);
        emit('formatChanged', newFormat);
    }
});

watch(() => props.timezoneConfig?.timezone, (newTimezone) => {
    if (newTimezone) {
        announceTimezoneChange(newTimezone);
        emit('timezoneChanged', newTimezone);
    }
});

watch(() => props.lang, (newLocale) => {
    if (newLocale) {
        announceLocaleChange(newLocale);
        emit('localeChanged', newLocale);
    }
});

watch(() => props.error, (hasError) => {
    hasErrors.value = hasError || false;
    if (hasError && props.errorMessage) {
        screenReader.announceAssertively(`Error: ${props.errorMessage}`);
    }
});

watch(() => props.loading, (loading) => {
    isLoading.value = loading || false;
    if (loading && props.loadingMessage) {
        screenReader.announcePolitely(props.loadingMessage);
    }
});

onMounted(() => {
    if (props.showRelativeTime) {
        updateRelativeTime();
        if (props.autoUpdateRelativeTime) {
            startAutoUpdate();
        }
    }
});

onUnmounted(() => {
    stopAutoUpdate();
});

function checkIsArray() {
    if (Array.isArray(props.modelValue)) {
        selectedDate.value = props.modelValue;
    } else {
        if (props.modelValue) {
            selectedDate.value[0] = props.modelValue;
        }
    }
}

function selectDate(date: Date[] | Date[][]){
    const isKeyboardSelection = isKeyboardMode.value;
    
    if (props.isPeriod) {
        emit('update:modelValue', selectedDate.value);
        
        // Create selection event
        const selectionEvent: BDateSelectionEvent = {
            date: selectedDate.value,
            mode: 'range',
            viaKeyboard: isKeyboardSelection,
            formatted: formattedDate.value,
            relativeTime: props.showRelativeTime ? currentRelativeTime.value : undefined,
            context: props.dateContext,
        };
        
        emit('dateSelected', selectionEvent);
        announceDateSelection(selectedDate.value, isKeyboardSelection);
    } else {
        let finalDate: Date;
        
        // Handle the case where date might be Date[][]
        if (Array.isArray(date) && Array.isArray(date[0])) {
            // If it's Date[][], flatten it to Date[]
            selectedDate.value = date[0] as Date[];
            finalDate = date[0][0];
        } else {
            // It's Date[]
            selectedDate.value = date as Date[];
            finalDate = (date as Date[])[0];
        }
        
        emit('update:modelValue', finalDate);
        
        // Create selection event
        const selectionEvent: BDateSelectionEvent = {
            date: finalDate,
            mode: 'single',
            viaKeyboard: isKeyboardSelection,
            formatted: formatAccessibleDate(finalDate),
            relativeTime: props.showRelativeTime ? getRelativeTime(finalDate) : undefined,
            context: props.dateContext,
        };
        
        emit('dateSelected', selectionEvent);
        announceDateSelection(finalDate, isKeyboardSelection);
    }
    
    // Update relative time
    if (props.showRelativeTime) {
        updateRelativeTime();
    }
    
    // Reset keyboard mode
    isKeyboardMode.value = false;
}

// Keyboard event handler
function handleKeyboard(event: KeyboardEvent): void {
    isKeyboardMode.value = true;
    
    const keyboardEvent: BDateKeyboardEvent = {
        key: event.key,
        action: 'navigate', // Will be updated based on key
        direction: undefined,
    };
    
    switch (event.key) {
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'ArrowRight':
            keyboardEvent.direction = event.key.replace('Arrow', '').toLowerCase() as any;
            break;
        case 'Enter':
        case ' ':
            keyboardEvent.action = 'select';
            break;
        case 'Escape':
            keyboardEvent.action = 'close';
            break;
        case 'Home':
        case 'End':
        case 'PageUp':
        case 'PageDown':
            keyboardEvent.direction = event.key.toLowerCase() as any;
            keyboardEvent.action = 'changeView';
            break;
    }
    
    emit('keyboardNavigation', keyboardEvent);
}
</script>

<template>
    <div 
        class="b-date"
        :class="{
            'b-date--high-contrast': accessibilityConfig?.highContrast,
            'b-date--large-targets': accessibilityConfig?.largeTouchTargets,
            'b-date--reduced-motion': accessibilityConfig?.respectReducedMotion,
            'b-date--error': accessibilityState.hasErrors,
            'b-date--loading': accessibilityState.isLoading,
        }"
        v-bind="ariaAttributes"
        @keydown="handleKeyboard">
        
        <!-- Semantic time element for screen readers -->
        <time 
            v-if="useTimeElement && currentDateValue"
            v-bind="timeElementAttributes"
            class="b-date__time sr-only">
            {{ formattedDate }}
        </time>
        
        <!-- Visual date display with accessibility -->
        <div 
            v-if="formattedDate"
            :id="descriptionId"
            class="b-date__display"
            :class="{
                'b-date__display--relative': showRelativeTime,
            }">
            
            <!-- Main formatted date -->
            <span class="b-date__formatted">
                {{ formattedDate }}
            </span>
            
            <!-- Relative time display -->
            <span 
                v-if="showRelativeTime && currentRelativeTime"
                class="b-date__relative"
                :aria-label="`${currentRelativeTime} relative to now`">
                ({{ currentRelativeTime }})
            </span>
            
            <!-- Timezone display -->
            <span 
                v-if="timezoneConfig?.showTimezone && timezoneConfig?.timezone"
                class="b-date__timezone"
                :aria-label="`Timezone: ${timezoneConfig.timezone}`">
                {{ timezoneConfig.timezone }}
            </span>
            
            <!-- Format example -->
            <span 
                v-if="showFormatExample"
                class="b-date__format-example"
                :aria-label="`Date format example: ${formatExampleText || formattedDate}`">
                {{ formatExampleText || `Format: ${format}` }}
            </span>
        </div>
        
        <!-- Calendar widget -->
        <Calendar
            v-model="selectedDate"
            :initial-dates="initialDates"
            :is-compare="isPeriod"
            :lang="localeConfig?.locale || lang"
            :max-init="maxInit"
            :max-end="maxEnd"
            :aria-label="calendarAriaLabel || accessibilityConfig?.customAriaLabels?.calendar || 'Calendar'"
            :aria-describedby="instructionsId"
            @update:model-value="selectDate"
            @focus="(date: Date) => emit('focusChanged', date)"
            @blur="() => emit('focusChanged', null)"
        />
        
        <!-- Screen reader instructions -->
        <div 
            :id="instructionsId"
            class="sr-only"
            aria-live="polite"
            aria-atomic="true">
            {{ screenReaderInstructions }}
            <span v-if="dateContext"> Context: {{ dateContext }}</span>
            <span v-if="required"> This field is required.</span>
            <span v-if="disabled"> This field is disabled.</span>
            <span v-if="readonly"> This field is read-only.</span>
        </div>
        
        <!-- Error messages -->
        <div 
            v-if="accessibilityState.hasErrors && (errorMessage || error)"
            :id="errorId"
            class="b-date__error sr-only"
            role="alert"
            aria-live="assertive">
            {{ errorMessage || 'Invalid date selection' }}
        </div>
        
        <!-- Success messages -->
        <div 
            v-if="success && successMessage"
            class="b-date__success sr-only"
            role="alert"
            aria-live="polite">
            {{ successMessage }}
        </div>
        
        <!-- Loading state -->
        <div 
            v-if="accessibilityState.isLoading"
            class="b-date__loading sr-only"
            role="status"
            aria-live="polite">
            {{ loadingMessage || 'Loading date picker' }}
        </div>
        
        <!-- Live region for dynamic announcements -->
        <div 
            class="sr-only"
            :aria-live="liveRegionPoliteness"
            aria-atomic="true"
            aria-relevant="text">
            <!-- Content updated dynamically by screen reader announcements -->
        </div>
    </div>
</template>

<style scoped>
@import "../../assets/main.css";

.b-date {
    @apply relative;
}

.b-date__time {
    /* Semantic time element - hidden but accessible */
}

.b-date__display {
    @apply flex flex-wrap items-center gap-xs mb-sm;
    @apply text-base text-neutral-foreground-high;
}

.b-date__display--relative {
    @apply flex-col items-start;
}

.b-date__formatted {
    @apply font-medium;
}

.b-date__relative {
    @apply text-sm text-neutral-foreground-medium;
    @apply italic;
}

.b-date__timezone {
    @apply text-xs text-neutral-foreground-low;
    @apply px-xxs py-xxxs;
    @apply bg-neutral-surface-default;
    @apply rounded-sm;
}

.b-date__format-example {
    @apply text-xs text-neutral-foreground-low;
    @apply opacity-75;
}

.b-date__error {
    @apply text-danger-foreground-high;
}

.b-date__success {
    @apply text-success-foreground-high;
}

.b-date__loading {
    @apply text-neutral-foreground-medium;
}

/* Screen reader only utility class */
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

/* High contrast mode */
.b-date--high-contrast {
    @apply contrast-125;
    
    .b-date__display {
        @apply border border-neutral-border-high;
        @apply p-xs;
        @apply rounded-base;
    }
}

/* Large touch targets */
.b-date--large-targets {
    /* Increase minimum touch target size to 44px */
    button, 
    [role="button"],
    [tabindex="0"] {
        min-height: 44px;
        min-width: 44px;
    }
}

/* Reduced motion */
.b-date--reduced-motion,
.b-date--reduced-motion * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
}

/* Error state styling */
.b-date--error {
    .b-date__display {
        @apply border-danger-border-default;
        @apply text-danger-foreground-high;
    }
}

/* Loading state styling */
.b-date--loading {
    @apply opacity-75;
    @apply pointer-events-none;
}

/* Focus management */
.b-date:focus-within {
    @apply ring-2 ring-primary-interaction-default ring-offset-2;
}

/* Ensure focus visibility in high contrast mode */
.b-date--high-contrast *:focus {
    outline: 2px solid;
    outline-offset: 2px;
}

/* Responsive considerations for accessibility */
@media (prefers-reduced-motion: reduce) {
    .b-date {
        animation: none;
        transition: none;
    }
    
    .b-date * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}

@media (prefers-contrast: high) {
    .b-date {
        @apply contrast-125;
    }
    
    .b-date__display {
        @apply border border-current;
    }
}

/* Print styles for accessibility */
@media print {
    .b-date__relative,
    .b-date__timezone,
    .b-date__format-example {
        @apply hidden;
    }
    
    .b-date__formatted::after {
        content: " (" attr(data-iso-date) ")";
        font-size: 0.8em;
        opacity: 0.7;
    }
}
</style>