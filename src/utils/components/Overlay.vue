<script setup lang="ts">
	import { ref, watch } from "vue";

	const props = withDefaults(
		defineProps<{
			modelValue?: boolean;
			zIndex?: number;
		}>(),
		{
			modelValue: false,
			zIndex: 1000,
		}
	);

	const emit = defineEmits<{
		click: [];
	}>();

	const model = ref(props.modelValue);

	watch(
		() => props.modelValue,
		(cur) => {
			model.value = cur;
		}
	);
</script>

<template>
	<Transition name="fade-in">
		<div
			class="background-div"
			v-if="model"
			@click="emit('click')" />
	</Transition>
	<slot />
</template>

<style scoped>
	@reference "../../assets/main.css";
	.background-div {
		@apply fixed w-screen h-screen inset-0 flex items-center justify-center bg-negative opacity-60;
		z-index: v-bind(zIndex);
	}

	.fade-in-enter-active,
	.fade-in-leave-active {
		transition: opacity 0.5s ease;
	}

	.fade-in-enter-from,
	.fade-in-leave-to {
		opacity: 0;
	}

	.fade-in-enter-to,
	.fade-in-leave-from {
		opacity: 0.6;
	}
</style>
