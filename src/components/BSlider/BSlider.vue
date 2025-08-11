<script setup lang="ts">
import Slider from '../../utils/components/Slider.vue';
import { ref, watch, computed } from 'vue';
import { useAriaAttributes, useScreenReader } from '#composables';

/**
 * Slider size options
 */
type SliderSize = 'small' | 'medium' | 'large';

/**
 * Fill color configuration for gradient fills
 */
interface FillColor {
	color: string;
	percentage: number;
}

/**
 * Step configuration for discrete slider values
 */
interface SliderStep {
	value: number;
	label?: string;
}

/**
 * Accessibility configuration options
 */
export interface BSliderAccessibilityConfig {
    /** ARIA label for the slider */
    ariaLabel?: string;
    /** Additional description for screen readers */
    ariaDescription?: string;
    /** Custom value text format function */
    ariaValueText?: (value: number) => string;
    /** Whether to announce value changes immediately */
    announceValueChanges?: boolean;
    /** Custom keyboard step size */
    keyboardStep?: number;
    /** Whether to announce step information */
    announceSteps?: boolean;
    /** Error message for invalid values */
    errorMessage?: string;
    /** Whether the slider is required in a form */
    required?: boolean;
    /** Form field name for error announcements */
    fieldName?: string;
}

/**
 * Props for the BSlider component
 */
export interface BSliderProps {
    /** Current slider value */
    modelValue?: number;
    /** Size variant of the slider */
    size?: SliderSize;
    /** Maximum value for the slider */
    max?: number;
    /** Minimum value for the slider (defaults to 0) */
    min?: number;
    /** Unit to display in tooltips (e.g., 'px', '%', 'em') */
    unit?: string;
    /** Primary color for the slider (CSS color string) */
    color?: string;
    /** Whether to show value tooltip on hover */
    showTooltip?: boolean;
    /** Whether the slider is disabled */
    disabled?: boolean;
    /** Whether to render the slider vertically */
    vertical?: boolean;
    /** Array of fill colors for gradient display */
    fillColors?: FillColor[];
    /** Step values for the slider */
    steps?: SliderStep[];
    /** Whether to use neutral background styling */
    neutralBackground?: boolean;
    /** ARIA label for the slider */
    ariaLabel?: string;
    /** Additional description for screen readers */
    ariaDescription?: string;
    /** Custom value text format function */
    ariaValueText?: (value: number) => string;
    /** Whether to announce value changes immediately */
    announceValueChanges?: boolean;
    /** Custom keyboard step size */
    keyboardStep?: number;
    /** Whether the slider is in an invalid state */
    invalid?: boolean;
    /** Error message for screen readers */
    errorMessage?: string;
    /** Whether the slider is required in a form */
    required?: boolean;
    /** Form field name for accessibility */
    fieldName?: string;
    /** ID attribute for the slider */
    id?: string;
    /** Label ID for aria-labelledby */
    labelId?: string;
    /** Description ID for aria-describedby */
    descriptionId?: string;
}

const props = withDefaults(defineProps<BSliderProps>(), {
    modelValue: 0,
    max: 100,
    min: 0,
    size: 'small',
    unit: '',
    color: '',
    showTooltip: false,
    disabled: false,
    vertical: false,
    neutralBackground: false,
    ariaLabel: '',
    ariaDescription: '',
    announceValueChanges: true,
    keyboardStep: 1,
    invalid: false,
    errorMessage: '',
    required: false,
    fieldName: '',
    id: '',
    labelId: '',
    descriptionId: '',
});

/**
 * Events emitted by the BSlider component
 */
export interface BSliderEmits {
    'update:modelValue': [value: number];
    /** Emitted when the slider value changes for accessibility tracking */
    'value-change': [value: number, formattedValue: string];
    /** Emitted when the slider gains focus */
    'focus': [event: FocusEvent];
    /** Emitted when the slider loses focus */
    'blur': [event: FocusEvent];
    /** Emitted when validation state changes */
    'validation-change': [isValid: boolean, errorMessage?: string];
}

