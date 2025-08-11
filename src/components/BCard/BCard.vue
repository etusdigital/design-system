<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, provide, reactive, watch, nextTick } from "vue";
import { useAriaAttributes, useScreenReader, useFocusTrap } from "#composables";
import type { 
	BCardProps, 
	BCardEmits, 
	BCardContext, 
	BCardLoadingState,
	BCardNavigationKey
} from "./BCard.types";
import { CARD_NAVIGATION_KEYS } from "./BCard.types";

// Re-export types for external use
export type { BCardProps, BCardEmits } from "./BCard.types";

const props = withDefaults(
	defineProps<BCardProps>(),
	{
		className: "",
		role: "article",
		ariaLabel: "",
		ariaLabelledBy: "",
		ariaDescribedBy: "",
		focusable: false,
		interactive: false,
		selected: false,
		disabled: false,
		id: "",
		variant: "default",
		trapFocus: false,
		size: "medium",
		loadingState: "idle" as BCardLoadingState,
		expandable: false,
		expanded: false,
		title: "",
		description: "",
		loadingMessage: "Loading content",
		errorMessage: "Error loading content",
	}
);

const emit = defineEmits<BCardEmits>();

// Accessibility composables
const { useAriaId } = useAriaAttributes();
const screenReader = useScreenReader();

// Generate unique IDs
const cardId = props.id || useAriaId('card');

// Component state
const cardRef = ref<HTMLElement | null>(null);
const isFocused = ref(false);
const keyboardMode = ref(false);
const trapFocusActive = ref(false);
const lastInteractionTime = ref(0);
const actionElements = reactive<Map<string, HTMLElement>>(new Map());
const currentLoadingState = ref<BCardLoadingState>(props.loadingState);
const currentExpanded = ref(props.expanded);

// Watch for prop changes
watch(() => props.loadingState, (newState) => {
	currentLoadingState.value = newState;
	emit('loading-state-change', newState);
});

watch(() => props.expanded, (newExpanded) => {
	currentExpanded.value = newExpanded;
});

// Focus trap composable
const { activate: activateFocusTrap, deactivate: deactivateFocusTrap } = useFocusTrap(cardRef, trapFocusActive);

// Computed properties
const computedRole = computed(() => {
	if (props.interactive && !props.expandable) return "button";
	if (props.expandable) return "button";
	return props.role;
});

const computedTabIndex = computed(() => {
	if (props.disabled) return -1;
	if (props.focusable || props.interactive) return 0;
	return undefined;
});

const cardClasses = computed(() => [
	"b-card",
	props.className,
	`variant-${props.variant}`,
	`size-${props.size}`,
	{
		"interactive": props.interactive,
		"focusable": props.focusable,
		"selected": props.selected,
		"disabled": props.disabled,
		"keyboard-focus": keyboardMode.value,
		"focused": isFocused.value
	}
]);

const ariaAttributes = computed(() => {
	const attrs: Record<string, any> = {};
	
	// Basic ARIA attributes
	if (props.ariaLabel) attrs['aria-label'] = props.ariaLabel;
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
		attrs['aria-live'] = 'polite';
	}
	
	// Group attributes
	if (props.groupConfig) {
		if (props.groupConfig.setSize) attrs['aria-setsize'] = props.groupConfig.setSize;
		if (props.groupConfig.posInSet) attrs['aria-posinset'] = props.groupConfig.posInSet;
		if (props.groupConfig.multiSelectable) attrs['aria-multiselectable'] = true;
		if (props.groupConfig.orientation) attrs['aria-orientation'] = props.groupConfig.orientation;
	}
	
	return attrs;
});

// Computed class list with enhanced states
const enhancedCardClasses = computed(() => [
	...cardClasses.value,
	{
		"loading": currentLoadingState.value === 'loading',
		"success": currentLoadingState.value === 'success',
		"error": currentLoadingState.value === 'error',
		"expandable": props.expandable,
		"expanded": currentExpanded.value,
		"has-media": Boolean(props.mediaConfig),
		"keyboard-navigation": props.interactionConfig?.keyboardNavigable !== false,
	}
]);

/**
 * Handle card click events
 */
