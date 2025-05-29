# Background Repeat

Utilitários para controlar a repetição de imagens de fundo.

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|-----------------|
| `bg-repeat` | `background-repeat: repeat;` |
| `bg-repeat-x` | `background-repeat: repeat-x;` |
| `bg-repeat-y` | `background-repeat: repeat-y;` |
| `bg-repeat-space` | `background-repeat: space;` |
| `bg-repeat-round` | `background-repeat: round;` |
| `bg-no-repeat` | `background-repeat: no-repeat;` |

## Exemplos

### Exemplo básico - Repetir em ambas as direções

Use a classe `bg-repeat` para repetir a imagem de fundo tanto vertical quanto horizontalmente:

```html
<div class="bg-[url(/img/clouds.svg)] bg-center bg-repeat ..."></div>
```

### Repetir horizontalmente

Use a classe `bg-repeat-x` para repetir a imagem de fundo apenas horizontalmente:

```html
<div class="bg-[url(/img/clouds.svg)] bg-center bg-repeat-x ..."></div>
```

### Repetir verticalmente

Use a classe `bg-repeat-y` para repetir a imagem de fundo apenas verticalmente:

```html
<div class="bg-[url(/img/clouds.svg)] bg-center bg-repeat-y ..."></div>
```

### Prevenir cortes

Use a classe `bg-repeat-space` para repetir a imagem de fundo sem cortar:

```html
<div class="bg-[url(/img/clouds.svg)] bg-center bg-repeat-space ..."></div>
```

### Prevenir cortes e lacunas

Use a classe `bg-repeat-round` para repetir a imagem de fundo sem cortar, esticando se necessário para evitar lacunas:

```html
<div class="bg-[url(/img/clouds.svg)] bg-center bg-repeat-round ..."></div>
```

### Desabilitar repetição

Use a classe `bg-no-repeat` para prevenir que uma imagem de fundo se repita:

```html
<div class="bg-[url(/img/clouds.svg)] bg-center bg-no-repeat ..."></div>
```

## Design Responsivo

Prefixe um utilitário de background-repeat com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em telas médias e acima:

```html
<div class="bg-repeat md:bg-repeat-x ...">
  <!-- Conteúdo -->
</div>
```

Saiba mais sobre o uso de variantes na [documentação de variantes](../variants.md).

