<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useAriaAttributes } from "../../composables/useAriaAttributes";
import { useScreenReader, screenReaderUtils } from "../../composables/useScreenReader";
import type { BActionCardProps, BActionCardEmits } from "./BActionCard.types";

const props = withDefaults(
	defineProps<BActionCardProps>(),
	{
		icon: "",
		color: "",
		hideDrag: false,
		interactive: false,
		announceActions: true,
		cardRole: "article",
		actionContext: "",
		dragDisabled: false,
		disabled: false,
		selected: false,
		supportHighContrast: true,
		respectReducedMotion: true,
		enforceMinimumTouchTarget: true,
		tabIndex: 0,
		ariaCurrent: false,
		hasError: false,
		loading: false,
		loadingAnnouncement: "Loading",
		activationAnnouncement: "",
		selectionAnnouncement: "",
		dragLabel: "",
		deleteLabel: "",
		errorMessage: "",
		ariaLevel: undefined,
		ariaPosInSet: undefined,
		ariaSetSize: undefined,
		keyboardShortcuts: () => ({}),
	}
);

const emit = defineEmits<BActionCardEmits>();

// Accessibility setup
const { useAriaId, useButtonAria, useBusyAria } = useAriaAttributes();
const { announcePolitely, announceAssertively } = useScreenReader();

// Component state
const isDragging = ref(false);
const isFocused = ref(false);
const cardRef = ref<HTMLElement | null>(null);
const loadingState = ref(props.loading);
const errorState = ref(props.hasError);

// Generate unique IDs for ARIA relationships
const cardId = useAriaId('action-card');
const headerId = useAriaId('card-header');
const contentId = useAriaId('card-content');
const errorId = useAriaId('card-error');
const loadingId = useAriaId('card-loading');

// Computed properties for accessibility
const cardAriaAttributes = computed(() => {
	const describedByIds = [
		props.ariaDescribedBy,
		errorState.value ? errorId : undefined,
		loadingState.value ? loadingId : undefined,
	].filter(Boolean).join(' ');

	return {
		id: cardId,
		role: props.interactive ? 'button' : props.cardRole,
		'aria-label': props.ariaLabel,
		'aria-labelledby': props.ariaLabelledBy || (!props.ariaLabel ? headerId : undefined),
		'aria-describedby': describedByIds || undefined,
		'aria-disabled': props.disabled,
		'aria-selected': props.selected,
		'aria-pressed': props.interactive && props.selected ? props.selected : undefined,
		'aria-current': props.ariaCurrent !== false ? props.ariaCurrent : undefined,
		'aria-level': props.ariaLevel,
		'aria-posinset': props.ariaPosInSet,
		'aria-setsize': props.ariaSetSize,
		'aria-busy': loadingState.value,
		'aria-invalid': errorState.value,
		tabindex: props.interactive && !props.disabled ? props.tabIndex : undefined,
	};
});

const dragHandleAriaAttributes = computed(() => {
	const label = props.dragLabel || `${props.actionContext ? props.actionContext + ' - ' : ''}Drag to reorder card`;
	return {
		...useButtonAria(undefined, undefined, undefined, label).value,
		'aria-label': label,
	};
});

const deleteButtonAriaAttributes = computed(() => {
	const label = props.deleteLabel || `${props.actionContext ? props.actionContext + ' - ' : ''}Delete card`;
	return {
		...useButtonAria(undefined, undefined, undefined, label).value,
		'aria-label': label,
	};
});

// Watchers for state changes
watch(() => props.loading, (newLoading) => {
	loadingState.value = newLoading;
	emit('loading-change', newLoading);
	
	if (props.announceActions) {
		if (newLoading) {
			announcePolitely(props.loadingAnnouncement || "Loading");
		} else {
			announcePolitely("Loading complete");
		}
	}
});

watch(() => props.hasError, (newError) => {
	errorState.value = newError;
	emit('error-change', newError, props.errorMessage);
	
	if (props.announceActions && newError && props.errorMessage) {
		announceAssertively(`Error: ${props.errorMessage}`);
	}
});

// Event handlers
onMounted(() => {
	window.addEventListener("mousemove", move);
	window.addEventListener("mouseup", end);
	window.addEventListener("touchmove", move);
	window.addEventListener("touchend", end);
});

onBeforeUnmount(() => {
	window.removeEventListener("mousemove", move);
	window.removeEventListener("mouseup", end);
	window.removeEventListener("touchmove", move);
	window.removeEventListener("touchend", end);
});

