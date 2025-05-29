# transition-property

## Classes de Transição Disponíveis

### `transition`
```css
transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to, opacity, box-shadow, transform, translate, scale, rotate, filter, -webkit-backdrop-filter, backdrop-filter;
transition-timing-function: var(--default-transition-timing-function); /* cubic-bezier(0.4, 0, 0.2, 1) */
transition-duration: var(--default-transition-duration); /* 150ms */
```

### `transition-all`
```css
transition-property: all;
transition-timing-function: var(--default-transition-timing-function); /* cubic-bezier(0.4, 0, 0.2, 1) */
transition-duration: var(--default-transition-duration); /* 150ms */
```

### `transition-colors`
```css
transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to;
transition-timing-function: var(--default-transition-timing-function); /* cubic-bezier(0.4, 0, 0.2, 1) */
transition-duration: var(--default-transition-duration); /* 150ms */
```

### `transition-opacity`
```css
transition-property: opacity;
transition-timing-function: var(--default-transition-timing-function); /* cubic-bezier(0.4, 0, 0.2, 1) */
transition-duration: var(--default-transition-duration); /* 150ms */
```

### `transition-shadow`
```css
transition-property: box-shadow;
transition-timing-function: var(--default-transition-timing-function); /* cubic-bezier(0.4, 0, 0.2, 1) */
transition-duration: var(--default-transition-duration); /* 150ms */
```

### `transition-transform`
```css
transition-property: transform, translate, scale, rotate;
transition-timing-function: var(--default-transition-timing-function); /* cubic-bezier(0.4, 0, 0.2, 1) */
transition-duration: var(--default-transition-duration); /* 150ms */
```

### `transition-none`
```css
transition-property: none;
```

### `transition-(<custom-property>)`
```css
transition-property: var(<custom-property>);
transition-timing-function: var(--default-transition-timing-function); /* cubic-bezier(0.4, 0, 0.2, 1) */
transition-duration: var(--default-transition-duration); /* 150ms */
```

### `transition-[<value>]`
```css
transition-property: <value>;
transition-timing-function: var(--default-transition-timing-function); /* cubic-bezier(0.4, 0, 0.2, 1) */
transition-duration: var(--default-transition-duration); /* 150ms */
```

## Exemplos

### Exemplo Básico

Use utilitários como `transition` e `transition-colors` para especificar quais propriedades devem ter transição quando mudarem:

**Classes:** `transition` | `transition-colors`

*Passe o mouse sobre o botão para ver o comportamento esperado*

```html
<button class="bg-blue-500 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500">
  Save Changes
</button>
```

### Suporte para Movimento Reduzido

Para situações onde o usuário especificou que prefere movimento reduzido, você pode aplicar condicionalmente animações e transições usando as variantes `motion-safe` e `motion-reduce`:

```html
<button class="transform transition hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none">
  <!-- ... -->
</button>
```

### Usando um Valor Customizado

Use a sintaxe `transition-[<value>]` para definir as propriedades de transição baseadas em um valor completamente customizado:

```html
<button class="transition-[height]">
  <!-- ... -->
</button>
```

Para variáveis CSS, você também pode usar a sintaxe `transition-(<custom-property>)`:

```html
<button class="transition-(--my-properties)">
  <!-- ... -->
</button>
```

Isso é apenas um atalho para `transition-[var(<custom-property>)]` que adiciona a função `var()` automaticamente para você.

### Design Responsivo

Prefixe um utilitário de `transition-property` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e acima:

```html
<button class="transition-none md:transition-all">
  <!-- ... -->
</button>
```

Saiba mais sobre o uso de variantes na documentação de variantes.

