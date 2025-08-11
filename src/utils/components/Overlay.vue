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
			class="b-overlay"
			:style="{ 'z-index': zIndex }"
			v-if="model"
			@click="emit('click')" />
	</Transition>
	<slot />
</template>