// Drag functionality
function changeState(value: boolean, event: Event) {
	isDragging.value = value;
	
	if (props.announceActions) {
		if (value) {
			announcePolitely("Started dragging card");
		} else {
			announcePolitely("Stopped dragging card");
		}
	}
	
	if (value) emit("dragstart", event);
	else emit("dragend", event);
}

function start(event: Event) {
	if (props.dragDisabled || props.disabled) {
		event.preventDefault();
		if (props.announceActions) {
			announceAssertively("Drag action is disabled");
		}
		return;
	}
	changeState(true, getEvent(event));
}

function move(event: Event) {
	if (!isDragging.value) return;
	emit("dragging", getEvent(event));
}

function end(event: Event) {
	if (!isDragging.value) return;
	changeState(false, getEvent(event));
}

function getEvent(event: Event): Event {
	if (event instanceof TouchEvent)
		return event.touches[0] as unknown as Event;
	return event;
}

// Interactive card handlers
function handleCardClick(event: MouseEvent) {
	if (props.disabled || !props.interactive) return;
	
	emit("click", event);
	
	if (props.announceActions) {
		announcePolitely(`Card ${props.selected ? 'deselected' : 'selected'}`);
	}
}

function handleCardKeydown(event: KeyboardEvent) {
	if (props.disabled) return;
	
	// Handle keyboard shortcuts
	if (props.keyboardShortcuts) {
		const { key, ctrlKey, altKey, shiftKey, metaKey } = event;
		const shortcutKey = `${ctrlKey ? 'ctrl+' : ''}${altKey ? 'alt+' : ''}${shiftKey ? 'shift+' : ''}${metaKey ? 'meta+' : ''}${key.toLowerCase()}`;
		
		// Check for activate shortcuts
		if (props.keyboardShortcuts.activate?.includes(shortcutKey)) {
			event.preventDefault();
			emit("keyboard-shortcut", shortcutKey, event);
			if (props.interactive) {
				emit("activate", event);
				if (props.announceActions) {
					const announcement = props.activationAnnouncement || `Card activated`;
					announcePolitely(announcement);
				}
			}
			return;
		}
		
		// Check for delete shortcuts
		if (props.keyboardShortcuts.delete?.includes(shortcutKey)) {
			event.preventDefault();
			emit("keyboard-shortcut", shortcutKey, event);
			handleDelete();
			return;
		}
	}
	
	// Default interactive behavior
	if (props.interactive && (event.key === 'Enter' || event.key === ' ')) {
		event.preventDefault();
		emit("activate", event);
		
		if (props.announceActions) {
			const announcement = props.activationAnnouncement || 
				(props.selected ? 'Card deselected' : 'Card selected');
			announcePolitely(announcement);
		}
	}
}

// Focus handlers
function handleFocus(event: FocusEvent) {
	isFocused.value = true;
	emit("focus", event);
}

function handleBlur(event: FocusEvent) {
	isFocused.value = false;
	emit("blur", event);
}

// Delete handler
function handleDelete() {
	if (props.disabled) {
		if (props.announceActions) {
			announceAssertively("Delete action is disabled");
		}
		return;
	}
	
	if (props.announceActions) {
		announcePolitely("Card deleted");
	}
	
	emit("delete");
}

// Drag handle keyboard support
function handleDragKeydown(event: KeyboardEvent) {
	if (props.dragDisabled || props.disabled) return;
	
	// Provide keyboard instructions for drag operations
	if (event.key === 'Enter' || event.key === ' ') {
		event.preventDefault();
		if (props.announceActions) {
			announcePolitely("Use arrow keys to move the card, press Enter to drop, press Escape to cancel");
		}
	}
}

// Delete button keyboard support
function handleDeleteKeydown(event: KeyboardEvent) {
	if (props.disabled) return;
	
	if (event.key === 'Enter' || event.key === ' ') {
		event.preventDefault();
		handleDelete();
	}
}
</script>

