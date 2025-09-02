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
      description: "Determine the drawer size (width for left/right positions, height for top/bottom positions).",
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
      options: ["right", "left", "top", "bottom"],
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

export const Primary: Story = {
  render: (args: any) => ({
    components: { Drawer },
    setup() {
      return { args };
    },
    template: `
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
        `,
  }),
  args: defaultArgs,
};

export const NoOutsideClose: Story = {
  render: (args: any) => ({
    components: { Drawer },
    setup() {
      return { args };
    },
    template: `
        <Button  @click="args.modelValue = !args.modelValue">Show Drawer</Button>
        <Drawer
             v-model="args.modelValue"
             :size="args.size"
             :no-outside-close="args.noOutsideClose"
             :position="args.position"
        >
            <div class="flex flex-col justify-between h-full p-xl">
                <div class="flex flex-col gap-sm">
                  <h2 class="font-bold text-lg">No Outside Close</h2>
                  <p class="text-sm text-neutral-foreground-low">Lorem ipsum dolor sit amet consectetur. Ultricies urna mattis purus maecenas amet hac viverra id feugiat. Et dui maecenas at dui. Sagittis phasellus a massa praesent ultricies.</p>
                </div>
                <div class="flex justify-end w-full gap-xs">
                    <Button variant="plain" @click="args.modelValue = false">Cancel</Button>
                    <Button>Save</Button>
                </div>
            </div>
        </Drawer>
        `,
  }),
  args: {
    ...defaultArgs,
    noOutsideClose: true,
  },
};

export const LeftPosition: Story = {
  render: (args: any) => ({
    components: { Drawer },
    setup() {
      return { args };
    },
    template: `
        <Button  @click="args.modelValue = !args.modelValue">Show Left Drawer</Button>
        <Drawer
             v-model="args.modelValue"
             :size="args.size"
             :no-outside-close="args.noOutsideClose"
             :position="args.position"
        >
            <div class="flex flex-col justify-between h-full p-xl">
                <div class="flex flex-col gap-sm">
                  <h2 class="font-bold text-lg">Left Drawer</h2>
                  <p class="text-sm text-neutral-foreground-low">This drawer slides from the left side of the screen.</p>
                </div>
                <div class="flex justify-end w-full gap-xs">
                    <Button variant="plain" @click="args.modelValue = false">Cancel</Button>
                    <Button>Save</Button>
                </div>
            </div>
        </Drawer>
        `,
  }),
  args: {
    ...defaultArgs,
    position: "left",
  },
};

export const TopPosition: Story = {
  render: (args: any) => ({
    components: { Drawer },
    setup() {
      return { args };
    },
    template: `
        <Button  @click="args.modelValue = !args.modelValue">Show Top Drawer</Button>
        <Drawer
             v-model="args.modelValue"
             :size="args.size"
             :no-outside-close="args.noOutsideClose"
             :position="args.position"
        >
            <div class="flex flex-col justify-between h-full p-xl">
                <div class="flex flex-col gap-sm">
                  <h2 class="font-bold text-lg">Top Drawer</h2>
                  <p class="text-sm text-neutral-foreground-low">This drawer slides from the top of the screen.</p>
                </div>
                <div class="flex justify-end w-full gap-xs">
                    <Button variant="plain" @click="args.modelValue = false">Cancel</Button>
                    <Button>Save</Button>
                </div>
            </div>
        </Drawer>
        `,
  }),
  args: {
    ...defaultArgs,
    position: "top",
    size: "50%",
  },
};

export const BottomPosition: Story = {
  render: (args: any) => ({
    components: { Drawer },
    setup() {
      return { args };
    },
    template: `
        <Button  @click="args.modelValue = !args.modelValue">Show Bottom Drawer</Button>
        <Drawer
             v-model="args.modelValue"
             :size="args.size"
             :no-outside-close="args.noOutsideClose"
             :position="args.position"
        >
            <div class="flex flex-col justify-between h-full p-xl">
                <div class="flex flex-col gap-sm">
                  <h2 class="font-bold text-lg">Bottom Drawer</h2>
                  <p class="text-sm text-neutral-foreground-low">This drawer slides from the bottom of the screen.</p>
                </div>
                <div class="flex justify-end w-full gap-xs">
                    <Button variant="plain" @click="args.modelValue = false">Cancel</Button>
                    <Button>Save</Button>
                </div>
            </div>
        </Drawer>
        `,
  }),
  args: {
    ...defaultArgs,
    position: "bottom",
    size: "60%",
  },
};
