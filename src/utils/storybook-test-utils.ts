/**
 * Storybook Testing Utilities
 * 
 * Common utilities for testing and interactions in Storybook stories
 * Used by improved stories for consistent testing patterns
 */

// import { expect } from '@storybook/test';
// import { within, userEvent } from '@storybook/test';

// Common interaction patterns for stories
export const InteractionPatterns = {
  // Click interaction with verification
  async clickAndVerify(canvas: any, selector: string, expectedResult?: string) {
    const element = within(canvas).getByRole('button', { name: selector });
    await userEvent.click(element);
    
    if (expectedResult) {
      await expect(element).toHaveTextContent(expectedResult);
    }
  },

  // Form interaction patterns
  async fillForm(canvas: any, formData: Record<string, string>) {
    for (const [field, value] of Object.entries(formData)) {
      const input = within(canvas).getByLabelText(field);
      await userEvent.clear(input);
      await userEvent.type(input, value);
    }
  },

  // Keyboard navigation testing
  async testKeyboardNavigation(canvas: any, selector: string, keys: string[]) {
    const element = within(canvas).getByRole('button', { name: selector });
    element.focus();
    
    for (const key of keys) {
      await userEvent.keyboard(key);
    }
  },

  // Accessibility verification
  async verifyAccessibility(canvas: any, selector: string) {
    const element = within(canvas).getByRole('button', { name: selector });
    
    // Check ARIA attributes
    expect(element).toHaveAttribute('aria-label');
    expect(element).toHaveAttribute('tabindex');
    
    // Check focus behavior
    element.focus();
    expect(element).toHaveFocus();
  }
};

// Accessibility testing helpers
export const AccessibilityHelpers = {
  // Check for proper ARIA roles
  verifyRole(element: HTMLElement, expectedRole: string) {
    expect(element).toHaveAttribute('role', expectedRole);
  },

  // Check for proper labels
  verifyLabeling(element: HTMLElement, expectedLabel: string) {
    expect(element).toHaveAccessibleName(expectedLabel);
  },

  // Check keyboard navigation
  async testKeyboardInteraction(element: HTMLElement, keys: string[]) {
    element.focus();
    
    for (const key of keys) {
      await userEvent.keyboard(key);
    }
    
    return element;
  },

  // Check focus management
  verifyFocusManagement(element: HTMLElement) {
    expect(element).toHaveFocus();
    expect(element).toBeVisible();
  }
};

// Standard story templates for testing
export const StoryTemplates = {
  // Basic interaction test
  createInteractionTest(componentName: string, actions: any[]) {
    return {
      play: async ({ canvasElement }: any) => {
        const canvas = within(canvasElement);
        
        for (const action of actions) {
          await action(canvas);
        }
      }
    };
  },

  // Accessibility test template
  createAccessibilityTest(componentName: string, checks: any[]) {
    return {
      play: async ({ canvasElement }: any) => {
        const canvas = within(canvasElement);
        
        for (const check of checks) {
          await check(canvas);
        }
      }
    };
  },

  // Form validation test
  createFormTest(componentName: string, formData: Record<string, string>) {
    return {
      play: async ({ canvasElement }: any) => {
        const canvas = within(canvasElement);
        await InteractionPatterns.fillForm(canvas, formData);
        
        // Verify form submission
        const submitButton = canvas.getByRole('button', { name: /submit/i });
        await userEvent.click(submitButton);
      }
    };
  }
};

// Mock data generators for stories
export const TestDataGenerators = {
  // Generate user data
  generateUsers(count: number = 5) {
    const names = ['Alice Johnson', 'Bob Smith', 'Carol White', 'David Brown', 'Eva Davis'];
    const roles = ['Designer', 'Developer', 'Manager', 'Analyst', 'Coordinator'];
    const avatars = ['👩‍🎨', '👨‍💻', '👩‍💼', '👨‍💼', '👩‍🔬'];
    
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      name: names[i % names.length],
      email: `${names[i % names.length].toLowerCase().replace(' ', '.')}@example.com`,
      role: roles[i % roles.length],
      avatar: avatars[i % avatars.length]
    }));
  },

  // Generate table data
  generateTableData(rows: number = 10) {
    const statuses = ['active', 'inactive', 'pending'];
    const departments = ['Engineering', 'Design', 'Marketing', 'Sales', 'Support'];
    
    return Array.from({ length: rows }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      status: statuses[i % statuses.length],
      department: departments[i % departments.length],
      joinDate: new Date(2020 + (i % 4), i % 12, (i % 28) + 1).toISOString().split('T')[0]
    }));
  },

  // Generate form options
  generateSelectOptions(prefix: string = 'Option', count: number = 5) {
    return Array.from({ length: count }, (_, i) => ({
      label: `${prefix} ${i + 1}`,
      value: `${prefix.toLowerCase()}-${i + 1}`
    }));
  },

  // Generate metrics data
  generateMetrics() {
    return [
      { label: 'Total Users', value: '1,234', change: '+12%', trend: 'up' },
      { label: 'Revenue', value: '$45,678', change: '+8%', trend: 'up' },
      { label: 'Conversion Rate', value: '3.2%', change: '-2%', trend: 'down' },
      { label: 'Active Sessions', value: '567', change: '+15%', trend: 'up' }
    ];
  }
};

// Theme testing utilities
export const ThemeTestUtils = {
  // Test component in different themes
  testInThemes(component: any, themes: string[] = ['etus', 'brius']) {
    return themes.map(theme => ({
      name: `${component.name} - ${theme} theme`,
      parameters: {
        theme: theme
      }
    }));
  },

  // Test responsive behavior
  testResponsive(component: any, viewports: string[] = ['mobile', 'tablet', 'desktop']) {
    return viewports.map(viewport => ({
      name: `${component.name} - ${viewport}`,
      parameters: {
        viewport: {
          defaultViewport: viewport
        }
      }
    }));
  }
};

// Performance testing helpers
export const PerformanceHelpers = {
  // Measure render time
  async measureRenderTime(renderFunction: () => Promise<void>) {
    const start = performance.now();
    await renderFunction();
    const end = performance.now();
    return end - start;
  },

  // Check for memory leaks
  checkMemoryUsage() {
    if ('memory' in performance) {
      return {
        used: (performance as any).memory.usedJSHeapSize,
        total: (performance as any).memory.totalJSHeapSize,
        limit: (performance as any).memory.jsHeapSizeLimit
      };
    }
    return null;
  }
};

// Export all utilities
export default {
  InteractionPatterns,
  AccessibilityHelpers,
  StoryTemplates,
  TestDataGenerators,
  ThemeTestUtils,
  PerformanceHelpers
};