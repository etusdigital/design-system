# backdrop-filter: contrast()

## Visão Geral

O utilitário `backdrop-contrast` permite controlar o contraste do backdrop-filter de um elemento.

### Sintaxes disponíveis:

- `backdrop-contrast-<number>` → `backdrop-filter: contrast(<number>%);`
- `backdrop-contrast-(<custom-property>)` → `backdrop-filter: contrast(var(<custom-property>));`
- `backdrop-contrast-[<value>]` → `backdrop-filter: contrast(<value>);`

## Exemplos

### Exemplo básico

Use utilitários como `backdrop-contrast-50` e `backdrop-contrast-100` para controlar o contraste do backdrop de um elemento:

```html
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-contrast-50 ...">
    backdrop-contrast-50
  </div>
</div>

<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-contrast-200 ...">
    backdrop-contrast-200
  </div>
</div>
```

### Usando um valor customizado

Use a sintaxe `backdrop-contrast-[<value>]` para definir o contraste do backdrop baseado em um valor completamente customizado:

```html
<div class="backdrop-contrast-[.25] ...">
  <!-- ... -->
</div>
```

Para variáveis CSS, você também pode usar a sintaxe `backdrop-contrast-(<custom-property>)`:

```html
<div class="backdrop-contrast-(--my-backdrop-contrast) ...">
  <!-- ... -->
</div>
```

Isso é apenas um atalho para `backdrop-contrast-[var(<custom-property>)]` que adiciona a função `var()` automaticamente para você.

### Design responsivo

Prefixe um utilitário `backdrop-filter: contrast()` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e acima:

```html
<div class="backdrop-contrast-125 md:backdrop-contrast-150 ...">
  <!-- ... -->
</div>
```

Saiba mais sobre o uso de variantes na [documentação de variantes](../variants.md).

