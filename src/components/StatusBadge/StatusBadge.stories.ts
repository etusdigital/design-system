import type { Meta, StoryObj } from "@storybook/vue3";
import StatusBadge from "./StatusBadge.vue";

export default {
  component: StatusBadge,
  argTypes: {
    labelValue: {
      type: { name: "string" },
      description: "This property will be the text in the tag.",
    },
    color: {
      type: { name: "string" },
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
      type: { name: "string" },
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
      type: { name: "string" },
      control: "select",
      options: ["small", "medium", "large"],
      table: {
        defaultValue: { summary: "medium" },
      },
    },
    loading: {
      type: { name: "boolean" },
      table: {
        defaultValue: false,
      },
      description: "Determine if the tag is loading.",
    },
    icon: {
      type: { name: "string" },
      description: "This property will be the icon in the tag.",
    },
    isAppendedIcon: {
      type: { name: "boolean" },
      description: "This property will be the icon in the tag.",
    },
    closeable: {
      type: { name: "boolean" },
      description: "This property will be the icon in the tag.",
    },
    default: {
      description: "If no text is passed, it slot will be display instead.",
    },
  },
} satisfies Meta<typeof StatusBadge>;

type Story = StoryObj<typeof StatusBadge>;

const defaultArgs = {
  labelValue: "StatusBadge component",
  color: "primary",
  size: "medium" as const,
  type: "default" as const,
  loading: false,
  icon: "star",
  isAppendedIcon: false,
  closeable: false,
};

const defaultHtml = `
  <StatusBadge
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
  components: { StatusBadge },
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
    components: { StatusBadge },
    setup() {
      return { args };
    },
    template: `
    <div class="flex gap-xs">
      ${["primary", "info", "success", "warning", "danger", "neutral"]
        .map((color) => {
          return defaultHtml
            .replace(/args\.color/g, `'${color}'`)
        })
      .join("")}
    </div>`,
  }),
  args: defaultArgs,
};

export const Types: Story = {
  render: (args: any) => ({
    components: { StatusBadge },
    setup() {
      return { args };
    },
    template: `
      <div class="flex gap-xs">
          ${["default", "secondary", "heavy"].map(type => `
            ${defaultHtml.replace(/args\.type/g, `'${type}'`)}
          `).join("")}
      </div>
    `,
  }),
  args: defaultArgs,
};

export const Sizes: Story = {
  render: (args: any) => ({
    components: { StatusBadge },
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
