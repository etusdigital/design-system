import { computed, ref, watch, nextTick, type Ref } from 'vue';
import { isValidEmail, isValidDomain, isValidUrl } from '#utils';
import { useScreenReader } from '#composables';

/**
 * Input validation states
 */
export type ValidationState = 'valid' | 'invalid' | 'pending' | 'none';

/**
 * Input types that support validation
 */
export type ValidatableInputType = 'text' | 'number' | 'email';

/**
 * Mask types that require validation
 */
export type ValidatableMask = 'domain' | 'url';

/**
 * Validation options for useValidation composable
 */
export interface ValidationOptions {
	/** Input type being validated */
	type: ValidatableInputType;
	/** Optional mask type */
	mask?: ValidatableMask;
	/** Whether the input is in error state externally */
	isError?: boolean;
	/** Whether the input is a textarea */
	isTextArea?: boolean;
	/** Maximum character/value limit */
	max?: number;
	/** Minimum value limit (for numbers) */
	min?: number;
	/** Whether to announce validation changes to screen readers */
	announceValidation?: boolean;
	/** Custom error announcement message */
	customErrorAnnouncement?: string;
	/** Custom success announcement message */
	customSuccessAnnouncement?: string;
}

/**
 * Validation result interface
 */
export interface ValidationResult {
	/** Whether the input has errors */
	hasError: Ref<boolean>;
	/** Current validation state */
	validationState: Ref<ValidationState>;
	/** Computed error state (combines internal and external errors) */
	computedError: Ref<boolean>;
	/** Validation function to call on input change */
	validate: (value: any) => void;
	/** Function to announce validation changes */
	announceValidationChange: (newState: ValidationState, oldState: ValidationState) => void;
	/** Get validation message for current state */
	getValidationMessage: (state: ValidationState, customErrorMessage?: string) => string;
}

/**
 * Composable for input validation logic
 * 
 * @param inputValue - Reactive input value to validate
 * @param options - Validation configuration options
 * @returns Validation utilities and reactive state
 */
export function useValidation(
	inputValue: Ref<any>,
	options: ValidationOptions
): ValidationResult {
	const hasError = ref(false);
	const previousValidationState = ref<ValidationState>('none');
	const screenReader = useScreenReader();

	/**
	 * Validates email format
	 */
	const validateEmail = (value: string): boolean => {
		return isValidEmail(value);
	};

	/**
	 * Validates domain format
	 */
	const validateDomain = (value: string): boolean => {
		return isValidDomain(value);
	};

	/**
	 * Validates URL format
	 */
	const validateUrl = (value: string): boolean => {
		return isValidUrl(value);
	};

	/**
	 * Validates character length limits
	 */
	const validateCharacterLimit = (value: string, maxLength: number): boolean => {
		return value.length <= maxLength;
	};

	/**
	 * Validates number range limits
	 */
	const validateNumberRange = (value: number, min?: number, max?: number): boolean => {
		if (min !== undefined && value < min) return false;
		if (max !== undefined && value > max) return false;
		return true;
	};

	/**
	 * Main validation function
	 */
	const validate = (value: any): void => {
		// If external error state is set, don't override it
		if (options.isError) {
			hasError.value = false;
			return;
		}

		// Skip validation if value is empty
		if (!value && value !== 0) {
			hasError.value = false;
			return;
		}

		let isValid = true;

		// Email validation
		if (options.type === 'email') {
			isValid = validateEmail(String(value));
		}
		// Domain validation
		else if (options.mask === 'domain') {
			isValid = validateDomain(String(value));
		}
		// URL validation
		else if (options.mask === 'url') {
			isValid = validateUrl(String(value));
		}
		// Character limit validation (for text inputs)
		else if (
			options.type === 'text' &&
			!options.isTextArea &&
			options.max !== undefined &&
			typeof value === 'string'
		) {
			isValid = validateCharacterLimit(value, options.max);
		}
		// Number range validation
		else if (options.type === 'number' && typeof value === 'number') {
			isValid = validateNumberRange(value, options.min, options.max);
		}

		hasError.value = !isValid;
	};

	/**
	 * Computed validation state
	 */
	const validationState = computed<ValidationState>(() => {
		if (options.isError) return 'invalid';
		if (hasError.value) return 'invalid';
		if (inputValue.value && !hasError.value && options.type === 'email') {
			return 'valid';
		}
		return 'none';
	});

	/**
	 * Combined error state
	 */
	const computedError = computed(() => {
		return options.isError || hasError.value;
	});

	/**
	 * Announces validation changes to screen readers
	 */
	const announceValidationChange = (newState: ValidationState, oldState: ValidationState): void => {
		if (!options.announceValidation) return;

		let message = '';

		if (newState === 'invalid') {
			message = options.customErrorAnnouncement || 'Input contains errors';
		} else if (newState === 'valid' && oldState === 'invalid') {
			message = options.customSuccessAnnouncement || 'Input is now valid';
		} else if (newState === 'pending') {
			message = 'Validating input';
		}

		if (message) {
			nextTick(() => {
				screenReader.announcePolitely(message);
			});
		}
	};

	/**
	 * Gets validation message for current state
	 */
	const getValidationMessage = (state: ValidationState, customErrorMessage?: string): string => {
		switch (state) {
			case 'invalid':
				return customErrorMessage || 'Input is invalid';
			case 'valid':
				return 'Input is valid';
			case 'pending':
				return 'Validating input';
			default:
				return '';
		}
	};

	// Watch for validation state changes and announce them
	watch(validationState, (newState, oldState) => {
		if (newState !== oldState) {
			announceValidationChange(newState, oldState);
		}
		previousValidationState.value = oldState;
	});

	// Auto-validate when input value changes
	watch(inputValue, validate, { immediate: true });

	return {
		hasError,
		validationState,
		computedError,
		validate,
		announceValidationChange,
		getValidationMessage
	};
}