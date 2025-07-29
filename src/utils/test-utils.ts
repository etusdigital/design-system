// import { expect } from '@storybook/test';
// import { userEvent, within } from '@storybook/test';

// Common test utilities for Storybook interaction tests
export const testUtils = {
  // Test keyboard navigation
  async testKeyboardNavigation(canvasElement: HTMLElement, selector: string) {
    const canvas = within(canvasElement);
    const element = canvas.getByRole('button') || canvas.getByTestId(selector);
    
    // Test Tab navigation
    await userEvent.tab();
    await expect(element).toHaveFocus();
    
    // Test Enter activation
    await userEvent.keyboard('{Enter}');
    
    // Test Space activation
    await userEvent.keyboard('{Space}');
  },

  // Test form interaction
  async testFormField(canvasElement: HTMLElement, options: {
    inputSelector?: string;
    testValue: string;
    shouldSubmit?: boolean;
  }) {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox') || canvas.getByTestId(options.inputSelector || 'input');
    
    // Clear and type new value
    await userEvent.clear(input);
    await userEvent.type(input, options.testValue);
    
    await expect(input).toHaveValue(options.testValue);
    
    if (options.shouldSubmit) {
      await userEvent.keyboard('{Enter}');
    }
  },

  // Test dropdown interaction
  async testDropdown(canvasElement: HTMLElement, options: {
    triggerSelector: string;
    optionText: string;
  }) {
    const canvas = within(canvasElement);
    const trigger = canvas.getByTestId(options.triggerSelector);
    
    // Open dropdown
    await userEvent.click(trigger);
    
    // Select option
    const option = canvas.getByText(options.optionText);
    await userEvent.click(option);
    
    // Verify selection
    await expect(trigger).toHaveTextContent(options.optionText);
  },

  // Test modal/dialog interaction
  async testModal(canvasElement: HTMLElement, options: {
    openTrigger: string;
    closeTrigger?: string;
    expectTitle?: string;
  }) {
    const canvas = within(canvasElement);
    const openButton = canvas.getByTestId(options.openTrigger);
    
    // Open modal
    await userEvent.click(openButton);
    
    // Check if modal is visible
    if (options.expectTitle) {
      const title = canvas.getByText(options.expectTitle);
      await expect(title).toBeInTheDocument();
    }
    
    // Test escape key closure
    await userEvent.keyboard('{Escape}');
    
    // Test close button if provided
    if (options.closeTrigger) {
      const closeButton = canvas.getByTestId(options.closeTrigger);
      await userEvent.click(closeButton);
    }
  },

  // Test accessibility attributes
  async testAccessibility(canvasElement: HTMLElement, selector: string, options: {
    expectedRole?: string;
    expectedLabel?: string;
    expectedDescription?: string;
  }) {
    const canvas = within(canvasElement);
    const element = canvas.getByTestId(selector);
    
    if (options.expectedRole) {
      await expect(element).toHaveAttribute('role', options.expectedRole);
    }
    
    if (options.expectedLabel) {
      await expect(element).toHaveAccessibleName(options.expectedLabel);
    }
    
    if (options.expectedDescription) {
      await expect(element).toHaveAccessibleDescription(options.expectedDescription);
    }
  },

  // Test loading states
  async testLoadingState(canvasElement: HTMLElement, triggerSelector: string) {
    const canvas = within(canvasElement);
    const trigger = canvas.getByTestId(triggerSelector);
    
    // Trigger loading
    await userEvent.click(trigger);
    
    // Check for loading indicator
    const loadingSpinner = canvas.queryByTestId('loading-spinner');
    if (loadingSpinner) {
      await expect(loadingSpinner).toBeInTheDocument();
    }
    
    // Check that trigger is disabled during loading
    await expect(trigger).toBeDisabled();
  },

  // Test validation states
  async testValidation(canvasElement: HTMLElement, inputSelector: string, options: {
    invalidValue: string;
    validValue: string;
    expectedError?: string;
  }) {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId(inputSelector);
    
    // Test invalid value
    await userEvent.clear(input);
    await userEvent.type(input, options.invalidValue);
    await userEvent.tab(); // Trigger blur
    
    if (options.expectedError) {
      const errorMessage = canvas.getByText(options.expectedError);
      await expect(errorMessage).toBeInTheDocument();
    }
    
    // Test valid value
    await userEvent.clear(input);
    await userEvent.type(input, options.validValue);
    await userEvent.tab();
    
    // Error should be gone
    if (options.expectedError) {
      const errorMessage = canvas.queryByText(options.expectedError);
      expect(errorMessage).not.toBeInTheDocument();
    }
  }
};

// Example interaction test for BButton
export const buttonInteractionTests = {
  async testButtonClick(canvasElement: HTMLElement) {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    // Test click
    await userEvent.click(button);
    
    // Test keyboard activation
    await button.focus();
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard('{Space}');
  },

  async testDisabledButton(canvasElement: HTMLElement) {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    // Should not respond to clicks when disabled
    await expect(button).toBeDisabled();
    await expect(button).toHaveAttribute('aria-disabled', 'true');
  },

  async testLoadingButton(canvasElement: HTMLElement) {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    const spinner = canvas.queryByTestId('loading-spinner');
    
    // Button should be disabled and show spinner
    await expect(button).toBeDisabled();
    if (spinner) {
      await expect(spinner).toBeInTheDocument();
    }
  }
};