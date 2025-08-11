<script setup lang="ts">
	import { ref, computed, watch, nextTick, onMounted } from "vue";
	import { useOptionalModel, useAriaAttributes, useScreenReader } from "#composables";

	/**
	 * Accessibility configuration interface
	 */
	export interface BToggleAccessibility {
		/** ARIA label for the toggle */
		ariaLabel?: string;
		/** Detailed description for screen readers */
		ariaDescription?: string;
		/** Whether state changes should be announced */
		announceChanges?: boolean;
		/** Custom label for "on" state */
		onLabel?: string;
		/** Custom label for "off" state */
		offLabel?: string;
		/** Error message for validation */
		errorMessage?: string;
		/** Whether the toggle is in an invalid state */
		invalid?: boolean;
		/** Success message after successful validation */
		successMessage?: string;
		/** Loading message during processing */
		loadingMessage?: string;
		/** ARIA role override (defaults to 'switch') */
		role?: 'switch' | 'checkbox';
		/** Whether this toggle is part of a group */
		grouped?: boolean;
		/** Group label when part of a toggle group */
		groupLabel?: string;
		/** Position in group (1-based) */
		groupPosition?: number;
		/** Total items in group */
		groupSize?: number;
	}

	/**
	 * Props for the BToggle component with comprehensive WCAG 2.1 AA support
	 */
	export interface BToggleProps extends BToggleAccessibility {
		/** Unique identifier for the toggle */
		id?: string;
		/** Name attribute for form handling */
		name?: string;
		/** Current state of the toggle */
		modelValue?: boolean;
		/** Position toggle on right-hand side of label */
		rhs?: boolean;
		/** Whether the toggle is disabled */
		disabled?: boolean;
		/** Whether the toggle is required in a form */
		required?: boolean;
		/** Whether the toggle is readonly */
		readonly?: boolean;
		/** Loading/processing state */
		loading?: boolean;
		/** Size of the toggle */
		size?: "small" | "medium" | "large";
		/** Form validation state */
		validationState?: 'none' | 'error' | 'success' | 'warning';
		/** Auto-focus the toggle on mount */
		autofocus?: boolean;
	}

	/**
	 * Events emitted by the BToggle component
	 */
	interface BToggleEmits {
		"update:modelValue": [value: boolean];
		"toggle": [value: boolean, event: Event];
		"focus": [event: FocusEvent];
		"blur": [event: FocusEvent];
		"validate": [value: boolean];
		"error": [error: string];
		"success": [message?: string];
	}

	const props = withDefaults(
		defineProps<BToggleProps>(),
		{
			modelValue: undefined,
			rhs: false,
			disabled: false,
			required: false,
			readonly: false,
			loading: false,
			ariaLabel: "",
			ariaDescription: "",
			announceChanges: true,
			onLabel: "On",
			offLabel: "Off",
			errorMessage: "",
			invalid: false,
			successMessage: "",
			loadingMessage: "Processing...",
			role: "switch",
			grouped: false,
			groupLabel: "",
			groupPosition: undefined,
			groupSize: undefined,
			size: "medium",
			validationState: "none",
			autofocus: false,
		}
	);

	const emit = defineEmits<BToggleEmits>();

	// Accessibility composables
	const { useAriaId } = useAriaAttributes();
	const screenReader = useScreenReader();

	// Generate unique IDs for ARIA relationships
	const toggleId = props.id || useAriaId('toggle');
	const labelId = useAriaId('toggle-label');
	const descriptionId = useAriaId('toggle-description');
	const errorId = useAriaId('toggle-error');
	const successId = useAriaId('toggle-success');
	const groupId = props.grouped ? useAriaId('toggle-group') : undefined;

	// Component state
	const [model] = useOptionalModel<boolean>(props, "modelValue", emit, false);
	const toggleRef = ref<HTMLDivElement>();
	const keyboardMode = ref(false);
	const isProcessing = ref(false);
	const validationMessage = ref('');

	// Computed accessibility properties
	const toggleAriaLabel = computed(() => {
		if (props.ariaLabel) return props.ariaLabel;
		const roleLabel = props.role === 'checkbox' ? 'Checkbox' : 'Toggle switch';
		const state = model.value ? props.onLabel : props.offLabel;
		const position = props.groupPosition && props.groupSize ? ` ${props.groupPosition} of ${props.groupSize}` : '';
		return `${roleLabel}${position}, currently ${state}`;
	});

	const stateDescription = computed(() => {
		const state = model.value ? props.onLabel : props.offLabel;
		let description = `Toggle is ${state.toLowerCase()}`;
		if (props.ariaDescription) description += `. ${props.ariaDescription}`;
		if (props.required) description += ". Required field";
		if (props.readonly) description += ". Read-only";
		if (props.loading || isProcessing.value) description += ". Processing";
		return description;
	});

	const computedAriaDescribedBy = computed(() => {
		const ids = [];
		if (props.ariaDescription) ids.push(descriptionId);
		if (props.errorMessage && (props.invalid || props.validationState === 'error')) ids.push(errorId);
		if (props.successMessage && props.validationState === 'success') ids.push(successId);
		return ids.length > 0 ? ids.join(' ') : undefined;
	});

	const isInteractive = computed(() => {
		return !props.disabled && !props.readonly && !props.loading && !isProcessing.value;
	});

	const computedTabIndex = computed(() => {
		if (!isInteractive.value) return -1;
		return 0;
	});

	const validationIcon = computed(() => {
		switch (props.validationState) {
			case 'error': return '⚠️';
			case 'success': return '✓';
			case 'warning': return '⚠';
			default: return '';
		}
	});

	/**
	 * Toggles the switch state with accessibility features
	 */
	function toggle(event?: Event): void {
		if (!isInteractive.value) return;
		
		const previousState = model.value;
		model.value = !model.value;
		
		// Handle form validation
		if (props.required && !model.value) {
			validationMessage.value = props.errorMessage || 'This field is required';
			emit('error', validationMessage.value);
			screenReader.announceAssertively(`Error: ${validationMessage.value}`);
		} else if (validationMessage.value) {
			validationMessage.value = '';
			if (props.successMessage && model.value) {
				emit('success', props.successMessage);
				screenReader.announcePolitely(props.successMessage);
			}
		}
		
		// Announce state change to screen readers
		if (props.announceChanges && previousState !== model.value) {
			const newState = model.value ? props.onLabel : props.offLabel;
			const roleText = props.role === 'checkbox' ? 'checkbox' : 'toggle';
			screenReader.announcePolitely(`${roleText} switched to ${newState.toLowerCase()}`);
		}
		
		emit('toggle', model.value, event || new Event('toggle'));
		emit('validate', model.value);
	}

	/**
	 * Enhanced keyboard navigation handler
	 */
	function handleKeyDown(e: KeyboardEvent): void {
		if (!isInteractive.value) return;
		
		keyboardMode.value = true;
		
		switch (e.key) {
			case ' ':
				// Space key works for both switch and checkbox
				e.preventDefault();
				toggle(e);
				break;
				
			case 'Enter':
				// Enter key primarily for switch role
				if (props.role === 'switch') {
					e.preventDefault();
					toggle(e);
				}
				break;
				
			case 'ArrowLeft':
				// Left arrow turns off (for switches)
				if (props.role === 'switch' && model.value) {
					e.preventDefault();
					toggle(e);
				}
				break;
				
			case 'ArrowRight':
				// Right arrow turns on (for switches)
				if (props.role === 'switch' && !model.value) {
					e.preventDefault();
					toggle(e);
				}
				break;
				
			case 'Escape':
				// Clear validation message on escape
				if (validationMessage.value) {
					validationMessage.value = '';
					e.preventDefault();
				}
				break;
		}
	}

	/**
	 * Focus event handler
	 */
	function handleFocus(e: FocusEvent): void {
		keyboardMode.value = true;
		emit('focus', e);
	}

	/**
	 * Blur event handler
	 */
	function handleBlur(e: FocusEvent): void {
		keyboardMode.value = false;
		emit('blur', e);
	}

	/**
	 * Mouse interaction handler
	 */
	function handleMouseInteraction(): void {
		keyboardMode.value = false;
	}

	/**
	 * Handle click events with accessibility considerations
	 */
	function handleClick(event: MouseEvent): void {
		if (!isInteractive.value) {
			event.preventDefault();
			return;
		}
		toggle(event);
	}

	/**
	 * Auto-focus handling
	 */
	function handleAutofocus(): void {
		if (props.autofocus && toggleRef.value && isInteractive.value) {
			nextTick(() => {
				toggleRef.value?.focus();
			});
		}
	}

	// Watch for external state changes to announce them
	watch(() => props.modelValue, (newVal, oldVal) => {
		if (props.announceChanges && newVal !== oldVal && newVal !== undefined) {
			nextTick(() => {
				const state = newVal ? props.onLabel : props.offLabel;
				const roleText = props.role === 'checkbox' ? 'Checkbox' : 'Toggle';
				screenReader.announcePolitely(`${roleText} state changed to ${state.toLowerCase()}`);
			});
		}
	});

	// Watch for validation state changes
	watch(() => props.validationState, (newState) => {
		if (newState === 'error' && props.errorMessage) {
			validationMessage.value = props.errorMessage;
			screenReader.announceAssertively(`Error: ${props.errorMessage}`);
		} else if (newState === 'success' && props.successMessage) {
			validationMessage.value = '';
			screenReader.announcePolitely(props.successMessage);
		} else if (newState === 'none') {
			validationMessage.value = '';
		}
	});

	// Watch for loading state changes
	watch(() => props.loading, (isLoading) => {
		if (isLoading && props.loadingMessage) {
			screenReader.announcePolitely(props.loadingMessage);
		} else if (!isLoading && isProcessing.value) {
			screenReader.announcePolitely('Processing complete');
		}
		isProcessing.value = isLoading;
	});

	// Handle autofocus on mount
	onMounted(() => {
		handleAutofocus();
	});
