import type { App, Plugin } from 'vue';
import BInput from './BInput.vue';

/**
 * Input component types
 */
export type BInputType =
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
export type BInputMask = "cpf" | "cnpj" | "cep" | "domain" | "url";

/**
 * Component sizes
 */
export type BInputSize = "xs" | "sm" | "base" | "lg" | "xl" | "100";

/**
 * Text alignment options
 */
export type BInputTextAlign = "start" | "center" | "end";

/**
 * Input value type - can be string, number, or File depending on input type
 */
export type BInputValue = string | number | File;

/**
 * Input validation states
 */
export type BInputValidationState = 'valid' | 'invalid' | 'pending' | 'none';

/**
 * Accessibility properties for inputs
 */
export interface BInputAccessibilityProps {
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
export interface BInputProps extends BInputAccessibilityProps {
	modelValue?: BInputValue;
	labelValue?: string;
	type?: BInputType;
	mask?: BInputMask;
	max?: number;
	min?: number;
	step?: number;
	errorMessage?: string;
	infoMessage?: string;
	size?: BInputSize;
	isTextArea?: boolean;
	disabled?: boolean;
	isError?: boolean;
	required?: boolean;
	placeholder?: string;
	textAlign?: BInputTextAlign;
	tooltipMinWidth?: string;
	icon?: string;
	appendIcon?: boolean;
	/** Loading state for async validation */
	loading?: boolean;
	/** Validation state for screen reader feedback */
	validationState?: BInputValidationState;
	/** Whether to show character count for screen readers */
	announceCharacterCount?: boolean;
	/** Auto-complete attribute for better UX */
	autocomplete?: string;
}

export default {
    install(Vue: App) {
        Vue.component('BInput', BInput);
    },
} as Plugin;

export {
    BInput,
}
