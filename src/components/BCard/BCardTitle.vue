<script setup lang="ts">
	interface CardTitleProps {
		className?: string;
		tag?: string;
	}

	withDefaults(defineProps<CardTitleProps>(), {
		tag: "h3",
	});
</script>

<template>
	<component
		:is="tag"
		class="b-card-title"
		:class="className">
		<slot />
	</component>
</template>

<style scoped>
	@reference "../../assets/main.css";

	.b-card-title {
		@apply text-lg font-semibold text-neutral-foreground-high;
		margin: 0;
	}
</style>
