import type { Meta, StoryObj } from "@storybook/vue3";
import BFilter from "./BFilter.vue";

const meta = {
  component: BFilter,
  tags: ["autodocs"],
  argTypes: {
    modelValue: {
      type: { summary: "any" },
      description:
        'Will be an item from the "items" array at the selected index.',
    },
    labelValue: {
      type: { summary: "text" },
      description: "Will be the filter label.",
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
    selectedKey: {
      type: { summary: "text" },
      table: {
        defaultValue: { summary: "selected" },
      },
    },
    icon: {
      type: { summary: "text" },
      table: {
        defaultValue: { summary: "filter_list" },
      },
      description:
        "This will be filter icon.",
    },
    searchText: {
      type: { summary: "text" },
      table: {
        defaultValue: { summary: "Search" },
      },
      description:
        "This slot will be placeholder for the input when searchable is true.",
    },
    searchable: {
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
    absolute: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description: "Makes the content dropdown have an absolute position.",
    },
    apply: {
      type: { summary: "function" },
      table: {
        defaultValue: { summary: "()=>{void}" },
      },
      description:
        "Will be the function that execute when apply button is pressed.",
    },
    status: {
      description:
        "This slot will be status when a item is selected. Param: selected (number of selected items).",
    },
    "status-text": {
      description:
        "This slot will be status text when a item is selected. Param: selected (number of selected items).",
    },
    "clear-text": {
      description: "Will be clear button text.",
    },
    "apply-text": {
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
} satisfies Meta<typeof BFilter>;

export default meta;

type Story = StoryObj<typeof BFilter>;

const defaultArgs = {
  modelValue: {
    option1: [
      { label: "Option 1", something: 0, selected: false },
      { label: "Option 2", something: 1, selected: true },
      { label: "Option 3", something: 2, selected: false },
      { label: "Option 4", something: 3, selected: false },
      { label: "Option 5", something: 4, selected: false },
    ],
    option2: [
      { label: "Option 1", something: 0, selected: false },
      { label: "Option 2", something: 1, selected: true },
      { label: "Option 3", something: 2, selected: false },
      { label: "Option 4", something: 3, selected: false },
      { label: "Option 5", something: 4, selected: false },
    ],
  },
  labelValue: "label",
  expanded: false,
  labelKey: "label",
  selectedKey: "selected",
  searchText: "Search",
  icon: "filter_list",
  searchable: false,
  disabled: false,
  absolute: false,
  apply: () => {},
};

export const Primary: Story = {
  render: (args: any) => ({
    components: { BFilter },
    setup() {
      return { args };
    },
    template: `
        <BFilter 
            v-model="args.modelValue" 
            v-model:expanded="args.expanded" 
            :labelValue="args.labelValue"
            :label-key="args.labelKey" 
            :selected-key="args.selectedKey" 
            :required="args.required" 
            :icon="args.icon" 
            :searchable="args.searchable" 
            :disabled="args.disabled"
            :absolute="args.absolute"
            :search-text="args.searchText"
            @apply="args.apply" 
        />
        <span class="block mt-[1em]">Selected: {{ JSON.stringify(args.modelValue, null, 2) }}</span>
        `,
  }),
  args: defaultArgs,
};