</script>

<template>
	<!-- Toggle group container for grouped toggles -->
	<fieldset 
		v-if="grouped && groupLabel"
		:id="groupId"
		class="b-toggle-group"
		:aria-labelledby="`${groupId}-legend`">
		<legend :id="`${groupId}-legend`" class="sr-only">{{ groupLabel }}</legend>
		<div
			:id="toggleId"
			ref="toggleRef"
			:role="role"
			:tabindex="computedTabIndex"
			:aria-checked="role === 'switch' ? model : undefined"
			:aria-selected="role === 'checkbox' ? model : undefined"
			:aria-disabled="disabled"
			:aria-readonly="readonly"
			:aria-required="required"
			:aria-invalid="invalid || validationState === 'error' || !!validationMessage"
			:aria-busy="loading || isProcessing"
			:aria-label="toggleAriaLabel"
			:aria-describedby="computedAriaDescribedBy"
			:aria-labelledby="$slots.default ? labelId : undefined"
			:aria-setsize="groupSize"
			:aria-posinset="groupPosition"
			class="b-toggle"
			:class="{ 
				'flex-row-reverse': rhs, 
				'disabled': disabled,
				'readonly': readonly,
				'loading': loading || isProcessing,
				'keyboard-focus': keyboardMode,
				'invalid': invalid || validationState === 'error' || !!validationMessage,
				'valid': validationState === 'success',
				'warning': validationState === 'warning',
				[`size-${size}`]: size !== 'medium',
				[`role-${role}`]: role !== 'switch'
			}"
			@click="handleClick"
			@keydown="handleKeyDown"
			@focus="handleFocus"
			@blur="handleBlur"
			@mousedown="handleMouseInteraction"
			@mouseup="handleMouseInteraction">
			
			<!-- Hidden descriptions for screen readers -->
			<div 
				v-if="ariaDescription" 
				:id="descriptionId" 
				class="sr-only">
				{{ ariaDescription }}
			</div>
			
			<!-- Error message for screen readers -->
			<div 
				v-if="(errorMessage && (invalid || validationState === 'error')) || validationMessage" 
				:id="errorId" 
				class="sr-only"
				role="alert"
				aria-live="assertive">
				{{ validationMessage || errorMessage }}
			</div>
			
			<!-- Success message for screen readers -->
			<div 
				v-if="successMessage && validationState === 'success'" 
				:id="successId" 
				class="sr-only"
				role="status"
				aria-live="polite">
				{{ successMessage }}
			</div>
			
			<!-- Visual toggle switch -->
			<div
				class="container"
				:class="{ 
					'active': model,
					'keyboard-focus': keyboardMode,
					'loading': loading || isProcessing,
					'invalid': invalid || validationState === 'error' || !!validationMessage,
					'valid': validationState === 'success',
					'warning': validationState === 'warning',
					'readonly': readonly
				}"
				:aria-hidden="true">
				
				<!-- Loading spinner -->
				<div 
					v-if="loading || isProcessing"
					class="loading-spinner"
					aria-hidden="true">
					<span class="sr-only">{{ loadingMessage }}</span>
				</div>
				
				<div
					v-else
					class="toggle-thumb"
					:class="[model ? 'ml-[1em]' : 'ml-[.125em]']">
					<!-- State indicator for screen readers -->
					<span class="sr-only">
						{{ model ? onLabel : offLabel }}
					</span>
					
					<!-- Validation icon -->
					<span 
						v-if="validationIcon"
						class="validation-icon"
						aria-hidden="true">
						{{ validationIcon }}
					</span>
				</div>
			</div>
			
			<!-- Toggle label -->
			<template v-if="$slots.default">
				<label
					:id="labelId"
					:for="toggleId"
					class="toggle-label"
					:class="{
						'cursor-pointer': isInteractive,
						'cursor-not-allowed': disabled,
						'cursor-default': readonly || loading || isProcessing,
						'text-error': invalid || validationState === 'error' || !!validationMessage,
						'text-success': validationState === 'success',
						'text-warning': validationState === 'warning'
					}"
					@click="handleClick">
					<slot />
					<!-- Required indicator -->
					<span 
						v-if="required" 
						class="required-indicator"
						aria-hidden="true">
						*
					</span>
				</label>
			</template>
			
			<!-- Validation message display -->
			<div 
				v-if="(invalid || validationState === 'error' || validationMessage) && (errorMessage || validationMessage)"
				class="validation-message error-message"
				role="alert"
				aria-live="assertive">
				{{ validationMessage || errorMessage }}
			</div>
			
			<div 
				v-else-if="validationState === 'success' && successMessage"
				class="validation-message success-message"
				role="status"
				aria-live="polite">
				{{ successMessage }}
			</div>
			
			<!-- Live region for state announcements -->
			<div 
				aria-live="polite" 
				aria-atomic="true" 
				class="sr-only">
				{{ announceChanges ? stateDescription : '' }}
			</div>
		</div>
	</fieldset>
	
	<!-- Standard toggle (not grouped) -->
	<div
		v-else
		:id="toggleId"
		ref="toggleRef"
		:role="role"
		:tabindex="computedTabIndex"
		:aria-checked="role === 'switch' ? model : undefined"
		:aria-selected="role === 'checkbox' ? model : undefined"
		:aria-disabled="disabled"
		:aria-readonly="readonly"
		:aria-required="required"
		:aria-invalid="invalid || validationState === 'error' || !!validationMessage"
		:aria-busy="loading || isProcessing"
		:aria-label="toggleAriaLabel"
		:aria-describedby="computedAriaDescribedBy"
		:aria-labelledby="$slots.default ? labelId : undefined"
		class="b-toggle"
		:class="{ 
			'flex-row-reverse': rhs, 
			'disabled': disabled,
			'readonly': readonly,
			'loading': loading || isProcessing,
			'keyboard-focus': keyboardMode,
			'invalid': invalid || validationState === 'error' || !!validationMessage,
			'valid': validationState === 'success',
			'warning': validationState === 'warning',
			[`size-${size}`]: size !== 'medium',
			[`role-${role}`]: role !== 'switch'
		}"
		@click="handleClick"
		@keydown="handleKeyDown"
		@focus="handleFocus"
		@blur="handleBlur"
		@mousedown="handleMouseInteraction"
		@mouseup="handleMouseInteraction">
		
		<!-- Hidden descriptions for screen readers -->
		<div 
			v-if="ariaDescription" 
			:id="descriptionId" 
			class="sr-only">
			{{ ariaDescription }}
		</div>
		
		<!-- Error message for screen readers -->
		<div 
			v-if="(errorMessage && (invalid || validationState === 'error')) || validationMessage" 
			:id="errorId" 
			class="sr-only"
			role="alert"
			aria-live="assertive">
			{{ validationMessage || errorMessage }}
		</div>
		
		<!-- Success message for screen readers -->
		<div 
			v-if="successMessage && validationState === 'success'" 
			:id="successId" 
			class="sr-only"
			role="status"
			aria-live="polite">
			{{ successMessage }}
		</div>
		
		<!-- Visual toggle switch -->
		<div
			class="container"
			:class="{ 
				'active': model,
				'keyboard-focus': keyboardMode,
				'loading': loading || isProcessing,
				'invalid': invalid || validationState === 'error' || !!validationMessage,
				'valid': validationState === 'success',
				'warning': validationState === 'warning',
				'readonly': readonly
			}"
			:aria-hidden="true">
			
			<!-- Loading spinner -->
			<div 
				v-if="loading || isProcessing"
				class="loading-spinner"
				aria-hidden="true">
				<span class="sr-only">{{ loadingMessage }}</span>
			</div>
			
			<div
				v-else
				class="toggle-thumb"
				:class="[model ? 'ml-[1em]' : 'ml-[.125em]']">
				<!-- State indicator for screen readers -->
				<span class="sr-only">
					{{ model ? onLabel : offLabel }}
				</span>
				
				<!-- Validation icon -->
				<span 
					v-if="validationIcon"
					class="validation-icon"
					aria-hidden="true">
					{{ validationIcon }}
				</span>
			</div>
		</div>
		
		<!-- Toggle label -->
		<template v-if="$slots.default">
			<label
				:id="labelId"
				:for="toggleId"
				class="toggle-label"
				:class="{
					'cursor-pointer': isInteractive,
					'cursor-not-allowed': disabled,
					'cursor-default': readonly || loading || isProcessing,
					'text-error': invalid || validationState === 'error' || !!validationMessage,
					'text-success': validationState === 'success',
					'text-warning': validationState === 'warning'
				}"
				@click="handleClick">
				<slot />
				<!-- Required indicator -->
				<span 
					v-if="required" 
					class="required-indicator"
					aria-hidden="true">
					*
				</span>
			</label>
		</template>
		
		<!-- Validation message display -->
		<div 
			v-if="(invalid || validationState === 'error' || validationMessage) && (errorMessage || validationMessage)"
			class="validation-message error-message"
			role="alert"
			aria-live="assertive">
			{{ validationMessage || errorMessage }}
		</div>
		
		<div 
			v-else-if="validationState === 'success' && successMessage"
			class="validation-message success-message"
			role="status"
			aria-live="polite">
			{{ successMessage }}
		</div>
		
		<!-- Live region for state announcements -->
		<div 
			aria-live="polite" 
			aria-atomic="true" 
			class="sr-only">
			{{ announceChanges ? stateDescription : '' }}
		</div>
	</div>
