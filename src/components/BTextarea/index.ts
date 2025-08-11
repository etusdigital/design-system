import type { App, Plugin } from 'vue';
import BTextarea from './BTextarea.vue';

// Re-export all types for easy importing
export type {
  BTextareaAccessibilityProps,
  BTextareaProps,
  BTextareaEmits,
  BTextareaState,
  BTextareaAriaAttributes,
  BTextareaKeyboardConfig,
  BTextareaValidationConfig,
  BTextareaAutoResizeConfig,
  BTextareaCountConfig,
  BTextareaValidationResult,
  BTextareaAnnouncementTemplates,
  BTextareaAccessibilityHelpers,
  BTextareaResize,
  BTextareaSize,
  BTextareaTextAlign,
  BTextareaValidationState,
  BTextareaLoadingState,
  BTextareaAutoResize,
  BTextareaWrap,
} from './BTextarea.types';

// Re-export default configurations
export {
  DEFAULT_TEXTAREA_KEYBOARD_CONFIG,
  DEFAULT_TEXTAREA_ACCESSIBILITY_CONFIG,
  DEFAULT_TEXTAREA_VALIDATION_CONFIG,
  DEFAULT_TEXTAREA_AUTO_RESIZE_CONFIG,
  DEFAULT_TEXTAREA_COUNT_CONFIG,
  DEFAULT_TEXTAREA_ANNOUNCEMENTS,
} from './BTextarea.types';

// Type aliases for backward compatibility and easier imports
export type BTextareaType = BTextareaResize;
export type BTextareaSizeType = BTextareaSize;
export type BTextareaAlignType = BTextareaTextAlign;
export type BTextareaValidationType = BTextareaValidationState;
export type BTextareaWrapType = BTextareaWrap;

// Vue plugin for global registration
export default {
  install(Vue: App) {
    Vue.component('BTextarea', BTextarea);
  },
} as Plugin;

// Named export of the component
export {
  BTextarea,
};

/**
 * BTextarea component factory with pre-configured settings
 */
export function createBTextarea(defaultProps: Partial<BTextareaProps> = {}) {
  return {
    install(Vue: App) {
      Vue.component('BTextarea', {
        ...BTextarea,
        props: {
          ...BTextarea.props,
          ...Object.keys(defaultProps).reduce((acc, key) => {
            acc[key] = {
              ...BTextarea.props?.[key],
              default: defaultProps[key as keyof BTextareaProps],
            };
            return acc;
          }, {} as any),
        },
      });
    },
  } as Plugin;
}

/**
 * Accessibility-first BTextarea variant with enhanced defaults
 */
export const AccessibleBTextarea = createBTextarea({
  announceValidation: true,
  announceCharacterCount: true,
  announceLineCount: true,
  announceResize: true,
  keyboardNavigation: true,
  enhancedFocus: true,
  minTouchTarget: true,
  showFocusIndicator: true,
  liveRegionPoliteness: 'polite',
});

/**
 * Auto-resize BTextarea variant optimized for dynamic content
 */
export const AutoResizeBTextarea = createBTextarea({
  autoResize: true,
  resize: 'none',
  autoResizeConfig: {
    enabled: true,
    mode: 'content',
    minHeight: 60,
    maxHeight: 400,
    animationDuration: 150,
    onContentChange: true,
    onWindowResize: true,
  },
  announceResize: true,
});

/**
 * Validation-enhanced BTextarea variant with comprehensive validation
 */
export const ValidatedBTextarea = createBTextarea({
  announceValidation: true,
  validationConfig: {
    enabled: true,
    mode: 'onChange',
    debounceTime: 300,
    showFeedback: true,
    announceChanges: true,
  },
  showCount: true,
  announceCharacterCount: true,
});

/**
 * Code editor BTextarea variant with development-focused features
 */
