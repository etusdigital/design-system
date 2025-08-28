<script setup lang="ts">
import { reactive, watch, provide } from 'vue';
import type { GroupState } from './Group.types';

interface GroupProps {
	modelValue?: any;
	vertical?: boolean;
	disabled?: boolean;
}

const props = withDefaults(defineProps<GroupProps>(), {
	modelValue: null,
	vertical: false,
	disabled: false,
});

const emit = defineEmits<{
	'update:modelValue': [value: any];
}>();

const groupState = reactive<GroupState>({
	selected: props.modelValue,
	get disabled(): boolean {
		return props.disabled;
	},

	select: updateSelection,
});

watch(
	() => props.modelValue,
	(cur) => (groupState.selected = cur)
);

provide<GroupState>('groupState', groupState);

function updateSelection(value: any) {
	groupState.selected = value;
	emit('update:modelValue', value);
}
</script>

<template>
	<div class="group inline-flex" :class="[vertical ? 'vert' : 'hor items-end']">
		<slot />
	</div>
</template>

<style scoped>
@reference "../../assets/main.css";

.vert {
	@apply flex-col;
}

.group.hor :slotted(.radio) {
	@apply ml-sm first:ml-none;
}
.group.vert :slotted(.radio) {
	@apply mt-sm first:mt-none;
}

.group.hor :slotted(.radio-button) {
	@apply border-r-0 first:rounded-l-sm last:rounded-r-sm last:border-r-xxs;
}
.group.vert :slotted(.radio-button) {
	@apply border-none first:rounded-t-sm last:rounded-sm last:border-xxs;
}

.group.hor :slotted(.radio-button) {
	@apply border-r-none first:rounded-l-sm last:rounded-r-sm last:border-r-xxs;
}
.group.vert :slotted(.radio-button) {
	@apply border-none first:rounded-t-sm last:rounded-sm last:border-xxs;
}

.group.hor :slotted(.radio-div) {
	@apply ml-xs first:ml-none;
}
.group.vert :slotted(.radio-div) {
	@apply mt-xs first:mt-none;
}

.group.hor > :slotted(:not(.radio-button):not(.radio):not(.radio-div)):not(:last-child) {
	@apply relative mr-base after:border-t-xxs after:w-base after:border-neutral-default after:absolute after:bottom-base after:-right-base;
}

.group.hor > :slotted(:not(.radio-button):not(.radio):not(.radio-div)) {
	div {
		@apply z-[1];
	}
}

.group.vert > :slotted(:not(.radio-button):not(.radio):not(.radio-div)):not(:last-child) {
	@apply relative m-base after:h-base after:border-r-xxs after:border-neutral-default after:absolute after:left-[50%] after:translate-x-[-50%] after:-bottom-base;
}
</style>
