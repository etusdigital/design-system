<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useOptionalModel, useAriaAttributes } from "#composables";
import { useMask, useValidation, type Mask, type ValidationState } from './composables';
import BIcon from '../BIcon/BIcon.vue';

/**
 * Text alignment options
 */
type TextAlign = "start" | "center" | "end";

/**
 * Component sizes
 */
type Size = "xs" | "sm" | "base" | "lg" | "xl" | "100";

/**
 * Masked input accessibility properties
 */
interface MaskedInputAccessibilityProps {
	/** ARIA label override */
	ariaLabel?: string;
	/** ARIA description */
	ariaDescription?: string;
	/** Whether to announce validation changes */
	announceValidation?: boolean;
	/** Custom error announcement message */
	customErrorAnnouncement?: string;
	/** Custom success announcement message */
	customSuccessAnnouncement?: string;
}

/**
 * Masked input properties
 */
interface BMaskedInputProps extends MaskedInputAccessibilityProps {
	modelValue?: string | number;
	mask: Mask;
	placeholder?: string;
	disabled?: boolean;
	required?: boolean;
	size?: Size;
	textAlign?: TextAlign;
	max?: number;
	errorMessage?: string;
	infoMessage?: string;
	isError?: boolean;
	icon?: string;
	appendIcon?: boolean;
	loading?: boolean;
	validationState?: ValidationState;
}

const props = withDefaults(defineProps<BMaskedInputProps>(), {
	modelValue: undefined,
	placeholder: "",
	disabled: false,
	required: false,
	size: "100",
	textAlign: "start",
	max: undefined,
	errorMessage: "",
	infoMessage: "",
	isError: false,
	icon: "",
	appendIcon: false,
	loading: false,
	validationState: 'none',
	announceValidation: true,
});

const emit = defineEmits<{
	"update:modelValue": [value: string | number | undefined];
	focus: [value: FocusEvent];
	blur: [value: FocusEvent];
	input: [value: string | number | undefined];
	"validation-change": [state: ValidationState, message?: string];
}>();

// Optional model for input value
const [model, setModel] = useOptionalModel<string | number | undefined>(
	props,
	"modelValue",
	emit,
	undefined
);

const inputValue = ref<string>('');
const isFocused = ref(false);

// Mask composable
const mask = useMask(inputValue, {
	mask: props.mask,
	isTextArea: false,
	enabled: true
});

// Validation composable
const validation = useValidation(inputValue, {
	type: 'text',
	mask: props.mask,
	isError: props.isError,
	isTextArea: false,
	max: props.max,
	announceValidation: props.announceValidation,
	customErrorAnnouncement: props.customErrorAnnouncement,
	customSuccessAnnouncement: props.customSuccessAnnouncement,
});

// Accessibility setup
const { useAriaId } = useAriaAttributes();
const inputId = useAriaId('masked-input');
const errorId = useAriaId('masked-input-error');
const infoId = useAriaId('masked-input-info');
const descriptionId = useAriaId('masked-input-description');

// Combined error state
const computedError = computed(() => {
	return props.isError || validation.hasError.value;
});

// Input container classes
const inputContainerClasses = computed(() => ({
	focus: isFocused.value,
	error: computedError.value,
	disabled: props.disabled,
}));

// Input style
const inputStyle = computed(() => ({
	"text-align": props.textAlign
}));

// Prepend icon
const prependIcon = computed(() => {
	if (!props.appendIcon) return props.icon;
	return "";
});

// Append icon
const appendedIcon = computed(() => {
	if (props.appendIcon) return props.icon;
	return "";
});

// Accessible placeholder with mask hint
const accessiblePlaceholder = computed(() => {
	return props.placeholder || mask.maskPlaceholder.value;
});

// Input ARIA attributes
const inputAriaAttrs = computed(() => {
	const describedByParts = [];
	
	// Add info message if present and no error
	if (props.infoMessage && !(computedError.value && props.errorMessage)) {
		describedByParts.push(infoId);
	}
	
	// Add error message if present
	if (computedError.value && props.errorMessage) {
		describedByParts.push(errorId);
	}
	
	// Add custom description if provided
	if (props.ariaDescription) {
		describedByParts.push(descriptionId);
	}

	return {
		id: inputId,
		'aria-label': props.ariaLabel || undefined,
		'aria-describedby': describedByParts.length > 0 ? describedByParts.join(' ') : undefined,
		'aria-invalid': computedError.value,
		'aria-required': props.required || undefined,
		'aria-busy': props.loading || undefined,
	};
});

// Set input value from model
const setInputValue = () => {
	const value = String(model.value || '');
	inputValue.value = value;
};

// Handle input changes
const onInput = () => {
	// Apply mask first
	const maskedValue = mask.applyMaskToValue(inputValue.value);
	inputValue.value = maskedValue;
	
	// Update model and emit events
	setModel(maskedValue);
	emit("input", maskedValue);
};

// Handle focus
const onFocus = (event: FocusEvent) => {
	isFocused.value = true;
	emit("focus", event);
};

