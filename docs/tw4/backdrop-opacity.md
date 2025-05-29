# Backdrop Filter: Opacity

Controle a opacidade dos filtros de backdrop aplicados a um elemento.

## Sintaxe

| Classe | CSS Gerado |
|--------|------------|
| `backdrop-opacity-<number>` | `backdrop-filter: opacity(<number>%);` |
| `backdrop-opacity-(<custom-property>)` | `backdrop-filter: opacity(var(<custom-property>));` |
| `backdrop-opacity-[<value>]` | `backdrop-filter: opacity(<value>);` |

## Exemplos

### Exemplo Básico

Use utilitários como `backdrop-opacity-50` e `backdrop-opacity-75` para controlar a opacidade de todos os filtros de backdrop aplicados a um elemento:

```html
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-invert backdrop-opacity-10 ...">
    backdrop-opacity-10
  </div>
</div>

<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-invert backdrop-opacity-60 ...">
    backdrop-opacity-60
  </div>
</div>

<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-invert backdrop-opacity-95 ...">
    backdrop-opacity-95
  </div>
</div>
```

### Usando um Valor Customizado

Use a sintaxe `backdrop-opacity-[<value>]` para definir a opacidade do filtro de backdrop baseado em um valor completamente customizado:

```html
<div class="backdrop-opacity-[.15] ...">
  <!-- ... -->
</div>
```

### Usando Variáveis CSS

Para variáveis CSS, você também pode usar a sintaxe `backdrop-opacity-(<custom-property>)`:

```html
<div class="backdrop-opacity-(--my-backdrop-filter-opacity) ...">
  <!-- ... -->
</div>
```

Isso é apenas um atalho para `backdrop-opacity-[var(<custom-property>)]` que adiciona a função `var()` automaticamente.

### Design Responsivo

Prefixe um utilitário `backdrop-filter: opacity()` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e acima:

```html
<div class="backdrop-opacity-100 md:backdrop-opacity-60 ...">
  <!-- ... -->
</div>
```

Aprenda mais sobre o uso de variantes na [documentação de variantes](../variants.md).

## Valores Disponíveis

Os valores de opacidade disponíveis seguem a escala padrão do Tailwind:

- `backdrop-opacity-0` - 0%
- `backdrop-opacity-5` - 5%
- `backdrop-opacity-10` - 10%
- `backdrop-opacity-20` - 20%
- `backdrop-opacity-25` - 25%
- `backdrop-opacity-30` - 30%
- `backdrop-opacity-40` - 40%
- `backdrop-opacity-50` - 50%
- `backdrop-opacity-60` - 60%
- `backdrop-opacity-70` - 70%
- `backdrop-opacity-75` - 75%
- `backdrop-opacity-80` - 80%
- `backdrop-opacity-90` - 90%
- `backdrop-opacity-95` - 95%
- `backdrop-opacity-100` - 100%

