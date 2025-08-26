import type { Meta, StoryObj } from "@storybook/vue3";
import BDateComparatorFilter from "./BDateComparatorFilter.vue";
import { calculateDate } from "../../utils";

export default {
  component: BDateComparatorFilter,
  argTypes: {
    modelValue: {
      type: { summary: "Date[] | Date[][] | null" },
      table: {
        defaultValue: { summary: null },
      },
      description: "Will be the current date or period.",
    },
    labelValue: {
      type: { summary: "text" },
      description: "Will be the date comparator label.",
    },
    lang: {
      type: { summary: "text" },
      table: {
        defaultValue: { summary: "en-US" },
      },
      description: "Will be the date input language.",
    },
    isCompare: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description: "Will determine if the user can select 2 period.",
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
        defaultValue: { summary: false },
      },
      description: "Makes the content dropdown have an absolute position.",
    },
    disabled: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
    },
    required: {
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
    expanded: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
    },
    alignRight: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description:
        "Determine if the dropdown will be right-aligned. To work absolute needs to be true.",
    },
    separator: {
      type: { summary: "text" },
      description:
        "If two period are selected, this property will separate them.",
    },
    default: {
      description: "This slot will be displayed on the select area.",
    },
    apply: {
      description: "This function will be called when the apply button is clicked.",
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
} satisfies Meta<typeof BDateComparatorFilter>;

type Story = StoryObj<typeof BDateComparatorFilter>;

const defaultArgs = {
  modelValue: null,
  labelValue: "label",
  lang: "en-US",
  isCompare: false,
  maxInit: undefined,
  maxEnd: undefined,
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

const defaultRender = (args: any) => ({
  components: { BDateComparatorFilter },
  setup() {
    return { args };
  },
  template: `
    <div class="flex w-full" :class="{ 'justify-end': args.alignRight }">
      <BDateComparatorFilter
          v-model="args.modelValue"
          v-model:expanded="args.expanded"
          :labelValue="args.labelValue"
          :lang="args.lang"
          :is-compare="args.isCompare"
          :max-init="args.maxInit"
          :max-end="args.maxEnd"
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
      </BDateComparatorFilter>
    </div>
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
    separator: "e",
  },
};

export const IsCompare: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    modelValue: [[], []],
    isCompare: true,
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
    isCompare: true,
    separator: "separator",
  },
};
