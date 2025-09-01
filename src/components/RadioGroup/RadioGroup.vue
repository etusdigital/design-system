<script setup lang="ts">
import Group from '../../utils/components/Group.vue';
import { isObject } from "../../utils";
import { ref, watch } from "vue";

const props = withDefaults(defineProps<{
	modelValue?: any;
	vertical?: boolean;
	disabled?: boolean;
	items: any[];
	labelKey?: string;
	valueKey?: string;
	getObject?: boolean;
}>(), {
	modelValue: null,
	vertical: false,
	disabled: false,
	labelKey: "label",
	valueKey: "value",
	getObject: false,
});

const emit = defineEmits<{
	'update:modelValue': [value: any];
}>();

const model = ref<any>(getValue(props.modelValue));

watch(() => props.modelValue, (newVal) => {
	model.value = getValue(newVal);
});

function setModel(value: string) {
	let valueToEmit = value;
	model.value = value;
	if (props.getObject) {
		const object = props.items.find((item: any) => getValue(item) === value);
		valueToEmit = object;
	}
	emit("update:modelValue", valueToEmit);
}

function getLabel(value: any): string {
	return isObject(value) ? value[props.labelKey] : value;
}

function getValue(item: any): any {
	return isObject(item) ? item[props.valueKey] : item;
}

function getDisabled(item: any): boolean {
	return isObject(item) ? item.disabled : false;
}

</script>

<template>
	<Group v-model="model" :vertical="vertical" :disabled="disabled" @update:model-value="setModel">
		<Radio v-for="item in items" :key="getValue(item)" :group-value="getValue(item)" :disabled="getDisabled(item)">
			{{ getLabel(item) }}
		</Radio>
	</Group>
</template>

<style scoped>
@reference "../../assets/main.css";

.group.hor :slotted(.radio) {
	@apply ml-sm first:ml-none;
}

.group.vert :slotted(.radio) {
	@apply mt-sm first:mt-none;
}

.group.hor :slotted(.toggle) {
	@apply border-r-0 first:rounded-l-sm last:rounded-r-sm last:border-r-xxs;
}

.group.vert :slotted(.toggle) {
	@apply border-none first:rounded-t-sm last:rounded-sm last:border-xxs;
}

.group.hor :slotted(.toggle) {
	@apply border-r-none first:rounded-l-sm last:rounded-r-sm last:border-r-xxs;
}

.group.vert :slotted(.toggle) {
	@apply border-none first:rounded-t-sm last:rounded-sm last:border-xxs;
}

.group.hor :slotted(.radio-div) {
	@apply ml-xs first:ml-none;
}

.group.vert :slotted(.radio-div) {
	@apply mt-xs first:mt-none;
}

.group.hor> :slotted(:not(.toggle):not(.radio):not(.radio-div)):not(:last-child) {
	@apply relative mr-base after:border-t-xxs after:w-base after:border-neutral-default after:absolute after:bottom-base after:-right-base;
}

.group.hor> :slotted(:not(.toggle):not(.radio):not(.radio-div)) {
	div {
		@apply z-[1];
	}
}

.group.vert> :slotted(:not(.toggle):not(.radio):not(.radio-div)):not(:last-child) {
	@apply relative m-base after:h-base after:border-r-xxs after:border-neutral-default after:absolute after:left-[50%] after:translate-x-[-50%] after:-bottom-base;
}
</style>
