import type { Meta, StoryObj } from "@storybook/vue3";
import SmartSelect from "./SmartSelect.vue";

export default {
  component: SmartSelect,
  argTypes: {
    modelValue: {
      type: { summary: "any" },
      description:
        'Will be an item from the "items" array at the selected index.',
    },
    labelValue: {
      type: { summary: "text" },
      description: "Will be the select label.",
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
    valueKey: {
      type: { summary: "text" },
      table: {
        defaultValue: { summary: "value" },
      },
    },
    getObject: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description:
        'If true, the selected value will be an object instead of value-key value.',
    },
    isMultiple: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description:
        'If true, the selected value will be an array of the selected values.',
    },
    disabled: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
    },
    searchable: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
    },
    clearable: {
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
    default: {
      description: "This slot will be displayed on the select area.",
    },
    status: {
      description:
        "This slot will be status when a item is selected. Param: item (selected item).",
    },
    "clear-label": {
      description: "Will be clear button text.",
    },
    item: {
      description:
        "This slot will be displayed as an option. Params: item and index.",
    },
  },
} satisfies Meta<typeof SmartSelect>;

type Story = StoryObj<typeof SmartSelect>;

const defaultArgs = {
  modelValue: null,
  items: ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"],
  icon: "",
  expanded: false,
  labelKey: "label",
  valueKey: "value",
  labelValue: "label",
  searchable: false,
  clearable: false,
  isMultiple: false,
  getObject: false,
  disabled: false,
  required: false,
  isError: false,
  errorMessage: "",
  infoMessage: "",
  absolute: false,
}

const defaultRender = (args: any) => ({
  components: { SmartSelect },
  setup() {
    return { args };
  },
  template: `
    <SmartSelect 
        v-model="args.modelValue" 
        v-model:expanded="args.expanded" 
        :label-value="args.labelValue"
        :items="args.items" 
        :icon="args.icon" 
        :absolute="args.absolute" 
        :label-key="args.labelKey" 
        :value-key="args.valueKey"
        :required="args.required" 
        :searchable="args.searchable" 
        :clearable="args.clearable"
        :disabled="args.disabled"
        :is-multiple="args.isMultiple"
        :is-error="args.isError"
        :error-message="args.errorMessage"
        :info-message="args.infoMessage"
        :get-object="args.getObject"
    >
        Placeholder
    </SmartSelect>
  `,
})

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

export const IsMultiple: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    isMultiple: true,
    items: [
      { label: "Option 1", value: 0 },
      { label: "Option 2", value: 1 },
      { label: "Option 3", value: 2 },
      { label: "Option 4", value: 3 },
    ],
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

export const Clearable: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    clearable: true,
  },
};

export const CustomItem: Story = {
  render: (args: any) => ({
    setup() {
      return { args };
    },
    template: `
      <SmartSelect
          v-model="args.modelValue" 
          v-model:expanded="args.expanded" 
          :label-value="args.labelValue"
          :items="args.items" 
          :icon="args.icon" 
          :absolute="args.absolute" 
          :label-key="args.labelKey" 
          :value-key="args.valueKey"
          :required="args.required" 
          :searchable="args.searchable" 
          :clearable="args.clearable"
          :disabled="args.disabled"
          :is-multiple="args.isMultiple"
          :is-error="args.isError"
          :error-message="args.errorMessage"
          :info-message="args.infoMessage"
          :get-object="args.getObject"
      >
          Placeholder
          <template #item="{ item, index }">
              <div class="flex items-center gap-2">
                  <Icon name="account_circle" />
                  {{ item }}
              </div>
          </template>
      </SmartSelect>
    `,
  }),
  args: defaultArgs,
};
