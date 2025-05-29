# Border Width

## Visão Geral

As utilitários de `border-width` controlam a largura das bordas de um elemento. No Tailwind CSS v4, você pode aplicar bordas a todos os lados, lados individuais, ou usar propriedades lógicas.

## Utilitários Disponíveis

### Bordas Gerais

| Classe | Propriedade CSS | Descrição |
|--------|-----------------|-----------|
| `border` | `border-width: 1px;` | Aplica borda de 1px em todos os lados |
| `border-<number>` | `border-width: <number>px;` | Aplica borda personalizada em todos os lados |
| `border-(length:<custom-property>)` | `border-width: var(<custom-property>);` | Usa variável CSS personalizada |
| `border-[<value>]` | `border-width: <value>;` | Valor arbitrário |

### Bordas Horizontais e Verticais

| Classe | Propriedade CSS | Descrição |
|--------|-----------------|-----------|
| `border-x` | `border-inline-width: 1px;` | Borda horizontal (esquerda e direita) |
| `border-x-<number>` | `border-inline-width: <number>px;` | Borda horizontal personalizada |
| `border-x-(length:<custom-property>)` | `border-inline-width: var(<custom-property>);` | Borda horizontal com variável CSS |
| `border-x-[<value>]` | `border-inline-width: <value>;` | Borda horizontal com valor arbitrário |
| `border-y` | `border-block-width: 1px;` | Borda vertical (superior e inferior) |
| `border-y-<number>` | `border-block-width: <number>px;` | Borda vertical personalizada |
| `border-y-(length:<custom-property>)` | `border-block-width: var(<custom-property>);` | Borda vertical com variável CSS |
| `border-y-[<value>]` | `border-block-width: <value>;` | Borda vertical com valor arbitrário |

### Bordas Lógicas (Direcionais)

| Classe | Propriedade CSS | Descrição |
|--------|-----------------|-----------|
| `border-s` | `border-inline-start-width: 1px;` | Borda no início do texto |
| `border-s-<number>` | `border-inline-start-width: <number>px;` | Borda inicial personalizada |
| `border-s-(length:<custom-property>)` | `border-inline-start-width: var(<custom-property>);` | Borda inicial com variável CSS |
| `border-s-[<value>]` | `border-inline-start-width: <value>;` | Borda inicial com valor arbitrário |
| `border-e` | `border-inline-end-width: 1px;` | Borda no final do texto |
| `border-e-<number>` | `border-inline-end-width: <number>px;` | Borda final personalizada |
| `border-e-(length:<custom-property>)` | `border-inline-end-width: var(<custom-property>);` | Borda final com variável CSS |
| `border-e-[<value>]` | `border-inline-end-width: <value>;` | Borda final com valor arbitrário |

### Bordas Específicas

| Classe | Propriedade CSS | Descrição |
|--------|-----------------|-----------|
| `border-t` | `border-top-width: 1px;` | Borda superior |
| `border-t-<number>` | `border-top-width: <number>px;` | Borda superior personalizada |
| `border-t-(length:<custom-property>)` | `border-top-width: var(<custom-property>);` | Borda superior com variável CSS |
| `border-t-[<value>]` | `border-top-width: <value>;` | Borda superior com valor arbitrário |
| `border-r` | `border-right-width: 1px;` | Borda direita |
| `border-r-<number>` | `border-right-width: <number>px;` | Borda direita personalizada |
| `border-r-(length:<custom-property>)` | `border-right-width: var(<custom-property>);` | Borda direita com variável CSS |
| `border-r-[<value>]` | `border-right-width: <value>;` | Borda direita com valor arbitrário |
| `border-b` | `border-bottom-width: 1px;` | Borda inferior |
| `border-b-<number>` | `border-bottom-width: <number>px;` | Borda inferior personalizada |
| `border-b-(length:<custom-property>)` | `border-bottom-width: var(<custom-property>);` | Borda inferior com variável CSS |
| `border-b-[<value>]` | `border-bottom-width: <value>;` | Borda inferior com valor arbitrário |
| `border-l` | `border-left-width: 1px;` | Borda esquerda |
| `border-l-<number>` | `border-left-width: <number>px;` | Borda esquerda personalizada |
| `border-l-(length:<custom-property>)` | `border-left-width: var(<custom-property>);` | Borda esquerda com variável CSS |
| `border-l-[<value>]` | `border-left-width: <value>;` | Borda esquerda com valor arbitrário |

## Utilitários Divide (Entre Elementos Filhos)

### Divide Horizontal

