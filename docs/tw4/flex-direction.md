# flex-direction

O utilitário `flex-direction` controla a direção dos itens flex em um container flexbox.

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|-----------------|
| `flex-row` | `flex-direction: row;` |
| `flex-row-reverse` | `flex-direction: row-reverse;` |
| `flex-col` | `flex-direction: column;` |
| `flex-col-reverse` | `flex-direction: column-reverse;` |

## Exemplos

### Row (Linha)

Use `flex-row` para posicionar itens flex horizontalmente na mesma direção do texto:

```html
<div class="flex flex-row ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

### Row Reverse (Linha Reversa)

Use `flex-row-reverse` para posicionar itens flex horizontalmente na direção oposta:

```html
<div class="flex flex-row-reverse ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

### Column (Coluna)

Use `flex-col` para posicionar itens flex verticalmente:

```html
<div class="flex flex-col ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

### Column Reverse (Coluna Reversa)

Use `flex-col-reverse` para posicionar itens flex verticalmente na direção oposta:

```html
<div class="flex flex-col-reverse ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

## Design Responsivo

Prefixe um utilitário de `flex-direction` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e acima:

```html
<div class="flex flex-col md:flex-row ...">
  <!-- O conteúdo será em coluna em telas pequenas e em linha em telas médias+ -->
</div>
```

Saiba mais sobre o uso de variantes na documentação de variants.

