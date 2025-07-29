#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const COMPONENT_CATEGORIES = {
  'Foundation': ['BIcon', 'BSpinner', 'BDivider'],
  'Form Controls': ['BInput', 'BSelect', 'BCheckbox', 'BRadio', 'BToggle', 'BSlider', 'BRangeSlider', 'BColorPicker', 'BDatePicker', 'BAutoComplete', 'BMultiSelect', 'BTagInput', 'BTagSelect'],
  'Buttons & Actions': ['BButton', 'BRoundButton', 'BRadioButton'],
  'Navigation': ['BNavbar', 'BBreadcrumb', 'BMenu', 'BSideMenu', 'BTab', 'BPagination'],
  'Layout & Containers': ['BCard', 'BCardIcon', 'BCollapse', 'BDialog', 'BDropdown', 'BExpandableContainer', 'BGroup', 'BSidebar', 'BContentScreen'],
  'Data Display': ['BTable', 'BProgressBar', 'BAvatar', 'BTag', 'BMetricCard', 'BActionCard', 'BProfile', 'BHistory'],
  'Feedback & Status': ['BAlert', 'BToast', 'BTooltip', 'BConfirm'],
  'Advanced Components': ['BCrop', 'BDate', 'BDateComparator', 'BDateComparatorFilter', 'BDateFilter', 'BFilter', 'BStepper', 'BStepOption', 'BSmartSelect', 'BSelectContainer', 'BRoundMenu']
};

function getCategoryForComponent(componentName) {
  for (const [category, components] of Object.entries(COMPONENT_CATEGORIES)) {
    if (components.includes(componentName)) {
      return category;
    }
  }
  return 'Uncategorized';
}

function generateStoryTemplate(componentName, category) {
  return `import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ${componentName} from "./${componentName}.vue";

const meta = {
  title: "${category}/${componentName}",
  component: ${componentName},
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: \`${componentName} component description. Update this with actual component details.

### Features
- Feature 1
- Feature 2
- Feature 3

### Usage
Describe when and how to use this component.\`,
      },
    },
  },
  argTypes: {
    // Add your component props here
    // Example:
    // label: {
    //   control: "text",
    //   description: "The label text",
    //   table: {
    //     type: { summary: "string" },
    //     defaultValue: { summary: "''" },
    //     category: "Props",
    //   },
    // },
  },
} satisfies Meta<typeof ${componentName}>;

export default meta;
type Story = StoryObj<typeof ${componentName}>;

// Base playground story
export const Playground: Story = {
  args: {
    // Add default args here
  },
  render: (args) => ({
    components: { ${componentName} },
    setup() {
      return { args };
    },
    template: \`
      <${componentName} v-bind="args">
        <!-- Add default content here -->
      </${componentName}>
    \`,
  }),
};

// Basic usage example
export const Basic: Story = {
  parameters: {
    docs: {
      description: {
        story: "Basic usage of ${componentName}.",
      },
    },
  },
  render: () => ({
    components: { ${componentName} },
    template: \`
      <${componentName}>
        Basic Example
      </${componentName}>
    \`,
  }),
};

// Add more stories as needed:
// export const Variants: Story = { ... };
// export const Sizes: Story = { ... };
// export const States: Story = { ... };
`;
}

function generateMDXTemplate(componentName) {
  return `import { Canvas, Meta, Controls } from '@storybook/blocks';
import * as ${componentName}Stories from './${componentName}.stories.ts';

<Meta of={${componentName}Stories} />

# ${componentName}

**${componentName}** is a [brief description of the component].

## Overview

<Canvas of={${componentName}Stories.Playground} />
<Controls of={${componentName}Stories.Playground} />

## Examples

### Basic Usage

<Canvas of={${componentName}Stories.Basic} />

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`prop1\` | \`string\` | \`'default'\` | Description of prop1 |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| \`@event1\` | \`string\` | Emitted when... |

### Slots

| Slot | Props | Description |
|------|-------|-------------|
| \`default\` | - | Main content slot |

## Accessibility

- **Keyboard Navigation**: [Describe keyboard support]
- **Screen Readers**: [Describe screen reader support]
- **Focus Management**: [Describe focus behavior]

## Related Components

- [Related Component](/?path=/docs/category-component--docs)
`;
}

function main() {
  const componentName = process.argv[2];
  
  if (!componentName) {
    console.error('Usage: node generate-story.js <ComponentName>');
    process.exit(1);
  }

  if (!componentName.startsWith('B')) {
    console.error('Component name should start with "B" (e.g., BButton)');
    process.exit(1);
  }

  const category = getCategoryForComponent(componentName);
  const componentDir = join(__dirname, '..', 'src', 'components', componentName);
  
  if (!existsSync(componentDir)) {
    console.error(\`Component directory doesn't exist: \${componentDir}\`);
    process.exit(1);
  }

  const storyPath = join(componentDir, \`\${componentName}.stories.ts\`);
  const mdxPath = join(componentDir, \`\${componentName}.mdx\`);

  // Generate story file
  if (!existsSync(storyPath)) {
    const storyContent = generateStoryTemplate(componentName, category);
    writeFileSync(storyPath, storyContent);
    console.log(\`✅ Generated story: \${storyPath}\`);
  } else {
    console.log(\`⚠️  Story already exists: \${storyPath}\`);
  }

  // Generate MDX file
  if (!existsSync(mdxPath)) {
    const mdxContent = generateMDXTemplate(componentName);
    writeFileSync(mdxPath, mdxContent);
    console.log(\`✅ Generated MDX: \${mdxPath}\`);
  } else {
    console.log(\`⚠️  MDX already exists: \${mdxPath}\`);
  }

  console.log(\`\n🎉 Story generation complete for \${componentName}\`);
  console.log(\`📁 Category: \${category}\`);
  console.log(\`\nNext steps:\`);
  console.log(\`1. Update the component description and features\`);
  console.log(\`2. Add proper argTypes for all props\`);
  console.log(\`3. Create meaningful story variants\`);
  console.log(\`4. Test accessibility with @storybook/addon-a11y\`);
}

main();