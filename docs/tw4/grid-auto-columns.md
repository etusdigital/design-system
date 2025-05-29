# Grid Auto Columns

As classes de grid auto columns controlam o tamanho das colunas da grade criadas implicitamente.

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `auto-cols-auto` | `grid-auto-columns: auto;` |
| `auto-cols-min` | `grid-auto-columns: min-content;` |
| `auto-cols-max` | `grid-auto-columns: max-content;` |
| `auto-cols-fr` | `grid-auto-columns: minmax(0, 1fr);` |
| `auto-cols-(<custom-property>)` | `grid-auto-columns: var(<custom-property>);` |
| `auto-cols-[<value>]` | `grid-auto-columns: <value>;` |

## Exemplos

### Exemplo básico

Use utilitários como `auto-cols-min` e `auto-cols-max` para controlar o tamanho das colunas da grade criadas implicitamente:

**Usando `auto-cols-min`:**
```html
<div class="grid auto-cols-min grid-flow-col">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

**Usando `auto-cols-max`:**
```html
<div class="grid auto-cols-max grid-flow-col">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

### Usando um valor customizado

Use a sintaxe `auto-cols-[<value>]` para definir o tamanho das colunas da grade criadas implicitamente com base em um valor completamente personalizado:

```html
<div class="auto-cols-[minmax(0,2fr)] grid grid-flow-col">
  <!-- ... -->
</div>
```

Para variáveis CSS, você também pode usar a sintaxe `auto-cols-(<custom-property>)`:

```html
<div class="auto-cols-(--my-auto-cols) grid grid-flow-col">
  <!-- ... -->
</div>
```

> **Nota:** Esta é apenas uma forma abreviada de `auto-cols-[var(<custom-property>)]` que adiciona a função `var()` automaticamente para você.

### Design responsivo

Prefixe um utilitário grid-auto-columns com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e superiores:

```html
<div class="grid grid-flow-col auto-cols-max md:auto-cols-min">
  <!-- ... -->
</div>
```

> Para mais informações sobre o uso de variantes, consulte a documentação de variantes.

