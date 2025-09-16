import type { Meta, StoryObj } from "@storybook/vue3";
import Conector from "./Conector.vue";

export default {
  component: Conector,
  argTypes: {
    vertical: {
      type: { name: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
} satisfies Meta<typeof Conector>;

type Story = StoryObj<typeof Conector>;

export const Primary: Story = {
  render: (args: any) => ({
    components: { Conector },
    setup() {
      return { args };
    },
    template:
      `<Conector v-model="args.modelValue" :vertical="args.vertical" :disabled="args.disabled" class="items-center">
        <Card class="p-base">
          <Conector>
              <Input label-value="label" placeholder="Type here" />
              <Select
                  label-value="label"
                  :options="[
                      { label: 'Option 1', value: 0 },
                      { label: 'Option 2', value: 1 },
                      { label: 'Option 3', value: 2 },
                      { label: 'Option 4', value: 3 },
                      { label: 'Option 5', value: 4 },
                  ]"
                  absolute
              >
                  Select
              </Select>
              <Input label-value="label" placeholder="Type here" />
          </Conector>
        </Card>
        <Button variant="success" size="small" round />
      </Conector>`,
  }),
  args: {
    vertical: true,
  },
};
