<script setup lang="ts">
	import { computed } from "vue";

	const props = withDefaults(
		defineProps<{
			text?: string;
			color?:
				| "primary"
				| "informative"
				| "success"
				| "warning"
				| "danger"
				| "neutral";
			size?: "small" | "medium" | "large";
			type?: "default" | "secondary" | "heavy";
			loading?: boolean;
			closeable?: boolean;
			icon?: string;
			isAppendedIcon?: boolean;
		}>(),
		{
			text: "",
			color: "primary",
			size: "medium",
			type: "default",
			loading: false,
			icon: "",
			closeable: false,
			isAppendedIcon: false,
		}
	);

	const emit = defineEmits(["close"]);

	const prependIcon = computed(() => {
		if (!props.isAppendedIcon) return props.icon;
		return "";
	});

	const appendedIcon = computed(() => {
		if (props.closeable) return "close";
		else if (props.isAppendedIcon) return props.icon;
		return "";
	});
</script>

<template>
	<div
		:class="[color, type, size]"
		class="b-tag">
		<BSpinner
			v-if="loading"
			class="colored" />
		<template v-else>
			<BIcon
				class="colored"
				:name="prependIcon"
				v-if="prependIcon" />
			<p class="colored font-bold whitespace-nowrap truncate">
				<slot>{{ text }}</slot>
			</p>
			<BIcon
				class="colored"
				:class="{ 'cursor-pointer': closeable }"
				:name="appendedIcon"
				v-if="appendedIcon"
				@click="closeable && emit('close')" />
		</template>
	</div>
</template>

<style scoped>
	@reference "../../assets/main.css";
	.b-tag {
		@apply flex items-center justify-center gap-xxs overflow-hidden relative text-center w-fit h-fit rounded-full border-xxs;
	}

	.small {
		@apply text-xs py-xxs px-sm;

		.b-icon {
			@apply text-lg;
		}
	}

	.medium {
		@apply text-sm py-xs px-base;

		.b-icon {
			@apply text-base;
		}
	}

	.large {
		@apply text-lg py-sm px-lg;

		.b-icon {
			@apply text-2xl;
		}
	}

	.primary {
		@apply bg-primary-surface-highlight border-primary-surface-highlight;

		.percentage {
			@apply bg-primary-surface-highlight;
		}

		.colored {
			@apply text-primary-foreground-high;
		}
	}

	.info {
		@apply bg-informative-surface-highlight border-informative-surface-highlight;

		.colored {
			@apply text-informative-foreground-high;
		}
	}

	.success {
		@apply bg-success-surface-highlight border-success-surface-highlight;

		.colored {
			@apply text-success-foreground-high;
		}
	}

	.warning {
		@apply bg-warning-surface-highlight border-warning-surface-highlight;

		.colored {
			@apply text-warning-foreground-high;
		}
	}

	.danger {
		@apply bg-danger-surface-highlight border-danger-surface-highlight;

		.colored {
			@apply text-danger-foreground-high;
		}
	}

	.neutral {
		@apply bg-neutral-surface-highlight border-neutral-surface-highlight;

		.colored {
			@apply text-neutral-foreground-low;
		}
	}

	*.secondary {
		@apply bg-transparent;
	}

	.secondary.primary {
		@apply text-primary-foreground-low border-primary-border-default;
	}

	.secondary.info {
		@apply text-informative-foreground-low border-informative-border-default;
	}

	.secondary.success {
		@apply text-success-foreground-low border-success-border-default;
	}

	.secondary.warning {
		@apply text-warning-foreground-low border-warning-border-default;
	}

	.secondary.danger {
		@apply text-danger-foreground-low border-danger-border-default;
	}

	.secondary.neutral {
		@apply text-neutral-foreground-low border-neutral-border-pressed;
	}

	*.heavy .colored {
		@apply text-white;
	}

	.heavy.primary {
		@apply text-neutral-foreground-negative bg-primary-interaction-default border-primary-interaction-default;
	}

	.heavy.info {
		@apply text-neutral-foreground-negative bg-informative-interaction-default border-informative-interaction-default;
	}

	.heavy.success {
		@apply text-neutral-foreground-negative bg-success-interaction-default border-success-interaction-default;
	}

	.heavy.warning {
		@apply text-neutral-foreground-negative bg-warning-interaction-default border-warning-interaction-default;
	}

	.heavy.danger {
		@apply text-neutral-foreground-negative bg-danger-interaction-default border-danger-interaction-default;
	}

	.heavy.neutral {
		@apply text-neutral-foreground-negative bg-neutral-interaction-default border-neutral-interaction-default;
	}
</style>
