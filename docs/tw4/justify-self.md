# justify-self

O utilitário `justify-self` controla como um item de grid individual é alinhado ao longo do eixo inline (horizontal).

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `justify-self-auto` | `justify-self: auto;` |
| `justify-self-start` | `justify-self: start;` |
| `justify-self-center` | `justify-self: center;` |
| `justify-self-center-safe` | `justify-self: safe center;` |
| `justify-self-end` | `justify-self: end;` |
| `justify-self-end-safe` | `justify-self: safe end;` |
| `justify-self-stretch` | `justify-self: stretch;` |

## Exemplos de Uso

### Auto

Use o utilitário `justify-self-auto` para alinhar um item baseado no valor da propriedade `justify-items` do grid:

```html
<div class="grid justify-items-stretch ...">
  <!-- ... -->
  <div class="justify-self-auto ...">02</div>
  <!-- ... -->
</div>
```

### Start

Use o utilitário `justify-self-start` para alinhar um item do grid ao início do seu eixo inline:

```html
<div class="grid justify-items-stretch ...">
  <!-- ... -->
  <div class="justify-self-start ...">02</div>
  <!-- ... -->
</div>
```

### Center

Use os utilitários `justify-self-center` ou `justify-self-center-safe` para alinhar um item do grid ao centro do seu eixo inline:

#### justify-self-center

```html
<div class="grid justify-items-stretch ...">
  <!-- ... -->
  <div class="justify-self-center ...">02</div>
  <!-- ... -->
</div>
```

#### justify-self-center-safe

```html
<div class="grid justify-items-stretch ...">
  <!-- ... -->
  <div class="justify-self-center-safe ...">02</div>
  <!-- ... -->
</div>
```

> **Nota:** Quando não há espaço suficiente disponível, o utilitário `justify-self-center-safe` alinhará o item ao início do container em vez do centro.

### End

Use os utilitários `justify-self-end` ou `justify-self-end-safe` para alinhar um item do grid ao final do seu eixo inline:

#### justify-self-end

```html
<div class="grid justify-items-stretch ...">
  <!-- ... -->
  <div class="justify-self-end ...">02</div>
  <!-- ... -->
</div>
```

#### justify-self-end-safe

```html
<div class="grid justify-items-stretch ...">
  <!-- ... -->
  <div class="justify-self-end-safe ...">02</div>
  <!-- ... -->
</div>
```

> **Nota:** Quando não há espaço suficiente disponível, o utilitário `justify-self-end-safe` alinhará o item ao início do container em vez do final.

### Stretch

Use o utilitário `justify-self-stretch` para esticar um item do grid para preencher a área do grid no seu eixo inline:

```html
<div class="grid justify-items-start ...">
  <!-- ... -->
  <div class="justify-self-stretch ...">02</div>
  <!-- ... -->
</div>
```

## Design Responsivo

Prefixe um utilitário `justify-self` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e acima:

```html
<div class="justify-self-start md:justify-self-end ...">
  <!-- ... -->
</div>
```

Para saber mais sobre o uso de variantes, consulte a [documentação de variantes](../variants.md).

## Casos de Uso Comuns

- **Alinhamento de itens específicos:** Quando você precisa que um item específico do grid tenha um alinhamento diferente dos outros
- **Layouts responsivos:** Mudando o alinhamento de itens em diferentes tamanhos de tela
- **Componentes flexíveis:** Criando componentes que se adaptam ao espaço disponível

## Compatibilidade

Este utilitário funciona apenas com elementos que são itens de um container grid. Para alinhamento em outros contextos, considere usar:

- `text-align` para alinhamento de texto
- `justify-content` para alinhamento de itens flex
- `margin` auto para centralização de blocos

