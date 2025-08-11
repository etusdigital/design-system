<script setup lang="ts">
	import { ref, computed, nextTick } from 'vue';
	import type { 
		BStepOptionProps,
		BStepOptionEmits,
		BStepOptionState,
		BStepOptionAriaAttributes,
		DEFAULT_STEP_OPTION_ACCESSIBILITY_CONFIG,
		DEFAULT_STEP_OPTION_KEYBOARD_CONFIG,
		DEFAULT_STEP_OPTION_ANNOUNCEMENTS
	} from './BStepOption.types';
	import { useAriaAttributes, useScreenReader } from '#composables';

	const props = withDefaults(
		defineProps<BStepOptionProps & {
			title?: string;
			description?: string;
			icon?: string;
			color?: string;
			disabled?: boolean;
			isIconRound?: boolean;
		}>(),
		{
			// Legacy props
			title: "",
			description: "",
			icon: "",
			color: "",
			disabled: false,
			isIconRound: false,
			// Accessibility props with defaults
			...DEFAULT_STEP_OPTION_ACCESSIBILITY_CONFIG,
			keyboardConfig: () => DEFAULT_STEP_OPTION_KEYBOARD_CONFIG,
		}
	);

	const emit = defineEmits<BStepOptionEmits>();

	// Composables
	const { useAriaId } = useAriaAttributes();
	const { announcePolitely, announceAssertively } = useScreenReader();

	// Reactive state
	const stepOptionElement = ref<HTMLElement>();
	const isFocused = ref(false);
	const stepOptionId = computed(() => props.id || useAriaId('step-option'));
	const descriptionId = computed(() => `${stepOptionId.value}-description`);
	const instructionsId = computed(() => `${stepOptionId.value}-instructions`);

	// Computed properties
	const isDisabled = computed(() => props.disabled);
	const isInteractive = computed(() => props.interactive && !isDisabled.value);
	const isSelected = computed(() => props.selected || false);
	const isCompleted = computed(() => props.completed || false);

	// Component state
	const stepOptionState = computed((): BStepOptionState => ({
		isSelected: isSelected.value,
		isDisabled: isDisabled.value,
		isCompleted: isCompleted.value,
		hasFocus: isFocused.value,
		isInteractive: isInteractive.value,
		currentStep: props.stepNumber,
		totalSteps: props.totalSteps,
	}));

	// ARIA attributes
	const ariaAttributes = computed((): BStepOptionAriaAttributes => {
		const describedByIds = [
			props.ariaDescribedBy,
			descriptionId.value,
			props.screenReaderInstructions ? instructionsId.value : undefined,
		].filter(Boolean);

		const baseAttrs: BStepOptionAriaAttributes = {
			role: props.role || 'button',
			...(props.ariaLabel && { 'aria-label': props.ariaLabel }),
			...(props.ariaLabelledBy && { 'aria-labelledby': props.ariaLabelledBy }),
			...(describedByIds.length > 0 && { 'aria-describedby': describedByIds.join(' ') }),
			...(isDisabled.value && { 'aria-disabled': true }),
		};

		// Add step-specific ARIA attributes
		if (props.stepNumber && props.totalSteps) {
			baseAttrs['aria-posinset'] = props.stepNumber;
			baseAttrs['aria-setsize'] = props.totalSteps;
		}

		// Add interaction-specific ARIA attributes
		if (isInteractive.value) {
			switch (props.role) {
				case 'button':
					if (isSelected.value) {
						baseAttrs['aria-pressed'] = true;
					}
					break;
				case 'option':
					baseAttrs['aria-selected'] = isSelected.value;
					break;
				case 'tab':
					baseAttrs['aria-selected'] = isSelected.value;
					break;
				case 'listitem':
					if (isSelected.value) {
						baseAttrs['aria-current'] = 'step';
					}
					break;
			}
		}

		return baseAttrs;
	});

	const effectiveTabIndex = computed(() => {
		if (isDisabled.value) return -1;
		if (isInteractive.value) return 0;
		return -1;
	});

	// Event handlers
	function handleClick(event: MouseEvent): void {
		if (isDisabled.value || !isInteractive.value) {
			event.preventDefault();
			if (props.announceChanges) {
				const message = DEFAULT_STEP_OPTION_ANNOUNCEMENTS.disabled
					.replace('{stepNumber}', (props.stepNumber || 1).toString())
					.replace('{title}', props.title || 'Step option');
				announceAssertively(message);
			}
			return;
		}

		emit('click', event, stepOptionState.value);

		// Handle selection if not already selected
		if (!isSelected.value) {
			handleSelection();
		}

		// Announce action
		if (props.announceChanges) {
			const message = (props.announcementTemplate || DEFAULT_STEP_OPTION_ANNOUNCEMENTS.selected)
				.replace('{action}', 'Selected')
				.replace('{stepNumber}', (props.stepNumber || 1).toString())
				.replace('{totalSteps}', (props.totalSteps || 1).toString())
				.replace('{title}', props.title || 'Step option');
			announcePolitely(message);
		}
	}

	function handleSelection(): void {
		emit('select', !isSelected.value, stepOptionState.value);
	}

	function handleKeydown(event: KeyboardEvent): void {
		if (isDisabled.value || !isInteractive.value) return;

		const keyboardConfig = props.keyboardConfig || DEFAULT_STEP_OPTION_KEYBOARD_CONFIG;
		const { key } = event;

		// Handle activation keys
		if (keyboardConfig.activationKeys?.includes(key)) {
			event.preventDefault();
			handleSelection();
			emit('keyboard', event, 'activate');
			return;
		}

		// Handle navigation keys
		if (keyboardConfig.nextKeys?.includes(key)) {
			event.preventDefault();
			emit('keyboard', event, 'next');
			return;
		}

		if (keyboardConfig.prevKeys?.includes(key)) {
			event.preventDefault();
			emit('keyboard', event, 'prev');
			return;
		}
	}

	function handleFocus(event: FocusEvent): void {
		isFocused.value = true;
		emit('focus', event, stepOptionState.value);

		// Announce focus if configured
		if (props.announceChanges) {
			nextTick(() => {
				const message = DEFAULT_STEP_OPTION_ANNOUNCEMENTS.focused
					.replace('{stepNumber}', (props.stepNumber || 1).toString())
					.replace('{totalSteps}', (props.totalSteps || 1).toString())
					.replace('{title}', props.title || 'Step option')
					.replace('{description}', props.description || '');
				announcePolitely(message);
			});
		}
	}

	function handleBlur(event: FocusEvent): void {
		isFocused.value = false;
		emit('blur', event, stepOptionState.value);
	}
