import type { Meta, StoryObj } from "@storybook/vue3";
import Navbar from "./Navbar.vue";

export default {
  component: Navbar,
  argTypes: {
    modelValue: {
      type: { name: "other", value: "any" },
      description: "Will be the array containing the value of the tags.",
    },
    title: {
      type: { name: "string" },
      description:
        "Will be the title of the navbar, can be used as a slot or as prop.",
    },
    options: {
      type: { name: "array", value: { name: "object", value: {} } },
      description:
        "Array of object to be used as menu options. Props(label: string, value: string, icon: string, disabled: boolean, bottom: boolean, options: same instruction as options)",
    },
    profile: {
      type: { name: "object", value: {} },
      description:
        "Object to be used as profile. Props(name: string, src: string)",
    },
    labelKey: {
      type: { name: "string" },
      description:
        "Will be the key of the label of the options.",
    },
    valueKey: {
      type: { name: "string" },
      description:
        "Will be the key of the value of the options.",
    },
    getObject: {
      type: { name: "boolean" },
      description:
        "Will be the key of the options.",
    },
    logo: {
      description:
        "This slot is used to render the logo and title of the navbar.",
    },
    default: {
      description:
        "This slot is used to render the default content of the navbar.",
    },
    actions: {
      description:
        "This slot is used to render the actions of the navbar.",
    },
  },
} satisfies Meta<typeof Navbar>;

type Story = StoryObj<typeof Navbar>;


const defaultArgs = {
  modelValue: "dashboard",
  title: "Navbar",
  labelKey: "label",
  valueKey: "value",
  getObject: false,
  profile: {
    name: "John Doe",
  },
  options: [
    {
      label: "Dashboard",
      value: "dashboard",
      icon: "dashboard",
    },
    {
      label: "Analytics",
      value: "analytics",
      icon: "analytics",
      options: [
        {
          label: "Reports",
          value: "reports",
          icon: "assessment",
        },
        {
          label: "Metrics",
          value: "metrics",
          icon: "bar_chart",
        },
      ],
    },
    {
      label: "Users",
      value: "users",
      icon: "people",
    },
    {
      label: "Settings",
      value: "settings",
      icon: "settings",
      bottom: true,
    },
  ],
};

const defaultRender = (args: any) => ({
  components: { Navbar },
  setup() {
    return { args };
  },
  template: `
    <Navbar
      v-model="args.modelValue"
      :title="args.title"
      :options="args.options"
      :profile="args.profile"
      :label-key="args.labelKey"
      :value-key="args.valueKey"
      :get-object="args.getObject"
    >
      <template #notifications>
        <div class="p-base">
          <h4 class="font-semibold mb-xs">Notifications</h4>
          <p class="text-sm text-neutral-foreground-medium">No new notifications</p>
        </div>
      </template>
    </Navbar>
    `,
});

export const Primary: Story = {
  render: defaultRender,
  args: defaultArgs,
};

export const CustomSlots: Story = {
  render: (args: any) => ({
    components: { Navbar },
    setup() {
      return { args };
    },
    template: `
      <Navbar>
        <template #title>
          <div>Slot: Title</div>
        </template>
        <h4>Slot: default</h4>
        <template #actions>
          <div>Slot: actions</div>
        </template>
      </Navbar>
      <Navbar class="mt-xs">
        <template #logo>
          <div>Slot: logo</div>
        </template>
        <h4>Slot: default</h4>
        <template #actions>
          <div>Slot: actions</div>
        </template>
      </Navbar>
    `,
  }),
  args: {},
};
