import type { Meta, StoryObj } from "@storybook/vue3";
import Alert from "./Alert.vue";

export default {
  component: Alert,
  argTypes: {
    title: {
      type: { summary: "text" },
      description: "Will be the alert title.",
    },
    message: {
      type: { summary: "text" },
      description: "Will be the alert message.",
    },
    type: {
      type: { summary: "text" },
      control: "select",
      options: ["info", "success", "warning", "danger", "neutral"],
      table: {
        defaultValue: { summary: "info" },
      },
    },
    size: {
      type: { summary: "text" },
      control: "select",
      options: ["small", "medium", "large"],
      table: {
        defaultValue: { summary: "large" },
      },
    },
    icon: {
      type: { summary: "text" },
      description:
        "This will be the icon shown, when not passed the alert icon will be the type icon.",
    },
    iconPosition: {
      type: { summary: "text" },
      control: "select",
      options: ["start", "center", "end"],
      table: {
        defaultValue: { summary: "start" },
      },
      description:
        "This will be the icon position shown, when not passed the alert icon will be the type icon.",
    },
    expandable: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
    },
    closable: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
    },
    hideIcon: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
    },
    default: {
      description:
        "If no message or title are passed, it slot will be display instead.",
    },
    actions: {
      description:
        "Actions slot will be displayed at the right side of the alert.",
    },
  },
} satisfies Meta<typeof Alert>;

type Story = StoryObj<typeof Alert>;
const defaultArgs = {
  title: "Demo Title",
  message:
    "Lorem ipsum dolor sit amet consectetur. Ultricies urna mattis purus maecenas amet hac viverra id feugiat. Et dui maecenas at dui. Sagittis phasellus a massa praesent ultricies.",
  type: "info",
  size: "medium",
  icon: "",
  iconPosition: "start",
  expandable: false,
  closable: false,
  hideIcon: false,
  showAlert: true,
};

const defaultHtml = `
  <Alert
    v-if="args.showAlert"
    id="alert"
    :title="args.title"
    :message="args.message"
    :type="args.type"
    :size="args.size"
    :icon="args.icon"
    :icon-position="args.iconPosition"
    :expandable="args.expandable"
    :closable="args.closable"
    :hide-icon="args.hideIcon"
    @close="args.showAlert = !args.showAlert; delay( ()=> {args.showAlert = !args.showAlert}, 2000)"
  />
`;

const defaultRender = (args: any) => ({
  components: { Alert },
  setup() {
    return { args };
  },
  methods: {
    delay(callback: any, timeout: any) {
      setTimeout(callback, timeout);
    },
  },
  template: defaultHtml,
});

export const Primary: Story = {
  render: defaultRender,
  args: defaultArgs,
};

export const Types: Story = {
  render: (args: any) => ({
    components: { Alert },
    setup() {
      return { args };
    },
    template: `
      <div class="flex gap-xs">
      ${["info", "success", "warning", "danger", "neutral"]
        .map((type) => {
          return defaultHtml.replaceAll("args.type", `'${type}'`);
        })
        .join("")}
      </div>
    `,
  }),
  args: {
    ...defaultArgs,
    message: "Lorem ipsum dolor sit amet dolor consectetur.",
  },
};

export const Sizes: Story = {
  render: (args: any) => ({
    components: { Alert },
    setup() {
      return { args };
    },
    template: `
      <div class="flex gap-xs">
        ${["small", "medium", "large"]
        .map((type) => {
          return defaultHtml.replaceAll("args.size", `'${type}'`);
        })
        .join("")}
      </div>
    `,
  }),
  args: defaultArgs,
};

export const IconPositions: Story = {
  render: (args: any) => ({
    components: { Alert },
    setup() {
      return { args };
    },
    template: `
      <div class="flex gap-xs">
      ${["start", "center", "end"]
        .map((type) => {
          return defaultHtml.replaceAll("args.iconPosition", `'${type}'`);
        })
        .join("")}
      </div>
    `,
  }),
  args: defaultArgs,
};

export const Expandable: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    expandable: true,
  },
};

export const Closable: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    closable: true,
  },
};

export const HideIcon: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    hideIcon: true,
  },
};