function handleClick(event: MouseEvent): void {
	if (props.disabled || currentLoadingState.value === 'loading') return;
	
	// Track interaction timing
	lastInteractionTime.value = Date.now();
	keyboardMode.value = false;
	
	emit('click', event);
	
	if (props.interactive) {
		const newSelected = !props.selected;
		emit('select', newSelected);
		
		// Announce selection to screen readers
		if (props.interactionConfig?.announceChanges !== false) {
			const cardLabel = props.ariaLabel || props.title || 'Card';
			if (newSelected) {
				screenReader.announcePolitely(`${cardLabel} selected`);
			} else {
				screenReader.announcePolitely(`${cardLabel} deselected`);
			}
		}
	}
	
	// Handle expandable cards
	if (props.expandable) {
		const newExpanded = !currentExpanded.value;
		currentExpanded.value = newExpanded;
		emit('expand', newExpanded);
		
		if (props.interactionConfig?.announceChanges !== false) {
			const cardLabel = props.ariaLabel || props.title || 'Card';
			screenReader.announcePolitely(
				`${cardLabel} ${newExpanded ? 'expanded' : 'collapsed'}`
			);
		}
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
		case CARD_NAVIGATION_KEYS.SPACE:
		case CARD_NAVIGATION_KEYS.ENTER:
			if (props.interactive || props.expandable) {
				event.preventDefault();
				handleClick(event as any);
			}
			break;
			
		case CARD_NAVIGATION_KEYS.ESCAPE:
			if (props.trapFocus && cardRef.value) {
				event.preventDefault();
				trapFocusActive.value = false;
				cardRef.value.blur();
			} else if (currentExpanded.value && props.expandable) {
				event.preventDefault();
				currentExpanded.value = false;
				emit('expand', false);
				if (props.interactionConfig?.announceChanges !== false) {
					const cardLabel = props.ariaLabel || props.title || 'Card';
					screenReader.announcePolitely(`${cardLabel} collapsed`);
				}
			}
			break;
			
		case CARD_NAVIGATION_KEYS.ARROW_UP:
		case CARD_NAVIGATION_KEYS.ARROW_DOWN:
		case CARD_NAVIGATION_KEYS.ARROW_LEFT:
		case CARD_NAVIGATION_KEYS.ARROW_RIGHT:
		case CARD_NAVIGATION_KEYS.HOME:
		case CARD_NAVIGATION_KEYS.END:
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
	
	// Trap focus if enabled
	if (props.trapFocus) {
		trapFocusActive.value = true;
	}
}

/**
 * Handle blur events
 */
function handleBlur(event: FocusEvent): void {
	isFocused.value = false;
	keyboardMode.value = false;
	
	emit('blur', event);
	
	// Release focus trap if enabled
	if (props.trapFocus) {
		trapFocusActive.value = false;
	}
}

/**
 * Handle mouse interactions
 */
function handleMouseDown(): void {
	keyboardMode.value = false;
}

/**
 * Register action elements for accessibility
 */
function registerAction(id: string, element: HTMLElement): void {
	actionElements.set(id, element);
}

/**
 * Unregister action elements
 */
function unregisterAction(id: string): void {
	actionElements.delete(id);
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
 * Handle loading state changes with announcements
 */
function handleLoadingStateChange(newState: BCardLoadingState): void {
	currentLoadingState.value = newState;
	
	if (props.interactionConfig?.announceChanges !== false) {
		switch (newState) {
			case 'loading':
				screenReader.announcePolitely(props.loadingMessage);
				break;
			case 'success':
				screenReader.announcePolitely('Content loaded successfully');
				break;
			case 'error':
				screenReader.announceAssertively(props.errorMessage);
				break;
		}
	}
}

// Provide context for child components
const cardContext: BCardContext = reactive({
	cardId,
	interactive: computed(() => props.interactive),
	disabled: computed(() => props.disabled),
	selected: computed(() => props.selected),
	loadingState: currentLoadingState,
	registerAction,
	unregisterAction,
	announceMessage,
});

provide('cardContext', cardContext);

// Lifecycle management
onMounted(async () => {
	if (props.trapFocus) {
		trapFocusActive.value = true;
	}
	
	// Announce initial loading state if needed
	if (currentLoadingState.value === 'loading') {
		await nextTick();
		handleLoadingStateChange('loading');
	}
	
	// Setup skip links if configured
	if (props.skipLinksConfig?.enabled) {
		setupSkipLinks();
	}
});

onBeforeUnmount(() => {
	if (props.trapFocus) {
		trapFocusActive.value = false;
	}
});

/**
 * Setup skip links for card navigation
 */
function setupSkipLinks(): void {
	const skipLinksContainer = cardRef.value?.querySelector('.skip-links');
	if (!skipLinksContainer) return;
	
	// Add default skip links
	const contentLink = skipLinksContainer.querySelector('[href="#card-content"]');
	if (contentLink) {
		contentLink.addEventListener('click', (e) => {
			e.preventDefault();
			const content = cardRef.value?.querySelector('.b-card-content');
			if (content) {
				(content as HTMLElement).focus();
				screenReader.announcePolitely('Skipped to card content');
			}
		});
	}
	
	const actionsLink = skipLinksContainer.querySelector('[href="#card-actions"]');
	if (actionsLink) {
		actionsLink.addEventListener('click', (e) => {
			e.preventDefault();
			const actions = cardRef.value?.querySelector('.b-card-footer');
			if (actions) {
				(actions as HTMLElement).focus();
				screenReader.announcePolitely('Skipped to card actions');
			}
		});
	}
}

// Export component methods for testing
defineExpose({
	focusCard: () => cardRef.value?.focus(),
	announceMessage,
	getFocusableElements: () => {
		if (!cardRef.value) return [];
		const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
		return Array.from(cardRef.value.querySelectorAll<HTMLElement>(focusableSelectors));
	},
	registerAction,
	unregisterAction,
});
</script>

<template>
	<!-- Skip links for keyboard navigation -->
	<div v-if="props.skipLinksConfig?.enabled" class="skip-links sr-only-focusable">
		<a href="#card-content" class="skip-link">
			{{ props.skipLinksConfig.skipToContentText || 'Skip to card content' }}
		</a>
		<a v-if="$slots.footer || $slots.actions" href="#card-actions" class="skip-link">
			{{ props.skipLinksConfig.skipToActionsText || 'Skip to card actions' }}
		</a>
		<template v-if="props.skipLinksConfig.customSkipLinks">
			<a 
				v-for="link in props.skipLinksConfig.customSkipLinks" 
				:key="link.href"
				:href="link.href" 
				class="skip-link">
				{{ link.text }}
			</a>
		</template>
	</div>

	<component
		:is="computedRole === 'button' ? 'button' : 'div'"
		:id="cardId"
		ref="cardRef"
		:role="computedRole !== 'button' ? computedRole : undefined"
		:tabindex="computedTabIndex"
		:class="enhancedCardClasses"
		v-bind="ariaAttributes"
		@click="handleClick"
		@keydown="handleKeyDown"
		@focus="handleFocus"
		@blur="handleBlur"
		@mousedown="handleMouseDown">
		
		<!-- Card Media Slot -->
		<div v-if="$slots.media" class="b-card-media" :aria-label="props.mediaConfig?.mediaDescription">
			<slot name="media" />
		</div>
		
		<!-- Card Header Slot -->
		<header v-if="$slots.header" class="b-card-header" :id="props.skipLinksConfig?.enabled ? 'card-header' : undefined">
			<slot name="header" />
		</header>
		
		<!-- Loading State -->
		<div v-if="currentLoadingState === 'loading'" class="b-card-loading" role="status" :aria-label="props.loadingMessage">
			<slot name="loading">
				<div class="loading-spinner" aria-hidden="true"></div>
				<span class="sr-only">{{ props.loadingMessage }}</span>
			</slot>
		</div>
		
		<!-- Error State -->
		<div v-else-if="currentLoadingState === 'error'" class="b-card-error" role="alert" :aria-label="props.errorMessage">
			<slot name="error">
				<div class="error-icon" aria-hidden="true">⚠️</div>
				<span>{{ props.errorMessage }}</span>
			</slot>
		</div>
		
		<!-- Card Content -->
		<div v-else-if="$slots.default" class="b-card-content" :id="props.skipLinksConfig?.enabled ? 'card-content' : undefined" tabindex="-1">
			<slot />
		</div>
		
		<!-- Card Actions Slot (separate from footer) -->
		<div v-if="$slots.actions" class="b-card-actions" :id="props.skipLinksConfig?.enabled ? 'card-actions' : undefined" role="group" :aria-label="`${props.title || 'Card'} actions`">
			<slot name="actions" />
		</div>
		
		<!-- Card Footer Slot -->
		<footer v-if="$slots.footer" class="b-card-footer" :id="!$slots.actions && props.skipLinksConfig?.enabled ? 'card-actions' : undefined">
			<slot name="footer" />
		</footer>
		
		<!-- Enhanced screen reader feedback -->
		<div aria-live="polite" aria-atomic="true" class="sr-only">
			<span v-if="props.selected && props.interactive">Selected</span>
			<span v-if="props.disabled">Disabled</span>
			<span v-if="currentExpanded && props.expandable">Expanded</span>
			<span v-if="currentLoadingState === 'loading'">{{ props.loadingMessage }}</span>
			<span v-if="currentLoadingState === 'error'">{{ props.errorMessage }}</span>
			<span v-if="currentLoadingState === 'success'">Content loaded successfully</span>
			<span v-if="props.groupConfig">
				Item {{ props.groupConfig.posInSet }} of {{ props.groupConfig.setSize }}
			</span>
		</div>
		
		<!-- Expandable indicator -->
		<div v-if="props.expandable" class="expand-indicator sr-only" aria-hidden="true">
			{{ currentExpanded ? 'Collapse' : 'Expand' }}
		</div>
	</component>
</template>

