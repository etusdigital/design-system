# Padding

O Tailwind CSS v4 oferece utilitários para controlar o padding (preenchimento interno) de elementos em todas as direções.

## Classes Disponíveis

| Classe | Propriedade CSS | Descrição |
|--------|----------------|-----------|
| `p-<number>` | `padding: calc(var(--spacing) * <number>);` | Padding em todos os lados |
| `p-px` | `padding: 1px;` | Padding de 1 pixel |
| `p-(<custom-property>)` | `padding: var(<custom-property>);` | Padding usando propriedade customizada |
| `p-[<value>]` | `padding: <value>;` | Padding com valor arbitrário |
| `px-<number>` | `padding-inline: calc(var(--spacing) * <number>);` | Padding horizontal |
| `px-px` | `padding-inline: 1px;` | Padding horizontal de 1 pixel |
| `px-(<custom-property>)` | `padding-inline: var(<custom-property>);` | Padding horizontal usando propriedade customizada |
| `px-[<value>]` | `padding-inline: <value>;` | Padding horizontal com valor arbitrário |
| `py-<number>` | `padding-block: calc(var(--spacing) * <number>);` | Padding vertical |
| `py-px` | `padding-block: 1px;` | Padding vertical de 1 pixel |
| `py-(<custom-property>)` | `padding-block: var(<custom-property>);` | Padding vertical usando propriedade customizada |
| `py-[<value>]` | `padding-block: <value>;` | Padding vertical com valor arbitrário |
| `ps-<number>` | `padding-inline-start: calc(var(--spacing) * <number>);` | Padding do início inline |
| `ps-px` | `padding-inline-start: 1px;` | Padding do início inline de 1 pixel |
| `ps-(<custom-property>)` | `padding-inline-start: var(<custom-property>);` | Padding do início inline usando propriedade customizada |
| `ps-[<value>]` | `padding-inline-start: <value>;` | Padding do início inline com valor arbitrário |
| `pe-<number>` | `padding-inline-end: calc(var(--spacing) * <number>);` | Padding do fim inline |
| `pe-px` | `padding-inline-end: 1px;` | Padding do fim inline de 1 pixel |
| `pe-(<custom-property>)` | `padding-inline-end: var(<custom-property>);` | Padding do fim inline usando propriedade customizada |
| `pe-[<value>]` | `padding-inline-end: <value>;` | Padding do fim inline com valor arbitrário |
| `pt-<number>` | `padding-top: calc(var(--spacing) * <number>);` | Padding superior |
| `pt-px` | `padding-top: 1px;` | Padding superior de 1 pixel |
| `pt-(<custom-property>)` | `padding-top: var(<custom-property>);` | Padding superior usando propriedade customizada |
| `pt-[<value>]` | `padding-top: <value>;` | Padding superior com valor arbitrário |
| `pr-<number>` | `padding-right: calc(var(--spacing) * <number>);` | Padding direito |
| `pr-px` | `padding-right: 1px;` | Padding direito de 1 pixel |
| `pr-(<custom-property>)` | `padding-right: var(<custom-property>);` | Padding direito usando propriedade customizada |
| `pr-[<value>]` | `padding-right: <value>;` | Padding direito com valor arbitrário |
| `pb-<number>` | `padding-bottom: calc(var(--spacing) * <number>);` | Padding inferior |
| `pb-px` | `padding-bottom: 1px;` | Padding inferior de 1 pixel |
| `pb-(<custom-property>)` | `padding-bottom: var(<custom-property>);` | Padding inferior usando propriedade customizada |
| `pb-[<value>]` | `padding-bottom: <value>;` | Padding inferior com valor arbitrário |
| `pl-<number>` | `padding-left: calc(var(--spacing) * <number>);` | Padding esquerdo |
| `pl-px` | `padding-left: 1px;` | Padding esquerdo de 1 pixel |
| `pl-(<custom-property>)` | `padding-left: var(<custom-property>);` | Padding esquerdo usando propriedade customizada |
| `pl-[<value>]` | `padding-left: <value>;` | Padding esquerdo com valor arbitrário |

## Exemplos

### Exemplo básico

Use utilitários `p-<number>` como `p-4` e `p-8` para controlar o padding em todos os lados de um elemento:

```html
<div class="p-8 ...">p-8</div>
```

### Adicionando padding a um lado

Use utilitários `pt-<number>`, `pr-<number>`, `pb-<number>`, e `pl-<number>` como `pt-6` e `pr-4` para controlar o padding em um lado específico de um elemento:

```html
<div class="pt-6 ...">pt-6</div>
<div class="pr-4 ...">pr-4</div>
<div class="pb-8 ...">pb-8</div>
<div class="pl-2 ...">pl-2</div>
```

### Adicionando padding horizontal

Use utilitários `px-<number>` como `px-4` e `px-8` para controlar o padding horizontal de um elemento:

```html
<div class="px-8 ...">px-8</div>
```

### Adicionando padding vertical

Use utilitários `py-<number>` como `py-4` e `py-8` para controlar o padding vertical de um elemento:

```html
<div class="py-8 ...">py-8</div>
```

### Usando propriedades lógicas

Use utilitários `ps-<number>` ou `pe-<number>` como `ps-4` e `pe-8` para definir as propriedades lógicas `padding-inline-start` e `padding-inline-end`, que mapeiam para o lado esquerdo ou direito baseado na direção do texto:

**Da esquerda para a direita:**

```html
<div dir="ltr">
  <div class="ps-8 ...">ps-8</div>
  <div class="pe-8 ...">pe-8</div>
</div>
```

**Da direita para a esquerda:**

```html
<div dir="rtl">
  <div class="ps-8 ...">ps-8</div>
  <div class="pe-8 ...">pe-8</div>
</div>
```

Para mais controle, você também pode usar os modificadores LTR e RTL para aplicar condicionalmente estilos específicos dependendo da direção atual do texto.

### Usando um valor personalizado

Use utilitários como `p-[<value>]`, `px-[<value>]`, e `pb-[<value>]` para definir o padding baseado em um valor completamente personalizado:

```html
<div class="p-[5px] ...">
  <!-- ... -->
</div>
```

Para variáveis CSS, você também pode usar a sintaxe `p-(<custom-property>)`:

```html
<div class="p-(--my-padding) ...">
  <!-- ... -->
</div>
```

Esta é apenas uma forma abreviada de `p-[var(<custom-property>)]` que adiciona a função `var()` automaticamente para você.

### Design responsivo

Prefixe um utilitário de padding com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e maiores:

```html
<div class="py-4 md:py-8 ...">
  <!-- ... -->
</div>
```

Saiba mais sobre o uso de variantes na documentação de variantes.

## Personalizando seu tema

Os utilitários `p-<number>`, `px-<number>`, `py-<number>`, `ps-<number>`, `pe-<number>`, `pt-<number>`, `pr-<number>`, `pb-<number>`, e `pl-<number>` são controlados pela variável de tema `--spacing`, que pode ser personalizada em seu próprio tema:

```css
@theme {
  --spacing: 1px;
}
```

Saiba mais sobre a personalização da escala de espaçamento na documentação de variáveis de tema.