// Handle blur
const onBlur = (event: FocusEvent) => {
	isFocused.value = false;
	validation.validate(inputValue.value);
	emit("blur", event);
};

// Watch for model changes
watch(model, setInputValue, { immediate: true });

// Watch for validation state changes
watch(() => validation.validationState.value, (newState) => {
	emit('validation-change', newState, validation.getValidationMessage(newState, props.errorMessage));
});
</script>

<template>
	<div class="b-masked-input" :class="'size-' + size">
		<div
			class="b-input-field-area"
			:class="inputContainerClasses"
		>
			<BIcon
				v-if="prependIcon"
				:name="prependIcon"
				class="b-input-side-icon"
			/>
			
			<input
				v-model="inputValue"
				type="text"
				class="b-input-text-content"
				:style="inputStyle"
				:disabled="disabled"
				:placeholder="accessiblePlaceholder"
				:maxlength="max"
				spellcheck="false"
				v-bind="inputAriaAttrs"
				@input="onInput"
				@focus="onFocus"
				@blur="onBlur"
			/>
			
			<BIcon
				v-if="appendedIcon"
				:name="appendedIcon"
				class="b-input-side-icon"
			/>
		</div>

		<!-- Loading indicator for screen readers -->
		<div
			v-if="props.loading"
			:id="`${inputId}-loading`"
			class="sr-only"
			aria-live="polite"
		>
			Validating input...
		</div>

		<!-- Custom ARIA description -->
		<div
			v-if="props.ariaDescription"
			:id="descriptionId"
			class="sr-only"
		>
			{{ props.ariaDescription }}
		</div>

		<!-- Error message with proper accessibility -->
		<small
			v-if="computedError && errorMessage"
			:id="errorId"
			class="b-input-message-error"
			role="alert"
			aria-live="assertive"
		>
			{{ errorMessage }}
		</small>

		<!-- Info message -->
		<small
			v-if="props.infoMessage && !(computedError && props.errorMessage)"
			:id="infoId"
			class="b-input-message-info"
		>
			{{ props.infoMessage }}
		</small>
	</div>
</template>

<style scoped>
@import "../../../assets/main.css";

/* Screen reader only class */
.sr-only {
	@apply absolute w-px h-px p-0 -m-px overflow-hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border: 0;
}

.b-masked-input {
	@apply flex flex-col gap-xs;
}

/* Size classes */
.size-xs {
	width: 176px;
}
.size-sm {
	width: 272px;
}
.size-base {
	width: 367px;
}
.size-lg {
	width: 559px;
}
.size-xl {
	width: 1134px;
}
.size-100 {
	width: 100%;
}

/* Input field styles */
.b-input-field-area {
	@apply flex items-center px-3 py-2 rounded-xs border;
	@apply border-neutral-border-default bg-neutral-surface-default;
	@apply transition-colors duration-200;
}

.b-input-field-area:hover:not(.disabled) {
	@apply border-neutral-border-hover;
}

.b-input-field-area.focus {
	@apply border-primary-interaction-default ring-2 ring-primary-interaction-default ring-opacity-20;
}

.b-input-field-area.error {
	@apply border-danger-border-default;
}

.b-input-field-area.error.focus {
	@apply border-danger-interaction-default ring-2 ring-danger-interaction-default ring-opacity-20;
}

.b-input-field-area.disabled {
	@apply bg-neutral-surface-disabled border-neutral-border-disabled cursor-not-allowed;
}

/* Input text styles */
.b-input-text-content {
	@apply flex-1 bg-transparent border-0 outline-none;
	@apply text-neutral-foreground-high placeholder:text-neutral-foreground-low;
}

.b-input-text-content:disabled {
	@apply text-neutral-foreground-disabled cursor-not-allowed;
}

/* Icon styles */
.b-input-side-icon {
	@apply text-neutral-foreground-medium text-lg;
	@apply flex-shrink-0;
}

.b-input-field-area.focus .b-input-side-icon {
	@apply text-primary-interaction-default;
}

.b-input-field-area.error .b-input-side-icon {
	@apply text-danger-interaction-default;
}

.b-input-field-area.disabled .b-input-side-icon {
	@apply text-neutral-foreground-disabled;
}

/* Message styles */
.b-input-message-error {
	@apply text-sm text-danger-foreground-low font-medium;
}

.b-input-message-info {
	@apply text-sm text-neutral-foreground-medium;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
	.b-input-field-area {
		@apply border-2;
	}
	
	.b-input-field-area.focus {
		@apply ring-4 ring-black;
	}
	
	.b-input-message-error {
		@apply border border-current p-2 rounded;
	}
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
	.b-input-field-area {
		transition: none !important;
	}
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
	.b-input-field-area {
		@apply bg-neutral-surface-default-dark border-neutral-border-default-dark;
	}
	
	.b-input-text-content {
		@apply text-neutral-foreground-high-dark placeholder:text-neutral-foreground-low-dark;
	}
}
</style>