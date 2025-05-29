# place-self

O utilitário `place-self` controla como um item individual é alinhado e justificado em seu container grid ou flexbox.

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `place-self-auto` | `place-self: auto;` |
| `place-self-start` | `place-self: start;` |
| `place-self-end` | `place-self: end;` |
| `place-self-end-safe` | `place-self: safe end;` |
| `place-self-center` | `place-self: center;` |
| `place-self-center-safe` | `place-self: safe center;` |
| `place-self-stretch` | `place-self: stretch;` |

## Exemplos

### Auto

Use `place-self-auto` para alinhar um item baseado no valor da propriedade `place-items` do container:

```html
<div class="grid grid-cols-3 gap-4">
  <div>01</div>
  <div class="place-self-auto">02</div>
  <div>03</div>
  <div>04</div>
  <div>05</div>
  <div>06</div>
</div>
```

### Start

Use `place-self-start` para alinhar um item ao início em ambos os eixos:

```html
<div class="grid grid-cols-3 gap-4">
  <div>01</div>
  <div class="place-self-start">02</div>
  <div>03</div>
  <div>04</div>
  <div>05</div>
  <div>06</div>
</div>
```

### Center

Use `place-self-center` para alinhar um item no centro em ambos os eixos:

```html
<div class="grid grid-cols-3 gap-4">
  <div>01</div>
  <div class="place-self-center">02</div>
  <div>03</div>
  <div>04</div>
  <div>05</div>
  <div>06</div>
</div>
```

### End

Use `place-self-end` para alinhar um item ao final em ambos os eixos:

```html
<div class="grid grid-cols-3 gap-4">
  <div>01</div>
  <div class="place-self-end">02</div>
  <div>03</div>
  <div>04</div>
  <div>05</div>
  <div>06</div>
</div>
```

### Stretch

Use `place-self-stretch` para esticar um item em ambos os eixos:

```html
<div class="grid grid-cols-3 gap-4">
  <div>01</div>
  <div class="place-self-stretch">02</div>
  <div>03</div>
  <div>04</div>
  <div>05</div>
  <div>06</div>
</div>
```

## Design Responsivo

Prefixe um utilitário `place-self` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e acima:

```html
<div class="place-self-start md:place-self-end">
  <!-- ... -->
</div>
```

Saiba mais sobre o uso de variantes na [documentação de variantes](https://tailwindcss.com/docs/responsive-design).

