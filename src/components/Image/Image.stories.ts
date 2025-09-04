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
  preview: false,
};

export const Primary: Story = {
  render: (args: any) => ({
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
        :preview="args.preview"
      />
    `,
  }),
  args: defaultArgs,
};

export const WithPreview: Story = {
  render: (args: any) => ({
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
        :preview="args.preview"
      />
    `,
  }),
  args: {
    ...defaultArgs,
    preview: true,
  },
};

export const Template: Story = {
  render: (args: any) => ({
    components: { Image },
    setup() {
      return { args };
    },
    template: `
      <Image :alt="args.alt" preview>
        <template #previewicon>
          <i class="material-symbols-rounded">search</i>
        </template>
        <template #image>
          <img :src="args.src" alt="image" width="200" />
        </template>
        <template #preview="slotProps">
          <img 
            :src="args.src" 
            alt="preview" 
            :style="slotProps.style" 
            @click="slotProps.onClick" 
          />
        </template>
      </Image>
    `,
  }),
  args: {
    ...defaultArgs,
  },
};
