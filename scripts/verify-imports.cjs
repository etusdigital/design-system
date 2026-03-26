#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const libDir = path.resolve(__dirname, '..', 'lib');
let failures = 0;

function check(description, condition) {
  if (condition) {
    console.log(`  PASS: ${description}`);
  } else {
    console.error(`  FAIL: ${description}`);
    failures++;
  }
}

console.log('\n=== Import Verification ===\n');

// 1. Main bundles exist
console.log('Main bundles:');
check('ES module bundle exists', fs.existsSync(path.join(libDir, 'design-system.es.js')));
check('CJS bundle exists', fs.existsSync(path.join(libDir, 'design-system.cjs.js')));
check('UMD bundle exists', fs.existsSync(path.join(libDir, 'design-system.umd.js')));

// 2. CSS output
console.log('\nCSS output:');
check('index.css exists', fs.existsSync(path.join(libDir, 'index.css')));
const css = fs.existsSync(path.join(libDir, 'index.css'))
  ? fs.readFileSync(path.join(libDir, 'index.css'), 'utf8')
  : '';
check('index.css is non-empty', css.length > 0);

// 3. Type declarations
console.log('\nType declarations:');
check('main.d.ts exists', fs.existsSync(path.join(libDir, 'main.d.ts')));
// index.d.ts may or may not exist depending on dts plugin entry naming;
// the canonical types entry point is main.d.ts (as set in package.json types field)
check('components/Button/index.d.ts exists (per-component types)', fs.existsSync(path.join(libDir, 'components', 'Button', 'index.d.ts')));

// 4. Tailwind config
console.log('\nTailwind config:');
check('tailwind.config.cjs exists', fs.existsSync(path.join(libDir, 'tailwind.config.cjs')));

// 5. Per-component deep imports (spot check)
console.log('\nPer-component deep imports (spot check):');
const spotCheckComponents = ['Button', 'Input', 'Select', 'Table', 'Dialog'];
for (const comp of spotCheckComponents) {
  const compDir = path.join(libDir, 'components', comp);
  check(`${comp}/index.es.js exists`, fs.existsSync(path.join(compDir, 'index.es.js')));
  check(`${comp}/index.cjs.js exists`, fs.existsSync(path.join(compDir, 'index.cjs.js')));
  check(`${comp}/index.d.ts exists`, fs.existsSync(path.join(compDir, 'index.d.ts')));
}

// 6. Hook deep imports (spot check)
console.log('\nHook deep imports (spot check):');
check('useControllable.es.js exists', fs.existsSync(path.join(libDir, 'hooks', 'useControllable.es.js')));
check('useControllable.d.ts exists', fs.existsSync(path.join(libDir, 'hooks', 'useControllable.d.ts')));

// 7. CJS bundle content check (package is "type":"module" so .cjs.js files are ESM-type;
//    verify the bundle exists and has CJS-syntax content instead of direct require())
console.log('\nCJS bundle content check:');
const cjsPath = path.join(libDir, 'design-system.cjs.js');
if (fs.existsSync(cjsPath)) {
  const cjsContent = fs.readFileSync(cjsPath, 'utf8');
  check('CJS main bundle has content', cjsContent.length > 0);
  check('CJS bundle uses require() syntax', cjsContent.includes('require('));
} else {
  check('CJS main bundle exists', false);
  check('CJS bundle uses require() syntax', false);
}

// 8. No Vue dependencies in package.json
console.log('\nVue dependency check:');
const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'package.json'), 'utf8'));
const allDeps = { ...pkg.dependencies, ...pkg.devDependencies, ...pkg.peerDependencies };
check('No "vue" in any dependency field', !allDeps.vue);
check('No "vue-tsc" in any dependency field', !allDeps['vue-tsc']);
check('No "@vitejs/plugin-vue" in any dependency field', !allDeps['@vitejs/plugin-vue']);
check('react not in dependencies (peerDeps only)', !pkg.dependencies?.react);
check('Version is 2.0.2', pkg.version === '2.0.2');

// 9. Type Declaration Checks
console.log('\n--- Type Declaration Checks ---');
let dtsErrors = 0;

// Check main.d.ts has real re-exports
const mainDtsPath = path.join(libDir, 'main.d.ts');
if (fs.existsSync(mainDtsPath)) {
  const mainDts = fs.readFileSync(mainDtsPath, 'utf-8');
  if (!mainDts.includes('export')) {
    console.error('  FAIL: lib/main.d.ts has no exports');
    dtsErrors++;
  } else {
    console.log('  PASS: lib/main.d.ts has exports');
  }
} else {
  console.error('  FAIL: lib/main.d.ts does not exist');
  dtsErrors++;
}

// Spot-check per-component .d.ts files have real content (not just "export {}")
const dtsSpotCheckComponents = ['Button', 'Input', 'Select', 'Dialog', 'Table'];
for (const comp of dtsSpotCheckComponents) {
  const dtsPath = path.join(libDir, 'components', comp, 'index.d.ts');
  if (!fs.existsSync(dtsPath)) {
    console.error(`  FAIL: ${dtsPath} does not exist`);
    dtsErrors++;
    continue;
  }
  const content = fs.readFileSync(dtsPath, 'utf-8');
  if (content.trim() === 'export {}' || content.length < 20) {
    console.error(`  FAIL: lib/components/${comp}/index.d.ts is empty stub (${content.length} bytes)`);
    dtsErrors++;
  } else if (!content.includes(comp)) {
    console.error(`  FAIL: lib/components/${comp}/index.d.ts does not contain '${comp}'`);
    dtsErrors++;
  } else {
    console.log(`  PASS: lib/components/${comp}/index.d.ts has real types (${content.length} bytes)`);
  }
}

// Check hook .d.ts
const hookDtsPath = path.join(libDir, 'hooks', 'useControllable.d.ts');
if (fs.existsSync(hookDtsPath)) {
  const hookContent = fs.readFileSync(hookDtsPath, 'utf-8');
  if (hookContent.trim() === 'export {}' || hookContent.length < 20) {
    console.error(`  FAIL: lib/hooks/useControllable.d.ts is empty stub`);
    dtsErrors++;
  } else {
    console.log(`  PASS: lib/hooks/useControllable.d.ts has real types (${hookContent.length} bytes)`);
  }
} else {
  console.error(`  FAIL: lib/hooks/useControllable.d.ts does not exist`);
  dtsErrors++;
}

if (dtsErrors > 0) {
  console.error(`\n  ${dtsErrors} type declaration error(s) found`);
  failures += dtsErrors;
} else {
  console.log('\n  All type declaration checks passed');
}

// Summary
console.log(`\n=== Results: ${failures === 0 ? 'ALL PASSED' : failures + ' FAILURE(S)'} ===\n`);
process.exit(failures === 0 ? 0 : 1);
