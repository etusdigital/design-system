import { computed, ref, watch, type Ref } from 'vue';
import { applyMask } from '#utils';

/**
 * Available input masks
 */
export type Mask = 'cpf' | 'cnpj' | 'cep' | 'domain' | 'url';

/**
 * Mask configuration options
 */
export interface MaskOptions {
	/** Type of mask to apply */
	mask?: Mask;
	/** Whether the input is a textarea (masks don't apply to textareas) */
	isTextArea?: boolean;
	/** Whether masking is enabled */
	enabled?: boolean;
}

/**
 * Mask result interface
 */
export interface MaskResult {
	/** Reactive masked value */
	maskedValue: Ref<string>;
	/** Function to apply mask to a value */
	applyMaskToValue: (value: string) => string;
	/** Whether masking is currently active */
	isMaskActive: Ref<boolean>;
	/** Placeholder text based on mask type */
	maskPlaceholder: Ref<string>;
}

/**
 * Placeholder texts for different mask types
 */
const MASK_PLACEHOLDERS: Record<Mask, string> = {
	cpf: 'Enter CPF (000.000.000-00)',
	cnpj: 'Enter CNPJ (00.000.000/0000-00)',
	cep: 'Enter ZIP code (00000-000)',
	domain: 'Enter domain (example.com)',
	url: 'Enter URL (https://example.com)'
};

/**
 * Composable for input masking logic
 * 
 * @param inputValue - Reactive input value to mask
 * @param options - Mask configuration options
 * @returns Masking utilities and reactive state
 */
export function useMask(
	inputValue: Ref<string | number | undefined>,
	options: MaskOptions
): MaskResult {
	const maskedValue = ref<string>('');

	/**
	 * Whether masking is currently active
	 */
	const isMaskActive = computed(() => {
		return !!(
			options.enabled !== false &&
			options.mask &&
			!options.isTextArea &&
			['cpf', 'cnpj', 'cep'].includes(options.mask)
		);
	});

	/**
	 * Get placeholder text based on mask type
	 */
	const maskPlaceholder = computed(() => {
		if (!options.mask || !isMaskActive.value) return '';
		return MASK_PLACEHOLDERS[options.mask] || '';
	});

	/**
	 * Apply mask to a specific value
	 */
	const applyMaskToValue = (value: string): string => {
		if (!isMaskActive.value || !options.mask) return value;
		
		try {
			return applyMask(value, options.mask);
		} catch (error) {
			console.warn(`Failed to apply mask ${options.mask}:`, error);
			return value;
		}
	};

	/**
	 * Update masked value when input changes
	 */
	const updateMaskedValue = (): void => {
		const currentValue = String(inputValue.value || '');
		
		if (isMaskActive.value) {
			maskedValue.value = applyMaskToValue(currentValue);
		} else {
			maskedValue.value = currentValue;
		}
	};

	// Watch for input value changes and apply mask
	watch(inputValue, updateMaskedValue, { immediate: true });

	// Watch for mask configuration changes
	watch(
		() => [options.mask, options.isTextArea, options.enabled],
		updateMaskedValue,
		{ immediate: true }
	);

	return {
		maskedValue,
		applyMaskToValue,
		isMaskActive,
		maskPlaceholder
	};
}