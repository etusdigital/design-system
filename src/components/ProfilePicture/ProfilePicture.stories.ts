import type { Meta, StoryObj } from "@storybook/vue3";
import { ref } from "vue";
import ProfilePicture from "./ProfilePicture.vue";

export default {
  component: ProfilePicture,
  argTypes: {
    modelValue: {
      type: { name: "other", value: "Record<string, any>" },
      description:
        "Selected sub-item of each option that has `items`, keyed by the option value (e.g. `{ language: 'en' }`).",
    },
    expanded: {
      type: { name: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
      description: "Controls whether the menu is open (v-model:expanded).",
    },
    name: {
      type: { name: "string" },
      description: "User name shown in the header and used for the avatar initials.",
    },
    description: {
      type: { name: "string" },
      description: "Secondary text under the name, such as the email.",
    },
    picture: {
      type: { name: "string" },
      description: "Avatar image URL.",
    },
    options: {
      type: { name: "array", value: { name: "object", value: {} } },
      description:
        "Menu options: `{ label, value, icon?, image?, color?, disabled?, items?, action? }`. Options with `items` open a single-choice list.",
    },
    labelKey: {
      type: { name: "string" },
      table: {
        defaultValue: { summary: "label" },
      },
    },
    valueKey: {
      type: { name: "string" },
      table: {
        defaultValue: { summary: "value" },
      },
    },
    disabled: {
      type: { name: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
    },
    ariaLabel: {
      type: { name: "string" },
      description: "Accessible name of the trigger and menu (defaults to the name).",
    },
    trigger: {
      description: "Replaces the avatar and arrow. Params: expanded.",
    },
    header: {
      description: "Replaces the header. Params: name, description and picture.",
    },
    option: {
      description: "Replaces an option content. Params: option and selectedItem.",
    },
    item: {
      description: "Replaces a sub-item content. Params: option, item and selected.",
    },
    footer: {
      description: "Content displayed after the options.",
    },
  },
} satisfies Meta<typeof ProfilePicture>;

type Story = StoryObj<typeof ProfilePicture>;

const options = [
  { label: "My account", value: "account", icon: "person" },
  { label: "Settings", value: "settings", icon: "settings" },
  {
    label: "Language",
    value: "language",
    icon: "translate",
    items: [
      { label: "English", value: "en", icon: "language" },
      { label: "Português", value: "pt", icon: "language" },
    ],
  },
  {
    label: "Theme",
    value: "theme",
    icon: "contrast",
    items: [
      { label: "Light", value: "light", icon: "light_mode" },
      { label: "Dark", value: "dark", icon: "dark_mode" },
    ],
  },
  { label: "Logout", value: "logout", icon: "logout", color: "danger" as const },
];

const defaultArgs = {
  modelValue: { language: "en", theme: "light" },
  expanded: false,
  name: "John Doe",
  description: "john@example.com",
  picture: "",
  options,
  labelKey: "label",
  valueKey: "value",
  disabled: false,
};

const defaultRender = (args: any) => ({
  components: { ProfilePicture },
  setup() {
    const lastSelected = ref("");
    function onSelect(option: any, item?: any) {
      lastSelected.value = item ? `${option.label}: ${item.label}` : option.label;
    }
    return { args, lastSelected, onSelect };
  },
  template: `
    <ProfilePicture
      v-model="args.modelValue"
      v-model:expanded="args.expanded"
      :name="args.name"
      :description="args.description"
      :picture="args.picture"
      :options="args.options"
      :label-key="args.labelKey"
      :value-key="args.valueKey"
      :disabled="args.disabled"
      @select="onSelect"
      class="w-fit"
    />
  `,
});

export const Primary: Story = {
  render: defaultRender,
  args: defaultArgs,
};

export const WithPicture: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    picture: "https://i.pravatar.cc/150?img=47",
  },
};

export const Disabled: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true,
  },
};
