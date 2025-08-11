<script setup lang="ts">
	import { type Ref, ref, computed, watch, onMounted, nextTick } from "vue";
	import { blendColors } from "../../utils";
	import { useAriaAttributes, useScreenReader } from "#composables";

	// Enhanced TypeScript interface for accessibility configuration
	export interface BProgressBarAccessibilityConfig {
		/** Accessible label for the progress bar */
		ariaLabel?: string;
		/** Optional text description of current progress */
		ariaValueText?: string;
		/** ID for progress bar element - auto-generated if not provided */
		id?: string;
		/** Description text that appears alongside the progress bar */
		description?: string;
		/** Whether to announce progress changes to screen readers */
		announceProgress?: boolean;
		/** Whether to announce when progress is complete */
		announceCompletion?: boolean;
		/** Custom completion message */
		completionMessage?: string;
		/** Status text that doesn't rely on visual indicators */
		statusText?: string;
		/** Whether progress bar is in an error state */
		isError?: boolean;
		/** Error message for screen readers */
		errorMessage?: string;
		/** Minimum percentage change before announcing (default: 10) */
		announcementThreshold?: number;
	}

	// Enhanced component props with comprehensive accessibility support
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
			// Accessibility props
			ariaLabel?: string;
			ariaValueText?: string;
			id?: string;
			description?: string;
			announceProgress?: boolean;
			announceCompletion?: boolean;
			completionMessage?: string;
			statusText?: string;
			isError?: boolean;
			errorMessage?: string;
			announcementThreshold?: number;
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
			ariaLabel: "Progress",
			announceProgress: true,
			announceCompletion: true,
			completionMessage: "Progress completed",
			announcementThreshold: 10,
		}
	);

	// Screen reader and accessibility setup
	const screenReader = useScreenReader();
	const { useLiveRegion } = screenReader;
	const { liveRegion, updateLiveRegion } = useLiveRegion('polite');

	// Generate unique ID for this progress bar instance
	const progressBarId = computed(() => 
		props.id || `progress-bar-${Math.random().toString(36).substr(2, 9)}`
	);

	// Track previous percentage for announcement logic
	const previousPercentage = ref<number>(0);
	const isCompleted = ref<boolean>(false);
	const hasBeenCompleted = ref<boolean>(false);

	const progressWidth = computed((): string => {
		let value = props.modelValue * 100;
		if (props.steps) value = (props.modelValue / props.steps) * 100;
		else if (props.animationType) value = 50;

		return Math.max(0, Math.min(100, value)) + "%";
	});

	// Calculate actual percentage value for ARIA and announcements
	const progressPercentage = computed((): number => {
		let value = props.modelValue * 100;
		if (props.steps) value = (props.modelValue / props.steps) * 100;
		else if (props.animationType) return 50; // Indeterminate state

		return Math.max(0, Math.min(100, value));
	});

	const background = computed((): string => {
		if (props.neutralBackground || !props.color) return "";
		return blendColors(props.color);
	});

	const component = computed((): string => {
		if (props.infoMessage) return "BTooltip";
		return "div";
	});

	// Enhanced accessibility setup
	const { useProgressAria } = useAriaAttributes();

	// Compute values for progress bar ARIA attributes
	const currentValue = computed(() => {
		// For indeterminate progress, don't set aria-valuenow
		if (props.animationType) return undefined;
		if (props.steps) return props.modelValue;
		return Math.round(props.modelValue * 100);
	});

	const minValue = computed(() => 0);
	const maxValue = computed(() => props.steps || 100);

	// Enhanced value text with comprehensive status information
	const valueText = computed(() => {
		if (props.ariaValueText) return props.ariaValueText;
		
		// Handle error state
		if (props.isError) {
			const errorMsg = props.errorMessage || 'Progress failed';
			return `Error: ${errorMsg}`;
		}
		
		// Handle indeterminate states
		if (props.animationType) {
			const typeText = props.animationType === 'indeterminate' ? 'loading' : 'processing';
			return `${typeText} in progress`;
		}
		
		// Handle steps progress
		if (props.steps) {
			const current = Math.min(props.modelValue, props.steps);
			const stepText = `Step ${current} of ${props.steps}`;
			if (current === props.steps) {
				return `${stepText} - Complete`;
			}
			return stepText;
		}
		
		// Handle percentage progress
		const percentage = Math.round(props.modelValue * 100);
		if (percentage >= 100) {
			return "100% - Complete";
		}
		return `${percentage}% complete`;
	});

	// Enhanced progress bar ARIA attributes with proper indeterminate handling
	const progressAriaAttrs = computed(() => {
		const baseAttrs: Record<string, any> = {
			role: 'progressbar',
			'aria-valuemin': minValue.value,
			'aria-valuemax': maxValue.value,
			'aria-valuetext': valueText.value,
		};

		// Only set aria-valuenow for determinate progress
		if (currentValue.value !== undefined) {
			baseAttrs['aria-valuenow'] = currentValue.value;
		}

		// Add error state
		if (props.isError) {
			baseAttrs['aria-invalid'] = true;
		}

		return baseAttrs;
	});

	// Status message for screen readers
	const statusMessage = computed(() => {
		if (props.statusText) return props.statusText;
		if (props.isError) return props.errorMessage || 'Progress failed';
		if (props.description) return props.description;
		return '';
	});

	// Complete progress state tracking
	const isProgressComplete = computed(() => {
		if (props.steps) {
			return props.modelValue >= props.steps;
		}
		return props.modelValue >= 1;
	});

	// Watch for progress changes and handle announcements
	watch(
		() => progressPercentage.value,
		(newPercentage, oldPercentage) => {
			if (!props.announceProgress || props.animationType) return;

			// Calculate percentage difference
			const percentageDiff = Math.abs(newPercentage - (oldPercentage || 0));
			
			// Only announce if threshold is met
			if (percentageDiff >= props.announcementThreshold) {
				if (props.steps) {
					const currentStep = Math.min(props.modelValue, props.steps);
					screenReader.announcePolitely(`Step ${currentStep} of ${props.steps}`);
				} else {
					screenReader.announcePolitely(`${Math.round(newPercentage)}% complete`);
				}
			}
			
			previousPercentage.value = newPercentage;
		},
		{ immediate: false }
	);

	// Watch for completion and announce
	watch(
		isProgressComplete,
		(isComplete) => {
			if (isComplete && !hasBeenCompleted.value && props.announceCompletion && !props.animationType) {
				hasBeenCompleted.value = true;
				screenReader.announcePolitely(props.completionMessage || 'Progress completed');
				// Update live region as well
				updateLiveRegion(props.completionMessage || 'Progress completed');
			}
			if (!isComplete) {
				hasBeenCompleted.value = false;
			}
		}
	);

	// Watch for error state changes
	watch(
		() => props.isError,
		(isError) => {
			if (isError && props.errorMessage) {
				screenReader.announceAssertively(props.errorMessage);
				updateLiveRegion(props.errorMessage);
			}
		}
	);

	// Initialize previous percentage on mount
	onMounted(async () => {
		await nextTick();
		previousPercentage.value = progressPercentage.value;
	});
