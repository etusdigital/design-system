import type { Meta, StoryObj } from "@storybook/vue3";
import Chip from "./Chip.vue";

export default {
  component: Chip,
  argTypes: {
    labelValue: {
      type: { name: "string" },
      description: "This property will be the text in the chip.",
    },
    color: {
      type: { name: "string" },
      control: "select",
      options: ["primary", "info", "success", "warning", "danger", "neutral"],
      table: {
        defaultValue: { summary: "primary" },
      },
      description: "This property will be the chip color.",
    },
    size: {
      type: { name: "string" },
      control: "select",
      options: ["small", "medium", "large"],
      table: {
        defaultValue: { summary: "small" },
      },
    },
    loading: {
      type: { name: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
      description: "Determine if the chip is loading.",
    },
    icon: {
      type: { name: "string" },
      description: "This property will be the icon in the chip.",
    },
    isAppendedIcon: {
      type: { name: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
      description: "Shows the icon after the text.",
    },
    closeable: {
      type: { name: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
      description: "Adds a close button that emits the close event.",
    },
    default: {
      description: "If no text is passed, it slot will be display instead.",
    },
  },
} satisfies Meta<typeof Chip>;

type Story = StoryObj<typeof Chip>;

const defaultArgs = {
  labelValue: "Chip",
  color: "primary" as const,
  size: "small" as const,
  loading: false,
  icon: "",
  isAppendedIcon: false,
  closeable: false,
};

const defaultHtml = `
  <Chip
    :label-value="args.labelValue"
    :color="args.color"
    :size="args.size"
    :loading="args.loading"
    :icon="args.icon"
    :is-appended-icon="args.isAppendedIcon"
    :closeable="args.closeable"
  />
`;

const defaultRender = (args: any) => ({
  components: { Chip },
  setup() {
    return { args };
  },
  template: defaultHtml,
});

export const Primary: Story = {
  render: defaultRender,
  args: defaultArgs,
};

export const Colors: Story = {
  render: (args: any) => ({
    components: { Chip },
    setup() {
      return { args };
    },
    template: `
    <div class="flex gap-xs">
      ${["primary", "info", "success", "warning", "danger", "neutral"]
        .map((color) => defaultHtml.replace(/args\.color/g, `'${color}'`))
        .join("")}
    </div>`,
  }),
  args: defaultArgs,
};

export const Sizes: Story = {
  render: (args: any) => ({
    components: { Chip },
    setup() {
      return { args };
    },
    template: `
      <div class="flex items-center gap-xs">
        ${["small", "medium", "large"]
          .map((size) => defaultHtml.replace("args.size", `'${size}'`))
          .join("")}
      </div>
    `,
  }),
  args: defaultArgs,
};

export const Loading: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    loading: true,
  },
};

export const WithIcon: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    icon: "star",
  },
};

export const IsAppendedIcon: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    icon: "star",
    isAppendedIcon: true,
  },
};

export const Closeable: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    closeable: true,
  },
};
