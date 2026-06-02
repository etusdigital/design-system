#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const components = [
  'Accordion', 'ActionCard', 'Alert', 'AutoComplete', 'Avatar', 'Badge',
  'Breadcrumb', 'Button', 'Calendar', 'Card', 'Carousel', 'Checkbox',
  'ColorPicker', 'Confirm', 'Connector', 'Crop', 'DatePicker', 'Dialog',
  'Drawer', 'Dropdown', 'FileUpload', 'Filter', 'FloatCard', 'History',
  'Icon', 'IconCard', 'Image', 'Input', 'MetricCard', 'Navbar', 'Pagination',
  'PINInput', 'Profile', 'ProgressBar', 'Radio', 'RadioGroup', 'RichTextEditor',
  'RoundMenu', 'Select', 'Separator', 'Sidebar', 'Skeleton', 'Slider',
  'Spinner', 'StatusBadge', 'Stepper', 'Switch', 'Tab', 'Table', 'TagInput',
  'TagSelect', 'Textarea', 'Toast', 'Toggle', 'ToggleGroup', 'Tooltip', 'Tree'
];

const baseDir = path.join(__dirname, '..', 'src', 'components');

for (const name of components) {
  const compDir = path.join(baseDir, name);

  // Create stub TSX file
  const tsxPath = path.join(compDir, `${name}.tsx`);
  const tsxContent = `// TODO: Migrate from ${name}.vue in Phase 2+
export function ${name}(props: Record<string, unknown>) {
  return <div data-component="${name}" {...props} />;
}
`;
  fs.writeFileSync(tsxPath, tsxContent, 'utf8');

  // Rewrite index.ts
  const indexPath = path.join(compDir, 'index.ts');
  const indexContent = `export { ${name} } from './${name}';\n`;
  fs.writeFileSync(indexPath, indexContent, 'utf8');

  console.log(`OK: ${name}`);
}

console.log(`\nDone: ${components.length} components processed.`);