| Classe | Propriedade CSS | Descrição |
|--------|-----------------|-----------|
| `divide-x` | `& > :not(:last-child) { border-inline-start-width: 0px; border-inline-end-width: 1px; }` | Adiciona bordas verticais entre elementos filhos |
| `divide-x-<number>` | `& > :not(:last-child) { border-inline-start-width: 0px; border-inline-end-width: <number>px; }` | Bordas verticais personalizadas entre filhos |
| `divide-x-(length:<custom-property>)` | `& > :not(:last-child) { border-inline-start-width: 0px; border-inline-end-width: var(<custom-property>); }` | Bordas verticais com variável CSS |
| `divide-x-[<value>]` | `& > :not(:last-child) { border-inline-start-width: 0px; border-inline-end-width: <value>; }` | Bordas verticais com valor arbitrário |

### Divide Vertical

| Classe | Propriedade CSS | Descrição |
|--------|-----------------|-----------|
| `divide-y` | `& > :not(:last-child) { border-top-width: 0px; border-bottom-width: 1px; }` | Adiciona bordas horizontais entre elementos filhos |
| `divide-y-<number>` | `& > :not(:last-child) { border-top-width: 0px; border-bottom-width: <number>px; }` | Bordas horizontais personalizadas entre filhos |
| `divide-y-(length:<custom-property>)` | `& > :not(:last-child) { border-top-width: 0px; border-bottom-width: var(<custom-property>); }` | Bordas horizontais com variável CSS |
| `divide-y-[<value>]` | `& > :not(:last-child) { border-top-width: 0px; border-bottom-width: <value>; }` | Bordas horizontais com valor arbitrário |

### Controle de Direção

| Classe | Propriedade CSS | Descrição |
|--------|-----------------|-----------|
| `divide-x-reverse` | `--tw-divide-x-reverse: 1;` | Reverte a direção das bordas horizontais |
| `divide-y-reverse` | `--tw-divide-y-reverse: 1;` | Reverte a direção das bordas verticais |

## Exemplos

### Exemplo Básico

Use os utilitários `border` ou `border-<number>` como `border-2` e `border-4` para definir a largura da borda em todos os lados de um elemento:

```html
<div class="border border-indigo-600 ...">border</div>
<div class="border-2 border-indigo-600 ...">border-2</div>
<div class="border-4 border-indigo-600 ...">border-4</div>
<div class="border-8 border-indigo-600 ...">border-8</div>
```

### Lados Individuais

Use utilitários como `border-r` e `border-t-4` para definir a largura da borda de um lado específico:

```html
<div class="border-t-4 border-indigo-500 ...">border-t-4</div>
<div class="border-r-4 border-indigo-500 ...">border-r-4</div>
<div class="border-b-4 border-indigo-500 ...">border-b-4</div>
<div class="border-l-4 border-indigo-500 ...">border-l-4</div>
```

### Lados Horizontais e Verticais

Use utilitários como `border-x` e `border-y-4` para definir a largura da borda em dois lados ao mesmo tempo:

```html
<div class="border-x-4 border-indigo-500 ...">border-x-4</div>
<div class="border-y-4 border-indigo-500 ...">border-y-4</div>
```

### Usando Propriedades Lógicas

Use utilitários como `border-s` e `border-e-4` para definir as propriedades lógicas `border-inline-start-width` e `border-inline-end-width`, que mapear para a borda esquerda ou direita baseado na direção do texto:

**Esquerda para Direita:**
```html
<div dir="ltr">
  <div class="border-s-4 ..."></div>
</div>
```

**Direita para Esquerda:**
```html
<div dir="rtl">
  <div class="border-s-4 ..."></div>
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

#### Revertendo a Ordem dos Filhos

Se seus elementos estão em ordem reversa (usando `flex-row-reverse` ou `flex-col-reverse`), use os utilitários `divide-x-reverse` ou `divide-y-reverse` para garantir que a borda seja adicionada ao lado correto de cada elemento:

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
<div class="border-[2vw] ...">
  <!-- ... -->
</div>
```

Para variáveis CSS, você também pode usar a sintaxe `border-(length:<custom-property>)`:

```html
<div class="border-(length:--my-border-width) ...">
  <!-- ... -->
</div>
```

Isso é apenas uma abreviação para `border-[length:var(<custom-property>)]` que adiciona a função `var()` automaticamente.

### Design Responsivo

Prefixe um utilitário de `border-width` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e acima:

```html
<div class="border-2 md:border-t-4 ...">
  <!-- ... -->
</div>
```

Saiba mais sobre o uso de variantes na documentação de variantes.