</template>

<style scoped>
	@import "../../assets/main.css";

	.b-toggle {
		@apply inline-flex text-base gap-xs items-center cursor-pointer relative;
		transition: all 0.2s ease;
	}

	.b-toggle:focus {
		@apply outline-none;
	}

	/* Keyboard focus styles */
	.b-toggle.keyboard-focus {
		@apply outline-none;
		box-shadow: 0 0 0 2px var(--color-primary-interaction-default);
		border-radius: var(--rounded-base);
	}

	.b-toggle.disabled {
		@apply pointer-events-none opacity-60 cursor-not-allowed;

		.container {
			@apply bg-neutral-surface-disabled;
		}

		.toggle-label {
			@apply text-neutral-interaction-disabled;
		}
	}

	.b-toggle.readonly {
		@apply pointer-events-none;

		.container {
			@apply opacity-75;
		}

		.toggle-label {
			@apply text-neutral-foreground-default;
		}
	}

	.b-toggle.loading {
		@apply pointer-events-none;

		.toggle-label {
			@apply text-neutral-foreground-low;
		}
	}

	/* Size variants */
	.b-toggle.size-small {
		@apply text-sm gap-xxs;
	}

	.b-toggle.size-small .container {
		@apply h-[1em] w-[1.8em];
	}

	.b-toggle.size-small .toggle-thumb {
		@apply w-[0.75em] h-[0.75em];
	}

	.b-toggle.size-small .toggle-thumb.ml-[1em] {
		@apply ml-[0.9em];
	}

	.b-toggle.size-large {
		@apply text-lg gap-sm;
	}

	.b-toggle.size-large .container {
		@apply h-[1.3em] w-[2.2em];
	}

	.b-toggle.size-large .toggle-thumb {
		@apply w-[1em] h-[1em];
	}

	.b-toggle.size-large .toggle-thumb.ml-[1em] {
		@apply ml-[1.1em];
	}

	.container {
		@apply inline-flex text-neutral-foreground-negative bg-neutral-interaction-default rounded-full h-[1.16em] w-[2em] items-center;
		transition: all 0.2s ease;
	}

	.container.active {
		@apply bg-primary-interaction-default;
	}

	.container.loading {
		@apply bg-neutral-interaction-default;
	}

	.container.invalid {
		@apply border-2 border-error-border-default;
	}

	.container.valid {
		@apply border-2 border-success-border-default;
	}

	.container.warning {
		@apply border-2 border-warning-border-default;
	}

	.container.readonly {
		@apply bg-neutral-surface-disabled border border-neutral-border-default;
	}

	.container.keyboard-focus {
		@apply outline-none;
		box-shadow: inset 0 0 0 2px var(--color-neutral-surface-default);
	}

	.toggle-thumb {
		@apply inline-block rounded-full w-[.85em] h-[.85em] bg-current;
		transition: all 0.15s ease-out;
	}

	.toggle-label {
		@apply text-xs text-neutral-interaction-default;
		transition: color 0.2s ease;
		min-height: 44px;
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.toggle-label .required-indicator {
		@apply text-error-foreground-default font-medium;
	}

	.toggle-label.text-error {
		@apply text-error-foreground-default;
	}

	.toggle-label.text-success {
		@apply text-success-foreground-default;
	}

	.toggle-label.text-warning {
		@apply text-warning-foreground-default;
	}

	/* Hover states */
	.b-toggle:hover:not(.disabled) .container {
		@apply bg-neutral-interaction-hover;
	}

	.b-toggle:hover:not(.disabled) .container.active {
		@apply bg-primary-interaction-hover;
	}

	.b-toggle:hover:not(.disabled) .toggle-label {
		@apply text-neutral-interaction-hover;
	}

	/* Active states */
	.b-toggle:active:not(.disabled) .container {
		transform: scale(0.98);
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
		.b-toggle.keyboard-focus {
			box-shadow: 0 0 0 3px var(--color-primary-interaction-default);
		}
		
		.container {
			border: 2px solid var(--color-neutral-border-default);
		}
		
		.container.active {
			border-color: var(--color-primary-border-default);
		}
		
		.container.invalid {
			border: 3px solid var(--color-error-border-default);
		}
		
		.container.valid {
			border: 3px solid var(--color-success-border-default);
		}
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.b-toggle,
		.container,
		.toggle-thumb,
		.toggle-label,
		.loading-spinner {
			transition: none;
			animation: none;
		}
		
		.loading-spinner {
			border-top-color: transparent;
		}
	}

	/* Loading spinner */
	.loading-spinner {
		@apply inline-block w-[0.75em] h-[0.75em] border-2 border-current border-t-transparent rounded-full;
		animation: spin 1s linear infinite;
		margin: 0.05em 0.125em;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.validation-icon {
		@apply text-xs absolute -top-1 -right-1;
	}

	/* Validation messages */
	.validation-message {
		@apply text-xs mt-1 px-2 py-1 rounded;
	}

	.error-message {
		@apply text-error-foreground-default bg-error-surface-default;
	}

	.success-message {
		@apply text-success-foreground-default bg-success-surface-default;
	}

	/* Toggle group styles */
	.b-toggle-group {
		@apply border-0 p-0 m-0;
	}

	.b-toggle-group legend {
		@apply p-0 m-0;
	}

	/* Role-specific styles */
	.b-toggle.role-checkbox .container {
		@apply rounded-sm;
	}

	/* Minimum touch target size (44px) */
	.b-toggle {
		min-height: 44px;
		min-width: 44px;
	}

	/* Focus visible for modern browsers */
	.b-toggle:focus-visible {
		@apply outline-none;
		box-shadow: 0 0 0 2px var(--color-primary-interaction-default);
		border-radius: var(--rounded-base);
	}
</style>
