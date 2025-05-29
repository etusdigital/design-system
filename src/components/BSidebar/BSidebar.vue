<script setup lang="ts">
	import { ref, watch } from "vue";
	import Overlay from "../../utils/components/Overlay.vue";

	const props = withDefaults(
		defineProps<{
			modelValue?: boolean;
			width?: string;
			noOutsideClose?: boolean;
		}>(),
		{
			modelValue: false,
			width: "fit-content",
			noOutsideClose: false,
		}
	);

	const emit = defineEmits<{
		"update:modelValue": [value: any];
	}>();

	let model = ref(props.modelValue);
	const sidebar = ref<HTMLElement>();

	watch(
		() => props.modelValue,
		(cur) => {
			model.value = cur;
		}
	);

	function closeDialog() {
		if (!props.noOutsideClose) {
			model.value = false;
			emit("update:modelValue", false);
		}
	}
</script>

<template>
	<Teleport to="body">
		<Overlay
			v-model="model"
			@click="closeDialog">
			<Transition name="slide-in">
				<div
					v-if="model"
					ref="sidebar"
					class="sidebar"
					:style="{ width: width }">
					<slot />
				</div>
			</Transition>
		</Overlay>
	</Teleport>
</template>

<style scoped>
	@reference "../../assets/main.css";
	.sidebar {
		@apply z-1001 fixed top-0 right-0 h-screen bg-neutral-surface-default border-xxs border-neutral-border-default transform transition-transform;
		border-top-left-radius: var(--rounded-base);
		border-bottom-left-radius: var(--rounded-base);
		max-width: calc(100% - var(--spacing-xl));
	}

	.slide-in-enter-active,
	.slide-in-leave-active {
		transition: transform 0.5s ease;
	}

	.slide-in-enter-from,
	.slide-in-leave-to {
		transform: translateX(100%);
	}

	.slide-in-enter-to,
	.slide-in-leave-from {
		transform: translateX(0%);
	}

	@media screen and (max-width: 768px) {
		.slide-in-enter-from,
		.slide-in-leave-to {
			transform: translateY(100%);
		}
		.slide-in-enter-to,
		.slide-in-leave-from {
			transform: translateY(0%);
		}

		.side-panel {
			@apply w-full;
		}
	}
</style>
