<script setup lang="ts">
import { ref, computed, reactive, provide, onMounted, onUnmounted, watch, nextTick } from "vue";
import { useAriaAttributes, useScreenReader, useKeyboardNavigation } from "../../composables";
import type {
	BCardIconProps,
	BCardIconEmits,
	BCardIconContext,
	BCardIconLoadingState,
	BCardIconInteractionType,
	BCardIconNavigationKey
} from "./BCardIcon.types";
import {
	CARD_ICON_NAVIGATION_KEYS,
	CARD_ICON_DEFAULTS,
	cardIconA11yUtils
} from "./BCardIcon.types";

// Re-export types for external use
export type { BCardIconProps, BCardIconEmits } from "./BCardIcon.types";

const props = withDefaults(
	defineProps<BCardIconProps>(),
	{
		title: "",
		icon: "",
		color: "",
		isIconRound: false,
		className: "",
		id: "",
		variant: CARD_ICON_DEFAULTS.variant,
		size: CARD_ICON_DEFAULTS.size,
		role: "article",
		interactive: false,
		selected: false,
		disabled: false,
		focusable: false,
		expandable: false,
		expanded: false,
		tabIndex: undefined
	}
);

const emit = defineEmits<BCardIconEmits>();

// Accessibility composables
const { useAriaId } = useAriaAttributes();
const screenReader = useScreenReader();

// Generate unique IDs
const cardId = props.id || useAriaId('card-icon');
const iconId = useAriaId('card-icon-icon');
const titleId = useAriaId('card-icon-title');

// Component state
const cardRef = ref<HTMLElement | null>(null);
const iconRef = ref<HTMLElement | null>(null);
const isFocused = ref(false);
const keyboardMode = ref(false);
const lastInteractionTime = ref(0);
const currentLoadingState = ref<BCardIconLoadingState>(
	props.loadingConfig?.state || CARD_ICON_DEFAULTS.loadingState
);
const currentExpanded = ref(props.expanded);

// Watch for prop changes
watch(
	() => props.loadingConfig?.state,
	(newState) => {
		if (newState) {
			currentLoadingState.value = newState;
			emit('loading-state-change', newState);
		}
	}
);

watch(
	() => props.expanded,
	(newExpanded) => {
		currentExpanded.value = newExpanded;
	}
);

// Computed properties
const computedRole = computed(() => {
	if (props.accessibilityConfig?.cardRole) return props.accessibilityConfig.cardRole;
	return cardIconA11yUtils.determineRole(
		props.interactive || false,
		props.expandable || false,
		props.interactionConfig?.type || CARD_ICON_DEFAULTS.interactionType
	);
});

const computedTabIndex = computed(() => {
	if (props.tabIndex !== undefined) return props.tabIndex;
	if (props.disabled) return -1;
	if (props.focusable || props.interactive || computedRole.value === 'button') return 0;
	return undefined;
});

const cardClasses = computed(() => [
	"b-card-icon",
	props.className,
	`variant-${props.variant}`,
	`size-${props.size}`,
	{
		"interactive": props.interactive,
		"focusable": props.focusable,
		"selected": props.selected,
		"disabled": props.disabled,
		"keyboard-focus": keyboardMode.value,
		"focused": isFocused.value,
		"loading": currentLoadingState.value === 'loading',
		"success": currentLoadingState.value === 'success',
		"error": currentLoadingState.value === 'error',
		"expandable": props.expandable,
		"expanded": currentExpanded.value,
		"enhanced-focus": props.accessibilityConfig?.enhancedFocus !== false
	}
]);

const cardAriaLabel = computed(() => {
	if (props.ariaLabel) return props.ariaLabel;
	return cardIconA11yUtils.generateCardLabel(
		props.title,
		props.context,
		props.selected,
		props.disabled
	);
});

const iconAttributes = computed(() => {
	return cardIconA11yUtils.generateIconAttributes(
		props.iconConfig,
		props.title
	);
});