</script>

<template>
	<!-- Accessible progress description (if provided) -->
	<div
		v-if="description"
		:id="`${progressBarId}-description`"
		class="sr-only">
		{{ description }}
	</div>

	<!-- Continuous progress bar -->
	<div
		v-if="!steps"
		:id="progressBarId"
		class="b-progress-bar"
		:class="[
			size, 
			type, 
			{ 
				'neutral-bg': neutralBackground,
				'error-state': isError,
				'completed': isProgressComplete
			}
		]"
		:style="{ background: background }"
		v-bind="progressAriaAttrs"
		:aria-label="ariaLabel"
		:aria-describedby="description ? `${progressBarId}-description` : undefined">
		
		<!-- Progress holder with enhanced accessibility -->
		<div class="progress-holder">
			<div
				class="progress-fill"
				:class="[size, animationType, { 'error-fill': isError }]"
				:style="{ 
					background: isError ? 'var(--danger-foreground-low)' : color, 
					width: progressWidth 
				}"
				role="presentation">
				<label
					v-if="displayPercentage == 'bar' && !animationType"
					class="progress-label"
					aria-hidden="true">
					{{ progressWidth }}
				</label>
			</div>
			<label
				v-if="displayPercentage == 'center' && !animationType"
				class="progress-label absolute"
				aria-hidden="true">
				{{ progressWidth }}
			</label>
		</div>

		<!-- Progress icon with accessibility -->
		<component
			v-if="!animationType && (icon || $slots['icon-slot'])"
			class="progress-icon"
			:is="component"
			:text="infoMessage"
			position="bottom"
			:style="{
				left: progressWidth,
				color: isError ? 'var(--danger-foreground-low)' : color,
			}"
			role="presentation"
			aria-hidden="true">
			<slot name="icon-slot">
				<BIcon :name="icon" />
			</slot>
		</component>

		<!-- Status message for screen readers -->
		<div
			v-if="statusMessage"
			class="sr-only"
			aria-live="polite"
			aria-atomic="true">
			{{ statusMessage }}
		</div>
	</div>

	<!-- Step-based progress bar -->
	<div
		v-else
		:id="progressBarId"
		class="b-step-bar flex flex-row gap-xs"
		:class="[
			size, 
			type, 
			{ 
				'neutral-bg': neutralBackground,
				'error-state': isError,
				'completed': isProgressComplete
			}
		]"
		v-bind="progressAriaAttrs"
		:aria-label="ariaLabel"
		:aria-describedby="description ? `${progressBarId}-description` : undefined">
		
		<div
			v-for="item in props.steps"
			:key="item"
			class="step"
			:style="{
				background: item <= modelValue ? (isError ? 'var(--danger-foreground-low)' : color) : background,
				width: 100 / props.steps + '%',
			}"
			:class="{
				filled: item <= modelValue,
				'neutral-bg': neutralBackground,
				'error-step': isError && item <= modelValue,
			}"
			role="presentation"
			:aria-label="`Step ${item} of ${props.steps}${item <= modelValue ? ' completed' : ''}`" />
		
		<!-- Status message for screen readers -->
		<div
			v-if="statusMessage"
			class="sr-only"
			aria-live="polite"
			aria-atomic="true">
			{{ statusMessage }}
		</div>
	</div>

	<!-- Live region for dynamic announcements (visually hidden) -->
	<div
		ref="liveRegion"
		class="sr-only"
		aria-live="polite"
		aria-atomic="true">
	</div>
</template>

<style scoped>
	@import "../../assets/main.css";
	
	/* Screen reader only class for hidden content */
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	.b-progress-bar,
	.b-step-bar .step {
		@apply flex items-center rounded-lg bg-primary-surface-highlight justify-start relative;
	}

	/* Enhanced accessibility states */
	.b-progress-bar.error-state,
	.b-step-bar.error-state {
		@apply bg-danger-surface-highlight;
	}

	.b-progress-bar.completed,
	.b-step-bar.completed {
		@apply bg-success-surface-highlight;
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

	/* Error state styles */
	.error-fill {
		@apply bg-danger-foreground-low;
	}

	.error-step {
		@apply bg-danger-foreground-low;
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
