#!/usr/bin/env node

/**
 * Storybook Story Improvement Generator
 * 
 * This script analyzes Vue components and generates improved Storybook stories
 * following modern best practices and standardized patterns.
 * 
 * Usage:
 *   node scripts/generate-improved-story.js ComponentName
 *   node scripts/generate-improved-story.js --analyze-all
 *   node scripts/generate-improved-story.js --help
 */

const fs = require('fs');
const path = require('path');

const COMPONENTS_DIR = 'src/components';
const STORY_TEMPLATE_PATH = 'scripts/story-templates/standard-story.template.ts';
const MDX_TEMPLATE_PATH = 'scripts/story-templates/component-docs.template.mdx';

// Component classification based on naming patterns
const COMPONENT_CATEGORIES = {
  'Form': ['Input', 'Select', 'Checkbox', 'Radio', 'Toggle', 'Slider', 'Date', 'Color', 'File'],
  'Navigation': ['Menu', 'Navbar', 'Breadcrumb', 'Tab', 'Pagination'],
  'Layout': ['Card', 'Divider', 'Container', 'Grid', 'Stack'],
  'Feedback': ['Alert', 'Toast', 'Dialog', 'Tooltip', 'Progress', 'Spinner'],
  'Display': ['Table', 'Tag', 'Avatar', 'Icon', 'Metric'],
  'Action': ['Button', 'RoundButton'],
  'Other': []
};

class ComponentAnalyzer {
  constructor(componentName) {
    this.componentName = componentName;
    this.componentPath = path.join(COMPONENTS_DIR, componentName);
    this.vueFilePath = path.join(this.componentPath, `${componentName}.vue`);
    this.storyFilePath = path.join(this.componentPath, `${componentName}.stories.ts`);
  }

  analyze() {
    if (!fs.existsSync(this.vueFilePath)) {
      throw new Error(`Component ${this.componentName} not found at ${this.vueFilePath}`);
    }

    const vueContent = fs.readFileSync(this.vueFilePath, 'utf8');
    const currentStoryContent = fs.existsSync(this.storyFilePath) 
      ? fs.readFileSync(this.storyFilePath, 'utf8') 
      : '';

    return {
      component: this.componentName,
      category: this.getCategory(),
      props: this.extractProps(vueContent),
      slots: this.extractSlots(vueContent),
      events: this.extractEvents(vueContent),
      currentStoryQuality: this.analyzeStoryQuality(currentStoryContent),
      hasDocumentation: fs.existsSync(path.join(this.componentPath, `${this.componentName}.mdx`)),
      recommendations: this.generateRecommendations(vueContent, currentStoryContent)
    };
  }

  getCategory() {
    for (const [category, patterns] of Object.entries(COMPONENT_CATEGORIES)) {
      if (patterns.some(pattern => this.componentName.includes(pattern))) {
        return category;
      }
    }
    return 'Other';
  }

  extractProps(vueContent) {
    const props = [];
    
    // Extract from defineProps or props object
    const propsMatch = vueContent.match(/defineProps[<(][\s\S]*?[>)]/g) || 
                      vueContent.match(/props:\s*{[\s\S]*?}/g);
    
    if (propsMatch) {
      // Basic prop extraction - could be enhanced with AST parsing
      const propContent = propsMatch[0];
      const propNames = propContent.match(/(\w+):/g) || [];
      
      propNames.forEach(prop => {
        const name = prop.replace(':', '');
        if (!['type', 'default', 'required', 'validator'].includes(name)) {
          props.push({
            name,
            type: this.inferPropType(propContent, name),
            required: propContent.includes(`${name}:`) && propContent.includes('required: true')
          });
        }
      });
    }
    
    return props;
  }

  extractSlots(vueContent) {
    const slots = [];
    const slotMatches = vueContent.match(/<slot[^>]*name="([^"]+)"/g) || [];
    const defaultSlot = vueContent.includes('<slot>') || vueContent.includes('<slot ');
    
