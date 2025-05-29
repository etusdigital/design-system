# Visibility

Classes de utilitário para controlar a visibilidade de elementos.

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `visible` | `visibility: visible;` |
| `invisible` | `visibility: hidden;` |
| `collapse` | `visibility: collapse;` |

## Exemplos

### Tornando elementos invisíveis

Use a classe `invisible` para ocultar um elemento, mas ainda manter seu lugar no documento, afetando o layout de outros elementos:

```html
<div class="grid grid-cols-3 gap-4">
  <div>01</div>
  <div class="invisible">02</div>
  <div>03</div>
</div>
```

> **Nota:** Para remover completamente um elemento do documento, use a propriedade `display` ao invés de `visibility`.

### Colapsando elementos

Use a classe `collapse` para ocultar linhas de tabela, grupos de linhas, colunas e grupos de colunas como se estivessem definidos como `display: none`, mas sem impactar o tamanho de outras linhas e colunas:

```html
<table>
  <thead>
    <tr>
      <th>Fatura #</th>
      <th>Cliente</th>
      <th>Valor</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>#100</td>
      <td>Pendant Publishing</td>
      <td>$2,000.00</td>
    </tr>
    <tr class="collapse">
      <td>#101</td>
      <td>Kruger Industrial Smoothing</td>
      <td>$545.00</td>
    </tr>
    <tr>
      <td>#102</td>
      <td>J. Peterman</td>
      <td>$10,000.25</td>
    </tr>
  </tbody>
</table>
```

Isso torna possível alternar dinamicamente linhas e colunas sem afetar o layout da tabela.

### Tornando elementos visíveis

Use a classe `visible` para tornar um elemento visível:

```html
<div class="grid grid-cols-3 gap-4">
  <div>01</div>
  <div class="visible">02</div>
  <div>03</div>
</div>
```

Isso é mais útil para desfazer a classe `invisible` em diferentes tamanhos de tela.

### Design responsivo

Prefixe uma classe de visibilidade com uma variante de breakpoint como `md:` para aplicar a classe apenas em tamanhos de tela médios e maiores:

```html
<div class="visible md:invisible">
  <!-- ... -->
</div>
```

> Saiba mais sobre o uso de variantes na documentação de variantes.

## Casos de uso comuns

- **`invisible`**: Útil para animações onde você quer manter o espaço do elemento
- **`visible`**: Útil para mostrar elementos condicionalmente em diferentes breakpoints
- **`collapse`**: Específico para tabelas, quando você quer ocultar linhas/colunas dinamicamente

