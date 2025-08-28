import type { Meta, StoryObj } from "@storybook/vue3";
import DatePicker from "./DatePicker.vue";

export default {
  component: DatePicker,
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
    "clearlabel": {
      description: "This slot will be the clear button text.",
    },
    "apply-label": {
      description: "This slot will be the apply button text and function.",
    },
    actions: {
      description: "Slot to replace the actions area."
    },
  },
} satisfies Meta<typeof DatePicker>;

type Story = StoryObj<typeof DatePicker>;

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

const defaultRender = (args: any) => ({
  components: { DatePicker },
  setup() {
    return { args };
  },
  template: `
    <div class="flex w-full" :class="{ 'justify-end': args.alignRight }">
      <DatePicker
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
        <template #clear-label>
            Clear
        </template>
        <template #apply-label>
            Apply
        </template>
    </DatePicker>
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
