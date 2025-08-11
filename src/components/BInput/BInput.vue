<script setup lang="ts">
import { computed } from "vue";
import BLabel from "../../utils/components/Label.vue";
import BFileInput from './BFileInput.vue';
import BMaskedInput from './BMaskedInput.vue';
import BInputGroup from './BInputGroup.vue';

/**
 * Input component types
 */
type InputType =
	| "text"
	| "number"
	| "search"
	| "color"
	| "password"
	| "file"
	| "email";

/**
 * Available input masks
 */
type Mask = "cpf" | "cnpj" | "cep" | "domain" | "url";

/**
 * Component sizes
 */
type Size = "xs" | "sm" | "base" | "lg" | "xl" | "100";

/**
 * Text alignment options
 */
type TextAlign = "start" | "center" | "end";

/**
 * Input value type - can be string, number, or File depending on input type
 */
type InputValue = string | number | File;

/**
 * Input validation states
 */
type ValidationState = 'valid' | 'invalid' | 'pending' | 'none';

/**
 * Accessibility properties for inputs
 */
interface InputAccessibilityProps {
	/** ARIA label override */
	ariaLabel?: string;
	/** ARIA description for complex inputs */
	ariaDescription?: string;
	/** Whether to announce validation changes */
	announceValidation?: boolean;
	/** Custom error announcement message */
	customErrorAnnouncement?: string;
	/** Custom success announcement message */
	customSuccessAnnouncement?: string;
	/** Help text for complex input patterns */
	helpText?: string;
	/** Whether the input is part of a group */
	groupRole?: 'group' | 'radiogroup' | 'listbox' | undefined;
	/** ARIA expanded state for inputs with dropdown behavior */
	ariaExpanded?: boolean;
	/** ARIA controls reference for associated elements */
	ariaControls?: string;
}

/**
 * Enhanced input properties with comprehensive accessibility
 */
interface BInputProps extends InputAccessibilityProps {
	modelValue?: InputValue;
	labelValue?: string;
	type?: InputType;
	mask?: Mask;
	max?: number;
	min?: number;
	step?: number;
	errorMessage?: string;
	infoMessage?: string;
	size?: Size;
	isTextArea?: boolean;
	disabled?: boolean;
	isError?: boolean;
	required?: boolean;
	placeholder?: string;
	textAlign?: TextAlign;
	tooltipMinWidth?: string;
	icon?: string;
	appendIcon?: boolean;
	/** Loading state for async validation */
	loading?: boolean;
	/** Validation state for screen reader feedback */
	validationState?: ValidationState;
	/** Whether to show character count for screen readers */
	announceCharacterCount?: boolean;
	/** Auto-complete attribute for better UX */
	autocomplete?: string;
}

