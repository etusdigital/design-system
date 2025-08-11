import type { App, Plugin } from 'vue';
import BCheckbox from './BCheckbox.vue';

// Export all types from the dedicated types file
export * from './BCheckbox.types';

// Re-export for backward compatibility
export type { 
    ValidationState,
    CheckState,
    CheckboxAccessibilityProps,
    BCheckboxProps,
    BCheckboxEvents,
    BCheckboxSlots,
    BCheckboxExpose,
    CheckboxGroupConfig,
    CheckboxAccessibilityTest
} from './BCheckbox.types';

// Plugin installation
const BCheckboxPlugin: Plugin = {
    install(app: App) {
        app.component('BCheckbox', BCheckbox);
    },
};

// Default export as plugin
export default BCheckboxPlugin;

// Named exports
export {
    BCheckbox,
    BCheckboxPlugin,
};

// Type-only exports for better tree-shaking
export type { default as BCheckboxVue } from './BCheckbox.vue';

/**
 * Accessibility testing utilities for BCheckbox component
 * These utilities help verify WCAG 2.1 AA compliance
 */
export const checkboxAccessibilityUtils = {
    /**
     * Validate checkbox accessibility attributes
     */
    validateAccessibility(element: HTMLElement): {
        hasProperRole: boolean;
        hasAriaChecked: boolean;
        hasFocusIndicator: boolean;
        hasLabel: boolean;
        hasProperTabindex: boolean;
        errors: string[];
    } {
        const errors: string[] = [];
        const role = element.getAttribute('role');
        const ariaChecked = element.getAttribute('aria-checked');
        const tabindex = element.getAttribute('tabindex');
        const ariaLabel = element.getAttribute('aria-label');
        const ariaLabelledby = element.getAttribute('aria-labelledby');
        
        // Check required attributes
        const hasProperRole = role === 'checkbox';
        if (!hasProperRole) {
            errors.push('Missing or incorrect role attribute');
        }
        
        const hasAriaChecked = ariaChecked !== null;
        if (!hasAriaChecked) {
            errors.push('Missing aria-checked attribute');
        }
        
        const hasProperTabindex = tabindex === '0' || tabindex === '-1';
        if (!hasProperTabindex) {
            errors.push('Missing or incorrect tabindex attribute');
        }
        
        const hasLabel = !!(ariaLabel || ariaLabelledby || element.textContent?.trim());
        if (!hasLabel) {
            errors.push('Missing accessible label');
        }
        
        // Check focus indicator (basic check)
        const styles = getComputedStyle(element);
        const hasFocusIndicator = !!(styles.outline || styles.boxShadow || styles.border);
        
        return {
            hasProperRole,
            hasAriaChecked,
            hasFocusIndicator,
            hasLabel,
            hasProperTabindex,
            errors
        };
    },
    
    /**
     * Generate accessibility report for checkbox
     */
    generateReport(element: HTMLElement): string {
        const validation = this.validateAccessibility(element);
        const score = Object.values(validation)
            .filter(v => typeof v === 'boolean')
            .reduce((acc, curr) => acc + (curr ? 1 : 0), 0);
        
        const total = Object.keys(validation)
            .filter(k => k !== 'errors')
            .length;
        
        const percentage = Math.round((score / total) * 100);
        
        return `
BCheckbox Accessibility Report
==============================
Score: ${score}/${total} (${percentage}%)

${validation.errors.length > 0 
    ? `Issues found:\n${validation.errors.map(e => `• ${e}`).join('\n')}` 
    : '✅ All accessibility checks passed!'}
        `;
    }
};

/**
 * Keyboard navigation constants for BCheckbox
 */
export const CHECKBOX_KEYS = {
    TOGGLE: ['Space', 'Enter'],
    NAVIGATION: ['Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'],
} as const;

/**
 * WCAG 2.1 compliance levels for reference
 */
export const WCAG_LEVELS = {
    A: 'Level A - Minimum level of conformance',
    AA: 'Level AA - Standard level of conformance (recommended)',
    AAA: 'Level AAA - Enhanced level of conformance',
} as const;

/**
 * Screen reader testing phrases for BCheckbox
 */
export const SCREEN_READER_TESTS = {
    CHECKED: ['checked', 'selected', 'on'],
    UNCHECKED: ['unchecked', 'not selected', 'off'],
    INDETERMINATE: ['mixed', 'partially checked', 'indeterminate'],
    REQUIRED: ['required', 'mandatory'],
    INVALID: ['invalid', 'error'],
    DISABLED: ['disabled', 'unavailable'],
} as const;

/**
 * Component metadata for documentation and testing
 */
export const COMPONENT_META = {
    name: 'BCheckbox',
    version: '2.0.0',
    wcagLevel: 'AA',
    features: [
        'WCAG 2.1 AA Compliance',
        'Keyboard Navigation',
        'Screen Reader Support',
        'Focus Management',
        'Error State Handling',
        'Indeterminate State',
        'Required Field Support',
        'Custom ARIA Properties',
        'Validation States',
        'Touch Target Optimization',
        'High Contrast Support',
        'Reduced Motion Support',
        'Dark Theme Support',
    ],
    keyboardShortcuts: {
        'Space': 'Toggle checkbox state',
        'Enter': 'Toggle checkbox state (alternative)',
        'Tab': 'Move focus to next/previous element',
    },
    ariaAttributes: [
        'role',
        'aria-checked',
        'aria-disabled',
        'aria-invalid',
        'aria-required',
        'aria-describedby',
        'aria-label',
        'aria-labelledby',
    ],
    testingGuidelines: [
        'Verify keyboard navigation with Tab and Space keys',
        'Test with screen readers (NVDA, JAWS, VoiceOver)',
        'Validate focus indicators are visible',
        'Check color contrast ratios meet WCAG standards',
        'Test with browser zoom up to 200%',
        'Verify touch targets are at least 44x44px',
        'Test with high contrast mode enabled',
        'Validate reduced motion preferences are respected',
    ],
} as const;

/**
 * Development utilities for BCheckbox component
 */
if (process.env.NODE_ENV === 'development') {
    // Development-only utilities
    (window as any).__BCHECKBOX_DEV_UTILS__ = {
        accessibilityUtils: checkboxAccessibilityUtils,
        meta: COMPONENT_META,
        keys: CHECKBOX_KEYS,
        wcag: WCAG_LEVELS,
        screenReaderTests: SCREEN_READER_TESTS,
    };
    
    console.info('BCheckbox development utilities available at window.__BCHECKBOX_DEV_UTILS__');
}