const ariaAttributes = computed(() => {
	const attrs: Record<string, any> = {};
	
	// Basic ARIA attributes
	if (cardAriaLabel.value) attrs['aria-label'] = cardAriaLabel.value;
	if (props.ariaLabelledBy) attrs['aria-labelledby'] = props.ariaLabelledBy;
	if (props.ariaDescribedBy) attrs['aria-describedby'] = props.ariaDescribedBy;
	
	// State attributes
	if (props.disabled) attrs['aria-disabled'] = true;
	if (props.selected) attrs['aria-selected'] = true;
	if (props.interactive && props.selected) attrs['aria-pressed'] = true;
	
	// Expandable attributes
	if (props.expandable) {
		attrs['aria-expanded'] = currentExpanded.value;
	}
	
	// Loading state attributes
	if (currentLoadingState.value === 'loading') {
		attrs['aria-busy'] = true;
		attrs['aria-live'] = props.accessibilityConfig?.liveRegionPoliteness || CARD_ICON_DEFAULTS.liveRegionPoliteness;
	}
	
	// Group attributes
	if (props.groupConfig) {
		if (props.groupConfig.setSize) attrs['aria-setsize'] = props.groupConfig.setSize;
		if (props.groupConfig.posInSet) attrs['aria-posinset'] = props.groupConfig.posInSet;
		if (props.groupConfig.multiSelectable) attrs['aria-multiselectable'] = true;
		if (props.groupConfig.orientation) attrs['aria-orientation'] = props.groupConfig.orientation;
	}
	
	// Add data attributes
	if (props.dataAttributes) {
		Object.entries(props.dataAttributes).forEach(([key, value]) => {
			attrs[`data-${key}`] = value;
		});

// Watch for prop changes and handle loading state timeout
watch(
	() => currentLoadingState.value,
	(newState) => {
		if (newState === 'loading' && props.loadingConfig?.timeout) {
			setTimeout(() => {
				if (currentLoadingState.value === 'loading') {
					currentLoadingState.value = 'error';
					handleLoadingStateChange('error');
				}
			}, props.loadingConfig.timeout);
		}
	}
);
	}
	
	return attrs;
});

/**
 * Handle card click events
 */
function handleClick(event: MouseEvent): void {
	if (props.disabled || currentLoadingState.value === 'loading') return;
	
	// Track interaction timing
	lastInteractionTime.value = Date.now();
	keyboardMode.value = false;
	
	emit('click', event);
	
	// Handle different interaction types
	if (props.interactive) {
		const interactionType = props.interactionConfig?.type || 'button';
		
		switch (interactionType) {
			case 'toggle':
			case 'selectable':
				const newSelected = !props.selected;
				emit('select', newSelected);
				
				// Announce selection to screen readers
				if (props.interactionConfig?.announceChanges !== false) {
					const message = newSelected
						? `${props.title || 'Card'} selected`
						: `${props.title || 'Card'} deselected`;
					screenReader.announcePolitely(message);
				}
				break;
				
			case 'button':
			default:
				emit('interact', interactionType, event);
				
				if (props.interactionConfig?.announceChanges !== false) {
					screenReader.announcePolitely(`${props.title || 'Card'} activated`);
				}
				break;
		}
		
		emit('activate', event);
	}
	
	// Handle expandable cards
	if (props.expandable) {
		const newExpanded = !currentExpanded.value;
		currentExpanded.value = newExpanded;
		emit('expand', newExpanded);
		
		if (props.interactionConfig?.announceChanges !== false) {
			screenReader.announcePolitely(
				`${props.title || 'Card'} ${newExpanded ? 'expanded' : 'collapsed'}`
			);
		}
	}
	
	// Call custom interaction handler
	if (props.interactionConfig?.onInteract) {
		props.interactionConfig.onInteract(event);
	}
}

/**
 * Handle keyboard navigation
 */
function handleKeyDown(event: KeyboardEvent): void {
	keyboardMode.value = true;
	lastInteractionTime.value = Date.now();
	
	emit('keydown', event);
	
	if (props.disabled || currentLoadingState.value === 'loading') return;
	
	// Handle custom shortcuts
	if (props.interactionConfig?.shortcuts?.[event.key]) {
		event.preventDefault();
		props.interactionConfig.shortcuts[event.key]();
		return;
	}
	
	// Handle standard navigation keys
	const preventDefaultKeys = props.interactionConfig?.preventDefaultKeys || [];
	if (preventDefaultKeys.includes(event.key)) {
		event.preventDefault();
	}
	
	switch (event.key) {
		case CARD_ICON_NAVIGATION_KEYS.SPACE:
		case CARD_ICON_NAVIGATION_KEYS.ENTER:
			if (props.interactive || props.expandable) {
				event.preventDefault();
				handleClick(event as any);
			}
			break;
			
		case CARD_ICON_NAVIGATION_KEYS.ESCAPE:
			if (currentExpanded.value && props.expandable) {
				event.preventDefault();
				currentExpanded.value = false;
				emit('expand', false);
				
				if (props.interactionConfig?.announceChanges !== false) {
					screenReader.announcePolitely(`${props.title || 'Card'} collapsed`);
				}
			}
			break;
			
		case CARD_ICON_NAVIGATION_KEYS.ARROW_UP:
		case CARD_ICON_NAVIGATION_KEYS.ARROW_DOWN:
		case CARD_ICON_NAVIGATION_KEYS.ARROW_LEFT:
		case CARD_ICON_NAVIGATION_KEYS.ARROW_RIGHT:
		case CARD_ICON_NAVIGATION_KEYS.HOME:
		case CARD_ICON_NAVIGATION_KEYS.END:
			// Let parent components handle arrow navigation
			emit('action', 'navigate', { key: event.key, event });
			break;
	}
}

