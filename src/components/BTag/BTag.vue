<script setup lang="ts">
import { computed, ref } from "vue";
import { useAriaAttributes, useScreenReader } from "#composables";
import BSpinner from "../BSpinner/BSpinner.vue";
import BIcon from "../BIcon/BIcon.vue";

/**
 * Tag semantic roles for accessibility
 */
type TagSemanticRole = 'generic' | 'button' | 'link' | 'status' | 'group' | 'listitem';

/**
 * Tag interaction types for accessibility
 */
type TagInteractionType = 'static' | 'removable' | 'clickable' | 'selectable';

/**
 * Tag color variants with semantic meaning
 */
type TagColor = 'primary' | 'informative' | 'success' | 'warning' | 'danger' | 'neutral';

/**
 * Tag size variants
 */
type TagSize = 'small' | 'medium' | 'large';

/**
 * Tag visual variants
 */
type TagVariant = 'default' | 'secondary' | 'heavy' | 'outline';

/**
 * Accessibility properties for tags
 */
interface TagAccessibilityProps {
	/** ARIA label for the tag */
	ariaLabel?: string;
	/** ARIA description for complex tags */
	ariaDescription?: string;
	/** Semantic role of the tag */
	role?: TagSemanticRole;
	/** Whether the tag is currently selected/active */
	selected?: boolean;
	/** Whether the tag is disabled */
	disabled?: boolean;
	/** ARIA described-by reference */
	ariaDescribedBy?: string;
	/** Custom close button label for screen readers */
	closeLabel?: string;
	/** Whether to announce state changes */
	announceChanges?: boolean;
	/** Category/group for related tags */
	category?: string;
	/** Value for selectable tags */
	value?: string | number;
}

/**
 * Enhanced tag properties with comprehensive accessibility
 */
interface BTagProps extends TagAccessibilityProps {
	/** Tag text content */
	text?: string;
	/** Tag color variant with semantic meaning */
	color?: TagColor;
	/** Tag size */
	size?: TagSize;
	/** Visual variant */
	variant?: TagVariant;
	/** Loading state */
	loading?: boolean;
	/** Whether the tag can be removed */
	closeable?: boolean;
	/** Icon name */
	icon?: string;
	/** Whether icon appears after text */
	isAppendedIcon?: boolean;
	/** Interaction behavior */
	interaction?: TagInteractionType;
	/** Whether tag is clickable */
	clickable?: boolean;
	/** Maximum width before truncation */
	maxWidth?: string;
	/** Truncate long text */
	truncate?: boolean;
	/** Custom CSS classes */
	customClass?: string;
}

const props = withDefaults(defineProps<BTagProps>(), {
	text: '',
	color: 'primary',
	size: 'medium',
	variant: 'default',
	loading: false,
	closeable: false,
	icon: '',
	isAppendedIcon: false,
	interaction: 'static',
	clickable: false,
	selected: false,
	disabled: false,
	truncate: true,
	role: 'generic',
	announceChanges: false,
	closeLabel: 'Remove tag'
});

const emit = defineEmits<{
	(e: 'close', event: MouseEvent | KeyboardEvent): void;
	(e: 'click', event: MouseEvent): void;
	(e: 'keydown', event: KeyboardEvent): void;
	(e: 'select', selected: boolean, value?: string | number): void;
}>();

// Accessibility composables
const { useAriaId } = useAriaAttributes();
const screenReader = useScreenReader();

// Component state
const tagRef = ref<HTMLElement>();
const isFocused = ref(false);
const isPressed = ref(false);

// Generate unique IDs for ARIA relationships
const tagId = useAriaId('tag');
const closeButtonId = useAriaId('tag-close');

// Computed properties for accessibility
const computedRole = computed(() => {
	if (props.role !== 'generic') return props.role;
	
	switch (props.interaction) {
		case 'clickable':
		case 'selectable':
			return 'button';
		case 'removable':
			return props.clickable ? 'button' : 'generic';
		case 'static':
		default:
			return 'generic';
	}
});

