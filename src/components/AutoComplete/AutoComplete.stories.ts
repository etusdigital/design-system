import type { Meta, StoryObj } from "@storybook/vue3";
import AutoComplete from "./AutoComplete.vue";

export default {
  component: AutoComplete,
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
    required: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description: "Makes the select container required.",
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
} satisfies Meta<typeof AutoComplete>;

type Story = StoryObj<typeof AutoComplete>;

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

const defaultRender = (args: any) => ({
  setup() {
    return { args };
  },
  template:  `
  <AutoComplete 
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
  />`,
});

export const Primary: Story = {
  render: defaultRender,
  args: defaultArgs,
};

export const Absolute: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    absolute: true,
  },
};

export const Required: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    required: true,
  },
};

export const Disabled: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true,
  },
};

export const IsError: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    isError: true,
    errorMessage: "Error message",
  },
};

export const InfoMessage: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    infoMessage: "Info message",
  },
};

export const CustomItem: Story = {
  render: (args: any) => ({
    setup() {
      return { args };
    },
    template: `
    <AutoComplete
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
        <Icon name="account_circle" size="1rem" class="shrink-0 h-[1em] flex items-center" /> {{ item }}
      </template>
    </AutoComplete>`,
  }),
  args: defaultArgs,
};