import type { Meta, StoryObj } from "@storybook/vue3";
import Tree from "./Tree.vue";

export default {
  component: Tree,
  argTypes: {
    modelValue: {
      type: { summary: "any" },
      description: "Will be the selected current value.",
    },
    items: {
      type: { summary: "array" },
      description: "Will be the items.",
    },
    labelKey: {
      type: { summary: "text" },
      description: "Will be the label key.",
    },
    valueKey: {
      type: { summary: "text" },
      description: "Will be the value key.",
    },
    getObject: {
      type: { summary: "boolean" },
      description: "Will be the get object.",
    },
    disabled: {
      type: { summary: "boolean" },
      description: "Will be the disabled.",
    },
    multiple: {
      type: { summary: "boolean" },
      description: "Will be the multiple.",
    },
  },
} satisfies Meta<typeof Tree>;

type Story = StoryObj<typeof Tree>;

const defaultArgs = {
  modelValue: undefined,
  items: [
    {
      label: "Documents",
      value: "documents",
      icon: "inbox",
      items: [
        {
          label: "Work",
          value: "work",
          icon: "settings",
          items: [
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
          items: [
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
      items: [
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
      items: [
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
  multiple: true,
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
      :items="args.items" 
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
