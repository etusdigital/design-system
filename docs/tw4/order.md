# Order

O utilitário `order` no Tailwind CSS v4 permite controlar a ordem dos elementos flex e grid.

## Sintaxe

| Classe | Propriedade CSS | Descrição |
|--------|----------------|-----------|
| `order-<number>` | `order: <number>;` | Define a ordem com um número específico |
| `-order-<number>` | `order: calc(<number> * -1);` | Define a ordem com um número negativo |
| `order-first` | `order: calc(-infinity);` | Move o elemento para o primeiro lugar |
| `order-last` | `order: calc(infinity);` | Move o elemento para o último lugar |
| `order-none` | `order: 0;` | Remove qualquer ordenação específica |
| `order-(<custom-property>)` | `order: var(<custom-property>);` | Usa uma propriedade CSS customizada |
| `order-[<value>]` | `order: <value>;` | Define um valor customizado |

## Exemplos

### Definindo uma ordem específica

Use os utilitários `order-<number>` como `order-1` e `order-3` para renderizar itens flex e grid em uma ordem diferente da que aparecem no documento:

```html
<div class="flex justify-between ...">
  <div class="order-3 ...">01</div>
  <div class="order-1 ...">02</div>
  <div class="order-2 ...">03</div>
</div>
```

### Ordenando itens primeiro ou último

Use os utilitários `order-first` e `order-last` para renderizar itens flex e grid em primeiro ou último lugar:

```html
<div class="flex justify-between ...">
  <div class="order-last ...">01</div>
  <div class="...">02</div>
  <div class="order-first ...">03</div>
</div>
```

### Usando valores negativos

Para usar um valor de ordem negativo, prefixe o nome da classe com um traço para convertê-lo em um valor negativo:

```html
<div class="-order-1">
  <!-- ... -->
</div>
```

### Usando um valor customizado

Use a sintaxe `order-[<value>]` para definir a ordem baseada em um valor completamente customizado:

```html
<div class="order-[min(var(--total-items),10)] ...">
  <!-- ... -->
</div>
```

Para variáveis CSS, você também pode usar a sintaxe `order-(<custom-property>)`:

```html
<div class="order-(--my-order) ...">
  <!-- ... -->
</div>
```

Isso é apenas uma abreviação para `order-[var(<custom-property>)]` que adiciona a função `var()` automaticamente para você.

### Design responsivo

Prefixe um utilitário de ordem com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e acima:

```html
<div class="order-first md:order-last ...">
  <!-- ... -->
</div>
```

Saiba mais sobre o uso de variantes na documentação de variantes.

