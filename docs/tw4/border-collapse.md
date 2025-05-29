# Border Collapse

As utilitários de border collapse controlam como as bordas das células de tabela são colapsadas ou separadas.

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `border-collapse` | `border-collapse: collapse;` |
| `border-separate` | `border-collapse: separate;` |

## Exemplos

### Colapsando bordas de tabela

Use a utilidade `border-collapse` para combinar bordas de células adjacentes em uma única borda quando possível:

```html
<table class="border-collapse border border-gray-400">
  <thead>
    <tr>
      <th class="border border-gray-300 px-4 py-2">Estado</th>
      <th class="border border-gray-300 px-4 py-2">Cidade</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-gray-300 px-4 py-2">Indiana</td>
      <td class="border border-gray-300 px-4 py-2">Indianapolis</td>
    </tr>
    <tr>
      <td class="border border-gray-300 px-4 py-2">Ohio</td>
      <td class="border border-gray-300 px-4 py-2">Columbus</td>
    </tr>
    <tr>
      <td class="border border-gray-300 px-4 py-2">Michigan</td>
      <td class="border border-gray-300 px-4 py-2">Detroit</td>
    </tr>
  </tbody>
</table>
```

> **Nota:** Isso inclui o colapso de bordas na tag `<table>` de nível superior.

### Separando bordas de tabela

Use a utilidade `border-separate` para forçar cada célula a exibir suas próprias bordas separadas:

```html
<table class="border-separate border border-gray-400">
  <thead>
    <tr>
      <th class="border border-gray-300 px-4 py-2">Estado</th>
      <th class="border border-gray-300 px-4 py-2">Cidade</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-gray-300 px-4 py-2">Indiana</td>
      <td class="border border-gray-300 px-4 py-2">Indianapolis</td>
    </tr>
    <tr>
      <td class="border border-gray-300 px-4 py-2">Ohio</td>
      <td class="border border-gray-300 px-4 py-2">Columbus</td>
    </tr>
    <tr>
      <td class="border border-gray-300 px-4 py-2">Michigan</td>
      <td class="border border-gray-300 px-4 py-2">Detroit</td>
    </tr>
  </tbody>
</table>
```

## Design Responsivo

Prefixe uma utilidade de border-collapse com uma variante de breakpoint como `md:` para aplicar a utilidade apenas em tamanhos de tela médios e acima:

```html
<table class="border-collapse md:border-separate">
  <!-- ... -->
</table>
```

> Saiba mais sobre o uso de variantes na [documentação de variantes](../variants.md).

