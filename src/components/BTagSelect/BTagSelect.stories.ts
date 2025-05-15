import type { Meta, StoryObj } from "@storybook/vue3";

import BTagSelect from "./BTagSelect.vue";

export default {
  component: BTagSelect,
  tags: ["autodocs"],
  argTypes: {
    modelValue: {
      type: { summary: "any" },
      description: "Will be the array containing the value of the tags.",
    },
    labelValue: {
      type: { summary: "text" },
      description: "Will be the input label.",
    },
    items: {
      type: { summary: "array" },
      description:
        'Array of values to be used as options. Can also be an array of objects, in which case you should use the prop "labelKey" to specify which key to use as a label.',
    },
    icon: {
      type: { summary: "text" },
    },
    expanded: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
    },
    labelKey: {
      type: { summary: "text" },
      table: {
        defaultValue: { summary: "label" },
      },
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
    errorMessage: {
      type: { summary: "text" },
      description: "Will be the error message.",
    },
    infoMessage: {
      type: { summary: "text" },
      description: "Will be the info message.",
    },
    buttonText: {
      type: { summary: "string" },
      table: {
        defaultValue: { summary: "Add" },
      },
      description: "This property will be the add button text.",
    },
    "search-text": {
      description: "This slot will be placeholder for the search input.",
    },
    "no-items-found": {
      description:
        "This slot will be displayed when the search results in no items.",
    },
    "no-items": {
      description: "This slot will be displayed if items is an empty array.",
    },
    item: {
      description:
        "This slot will be displayed as an option. Params: item and index.",
    },
  },
} satisfies Meta<typeof BTagSelect>;

type Story = StoryObj<typeof BTagSelect>;

const defaultArgs = {
  modelValue: undefined,
  expanded: false,
  items: [],
  labelValue: "label",
  labelKey: "label",
  buttonText: "Add",
  required: false,
  errorMessage: "",
  infoMessage: "",
  icon: "",
  isError: false,
  disabled: false,
  absolute: false,
};

const defaultRender = (args: any) => ({
  components: { BTagSelect },
  setup() {
    return { args };
  },
  template: `
    <BTagSelect
        v-model="args.modelValue"
        :v-model:expanded="args.expanded"
        :items="args.items"
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
        <template #search-text>
            Search
        </template>
        <template #no-items-found>
            No result found.
        </template>
        <template #no-items>
            No tags created yet.
        </template>
    </BTagSelect>
    `,
});

export const Primary: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
  },
};

export const Error: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    isError: true,
    errorMessage: "Error message",
  },
};

export const ObjectArray: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    items: [
      { label: "Option 1", something: 0 },
      { label: "Option 2", something: 1 },
      { label: "Option 3", something: 2 },
      { label: "Option 4", something: 3 },
      { label: "Option 5", something: 4 },
    ],
  },
};
