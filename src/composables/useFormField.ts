import { ref, computed, watch, inject, provide, onMounted, onUnmounted, nextTick } from 'vue';
import type { Ref, ComputedRef, InjectionKey } from 'vue';

/**
 * Validation rule function type
 */
export type ValidationRule<T = any> = (value: T) => string | boolean | Promise<string | boolean>;

/**
 * Built-in validation rules
 */
export interface ValidationRules {
  required: (message?: string) => ValidationRule;
  minLength: (min: number, message?: string) => ValidationRule<string>;
  maxLength: (max: number, message?: string) => ValidationRule<string>;
  pattern: (regex: RegExp, message?: string) => ValidationRule<string>;
  email: (message?: string) => ValidationRule<string>;
  url: (message?: string) => ValidationRule<string>;
  number: (message?: string) => ValidationRule<string | number>;
  min: (min: number, message?: string) => ValidationRule<number>;
  max: (max: number, message?: string) => ValidationRule<number>;
  custom: <T = any>(fn: (value: T) => string | boolean | Promise<string | boolean>) => ValidationRule<T>;
}

/**
 * Validation trigger options
 */
export type ValidationTrigger = 'change' | 'blur' | 'submit' | 'manual';

/**
 * Form field state
 */
export interface FormFieldState<T = any> {
  /** Current field value */
  value: T;
  /** Whether field has been touched/focused */
  touched: boolean;
  /** Whether field value has been changed */
  dirty: boolean;
  /** Whether field is currently being validated */
  validating: boolean;
  /** Current validation error message */
  error: string | null;
  /** Whether field is valid */
  valid: boolean;
  /** Whether field is invalid */
  invalid: boolean;
}

/**
 * Form field configuration options
 */
export interface UseFormFieldOptions<T = any> {
  /** Initial value for the field */
  initialValue?: T;
  /** Validation rules array */
  rules?: ValidationRule<T>[];
  /** When to trigger validation */
  validateOn?: ValidationTrigger | ValidationTrigger[];
  /** Whether to validate immediately on mount */
  validateOnMount?: boolean;
  /** Debounce delay for validation in milliseconds */
  debounceMs?: number;
  /** Field name for form context */
  name?: string;
  /** Whether field is required */
  required?: boolean;
  /** Custom error messages */
  errorMessages?: Record<string, string>;
  /** Transform value before validation */
  transform?: (value: T) => T;
}

/**
 * Form context interface
 */
export interface FormContext {
  /** Register a field with the form */
  register: (name: string, field: FormFieldReturn) => void;
  /** Unregister a field from the form */
  unregister: (name: string) => void;
  /** Validate all form fields */
  validate: () => Promise<boolean>;
  /** Reset all form fields */
  reset: () => void;
  /** Check if form is valid */
  isValid: ComputedRef<boolean>;
  /** Get form errors */
  errors: ComputedRef<Record<string, string>>;
}

/**
 * Form field return interface
 */
export interface FormFieldReturn<T = any> {
  /** Reactive field value */
  value: Ref<T>;
  /** Reactive field state */
  state: ComputedRef<FormFieldState<T>>;
  /** Field error message */
  error: ComputedRef<string | null>;
  /** Whether field is valid */
  isValid: ComputedRef<boolean>;
  /** Whether field is invalid */
  isInvalid: ComputedRef<boolean>;
  /** Whether field is touched */
  isTouched: ComputedRef<boolean>;
  /** Whether field is dirty */
  isDirty: ComputedRef<boolean>;
  /** Whether field is validating */
  isValidating: ComputedRef<boolean>;
  /** Mark field as touched */
  touch: () => void;
  /** Reset field to initial state */
  reset: () => void;
  /** Manually trigger validation */
  validate: () => Promise<boolean>;
  /** Clear validation error */
  clearError: () => void;
  /** Set custom error */
  setError: (error: string) => void;
  /** ARIA attributes for the field */
  ariaAttrs: ComputedRef<Record<string, any>>;
}

// Form context injection key
export const FormContextKey: InjectionKey<FormContext> = Symbol('FormContext');

/**
 * Built-in validation rules
 */
