import type { Meta, StoryObj } from "@storybook/vue3";

import TagSelect from "./TagSelect.vue";

export default {
  component: TagSelect,
  argTypes: {
    modelValue: {
      type: { name: "other", value: "any" },
      description: "Will be the array containing the value of the tags.",
    },
    labelValue: {
      type: { name: "string" },
      description: "Will be the input label.",
    },
    options: {
      type: { name: "array", value: { name: "object", value: {} } },
      description:
        'Array of values to be used as options. Can also be an array of objects, in which case you should use the prop "labelKey" to specify which key to use as a label.',
    },
    icon: {
      type: { name: "string" },
    },
    expanded: {
      type: { name: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
    },
    labelKey: {
      type: { name: "string" },
      table: {
        defaultValue: { summary: "label" },
      },
    },
    disabled: {
      type: { name: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
    },
    isError: {
      type: { name: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
      description: "Activate error mode.",
    },
    errorMessage: {
      type: { name: "string" },
      description: "Will be the error message.",
    },
    infoMessage: {
      type: { name: "string" },
      description: "Will be the info message.",
    },
    buttonLabel: {
      type: { name: "string" },
      table: {
        defaultValue: { summary: "Add" },
      },
      description: "This property will be the add button text.",
    },
    "search-label": {
      description: "This slot will be placeholder for the search input.",
    },
    "no-options-found": {
      description:
        "This slot will be displayed when the search results in no options.",
    },
    "empty-state": {
      description: "This slot will be displayed if options is an empty array.",
    },
    option: {
      description:
        "This slot will be displayed as an option. Params: option and index.",
    },
  },
} satisfies Meta<typeof TagSelect>;

type Story = StoryObj<typeof TagSelect>;

const defaultArgs = {
  modelValue: undefined,
  expanded: false,
  options: [],
  labelValue: "label",
  labelKey: "label",
  buttonLabel: "Add",
  required: false,
  errorMessage: "",
  infoMessage: "",
  icon: "",
  isError: false,
  disabled: false,
  absolute: false,
};

const defaultRender = (args: any) => ({
  components: { TagSelect },
  setup() {
    return { args };
  },
  template: `
    <TagSelect
        v-model="args.modelValue"
        :v-model:expanded="args.expanded"
        :options="args.options"
        :labelValue="args.labelValue"
        :error-message="args.errorMessage"
        :info-message="args.infoMessage"
        :is-error="args.isError"
        :disabled="args.disabled"
        :icon="args.icon"
        :required="args.required"
        :label-key="args.labelKey"
        :absolute="args.absolute"
    >
        <template #search-label>
            Search
        </template>
        <template #no-options-found>
            No result found
        </template>
        <template #empty-state>
            No tags created yet
        </template>
    </TagSelect>
    `,
});

export const Primary: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
  },
};

export const Icon: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    icon: "search",
  },
};

export const Absolute: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    absolute: true,
  },
};

export const Disabled: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true,
  },
};

export const Required: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    required: true,
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