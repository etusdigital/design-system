# Vertical Align

As utilitários de alinhamento vertical controlam o alinhamento vertical de um elemento inline ou table-cell.

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `align-baseline` | `vertical-align: baseline;` |
| `align-top` | `vertical-align: top;` |
| `align-middle` | `vertical-align: middle;` |
| `align-bottom` | `vertical-align: bottom;` |
| `align-text-top` | `vertical-align: text-top;` |
| `align-text-bottom` | `vertical-align: text-bottom;` |
| `align-sub` | `vertical-align: sub;` |
| `align-super` | `vertical-align: super;` |
| `align-(<custom-property>)` | `vertical-align: var(<custom-property>);` |
| `align-[<value>]` | `vertical-align: <value>;` |

## Exemplos

### Alinhando à linha de base (baseline)

Use o utilitário `align-baseline` para alinhar a linha de base de um elemento com a linha de base de seu elemento pai:

```html
<span class="inline-block align-baseline">The quick brown fox...</span>
```

### Alinhando ao topo

Use o utilitário `align-top` para alinhar o topo de um elemento e seus descendentes com o topo de toda a linha:

```html
<span class="inline-block align-top">The quick brown fox...</span>
```

### Alinhando ao meio

Use o utilitário `align-middle` para alinhar o meio de um elemento com a linha de base mais metade da altura-x do elemento pai:

```html
<span class="inline-block align-middle">The quick brown fox...</span>
```

### Alinhando à parte inferior

Use o utilitário `align-bottom` para alinhar a parte inferior de um elemento e seus descendentes com a parte inferior de toda a linha:

```html
<span class="inline-block align-bottom">The quick brown fox...</span>
```

### Alinhando ao topo do texto pai

Use o utilitário `align-text-top` para alinhar o topo de um elemento com o topo da fonte do elemento pai:

```html
<span class="inline-block align-text-top">The quick brown fox...</span>
```

### Alinhando à parte inferior do texto pai

Use o utilitário `align-text-bottom` para alinhar a parte inferior de um elemento com a parte inferior da fonte do elemento pai:

```html
<span class="inline-block align-text-bottom">The quick brown fox...</span>
```

## Valores Personalizados

### Usando um valor customizado

Use a sintaxe `align-[<value>]` para definir o alinhamento vertical baseado em um valor completamente personalizado:

```html
<span class="align-[4px]">
  <!-- ... -->
</span>
```

### Usando propriedades CSS customizadas

Para variáveis CSS, você também pode usar a sintaxe `align-(<custom-property>)`:

```html
<span class="align-(--my-alignment)">
  <!-- ... -->
</span>
```

Isso é apenas uma forma abreviada de `align-[var(<custom-property>)]` que adiciona a função `var()` automaticamente para você.

## Design Responsivo

Prefixe um utilitário de alinhamento vertical com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e maiores:

```html
<span class="align-middle md:align-top">
  <!-- ... -->
</span>
```

Saiba mais sobre o uso de variantes na [documentação de variantes](../variants.md).

