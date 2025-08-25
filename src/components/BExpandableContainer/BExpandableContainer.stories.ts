import type { Meta, StoryObj } from "@storybook/vue3";
import BExpandableContainer from "./BExpandableContainer.vue";

export default {
  component: BExpandableContainer,
  argTypes: {
    modelValue: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description: "Used to know if the container is expanded.",
    },
    labelValue: {
      type: { summary: "text" },
      description: "Will be the expandable container label",
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
    isError: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description: "Activate error mode.",
    },
    errorMessage: {
      type: { summary: "text" },
      description: "This will be the error message.",
    },
    infoMessage: {
      type: { summary: "text" },
      description: "This will be the info message.",
    },
    required: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
    },
    closeOnBlur: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: true },
      },
      description:
        "Closes the content box when focus moves outside the component.",
    },
    alignRight: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description:
        "Determine if the dropdown will be right-aligned. To work absolute needs to be true.",
    },
    maxHeight: {
      type: { summary: "text" },
      table: {
        defaultValue: { summary: "36px" },
      },
      description: "Set the select max height.",
    },
    minWidth: {
      type: { summary: "text" },
      table: {
        defaultValue: { summary: "unset" },
      },
      description: "Set the select min width.",
    },
    secondary: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
    },
    hideArrow: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description: "Hide the arrow icon.",
    },
    disableLabelAutoWidth: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
    },
    minWidthCard: {
      type: { summary: "text" },
      table: {
        defaultValue: { summary: "" },
      },
      description: "Set the card min width.",
    },
    default: {
      description: "This slot will be displayed on the select area.",
    },
    content: {
      description: "This slot will be displayed on the content area.",
    },
    complement: {
      description: "This slot will be displayed on the complement area.",
    },
    label: {
      description: "This slot will be displayed on the label area.",
    },
    card: {
      description: "This slot will be displayed on the card area.",
    },
  },
} satisfies Meta<typeof BExpandableContainer>;

type Story = StoryObj<typeof BExpandableContainer>;

const defaultArgs = {
  modelValue: false,
  labelValue: "label",
  absolute: false,
  disabled: false,
  isError: false,
  errorMessage: "",
  infoMessage: "",
  required: false,
  alignRight: false,
  closeOnBlur: true,
  maxHeight: "40px",
  minWidth: "unset",
  secondary: false,
  hideArrow: false,
  disableLabelAutoWidth: false,
  minWidthCard: "",
};

const defaultRender = (args: any) => ({
  components: { BExpandableContainer },
  setup() {
    return { args };
  },
  template: `
    <BExpandableContainer 
        v-model="args.modelValue" 
        :label-value="args.labelValue"
        :required="args.required"
        :error-message="args.errorMessage"
        :info-message="args.infoMessage"
        :is-error="args.isError"
        :absolute="args.absolute" 
        :disabled="args.disabled" 
        :close-on-blur="args.closeOnBlur" 
        :align-right="args.alignRight"
        :max-height="args.maxHeight"
        :min-width="args.minWidth"
        :secondary="args.secondary"
        :hide-arrow="args.hideArrow"
        :disable-label-auto-width="args.disableLabelAutoWidth"
        :min-width-card="args.minWidthCard"
    >
        <BIcon name="sentiment_satisfied" size="22px" unfilled class="text-base shrink-0 h-[1em] flex items-center" />
        <span class="truncate">Select container example</span>

        <template #content>
            <div class="flex flex-col gap-xxs rounded-xxs overflow-hidden min-w-[20em]">
                <div v-for="i in [1, 2, 3, 4]" :key="\`item-\${i}\`" class="flex items-center justify-center w-full cursor-pointer hover:bg-primary-surface-hover hover:text-primary-interaction-default p-xs pr-xxs">
                    Option {{ i }}
                </div>
            </div>
        </template>
    </BExpandableContainer>
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

export const IsError: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    isError: true,
    errorMessage: "This field has an error",
  },
};

export const InfoMessage: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    infoMessage: "This is helpful information",
  },
};

export const AlignRight: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    absolute: true,
    alignRight: true,
  },
};

export const Secondary: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    secondary: true,
  },
};

export const HideArrow: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    hideArrow: true,
  },
};
