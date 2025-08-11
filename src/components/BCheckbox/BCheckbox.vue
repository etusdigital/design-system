<script setup lang="ts">
	import { computed, ref, nextTick, watch } from "vue";
	import { useOptionalModel, useAriaAttributes, useScreenReader } from "#composables";

	type CheckState = boolean | null;

	/**
	 * Validation states for checkbox
	 */
	type ValidationState = 'valid' | 'invalid' | 'pending' | 'none';

	/**
	 * Accessibility properties for checkbox
	 */
	interface CheckboxAccessibilityProps {
		/** ARIA label override */
		ariaLabel?: string;
		/** ARIA description for complex checkboxes */
		ariaDescription?: string;
		/** Whether to announce state changes */
		announceChanges?: boolean;
		/** Custom state change announcement message */
		customStateAnnouncement?: string;
		/** Help text for complex checkbox patterns */
		helpText?: string;
		/** Whether the checkbox is part of a group */
		groupRole?: 'group' | 'radiogroup' | 'listbox' | undefined;
		/** Custom error announcement message */
		customErrorAnnouncement?: string;
		/** Error message for validation */
		errorMessage?: string;
		/** Required field indicator */
		required?: boolean;
		/** Validation state */
		validationState?: ValidationState;
	}

	/**
	 * Enhanced checkbox properties with comprehensive accessibility
	 */
	interface BCheckboxProps extends CheckboxAccessibilityProps {
		id?: string;
		name?: string;
		modelValue?: CheckState;
		rhs?: boolean;
		allowIndeterminate?: boolean;
		disabled?: boolean;
	}

	const props = withDefaults(
		defineProps<BCheckboxProps>(),
		{
			modelValue: undefined,
			rhs: false,
			allowIndeterminate: false,
			disabled: false,
			announceChanges: true,
			required: false,
			validationState: 'none',
		}
	);

	const emit = defineEmits<{
		"update:modelValue": [value: CheckState];
		"validation-change": [state: ValidationState];
		"focus": [event: FocusEvent];
		"blur": [event: FocusEvent];
	}>();

	const [model] = useOptionalModel<CheckState>(
		props,
		"modelValue",
		emit,
		false
	);

	// Screen reader and accessibility setup
	const { announce, announcePolitely, announceAssertively } = useScreenReader();
	const { useAriaId } = useAriaAttributes();

	// Element refs
	const checkboxElement = ref<HTMLElement | null>(null);
	const helpTextId = useAriaId('checkbox-help');
	const errorId = useAriaId('checkbox-error');
	const descriptionId = useAriaId('checkbox-desc');

	// Reactive state
	const isFocused = ref(false);

	const isActive = computed((): boolean => {
		if (props.allowIndeterminate) return model.value !== false;
		return !!model.value;
	});

	const ariaChecked = computed((): boolean | "mixed" => {
		return model.value === null ? "mixed" : !!model.value;
	});

	const hasError = computed((): boolean => {
		return props.validationState === 'invalid' || !!props.errorMessage;
	});

	const ariaDescribedBy = computed((): string => {
		const ids: string[] = [];
		if (props.ariaDescription) ids.push(descriptionId);
		if (props.helpText) ids.push(helpTextId);
		if (hasError.value) ids.push(errorId);
		return ids.join(' ');
	});

	const effectiveAriaLabel = computed((): string => {
		if (props.ariaLabel) return props.ariaLabel;
		if (props.required) return 'Required checkbox';
		return 'Checkbox';
	});

	const stateMessage = computed((): string => {
		if (hasError.value) return props.errorMessage || 'Invalid selection';
		if (props.validationState === 'valid') return 'Valid selection';
		return '';
	});

	function toggle() {
		if (props.disabled) return;

		const previousValue = model.value;

		if (!props.allowIndeterminate) {
			model.value = !model.value;
		} else {
			if (model.value === true) model.value = null;
			else if (model.value === null) model.value = false;
			else model.value = true;
		}

		// Announce state changes if enabled
		if (props.announceChanges && previousValue !== model.value) {
			announceStateChange();
		}

		// Emit validation change
		if (props.validationState !== 'none') {
			emit('validation-change', props.validationState);
		}
	}

	function announceStateChange() {
		if (props.customStateAnnouncement) {
			announcePolitely(props.customStateAnnouncement);
			return;
		}

		let message = '';
		if (model.value === true) {
			message = 'Checked';
		} else if (model.value === false) {
			message = 'Unchecked';
		} else {
			message = 'Partially checked';
		}

		announcePolitely(message);
	}

	function handleFocus(event: FocusEvent) {
		isFocused.value = true;
		emit('focus', event);
	}

	function handleBlur(event: FocusEvent) {
		isFocused.value = false;
		emit('blur', event);
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (props.disabled) return;

		// Space key toggles checkbox
		if (event.code === 'Space') {
			event.preventDefault();
			toggle();
		}
		
		// Enter key as alternative activation method
		if (event.code === 'Enter') {
			event.preventDefault();
			toggle();
		}
	}

	// Watch for error announcements
	watch(
		() => props.errorMessage,
		(newError, oldError) => {
			if (newError && newError !== oldError) {
				const message = props.customErrorAnnouncement || `Error: ${newError}`;
				announceAssertively(message);
			}
		}
	);
	
	// Watch for validation state changes
	watch(
		() => props.validationState,
		(newState, oldState) => {
			if (newState !== oldState && newState === 'valid') {
				announcePolitely('Field is now valid');
			}
		}
	);
	
	// Focus management for better UX
	function focusCheckbox() {
		if (checkboxElement.value) {
			checkboxElement.value.focus();
		}
	}
	
	// Expose focus method for parent components
	defineExpose({
		focus: focusCheckbox,
		toggle,
		validate: () => {
			if (props.required && !model.value) {
				return false;
			}
			return true;
		},
	});
