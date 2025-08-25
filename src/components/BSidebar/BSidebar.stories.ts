import type { Meta, StoryObj } from "@storybook/vue3";
import BSidebar from "./BSidebar.vue";

export default {
  component: BSidebar,
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
} satisfies Meta<typeof BSidebar>;

type Story = StoryObj<typeof BSidebar>;

const defaultArgs = {
  modelValue: false,
  width: "40%",
  noOutsideClose: false,
};

export const Primary: Story = {
  render: (args: any) => ({
    components: { BSidebar },
    setup() {
      return { args };
    },
    template: `
        <BButton  @click="args.modelValue = !args.modelValue">Show Sidebar</BButton>
        <BSidebar
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
                    <BButton variant="plain" @click="args.modelValue = false">Cancel</BButton>
                    <BButton>Save</BButton>
                </div>
            </div>
        </BSidebar>
        `,
  }),
  args: defaultArgs,
};

export const NoOutsideClose: Story = {
  render: (args: any) => ({
    components: { BSidebar },
    setup() {
      return { args };
    },
    template: `
        <BButton  @click="args.modelValue = !args.modelValue">Show Sidebar</BButton>
        <BSidebar
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
                    <BButton variant="plain" @click="args.modelValue = false">Cancel</BButton>
                    <BButton>Save</BButton>
                </div>
            </div>
        </BSidebar>
        `,
  }),
  args: {
    ...defaultArgs,
    noOutsideClose: true,
  },
};
