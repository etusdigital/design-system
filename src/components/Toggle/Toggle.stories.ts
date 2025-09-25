import type { Meta, StoryObj } from "@storybook/vue3";
import Toggle from "./Toggle.vue";

export default {
  component: Toggle,
  argTypes: {
    modelValue: {
      type: { name: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
    },
    groupValue: {
      description: "Used by the Group component.",
      type: { name: "other", value: "any" },
      table: {
        defaultValue: { summary: "null" },
      },
    },
    disabled: {
      type: { name: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
    },
    type: {
      control: "select",
      options: ["default", "secondary"],
      table: {
        defaultValue: { summary: "default" },
      },
    },
    default: {
      description: "This slot will be content inside the toggle.",
    },
  },
} satisfies Meta<typeof Toggle>;

type Story = StoryObj<typeof Toggle>;

const defaultArgs = {
  modelValue: false,
  groupValue: null,
  disabled: false,
  type: "default" as const,
};

const defaultHtml = `
  <Toggle 
    v-model="args.modelValue" 
    name="test" 
    :group-value="args.groupValue" 
    :disabled="args.disabled" 
    :type="args.type"
  >
    Test toggle
  </Toggle>
`;

const defaultRender = (args: any) => ({
  components: { Toggle },
  setup() {
    return { args };
  },
  template: defaultHtml,
});

export const Primary: Story = {
  render: defaultRender,
  args: defaultArgs,
};

export const Disabled: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true,
  },
};

export const Types: Story = {
  render: (args: any) => ({
    components: { Toggle },
    setup() {
      return { args };
    },
    template: `
      <div class="flex gap-xs">
          ${["default", "secondary"]
            .map(
              (type) => `
            ${defaultHtml.replace(/args\.type/g, `'${type}'`)}
          `
            )
            .join("")}
      </div>
    `,
  }),
  args: defaultArgs,
};
