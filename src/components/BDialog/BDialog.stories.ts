import type { Meta, StoryObj } from "@storybook/vue3";
import BDialog from "./BDialog.vue";

export default {
  component: BDialog,
  tags: ["autodocs"],
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
    height: {
      type: { summary: "text" },
      table: {
        defaultValue: { summary: "fit-content" },
      },
      description: "Determine the dialog height.",
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
} satisfies Meta<typeof BDialog>;

type Story = StoryObj<typeof BDialog>;

const defaultArgs = {
  modelValue: false,
  width: "60%",
  height: "fit-content",
  noOutsideClose: false,
};

export const Primary: Story = {
  render: (args: any) => ({
    components: { BDialog },
    setup() {
      return { args };
    },
    template: `
        <BButton  @click="args.modelValue = !args.modelValue">Show Dialog</BButton>
        <BDialog
             v-model="args.modelValue"
             :width="args.width"
             :height="args.height"
             :no-outside-close="args.noOutsideClose"
        >
            <div class="flex flex-col p-xl gap-sm">
                <h2 class="font-bold text-lg">Dialog</h2>
                <p class="text-sm text-neutral-foreground-low">Lorem ipsum dolor sit amet consectetur. Ultricies urna mattis purus maecenas amet hac viverra id feugiat. Et dui maecenas at dui. Sagittis phasellus a massa praesent ultricies.</p>
                <div class="flex justify-end w-full gap-xs">
                    <BButton variant="plain" @click="args.modelValue = false">Cancel</BButton>
                    <BButton>Save</BButton>
                </div>
            </div>
        </BDialog>
        `,
  }),
  args: defaultArgs,
};
