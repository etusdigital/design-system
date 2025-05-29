# min-height

Este documento descreve as utilitários de altura mínima (`min-height`) disponíveis no Tailwind CSS v4.

## Utilitários Disponíveis

### Baseados em Spacing Scale

| Classe | Propriedade CSS |
|--------|----------------|
| `min-h-<number>` | `min-height: calc(var(--spacing) * <number>);` |

### Baseados em Porcentagem

| Classe | Propriedade CSS |
|--------|----------------|
| `min-h-<fraction>` | `min-height: calc(<fraction> * 100%);` |

### Valores Fixos

| Classe | Propriedade CSS |
|--------|----------------|
| `min-h-px` | `min-height: 1px;` |
| `min-h-full` | `min-height: 100%;` |

### Viewport Units

| Classe | Propriedade CSS |
|--------|----------------|
| `min-h-screen` | `min-height: 100vh;` |
| `min-h-dvh` | `min-height: 100dvh;` |
| `min-h-dvw` | `min-height: 100dvw;` |
| `min-h-lvh` | `min-height: 100lvh;` |
| `min-h-lvw` | `min-height: 100lvw;` |
| `min-h-svw` | `min-height: 100svw;` |
| `min-h-svh` | `min-height: 100svh;` |

### Valores de Conteúdo

| Classe | Propriedade CSS |
|--------|----------------|
| `min-h-auto` | `min-height: auto;` |
| `min-h-min` | `min-height: min-content;` |
| `min-h-max` | `min-height: max-content;` |
| `min-h-fit` | `min-height: fit-content;` |
| `min-h-lh` | `min-height: 1lh;` |

### Valores Personalizados

| Classe | Propriedade CSS |
|--------|----------------|
| `min-h-(<custom-property>)` | `min-height: var(<custom-property>);` |
| `min-h-[<value>]` | `min-height: <value>;` |

## Exemplos

### Exemplo Básico

Use utilitários `min-h-<number>` como `min-h-24` e `min-h-64` para definir uma altura mínima fixa baseada na escala de espaçamento:

```html
<div class="h-20 ...">
  <div class="min-h-80 ...">min-h-80</div>
  <div class="min-h-64 ...">min-h-64</div>
  <div class="min-h-48 ...">min-h-48</div>
  <div class="min-h-40 ...">min-h-40</div>
  <div class="min-h-32 ...">min-h-32</div>
  <div class="min-h-24 ...">min-h-24</div>
</div>
```

### Usando Porcentagem

Use `min-h-full` ou utilitários `min-h-<fraction>` como `min-h-1/2` e `min-h-2/5` para dar ao elemento uma altura mínima baseada em porcentagem:

```html
<div class="min-h-full ...">min-h-full</div>
<div class="min-h-9/10 ...">min-h-9/10</div>
<div class="min-h-3/4 ...">min-h-3/4</div>
<div class="min-h-1/2 ...">min-h-1/2</div>
<div class="min-h-1/3 ...">min-h-1/3</div>
```

### Usando Valor Personalizado

Use a sintaxe `min-h-[<value>]` para definir a altura mínima baseada em um valor completamente personalizado:

```html
<div class="min-h-[220px] ...">
  <!-- ... -->
</div>
```

Para variáveis CSS, você também pode usar a sintaxe `min-h-(<custom-property>)`:

```html
<div class="min-h-(--my-min-height) ...">
  <!-- ... -->
</div>
```

Isso é apenas um atalho para `min-h-[var(<custom-property>)]` que adiciona a função `var()` automaticamente.

### Design Responsivo

Prefixe um utilitário de altura mínima com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e maiores:

```html
<div class="h-24 min-h-0 md:min-h-full ...">
  <!-- ... -->
</div>
```

Saiba mais sobre o uso de variantes na documentação de variantes.

## Personalizando seu Tema

Os utilitários `min-h-<number>` são controlados pela variável de tema `--spacing`, que pode ser personalizada em seu próprio tema:

```css
@theme {
  --spacing: 1px;
}
```

Saiba mais sobre personalização da escala de espaçamento na documentação de variáveis de tema.

