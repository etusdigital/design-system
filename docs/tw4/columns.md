# Columns

## Classes de Utilidade

### Por Número
| Classe | CSS | Descrição |
|--------|-----|-----------|
| `columns-<number>` | `columns: <number>;` | Define o número de colunas |

### Por Tamanho de Container
| Classe | CSS | Descrição |
|--------|-----|-----------|
| `columns-3xs` | `columns: var(--container-3xs);` | 16rem (256px) |
| `columns-2xs` | `columns: var(--container-2xs);` | 18rem (288px) |
| `columns-xs` | `columns: var(--container-xs);` | 20rem (320px) |
| `columns-sm` | `columns: var(--container-sm);` | 24rem (384px) |
| `columns-md` | `columns: var(--container-md);` | 28rem (448px) |
| `columns-lg` | `columns: var(--container-lg);` | 32rem (512px) |
| `columns-xl` | `columns: var(--container-xl);` | 36rem (576px) |
| `columns-2xl` | `columns: var(--container-2xl);` | 42rem (672px) |
| `columns-3xl` | `columns: var(--container-3xl);` | 48rem (768px) |
| `columns-4xl` | `columns: var(--container-4xl);` | 56rem (896px) |
| `columns-5xl` | `columns: var(--container-5xl);` | 64rem (1024px) |
| `columns-6xl` | `columns: var(--container-6xl);` | 72rem (1152px) |
| `columns-7xl` | `columns: var(--container-7xl);` | 80rem (1280px) |

### Valores Especiais
| Classe | CSS | Descrição |
|--------|-----|-----------|
| `columns-auto` | `columns: auto;` | Automático |
| `columns-(<custom-property>)` | `columns: var(<custom-property>);` | Propriedade CSS customizada |
| `columns-[<value>]` | `columns: <value>;` | Valor arbitrário |

## Exemplos

### Definindo por Número

Use as utilidades `columns-<number>` como `columns-3` para definir o número de colunas que devem ser criadas para o conteúdo dentro de um elemento:

```html
<div class="columns-3 ...">
  <img class="aspect-3/2 ..." src="/img/mountains-1.jpg" />
  <img class="aspect-square ..." src="/img/mountains-2.jpg" />
  <img class="aspect-square ..." src="/img/mountains-3.jpg" />
  <!-- ... -->
</div>
```

A largura da coluna será automaticamente ajustada para acomodar o número especificado de colunas.

### Definindo por Largura

Use utilidades como `columns-xs` e `columns-sm` para definir a largura ideal da coluna para o conteúdo dentro de um elemento:

> **Redimensione o exemplo para ver o comportamento esperado**

```html
<div class="columns-3xs ...">
  <img class="aspect-3/2 ..." src="/img/mountains-1.jpg" />
  <img class="aspect-square ..." src="/img/mountains-2.jpg" />
  <img class="aspect-square ..." src="/img/mountains-3.jpg" />
  <!-- ... -->
</div>
```

Ao definir a largura da coluna, o número de colunas se ajusta automaticamente para garantir que não fiquem muito estreitas.

### Definindo o Espaçamento entre Colunas

Use as utilidades `gap-<width>` para especificar a largura entre as colunas:

```html
<div class="columns-3 gap-8 ...">
  <img class="aspect-3/2 ..." src="/img/mountains-1.jpg" />
  <img class="aspect-square ..." src="/img/mountains-2.jpg" />
  <img class="aspect-square ..." src="/img/mountains-3.jpg" />
  <!-- ... -->
</div>
```

Saiba mais sobre as utilidades de gap na documentação de gap.

### Usando um Valor Customizado

Use a sintaxe `columns-[<value>]` para definir as colunas baseadas em um valor completamente customizado:

```html
<div class="columns-[30vw] ...">
  <!-- ... -->
</div>
```

Para variáveis CSS, você também pode usar a sintaxe `columns-(<custom-property>)`:

```html
<div class="columns-(--my-columns) ...">
  <!-- ... -->
</div>
```

Isso é apenas uma forma abreviada para `columns-[var(<custom-property>)]` que adiciona a função `var()` automaticamente.

### Design Responsivo

Prefixe uma utilidade de columns com uma variante de breakpoint como `sm:` para aplicar a utilidade apenas em tamanhos de tela pequenos e acima:

> **Redimensione o exemplo para ver o comportamento esperado**

```html
<div class="columns-2 gap-4 sm:columns-3 sm:gap-8 ...">
  <img class="aspect-3/2 ..." src="/img/mountains-1.jpg" />
  <img class="aspect-square ..." src="/img/mountains-2.jpg" />
  <img class="aspect-square ..." src="/img/mountains-3.jpg" />
  <!-- ... -->
</div>
```

Saiba mais sobre o uso de variantes na documentação de variantes.

## Personalizando seu Tema

Use as variáveis de tema `--container-*` para personalizar as utilidades de coluna de largura fixa em seu projeto:

```css
@theme {
  --container-4xs: 14rem;
}
```

Agora a utilidade `columns-4xs` pode ser usada em sua marcação:

```html
<div class="columns-4xs">
  <!-- ... -->
</div>
```

Saiba mais sobre personalização de tema na documentação de tema.

