# Flex Basis

A propriedade `flex-basis` define o tamanho inicial de um item flexível antes que o espaço livre seja distribuído de acordo com os fatores de flex.

## Classes Disponíveis

### Baseadas no Sistema de Espaçamento

| Classe | CSS | Descrição |
|--------|-----|-----------|
| `basis-<number>` | `flex-basis: calc(var(--spacing) * <number>);` | Usa a escala de espaçamento |

### Baseadas em Frações

| Classe | CSS | Descrição |
|--------|-----|-----------|
| `basis-<fraction>` | `flex-basis: calc(<fraction> * 100%);` | Percentuais baseados em frações |
| `basis-full` | `flex-basis: 100%;` | Largura completa |

### Valor Automático

| Classe | CSS | Descrição |
|--------|-----|-----------|
| `basis-auto` | `flex-basis: auto;` | Valor automático |

### Baseadas no Sistema de Containers

| Classe | CSS | Valor |
|--------|-----|-------|
| `basis-3xs` | `flex-basis: var(--container-3xs);` | 16rem (256px) |
| `basis-2xs` | `flex-basis: var(--container-2xs);` | 18rem (288px) |
| `basis-xs` | `flex-basis: var(--container-xs);` | 20rem (320px) |
| `basis-sm` | `flex-basis: var(--container-sm);` | 24rem (384px) |
| `basis-md` | `flex-basis: var(--container-md);` | 28rem (448px) |
| `basis-lg` | `flex-basis: var(--container-lg);` | 32rem (512px) |
| `basis-xl` | `flex-basis: var(--container-xl);` | 36rem (576px) |
| `basis-2xl` | `flex-basis: var(--container-2xl);` | 42rem (672px) |
| `basis-3xl` | `flex-basis: var(--container-3xl);` | 48rem (768px) |
| `basis-4xl` | `flex-basis: var(--container-4xl);` | 56rem (896px) |
| `basis-5xl` | `flex-basis: var(--container-5xl);` | 64rem (1024px) |
| `basis-6xl` | `flex-basis: var(--container-6xl);` | 72rem (1152px) |
| `basis-7xl` | `flex-basis: var(--container-7xl);` | 80rem (1280px) |

### Valores Personalizados

| Classe | CSS | Descrição |
|--------|-----|-----------|
| `basis-(<custom-property>)` | `flex-basis: var(<custom-property>);` | Usando propriedades CSS customizadas |
| `basis-[<value>]` | `flex-basis: <value>;` | Valores arbitrários |

## Exemplos de Uso

### Usando a Escala de Espaçamento

Use as classes `basis-<number>` como `basis-64` e `basis-128` para definir o tamanho inicial dos itens flex baseado na escala de espaçamento:

```html
<div class="flex flex-row">
  <div class="basis-64">01</div>
  <div class="basis-64">02</div>
  <div class="basis-128">03</div>
</div>
```

### Usando a Escala de Containers

Use classes como `basis-xs` e `basis-sm` para definir o tamanho inicial dos itens flex baseado na escala de containers:

```html
<div class="flex flex-row">
  <div class="basis-3xs">01</div>
  <div class="basis-2xs">02</div>
  <div class="basis-xs">03</div>
  <div class="basis-sm">04</div>
</div>
```

### Usando Percentuais

Use classes `basis-<fraction>` como `basis-1/2` e `basis-2/3` para definir o tamanho inicial dos itens flex:

```html
<div class="flex flex-row">
  <div class="basis-1/3">01</div>
  <div class="basis-2/3">02</div>
</div>
```

### Usando Valores Personalizados

Use a sintaxe `basis-[<value>]` para definir a base com um valor completamente personalizado:

```html
<div class="basis-[30vw]">
  <!-- conteúdo -->
</div>
```

Para variáveis CSS, você também pode usar a sintaxe `basis-(<custom-property>)`:

```html
<div class="basis-(--my-basis)">
  <!-- conteúdo -->
</div>
```

Esta é apenas uma forma abreviada de `basis-[var(<custom-property>)]` que adiciona a função `var()` automaticamente.

## Design Responsivo

Prefixe uma classe de flex-basis com uma variante de breakpoint como `md:` para aplicar a classe apenas em tamanhos de tela médios e acima:

```html
<div class="flex flex-row">
  <div class="basis-1/4 md:basis-1/3">01</div>
  <div class="basis-1/4 md:basis-1/3">02</div>
  <div class="basis-1/2 md:basis-1/3">03</div>
</div>
```

Saiba mais sobre o uso de variantes na [documentação de variantes](../variants.md).

## Personalizando seu Tema

### Containers Personalizados

Use as variáveis de tema `--container-*` para personalizar as classes de basis de largura fixa em seu projeto:

```css
@theme {
  --container-4xs: 14rem;
}
```

Agora a classe `basis-4xs` pode ser usada em seu markup:

```html
<div class="basis-4xs">
  <!-- conteúdo -->
</div>
```

### Escala de Espaçamento Personalizada

As classes `basis-<number>` são baseadas na variável de tema `--spacing`, que você também pode personalizar:

```css
@theme {
  --spacing: 1px;
}
```

Saiba mais sobre personalização da escala de espaçamento na [documentação de tema](../theme.md).

