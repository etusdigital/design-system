# break-before

As classes `break-before` controlam como uma quebra de coluna ou página deve se comportar antes de um elemento.

## Classes disponíveis

| Classe | Propriedade CSS |
|--------|-----------------|
| `break-before-auto` | `break-before: auto;` |
| `break-before-avoid` | `break-before: avoid;` |
| `break-before-all` | `break-before: all;` |
| `break-before-avoid-page` | `break-before: avoid-page;` |
| `break-before-page` | `break-before: page;` |
| `break-before-left` | `break-before: left;` |
| `break-before-right` | `break-before: right;` |
| `break-before-column` | `break-before: column;` |

## Exemplos

### Exemplo básico

Use utilitários como `break-before-column` e `break-before-page` para controlar como uma quebra de coluna ou página deve se comportar antes de um elemento:

```html
<div class="columns-2">
  <p>Well, let me tell you something, ...</p>
  <p class="break-before-column">Sure, go ahead, laugh...</p>
  <p>Maybe we can live without...</p>
  <p>Look. If you think this is...</p>
</div>
```

### Design responsivo

Prefixe um utilitário `break-before` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e acima:

```html
<div class="break-before-column md:break-before-auto ...">
  <!-- ... -->
</div>
```

Saiba mais sobre o uso de variantes na documentação de variantes.