</script>

<template>
	<div
		ref="stepOptionElement"
		:id="stepOptionId"
		class="b-step-option"
		:class="{
			disabled: isDisabled,
			selected: isSelected,
			completed: isCompleted,
			focused: isFocused,
			interactive: isInteractive,
			'high-contrast': highContrast,
			'reduced-motion': reduceMotion,
			'enhanced-focus': enhancedFocus,
			'min-touch-target': minTouchTarget,
		}"
		v-bind="ariaAttributes"
		:tabindex="effectiveTabIndex"
		@click="handleClick"
		@keydown="handleKeydown"
		@focus="handleFocus"
		@blur="handleBlur">
		
		<div
			class="icon"
			:class="{
				'round-icon': isIconRound,
				'colored-background': color,
				'colored-text': color && isIconRound,
				selected: isSelected,
				completed: isCompleted,
			}"
			:aria-hidden="true">
			<BIcon :name="icon" />
		</div>
		
		<div class="flex flex-col gap-1 content-area">
			<h4
				:id="`${stepOptionId}-title`"
				class="option-title"
				:class="{ 'colored-text': color }">
				{{ title }}
			</h4>
			<p 
				:id="descriptionId"
				class="option-description">
				{{ description }}
			</p>
		</div>

		<!-- Screen reader instructions (hidden visually) -->
		<div
			v-if="screenReaderInstructions"
			:id="instructionsId"
			class="sr-only">
			{{ screenReaderInstructions }}
		</div>

		<!-- Status indicator for screen readers -->
		<div
			v-if="isSelected || isCompleted"
			class="sr-only">
			{{ isCompleted ? 'Completed' : isSelected ? 'Selected' : '' }}
		</div>
	</div>
</template>