const emit = defineEmits<BSliderEmits>();

// Accessibility composables
const { useAriaId } = useAriaAttributes();
const screenReader = useScreenReader();

// Generate unique IDs for ARIA relationships
const sliderId = computed(() => props.id || useAriaId('slider'));
const labelId = computed(() => props.labelId || useAriaId('slider-label'));
const descId = computed(() => props.descriptionId || useAriaId('slider-desc'));
const errorId = useAriaId('slider-error');
const instructionsId = useAriaId('slider-instructions');

// Form validation state
const isValid = computed(() => !props.invalid && !props.errorMessage);
const actualMin = computed(() => props.min);
const actualMax = computed(() => props.max);
const actualValue = computed(() => {
    const value = model.value[0] || 0;
    return Math.max(actualMin.value, Math.min(actualMax.value, value));
});

// Step calculation for keyboard navigation
const keyboardStepSize = computed(() => {
    if (props.keyboardStep) return props.keyboardStep;
    if (props.steps && props.steps.length > 1) {
        const stepValues = props.steps.map(step => step.value).sort((a, b) => a - b);
        let minDiff = actualMax.value - actualMin.value;
        for (let i = 1; i < stepValues.length; i++) {
            const diff = stepValues[i] - stepValues[i - 1];
            if (diff > 0) minDiff = Math.min(minDiff, diff);
        }
        return minDiff;
    }
    return (actualMax.value - actualMin.value) / 100; // 1% of range as default
});

// Current value as percentage for internal calculations
const valueAsPercentage = computed(() => {
    const range = actualMax.value - actualMin.value;
    return range === 0 ? 0 : (actualValue.value - actualMin.value) / range;
});

// Computed accessibility properties
const ariaLabel = computed(() => {
    if (props.ariaLabel) return props.ariaLabel;
    
    const fieldName = props.fieldName || 'Slider';
    const formattedValue = formatValueForDisplay(actualValue.value);
    return `${fieldName}, current value: ${formattedValue}`;
});

const ariaValueText = computed(() => {
    if (props.ariaValueText) {
        return props.ariaValueText(actualValue.value);
    }
    return formatValueForDisplay(actualValue.value);
});

const ariaDescription = computed(() => {
    let desc = props.ariaDescription || '';
    
    if (!desc) {
        desc = 'Use arrow keys to adjust value. ';
        desc += 'Home key jumps to minimum, End key jumps to maximum. ';
        desc += 'Page Up and Page Down keys make larger adjustments. ';
        if (props.steps && props.steps.length > 0) {
            desc += 'Values snap to predefined steps. ';
        }
    }
    
    if (props.disabled) {
        desc += ' Currently disabled.';
    }
    
    if (props.required) {
        desc += ' Required field.';
    }
    
    return desc;
});

const ariaInvalid = computed(() => {
    return props.invalid || !!props.errorMessage;
});

const ariaDescribedBy = computed(() => {
    const ids = [descId.value, instructionsId];
    if (props.errorMessage) ids.push(errorId);
    return ids.join(' ');
});

// Helper function to format values for display
function formatValueForDisplay(value: number): string {
    const unit = props.unit || '';
    const formattedNumber = Number(value.toFixed(2));
    return `${formattedNumber}${unit}`;
}

// Helper function to get step label if available
function getStepLabel(value: number): string | undefined {
    if (!props.steps) return undefined;
    const step = props.steps.find(s => Math.abs(s.value - value) < 0.001);
    return step?.label;
}

// Watch for external model changes
watch(() => props.modelValue, (newValue) => {
    const safeValue = Math.max(actualMin.value, Math.min(actualMax.value, newValue || 0));
    updateModel([safeValue], false);
});

// Watch for validation state changes
watch([() => props.invalid, () => props.errorMessage], ([invalid, errorMessage]) => {
    if (invalid || errorMessage) {
        emit('validation-change', false, errorMessage);
        if (props.announceValueChanges && errorMessage) {
            const fieldName = props.fieldName || 'Slider';
            screenReader.announceAssertively(`Error in ${fieldName}: ${errorMessage}`);
        }
    } else {
        emit('validation-change', true);
    }
});

