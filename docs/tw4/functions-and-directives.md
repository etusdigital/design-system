# Funções e Diretivas do Tailwind CSS v4

Este documento descreve as principais funções e diretivas disponíveis no Tailwind CSS v4, que são regras at-rules customizadas do Tailwind que oferecem funcionalidades especiais para projetos CSS.

---

## Diretivas

As diretivas são regras at-rules específicas do Tailwind que você pode usar em seu CSS para acessar funcionalidades especiais.

### @import

Use a diretiva `@import` para importar arquivos CSS inline, incluindo o próprio Tailwind:

```css
@import "tailwindcss";
```

**⚠️ Mudança importante do v3 para v4:**
- **v3:** Usava `@tailwind base;`, `@tailwind components;`, `@tailwind utilities;`
- **v4:** Usa apenas `@import "tailwindcss";`

### @theme

Use a diretiva `@theme` para definir os tokens de design customizados do seu projeto, como fontes, cores e breakpoints:

```css
@theme {
  --font-display: "Satoshi", "sans-serif";
  --breakpoint-3xl: 120rem;
  --color-avocado-100: oklch(0.99 0 0);
  --color-avocado-200: oklch(0.98 0.04 113.22);
  --color-avocado-300: oklch(0.94 0.11 115.03);
  --color-avocado-400: oklch(0.92 0.19 114.08);
  --color-avocado-500: oklch(0.84 0.18 117.33);
  --color-avocado-600: oklch(0.53 0.12 118.34);
  --ease-fluid: cubic-bezier(0.3, 0, 0, 1);
  --ease-snappy: cubic-bezier(0.2, 0, 0, 1);
}
```

> 📖 Saiba mais sobre personalização de tema na documentação de variáveis de tema.

### @source

Use a diretiva `@source` para especificar explicitamente arquivos fonte que não são detectados automaticamente pelo Tailwind:

```css
@source "../node_modules/@my-company/ui-lib";
```

> 📖 Saiba mais sobre detecção automática de conteúdo na documentação de detecção de classes em arquivos fonte.

### @utility

Use a diretiva `@utility` para adicionar utilitários customizados ao seu projeto que funcionam com variantes como `hover`, `focus` e `lg`:

```css
@utility tab-4 {
  tab-size: 4;
}
```

> 📖 Saiba mais sobre registro de utilitários customizados na documentação de adição de utilitários customizados.

### @variant

Use a diretiva `@variant` para aplicar uma variante do Tailwind a estilos no seu CSS:

```css
.my-element {
  background: white;
  
  @variant dark {
    background: black;
  }
}
```

> 📖 Saiba mais sobre uso de variantes na documentação de uso de variantes.

### @custom-variant

Use a diretiva `@custom-variant` para adicionar uma variante customizada no seu projeto:

```css
@custom-variant theme-midnight (&:where([data-theme="midnight"] *));
```

Isso permite que você escreva utilitários como `theme-midnight:bg-black` e `theme-midnight:text-white`.

> 📖 Saiba mais sobre adição de variantes customizadas na documentação de adição de variantes customizadas.

### @apply

Use a diretiva `@apply` para incorporar qualquer classe utilitária existente no seu CSS customizado:

```css
.select2-dropdown {
  @apply rounded-b-lg shadow-md;
}

.select2-search {
  @apply rounded border border-gray-300;
}

.select2-results__group {
  @apply text-lg font-bold text-gray-900;
}
```

**Quando usar:**
- Para sobrescrever estilos de bibliotecas de terceiros
- Quando você precisa escrever CSS customizado mas quer manter os tokens de design
- Para usar a mesma sintaxe familiar do HTML

### @reference

Se você quiser usar `@apply` ou `@variant` no bloco `<style>` de um componente Vue ou Svelte, ou dentro de módulos CSS, você precisará importar suas variáveis de tema, utilitários customizados e variantes customizadas.

Para fazer isso sem duplicar CSS na saída, use a diretiva `@reference`:

```vue
<template>
  <h1>Hello world!</h1>
</template>

<style>
  @reference "../../app.css";
  
  h1 {
    @apply text-2xl font-bold text-red-500;
  }
</style>
```

**Para tema padrão:**
Se você está usando apenas o tema padrão sem customizações, pode importar o `tailwindcss` diretamente:

```vue
<template>
  <h1>Hello world!</h1>
</template>

<style>
  @reference "tailwindcss";
  
  h1 {
    @apply text-2xl font-bold text-red-500;
  }
</style>
```

---

## Funções

O Tailwind fornece as seguintes funções de build-time para facilitar o trabalho com cores e escala de espaçamento.

### --alpha()

Use a função `--alpha()` para ajustar a opacidade de uma cor:

```css
.my-element {
  color: --alpha(var(--color-lime-300) / 50%);
}
```

**Compilado para:**
```css
.my-element {
  color: color-mix(in oklab, var(--color-lime-300) 50%, transparent);
}
```

### --spacing()

Use a função `--spacing()` para gerar um valor de espaçamento baseado no seu tema:

```css
.my-element {
  margin: --spacing(4);
}
```

**Compilado para:**
```css
.my-element {
  margin: calc(var(--spacing) * 4);
}
```

**Uso em valores arbitrários:**
Também é útil em valores arbitrários, especialmente em combinação com `calc()`:

```html
<div class="py-[calc(--spacing(4)-1px)]">
  <!-- ... -->
</div>
```

---

## Compatibilidade (v3.x)

As seguintes diretivas e funções existem apenas para compatibilidade com Tailwind CSS v3.x.

### @config

Use a diretiva `@config` para carregar um arquivo de configuração JavaScript legado:

```css
@config "../../tailwind.config.js";
```

**⚠️ Limitações:** As opções `corePlugins`, `safelist` e `separator` do config baseado em JavaScript não são suportadas no v4.0.

### @plugin

Use a diretiva `@plugin` para carregar um plugin JavaScript legado:

```css
@plugin "@tailwindcss/typography";
```

A diretiva `@plugin` aceita tanto um nome de pacote quanto um caminho local.

### theme()

Use a função `theme()` para acessar valores do tema Tailwind usando notação de ponto:

```css
.my-element {
  margin: theme(spacing.12);
}
```

**⚠️ Depreciado:** Esta função está depreciada. Recomendamos usar variáveis de tema CSS.

---

## Resumo das Principais Mudanças v3 → v4

| Aspecto | v3 | v4 |
|---------|----|----|
| **Importação** | `@tailwind base;`<br>`@tailwind components;`<br>`@tailwind utilities;` | `@import "tailwindcss";` |
| **Configuração** | `tailwind.config.js` | `@theme` diretiva |
| **Tema** | `theme()` função | Variáveis CSS nativas |
| **Plugins** | Configuração JS | `@plugin` diretiva |

