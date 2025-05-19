<script setup lang="ts">
	const props = withDefaults(
		defineProps<{
			title?: string;
			icon?: string;
			color?: string;
			isIconRound?: boolean;
		}>(),
		{
			title: "",
			icon: "",
			color: "",
			isIconRound: false,
		}
	);
</script>

<template>
	<div class="b-card-icon">
		<div
			class="icon"
			:class="{
				'round-icon': isIconRound,
				'colored-background': color,
				'colored-text': color && isIconRound,
			}">
			<BIcon :name="icon" />
		</div>
		<BCard class="p-lg">
			<header class="flex justify-between">
				<h4
					class="card-title"
					:class="{ 'colored-text': color }">
					{{ title }}
				</h4>
				<slot name="title-actions" />
			</header>
			<slot />
		</BCard>
	</div>
</template>

<style scoped>
	@reference "../../assets/main.css";
	.b-card-icon {
		@apply relative min-w-20xl;
	}

	.icon {
		@apply flex items-center justify-center rounded-full bg-primary-interaction-default p-xxs w-fit h-fit text-neutral-foreground-negative absolute left-[-15px] top-[16px];

		.b-icon {
			@apply text-xl;
		}
	}

	.icon.round-icon {
		@apply bg-transparent text-primary-interaction-default p-none;

		.b-icon {
			@apply text-3xl;
		}
	}

	.card-title {
		@apply text-primary-interaction-default font-bold text-base;
	}

	*.colored-background {
		background: v-bind(color);
	}

	.b-card-icon *.colored-text {
		color: v-bind(color);
	}
</style>