const model = ref([props.modelValue || 0]);

// Convert FillColor[] to string[] for the Slider component
const computedFillColors = computed((): string[] | undefined => {
    return props.fillColors ? props.fillColors.map(fillColor => fillColor.color) : undefined;
});

/**
 * Updates the internal model value and optionally emits the change
 * @param value - The new slider value as an array (for compatibility with Slider utility)
 * @param emitValue - Whether to emit the update event (defaults to true)
 * @param source - Source of the change ('keyboard', 'mouse', 'programmatic')
 */
function updateModel(value: number[], emitValue = true, source: 'keyboard' | 'mouse' | 'programmatic' = 'programmatic'): void {
    const previousValue = model.value[0];
    const newValue = Math.max(actualMin.value, Math.min(actualMax.value, value[0] || 0));
    
    model.value = [newValue];
    
    if (emitValue && newValue !== previousValue) {
        emit('update:modelValue', newValue);
        const formattedValue = formatValueForDisplay(newValue);
        emit('value-change', newValue, formattedValue);
        
        // Announce value changes to screen readers
        if (!props.disabled && props.announceValueChanges) {
            const stepLabel = getStepLabel(newValue);
            let announcement = formattedValue;
            
            if (stepLabel) {
                announcement = `${stepLabel}, ${formattedValue}`;
            }
            
            // Use different politeness based on interaction type
            if (source === 'keyboard') {
                screenReader.announcePolitely(announcement);
            } else {
                // Slight delay for mouse interactions to avoid spam
                setTimeout(() => {
                    screenReader.announcePolitely(announcement);
                }, 100);
            }
        }
    }
}

/**
 * Handles focus events
 */
function handleFocus(event: FocusEvent): void {
    emit('focus', event);
    
    if (props.announceValueChanges) {
        const formattedValue = formatValueForDisplay(actualValue.value);
        const fieldName = props.fieldName || 'Slider';
        const range = `from ${formatValueForDisplay(actualMin.value)} to ${formatValueForDisplay(actualMax.value)}`;
        
        let announcement = `${fieldName} ${formattedValue}, range ${range}`;
        if (props.required) announcement += ', required';
        if (props.disabled) announcement += ', disabled';
        
        screenReader.announcePolitely(announcement);
    }
}

/**
 * Handles blur events
 */
function handleBlur(event: FocusEvent): void {
    emit('blur', event);
}

/**
 * Handles keyboard navigation
 */
function handleKeyDown(event: KeyboardEvent): void {
    if (props.disabled) return;
    
    const currentValue = actualValue.value;
    let newValue = currentValue;
    const step = keyboardStepSize.value;
    const largeStep = step * 10; // Page Up/Down use 10x step
    
    let handled = true;
    
    switch (event.key) {
        case 'ArrowRight':
        case 'ArrowUp':
            newValue = Math.min(actualMax.value, currentValue + step);
            break;
        case 'ArrowLeft':
        case 'ArrowDown':
            newValue = Math.max(actualMin.value, currentValue - step);
            break;
        case 'Home':
            newValue = actualMin.value;
            break;
        case 'End':
            newValue = actualMax.value;
            break;
        case 'PageUp':
            newValue = Math.min(actualMax.value, currentValue + largeStep);
            break;
        case 'PageDown':
            newValue = Math.max(actualMin.value, currentValue - largeStep);
            break;
        default:
            handled = false;
    }
    
    if (handled) {
        event.preventDefault();
        event.stopPropagation();
        
        // Snap to steps if defined
        if (props.steps && props.steps.length > 0) {
            const stepValues = props.steps.map(s => s.value);
            newValue = stepValues.reduce((prev, curr) => 
                Math.abs(curr - newValue) < Math.abs(prev - newValue) ? curr : prev
            );
        }
        
        if (newValue !== currentValue) {
            updateModel([newValue], true, 'keyboard');
        }
    }
}
</script>

<style scoped>
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

.slider-container {
    position: relative;
    width: 100%;
}

