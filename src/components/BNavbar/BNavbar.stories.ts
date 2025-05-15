import type { Meta, StoryObj } from "@storybook/vue3";
import BNavbar from "./BNavbar.vue";

export default {
  component: BNavbar,
  tags: ["autodocs"],
  argTypes: {
    modelValue: {
      type: { summary: "any" },
      description: "Will be the array containing the value of the tags.",
    },
    title: {
      type: { summary: "string" },
      description:
        "Will be the title of the navbar, can be used as a slot or as prop.",
    },
    items: {
      type: { summary: "array" },
      description:
        "Array of object to be used as menu options. Props(label: string, value: string, icon: string, disabled: boolean, bottom: boolean, items: same instruction as items)",
    },
    profile: {
      type: { summary: "object" },
      description:
        "Object to be used as profile. Props(name: string, src: string)",
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
} satisfies Meta<typeof BNavbar>;

type Story = StoryObj<typeof BNavbar>;

const modelValue = {
  label: "Home",
  value: "home",
  icon: "home",
};
const defaultArgs = {
  modelValue: modelValue,
  title: "Navbar",
  profile: {
    name: "John Doe",
  },
  items: [
    modelValue,
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
};

const defaultRender = (args: any) => ({
  components: { BNavbar },
  setup() {
    return { args };
  },
  template: `
    <BNavbar
      v-model="args.modelValue"
      :title="args.title"
      :items="args.items"
      :profile="args.profile"
    >
      <template #notifications>
        <div class="p-base">Slot: notifications</div>
      </template>
    </BNavbar>
    `,
});

export const Primary: Story = {
  render: defaultRender,
  args: defaultArgs,
};

export const Slots: Story = {
  render: (args: any) => ({
    components: { BNavbar },
    setup() {
      return { args };
    },
    template: `
      <BNavbar>
        <template #title>
          <div>Slot: Title</div>
        </template>
        <h4>Slot: default</h4>
        <template #actions>
          <div>Slot: actions</div>
        </template>
      </BNavbar>
      <BNavbar class="mt-xs">
        <template #logo>
          <div>Slot: logo</div>
        </template>
        <h4>Slot: default</h4>
        <template #actions>
          <div>Slot: actions</div>
        </template>
      </BNavbar>
      `,
  }),
  args: defaultArgs,
};
