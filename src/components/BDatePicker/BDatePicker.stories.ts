import type { Meta, StoryObj } from "@storybook/vue3";
import BDatePicker from "./BDatePicker.vue";

export default {
  component: BDatePicker,
  tags: ["autodocs"],
  argTypes: {
    modelValue: {
      type: { summary: "Date[] | Date[][] | null" },
      table: {
        defaultValue: { summary: null },
      },
      description: "Will be the current date or period.",
    },
    expanded: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
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
    alignRight: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description:
        "Determine if the dropdown will be right-aligned. To work absolute needs to be true.",
    },
    apply: {
      description: "This function will be called when the apply button is clicked.",
    },
    default: {
      description: "This slot will be displayed on the select area.",
    },
    "clear-text": {
      description: "This slot will be the clear button text.",
    },
    "apply-text": {
      description: "This slot will be the apply button text and function.",
    },
    actions: {
      description: "Slot to replace the actions area."
    },
  },
} satisfies Meta<typeof BDatePicker>;

type Story = StoryObj<typeof BDatePicker>;

const defaultArgs = {
  modelValue: null,
  labelValue: "label",
  lang: "en-US",
  maxInit: undefined,
  maxEnd: undefined,
  disabled: false,
  required: false,
  isError: false,
  errorMessage: "",
  absolute: false,
  expanded: false,
  alignRight: false,
};

export const Primary: Story = {
  render: (args: any) => ({
    setup() {
      return { args };
    },
    template: `
            <BDatePicker
                v-model="args.modelValue"
                v-model:expanded="args.expanded"
                :labelValue="args.labelValue"
                :lang="args.lang"
                :max-init="args.maxInit"
                :max-end="args.maxEnd"
                :disabled="args.disabled"
                :required="args.required"
                :is-error="args.isError"
                :error-message="args.errorMessage"
                :absolute="args.absolute"
                :align-right="args.alignRight"
            >
                Date Picker
                <template #clear-text>
                    Clear
                </template>
            </BDatePicker>
        `,
  }),
  args: defaultArgs,
};
