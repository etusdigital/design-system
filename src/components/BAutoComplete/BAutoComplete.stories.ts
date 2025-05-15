import type { Meta, StoryObj } from "@storybook/vue3";
import BAutoComplete from "./BAutoComplete.vue";

export default {
  component: BAutoComplete,
  tags: ["autodocs"],
  argTypes: {
    modelValue: {
      type: { summary: "string" },
			description: 'Will be the input current value.',
    },
    expanded: {
      type: { summary: "boolean" },
      description: 'Will be the input current value.',
    },
    labelValue: {
      type: { summary: "text" },
      description: "Will be the select label.",
    },
    items: {
      type: { summary: "array" },
      description:
        'Array of values to be used as options.',
    },
    placeholder: {
      type: { summary: "text" },
    },
    disabled: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
    },
    isError: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description: "Activate error mode.",
    },
    absolute: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: true },
      },
    },
    errorMessage: {
      type: { summary: "text" },
      description: "Will be the error message.",
    },
    infoMessage: {
      type: { summary: "text" },
      description: "Will be the info message.",
    },
    item: {
      description:
        "This slot will be displayed as an option. Params: item and index.",
    },
  },
} satisfies Meta<typeof BAutoComplete>;

type Story = StoryObj<typeof BAutoComplete>;

const defaultArgs = {
  modelValue: undefined,
  expanded: false,
  items: ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"],
  labelValue: "label",
  placeholder: "Placeholder",
  disabled: false,
  required: false,
  absolute: false,
  isError: false,
  errorMessage: "",
  infoMessage: "",
};

const defaultHtml = `
<BAutoComplete 
    v-model="args.modelValue" 
    v-model:expanded="args.expanded"
    :label-value="args.labelValue"
    :placeholder="args.placeholder"
    :items="args.items"
    :absolute="args.absolute" 
    :required="args.required" 
    :disabled="args.disabled"
    :is-error="args.isError"
    :error-message="args.errorMessage"
    :info-message="args.infoMessage"
/>`;

export const Primary: Story = {
  render: (args: any) => ({
    setup() {
      return { args };
    },
    template: defaultHtml,
  }),
  args: defaultArgs,
};

export const CustomItem: Story = {
  render: (args: any) => ({
    setup() {
      return { args };
    },
    template: `
    <BAutoComplete
    v-model="args.modelValue" 
    v-model:expanded="args.expanded"
    :label-value="args.labelValue"
    :placeholder="args.placeholder"
    :items="args.items"
    :absolute="args.absolute" 
    :required="args.required" 
    :disabled="args.disabled"
    :is-error="args.isError"
    :error-message="args.errorMessage"
    :info-message="args.infoMessage"
    >
      <template #item="{ item, index }">
        <BIcon name="account_circle" size="1rem" class="shrink-0 h-[1em] flex items-center" /> {{ item }}
      </template>
    </BAutoComplete>`,
  }),
  args: defaultArgs,
};