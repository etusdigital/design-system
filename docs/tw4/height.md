# Height (Altura)

Documentação das utilities de altura no Tailwind CSS v4.

## Classes de Altura

### Altura Básica

| Classe | CSS Gerado |
|--------|------------|
| `h-<number>` | `height: calc(var(--spacing) * <number>);` |
| `h-<fraction>` | `height: calc(<fraction> * 100%);` |
| `h-auto` | `height: auto;` |
| `h-px` | `height: 1px;` |
| `h-full` | `height: 100%;` |

### Altura de Viewport

| Classe | CSS Gerado | Descrição |
|--------|------------|-----------|
| `h-screen` | `height: 100vh;` | Altura da tela |
| `h-dvh` | `height: 100dvh;` | Altura dinâmica da viewport |
| `h-lvh` | `height: 100lvh;` | Altura grande da viewport |
| `h-svh` | `height: 100svh;` | Altura pequena da viewport |
| `h-dvw` | `height: 100dvw;` | Largura dinâmica da viewport como altura |
| `h-lvw` | `height: 100lvw;` | Largura grande da viewport como altura |
| `h-svw` | `height: 100svw;` | Largura pequena da viewport como altura |

### Altura de Conteúdo

| Classe | CSS Gerado |
|--------|------------|
| `h-min` | `height: min-content;` |
| `h-max` | `height: max-content;` |
| `h-fit` | `height: fit-content;` |
| `h-lh` | `height: 1lh;` |

### Valores Customizados

| Classe | CSS Gerado |
|--------|------------|
| `h-(<custom-property>)` | `height: var(<custom-property>);` |
| `h-[<value>]` | `height: <value>;` |

## Classes de Tamanho (Width + Height)

### Tamanho Básico

| Classe | CSS Gerado |
|--------|------------|
| `size-<number>` | `width: calc(var(--spacing) * <number>);`<br>`height: calc(var(--spacing) * <number>);` |
| `size-<fraction>` | `width: calc(<fraction> * 100%);`<br>`height: calc(<fraction> * 100%);` |
| `size-auto` | `width: auto;`<br>`height: auto;` |
| `size-px` | `width: 1px;`<br>`height: 1px;` |
| `size-full` | `width: 100%;`<br>`height: 100%;` |

### Tamanho de Viewport

| Classe | CSS Gerado |
|--------|------------|
| `size-dvw` | `width: 100dvw;`<br>`height: 100dvw;` |
| `size-dvh` | `width: 100dvh;`<br>`height: 100dvh;` |
| `size-lvw` | `width: 100lvw;`<br>`height: 100lvw;` |
| `size-lvh` | `width: 100lvh;`<br>`height: 100lvh;` |
| `size-svw` | `width: 100svw;`<br>`height: 100svw;` |
| `size-svh` | `width: 100svh;`<br>`height: 100svh;` |

### Tamanho de Conteúdo

| Classe | CSS Gerado |
|--------|------------|
| `size-min` | `width: min-content;`<br>`height: min-content;` |
| `size-max` | `width: max-content;`<br>`height: max-content;` |
| `size-fit` | `width: fit-content;`<br>`height: fit-content;` |

### Tamanhos Customizados

| Classe | CSS Gerado |
|--------|------------|
| `size-(<custom-property>)` | `width: var(<custom-property>);`<br>`height: var(<custom-property>);` |
| `size-[<value>]` | `width: <value>;`<br>`height: <value>;` |

## Exemplos de Uso

### Exemplo Básico

Use as utilities `h-<number>` como `h-24` e `h-64` para definir uma altura fixa baseada na escala de espaçamento:

```html
<div class="h-96">h-96</div>
<div class="h-80">h-80</div>
<div class="h-64">h-64</div>
<div class="h-48">h-48</div>
<div class="h-40">h-40</div>
<div class="h-32">h-32</div>
<div class="h-24">h-24</div>
```

### Usando Percentual

Use `h-full` ou utilities `h-<fraction>` como `h-1/2` e `h-2/5` para dar a um elemento uma altura baseada em percentual:

```html
<div class="h-full">h-full</div>
<div class="h-9/10">h-9/10</div>
<div class="h-3/4">h-3/4</div>
<div class="h-1/2">h-1/2</div>
<div class="h-1/3">h-1/3</div>
```

### Altura da Viewport

Use a utility `h-screen` para fazer um elemento ocupar toda a altura da viewport:

```html
<div class="h-screen">
  <!-- ... -->
</div>
```

### Viewport Dinâmica

Use a utility `h-dvh` para fazer um elemento ocupar toda a altura da viewport, que muda conforme a UI do navegador expande ou contrai:

```html
<div class="h-dvh">
  <!-- ... -->
</div>
```

### Viewport Grande

Use a utility `h-lvh` para definir a altura de um elemento para a maior altura possível da viewport:

```html
<div class="h-lvh">
  <!-- ... -->
</div>
```

### Viewport Pequena

Use a utility `h-svh` para definir a altura de um elemento para a menor altura possível da viewport:

```html
<div class="h-svh">
  <!-- ... -->
</div>
```

### Definindo Largura e Altura

Use utilities como `size-px`, `size-4`, e `size-full` para definir tanto a largura quanto a altura de um elemento ao mesmo tempo:

```html
<div class="size-16">size-16</div>
<div class="size-20">size-20</div>
<div class="size-24">size-24</div>
<div class="size-32">size-32</div>
<div class="size-40">size-40</div>
```

### Usando Valores Customizados

Use a sintaxe `h-[<value>]` para definir a altura baseada em um valor completamente customizado:

```html
<div class="h-[32rem]">
  <!-- ... -->
</div>
```

Para variáveis CSS, você também pode usar a sintaxe `h-(<custom-property>)`:

```html
<div class="h-(--my-height)">
  <!-- ... -->
</div>
```

Isso é apenas um atalho para `h-[var(<custom-property>)]` que adiciona a função `var()` automaticamente.

### Design Responsivo

Prefixe uma utility de altura com uma variante de breakpoint como `md:` para aplicar a utility apenas em tamanhos de tela médios e acima:

```html
<div class="h-1/2 md:h-full">
  <!-- ... -->
</div>
```

Saiba mais sobre o uso de variantes na documentação de variantes.

## Customizando seu Tema

As utilities `h-<number>` e `size-<number>` são controladas pela variável de tema `--spacing`, que pode ser customizada no seu próprio tema:

```css
@theme {
  --spacing: 1px;
}
```

Saiba mais sobre customização da escala de espaçamento na documentação de variáveis de tema.

