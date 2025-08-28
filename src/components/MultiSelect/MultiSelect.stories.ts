import type { Meta, StoryObj } from "@storybook/vue3";
import MultiSelect from "./MultiSelect.vue";

export default {
  component: MultiSelect,
  argTypes: {
    modelValue: {
      type: { summary: "any" },
      description:
        'Will be an item from the "items" array at the selected index.',
    },
    labelValue: {
      type: { summary: "text" },
      description: "Will be the multiselect label",
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
    selectedKey: {
      type: { summary: "text" },
      table: {
        defaultValue: { summary: "selected" },
      },
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
    absolute: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: true },
      },
      description: "Makes the content dropdown have an absolute position.",
    },
    'search-label': {
      type: { summary: "text" },
      table: {
        defaultValue: { summary: "Search" },
      },
      description:
        "This slot will be placeholder for the input when searchable is true.",
    },
    status: {
      description:
        "This slot will be status when a item is selected. Param: selected (number of selected items).",
    },
    "status-label": {
      description:
        "This slot will be status text when a item is selected. Param: selected (number of selected items).",
    },
    default: {
      description: "This slot will be displayed on the multi-select area.",
    },
    item: {
      description:
        "This slot will be displayed as an option. Params: item and index.",
    },
    actions: {
      description:
        "This slot will be the select actions, displayed in the bottom of the dropdown",
    },
  },
} satisfies Meta<typeof MultiSelect>;

type Story = StoryObj<typeof MultiSelect>;

const defaultArgs = {
  modelValue: [
    { label: "Option 1", something: 0, selected: false },
    { label: "Option 2", something: 1, selected: true },
    { label: "Option 3", something: 2, selected: false },
    { label: "Option 4", something: 3, selected: false },
    { label: "Option 5", something: 4, selected: false },
  ],
  labelValue: "label",
  icon: "",
  expanded: false,
  labelKey: "label",
  selectedKey: "selected",
  searchable: false,
  disabled: false,
  required: false,
  isError: false,
  errorMessage: "",
  infoMessage: "",
  absolute: false,
};

const defaultRender = (args: any) => ({
  components: { MultiSelect },
  setup() {
    return { args };
  },
  template: `
    <MultiSelect 
        v-model="args.modelValue" 
        v-model:expanded="args.expanded" 
        :label-value="args.labelValue"
        :icon="args.icon"
        :absolute="args.absolute" 
        :label-key="args.labelKey" 
        :selected-key="args.selectedKey" 
        :required="args.required" 
        :searchable="args.searchable" 
        :disabled="args.disabled"
        :is-error="args.isError"
        :error-message="args.errorMessage"
        :info-message="args.infoMessage"
    >
        Placeholder
    </MultiSelect>
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

export const Required: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    required: true,
  },
};

export const Searchable: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    searchable: true,
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
      <MultiSelect 
        v-model="args.modelValue" 
        v-model:expanded="args.expanded" 
        :label-value="args.labelValue"
        :icon="args.icon"
        :absolute="args.absolute" 
        :label-key="args.labelKey" 
        :selected-key="args.selectedKey" 
        :required="args.required" 
        :searchable="args.searchable" 
        :disabled="args.disabled"
        :is-error="args.isError"
        :error-message="args.errorMessage"
        :info-message="args.infoMessage"
      >
        Placeholder
        <template #item="{ item, index }">
            <div class="flex items-center gap-2">
                <Icon name="account_circle" />
                {{ item.label }}
            </div>
        </template>
      </MultiSelect>
    `,
  }),
  args: {
    ...defaultArgs,
    labelValue: "Custom item",
  },
};
