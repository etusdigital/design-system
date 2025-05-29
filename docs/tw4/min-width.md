# min-width

A propriedade `min-width` no Tailwind CSS v4 permite definir a largura mínima de elementos usando classes utilitárias.

## Classes Disponíveis

### Baseadas em Espaçamento
| Classe | CSS Gerado |
|--------|------------|
| `min-w-<number>` | `min-width: calc(var(--spacing) * <number>);` |

### Baseadas em Frações
| Classe | CSS Gerado |
|--------|------------|
| `min-w-<fraction>` | `min-width: calc(<fraction> * 100%);` |

### Escala de Container
| Classe | CSS Gerado | Valor |
|--------|------------|-------|
| `min-w-3xs` | `min-width: var(--container-3xs);` | 16rem (256px) |
| `min-w-2xs` | `min-width: var(--container-2xs);` | 18rem (288px) |
| `min-w-xs` | `min-width: var(--container-xs);` | 20rem (320px) |
| `min-w-sm` | `min-width: var(--container-sm);` | 24rem (384px) |
| `min-w-md` | `min-width: var(--container-md);` | 28rem (448px) |
| `min-w-lg` | `min-width: var(--container-lg);` | 32rem (512px) |
| `min-w-xl` | `min-width: var(--container-xl);` | 36rem (576px) |
| `min-w-2xl` | `min-width: var(--container-2xl);` | 42rem (672px) |
| `min-w-3xl` | `min-width: var(--container-3xl);` | 48rem (768px) |
| `min-w-4xl` | `min-width: var(--container-4xl);` | 56rem (896px) |
| `min-w-5xl` | `min-width: var(--container-5xl);` | 64rem (1024px) |
| `min-w-6xl` | `min-width: var(--container-6xl);` | 72rem (1152px) |
| `min-w-7xl` | `min-width: var(--container-7xl);` | 80rem (1280px) |

### Valores Especiais
| Classe | CSS Gerado |
|--------|------------|
| `min-w-auto` | `min-width: auto;` |
| `min-w-px` | `min-width: 1px;` |
| `min-w-full` | `min-width: 100%;` |
| `min-w-screen` | `min-width: 100vw;` |
| `min-w-dvw` | `min-width: 100dvw;` |
| `min-w-dvh` | `min-width: 100dvh;` |
| `min-w-lvw` | `min-width: 100lvw;` |
| `min-w-lvh` | `min-width: 100lvh;` |
| `min-w-svw` | `min-width: 100svw;` |
| `min-w-svh` | `min-width: 100svh;` |
| `min-w-min` | `min-width: min-content;` |
| `min-w-max` | `min-width: max-content;` |
| `min-w-fit` | `min-width: fit-content;` |

### Valores Customizados
| Classe | CSS Gerado |
|--------|------------|
| `min-w-(<custom-property>)` | `min-width: var(<custom-property>);` |
| `min-w-[<value>]` | `min-width: <value>;` |

## Exemplos

### Exemplo básico

Use utilitários `min-w-<number>` como `min-w-24` e `min-w-64` para definir uma largura mínima fixa baseada na escala de espaçamento:

```html
<div class="w-20">
  <div class="min-w-80">min-w-80</div>
  <div class="min-w-64">min-w-64</div>
  <div class="min-w-48">min-w-48</div>
  <div class="min-w-40">min-w-40</div>
  <div class="min-w-32">min-w-32</div>
  <div class="min-w-24">min-w-24</div>
</div>
```

### Usando porcentagem

Use utilitários `min-w-full` ou `min-w-<fraction>` como `min-w-1/2` e `min-w-2/5` para dar a um elemento uma largura mínima baseada em porcentagem:

```html
<div class="flex">
  <div class="min-w-3/4">min-w-3/4</div>
  <div class="w-full">w-full</div>
</div>
```

### Usando a escala de container

Use utilitários como `min-w-sm` e `min-w-xl` para definir uma largura mínima fixa baseada na escala de container:

```html
<div class="w-40">
  <div class="min-w-lg">min-w-lg</div>
  <div class="min-w-md">min-w-md</div>
  <div class="min-w-sm">min-w-sm</div>
  <div class="min-w-xs">min-w-xs</div>
  <div class="min-w-2xs">min-w-2xs</div>
  <div class="min-w-3xs">min-w-3xs</div>
</div>
```

### Usando um valor customizado

Use a sintaxe `min-w-[<value>]` para definir a largura mínima baseada em um valor completamente customizado:

```html
<div class="min-w-[220px]">
  <!-- ... -->
</div>
```

Para variáveis CSS, você também pode usar a sintaxe `min-w-(<custom-property>)`:

```html
<div class="min-w-(--my-min-width)">
  <!-- ... -->
</div>
```

Isso é apenas uma abreviação para `min-w-[var(<custom-property>)]` que adiciona a função `var()` automaticamente.

### Design responsivo

Prefixe um utilitário min-width com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e acima:

```html
<div class="w-24 min-w-full md:min-w-0">
  <!-- ... -->
</div>
```

Saiba mais sobre o uso de variantes na documentação de variantes.

## Customizando seu tema

Os utilitários `min-w-<number>` são controlados pela variável de tema `--spacing`, que pode ser customizada em seu próprio tema:

```css
@theme {
  --spacing: 1px;
}
```

Saiba mais sobre a customização da escala de espaçamento na documentação de variáveis de tema.
```

</rewritten_file>

