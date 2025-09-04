import type { Meta, StoryObj } from "@storybook/vue3";
import Sidebar from "./Sidebar.vue";

export default {
  component: Sidebar,
  argTypes: {
    modelValue: {
      type: { summary: "any" },
      description: "Will name of the selected item.",
    },
    options: {
      type: { summary: "array" },
      description:
        "Array of object to be used as menu options. Props(label: string, value: string, icon: string, path: string, disabled: boolean, bottom: boolean, options: Item[])",
    },
    parentPath: {
      type: { summary: "string" },
      description: "Path of the parent all options.",
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
} satisfies Meta<typeof Sidebar>;

type Story = StoryObj<typeof Sidebar>;

const defaultArgs = {
  modelValue: "dashboard",
  getObject: false,
  parentPath: "",
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

export const Primary: Story = {
  render: (args: any) => ({
    components: { Sidebar },
    setup() {
      return { args };
    },
    template: `
    <div class="h-screen">
      <Sidebar
        v-model="args.modelValue"
        :options="args.options"
        :parent-path="args.parentPath"
        :get-object="args.getObject"
      />
    </div>
      `,
  }),
  args: defaultArgs,
};
