import type { Meta, StoryObj } from "@storybook/vue3";
import BSelect from "./BSelect.vue";

export default {
  component: BSelect,
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
    secondary: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
    },
    'search-label': {
      type: { summary: "text" },
      table: {
        defaultValue: { summary: "Search" },
      },
      description:
        "This slot will be placeholder for the input when searchable is true.",
    },
    default: {
      description: "This slot will be displayed on the select area.",
    },
    status: {
      description:
        "This slot will be status when a item is selected. Param: item (selected item).",
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
} satisfies Meta<typeof BSelect>;

type Story = StoryObj<typeof BSelect>;

const defaultArgs = {
  modelValue: null,
  items: ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"],
  icon: "",
  expanded: false,
  labelKey: "label",
  valueKey: "value",
  labelValue: "label",
  searchable: false,
  disabled: false,
  required: false,
  isError: false,
  errorMessage: "",
  infoMessage: "",
  absolute: false,
  secondary: false,
};

const defaultRender = (args: any) => ({
  components: { BSelect },
  setup() {
    return { args };
  },
  template: `
    <BSelect 
        v-model="args.modelValue" 
        v-model:expanded="args.expanded" 
        :label-value="args.labelValue"
        :items="args.items" 
        :value-key="args.valueKey"
        :icon="args.icon" 
        :absolute="args.absolute" 
        :label-key="args.labelKey" 
        :required="args.required" 
        :searchable="args.searchable" 
        :disabled="args.disabled"
        :is-error="args.isError"
        :error-message="args.errorMessage"
        :info-message="args.infoMessage"
        :secondary="args.secondary"
    >
        Placeholder
    </BSelect>
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

export const Secondary: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    secondary: true,
  },
};

export const CustomItem: Story = {
  render: (args: any) => ({
    setup() {
      return { args };
    },
    template: `
      <BSelect 
          v-model="args.modelValue" 
          v-model:expanded="args.expanded"
          :label-value="args.labelValue"
          :items="args.items" 
          :icon="args.icon" 
          :absolute="args.absolute" 
          :label-key="args.labelKey" 
          :required="args.required" 
          :searchable="args.searchable" 
          :disabled="args.disabled" 
          :secondary="args.secondary"
      >
          Placeholder
          <template #item="{ item, index }">
              <div class="flex items-center gap-xs">
                  <BIcon name="account_circle" />
                  {{ item }}
              </div>
          </template>
      </BSelect>`,
  }),
  args: defaultArgs,
};
