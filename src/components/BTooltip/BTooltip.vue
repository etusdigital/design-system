<script setup lang="ts">
	import {
		ref,
		onMounted,
		onUpdated,
		onBeforeUnmount,
		watch,
		nextTick,
		computed,
		useSlots,
	} from "vue";
	import { useAriaAttributes, useScreenReader } from "#composables";

	/**
	 * Tooltip positioning options
	 */
	export type TooltipPosition = "top" | "bottom" | "left" | "right";

	/**
	 * Tooltip trigger behavior options
	 */
	export type TooltipTrigger = "hover" | "focus" | "click" | "manual";

	/**
	 * Accessibility configuration for tooltips
	 */
	export interface TooltipAccessibilityConfig {
		/** Whether tooltip content is essential for screen readers (uses aria-describedby) */
		essential?: boolean;
		/** Custom ARIA label for the tooltip trigger element */
		ariaLabel?: string;
		/** Additional ARIA described by IDs */
		ariaDescribedBy?: string;
		/** Custom role for the tooltip (default: 'tooltip') */
		role?: string;
		/** Whether to announce tooltip content to screen readers */
		announceContent?: boolean;
		/** Politeness level for screen reader announcements */
		announcePoliteness?: 'polite' | 'assertive';
	}

	/**
	 * Timing configuration for tooltip display
	 */
	export interface TooltipTimingConfig {
		/** Delay before showing tooltip (milliseconds) */
		showDelay?: number;
		/** Delay before hiding tooltip (milliseconds) */
		hideDelay?: number;
		/** Maximum time to show tooltip before auto-hide (0 = no auto-hide) */
		maxShowTime?: number;
	}

	/**
	 * Enhanced props for the BTooltip component with comprehensive accessibility support
	 */
	export interface BTooltipProps {
		/** Tooltip text content */
		text?: string;
		/** Position of the tooltip relative to the trigger */
		position?: TooltipPosition;
		/** How the tooltip should be triggered */
		trigger?: TooltipTrigger | TooltipTrigger[];
		/** Whether the tooltip should be triggered by focus (keyboard accessible) */
		focusable?: boolean;
		/** Whether to show tooltip on hover */
		showOnHover?: boolean;
		/** Whether to show tooltip on focus */
		showOnFocus?: boolean;
		/** Whether to show tooltip on click */
		showOnClick?: boolean;
		/** Timing configuration for tooltip display */
		timing?: TooltipTimingConfig;
		/** Delay before showing tooltip (milliseconds) - shorthand for timing.showDelay */
		showDelay?: number;
		/** Delay before hiding tooltip (milliseconds) - shorthand for timing.hideDelay */
		hideDelay?: number;
		/** Accessibility configuration */
		accessibility?: TooltipAccessibilityConfig;
		/** ARIA label for the tooltip trigger - shorthand for accessibility.ariaLabel */
		ariaLabel?: string;
		/** Whether tooltip content is essential for screen readers - shorthand for accessibility.essential */
		essential?: boolean;
		/** Custom ID for the tooltip */
		tooltipId?: string;
		/** Whether tooltip can be dismissed with Escape key */
		dismissible?: boolean;
		/** Whether to respect user's reduced motion preference */
		respectsReducedMotion?: boolean;
		/** Whether tooltip should be persistent (not auto-hide on scroll/resize) */
		persistent?: boolean;
		/** Custom CSS classes for the tooltip */
		tooltipClass?: string | string[];
		/** Whether tooltip is disabled */
		disabled?: boolean;
	}

	const props = withDefaults(
		defineProps<BTooltipProps>(),
		{
			text: "",
			position: "right",
			trigger: undefined,
			focusable: true,
			showOnHover: true,
			showOnFocus: true,
			showOnClick: false,
			timing: () => ({}),
			showDelay: 500,
			hideDelay: 200,
			accessibility: () => ({}),
			ariaLabel: "",
			essential: false,
			tooltipId: "",
			dismissible: true,
			respectsReducedMotion: true,
			persistent: false,
			tooltipClass: "",
			disabled: false,
		}
	);

	/**
	 * Events emitted by the BTooltip component
	 */
	interface BTooltipEmits {
		"tooltip-show": [visible: boolean];
		"tooltip-hide": [visible: boolean];
		"tooltip-focus": [event: FocusEvent];
		"tooltip-blur": [event: FocusEvent];
		"tooltip-escape": [event: KeyboardEvent];
	}

	const emit = defineEmits<BTooltipEmits>();

	// Get slots to check for content
	const slots = useSlots();

	// Accessibility composables
	const { useAriaId, useButtonAria } = useAriaAttributes();
	const screenReader = useScreenReader();

	// Generate unique IDs
	const tooltipId = props.tooltipId || useAriaId('tooltip');
	const triggerId = useAriaId('tooltip-trigger');

	// Component state
	let isHovering = ref(false);
	let isFocused = ref(false);
	let isClicked = ref(false);
	let isVisible = ref(false);
	let isAnimating = ref(false);
	const content = ref<HTMLElement>();
	const tooltip = ref<HTMLElement>();
	const triggerElement = ref<HTMLElement>();

	// Auto-hide timer
	let autoHideTimer: ReturnType<typeof setTimeout> | null = null;

	// Timers for show/hide delays
	let showTimer: ReturnType<typeof setTimeout> | null = null;
	let hideTimer: ReturnType<typeof setTimeout> | null = null;

	// Computed properties
	const effectiveShowDelay = computed(() => 
		props.timing?.showDelay ?? props.showDelay
	);

	const effectiveHideDelay = computed(() => 
		props.timing?.hideDelay ?? props.hideDelay
	);

	const effectiveEssential = computed(() => 
		props.accessibility?.essential ?? props.essential
	);

	const effectiveAriaLabel = computed(() => 
		props.accessibility?.ariaLabel ?? props.ariaLabel
	);

	const triggers = computed(() => {
		if (props.trigger) {
			return Array.isArray(props.trigger) ? props.trigger : [props.trigger];
		}
		
		const triggerList: TooltipTrigger[] = [];
		if (props.showOnHover) triggerList.push('hover');
		if (props.showOnFocus) triggerList.push('focus');
		if (props.showOnClick) triggerList.push('click');
		
		return triggerList.length > 0 ? triggerList : ['hover', 'focus'];
	});

	const shouldShowTooltip = computed(() => {
		if (props.disabled) return false;
		
		const hasContent = Boolean(props.text) || hasSlotContent.value;
		if (!hasContent) return false;
		
		const activeTriggers = triggers.value;
		const shouldTrigger = 
			(activeTriggers.includes('hover') && isHovering.value) ||
			(activeTriggers.includes('focus') && isFocused.value) ||
			(activeTriggers.includes('click') && isClicked.value) ||
			activeTriggers.includes('manual');
		
		return shouldTrigger;
	});

	const hasSlotContent = computed(() => {
		// Check if text slot has content
		return Boolean(slots.text);
	});

	const ariaDescriptionId = computed(() => {
		return effectiveEssential.value ? tooltipId : undefined;
	});

	const triggerAriaLabel = computed(() => {
		if (effectiveAriaLabel.value) return effectiveAriaLabel.value;
		if (!effectiveEssential.value && props.text) return props.text;
		return undefined;
	});

	const triggerAriaDescribedBy = computed(() => {
		const ids = [];
		if (effectiveEssential.value && isVisible.value) {
			ids.push(tooltipId);
		}
		if (props.accessibility?.ariaDescribedBy) {
			ids.push(props.accessibility.ariaDescribedBy);
		}
		return ids.length > 0 ? ids.join(' ') : undefined;
	});

	const triggerTabIndex = computed(() => {
		if (!props.focusable) return -1;
		if (triggers.value.includes('focus') || triggers.value.includes('click')) return 0;
		return -1;
	});

	const tooltipRole = computed(() => 
		props.accessibility?.role ?? 'tooltip'
	);

	const tooltipClasses = computed(() => {
		const classes = ['tooltip', props.position];
		if (props.tooltipClass) {
			if (Array.isArray(props.tooltipClass)) {
				classes.push(...props.tooltipClass);
			} else {
				classes.push(props.tooltipClass);
			}
		}
		return classes;
	});

	const shouldRespectReducedMotion = computed(() => {
		if (!props.respectsReducedMotion) return false;
		return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	});

	const computedPadding = computed((): number => {
		if (
			document.readyState === "complete" ||
			document.readyState === "interactive"
		) {
			return 4;
		}
		return 4;
	});

	async function showTooltip(): Promise<void> {
		if (props.disabled || isVisible.value) return;
		
		isAnimating.value = true;
		isVisible.value = true;
		await nextTick();

		if (!content.value || !tooltip.value) {
			isAnimating.value = false;
			return;
		}

		const rect = content.value.getBoundingClientRect();
		const viewportWidth = window.innerWidth;

		calculatePosition(rect, tooltip.value);

		// Add event listeners to hide tooltip on interaction (unless persistent)
		if (!props.persistent) {
			document.addEventListener("wheel", hideTooltip, { passive: true });
			document.addEventListener("scroll", hideTooltip, { passive: true });
			document.addEventListener("resize", hideTooltip, { passive: true });
		}
		
		// Add global keydown listener for escape key
		if (props.dismissible) {
			document.addEventListener("keydown", handleGlobalKeydown);
		}

		const tooltipRect = tooltip.value.getBoundingClientRect();
		const tooltipContent = tooltip.value.querySelector(
			".tooltip-content"
		) as HTMLElement;
		if (!tooltipContent) {
			isAnimating.value = false;
			return;
		}

		// Handle responsive tooltip sizing
		tooltipContent.style.maxWidth = "none";
		tooltipContent.style.wordBreak = "normal";
		tooltipContent.style.whiteSpace = "normal";

		if (tooltipRect.left + tooltipRect.width > viewportWidth) {
			const triangleWidth = tooltipRect.width - tooltipContent.offsetWidth;
			tooltipContent.style.maxWidth = `${
				viewportWidth - tooltipRect.left - computedPadding.value - triangleWidth
			}px`;
			tooltipContent.style.wordBreak = "break-all";
			tooltipContent.style.whiteSpace = "wrap";
			calculatePosition(rect, tooltip.value);
		}

		// Announce to screen readers based on configuration
		const shouldAnnounce = props.accessibility?.announceContent ?? effectiveEssential.value;
		if (shouldAnnounce && props.text) {
			const politeness = props.accessibility?.announcePoliteness ?? 'polite';
			if (politeness === 'assertive') {
				screenReader.announceAssertively(props.text);
			} else {
				screenReader.announcePolitely(props.text);
			}
		}
		
		// Set up auto-hide timer if configured
		if (props.timing?.maxShowTime && props.timing.maxShowTime > 0) {
			autoHideTimer = setTimeout(() => {
				hideTooltip();
			}, props.timing.maxShowTime);
		}
		
		isAnimating.value = false;
		emit('tooltip-show', true);
	}

	function calculatePosition(rect: DOMRect, tooltip: HTMLElement): void {
		if (props.position === "left" || props.position === "right") {
			const horizontalPosition =
				props.position === "left"
					? rect.left - tooltip.offsetWidth - computedPadding.value
					: rect.right + computedPadding.value;

			tooltip.style.left = `${Math.max(0, horizontalPosition)}px`;
			tooltip.style.top = `${
				rect.top + rect.height / 2 - tooltip.offsetHeight / 2
			}px`;
		} else {
			const verticalPosition =
				props.position === "top"
					? rect.top - tooltip.offsetHeight
					: rect.bottom;

			tooltip.style.top = `${Math.max(0, verticalPosition)}px`;
			tooltip.style.left = `${
				rect.left + rect.width / 2 - tooltip.offsetWidth / 2
			}px`;
		}
	}

	// Enhanced tooltip management functions
	function showTooltipWithDelay(): void {
		if (hideTimer) {
			clearTimeout(hideTimer);
			hideTimer = null;
		}

		if (!showTimer) {
			showTimer = setTimeout(() => {
				showTooltip();
				showTimer = null;
			}, effectiveShowDelay.value);
		}
	}

	function hideTooltipWithDelay(): void {
		if (showTimer) {
			clearTimeout(showTimer);
			showTimer = null;
		}

		if (!hideTimer) {
			hideTimer = setTimeout(() => {
				hideTooltip();
				hideTimer = null;
			}, effectiveHideDelay.value);
		}
	}

	function hideTooltip(): void {
		if (!isVisible.value) return;
		
		isAnimating.value = true;
		isVisible.value = false;
		isHovering.value = false;
		isFocused.value = false;
		isClicked.value = false;
		
		// Clear auto-hide timer
		if (autoHideTimer) {
			clearTimeout(autoHideTimer);
			autoHideTimer = null;
		}
		
		// Remove event listeners when tooltip is hidden
		document.removeEventListener("wheel", hideTooltip);
		document.removeEventListener("scroll", hideTooltip);
		document.removeEventListener("resize", hideTooltip);
		document.removeEventListener("keydown", handleGlobalKeydown);
		
		isAnimating.value = false;
		emit('tooltip-hide', false);
	}

	// Event handlers
	function handleMouseEnter(): void {
		if (props.disabled || !triggers.value.includes('hover')) return;
		isHovering.value = true;
		showTooltipWithDelay();
	}

	function handleMouseLeave(): void {
		isHovering.value = false;
		if (!isFocused.value && !isClicked.value) {
			hideTooltipWithDelay();
		}
	}

	function handleFocus(event: FocusEvent): void {
		if (props.disabled || !triggers.value.includes('focus')) return;
		isFocused.value = true;
		showTooltipWithDelay();
		emit('tooltip-focus', event);
	}

	function handleBlur(event: FocusEvent): void {
		isFocused.value = false;
		if (!isHovering.value && !isClicked.value) {
			hideTooltipWithDelay();
		}
		emit('tooltip-blur', event);
	}

	function handleClick(): void {
		if (props.disabled || !triggers.value.includes('click')) return;
		isClicked.value = !isClicked.value;
		if (isClicked.value) {
			showTooltipWithDelay();
		} else {
			hideTooltipWithDelay();
		}
	}

	function handleKeyDown(e: KeyboardEvent): void {
		if (props.disabled) return;
		
		// Handle specific key interactions
		switch (e.key) {
			case 'Escape':
				if (props.dismissible && isVisible.value) {
					e.preventDefault();
					hideTooltip();
					// Return focus to trigger element
					if (content.value) {
						content.value.focus();
					}
					emit('tooltip-escape', e);
				}
				break;
				
			case 'Enter':
			case ' ':
				if (triggers.value.includes('click')) {
					e.preventDefault();
					handleClick();
				}
				break;
		}
	}

	function handleGlobalKeydown(e: KeyboardEvent): void {
		if (e.key === 'Escape' && props.dismissible && isVisible.value) {
			e.preventDefault();
			hideTooltip();
			// Return focus to trigger element
			if (content.value) {
				content.value.focus();
			}
			emit('tooltip-escape', e);
		}
	}

	// Watch for visibility changes
	watch(shouldShowTooltip, (newVal) => {
		if (newVal && !isVisible.value) {
			showTooltip();
		} else if (!newVal && isVisible.value) {
			hideTooltip();
		}
	});

	// Cleanup on unmount
	onBeforeUnmount(() => {
		if (showTimer) clearTimeout(showTimer);
		if (hideTimer) clearTimeout(hideTimer);
		if (autoHideTimer) clearTimeout(autoHideTimer);
		
		document.removeEventListener("wheel", hideTooltip);
		document.removeEventListener("scroll", hideTooltip);
		document.removeEventListener("resize", hideTooltip);
		document.removeEventListener("keydown", handleGlobalKeydown);
	});
