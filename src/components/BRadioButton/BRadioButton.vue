<script setup lang="ts">
	import { watch, inject, computed } from "vue";
	import type { GroupState } from "../BGroup";
	import { useOptionalModel } from "#composables";

	const props = withDefaults(
		defineProps<{
			modelValue?: boolean;
			id?: string;
			name?: string;
			groupValue?: any;
			disabled?: boolean;
			isDiv?: boolean;
		}>(),
		{
			modelValue: undefined,
			disabled: false,
		}
	);

	const emit = defineEmits<{
		"update:modelValue": [value: boolean];
	}>();

	const [model] = useOptionalModel<boolean>(props, "modelValue", emit, false);
	const groupState = inject<GroupState | null>("groupState", null);

	watch(model, (cur) => {
		if (cur && groupState && props.groupValue !== undefined) {
			groupState.select(props.groupValue);
		}
	});

	watch(
		() => groupState?.selected,
		(cur) => {
			if (cur && groupState && props.groupValue !== undefined) {
				model.value = cur == props.groupValue;
			}
		}
	);

	const isDisabled = computed((): boolean => {
		if (groupState) return groupState.disabled || props.disabled;
		return props.disabled;
	});

	function toggle() {
		if (isDisabled.value) return;
		model.value = true;
	}
</script>

<template>
	<div
		:id="id"
		:name="name || id"
		role="radio"
		:aria-checked="model"
		:aria-disabled="isDisabled"
		class="bg-neutral-surface-default text-xs relative inline-flex min-h-[3em] min-w-[10em] cursor-pointer items-center justify-center py-base px-2xl font-bold tracking-wider uppercase select-none leading-xs border-xxs border-current text-neutral-interaction-default"
		:class="[
			isDiv ? 'b-radio-div' : 'b-radio-button',
			{ active: model, disabled: isDisabled },
		]"
		tabindex="0"
		@click="toggle"
		@keyup.space="toggle">
		<slot />
	</div>
</template>

<style scoped>
	@reference "../../assets/main.css";

	.active {
		/* Presumindo que border-primary-interaction-default pode falhar aqui também */
		background-color: var(--color-primary-interaction-default);
		color: var(--color-neutral-foreground-negative);
		border-color: var(--color-primary-interaction-default);
	}

	.b-radio-div {
		border-color: var(--color-neutral-border-default);
		color: var(--color-neutral-interaction-default);
		@apply py-xs px-base min-w-[8em];
		border-radius: var(--rounded-base);
	}

	.b-radio-div > :first-child {
		color: var(--color-neutral-interaction-default);
		border-color: var(--color-neutral-border-default);
	}

	.b-radio-div.active {
		background-color: var(--color-primary-surface-highlight);
		color: var(--color-primary-interaction-default);
		border-color: var(--color-primary-interaction-default);
	}

	.b-radio-div.active > :first-child {
		color: var(--color-primary-interaction-default);
		border-color: var(--color-primary-interaction-default);
	}

	*.disabled {
		color: var(--color-neutral-interaction-disabled);
		background-color: var(--color-neutral-surface-disabled);
		border-color: var(--color-neutral-border-disabled);
		@apply pointer-events-none;
	}
</style>
