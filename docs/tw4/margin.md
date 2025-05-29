# Margin

Utilitários para controlar a margem de um elemento.

## Classes Base

### Margin em todos os lados
| Classe | CSS | Descrição |
|--------|-----|-----------|
| `m-<number>` | `margin: calc(var(--spacing) * <number>);` | Margem positiva |
| `-m-<number>` | `margin: calc(var(--spacing) * -<number>);` | Margem negativa |
| `m-auto` | `margin: auto;` | Margem automática |
| `m-px` | `margin: 1px;` | Margem de 1px |
| `-m-px` | `margin: -1px;` | Margem negativa de 1px |
| `m-(<custom-property>)` | `margin: var(<custom-property>);` | Margem com propriedade customizada |
| `m-[<value>]` | `margin: <value>;` | Margem com valor arbitrário |

### Margin horizontal (esquerda + direita)
| Classe | CSS | Descrição |
|--------|-----|-----------|
| `mx-<number>` | `margin-inline: calc(var(--spacing) * <number>);` | Margem horizontal positiva |
| `-mx-<number>` | `margin-inline: calc(var(--spacing) * -<number>);` | Margem horizontal negativa |
| `mx-auto` | `margin-inline: auto;` | Margem horizontal automática |
| `mx-px` | `margin-inline: 1px;` | Margem horizontal de 1px |
| `-mx-px` | `margin-inline: -1px;` | Margem horizontal negativa de 1px |
| `mx-(<custom-property>)` | `margin-inline: var(<custom-property>);` | Margem horizontal customizada |
| `mx-[<value>]` | `margin-inline: <value>;` | Margem horizontal arbitrária |

### Margin vertical (topo + fundo)
| Classe | CSS | Descrição |
|--------|-----|-----------|
| `my-<number>` | `margin-block: calc(var(--spacing) * <number>);` | Margem vertical positiva |
| `-my-<number>` | `margin-block: calc(var(--spacing) * -<number>);` | Margem vertical negativa |
| `my-auto` | `margin-block: auto;` | Margem vertical automática |
| `my-px` | `margin-block: 1px;` | Margem vertical de 1px |
| `-my-px` | `margin-block: -1px;` | Margem vertical negativa de 1px |
| `my-(<custom-property>)` | `margin-block: var(<custom-property>);` | Margem vertical customizada |
| `my-[<value>]` | `margin-block: <value>;` | Margem vertical arbitrária |

## Propriedades Lógicas

### Margin Start (início inline)
| Classe | CSS | Descrição |
|--------|-----|-----------|
| `ms-<number>` | `margin-inline-start: calc(var(--spacing) * <number>);` | Margem início positiva |
| `-ms-<number>` | `margin-inline-start: calc(var(--spacing) * -<number>);` | Margem início negativa |
| `ms-auto` | `margin-inline-start: auto;` | Margem início automática |
| `ms-px` | `margin-inline-start: 1px;` | Margem início de 1px |
| `-ms-px` | `margin-inline-start: -1px;` | Margem início negativa de 1px |
| `ms-(<custom-property>)` | `margin-inline-start: var(<custom-property>);` | Margem início customizada |
| `ms-[<value>]` | `margin-inline-start: <value>;` | Margem início arbitrária |

### Margin End (fim inline)
| Classe | CSS | Descrição |
|--------|-----|-----------|
| `me-<number>` | `margin-inline-end: calc(var(--spacing) * <number>);` | Margem fim positiva |
| `-me-<number>` | `margin-inline-end: calc(var(--spacing) * -<number>);` | Margem fim negativa |
| `me-auto` | `margin-inline-end: auto;` | Margem fim automática |
| `me-px` | `margin-inline-end: 1px;` | Margem fim de 1px |
| `-me-px` | `margin-inline-end: -1px;` | Margem fim negativa de 1px |
| `me-(<custom-property>)` | `margin-inline-end: var(<custom-property>);` | Margem fim customizada |
| `me-[<value>]` | `margin-inline-end: <value>;` | Margem fim arbitrária |

## Direções Específicas