/**
 * Handle focus events
 */
function handleFocus(event: FocusEvent): void {
	isFocused.value = true;
	keyboardMode.value = true;
	
	emit('focus', event);
	
	// Announce card information on focus for screen readers
	if (props.interactionConfig?.announceChanges !== false && props.summary) {
		screenReader.announcePolitely(props.summary);
	}
}

/**
 * Handle blur events
 */
function handleBlur(event: FocusEvent): void {
	isFocused.value = false;
	
	// Reset keyboard mode after a short delay to allow for focus transitions
	setTimeout(() => {
		if (!isFocused.value) {
			keyboardMode.value = false;
		}
	}, 100);
	
	emit('blur', event);
}

/**
 * Handle mouse interactions
 */
function handleMouseDown(): void {
	keyboardMode.value = false;
}

/**
 * Announce message to screen readers
 */
function announceMessage(message: string, assertive = false): void {
	if (assertive) {
		screenReader.announceAssertively(message);
	} else {
		screenReader.announcePolitely(message);
	}
}

/**
 * Focus the card programmatically
 */
function focusCard(): void {
	if (cardRef.value) {
		cardRef.value.focus();
	}
}

/**
 * Handle loading state changes with announcements
 */
function handleLoadingStateChange(newState: BCardIconLoadingState): void {
	currentLoadingState.value = newState;
	
	if (props.interactionConfig?.announceChanges !== false) {
		const config = props.loadingConfig;
		switch (newState) {
			case 'loading':
				screenReader.announcePolitely(
					config?.loadingMessage || CARD_ICON_DEFAULTS.loadingMessage
				);
				break;
			case 'success':
				screenReader.announcePolitely(
					config?.successMessage || CARD_ICON_DEFAULTS.successMessage
				);
				break;
			case 'error':
				screenReader.announceAssertively(
					config?.errorMessage || CARD_ICON_DEFAULTS.errorMessage
				);
				break;
		}
	}
}

// Provide context for child components
const cardContext: BCardIconContext = reactive({
	cardId,
	interactive: computed(() => props.interactive || false),
	disabled: computed(() => props.disabled || false),
	selected: computed(() => props.selected || false),
	loadingState: currentLoadingState,
	announceMessage,
	focusCard
});

provide('cardIconContext', cardContext);

// Lifecycle management
onMounted(async () => {
	// Announce initial loading state if needed
	if (currentLoadingState.value === 'loading') {
		await nextTick();
		handleLoadingStateChange('loading');
	}
	
	// Validate touch targets for accessibility
	if (props.interactive && cardRef.value) {
		await nextTick();
		const minSize = props.interactionConfig?.minTouchTarget || CARD_ICON_DEFAULTS.minTouchTarget;
		if (!cardIconA11yUtils.validateTouchTarget(cardRef.value, minSize)) {
			console.warn(
				`BCardIcon touch target is smaller than ${minSize}px. Consider increasing size for better accessibility.`
			);
		}
	}
});

// Export component methods for testing
defineExpose({
	focusCard,
	announceMessage,
	getFocusableElements: () => {
		if (!cardRef.value) return [];
		const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
		return Array.from(cardRef.value.querySelectorAll<HTMLElement>(focusableSelectors));
	},
	handleLoadingStateChange
});
</script>

