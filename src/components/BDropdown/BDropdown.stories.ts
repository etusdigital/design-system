import type { Meta, StoryObj } from "@storybook/vue3";
import BDropdown from "./BDropdown.vue";

export default {
  component: BDropdown,
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

const defaultRender = (args: any) => ({
  components: { BDropdown },
  setup() {
    return { args };
  },
  template: `
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
    />
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

export const Searchable: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    searchable: true,
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

export const InfoMessage: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    infoMessage: "Additional information",
  },
};

export const Default: Story = {
  render: (args: any) => ({
    components: { BDropdown },
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
      <BButton @click="args.expanded = !args.expanded">Custom Trigger</BButton>
    </BDropdown>`,
  }),
  args: defaultArgs,
};