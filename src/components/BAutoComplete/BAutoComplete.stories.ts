import type { Meta, StoryObj } from "@storybook/vue3-vite";
import BAutoComplete from "./BAutoComplete.vue";

export default {
  component: BAutoComplete,
  tags: ["autodocs"],
  argTypes: {
    modelValue: {
      control: { type: "text" },
      description: 'Will be the input current value.',
    },
    expanded: {
      control: { type: "boolean" },
      description: 'Will be the input current value.',
    },
    labelValue: {
      control: { type: "text" },
      description: "Will be the select label.",
    },
    items: {
      control: { type: "object" },
      description:
        'Array of values to be used as options.',
    },
    placeholder: {
      control: { type: "text" },
    },
    disabled: {
      control: { type: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
    },
    isError: {
      control: { type: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
      description: "Activate error mode.",
    },
    absolute: {
      control: { type: "boolean" },
      table: {
        defaultValue: { summary: "true" },
      },
    },
    errorMessage: {
      control: { type: "text" },
      description: "Will be the error message.",
    },
    infoMessage: {
      control: { type: "text" },
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

export const Disabled: Story = {
  render: (args: any) => ({
    setup() {
      return { args };
    },
    template: defaultHtml,
  }),
  args: {
    ...defaultArgs,
    disabled: true,
    modelValue: "Option 2",
  },
};

export const WithError: Story = {
  render: (args: any) => ({
    setup() {
      return { args };
    },
    template: defaultHtml,
  }),
  args: {
    ...defaultArgs,
    isError: true,
    errorMessage: "Please select a valid option",
  },
};

export const WithValue: Story = {
  render: (args: any) => ({
    setup() {
      return { args };
    },
    template: defaultHtml,
  }),
  args: {
    ...defaultArgs,
    modelValue: "Option 3",
  },
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

export const DifferentWidths: Story = {
  render: (args: any) => ({
    setup() {
      return { args };
    },
    template: `
    <div class="flex flex-col gap-4">
      <div>
        <p class="text-sm text-gray-600 mb-2">Min Width: 240px (default)</p>
        <BAutoComplete
          v-model="args.modelValue" 
          :label-value="args.labelValue"
          :placeholder="args.placeholder"
          :items="args.items"
          :absolute="false"
        />
      </div>
      <div>
        <p class="text-sm text-gray-600 mb-2">Min Width: 320px</p>
        <BAutoComplete
          v-model="args.modelValue2" 
          :label-value="args.labelValue"
          :placeholder="args.placeholder"
          :items="args.items"
          :absolute="false"
          min-width="320px"
        />
      </div>
      <div>
        <p class="text-sm text-gray-600 mb-2">Min Width: 400px</p>
        <BAutoComplete
          v-model="args.modelValue3" 
          :label-value="args.labelValue"
          :placeholder="args.placeholder"
          :items="args.items"
          :absolute="false"
          min-width="400px"
        />
      </div>
    </div>`,
  }),
  args: {
    ...defaultArgs,
    modelValue: "",
  },
};