# Margin - Tailwind CSS v4

Este guia abrange todas as classes de margin disponíveis no Tailwind CSS v4 e como utilizá-las.

## Classes de Margin Disponíveis

### Margin em Todos os Lados

| Classe | CSS Gerado | Descrição |
|--------|------------|-----------|
| `m-<number>` | `margin: calc(var(--spacing) * <number>);` | Margin positiva |
| `-m-<number>` | `margin: calc(var(--spacing) * -<number>);` | Margin negativa |
| `m-auto` | `margin: auto;` | Margin automática |
| `m-px` | `margin: 1px;` | Margin de 1 pixel |
| `-m-px` | `margin: -1px;` | Margin negativa de 1 pixel |
| `m-(<custom-property>)` | `margin: var(<custom-property>);` | Margin com propriedade customizada |
| `m-[<value>]` | `margin: <value>;` | Margin com valor arbitrário |

### Margin Horizontal (Inline)

| Classe | CSS Gerado | Descrição |
|--------|------------|-----------|
| `mx-<number>` | `margin-inline: calc(var(--spacing) * <number>);` | Margin horizontal positiva |
| `-mx-<number>` | `margin-inline: calc(var(--spacing) * -<number>);` | Margin horizontal negativa |
| `mx-auto` | `margin-inline: auto;` | Margin horizontal automática |
| `mx-px` | `margin-inline: 1px;` | Margin horizontal de 1 pixel |
| `-mx-px` | `margin-inline: -1px;` | Margin horizontal negativa de 1 pixel |
| `mx-(<custom-property>)` | `margin-inline: var(<custom-property>);` | Margin horizontal com propriedade customizada |
| `mx-[<value>]` | `margin-inline: <value>;` | Margin horizontal com valor arbitrário |

### Margin Vertical (Block)

| Classe | CSS Gerado | Descrição |
|--------|------------|-----------|
| `my-<number>` | `margin-block: calc(var(--spacing) * <number>);` | Margin vertical positiva |
| `-my-<number>` | `margin-block: calc(var(--spacing) * -<number>);` | Margin vertical negativa |
| `my-auto` | `margin-block: auto;` | Margin vertical automática |
| `my-px` | `margin-block: 1px;` | Margin vertical de 1 pixel |
| `-my-px` | `margin-block: -1px;` | Margin vertical negativa de 1 pixel |
| `my-(<custom-property>)` | `margin-block: var(<custom-property>);` | Margin vertical com propriedade customizada |
| `my-[<value>]` | `margin-block: <value>;` | Margin vertical com valor arbitrário |

### Margin Start (Início Inline)

| Classe | CSS Gerado | Descrição |
|--------|------------|-----------|
| `ms-<number>` | `margin-inline-start: calc(var(--spacing) * <number>);` | Margin de início positiva |
| `-ms-<number>` | `margin-inline-start: calc(var(--spacing) * -<number>);` | Margin de início negativa |
| `ms-auto` | `margin-inline-start: auto;` | Margin de início automática |
| `ms-px` | `margin-inline-start: 1px;` | Margin de início de 1 pixel |
| `-ms-px` | `margin-inline-start: -1px;` | Margin de início negativa de 1 pixel |
| `ms-(<custom-property>)` | `margin-inline-start: var(<custom-property>);` | Margin de início com propriedade customizada |
| `ms-[<value>]` | `margin-inline-start: <value>;` | Margin de início com valor arbitrário |

### Margin End (Final Inline)

| Classe | CSS Gerado | Descrição |
|--------|------------|-----------|
| `me-<number>` | `margin-inline-end: calc(var(--spacing) * <number>);` | Margin de final positiva |
| `-me-<number>` | `margin-inline-end: calc(var(--spacing) * -<number>);` | Margin de final negativa |
| `me-auto` | `margin-inline-end: auto;` | Margin de final automática |
| `me-px` | `margin-inline-end: 1px;` | Margin de final de 1 pixel |
| `-me-px` | `margin-inline-end: -1px;` | Margin de final negativa de 1 pixel |
| `me-(<custom-property>)` | `margin-inline-end: var(<custom-property>);` | Margin de final com propriedade customizada |
| `me-[<value>]` | `margin-inline-end: <value>;` | Margin de final com valor arbitrário |

### Margin Top

| Classe | CSS Gerado | Descrição |
|--------|------------|-----------|
| `mt-<number>` | `margin-top: calc(var(--spacing) * <number>);` | Margin superior positiva |
| `-mt-<number>` | `margin-top: calc(var(--spacing) * -<number>);` | Margin superior negativa |
| `mt-auto` | `margin-top: auto;` | Margin superior automática |
| `mt-px` | `margin-top: 1px;` | Margin superior de 1 pixel |
| `-mt-px` | `margin-top: -1px;` | Margin superior negativa de 1 pixel |
| `mt-(<custom-property>)` | `margin-top: var(<custom-property>);` | Margin superior com propriedade customizada |
| `mt-[<value>]` | `margin-top: <value>;` | Margin superior com valor arbitrário |

### Margin Right

