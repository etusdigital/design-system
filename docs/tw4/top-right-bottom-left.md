# Top / Right / Bottom / Left

Este documento descreve as classes utilitárias do Tailwind CSS v4 para posicionamento de elementos usando as propriedades `top`, `right`, `bottom`, `left` e `inset`.

## Visão Geral

As classes de posicionamento permitem controlar a posição de elementos posicionados (`absolute`, `relative`, `fixed`, `sticky`) definindo suas coordenadas em relação ao seu container pai.

## Classes Disponíveis

### Inset (todas as direções)

| Classe | Propriedade CSS |
|--------|----------------|
| `inset-<number>` | `inset: calc(var(--spacing) * <number>);` |
| `-inset-<number>` | `inset: calc(var(--spacing) * -<number>);` |
| `inset-<fraction>` | `inset: calc(<fraction> * 100%);` |
| `-inset-<fraction>` | `inset: calc(<fraction> * -100%);` |
| `inset-px` | `inset: 1px;` |
| `-inset-px` | `inset: -1px;` |
| `inset-full` | `inset: 100%;` |
| `-inset-full` | `inset: -100%;` |
| `inset-auto` | `inset: auto;` |
| `inset-(<custom-property>)` | `inset: var(<custom-property>);` |
| `inset-[<value>]` | `inset: <value>;` |

### Inset Horizontal (eixo X)

| Classe | Propriedade CSS |
|--------|----------------|
| `inset-x-<number>` | `inset-inline: calc(var(--spacing) * <number>);` |
| `-inset-x-<number>` | `inset-inline: calc(var(--spacing) * -<number>);` |
| `inset-x-<fraction>` | `inset-inline: calc(<fraction> * 100%);` |
| `-inset-x-<fraction>` | `inset-inline: calc(<fraction> * -100%);` |
| `inset-x-px` | `inset-inline: 1px;` |
| `-inset-x-px` | `inset-inline: -1px;` |
| `inset-x-full` | `inset-inline: 100%;` |
| `-inset-x-full` | `inset-inline: -100%;` |
| `inset-x-auto` | `inset-inline: auto;` |
| `inset-x-(<custom-property>)` | `inset-inline: var(<custom-property>);` |
| `inset-x-[<value>]` | `inset-inline: <value>;` |

### Inset Vertical (eixo Y)

| Classe | Propriedade CSS |
|--------|----------------|
| `inset-y-<number>` | `inset-block: calc(var(--spacing) * <number>);` |
| `-inset-y-<number>` | `inset-block: calc(var(--spacing) * -<number>);` |
| `inset-y-<fraction>` | `inset-block: calc(<fraction> * 100%);` |
| `-inset-y-<fraction>` | `inset-block: calc(<fraction> * -100%);` |
| `inset-y-px` | `inset-block: 1px;` |
| `-inset-y-px` | `inset-block: -1px;` |
| `inset-y-full` | `inset-block: 100%;` |
| `-inset-y-full` | `inset-block: -100%;` |
| `inset-y-auto` | `inset-block: auto;` |
| `inset-y-(<custom-property>)` | `inset-block: var(<custom-property>);` |
| `inset-y-[<value>]` | `inset-block: <value>;` |

### Start/End (propriedades lógicas)

| Classe | Propriedade CSS |
|--------|----------------|
| `start-<number>` | `inset-inline-start: calc(var(--spacing) * <number>);` |
| `-start-<number>` | `inset-inline-start: calc(var(--spacing) * -<number>);` |
| `start-<fraction>` | `inset-inline-start: calc(<fraction> * 100%);` |
| `-start-<fraction>` | `inset-inline-start: calc(<fraction> * -100%);` |
| `start-px` | `inset-inline-start: 1px;` |
| `-start-px` | `inset-inline-start: -1px;` |
| `start-full` | `inset-inline-start: 100%;` |
| `-start-full` | `inset-inline-start: -100%;` |
| `start-auto` | `inset-inline-start: auto;` |
| `start-(<custom-property>)` | `inset-inline-start: var(<custom-property>);` |
| `start-[<value>]` | `inset-inline-start: <value>;` |

