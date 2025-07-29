import type { Meta, StoryObj } from "@storybook/vue3-vite";
import BCard from "./BCard.vue";

// Improved BCard story following modern Storybook standards
// Generated with comprehensive story patterns and accessibility focus

const meta = {
  title: "Layout/BCard",
  component: BCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "A layout component that provides card functionality with modern design and accessibility features. Perfect for grouping related content with consistent spacing and visual hierarchy."
      }
    },
    layout: "centered",
  },
  argTypes: {
    className: {
      description: "Additional CSS classes to apply to the card",
      control: { type: "text" },
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" }
      }
    },
    default: {
      description: "Default slot for card content",
      table: {
        type: { summary: "VNode | string" }
      }
    }
  },
} satisfies Meta<typeof BCard>;

export default meta;
type Story = StoryObj<typeof BCard>;

// Default args for consistency
const defaultArgs = {
  className: "",
  variant: "default" as const,
  padding: "md" as const,
  interactive: false,
  disabled: false
};

// Standard render function
const standardRender = (args: any) => ({
  components: { BCard },
  setup() {
    return { args };
  },
  template: `
    <BCard 
      :class="args.className" 
      :variant="args.variant"
      :padding="args.padding"
      :interactive="args.interactive"
      :disabled="args.disabled"
    >
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Card Title</h3>
        <p class="text-neutral-foreground-medium">
          This is example content inside the card component. Cards are perfect for grouping related information and actions.
        </p>
        <div class="flex gap-2">
          <BButton size="small" color="primary">Primary Action</BButton>
          <BButton size="small" variant="secondary">Secondary</BButton>
        </div>
      </div>
    </BCard>
  `,
});

// 1. Playground Story - Interactive controls for all props
export const Playground: Story = {
  render: standardRender,
  args: defaultArgs,
  parameters: {
    docs: {
      description: {
        story: "Interactive playground to test all card props and configurations. Modify the controls to see how different settings affect the card appearance and behavior."
      }
    }
  }
};

// 2. Basic Story - Simple usage example
export const Basic: Story = {
  render: () => ({
    components: { BCard },
    template: `
      <BCard class="w-80">
        <div class="space-y-3">
          <h4 class="font-medium">Simple Card</h4>
          <p class="text-sm text-neutral-foreground-medium">
            A basic card with default styling and content.
          </p>
        </div>
      </BCard>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "Basic usage example with default configuration. This is the most common way to use the card component."
      }
    }
  }
};

// 3. All Variants - Show all visual variants
export const AllVariants: Story = {
  render: () => ({
    components: { BCard },
    template: `
      <div class="grid grid-cols-2 gap-4 w-full max-w-4xl">
        <BCard variant="default" class="p-4">
          <h4 class="font-medium mb-2">Default</h4>
          <p class="text-sm text-neutral-foreground-medium">Standard card with subtle shadow</p>
        </BCard>
        
        <BCard variant="elevated" class="p-4">
          <h4 class="font-medium mb-2">Elevated</h4>
          <p class="text-sm text-neutral-foreground-medium">Card with prominent shadow</p>
        </BCard>
        
        <BCard variant="outlined" class="p-4">
          <h4 class="font-medium mb-2">Outlined</h4>
          <p class="text-sm text-neutral-foreground-medium">Card with border, no shadow</p>
        </BCard>
        
        <BCard variant="flat" class="p-4">
          <h4 class="font-medium mb-2">Flat</h4>
          <p class="text-sm text-neutral-foreground-medium">Minimal card with background only</p>
        </BCard>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "All available visual variants of the card component. Each variant serves different design needs and visual hierarchies."
      }
    }
  }
};

// 4. Padding Options - All padding sizes
export const PaddingOptions: Story = {
  render: () => ({
    components: { BCard },
    template: `
      <div class="space-y-4">
        <BCard padding="none" class="w-80 border">
          <div class="bg-blue-50 p-2">
            <h4 class="font-medium">None</h4>
            <p class="text-sm">No internal padding</p>
          </div>
        </BCard>
        
        <BCard padding="xs" class="w-80">
          <h4 class="font-medium">Extra Small</h4>
          <p class="text-sm">Minimal padding</p>
        </BCard>
        
        <BCard padding="sm" class="w-80">
          <h4 class="font-medium">Small</h4>
          <p class="text-sm">Compact padding</p>
        </BCard>
        
        <BCard padding="md" class="w-80">
          <h4 class="font-medium">Medium (Default)</h4>
          <p class="text-sm">Standard padding</p>
        </BCard>
        
        <BCard padding="lg" class="w-80">
          <h4 class="font-medium">Large</h4>
          <p class="text-sm">Generous padding</p>
        </BCard>
        
        <BCard padding="xl" class="w-80">
          <h4 class="font-medium">Extra Large</h4>
          <p class="text-sm">Maximum padding</p>
        </BCard>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "Available padding options for the card component. Choose based on content density and visual needs."
      }
    }
  }
};

// 5. States - Interactive states
export const States: Story = {
  render: () => ({
    components: { BCard },
    setup() {
      const handleClick = () => alert('Card clicked!');
      return { handleClick };
    },
    template: `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BCard class="p-4">
          <h4 class="font-medium mb-2">Normal</h4>
          <p class="text-sm text-neutral-foreground-medium">Standard card state</p>
        </BCard>
        
        <BCard interactive class="p-4 cursor-pointer" @click="handleClick">
          <h4 class="font-medium mb-2">Interactive</h4>
          <p class="text-sm text-neutral-foreground-medium">Clickable with hover effects</p>
        </BCard>
        
        <BCard disabled class="p-4">
          <h4 class="font-medium mb-2">Disabled</h4>
          <p class="text-sm text-neutral-foreground-low">Disabled state</p>
        </BCard>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "Different interactive states of the card component. Interactive cards provide visual feedback on hover and focus."
      }
    }
  }
};

