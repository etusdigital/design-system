<script setup lang="ts">
import { computed, ref, watch, nextTick } from "vue";
import { useAriaAttributes, useScreenReader, useFocusTrap, useKeyboardNavigation } from "#composables";
import type { BMetricCardProps, TrendInfo, ChartAccessibility } from "./types";

const props = withDefaults(
	defineProps<BMetricCardProps>(),
	{
		title: "",
		description: "",
		value: "",
		icon: "",
		color: "",
		type: "default",
		size: "medium",
		infoMessage: "",
		infoType: "primary",
		tooltipMinWidth: "none",
		loading: false,
		noTooltip: false,
		boldTitle: false,
		loadingLabel: "Loading metric data",
		role: "region",
		headingLevel: 3,
		interactive: false,
		announceChanges: false,
		liveRegion: "polite",
		highContrast: false
	}
);

const emit = defineEmits<{
	click: [event: Event];
	keydown: [event: KeyboardEvent];
	focus: [event: FocusEvent];
	blur: [event: FocusEvent];
}>();

// Refs
const cardRef = ref<HTMLElement | null>(null);
const previousValue = ref<string | number>("");

// Composables  
const { useBusyAria } = useAriaAttributes();
const { announcePolitely } = useScreenReader();
const { activate, deactivate } = useFocusTrap(cardRef, ref(false));
const { setActiveIndex, handleKeydown } = useKeyboardNavigation(ref([]), () => {}, { loop: true });

// Computed properties
const loadingRef = computed(() => props.loading);
const busyAriaAttrs = useBusyAria(loadingRef, props.loadingLabel);

// Accessibility computed properties
const cardAriaLabel = computed(() => {
	if (props.ariaLabel) return props.ariaLabel;
	
	let label = props.title || "Metric card";
	if (props.value) {
		label += `, value: ${props.value}`;
	}
	if (props.description) {
		label += `, ${props.description}`;
	}
	if (props.metricContext) {
		label += ` from ${props.metricContext}`;
	}
	return label;
});

const cardRole = computed(() => {
	if (props.interactive) return "button";
	return props.role || "region";
});

const liveRegionAttrs = computed(() => {
	if (props.announceChanges && props.liveRegion !== "off") {
		return {
			"aria-live": props.liveRegion,
			"aria-atomic": "true"
		};
	}
	return {};
});

const trendDescription = computed(() => {
	if (!props.trend) return "";
	
	const { direction, change, period } = props.trend;
	let desc = `Trend: ${direction}`;
	if (change) desc += ` by ${change}`;
	if (period) desc += ` ${period}`;
	return desc;
});

const chartDescription = computed(() => {
	if (!props.chart) return "";
	return `${props.chart.type} chart: ${props.chart.dataDescription}. ${props.chart.summary || ""}`;
});

const fullAriaDescription = computed(() => {
	const descriptions = [];
	
	if (props.ariaDescription) descriptions.push(props.ariaDescription);
	if (trendDescription.value) descriptions.push(trendDescription.value);
	if (chartDescription.value) descriptions.push(chartDescription.value);
	if (props.interactive) descriptions.push("Press Enter or Space to interact");
	if (props.keyboardShortcut) descriptions.push(`Keyboard shortcut: ${props.keyboardShortcut}`);
	
	return descriptions.join(". ");
});

// Helper functions
const getTrendIcon = (direction: string) => {
	switch (direction) {
		case 'up': return 'trending_up';
		case 'down': return 'trending_down';
		case 'stable': return 'trending_flat';
		default: return 'remove';
	}
};

// Event handlers
const handleClick = (event: Event) => {
	if (!props.interactive) return;
	emit("click", event);
};

const handleKeyDown = (event: KeyboardEvent) => {
	emit("keydown", event);
	
	if (!props.interactive) return;
	
	if (event.key === "Enter" || event.key === " ") {
		event.preventDefault();
		emit("click", event);
	}
	
	handleKeydown(event);
};

const handleFocus = (event: FocusEvent) => {
	emit("focus", event);
	if (props.interactive && props.title) {
		announcePolitely(`Focused on ${props.title} metric card. Press Enter or Space to interact.`);
	}
};

const handleBlur = (event: FocusEvent) => {
	emit("blur", event);
};

// Watchers for screen reader announcements
watch(
	() => props.value,
	(newValue, oldValue) => {
		if (props.announceChanges && newValue !== oldValue && oldValue !== undefined && !props.loading) {
			nextTick(() => {
				const message = `${props.title || "Metric"} updated from ${oldValue} to ${newValue}`;
				announcePolitely(message);
			});
		}
		previousValue.value = oldValue || "";
	}
);

watch(
	() => props.trend,
	(newTrend, oldTrend) => {
		if (props.announceChanges && newTrend && newTrend !== oldTrend) {
			nextTick(() => {
				const message = trendDescription.value;
				announcePolitely(message);
			});
		}
	},
	{ deep: true }
);