<style scoped>
	@import "../../assets/main.css";
	
	.b-step-option {
		@apply flex items-center gap-base rounded-2xl transition-colors relative;
		min-width: 400px;
		padding: 1rem;
		cursor: pointer;
	}

	/* Interactive states */
	.b-step-option.interactive {
		@apply hover:bg-neutral-surface-hover focus:outline-none;
	}

	.b-step-option.interactive:focus-visible {
		outline: 2px solid var(--color-primary-interaction-default);
		outline-offset: 2px;
	}

	.b-step-option.interactive:active {
		@apply bg-neutral-surface-active;
	}

	/* Selected state */
	.b-step-option.selected {
		@apply bg-primary-surface-subtle border border-primary-border-default;
	}

	.b-step-option.selected .option-title {
		@apply text-primary-interaction-default font-semibold;
	}

	/* Completed state */
	.b-step-option.completed {
		@apply bg-success-surface-subtle border border-success-border-default;
	}

	.b-step-option.completed .icon {
		@apply bg-success-interaction-default;
	}

	.b-step-option.completed .option-title {
		@apply text-success-interaction-default;
	}

	/* Disabled state */
	.b-step-option.disabled {
		@apply pointer-events-none cursor-not-allowed opacity-60;
	}

	.b-step-option.disabled .icon {
		@apply bg-neutral-interaction-disabled;
	}

	.b-step-option.disabled .icon.round-icon {
		@apply bg-neutral-surface-default;
	}

	.b-step-option.disabled .icon.round-icon,
	.b-step-option.disabled .option-title,
	.b-step-option.disabled .option-description {
		@apply text-neutral-interaction-disabled;
	}

	/* Focus state */
	.b-step-option.focused {
		@apply ring-2 ring-primary-interaction-default ring-opacity-50;
	}

	/* Icon styles */
	.icon {
		@apply flex items-center justify-center rounded-full bg-primary-interaction-default text-neutral-foreground-negative;
		padding: 0.75rem;
		width: fit-content;
		height: fit-content;
	}

	.icon .b-icon {
		font-size: 1.875rem; /* text-3xl equivalent */
	}

	.icon.round-icon {
		@apply bg-neutral-surface-default text-primary-interaction-default p-0;
	}

	.icon.round-icon .b-icon {
		font-size: 3rem; /* text-5xl equivalent */
	}

	.icon.selected {
		@apply bg-primary-interaction-default;
	}

	.icon.completed {
		@apply bg-success-interaction-default;
	}

	/* Text styles */
	.option-title {
		@apply text-primary-interaction-default font-bold text-base;
	}

	.option-description {
		@apply text-neutral-foreground-low text-sm;
		word-wrap: break-word;
	}

	.content-area {
		flex: 1;
		min-width: 0; /* Prevents text overflow issues */
	}

	/* Color overrides */
	*.colored-background {
		background: v-bind(color);
	}

	.b-step-option *.colored-text {
		color: v-bind(color);
	}

	/* Accessibility enhancements */
	.high-contrast {
		border: 2px solid var(--color-neutral-border-default);
	}

	.high-contrast:focus-within,
	.high-contrast.focused {
		border-color: var(--color-primary-interaction-default);
		background-color: var(--color-primary-surface-subtle);
	}

	.enhanced-focus:focus-visible {
		outline: 3px solid var(--color-primary-interaction-default);
		outline-offset: 3px;
	}

	.min-touch-target {
		min-height: 44px;
		min-width: 44px;
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

	/* Reduced motion support */
	.reduced-motion,
	.reduced-motion * {
		transition: none !important;
		animation: none !important;
	}

	/* High contrast mode support */
	@media (prefers-contrast: high) {
		.b-step-option {
			border: 2px solid CanvasText;
		}

		.b-step-option.interactive:focus-visible,
		.b-step-option.focused {
			outline: 3px solid Highlight;
			outline-offset: 2px;
		}

		.icon {
			background-color: CanvasText;
			color: Canvas;
		}

		.option-title,
		.option-description {
			color: CanvasText;
		}
	}

	/* Reduced motion preference */
	@media (prefers-reduced-motion: reduce) {
		.b-step-option,
		.b-step-option *,
		.icon {
			transition: none !important;
			animation: none !important;
		}
	}

	/* Dark mode adjustments */
	@media (prefers-color-scheme: dark) {
		.b-step-option:hover {
			background-color: var(--color-neutral-surface-hover);
		}

		.b-step-option.selected {
			background-color: var(--color-primary-surface-subtle);
		}

		.b-step-option.completed {
			background-color: var(--color-success-surface-subtle);
		}
	}

	/* Large text support */
	@media (min-resolution: 192dpi) {
		.option-title {
			font-weight: 600;
		}

		.enhanced-focus:focus-visible {
			outline-width: 4px;
		}
	}
</style>
