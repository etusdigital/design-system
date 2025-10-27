import type { Meta, StoryObj } from "@storybook/vue3";
import Switch from "./Switch.vue";

export default {
  component: Switch,
  argTypes: {
    modelValue: {
      type: { name: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
    },
    rhs: {
      type: { name: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
      description: "Puts the button on the right-hand side.",
    },
    disabled: {
      type: { name: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
    },
    default: {
      description: "This slot will be displayed next to the switch button.",
    },
  },
} satisfies Meta<typeof Switch>;

type Story = StoryObj<typeof Switch>;

const defaultArgs = {
  modelValue: false,
  rhs: false,
  disabled: false,
};

const defaultRender = (args: any) => ({
  components: { Switch },
  setup() {
    return { args };
  },
  template: `
    <Switch
      v-model="args.modelValue"
      :id="args.id"
      :name="args.name"
      :disabled="args.disabled"
      :rhs="args.rhs"
    >
      Switch Label
    </Switch>
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