</script>

<template>
	<div
		:id="props.groupRole ? undefined : id"
		:role="props.groupRole || undefined"
		:aria-labelledby="props.groupRole ? id : undefined"
		class="b-checkbox-container"
		:class="{ 
			'checkbox-group': props.groupRole,
			'has-error': hasError,
			'required': props.required
		}">
		
		<!-- Group label for checkbox groups -->
		<div
			v-if="props.groupRole && $slots.groupLabel"
			:id="id"
			class="checkbox-group-label"
			:class="{ 'required': props.required }">
			<slot name="groupLabel" />
			<span v-if="props.required" class="required-indicator" aria-label="required">*</span>
		</div>

		<!-- Main checkbox element -->
		<div
			ref="checkboxElement"
			:id="props.groupRole ? undefined : id"
			:name="name || id"
			role="checkbox"
			:aria-checked="ariaChecked"
			:aria-disabled="disabled"
			:aria-invalid="hasError"
			:aria-required="props.required"
			:aria-describedby="ariaDescribedBy || undefined"
			:aria-label="$slots.default ? undefined : effectiveAriaLabel"
			:tabindex="disabled ? -1 : 0"
			class="b-checkbox"
			:class="{ 
				'flex-row-reverse': rhs, 
				'disabled': disabled,
				'focused': isFocused,
				'error': hasError,
				'valid': props.validationState === 'valid',
				'required': props.required,
				'indeterminate': model === null && props.allowIndeterminate
			}"
			@click="toggle"
			@keydown="handleKeyDown"
			@focus="handleFocus"
			@blur="handleBlur">
			
			<div
				class="content"
				:class="{ 
					'active': isActive,
					'indeterminate': model === null && props.allowIndeterminate,
					'focused': isFocused,
					'error': hasError
				}">
				<!-- Indeterminate state icon -->
				<svg
					v-show="model === null"
					viewBox="0 0 16 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					class="w-full h-full checkbox-icon"
					style="stroke: currentColor"
					aria-hidden="true">
					<path
						id="Vector"
						d="M11.65 8L5 8"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round" />
				</svg>
				<!-- Checked state icon -->
				<svg
					v-show="model === true"
					viewBox="0 0 16 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					class="w-full h-full checkbox-icon"
					style="stroke: currentColor"
					aria-hidden="true">
					<path
						id="Vector"
						d="M11.15 6L7.04998 9.9375L5 7.96875"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round" />
				</svg>
			</div>
			
			<!-- Label content -->
			<template v-if="$slots.default">
				<label
					v-if="name || id"
					:for="name || id"
					class="checkbox-label cursor-[inherit]"
					:class="{ 
						'required': props.required,
						'disabled': disabled,
						'error': hasError 
					}"
					@click="toggle">
					<slot />
					<span 
						v-if="props.required" 
						class="required-indicator" 
						aria-label="required field"
						role="img">*</span>
				</label>
				<div
					v-else
					class="checkbox-label"
					:class="{ 
						'required': props.required,
						'disabled': disabled,
						'error': hasError 
					}"
					@click="toggle">
					<slot />
					<span 
						v-if="props.required" 
						class="required-indicator" 
						aria-label="required field"
						role="img">*</span>
				</div>
			</template>
		</div>

		<!-- ARIA description (hidden visually) -->
		<div
			v-if="props.ariaDescription"
			:id="descriptionId"
			class="sr-only">
			{{ props.ariaDescription }}
		</div>

		<!-- Help text -->
		<div
			v-if="props.helpText"
			:id="helpTextId"
			class="checkbox-help-text"
			:class="{ 'error': hasError }">
			{{ props.helpText }}
		</div>

		<!-- Error message -->
		<div
			v-if="hasError && props.errorMessage"
			:id="errorId"
			class="checkbox-error-message"
			role="alert"
			aria-live="polite">
			{{ props.errorMessage }}
		</div>

		<!-- Validation state indicator -->
		<div
			v-if="props.validationState === 'valid'"
			class="checkbox-success-message"
			role="status"
			aria-live="polite">
			Valid selection
		</div>

		<!-- Screen reader state announcements -->
		<div
			class="sr-only"
			aria-live="polite"
			aria-atomic="true">
			{{ stateMessage }}
		</div>
	</div>
