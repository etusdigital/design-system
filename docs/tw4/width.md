# Width - Largura

Este guia documenta as classes utilitárias de largura disponíveis no Tailwind CSS v4.

## Classes de Largura

### Classes baseadas em números

| Classe | CSS |
|--------|-----|
| `w-<number>` | `width: calc(var(--spacing) * <number>);` |

### Classes baseadas em frações

| Classe | CSS |
|--------|-----|
| `w-<fraction>` | `width: calc(<fraction> * 100%);` |

### Classes de container

| Classe | CSS | Valor |
|--------|-----|-------|
| `w-3xs` | `width: var(--container-3xs);` | 16rem (256px) |
| `w-2xs` | `width: var(--container-2xs);` | 18rem (288px) |
| `w-xs` | `width: var(--container-xs);` | 20rem (320px) |
| `w-sm` | `width: var(--container-sm);` | 24rem (384px) |
| `w-md` | `width: var(--container-md);` | 28rem (448px) |
| `w-lg` | `width: var(--container-lg);` | 32rem (512px) |
| `w-xl` | `width: var(--container-xl);` | 36rem (576px) |
| `w-2xl` | `width: var(--container-2xl);` | 42rem (672px) |
| `w-3xl` | `width: var(--container-3xl);` | 48rem (768px) |
| `w-4xl` | `width: var(--container-4xl);` | 56rem (896px) |
| `w-5xl` | `width: var(--container-5xl);` | 64rem (1024px) |
| `w-6xl` | `width: var(--container-6xl);` | 72rem (1152px) |
| `w-7xl` | `width: var(--container-7xl);` | 80rem (1280px) |

### Classes especiais

| Classe | CSS |
|--------|-----|
| `w-auto` | `width: auto;` |
| `w-px` | `width: 1px;` |
| `w-full` | `width: 100%;` |
| `w-screen` | `width: 100vw;` |
| `w-dvw` | `width: 100dvw;` |
| `w-dvh` | `width: 100dvh;` |
| `w-lvw` | `width: 100lvw;` |
| `w-lvh` | `width: 100lvh;` |
| `w-svw` | `width: 100svw;` |
| `w-svh` | `width: 100svh;` |
| `w-min` | `width: min-content;` |
| `w-max` | `width: max-content;` |
| `w-fit` | `width: fit-content;` |

### Classes personalizadas

| Classe | CSS |
|--------|-----|
| `w-(<custom-property>)` | `width: var(<custom-property>);` |
| `w-[<value>]` | `width: <value>;` |

## Classes Size (Largura e Altura)

As classes `size-*` definem largura e altura simultaneamente:

### Classes baseadas em números

| Classe | CSS |
|--------|-----|
| `size-<number>` | `width: calc(var(--spacing) * <number>);`<br>`height: calc(var(--spacing) * <number>);` |

### Classes baseadas em frações

| Classe | CSS |
|--------|-----|
| `size-<fraction>` | `width: calc(<fraction> * 100%);`<br>`height: calc(<fraction> * 100%);` |

### Classes especiais size

| Classe | CSS |
|--------|-----|
| `size-auto` | `width: auto;`<br>`height: auto;` |
| `size-px` | `width: 1px;`<br>`height: 1px;` |
| `size-full` | `width: 100%;`<br>`height: 100%;` |
| `size-dvw` | `width: 100dvw;`<br>`height: 100dvw;` |
| `size-dvh` | `width: 100dvh;`<br>`height: 100dvh;` |
| `size-lvw` | `width: 100lvw;`<br>`height: 100lvw;` |
| `size-lvh` | `width: 100lvh;`<br>`height: 100lvh;` |
| `size-svw` | `width: 100svw;`<br>`height: 100svw;` |
| `size-svh` | `width: 100svh;`<br>`height: 100svh;` |
| `size-min` | `width: min-content;`<br>`height: min-content;` |
| `size-max` | `width: max-content;`<br>`height: max-content;` |
| `size-fit` | `width: fit-content;`<br>`height: fit-content;` |

### Classes size personalizadas

| Classe | CSS |
|--------|-----|
| `size-(<custom-property>)` | `width: var(<custom-property>);`<br>`height: var(<custom-property>);` |
| `size-[<value>]` | `width: <value>;`<br>`height: <value>;` |

