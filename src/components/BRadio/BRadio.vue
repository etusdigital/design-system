<script setup lang="ts">
	import { watch, inject, computed } from "vue";
	import type { GroupState } from "../BGroup";
	import { useOptionalModel } from "#composables";

	type Varinat = "default" | "onboarding";

	const props = withDefaults(
		defineProps<{
			modelValue?: boolean;
			id?: string;
			name?: string;
			groupValue?: any;
			disabled?: boolean;
			variant?: Varinat;
		}>(),
		{
			modelValue: undefined,
			disabled: false,
			variant: "default",
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

	const isDisabled = computed(
		(): boolean => groupState?.disabled || props.disabled
	);

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
		class="b-radio"
		:class="[variant, { disabled: isDisabled, active: model }]"
		@click="toggle">
		<span
			tabindex="0"
			class="out-circle"
			@keyup.space="toggle">
			<span class="inside-circle" />
		</span>
		<template v-if="$slots.default">
			<label
				v-if="name || id"
				:for="name || id"
				class="radio-label cursor-[inherit]">
				<slot />
			</label>
			<div
				v-else
				class="radio-text">
				<slot />
			</div>
		</template>
	</div>
</template>

<style scoped>
	@reference "../../assets/main.css";

	.b-radio {
		@apply inline-flex gap-xs items-center text-xs cursor-pointer text-primary-interaction-default;
	}

	.b-radio.active {
		@apply text-primary-interaction-selected;

		.out-circle {
			@apply border-current;
		}

		.inside-circle {
			@apply scale-100;
		}
	}

	.b-radio.disabled {
		@apply pointer-events-none;

		.out-circle {
			@apply text-neutral-interaction-disabled;
		}

		.radio-label,
		.radio-text {
			@apply text-neutral-interaction-disabled;
		}
	}

	.b-radio.onboarding {
		.out-circle {
			@apply text-xl;
		}

		.radio-label,
		.radio-text {
			@apply text-sm;
		}
	}

	.out-circle {
		background-color: var(--color-neutral-surface-default);
		border-color: var(--color-neutral-border-default);
		@apply inline-flex justify-center items-center box-border w-[1em] h-[1em] border-xxs rounded-full text-base;
	}

	.inside-circle {
		@apply inline-block w-[.5em] h-[.5em] scale-0 rounded-full bg-current transition-transform ease-out;
	}

	.radio-label,
	.radio-text {
		@apply text-neutral-interaction-default text-xs;
	}
</style>
