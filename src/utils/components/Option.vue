<script setup lang="ts">
	const props = withDefaults(
		defineProps<{
			selected?: boolean;
			disabled?: boolean;
			secondary?: boolean;
			noHover?: boolean;
		}>(),
		{
			selected: false,
			disabled: false,
			secondary: false,
			noHover: false,
		}
	);
</script>

<template>
	<div
		role="option"
		tabindex="0"
		class="option-container"
		:class="{ secondary, disabled, noHover, selected }">
		<slot />
	</div>
</template>

<style scoped>
	@import "../../assets/main.css";
</style>
