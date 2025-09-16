import type { Meta, StoryObj } from "@storybook/vue3";
import DatePicker from "./DatePicker.vue";
import { calculateDate } from "../../utils";

export default {
  component: DatePicker,
  argTypes: {
    modelValue: {
      type: { name: "other", value: "Date | Date[] | Date[][] | undefined" },
      table: {
        defaultValue: { summary: "undefined" },
      },
      description: "Will be the current date or period.",
    },
    labelValue: {
      type: { name: "string" },
      description: "Will be the date comparator label.",
    },
    lang: {
      type: { name: "string" },
      table: {
        defaultValue: { summary: "en-US" },
      },
      description: "Will be the date input language.",
    },
    type: {
      type: { name: "string" },
      control: { type: "select" },
      options: ["date", "period", "compare"],
      table: {
        defaultValue: { summary: "date" },
      },
      description: "Selection mode: single date, date range, or comparison mode.",
    },
    allowChangeType: {
      type: { name: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
      description: "Will determine if the user can change the type of the date input.",
    },
    minDate: {
      type: { name: "other", value: "Date | undefined" },
      table: {
        defaultValue: { summary: "undefined" },
      },
      description: "Will be the oldest date the user can select.",
    },
    maxDate: {
      type: { name: "other", value: "Date | undefined" },
      table: {
        defaultValue: { summary: "undefined" },
      },
      description: "Will be the newest date the user can select.",
    },
    options: {
      type: { name: "array", value: { name: "object", value: {} } },
      description: "Will the predetermined options.",
    },
    absolute: {
      type: { name: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
      description: "Makes the content dropdown have an absolute position.",
    },
    disabled: {
      type: { name: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
    },
    required: {
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
    expanded: {
      type: { name: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
    },
    alignRight: {
      type: { name: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
      description:
        "Determine if the dropdown will be right-aligned. To work absolute needs to be true.",
    },
    separator: {
      type: { name: "string" },
      description:
        "If two period are selected, this property will separate them.",
    },
    default: {
      description: "This slot will be displayed on the select area.",
    },
    "compare-label": {
      description: "This slot will be the checkbox text.",
    },
    "clear-label": {
      description: "This slot will be the clear button text.",
    },
    "apply-label": {
      description: "This slot will be the apply button text.",
    },
    actions: {
      description: "Slot to replace the actions area."
    },
  },
} satisfies Meta<typeof DatePicker>;

type Story = StoryObj<typeof DatePicker>;

const defaultArgs = {
  modelValue: undefined,
  labelValue: "label",
  lang: "en-US",
  type: "date" as const,
  allowChangeType: false,
  minDate: undefined,
  maxDate: undefined,
  disabled: false,
  required: false,
  isError: false,
  errorMessage: "",
  absolute: false,
  expanded: false,
  alignRight: false,
  separator: "",
  options: [
    {
      selected: true,
      value: "today",
      label: "Today",
      calculate: () => {
        return calculateDate("today");
      },
    },
    {
      value: "yesterday",
      label: "Yesterday",
      calculate: () => {
        return calculateDate("yesterday");
      },
    },
    {
      value: "last7",
      label: "Last 7 days",
      calculate: () => {
        return calculateDate("last7");
      },
    },
    {
      value: "last15",
      label: "Last 15 days",
      calculate: () => {
        return calculateDate("last15");
      },
    },
    {
      value: "last30",
      label: "Last 30 days",
      calculate: () => {
        return calculateDate("last30");
      },
    },
    {
      value: "lastMonth",
      label: "Last month",
      calculate: () => {
        return calculateDate("lastMonth");
      },
    },
  ],
};

const defaultHtml = `
    <div class="flex w-full" :class="{ 'justify-end': args.alignRight }">
      <DatePicker
          v-model="args.modelValue"
          v-model:expanded="args.expanded"
          v-model:type="args.type"
          :label-value="args.labelValue"
          :lang="args.lang"
          :allow-change-type="args.allowChangeType"
          :min-date="args.minDate"
          :max-date="args.maxDate"
          :options="args.options"
          :disabled="args.disabled"
          :required="args.required"
          :is-error="args.isError"
          :error-message="args.errorMessage"
          :absolute="args.absolute"
          :separator="args.separator"
          :align-right="args.alignRight"
      >
          Date Filter
          <template #clear-label>
              Clear
          </template>
          <template #apply-label>
              Apply
          </template>
          <template #compare-label>
              Compare two periods
          </template>
      </DatePicker>
    </div>
  `;

const defaultRender = (args: any) => ({
  components: { DatePicker },
  setup() {
    return { args };
  },
  template: defaultHtml,
});

export const Primary: Story = {
  render: defaultRender,
  args: defaultArgs,
};

export const Lang: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    lang: "pt-BR",
    separator: "e",
  },
};

export const AllowChangeType: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    allowChangeType: true,
    modelValue: [],
    type: "period",
  },
};

export const Period: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    modelValue: [],
    type: "period",
  },
};

export const Compare: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    modelValue: [],
    type: "compare",
  },
};

export const MinDate: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    minDate: new Date(),
  },
};

export const MaxDate: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    maxDate: new Date(),
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

export const AlignRight: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    alignRight: true,
  },
};

export const Separator: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    modelValue: [[], []],
    type: "compare",
    separator: "separator",
  },
};