### Margin Top
| Classe | CSS | Descrição |
|--------|-----|-----------|
| `mt-<number>` | `margin-top: calc(var(--spacing) * <number>);` | Margem superior positiva |
| `-mt-<number>` | `margin-top: calc(var(--spacing) * -<number>);` | Margem superior negativa |
| `mt-auto` | `margin-top: auto;` | Margem superior automática |
| `mt-px` | `margin-top: 1px;` | Margem superior de 1px |
| `-mt-px` | `margin-top: -1px;` | Margem superior negativa de 1px |
| `mt-(<custom-property>)` | `margin-top: var(<custom-property>);` | Margem superior customizada |
| `mt-[<value>]` | `margin-top: <value>;` | Margem superior arbitrária |

### Margin Right
| Classe | CSS | Descrição |
|--------|-----|-----------|
| `mr-<number>` | `margin-right: calc(var(--spacing) * <number>);` | Margem direita positiva |
| `-mr-<number>` | `margin-right: calc(var(--spacing) * -<number>);` | Margem direita negativa |
| `mr-auto` | `margin-right: auto;` | Margem direita automática |
| `mr-px` | `margin-right: 1px;` | Margem direita de 1px |
| `-mr-px` | `margin-right: -1px;` | Margem direita negativa de 1px |
| `mr-(<custom-property>)` | `margin-right: var(<custom-property>);` | Margem direita customizada |
| `mr-[<value>]` | `margin-right: <value>;` | Margem direita arbitrária |

### Margin Bottom
| Classe | CSS | Descrição |
|--------|-----|-----------|
| `mb-<number>` | `margin-bottom: calc(var(--spacing) * <number>);` | Margem inferior positiva |
| `-mb-<number>` | `margin-bottom: calc(var(--spacing) * -<number>);` | Margem inferior negativa |
| `mb-auto` | `margin-bottom: auto;` | Margem inferior automática |
| `mb-px` | `margin-bottom: 1px;` | Margem inferior de 1px |
| `-mb-px` | `margin-bottom: -1px;` | Margem inferior negativa de 1px |
| `mb-(<custom-property>)` | `margin-bottom: var(<custom-property>);` | Margem inferior customizada |
| `mb-[<value>]` | `margin-bottom: <value>;` | Margem inferior arbitrária |

### Margin Left
| Classe | CSS | Descrição |
|--------|-----|-----------|
| `ml-<number>` | `margin-left: calc(var(--spacing) * <number>);` | Margem esquerda positiva |
| `-ml-<number>` | `margin-left: calc(var(--spacing) * -<number>);` | Margem esquerda negativa |
| `ml-auto` | `margin-left: auto;` | Margem esquerda automática |
| `ml-px` | `margin-left: 1px;` | Margem esquerda de 1px |
| `-ml-px` | `margin-left: -1px;` | Margem esquerda negativa de 1px |
| `ml-(<custom-property>)` | `margin-left: var(<custom-property>);` | Margem esquerda customizada |
| `ml-[<value>]` | `margin-left: <value>;` | Margem esquerda arbitrária |

## Espaçamento Entre Elementos

### Space X (espaçamento horizontal)
| Classe | CSS | Descrição |
|--------|-----|-----------|
| `space-x-<number>` | Aplica margem horizontal entre elementos filhos | Espaçamento horizontal positivo |
| `-space-x-<number>` | Aplica margem horizontal negativa entre elementos filhos | Espaçamento horizontal negativo |
| `space-x-px` | Aplica margem horizontal de 1px entre elementos filhos | Espaçamento horizontal de 1px |
| `-space-x-px` | Aplica margem horizontal negativa de 1px entre elementos filhos | Espaçamento horizontal negativo de 1px |
| `space-x-(<custom-property>)` | Aplica margem horizontal customizada entre elementos filhos | Espaçamento horizontal customizado |
| `space-x-[<value>]` | Aplica margem horizontal arbitrária entre elementos filhos | Espaçamento horizontal arbitrário |
| `space-x-reverse` | Inverte a direção do espaçamento horizontal | Para layouts flex-row-reverse |

### Space Y (espaçamento vertical)
| Classe | CSS | Descrição |
|--------|-----|-----------|
| `space-y-<number>` | Aplica margem vertical entre elementos filhos | Espaçamento vertical positivo |
| `-space-y-<number>` | Aplica margem vertical negativa entre elementos filhos | Espaçamento vertical negativo |
| `space-y-px` | Aplica margem vertical de 1px entre elementos filhos | Espaçamento vertical de 1px |
| `-space-y-px` | Aplica margem vertical negativa de 1px entre elementos filhos | Espaçamento vertical negativo de 1px |
| `space-y-(<custom-property>)` | Aplica margem vertical customizada entre elementos filhos | Espaçamento vertical customizado |
| `space-y-[<value>]` | Aplica margem vertical arbitrária entre elementos filhos | Espaçamento vertical arbitrário |
| `space-y-reverse` | Inverte a direção do espaçamento vertical | Para layouts flex-col-reverse |

