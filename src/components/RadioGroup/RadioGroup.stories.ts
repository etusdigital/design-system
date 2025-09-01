import type { Meta, StoryObj } from "@storybook/vue3";
import Group from "./Group.vue";

export default {
  component: Group,
  argTypes: {
    modelValue: {
      type: { summary: "any" },
      table: {
        defaultValue: { summary: null },
      },
    },
    vertical: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
    },
    disabled: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
    },
  },
} satisfies Meta<typeof Group>;

type Story = StoryObj<typeof Group>;


const defaultRender = (args: any) => ({
  components: { Group },
  setup() {
    return { args };
  },
  template:
    '<Group v-model="args.modelValue" :vertical="args.vertical" :disabled="args.disabled" :items="args.items" :label-key="args.labelKey" :value-key="args.valueKey" :get-object="args.getObject" />'
})

export const Radio: Story = {
  render: defaultRender,
  args: {
    modelValue: 1,
    vertical: false,
    disabled: false,
    items: [
      { label: "First", value: 1 },
      { label: "Second", value: 2 },
      { label: "Third", value: 3 },
    ],
    labelKey: "label",
    valueKey: "value",
    getObject: false,
  },
};

export const Vertical: Story = {
  render: defaultRender,
  args: {
    vertical: true,
  },
};

export const Disabled: Story = {
  render: defaultRender,
  args: {
    disabled: true,
  },
};
