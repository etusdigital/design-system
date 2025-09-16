import type { Meta, StoryObj } from "@storybook/vue3";
import Select from "./Select.vue";

export default {
  component: Select,
  argTypes: {
    modelValue: {
      type: { name: "other", value: "any" },
      description:
        'Will be an option from the "options" array at the selected index.',
    },
    labelValue: {
      type: { name: "string" },
      description: "Will be the select label.",
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
    valueKey: {
      type: { name: "string" },
      table: {
        defaultValue: { summary: "value" },
      },
    },
    getObject: {
      type: { name: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
      description:
        "If true, the selected value will be an object instead of value-key value.",
    },
    multiple: {
      type: { name: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
      description:
        "If true, the selected value will be an array of the selected values.",
    },
    secondary: {
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
    searchable: {
      type: { name: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
    },
    clearable: {
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
    default: {
      description: "This slot will be displayed on the select area.",
    },
    status: {
      description:
        "This slot will be status when a option is selected. Param: option (selected option).",
    },
    "clear-label": {
      description: "Will be clear button text.",
    },
    option: {
      description:
        "This slot will be displayed as an option. Params: option and index.",
    },
  },
} satisfies Meta<typeof Select>;

type Story = StoryObj<typeof Select>;

const defaultArgs = {
  modelValue: null,
  options: ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"],
  icon: "",
  expanded: false,
  labelKey: "label",
  valueKey: "value",
  labelValue: "label",
  searchable: false,
  clearable: false,
  multiple: false,
  getObject: false,
  disabled: false,
  required: false,
  secondary: false,
  isError: false,
  errorMessage: "",
  infoMessage: "",
  absolute: false,
};

const defaultHtml = `
    <Select 
        v-model="args.modelValue" 
        v-model:expanded="args.expanded" 
        :label-value="args.labelValue"
        :options="args.options" 
        :icon="args.icon" 
        :absolute="args.absolute" 
        :label-key="args.labelKey" 
        :value-key="args.valueKey"
        :required="args.required" 
        :searchable="args.searchable" 
        :clearable="args.clearable"
        :disabled="args.disabled"
        :multiple="args.multiple"
        :secondary="args.secondary"
        :is-error="args.isError"
        :error-message="args.errorMessage"
        :info-message="args.infoMessage"
        :get-object="args.getObject"
    >
        Placeholder
    </Select>
  `;

const defaultRender = (args: any) => ({
  components: { Select },
  setup() {
    return { args };
  },
  template: defaultHtml,
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

export const Multiple: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    multiple: true,
    options: [
      { label: "Option 1", value: 0 },
      { label: "Option 2", value: 1 },
      { label: "Option 3", value: 2 },
      { label: "Option 4", value: 3 },
    ],
  },
};

export const Secondary: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    secondary: true,
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

export const CustomOption: Story = {
  render: (args: any) => ({
    setup() {
      return { args };
    },
    template: `
      ${defaultHtml.replace(
        "Placeholder",
        `Placeholder
          <template #option="{ option, index }">
              <div class="flex items-center gap-xs">
                  <Icon name="account_circle" />
                  {{ option }}
              </div>
          </template>
      </Select>`
      )}
    `,
  }),
  args: defaultArgs,
};
