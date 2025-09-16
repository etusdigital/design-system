import type { Meta, StoryObj } from "@storybook/vue3";
import Filter from "./Filter.vue";

export default {
  component: Filter,
  argTypes: {
    modelValue: {
      type: { name: "other", value: "any" },
      description: "Controls the selected filter values by category.",
    },
    expanded: {
      type: { name: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
    },
    options: {
      type: { name: "other", value: "any" },
      description:
        'Array of filter categories with their available options. It\'s objects must contains "options" property.',
    },
    labelValue: {
      type: { name: "string" },
      description: "Will be the filter label.",
    },
    labelKey: {
      type: { name: "string" },
      table: {
        defaultValue: { summary: "label" },
      },
    },
    valueKey: {
      type: { name: "string" },
      table: {
        defaultValue: { summary: "value" },
      },
    },
    icon: {
      type: { name: "string" },
      table: {
        defaultValue: { summary: "filter_list" },
      },
      description: "This will be filter icon.",
    },
    searchLabel: {
      type: { name: "string" },
      table: {
        defaultValue: { summary: "Search" },
      },
      description:
        "This slot will be placeholder for the input when searchable is true.",
    },
    searchable: {
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
    absolute: {
      type: { name: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
      description: "Makes the content dropdown have an absolute position.",
    },
    getObject: {
      type: { name: "function" },
      description:
        "Will be the function that returns the object with the selected options.",
    },
    onApply: {
      type: { name: "function" },
      table: {
        defaultValue: { summary: "()=>{void}" },
      },
      description:
        "Will be the function that execute when apply button is pressed.",
    },
    status: {
      description:
        "This slot will be status when a option is selected. Param: selected (number of selected options).",
    },
    "status-label": {
      description:
        "This slot will be status text when a option is selected. Param: selected (number of selected options).",
    },
    "clear-label": {
      description: "Will be clear button text.",
    },
    "apply-label": {
      description: "Will be apply button text.",
    },
    default: {
      description: "This slot will be displayed on the multi-select area.",
    },
    actions: {
      description:
        "This slot will be the select actions, displayed in the bottom of the dropdown",
    },
  },
} satisfies Meta<typeof Filter>;

type Story = StoryObj<typeof Filter>;

const defaultArgs = {
  modelValue: {},
  options: [
    {
      label: "Option 1",
      value: "option1",
      options: [
        { label: "Option 1", value: 0 },
        { label: "Option 2", value: 1 },
        { label: "Option 3", value: 2 },
        { label: "Option 4", value: 3 },
        { label: "Option 5", value: 4 },
      ],
    },
    {
      label: "Option 2",
      value: "option2",
      options: [
        { label: "Option 1", value: 0 },
        { label: "Option 2", value: 1 },
        { label: "Option 3", value: 2 },
        { label: "Option 4", value: 3 },
        { label: "Option 5", value: 4 },
      ],
    },
  ],
  labelValue: "label",
  expanded: false,
  labelKey: "label",
  valueKey: "value",
  searchLabel: "Search",
  icon: "filter_list",
  searchable: false,
  disabled: false,
  absolute: false,
  getObject: false,
  onApply: () => {},
};

const defaultRender = (args: any) => ({
  components: { Filter },
  setup() {
    return { args };
  },
  template: `
    <Filter 
        v-model="args.modelValue" 
        v-model:expanded="args.expanded" 
        :options="args.options"
        :label-value="args.labelValue"
        :label-key="args.labelKey" 
        :value-key="args.valueKey"
        :required="args.required" 
        :icon="args.icon" 
        :searchable="args.searchable" 
        :disabled="args.disabled"
        :absolute="args.absolute"
        :search-label="args.searchLabel"
        :get-object="args.getObject"
        @apply="args.onApply" 
    />
  `,
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

export const Disabled: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true,
  },
};

export const Searchable: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    searchable: true,
  },
};