# break-after

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `break-after-auto` | `break-after: auto;` |
| `break-after-avoid` | `break-after: avoid;` |
| `break-after-all` | `break-after: all;` |
| `break-after-avoid-page` | `break-after: avoid-page;` |
| `break-after-page` | `break-after: page;` |
| `break-after-left` | `break-after: left;` |
| `break-after-right` | `break-after: right;` |
| `break-after-column` | `break-after: column;` |

## Exemplos

### Exemplo básico

Use utilitários como `break-after-column` e `break-after-page` para controlar como uma quebra de coluna ou página deve se comportar após um elemento:

```html
<div class="columns-2">
  <p>Well, let me tell you something, ...</p>
  <p class="break-after-column">Sure, go ahead, laugh...</p>
  <p>Maybe we can live without...</p>
  <p>Look. If you think this is...</p>
</div>
```

### Design responsivo

Prefixe um utilitário `break-after` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e acima:

```html
<div class="break-after-column md:break-after-auto ...">
  <!-- ... -->
</div>
```

Saiba mais sobre o uso de variantes na [documentação de variantes](../variants).