const computedAriaLabel = computed(() => {
	if (props.ariaLabel) return props.ariaLabel;
	
	const parts = [];
	
	// Add category if provided
	if (props.category) {
		parts.push(`${props.category} tag:`);
	}
	
	// Add main text
	const mainText = props.text || 'Tag';
	parts.push(mainText);
	
	// Add color semantic meaning
	const colorMeanings: Record<TagColor, string> = {
		primary: '',
		informative: 'informational',
		success: 'success',
		warning: 'warning',
		danger: 'error',
		neutral: 'neutral'
	};
	
	if (colorMeanings[props.color]) {
		parts.push(colorMeanings[props.color]);
	}
	
	// Add state information
	if (props.selected) {
		parts.push('selected');
	}
	
	if (props.disabled) {
		parts.push('disabled');
	}
	
	if (props.closeable) {
		parts.push('removable');
	}
	
	return parts.join(', ');
});

const computedTabIndex = computed(() => {
	if (props.disabled) return -1;
	if (props.clickable || props.interaction === 'clickable' || props.interaction === 'selectable') {
		return 0;
	}
	return -1;
});

const computedAriaPressed = computed(() => {
	if (props.interaction === 'selectable') {
		return props.selected ? 'true' : 'false';
	}
	return undefined;
});

// Tag styling classes
const tagClasses = computed(() => {
	const classes = [
		'b-tag',
		`b-tag--${props.color}`,
		`b-tag--${props.size}`,
		`b-tag--${props.variant}`,
		`b-tag--${props.interaction}`
	];
	
	if (props.selected) classes.push('b-tag--selected');
	if (props.disabled) classes.push('b-tag--disabled');
	if (props.clickable || props.interaction !== 'static') classes.push('b-tag--interactive');
	if (props.loading) classes.push('b-tag--loading');
	if (isFocused.value) classes.push('b-tag--focused');
	if (isPressed.value) classes.push('b-tag--pressed');
	if (props.customClass) classes.push(props.customClass);
	
	return classes.join(' ');
});

// Icon computations
const prependIcon = computed(() => {
	if (!props.isAppendedIcon && props.icon) return props.icon;
	return '';
});

const appendedIcon = computed(() => {
	if (props.closeable) return 'close';
	if (props.isAppendedIcon && props.icon) return props.icon;
	return '';
});

// Event handlers
function handleClick(event: MouseEvent) {
	if (props.disabled) return;
	
	// Handle selectable tags
	if (props.interaction === 'selectable') {
		const newSelected = !props.selected;
		emit('select', newSelected, props.value);
		
		// Announce selection change
		if (props.announceChanges) {
			const message = newSelected 
				? `${props.text} selected` 
				: `${props.text} deselected`;
			screenReader.announcePolitely(message);
		}
	}
	
	emit('click', event);
}

function handleKeydown(event: KeyboardEvent) {
	if (props.disabled) return;
	
	// Handle Enter and Space for interactive tags
	if (event.key === 'Enter' || event.key === ' ') {
		event.preventDefault();
		handleClick(event as unknown as MouseEvent);
	}
	
	// Handle Delete/Backspace for removable tags
	if ((event.key === 'Delete' || event.key === 'Backspace') && props.closeable) {
		event.preventDefault();
		handleClose(event as unknown as MouseEvent);
	}
	
	emit('keydown', event);
}

function handleClose(event: MouseEvent | KeyboardEvent) {
	if (props.disabled) return;
	
	emit('close', event);
	
	// Announce removal for screen readers
	if (props.announceChanges) {
		screenReader.announcePolitely(`${props.text || 'Tag'} removed`);
	}
}

function handleFocus() {
	isFocused.value = true;
}

function handleBlur() {
	isFocused.value = false;
	isPressed.value = false;
}

function handleMouseDown() {
	isPressed.value = true;
}

function handleMouseUp() {
	isPressed.value = false;
}

function handleMouseLeave() {
	isPressed.value = false;
}
</script>

