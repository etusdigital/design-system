import type { Meta, StoryObj } from "@storybook/vue3";
import BTag from "./BTag.vue";

export default {
  component: BTag,
  tags: ["autodocs"],
  argTypes: {
    text: {
      type: { summary: "text" },
      description: "This property will be the text in the tag.",
    },
    color: {
      type: { summary: "text" },
      control: "select",
      options: [
        "primary",
        "info",
        "success",
        "warning",
        "danger",
        "neutral"
      ],
      table: {
        defaultValue: { summary: "primary" },
      },
      description: "This property will be tag color.",
    },
    size: {
      type: { summary: "text" },
      control: "select",
      options: ["small", "medium", "large"],
      table: {
        defaultValue: { summary: "medium" },
      },
    },
    type: {
      type: { summary: "text" },
      control: "select",
      options: [
        "default",
        "secondary",
        "heavy",
      ],
      table: {
        defaultValue: { summary: "default" },
      },
    },
    loading: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description: "Determine if the tag is loading.",
    },
    icon: {
      type: { summary: "string" },
      description: "This property will be the icon in the tag.",
    },
    isAppendedIcon: {
      type: { summary: "boolean" },
      description: "This property will be the icon in the tag.",
    },
    closeable: {
      type: { summary: "boolean" },
      description: "This property will be the icon in the tag.",
    },
    default: {
      description: "If no text is passed, it slot will be display instead.",
    },
  },
} satisfies Meta<typeof BTag>;

type Story = StoryObj<typeof BTag>;

const defaultArgs = {
  text: "Tag component",
  color: "primary",
  size: "medium",
  type: "default",
  loading: false,
  icon: "star",
  isAppendedIcon: false,
  closeable: false,
};

const defaultTemplate = `
<div class="flex gap-2">
    <BTag :text="args.text" color="primary" :size="args.size" :loading="args.loading" />
    <BTag :text="args.text" color="info" :size="args.size" :loading="args.loading" />
    <BTag :text="args.text" color="success" :size="args.size" :loading="args.loading" />
    <BTag :text="args.text" color="warning" :size="args.size" :loading="args.loading" />
    <BTag :text="args.text" color="danger" :size="args.size" :loading="args.loading" />
    <BTag :text="args.text" color="neutral" :size="args.size" :loading="args.loading" />
</div>
<div class="flex gap-2 mt-2">
    <BTag :text="args.text" color="primary" :size="args.size" :loading="args.loading" type="secondary" />
    <BTag :text="args.text" color="info" :size="args.size" :loading="args.loading" type="secondary" />
    <BTag :text="args.text" color="success" :size="args.size" :loading="args.loading" type="secondary" />
    <BTag :text="args.text" color="warning" :size="args.size" :loading="args.loading" type="secondary" />
    <BTag :text="args.text" color="danger" :size="args.size" :loading="args.loading" type="secondary" />
    <BTag :text="args.text" color="neutral" :size="args.size" :loading="args.loading" type="secondary" />
</div>
<div class="flex gap-2 mt-2">
    <BTag :text="args.text" color="primary" :size="args.size" :loading="args.loading" type="heavy" />
    <BTag :text="args.text" color="info" :size="args.size" :loading="args.loading" type="heavy" />
    <BTag :text="args.text" color="success" :size="args.size" :loading="args.loading" type="heavy" />
    <BTag :text="args.text" color="warning" :size="args.size" :loading="args.loading" type="heavy" />
    <BTag :text="args.text" color="danger" :size="args.size" :loading="args.loading" type="heavy" />
    <BTag :text="args.text" color="neutral" :size="args.size" :loading="args.loading" type="heavy" />
</div>
`;

export const Primary: Story = {
  render: (args: any) => ({
    components: { BTag },
    setup() {
      return { args };
    },
    template: `
      <BTag
        :text="args.text"
        :color="args.color"
        :size="args.size"
        :loading="args.loading"
        :type="args.type"
        :icon="args.icon"
        :is-appended-icon="args.isAppendedIcon"
        :closeable="args.closeable"
      >
        Tag Component
      </BTag>
    `,
  }),
  args: defaultArgs,
};

export const Colors: Story = {
  render: (args: any) => ({
    components: { BTag },
    setup() {
      return { args };
    },
    template: defaultTemplate,
  }),
  args: defaultArgs,
};

export const Loading: Story = {
  render: (args: any) => ({
    components: { BTag },
    setup() {
      return { args };
    },
    template: defaultTemplate,
  }),
  args: {
    ...defaultArgs,
    loading: true,
  },
};

export const Sizes: Story = {
  render: (args: any) => ({
    components: { BTag },
    setup() {
      return { args };
    },
    template: `
      <div class="flex gap-2">
          <BTag :text="args.text" :color="args.color" size="small" :loading="args.loading" />
          <BTag :text="args.text" :color="args.color" size="medium" :loading="args.loading" />
          <BTag :text="args.text" :color="args.color" size="large" :loading="args.loading" />
      </div>
    `,
  }),
  args: defaultArgs,
};