export const validationRules: ValidationRules = {
  required: (message = 'This field is required') => (value: any) => {
    if (value == null || value === '' || (Array.isArray(value) && value.length === 0)) {
      return message;
    }
    return true;
  },

  minLength: (min: number, message?: string) => (value: string) => {
    if (typeof value !== 'string') return true;
    if (value.length < min) {
      return message || `Must be at least ${min} characters`;
    }
    return true;
  },

  maxLength: (max: number, message?: string) => (value: string) => {
    if (typeof value !== 'string') return true;
    if (value.length > max) {
      return message || `Must be no more than ${max} characters`;
    }
    return true;
  },

  pattern: (regex: RegExp, message?: string) => (value: string) => {
    if (typeof value !== 'string') return true;
    if (!regex.test(value)) {
      return message || 'Invalid format';
    }
    return true;
  },

  email: (message = 'Must be a valid email address') => (value: string) => {
    if (typeof value !== 'string' || !value) return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) || message;
  },

  url: (message = 'Must be a valid URL') => (value: string) => {
    if (typeof value !== 'string' || !value) return true;
    try {
      new URL(value);
      return true;
    } catch {
      return message;
    }
  },

  number: (message = 'Must be a valid number') => (value: string | number) => {
    if (value === '' || value == null) return true;
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return !isNaN(num) || message;
  },

  min: (min: number, message?: string) => (value: number) => {
    if (typeof value !== 'number') return true;
    return value >= min || (message || `Must be at least ${min}`);
  },

  max: (max: number, message?: string) => (value: number) => {
    if (typeof value !== 'number') return true;
    return value <= max || (message || `Must be no more than ${max}`);
  },

  custom: <T = any>(fn: (value: T) => string | boolean | Promise<string | boolean>) => fn,
};

/**
 * Composable for form field management with validation and state tracking
 * 
 * @param options - Form field configuration options
 * @returns Form field utilities and reactive state
 * 
 * @example
 * ```typescript
 * const emailField = useFormField({
 *   initialValue: '',
 *   rules: [
 *     validationRules.required(),
 *     validationRules.email()
 *   ],
 *   validateOn: ['blur', 'change']
 * });
 * 
 * // In template:
 * // <input v-model="emailField.value.value" @blur="emailField.touch" />
 * // <div v-if="emailField.error.value">{{ emailField.error.value }}</div>
 * ```
 */
