import type { Meta, StoryObj } from "@storybook/vue3";
import Dialog from "./Dialog.vue";

export default {
  component: Dialog,
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
} satisfies Meta<typeof Dialog>;

type Story = StoryObj<typeof Dialog>;

const defaultArgs = {
  modelValue: false,
  width: "60%",
  height: "fit-content",
  noOutsideClose: false,
};

const defaultRender = (args: any) => ({
  components: { Dialog },
  setup() {
    return { args };
  },
  template: `
    <Button @click="args.modelValue = !args.modelValue">Show Dialog</Button>
    <Dialog
         v-model="args.modelValue"
         :width="args.width"
         :height="args.height"
         :no-outside-close="args.noOutsideClose"
    >
        <div class="flex flex-col p-xl gap-sm">
            <h2 class="font-bold text-lg">Dialog</h2>
            <p class="text-sm text-neutral-foreground-low">
              Lorem ipsum dolor sit amet consectetur. Ultricies urna mattis purus maecenas
              amet hac viverra id feugiat. Et dui maecenas at dui. Sagittis phasellus a
              massa praesent ultricies.
            </p>
            <div class="flex justify-end w-full gap-xs">
                <Button variant="plain" @click="args.modelValue = false">Cancel</Button>
                <Button @click="args.modelValue = false">Save</Button>
            </div>
        </div>
    </Dialog>
  `,
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
