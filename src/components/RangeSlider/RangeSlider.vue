<script setup lang="ts">
import Slider from '../../utils/components/Slider.vue';
import { ref, watch } from 'vue';

const props = withDefaults(defineProps<{
    modelValue?: number[];
    size?: 'small' | 'medium' | 'large';
    max?: number;
    unit?: string;
    color?: string;
    showTooltip?: boolean;
    disabled?: boolean;
    vertical?: boolean;
    fillColors?: any[];
    steps?: any;
    neutralBackground?: boolean;
}>(), {
    modelValue: undefined,
    max: 0,
    size: 'small',
    unit: '',
    color: '',
    showTooltip: false,
    disabled: false,
    vertical: false,
    neutralBackground: false,
});

const emit = defineEmits<{
    'update:modelValue': [value: number[]];
}>();

watch(() => props.modelValue, () => {
    updateModel(props.modelValue || [0, 0], false);
});

const model = ref(props.modelValue || [0, 0]);

function updateModel(value: number[], emitValue = true) {
    model.value = value;
    if (emitValue) emit('update:modelValue', value)
}
</script>

<template>
    <Slider
        class="range-slider"
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
        is-range
        @update:model-value="updateModel"
    />
</template>
