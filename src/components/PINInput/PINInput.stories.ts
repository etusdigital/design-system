import type { Meta, StoryObj } from "@storybook/vue3";
import { ref } from "vue";
import PINInput from "./PINInput.vue";

export default {
  component: PINInput,
  argTypes: {
    modelValue: {
      type: { summary: "string" },
      description: "The current value of the PIN input.",
    },
    length: {
      type: { summary: "number" },
      description: "Number of input fields to display.",
      table: {
        defaultValue: { summary: "6" },
      },
    },
    disabled: {
      type: { summary: "boolean" },
      description: "Disables the PIN input fields.",
      table: {
        defaultValue: { summary: false },
      },
    },
    placeholder: {
      type: { summary: "string" },
      description: "Placeholder text for each input field.",
    },
    separator: {
      type: { summary: "string" },
      description: "Separator character between input fields.",
    },
    type: {
      type: { summary: "text" },
      control: "select",
      options: ["text", "password"],
      table: {
        defaultValue: { summary: "text" },
      },
      description: "Input field type.",
    },
    mask: {
      type: { summary: "boolean" },
      description: "Whether to mask the input values.",
      table: {
        defaultValue: { summary: false },
      },
    },
    otp: {
      type: { summary: "boolean" },
      description: "Whether this is an OTP input.",
      table: {
        defaultValue: { summary: false },
      },
    },
    "update:modelValue": {
      type: { summary: "function" },
      description: "Emitted when the PIN value changes.",
    },
    complete: {
      type: { summary: "function" },
      description: "Emitted when all PIN fields are filled.",
    },
  },
} satisfies Meta<typeof PINInput>;

type Story = StoryObj<typeof PINInput>;

const defaultArgs = {
  modelValue: "",
  length: 6,
  disabled: false,
  placeholder: "",
  separator: "",
  type: "text" as const,
  mask: false,
  otp: false,
};

export const Default: Story = {
  render: (args) => ({
    components: { PINInput },
    setup() {
      const value = ref(args.modelValue);
      return { args, value };
    },
    template: `
      <div class="space-y-4">
        <PINInput 
          v-model="value"
          :length="args.length"
          :disabled="args.disabled"
          :placeholder="args.placeholder"
          :separator="args.separator"
          :type="args.type"
          :mask="args.mask"
          :otp="args.otp"
          @complete="(val) => console.log('Complete:', val)"
        />
      </div>
    `,
  }),
  args: defaultArgs,
};

export const Controlled: Story = {
  render: () => ({
    components: { PINInput },
    setup() {
      const value = ref("123");
      return { value };
    },
    template: `
      <div class="space-y-4">
        <PINInput 
          v-model="value"
          :length="6"
          @complete="(val) => console.log('Complete:', val)"
        />
        <div class="flex gap-2">
          <button 
            @click="value = '123456'"
            class="px-3 py-1 bg-primary-default text-primary-foreground rounded text-sm"
          >
            Set to 123456
          </button>
          <button 
            @click="value = ''"
            class="px-3 py-1 bg-neutral-default text-neutral-foreground rounded text-sm"
          >
            Clear
          </button>
        </div>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: (args) => ({
    components: { PINInput },
    setup() {
      const value = ref("1234");
      return { args, value };
    },
    template: `
      <PINInput 
        v-model="value"
        :length="args.length"
        :disabled="true"
      />
    `,
  }),
  args: {
    ...defaultArgs,
    length: 4,
  },
};

export const WithSeparator: Story = {
  render: (args) => ({
    components: { PINInput },
    setup() {
      const value = ref("");
      return { args, value };
    },
    template: `
      <div class="space-y-4">
        <PINInput 
          v-model="value"
          :length="args.length"
          separator="-"
          @complete="(val) => console.log('Complete:', val)"
        />
      </div>
    `,
  }),
  args: {
    ...defaultArgs,
    length: 4,
  },
};

export const Password: Story = {
  render: (args) => ({
    components: { PINInput },
    setup() {
      const value = ref("");
      return { args, value };
    },
    template: `
      <div class="space-y-4">
        <PINInput 
          v-model="value"
          :length="args.length"
          type="password"
          @complete="(val) => console.log('Complete:', val)"
        />
      </div>
    `,
  }),
  args: {
    ...defaultArgs,
    length: 4,
  },
};

export const OTP: Story = {
  render: (args) => ({
    components: { PINInput },
    setup() {
      const otpValue = ref("");
      const isVerifying = ref(false);
      const isVerified = ref(false);
      
      const handleComplete = (value: string) => {
        console.log('OTP Complete:', value);
        isVerifying.value = true;
        
        // Simulate API call
        setTimeout(() => {
          isVerifying.value = false;
          isVerified.value = true;
        }, 1500);
      };
      
      return { otpValue, isVerifying, isVerified, handleComplete };
    },
    template: `
      <div class="max-w-md mx-auto text-center space-y-4">
        <div>
          <h3 class="text-lg font-semibold text-neutral-foreground-high">
            Enter verification code
          </h3>
          <p class="text-sm text-neutral-foreground-medium mt-1">
            We sent a verification code to your email
          </p>
        </div>
        
        <PINInput 
          v-model="otpValue"
          :length="6"
          :disabled="isVerifying || isVerified"
          otp
          @complete="handleComplete"
        />
        
        <div class="text-sm">
          <div v-if="isVerifying" class="text-primary-foreground-default">
            Verifying...
          </div>
          <div v-else-if="isVerified" class="text-success-foreground-default">
            ✓ Verified successfully!
          </div>
          <div v-else class="text-neutral-foreground-medium">
            Enter the 6-digit code
          </div>
        </div>
        
        <button 
          v-if="!isVerified"
          class="text-sm text-primary-foreground-default hover:text-primary-foreground-high underline"
          @click="console.log('Resend code')"
        >
          Didn't receive a code? Resend
        </button>
      </div>
    `,
  }),
  args: defaultArgs,
};

export const CustomLength: Story = {
  render: () => ({
    components: { PINInput },
    setup() {
      const value4 = ref("");
      const value8 = ref("");
      return { value4, value8 };
    },
    template: `
      <div class="space-y-6">
        <div class="space-y-2">
          <label class="text-sm font-medium text-neutral-foreground-high">
            4-digit PIN
          </label>
          <PINInput 
            v-model="value4"
            :length="4"
          />
        </div>
        
        <div class="space-y-2">
          <label class="text-sm font-medium text-neutral-foreground-high">
            8-digit PIN
          </label>
          <PINInput 
            v-model="value8"
            :length="8"
          />
        </div>
      </div>
    `,
  }),
};