# Adicionando Estilos Personalizados

Frequentemente, o maior desafio ao trabalhar com um framework é descobrir o que fazer quando você precisa de algo que o framework não oferece nativamente.

O Tailwind foi projetado desde o início para ser extensível e personalizável, garantindo que você nunca sinta que está lutando contra o framework, independentemente do que esteja construindo.

Este guia aborda tópicos como personalização de tokens de design, como sair dessas restrições quando necessário, adicionar seu próprio CSS personalizado e estender o framework com plugins.

## Personalizando seu Tema

Se você deseja alterar elementos como paleta de cores, escala de espaçamento, escala tipográfica ou breakpoints, adicione suas personalizações usando a diretiva `@theme` no seu CSS:

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
  /* ... */
}
```

Saiba mais sobre personalização do tema na documentação de variáveis de tema.

## Usando Valores Arbitrários

Embora você geralmente possa construir a maior parte de um design bem elaborado usando um conjunto restrito de tokens de design, ocasionalmente você precisa sair dessas restrições para deixar tudo pixel-perfect.

Quando você realmente precisar de algo como `top: 117px` para posicionar uma imagem de fundo no lugar exato, use a notação de colchetes do Tailwind para gerar uma classe dinamicamente com qualquer valor arbitrário:

```html
<div class="top-[117px]">
  <!-- ... -->
</div>
```

Isso é basicamente como estilos inline, com o grande benefício de poder combiná-lo com modificadores interativos como `hover` e modificadores responsivos como `lg:`:

```html
<div class="top-[117px] lg:top-[344px]">
  <!-- ... -->
</div>
```

Isso funciona para tudo no framework, incluindo coisas como cores de fundo, tamanhos de fonte, conteúdo de pseudo-elementos e mais:

```html
<div class="bg-[#bada55] text-[22px] before:content-['Festivus']">
  <!-- ... -->
</div>
```

Se você está referenciando uma variável CSS como valor arbitrário, pode usar a sintaxe de propriedade personalizada:

```html
<div class="fill-(--my-brand-color) ...">
  <!-- ... -->
</div>
```

Isso é apenas uma abreviação para `fill-[var(--my-brand-color)]` que adiciona a função `var()` automaticamente.

### Propriedades Arbitrárias

Se você precisar usar uma propriedade CSS para a qual o Tailwind não inclui uma utilidade pronta, também pode usar a notação de colchetes para escrever CSS completamente arbitrário:

```html
<div class="[mask-type:luminance]">
  <!-- ... -->
</div>
```

Isso é realmente como estilos inline, mas novamente com o benefício de poder usar modificadores:

```html
<div class="[mask-type:luminance] hover:[mask-type:alpha]">
  <!-- ... -->
</div>
```

Isso pode ser útil para coisas como variáveis CSS também, especialmente quando elas precisam mudar sob diferentes condições:

```html
<div class="[--scroll-offset:56px] lg:[--scroll-offset:44px]">
  <!-- ... -->