| Classe | Propriedade CSS |
|--------|----------------|
| `end-<number>` | `inset-inline-end: calc(var(--spacing) * <number>);` |
| `-end-<number>` | `inset-inline-end: calc(var(--spacing) * -<number>);` |
| `end-<fraction>` | `inset-inline-end: calc(<fraction> * 100%);` |
| `-end-<fraction>` | `inset-inline-end: calc(<fraction> * -100%);` |
| `end-px` | `inset-inline-end: 1px;` |
| `-end-px` | `inset-inline-end: -1px;` |
| `end-full` | `inset-inline-end: 100%;` |
| `-end-full` | `inset-inline-end: -100%;` |
| `end-auto` | `inset-inline-end: auto;` |
| `end-(<custom-property>)` | `inset-inline-end: var(<custom-property>);` |
| `end-[<value>]` | `inset-inline-end: <value>;` |

### Direções Específicas

#### Top

| Classe | Propriedade CSS |
|--------|----------------|
| `top-<number>` | `top: calc(var(--spacing) * <number>);` |
| `-top-<number>` | `top: calc(var(--spacing) * -<number>);` |
| `top-<fraction>` | `top: calc(<fraction> * 100%);` |
| `-top-<fraction>` | `top: calc(<fraction> * -100%);` |
| `top-px` | `top: 1px;` |
| `-top-px` | `top: -1px;` |
| `top-full` | `top: 100%;` |
| `-top-full` | `top: -100%;` |
| `top-auto` | `top: auto;` |
| `top-(<custom-property>)` | `top: var(<custom-property>);` |
| `top-[<value>]` | `top: <value>;` |

#### Right

| Classe | Propriedade CSS |
|--------|----------------|
| `right-<number>` | `right: calc(var(--spacing) * <number>);` |
| `-right-<number>` | `right: calc(var(--spacing) * -<number>);` |
| `right-<fraction>` | `right: calc(<fraction> * 100%);` |
| `-right-<fraction>` | `right: calc(<fraction> * -100%);` |
| `right-px` | `right: 1px;` |
| `-right-px` | `right: -1px;` |
| `right-full` | `right: 100%;` |
| `-right-full` | `right: -100%;` |
| `right-auto` | `right: auto;` |
| `right-(<custom-property>)` | `right: var(<custom-property>);` |
| `right-[<value>]` | `right: <value>;` |

#### Bottom

| Classe | Propriedade CSS |
|--------|----------------|
| `bottom-<number>` | `bottom: calc(var(--spacing) * <number>);` |
| `-bottom-<number>` | `bottom: calc(var(--spacing) * -<number>);` |
| `bottom-<fraction>` | `bottom: calc(<fraction> * 100%);` |
| `-bottom-<fraction>` | `bottom: calc(<fraction> * -100%);` |
| `bottom-px` | `bottom: 1px;` |
| `-bottom-px` | `bottom: -1px;` |
| `bottom-full` | `bottom: 100%;` |
| `-bottom-full` | `bottom: -100%;` |
| `bottom-auto` | `bottom: auto;` |
| `bottom-(<custom-property>)` | `bottom: var(<custom-property>);` |
| `bottom-[<value>]` | `bottom: <value>;` |

#### Left

| Classe | Propriedade CSS |
|--------|----------------|
| `left-<number>` | `left: calc(var(--spacing) * <number>);` |
| `-left-<number>` | `left: calc(var(--spacing) * -<number>);` |
| `left-<fraction>` | `left: calc(<fraction> * 100%);` |
| `-left-<fraction>` | `left: calc(<fraction> * -100%);` |
| `left-px` | `left: 1px;` |
| `-left-px` | `left: -1px;` |
| `left-full` | `left: 100%;` |
| `-left-full` | `left: -100%;` |
| `left-auto` | `left: auto;` |
| `left-(<custom-property>)` | `left: var(<custom-property>);` |
| `left-[<value>]` | `left: <value>;` |

## Exemplos

### Exemplo Básico

Use as classes `top-<number>`, `right-<number>`, `bottom-<number>`, `left-<number>` e `inset-<number>` como `top-0` e `bottom-4` para definir a posição horizontal ou vertical de um elemento posicionado:

