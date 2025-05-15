import type { Meta, StoryObj } from "@storybook/vue3";
import BSelectContainer from "./BSelectContainer.vue";

export default {
  component: BSelectContainer,
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
} satisfies Meta<typeof BSelectContainer>;

type Story = StoryObj<typeof BSelectContainer>;

export const Primary: Story = {
  render: (args: any) => ({
    setup() {
      return { args };
    },
    template: `
      <BSelectContainer
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
        >
          <BIcon name="sentiment_satisfied" size="1rem" class="shrink-0 h-[1em] flex items-center" />
          <span class="truncate">Select container example</span>

          <template #items>
              <li v-for="i in [1, 2, 3, 4]" :key="\`item-\${i}\`" tabindex="0">Item {{ i }}</li>
          </template>

          <template #actions>
              <BButton size="small" variant="plain">Clear</BButton>
              <BButton size="small">Apply</BButton>
          </template>
        </BSelectContainer>`,
  }),
  args: {
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
  },
};
