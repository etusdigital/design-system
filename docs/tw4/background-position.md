# Background Position

Utilitários para controlar a posição da imagem de fundo de um elemento.

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `bg-top-left` | `background-position: top left;` |
| `bg-top` | `background-position: top;` |
| `bg-top-right` | `background-position: top right;` |
| `bg-left` | `background-position: left;` |
| `bg-center` | `background-position: center;` |
| `bg-right` | `background-position: right;` |
| `bg-bottom-left` | `background-position: bottom left;` |
| `bg-bottom` | `background-position: bottom;` |
| `bg-bottom-right` | `background-position: bottom right;` |
| `bg-position-(<custom-property>)` | `background-position: var(<custom-property>);` |
| `bg-position-[<value>]` | `background-position: <value>;` |

## Exemplos

### Exemplo básico

Use utilitários como `bg-center`, `bg-right` e `bg-top-left` para controlar a posição da imagem de fundo de um elemento:

> Passe o mouse sobre estes exemplos para ver a imagem completa

**bg-top-left**
```html
<div class="bg-[url(/img/mountains.jpg)] bg-top-left"></div>
```

**bg-top**
```html
<div class="bg-[url(/img/mountains.jpg)] bg-top"></div>
```

**bg-top-right**
```html
<div class="bg-[url(/img/mountains.jpg)] bg-top-right"></div>
```

**bg-left**
```html
<div class="bg-[url(/img/mountains.jpg)] bg-left"></div>
```

**bg-center**
```html
<div class="bg-[url(/img/mountains.jpg)] bg-center"></div>
```

**bg-right**
```html
<div class="bg-[url(/img/mountains.jpg)] bg-right"></div>
```

**bg-bottom-left**
```html
<div class="bg-[url(/img/mountains.jpg)] bg-bottom-left"></div>
```

**bg-bottom**
```html
<div class="bg-[url(/img/mountains.jpg)] bg-bottom"></div>
```

**bg-bottom-right**
```html
<div class="bg-[url(/img/mountains.jpg)] bg-bottom-right"></div>
```

### Usando um valor customizado

Use a sintaxe `bg-position-[<value>]` para definir a posição do fundo baseada em um valor completamente customizado:

```html
<div class="bg-position-[center_top_1rem] ...">
  <!-- ... -->
</div>
```

Para variáveis CSS, você também pode usar a sintaxe `bg-position-(<custom-property>)`:

```html
<div class="bg-position-(--my-bg-position) ...">
  <!-- ... -->
</div>
```

Isso é apenas uma abreviação para `bg-position-[var(<custom-property>)]` que adiciona a função `var()` automaticamente para você.

### Design responsivo

Prefixe um utilitário de background-position com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e acima:

```html
<div class="bg-center md:bg-top ...">
  <!-- ... -->
</div>
```

Saiba mais sobre o uso de variantes na documentação de variantes.

