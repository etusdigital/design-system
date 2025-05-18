# Guia completo de migração para TailwindCSS v4

O TailwindCSS v4 representa uma reescrita completa do framework, trazendo melhorias impressionantes de performance e uma abordagem revolucionária de configuração. Este guia detalhado cobre tudo que você precisa saber para migrar seu projeto com sucesso.

## O que mudou: nova engine e configuração em CSS

O Tailwind v4 apresenta mudanças fundamentais em sua arquitetura, destacando-se a nova engine "Oxide" que torna builds **5x mais rápidos** e compilações incrementais até **100x mais velozes**. A mudança mais significativa, porém, é a nova abordagem "CSS-first" que elimina a necessidade do arquivo JavaScript de configuração.

```css
/* Tailwind v3 */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Tailwind v4 */
@import "tailwindcss";
```

Esta nova abordagem permite configurar o Tailwind diretamente em seu CSS, utilizando variáveis CSS nativas e aproveitando ao máximo os recursos modernos de CSS.

## Passo a passo para atualização

### 1. Usando a ferramenta automática de upgrade

A forma mais fácil de migrar é usar a ferramenta oficial:

```bash
npx @tailwindcss/upgrade
```

Esta ferramenta:

- Atualiza suas dependências
- Migra seu arquivo de configuração para CSS
- Adapta referências em arquivos de template
- Trata mudanças de nomes de classes

Recomendações:

- Execute em um novo branch para revisar facilmente as mudanças
- Teste seu projeto após a atualização

### 2. Atualização manual de dependências

Se preferir uma abordagem manual, atualize suas dependências de acordo com seu ambiente:

```bash
# Para projetos com PostCSS
npm install tailwindcss @tailwindcss/postcss postcss
npm uninstall postcss-import autoprefixer

# Para projetos com Vite
npm install tailwindcss @tailwindcss/vite
npm uninstall postcss-import autoprefixer

# Se usa o CLI do Tailwind
npm install @tailwindcss/cli
```

### 3. Migração da configuração

Converta seu `tailwind.config.js` para configurações diretamente no CSS:

```javascript
// Antes (tailwind.config.js em v3)
module.exports = {
	theme: {
		extend: {
			colors: {
				primary: "#3490dc",
			},
			fontFamily: {
				sans: ["Graphik", "sans-serif"],
			},
			spacing: {
				128: "32rem",
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
```

```css
/* Depois (CSS em v4) */
@import "tailwindcss";

@theme {
	--color-primary: #3490dc;
	--font-sans: Graphik, sans-serif;
	--spacing-128: 32rem;
}

@plugin "@tailwindcss/typography";
```

### 4. Configuração de ferramentas de build

#### Para Vite:

```javascript
// vite.config.js (v3)
export default defineConfig({
  plugins: [],
  css: {
    postcss: {
      plugins: [
        require('postcss-import'),
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
});

// vite.config.js (v4)
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
});
```

#### Para PostCSS:

```javascript
// postcss.config.js (v3)
module.exports = {
	plugins: {
		"postcss-import": {},
		tailwindcss: {},
		autoprefixer: {},
	},
};

// postcss.config.js (v4)
export default {
	plugins: {
		"@tailwindcss/postcss": {},
	},
};
```

## Principais breaking changes e diferenças de sintaxe

### 1. Detecção automática de arquivos

O Tailwind v4 detecta automaticamente seus arquivos de template, ignorando:

- Arquivos listados no `.gitignore`
- Arquivos binários (imagens, vídeos, etc.)

Se precisar incluir arquivos específicos:

```css
@import "tailwindcss";
@source "./components/**/*.jsx";
```

### 2. Classes renomeadas

Várias classes tiveram seus nomes ajustados para maior consistência:

| v3                 | v4               |
| ------------------ | ---------------- |
| `shadow-sm`        | `shadow-xs`      |
| `shadow`           | `shadow-sm`      |
| `rounded-sm`       | `rounded-xs`     |
| `rounded`          | `rounded-sm`     |
| `outline-none`     | `outline-hidden` |
| `ring`             | `ring-3`         |
| `bg-gradient-to-r` | `bg-linear-to-r` |

```html
<!-- Tailwind v3 -->
<div class="shadow-sm rounded blur-sm"></div>

<!-- Tailwind v4 -->
<div class="shadow-xs rounded-xs blur-xs"></div>
```

