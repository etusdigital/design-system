import type { Meta, StoryObj } from "@storybook/vue3";
import BFloatCard from "./BFloatCard.vue";

export default {
  component: BFloatCard,
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
} satisfies Meta<typeof BFloatCard>;

type Story = StoryObj<typeof BFloatCard>;

const defaultArgs = {
  modelValue: false,
  mode: "click" as const,
};

const defaultRender = (args: any) => ({
  components: { BFloatCard },
  setup() {
    return { args };
  },
  template: `
    <BFloatCard 
      v-model="args.modelValue"
      :mode="args.mode"
    >
      <b-button>Click to show card</b-button>
      
      <template #card>
        <div class="p-base">
          <h4 class="mb-xs">Floating Card</h4>
          <p class="text-sm">This is the content inside the floating card.</p>
        </div>
      </template>
    </BFloatCard>
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