# Table Layout

Utilitários para controlar o algoritmo de layout de tabelas.

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `table-auto` | `table-layout: auto;` |
| `table-fixed` | `table-layout: fixed;` |

## Exemplos

### Dimensionamento Automático de Colunas

Use o utilitário `table-auto` para dimensionar automaticamente as colunas da tabela conforme o conteúdo de suas células:

```html
<table class="table-auto">
  <thead>
    <tr>
      <th>Música</th>
      <th>Artista</th>
      <th>Ano</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
      <td>Malcolm Lockyer</td>
      <td>1961</td>
    </tr>
    <tr>
      <td>Witchy Woman</td>
      <td>The Eagles</td>
      <td>1972</td>
    </tr>
    <tr>
      <td>Shining Star</td>
      <td>Earth, Wind, and Fire</td>
      <td>1975</td>
    </tr>
  </tbody>
</table>
```

### Usando Larguras Fixas para Colunas

Use o utilitário `table-fixed` para ignorar o conteúdo das células da tabela e usar larguras fixas para cada coluna:

```html
<table class="table-fixed">
  <thead>
    <tr>
      <th>Música</th>
      <th>Artista</th>
      <th>Ano</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
      <td>Malcolm Lockyer</td>
      <td>1961</td>
    </tr>
    <tr>
      <td>Witchy Woman</td>
      <td>The Eagles</td>
      <td>1972</td>
    </tr>
    <tr>
      <td>Shining Star</td>
      <td>Earth, Wind, and Fire</td>
      <td>1975</td>
    </tr>
  </tbody>
</table>
```

**Nota:** Você pode definir manualmente as larguras para algumas colunas e o restante da largura disponível será dividido igualmente entre as colunas sem largura explícita. As larguras definidas na primeira linha definirão a largura da coluna para toda a tabela.

## Design Responsivo

Prefixe um utilitário de `table-layout` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e acima:

```html
<div class="table-auto md:table-fixed">
  <!-- conteúdo da tabela -->
</div>
```

Saiba mais sobre o uso de variantes na [documentação de variantes](../variants.md).

