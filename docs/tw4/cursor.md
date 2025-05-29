# Cursor

## Classes Disponíveis

### Cursores Básicos

| Classe | Propriedade CSS |
|--------|-----------------|
| `cursor-auto` | `cursor: auto;` |
| `cursor-default` | `cursor: default;` |
| `cursor-pointer` | `cursor: pointer;` |
| `cursor-wait` | `cursor: wait;` |
| `cursor-text` | `cursor: text;` |
| `cursor-move` | `cursor: move;` |
| `cursor-help` | `cursor: help;` |
| `cursor-not-allowed` | `cursor: not-allowed;` |
| `cursor-none` | `cursor: none;` |

### Cursores de Contexto

| Classe | Propriedade CSS |
|--------|-----------------|
| `cursor-context-menu` | `cursor: context-menu;` |
| `cursor-progress` | `cursor: progress;` |
| `cursor-cell` | `cursor: cell;` |
| `cursor-crosshair` | `cursor: crosshair;` |
| `cursor-vertical-text` | `cursor: vertical-text;` |

### Cursores de Ação

| Classe | Propriedade CSS |
|--------|-----------------|
| `cursor-alias` | `cursor: alias;` |
| `cursor-copy` | `cursor: copy;` |
| `cursor-no-drop` | `cursor: no-drop;` |
| `cursor-grab` | `cursor: grab;` |
| `cursor-grabbing` | `cursor: grabbing;` |
| `cursor-all-scroll` | `cursor: all-scroll;` |

### Cursores de Redimensionamento

| Classe | Propriedade CSS |
|--------|-----------------|
| `cursor-col-resize` | `cursor: col-resize;` |
| `cursor-row-resize` | `cursor: row-resize;` |
| `cursor-n-resize` | `cursor: n-resize;` |
| `cursor-e-resize` | `cursor: e-resize;` |
| `cursor-s-resize` | `cursor: s-resize;` |
| `cursor-w-resize` | `cursor: w-resize;` |
| `cursor-ne-resize` | `cursor: ne-resize;` |
| `cursor-nw-resize` | `cursor: nw-resize;` |
| `cursor-se-resize` | `cursor: se-resize;` |
| `cursor-sw-resize` | `cursor: sw-resize;` |
| `cursor-ew-resize` | `cursor: ew-resize;` |
| `cursor-ns-resize` | `cursor: ns-resize;` |
| `cursor-nesw-resize` | `cursor: nesw-resize;` |
| `cursor-nwse-resize` | `cursor: nwse-resize;` |

### Cursores de Zoom

| Classe | Propriedade CSS |
|--------|-----------------|
| `cursor-zoom-in` | `cursor: zoom-in;` |
| `cursor-zoom-out` | `cursor: zoom-out;` |

### Cursores Personalizados

| Classe | Propriedade CSS |
|--------|-----------------|
| `cursor-(<custom-property>)` | `cursor: var(<custom-property>);` |
| `cursor-[<value>]` | `cursor: <value>;` |

## Exemplos

### Exemplo Básico

Use utilitários como `cursor-pointer` e `cursor-grab` para controlar qual cursor é exibido ao passar o mouse sobre um elemento:

**Passe o mouse sobre cada botão para ver o cursor mudar**

```html
<button class="cursor-pointer ...">Submit</button>
<button class="cursor-progress ...">Saving...</button>
<button class="cursor-not-allowed ..." disabled>Confirm</button>
```

### Usando um Valor Personalizado

Use a sintaxe `cursor-[<value>]` para definir o cursor com base em um valor completamente personalizado:

```html
<button class="cursor-[url(hand.cur),_pointer] ...">
  <!-- ... -->
</button>
```

Para variáveis CSS, você também pode usar a sintaxe `cursor-(<custom-property>)`:

```html
<button class="cursor-(--my-cursor) ...">
  <!-- ... -->
</button>
```

Isso é apenas uma abreviação para `cursor-[var(<custom-property>)]` que adiciona a função `var()` automaticamente.

### Design Responsivo

Prefixe um utilitário de cursor com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e maiores:

```html
<button class="cursor-not-allowed md:cursor-auto ...">
  <!-- ... -->
</button>
```

Saiba mais sobre o uso de variantes na documentação de variantes.