.slider-container.slider-vertical {
    height: 100%;
    min-height: 200px;
}

.b-slider {
    position: relative;
    outline: none;
    border-radius: var(--rounded-base);
}

.b-slider:focus {
    outline: 2px solid var(--primary-interaction-default);
    outline-offset: 2px;
}

.b-slider:focus-visible {
    outline: 2px solid var(--primary-interaction-default);
    outline-offset: 2px;
    box-shadow: 0 0 0 4px rgba(var(--primary-rgb), 0.2);
}

.slider-container.slider-invalid .b-slider {
    border-color: var(--danger-interaction-default);
}

.slider-container.slider-invalid .b-slider:focus {
    outline-color: var(--danger-interaction-default);
    box-shadow: 0 0 0 4px rgba(var(--danger-rgb), 0.2);
}

.slider-container.slider-disabled .b-slider {
    opacity: 0.6;
    cursor: not-allowed;
}

.slider-container.slider-disabled .b-slider:focus {
    outline: 1px solid var(--neutral-border-default);
    box-shadow: none;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
    .b-slider:focus {
        outline-width: 3px;
        outline-style: solid;
    }
    
    .slider-container.slider-invalid .b-slider:focus {
        outline-width: 3px;
        outline-style: solid;
    }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
    .b-slider,
    .b-slider * {
        transition: none !important;
        animation: none !important;
    }
}

/* Touch target sizing for mobile accessibility */
@media (hover: none) and (pointer: coarse) {
    .b-slider {
        min-height: 44px; /* Minimum touch target size */
        min-width: 44px;
    }
    
    .slider-container.slider-vertical .b-slider {
        min-width: 44px;
        min-height: 200px;
    }
}
</style>

<template>
    <div 
        class="slider-container"
        :class="{
            'slider-invalid': ariaInvalid,
            'slider-disabled': disabled,
            'slider-required': required,
            'slider-vertical': vertical
        }"
        role="group"
        :aria-labelledby="labelId"
        :aria-describedby="ariaDescribedBy">
        
        <!-- Hidden label for screen readers -->
        <div :id="labelId" class="sr-only">
            {{ props.fieldName || 'Slider' }}: {{ ariaValueText }}
        </div>
        
        <!-- Instructions for screen readers -->
        <div :id="instructionsId" class="sr-only">
            {{ ariaDescription }}
        </div>
        
        <!-- Error message for screen readers -->
        <div 
            v-if="props.errorMessage" 
            :id="errorId" 
            class="sr-only" 
            role="alert" 
            aria-live="assertive">
            {{ props.errorMessage }}
        </div>
        
        <!-- Main slider with enhanced accessibility -->
        <div
            :id="sliderId"
            class="b-slider"
            role="slider"
            :aria-label="ariaLabel"
            :aria-valuemin="actualMin"
            :aria-valuemax="actualMax"
            :aria-valuenow="actualValue"
            :aria-valuetext="ariaValueText"
            :aria-orientation="vertical ? 'vertical' : 'horizontal'"
            :aria-disabled="disabled"
            :aria-required="required"
            :aria-invalid="ariaInvalid"
            :aria-describedby="ariaDescribedBy"
            tabindex="0"
            @keydown="handleKeyDown"
            @focus="handleFocus"
            @blur="handleBlur">
            
            <Slider
                v-model="model"
                :size="size"
                :show-tooltip="showTooltip"
                :disabled="disabled"
                :vertical="vertical"
                :max="actualMax"
                :min="actualMin"
                :unit="unit"
                :color="color"
                :fill-colors="computedFillColors"
                :steps="steps"
                :neutral-background="neutralBackground"
                :aria-label="ariaLabel"
                :min-slider-id="sliderId"
                :is-range="false"
                @update:model-value="(value) => updateModel(value, true, 'mouse')"
            />
        </div>
        
        <!-- Live region for value announcements -->
        <div 
            aria-live="polite" 
            aria-atomic="true" 
            class="sr-only">
            <!-- This will be populated by screen reader announcements -->
        </div>
    </div>
</template>

