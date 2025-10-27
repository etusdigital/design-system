import type { Meta, StoryObj } from "@storybook/vue3";
import Sidebar from "./Sidebar.vue";

export default {
  component: Sidebar,
  argTypes: {
    modelValue: {
      type: { name: "other", value: "any" },
      description: "Will name of the selected option.",
    },
    options: {
      type: { name: "array", value: { name: "object", value: {} } },
      description:
        "Array of object to be used as sidebar options. Props(label: string, value: string, icon: string, path: string, disabled: boolean, bottom: boolean, options: Option[])",
    },
    expanded: {
      type: { name: "boolean" },
      description: "If true, the sidebar will be expanded.",
    },
    getObject: {
      type: { name: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
      description:
        'If true, the selected value will be an object instead of value-key value.',
    },
  },
} satisfies Meta<typeof Sidebar>;

type Story = StoryObj<typeof Sidebar>;

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
          value: "rew-projects",
          path: "/all",
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
  components: { Sidebar },
  setup() {
    return { args };
  },
  template: `
    <div class="h-screen">
      <Sidebar
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