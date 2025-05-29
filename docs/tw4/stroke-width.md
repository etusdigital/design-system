# Stroke Width

Utilitários para controlar a largura do traço (stroke) de elementos SVG.

## Sintaxe

| Classe | Propriedade CSS | Descrição |
|--------|----------------|-----------|
| `stroke-<number>` | `stroke-width: <number>;` | Define a largura do traço com valores pré-definidos |
| `stroke-(length:<custom-property>)` | `stroke-width: var(<custom-property>);` | Define a largura usando propriedades CSS customizadas |
| `stroke-[<value>]` | `stroke-width: <value>;` | Define a largura com valores arbitrários |

## Exemplos

### Exemplo básico

Use as classes `stroke-<number>` como `stroke-1` e `stroke-2` para definir a largura do traço de um SVG:

```html
<svg class="stroke-1 ..."></svg>
<svg class="stroke-2 ..."></svg>
```

Isso é útil para estilizar conjuntos de ícones como Heroicons.

### Usando valores customizados

Use a sintaxe `stroke-[<value>]` para definir a largura do traço com um valor completamente customizado:

```html
<div class="stroke-[1.5] ...">
  <!-- ... -->
</div>
```

Para variáveis CSS, você também pode usar a sintaxe `stroke-(length:<custom-property>)`:

```html
<div class="stroke-(length:--my-stroke-width) ...">
  <!-- ... -->
</div>
```

Isso é apenas uma forma abreviada de `stroke-[length:var(<custom-property>)]` que adiciona a função `var()` automaticamente para você.

### Design responsivo

Prefixe uma classe de stroke-width com uma variante de breakpoint como `md:` para aplicar a classe apenas em telas médias e maiores:

```html
<div class="stroke-1 md:stroke-2 ...">
  <!-- ... -->
</div>
```

Saiba mais sobre o uso de variantes na documentação de variantes.

## Valores disponíveis

As classes de stroke-width seguem a escala padrão do Tailwind:

- `stroke-0` - stroke-width: 0
- `stroke-1` - stroke-width: 1
- `stroke-2` - stroke-width: 2
- E assim por diante...

## Notas importantes

- Essas classes são especificamente para elementos SVG
- Úteis para ícones e gráficos vetoriais
- Combine com outras classes de stroke como `stroke-current` para cor