## Exemplos

### Exemplo básico

Use as classes `w-<number>` como `w-24` e `w-64` para definir uma largura fixa baseada na escala de espaçamento:

```html
<div class="w-96 ...">w-96</div>
<div class="w-80 ...">w-80</div>
<div class="w-64 ...">w-64</div>
<div class="w-48 ...">w-48</div>
<div class="w-40 ...">w-40</div>
<div class="w-32 ...">w-32</div>
<div class="w-24 ...">w-24</div>
```

### Usando porcentagem

Use `w-full` ou classes `w-<fraction>` como `w-1/2` e `w-2/5` para dar ao elemento uma largura baseada em porcentagem:

```html
<div class="flex ...">
  <div class="w-1/2 ...">w-1/2</div>
  <div class="w-1/2 ...">w-1/2</div>
</div>

<div class="flex ...">
  <div class="w-2/5 ...">w-2/5</div>
  <div class="w-3/5 ...">w-3/5</div>
</div>

<div class="flex ...">
  <div class="w-1/3 ...">w-1/3</div>
  <div class="w-2/3 ...">w-2/3</div>
</div>

<div class="flex ...">
  <div class="w-1/4 ...">w-1/4</div>
  <div class="w-3/4 ...">w-3/4</div>
</div>

<div class="flex ...">
  <div class="w-1/5 ...">w-1/5</div>
  <div class="w-4/5 ...">w-4/5</div>
</div>

<div class="flex ...">
  <div class="w-1/6 ...">w-1/6</div>
  <div class="w-5/6 ...">w-5/6</div>
</div>

<div class="w-full ...">w-full</div>
```

### Usando a escala de container

Use classes como `w-sm` e `w-xl` para definir uma largura fixa baseada na escala de container:

```html
<div class="w-xl ...">w-xl</div>
<div class="w-lg ...">w-lg</div>
<div class="w-md ...">w-md</div>
<div class="w-sm ...">w-sm</div>
<div class="w-xs ...">w-xs</div>
<div class="w-2xs ...">w-2xs</div>
<div class="w-3xs ...">w-3xs</div>
```

### Correspondendo ao viewport

Use a classe `w-screen` para fazer um elemento ocupar toda a largura do viewport:

```html
<div class="w-screen">
  <!-- ... -->
</div>
```

Alternativamente, você pode corresponder à largura dos viewports large, small ou dynamic usando as classes `w-lvw`, `w-svw` e `w-dvw`.

### Resetando a largura

Use a classe `w-auto` para remover a largura atribuída de um elemento sob uma condição específica, como em um breakpoint particular:

```html
<div class="w-full md:w-auto">
  <!-- ... -->
</div>
```

### Definindo largura e altura

Use classes como `size-px`, `size-4` e `size-full` para definir largura e altura de um elemento ao mesmo tempo:

```html
<div class="size-16 ...">size-16</div>
<div class="size-20 ...">size-20</div>
<div class="size-24 ...">size-24</div>
<div class="size-32 ...">size-32</div>
<div class="size-40 ...">size-40</div>
```

### Usando um valor personalizado

Use a sintaxe `w-[<value>]` para definir a largura baseada em um valor completamente personalizado:

```html
<div class="w-[5px] ...">
  <!-- ... -->
</div>
```

Para variáveis CSS, você também pode usar a sintaxe `w-(<custom-property>)`:

```html
<div class="w-(--my-width) ...">
  <!-- ... -->
</div>
```

Isso é apenas uma abreviação para `w-[var(<custom-property>)]` que adiciona a função `var()` automaticamente para você.

### Design responsivo

Prefixe uma classe de largura com uma variante de breakpoint como `md:` para aplicar a classe apenas em tamanhos de tela médios e maiores:

```html
<div class="w-1/2 md:w-full ...">
  <!-- ... -->
</div>
```

Saiba mais sobre o uso de variantes na documentação de variantes.

## Personalizando seu tema

As classes `w-<number>` e `size-<number>` são baseadas na variável de tema `--spacing`, que pode ser personalizada no seu próprio tema:

```css
@theme {
  --spacing: 1px;
}
```

Saiba mais sobre personalizar a escala de espaçamento na documentação de variáveis de tema.

