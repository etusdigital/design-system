import type { Meta, StoryObj } from "@storybook/vue3";
import Menu from "./Menu.vue";

export default {
  component: Menu,
  argTypes: {
    modelValue: {
      type: { summary: "any" },
      description: "Will name of the selected item.",
    },
    options: {
      type: { summary: "array" },
      description:
        "Array of object to be used as menu options. Props(label: string, value: string, icon: string, path: string, disabled: boolean, bottom: boolean)",
    },
    expanded: {
      type: { summary: "boolean" },
      description: "If true, the menu will be expanded.",
    },
    getObject: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description:
        'If true, the selected value will be an object instead of value-key value.',
    },
  },
} satisfies Meta<typeof Menu>;

type Story = StoryObj<typeof Menu>;

const defaultArgs = {
  modelValue: "dashboard",
  getObject: false,
  expanded: false,
  options: [
    {
      label: "Dashboard",
      value: "dashboard",
      icon: "dashboard",
      path: "/",
    },
    {
      label: "Projects",
      value: "projects",
      path: "/projects",
      icon: "folder",
      options: [
        {
          label: "All Projects",
          value: "all-projects",
          path: "/all",
        },
        {
          label: "Internal",
          value: "internal",
          path: "/internal",
        },
        {
          label: "External",
          value: "external",
          path: "/external",
        },
      ],
    },
    {
      label: "Team",
      value: "team",
      path: "/team",
      icon: "group",
    },
    {
      label: "Analytics",
      value: "analytics",
      path: "/analytics",
      icon: "analytics",
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

const defaultRender = (args: any) => ({
  components: { Menu },
  setup() {
    return { args };
  },
  template: `
    <div class="h-screen">
      <Menu
        v-model="args.modelValue"
        :expanded="args.expanded"
        :options="args.options"
        :get-object="args.getObject"
      />
    </div>
  `,
});

export const Primary: Story = {
  render: defaultRender,
  args: defaultArgs,
};

export const Expanded: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    expanded: true,
  },
};

export const WithSideMenu: Story = {
  render: (args: any) => ({
    components: { Menu },
    setup() {
      return { args };
    },
    template: `
      <div class="flex h-screen">
        <Menu
          v-model="args.modelValue"
          :expanded="args.expanded"
          :options="args.options"
          get-object
        />
        <SideMenu
          v-if="args.modelValue && args.modelValue.options"
          :options="args.modelValue.options"
          :parent-path="args.modelValue.path"
          :get-object="args.getObject"
        />
      </div>
    `
  }),
  args: {
    ...defaultArgs,
    modelValue: defaultArgs.options[1],
    expanded: true,
  },
};