| Classe | CSS Gerado | Descrição |
|--------|------------|-----------|
| `mr-<number>` | `margin-right: calc(var(--spacing) * <number>);` | Margin direita positiva |
| `-mr-<number>` | `margin-right: calc(var(--spacing) * -<number>);` | Margin direita negativa |
| `mr-auto` | `margin-right: auto;` | Margin direita automática |
| `mr-px` | `margin-right: 1px;` | Margin direita de 1 pixel |
| `-mr-px` | `margin-right: -1px;` | Margin direita negativa de 1 pixel |
| `mr-(<custom-property>)` | `margin-right: var(<custom-property>);` | Margin direita com propriedade customizada |
| `mr-[<value>]` | `margin-right: <value>;` | Margin direita com valor arbitrário |

### Margin Bottom

| Classe | CSS Gerado | Descrição |
|--------|------------|-----------|
| `mb-<number>` | `margin-bottom: calc(var(--spacing) * <number>);` | Margin inferior positiva |
| `-mb-<number>` | `margin-bottom: calc(var(--spacing) * -<number>);` | Margin inferior negativa |
| `mb-auto` | `margin-bottom: auto;` | Margin inferior automática |
| `mb-px` | `margin-bottom: 1px;` | Margin inferior de 1 pixel |
| `-mb-px` | `margin-bottom: -1px;` | Margin inferior negativa de 1 pixel |
| `mb-(<custom-property>)` | `margin-bottom: var(<custom-property>);` | Margin inferior com propriedade customizada |
| `mb-[<value>]` | `margin-bottom: <value>;` | Margin inferior com valor arbitrário |

### Margin Left

| Classe | CSS Gerado | Descrição |
|--------|------------|-----------|
| `ml-<number>` | `margin-left: calc(var(--spacing) * <number>);` | Margin esquerda positiva |
| `-ml-<number>` | `margin-left: calc(var(--spacing) * -<number>);` | Margin esquerda negativa |
| `ml-auto` | `margin-left: auto;` | Margin esquerda automática |
| `ml-px` | `margin-left: 1px;` | Margin esquerda de 1 pixel |
| `-ml-px` | `margin-left: -1px;` | Margin esquerda negativa de 1 pixel |
| `ml-(<custom-property>)` | `margin-left: var(<custom-property>);` | Margin esquerda com propriedade customizada |
| `ml-[<value>]` | `margin-left: <value>;` | Margin esquerda com valor arbitrário |

## Espaçamento Entre Elementos

### Space X (Horizontal)

| Classe | CSS Gerado | Descrição |
|--------|------------|-----------|
| `space-x-<number>` | ```& > :not(:last-child) {<br>  --tw-space-x-reverse: 0;<br>  margin-inline-start: calc(calc(var(--spacing) * <number>) * var(--tw-space-x-reverse));<br>  margin-inline-end: calc(calc(var(--spacing) * <number>) * calc(1 - var(--tw-space-x-reverse)));<br>}``` | Espaçamento horizontal positivo |
| `-space-x-<number>` | Similar ao acima com valor negativo | Espaçamento horizontal negativo |
| `space-x-px` | Similar ao acima com `1px` | Espaçamento horizontal de 1 pixel |
| `-space-x-px` | Similar ao acima com `-1px` | Espaçamento horizontal negativo de 1 pixel |
| `space-x-(<custom-property>)` | Similar ao acima com propriedade customizada | Espaçamento horizontal customizado |
| `space-x-[<value>]` | Similar ao acima com valor arbitrário | Espaçamento horizontal arbitrário |

### Space Y (Vertical)

| Classe | CSS Gerado | Descrição |
|--------|------------|-----------|
| `space-y-<number>` | ```& > :not(:last-child) {<br>  --tw-space-y-reverse: 0;<br>  margin-block-start: calc(calc(var(--spacing) * <number>) * var(--tw-space-y-reverse));<br>  margin-block-end: calc(calc(var(--spacing) * <number>) * calc(1 - var(--tw-space-y-reverse)));<br>}``` | Espaçamento vertical positivo |
| `-space-y-<number>` | Similar ao acima com valor negativo | Espaçamento vertical negativo |
| `space-y-px` | Similar ao acima com `1px` | Espaçamento vertical de 1 pixel |
| `-space-y-px` | Similar ao acima com `-1px` | Espaçamento vertical negativo de 1 pixel |
| `space-y-(<custom-property>)` | Similar ao acima com propriedade customizada | Espaçamento vertical customizado |
| `space-y-[<value>]` | Similar ao acima com valor arbitrário | Espaçamento vertical arbitrário |

### Controle de Direção

| Classe | CSS Gerado | Descrição |
|--------|------------|-----------|
| `space-x-reverse` | `& > :not(:last-child) { --tw-space-x-reverse: 1; }` | Reverte o espaçamento horizontal |
| `space-y-reverse` | `& > :not(:last-child) { --tw-space-y-reverse: 1; }` | Reverte o espaçamento vertical |

## Exemplos Práticos

### Exemplo Básico

Use utilitários como `m-4` e `m-8` para controlar a margin em todos os lados de um elemento:

