<script setup lang="ts">
	import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
	import { useAriaAttributes, useScreenReader } from "#composables";

	/**
	 * Props for the BSpinner component
	 */
	export interface BSpinnerProps {
		/** Accessible label for the spinner */
		ariaLabel?: string;
		/** Whether the spinner should announce loading state */
		ariaLive?: boolean;
		/** Size of the spinner */
		size?: "small" | "medium" | "large" | "xlarge";
		/** Color variant of the spinner */
		variant?: "primary" | "secondary" | "neutral" | "success" | "warning" | "error";
		/** Speed of the spinner animation */
		speed?: "slow" | "normal" | "fast";
		/** Whether spinner is currently active/visible */
		active?: boolean;
		/** Custom message to announce when spinner starts */
		loadingMessage?: string;
		/** Custom message to announce when spinner completes */
		completeMessage?: string;
		/** Whether to show completion announcement */
		announceCompletion?: boolean;
		/** Minimum time to show spinner (prevents flashing) */
		minShowTime?: number;
		/** Whether to respect reduced motion preferences */
		respectReducedMotion?: boolean;
	}

	const props = withDefaults(
		defineProps<BSpinnerProps>(),
		{
			ariaLabel: "Loading",
			ariaLive: true,
			size: "medium",
			variant: "primary",
			speed: "normal",
			active: true,
			loadingMessage: "",
			completeMessage: "",
			announceCompletion: true,
			minShowTime: 500,
			respectReducedMotion: true,
		}
	);

	/**
	 * Events emitted by the BSpinner component
	 */
	interface BSpinnerEmits {
		"loading-start": [message: string];
		"loading-complete": [message: string];
		"visibility-change": [visible: boolean];
	}

	const emit = defineEmits<BSpinnerEmits>();

	// Accessibility composables
	const { useAriaId, useBusyAria } = useAriaAttributes();
	const screenReader = useScreenReader();

	// Generate unique IDs
	const spinnerId = useAriaId('spinner');
	const labelId = useAriaId('spinner-label');
	const statusId = useAriaId('spinner-status');

	// Component state
	const isVisible = ref(props.active);
	const startTime = ref<number | null>(null);
	const completionTimer = ref<ReturnType<typeof setTimeout> | null>(null);

	// Computed properties
	const spinnerAriaLabel = computed(() => {
		return props.loadingMessage || props.ariaLabel;
	});

	const statusMessage = computed(() => {
		if (!isVisible.value) {
			return props.announceCompletion && props.completeMessage 
				? props.completeMessage 
				: "";
		}
		return props.loadingMessage || props.ariaLabel;
	});

	const spinnerClasses = computed(() => [
		'b-spinner',
		`size-${props.size}`,
		`variant-${props.variant}`,
		`speed-${props.speed}`,
		{
			'reduced-motion': props.respectReducedMotion,
			'active': isVisible.value
		}
	]);

	const busyAriaAttrs = useBusyAria(isVisible, spinnerAriaLabel.value);

	/**
	 * Handles spinner activation with announcements
	 */
	function handleActivation(): void {
		if (props.active && !isVisible.value) {
			startTime.value = Date.now();
			isVisible.value = true;
			
			// Announce loading start
			const message = props.loadingMessage || props.ariaLabel;
			if (props.ariaLive) {
				screenReader.announcePolitely(message);
			}
			
			emit('loading-start', message);
			emit('visibility-change', true);
		}
	}

	/**
	 * Handles spinner deactivation with minimum show time
	 */
	function handleDeactivation(): void {
		if (!props.active && isVisible.value) {
			const elapsed = startTime.value ? Date.now() - startTime.value : 0;
			const remainingTime = Math.max(0, props.minShowTime - elapsed);
			
			if (completionTimer.value) {
				clearTimeout(completionTimer.value);
			}
			
			completionTimer.value = setTimeout(() => {
				isVisible.value = false;
				
				// Announce completion if configured
				if (props.announceCompletion) {
					const message = props.completeMessage || "Loading complete";
					if (props.ariaLive) {
						screenReader.announcePolitely(message);
					}
					emit('loading-complete', message);
				}
				
				emit('visibility-change', false);
				startTime.value = null;
			}, remainingTime);
		}
	}

	// Watch for prop changes
	watch(() => props.active, (newActive) => {
		if (newActive) {
			handleActivation();
		} else {
			handleDeactivation();
		}
	});

	// Initialize on mount
	onMounted(() => {
		if (props.active) {
			handleActivation();
		}
	});

	// Cleanup on unmount
	onBeforeUnmount(() => {
		if (completionTimer.value) {
			clearTimeout(completionTimer.value);
		}
	});
</script>

