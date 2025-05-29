<script setup lang="ts">
	interface CardHeaderProps {
		className?: string;
	}

	defineProps<CardHeaderProps>();
</script>

<template>
	<header
		class="b-card-header"
		:class="className">
		<slot />
	</header>
</template>

<style scoped>
	@reference "../../assets/main.css";

	.b-card-header {
		@apply -m-base mb-base p-base;
	}
</style>
