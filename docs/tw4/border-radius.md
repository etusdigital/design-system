# Border Radius

Este documento descreve os utilitários de border-radius disponíveis no Tailwind CSS v4.

## Utilitários Básicos

| Classe | Propriedade CSS | Valor |
|--------|----------------|-------|
| `rounded-xs` | `border-radius: var(--radius-xs);` | 0.125rem (2px) |
| `rounded-sm` | `border-radius: var(--radius-sm);` | 0.25rem (4px) |
| `rounded-md` | `border-radius: var(--radius-md);` | 0.375rem (6px) |
| `rounded-lg` | `border-radius: var(--radius-lg);` | 0.5rem (8px) |
| `rounded-xl` | `border-radius: var(--radius-xl);` | 0.75rem (12px) |
| `rounded-2xl` | `border-radius: var(--radius-2xl);` | 1rem (16px) |
| `rounded-3xl` | `border-radius: var(--radius-3xl);` | 1.5rem (24px) |
| `rounded-4xl` | `border-radius: var(--radius-4xl);` | 2rem (32px) |
| `rounded-none` | `border-radius: 0;` | 0 |
| `rounded-full` | `border-radius: calc(infinity * 1px);` | Círculo completo |
| `rounded-(<custom-property>)` | `border-radius: var(<custom-property>);` | Variável CSS customizada |
| `rounded-[<value>]` | `border-radius: <value>;` | Valor arbitrário |

## Utilitários por Lado (Logical Properties)

### Start Side (Lado Inicial)

| Classe | Propriedade CSS |
|--------|----------------|
| `rounded-s-xs` | `border-start-start-radius: var(--radius-xs); border-end-start-radius: var(--radius-xs);` |
| `rounded-s-sm` | `border-start-start-radius: var(--radius-sm); border-end-start-radius: var(--radius-sm);` |
| `rounded-s-md` | `border-start-start-radius: var(--radius-md); border-end-start-radius: var(--radius-md);` |
| `rounded-s-lg` | `border-start-start-radius: var(--radius-lg); border-end-start-radius: var(--radius-lg);` |
| `rounded-s-xl` | `border-start-start-radius: var(--radius-xl); border-end-start-radius: var(--radius-xl);` |
| `rounded-s-2xl` | `border-start-start-radius: var(--radius-2xl); border-end-start-radius: var(--radius-2xl);` |
| `rounded-s-3xl` | `border-start-start-radius: var(--radius-3xl); border-end-start-radius: var(--radius-3xl);` |
| `rounded-s-4xl` | `border-start-start-radius: var(--radius-4xl); border-end-start-radius: var(--radius-4xl);` |
| `rounded-s-none` | `border-start-start-radius: 0; border-end-start-radius: 0;` |
| `rounded-s-full` | `border-start-start-radius: calc(infinity * 1px); border-end-start-radius: calc(infinity * 1px);` |

### End Side (Lado Final)

| Classe | Propriedade CSS |
|--------|----------------|
| `rounded-e-xs` | `border-start-end-radius: var(--radius-xs); border-end-end-radius: var(--radius-xs);` |
| `rounded-e-sm` | `border-start-end-radius: var(--radius-sm); border-end-end-radius: var(--radius-sm);` |
| `rounded-e-md` | `border-start-end-radius: var(--radius-md); border-end-end-radius: var(--radius-md);` |
| `rounded-e-lg` | `border-start-end-radius: var(--radius-lg); border-end-end-radius: var(--radius-lg);` |
| `rounded-e-xl` | `border-start-end-radius: var(--radius-xl); border-end-end-radius: var(--radius-xl);` |
| `rounded-e-2xl` | `border-start-end-radius: var(--radius-2xl); border-end-end-radius: var(--radius-2xl);` |
| `rounded-e-3xl` | `border-start-end-radius: var(--radius-3xl); border-end-end-radius: var(--radius-3xl);` |
| `rounded-e-4xl` | `border-start-end-radius: var(--radius-4xl); border-end-end-radius: var(--radius-4xl);` |
| `rounded-e-none` | `border-start-end-radius: 0; border-end-end-radius: 0;` |
| `rounded-e-full` | `border-start-end-radius: calc(infinity * 1px); border-end-end-radius: calc(infinity * 1px);` |

## Utilitários por Lado (Physical Properties)

### Top (Topo)