</template>

<style scoped>
	@import "../../assets/main.css";

	/* Enhanced focus indicators */
	.b-checkbox.focused .content {
		outline: 2px solid var(--color-primary-interaction-focus, #0066cc);
		outline-offset: 2px;
		border-radius: var(--border-radius-sm, 4px);
	}
	
	/* Focus visible support */
	.b-checkbox:focus-visible .content {
		outline: 2px solid var(--color-primary-interaction-focus, #0066cc);
		outline-offset: 2px;
	}

	/* Disabled state styling */
	.b-checkbox.disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
	
	.b-checkbox.disabled .content {
		background-color: var(--color-neutral-surface-disabled, #f5f5f5);
		border-color: var(--color-neutral-border-disabled, #d1d5db);
		cursor: not-allowed;
	}
	
	.b-checkbox.disabled .checkbox-label {
		color: var(--color-neutral-foreground-disabled, #9ca3af);
		cursor: not-allowed;
	}
	
	/* Error state styling */
	.b-checkbox.error .content {
		border-color: var(--color-danger-border-default, #dc2626);
		background-color: var(--color-danger-surface-subtle, #fef2f2);
	}

	.b-checkbox.error .content.active {
		background-color: var(--color-danger-interaction-default, #dc2626);
		border-color: var(--color-danger-interaction-default, #dc2626);
	}
	
	.b-checkbox.error .checkbox-label {
		color: var(--color-danger-foreground-default, #dc2626);
	}

	/* Valid state styling */
	.b-checkbox.valid .content {
		border-color: var(--color-success-border-default);
	}

	.b-checkbox.valid .content.active {
		background-color: var(--color-success-interaction-default);
		border-color: var(--color-success-interaction-default);
	}

	/* Required field indicator */
	.required-indicator {
		color: var(--color-danger-foreground-default);
		margin-left: 0.25rem;
		font-weight: var(--font-weight-bold);
	}

	/* Group label styling */
	.checkbox-group-label {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--color-neutral-foreground-default);
		margin-bottom: 0.5rem;
	}

	/* Help text styling */
	.checkbox-help-text {
		font-size: var(--font-size-xs);
		color: var(--color-neutral-foreground-muted);
		margin-top: 0.25rem;
		line-height: var(--line-height-base);
	}

	.checkbox-help-text.error {
		color: var(--color-danger-foreground-default);
	}

	/* Error message styling */
	.checkbox-error-message {
		font-size: var(--font-size-xs);
		color: var(--color-danger-foreground-default);
		margin-top: 0.25rem;
		line-height: var(--line-height-base);
	}

	/* Success message styling */
	.checkbox-success-message {
		font-size: var(--font-size-xs);
		color: var(--color-success-foreground-default);
		margin-top: 0.25rem;
		line-height: var(--line-height-base);
	}

	/* Container spacing */
	.b-checkbox-container {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.checkbox-group {
		border: 1px solid var(--color-neutral-border-default);
		border-radius: var(--border-radius-base);
		padding: 0.75rem;
		background-color: var(--color-neutral-surface-default);
	}

	/* Indeterminate state styling */
	.content.indeterminate {
		background-color: var(--color-primary-interaction-default, #0066cc);
		border-color: var(--color-primary-interaction-default, #0066cc);
	}
	
	.b-checkbox.indeterminate .content {
		background-color: var(--color-primary-interaction-default, #0066cc);
		border-color: var(--color-primary-interaction-default, #0066cc);
	}

	/* Touch target improvements for mobile accessibility */
	@media (pointer: coarse) {
		.b-checkbox .content {
			min-width: 44px;
			min-height: 44px;
		}
		
		.b-checkbox {
			min-height: 44px;
			padding: 0.5rem 0;
		}
	}

	/* Screen reader only content - improved for better compatibility */
	.sr-only {
		position: absolute !important;
		width: 1px !important;
		height: 1px !important;
		padding: 0 !important;
		margin: -1px !important;
		overflow: hidden !important;
		clip: rect(0, 0, 0, 0) !important;
		clip-path: inset(50%) !important;
		white-space: nowrap !important;
		border: 0 !important;
	}
	
	/* Ensure screen reader text is never displayed visually */
	.sr-only:not(:focus):not(:active) {
		clip: rect(0 0 0 0);
		clip-path: inset(50%);
		height: 1px;
		overflow: hidden;
		position: absolute;
		white-space: nowrap;
		width: 1px;
	}

	/* High contrast support */
	@media (prefers-contrast: high) {
		.b-checkbox .content {
			border-width: 2px;
			border-color: var(--color-neutral-border-strong, #000000);
		}
		
		.b-checkbox .content.active {
			background-color: var(--color-primary-interaction-default, #0000cc);
			border-color: var(--color-primary-interaction-default, #0000cc);
		}

		.b-checkbox.focused .content {
			outline-width: 3px;
			outline-color: var(--color-primary-interaction-focus, #0066ff);
		}
		
		.b-checkbox.error .content {
			border-color: var(--color-danger-border-default, #cc0000);
			background-color: var(--color-danger-surface-default, #ffffff);
		}

		.checkbox-error-message,
		.required-indicator {
			font-weight: var(--font-weight-bold, 700);
		}
		
		.checkbox-label {
			font-weight: var(--font-weight-semibold, 600);
		}
	}

	/* Reduced motion support - disable all animations and transitions */
	@media (prefers-reduced-motion: reduce) {
		.b-checkbox .content,
		.b-checkbox.focused .content,
		.b-checkbox .checkbox-icon,
		.checkbox-label,
		.checkbox-help-text,
		.checkbox-error-message {
			transition: none !important;
			animation: none !important;
		}
	}

	/* Dark theme adjustments */
	@media (prefers-color-scheme: dark) {
		.checkbox-group {
			background-color: var(--color-neutral-surface-subtle, #1f2937);
			border-color: var(--color-neutral-border-subtle, #374151);
		}
		
		.b-checkbox .content {
			background-color: var(--color-neutral-surface-default, #111827);
			border-color: var(--color-neutral-border-default, #4b5563);
		}
		
		.checkbox-label {
			color: var(--color-neutral-foreground-default, #f9fafb);
		}
	}
</style>