<template>
	<div 
		ref="cardRef"
		class="b-action-card"
		:class="{
			'b-action-card--dragging': isDragging,
			'b-action-card--focused': isFocused,
			'b-action-card--disabled': disabled,
			'b-action-card--interactive': interactive,
			'b-action-card--selected': selected,
			'b-action-card--loading': loadingState,
			'b-action-card--error': errorState,
			'b-action-card--high-contrast': supportHighContrast,
			'b-action-card--reduced-motion': respectReducedMotion,
			'b-action-card--large-touch': enforceMinimumTouchTarget,
		}"
		v-bind="cardAriaAttributes"
		@click="handleCardClick"
		@keydown="handleCardKeydown"
		@focus="handleFocus"
		@blur="handleBlur">
		
		<!-- Drag Handle -->
		<div
			v-if="!hideDrag"
			class="b-action-card__drag-handle"
			:class="{
				'b-action-card__drag-handle--disabled': dragDisabled || disabled,
				'cursor-grab': !isDragging && !dragDisabled && !disabled,
				'cursor-grabbing': isDragging,
				'cursor-not-allowed': dragDisabled || disabled,
			}"
			v-bind="dragHandleAriaAttributes"
			tabindex="0"
			@mousedown="start"
			@touchstart="start"
			@keydown="handleDragKeydown">
			<slot name="dragHandle">
				<BIcon
					name="drag_indicator"
					:aria-hidden="true" />
			</slot>
		</div>

		<!-- Card Content -->
		<BCard 
			class="b-action-card__content rounded-lg *:px-xl"
			:class="{
				'b-action-card__content--disabled': disabled,
				'b-action-card__content--selected': selected,
			}">
			
			<!-- Header -->
			<header
				:id="headerId"
				class="b-action-card__header flex items-center gap-xs bg-primary-interaction-default text-neutral-foreground-negative rounded-lg py-sm"
				:class="{ 'rounded-b-none': $slots.card }"
				:style="{ background: color }">
				<BIcon
					v-if="icon"
					:name="icon"
					:aria-hidden="true" />
				<slot />
			</header>

			<!-- Card Content Slot -->
			<div
				v-if="$slots.card"
				:id="contentId"
				class="b-action-card__body py-sm">
				<slot name="card" />
			</div>
		</BCard>

		<!-- Delete Button -->
		<div
			class="b-action-card__delete-button"
			:class="{
				'b-action-card__delete-button--disabled': disabled,
				'cursor-pointer': !disabled,
				'cursor-not-allowed': disabled,
			}"
			v-bind="deleteButtonAriaAttributes"
			tabindex="0"
			@click="handleDelete"
			@keydown="handleDeleteKeydown">
			<slot name="deleteButton">
				<BIcon
					name="delete"
					:aria-hidden="true" />
			</slot>
		</div>

		<!-- Loading State Indicator -->
		<div
			v-if="loadingState"
			:id="loadingId"
			class="sr-only"
			role="status"
			aria-live="polite">
			{{ loadingAnnouncement || 'Loading' }}
		</div>

		<!-- Error State Indicator -->
		<div
			v-if="errorState && errorMessage"
			:id="errorId"
			class="sr-only"
			role="alert"
			aria-live="assertive">
			{{ errorMessage }}
		</div>

		<!-- Screen Reader Live Region for Announcements -->
		<div
			v-if="announceActions"
			aria-live="polite"
			aria-atomic="true"
			class="sr-only">
		</div>
	</div>
</template>

<style scoped>
@import "../../assets/main.css";

.b-action-card {
	@apply flex items-center gap-xxs transition-all duration-200 ease-in-out;
	@apply focus-within:ring-2 focus-within:ring-primary-interaction-default focus-within:ring-offset-2;
}

/* Hover effects */
.b-action-card:hover:not(.b-action-card--disabled) {
	@apply scale-105;
}

.b-action-card:hover:not(.b-action-card--disabled) .b-action-card__drag-handle,
.b-action-card:hover:not(.b-action-card--disabled) .b-action-card__delete-button {
	@apply text-neutral-interaction-default;
}

/* Interactive card styles */
.b-action-card--interactive {
	@apply cursor-pointer;
}

.b-action-card--interactive:focus {
	@apply outline-none ring-2 ring-primary-interaction-default ring-offset-2;
}

.b-action-card--interactive:focus-visible {
	@apply ring-4;
}

/* Selected state */
.b-action-card--selected .b-action-card__content {
	@apply ring-2 ring-primary-interaction-default;
}

/* Disabled state */
.b-action-card--disabled {
	@apply opacity-60 cursor-not-allowed;
}

.b-action-card--disabled * {
	@apply pointer-events-none;
}

/* Loading state */
.b-action-card--loading {
	@apply relative;
}

.b-action-card--loading::before {
	content: '';
	@apply absolute inset-0 bg-neutral-background-subtle bg-opacity-50 pointer-events-none rounded-lg;
	z-index: 1;
}

.b-action-card--loading .b-action-card__content {
	@apply relative;
}

/* Error state */
.b-action-card--error {
	@apply border border-danger-border-default;
}

.b-action-card--error .b-action-card__content {
	@apply border-danger-border-default;
}