```html
<!-- Fixar no canto superior esquerdo -->
<div class="relative size-32 ...">
  <div class="absolute top-0 left-0 size-16 ...">01</div>
</div>

<!-- Estender pela borda superior -->
<div class="relative size-32 ...">
  <div class="absolute inset-x-0 top-0 h-16 ...">02</div>
</div>

<!-- Fixar no canto superior direito -->
<div class="relative size-32 ...">
  <div class="absolute top-0 right-0 size-16 ...">03</div>
</div>

<!-- Estender pela borda esquerda -->
<div class="relative size-32 ...">
  <div class="absolute inset-y-0 left-0 w-16 ...">04</div>
</div>

<!-- Preencher todo o elemento pai -->
<div class="relative size-32 ...">
  <div class="absolute inset-0 ...">05</div>
</div>

<!-- Estender pela borda direita -->
<div class="relative size-32 ...">
  <div class="absolute inset-y-0 right-0 w-16 ...">06</div>
</div>

<!-- Fixar no canto inferior esquerdo -->
<div class="relative size-32 ...">
  <div class="absolute bottom-0 left-0 size-16 ...">07</div>
</div>

<!-- Estender pela borda inferior -->
<div class="relative size-32 ...">
  <div class="absolute inset-x-0 bottom-0 h-16 ...">08</div>
</div>

<!-- Fixar no canto inferior direito -->
<div class="relative size-32 ...">
  <div class="absolute right-0 bottom-0 size-16 ...">09</div>
</div>
```

### Usando Valores Negativos

Para usar um valor negativo de top/right/bottom/left, prefixe o nome da classe com um traço para convertê-lo em um valor negativo:

```html
<div class="relative size-32 ...">
  <div class="absolute -top-4 -left-4 size-14 ..."></div>
</div>
```

### Usando Propriedades Lógicas

Use as classes `start-<number>` ou `end-<number>` como `start-0` e `end-4` para definir as propriedades lógicas `inset-inline-start` e `inset-inline-end`, que mapeiam para o lado esquerdo ou direito com base na direção do texto:

**Esquerda para direita:**
```html
<div dir="ltr">
  <div class="relative size-32 ...">
    <div class="absolute start-0 top-0 size-14 ..."></div>
  </div>
</div>
```

**Direita para esquerda:**
```html
<div dir="rtl">
  <div class="relative size-32 ...">
    <div class="absolute start-0 top-0 size-14 ..."></div>
  </div>
</div>
```

Para mais controle, você também pode usar os modificadores LTR e RTL para aplicar estilos específicos condicionalmente, dependendo da direção atual do texto.

### Usando um Valor Personalizado

Use classes como `inset-[<value>]` e `top-[<value>]` para definir a posição com base em um valor completamente personalizado:

```html
<div class="inset-[3px] ...">
  <!-- ... -->
</div>
```

Para variáveis CSS, você também pode usar a sintaxe `inset-(<custom-property>)`:

```html
<div class="inset-(--my-position) ...">
  <!-- ... -->
</div>
```

Isto é apenas uma abreviação para `inset-[var(<custom-property>)]` que adiciona a função `var()` automaticamente.

### Design Responsivo

Prefixe as classes `inset`, `inset-x`, `inset-y`, `start`, `end`, `top`, `left`, `bottom` e `right` com uma variante de breakpoint como `md:` para aplicar a classe apenas em tamanhos de tela médios e acima:

```html
<div class="top-4 md:top-6 ...">
  <!-- ... -->
</div>
```

Aprenda mais sobre o uso de variantes na documentação de variantes.

## Personalizando seu Tema

As classes `inset-<number>`, `inset-x-<number>`, `inset-y-<number>`, `start-<number>`, `end-<number>`, `top-<number>`, `left-<number>`, `bottom-<number>` e `right-<number>` são controladas pela variável de tema `--spacing`, que pode ser personalizada no seu próprio tema:

```css
@theme {
  --spacing: 1px;
}
```

Aprenda mais sobre personalizar a escala de espaçamento na documentação de variáveis de tema.