## Exemplos

### Exemplo básico

Use utilitários `m-<number>` como `m-4` e `m-8` para controlar a margem em todos os lados de um elemento:

```html
<div class="m-8 ...">m-8</div>
```

### Adicionando margem a um lado específico

Use utilitários `mt-<number>`, `mr-<number>`, `mb-<number>`, e `ml-<number>` como `ml-2` e `mt-6` para controlar a margem em um lado específico:

```html
<div class="mt-6 ...">mt-6</div>
<div class="mr-4 ...">mr-4</div>
<div class="mb-8 ...">mb-8</div>
<div class="ml-2 ...">ml-2</div>
```

### Margem horizontal

Use utilitários `mx-<number>` como `mx-4` e `mx-8` para controlar a margem horizontal:

```html
<div class="mx-8 ...">mx-8</div>
```

### Margem vertical

Use utilitários `my-<number>` como `my-4` e `my-8` para controlar a margem vertical:

```html
<div class="my-8 ...">my-8</div>
```

### Usando valores negativos

Para usar valores negativos de margem, prefixe o nome da classe com um traço:

```html
<div class="h-16 w-36 bg-sky-400 opacity-20 ..."></div>
<div class="-mt-8 bg-sky-300 ...">-mt-8</div>
```

### Usando propriedades lógicas

Use utilitários `ms-<number>` ou `me-<number>` como `ms-4` e `me-8` para definir as propriedades lógicas `margin-inline-start` e `margin-inline-end`:

**Esquerda para direita:**
```html
<div dir="ltr">
  <div class="ms-8 ...">ms-8</div>
  <div class="me-8 ...">me-8</div>
</div>
```

**Direita para esquerda:**
```html
<div dir="rtl">
  <div class="ms-8 ...">ms-8</div>
  <div class="me-8 ...">me-8</div>
</div>
```

### Espaçamento entre elementos filhos

Use utilitários `space-x-<number>` ou `space-y-<number>` como `space-x-4` e `space-y-8` para controlar o espaço entre elementos:

```html
<div class="flex space-x-4 ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

#### Revertendo a ordem dos elementos filhos

Se seus elementos estão em ordem reversa (usando `flex-row-reverse` ou `flex-col-reverse`), use os utilitários `space-x-reverse` ou `space-y-reverse`:

```html
<div class="flex flex-row-reverse space-x-4 space-x-reverse ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

#### Limitações

Os utilitários de space são apenas um atalho para adicionar margem a todos os itens exceto o último em um grupo, e não são projetados para casos complexos como grids, layouts que quebram linha, ou situações onde os filhos são renderizados em uma ordem personalizada complexa.

Para essas situações, é melhor usar os utilitários de gap quando possível, ou adicionar margem a cada elemento com uma margem negativa correspondente no pai.

Além disso, os utilitários de space não são projetados para funcionar junto com os utilitários divide. Para essas situações, considere adicionar utilitários de margin/padding aos filhos.

### Usando valores customizados

Use utilitários como `m-[<value>]`, `mx-[<value>]`, e `mb-[<value>]` para definir a margem baseada em um valor completamente customizado:

```html
<div class="m-[5px] ...">
  <!-- ... -->
</div>
```

Para variáveis CSS, você também pode usar a sintaxe `m-(<custom-property>)`:

```html
<div class="m-(--my-margin) ...">
  <!-- ... -->
</div>
```

Isso é apenas um atalho para `m-[var(<custom-property>)]` que adiciona a função `var()` automaticamente.

### Design responsivo

Prefixe um utilitário de margem com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e maiores:

```html
<div class="mt-4 md:mt-8 ...">
  <!-- ... -->
</div>
```

## Personalizando seu tema

Os utilitários `m-<number>`, `mx-<number>`, `my-<number>`, `ms-<number>`, `me-<number>`, `mt-<number>`, `mr-<number>`, `mb-<number>`, e `ml-<number>` são baseados na variável de tema `--spacing`, que pode ser personalizada:

```css
@theme {
  --spacing: 1px;
}
```

Saiba mais sobre personalização da escala de espaçamento na documentação de variáveis de tema.