    slotMatches.forEach(match => {
      const name = match.match(/name="([^"]+)"/)[1];
      slots.push({ name, description: `${name} slot content` });
    });
    
    if (defaultSlot) {
      slots.push({ name: 'default', description: 'Default slot content' });
    }
    
    return slots;
  }

  extractEvents(vueContent) {
    const events = [];
    const emitMatches = vueContent.match(/emit\(['"`]([^'"`]+)['"`]/g) || [];
    
    emitMatches.forEach(match => {
      const eventName = match.match(/emit\(['"`]([^'"`]+)['"`]/)[1];
      events.push({ name: eventName, description: `${eventName} event` });
    });
    
    return events;
  }

  analyzeStoryQuality(storyContent) {
    const metrics = {
      hasMultipleStories: (storyContent.match(/export const \w+: Story/g) || []).length > 1,
      hasArgTypes: storyContent.includes('argTypes'),
      hasDescriptions: storyContent.includes('description:'),
      hasControls: storyContent.includes('control:'),
      storyCount: (storyContent.match(/export const \w+: Story/g) || []).length,
      lineCount: storyContent.split('\n').length,
      quality: 'unknown'
    };

    // Calculate quality score
    let score = 0;
    if (metrics.hasMultipleStories) score += 2;
    if (metrics.hasArgTypes) score += 2;
    if (metrics.hasDescriptions) score += 2;
    if (metrics.hasControls) score += 1;
    if (metrics.storyCount >= 3) score += 2;
    if (metrics.lineCount >= 100) score += 1;

    if (score >= 8) metrics.quality = 'excellent';
    else if (score >= 5) metrics.quality = 'good';
    else if (score >= 3) metrics.quality = 'fair';
    else metrics.quality = 'poor';

    return metrics;
  }

  inferPropType(content, propName) {
    const typePattern = new RegExp(`${propName}:\\s*{[^}]*type:\\s*([^,}]+)`, 'i');
    const match = content.match(typePattern);
    
    if (match) {
      return match[1].trim();
    }
    
    // Default inference
    return 'String';
  }

  generateRecommendations(vueContent, storyContent) {
    const recommendations = [];
    
    if (!storyContent.includes('argTypes')) {
      recommendations.push('Add comprehensive argTypes with descriptions and controls');
    }
    
    if ((storyContent.match(/export const \w+: Story/g) || []).length < 3) {
      recommendations.push('Add more story variants (Basic, AllVariants, Sizes, States)');
    }
    
    if (!storyContent.includes('accessibility') && !storyContent.includes('a11y')) {
      recommendations.push('Add accessibility demonstration story');
    }
    
    if (!fs.existsSync(path.join(this.componentPath, `${this.componentName}.mdx`))) {
      recommendations.push('Create comprehensive MDX documentation');
    }
    
    return recommendations;
  }
}

class StoryGenerator {
  constructor(analysis) {
    this.analysis = analysis;
    this.templatePath = STORY_TEMPLATE_PATH;
    this.mdxTemplatePath = MDX_TEMPLATE_PATH;
  }

  generate() {
    const storyContent = this.generateStoryContent();
    const mdxContent = this.generateMDXContent();
    
    return {
      storyContent,
      mdxContent,
      outputPath: path.join(COMPONENTS_DIR, this.analysis.component, `${this.analysis.component}.stories.improved.ts`),
      mdxOutputPath: path.join(COMPONENTS_DIR, this.analysis.component, `${this.analysis.component}.improved.mdx`)
    };
  }

  generateStoryContent() {
    let template = fs.readFileSync(this.templatePath, 'utf8');
    
    // Replace template variables
    const replacements = {
      '{{COMPONENT_NAME}}': this.analysis.component,
      '{{CATEGORY}}': this.analysis.category,
      '{{COMPONENT_DESCRIPTION}}': this.generateDescription(),
      '{{ARG_TYPES}}': this.generateArgTypes(),
      '{{DEFAULT_ARGS}}': this.generateDefaultArgs(),
      '{{SLOT_CONTENT}}': this.generateSlotContent(),
      '{{BASIC_ARGS}}': this.generateBasicArgs(),
      '{{VARIANT_EXAMPLES}}': this.generateVariantExamples(),
      '{{SIZE_EXAMPLES}}': this.generateSizeExamples(),
      '{{STATE_EXAMPLES}}': this.generateStateExamples(),
      '{{A11Y_INSTRUCTIONS}}': this.generateA11yInstructions(),
      '{{A11Y_EXAMPLES}}': this.generateA11yExamples(),
      '{{INTERACTIVE_EXAMPLES}}': this.generateInteractiveExamples()
    };

    Object.entries(replacements).forEach(([placeholder, value]) => {
      template = template.replace(new RegExp(placeholder, 'g'), value);
    });

    return template;
  }

  generateMDXContent() {
    let template = fs.readFileSync(this.mdxTemplatePath, 'utf8');
    
    const replacements = {
      '{{COMPONENT_NAME}}': this.analysis.component,
      '{{COMPONENT_DESCRIPTION}}': this.generateDescription(),
      '{{USE_CASE_1}}': `Primary use case for ${this.analysis.component}`,
      '{{USE_CASE_2}}': `Secondary use case for ${this.analysis.component}`,
      '{{USE_CASE_3}}': `Additional use case for ${this.analysis.component}`,
      '{{AVOID_CASE_1}}': `When not to use ${this.analysis.component}`,
      '{{AVOID_CASE_2}}': `Alternative components to consider`,
      '{{KEYBOARD_SUPPORT}}': this.generateKeyboardSupport(),
      '{{SCREEN_READER_SUPPORT}}': 'Full screen reader compatibility with ARIA labels',
      '{{FOCUS_MANAGEMENT}}': 'Proper focus handling and visible focus indicators',
      // Add more replacements as needed
    };

    Object.entries(replacements).forEach(([placeholder, value]) => {
      template = template.replace(new RegExp(placeholder, 'g'), value);
    });

    return template;
  }

  generateDescription() {
    const category = this.analysis.category.toLowerCase();
    return `A ${category} component that provides ${this.analysis.component.toLowerCase()} functionality with modern design and accessibility features.`;
  }

  generateArgTypes() {
    return this.analysis.props.map(prop => {
      return `    ${prop.name}: {
      description: "${prop.name} property",
      control: { type: "${this.getControlType(prop.type)}" },
      table: {
        type: { summary: "${prop.type}" },
        defaultValue: { summary: "undefined" }
      }
    }`;
    }).join(',\n');
  }

  generateDefaultArgs() {
    return this.analysis.props.map(prop => {
      return `  ${prop.name}: ${this.getDefaultValue(prop.type)}`;
    }).join(',\n');
  }

  generateSlotContent() {
    const defaultSlot = this.analysis.slots.find(slot => slot.name === 'default');
    return defaultSlot ? `{{ args.content || 'Default content' }}` : '';
  }

  generateBasicArgs() {
    // Generate basic example args based on component type
    if (this.analysis.category === 'Form') {
      return 'label: "Example Label"';
    } else if (this.analysis.category === 'Action') {
      return 'variant: "primary"';
    }
    return '';
  }

  generateVariantExamples() {
    return `<${this.analysis.component} variant="primary">Primary</${this.analysis.component}>
        <${this.analysis.component} variant="secondary">Secondary</${this.analysis.component}>
        <${this.analysis.component} variant="tertiary">Tertiary</${this.analysis.component}>`;
  }

  generateSizeExamples() {
    return `<${this.analysis.component} size="small">Small</${this.analysis.component}>
        <${this.analysis.component} size="medium">Medium</${this.analysis.component}>
        <${this.analysis.component} size="large">Large</${this.analysis.component}>`;
  }

  generateStateExamples() {
    return `<${this.analysis.component}>Normal</${this.analysis.component}>
        <${this.analysis.component} disabled>Disabled</${this.analysis.component}>
        <${this.analysis.component} loading>Loading</${this.analysis.component}>`;
  }

  generateA11yInstructions() {
    return `Use Tab to navigate, Enter/Space to activate, Escape to close (if applicable)`;
  }

  generateA11yExamples() {
    return `<${this.analysis.component} aria-label="Accessible example">Accessible</${this.analysis.component}>`;
  }

  generateInteractiveExamples() {
    return `<${this.analysis.component} @click="handleClick">Interactive Example</${this.analysis.component}>`;
  }

  generateKeyboardSupport() {
    if (this.analysis.category === 'Form') {
      return 'Tab navigation, Enter to submit, Escape to clear';
    } else if (this.analysis.category === 'Action') {
      return 'Enter and Space to activate';
    }
    return 'Standard keyboard navigation support';
  }

  getControlType(propType) {
    const typeMap = {
      'String': 'text',
      'Number': 'number',
      'Boolean': 'boolean',
      'Array': 'object',
      'Object': 'object'
    };
    return typeMap[propType] || 'text';
  }

  getDefaultValue(propType) {
    const valueMap = {
      'String': '""',
      'Number': '0',
      'Boolean': 'false',
      'Array': '[]',
      'Object': '{}'
    };
    return valueMap[propType] || 'undefined';
  }
}

// CLI Functions
function analyzeAllComponents() {
  console.log('🔍 Analyzing all components...\n');
  
  const componentDirs = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(name => name.startsWith('B'));

  const results = [];
  
  componentDirs.forEach(componentName => {
    try {
      const analyzer = new ComponentAnalyzer(componentName);
      const analysis = analyzer.analyze();
      results.push(analysis);
      
      console.log(`✅ ${componentName}`);
      console.log(`   Category: ${analysis.category}`);
      console.log(`   Quality: ${analysis.currentStoryQuality.quality}`);
      console.log(`   Stories: ${analysis.currentStoryQuality.storyCount}`);
      console.log(`   Documentation: ${analysis.hasDocumentation ? '✅' : '❌'}`);
      console.log(`   Recommendations: ${analysis.recommendations.length}\n`);
      
    } catch (error) {
      console.log(`❌ ${componentName}: ${error.message}\n`);
    }
  });

  // Summary
  console.log('\n📊 SUMMARY');
  console.log('='.repeat(50));
  
  const byQuality = results.reduce((acc, r) => {
    acc[r.currentStoryQuality.quality] = (acc[r.currentStoryQuality.quality] || 0) + 1;
    return acc;
  }, {});
  
  const byCategory = results.reduce((acc, r) => {
    acc[r.category] = (acc[r.category] || 0) + 1;
    return acc;
  }, {});
  
  console.log('\nStory Quality Distribution:');
  Object.entries(byQuality).forEach(([quality, count]) => {
    console.log(`  ${quality}: ${count} components`);
  });
  
  console.log('\nComponent Categories:');
  Object.entries(byCategory).forEach(([category, count]) => {
    console.log(`  ${category}: ${count} components`);
  });
  
  const withDocs = results.filter(r => r.hasDocumentation).length;
  console.log(`\nDocumentation Coverage: ${withDocs}/${results.length} (${Math.round(withDocs/results.length*100)}%)`);
  
  console.log('\n🎯 PRIORITY IMPROVEMENTS:');
  const poorQuality = results.filter(r => r.currentStoryQuality.quality === 'poor');
  if (poorQuality.length > 0) {
    console.log('\nComponents needing immediate attention:');
    poorQuality.forEach(r => console.log(`  - ${r.component}`));
  }
}

function generateImprovedStory(componentName) {
  try {
    console.log(`🚀 Generating improved story for ${componentName}...\n`);
    
    const analyzer = new ComponentAnalyzer(componentName);
    const analysis = analyzer.analyze();
    
    console.log('📋 Analysis Results:');
    console.log(`   Category: ${analysis.category}`);
    console.log(`   Props: ${analysis.props.length}`);
    console.log(`   Slots: ${analysis.slots.length}`);
    console.log(`   Events: ${analysis.events.length}`);
    console.log(`   Current Quality: ${analysis.currentStoryQuality.quality}`);
    console.log(`   Recommendations: ${analysis.recommendations.length}\n`);
    
    if (analysis.recommendations.length > 0) {
      console.log('💡 Recommendations:');
      analysis.recommendations.forEach(rec => console.log(`   - ${rec}`));
      console.log();
    }
    
    const generator = new StoryGenerator(analysis);
    const generated = generator.generate();
    
    // Write improved story
    fs.writeFileSync(generated.outputPath, generated.storyContent);
    console.log(`✅ Generated improved story: ${generated.outputPath}`);
    
    // Write MDX documentation
    fs.writeFileSync(generated.mdxOutputPath, generated.mdxContent);
    console.log(`✅ Generated MDX documentation: ${generated.mdxOutputPath}`);
    
    console.log('\n🎉 Story improvement complete!');
    console.log('\nNext steps:');
    console.log('1. Review the generated files');
    console.log('2. Customize content as needed');
    console.log('3. Replace original files when satisfied');
    console.log('4. Test in Storybook');
    
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
}

function showHelp() {
  console.log(`
🎨 Storybook Story Improvement Generator

Usage:
  node scripts/generate-improved-story.js <ComponentName>
  node scripts/generate-improved-story.js --analyze-all
  node scripts/generate-improved-story.js --help

Commands:
  <ComponentName>  Generate improved story for specific component (e.g., BCard)
  --analyze-all    Analyze all components and show quality report
  --help          Show this help message

Examples:
  node scripts/generate-improved-story.js BCard
  node scripts/generate-improved-story.js BButton
  node scripts/generate-improved-story.js --analyze-all

This tool will create:
  - ComponentName.stories.improved.ts (standardized story file)
  - ComponentName.improved.mdx (comprehensive documentation)
`);
}

// Main CLI Logic
function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args.includes('--help')) {
    showHelp();
    return;
  }
  
  if (args.includes('--analyze-all')) {
    analyzeAllComponents();
    return;
  }
  
  const componentName = args[0];
  if (!componentName.startsWith('B')) {
    console.error('❌ Component name should start with "B" (e.g., BCard)');
    process.exit(1);
  }
  
  generateImprovedStory(componentName);
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { ComponentAnalyzer, StoryGenerator };