| Classe | Propriedade CSS |
|--------|----------------|
| `rounded-t-xs` | `border-top-left-radius: var(--radius-xs); border-top-right-radius: var(--radius-xs);` |
| `rounded-t-sm` | `border-top-left-radius: var(--radius-sm); border-top-right-radius: var(--radius-sm);` |
| `rounded-t-md` | `border-top-left-radius: var(--radius-md); border-top-right-radius: var(--radius-md);` |
| `rounded-t-lg` | `border-top-left-radius: var(--radius-lg); border-top-right-radius: var(--radius-lg);` |
| `rounded-t-xl` | `border-top-left-radius: var(--radius-xl); border-top-right-radius: var(--radius-xl);` |
| `rounded-t-2xl` | `border-top-left-radius: var(--radius-2xl); border-top-right-radius: var(--radius-2xl);` |
| `rounded-t-3xl` | `border-top-left-radius: var(--radius-3xl); border-top-right-radius: var(--radius-3xl);` |
| `rounded-t-4xl` | `border-top-left-radius: var(--radius-4xl); border-top-right-radius: var(--radius-4xl);` |
| `rounded-t-none` | `border-top-left-radius: 0; border-top-right-radius: 0;` |
| `rounded-t-full` | `border-top-left-radius: calc(infinity * 1px); border-top-right-radius: calc(infinity * 1px);` |

### Right (Direita)

| Classe | Propriedade CSS |
|--------|----------------|
| `rounded-r-xs` | `border-top-right-radius: var(--radius-xs); border-bottom-right-radius: var(--radius-xs);` |
| `rounded-r-sm` | `border-top-right-radius: var(--radius-sm); border-bottom-right-radius: var(--radius-sm);` |
| `rounded-r-md` | `border-top-right-radius: var(--radius-md); border-bottom-right-radius: var(--radius-md);` |
| `rounded-r-lg` | `border-top-right-radius: var(--radius-lg); border-bottom-right-radius: var(--radius-lg);` |
| `rounded-r-xl` | `border-top-right-radius: var(--radius-xl); border-bottom-right-radius: var(--radius-xl);` |
| `rounded-r-2xl` | `border-top-right-radius: var(--radius-2xl); border-bottom-right-radius: var(--radius-2xl);` |
| `rounded-r-3xl` | `border-top-right-radius: var(--radius-3xl); border-bottom-right-radius: var(--radius-3xl);` |
| `rounded-r-4xl` | `border-top-right-radius: var(--radius-4xl); border-bottom-right-radius: var(--radius-4xl);` |
| `rounded-r-none` | `border-top-right-radius: 0; border-bottom-right-radius: 0;` |
| `rounded-r-full` | `border-top-right-radius: calc(infinity * 1px); border-bottom-right-radius: calc(infinity * 1px);` |

### Bottom (Parte Inferior)

| Classe | Propriedade CSS |
|--------|----------------|
| `rounded-b-xs` | `border-bottom-right-radius: var(--radius-xs); border-bottom-left-radius: var(--radius-xs);` |
| `rounded-b-sm` | `border-bottom-right-radius: var(--radius-sm); border-bottom-left-radius: var(--radius-sm);` |
| `rounded-b-md` | `border-bottom-right-radius: var(--radius-md); border-bottom-left-radius: var(--radius-md);` |
| `rounded-b-lg` | `border-bottom-right-radius: var(--radius-lg); border-bottom-left-radius: var(--radius-lg);` |
| `rounded-b-xl` | `border-bottom-right-radius: var(--radius-xl); border-bottom-left-radius: var(--radius-xl);` |
| `rounded-b-2xl` | `border-bottom-right-radius: var(--radius-2xl); border-bottom-left-radius: var(--radius-2xl);` |
| `rounded-b-3xl` | `border-bottom-right-radius: var(--radius-3xl); border-bottom-left-radius: var(--radius-3xl);` |
| `rounded-b-4xl` | `border-bottom-right-radius: var(--radius-4xl); border-bottom-left-radius: var(--radius-4xl);` |
| `rounded-b-none` | `border-bottom-right-radius: 0; border-bottom-left-radius: 0;` |
| `rounded-b-full` | `border-bottom-right-radius: calc(infinity * 1px); border-bottom-left-radius: calc(infinity * 1px);` |

### Left (Esquerda)

| Classe | Propriedade CSS |
|--------|----------------|
| `rounded-l-xs` | `border-top-left-radius: var(--radius-xs); border-bottom-left-radius: var(--radius-xs);` |
| `rounded-l-sm` | `border-top-left-radius: var(--radius-sm); border-bottom-left-radius: var(--radius-sm);` |
| `rounded-l-md` | `border-top-left-radius: var(--radius-md); border-bottom-left-radius: var(--radius-md);` |
| `rounded-l-lg` | `border-top-left-radius: var(--radius-lg); border-bottom-left-radius: var(--radius-lg);` |
| `rounded-l-xl` | `border-top-left-radius: var(--radius-xl); border-bottom-left-radius: var(--radius-xl);` |
| `rounded-l-2xl` | `border-top-left-radius: var(--radius-2xl); border-bottom-left-radius: var(--radius-2xl);` |
| `rounded-l-3xl` | `border-top-left-radius: var(--radius-3xl); border-bottom-left-radius: var(--radius-3xl);` |
| `rounded-l-4xl` | `border-top-left-radius: var(--radius-4xl); border-bottom-left-radius: var(--radius-4xl);` |
| `rounded-l-none` | `border-top-left-radius: 0; border-bottom-left-radius: 0;` |
| `rounded-l-full` | `border-top-left-radius: calc(infinity * 1px); border-bottom-left-radius: calc(infinity * 1px);` |

