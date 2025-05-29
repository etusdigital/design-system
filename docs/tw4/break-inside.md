# break-inside

Utilitários para controlar como elementos devem se comportar em quebras de página ou coluna.

## Classes disponíveis

| Classe | CSS | Descrição |
| --- | --- | --- |
| `break-inside-auto` | `break-inside: auto;` | Permite quebras automáticas |
| `break-inside-avoid` | `break-inside: avoid;` | Evita quebras dentro do elemento |
| `break-inside-avoid-page` | `break-inside: avoid-page;` | Evita quebras de página |
| `break-inside-avoid-column` | `break-inside: avoid-column;` | Evita quebras de coluna |

## Exemplos

### Exemplo básico

Use utilitários como `break-inside-column` e `break-inside-avoid-page` para controlar como uma quebra de coluna ou página deve se comportar dentro de um elemento:

```html
<div class="columns-2">
  <p>Well, let me tell you something, ...</p>
  <p class="break-inside-avoid-column">Sure, go ahead, laugh...</p>
  <p>Maybe we can live without...</p>
  <p>Look. If you think this is...</p>
</div>
```

### Design responsivo

Prefixe um utilitário `break-inside` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e acima:

```html
<div class="break-inside-avoid-column md:break-inside-auto ...">
  <!-- ... -->
</div>
```

Saiba mais sobre o uso de variantes na [documentação de variantes](../variants.md).