</script>

<template>
	<div
		ref="content"
		:id="triggerId"
		:tabindex="triggerTabIndex"
		:aria-label="triggerAriaLabel"
		:aria-describedby="triggerAriaDescribedBy"
		:class="{ 'tooltip-trigger': true, 'tooltip-disabled': disabled }"
		@mouseenter="handleMouseEnter"
		@mouseleave="handleMouseLeave"
		@focus="handleFocus"
		@blur="handleBlur"
		@click="handleClick"
		@keydown="handleKeyDown">
		<Teleport to="body">
			<Transition 
				:name="shouldRespectReducedMotion ? 'none' : 'opacity'"
				appear>
				<div
					v-if="isVisible"
					:id="tooltipId"
					ref="tooltip"
					:class="tooltipClasses"
					:role="tooltipRole"
					:aria-hidden="!isVisible"
					:aria-live="effectiveEssential ? 'polite' : undefined"
					@mouseenter="handleMouseEnter"
					@mouseleave="handleMouseLeave">
					<div class="tooltip-triangle" />
					<div class="tooltip-content">
						<slot name="text">
							{{ text }}
						</slot>
					</div>
				</div>
			</Transition>
		</Teleport>
		<slot />
	</div>
</template>

<style scoped>
	@import "../../assets/main.css";
	
	/* Base tooltip styles */
	.tooltip {
		@apply z-30 fixed flex items-center pointer-events-none;
	}

	.tooltip-trigger {
		@apply outline-none;
	}

	.tooltip-disabled {
		@apply cursor-not-allowed opacity-50;
	}

	/* Triangle/arrow styles */
	.tooltip-triangle {
		@apply w-0 h-0 border-[9px] border-r-0 border-b-[9px] border-transparent relative;
	}

	/* Content styles with design system tokens */
	.tooltip-content {
		@apply flex items-center justify-center bg-negative px-xs py-xxs font-normal text-neutral-foreground-negative text-xs w-fit whitespace-nowrap pointer-events-auto;
		border-radius: var(--rounded-base);
		max-width: 300px;
		word-wrap: break-word;
		hyphens: auto;
	}

	/* Positioning styles */
	.right {
		@apply flex-row;
	}

	.right .tooltip-triangle {
		@apply rotate-180 right-[-2px];
		border-right-color: var(--color-negative);
	}

	.left {
		@apply flex-row-reverse;
	}

	.left .tooltip-triangle {
		@apply left-[-2px];
		border-left-color: var(--color-negative);
	}

	.top {
		@apply flex-col-reverse;
	}

	.top .tooltip-triangle {
		@apply rotate-90 top-[-5px];
		border-top-color: var(--color-negative);
	}

	.bottom {
		@apply flex-col;
	}

	.bottom .tooltip-triangle {
		@apply -rotate-90 bottom-[-5px];
		border-bottom-color: var(--color-negative);
	}

	/* Transition styles */
	.opacity-enter-active,
	.opacity-leave-active {
		@apply transition-opacity duration-300 ease-out;
	}

	.opacity-enter-from,
	.opacity-leave-to {
		@apply opacity-0;
	}

	.none-enter-active,
	.none-leave-active {
		@apply transition-none duration-0;
	}

	/* Focus styles for keyboard navigation */
	.tooltip-trigger:focus {
		@apply outline-none;
		box-shadow: 0 0 0 2px var(--color-primary-interaction-default);
		border-radius: var(--rounded-xxs);
	}

	.tooltip-trigger:focus:not(:focus-visible) {
		box-shadow: none;
	}

	.tooltip-trigger:focus-visible {
		box-shadow: 0 0 0 2px var(--color-primary-interaction-default);
		border-radius: var(--rounded-xxs);
	}

	/* Enhanced focus styles for better visibility */
	.tooltip-trigger[tabindex="0"]:focus {
		@apply outline-none;
		box-shadow: 0 0 0 2px var(--color-primary-interaction-default);
		border-radius: var(--rounded-xxs);
	}

	/* High contrast support */
	@media (prefers-contrast: high) {
		.tooltip-content {
			border: 2px solid var(--color-neutral-border-default);
			background-color: var(--color-neutral-background-default);
			color: var(--color-neutral-foreground-high);
		}
		
		.tooltip-triangle {
			filter: drop-shadow(0 0 0 var(--color-neutral-border-default));
		}
		
		.tooltip-trigger:focus,
		.tooltip-trigger:focus-visible,
		.tooltip-trigger[tabindex="0"]:focus {
			box-shadow: 0 0 0 3px var(--color-primary-interaction-default);
		}
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.opacity-enter-active,
		.opacity-leave-active {
			@apply transition-none duration-0;
		}
		
		.tooltip-content {
			@apply transition-none;
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

	/* Mobile and touch device support */
	@media (pointer: coarse) {
		.tooltip-content {
			@apply px-sm py-xs text-sm;
			min-height: 44px;
			min-width: 44px;
			@apply flex items-center justify-center;
		}
	}

	/* Dark mode support */
	@media (prefers-color-scheme: dark) {
		.tooltip-content {
			background-color: var(--color-neutral-surface-high);
			color: var(--color-neutral-foreground-high);
		}
	}
</style>