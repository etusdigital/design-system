# Justify Content

O `justify-content` controla como os itens flexíveis são alinhados ao longo do eixo principal do container.

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `justify-start` | `justify-content: flex-start;` |
| `justify-end` | `justify-content: flex-end;` |
| `justify-end-safe` | `justify-content: safe flex-end;` |
| `justify-center` | `justify-content: center;` |
| `justify-center-safe` | `justify-content: safe center;` |
| `justify-between` | `justify-content: space-between;` |
| `justify-around` | `justify-content: space-around;` |
| `justify-evenly` | `justify-content: space-evenly;` |
| `justify-stretch` | `justify-content: stretch;` |
| `justify-baseline` | `justify-content: baseline;` |
| `justify-normal` | `justify-content: normal;` |

## Exemplos

### Start

Use a classe `justify-start` para alinhar itens no início do eixo principal do container:

```html
<div class="flex justify-start ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

### Center

Use as classes `justify-center` ou `justify-center-safe` para alinhar itens no centro do eixo principal do container:

**justify-center:**
```html
<div class="flex justify-center ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
</div>
```

**justify-center-safe:**
```html
<div class="flex justify-center-safe ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
</div>
```

> **Nota:** Redimensione o container para ver o comportamento do alinhamento. Quando não há espaço suficiente disponível, a classe `justify-center-safe` alinhará os itens no início do container em vez do centro.

### End

Use as classes `justify-end` ou `justify-end-safe` para alinhar itens no final do eixo principal do container:

**justify-end:**
```html
<div class="flex justify-end ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
</div>
```

**justify-end-safe:**
```html
<div class="flex justify-end-safe ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
</div>
```

> **Nota:** Redimensione o container para ver o comportamento do alinhamento. Quando não há espaço suficiente disponível, a classe `justify-end-safe` alinhará os itens no início do container em vez do final.

### Space Between

Use a classe `justify-between` para alinhar itens ao longo do eixo principal do container, criando um espaço igual entre cada item:

```html
<div class="flex justify-between ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

### Space Around

Use a classe `justify-around` para alinhar itens ao longo do eixo principal do container, criando um espaço igual em cada lado de cada item:

```html
<div class="flex justify-around ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

### Space Evenly

Use a classe `justify-evenly` para alinhar itens ao longo do eixo principal do container, criando um espaço igual ao redor de cada item, considerando também o espaçamento duplo que normalmente seria visto entre cada item ao usar `justify-around`:

```html
<div class="flex justify-evenly ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

### Stretch

Use a classe `justify-stretch` para permitir que os itens de conteúdo preencham o espaço disponível ao longo do eixo principal do container:

```html
<div class="flex justify-stretch ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

### Normal

Use a classe `justify-normal` para posicionar os itens de conteúdo em sua posição padrão, como se nenhum valor de `justify-content` fosse definido:

```html
<div class="flex justify-normal ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

## Design Responsivo

Prefixe uma classe de `justify-content` com uma variante de breakpoint como `md:` para aplicar a classe apenas em tamanhos de tela médios e acima:

```html
<div class="flex justify-start md:justify-between ...">
  <!-- ... -->
</div>
```

Saiba mais sobre o uso de variantes na [documentação de variantes](../variants).

