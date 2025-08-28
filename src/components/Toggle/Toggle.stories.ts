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
    rhs: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description: "Puts the button on the right-hand side.",
    },
    disabled: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
    },
    default: {
      description: "This slot will be displayed next to the switch button.",
    },
  },
} satisfies Meta<typeof Toggle>;

type Story = StoryObj<typeof Toggle>;

const defaultArgs = {
  modelValue: false,
  rhs: false,
  disabled: false,
};

const defaultRender = (args: any) => ({
  components: { Toggle },
  setup() {
    return { args };
  },
  template: `
    <Toggle
      v-model="args.modelValue"
      :id="args.id"
      :name="args.name"
      :disabled="args.disabled"
      :rhs="args.rhs"
    >
      Toggle Label
    </Toggle>
  `,
});

export const Primary: Story = {
  render: defaultRender,
  args: defaultArgs,
};

export const RHS: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    rhs: true,
  },
};

export const Disabled: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true,
  },
};
