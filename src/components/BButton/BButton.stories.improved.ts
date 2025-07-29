import type { Meta, StoryObj } from "@storybook/vue3-vite";
import BButton from "./BButton.vue";

const meta = {
  title: "Buttons & Actions/BButton",
  component: BButton,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `BButton is a versatile button component that supports multiple variants, colors, sizes, and loading states. It follows accessibility best practices and supports keyboard navigation.

### Features
- **Multiple variants**: default, secondary, plain, reverse
- **Color system**: primary, info, success, warning, danger, neutral  
- **Size options**: small, medium, large
- **Loading states**: boolean loading or progress-based
- **Accessibility**: WCAG compliant with proper ARIA attributes`,
      },
    },
  },
  argTypes: {
    // Props
    type: {
      control: "select",
      options: ["button", "reset", "submit"],
      description: "The HTML button type attribute",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "button" },
        category: "Props",
      },
    },
    color: {
      control: "select", 
      options: ["primary", "info", "success", "warning", "danger", "neutral"],
      description: "The semantic color of the button",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "primary" },
        category: "Props",
      },
    },
    variant: {
      control: "select",
      options: ["default", "secondary", "plain", "reverse"],
      description: "The visual style variant",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "default" },
        category: "Props",
      },
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "The size of the button",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "medium" },
        category: "Props",
      },
    },
    disabled: {
      control: "boolean",
      description: "Disables the button and prevents interaction",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "Props",
      },
    },
    loading: {
      control: "boolean", 
      description: "Shows a loading spinner and disables interaction",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "Loading State",
      },
    },
    progress: {
      control: { type: "range", min: 0, max: 1, step: 0.01 },
      description: "Progress value (0-1) for progress-based loading",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "0" },
        category: "Loading State",
      },
    },
    // Slots
    default: {
      description: "Button content - text, icons, or other elements",
      table: {
        type: { summary: "VNode | string" },
        category: "Slots",
      },
    },
  },
} satisfies Meta<typeof BButton>;

export default meta;
type Story = StoryObj<typeof BButton>;

// Base story for Controls tab
export const Playground: Story = {
  args: {
    type: "button",
    color: "primary", 
    variant: "default",
    size: "medium",
    disabled: false,
    loading: false,
    progress: 0,
  },
  render: (args) => ({
    components: { BButton },
    setup() {
      return { args };
    },
    template: `
      <BButton
        :type="args.type"
        :color="args.color"
        :variant="args.variant" 
        :size="args.size"
        :disabled="args.disabled"
        :loading="args.loading"
        :progress="args.progress"
        @click="() => {}"
      >
        {{ args.default || 'Button Text' }}
      </BButton>
    `,
  }),
};

// Color variants showcase
export const Colors: Story = {
  parameters: {
    docs: {
      description: {
        story: "Available color variants for different semantic meanings.",
      },
    },
  },
  render: () => ({
    components: { BButton },
    template: `
      <div class="flex gap-3 flex-wrap items-center">
        <BButton color="primary">Primary</BButton>
        <BButton color="info">Info</BButton>
        <BButton color="success">Success</BButton>
        <BButton color="warning">Warning</BButton>
        <BButton color="danger">Danger</BButton>
        <BButton color="neutral">Neutral</BButton>
      </div>
    `,
  }),
};

// Size variants
export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: "Three size options to fit different UI contexts.",
      },
    },
  },
  render: () => ({
    components: { BButton },
    template: `
      <div class="flex gap-3 items-end">
        <BButton size="small">Small</BButton>
        <BButton size="medium">Medium</BButton>
        <BButton size="large">Large</BButton>
      </div>
    `,
  }),
};

// Style variants
export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story: "Different visual styles for various design needs.",
      },
    },
  },
  render: () => ({
    components: { BButton },
    template: `
      <div class="flex gap-3 flex-wrap">
        <div class="flex flex-col gap-2">
          <h4 class="text-sm font-medium text-gray-700">Default</h4>
          <div class="flex gap-2">
            <BButton variant="default" color="primary">Primary</BButton>
            <BButton variant="default" color="success">Success</BButton>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <h4 class="text-sm font-medium text-gray-700">Secondary</h4>
          <div class="flex gap-2">
            <BButton variant="secondary" color="primary">Primary</BButton>
            <BButton variant="secondary" color="success">Success</BButton>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <h4 class="text-sm font-medium text-gray-700">Plain</h4>
          <div class="flex gap-2">
            <BButton variant="plain" color="primary">Primary</BButton>
            <BButton variant="plain" color="success">Success</BButton>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <h4 class="text-sm font-medium text-gray-700">Reverse</h4>
          <div class="flex gap-2 p-4 bg-gray-800 rounded">
            <BButton variant="reverse" color="primary">Primary</BButton>
            <BButton variant="reverse" color="success">Success</BButton>
          </div>
        </div>
      </div>
    `,
  }),
};

// Loading states
export const LoadingStates: Story = {
  parameters: {
    docs: {
      description: {
        story: "Loading states with spinner or progress indication.",
      },
    },
  },
  render: () => ({
    components: { BButton },
    template: `
      <div class="flex gap-3 items-center">
        <BButton loading>Loading...</BButton>
        <BButton :progress="0.65">Uploading...</BButton>
        <BButton disabled>Disabled</BButton>
      </div>
    `,
  }),
};

// Accessibility showcase
export const Accessibility: Story = {
  parameters: {
    docs: {
      description: {
        story: "Demonstrates accessibility features and keyboard navigation.",
      },
    },
  },
  render: () => ({
    components: { BButton },
    template: `
      <div class="flex flex-col gap-4">
        <div class="flex gap-3">
          <BButton>Focusable</BButton>
          <BButton disabled>Disabled (not focusable)</BButton>
          <BButton loading>Loading (disabled)</BButton>
        </div>
        <p class="text-sm text-gray-600">
          Try navigating with Tab/Shift+Tab and activating with Space/Enter
        </p>
      </div>
    `,
  }),
};