// 6. Accessibility - A11y demonstrations
export const Accessibility: Story = {
  render: () => ({
    components: { BCard },
    setup() {
      const handleCardAction = () => {
        alert('Card action performed!');
      };
      
      return { handleCardAction };
    },
    template: `
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold mb-4">Keyboard Navigation</h3>
          <p class="text-sm text-neutral-foreground-medium mb-4">
            Interactive cards are keyboard accessible. Use Tab to focus and Enter/Space to activate.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BCard 
            interactive 
            class="p-4 focus:ring-2 focus:ring-primary-500 focus:outline-none"
            role="button"
            tabindex="0"
            aria-label="Interactive card with user profile information"
            @click="handleCardAction"
            @keydown.enter="handleCardAction"
            @keydown.space.prevent="handleCardAction"
          >
            <h4 class="font-medium mb-2">Accessible Interactive Card</h4>
            <p class="text-sm text-neutral-foreground-medium">
              This card is fully keyboard accessible with proper ARIA labels and role.
            </p>
          </BCard>
          
          <BCard class="p-4" role="article" aria-labelledby="info-title">
            <h4 id="info-title" class="font-medium mb-2">Information Card</h4>
            <p class="text-sm text-neutral-foreground-medium">
              Non-interactive card with semantic markup for screen readers.
            </p>
          </BCard>
        </div>
        
        <div class="bg-neutral-surface-highlight p-4 rounded-lg">
          <h4 class="font-medium mb-2">Accessibility Features</h4>
          <ul class="text-sm space-y-1 text-neutral-foreground-medium">
            <li>• Proper semantic roles (button, article, etc.)</li>
            <li>• Keyboard navigation support</li>
            <li>• Focus indicators</li>
            <li>• ARIA labels for context</li>
            <li>• Screen reader compatibility</li>
          </ul>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "Accessibility features and keyboard navigation examples. Shows proper ARIA usage and keyboard interaction patterns."
      }
    }
  }
};

// 7. Interactive - Real-world examples
export const RealWorldExamples: Story = {
  render: () => ({
    components: { BCard },
    setup() {
      const users = [
        { name: 'Alice Johnson', email: 'alice@example.com', role: 'Designer', avatar: '👩‍🎨' },
        { name: 'Bob Smith', email: 'bob@example.com', role: 'Developer', avatar: '👨‍💻' },
        { name: 'Carol White', email: 'carol@example.com', role: 'Manager', avatar: '👩‍💼' }
      ];
      
      const products = [
        { name: 'Pro Plan', price: '$29/mo', features: ['Unlimited projects', '50GB storage', 'Priority support'] },
        { name: 'Team Plan', price: '$99/mo', features: ['Everything in Pro', 'Team collaboration', '500GB storage'] }
      ];
      
      return { users, products };
    },
    template: `
      <div class="space-y-8">
        <div>
          <h3 class="text-lg font-semibold mb-4">User Profile Cards</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <BCard 
              v-for="user in users" 
              :key="user.email"
              interactive
              variant="outlined"
              class="p-4 transition-all hover:shadow-md"
            >
              <div class="flex items-center space-x-3">
                <div class="text-2xl">{{ user.avatar }}</div>
                <div>
                  <h4 class="font-medium">{{ user.name }}</h4>
                  <p class="text-sm text-neutral-foreground-medium">{{ user.role }}</p>
                  <p class="text-xs text-neutral-foreground-low">{{ user.email }}</p>
                </div>
              </div>
            </BCard>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Pricing Cards</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BCard 
              v-for="product in products" 
              :key="product.name"
              variant="elevated"
              class="p-6"
            >
              <div class="text-center space-y-4">
                <h4 class="text-xl font-semibold">{{ product.name }}</h4>
                <div class="text-3xl font-bold text-primary-600">{{ product.price }}</div>
                <ul class="space-y-2 text-sm">
                  <li v-for="feature in product.features" :key="feature" class="flex items-center">
                    <span class="text-green-500 mr-2">✓</span>
                    {{ feature }}
                  </li>
                </ul>
                <BButton class="w-full" color="primary">Get Started</BButton>
              </div>
            </BCard>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Dashboard Stats</h3>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <BCard class="p-4 text-center">
              <div class="text-2xl font-bold text-blue-600">1,234</div>
              <div class="text-sm text-neutral-foreground-medium">Total Users</div>
            </BCard>
            <BCard class="p-4 text-center">
              <div class="text-2xl font-bold text-green-600">$12,345</div>
              <div class="text-sm text-neutral-foreground-medium">Revenue</div>
            </BCard>
            <BCard class="p-4 text-center">
              <div class="text-2xl font-bold text-purple-600">98.5%</div>
              <div class="text-sm text-neutral-foreground-medium">Uptime</div>
            </BCard>
            <BCard class="p-4 text-center">
              <div class="text-2xl font-bold text-orange-600">456</div>
              <div class="text-sm text-neutral-foreground-medium">Projects</div>
            </BCard>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "Real-world usage examples showing cards in common UI patterns like user profiles, pricing tables, and dashboard statistics."
      }
    }
  }
};