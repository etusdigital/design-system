# background-blend-mode

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `bg-blend-normal` | `background-blend-mode: normal;` |
| `bg-blend-multiply` | `background-blend-mode: multiply;` |
| `bg-blend-screen` | `background-blend-mode: screen;` |
| `bg-blend-overlay` | `background-blend-mode: overlay;` |
| `bg-blend-darken` | `background-blend-mode: darken;` |
| `bg-blend-lighten` | `background-blend-mode: lighten;` |
| `bg-blend-color-dodge` | `background-blend-mode: color-dodge;` |
| `bg-blend-color-burn` | `background-blend-mode: color-burn;` |
| `bg-blend-hard-light` | `background-blend-mode: hard-light;` |
| `bg-blend-soft-light` | `background-blend-mode: soft-light;` |
| `bg-blend-difference` | `background-blend-mode: difference;` |
| `bg-blend-exclusion` | `background-blend-mode: exclusion;` |
| `bg-blend-hue` | `background-blend-mode: hue;` |
| `bg-blend-saturation` | `background-blend-mode: saturation;` |
| `bg-blend-color` | `background-blend-mode: color;` |
| `bg-blend-luminosity` | `background-blend-mode: luminosity;` |

## Exemplos

### Exemplo Básico

Use utilitários como `bg-blend-difference` e `bg-blend-saturation` para controlar como a imagem de fundo e cor de um elemento são mescladas:

#### bg-blend-multiply
```html
<div class="bg-blue-500 bg-[url(/img/mountains.jpg)] bg-blend-multiply ..."></div>
```

#### bg-blend-soft-light
```html
<div class="bg-blue-500 bg-[url(/img/mountains.jpg)] bg-blend-soft-light ..."></div>
```

#### bg-blend-overlay
```html
<div class="bg-blue-500 bg-[url(/img/mountains.jpg)] bg-blend-overlay ..."></div>
```

### Design Responsivo

Prefixe um utilitário `background-blend-mode` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e acima:

```html
<div class="bg-blue-500 bg-[url(/img/mountains.jpg)] bg-blend-lighten md:bg-blend-darken ...">
  <!-- ... -->
</div>
```

Saiba mais sobre o uso de variantes na [documentação de variantes](https://tailwindcss.com/docs/hover-focus-and-other-states).

