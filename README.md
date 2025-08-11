# ETUS Design System

## Summary

- [Installation](#installation)
- [Local Development](#local-development)
- [Usage](#usage)
    - [Importing](#importing)
    - [Using Components](#using-components)
    - [Documentation](#documentation)
    - [Optional Model](#optional-model)
- [Projects](#projects)
- [Design System: Tokens, Variables and Themes](#design-system-tokens-variables-and-themes)

## Local Development

Para usar o Design System localmente em outro projeto durante o desenvolvimento:

1.  **Neste projeto (`@ETUS/eds`):**
    *   Certifique-se de que as dependências estão instaladas: `npm install`
    *   Construa o projeto: `npm run build`
    *   Crie um link simbólico local para o pacote: `npm link`

2.  **No seu projeto que consumirá o Design System:**
    *   Navegue até a pasta raiz do seu outro projeto.
    *   Vincule o pacote do Design System: `npm link "@ETUS/eds"`
    *   Agora você pode importar componentes como faria normalmente.

Quando não precisar mais do link local, você pode desfazê-lo:
*   No seu projeto consumidor: `npm unlink "@ETUS/eds"`
*   Neste projeto (`@ETUS/eds`): `npm unlink` (para remover o link global)

### Installation

```bash
npm install @ETUS/eds
```

## Usage

### Importing

Since the library is exported as a Vue plugin, to use it, just import it and `app.use()` it. You should also import the css styles separately.

```ts
import { createApp } from 'vue';
import App from './App.vue';

import DesignSystem from '@ETUS/eds';
import '@ETUS/eds/styles.css';

createApp(App)
    .use(DesignSystem)
    .mount('#app');
```

### Using components

#### Global Usage (Legacy)
All components will be injected into the Vue instance, so there's no need to import separate components files to use them:

```html
<template>
    <div>
        <BButton>Test Button</BButton>
    </div>
</template>

<script setup lang="ts">
// No need to import BButton.
</script>
```

#### Modular Usage (Recommended)
For better tree-shaking and module organization, import components from specific modules:

```html
<template>
    <div>
        <Button>New Modular Button</Button>
    </div>
</template>

<script setup lang="ts">
import { Button } from '@ETUS/eds/core';
</script>
```

Available modules: `core`, `forms`, `data-display`, `feedback`, `navigation`, `overlay`, `layout`

## Migration Status

This library is currently undergoing migration from the legacy `B*` component structure to a modular architecture. Both import approaches are supported:

- **Legacy**: `import { BButton } from '@ETUS/eds'` - Still works for backward compatibility
- **New**: `import { Button } from '@ETUS/eds/core'` - Recommended for better tree-shaking

For detailed migration information, see [Migration Workflow](docs/MIGRATION_WORKFLOW.md).

## Documentation
TODO: We are working on hosting the documentation.

# Themes

This libary provides support for multiple themes, which can be used to change the color palette of the components. We currently have 2 default themes:

### Custom Themes
You can also create your own custom themes changing the variables shown below within the :root or any other class and this class in html or any of it's tags and components.

Example:

```css
:root {
  --primary-interaction-default: #000000;
}
<!-- or -->
.custom-theme {
  --primary-interaction-default: #000000;
}
```

```html
<body class="custom-theme">
    <button>Custom Theme</button>
</body>
<!-- or -->
<div class="custom-theme">
    <button>Custom Theme</button>
</div>
<!-- or -->
<button class="custom-theme">Custom Theme</button>
```

## Default Theme
Base theme with green primary colors.

### Typography Variables

#### Font Family
| Variable | Value | Usage |
|----------|--------|-------|
| `--font-sans` | "Poppins", sans-serif | Default font family |

#### Font Sizes
| Variable | Value | Usage |
|----------|--------|-------|
| `--font-size-xxs` | 10px | Extra extra small text |
| `--font-size-xs` | 12px | Extra small text |
| `--font-size-sm` | 14px | Small text |
| `--font-size-base` | 16px | Base text size |
| `--font-size-lg` | 18px | Large text |
| `--font-size-xl` | 20px | Extra large text |
| `--font-size-2xl` | 24px | 2x large text |
| `--font-size-3xl` | 30px | 3x large text |
| `--font-size-4xl` | 32px | 4x large text |
| `--font-size-5xl` | 48px | 5x large text |
| `--font-size-6xl` | 60px | 6x large text |
| `--font-size-7xl` | 72px | 7x large text |
| `--font-size-8xl` | 96px | 8x large text |
| `--font-size-9xl` | 128px | 9x large text |

#### Font Weights
| Variable | Value | Usage |
|----------|--------|-------|
| `--font-weight-thin` | 100 | Thinnest weight |
| `--font-weight-extra-light` | 200 | Extra light weight |
| `--font-weight-light` | 300 | Light weight |
| `--font-weight-normal` | 400 | Normal weight |
| `--font-weight-medium` | 500 | Medium weight |
| `--font-weight-semibold` | 600 | Semi-bold weight |
| `--font-weight-bold` | 700 | Bold weight |
| `--font-weight-extra-bold` | 800 | Extra bold weight |
| `--font-weight-black` | 900 | Heaviest weight |

#### Spacing Variables
| Variable | Value | Usage |
|----------|--------|-------|
| `--spacing-none` | 0px | No spacing |
| `--spacing-xxs` | 4px | Extra extra small spacing |
| `--spacing-xs` | 8px | Extra small spacing |
| `--spacing-sm` | 12px | Small spacing |
| `--spacing-base` | 16px | Base spacing |
| `--spacing-lg` | 20px | Large spacing |
| `--spacing-xl` | 24px | Extra large spacing |
| `--spacing-2xl` | 32px | 2x large spacing |
| `--spacing-3xl` | 48px | 3x large spacing |
| `--spacing-4xl` | 56px | 4x large spacing |
| `--spacing-5xl` | 64px | 5x large spacing |
| `--spacing-6xl` | 80px | 6x large spacing |
| `--spacing-7xl` | 96px | 7x large spacing |
| `--spacing-8xl` | 112px | 8x large spacing |
| `--spacing-9xl` | 128px | 9x large spacing |
| `--spacing-10xl` | 144px | 10x large spacing |
| `--spacing-11xl` | 160px | 11x large spacing |
| `--spacing-12xl` | 176px | 12x large spacing |
| `--spacing-13xl` | 192px | 13x large spacing |
| `--spacing-14xl` | 208px | 14x large spacing |
| `--spacing-15xl` | 224px | 15x large spacing |
| `--spacing-16xl` | 240px | 16x large spacing |
| `--spacing-17xl` | 256px | 17x large spacing |
| `--spacing-18xl` | 288px | 18x large spacing |
| `--spacing-19xl` | 320px | 19x large spacing |
| `--spacing-20xl` | 336px | 20x large spacing |

### Border Variables

#### Border Width
| Variable | Value | Usage |
|----------|--------|-------|
| `--border-width-none` | 0px | No border |
| `--border-width-xxs` | 1px | Thinnest border |
| `--border-width-xs` | 2px | Extra small border |
| `--border-width-sm` | 4px | Small border |
| `--border-width-base` | 8px | Base border width |

#### Border Radius
| Variable | Value | Usage |
|----------|--------|-------|
| `--border-radius-none` | 0px | No radius |
| `--border-radius-xxs` | 2px | Minimal radius |
| `--border-radius-xs` | 4px | Extra small radius |
| `--border-radius-sm` | 6px | Extra small radius |
| `--border-radius-base` | 8px | Small radius |
| `--border-radius-lg` | 12px | Base radius |
| `--border-radius-xl` | 16px | Large radius |
| `--border-radius-2xl` | 24px | Extra large radius |
| `--border-radius-full` | 9999px | Circular radius |

### Color Variables

#### Neutral Colors
| Variable | Value | Usage |
|----------|--------|-------|
| `--neutral-background-default` | <div style="background-color: #fbfcfd; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#fbfcfd` | Default background |
| `--neutral-background-emphasis` | <div style="background-color: #f4f6f7; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#f4f6f7` | Emphasized background |
| `--neutral-background-negative` | <div style="background-color: #1b1f22; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#1b1f22` | Negative background |
| `--neutral-surface-default` | <div style="background-color: #ffffff; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#ffffff` | Default surface |
| `--neutral-surface-highlight` | <div style="background-color: #f4f6f7; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#f4f6f7` | Highlighted surface |
| `--neutral-surface-hover` | <div style="background-color: #f4f6f7; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#f4f6f7` | Hover state surface |
| `--neutral-surface-disabled` | <div style="background-color: #e3e7ea; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#e3e7ea` | Disabled surface |
| `--neutral-interaction-default` | <div style="background-color: #465058; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#465058` | Default interaction |
| `--neutral-interaction-hover` | <div style="background-color: #3e464c; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#3e464c` | Hover interaction |
| `--neutral-interaction-pressed` | <div style="background-color: #1b1f22; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#1b1f22` | Pressed interaction |
| `--neutral-interaction-selected` | <div style="background-color: #7a8d96; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#7a8d96` | Disabled interaction |
| `--neutral-foreground-disabled` | <div style="background-color: #7a8d96; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#7a8d96` | Disabled text |
| `--neutral-foreground-low` | <div style="background-color: #5f717b; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#5f717b` | Low contrast text |
| `--neutral-foreground-high` | <div style="background-color: #1b1f22; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#1b1f22` | High contrast text |
| `--neutral-foreground-negative` | <div style="background-color: #ffffff; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#ffffff` | Negative text |
| `--neutral-border-default` | <div style="background-color: #e3e7ea; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#e3e7ea` | Default border |
| `--neutral-border-hover` | <div style="background-color: #a6b4ba; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#a6b4ba` | Hover border |
| `--neutral-border-pressed` | <div style="background-color: #7a8d96; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#7a8d96` | Pressed border |
| `--neutral-border-disabled` | <div style="background-color: #cad2d7; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#cad2d7` | Disabled border |
| `--neutral-border-selected` | <div style="background-color: #cad2d7; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#cad2d7` | Selected border |


#### Primary Colors
| Variable | Value | Usage |
|----------|--------|-------|
| `--primary-surface-default` | <div style="background-color: #effaf4; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#effaf4` | Default primary surface |
| `--primary-surface-highlight` | <div style="background-color: #b6e4cd; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#b6e4cd` | Highlighted primary surface |
| `--primary-surface-hover` | <div style="background-color: #d9f2e4; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#d9f2e4` | Hover state surface |
| `--primary-surface-pressed` | <div style="background-color: #86cfae; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#86cfae` | Pressed state surface |
| `--primary-interaction-default` | <div style="background-color: #329771; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#329771` | Default interaction |
| `--primary-interaction-hover` | <div style="background-color: #22795a; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#22795a` | Hover interaction |
| `--primary-interaction-pressed` | <div style="background-color: #1b614a; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#1b614a` | Pressed interaction |
| `--primary-interaction-selected` | <div style="background-color: #1b614a; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#1b614a` | Disabled interaction |
| `--primary-foreground-disabled` | <div style="background-color: #86cfae; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#86cfae` | Disabled text |
| `--primary-foreground-low` | <div style="background-color: #1b614a; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#1b614a` | Low contrast text |
| `--primary-foreground-high` | <div style="background-color: #184d3b; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#184d3b` | High contrast text |
| `--primary-border-default` | <div style="background-color: #329771; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#329771` | Default border |
| `--primary-border-hover` | <div style="background-color: #1b614a; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#1b614a` | Hover border |
| `--primary-border-selected` | <div style="background-color: #184d3b; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#184d3b` | Selected border |
| `--primary-border-pressed` | <div style="background-color: #144032; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#144032` | Pressed border |

#### Informative Colors
| Variable | Value | Usage |
|----------|--------|-------|
| `--informative-surface-default` | <div style="background-color: #eefcfd; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#eefcfd` | Default info surface |
| `--informative-surface-highlight` | <div style="background-color: #afecf2; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#afecf2` | Highlighted info surface |
| `--informative-surface-hover` | <div style="background-color: #77dee9; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#77dee9` | Hover state surface |
| `--informative-surface-pressed` | <div style="background-color: #39c5d7; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#39c5d7` | Pressed state surface |
| `--informative-interaction-default` | <div style="background-color: #1b879f; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#1b879f` | Default interaction |
| `--informative-interaction-hover` | <div style="background-color: #1b687b; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#1b687b` | Hover interaction |
| `--informative-interaction-pressed` | <div style="background-color: #20596a; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#20596a` | Pressed interaction |
| `--informative-interaction-selected` | <div style="background-color: #1f4b5a; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#1f4b5a` | Disabled interaction |
| `--informative-foreground-disabled` | <div style="background-color: #77dee9; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#77dee9` | Disabled text |
| `--informative-foreground-low` | <div style="background-color: #1b687b; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#1b687b` | Low contrast text |
| `--informative-foreground-high` | <div style="background-color: #1f4b5a; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#1f4b5a` | High contrast text |
| `--informative-border-default` | <div style="background-color: #1b687b; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#1b687b` | Default border |
| `--informative-border-hover` | <div style="background-color: #20596a; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#20596a` | Hover border |
| `--informative-border-selected` | <div style="background-color: #1f4b5a; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#1f4b5a` | Selected border |
| `--informative-border-pressed` | <div style="background-color: #20596a; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#20596a` | Pressed border |

#### Success Colors
| Variable | Value | Usage |
|----------|--------|-------|
| `--success-surface-default` | <div style="background-color: #effef5; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#effef5` | Default success surface |
| `--success-surface-highlight` | <div style="background-color: #bff1d8; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#bff1d8` | Highlighted success surface |
| `--success-surface-hover` | <div style="background-color: #bff1d8; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#bff1d8` | Hover state surface |
| `--success-surface-pressed` | <div style="background-color: #8ce2b9; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#8ce2b9` | Pressed state surface |
| `--success-interaction-default` | <div style="background-color: #0a9e50; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#0a9e50` | Default interaction |
| `--success-interaction-hover` | <div style="background-color: #078541; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#078541` | Hover interaction |
| `--success-interaction-pressed` | <div style="background-color: #105732; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#105732` | Pressed interaction |
| `--success-interaction-selected` | <div style="background-color: #03301a; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#03301a` | Disabled interaction |
| `--success-foreground-disabled` | <div style="background-color: #4fcc92; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#4fcc92` | Disabled text |
| `--success-foreground-low` | <div style="background-color: #078541; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#078541` | Low contrast text |
| `--success-foreground-high` | <div style="background-color: #056a33; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#056a33` | High contrast text |
| `--success-border-default` | <div style="background-color: #0fb75c; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#0fb75c` | Default border |
| `--success-border-hover` | <div style="background-color: #078541; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#078541` | Hover border |
| `--success-border-selected` | <div style="background-color: #056a33; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#056a33` | Selected border |
| `--success-border-pressed` | <div style="background-color: #105732; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#105732` | Pressed border |

#### Warning Colors
| Variable | Value | Usage |
|----------|--------|-------|
| `--warning-surface-default` | <div style="background-color: #ffffea; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#ffffea` | Default warning surface |
| `--warning-surface-highlight` | <div style="background-color: #fff5cc; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#fff5cc` | Highlighted warning surface |
| `--warning-surface-hover` | <div style="background-color: #ffe999; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#ffe999` | Hover state surface |
| `--warning-surface-pressed` | <div style="background-color: #ffdd66; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#ffdd66` | Pressed state surface |
| `--warning-interaction-default` | <div style="background-color: #dba700; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#dba700` | Default interaction |
| `--warning-interaction-hover` | <div style="background-color: #b78a00; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#b78a00` | Hover interaction |
| `--warning-interaction-pressed` | <div style="background-color: #936d00; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#936d00` | Pressed interaction |
| `--warning-interaction-selected` | <div style="background-color: #936d00; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#936d00` | Disabled interaction |
| `--warning-foreground-disabled` | <div style="background-color: #ffd133; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#ffd133` | Disabled text |
| `--warning-foreground-low` | <div style="background-color: #936d00; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#936d00` | Low contrast text |
| `--warning-foreground-high` | <div style="background-color: #7c440b; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#7c440b` | High contrast text |
| `--warning-border-default` | <div style="background-color: #ffc500; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#ffc500` | Default border |
| `--warning-border-hover` | <div style="background-color: #b78a00; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#b78a00` | Hover border |
| `--warning-border-selected` | <div style="background-color: #936d00; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#936d00` | Selected border |
| `--warning-border-pressed` | <div style="background-color: #7c440b; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#7c440b` | Pressed border |

#### Danger Colors
| Variable | Value | Usage |
|----------|--------|-------|
| `--danger-surface-default` | <div style="background-color: #fef2f2; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#fef2f2` | Default danger surface |
| `--danger-surface-highlight` | <div style="background-color: #fab8b8; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#fab8b8` | Highlighted danger surface |
| `--danger-surface-hover` | <div style="background-color: #fde8e8; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#fde8e8` | Hover state surface |
| `--danger-surface-pressed` | <div style="background-color: #f58a8a; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#f58a8a` | Pressed state surface |
| `--danger-interaction-default` | <div style="background-color: #f03232; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#f03232` | Default interaction |
| `--danger-interaction-hover` | <div style="background-color: #b22424; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#b22424` | Hover interaction |
| `--danger-interaction-pressed` | <div style="background-color: #801c1c; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#801c1c` | Pressed interaction |
| `--danger-interaction-selected` | <div style="background-color: #d12b2b; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#d12b2b` | Disabled interaction |
| `--danger-foreground-disabled` | <div style="background-color: #f25c5c; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#f25c5c` | Disabled text |
| `--danger-foreground-low` | <div style="background-color: #b22424; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#b22424` | Low contrast text |
| `--danger-foreground-high` | <div style="background-color: #801c1c; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#801c1c` | High contrast text |
| `--danger-border-default` | <div style="background-color: #f03232; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#f03232` | Default border |
| `--danger-border-hover` | <div style="background-color: #b22424; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#b22424` | Hover border |
| `--danger-border-selected` | <div style="background-color: #931d1d; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#931d1d` | Selected border |
| `--danger-border-pressed` | <div style="background-color: #801c1c; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#801c1c` | Pressed border |

## Brius Theme
Alternative theme with blue primary colors

### Typography Variables

#### Font Family
| Variable | Value | Usage |
|----------|--------|-------|
| `--font-sans` | "Inter", sans-serif | Default font family |

### Color Variables

#### Primary Colors
| Variable | Value | Usage |
|----------|--------|-------|
| `--primary-surface-default` | <div style="background-color: #e7f0ff; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#e7f0ff` | Default primary surface |
| `--primary-surface-highlight` | <div style="background-color: #b8d0ff; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#b8d0ff` | Highlighted primary surface |
| `--primary-surface-hover` | <div style="background-color: #d0e0ff; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#d0e0ff` | Hover state surface |
| `--primary-surface-pressed` | <div style="background-color: #90b1ff; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#90b1ff` | Pressed state surface |
| `--primary-interaction-default` | <div style="background-color: #004ed7; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#004ed7` | Default interaction |
| `--primary-interaction-hover` | <div style="background-color: #003298; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#003298` | Hover interaction |
| `--primary-interaction-pressed` | <div style="background-color: #001040; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#001040` | Pressed interaction |
| `--primary-interaction-selected` | <div style="background-color: #002070; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#002070` | Disabled interaction |
| `--primary-foreground-disabled` | <div style="background-color: #90b1ff; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#90b1ff` | Disabled text |
| `--primary-foreground-low` | <div style="background-color: #0041b8; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#0041b8` | Low contrast text |
| `--primary-foreground-high` | <div style="background-color: #003298; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#003298` | High contrast text |
| `--primary-border-default` | <div style="background-color: #115be2; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#115be2` | Default border |
| `--primary-border-hover` | <div style="background-color: #0041b8; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#0041b8` | Hover border |
| `--primary-border-selected` | <div style="background-color: #003298; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#003298` | Selected border |
| `--primary-border-pressed` | <div style="background-color: #002070; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#002070` | Pressed border |

#### Informative Colors
| Variable | Value | Usage |
|----------|--------|-------|
| `--informative-surface-default` | <div style="background-color: #f2eeff; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#f2eeff` | Default info surface |
| `--informative-surface-highlight` | <div style="background-color: #c7bbff; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#c7bbff` | Highlighted info surface |
| `--informative-surface-hover` | <div style="background-color: #9072ff; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#9072ff` | Hover state surface |
| `--informative-surface-pressed` | <div style="background-color: #6149cc; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#6149cc` | Pressed state surface |
| `--informative-interaction-default` | <div style="background-color: #523bbb; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#523bbb` | Default interaction |
| `--informative-interaction-hover` | <div style="background-color: #362780; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#362780` | Hover interaction |
| `--informative-interaction-pressed` | <div style="background-color: #1f144c; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#1f144c` | Pressed interaction |
| `--informative-interaction-selected` | <div style="background-color: #45329e; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#45329e` | Disabled interaction |
| `--informative-foreground-disabled` | <div style="background-color: #9072ff; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#9072ff` | Disabled text |
| `--informative-foreground-low` | <div style="background-color: #362780; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#362780` | Low contrast text |
| `--informative-foreground-high` | <div style="background-color: #2b1d63; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#2b1d63` | High contrast text |
| `--informative-border-default` | <div style="background-color: #45329e; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#45329e` | Default border |
| `--informative-border-hover` | <div style="background-color: #362780; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#362780` | Hover border |
| `--informative-border-selected` | <div style="background-color: #2b1d63; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#2b1d63` | Selected border |
| `--informative-border-pressed` | <div style="background-color: #1f144c; border: 1px solid #ffffff; width: 15px; height: 15px; display: inline-block;"></div> `#1f144c` | Pressed border |

### Optional Model

Our components use a concept of optional model values, every place where we have a v-model, you can either pass in a variable or leave it empty. If you leave it empty, we will track it's state internally, but events will still be raised when the value changes.

This means that all these alternatives are valid uses of the `BCheckbox` component:

```html
<template>
    <BCheckbox v-model="someValue">Works as expected</BCheckbox>
    <BCheckbox @update:model-value="someFunction">Function will be called when the value changes</BCheckbox>
    <BCheckbox :model-value="anotherValue">Component won't update the value when the user clicks the checkbox</BCheckbox>
</template>
```

The first case is the most used case, where it's expected for us to change the value ourselves but the component should also change the value when the user clicks the checkbox.

The second case is the most rare, but still useful. Sometimes you don't really want to track the state yourself, polluting your component's data section, you just want to know when the value changes. In this case, just listen to the `update:model-value` event and you're set.

The third case pops up sometimes when we want to dictate what the value will be and don't want the component to update the value under any circumstances. This doesn't make much sense in a checkbox component, but on a text field component where the user is expected to just use it's value for copying purposes, it does.

#### Can I use it on my components?

**TODO:** Not right now, but in the future we will expose the composable for doing so.

## Projects

List of projects using this library:

- [MessageOps Frontend](https://gitlab.com/etus/dti/msgops/msgops-frontend)
- [BFP Customer Frontend](https://gitlab.com/etus/brius/bfp-customer-frontend)
- [BFP Manager Frontend](https://gitlab.com/etus/dxp/adops-pricing)

## Design System: Tokens, Variables and Themes

Our Design System is structured around design tokens defined as CSS variables and integrated with Tailwind CSS. This approach enables a consistent and customizable user experience.

### Token Structure

Design tokens are organized into the following categories:

- **Typography**: Font families, sizes, weights, and line heights
- **Spacing**: Spacing scales for margins, paddings, and layouts
- **Borders**: Border widths and radii
- **Colors**: Organized by semantic categories (neutral, primary, informative, success, warning, danger) and by usage type (surface, interaction, foreground, border)

All tokens are defined as CSS variables in the `src/assets/main.css` file and are mapped to Tailwind classes in the `tailwind.config.cjs` file at the root of the project. These variables are then consumed by Tailwind CSS to generate utility classes.

### Theme System

The system supports two main themes:

1. **Etus Theme (default)**: Uses green primary colors and Poppins font
2. **Brius Theme**: Uses blue primary colors and Inter font

To use the Brius theme, simply add the `brius-theme` class to the desired element:

```html
<body class="brius-theme">
    <b-button>Brius Theme</b-button>
</body>
<!-- or -->
<div class="brius-theme">
    <b-button>Brius Theme</b-button>
</div>
```

### Storybook Integration

The Design System includes Storybook integration for previewing components with different themes:

- Theme selection is available in the Storybook toolbar, allowing you to toggle between Etus and Brius themes
- The themes are defined in `.storybook/themes/` directory with corresponding configuration files
- Storybook's theme switcher applies the appropriate class to the preview container, allowing you to see how components look in different themes
- The Design Tokens tab in Storybook displays all available tokens organized by category

This integration makes it easy to visualize components in different themes during development.

### Custom Themes

You can create custom themes by overriding the default CSS variables:

```css
:root {
  --primary-interaction-default: #000000;
}
<!-- or -->
.custom-theme {
  --primary-interaction-default: #000000;
}
```

Then, simply apply the custom theme class:

```html
<body class="custom-theme">
    <b-button>Custom Theme</b-button>
</body>
```

### Interaction States

The Design System has tokens for different interaction states:

- **default**: Normal state of the element
- **hover**: When the cursor is over the element
- **pressed**: When the element is pressed
- **disabled**: When the element is disabled
- **selected**: When the element is selected

This structure facilitates the creation of consistent, accessible, and customizable interfaces.
