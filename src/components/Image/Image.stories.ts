import type { Meta, StoryObj } from "@storybook/vue3";
import Image from "./Image.vue";
import bannerImage from "./banner.jpg";

export default {
  component: Image,
  argTypes: {
    src: {
      type: { name: "string" },
      description: "Image source URL",
    },
    alt: {
      type: { name: "string" },
      description: "Alternative text for the image",
    },
    width: {
      type: { name: "other", value: "string | number" },
      description: "Width of the image",
    },
    height: {
      type: { name: "other", value: "string | number" },
      description: "Height of the image",
    },
    icon: {
      type: { name: "string" },
      description: "Icon name",
    },
    preview: {
      type: { name: "boolean" },
      control: "boolean",
      description: "Enable image preview with zoom and rotation controls",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    zIndex: {
      type: { name: "number" },
      table: {
        defaultValue: { summary: "1002" },
      },
      description: "Determine the z-index of the preview modal and its overlay (backdrop).",
    },
  },
} satisfies Meta<typeof Image>;

type Story = StoryObj<typeof Image>;

const defaultArgs = {
  src: bannerImage,
  alt: "Sample image",
  width: "250",
  icon: "visibility",
  preview: false,
  zIndex: 1002,
};

const defaultRender = (args: any) => ({
  components: { Image },
  setup() {
    return { args };
  },
  template: `
      <Image
        :src="args.src"
        :alt="args.alt"
        :width="args.width"
        :height="args.height"
        :icon="args.icon"
        :preview="args.preview"
        :z-index="args.zIndex"
      />
    `,
});

export const Primary: Story = {
  render: defaultRender,
  args: defaultArgs,
};

export const Preview: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    preview: true,
  },
};
