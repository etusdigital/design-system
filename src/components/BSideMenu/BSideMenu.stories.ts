import type { Meta, StoryObj } from "@storybook/vue3";
import BSideMenu from "./BSideMenu.vue";

export default {
  component: BSideMenu,
  tags: ["autodocs"],
  argTypes: {
    modelValue: {
      type: { summary: "any" },
      description: "Will name of the selected item.",
    },
    items: {
      type: { summary: "array" },
      description:
        "Array of object to be used as menu options. Props(label: string, value: string, icon: string, path: string, disabled: boolean, bottom: boolean, items: Item[])",
    },
    parentPath: {
      type: { summary: "string" },
      description: "Path of the parent all items.",
    },
    getObject: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description:
        "If true, the selected value will be an object instead of value-key value.",
    },
  },
} satisfies Meta<typeof BSideMenu>;

type Story = StoryObj<typeof BSideMenu>;

const menuModel = {
  label: "Home",
  value: "home",
  icon: "home",
  path: "/",
  items: [
    {
      label: "Publisher",
      value: "publisher",
      path: "/publisher",
      icon: "people",
      items: [
        {
          label: "Group Account",
          value: "group-account",
          path: "/group-account",
          icon: "account_balance",
        },
      ],
    },
  ],
};

const defaultArgs = {
  modelValue: "home",
  getObject: false,
  parentPath: "",
  items: [
    {
      label: "Home",
      value: "home",
      icon: "home",
      path: "/",
    },
    {
      label: "Publisher",
      value: "publisher",
      path: "/publisher",
      icon: "people",
      items: [
        {
          label: "Group Account",
          value: "group-account",
          path: "/group-account",
          icon: "account_balance",
        },
      ],
    },
    {
      label: "Errors",
      value: "errors",
      path: "/errors",
      icon: "error",
      disabled: true,
    },
    {
      label: "Settings",
      value: "settings",
      path: "/settings",
      icon: "settings",
      bottom: true,
    },
  ],
};

export const Primary: Story = {
  render: (args: any) => ({
    components: { BSideMenu },
    setup() {
      return { args };
    },
    template: `
    <div class="h-screen">
    <BSideMenu
      v-model="args.modelValue"
      :items="args.items"
      :get-object="args.getObject"
    />
    </div>
      `,
  }),
  args: defaultArgs,
};

export const WithMenu: Story = {
  render: (args: any) => ({
    components: { BSideMenu },
    setup() {
      return { args };
    },
    template: `
    <div class="flex h-screen">
    <BMenu
      v-model="args.modelValue"
      :items="args.items"
      get-object
    />
    <BSideMenu
      :items="args.modelValue.items"
      :parent-path="args.modelValue.path"
      :get-object="args.getObject"
    />
    </div>
      `,
  }),
  args: {
    ...defaultArgs,
    modelValue: menuModel,
    items: [
      menuModel,
      {
        label: "Errors",
        value: "errors",
        path: "/errors",
        icon: "error",
        disabled: true,
      },
      {
        label: "Settings",
        value: "settings",
        path: "/settings",
        icon: "settings",
        bottom: true,
      },
    ],
  },
};
