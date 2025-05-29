# Align Content

O utilitário `align-content` controla como as linhas são posicionadas em containers de múltiplas linhas.

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `content-normal` | `align-content: normal;` |
| `content-center` | `align-content: center;` |
| `content-start` | `align-content: flex-start;` |
| `content-end` | `align-content: flex-end;` |
| `content-between` | `align-content: space-between;` |
| `content-around` | `align-content: space-around;` |
| `content-evenly` | `align-content: space-evenly;` |
| `content-baseline` | `align-content: baseline;` |
| `content-stretch` | `align-content: stretch;` |

## Exemplos

### Start

Use `content-start` para alinhar as linhas no início do eixo transversal:

```html
<div class="grid h-56 grid-cols-3 content-start gap-4 ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
  <div>05</div>
</div>
```

### Center

Use `content-center` para centralizar as linhas no eixo transversal:

```html
<div class="grid h-56 grid-cols-3 content-center gap-4 ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
  <div>05</div>
</div>
```

### End

Use `content-end` para alinhar as linhas no final do eixo transversal:

```html
<div class="grid h-56 grid-cols-3 content-end gap-4 ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
  <div>05</div>
</div>
```

### Space Between

Use `content-between` para distribuir as linhas com espaço igual entre elas:

```html
<div class="grid h-56 grid-cols-3 content-between gap-4 ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
  <div>05</div>
</div>
```

### Space Around

Use `content-around` para distribuir as linhas com espaço igual ao redor de cada linha:

```html
<div class="grid h-56 grid-cols-3 content-around gap-4 ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
  <div>05</div>
</div>
```

### Space Evenly

Use `content-evenly` para distribuir as linhas com espaço igual entre e ao redor de cada item:

```html
<div class="grid h-56 grid-cols-3 content-evenly gap-4 ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
  <div>05</div>
</div>
```

### Stretch

Use `content-stretch` para permitir que o conteúdo preencha o espaço disponível ao longo do eixo transversal:

```html
<div class="grid h-56 grid-cols-3 content-stretch gap-4 ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
  <div>05</div>
</div>
```

### Normal

Use `content-normal` para usar o comportamento padrão de alinhamento:

```html
<div class="grid h-56 grid-cols-3 content-normal gap-4 ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
  <div>05</div>
</div>
```

## Design Responsivo

Prefixe um utilitário `align-content` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e maiores:

```html
<div class="grid content-start md:content-around ...">
  <!-- ... -->
</div>
```

Para mais informações sobre o uso de variantes, consulte a documentação de variantes.

