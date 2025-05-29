# justify-items

Utilitários para controlar como os itens de grid são justificados ao longo do eixo inline.

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `justify-items-start` | `justify-items: start;` |
| `justify-items-end` | `justify-items: end;` |
| `justify-items-end-safe` | `justify-items: safe end;` |
| `justify-items-center` | `justify-items: center;` |
| `justify-items-center-safe` | `justify-items: safe center;` |
| `justify-items-stretch` | `justify-items: stretch;` |
| `justify-items-normal` | `justify-items: normal;` |

## Exemplos

### Start

Use o utilitário `justify-items-start` para justificar os itens de grid no início do seu eixo inline:

```html
<div class="grid justify-items-start ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
  <div>05</div>
  <div>06</div>
</div>
```

### End

Use os utilitários `justify-items-end` ou `justify-items-end-safe` para justificar os itens de grid no final do seu eixo inline:

#### justify-items-end

```html
<div class="grid grid-flow-col justify-items-end ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

#### justify-items-end-safe

```html
<div class="grid grid-flow-col justify-items-end-safe ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

> **Nota:** Redimensione o container para ver o comportamento do alinhamento. Quando não há espaço suficiente disponível, o utilitário `justify-items-end-safe` alinhará os itens no início do container em vez do final.

### Center

Use os utilitários `justify-items-center` ou `justify-items-center-safe` para justificar os itens de grid no centro do seu eixo inline:

#### justify-items-center

```html
<div class="grid grid-flow-col justify-items-center ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

#### justify-items-center-safe

```html
<div class="grid grid-flow-col justify-items-center-safe ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

> **Nota:** Redimensione o container para ver o comportamento do alinhamento. Quando não há espaço suficiente disponível, o utilitário `justify-items-center-safe` alinhará os itens no início do container em vez do centro.

### Stretch

Use o utilitário `justify-items-stretch` para esticar os itens ao longo do seu eixo inline:

```html
<div class="grid justify-items-stretch ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
  <div>05</div>
  <div>06</div>
</div>
```

## Design Responsivo

Prefixe um utilitário `justify-items` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e acima:

```html
<div class="grid justify-items-start md:justify-items-center ...">
  <!-- ... -->
</div>
```

Saiba mais sobre o uso de variantes na [documentação de variantes](../variants.md).

## Considerações de Uso

- Essas classes são aplicadas ao **container grid**, não aos itens individuais
- Para alinhar itens individuais, use as classes `justify-self`
- As variantes "safe" (`justify-items-end-safe`, `justify-items-center-safe`) são úteis quando o container pode ter espaço limitado
- O valor `stretch` é útil quando você quer que os itens preencham todo o espaço disponível na célula do grid

