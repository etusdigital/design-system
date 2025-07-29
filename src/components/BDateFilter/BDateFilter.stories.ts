import type { Meta, StoryObj } from "@storybook/vue3-vite";
import BDateFilter from "./BDateFilter.vue";
import { calculateDate } from "../../utils";

export default {
  component: BDateFilter,
  tags: ["autodocs"],
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
    "clear-text": {
      description: "This slot will be the clear button text.",
    },
    "apply-text": {
      description: "This slot will be the apply button text.",
    },
    actions: {
      description: "Slot to replace the actions area.",
    },
  },
} satisfies Meta<typeof BDateFilter>;

type Story = StoryObj<typeof BDateFilter>;

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

export const Primary: Story = {
  render: (args: any) => ({
    components: { BDateFilter },
    setup() {
      return { args };
    },
    template: `
            <BDateFilter
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
                <template #clear-text>
                    Clear
                </template>
            </BDateFilter>
        `,
  }),
  args: defaultArgs,
};
