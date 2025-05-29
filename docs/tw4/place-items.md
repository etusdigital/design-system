# Place Items

As utilitários `place-items` controlam como os itens são posicionados em seus respectivos containers grid em ambos os eixos simultaneamente.

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `place-items-start` | `place-items: start;` |
| `place-items-end` | `place-items: end;` |
| `place-items-end-safe` | `place-items: safe end;` |
| `place-items-center` | `place-items: center;` |
| `place-items-center-safe` | `place-items: safe center;` |
| `place-items-baseline` | `place-items: baseline;` |
| `place-items-stretch` | `place-items: stretch;` |

## Exemplos

### Start

Use `place-items-start` para posicionar os itens grid no início de suas áreas grid em ambos os eixos:

```html
<div class="grid grid-cols-3 place-items-start gap-4 ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
  <div>05</div>
  <div>06</div>
</div>
```

### End

Use `place-items-end` para posicionar os itens grid no final de suas áreas grid em ambos os eixos:

```html
<div class="grid h-56 grid-cols-3 place-items-end gap-4 ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
  <div>05</div>
  <div>06</div>
</div>
```

### Center

Use `place-items-center` para posicionar os itens grid no centro de suas áreas grid em ambos os eixos:

```html
<div class="grid h-56 grid-cols-3 place-items-center gap-4 ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
  <div>05</div>
  <div>06</div>
</div>
```

### Stretch

Use `place-items-stretch` para esticar os itens ao longo de suas áreas grid em ambos os eixos:

```html
<div class="grid h-56 grid-cols-3 place-items-stretch gap-4 ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
  <div>05</div>
  <div>06</div>
</div>
```

## Design Responsivo

Prefixe um utilitário `place-items` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e superiores:

```html
<div class="grid place-items-start md:place-items-center ...">
  <!-- ... -->
</div>
```

Saiba mais sobre o uso de variantes na [documentação de variantes](../variants.md).

