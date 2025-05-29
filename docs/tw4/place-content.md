# Place Content

O `place-content` é uma propriedade CSS abreviada que define o alinhamento de conteúdo nos eixos de bloco e inline para layouts de grade e flexbox.

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `place-content-center` | `place-content: center;` |
| `place-content-center-safe` | `place-content: safe center;` |
| `place-content-start` | `place-content: start;` |
| `place-content-end` | `place-content: end;` |
| `place-content-end-safe` | `place-content: safe end;` |
| `place-content-between` | `place-content: space-between;` |
| `place-content-around` | `place-content: space-around;` |
| `place-content-evenly` | `place-content: space-evenly;` |
| `place-content-baseline` | `place-content: baseline;` |
| `place-content-stretch` | `place-content: stretch;` |

## Exemplos

### Center

Use `place-content-center` para centralizar os itens no eixo de bloco:

```html
<div class="grid h-48 grid-cols-2 place-content-center gap-4 ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
</div>
```

### Start

Use `place-content-start` para alinhar os itens no início do eixo de bloco:

```html
<div class="grid h-48 grid-cols-2 place-content-start gap-4 ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
</div>
```

### End

Use `place-content-end` para alinhar os itens no final do eixo de bloco:

```html
<div class="grid h-48 grid-cols-2 place-content-end gap-4 ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
</div>
```

### Space Between

Use `place-content-between` para distribuir os itens da grade ao longo do eixo de bloco com espaço igual entre cada linha:

```html
<div class="grid h-48 grid-cols-2 place-content-between gap-4 ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
</div>
```

### Space Around

Use `place-content-around` para distribuir os itens da grade com espaço igual ao redor de cada linha no eixo de bloco:

```html
<div class="grid h-48 grid-cols-2 place-content-around gap-4 ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
</div>
```

### Space Evenly

Use `place-content-evenly` para distribuir os itens da grade com espaçamento uniforme no eixo de bloco:

```html
<div class="grid h-48 grid-cols-2 place-content-evenly gap-4 ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
</div>
```

### Stretch

Use `place-content-stretch` para esticar os itens da grade ao longo de suas áreas de grade no eixo de bloco:

```html
<div class="grid h-48 grid-cols-2 place-content-stretch gap-4 ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
</div>
```

## Design Responsivo

Prefixe uma utilidade `place-content` com uma variante de breakpoint como `md:` para aplicar a utilidade apenas em tamanhos de tela médios e maiores:

```html
<div class="grid place-content-start md:place-content-center ...">
  <!-- ... -->
</div>
```

Saiba mais sobre o uso de variantes na [documentação de variantes](https://tailwindcss.com/docs/responsive-design).

