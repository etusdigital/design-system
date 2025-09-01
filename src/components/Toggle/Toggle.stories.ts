import type { Meta, StoryObj } from "@storybook/vue3";
import Toggle from "./Toggle.vue";

export default {
  component: Toggle,
  argTypes: {
    modelValue: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
    },
    groupValue: {
      description: "Used by the Group component.",
      type: { summary: "any" },
      table: {
        defaultValue: { summary: "null" },
      },
    },
    disabled: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
    },
    isDiv: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
    },
    default: {
      description: "This slot will be content inside the toggle.",
    },
  },
} satisfies Meta<typeof Toggle>;

type Story = StoryObj<typeof Toggle>;

const defaultArgs = {
  modelValue: false,
  groupValue: null,
  disabled: false,
  isDiv: false,
};

const defaultRender = (args: any) => ({
  components: { Toggle },
  setup() {
    return { args };
  },
  template: `
    <Toggle 
      v-model="args.modelValue" 
      name="test" 
      :group-value="args.groupValue" 
      :disabled="args.disabled" 
      :is-div="args.isDiv"
    >
      Test toggle
    </Toggle>
  `,
});

export const Primary: Story = {
  render: defaultRender,
  args: defaultArgs,
};

export const Disabled: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true,
  },
};

export const ToggleDiv: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    isDiv: true,
  },
};
