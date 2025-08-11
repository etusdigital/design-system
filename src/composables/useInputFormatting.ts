import { ref, computed, type Ref } from 'vue';
import type { BInputType, BInputMask, BInputValue } from '#/components/BInput/BInput.types';
import { applyMask } from '#/utils';

export interface UseInputFormattingOptions {
  type?: BInputType;
  mask?: BInputMask;
  max?: number;
  min?: number;
  step?: number;
  isTextArea?: boolean;
  truncateLabels?: boolean;
  maxLabelLength?: number;
}

export function useInputFormatting(
  inputValue: Ref<BInputValue | undefined>,
  options: UseInputFormattingOptions = {}
) {
  const characterCount = ref(0);

  // Computed maximum value with context
  const computedMax = computed((): number | undefined => {
    if (options.type === 'color') return 7;
    if ((options.max || options.max === 0) && (!options.mask || options.isTextArea)) {
      return options.max;
    }
    return undefined;
  });

  // Computed input type for display
  const displayType = computed((): BInputType => {
    const currentType = options.type || 'text';
    // Convert special types for input element
    if (currentType === 'color' || currentType === 'email') return 'text';
    return currentType;
  });

  /**
   * Updates character count for the current input value
   */
  function updateCharacterCount(): void {
    if (typeof inputValue.value === 'string') {
      characterCount.value = inputValue.value.length;
    } else {
      characterCount.value = 0;
    }
  }

  /**
   * Applies input formatting based on type and mask
   */
  function formatInput(): void {
    // Apply mask for text inputs
    if (!options.isTextArea && options.mask && options.type === 'text') {
      if (typeof inputValue.value === 'string') {
        inputValue.value = applyMask(inputValue.value, options.mask);
      }
    }

    // Handle number input constraints
    if (options.type === 'number' && typeof inputValue.value === 'number') {
      let value = inputValue.value;

      // Apply min/max constraints
      if ((options.min || options.min === 0) && value < options.min) {
        value = options.min;
      } else if ((options.max || options.max === 0) && value > options.max) {
        value = options.max;
      }

      inputValue.value = value;
    }

    updateCharacterCount();
  }

  /**
   * Increments or decrements number input value
   */
  function adjustNumberValue(direction: number): number | undefined {
    if (options.type !== 'number') return undefined;

    let currentValue: number;
    if (isNaN(Number(inputValue.value))) {
      currentValue = 0;
    } else {
      currentValue = Number(inputValue.value);
    }

    const step = options.step || 1;
    const newValue = (currentValue * 1000 + direction * step * 1000) / 1000;

    // Check bounds
    if (options.max !== undefined && newValue > options.max) {
      return options.max;
    }
    if (options.min !== undefined && newValue < options.min) {
      return options.min;
    }

    return newValue;
  }

  /**
   * Gets accessible placeholder text based on type and mask
   */
  function getAccessiblePlaceholder(basePlaceholder?: string): string {
    let placeholder = basePlaceholder || '';
    
    // Add format hints for specific input types
    if (!placeholder) {
      switch (options.type) {
        case 'email':
          placeholder = 'Enter your email address';
          break;
        case 'password':
          placeholder = 'Enter your password';
          break;
        case 'tel':
          placeholder = 'Enter phone number';
          break;
        case 'url':
          placeholder = 'Enter URL';
          break;
        case 'search':
          placeholder = 'Search...';
          break;
        case 'number':
          placeholder = 'Enter number';
          break;
        default:
          placeholder = 'Enter text';
      }
    }

    // Add mask-specific hints
    switch (options.mask) {
      case 'cpf':
        placeholder = placeholder || 'Enter CPF (000.000.000-00)';
        break;
      case 'cnpj':
        placeholder = placeholder || 'Enter CNPJ (00.000.000/0000-00)';
        break;
      case 'cep':
        placeholder = placeholder || 'Enter CEP (00000-000)';
        break;
      case 'phone':
        placeholder = placeholder || 'Enter phone number (00) 00000-0000';
        break;
    }
    
    return placeholder;
  }

  /**
   * Gets character count display text for accessibility
   */
  function getCharacterCountText(max?: number): string {
    if (!max) return '';
    
    const current = characterCount.value;
    const remaining = max - current;
    
    if (remaining < 10) {
      return `${remaining} characters remaining`;
    }
    return `${current} of ${max} characters`;
  }

  /**
   * Truncates text if enabled and over limit
   */
  function truncateText(text: string): string {
    if (!options.truncateLabels || !options.maxLabelLength) {
      return text;
    }
    
    if (text.length > options.maxLabelLength) {
      return text.substring(0, options.maxLabelLength - 3) + '...';
    }
    
    return text;
  }

  /**
   * Gets formatted value for display
   */
  function getDisplayValue(): string {
    if (inputValue.value === undefined || inputValue.value === null) {
      return '';
    }
    return String(inputValue.value);
  }

  /**
   * Checks if the current value exceeds character limits
   */
  function isOverCharacterLimit(): boolean {
    if (!computedMax.value || options.isTextArea) return false;
    return characterCount.value > computedMax.value;
  }

  /**
   * Gets input mode for mobile keyboards
   */
  function getInputMode(): string | undefined {
    switch (options.type) {
      case 'number':
        return 'numeric';
      case 'email':
        return 'email';
      case 'tel':
        return 'tel';
      case 'url':
        return 'url';
      case 'search':
        return 'search';
      default:
        return undefined;
    }
  }

  return {
    // State
    characterCount: computed(() => characterCount.value),
    computedMax,
    displayType,
    
    // Methods
    formatInput,
    updateCharacterCount,
    adjustNumberValue,
    getAccessiblePlaceholder,
    getCharacterCountText,
    truncateText,
    getDisplayValue,
    isOverCharacterLimit,
    getInputMode,
  };
}