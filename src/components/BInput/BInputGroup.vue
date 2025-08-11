<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue';
import { useOptionalModel, useAriaAttributes, useScreenReader } from "#composables";
import { useValidation, type ValidationState } from './composables';
import BIcon from '../BIcon/BIcon.vue';

/**
 * Input types supported by input group
 */
type InputType = "text" | "number" | "search" | "password" | "email" | "color";

/**
 * Text alignment options
 */
type TextAlign = "start" | "center" | "end";

/**
 * Component sizes
 */
type Size = "xs" | "sm" | "base" | "lg" | "xl" | "100";

/**
 * Input value type
 */
type InputValue = string | number;

/**
 * Input group accessibility properties
 */
interface InputGroupAccessibilityProps {
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
	/** Whether to announce character count */
	announceCharacterCount?: boolean;
}

/**
 * Input group properties
 */
interface BInputGroupProps extends InputGroupAccessibilityProps {
	modelValue?: InputValue;
	type?: InputType;
	placeholder?: string;
	disabled?: boolean;
	required?: boolean;
	size?: Size;
	textAlign?: TextAlign;
	max?: number;
	min?: number;
	step?: number;
	errorMessage?: string;
	infoMessage?: string;
	isError?: boolean;
	isTextArea?: boolean;
	icon?: string;
	appendIcon?: boolean;
	loading?: boolean;
	validationState?: ValidationState;
	autocomplete?: string;
}

const props = withDefaults(defineProps<BInputGroupProps>(), {
	modelValue: undefined,
	type: "text",
	placeholder: "",
	disabled: false,
	required: false,
	size: "100",
	textAlign: "start",
	max: undefined,
	min: undefined,
	step: 1,
	errorMessage: "",
	infoMessage: "",
	isError: false,
	isTextArea: false,
	icon: "",
	appendIcon: false,
	loading: false,
	validationState: 'none',
	announceValidation: true,
	announceCharacterCount: false,
	autocomplete: undefined,
});

const emit = defineEmits<{
	"update:modelValue": [value: InputValue | undefined];
	focus: [value: FocusEvent];
	blur: [value: FocusEvent];
	input: [value: InputValue | undefined];
	"validation-change": [state: ValidationState, message?: string];
	"character-count-change": [count: number, max?: number];
}>();

// Component state
const [model, setModel] = useOptionalModel<InputValue | undefined>(
	props,
	"modelValue",
	emit,
	undefined
);

const inputValue = ref<InputValue>('');
const isFocused = ref(false);
const showPassword = ref(false);
const characterCount = ref(0);

// Validation composable
const validation = useValidation(inputValue, {
	type: props.type === 'color' || props.type === 'search' ? 'text' : props.type,
	isError: props.isError,
	isTextArea: props.isTextArea,
	max: props.max,
	min: props.min,
	announceValidation: props.announceValidation,
	customErrorAnnouncement: props.customErrorAnnouncement,
	customSuccessAnnouncement: props.customSuccessAnnouncement,
});

// Accessibility setup
const { useAriaId } = useAriaAttributes();
const screenReader = useScreenReader();

const inputId = useAriaId('input-group');
const errorId = useAriaId('input-group-error');
const infoId = useAriaId('input-group-info');
const descriptionId = useAriaId('input-group-description');
const characterCountId = useAriaId('input-group-count');

// Computed input type
const computedInputType = computed(() => {
	if (props.type === "color" || props.type === "email") return "text";
	if (props.type === "password" && showPassword.value) return "text";
	return props.type;
});

// Computed max value
const computedMax = computed(() => {
	if (props.type === "color") return 7;
	if (props.max !== undefined && !props.isTextArea) {
		return props.max;
	}
	return undefined;
});

// Combined error state
const computedError = computed(() => {
	return props.isError || validation.hasError.value;
});

// Input container classes
const inputContainerClasses = computed(() => ({
	focus: isFocused.value,
	error: computedError.value,
	disabled: props.disabled,
	'has-prepend-icon': prependIcon.value,
	'has-append-icon': appendedIcon.value,
}));

// Input style
const inputStyle = computed(() => ({
	"text-align": props.textAlign
}));

// Prepend icon
const prependIcon = computed(() => {
	if (props.type === "search") return "search";
	if (!props.appendIcon) return props.icon;
	return "";
});

// Append icon  
const appendedIcon = computed(() => {
	if (props.type === "password") {
		return showPassword.value ? "visibility_off" : "visibility";
	}
	if (props.appendIcon) return props.icon;
	return "";
});

// Accessible placeholder
const accessiblePlaceholder = computed(() => {
	let placeholder = props.placeholder;
	
	if (props.type === 'email' && !placeholder) {
		placeholder = 'Enter your email address';
	} else if (props.type === 'password' && !placeholder) {
		placeholder = 'Enter your password';
	}
	
	return placeholder;
});

