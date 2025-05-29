# backdrop-filter: saturate()

As classes de `backdrop-saturate` aplicam o filtro de saturação ao backdrop (fundo) de um elemento.

## Sintaxe

| Classe | Propriedade CSS |
|--------|----------------|
| `backdrop-saturate-<number>` | `backdrop-filter: saturate(<number>%);` |
| `backdrop-saturate-(<custom-property>)` | `backdrop-filter: saturate(var(<custom-property>));` |
| `backdrop-saturate-[<value>]` | `backdrop-filter: saturate(<value>);` |

## Exemplos

### Exemplo básico

Use utilitários como `backdrop-saturate-50` e `backdrop-saturate-100` para controlar a saturação do backdrop de um elemento:

```html
<!-- backdrop-saturate-50 -->
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-saturate-50 ..."></div>
</div>

<!-- backdrop-saturate-125 -->
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-saturate-125 ..."></div>
</div>

<!-- backdrop-saturate-200 -->
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-saturate-200 ..."></div>
</div>
```

### Usando valores customizados

Use a sintaxe `backdrop-saturate-[<value>]` para definir a saturação do backdrop baseada em um valor completamente customizado:

```html
<div class="backdrop-saturate-[.25] ...">
  <!-- ... -->
</div>
```

Para variáveis CSS, você também pode usar a sintaxe `backdrop-saturate-(<custom-property>)`:

```html
<div class="backdrop-saturate-(--my-backdrop-saturation) ...">
  <!-- ... -->
</div>
```

Isso é apenas uma forma abreviada de `backdrop-saturate-[var(<custom-property>)]` que adiciona a função `var()` automaticamente para você.

### Design responsivo

Prefixe um utilitário de `backdrop-filter: saturate()` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios ou maiores:

```html
<div class="backdrop-saturate-50 md:backdrop-saturate-150 ...">
  <!-- ... -->
</div>
```

Saiba mais sobre o uso de variantes na documentação de variantes.

