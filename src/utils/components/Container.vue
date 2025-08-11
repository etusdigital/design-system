<script setup lang="ts">
	// @TODO: Fix the initial size of the label div. I think it's due to the dynamic loading
	// of ionicons not triggering a div resize event to the observer. Or it could be some
	// slot content shenanigans aswell, idk.
	// @TODO: Fix border width for container with sub items
	import { ref, onMounted, onUpdated, onBeforeUnmount, computed } from "vue";
	import type { BContainerModelExtra } from "./BContainerModelExtra.types";
	import { useOptionalModel } from "#composables";
	import BLabel from "./Label.vue";

	const props = withDefaults(
		defineProps<{
			modelValue?: boolean;
			labelValue?: string;
			role?: string;
			disabled?: boolean;
			isError?: boolean;
			errorMessage?: string;
			infoMessage?: string;
			required?: boolean;
			closeOnBlur?: boolean;
			hideBottom?: boolean;
			maxHeight?: string;
			minWidth?: string;
			secondary?: boolean;
			hideArrow?: boolean;
		}>(),
		{
			modelValue: undefined,
			labelValue: "",
			role: "listbox",
			disabled: false,
			isError: false,
			errorMessage: "",
			infoMessage: "",
			required: false,
			hideBottom: false,
			closeOnBlur: true,
			maxHeight: "none",
			minWidth: "15em",
			secondary: false,
			hideArrow: false,
		}
	);

	const mutationObserver = new MutationObserver(resize);

	const emit = defineEmits<{
		"update:modelValue": [value: boolean, extra: BContainerModelExtra];
	}>();

	const [model, setModel] = useOptionalModel<boolean>(
		props,
		"modelValue",
		emit,
		false
	);
	const container = ref<HTMLDivElement>();
	const label = ref<HTMLDivElement>();

	const isExpanded = computed((): boolean =>
		props.disabled ? false : model.value
	);

	const contentMinWidth = ref(props.minWidth);

	function onBlur(e: MouseEvent) {
		if (
			!props.closeOnBlur ||
			!model.value ||
			!e.target ||
			!(e.target instanceof Element)
		)
			return;

		const clickedContainer = e.target.closest(".b-label-container");
		if (container.value != clickedContainer)
			setModel(false, { source: "blur-sm" });
	}

	function resize() {
		contentMinWidth.value = container.value?.clientWidth + "px";
	}

	onMounted(() => {
		document.addEventListener("click", onBlur);
		if (container.value)
			mutationObserver.observe(container.value, { attributes: true });
	});

	onUpdated(resize);

	onBeforeUnmount(() => {
		document.removeEventListener("click", onBlur);
		mutationObserver.disconnect();
	});

	function toggle() {
		if (props.disabled) return;

		setModel(!model.value, { source: "click" });
	}
</script>

<template>
	<div class="b-container">
		<div
			v-if="labelValue"
			class="mb-xxs flex justify-between items-center">
			<BLabel
				:label-value="labelValue"
				:info-message="infoMessage"
				:required="required" />
		</div>
		<div
			ref="container"
			:role="role"
			:aria-disabled="disabled"
			:aria-required="required"
			class="b-label-container"
			:class="{ 'pointer-events-none': disabled }"
			tabindex="0">
			<slot name="label">
				<div
					ref="label"
					class="label-container"
					:class="{
						disabled,
						secondary,
						expanded: isExpanded,
						'hide-bottom': hideBottom,
						error: isError,
					}"
					:style="{ 'max-height': maxHeight, 'min-width': minWidth }"
					@click="toggle"
					@keyup.space="toggle">
					<slot />

					<div class="flex items-center gap-xs ml-auto">
						<slot name="complement" />
						<BIcon
							v-if="!hideArrow"
							name="keyboard_arrow_down"
							class="arrow-icon"
							:class="{
								'text-neutral-interaction-disabled': disabled,
								'text-danger-interaction-default': isError,
								expanded: isExpanded,
							}" />
					</div>
				</div>
			</slot>

			<Transition name="content">
				<slot
					name="content"
					:min-width="contentMinWidth" />
			</Transition>
		</div>
		<div>
			<small
				v-if="isError"
				class="text-danger-foreground-low text-start p3"
				>{{ errorMessage }}</small
			>
		</div>
	</div>
</template>

<style scoped>
	@import "../../assets/main.css";

	.b-container {
		@apply relative;
	}

	.b-label-container {
		@apply w-fit;
	}

	.label-container {
		@apply inline-flex items-center gap-xs border-xxs cursor-pointer px-sm py-xs select-none transition-[border,border-radius] p3
    duration-0 delay-100 text-neutral-interaction-default bg-neutral-surface-default border-neutral-border-default focus:border-primary-border-default;
		border-radius: var(--border-radius-xs);
	}

	.secondary.label-container {
		@apply bg-primary-interaction-default text-neutral-foreground-negative;
	}

	.expanded.label-container {
		@apply delay-0 border-primary-border-default;
	}

	.expanded.label-container.hide-bottom {
		@apply rounded-b-none border-b-neutral-border-default focus:border-b-neutral-border-default;
	}

	.label-container.disabled {
		@apply bg-neutral-surface-disabled text-neutral-foreground-disabled;
	}

	.label-container.error {
		@apply text-danger-foreground-high border-danger-border-default;
	}

	.arrow-icon {
		@apply shrink-0 flex items-center transition-transform duration-300 text-2xl;
	}

	.arrow-icon.expanded {
		@apply rotate-180;
	}
</style>