// Character count for accessibility
const accessibleCharacterCount = computed(() => {
	if (!computedMax.value) return '';
	const current = characterCount.value;
	const max = computedMax.value;
	const remaining = max - current;
	
	if (remaining < 10) {
		return `${remaining} characters remaining`;
	}
	return `${current} of ${max} characters`;
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
	
	// Add character count if enabled
	if (props.announceCharacterCount && computedMax.value) {
		describedByParts.push(characterCountId);
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
		'autocomplete': props.autocomplete,
	};
});

// Update character count
const updateCharacterCount = () => {
	if (typeof inputValue.value === 'string') {
		characterCount.value = inputValue.value.length;
	} else {
		characterCount.value = 0;
	}
};

// Set input value from model
const setInputValue = () => {
	inputValue.value = props.modelValue || (props.modelValue === 0 ? props.modelValue : '');
	updateCharacterCount();
};

// Handle input changes
const onInput = () => {
	// Handle number input bounds
	if (props.type === "number") {
		let numValue = Number(inputValue.value);
		if (props.min !== undefined && numValue < props.min) {
			numValue = props.min;
			inputValue.value = numValue;
		} else if (props.max !== undefined && numValue > props.max) {
			numValue = props.max;
			inputValue.value = numValue;
		}
	}

	updateCharacterCount();
	validation.validate(inputValue.value);
	
	setModel(inputValue.value);
	emit("input", inputValue.value);
};

// Handle focus
const onFocus = (event: FocusEvent) => {
	isFocused.value = true;
	if (!props.isError) {
		validation.hasError.value = false;
	}
	emit("focus", event);
};

// Handle blur
const onBlur = (event: FocusEvent) => {
	isFocused.value = false;
	validation.validate(inputValue.value);
	
	// Announce validation state on blur for screen readers
	if (props.announceValidation && validation.validationState.value === 'invalid') {
		nextTick(() => {
			const message = props.customErrorAnnouncement || props.errorMessage || 'Input contains errors';
			screenReader.announceAssertively(message);
		});
	}
	
	emit("blur", event);
};

// Handle number increment/decrement
const increaseOrDecrease = (direction: number) => {
	if (props.disabled || props.type !== 'number') return;
	
	const currentValue = Number(inputValue.value) || 0;
	const newValue = (currentValue * 1000 + direction * props.step * 1000) / 1000;
	
	// Check bounds
	if (props.max !== undefined && newValue > props.max && direction > 0) {
		if (props.announceValidation) {
			screenReader.announcePolitely(`Maximum value ${props.max} reached`);
		}
		return;
	}
	
	if (props.min !== undefined && newValue < props.min && direction < 0) {
		if (props.announceValidation) {
			screenReader.announcePolitely(`Minimum value ${props.min} reached`);
		}
		return;
	}

	inputValue.value = newValue;
	
	// Announce value change for screen readers
	if (props.announceValidation) {
		screenReader.announcePolitely(`Value changed to ${newValue}`);
	}
	
	onInput();
};

// Handle password toggle
const togglePasswordVisibility = () => {
	if (props.type === "password") {
		showPassword.value = !showPassword.value;
	}
};

// Watchers
watch(model, setInputValue, { immediate: true });

watch(() => validation.validationState.value, (newState) => {
	emit('validation-change', newState, validation.getValidationMessage(newState, props.errorMessage));
});

watch(characterCount, (newCount, oldCount) => {
	if (props.announceCharacterCount && computedMax.value) {
		emit('character-count-change', newCount, computedMax.value);
		
		// Announce critical character count milestones
		if (computedMax.value - newCount === 10 && oldCount > newCount) {
			screenReader.announcePolitely('10 characters remaining');
		} else if (computedMax.value - newCount === 0) {
			screenReader.announcePolitely('Character limit reached');
		}
	}
});
</script>

