# Border Width

Esta documentação abrange as utilitários de largura de borda (border-width) no Tailwind CSS v4.

## Referência de Classes

### Bordas Gerais

| Classe | Propriedade CSS | Descrição |
|--------|----------------|-----------|
| `border` | `border-width: 1px;` | Aplica borda de 1px em todos os lados |
| `border-<number>` | `border-width: <number>px;` | Aplica borda com tamanho específico |
| `border-(length:<custom-property>)` | `border-width: var(<custom-property>);` | Usa propriedade CSS customizada |
| `border-[<value>]` | `border-width: <value>;` | Valor arbitrário personalizado |

### Bordas Horizontais/Verticais

| Classe | Propriedade CSS | Descrição |
|--------|----------------|-----------|
| `border-x` | `border-inline-width: 1px;` | Borda horizontal (esquerda e direita) |
| `border-x-<number>` | `border-inline-width: <number>px;` | Borda horizontal com tamanho específico |
| `border-y` | `border-block-width: 1px;` | Borda vertical (topo e rodapé) |
| `border-y-<number>` | `border-block-width: <number>px;` | Borda vertical com tamanho específico |

### Bordas Lógicas (Início/Fim)

| Classe | Propriedade CSS | Descrição |
|--------|----------------|-----------|
| `border-s` | `border-inline-start-width: 1px;` | Borda no início (esquerda em LTR) |
| `border-s-<number>` | `border-inline-start-width: <number>px;` | Borda início com tamanho específico |
| `border-e` | `border-inline-end-width: 1px;` | Borda no fim (direita em LTR) |
| `border-e-<number>` | `border-inline-end-width: <number>px;` | Borda fim com tamanho específico |

### Bordas Individuais

| Classe | Propriedade CSS | Descrição |
|--------|----------------|-----------|
| `border-t` | `border-top-width: 1px;` | Borda superior |
| `border-t-<number>` | `border-top-width: <number>px;` | Borda superior com tamanho específico |
| `border-r` | `border-right-width: 1px;` | Borda direita |
| `border-r-<number>` | `border-right-width: <number>px;` | Borda direita com tamanho específico |
| `border-b` | `border-bottom-width: 1px;` | Borda inferior |
| `border-b-<number>` | `border-bottom-width: <number>px;` | Borda inferior com tamanho específico |
| `border-l` | `border-left-width: 1px;` | Borda esquerda |
| `border-l-<number>` | `border-left-width: <number>px;` | Borda esquerda com tamanho específico |

### Divisores Entre Elementos

| Classe | Descrição |
|--------|-----------|
| `divide-x` | Adiciona borda vertical entre elementos filhos |
| `divide-x-<number>` | Divisor vertical com tamanho específico |
| `divide-y` | Adiciona borda horizontal entre elementos filhos |
| `divide-y-<number>` | Divisor horizontal com tamanho específico |
| `divide-x-reverse` | Inverte a direção do divisor horizontal |
| `divide-y-reverse` | Inverte a direção do divisor vertical |

## Exemplos

### Exemplo Básico

Use as utilitários `border` ou `border-<number>` como `border-2` e `border-4` para definir a largura da borda em todos os lados de um elemento:

```html
<div class="border border-indigo-600">border</div>
<div class="border-2 border-indigo-600">border-2</div>
<div class="border-4 border-indigo-600">border-4</div>
<div class="border-8 border-indigo-600">border-8</div>
```

### Lados Individuais

Use utilitários como `border-r` e `border-t-4` para definir a largura da borda em um lado específico:

```html
<div class="border-t-4 border-indigo-500">border-t-4</div>
<div class="border-r-4 border-indigo-500">border-r-4</div>
<div class="border-b-4 border-indigo-500">border-b-4</div>
<div class="border-l-4 border-indigo-500">border-l-4</div>
```

### Lados Horizontais e Verticais

Use utilitários como `border-x` e `border-y-4` para definir a largura da borda em dois lados ao mesmo tempo:

```html
<div class="border-x-4 border-indigo-500">border-x-4</div>
<div class="border-y-4 border-indigo-500">border-y-4</div>
```

### Usando Propriedades Lógicas

Use utilitários como `border-s` e `border-e-4` para definir as propriedades lógicas `border-inline-start-width` e `border-inline-end-width`, que mapeiam para borda esquerda ou direita baseado na direção do texto:

**Esquerda para direita (LTR):**
```html
<div dir="ltr">
  <div class="border-s-4">Início (esquerda em LTR)</div>
</div>
```

**Direita para esquerda (RTL):**
```html
<div dir="rtl">
  <div class="border-s-4">Início (direita em RTL)</div>
</div>
```

### Entre Elementos Filhos

Use utilitários como `divide-x` e `divide-y-4` para adicionar bordas entre elementos filhos:

```html
<div class="grid grid-cols-3 divide-x-4">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

#### Invertendo a Ordem dos Filhos

Se seus elementos estão em ordem inversa (usando `flex-row-reverse` ou `flex-col-reverse`), use os utilitários `divide-x-reverse` ou `divide-y-reverse` para garantir que a borda seja adicionada no lado correto:

```html
<div class="flex flex-col-reverse divide-y-4 divide-y-reverse divide-gray-200">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

### Usando Valores Personalizados

Use a sintaxe `border-[<value>]` para definir a largura da borda baseada em um valor completamente personalizado:

```html
<div class="border-[2vw]">
  <!-- Borda com 2vw de largura -->
</div>
```

Para variáveis CSS, você também pode usar a sintaxe `border-(length:<custom-property>)`:

```html
<div class="border-(length:--my-border-width)">
  <!-- Usa a variável CSS --my-border-width -->
</div>
```

Isso é uma abreviação para `border-[length:var(<custom-property>)]` que adiciona a função `var()` automaticamente.

### Design Responsivo

Prefixe um utilitário de border-width com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e acima:

```html
<div class="border-2 md:border-t-4">
  <!-- border-2 por padrão, border-t-4 em telas médias e maiores -->
</div>
```

Saiba mais sobre o uso de variantes na [documentação de variantes](https://tailwindcss.com/docs/responsive-design).

