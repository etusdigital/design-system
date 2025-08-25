<script setup lang="ts">
	interface CardFooterProps {
		className?: string;
	}

	defineProps<CardFooterProps>();
</script>

<template>
	<footer
		class="b-card-footer"
		:class="className">
		<slot />
	</footer>
</template>

<style scoped>
	@reference "../../assets/main.css";

	.b-card-footer {
		@apply -m-base mt-base p-base border-t;
		border-color: var(--color-neutral-border-subtle);
	}
</style>
