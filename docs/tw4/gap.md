# Gap

## Sintaxe das Classes

| Classe | CSS Gerado | Descrição |
|--------|------------|-----------|
| `gap-<number>` | `gap: calc(var(--spacing) * <value>);` | Define gap para linhas e colunas |
| `gap-(<custom-property>)` | `gap: var(<custom-property>);` | Gap usando propriedade CSS customizada |
| `gap-[<value>]` | `gap: <value>;` | Gap com valor arbitrário |
| `gap-x-<number>` | `column-gap: calc(var(--spacing) * <value>);` | Gap apenas para colunas |
| `gap-x-(<custom-property>)` | `column-gap: var(<custom-property>);` | Gap de colunas com propriedade customizada |
| `gap-x-[<value>]` | `column-gap: <value>;` | Gap de colunas com valor arbitrário |
| `gap-y-<number>` | `row-gap: calc(var(--spacing) * <value>);` | Gap apenas para linhas |
| `gap-y-(<custom-property>)` | `row-gap: var(<custom-property>);` | Gap de linhas com propriedade customizada |
| `gap-y-[<value>]` | `row-gap: <value>;` | Gap de linhas com valor arbitrário |

## Exemplos

### Exemplo básico

Use as classes `gap-<number>` como `gap-2` e `gap-4` para alterar o espaçamento entre linhas e colunas em layouts grid e flexbox:

```html
<div class="grid grid-cols-2 gap-4">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
</div>
```

### Alterando gaps de linha e coluna independentemente

Use as classes `gap-x-<number>` ou `gap-y-<number>` como `gap-x-8` e `gap-y-4` para alterar o espaçamento entre colunas e linhas de forma independente:

```html
<div class="grid grid-cols-3 gap-x-8 gap-y-4">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
  <div>05</div>
  <div>06</div>
</div>
```

### Usando um valor personalizado

Use classes como `gap-[<value>]`, `gap-x-[<value>]` e `gap-y-[<value>]` para definir o gap baseado em um valor completamente personalizado:

```html
<div class="gap-[10vw] ...">
  <!-- ... -->
</div>
```

Para variáveis CSS, você também pode usar a sintaxe `gap-(<custom-property>)`:

```html
<div class="gap-(--my-gap) ...">
  <!-- ... -->
</div>
```

Esta é apenas uma forma abreviada de `gap-[var(<custom-property>)]` que adiciona a função `var()` automaticamente.

### Design responsivo

Prefixe as classes `gap`, `column-gap` e `row-gap` com uma variante de breakpoint como `md:` para aplicar a classe apenas em tamanhos de tela médios ou maiores:

```html
<div class="grid gap-4 md:gap-6 ...">
  <!-- ... -->
</div>
```

Saiba mais sobre o uso de variantes na documentação de variantes.

