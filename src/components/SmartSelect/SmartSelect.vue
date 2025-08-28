<script setup lang="ts">
import { ref, watch, computed, onBeforeMount } from 'vue';
import { useOptionalModel } from '#composables';
import { type ContainerModelExtra } from '../../utils/components/ContainerModelExtra.types';

type SelectExpandedExtra = {
    source: ContainerModelExtra['source'] | 'value-selected';
};

const props = withDefaults(defineProps<{
    modelValue?: any;
    labelValue?: string;
    items: any[];
    icon?: string;
    expanded?: boolean;
    valueKey?: string;
    labelKey?: string;
    searchable?: boolean;
    disabled?: boolean;
    required?: boolean;
    isError?: boolean;
    isMultiple?: boolean;
    getObject?: boolean;
    errorMessage?: string;
    infoMessage?: string;
    absolute?: boolean;
    clearable?: boolean;
}>(), {
    modelValue: undefined,
    labelValue: '',
    expanded: undefined,
    valueKey: 'value',
    labelKey: 'label',
    searchable: false,
    disabled: false,
    required: false,
    isError: false,
    isMultiple: false,
    getObject: false,
    errorMessage: '',
    infoMessage: '',
    absolute: false,
    clearable: false,
});

const emit = defineEmits<{
    'update:modelValue': [value: any],
    'update:expanded': [value: boolean, extra: SelectExpandedExtra],
}>();

const model = ref<any>(null);
const [expandedModel, setExpandedModel] = useOptionalModel<boolean>(props, 'expanded', emit, false);
const component = computed((): 'MultiSelect' | 'Select' => props.isMultiple ? 'MultiSelect' : 'Select');

onBeforeMount(buildModel);

watch(() => props.modelValue, buildModel, { deep: true, immediate: true });
watch(() => props.isMultiple, () => {
    buildModel();
    updateModel();
});

function updateModel() {
    emit('update:modelValue', parseModel());
}

function updateExpanded(value: boolean, extra: SelectExpandedExtra) {
    setExpandedModel(value, extra);
}

function clearFilter() {
    if (!model.value) return;

    if (props.isMultiple) {
        model.value.forEach((item: any) => {
            item.selected = false
        })
    } else {
        model.value = null
    }
    updateModel()
}

function parseModel() {
    if (!model.value) return undefined;

    if (props.isMultiple) {
        return model.value.filter((item: any) => item.selected).map((item: any) => getItem(item));
    }
    return getItem(model.value);
}

function buildModel() {
    if (props.isMultiple) {
        const selected = props.modelValue || [];
        model.value = props.items.map((item: any) => {
            const parsedItem = typeof item == 'object' ? item : { [props.valueKey]: item, [props.labelKey]: item };
            parsedItem.selected = selected.findIndex((selected: any) => getItemValue(item) == getSelected(selected)) > -1;

            return parsedItem;
        })
    }
    else {
        model.value = props.items.find((item: any) => getItemValue(item) == getSelected(props.modelValue))
    }
}

function getItem(item: any) {
    return !props.getObject ? getItemValue(item) : item
}

function getSelected(item: any) {
    return !props.getObject ? item : getItemValue(item)
}

function getItemValue(item: any) {
    return typeof item == 'object' ? item?.[props.valueKey] : item
}
</script>

<template>
    <component
        class="smart-select"
        :is="component"
        v-model="model"
        v-model:expanded="expandedModel"
        :label-value="labelValue"
        :label-key="labelKey"
        :value-key="valueKey"
        :items="items"
        :icon="icon"
        :required="required"
        :disabled="disabled"
        :info-message="infoMessage"
        :error-message="errorMessage"
        :searchable="searchable"
        :is-error="isError"
        :absolute="absolute"
        @update:model-value="updateModel"
        @update:expanded="updateExpanded"
    >
        <slot />
        <template #search-label v-if="$slots['search-label']">
            <slot name="search-label" />
        </template>
        <template #status-label="{ selected }" v-if="isMultiple">
            <slot name="status-label" :selected="selected" v-if="$slots['status-label']">
                {{ labelValue }}
            </slot>
        </template>
        <template #status v-else-if="$slots.status">
            <slot name="status" />
        </template>
        <template #item="{ item }" v-if="$slots.item">
            <slot name="item" :item="item" />
        </template>
        <template #actions v-if="clearable">
            <Button variant="plain" size="small" @click="clearFilter">
                <slot name="clear-label">Clear</slot>
            </Button>
        </template>
    </component>
</template>