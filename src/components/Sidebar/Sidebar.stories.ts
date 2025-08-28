import type { Meta, StoryObj } from "@storybook/vue3";
import Sidebar from "./Sidebar.vue";

export default {
  component: Sidebar,
  argTypes: {
    modelValue: {
      type: { summary: "boolean" },
      description: "Determine if the dialog is displayed or not.",
    },
    width: {
      type: { summary: "text" },
      table: {
        defaultValue: { summary: "fit-content" },
      },
      description: "Determine the dialog width.",
    },
    noOutsideClose: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description:
        "Determine if the dialog will not close when the user click outside it.",
    },
    default: {
      description: "This slot will be the dialog content.",
    },
  },
} satisfies Meta<typeof Sidebar>;

type Story = StoryObj<typeof Sidebar>;

const defaultArgs = {
  modelValue: false,
  width: "40%",
  noOutsideClose: false,
};

export const Primary: Story = {
  render: (args: any) => ({
    components: { Sidebar },
    setup() {
      return { args };
    },
    template: `
        <Button  @click="args.modelValue = !args.modelValue">Show Sidebar</Button>
        <Sidebar
             v-model="args.modelValue"
             :width="args.width"
             :no-outside-close="args.noOutsideClose"
        >
            <div class="flex flex-col justify-between h-full p-xl">
                <div class="flex flex-col gap-sm">
                  <h2 class="font-bold text-lg">Sidebar</h2>
                  <p class="text-sm text-neutral-foreground-low">Lorem ipsum dolor sit amet consectetur. Ultricies urna mattis purus maecenas amet hac viverra id feugiat. Et dui maecenas at dui. Sagittis phasellus a massa praesent ultricies.</p>
                </div>
                <div class="flex justify-end w-full gap-xs">
                    <Button variant="plain" @click="args.modelValue = false">Cancel</Button>
                    <Button>Save</Button>
                </div>
            </div>
        </Sidebar>
        `,
  }),
  args: defaultArgs,
};

export const NoOutsideClose: Story = {
  render: (args: any) => ({
    components: { Sidebar },
    setup() {
      return { args };
    },
    template: `
        <Button  @click="args.modelValue = !args.modelValue">Show Sidebar</Button>
        <Sidebar
             v-model="args.modelValue"
             :width="args.width"
             :no-outside-close="args.noOutsideClose"
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
        </Sidebar>
        `,
  }),
  args: {
    ...defaultArgs,
    noOutsideClose: true,
  },
};
