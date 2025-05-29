<script setup lang="ts">
	defineProps<{
		className?: string;
	}>();
</script>

<template>
	<div
		class="b-card"
		:class="className">
		<slot />
	</div>
</template>

<style scoped>
	@reference "../../assets/main.css";
	.b-card {
		@apply bg-neutral-surface-default border-xxs;
		border-color: var(--color-neutral-border-default);
		border-radius: var(--rounded-base);
		box-shadow: var(--box-shadow-neutral-selected);
	}
</style>
