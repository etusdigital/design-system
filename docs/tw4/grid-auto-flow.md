# Grid Auto Flow

Utilitários para controlar como o algoritmo de posicionamento automático funciona para um layout de grid.

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `grid-flow-row` | `grid-auto-flow: row;` |
| `grid-flow-col` | `grid-auto-flow: column;` |
| `grid-flow-dense` | `grid-auto-flow: dense;` |
| `grid-flow-row-dense` | `grid-auto-flow: row dense;` |
| `grid-flow-col-dense` | `grid-auto-flow: column dense;` |

## Exemplos

### Exemplo Básico

Use utilitários como `grid-flow-col` e `grid-flow-row-dense` para controlar como o algoritmo de posicionamento automático funciona para um layout de grid:

```html
<div class="grid grid-flow-row-dense grid-cols-3 grid-rows-3 gap-4">
  <div class="col-span-2 bg-blue-500 p-4">01</div>
  <div class="col-span-2 bg-green-500 p-4">02</div>
  <div class="bg-red-500 p-4">03</div>
  <div class="bg-yellow-500 p-4">04</div>
  <div class="bg-purple-500 p-4">05</div>
</div>
```

### Fluxo por Coluna

```html
<div class="grid grid-flow-col grid-cols-3 grid-rows-3 gap-4">
  <div class="row-span-2 bg-blue-500 p-4">01</div>
  <div class="bg-green-500 p-4">02</div>
  <div class="bg-red-500 p-4">03</div>
  <div class="bg-yellow-500 p-4">04</div>
  <div class="bg-purple-500 p-4">05</div>
</div>
```

## Design Responsivo

Prefixe um utilitário `grid-auto-flow` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e acima:

```html
<div class="grid grid-flow-col md:grid-flow-row gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

## Explicação dos Fluxos

- **`grid-flow-row`**: Os itens são posicionados preenchendo cada linha sucessivamente
- **`grid-flow-col`**: Os itens são posicionados preenchendo cada coluna sucessivamente  
- **`grid-flow-dense`**: Tenta preencher buracos no grid usando itens menores
- **`grid-flow-row-dense`**: Combina fluxo por linha com preenchimento denso
- **`grid-flow-col-dense`**: Combina fluxo por coluna com preenchimento denso

---

Saiba mais sobre como usar variantes na [documentação de variantes](../variants.md).