### 3. Classes removidas

Algumas classes obsoletas foram removidas em favor de sintaxes mais modernas:

| Removida            | Substituta      |
| ------------------- | --------------- |
| `bg-opacity-*`      | `bg-black/50`   |
| `text-opacity-*`    | `text-black/50` |
| `flex-shrink-*`     | `shrink-*`      |
| `flex-grow-*`       | `grow-*`        |
| `overflow-ellipsis` | `text-ellipsis` |

```html
<!-- Tailwind v3 -->
<div class="bg-black bg-opacity-25 text-white text-opacity-75"></div>

<!-- Tailwind v4 -->
<div class="bg-black/25 text-white/75"></div>
```

### 4. Nova sintaxe para variáveis CSS

A forma de usar variáveis CSS em valores arbitrários mudou:

```html
<!-- Tailwind v3 -->
<div class="bg-[--brand-color]"></div>

<!-- Tailwind v4 -->
<div class="bg-(--brand-color)"></div>
```

### 5. Mudança na ordem de variantes aninhadas

No v4, variantes aninhadas são aplicadas da esquerda para a direita:

```html
<!-- Tailwind v3 -->
<ul class="py-4 first:*:pt-0 last:*:pb-0">
	<li>Item</li>
</ul>

<!-- Tailwind v4 -->
<ul class="py-4 *:first:pt-0 *:last:pb-0">
	<li>Item</li>
</ul>
```

### 6. Nova forma de definir utilitários personalizados

```css
/* Tailwind v3 */
@layer utilities {
	.tab-4 {
		tab-size: 4;
	}
}

/* Tailwind v4 */
@utility tab-4 {
	tab-size: 4;
}
```

## Adaptando temas, tokens e customizações

### Usando o sistema de temas baseado em CSS

No v4, todas as customizações de tema são feitas via variáveis CSS:

```css
@import "tailwindcss";

@theme {
	/* Cores personalizadas */
	--color-primary: oklch(0.57 0.192 244.77);
	--color-secondary: oklch(0.64 0.042 263.83);

	/* Fontes */
	--font-sans: "Satoshi", sans-serif;

	/* Espaçamento */
	--spacing-128: 32rem;
}
```

### Variáveis CSS nativas

Uma vantagem do v4 é que todos os tokens são expostos como variáveis CSS:

```css
/* CSS personalizado usando variáveis do Tailwind */
.my-component {
	background-color: var(--color-primary);
	font-family: var(--font-sans);
	margin-top: var(--spacing-128);
}
```

### Sobrescrevendo valores padrão

Para modificar valores padrão:

```css
@theme {
	/* Sobrescreve o azul padrão */
	--color-blue-500: oklch(0.57 0.192 244.77);

	/* Desativa todas as cores padrão */
	--color-*: initial;
	--color-white: #fff;
	--color-midnight: #121063;
}
```

## Migrando plugins e utilitários customizados

### Importando plugins

No v4, plugins são importados diretamente no CSS:

```css
/* v4 */
@import "tailwindcss";
@plugin "@tailwindcss/typography";
@plugin "@tailwindcss/forms";
@plugin "./meu-plugin-personalizado.js";
```

### Configurando plugins

Para personalizar configurações de um plugin:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
@config "./tailwind.config.js";
```

```javascript
// Configuração do plugin
module.exports = {
	theme: {
		extend: {
			typography: {
				DEFAULT: {
					css: {
						color: "var(--color-gray-800)",
						a: {
							color: "var(--color-blue-500)",
						},
					},
				},
			},
		},
	},
};
```

### Utilitários funcionais

Para utilitários que aceitam argumentos:

```css
@theme {
	--text-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
	--text-shadow-md: 0 1px 3px rgba(0, 0, 0, 0.1);
	--text-shadow-lg: 0 1px 4px rgba(0, 0, 0, 0.15);
}

@utility text-shadow-* {
	text-shadow: --value(--text-shadow- *);
}
```

### Variantes personalizadas

No v4, variantes personalizadas são definidas com a diretiva `@custom-variant`:

```css
/* CSS (v4) */
@custom-variant theme-dark (&:where([data-theme="dark"] *));

/* Dark mode baseado em classes */
@custom-variant dark (&:where(.dark, .dark *));
```

## Melhores práticas para adaptar componentes

### Lidando com Container Queries

O v4 inclui suporte nativo para container queries:

```html
<div class="@container">
	<div class="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-4">
		<!-- Conteúdo -->
	</div>