<template>
	<div
		:id="tagId"
		ref="tagRef"
		:class="tagClasses"
		:role="computedRole"
		:aria-label="computedAriaLabel"
		:aria-describedby="ariaDescribedBy"
		:aria-pressed="computedAriaPressed"
		:aria-disabled="disabled ? 'true' : undefined"
		:tabindex="computedTabIndex"
		:style="{ maxWidth: maxWidth }"
		@click="handleClick"
		@keydown="handleKeydown"
		@focus="handleFocus"
		@blur="handleBlur"
		@mousedown="handleMouseDown"
		@mouseup="handleMouseUp"
		@mouseleave="handleMouseLeave">
		
		<!-- Loading state -->
		<BSpinner
			v-if="loading"
			class="b-tag__spinner"
			size="small"
			aria-label="Loading tag content" />
		
		<!-- Tag content -->
		<template v-else>
			<!-- Prepended icon -->
			<BIcon
				v-if="prependIcon"
				class="b-tag__icon b-tag__icon--prepend"
				:name="prependIcon"
				semantic="decorative"
				aria-hidden="true" />
			
			<!-- Tag text content -->
			<span 
				class="b-tag__content"
				:class="{ 'b-tag__content--truncate': truncate }">
				<slot>{{ text }}</slot>
			</span>
			
			<!-- Appended icon or close button -->
			<template v-if="appendedIcon">
				<!-- Close button -->
				<button
					v-if="closeable"
					:id="closeButtonId"
					type="button"
					class="b-tag__close-button"
					:aria-label="closeLabel"
					:disabled="disabled"
					@click.stop="handleClose"
					@keydown.stop.enter.space="handleClose">
					<BIcon
						name="close"
						class="b-tag__close-icon"
						semantic="interactive"
						:alt="closeLabel" />
				</button>
				
				<!-- Regular appended icon -->
				<BIcon
					v-else
					class="b-tag__icon b-tag__icon--append"
					:name="appendedIcon"
					semantic="decorative"
					aria-hidden="true" />
			</template>
		</template>
		
		<!-- Screen reader instructions for interactive tags -->
		<div 
			v-if="interaction !== 'static'"
			class="sr-only"
			aria-live="polite">
			<span v-if="interaction === 'selectable'">
				Press Enter or Space to {{ selected ? 'deselect' : 'select' }}
			</span>
			<span v-else-if="clickable">
				Press Enter or Space to activate
			</span>
			<span v-if="closeable">
				, Delete or Backspace to remove
			</span>
		</div>
	</div>
</template>

<style scoped>
/* Base tag styles */
.b-tag {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: var(--space-xxs, 0.125rem);
	overflow: hidden;
	position: relative;
	width: fit-content;
	height: fit-content;
	border-radius: 9999px;
	border-width: 1px;
	border-style: solid;
	font-weight: 600;
	transition: all 0.2s ease;
	user-select: none;
	vertical-align: middle;
}

/* Size variants */
.b-tag--small {
	font-size: var(--font-size-xs, 0.75rem);
	padding: var(--space-xxs, 0.125rem) var(--space-sm, 0.5rem);
}

.b-tag--small .b-tag__icon {
	font-size: 1rem;
}

.b-tag--medium {
	font-size: var(--font-size-sm, 0.875rem);
	padding: var(--space-xs, 0.25rem) var(--space-base, 0.75rem);
}

.b-tag--medium .b-tag__icon {
	font-size: 1.125rem;
}

.b-tag--large {
	font-size: var(--font-size-base, 1rem);
	padding: var(--space-sm, 0.5rem) var(--space-lg, 1rem);
}

.b-tag--large .b-tag__icon {
	font-size: 1.25rem;
}

/* Color variants - Primary */
.b-tag--primary {
	background-color: var(--color-primary-surface-highlight);
	border-color: var(--color-primary-surface-highlight);
	color: var(--color-primary-foreground-high);
}