const props = withDefaults(defineProps<BInputProps>(), {
	modelValue: undefined,
	labelValue: "",
	type: "text",
	mask: undefined,
	max: undefined,
	min: undefined,
	step: 1,
	errorMessage: "",
	infoMessage: "",
	size: "100",
	isTextArea: false,
	disabled: false,
	isError: false,
	required: false,
	placeholder: "",
	textAlign: "start",
	tooltipMinWidth: "none",
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

// Determine which component to use based on input type and mask
const isFileInput = computed(() => props.type === 'file');
const isMaskedInput = computed(() => {
	return !!(props.mask && ['cpf', 'cnpj', 'cep', 'domain', 'url'].includes(props.mask));
});

// Character count display for text inputs
const shouldShowCharacterCount = computed(() => {
	return props.max !== undefined && !props.isTextArea && props.type === 'text' && !isFileInput.value;
});

// Pass-through event handlers
const handleInput = (value: InputValue | undefined) => {
	emit("update:modelValue", value);
	emit("input", value);
};

const handleFocus = (event: FocusEvent) => {
	emit("focus", event);
};

const handleBlur = (event: FocusEvent) => {
	emit("blur", event);
};

const handleValidationChange = (state: ValidationState, message?: string) => {
	emit("validation-change", state, message);
};

const handleCharacterCountChange = (count: number, max?: number) => {
	emit("character-count-change", count, max);
};

// Convert File type for file inputs or pass through for other types
const handleModelUpdate = (value: any) => {
	emit("update:modelValue", value);
};
</script>

<template>
	<div
		class="b-input-wrapper"
		:class="[
			'size-' + props.size,
			{ 'file-input': isFileInput }
		]"
		style="gap: 6px"
	>
		<!-- Label and character count header -->
		<div
			class="input-header"
			v-if="labelValue || shouldShowCharacterCount"
		>
			<BLabel
				:label-value="labelValue"
				:info-message="
					props.infoMessage && !(props.isError && props.errorMessage)
						? props.infoMessage
						: ''
				"
				:tooltip-min-width="tooltipMinWidth"
				:required="required"
			/>
			<span
				v-if="shouldShowCharacterCount"
				class="character-counter"
			>
				{{ (modelValue as string)?.length || 0 }}/{{ max }}
			</span>
		</div>

		<!-- File input component -->
		<BFileInput
			v-if="isFileInput"
			:model-value="modelValue as File"
			:label-value="labelValue"
			:placeholder="placeholder"
			:disabled="disabled"
			:size="size"
			:required="required"
			:aria-label="ariaLabel"
			:aria-description="ariaDescription"
			:announce-file-operations="announceValidation"
			:custom-selection-announcement="customSuccessAnnouncement"
			:custom-removal-announcement="customErrorAnnouncement"
			@update:model-value="handleModelUpdate"
			@change="handleInput"
		>
			<template #uploaded-file="{ file, fileName }">
				<slot name="uploaded-file" :file="file" :fileName="fileName" />
			</template>
		</BFileInput>

		<!-- Masked input component -->
		<BMaskedInput
			v-else-if="isMaskedInput"
			:model-value="modelValue as string | number"
			:mask="mask!"
			:placeholder="placeholder"
			:disabled="disabled"
			:required="required"
			:size="size"
			:text-align="textAlign"
			:max="max"
			:error-message="errorMessage"
			:info-message="infoMessage"
			:is-error="isError"
			:icon="icon"
			:append-icon="appendIcon"
			:loading="loading"
			:validation-state="validationState"
			:aria-label="ariaLabel"
			:aria-description="ariaDescription"
			:announce-validation="announceValidation"
			:custom-error-announcement="customErrorAnnouncement"
			:custom-success-announcement="customSuccessAnnouncement"
			@update:model-value="handleModelUpdate"
			@focus="handleFocus"
			@blur="handleBlur"
			@input="handleInput"
			@validation-change="handleValidationChange"
		/>

		<!-- Standard input group component -->
		<BInputGroup
			v-else
			:model-value="modelValue as string | number"
			:type="type"
			:placeholder="placeholder"
			:disabled="disabled"
			:required="required"
			:size="size"
			:text-align="textAlign"
			:max="max"
			:min="min"
			:step="step"
			:error-message="errorMessage"
			:info-message="infoMessage"
			:is-error="isError"
			:is-text-area="isTextArea"
			:icon="icon"
			:append-icon="appendIcon"
			:loading="loading"
			:validation-state="validationState"
			:autocomplete="autocomplete"
			:aria-label="ariaLabel"
			:aria-description="ariaDescription"
			:announce-validation="announceValidation"
			:announce-character-count="announceCharacterCount"
			:custom-error-announcement="customErrorAnnouncement"
			:custom-success-announcement="customSuccessAnnouncement"
			@update:model-value="handleModelUpdate"
			@focus="handleFocus"
			@blur="handleBlur"
			@input="handleInput"
			@validation-change="handleValidationChange"
			@character-count-change="handleCharacterCountChange"
		/>

		<!-- Help text for complex inputs -->
		<div
			v-if="props.helpText"
			class="help-text"
		>
			{{ props.helpText }}
		</div>
	</div>
</template>

<style scoped>
@import "../../assets/main.css";

.b-input-wrapper {
	@apply flex flex-col h-fit;
}

/* Input header with label and character count */
.input-header {
	@apply flex justify-between items-center;
}

.character-counter {
	@apply text-sm text-neutral-foreground-medium;
}

/* Help text styling */
.help-text {
	@apply text-sm text-neutral-foreground-low mt-xs;
}

/* Size classes control the width of the main wrapper */
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

/* File input specific adjustments */
.file-input {
	@apply opacity-100;
}

.file-input.size-xs,
.file-input.size-sm,
.file-input.size-base,
.file-input.size-lg,
.file-input.size-xl,
.file-input.size-100 {
	/* File inputs maintain their intrinsic sizing from BFileInput */
	width: auto;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
	.help-text {
		@apply border border-current p-2 rounded;
	}
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
	.character-counter {
		@apply text-neutral-foreground-medium-dark;
	}
	
	.help-text {
		@apply text-neutral-foreground-low-dark;
	}
}
</style>