watch(
	() => props.loading,
	(isLoading) => {
		if (props.announceChanges) {
			const message = isLoading 
				? props.loadingLabel || "Loading metric data"
				: `${props.title || "Metric"} data loaded`;
			announcePolitely(message);
		}
	}
);
</script>

<template>
	<BCard
		ref="cardRef"
		class="b-metric-card"
		:class="[type, size, { 
			'interactive': interactive, 
			'high-contrast': highContrast,
			'has-trend': trend,
			'has-chart': chart
		}]"
		:role="cardRole"
		:aria-label="cardAriaLabel"
		:aria-description="fullAriaDescription"
		:tabindex="interactive ? 0 : undefined"
		v-bind="{ ...busyAriaAttrs, ...liveRegionAttrs }"
		@click="handleClick"
		@keydown="handleKeyDown"
		@focus="handleFocus"
		@blur="handleBlur">
		<div
			class="flex gap-xxs items-center"
			v-if="(title || icon || $slots['title-slot']) && !loading">
			<BIcon
				class="icon"
				:name="icon"
				v-if="icon"
				aria-hidden="true" />
			<slot name="title-slot">
				<component
					:is="headingLevel ? `h${headingLevel}` : 'p'"
					class="card-title"
					:class="{ 'font-bold': boldTitle }"
					:aria-level="headingLevel">
					{{ title }}
				</component>
			</slot>
			<slot name="info">
				<template v-if="infoMessage">
					<BTooltip v-if="!noTooltip">
						<template #text>
							<div
								class="tooltip-text"
								:class="{
									'whitespace-nowrap break-words text-wrap':
										tooltipMinWidth != 'none',
								}"
								:style="{ minWidth: tooltipMinWidth }">
								{{ infoMessage }}
							</div>
						</template>
						<BIcon
							name="info"
							class="info-icon info-label"
							:class="[infoType]"
							aria-hidden="true" />
					</BTooltip>
					<p
						class="info-text info-label"
						:class="[infoType]"
						role="status"
						aria-live="polite"
						v-else>
						{{ infoMessage }}
					</p>
				</template>
			</slot>
		</div>
		<div
			class="skeleton-div header"
			v-else-if="loading"
			role="status"
			:aria-label="loadingLabel" />
		<slot
			name="content"
			v-if="!loading">
			<div class="flex items-end gap-xs" role="group" aria-label="Metric data">
				<slot name="value-slot">
					<p
						class="card-value"
						:class="{ 'colored-text': color }"
						role="status"
						:aria-label="`Primary value: ${value}`">
						{{ value }}
					</p>
				</slot>
				<slot name="description-slot">
					<p 
						class="card-description"
						:aria-label="`Additional context: ${description}`">
						{{ description }}
					</p>
				</slot>
				<!-- Trend indicator -->
				<div v-if="trend" class="trend-indicator" role="img" :aria-label="trendDescription">
					<BIcon 
						:name="trend.icon || getTrendIcon(trend.direction)"
						class="trend-icon"
						:class="`trend-${trend.direction}`"
						:style="{ color: trend.color }"
						aria-hidden="true" />
					<span class="sr-only">{{ trendDescription }}</span>
				</div>
			</div>
		</slot>
		<div
			class="skeleton-div content"
			v-else
			role="status"
			:aria-label="loadingLabel" />
		
		<!-- Chart/additional content -->
		<div v-if="chart && !loading" class="chart-container" role="img" :aria-label="chartDescription">
			<slot name="chart">
				<p class="sr-only">{{ chart.altText || chartDescription }}</p>
			</slot>
		</div>
		
		<slot v-if="!loading" />
	</BCard>
</template>

