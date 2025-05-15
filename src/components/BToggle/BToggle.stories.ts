import type { Meta, StoryObj } from "@storybook/vue3";
import BToggle from "./BToggle.vue";

const meta = {
  component: BToggle,
  tags: ["autodocs"],
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
} satisfies Meta<typeof BToggle>;
export default meta;

type Story = StoryObj<typeof BToggle>;

const defaultArgs = {
  modelValue: false,
  rhs: false,
  disabled: false,
};

export const Primary: Story = {
  render: (args: any) => ({
    components: { BToggle },
    setup() {
      return { args };
    },
    template:
      '<BToggle v-model="args.modelValue" :disabled="args.disabled" :rhs="args.rhs">Test label</BToggle>',
  }),
  args: defaultArgs,
};

export const RHS: Story = {
  render: (args: any) => ({
    components: { BToggle },
    setup() {
      return { args };
    },
    template:
      '<BToggle v-model="args.modelValue" :disabled="args.disabled" rhs>Right-hand side</BToggle>',
  }),
  args: {
    ...defaultArgs,
    rhs: true,
  },
};