<template>
	<!-- Skip link for keyboard navigation -->
	<div v-if="props.accessibilityConfig?.skipLinksEnabled" class="skip-link-container sr-only-focusable">
		<a :href="`#${cardId}-content`" class="skip-link">
			{{ props.accessibilityConfig.skipLinkText || 'Skip to card content' }}
		</a>
	</div>
	
	<component
		:is="computedRole === 'button' ? 'button' : 'div'"
		:id="cardId"
		ref="cardRef"
		:role="computedRole !== 'button' ? computedRole : undefined"
		:tabindex="computedTabIndex"
		:class="cardClasses"
		v-bind="ariaAttributes"
		@click="handleClick"
		@keydown="handleKeyDown"
		@focus="handleFocus"
		@blur="handleBlur"
		@mousedown="handleMouseDown">
		
		<!-- Icon Section -->
		<div
			ref="iconRef"
			class="icon"
			:class="{
				'round-icon': isIconRound,
				'colored-background': color,
				'colored-text': color && isIconRound,
				'loading': currentLoadingState === 'loading',
				'error': currentLoadingState === 'error'
			}">
			
			<!-- Custom icon slot -->
			<slot name="icon" v-if="$slots.icon" />
			
			<!-- Default icon -->
			<BIcon 
				v-else-if="icon"
				:name="icon"
				:semantic="props.iconConfig?.iconSemantic || 'informative'"
				v-bind="iconAttributes"
				:loading="currentLoadingState === 'loading'"
				:announce-changes="props.interactionConfig?.announceChanges !== false" />
			
			<!-- Loading spinner for icon -->
			<div 
				v-if="currentLoadingState === 'loading' && props.loadingConfig?.showSpinner !== false"
				class="icon-loading-spinner"
				aria-hidden="true">
				<div class="spinner" />
			</div>
			
			<!-- Error indicator for icon -->
			<div 
				v-if="currentLoadingState === 'error'"
				class="icon-error-indicator"
				aria-hidden="true"
				title="Error loading content">
				⚠️
			</div>
		</div>
		
		<!-- Card Content -->
		<BCard 
			class="card-content p-lg"
			:class="{
				'interactive-card': props.interactive,
				'selected-card': props.selected,
				'disabled-card': props.disabled
			}"
			:aria-labelledby="titleId"
			:loading-state="currentLoadingState">
			
			<!-- Loading State -->
			<div v-if="currentLoadingState === 'loading'" class="loading-content" role="status">
				<slot name="loading">
					<div class="loading-message" :aria-label="props.loadingConfig?.loadingMessage || CARD_ICON_DEFAULTS.loadingMessage">
						<span class="sr-only">{{ props.loadingConfig?.loadingMessage || CARD_ICON_DEFAULTS.loadingMessage }}</span>
						<div class="loading-content-skeleton" aria-hidden="true">
							<!-- Skeleton loading content -->
							<div class="skeleton-title"></div>
							<div class="skeleton-text"></div>
							<div class="skeleton-text short"></div>
						</div>
					</div>
				</slot>
			</div>
			
			<!-- Error State -->
			<div v-else-if="currentLoadingState === 'error'" class="error-content" role="alert">
				<slot name="error">
					<div class="error-message">
						<div class="error-icon" aria-hidden="true">⚠️</div>
						<span>{{ props.loadingConfig?.errorMessage || CARD_ICON_DEFAULTS.errorMessage }}</span>
					</div>
				</slot>
			</div>
			
			<!-- Normal Content -->
			<div v-else :id="`${cardId}-content`" class="card-main-content">
				<!-- Header Section -->
				<header class="card-header flex justify-between items-start" role="banner">
					<div class="title-section">
						<h4
							:id="titleId"
							class="card-title"
							:class="{ 'colored-text': color }">
							{{ title }}
						</h4>
						
						<!-- Description/Summary for screen readers -->
						<p v-if="props.description" class="card-description sr-only">
							{{ props.description }}
						</p>
					</div>
					
					<!-- Title Actions -->
					<div v-if="$slots['title-actions']" class="title-actions" role="group" :aria-label="`${title || 'Card'} actions`">
						<slot name="title-actions" />
					</div>
				</header>
				
				<!-- Main Content -->
				<main v-if="$slots.default" class="card-body">
					<slot />
				</main>
				
				<!-- Footer Section -->
				<footer v-if="$slots.footer" class="card-footer">
					<slot name="footer" />
				</footer>
			</div>
		</BCard>
		
		<!-- Enhanced screen reader feedback -->
		<div aria-live="polite" aria-atomic="true" class="sr-only">
			<span v-if="props.selected && props.interactive">Selected</span>
			<span v-if="props.disabled">Disabled</span>
			<span v-if="currentExpanded && props.expandable">Expanded</span>
			<span v-if="currentLoadingState === 'loading'">
				{{ props.loadingConfig?.loadingMessage || CARD_ICON_DEFAULTS.loadingMessage }}
			</span>
			<span v-if="currentLoadingState === 'error'">
				{{ props.loadingConfig?.errorMessage || CARD_ICON_DEFAULTS.errorMessage }}
			</span>
			<span v-if="currentLoadingState === 'success'">
				{{ props.loadingConfig?.successMessage || CARD_ICON_DEFAULTS.successMessage }}
			</span>
			<span v-if="props.groupConfig">
				Item {{ props.groupConfig.posInSet }} of {{ props.groupConfig.setSize }}
			</span>
		</div>
		
		<!-- Expandable indicator -->
		<div v-if="props.expandable" class="expand-indicator" aria-hidden="true">
			<span class="sr-only">{{ currentExpanded ? 'Collapse' : 'Expand' }}</span>
			<div class="expand-icon" :class="{ 'expanded': currentExpanded }">
				{{ currentExpanded ? '▼' : '▶' }}
			</div>
		</div>
		
		<!-- Focus ring for keyboard navigation -->
		<div v-if="isFocused && keyboardMode" class="focus-ring" aria-hidden="true"></div>
	</component>
