<script setup lang="ts">
	import { computed } from "vue";
	import BSpinner from "../BSpinner/BSpinner.vue";

	const props = withDefaults(
		defineProps<{
			id?: string;
			name?: string;
			type?: "button" | "reset" | "submit";
			color?: "primary" | "info" | "success" | "warning" | "danger" | "neutral";
			size?: "small" | "medium" | "large";
			variant?: "primary" | "secondary" | "ghost";
			disabled?: boolean;
			loading?: boolean;
			progress?: number;
		}>(),
		{
			type: "button",
			color: "primary",
			size: "medium",
			variant: "primary",
			disabled: false,
			loading: false,
			progress: 0,
		}
	);

	const isLoading = computed(
		(): boolean => !!(props.progress > 0 || props.loading)
	);

	const buttonClasses = computed(() => {
		const classes = ['btn'];
		
		// Add variant class
		classes.push(`btn-${props.variant}`);
		
		// Add size class
		const sizeMap = {
			small: 'btn-sm',
			medium: 'btn-md', 
			large: 'btn-lg'
		};
		classes.push(sizeMap[props.size]);
		
		// Add color class for secondary and ghost variants
		if (props.variant !== 'primary') {
			classes.push(`btn-${props.color}-color`);
		} else if (props.color !== 'primary') {
			// For primary variant with non-primary colors
			classes.push(`btn-${props.color}-color`);
		}
		
		// Add state classes
		if (isLoading.value) {
			classes.push('btn-loading');
		}
		
		return classes;
	});
</script>

<template>
	<button
		:id="id"
		:name="name || id"
		:type="type"
		:disabled="disabled || isLoading"
		:class="buttonClasses">
		<div
			v-if="isLoading && progress > 0"
			class="btn-progress"
			:class="{ 'rounded-r': progress == 1 }"
			:style="{ width: progress * 100 + '%' }" />
		<BSpinner v-if="isLoading" />
		<span
			v-if="$slots.default"
			:class="{ 'btn-content': isLoading }">
			<slot />
		</span>
	</button>
</template>

<style scoped src="@/utils/styles/button.css" />