<style scoped>
	@import "../../assets/main.css";
	
	.b-metric-card {
		@apply flex flex-col gap-xs p-sm text-neutral-interaction-default bg-neutral-surface-default border-xs border-neutral-border-default shadow-none;
	}

	/* Interactive states */
	.b-metric-card.interactive {
		@apply cursor-pointer transition-all duration-200;
	}

	.b-metric-card.interactive:hover {
		@apply shadow-md transform-gpu translate-y-[-1px];
	}

	.b-metric-card.interactive:focus {
		@apply outline-none ring-2 ring-primary-interaction-default ring-offset-2;
	}

	.b-metric-card.interactive:active {
		@apply transform-gpu translate-y-0 shadow-sm;
	}

	/* High contrast mode */
	.b-metric-card.high-contrast {
		@apply border-2 font-bold;
	}

	.b-metric-card.high-contrast.success {
		background-color: var(--hc-success-bg, #004d00);
		color: var(--hc-success-fg, #ffffff);
		border-color: var(--hc-success-border, #00ff00);
	}

	.b-metric-card.high-contrast.danger {
		background-color: var(--hc-danger-bg, #660000);
		color: var(--hc-danger-fg, #ffffff);
		border-color: var(--hc-danger-border, #ff0000);
	}

	.b-metric-card.high-contrast.warning {
		background-color: var(--hc-warning-bg, #664400);
		color: var(--hc-warning-fg, #ffffff);
		border-color: var(--hc-warning-border, #ffaa00);
	}

	.b-metric-card.success {
		@apply text-success-foreground-low border-success-border-default bg-success-surface-default;

		*.info-label {
			@apply text-success-interaction-default;
		}
	}

	.b-metric-card.danger {
		@apply text-danger-foreground-low border-danger-border-default bg-danger-surface-default;

		*.info-label {
			@apply text-danger-interaction-default;
		}
	}

	.b-metric-card.sample {
		@apply text-informative-foreground-high border-informative-border-default border-dashed;

		*.info-label {
			@apply text-informative-foreground-high;
		}
	}

	.b-metric-card.card {
		@apply border-none;
		box-shadow: var(--box-shadow-neutral-default);

		.card-value.colored-text {
			color: v-bind(color);
		}

		.card-title {
			@apply font-bold;
		}
	}

	/* Trend indicators */
	.trend-indicator {
		@apply flex items-center ml-xs;
	}

	.trend-icon {
		@apply text-sm transition-colors duration-200;
	}

	.trend-icon.trend-up {
		@apply text-success-interaction-default;
	}

	.trend-icon.trend-down {
		@apply text-danger-interaction-default;
	}

	.trend-icon.trend-stable {
		@apply text-neutral-interaction-default;
	}

	.trend-icon.trend-neutral {
		@apply text-informative-interaction-default;
	}

	/* Chart container */
	.chart-container {
		@apply mt-sm;
	}

	/* Screen reader only text */
	.sr-only {
		@apply sr-only;
	}

	/* Size variations */
	.b-metric-card.small {
		@apply px-sm py-xs gap-0;

		.card-title {
			font-size: var(--font-size-xxs);
		}

		.card-value {
			@apply text-lg;
		}

		.card-description,
		.icon {
			@apply text-xs;
		}

		.info-icon {
			@apply text-base;
		}

		.info-text {
			font-size: var(--font-size-xxs);
		}

		.tooltip-text {
			font-size: var(--font-size-xxs);
		}

		.skeleton-div.header {
			@apply h-[12px];
		}

		.skeleton-div.content {
			@apply h-[16px];
		}

		.trend-icon {
			@apply text-xs;
		}
	}

	.b-metric-card.medium {
		.card-title {
			@apply text-xs;
		}

		.card-value {
			@apply text-xl;
		}

		.card-description,
		.icon {
			@apply text-sm;
		}

		.info-icon {
			@apply text-lg;
		}

		.info-text {
			font-size: var(--font-size-xxs);
		}

		.skeleton-div.header {
			@apply h-[14px];
		}

		.skeleton-div.content {
			@apply h-[18px];
		}

		.trend-icon {
			@apply text-sm;
		}
	}

	.b-metric-card.large {
		.card-title {
			@apply text-sm;
		}

		.card-value {
			@apply text-2xl;
		}

		.card-description {
			@apply text-sm;
		}

		.icon {
			@apply text-base;
		}

		.info-icon {
			@apply text-xl;
		}

		.info-text {
			@apply text-xs;
		}

		.skeleton-div.header {
			@apply h-[14px];
		}

		.skeleton-div.content {
			@apply h-[20px];
		}

		.trend-icon {
			@apply text-base;
		}
	}

	.info-icon {
		@apply h-[1em] flex items-center;
	}

	.info-text {
		@apply font-bold ml-xxs;
	}

	.info-label {
		@apply text-neutral-interaction-default;
	}

	.info-label.sample {
		@apply text-informative-interaction-default;
	}

	.info-label.primary {
		@apply text-primary-interaction-default;
	}

	.info-label.info {
		@apply text-informative-interaction-default;
	}

	.info-label.success {
		@apply text-success-interaction-default;
	}

	.info-label.warning {
		@apply text-warning-interaction-default;
	}

	.info-label.danger {
		@apply text-danger-interaction-default;
	}

	.tooltip-text {
		@apply text-xs;
	}

	.card-value {
		@apply font-bold;
	}

	.skeleton-div {
		@apply bg-neutral-surface-disabled bg-linear-to-r from-transparent via-white to-transparent;
		background-size: 200% 100%;
		animation: moveBar 1.5s linear infinite;
	}

	.skeleton-div.header {
		@apply w-[3em] mb-xs;
	}

	.skeleton-div.content {
		@apply w-full min-w-[8em];
	}

	@keyframes moveBar {
		0% {
			background-position: -100% 0;
		}
		100% {
			background-position: 100% 0;
		}
	}

	/* High contrast media query support */
	@media (prefers-contrast: high) {
		.b-metric-card {
			@apply border-2 font-bold;
		}
		
		.b-metric-card.interactive:focus {
			@apply ring-4 ring-offset-4;
		}
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.b-metric-card.interactive,
		.trend-icon,
		.skeleton-div {
			@apply transition-none;
			animation: none;
		}
		
		.b-metric-card.interactive:hover {
			@apply transform-none;
		}
	}
</style>