<template>
	<div class="b-input-group" :class="'size-' + size">
		<!-- Textarea variant -->
		<div
			v-if="isTextArea"
			class="b-input-field-area textarea"
			:class="inputContainerClasses"
		>
			<textarea
				v-model="inputValue"
				class="b-input-text-content textarea-content"
				:style="inputStyle"
				:maxlength="computedMax"
				:placeholder="accessiblePlaceholder"
				:disabled="disabled"
				:rows="4"
				v-bind="inputAriaAttrs"
				@blur="onBlur"
				@focus="onFocus"
				@input="onInput"
			/>
		</div>

		<!-- Standard input variant -->
		<div v-else class="input-container">
			<div
				class="b-input-field-area"
				:class="inputContainerClasses"
			>
				<BIcon
					v-if="prependIcon"
					:name="prependIcon"
					class="b-input-side-icon prepend"
				/>
				
				<input
					v-model="inputValue"
					class="b-input-text-content"
					:style="inputStyle"
					:disabled="disabled"
					:placeholder="accessiblePlaceholder"
					:type="computedInputType"
					:max="props.type === 'number' ? props.max : computedMax"
					:min="min"
					:step="step"
					:maxlength="computedMax"
					spellcheck="false"
					v-bind="inputAriaAttrs"
					@input="onInput"
					@focus="onFocus"
					@blur="onBlur"
				/>
				
				<!-- Color input overlay -->
				<input
					v-if="props.type === 'color'"
					v-model="inputValue"
					type="color"
					class="color-display"
					:class="{ disabled: disabled }"
					:disabled="disabled"
					v-bind="inputAriaAttrs"
					@input="onInput"
					@focus="onFocus"
					@blur="onBlur"
				/>
				
				<BIcon
					v-if="appendedIcon"
					:name="appendedIcon"
					class="b-input-side-icon append"
					:class="{ 'cursor-pointer': props.type === 'password' }"
					@click="togglePasswordVisibility"
				/>
			</div>

			<!-- Number input controls -->
			<div
				v-if="props.type === 'number'"
				class="number-controls"
				:class="{
					'text-neutral-interaction-disabled': disabled && !computedError,
					'text-danger-interaction-default': computedError && !disabled,
				}"
			>
				<BIcon
					name="arrow_drop_up"
					class="number-icon"
					role="button"
					:aria-label="`Increase value by ${props.step}`"
					tabindex="0"
					@click="increaseOrDecrease(1)"
					@keydown.enter.space.prevent="increaseOrDecrease(1)"
				/>
				<BIcon
					name="arrow_drop_down"
					class="number-icon"
					role="button"
					:aria-label="`Decrease value by ${props.step}`"
					tabindex="0"
					@click="increaseOrDecrease(-1)"
					@keydown.enter.space.prevent="increaseOrDecrease(-1)"
				/>
			</div>
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

		<!-- Character count for screen readers -->
		<div
			v-if="props.announceCharacterCount && computedMax"
			:id="characterCountId"
			class="character-count"
			:class="{ 'sr-only': !props.announceCharacterCount }"
			aria-live="polite"
		>
			{{ accessibleCharacterCount }}
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

		<!-- Screen reader instructions -->
		<div
			v-if="props.type === 'password'"
			class="sr-only"
			aria-live="polite"
		>
			Press the eye icon to {{ showPassword ? 'hide' : 'show' }} password
		</div>

		<div
			v-if="props.type === 'number'"
			class="sr-only"
			aria-live="polite"
		>
			Use arrow keys or plus/minus buttons to change value. Step: {{ props.step }}
		</div>
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

.b-input-group {
	@apply flex flex-col gap-xs;
}

.input-container {
	@apply flex items-center gap-xxs;
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
	@apply flex items-center px-3 py-2 rounded-xs border flex-1;
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

.b-input-field-area.textarea {
	@apply items-start py-3;
}

/* Input text styles */
.b-input-text-content {
	@apply flex-1 bg-transparent border-0 outline-none;
	@apply text-neutral-foreground-high placeholder:text-neutral-foreground-low;
}

.b-input-text-content:disabled {
	@apply text-neutral-foreground-disabled cursor-not-allowed;
}

.textarea-content {
	@apply resize-none min-h-[4rem];
}

/* Color input styles */
.color-display {
	@apply w-2xl h-xl cursor-pointer bg-transparent ml-auto;
}

.color-display.disabled {
	@apply pointer-events-none;
}

input[type="color"]::-webkit-color-swatch-wrapper {
	@apply border-0 p-0 bg-transparent;
}

input[type="color"]::-webkit-color-swatch {
	@apply border-xxs border-neutral-surface-highlight rounded-xs;
}

/* Icon styles */
.b-input-side-icon {
	@apply text-neutral-foreground-medium text-lg;
	@apply flex-shrink-0;
}

.b-input-side-icon.prepend {
	@apply mr-2;
}

.b-input-side-icon.append {
	@apply ml-2;
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

/* Number controls */
.number-controls {
	@apply flex flex-col items-center;
}

.number-icon {
	@apply cursor-pointer text-2xl flex items-center h-[.7em];
	@apply transition-colors duration-200;
}

.number-icon:hover {
	@apply text-primary-interaction-default;
}

.number-icon:focus {
	@apply outline-none ring-2 ring-primary-interaction-default ring-offset-2;
}

/* Hide number input spinners */
input[type="number"] {
	-moz-appearance: textfield;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
	-webkit-appearance: none;
	@apply m-0;
}

/* Character count */
.character-count {
	@apply text-xs text-neutral-foreground-low text-right;
}

/* Message styles */
.b-input-message-error {
	@apply text-sm text-danger-foreground-low font-medium;
}

.b-input-message-info {
	@apply text-sm text-neutral-foreground-medium;
}

/* Focus management improvements */
.b-input-field-area:focus-within {
	@apply outline-2 outline-primary-interaction-default outline-offset-2;
}

/* Loading state styling */
.b-input-field-area:has(.b-input-text-content[aria-busy="true"]) {
	@apply opacity-70 relative;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
	.b-input-field-area {
		@apply border-2;
	}
	
	.b-input-field-area:focus-within {
		@apply outline-4 outline-offset-2;
	}
	
	.b-input-message-error {
		@apply border border-current p-2 rounded;
	}
	
	.number-icon:focus {
		@apply ring-4 ring-black;
	}
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
	.b-input-field-area,
	.b-input-text-content,
	.number-icon {
		transition: none !important;
	}
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
	.character-count {
		@apply text-neutral-foreground-low-dark;
	}
}
</style>