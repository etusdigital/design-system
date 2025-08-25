<script setup lang="ts">
	import { type Ref, ref, computed } from "vue";
	import { blendColors } from "../../utils";

	const props = withDefaults(
		defineProps<{
			modelValue?: number;
			size?: "small" | "medium" | "large";
			type?: "primary" | "info" | "success" | "warning" | "danger" | "neutral";
			color?: string;
			icon?: string;
			infoMessage?: string;
			steps?: number;
			animationType?: "indeterminate" | "query" | undefined;
			displayPercentage?: "center" | "bar" | undefined;
			neutralBackground?: boolean;
		}>(),
		{
			modelValue: 0,
			size: "medium",
			type: "primary",
			color: "",
			icon: "",
			infoMessage: "",
			steps: 0,
			animationType: undefined,
			displayPercentage: undefined,
			neutralBackground: false,
		}
	);

	const progressWidth = computed((): string => {
		let value = props.modelValue * 100;
		if (props.steps) value = (props.modelValue / props.steps) * 100;
		else if (props.animationType) value = 50;

		return Math.max(0, Math.min(100, value)) + "%";
	});

	const background = computed((): string => {
		if (props.neutralBackground || !props.color) return "";
		return blendColors(props.color);
	});

	const component = computed((): string => {
		if (props.infoMessage) return "BTooltip";
		return "div";
	});
</script>

<template>
	<div
		class="b-progress-bar"
		:class="[size, type, { 'neutral-bg': neutralBackground }]"
		:style="{ background: background }"
		v-if="!steps">
		<div class="progress-holder">
			<div
				class="progress-fill"
				:class="[size, animationType]"
				:style="{ background: color, width: progressWidth }">
				<label
					v-if="displayPercentage == 'bar' && !animationType"
					class="progress-label">
					{{ progressWidth }}
				</label>
			</div>
			<label
				v-if="displayPercentage == 'center' && !animationType"
				class="progress-label absolute">
				{{ progressWidth }}
			</label>
		</div>
		<component
			v-if="!animationType && (icon || $slots['icon-slot'])"
			class="progress-icon"
			:is="component"
			:text="infoMessage"
			position="bottom"
			:style="{
				left: progressWidth,
				color: color,
			}">
			<slot name="icon-slot">
				<BIcon :name="icon" />
			</slot>
		</component>
	</div>
	<div
		class="b-step-bar flex flex-row gap-xs"
		:class="[size, type, { 'neutral-bg': neutralBackground }]"
		v-else>
		<div
			v-for="item in props.steps"
			:key="item"
			class="step"
			:style="{
				background: item <= modelValue ? color : background,
				width: 100 / props.steps + '%',
			}"
			:class="{
				filled: item <= modelValue,
				'neutral-bg': neutralBackground,
			}" />
	</div>
</template>

<style scoped>
	@reference "../../assets/main.css";
	.b-progress-bar,
	.b-step-bar .step {
		@apply flex items-center rounded-lg bg-primary-surface-highlight justify-start relative;
	}

	.small {
		@apply h-xs;

		.progress-label {
			font-size: var(--font-size-xxs);
		}

		.progress-icon .b-icon {
			@apply text-base;
		}
	}

	.medium {
		@apply h-sm;

		.progress-label {
			@apply text-xs;
		}

		.progress-icon .b-icon {
			@apply text-2xl;
		}
	}

	.large {
		@apply h-base;

		.progress-label {
			@apply text-sm;
		}

		.progress-icon .b-icon {
			@apply text-4xl;
		}
	}

	.progress-holder {
		@apply flex items-center overflow-hidden w-full;
		border-radius: var(--rounded-base);
	}

	.progress-label {
		@apply h-fit w-full flex flex-row justify-center text-neutral-foreground-negative;
	}

	.progress-fill {
		@apply flex items-center justify-center bg-primary-foreground-low rounded-lg overflow-hidden;
		transition: width 0.5s ease-in-out;
	}

	.b-step-bar .step {
		transition: background-color 0.5s linear;
	}

	.b-step-bar .step.filled {
		@apply bg-primary-foreground-low;
	}

	.b-progress-bar.neutral-bg,
	.step.neutral-bg {
		@apply bg-neutral-surface-disabled;
	}

	.progress-icon {
		@apply flex items-center absolute text-primary-foreground-low;
	}

	.info {
		@apply bg-informative-surface-highlight;

		.progress-fill {
			@apply bg-informative-foreground-low;
		}

		.b-step-bar .step.filled {
			@apply bg-informative-foreground-low;
		}

		.progress-icon {
			@apply text-informative-foreground-low;
		}
	}

	.success {
		@apply bg-success-surface-highlight;

		.progress-fill {
			@apply bg-success-foreground-low;
		}

		.b-step-bar .step.filled {
			@apply bg-success-foreground-low;
		}

		.progress-icon {
			@apply text-success-foreground-low;
		}
	}

	.warning {
		@apply bg-warning-surface-highlight;

		.progress-fill {
			@apply bg-warning-foreground-low;
		}

		.b-step-bar .step.filled {
			@apply bg-warning-foreground-low;
		}

		.progress-icon {
			@apply text-warning-foreground-low;
		}
	}

	.danger {
		@apply bg-danger-surface-highlight;

		.progress-fill {
			@apply bg-danger-foreground-low;
		}

		.b-step-bar .step.filled {
			@apply bg-danger-foreground-low;
		}

		.progress-icon {
			@apply text-danger-foreground-low;
		}
	}

	.neutral {
		@apply bg-neutral-surface-highlight;

		.progress-fill {
			@apply bg-neutral-foreground-low;
		}

		.b-step-bar .step.filled {
			@apply bg-neutral-foreground-low;
		}

		.progress-icon {
			@apply text-neutral-foreground-low;
		}
	}

	.progress-fill.indeterminate {
		animation: indeterminate 2s ease-in-out infinite;
		transform-origin: 100%;
	}

	.progress-fill.query {
		animation: query 2.7s ease-in-out infinite;
		transform-origin: 100%;
	}

	@keyframes query {
		0% {
			transform: translateX(-100%);
		}
		50% {
			transform: translateX(200%);
		}
		100% {
			transform: translateX(-100%);
		}
	}

	@keyframes indeterminate {
		0% {
			transform: translateX(-100%);
		}
		60% {
			transform: translateX(200%);
		}
		100% {
			transform: translateX(200%);
		}
	}
</style>
