# flex-grow

O utilitário `flex-grow` controla como um item flex deve crescer para preencher o espaço disponível em um container flexível.

## Sintaxe

| Classe | Propriedade CSS |
|--------|-----------------|
| `grow` | `flex-grow: 1;` |
| `grow-<number>` | `flex-grow: <number>;` |
| `grow-[<value>]` | `flex-grow: <value>;` |
| `grow-(<custom-property>)` | `flex-grow: var(<custom-property>);` |

## Exemplos

### Permitindo que itens cresçam

Use `grow` para permitir que um item flex cresça e preencha qualquer espaço disponível:

```html
<div class="flex ...">
  <div class="size-14 flex-none ...">01</div>
  <div class="size-14 grow ...">02</div>
  <div class="size-14 flex-none ...">03</div>
</div>
```

### Crescimento baseado em fator

Use utilitários `grow-<number>` como `grow-3` para fazer com que os itens flex cresçam proporcionalmente baseado em seu fator de crescimento, permitindo que preencham o espaço disponível relativamente um ao outro:

```html
<div class="flex ...">
  <div class="size-14 grow-3 ...">01</div>
  <div class="size-14 grow-7 ...">02</div>
  <div class="size-14 grow-3 ...">03</div>
</div>
```

### Impedindo que itens cresçam

Use `grow-0` para impedir que um item flex cresça:

```html
<div class="flex ...">
  <div class="size-14 grow ...">01</div>
  <div class="size-14 grow-0 ...">02</div>
  <div class="size-14 grow ...">03</div>
</div>
```

### Usando um valor customizado

Use a sintaxe `grow-[<value>]` para definir o fator de crescimento flex baseado em um valor completamente customizado:

```html
<div class="grow-[25vw] ...">
  <!-- ... -->
</div>
```

Para variáveis CSS, você também pode usar a sintaxe `grow-(<custom-property>)`:

```html
<div class="grow-(--my-grow) ...">
  <!-- ... -->
</div>
```

Isso é apenas uma abreviação para `grow-[var(<custom-property>)]` que adiciona a função `var()` automaticamente para você.

### Design responsivo

Prefixe um utilitário flex-grow com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e acima:

```html
<div class="grow md:grow-0 ...">
  <!-- ... -->
</div>
```

Saiba mais sobre o uso de variantes na documentação de variantes.