</div>
```

### Novas funcionalidades para transformações 3D

O v4 suporta nativamente transformações 3D:

```html
<div class="transform-3d">
	<img
		class="rotate-x-50 rotate-y-30 translate-z-8"
		src="imagem.jpg" />
</div>
```

### Utilizando novos recursos de gradientes

```html
<!-- Gradientes lineares -->
<div class="bg-linear-to-r from-indigo-500 to-pink-500"></div>
<div class="bg-linear-45 from-indigo-500 to-pink-500"></div>

<!-- Gradientes radiais -->
<div class="bg-radial from-pink-400 from-40% to-fuchsia-700"></div>

<!-- Gradientes cônicos -->
<div class="bg-conic from-blue-600 to-sky-400 to-50%"></div>
```

### Novas variantes

O v4 adiciona várias novas variantes úteis:

```html
<!-- Variante not-* -->
<div class="bg-blue-500 not-dark:bg-slate-800">
	<!-- Será azul no modo claro e cinza escuro no modo escuro -->
</div>

<!-- Outras novas variantes: -->
<!-- - inert: para elementos inativos -->
<!-- - nth-*: para estilos baseados em posição -->
<!-- - in-*: similar a group-* sem precisar da classe group -->
```

## Testes e validação após migração

### Testes de regressão visual

A verificação visual é essencial após a migração. Recomenda-se:

#### Usando Playwright para testes visuais:

```javascript
// Configuração básica
const { test, expect } = require("@playwright/test");

test("homepage screenshot testing", async ({ page }) => {
	await page.goto("http://localhost:3000");
	await expect(page).toHaveScreenshot("homepage.png");
});
```

#### Fluxo recomendado:

1. Capture screenshots da versão v3 antes da migração
2. Execute a migração para v4
3. Execute os testes para comparar as diferenças visuais
4. Resolva discrepâncias indesejadas

### Integração com Storybook

```javascript
// .storybook/main.js
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	plugins: [tailwindcss()],
});
```

### Testar compatibilidade com navegadores

O Tailwind v4 requer navegadores modernos:

- Safari 16.4+
- Chrome 111+
- Firefox 128+

### Abordagens para migração gradual vs. completa

Para projetos complexos, considere uma abordagem gradual:

1. **Usar o arquivo de configuração JavaScript legado**:

   ```css
   @import "tailwindcss";
   @config "./tailwind.config.js";
   ```

2. **Migração por componentes**:
   - Comece pelos componentes menos críticos
   - Estabeleça testes de regressão visual
   - Adote gradualmente as novas funcionalidades

## Recursos e documentação

### Recursos oficiais

- [Guia de Upgrade Oficial](https://tailwindcss.com/docs/upgrade-guide)
- [Anúncio do Tailwind CSS v4.0](https://tailwindcss.com/blog/tailwindcss-v4)
- [Documentação CSS-first](https://tailwindcss.com/docs/installation)
- [Compatibilidade com Navegadores](https://tailwindcss.com/docs/browser-support)

### Plugins e integração

- [Repositório @tailwindcss/typography](https://github.com/tailwindlabs/tailwindcss-typography)
- [Repositório @tailwindcss/forms](https://github.com/tailwindlabs/tailwindcss-forms)
- [Plugin Vite para TailwindCSS](https://tailwindcss.com/docs/vite)

### Ferramentas de teste

- [Documentação do Playwright](https://playwright.dev/docs/writing-tests)
- [Integração Cypress com TailwindCSS](https://docs.cypress.io)
- [Documentação do Storybook](https://storybook.js.org/docs)
- [Chromatic](https://www.chromatic.com/)
- [Percy](https://percy.io/)

### Comunidade

- [Canal Discord do TailwindCSS](https://discord.gg/tailwindcss)
- [TailwindCSS subreddit](https://www.reddit.com/r/tailwindcss/)

## Conclusão

A migração para o TailwindCSS v4 oferece ganhos significativos de performance e uma experiência de desenvolvimento mais moderna e integrada. Embora exija mudanças em sua base de código, a ferramenta de upgrade automatizada facilita o processo. As novas capacidades como configuração CSS-first, suporte nativo a container queries e transformações 3D tornam o esforço de migração altamente recompensador para projetos novos e existentes.
