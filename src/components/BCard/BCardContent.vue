<script setup lang="ts">
	interface CardContentProps {
		className?: string;
	}

	defineProps<CardContentProps>();
</script>

<template>
	<div
		class="b-card-content"
		:class="className">
		<slot />
	</div>
</template>

<style scoped>
	@reference "../../assets/main.css";

	.b-card-content {
		@apply py-0;
	}
</style>
