# Background Origin

As classes de `background-origin` controlam onde a imagem de fundo de um elemento é renderizada em relação às bordas, padding e conteúdo.

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `bg-origin-border` | `background-origin: border-box;` |
| `bg-origin-padding` | `background-origin: padding-box;` |
| `bg-origin-content` | `background-origin: content-box;` |

## Exemplos

### Exemplo Básico

Use as classes `bg-origin-border`, `bg-origin-padding` e `bg-origin-content` para controlar onde a imagem de fundo de um elemento é renderizada:

#### bg-origin-border
A imagem de fundo se estende até a borda externa do elemento.

#### bg-origin-padding
A imagem de fundo se estende até a borda interna (início do padding).

#### bg-origin-content
A imagem de fundo se estende apenas na área do conteúdo.

```html
<!-- Background origin: border-box -->
<div class="border-4 bg-[url(/img/mountains.jpg)] bg-origin-border p-3">
  bg-origin-border
</div>

<!-- Background origin: padding-box -->
<div class="border-4 bg-[url(/img/mountains.jpg)] bg-origin-padding p-3">
  bg-origin-padding
</div>

<!-- Background origin: content-box -->
<div class="border-4 bg-[url(/img/mountains.jpg)] bg-origin-content p-3">
  bg-origin-content
</div>
```

### Design Responsivo

Prefixe uma classe de `background-origin` com uma variante de breakpoint como `md:` para aplicar a classe apenas em tamanhos de tela médios ou maiores:

```html
<div class="bg-origin-border md:bg-origin-padding">
  <!-- ... -->
</div>
```

Saiba mais sobre o uso de variantes na [documentação de variantes](../variants.md).

