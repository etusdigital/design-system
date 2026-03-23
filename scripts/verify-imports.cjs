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
check('Version is 2.0.0', pkg.version === '2.0.0');

// Summary
console.log(`\n=== Results: ${failures === 0 ? 'ALL PASSED' : failures + ' FAILURE(S)'} ===\n`);
process.exit(failures === 0 ? 0 : 1);
