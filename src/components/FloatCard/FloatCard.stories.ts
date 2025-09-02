import type { Meta, StoryObj } from "@storybook/vue3";
import FloatCard from "./FloatCard.vue";

export default {
  component: FloatCard,
  argTypes: {
    modelValue: {
      description: "Controls the visibility state of the floating card.",
    },
    mode: {
      type: { summary: "text" },
      control: "select",
      options: ["click", "hover"],
      table: {
        defaultValue: { summary: "click" },
      },
      description: "Interaction mode for showing/hiding the card.",
    },
  },
} satisfies Meta<typeof FloatCard>;

type Story = StoryObj<typeof FloatCard>;

const defaultArgs = {
  modelValue: false,
  mode: "click" as const,
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