import type { Meta, StoryObj } from "@storybook/vue3";
import { ref } from "vue";
import FloatCard from "./FloatCard.vue";

export default {
  component: FloatCard,
  argTypes: {
    modelValue: {
      description: "Controls the visibility state of the floating card.",
    },
    mode: {
      type: { name: "string" },
      control: "select",
      options: ["click", "hover"],
      table: {
        defaultValue: { summary: "click" },
      },
      description: "Interaction mode for showing/hiding the card.",
    },
    disabled: {
      type: { name: "boolean" },
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
      description: "Whether the floating card is disabled.",
    },
    manualFocus: {
      type: { name: "boolean" },
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
      description: "Doesn't move focus to the card when it opens in click mode.",
    },
  },
} satisfies Meta<typeof FloatCard>;

type Story = StoryObj<typeof FloatCard>;

const defaultArgs = {
  modelValue: false,
  mode: "click" as const,
  disabled: false,
};

const defaultRender = (args: any) => ({
  components: { FloatCard },
  setup() {
    return { args };
  },
  template: `
    <FloatCard 
      v-model="args.modelValue"
      :mode="args.mode"
      :disabled="args.disabled"
    >
      <Button>Click to show card</Button>
      
      <template #card>
        <div class="p-base">
          <h4 class="mb-xs">Floating Card</h4>
          <p class="text-sm">This is the content inside the floating card.</p>
        </div>
      </template>
    </FloatCard>
  `,
});

export const Primary: Story = {
  render: defaultRender,
  args: defaultArgs,
};

export const ClickMode: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    mode: "click" as const,
  },
};

export const ActionItems: Story = {
  render: (args: any) => ({
    components: { FloatCard },
    setup() {
      const dialog = ref(false);
      const lastAction = ref("");

      function openDialog() {
        args.modelValue = false;
        dialog.value = true;
      }

      function closeOnly() {
        args.modelValue = false;
        lastAction.value = "Closed without opening anything";
      }

      return { args, dialog, lastAction, openDialog, closeOnly };
    },
    template: `
      <FloatCard
        v-model="args.modelValue"
        :mode="args.mode"
        :disabled="args.disabled"
      >
        <Button>Actions</Button>

        <template #card>
          <div class="flex flex-col p-xxs">
            <Button variant="plain" color="neutral" @click="openDialog">Open dialog</Button>
            <Button variant="plain" color="neutral" @click="closeOnly">Close only</Button>
          </div>
        </template>
      </FloatCard>
      <p class="text-sm mt-sm">{{ lastAction }}</p>

      <Dialog v-model="dialog">
        <div class="flex flex-col gap-sm p-xl">
          <h4>Dialog opened from the card</h4>
          <Button @click="dialog = false">Close</Button>
        </div>
      </Dialog>
    `,
  }),
  args: defaultArgs,
};