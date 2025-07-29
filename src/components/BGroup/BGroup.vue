<script setup lang="ts">
	import { reactive, watch, provide } from "vue";
	import type { GroupState } from "./BGroup.types";

	interface BGroupProps {
		modelValue?: any;
		vertical?: boolean;
		disabled?: boolean;
	}

	const emit = defineEmits<{
		"update:modelValue": [value: any];
	}>();

	const props = withDefaults(defineProps<BGroupProps>(), {
		modelValue: null,
		vertical: false,
		disabled: false,
	});

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

	provide<GroupState>("groupState", groupState);

	function updateSelection(value: any) {
		groupState.selected = value;
		emit("update:modelValue", value);
	}
</script>

<template>
	<div
		class="b-group inline-flex"
		:class="[vertical ? 'vert' : 'hor items-end']">
		<slot />
	</div>
</template>

<style scoped>
	@reference "../../assets/main.css";

	.vert {
		@apply flex-col;
	}

	.b-group.hor :slotted(.b-radio) {
		@apply ml-sm first:ml-0;
	}
	.b-group.vert :slotted(.b-radio) {
		@apply mt-sm first:mt-0;
	}

	.b-group.hor :slotted(.b-radio-button) {
		@apply border-r-0 first:rounded-l-sm last:rounded-r-sm last:border-r-xxs;
	}
	.b-group.vert :slotted(.b-radio-button) {
		@apply border-b-0 first:rounded-t-sm last:rounded-b-sm last:border-b-xxs;
	}

	.b-group.hor :slotted(.b-radio-button) {
		@apply border-r-0 first:rounded-l-sm last:rounded-r-sm last:border-r-xxs;
	}
	.b-group.vert :slotted(.b-radio-button) {
		@apply border-b-0 first:rounded-t-sm last:rounded-b-sm last:border-b-xxs;
	}

	.b-group.hor :slotted(.b-radio-div) {
		@apply ml-xs first:ml-0;
	}
	.b-group.vert :slotted(.b-radio-div) {
		@apply mt-xs first:mt-0;
	}

	.b-group.hor
		> :slotted(:not(.b-radio-button):not(.b-radio):not(.b-radio-div)):not(
			:last-child
		) {
		@apply relative mr-base after:border-t-xxs after:w-base after:absolute after:bottom-base after:-right-base;
		&::after {
			border-color: var(--color-neutral-border-default);
		}
	}

	.b-group.hor
		> :slotted(:not(.b-radio-button):not(.b-radio):not(.b-radio-div)) {
		div {
			@apply z-[1];
		}
	}

	.b-group.vert
		> :slotted(:not(.b-radio-button):not(.b-radio):not(.b-radio-div)):not(
			:last-child
		) {
		@apply relative mb-base after:h-base after:border-r-xxs after:absolute after:left-[50%] after:translate-x-[-50%] after:-bottom-base;
		&::after {
			border-color: var(--color-neutral-border-default);
		}
	}
</style>
