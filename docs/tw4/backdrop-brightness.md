# backdrop-filter: brightness()

O `backdrop-brightness` é uma propriedade que permite controlar o brilho do fundo de um elemento usando filtros de backdrop.

## Sintaxe

| Classe | Propriedade CSS |
|--------|----------------|
| `backdrop-brightness-<number>` | `backdrop-filter: brightness(<number>%);` |
| `backdrop-brightness-(<custom-property>)` | `backdrop-filter: brightness(var(<custom-property>));` |
| `backdrop-brightness-[<value>]` | `backdrop-filter: brightness(<value>);` |

## Exemplos

### Exemplo básico

Use utilitários como `backdrop-brightness-50` e `backdrop-brightness-150` para controlar o brilho do backdrop de um elemento:

**backdrop-brightness-50:**
```html
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-brightness-50 ...">
    <!-- backdrop-brightness-50 -->
  </div>
</div>
```

**backdrop-brightness-150:**
```html
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-brightness-150 ...">
    <!-- backdrop-brightness-150 -->
  </div>
</div>
```

### Usando um valor customizado

Use a sintaxe `backdrop-brightness-[<value>]` para definir o brilho do backdrop baseado em um valor completamente customizado:

```html
<div class="backdrop-brightness-[1.75] ...">
  <!-- ... -->
</div>
```

### Usando variáveis CSS

Para variáveis CSS, você também pode usar a sintaxe `backdrop-brightness-(<custom-property>)`:

```html
<div class="backdrop-brightness-(--my-backdrop-brightness) ...">
  <!-- ... -->
</div>
```

Esta é apenas uma forma abreviada de `backdrop-brightness-[var(<custom-property>)]` que adiciona a função `var()` automaticamente para você.

### Design responsivo

Prefixe um utilitário `backdrop-filter: brightness()` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e acima:

```html
<div class="backdrop-brightness-110 md:backdrop-brightness-150 ...">
  <!-- ... -->
</div>
```

Saiba mais sobre o uso de variantes na [documentação de variantes](https://tailwindcss.com/docs/hover-focus-and-other-states).