export const CodeBTextarea = createBTextarea({
  spellcheck: false,
  wrap: 'off',
  resize: 'both',
  keyboardConfig: {
    enabled: true,
    tabIndentation: true,
    tabSize: 2,
    submitKeys: ['Ctrl+Enter', 'Cmd+Enter'],
    clearKeys: ['Ctrl+K'],
  },
  textAlign: 'start',
  showCount: true,
  countConfig: {
    showCharacterCount: true,
    showLineCount: true,
    position: 'bottom-right',
  },
});

/**
 * Utility functions for BTextarea
 */
export const BTextareaUtils = {
  /**
   * Calculate text statistics
   */
  getTextStats(text: string) {
    return {
      characters: text.length,
      lines: text.split('\n').length,
      words: text.trim() ? text.trim().split(/\s+/).length : 0,
      paragraphs: text.split(/\n\s*\n/).filter(p => p.trim()).length,
    };
  },

  /**
   * Validate text against common patterns
   */
  validateText(text: string, options: {
    minLength?: number;
    maxLength?: number;
    minLines?: number;
    maxLines?: number;
    wordLimit?: number;
    required?: boolean;
  }) {
    const errors: string[] = [];
    const stats = this.getTextStats(text);

    if (options.required && !text.trim()) {
      errors.push('This field is required');
    }

    if (options.minLength && text.length < options.minLength) {
      errors.push(`Minimum ${options.minLength} characters required`);
    }

    if (options.maxLength && text.length > options.maxLength) {
      errors.push(`Maximum ${options.maxLength} characters allowed`);
    }

    if (options.minLines && stats.lines < options.minLines) {
      errors.push(`Minimum ${options.minLines} lines required`);
    }

    if (options.maxLines && stats.lines > options.maxLines) {
      errors.push(`Maximum ${options.maxLines} lines allowed`);
    }

    if (options.wordLimit && stats.words > options.wordLimit) {
      errors.push(`Maximum ${options.wordLimit} words allowed`);
    }

    return {
      isValid: errors.length === 0,
      errors,
      stats,
    };
  },

  /**
   * Format text for display
   */
  formatText(text: string, options: {
    trimWhitespace?: boolean;
    normalizeLineBreaks?: boolean;
    removeEmptyLines?: boolean;
  } = {}) {
    let formatted = text;

    if (options.normalizeLineBreaks) {
      formatted = formatted.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    }

    if (options.removeEmptyLines) {
      formatted = formatted.replace(/\n\s*\n/g, '\n');
    }

    if (options.trimWhitespace) {
      formatted = formatted.trim();
    }

    return formatted;
  },

  /**
   * Insert text at cursor position
   */
  insertTextAtCursor(textarea: HTMLTextAreaElement, text: string) {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentValue = textarea.value;
    
    const newValue = 
      currentValue.substring(0, start) + 
      text + 
      currentValue.substring(end);
    
    textarea.value = newValue;
    textarea.selectionStart = textarea.selectionEnd = start + text.length;
    
    // Trigger input event
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
    
    return newValue;
  },

  /**
   * Get selected text
   */
  getSelectedText(textarea: HTMLTextAreaElement) {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    return textarea.value.substring(start, end);
  },

  /**
   * Replace selected text
   */
  replaceSelectedText(textarea: HTMLTextAreaElement, newText: string) {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentValue = textarea.value;
    
    const newValue = 
      currentValue.substring(0, start) + 
      newText + 
      currentValue.substring(end);
    
    textarea.value = newValue;
    textarea.selectionStart = textarea.selectionEnd = start + newText.length;
    
    // Trigger input event
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
    
    return newValue;
  },
};

/**
 * Composable for BTextarea functionality
 */
export function useBTextarea() {
  return {
    utils: BTextareaUtils,
    variants: {
      Accessible: AccessibleBTextarea,
      AutoResize: AutoResizeBTextarea,
      Validated: ValidatedBTextarea,
      Code: CodeBTextarea,
    },
    createCustom: createBTextarea,
  };
}