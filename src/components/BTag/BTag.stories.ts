import type { Meta, StoryObj } from "@storybook/vue3";
import BTag from "./BTag.vue";

export default {
  component: BTag,
  argTypes: {
    labelValue: {
      type: { summary: "text" },
      description: "This property will be the text in the tag.",
    },
    text: {
      type: { summary: "text" },
      description: "This property will be the text in the tag. Deprecated, use labelValue instead.",
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
    size: {
      type: { summary: "text" },
      control: "select",
      options: ["small", "medium", "large"],
      table: {
        defaultValue: { summary: "medium" },
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
  labelValue: "Tag component",
  color: "primary",
  size: "medium",
  type: "default",
  loading: false,
  icon: "star",
  isAppendedIcon: false,
  closeable: false,
};

const defaultHtml = `
  <BTag
    :label-value="args.labelValue"
    :color="args.color"
    :type="args.type"
    :size="args.size"
    :loading="args.loading"
    :icon="args.icon"
    :is-appended-icon="args.isAppendedIcon"
    :closeable="args.closeable"
  />
`;

const defaultRender = (args: any) => ({
  components: { BTag },
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
    components: { BTag },
    setup() {
      return { args };
    },
    template: `
    <div class="flex gap-xs">
      ${["primary", "info", "success", "warning", "danger", "neutral"]
        .map((color) => {
          return defaultHtml
            .replaceAll("args.color", `'${color}'`)
        })
      .join("")}
    </div>`,
  }),
  args: defaultArgs,
};

export const Types: Story = {
  render: (args: any) => ({
    components: { BTag },
    setup() {
      return { args };
    },
    template: `
      <div class="flex gap-xs">
          ${["default", "secondary", "heavy"].map(type => `
            ${defaultHtml.replaceAll("args.type", `'${type}'`)}
          `).join("")}
      </div>
    `,
  }),
  args: defaultArgs,
};

export const Sizes: Story = {
  render: (args: any) => ({
    components: { BTag },
    setup() {
      return { args };
    },
    template: `
      <div class="flex gap-xs">
          ${["small", "medium", "large"].map(size => `
            ${defaultHtml.replace("args.size", `'${size}'`)}
          `).join("")}
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
  args: defaultArgs,
};

export const IsAppendedIcon: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
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
