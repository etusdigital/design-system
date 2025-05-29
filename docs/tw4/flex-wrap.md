# Flex Wrap

Utilitários para controlar como os elementos flex se comportam quando quebram linha.

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `flex-nowrap` | `flex-wrap: nowrap;` |
| `flex-wrap` | `flex-wrap: wrap;` |
| `flex-wrap-reverse` | `flex-wrap: wrap-reverse;` |

## Exemplos

### Não quebrar linha (flex-nowrap)

Use `flex-nowrap` para evitar que os itens flex quebrem linha, fazendo com que itens inflexíveis transbordem o container se necessário:

```html
<div class="flex flex-nowrap">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

### Quebrar linha normalmente (flex-wrap)

Use `flex-wrap` para permitir que os itens flex quebrem linha:

```html
<div class="flex flex-wrap">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

### Quebrar linha em ordem reversa (flex-wrap-reverse)

Use `flex-wrap-reverse` para quebrar os itens flex na direção reversa:

```html
<div class="flex flex-wrap-reverse">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

## Design Responsivo

Prefixe um utilitário flex-wrap com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e maiores:

```html
<div class="flex flex-wrap md:flex-wrap-reverse">
  <!-- Conteúdo -->
</div>
```

Saiba mais sobre o uso de variantes na [documentação de variantes](../variants.md).