export function useFormField<T = any>(options: UseFormFieldOptions<T> = {}): FormFieldReturn<T> {
  const {
    initialValue,
    rules = [],
    validateOn = 'blur',
    validateOnMount = false,
    debounceMs = 0,
    name,
    required = false,
    errorMessages = {},
    transform
  } = options;

  // Internal state
  const value = ref<T>(initialValue as T);
  const initialVal = ref<T>(initialValue as T);
  const touched = ref(false);
  const validating = ref(false);
  const error = ref<string | null>(null);
  const validationTimeoutId = ref<number | null>(null);

  // Form context
  const formContext = inject(FormContextKey, null);

  // Computed state
  const dirty = computed(() => value.value !== initialVal.value);
  const isValid = computed(() => !error.value && !validating.value);
  const isInvalid = computed(() => !!error.value);
  const isTouched = computed(() => touched.value);
  const isDirty = computed(() => dirty.value);
  const isValidating = computed(() => validating.value);

  // Combined field state
  const state = computed<FormFieldState<T>>(() => ({
    value: value.value,
    touched: touched.value,
    dirty: dirty.value,
    validating: validating.value,
    error: error.value,
    valid: isValid.value,
    invalid: isInvalid.value,
  }));

  // ARIA attributes for accessibility
  const ariaAttrs = computed(() => ({
    'aria-invalid': isInvalid.value,
    'aria-required': required || undefined,
    'aria-describedby': error.value ? `${name}-error` : undefined,
  }));

  /**
   * Perform field validation
   */
  const validate = async (): Promise<boolean> => {
    if (rules.length === 0) return true;

    validating.value = true;
    error.value = null;

    try {
      let fieldValue = value.value;

      // Apply transform if provided
      if (transform) {
        fieldValue = transform(fieldValue);
      }

      // Run all validation rules
      for (const rule of rules) {
        const result = await rule(fieldValue);
        
        if (result !== true) {
          error.value = typeof result === 'string' ? result : 'Validation failed';
          break;
        }
      }

      return isValid.value;
    } catch (err) {
      error.value = 'Validation error occurred';
      return false;
    } finally {
      validating.value = false;
    }
  };

  /**
   * Validate with debouncing
   */
  const debouncedValidate = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (validationTimeoutId.value) {
        clearTimeout(validationTimeoutId.value);
      }

      validationTimeoutId.value = window.setTimeout(async () => {
        const result = await validate();
        resolve(result);
      }, debounceMs);
    });
  };

  /**
   * Check if validation should trigger
   */
  const shouldValidate = (trigger: ValidationTrigger): boolean => {
    const triggers = Array.isArray(validateOn) ? validateOn : [validateOn];
    return triggers.includes(trigger);
  };

  /**
   * Mark field as touched
   */
  const touch = (): void => {
    touched.value = true;
    if (shouldValidate('blur')) {
      if (debounceMs > 0) {
        debouncedValidate();
      } else {
        validate();
      }
    }
  };

  /**
   * Reset field to initial state
   */
  const reset = (): void => {
    value.value = initialVal.value;
    touched.value = false;
    error.value = null;
    validating.value = false;
    
    if (validationTimeoutId.value) {
      clearTimeout(validationTimeoutId.value);
      validationTimeoutId.value = null;
    }
  };

  /**
   * Clear validation error
   */
  const clearError = (): void => {
    error.value = null;
  };

  /**
   * Set custom error
   */
  const setError = (errorMsg: string): void => {
    error.value = errorMsg;
  };

  // Watch value changes for validation
  watch(value, () => {
    if (shouldValidate('change')) {
      if (debounceMs > 0) {
        debouncedValidate();
      } else {
        validate();
      }
    }
  });

  // Validate on mount if requested
  onMounted(() => {
    if (validateOnMount) {
      nextTick(() => {
        validate();
      });
    }
  });

  // Register with form context if available
  onMounted(() => {
    if (formContext && name) {
      const fieldReturn: FormFieldReturn<T> = {
        value,
        state,
        error: computed(() => error.value),
        isValid,
        isInvalid,
        isTouched,
        isDirty,
        isValidating,
        touch,
        reset,
        validate,
        clearError,
        setError,
        ariaAttrs,
      };
      
      formContext.register(name, fieldReturn);
    }
  });

  // Unregister from form context on unmount
  onUnmounted(() => {
    if (formContext && name) {
      formContext.unregister(name);
    }

    if (validationTimeoutId.value) {
      clearTimeout(validationTimeoutId.value);
    }
  });

  return {
    value,
    state,
    error: computed(() => error.value),
    isValid,
    isInvalid,
    isTouched,
    isDirty,
    isValidating,
    touch,
    reset,
    validate,
    clearError,
    setError,
    ariaAttrs,
  };
}

/**
 * Composable for managing entire forms with multiple fields
 * 
 * @returns Form management utilities
 * 
 * @example
 * ```typescript
 * const { provide, validate, reset, isValid, errors } = useForm();
 * 
 * // Provide form context to child components
 * provide();
 * 
 * // Validate all fields
 * const isFormValid = await validate();
 * ```
 */
export function useForm() {
  const fields = ref<Record<string, FormFieldReturn>>({}); 

  const formContext: FormContext = {
    register: (name: string, field: FormFieldReturn) => {
      fields.value[name] = field;
    },
    
    unregister: (name: string) => {
      delete fields.value[name];
    },
    
    validate: async (): Promise<boolean> => {
      const validationPromises = Object.values(fields.value).map(field => field.validate());
      const results = await Promise.all(validationPromises);
      return results.every(result => result);
    },
    
    reset: () => {
      Object.values(fields.value).forEach(field => field.reset());
    },
    
    isValid: computed(() => {
      return Object.values(fields.value).every(field => field.isValid.value);
    }),
    
    errors: computed(() => {
      const formErrors: Record<string, string> = {};
      
      Object.entries(fields.value).forEach(([name, field]) => {
        if (field.error.value) {
          formErrors[name] = field.error.value;
        }
      });
      
      return formErrors;
    }),
  };

  const provideContext = () => {
    provide(FormContextKey, formContext);
  };

  return {
    ...formContext,
    provide: provideContext,
  };
}