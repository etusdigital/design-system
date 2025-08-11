<script setup lang="ts">
import Slider from '../../utils/components/Slider.vue';
import { ref, watch, computed } from 'vue';
import { useAriaAttributes, useScreenReader } from '#composables';

/**
 * Configuration for range slider steps
 * Can be either a simple numeric array for equal step values
 * or an array of objects with custom step values
 */
export interface SliderStep {
  /** The step value as a percentage (0-1) */
  value: number;
  /** Optional label for the step */
  label?: string;
}

/**
 * Color configuration for range slider fills
 * Supports CSS color strings (hex, rgb, hsl, named colors)
 */
export type SliderFillColor = string;

/**
 * Range values for the slider
 * Always contains exactly 2 numbers representing min and max values
 */
export type RangeSliderValue = [number, number];

/**
 * Accessibility configuration for range slider
 */
export interface RangeSliderAccessibilityConfig {
  /** Custom ARIA label for the entire range slider */
  ariaLabel?: string;
  /** Custom ARIA description for the range slider */
  ariaDescription?: string;
  /** ARIA label for the minimum handle */
  minHandleLabel?: string;
  /** ARIA label for the maximum handle */
  maxHandleLabel?: string;
  /** Whether to announce range changes (default: true) */
  announceChanges?: boolean;
  /** Custom format function for value announcements */
  valueFormatter?: (value: number, unit: string) => string;
  /** Instructions text for screen readers */
  instructions?: string;
  /** Whether to use live regions for announcements (default: true) */
  useLiveRegions?: boolean;
}

/**
 * Props for the BRangeSlider component
 */
export interface BRangeSliderProps {
  /** Current range values [min, max] */
  modelValue?: RangeSliderValue;
  /** Size variant of the slider */
  size?: 'small' | 'medium' | 'large';
  /** Maximum value for the slider range */
  max?: number;
  /** Unit to display in tooltips (e.g., 'px', '%', 'em') */
  unit?: string;
  /** Primary color for the slider (CSS color string) */
  color?: string;
  /** Whether to show value tooltips on hover */
  showTooltip?: boolean;
  /** Whether the slider is disabled */
  disabled?: boolean;
  /** Whether to render the slider vertically */
  vertical?: boolean;
  /** Array of colors for gradient fills along the range */
  fillColors?: SliderFillColor[];
  /** Step values for the slider (can be numbers or step objects) */
  steps?: number[] | SliderStep[];
  /** Whether to use neutral background styling */
  neutralBackground?: boolean;
  /** Accessibility configuration */
  accessibility?: RangeSliderAccessibilityConfig;
  /** ARIA label for the slider group (alternative to accessibility.ariaLabel) */
  ariaLabel?: string;
  /** ARIA description for the slider group (alternative to accessibility.ariaDescription) */
  ariaDescription?: string;
}

const props = withDefaults(defineProps<BRangeSliderProps>(), {
    modelValue: undefined,
    max: 0,
    size: 'small',
    unit: '',
    color: '',
    showTooltip: false,
    disabled: false,
    vertical: false,
    neutralBackground: false,
    accessibility: () => ({}),
    ariaLabel: '',
    ariaDescription: '',
});

/**
 * Events emitted by the BRangeSlider component
 */
export interface BRangeSliderEmits {
    'update:modelValue': [value: RangeSliderValue];
}

const emit = defineEmits<BRangeSliderEmits>();

// Accessibility composables
const { useAriaId } = useAriaAttributes();
const screenReader = useScreenReader();

// Generate unique IDs for ARIA relationships
const rangeSliderid = useAriaId('range-slider');
const minSliderid = useAriaId('min-slider');
const maxSliderid = useAriaId('max-slider');
const labelId = useAriaId('range-label');

// Computed values for accessibility
const minValue = computed(() => Math.min(...model.value));
const maxValue = computed(() => Math.max(...model.value));

// Merge accessibility configuration from props
const accessibilityConfig = computed(() => ({
    announceChanges: true,
    useLiveRegions: true,
    ...props.accessibility,
    // Direct props take precedence over nested config
    ...(props.ariaLabel && { ariaLabel: props.ariaLabel }),
    ...(props.ariaDescription && { ariaDescription: props.ariaDescription }),
}));

// Default value formatter
const defaultValueFormatter = (value: number, unit: string): string => {
    return `${value.toFixed(1)}${unit}`;
};

const valueFormatter = computed(() => 
    accessibilityConfig.value.valueFormatter || defaultValueFormatter
);

const computedAriaLabel = computed(() => {
    if (accessibilityConfig.value.ariaLabel) {
        return accessibilityConfig.value.ariaLabel;
    }
    
    const unit = props.max ? props.unit : props.unit || '%';
    const actualMin = props.max ? minValue.value : minValue.value * 100;
    const actualMax = props.max ? maxValue.value : maxValue.value * 100;
    
    return `Range slider: ${valueFormatter.value(actualMin, unit)} to ${valueFormatter.value(actualMax, unit)}`;
});

