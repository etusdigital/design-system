import type { Meta, StoryObj } from "@storybook/vue3";
import BToggle from "./BToggle.vue";

export default {
  component: BToggle,
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

type Story = StoryObj<typeof BToggle>;

const defaultArgs = {
  modelValue: false,
  rhs: false,
  disabled: false,
};

const defaultRender = (args: any) => ({
  components: { BToggle },
  setup() {
    return { args };
  },
  template: `
    <BToggle
      v-model="args.modelValue"
      :id="args.id"
      :name="args.name"
      :disabled="args.disabled"
      :rhs="args.rhs"
    >
      Toggle Label
    </BToggle>
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
