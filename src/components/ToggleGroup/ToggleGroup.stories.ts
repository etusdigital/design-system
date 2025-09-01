import type { Meta, StoryObj } from "@storybook/vue3";
import ToggleGroup from "./ToggleGroup.vue";

export default {
  component: ToggleGroup,
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
} satisfies Meta<typeof ToggleGroup>;

type Story = StoryObj<typeof ToggleGroup>;


const defaultRender = (args: any) => ({
  components: { ToggleGroup },
  setup() {
    return { args };
  },
  template:
    '<ToggleGroup v-model="args.modelValue" :vertical="args.vertical" :disabled="args.disabled" :items="args.items" :label-key="args.labelKey" :value-key="args.valueKey" :get-object="args.getObject" />'
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

export const Toggle: Story = {
  render: (args: any) => ({
    components: { ToggleGroup },
    setup() {
      return { args };
    },
    template:
      '<ToggleGroup v-model="args.modelValue" :vertical="args.vertical" :disabled="args.disabled">' +
      '\n<Toggle :group-value="1">First</Toggle>' +
      '\n<Toggle :group-value="2">Second</Toggle>' +
      '\n<Toggle :group-value="3">Third</Toggle>' +
      "\n</ToggleGroup>",
  }),
  args: {
    modelValue: 1,
    vertical: false,
    disabled: false,
  },
};
