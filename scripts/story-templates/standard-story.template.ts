import type { Meta, StoryObj } from "@storybook/vue3-vite";
import {{COMPONENT_NAME}} from "./{{COMPONENT_NAME}}.vue";

// Standard story template for {{COMPONENT_NAME}}
// Generated with improved Storybook standards

const meta = {
  title: "{{CATEGORY}}/{{COMPONENT_NAME}}",
  component: {{COMPONENT_NAME}},
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "{{COMPONENT_DESCRIPTION}}"
      }
    },
    layout: "centered",
  },
  argTypes: {
    // Auto-generated argTypes will be inserted here
    {{ARG_TYPES}}
  },
} satisfies Meta<typeof {{COMPONENT_NAME}}>;

export default meta;
type Story = StoryObj<typeof {{COMPONENT_NAME}}>;

// Default args for consistency
const defaultArgs = {
  {{DEFAULT_ARGS}}
};

// Standard render function
const standardRender = (args: any) => ({
  components: { {{COMPONENT_NAME}} },
  setup() {
    return { args };
  },
  template: `<{{COMPONENT_NAME}} v-bind="args">{{SLOT_CONTENT}}</{{COMPONENT_NAME}}>`,
});

// 1. Playground Story - Interactive controls for all props
export const Playground: Story = {
  render: standardRender,
  args: defaultArgs,
  parameters: {
    docs: {
      description: {
        story: "Interactive playground to test all component props and configurations."
      }
    }
  }
};

// 2. Basic Story - Simple usage example
export const Basic: Story = {
  render: standardRender,
  args: {
    ...defaultArgs,
    {{BASIC_ARGS}}
  },
  parameters: {
    docs: {
      description: {
        story: "Basic usage example with default configuration."
      }
    }
  }
};

// 3. All Variants - Show all visual variants
export const AllVariants: Story = {
  render: () => ({
    components: { {{COMPONENT_NAME}} },
    template: `
      <div class="flex flex-wrap gap-4">
        {{VARIANT_EXAMPLES}}
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "All available visual variants of the component."
      }
    }
  }
};

// 4. Sizes - All size options
export const Sizes: Story = {
  render: () => ({
    components: { {{COMPONENT_NAME}} },
    template: `
      <div class="flex items-center gap-4">
        {{SIZE_EXAMPLES}}
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "Available size options for the component."
      }
    }
  }
};

// 5. States - Interactive states
export const States: Story = {
  render: () => ({
    components: { {{COMPONENT_NAME}} },
    template: `
      <div class="flex flex-col gap-4">
        {{STATE_EXAMPLES}}
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "Different interactive states (disabled, loading, error, etc.)."
      }
    }
  }
};

// 6. Accessibility - A11y demonstrations
export const Accessibility: Story = {
  render: () => ({
    components: { {{COMPONENT_NAME}} },
    template: `
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Keyboard Navigation</h3>
        <p class="text-sm text-gray-600">{{A11Y_INSTRUCTIONS}}</p>
        {{A11Y_EXAMPLES}}
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "Accessibility features and keyboard navigation examples."
      }
    }
  }
};

// 7. Interactive - Real-world examples
export const Interactive: Story = {
  render: () => ({
    components: { {{COMPONENT_NAME}} },
    setup() {
      // Interactive logic here
      return {};
    },
    template: `
      <div class="space-y-6">
        {{INTERACTIVE_EXAMPLES}}
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "Real-world usage examples with interactive behavior."
      }
    }
  }
};