import type { Meta, StoryObj } from "@storybook/vue3";
import Drawer from "./Drawer.vue";

export default {
  component: Drawer,
  argTypes: {
    modelValue: {
      control: { type: "boolean" },
      description: "Determine if the dialog is displayed or not.",
    },
    size: {
      control: { type: "text" },
      table: {
        defaultValue: { summary: "fit-content" },
      },
      description:
        "Determine the drawer size (width for left/right positions, height for top/bottom positions).",
    },
    noOutsideClose: {
      control: { type: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
      description:
        "Determine if the dialog will not close when the user click outside it.",
    },
    position: {
      control: { type: "select" },
      options: ["top", "bottom", "left", "right"],
      table: {
        defaultValue: { summary: "right" },
      },
      description: "Position where the drawer will slide from.",
    },
    default: {
      description: "This slot will be the dialog content.",
    },
  },
} satisfies Meta<typeof Drawer>;

type Story = StoryObj<typeof Drawer>;

const defaultArgs = {
  modelValue: false,
  size: "40%",
  noOutsideClose: false,
  position: "right" as const,
};

const defaultHtml = `
  <Button  @click="args.modelValue = !args.modelValue">Show Drawer</Button>
  <Drawer
        v-model="args.modelValue"
        :size="args.size"
        :no-outside-close="args.noOutsideClose"
        :position="args.position"
  >
      <div class="flex flex-col justify-between h-full p-xl">
          <div class="flex flex-col gap-sm">
            <h2 class="font-bold text-lg">Drawer</h2>
            <p class="text-sm text-neutral-foreground-low">Lorem ipsum dolor sit amet consectetur. Ultricies urna mattis purus maecenas amet hac viverra id feugiat. Et dui maecenas at dui. Sagittis phasellus a massa praesent ultricies.</p>
          </div>
          <div class="flex justify-end w-full gap-xs">
              <Button variant="plain" @click="args.modelValue = false">Cancel</Button>
              <Button>Save</Button>
          </div>
      </div>
  </Drawer>
  `;

const defaultRender = (args: any) => ({
  components: { Drawer },
  setup() {
    return { args };
  },
  template: defaultHtml,
});

export const Primary: Story = {
  render: defaultRender,
  args: defaultArgs,
};

export const NoOutsideClose: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    noOutsideClose: true,
  },
};

export const Positions: Story = {
  render: (args: any) => ({
    components: { Drawer },
    setup() {
      return { args };
    },
    template: `<div class="flex gap-xxs">
    ${["left", "right", "top", "bottom"]
      .map((position) => {
        return `<Button  @click="() => { args.position = '${position}'; args.modelValue = !args.modelValue }">Show ${position} Drawer</Button>`;
      })
      .join("")}</div>
    ${defaultHtml.replace(/<Button  @click="args\.modelValue = !args\.modelValue">Show Drawer<\/Button>/g, "")}`,
  }),
  args: {
    ...defaultArgs,
    position: "left",
  },
};