/* Dragging state */
.b-action-card--dragging {
	@apply scale-105 opacity-80;
}

/* Focused state */
.b-action-card--focused {
	@apply ring-2 ring-primary-interaction-default ring-offset-2;
}

/* Drag handle */
.b-action-card__drag-handle {
	@apply flex items-center text-neutral-interaction-disabled transition-colors duration-150;
	@apply focus:outline-none focus:ring-2 focus:ring-primary-interaction-default focus:ring-offset-1;
	@apply hover:text-neutral-interaction-default;
	min-width: 24px;
	min-height: 24px;
}

.b-action-card__drag-handle--disabled {
	@apply text-neutral-interaction-disabled opacity-50;
}

.b-action-card__drag-handle:focus-visible {
	@apply ring-4;
}

/* Card content */
.b-action-card__content {
	@apply flex-1;
}

.b-action-card__content--disabled {
	@apply opacity-60;
}

.b-action-card__content--selected {
	@apply ring-2 ring-primary-interaction-default;
}

/* Header */
.b-action-card__header {
	@apply transition-colors duration-150;
}

/* Body */
.b-action-card__body {
	@apply transition-opacity duration-150;
}

/* Delete button */
.b-action-card__delete-button {
	@apply flex items-center text-neutral-interaction-disabled transition-colors duration-150;
	@apply focus:outline-none focus:ring-2 focus:ring-primary-interaction-default focus:ring-offset-1;
	@apply hover:text-neutral-interaction-default;
	min-width: 24px;
	min-height: 24px;
}

.b-action-card__delete-button--disabled {
	@apply text-neutral-interaction-disabled opacity-50;
}

.b-action-card__delete-button:focus-visible {
	@apply ring-4;
}

/* Screen reader only class */
.sr-only {
	position: absolute;
	left: -10000px;
	width: 1px;
	height: 1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
}

/* High contrast support */
@media (prefers-contrast: high) {
	.b-action-card {
		@apply border border-solid border-neutral-border-default;
	}
	
	.b-action-card--selected .b-action-card__content {
		@apply border-2 border-solid border-primary-interaction-default;
	}
	
	.b-action-card:focus-within,
	.b-action-card--interactive:focus {
		@apply border-2 border-solid border-primary-interaction-default;
	}
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
	.b-action-card {
		@apply transition-none;
	}
	
	.b-action-card:hover:not(.b-action-card--disabled) {
		@apply scale-100;
	}
	
	.b-action-card__drag-handle,
	.b-action-card__delete-button,
	.b-action-card__header,
	.b-action-card__body {
		@apply transition-none;
	}
}

/* Large touch targets for mobile and accessibility */
@media (max-width: 768px) {
	.b-action-card__drag-handle,
	.b-action-card__delete-button {
		min-width: 44px;
		min-height: 44px;
	}
}

/* Large touch targets when enforced */
.b-action-card--large-touch .b-action-card__drag-handle,
.b-action-card--large-touch .b-action-card__delete-button {
	min-width: 44px;
	min-height: 44px;
	@apply p-xs;
}

/* High contrast support when enforced */
.b-action-card--high-contrast {
	@apply border border-solid border-neutral-border-default;
}

.b-action-card--high-contrast.b-action-card--selected .b-action-card__content {
	@apply border-2 border-solid border-primary-interaction-default;
}

.b-action-card--high-contrast:focus-within,
.b-action-card--high-contrast.b-action-card--interactive:focus {
	@apply border-2 border-solid border-primary-interaction-default;
}

.b-action-card--high-contrast.b-action-card--error {
	@apply border-2 border-solid border-danger-border-default;
}

/* Reduced motion support when enforced */
.b-action-card--reduced-motion {
	@apply transition-none;
}

.b-action-card--reduced-motion:hover:not(.b-action-card--disabled) {
	@apply scale-100;
}

.b-action-card--reduced-motion .b-action-card__drag-handle,
.b-action-card--reduced-motion .b-action-card__delete-button,
.b-action-card--reduced-motion .b-action-card__header,
.b-action-card--reduced-motion .b-action-card__body {
	@apply transition-none;
}

/* Focus indicators enhancement */
.b-action-card:focus-within .b-action-card__drag-handle:focus,
.b-action-card:focus-within .b-action-card__delete-button:focus {
	@apply ring-4 ring-primary-interaction-default ring-offset-2;
}

/* Loading spinner space (if needed) */
.b-action-card--loading .b-action-card__header::after {
	content: '';
	@apply inline-block w-4 h-4 ml-xs border-2 border-white border-t-transparent rounded-full animate-spin;
}
</style>