</template>

<style scoped>
@import "../../assets/main.css";

/* Base card icon styles */
.b-card-icon {
	@apply relative min-w-20xl transition-all duration-200 ease-in-out;
}

/* Interactive states */
.b-card-icon.interactive {
	@apply cursor-pointer;
}

.b-card-icon.interactive:hover {
	@apply transform scale-[1.02] shadow-lg;
}

.b-card-icon.disabled {
	@apply opacity-60 cursor-not-allowed;
}

.b-card-icon.selected {
	@apply ring-2 ring-primary-interaction-default ring-offset-2;
}

/* Focus states */
.b-card-icon.keyboard-focus {
	@apply ring-2 ring-primary-interaction-default ring-offset-4;
}

.b-card-icon.enhanced-focus:focus-visible {
	@apply outline-none ring-2 ring-primary-interaction-default ring-offset-4 shadow-lg;
}

/* Icon container */
.icon {
	@apply flex items-center justify-center rounded-full bg-primary-interaction-default p-xxs w-fit h-fit text-neutral-foreground-negative absolute left-[-15px] top-[16px] transition-all duration-200 ease-in-out;
	@apply min-w-[44px] min-h-[44px]; /* WCAG AA touch target size */

	.b-icon {
		@apply text-xl;
	}
}

.icon.round-icon {
	@apply bg-transparent text-primary-interaction-default p-0;

	.b-icon {
		@apply text-3xl;
	}
}

/* Icon loading states */
.icon.loading {
	@apply opacity-70;
}

.icon.error {
	@apply bg-danger text-white;
}

/* Icon loading spinner */
.icon-loading-spinner {
	@apply absolute inset-0 flex items-center justify-center;
}

.spinner {
	@apply w-4 h-4 border-2 border-white border-t-transparent rounded-full;
	animation: spin 1s linear infinite;
}

.icon-error-indicator {
	@apply absolute -top-1 -right-1 text-xs bg-danger text-white rounded-full w-5 h-5 flex items-center justify-center;
}

/* Card content */
.card-content {
	@apply transition-all duration-200 ease-in-out;
}

.card-content.interactive-card {
	@apply hover:shadow-md;
}

.card-content.selected-card {
	@apply bg-primary-interaction-default/5;
}

.card-content.disabled-card {
	@apply opacity-60;
}

/* Card header */
.card-header {
	@apply gap-sm;
}

.card-title {
	@apply text-primary-interaction-default font-bold text-base;
}

.card-description {
	@apply text-sm text-neutral-foreground-medium mt-xs;
}

.title-actions {
	@apply flex gap-xs items-center;
}

/* Loading content */
.loading-content {
	@apply p-base;
}

.loading-content-skeleton {
	@apply space-y-sm;
}

.skeleton-title {
	@apply h-4 bg-gray-300 rounded animate-pulse;
}

.skeleton-text {
	@apply h-3 bg-gray-200 rounded animate-pulse;
}

.skeleton-text.short {
	@apply w-3/4;
}

/* Error content */
.error-content {
	@apply p-base;
}

