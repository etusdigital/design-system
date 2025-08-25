<script setup lang="ts">
	interface CardSubtitleProps {
		className?: string;
	}

	defineProps<CardSubtitleProps>();
</script>

<template>
	<p
		class="b-card-subtitle"
		:class="className">
		<slot />
	</p>
</template>

<style scoped>
	@reference "../../assets/main.css";

	.b-card-subtitle {
		@apply text-sm text-neutral-foreground-low;
		margin: 0;
	}
</style>
