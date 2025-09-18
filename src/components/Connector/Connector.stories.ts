import type { Meta, StoryObj } from "@storybook/vue3";
import Connector from "./Connector.vue";

export default {
  component: Connector,
  argTypes: {
    vertical: {
      type: { name: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
} satisfies Meta<typeof Connector>;

type Story = StoryObj<typeof Connector>;

export const Primary: Story = {
  render: (args: any) => ({
    components: { Connector },
    setup() {
      return { args };
    },
    template:
      `<Connector v-model="args.modelValue" :vertical="args.vertical" :disabled="args.disabled" class="items-center">
        <Card class="p-base">
          <Connector>
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
          </Connector>
        </Card>
        <Button variant="success" size="small" round />
      </Connector>`,
  }),
  args: {
    vertical: true,
  },
};
