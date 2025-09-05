import type { Meta, StoryObj } from "@storybook/vue3";
import Image from "./Image.vue";
import bannerImage from "./banner.jpg";

export default {
  component: Image,
  argTypes: {
    src: {
      type: { summary: "text" },
      description: "Image source URL",
    },
    alt: {
      type: { summary: "text" },
      description: "Alternative text for the image",
    },
    width: {
      type: { summary: "string | number" },
      description: "Width of the image",
    },
    height: {
      type: { summary: "string | number" },
      description: "Height of the image",
    },
    icon: {
      type: { summary: "string" },
      description: "Icon name",
    },
    preview: {
      type: { summary: "boolean" },
      control: "boolean",
      description: "Enable image preview with zoom and rotation controls",
      table: {
        defaultValue: { summary: "false" },
      },
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
