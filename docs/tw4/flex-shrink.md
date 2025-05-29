# Flex Shrink

Controla como os itens flex encolhem em um contêiner flex.

## Classes Disponíveis

| Classe | Propriedade CSS | Descrição |
|--------|-----------------|-----------|
| `shrink` | `flex-shrink: 1;` | Permite que o item encolha |
| `shrink-<number>` | `flex-shrink: <number>;` | Define um fator de encolhimento específico |
| `shrink-[<value>]` | `flex-shrink: <value>;` | Valor customizado usando sintaxe arbitrária |
| `shrink-(<custom-property>)` | `flex-shrink: var(<custom-property>);` | Usando variáveis CSS customizadas |

## Exemplos

### Permitindo que itens flex encolham

Use `shrink` para permitir que um item flex encolha se necessário:

```html
<div class="flex ...">
  <div class="h-14 w-14 flex-none ...">01</div>
  <div class="h-14 w-64 shrink ...">02</div>
  <div class="h-14 w-14 flex-none ...">03</div>
</div>
```

### Prevenindo que itens encolham

Use `shrink-0` para prevenir que um item flex encolha:

```html
<div class="flex ...">
  <div class="h-16 flex-1 ...">01</div>
  <div class="h-16 w-32 shrink-0 ...">02</div>
  <div class="h-16 flex-1 ...">03</div>
</div>
```

### Usando um valor customizado

Use a sintaxe `shrink-[<value>]` para definir o fator de encolhimento flex baseado em um valor completamente customizado:

```html
<div class="shrink-[calc(100vw-var(--sidebar))] ...">
  <!-- ... -->
</div>
```

Para variáveis CSS, você também pode usar a sintaxe `shrink-(<custom-property>)`:

```html
<div class="shrink-(--my-shrink) ...">
  <!-- ... -->
</div>
```

Isso é apenas uma abreviação para `shrink-[var(<custom-property>)]` que adiciona a função `var()` automaticamente para você.

### Design Responsivo

Prefixe um utilitário flex-shrink com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e superiores:

```html
<div class="shrink md:shrink-0 ...">
  <!-- ... -->
</div>
```

Aprenda mais sobre o uso de variantes na documentação de variantes.

