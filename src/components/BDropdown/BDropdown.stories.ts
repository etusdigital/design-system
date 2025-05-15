import type { Meta, StoryObj } from "@storybook/vue3";
import BDropdown from "./BDropdown.vue";

export default {
  component: BDropdown,
  tags: ["autodocs"],
  argTypes: {
    modelValue: {
      type: { summary: "any" },
      description: "Will be the selected current value.",
    },
    expanded: {
      type: { summary: "boolean" },
      description: "Will be the expanded state.",
    },
    labelValue: {
      type: { summary: "text" },
      description: "Will be the select label.",
    },
    items: {
      type: { summary: "array" },
      description:
        "Array of object to be used as menu options. Props(label: string, value: string, icon: string, disabled: boolean, bottom: boolean, items: same instruction as items)",
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
    absolute: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: true },
      },
    },
    errorMessage: {
      type: { summary: "text" },
      description: "Will be the error message.",
    },
    infoMessage: {
      type: { summary: "text" },
      description: "Will be the info message.",
    },
    getObject: {
      type: { summary: "boolean" },
      description: "Will be the get object.",
    },
    searchable: {
      type: { summary: "boolean" },
      description: "Will be the searchable mode.",
    },
    default: {
      description: "Will be the default value.",
    },
  },
} satisfies Meta<typeof BDropdown>;

type Story = StoryObj<typeof BDropdown>;

const defaultArgs = {
  modelValue: undefined,
  expanded: false,
  items: [
    {
      label: "Home",
      value: "home",
      icon: "home",
    },
    {
      label: "Publisher",
      value: "publisher",
      icon: "supervisor_account",
      items: [
        {
          label: "Group Account",
          value: "group-account",
          icon: "account_balance",
        },
        {
          label: "Account",
          value: "account",
          icon: "account_balance",
        },
      ],
    },
    {
      label: "Errors",
      value: "errors",
      icon: "error",
      disabled: true,
    },
    {
      label: "Settings",
      value: "settings",
      icon: "settings",
      bottom: true,
    },
  ],
  labelValue: "label",
  disabled: false,
  required: false,
  absolute: false,
  isError: false,
  errorMessage: "",
  infoMessage: "",
  getObject: false,
  searchable: false,
};

const defaultHtml = `
<BDropdown 
    v-model="args.modelValue"
    v-model:expanded="args.expanded"
    :label-value="args.labelValue"
    :items="args.items"
    :absolute="args.absolute" 
    :required="args.required" 
    :disabled="args.disabled"
    :is-error="args.isError"
    :error-message="args.errorMessage"
    :info-message="args.infoMessage"
    :get-object="args.getObject"
    :searchable="args.searchable"
/>`;

export const Primary: Story = {
  render: (args: any) => ({
    setup() {
      return { args };
    },
    template: defaultHtml,
  }),
  args: defaultArgs,
};

export const Searchable: Story = {
  render: (args: any) => ({
    setup() {
      return { args };
    },
    template: defaultHtml,
  }),
  args: {
    ...defaultArgs,
    searchable: true,
  },
};

export const Slot: Story = {
  render: (args: any) => ({
    setup() {
      return { args };
    },
    template: `
    <BDropdown
      v-model="args.modelValue"
      v-model:expanded="args.expanded"
      :items="args.items"
      :absolute="args.absolute"
    >
      <BButton @click="args.expanded = !args.expanded">Custom Label</BButton>
    </BDropdown>`,
  }),
  args: defaultArgs,
};