```html
<div class="m-8 bg-blue-500 text-white p-4">
  Elemento com margin de 8
</div>
```

### Adicionando Margin a um Lado Específico

Use `mt-<number>`, `mr-<number>`, `mb-<number>`, e `ml-<number>` para controlar a margin de um lado específico:

```html
<div class="mt-6 bg-red-500 text-white p-4">mt-6</div>
<div class="mr-4 bg-green-500 text-white p-4">mr-4</div>
<div class="mb-8 bg-blue-500 text-white p-4">mb-8</div>
<div class="ml-2 bg-yellow-500 text-white p-4">ml-2</div>
```

### Margin Horizontal

Use utilitários `mx-<number>` como `mx-4` e `mx-8` para controlar a margin horizontal:

```html
<div class="mx-8 bg-purple-500 text-white p-4">
  Margin horizontal de 8
</div>
```

### Margin Vertical

Use utilitários `my-<number>` como `my-4` e `my-8` para controlar a margin vertical:

```html
<div class="my-8 bg-indigo-500 text-white p-4">
  Margin vertical de 8
</div>
```

### Usando Valores Negativos

Para usar valores negativos de margin, prefixe o nome da classe com um traço:

```html
<div class="h-16 w-36 bg-sky-400 opacity-20"></div>
<div class="-mt-8 bg-sky-300 p-4">
  Margin top negativa de -8
</div>
```

### Usando Propriedades Lógicas

Use utilitários `ms-<number>` ou `me-<number>` para definir as propriedades lógicas `margin-inline-start` e `margin-inline-end`:

#### Left-to-right (Esquerda para Direita)
```html
<div dir="ltr">
  <div class="ms-8 bg-green-500 text-white p-4">ms-8 (margin-start)</div>
  <div class="me-8 bg-blue-500 text-white p-4">me-8 (margin-end)</div>
</div>
```

#### Right-to-left (Direita para Esquerda)
```html
<div dir="rtl">
  <div class="ms-8 bg-green-500 text-white p-4">ms-8 (margin-start)</div>
  <div class="me-8 bg-blue-500 text-white p-4">me-8 (margin-end)</div>
</div>
```

### Adicionando Espaço Entre Elementos Filhos

Use utilitários `space-x-<number>` ou `space-y-<number>` para controlar o espaço entre elementos:

```html
<!-- Espaçamento horizontal -->
<div class="flex space-x-4">
  <div class="bg-red-500 text-white p-4">01</div>
  <div class="bg-green-500 text-white p-4">02</div>
  <div class="bg-blue-500 text-white p-4">03</div>
</div>

<!-- Espaçamento vertical -->
<div class="space-y-4">
  <div class="bg-red-500 text-white p-4">01</div>
  <div class="bg-green-500 text-white p-4">02</div>
  <div class="bg-blue-500 text-white p-4">03</div>
</div>
```

#### Revertendo a Ordem dos Elementos

Se seus elementos estão em ordem reversa (usando `flex-row-reverse` ou `flex-col-reverse`), use `space-x-reverse` ou `space-y-reverse`:

```html
<div class="flex flex-row-reverse space-x-4 space-x-reverse">
  <div class="bg-red-500 text-white p-4">01</div>
  <div class="bg-green-500 text-white p-4">02</div>
  <div class="bg-blue-500 text-white p-4">03</div>
</div>
```

#### Limitações dos Utilitários Space

- Os utilitários `space` são um atalho para adicionar margin a todos os itens exceto o último
- Não foram projetados para layouts complexos como grids ou layouts que quebram linha
- Para esses casos, prefira usar utilitários `gap` quando possível
- Os utilitários `space` não funcionam bem junto com utilitários `divide`

### Usando Valores Customizados

Use utilitários como `m-[<value>]`, `mx-[<value>]`, e `mb-[<value>]` para definir margin com valores completamente customizados:

```html
<div class="m-[5px] bg-gray-500 text-white p-4">
  Margin customizada de 5px
</div>
```

Para variáveis CSS, você também pode usar a sintaxe `m-(<custom-property>)`:

```html
<div class="m-(--my-margin) bg-gray-500 text-white p-4">
  Margin usando variável CSS --my-margin
</div>
```

Esta é apenas uma forma abreviada de `m-[var(--my-margin)]` que adiciona a função `var()` automaticamente.

### Design Responsivo

Prefixe um utilitário de margin com uma variante de breakpoint como `md:` para aplicar apenas em telas médias e maiores:

```html
<div class="mt-4 md:mt-8 bg-blue-500 text-white p-4">
  Margin top de 4 em mobile, 8 em desktop
</div>
```

## Customizando seu Tema

Os utilitários `m-<number>`, `mx-<number>`, `my-<number>`, `ms-<number>`, `me-<number>`, `mt-<number>`, `mr-<number>`, `mb-<number>`, e `ml-<number>` são controlados pela variável de tema `--spacing`, que pode ser customizada:

```css
@theme {
  --spacing: 1px;
}
```

Aprenda mais sobre customização da escala de espaçamento na documentação de variáveis de tema.

