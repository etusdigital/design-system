import type { Meta, StoryObj } from "@storybook/vue3";
import Avatar from "./Avatar.vue";
import photo from "./photo.svg";

export default {
  component: Avatar,
  argTypes: {
    name: {
      type: { summary: "text" },
      description: "Will be the avatar name.",
    },
    src: {
      type: { summary: "text" },
      description: "Will be the avatar image. SVG images are recommended.",
    },
    alt: {
      type: { summary: "text" },
      description: "Will be the avatar image alt.",
    },
    size: {
      type: { summary: "text" },
      control: "select",
      options: ["small", "medium", "large"],
      table: {
        defaultValue: { summary: "large" },
      },
    },
  },
} satisfies Meta<typeof Avatar>;

type Story = StoryObj<typeof Avatar>;
const defaultArgs = {
  name: "John Doe",
  src: photo,
  alt: "Avatar",
  size: "medium",
};

export const Primary: Story = {
  render: (args: any) => ({
    components: { Avatar },
    setup() {
      return { args };
    },
    template: `
      <Avatar
        :name="args.name"
        :src="args.src"
        :alt="args.alt"
        :size="args.size"
      />
    `,
  }),
  args: defaultArgs,
};

export const noSrc: Story = {
  render: (args: any) => ({
    components: { Avatar },
    setup() {
      return { args };
    },
    template: `
      <Avatar
        :name="args.name"
        :src="args.src"
        :alt="args.alt"
        :size="args.size"
      />
    `,
  }),
  args: {
    ...defaultArgs,
    src: undefined,
  },
};

export const Sizes: Story = {
  render: (args: any) => ({
    components: { Avatar },
    setup() {
      return { args };
    },
    template: `
      <div class="flex gap-xs">
        <Avatar
          v-for="size in ['small', 'medium', 'large']"
          :key="size"
          :name="args.name"
          :src="args.src"
          :alt="args.alt"
          :size="size"
        />
      </div>
    `,
  }),
  args: {
    ...defaultArgs,
    src: undefined,
  },
};