<template>
	<div
		v-if="isVisible"
		:class="spinnerClasses"
		role="status"
		:aria-label="spinnerAriaLabel"
		:aria-live="ariaLive ? 'polite' : undefined"
		:aria-labelledby="loadingMessage ? labelId : undefined"
		:aria-describedby="statusId"
		v-bind="busyAriaAttrs">
		
		<!-- Hidden label for complex loading messages -->
		<div 
			v-if="loadingMessage" 
			:id="labelId" 
			class="sr-only">
			{{ loadingMessage }}
		</div>
		
		<!-- Visual spinner -->
		<svg
			:id="spinnerId"
			class="spinner-svg"
			viewBox="0 0 50 50"
			:aria-hidden="true">
			<circle
				class="spinner-track"
				cx="25"
				cy="25"
				r="20"
				fill="none"
				stroke-width="4"
				aria-hidden="true" />
			<circle
				class="spinner-path"
				cx="25"
				cy="25"
				r="20"
				fill="none"
				stroke-width="4"
				stroke-linecap="round"
				aria-hidden="true" />
		</svg>
		
		<!-- Status message for screen readers -->
		<div 
			:id="statusId" 
			class="sr-only" 
			aria-live="polite" 
			aria-atomic="true">
			{{ statusMessage }}
		</div>
		
		<!-- Accessible text content -->
		<span class="sr-only">
			{{ spinnerAriaLabel }}
		</span>
	</div>
</template>

<style scoped>
	@import "../../assets/main.css";

	.b-spinner {
		@apply inline-flex items-center justify-center relative;
		min-width: 1em;
		min-height: 1em;
	}

	.spinner-svg {
		@apply w-full h-full;
		transform-origin: center;
	}

	.spinner-track {
		stroke: var(--color-neutral-border-default);
		opacity: 0.1;
	}

	.spinner-path {
		stroke: currentColor;
		stroke-dasharray: 90, 150;
		stroke-dashoffset: 0;
		transform-origin: center;
		animation: spin 2s linear infinite;
	}

	/* Size variants */
	.b-spinner.size-small {
		@apply w-4 h-4 text-sm;
	}

	.b-spinner.size-medium {
		@apply w-6 h-6 text-base;
	}

	.b-spinner.size-large {
		@apply w-8 h-8 text-lg;
	}

	.b-spinner.size-xlarge {
		@apply w-12 h-12 text-xl;
	}

	/* Color variants */
	.b-spinner.variant-primary {
		@apply text-primary-interaction-default;
	}

	.b-spinner.variant-secondary {
		@apply text-neutral-interaction-hover;
	}

	.b-spinner.variant-neutral {
		@apply text-neutral-interaction-default;
	}

	.b-spinner.variant-success {
		@apply text-success-interaction-default;
	}

	.b-spinner.variant-warning {
		@apply text-warning-interaction-default;
	}

	.b-spinner.variant-error {
		@apply text-danger-interaction-default;
	}

	/* Speed variants */
	.b-spinner.speed-slow .spinner-path {
		animation-duration: 3s;
	}

	.b-spinner.speed-normal .spinner-path {
		animation-duration: 2s;
	}

	.b-spinner.speed-fast .spinner-path {
		animation-duration: 1s;
	}

	/* Accessibility: Reduced motion support */
	.b-spinner.reduced-motion .spinner-path {
		animation: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.b-spinner.reduced-motion .spinner-path {
			animation: none;
			stroke-dasharray: none;
			stroke: var(--color-neutral-border-default);
			opacity: 0.6;
		}

		.b-spinner.reduced-motion .spinner-track {
			opacity: 0.2;
		}

		/* Alternative animation for reduced motion - subtle pulse */
		.b-spinner.reduced-motion {
			animation: pulse 2s ease-in-out infinite;
		}
	}

	/* Keyframes */
	@keyframes spin {
		0% {
			transform: rotate(0deg);
			stroke-dashoffset: 0;
		}
		50% {
			transform: rotate(180deg);
			stroke-dashoffset: -35;
		}
		100% {
			transform: rotate(360deg);
			stroke-dashoffset: -124;
		}
	}

	@keyframes pulse {
		0%, 100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}

	/* Screen reader only content */
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

	/* High contrast support */
	@media (prefers-contrast: high) {
		.spinner-track {
			stroke: currentColor;
			opacity: 0.3;
		}

		.spinner-path {
			stroke-width: 6;
		}

		.b-spinner.reduced-motion .spinner-path {
			stroke: currentColor;
			opacity: 1;
		}
	}

	/* Focus styles (if spinner becomes focusable in certain contexts) */
	.b-spinner:focus {
		@apply outline-none;
		box-shadow: 0 0 0 2px var(--color-primary-interaction-default);
		border-radius: var(--rounded-base);
	}

	/* Loading states with smooth transitions */
	.b-spinner {
		transition: all 0.2s ease-in-out;
	}

	.b-spinner.active {
		opacity: 1;
		transform: scale(1);
	}

	/* Container context styling */
	.b-spinner[role="status"] {
		/* Ensure adequate spacing for touch targets in interactive contexts */
		min-width: 44px;
		min-height: 44px;
	}

	/* Dark theme support */
	@media (prefers-color-scheme: dark) {
		.spinner-track {
			opacity: 0.15;
		}
	}
</style>
