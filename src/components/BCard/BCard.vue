<script setup lang="ts">
	import { computed, useSlots } from "vue";

	interface CardProps {
		className?: string;
		variant?: "elevated" | "outlined" | "filled" | "flat";
		padding?: "none" | "sm" | "md" | "lg" | "xl";
		shadow?: "none" | "sm" | "md" | "lg" | "xl";
		radius?: "none" | "sm" | "md" | "lg" | "full";
		clickable?: boolean;
		disabled?: boolean;
		title?: string;
		subtitle?: string;
	}

	const props = withDefaults(defineProps<CardProps>(), {
		variant: "elevated",
		padding: "md",
		shadow: "sm",
		radius: "md",
	});

	const slots = useSlots();

	const cardClasses = computed(() => [
		"b-card",
		`b-card--variant-${props.variant}`,
		`b-card--padding-${props.padding}`,
		`b-card--shadow-${props.shadow}`,
		`b-card--radius-${props.radius}`,
		{
			"b-card--clickable": props.clickable,
			"b-card--disabled": props.disabled,
		},
		props.className,
	]);

	const hasHeader = computed(
		() => slots.header || props.title || props.subtitle
	);

	const hasFooter = computed(() => slots.footer);
</script>

<template>
	<article
		class="b-card"
		:class="cardClasses"
		:tabindex="clickable && !disabled ? 0 : undefined"
		:role="clickable ? 'button' : undefined"
		:aria-disabled="disabled">
		<!-- Header Section -->
		<header
			v-if="hasHeader"
			class="b-card__header">
			<slot name="header">
				<div
					v-if="props.title || props.subtitle"
					class="b-card__header-text">
					<h3
						v-if="props.title"
						class="b-card__title">
						{{ props.title }}
					</h3>
					<p
						v-if="props.subtitle"
						class="b-card__subtitle">
						{{ props.subtitle }}
					</p>
				</div>
			</slot>
		</header>

		<!-- Content Section -->
		<div class="b-card__content">
			<slot />
		</div>

		<!-- Footer Section -->
		<footer
			v-if="hasFooter"
			class="b-card__footer">
			<slot name="footer" />
		</footer>
	</article>
</template>

<style scoped>
	@reference "../../assets/main.css";

	/* Base styles */
	.b-card {
		@apply transition-all duration-200;
		position: relative;
		overflow: hidden;
	}

	/* Variant styles */
	.b-card--variant-elevated {
		@apply bg-neutral-surface-default border-xxs;
		border-color: var(--color-neutral-border-default);
		box-shadow: var(--box-shadow-neutral-selected);
	}

	.b-card--variant-outlined {
		@apply bg-neutral-surface-default border-sm;
		border-color: var(--color-neutral-border-default);
		box-shadow: none;
	}

	.b-card--variant-filled {
		@apply bg-neutral-surface-highlight border-none;
		box-shadow: none;
	}

	.b-card--variant-flat {
		@apply bg-transparent border-none;
		box-shadow: none;
	}

	/* Padding styles */
	.b-card--padding-none {
		@apply p-0;
	}
	.b-card--padding-sm {
		@apply p-sm;
	}
	.b-card--padding-md {
		@apply p-base;
	}
	.b-card--padding-lg {
		@apply p-lg;
	}
	.b-card--padding-xl {
		@apply p-xl;
	}

	/* Shadow styles */
	.b-card--shadow-none {
		box-shadow: none;
	}
	.b-card--shadow-sm {
		box-shadow: var(--box-shadow-neutral-selected);
	}
	.b-card--shadow-md {
		box-shadow: var(--box-shadow-neutral-default);
	}
	.b-card--shadow-lg {
		box-shadow: var(--box-shadow-neutral-default);
	}
	.b-card--shadow-xl {
		box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1),
			0px 2px 3px 0px rgba(0, 0, 0, 0.06);
	}

	/* Radius styles */
	.b-card--radius-none {
		border-radius: 0;
	}
	.b-card--radius-sm {
		border-radius: var(--rounded-sm);
	}
	.b-card--radius-md {
		border-radius: var(--rounded-base);
	}
	.b-card--radius-lg {
		border-radius: var(--rounded-lg);
	}
	.b-card--radius-full {
		border-radius: var(--rounded-full);
	}

	/* Interactive states */
	.b-card--clickable {
		@apply cursor-pointer;
	}

	.b-card--clickable:hover:not(.b-card--disabled) {
		transform: translateY(-2px);
		box-shadow: var(--box-shadow-neutral-default);
	}

	.b-card--clickable:active:not(.b-card--disabled) {
		transform: translateY(0);
	}

	.b-card--disabled {
		@apply opacity-50 cursor-not-allowed;
	}

	/* Header styles */
	.b-card__header {
		@apply -m-base mb-base p-base;

		.b-card--padding-none & {
			@apply m-0 p-base;
		}
	}

	.b-card__header-text {
		@apply space-y-xs;
	}

	.b-card__title {
		@apply text-lg font-semibold text-neutral-foreground-high;
		margin: 0;
	}

	.b-card__subtitle {
		@apply text-sm text-neutral-foreground-low;
		margin: 0;
	}

	/* Content styles */
	.b-card__content {
		.b-card--padding-none & {
			@apply px-base py-sm;
		}
	}

	/* Footer styles */
	.b-card__footer {
		@apply -m-base mt-base p-base border-t;
		border-color: var(--color-neutral-border-subtle);

		.b-card--padding-none & {
			@apply m-0 p-base;
		}
	}

	/* Focus styles for accessibility */
	.b-card:focus-visible {
		@apply outline-2 outline-offset-2;
		outline-color: var(--color-primary-border-default);
	}
</style>