/* Color variants - Informative */
.b-tag--informative {
	background-color: var(--color-informative-surface-highlight, #dbeafe);
	border-color: var(--color-informative-surface-highlight, #dbeafe);
	color: var(--color-informative-foreground-high, #1e40af);
}

/* Color variants - Success */
.b-tag--success {
	background-color: var(--color-success-surface-highlight, #d1fae5);
	border-color: var(--color-success-surface-highlight, #d1fae5);
	color: var(--color-success-foreground-high, #065f46);
}

/* Color variants - Warning */
.b-tag--warning {
	background-color: var(--color-warning-surface-highlight, #fef3c7);
	border-color: var(--color-warning-surface-highlight, #fef3c7);
	color: var(--color-warning-foreground-high, #92400e);
}

/* Color variants - Danger */
.b-tag--danger {
	background-color: var(--color-danger-surface-highlight, #fecaca);
	border-color: var(--color-danger-surface-highlight, #fecaca);
	color: var(--color-danger-foreground-high, #991b1b);
}

/* Color variants - Neutral */
.b-tag--neutral {
	background-color: var(--color-neutral-surface-highlight, #f3f4f6);
	border-color: var(--color-neutral-surface-highlight, #f3f4f6);
	color: var(--color-neutral-foreground-low, #4b5563);
}

/* Secondary variant - transparent background */
.b-tag--secondary {
	background-color: transparent;
}

.b-tag--secondary.b-tag--primary {
	color: var(--color-primary-foreground-low);
	border-color: var(--color-primary-border-default);
}

.b-tag--secondary.b-tag--informative {
	color: var(--color-informative-foreground-low, #2563eb);
	border-color: var(--color-informative-border-default, #2563eb);
}

.b-tag--secondary.b-tag--success {
	color: var(--color-success-foreground-low, #059669);
	border-color: var(--color-success-border-default, #059669);
}

.b-tag--secondary.b-tag--warning {
	color: var(--color-warning-foreground-low, #d97706);
	border-color: var(--color-warning-border-default, #d97706);
}

.b-tag--secondary.b-tag--danger {
	color: var(--color-danger-foreground-low, #dc2626);
	border-color: var(--color-danger-border-default, #dc2626);
}

.b-tag--secondary.b-tag--neutral {
	color: var(--color-neutral-foreground-low, #4b5563);
	border-color: var(--color-neutral-border-pressed, #9ca3af);
}

/* Heavy variant - solid colors */
.b-tag--heavy {
	color: var(--color-neutral-foreground-negative, white);
}

.b-tag--heavy.b-tag--primary {
	background-color: var(--color-primary-interaction-default);
	border-color: var(--color-primary-interaction-default);
}

.b-tag--heavy.b-tag--informative {
	background-color: var(--color-informative-interaction-default, #2563eb);
	border-color: var(--color-informative-interaction-default, #2563eb);
}

.b-tag--heavy.b-tag--success {
	background-color: var(--color-success-interaction-default, #059669);
	border-color: var(--color-success-interaction-default, #059669);
}

.b-tag--heavy.b-tag--warning {
	background-color: var(--color-warning-interaction-default, #d97706);
	border-color: var(--color-warning-interaction-default, #d97706);
}

.b-tag--heavy.b-tag--danger {
	background-color: var(--color-danger-interaction-default, #dc2626);
	border-color: var(--color-danger-interaction-default, #dc2626);
}

.b-tag--heavy.b-tag--neutral {
	background-color: var(--color-neutral-interaction-default, #4b5563);
	border-color: var(--color-neutral-interaction-default, #4b5563);
}

/* Interactive states */
.b-tag--interactive {
	cursor: pointer;
	transition: all 0.15s ease;
}

.b-tag--interactive:hover {
	transform: translateY(-1px);
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.b-tag--interactive:focus {
	outline: none;
	box-shadow: 0 0 0 2px var(--color-primary-interaction-default), 0 0 0 4px rgba(50, 151, 113, 0.1);
}

.b-tag--interactive:active,
.b-tag--pressed {
	transform: translateY(0);
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

/* Selected state for selectable tags */
.b-tag--selected {
	box-shadow: 0 0 0 2px var(--color-primary-interaction-default);
}

.b-tag--selected.b-tag--primary {
	background-color: var(--color-primary-interaction-default);
	color: white;
}

.b-tag--selected.b-tag--informative {
	background-color: var(--color-informative-interaction-default, #2563eb);
	color: white;
}

.b-tag--selected.b-tag--success {
	background-color: var(--color-success-interaction-default, #059669);
	color: white;
}

.b-tag--selected.b-tag--warning {
	background-color: var(--color-warning-interaction-default, #d97706);
	color: white;
}

.b-tag--selected.b-tag--danger {
	background-color: var(--color-danger-interaction-default, #dc2626);
	color: white;
}

.b-tag--selected.b-tag--neutral {
	background-color: var(--color-neutral-interaction-default, #4b5563);
	color: white;
}

/* Disabled state */
.b-tag--disabled {
	opacity: 0.5;
	cursor: not-allowed;
	pointer-events: none;
}

/* Loading state */
.b-tag--loading {
	opacity: 0.7;
}

/* Focused state for better visibility */
.b-tag--focused {
	box-shadow: 0 0 0 2px var(--color-primary-interaction-default), 0 0 0 4px rgba(50, 151, 113, 0.1);
}

/* Tag content */
.b-tag__content {
	display: inline-block;
	font-weight: 600;
	line-height: 1.2;
}

.b-tag__content--truncate {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 12rem;
}

/* Icons */
.b-tag__icon {
	flex-shrink: 0;
	display: inline-flex;
	align-items: center;
	justify-content: center;
}

.b-tag__icon--prepend {
	margin-right: var(--space-xxs, 0.125rem);
}

.b-tag__icon--append {
	margin-left: var(--space-xxs, 0.125rem);
}

/* Close button */
.b-tag__close-button {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 0;
	margin: 0;
	margin-left: var(--space-xxs, 0.125rem);
	background: none;
	border: none;
	cursor: pointer;
	border-radius: 50%;
	width: 1.25rem;
	height: 1.25rem;
	transition: all 0.15s ease;
	color: inherit;
}

.b-tag--small .b-tag__close-button {
	width: 1rem;
	height: 1rem;
}

.b-tag--large .b-tag__close-button {
	width: 1.5rem;
	height: 1.5rem;
}

.b-tag__close-button:hover {
	background-color: rgba(0, 0, 0, 0.1);
	transform: scale(1.1);
}

.b-tag__close-button:focus {
	outline: none;
	background-color: rgba(0, 0, 0, 0.1);
	box-shadow: 0 0 0 2px currentColor;
}

.b-tag__close-button:active {
	transform: scale(0.95);
}

.b-tag__close-button:disabled {
	opacity: 0.5;
	cursor: not-allowed;
}

.b-tag__close-icon {
	font-size: 0.75rem;
}

/* Spinner */
.b-tag__spinner {
	flex-shrink: 0;
}

/* Accessibility enhancements */
.b-tag:focus-visible {
	outline: none;
	box-shadow: 0 0 0 2px var(--color-primary-interaction-default), 0 0 0 4px rgba(50, 151, 113, 0.1);
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

/* High contrast mode support */
@media (prefers-contrast: high) {
	.b-tag {
		border-width: 2px;
	}
	
	.b-tag--interactive:hover {
		border-color: currentColor;
	}
	
	.b-tag__close-button:hover {
		background-color: currentColor;
		color: white;
	}
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
	.b-tag,
	.b-tag--interactive,
	.b-tag__close-button {
		transition: none !important;
		animation: none !important;
	}
	
	.b-tag--interactive:hover {
		transform: none;
	}
	
	.b-tag--interactive:active,
	.b-tag--pressed {
		transform: none;
	}
}

/* Dark theme support */
@media (prefers-color-scheme: dark) {
	.b-tag {
		border-color: var(--color-neutral-border-dark, #4b5563);
	}
	
	.b-tag__close-button:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}
}

/* Print styles */
@media print {
	.b-tag--interactive {
		cursor: default;
	}
	
	.b-tag__close-button {
		display: none;
	}
}

/* Responsive design */
@media screen and (max-width: 48rem) {
	.b-tag--interactive {
		/* Larger touch targets on mobile */
		min-height: 44px;
		min-width: 44px;
	}
	
	.b-tag__close-button {
		min-width: 44px;
		min-height: 44px;
	}
}
</style>
