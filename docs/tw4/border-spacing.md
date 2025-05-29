# Border Spacing

As utilidades de `border-spacing` controlam o espaçamento entre as bordas de células de tabela com bordas separadas.

## Sintaxe

### Espaçamento Geral
- `border-spacing-<number>` → `border-spacing: calc(var(--spacing) * <number>);`
- `border-spacing-(<custom-property>)` → `border-spacing: var(<custom-property>);`
- `border-spacing-[<value>]` → `border-spacing: <value>;`

### Espaçamento Horizontal (X)
- `border-spacing-x-<number>` → `border-spacing: calc(var(--spacing) * <number>) var(--tw-border-spacing-y);`
- `border-spacing-x-(<custom-property>)` → `border-spacing: var(<custom-property>) var(--tw-border-spacing-y);`
- `border-spacing-x-[<value>]` → `border-spacing: <value> var(--tw-border-spacing-y);`

### Espaçamento Vertical (Y)
- `border-spacing-y-<number>` → `border-spacing: var(--tw-border-spacing-x) calc(var(--spacing) * <number>);`
- `border-spacing-y-(<custom-property>)` → `border-spacing: var(--tw-border-spacing-x) var(<custom-property>);`
- `border-spacing-y-[<value>]` → `border-spacing: var(--tw-border-spacing-x) <value>;`

## Exemplos

### Exemplo Básico

Use as utilidades `border-spacing-<number>` como `border-spacing-2` e `border-spacing-x-3` para controlar o espaço entre as bordas de células de tabela com bordas separadas:

```html
<table class="border-separate border-spacing-2 border border-gray-400 dark:border-gray-500">
  <thead>
    <tr>
      <th class="border border-gray-300 dark:border-gray-600">State</th>
      <th class="border border-gray-300 dark:border-gray-600">City</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-gray-300 dark:border-gray-700">Indiana</td>
      <td class="border border-gray-300 dark:border-gray-700">Indianapolis</td>
    </tr>
    <tr>
      <td class="border border-gray-300 dark:border-gray-700">Ohio</td>
      <td class="border border-gray-300 dark:border-gray-700">Columbus</td>
    </tr>
    <tr>
      <td class="border border-gray-300 dark:border-gray-700">Michigan</td>
      <td class="border border-gray-300 dark:border-gray-700">Detroit</td>
    </tr>
  </tbody>
</table>
```

### Usando um Valor Customizado

Use a sintaxe `border-spacing-[<value>]` para definir o espaçamento da borda baseado em um valor completamente customizado:

```html
<table class="border-spacing-[7px] ...">
  <!-- ... -->
</table>
```

Para variáveis CSS, você também pode usar a sintaxe `border-spacing-(<custom-property>)`:

```html
<table class="border-spacing-(--my-border-spacing) ...">
  <!-- ... -->
</table>
```

Isso é apenas uma abreviação para `border-spacing-[var(<custom-property>)]` que adiciona a função `var()` automaticamente para você.

### Design Responsivo

Prefixe uma utilidade `border-spacing` com uma variante de breakpoint como `md:` para aplicar a utilidade apenas em tamanhos de tela médios e maiores:

```html
<table class="border-spacing-2 md:border-spacing-4 ...">
  <!-- ... -->
</table>
```

Saiba mais sobre o uso de variantes na documentação de variantes.

## Personalizando seu Tema

As utilidades `border-spacing-<number>` são controladas pela variável de tema `--spacing`, que pode ser personalizada em seu próprio tema:

```css
@theme {
  --spacing: 1px;
}
```

Saiba mais sobre personalizar a escala de espaçamento na documentação de variáveis de tema.