## Utilitários por Canto Individual

### Cantos Específicos (Logical Properties)

| Classe | Propriedade CSS | Descrição |
|--------|----------------|-----------|
| `rounded-ss-*` | `border-start-start-radius` | Canto inicial-inicial |
| `rounded-se-*` | `border-start-end-radius` | Canto inicial-final |
| `rounded-ee-*` | `border-end-end-radius` | Canto final-final |
| `rounded-es-*` | `border-end-start-radius` | Canto final-inicial |

### Cantos Específicos (Physical Properties)

| Classe | Propriedade CSS | Descrição |
|--------|----------------|-----------|
| `rounded-tl-*` | `border-top-left-radius` | Canto superior esquerdo |
| `rounded-tr-*` | `border-top-right-radius` | Canto superior direito |
| `rounded-br-*` | `border-bottom-right-radius` | Canto inferior direito |
| `rounded-bl-*` | `border-bottom-left-radius` | Canto inferior esquerdo |

*Nota: O `*` representa qualquer um dos tamanhos disponíveis: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `none`, `full`*

## Exemplos de Uso

### Exemplo Básico

Use utilitários como `rounded-sm` e `rounded-md` para aplicar diferentes tamanhos de border radius a um elemento:

```html
<div class="rounded-sm">rounded-sm</div>
<div class="rounded-md">rounded-md</div>
<div class="rounded-lg">rounded-lg</div>
<div class="rounded-xl">rounded-xl</div>
```

### Arredondando Lados Separadamente

Use utilitários como `rounded-t-md` e `rounded-r-lg` para arredondar apenas um lado do elemento:

```html
<div class="rounded-t-lg">rounded-t-lg</div>
<div class="rounded-r-lg">rounded-r-lg</div>
<div class="rounded-b-lg">rounded-b-lg</div>
<div class="rounded-l-lg">rounded-l-lg</div>
```

### Arredondando Cantos Separadamente

Use utilitários como `rounded-tr-md` e `rounded-tl-lg` para arredondar apenas um canto do elemento:

```html
<div class="rounded-tl-lg">rounded-tl-lg</div>
<div class="rounded-tr-lg">rounded-tr-lg</div>
<div class="rounded-br-lg">rounded-br-lg</div>
<div class="rounded-bl-lg">rounded-bl-lg</div>
```

### Usando Propriedades Lógicas

Use utilitários como `rounded-s-md` e `rounded-se-xl` para definir o border radius usando propriedades lógicas, que se mapeiam para os cantos apropriados baseados na direção do texto:

```html
<div dir="ltr">
  <div class="rounded-s-lg">Esquerda para direita</div>
</div>

<div dir="rtl">
  <div class="rounded-s-lg">Direita para esquerda</div>
</div>
```

### Mapeamento de Propriedades Lógicas

| Logical | LTR Physical | RTL Physical |
|---------|-------------|-------------|
| `rounded-s-*` | `rounded-l-*` | `rounded-r-*` |
| `rounded-e-*` | `rounded-r-*` | `rounded-l-*` |
| `rounded-ss-*` | `rounded-tl-*` | `rounded-tr-*` |
| `rounded-se-*` | `rounded-tr-*` | `rounded-tl-*` |
| `rounded-es-*` | `rounded-bl-*` | `rounded-br-*` |
| `rounded-ee-*` | `rounded-br-*` | `rounded-bl-*` |

### Criando Botões Pills

Use o utilitário `rounded-full` para criar botões em formato de pílula:

```html
<button class="rounded-full">Save Changes</button>
```

### Removendo o Border Radius

Use o utilitário `rounded-none` para remover um border radius existente de um elemento:

```html
<button class="rounded-none">Save Changes</button>
```

### Usando Valores Customizados

Use a sintaxe `rounded-[<value>]` para definir o border radius baseado em um valor completamente customizado:

```html
<div class="rounded-[2vw]">
  <!-- ... -->
</div>
```

Para variáveis CSS, você também pode usar a sintaxe `rounded-(<custom-property>)`:

```html
<div class="rounded-(--my-radius)">
  <!-- ... -->
</div>
```

Isso é apenas uma abreviação para `rounded-[var(<custom-property>)]` que adiciona a função `var()` automaticamente.

### Design Responsivo

Prefixe um utilitário de border-radius com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e acima:

```html
<div class="rounded md:rounded-lg">
  <!-- ... -->
</div>
```

Saiba mais sobre o uso de variantes na documentação de variantes.

## Customizando seu Tema

Use as variáveis de tema `--radius-*` para customizar os utilitários de border radius em seu projeto:

```css
@theme {
  --radius-5xl: 3rem;
}
```

Agora o utilitário `rounded-5xl` pode ser usado em seu markup:

```html
<div class="rounded-5xl">
  <!-- ... -->
</div>
```

Saiba mais sobre customização de tema na documentação de tema.

