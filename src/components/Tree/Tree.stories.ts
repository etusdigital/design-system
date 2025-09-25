import type { Meta, StoryObj } from "@storybook/vue3";
import Tree from "./Tree.vue";

export default {
  component: Tree,
  argTypes: {
    modelValue: {
      type: { name: "other", value: "any" },
      description: "Will be the selected current value.",
    },
    options: {
      type: { name: "array", value: { name: "object", value: {} } },
      description: "Will be the options.",
    },
    labelKey: {
      type: { name: "string" },
      description: "Will be the label key.",
    },
    valueKey: {
      type: { name: "string" },
      description: "Will be the value key.",
    },
    getObject: {
      type: { name: "boolean" },
      description: "Will be the get object.",
    },
    disabled: {
      type: { name: "boolean" },
      description: "Will be the disabled.",
    },
    multiple: {
      type: { name: "boolean" },
      description: "Will be the multiple.",
    },
  },
} satisfies Meta<typeof Tree>;

type Story = StoryObj<typeof Tree>;

const defaultArgs = {
  modelValue: undefined,
  options: [
    {
      label: "Documents",
      value: "documents",
      icon: "inbox",
      options: [
        {
          label: "Work",
          value: "work",
          icon: "settings",
          options: [
            {
              label: "Settings.txt",
              value: "settings.txt",
              icon: "draft",
            },
            {
              label: "Code.js",
              value: "code.js",
              icon: "draft",
            },
          ],
        },
        {
          label: "Personal",
          value: "personal",
          icon: "person",
          options: [
            {
              label: "Account.txt",
              value: "account.txt",
              icon: "draft",
            },
          ],
        },
      ],
    },
    {
      label: "Downloads",
      value: "downloads",
      icon: "download",
      options: [
        {
          label: "Image.jpg",
          value: "image.jpg",
          icon: "draft",
        },
      ],
    },
    {
      label: "Music",
      value: "music",
      icon: "queue_music",
      options: [
        {
          label: "Music.mp3",
          value: "music.mp3",
          icon: "music_note",
        },
      ],
    },
  ],
  labelKey: "label",
  valueKey: "value",
  getObject: false,
  multiple: false,
  disabled: false,
};

const defaultRender = (args: any) => ({
  components: { Tree },
  setup() {
    return { args };
  },
  template: `
    <Tree
      v-model="args.modelValue"
      :options="args.options" 
      :label-key="args.labelKey" 
      :value-key="args.valueKey" 
      :get-object="args.getObject" 
      :multiple="args.multiple" 
      :disabled="args.disabled"
    />
  `,
});

export const Primary: Story = {
  render: defaultRender,
  args: defaultArgs,
};

export const Multiple: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    multiple: true,
  },
};

export const Disabled: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true,
  },
};