</div>
```

### Variantes Arbitrárias

Variantes arbitrárias são como valores arbitrários, mas para fazer modificação de seletor dinâmica, como você pode fazer com variantes de pseudo-classe integradas como `hover:{utility}` ou variantes responsivas como `md:{utility}`, mas usando notação de colchetes diretamente no seu HTML:

```html
<ul role="list">
  {#each items as item}
    <li class="lg:[&:nth-child(-n+3)]:hover:underline">{item}</li>
  {/each}
</ul>
```

Saiba mais na documentação de variantes arbitrárias.

### Lidando com Espaços em Branco

Quando um valor arbitrário precisa conter um espaço, use um underscore (`_`) em vez disso e o Tailwind o converterá automaticamente em um espaço no momento da compilação:

```html
<div class="grid grid-cols-[1fr_500px_2fr]">
  <!-- ... -->
</div>
```

Em situações onde underscores são comuns mas espaços são inválidos, o Tailwind preservará o underscore em vez de convertê-lo em espaço, por exemplo em URLs:

```html
<div class="bg-[url('/what_a_rush.png')]">
  <!-- ... -->
</div>
```

No caso raro em que você realmente precisa usar um underscore mas é ambíguo porque um espaço também é válido, escape o underscore com uma barra invertida e o Tailwind não o converterá em espaço:

```html
<div class="before:content-['hello\_world']">
  <!-- ... -->
</div>
```

Se você está usando algo como JSX onde a barra invertida é removida do HTML renderizado, use `String.raw()` para que a barra invertida não seja tratada como um caractere de escape JavaScript:

```jsx
<div className={String.raw`before:content-['hello\_world']`}>
  <!-- ... -->
</div>
```

### Resolvendo Ambiguidades

Muitas utilidades no Tailwind compartilham um namespace comum mas mapeiam para propriedades CSS diferentes. Por exemplo, `text-lg` e `text-black` compartilham o namespace `text-`, mas um é para `font-size` e o outro é para `color`.

Ao usar valores arbitrários, o Tailwind geralmente pode lidar com essa ambiguidade automaticamente com base no valor que você passa:

```html
<!-- Gerará uma utilidade de font-size -->
<div class="text-[22px]">...</div>

<!-- Gerará uma utilidade de color -->
<div class="text-[#bada55]">...</div>
```

Às vezes é realmente ambíguo, por exemplo ao usar variáveis CSS:

```html
<div class="text-(--my-var)">...</div>
```

Nessas situações, você pode "sugerir" o tipo subjacente ao Tailwind adicionando um tipo de dados CSS antes do valor:

```html
<!-- Gerará uma utilidade de font-size -->
<div class="text-(length:--my-var)">...</div>

<!-- Gerará uma utilidade de color -->
<div class="text-(color:--my-var)">...</div>
```

## Usando CSS Personalizado

Embora o Tailwind seja projetado para lidar com a maior parte das suas necessidades de estilização, nada impede você de escrever CSS puro quando precisar:

```css
@import "tailwindcss";

.my-custom-style {
  /* ... */
}
```

### Adicionando Estilos Base

Se você só quer definir alguns padrões para a página (como cor do texto, cor de fundo ou família de fontes), a opção mais fácil é adicionar algumas classes aos elementos `html` ou `body`:

```html
<!doctype html>
<html lang="en" class="bg-gray-100 font-serif text-gray-900">
  <!-- ... -->
</html>
```

Isso mantém suas decisões de estilização base na sua marcação junto com todos os seus outros estilos, em vez de escondê-las em um arquivo separado.

Se você quiser adicionar seus próprios estilos base padrão para elementos HTML específicos, use a diretiva `@layer` para adicionar esses estilos à camada base do Tailwind:

```css
@layer base {
  h1 {
    font-size: var(--text-2xl);
  }
  h2 {
    font-size: var(--text-xl);
  }
}
```

### Adicionando Classes de Componentes

Use a camada `components` para quaisquer classes mais complicadas que você queira adicionar ao seu projeto e que ainda gostaria de poder sobrescrever com classes utilitárias.

Tradicionalmente, essas seriam classes como `card`, `btn`, `badge` — esse tipo de coisa.

```css
@layer components {
  .card {
    background-color: var(--color-white);
    border-radius: var(--rounded-lg);
    padding: var(--spacing-6);
    box-shadow: var(--shadow-xl);
  }
}
```

Ao definir classes de componentes na camada `components`, você ainda pode usar classes utilitárias para sobrescrevê-las quando necessário:

```html
<!-- Parecerá um card, mas com cantos quadrados -->
<div class="card rounded-none">
  <!-- ... -->
</div>
```

Usando o Tailwind, você provavelmente não precisa desses tipos de classes com tanta frequência quanto pensa. Leia nosso guia sobre gerenciamento de duplicação para nossas recomendações.

A camada `components` também é um bom lugar para colocar estilos personalizados para quaisquer componentes de terceiros que você esteja usando:

```css
@layer components {
  .select2-dropdown {
    /* ... */
  }
}
```

### Usando Variantes

Use a diretiva `@variant` para aplicar uma variante do Tailwind dentro de CSS personalizado:

```css
.my-element {
  background: white;
  @variant dark {
    background: black;
  }
}
```

Isso compila para:

```css
.my-element {
  background: white;
  @media (prefers-color-scheme: dark) {
    background: black;
  }
}
```

Se você precisar aplicar múltiplas variantes ao mesmo tempo, use aninhamento:

```css
.my-element {
  background: white;
  @variant dark {
    @variant hover {
      background: black;
    }
  }
}
```

Isso compila para:

```css
.my-element {
  background: white;
  @media (prefers-color-scheme: dark) {
    &:hover {
      @media (hover: hover) {
        background: black;
      }
    }
  }
}
```

## Adicionando Utilidades Personalizadas

### Utilidades Simples

Além de usar as utilidades que vêm com o Tailwind, você também pode adicionar suas próprias utilidades personalizadas. Isso pode ser útil quando há um recurso CSS que você gostaria de usar em seu projeto para o qual o Tailwind não inclui utilidades prontas.

Use a diretiva `@utility` para adicionar uma utilidade personalizada ao seu projeto:

```css
@utility content-auto {
  content-visibility: auto;
}
```

Agora você pode usar esta utilidade no seu HTML:

```html
<div class="content-auto">
  <!-- ... -->
</div>
```

Ela também funcionará com variantes como `hover`, `focus` e `lg:`:

```html
<div class="hover:content-auto">
  <!-- ... -->
</div>
```

Utilidades personalizadas são automaticamente inseridas na camada `utilities` junto com todas as utilidades integradas do framework.

### Utilidades Complexas

Se sua utilidade personalizada for mais complexa que um único nome de classe, use aninhamento para definir a utilidade:

```css
@utility scrollbar-hidden {
  &::-webkit-scrollbar {
    display: none;
  }
}
```

### Utilidades Funcionais

Além de registrar utilidades simples com a diretiva `@utility`, você também pode registrar utilidades funcionais que aceitam um argumento:

```css
@utility tab-* {
  tab-size: --value(--tab-size-*);
}
```

A função especial `--value()` é usada para resolver o valor da utilidade.

#### Correspondendo Valores do Tema

Use a sintaxe `--value(--theme-key-*)` para resolver o valor da utilidade contra um conjunto de chaves do tema:

```css
@theme {
  --tab-size-2: 2;
  --tab-size-4: 4;
  --tab-size-github: 8;
}

@utility tab-* {
  tab-size: --value(--tab-size-*);
}
```

Isso corresponderá a utilidades como `tab-2`, `tab-4` e `tab-github`.

#### Valores Simples

Para resolver o valor como um valor simples, use a sintaxe `--value({type})`, onde `{type}` é o tipo de dados que você deseja validar:

```css
@utility tab-* {
  tab-size: --value(integer);
}
```

Isso corresponderá a utilidades como `tab-1` e `tab-76`.

#### Valores Literais

Para suportar valores literais, use a sintaxe `--value('literal')` (note as aspas):

```css
@utility tab-* {
  tab-size: --value('inherit', 'initial', 'unset');
}
```

Isso corresponderá a utilidades como `tab-inherit`, `tab-initial` e `tab-unset`.

#### Valores Arbitrários

Para suportar valores arbitrários, use a sintaxe `--value([{type}])` (note os colchetes) para dizer ao Tailwind quais tipos são suportados como valor arbitrário:

```css
@utility tab-* {
  tab-size: --value([integer]);
}
```

Isso corresponderá a utilidades como `tab-[1]` e `tab-[76]`. Se você quiser suportar qualquer tipo de dados, pode usar `--value([*])`.

#### Suportando Valores de Tema, Simples e Arbitrários Juntos

Todas as três formas da função `--value()` podem ser usadas dentro de uma regra como múltiplas declarações, e quaisquer declarações que falhem em resolver serão omitidas na saída:

```css
@theme {
  --tab-size-github: 8;
}

@utility tab-* {
  tab-size: --value([integer]);
  tab-size: --value(integer);
  tab-size: --value(--tab-size-*);
}
```

Isso torna possível tratar o valor de forma diferente em cada caso, se necessário, por exemplo, traduzindo um inteiro simples para uma porcentagem:

```css
@utility opacity-* {
  opacity: --value([percentage]);
  opacity: calc(--value(integer) * 1%);
  opacity: --value(--opacity-*);
}
```

A função `--value()` também pode receber múltiplos argumentos e resolvê-los da esquerda para a direita se você não precisar tratar o valor de retorno de forma diferente em casos diferentes:

```css
@theme {
  --tab-size-github: 8;
}

@utility tab-* {
  tab-size: --value(--tab-size-*, integer, [integer]);
}

@utility opacity-* {
  opacity: calc(--value(integer) * 1%);
  opacity: --value(--opacity-*, [percentage]);
}
```

#### Valores Negativos

Para suportar valores negativos, registre utilidades positivas e negativas separadas em declarações separadas:

```css
@utility inset-* {
  inset: calc(var(--spacing) * --value([percentage], [length]));
}

@utility -inset-* {
  inset: calc(var(--spacing) * --value([percentage], [length]) * -1);
}
```

#### Modificadores

Modificadores são tratados usando a função `--modifier()` que funciona exatamente como a função `--value()` mas opera em um modificador se presente:

```css
@utility text-* {
  font-size: --value(--text-*, [length]);
  line-height: --modifier(--leading-*, [length], [*]);
}
```

Se um modificador não estiver presente, qualquer declaração dependendo de um modificador simplesmente não é incluída na saída.

#### Frações

Para lidar com frações, contamos com o tipo de dados CSS `ratio`. Se isso for usado com `--value()`, é um sinal para o Tailwind tratar o valor e o modificador como um único valor:

```css
@utility aspect-* {
  aspect-ratio: --value(--aspect-ratio-*, ratio, [ratio]);
}
```

Isso corresponderá a utilidades como `aspect-square`, `aspect-3/4` e `aspect-[7/9]`.

## Adicionando Variantes Personalizadas

Além de usar as variantes que vêm com o Tailwind, você também pode adicionar suas próprias variantes personalizadas usando a diretiva `@custom-variant`:

```css
@custom-variant theme-midnight {
  &:where([data-theme="midnight"] *) {
    @slot;
  }
}
```

Agora você pode usar a variante `theme-midnight:<utility>` no seu HTML:

```html
<html data-theme="midnight">
  <button class="theme-midnight:bg-black ..."></button>
</html>
```

Você pode criar variantes usando a sintaxe abreviada quando o aninhamento não é necessário:

```css
@custom-variant theme-midnight (&:where([data-theme="midnight"] *));
```

Quando uma variante personalizada tem múltiplas regras, elas podem ser aninhadas umas dentro das outras:

```css
@custom-variant any-hover {
  @media (any-hover: hover) {
    &:hover {
      @slot;
    }
  }
}
```

