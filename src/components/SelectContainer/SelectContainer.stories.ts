import type { Meta, StoryObj } from "@storybook/vue3";
import SelectContainer from "./SelectContainer.vue";

export default {
  component: SelectContainer,
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
      description: "Will be the select container label.",
    },
    role: {
      type: { summary: "text" },
      table: {
        defaultValue: { summary: "listbox" },
      },
    },
    absolute: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description: "Makes the content dropdown have an absolute position.",
    },
    required: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description: "Makes the select container required.",
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
    hideArrow: {
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
    dontHaveMaxHeight: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: true },
      },
      description: "Change style to fit sub items.",
    },
    maxHeight: {
      type: { summary: "text" },
      table: {
        defaultValue: { summary: "36px" },
      },
      description: "Set the select max height, excluing the sub items.",
    },
    minWidth: {
      type: { summary: "text" },
      table: {
        defaultValue: { summary: "15em" },
      },
      description: "Set the select min width.",
    },
    disableLabelAutoWidth: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
    },
    default: {
      description: "This slot will be displayed on the select area.",
    },
    content: {
      description: "This slot will be displayed on the content area.",
    },
    items: {
      description: "This slot will be as list inside the content area.",
    },
    actions: {
      description:
        "This slot will be the select actions, displayed in the bottom of the dropdown",
    },
  },
} satisfies Meta<typeof SelectContainer>;

type Story = StoryObj<typeof SelectContainer>;

const defaultArgs = {
  modelValue: false,
  labelValue: "label",
  role: "listbox",
  absolute: false,
  disabled: false,
  isError: false,
  errorMessage: "",
  infoMessage: "",
  required: false,
  closeOnBlur: true,
  dontHaveMaxHeight: false,
  maxHeight: "40px",
  minWidth: "15em",
  secondary: false,
  disableLabelAutoWidth: false,
}

const defaultRender = (args: any) => ({
  setup() {
    return { args };
  },
  template: `
    <SelectContainer
      v-model="args.modelValue" 
      :labelValue="args.labelValue" 
      :role="args.role" 
      :absolute="args.absolute" 
      :disabled="args.disabled"
      :is-error="args.isError"
      :error-message="args.errorMessage"
      :info-message="args.infoMessage"
      :required="args.required" 
      :close-on-blur="args.closeOnBlur"
      :max-height="args.maxHeight"
      :min-width="args.minWidth"
      :dont-have-max-height="args.dontHaveMaxHeight"
      :secondary="args.secondary"
      :hide-arrow="args.hideArrow"
      :disable-label-auto-width="args.disableLabelAutoWidth"
      >
        <Icon name="sentiment_satisfied" size="1rem" class="shrink-0 h-[1em] flex items-center" />
        <span class="truncate">Select container example</span>

        <template #items>
            <li v-for="i in [1, 2, 3, 4]" :key="\`item-\${i}\`" tabindex="0">Item {{ i }}</li>
        </template>

        <template #actions>
            <Button size="small" variant="plain">Clear</Button>
            <Button size="small">Apply</Button>
        </template>
      </SelectContainer>`,
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

export const Required: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    required: true,
  },
};

export const Disabled: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true,
  },
};

export const IsError: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    errorMessage: "Error message",
    isError: true,
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

export const HideArrow: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    hideArrow: true,
  },
};

export const Content: Story = {
  render: (args: any) => ({
    components: { SelectContainer },
    setup() {
      return { args };
    },
    template: `
        <SelectContainer>
            <span class="truncate">Select container example</span>
            <template #content>
                <div>Slot: content</div>
            </template>
        </SelectContainer>
        `,
  }),
  args: defaultArgs,
};