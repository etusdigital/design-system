import type { Meta, StoryObj } from "@storybook/vue3";
import RadioGroup from "./RadioGroup.vue";

export default {
  component: RadioGroup,
  argTypes: {
    modelValue: {
      type: { name: "other", value: "any" },
      table: {
        defaultValue: { summary: "undefined" },
      },
    },
    vertical: {
      type: { name: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      type: { name: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
} satisfies Meta<typeof RadioGroup>;

type Story = StoryObj<typeof RadioGroup>;

const defaultArgs = {
  modelValue: 1,
  vertical: false,
  disabled: false,
  options: [
    { label: "First", value: 1 },
    { label: "Second", value: 2 },
    { label: "Third", value: 3 },
  ],
  labelKey: "label",
  valueKey: "value",
  getObject: false,
};

const defaultHtml = `
  <RadioGroup
    v-model="args.modelValue"
    :vertical="args.vertical"
    :disabled="args.disabled"
    :options="args.options"
    :label-key="args.labelKey"
    :value-key="args.valueKey"
    :get-object="args.getObject"
  />
`;

const defaultRender = (args: any) => ({
  components: { RadioGroup },
  setup() {
    return { args };
  },
  template: defaultHtml,
});

export const Primary: Story = {
  render: defaultRender,
  args: defaultArgs,
};

export const Vertical: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    vertical: true,
  },
};

export const Disabled: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true,
  },
};