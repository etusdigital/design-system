import type { Meta, StoryObj } from "@storybook/vue3";
import Textarea from "./Textarea.vue";

export default {
  component: Textarea,
  argTypes: {
    modelValue: {
      description: "Will be the textarea current value.",
    },
    labelValue: {
      description: "Will be the textarea label.",
    },
    max: {
      description: "Will be the maximum number of characters.",
    },
    errorMessage: {
      description: "Will be the textarea error message.",
    },
    infoMessage: {
      description: "Will be the textarea info message.",
    },
    placeholder: {
      description: "Will be the textarea placeholder.",
    },
    isError: {
      table: {
        defaultValue: { summary: "false" },
      },
      description: "Activate error mode.",
    },
    disabled: {
      table: {
        defaultValue: { summary: "false" },
      },
    },
    textAlign: {
      control: "select",
      options: ["start", "center", "end"],
      table: {
        defaultValue: { summary: "start" },
      },
      description: "This property will be textarea text alignment.",
    },
    tooltipMinWidth: {
      table: {
        defaultValue: { summary: "none" },
      },
      description: "This property will be info tooltip min-width.",
    },
  },
} satisfies Meta<typeof Textarea>;

type Story = StoryObj<typeof Textarea>;

const defaultArgs = {
  modelValue: "",
  labelValue: "Textarea Label",
  max: undefined,
  errorMessage: "",
  infoMessage: "",
  placeholder: "Enter your text here...",
  isError: false,
  disabled: false,
  required: false,
  textAlign: "start" as const,
  tooltipMinWidth: "none",
};

const defaultHtml = `
	<Textarea
		class="h-fit"
		v-model="args.modelValue"
		:labelValue="args.labelValue"
		:max="args.max"
		:error-message="args.errorMessage"
		:info-message="args.infoMessage"
		:is-error="args.isError"
		:disabled="args.disabled"
		:required="args.required"
		:placeholder="args.placeholder"
		:text-align="args.textAlign"
		:tooltip-min-width="args.tooltipMinWidth"
	/>`;

const defaultRender = (args: any) => ({
  components: { Textarea },
  setup() {
    return { args };
  },
  template: defaultHtml,
});

export const Primary: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
  },
};

export const MaxCharacters: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    labelValue: "Textarea with Character Limit",
    max: 100,
    placeholder: "Type your message... (max 100 characters)",
  },
};

export const IsError: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    labelValue: "Textarea with Error",
    isError: true,
    errorMessage: "This field contains an error",
  },
};

export const InfoMessage: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    labelValue: "Textarea with Info",
    infoMessage: "This is helpful information about this field",
  },
};

export const Disabled: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    labelValue: "Disabled Textarea",
    disabled: true,
    modelValue: "This textarea is disabled",
  },
};

export const Required: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    labelValue: "Required Textarea",
    required: true,
  },
};

export const TextAlign: Story = {
  render: (args: any) => ({
    components: { Textarea },
    setup() {
      return { args };
    },
    template: `
	<div class="flex flex-col gap-xs">
		${["start", "center", "end"]
      .map((type) => {
        return defaultHtml
          .replace(/args\.textAlign/g, `'${type}'`)
          .replace(/args\.labelValue/g, `'${type}'`);
      })
      .join("")}
	</div>
  `,
  }),
  args: defaultArgs,
};
