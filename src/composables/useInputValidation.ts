import { ref, computed, nextTick, watch, type Ref } from 'vue';
import type { 
  BInputType, 
  BInputMask, 
  BInputValue, 
  BInputValidationState,
  BInputValidationConfig,
  BInputValidationResult
} from '#/components/BInput/BInput.types';
import { isValidEmail, isValidDomain, isValidUrl } from '#/utils';
import { useScreenReader } from '#composables/useScreenReader';

export interface UseInputValidationOptions {
  type?: BInputType;
  mask?: BInputMask;
  max?: number;
  min?: number;
  required?: boolean;
  isTextArea?: boolean;
  disabled?: boolean;
  isError?: boolean;
  announceValidation?: boolean;
  customErrorAnnouncement?: string;
  customSuccessAnnouncement?: string;
  validationConfig?: BInputValidationConfig;
}

export function useInputValidation(
  inputValue: Ref<BInputValue | undefined>,
  options: UseInputValidationOptions = {}
) {
  const screenReader = useScreenReader();
  
  // Internal validation state
  const hasError = ref(false);
  const previousValidationState = ref<BInputValidationState>('none');
  const validationMessages = ref<string[]>([]);
  const isValidating = ref(false);

  // Computed validation state
  const currentValidationState = computed((): BInputValidationState => {
    if (isValidating.value) return 'pending';
    if (options.isError) return 'invalid';
    if (hasError.value) return 'invalid';
    if (inputValue.value && !hasError.value && needsValidation()) {
      return 'valid';
    }
    return 'none';
  });

  // Validation result
  const validationResult = computed((): BInputValidationResult => {
    return {
      isValid: currentValidationState.value === 'valid' || currentValidationState.value === 'none',
      state: currentValidationState.value,
      errors: hasError.value ? validationMessages.value : [],
      warnings: [],
      value: inputValue.value,
    };
  });

  /**
   * Checks if the current input type needs validation
   */
  function needsValidation(): boolean {
    return options.type === 'email' || 
           options.mask === 'domain' || 
           options.mask === 'url' ||
           !!options.validationConfig?.validator;
  }

  /**
   * Performs validation on the current input value
   */
  function validateInput(): boolean {
    if (options.disabled || options.isError) {
      hasError.value = false;
      return true;
    }

    const value = inputValue.value;
    let isValid = true;
    const errors: string[] = [];

    // Required field validation
    if (options.required && (!value || value === '')) {
      isValid = false;
      errors.push('This field is required');
    }

    // Type-specific validation
    if (value && typeof value === 'string') {
      switch (options.type) {
        case 'email':
          if (!isValidEmail(value)) {
            isValid = false;
            errors.push('Please enter a valid email address');
          }
          break;
      }

      // Mask-specific validation
      switch (options.mask) {
        case 'domain':
          if (!isValidDomain(value)) {
            isValid = false;
            errors.push('Please enter a valid domain name');
          }
          break;
        case 'url':
          if (!isValidUrl(value)) {
            isValid = false;
            errors.push('Please enter a valid URL');
          }
          break;
      }

      // Length validation
      if (!options.isTextArea && options.max && value.length > options.max) {
        isValid = false;
        errors.push(`Maximum ${options.max} characters allowed`);
      }

      if (options.min && value.length < options.min) {
        isValid = false;
        errors.push(`Minimum ${options.min} characters required`);
      }
    }

    // Number validation
    if (options.type === 'number' && typeof value === 'number') {
      if (options.min !== undefined && value < options.min) {
        isValid = false;
        errors.push(`Value must be at least ${options.min}`);
      }
      if (options.max !== undefined && value > options.max) {
        isValid = false;
        errors.push(`Value must not exceed ${options.max}`);
      }
    }

    // Custom validation
    if (options.validationConfig?.validator && value !== undefined) {
      const customResult = options.validationConfig.validator(value);
      if (typeof customResult === 'string') {
        isValid = false;
        errors.push(customResult);
      } else if (customResult === false) {
        isValid = false;
        errors.push('Invalid input');
      }
    }

    hasError.value = !isValid;
    validationMessages.value = errors;

    return isValid;
  }

  /**
   * Announces validation changes to screen readers
   */
  function announceValidationChange(newState: BInputValidationState, oldState: BInputValidationState) {
    if (!options.announceValidation) return;

    let message = '';
    
    if (newState === 'invalid' && validationMessages.value.length > 0) {
      message = options.customErrorAnnouncement || 
                `Error: ${validationMessages.value.join(', ')}`;
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
  }

  /**
   * Gets validation message for current state
   */
  function getValidationMessage(state: BInputValidationState = currentValidationState.value): string {
    switch (state) {
      case 'invalid':
        return validationMessages.value.join(', ') || 'Input is invalid';
      case 'valid':
        return 'Input is valid';
      case 'pending':
        return 'Validating input';
      default:
        return '';
    }
  }

  /**
   * Triggers async validation with debouncing
   */
  function validateAsync(): Promise<boolean> {
    return new Promise((resolve) => {
      isValidating.value = true;
      
      const debounceTime = options.validationConfig?.debounceTime || 300;
      
      setTimeout(() => {
        const isValid = validateInput();
        isValidating.value = false;
        resolve(isValid);
      }, debounceTime);
    });
  }

  /**
   * Clears validation state
   */
  function clearValidation() {
    hasError.value = false;
    validationMessages.value = [];
    previousValidationState.value = 'none';
  }

  /**
   * Forces validation state
   */
  function forceValidationState(state: BInputValidationState, message?: string) {
    switch (state) {
      case 'valid':
        hasError.value = false;
        validationMessages.value = [];
        break;
      case 'invalid':
        hasError.value = true;
        validationMessages.value = message ? [message] : ['Invalid input'];
        break;
      case 'pending':
        isValidating.value = true;
        break;
      case 'none':
        clearValidation();
        break;
    }
  }

  // Watch for validation state changes and announce them
  watch(currentValidationState, (newState, oldState) => {
    if (newState !== oldState) {
      announceValidationChange(newState, oldState);
      previousValidationState.value = oldState;
    }
  });

  return {
    // State
    hasError: computed(() => hasError.value),
    isValidating: computed(() => isValidating.value),
    currentValidationState,
    validationResult,
    validationMessages: computed(() => validationMessages.value),
    
    // Methods
    validateInput,
    validateAsync,
    clearValidation,
    forceValidationState,
    getValidationMessage,
    announceValidationChange,
  };
}