.error-message {
	@apply flex items-center gap-xs text-danger;
}

.error-icon {
	@apply text-lg;
}

/* Expandable indicator */
.expand-indicator {
	@apply absolute bottom-2 right-2 text-neutral-foreground-medium transition-transform duration-200;
}

.expand-icon {
	@apply transition-transform duration-200;
}

.expand-icon.expanded {
	@apply rotate-90;
}

/* Focus ring */
.focus-ring {
	@apply absolute inset-0 rounded-lg border-2 border-primary-interaction-default pointer-events-none;
	animation: focus-pulse 1.5s ease-in-out infinite;
}

/* Color customization */
*.colored-background {
	background: v-bind(color);
}

.b-card-icon *.colored-text {
	color: v-bind(color);
}

/* Skip links */
.skip-link-container {
	@apply relative;
}

.skip-link {
	@apply absolute left-0 top-0 bg-primary-interaction-default text-white px-base py-sm rounded transform -translate-y-full opacity-0 transition-all duration-200;
	@apply focus:translate-y-0 focus:opacity-100 z-50;
}

/* Screen reader only content */
.sr-only {
	position: absolute !important;
	width: 1px !important;
	height: 1px !important;
	padding: 0 !important;
	margin: -1px !important;
	overflow: hidden !important;
	clip: rect(0, 0, 0, 0) !important;
	white-space: nowrap !important;
	border: 0 !important;
}

.sr-only-focusable:focus {
	position: static !important;
	width: auto !important;
	height: auto !important;
	padding: inherit !important;
	margin: inherit !important;
	overflow: visible !important;
	clip: auto !important;
	white-space: normal !important;
}

/* Size variants */
.b-card-icon.size-small {
	@apply min-w-16xl;
	
	.icon {
		@apply min-w-[40px] min-h-[40px];
		
		.b-icon {
			@apply text-lg;
		}
	}
}

.b-card-icon.size-large {
	@apply min-w-24xl;
	
	.icon {
		@apply min-w-[48px] min-h-[48px];
		
		.b-icon {
			@apply text-2xl;
		}
	}
}

/* Variant styles */
.b-card-icon.variant-elevated {
	@apply shadow-lg;
}

.b-card-icon.variant-outlined {
	@apply border border-neutral-border-default;
}

.b-card-icon.variant-filled {
	@apply bg-neutral-background-subtle;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
	.b-card-icon {
		@apply border-2 border-gray-800;
	}
	
	.b-card-icon.interactive:hover {
		@apply bg-gray-100 border-black;
	}
	
	.b-card-icon.selected {
		@apply bg-black text-white;
	}
	
	.card-title {
		@apply font-black text-lg;
	}
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
	.b-card-icon,
	.icon,
	.card-content,
	.expand-icon,
	.focus-ring {
		transition: none !important;
		animation: none !important;
	}
	
	.b-card-icon.interactive:hover {
		transform: none;
	}
	
	.spinner {
		animation: none;
		border-color: white;
		border-top-color: transparent;
	}
}

/* Dark theme support */
@media (prefers-color-scheme: dark) {
	.b-card-icon {
		@apply bg-gray-800 border-gray-700;
	}
	
	.card-title {
		@apply text-gray-100;
	}
	
	.skeleton-title,
	.skeleton-text {
		@apply bg-gray-600;
	}
	
	.skip-link {
		@apply bg-gray-900 text-gray-100;
	}
}

/* Touch device optimizations */
@media (pointer: coarse) {
	.b-card-icon {
		@apply min-w-24xl; /* Larger touch targets */
	}
	
	.icon {
		@apply min-w-[48px] min-h-[48px];
	}
	
	.title-actions button,
	.title-actions [role="button"] {
		@apply min-w-[44px] min-h-[44px];
	}
}

/* Animations */
@keyframes spin {
	from { transform: rotate(0deg); }
	to { transform: rotate(360deg); }
}

@keyframes focus-pulse {
	0%, 100% { opacity: 0.6; }
	50% { opacity: 1; }
}

/* Print styles */
@media print {
	.b-card-icon {
		@apply shadow-none transform-none;
	}
	
	.skip-link,
	.focus-ring,
	.expand-indicator {
		@apply hidden;
	}
	
	.sr-only {
		position: static !important;
		width: auto !important;
		height: auto !important;
		overflow: visible !important;
		clip: auto !important;
	}
}
</style>