const computedAriaDescription = computed(() => {
    if (accessibilityConfig.value.ariaDescription) {
        return accessibilityConfig.value.ariaDescription;
    }
    
    if (accessibilityConfig.value.instructions) {
        return accessibilityConfig.value.instructions;
    }
    
    let desc = 'Dual handle range slider. ';
    if (props.disabled) {
        desc += 'Currently disabled. ';
    } else {
        desc += 'Use arrow keys to adjust values. ';
        desc += 'Tab to switch between minimum and maximum handles. ';
        desc += 'Home and End keys jump to minimum and maximum values. ';
        if (props.steps) desc += 'Values snap to predefined steps. ';
    }
    return desc;
});

// Handle labels with accessibility config support
const minHandleLabel = computed(() => {
    const config = accessibilityConfig.value;
    if (config.minHandleLabel) return config.minHandleLabel;
    
    const unit = props.max ? props.unit : props.unit || '%';
    const actualMin = props.max ? minValue.value : minValue.value * 100;
    return `Minimum value: ${valueFormatter.value(actualMin, unit)}`;
});

const maxHandleLabel = computed(() => {
    const config = accessibilityConfig.value;
    if (config.maxHandleLabel) return config.maxHandleLabel;
    
    const unit = props.max ? props.unit : props.unit || '%';
    const actualMax = props.max ? maxValue.value : maxValue.value * 100;
    return `Maximum value: ${valueFormatter.value(actualMax, unit)}`;
});

watch(() => props.modelValue, () => {
    updateModel(props.modelValue || [0, 0], false);
});

const model = ref<RangeSliderValue>(props.modelValue || [0, 0]);

/**
 * Validates range values to prevent handle overlap
 * @param value - The range value to validate
 * @returns Validated range value
 */
function validateRangeValue(value: RangeSliderValue): RangeSliderValue {
    const [min, max] = value;
    
    // Ensure min <= max
    if (min > max) {
        // Swap values if they're crossed
        return [max, min];
    }
    
    return value;
}

/**
 * Updates the internal model value and optionally emits the change
 * @param value - The new range value [min, max]
 * @param emitValue - Whether to emit the update event (defaults to true)
 */
function updateModel(value: RangeSliderValue, emitValue = true): void {
    const previousValue = [...model.value];
    const validatedValue = validateRangeValue(value);
    model.value = validatedValue;
    
    if (emitValue) emit('update:modelValue', validatedValue);
    
    // Announce changes to screen readers if enabled
    if (emitValue && !props.disabled && accessibilityConfig.value.announceChanges) {
        const unit = props.max ? props.unit : props.unit || '%';
        const actualMin = props.max ? Math.min(...validatedValue) : Math.min(...validatedValue) * 100;
        const actualMax = props.max ? Math.max(...validatedValue) : Math.max(...validatedValue) * 100;
        
        // Check what changed
        const prevMin = props.max ? Math.min(...previousValue) : Math.min(...previousValue) * 100;
        const prevMax = props.max ? Math.max(...previousValue) : Math.max(...previousValue) * 100;
        
        const minChanged = Math.abs(actualMin - prevMin) > 0.1;
        const maxChanged = Math.abs(actualMax - prevMax) > 0.1;
        
        if (minChanged && maxChanged) {
            // Both changed - announce the full range
            const minText = valueFormatter.value(actualMin, unit);
            const maxText = valueFormatter.value(actualMax, unit);
            screenReader.announcePolitely(`Range updated: ${minText} to ${maxText}`);
        } else if (minChanged) {
            const minText = valueFormatter.value(actualMin, unit);
            screenReader.announcePolitely(`Minimum: ${minText}`);
        } else if (maxChanged) {
            const maxText = valueFormatter.value(actualMax, unit);
            screenReader.announcePolitely(`Maximum: ${maxText}`);
        }
        
        // Check for overlap and announce if resolved
        if (value[0] > value[1]) {
            screenReader.announcePolitely('Handle positions corrected to maintain valid range');
        }
    }
}
</script>

<template>
    <div 
        role="group"
        :aria-labelledby="labelId"
        :aria-describedby="`${rangeSliderid}-desc`"
        class="range-slider-container">
        
        <!-- Hidden label for screen readers -->
        <div :id="labelId" class="sr-only">
            {{ computedAriaLabel }}
        </div>
        <div :id="`${rangeSliderid}-desc`" class="sr-only">
            {{ computedAriaDescription }}
        </div>
        
        <Slider
            class="b-range-slider"
            v-model="model"
            :size="size"
            :show-tooltip="showTooltip"
            :disabled="disabled"
            :vertical="vertical"
            :max="max"
            :unit="unit"
            :color="color"
            :fill-colors="fillColors"
            :steps="steps"
            :neutral-background="neutralBackground"
            :aria-label="computedAriaLabel"
            :min-slider-id="minSliderid"
            :max-slider-id="maxSliderid"
            :min-handle-label="minHandleLabel"
            :max-handle-label="maxHandleLabel"
            :accessibility-config="accessibilityConfig"
            is-range
            @update:model-value="(value: number[]) => updateModel(value as RangeSliderValue)"
        />
    </div>
</template>

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

.range-slider-container {
    position: relative;
}
</style>
