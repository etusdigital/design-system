# Max Width

O utilitário `max-width` no Tailwind CSS v4 permite controlar a largura máxima de um elemento.

## Classes Disponíveis

### Escala Numérica
Usa `calc(var(--spacing) * <number>)` para definir a largura máxima:

| Classe | CSS Aplicado |
|--------|--------------|
| `max-w-<number>` | `max-width: calc(var(--spacing) * <number>);` |

### Escala de Frações
Usa percentuais baseados em frações:

| Classe | CSS Aplicado |
|--------|--------------|
| `max-w-<fraction>` | `max-width: calc(<fraction> * 100%);` |

### Tamanhos de Container
Utiliza variáveis CSS predefinidas para containers:

| Classe | CSS Aplicado | Valor |
|--------|--------------|-------|
| `max-w-3xs` | `max-width: var(--container-3xs);` | 16rem (256px) |
| `max-w-2xs` | `max-width: var(--container-2xs);` | 18rem (288px) |
| `max-w-xs` | `max-width: var(--container-xs);` | 20rem (320px) |
| `max-w-sm` | `max-width: var(--container-sm);` | 24rem (384px) |
| `max-w-md` | `max-width: var(--container-md);` | 28rem (448px) |
| `max-w-lg` | `max-width: var(--container-lg);` | 32rem (512px) |
| `max-w-xl` | `max-width: var(--container-xl);` | 36rem (576px) |
| `max-w-2xl` | `max-width: var(--container-2xl);` | 42rem (672px) |
| `max-w-3xl` | `max-width: var(--container-3xl);` | 48rem (768px) |
| `max-w-4xl` | `max-width: var(--container-4xl);` | 56rem (896px) |
| `max-w-5xl` | `max-width: var(--container-5xl);` | 64rem (1024px) |
| `max-w-6xl` | `max-width: var(--container-6xl);` | 72rem (1152px) |
| `max-w-7xl` | `max-width: var(--container-7xl);` | 80rem (1280px) |

### Valores Especiais

| Classe | CSS Aplicado |
|--------|--------------|
| `max-w-none` | `max-width: none;` |
| `max-w-px` | `max-width: 1px;` |
| `max-w-full` | `max-width: 100%;` |
| `max-w-screen` | `max-width: 100vw;` |
| `max-w-min` | `max-width: min-content;` |
| `max-w-max` | `max-width: max-content;` |
| `max-w-fit` | `max-width: fit-content;` |

### Unidades de Viewport

| Classe | CSS Aplicado |
|--------|--------------|
| `max-w-dvw` | `max-width: 100dvw;` |
| `max-w-dvh` | `max-width: 100dvh;` |
| `max-w-lvw` | `max-width: 100lvw;` |
| `max-w-lvh` | `max-width: 100lvh;` |
| `max-w-svw` | `max-width: 100svw;` |
| `max-w-svh` | `max-width: 100svh;` |

### Container Responsivo

| Classe | CSS Aplicado |
|---------|--------------|
| `container` | `width: 100%;`<br/>`@media (width >= 40rem) { max-width: 40rem; }`<br/>`@media (width >= 48rem) { max-width: 48rem; }`<br/>`@media (width >= 64rem) { max-width: 64rem; }`<br/>`@media (width >= 80rem) { max-width: 80rem; }`<br/>`@media (width >= 96rem) { max-width: 96rem; }` |

### Valores Customizados

| Sintaxe | CSS Aplicado |
|---------|--------------|
| `max-w-(<custom-property>)` | `max-width: var(<custom-property>);` |
| `max-w-[<value>]` | `max-width: <value>;` |

## Exemplos

### Exemplo Básico

Use utilitários como `max-w-24` e `max-w-64` para definir uma largura máxima fixa baseada na escala de espaçamento:

**Redimensione o exemplo para ver o comportamento esperado**

```html
<div class="w-full max-w-96 ...">max-w-96</div>
<div class="w-full max-w-80 ...">max-w-80</div>
<div class="w-full max-w-64 ...">max-w-64</div>
<div class="w-full max-w-48 ...">max-w-48</div>
<div class="w-full max-w-40 ...">max-w-40</div>
<div class="w-full max-w-32 ...">max-w-32</div>
<div class="w-full max-w-24 ...">max-w-24</div>
```

### Usando Percentuais

Use `max-w-full` ou utilitários como `max-w-1/2` e `max-w-2/5` para dar ao elemento uma largura máxima baseada em percentual:

**Redimensione o exemplo para ver o comportamento esperado**

```html
<div class="w-full max-w-9/10 ...">max-w-9/10</div>
<div class="w-full max-w-3/4 ...">max-w-3/4</div>
<div class="w-full max-w-1/2 ...">max-w-1/2</div>
<div class="w-full max-w-1/3 ...">max-w-1/3</div>
```

### Usando a Escala de Container

Use utilitários como `max-w-sm` e `max-w-xl` para definir uma largura máxima fixa baseada na escala de container:

**Redimensione o exemplo para ver o comportamento esperado**

```html
<div class="max-w-md ...">
  <!-- ... -->
</div>
```

### Usando Container Responsivo

Use o utilitário `container` para definir a largura máxima de um elemento que corresponda ao `min-width` do breakpoint atual. Isso é útil se você preferir projetar para um conjunto fixo de tamanhos de tela em vez de tentar acomodar um viewport completamente fluido:

```html
<div class="container">
  <!-- ... -->
</div>
```

**Nota:** Diferentemente dos containers que você pode ter usado em outros frameworks, o `container` do Tailwind não se centraliza automaticamente e não possui padding horizontal integrado. Use `mx-auto` e os utilitários `px-<number>` para adicionar estes:

```html
<div class="container mx-auto px-4">
  <!-- ... -->
</div>
```

### Usando Valores Customizados

Use a sintaxe `max-w-[<value>]` para definir a largura máxima baseada em um valor completamente customizado:

```html
<div class="max-w-[220px] ...">
  <!-- ... -->
</div>
```

Para variáveis CSS, você também pode usar a sintaxe `max-w-(<custom-property>)`:

```html
<div class="max-w-(--my-max-width) ...">
  <!-- ... -->
</div>
```

Esta é apenas uma abreviação para `max-w-[var(<custom-property>)]` que adiciona a função `var()` automaticamente.

### Design Responsivo

Prefixe um utilitário max-width com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e acima:

```html
<div class="max-w-sm md:max-w-lg ...">
  <!-- ... -->
</div>
```

Saiba mais sobre o uso de variantes na documentação de variantes.

## Personalizando Seu Tema

Os utilitários `max-w-<number>` são controlados pela variável de tema `--spacing`, que pode ser personalizada em seu próprio tema:

```css
@theme {
  --spacing: 1px;
}
```

Saiba mais sobre personalizar a escala de espaçamento na documentação de variáveis de tema.

