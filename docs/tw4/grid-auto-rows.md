# grid-auto-rows

Controla o tamanho das linhas implicitamente criadas em um grid.

## Utilidades

| Classe | Propriedade CSS |
|--------|-----------------|
| `auto-rows-auto` | `grid-auto-rows: auto;` |
| `auto-rows-min` | `grid-auto-rows: min-content;` |
| `auto-rows-max` | `grid-auto-rows: max-content;` |
| `auto-rows-fr` | `grid-auto-rows: minmax(0, 1fr);` |
| `auto-rows-(<custom-property>)` | `grid-auto-rows: var(<custom-property>);` |
| `auto-rows-[<value>]` | `grid-auto-rows: <value>;` |

## Exemplos

### Exemplo básico

Use utilidades como `auto-rows-min` e `auto-rows-max` para controlar o tamanho das linhas de grid criadas implicitamente:

**auto-rows-min:**
```html
<div class="grid grid-flow-row auto-rows-min">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

**auto-rows-max:**
```html
<div class="grid grid-flow-row auto-rows-max">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

### Usando um valor personalizado

Use a sintaxe `auto-rows-[<value>]` para definir o tamanho das linhas de grid criadas implicitamente com base em um valor completamente personalizado:

```html
<div class="auto-rows-[minmax(0,2fr)] ...">
  <!-- ... -->
</div>
```

Para variáveis CSS, você também pode usar a sintaxe `auto-rows-(<custom-property>)`:

```html
<div class="auto-rows-(--my-auto-rows) ...">
  <!-- ... -->
</div>
```

Isso é apenas uma forma abreviada de `auto-rows-[var(<custom-property>)]` que adiciona a função `var()` automaticamente para você.

### Design responsivo

Prefixe uma utilidade `grid-auto-rows` com uma variante de breakpoint como `md:` para aplicar a utilidade apenas em tamanhos de tela médios e maiores:

```html
<div class="grid grid-flow-row auto-rows-max md:auto-rows-min ...">
  <!-- ... -->
</div>
```

Saiba mais sobre o uso de variantes na documentação de variantes.

