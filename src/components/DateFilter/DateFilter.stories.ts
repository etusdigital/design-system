import type { Meta, StoryObj } from "@storybook/vue3";
import DateFilter from "./DateFilter.vue";
import { calculateDate } from "../../utils";

export default {
  component: DateFilter,
  argTypes: {
    modelValue: {
      type: { summary: "Date[] | any[]" },
      table: {
        defaultValue: { summary: "[]" },
      },
      description: "Will be the current date or period.",
    },
    labelValue: {
      type: { summary: "text" },
      description: "Will be the date filter label",
    },
    lang: {
      type: { summary: "text" },
      table: {
        defaultValue: { summary: "en-US" },
      },
      description: "Will be the date input language.",
    },
    maxInit: {
      type: { summary: "Date" },
      table: {
        defaultValue: { summary: null },
      },
      description: "Will be the oldest date the user can select.",
    },
    maxEnd: {
      type: { summary: "Date" },
      table: {
        defaultValue: { summary: null },
      },
      description: "Will be the newest date the user can select.",
    },
    options: {
      type: { summary: "array" },
      description: "Will the predetermined options.",
    },
    absolute: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: true },
      },
      description: "Makes the content dropdown have an absolute position.",
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
    apply: {
      description:
        "This function will be called when the apply button is clicked.",
    },
    default: {
      description: "This slot will be displayed on the select area.",
    },
    "clear-label": {
      description: "This slot will be the clear button text.",
    },
    "apply-label": {
      description: "This slot will be the apply button text.",
    },
    actions: {
      description: "Slot to replace the actions area.",
    },
  },
} satisfies Meta<typeof DateFilter>;

type Story = StoryObj<typeof DateFilter>;

const defaultArgs = {
  modelValue: [],
  labelValue: "label",
  lang: "en-US",
  maxInit: undefined,
  maxEnd: undefined,
  disabled: false,
  required: false,
  isError: false,
  errorMessage: "",
  absolute: false,
  options: [
    {
      label: "Today",
      value: "today",
      selected: true,
      calculate: () => {
        return calculateDate("today");
      },
    },
    {
      label: "Yesterday",
      value: "yesterday",
      calculate: () => {
        return calculateDate("yesterday");
      },
    },
    {
      label: "Last 7 days",
      value: "last7",
      calculate: () => {
        return calculateDate("last7");
      },
    },
    {
      label: "Last 15 days",
      value: "last15",
      calculate: () => {
        return calculateDate("last15");
      },
    },
    {
      label: "Last 30 days",
      value: "last30",
      calculate: () => {
        return calculateDate("last30");
      },
    },
    {
      label: "Last month",
      value: "lastMonth",
      calculate: () => {
        return calculateDate("lastMonth");
      },
    },
  ],
};

const defaultRender = (args: any) => ({
  components: { DateFilter },
  setup() {
    return { args };
  },
  template: `
    <DateFilter
        v-model="args.modelValue"
        :labelValue="args.labelValue"
        :lang="args.lang"
        :max-init="args.maxInit"
        :max-end="args.maxEnd"
        :options="args.options"
        :absolute="args.absolute"
        :disabled="args.disabled"
        :required="args.required"
        :is-error="args.isError"
        :error-message="args.errorMessage"
    >
        Date Filter
        <template #clear-label>
            Clear
        </template>
        <template #apply-label>
            Apply
        </template>
    </DateFilter>
  `,
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
  },
};

export const MaxInit: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    maxInit: new Date(),
  },
};

export const MaxEnd: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    maxEnd: new Date(),
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
