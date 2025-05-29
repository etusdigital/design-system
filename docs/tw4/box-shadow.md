# Box Shadow

Este documento apresenta todas as classes utilitárias do Tailwind CSS v4 para controlar sombras de caixa (box-shadow).

## Classes de Sombra Externa

### Sombras Padrão

| Classe | Propriedade CSS | Descrição |
|--------|----------------|-----------|
| `shadow-2xs` | `box-shadow: var(--shadow-2xs);` | Sombra extra pequena: `0 1px rgb(0 0 0 / 0.05)` |
| `shadow-xs` | `box-shadow: var(--shadow-xs);` | Sombra pequena: `0 1px 2px 0 rgb(0 0 0 / 0.05)` |
| `shadow-sm` | `box-shadow: var(--shadow-sm);` | Sombra pequena-média: `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)` |
| `shadow-md` | `box-shadow: var(--shadow-md);` | Sombra média: `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` |
| `shadow-lg` | `box-shadow: var(--shadow-lg);` | Sombra grande: `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` |
| `shadow-xl` | `box-shadow: var(--shadow-xl);` | Sombra extra grande: `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` |
| `shadow-2xl` | `box-shadow: var(--shadow-2xl);` | Sombra dupla extra grande: `0 25px 50px -12px rgb(0 0 0 / 0.25)` |
| `shadow-none` | `box-shadow: 0 0 #0000;` | Remove sombra |

### Classes Personalizadas

| Classe | Propriedade CSS |
|--------|----------------|
| `shadow-(<custom-property>)` | `box-shadow: var(<custom-property>);` |
| `shadow-[<value>]` | `box-shadow: <value>;` |

### Cores de Sombra

#### Cores Especiais
| Classe | Propriedade CSS |
|--------|----------------|
| `shadow-inherit` | `--tw-shadow-color: inherit;` |
| `shadow-current` | `--tw-shadow-color: currentColor;` |
| `shadow-transparent` | `--tw-shadow-color: transparent;` |
| `shadow-black` | `--tw-shadow-color: var(--color-black);` |
| `shadow-white` | `--tw-shadow-color: var(--color-white);` |

#### Paleta de Cores Completa

**Red**
- `shadow-red-50` até `shadow-red-950`

**Orange**
- `shadow-orange-50` até `shadow-orange-950`

**Amber**
- `shadow-amber-50` até `shadow-amber-950`

**Yellow**
- `shadow-yellow-50` até `shadow-yellow-950`

**Lime**
- `shadow-lime-50` até `shadow-lime-950`

**Green**
- `shadow-green-50` até `shadow-green-950`

**Emerald**
- `shadow-emerald-50` até `shadow-emerald-950`

**Teal**
- `shadow-teal-50` até `shadow-teal-950`

**Cyan**
- `shadow-cyan-50` até `shadow-cyan-950`

**Sky**
- `shadow-sky-50` até `shadow-sky-950`

**Blue**
- `shadow-blue-50` até `shadow-blue-950`

**Indigo**
- `shadow-indigo-50` até `shadow-indigo-950`

**Violet**
- `shadow-violet-50` até `shadow-violet-950`

**Purple**
- `shadow-purple-50` até `shadow-purple-950`

**Fuchsia**
- `shadow-fuchsia-50` até `shadow-fuchsia-950`

**Pink**
- `shadow-pink-50` até `shadow-pink-950`

**Rose**
- `shadow-rose-50` até `shadow-rose-950`

**Slate**
- `shadow-slate-50` até `shadow-slate-950`

**Gray**
- `shadow-gray-50` até `shadow-gray-950`

**Zinc**
- `shadow-zinc-50` até `shadow-zinc-950`

**Neutral**
- `shadow-neutral-50` até `shadow-neutral-950`

**Stone**
- `shadow-stone-50` até `shadow-stone-950`

## Classes de Sombra Interna (Inset)

### Sombras Internas Padrão

| Classe | Propriedade CSS | Descrição |
|--------|----------------|-----------|
| `inset-shadow-2xs` | `box-shadow: var(--inset-shadow-2xs);` | Sombra interna extra pequena: `inset 0 1px rgb(0 0 0 / 0.05)` |
| `inset-shadow-xs` | `box-shadow: var(--inset-shadow-xs);` | Sombra interna pequena: `inset 0 1px 1px rgb(0 0 0 / 0.05)` |
| `inset-shadow-sm` | `box-shadow: var(--inset-shadow-sm);` | Sombra interna pequena-média: `inset 0 2px 4px rgb(0 0 0 / 0.05)` |
| `inset-shadow-none` | `box-shadow: inset 0 0 #0000;` | Remove sombra interna |

### Classes Personalizadas para Sombra Interna

| Classe | Propriedade CSS |
|--------|----------------|
| `inset-shadow-(<custom-property>)` | `box-shadow: var(<custom-property>);` |
| `inset-shadow-[<value>]` | `box-shadow: <value>;` |

### Cores de Sombra Interna

Todas as cores disponíveis para sombras normais também estão disponíveis para sombras internas com o prefixo `inset-shadow-`:

- `inset-shadow-inherit`, `inset-shadow-current`, `inset-shadow-transparent`
- `inset-shadow-black`, `inset-shadow-white`
- Todas as paletas de cores (red, orange, amber, etc.) de 50 a 950

## Classes de Anel (Ring)

### Anéis Padrão

| Classe | Propriedade CSS | Descrição |
|--------|----------------|-----------|
| `ring` | `--tw-ring-shadow: 0 0 0 1px;` | Anel de 1px |
| `ring-<number>` | `--tw-ring-shadow: 0 0 0 <number>px;` | Anel com espessura personalizada |
| `ring-(<custom-property>)` | `--tw-ring-shadow: 0 0 0 var(<custom-property>);` | Anel com propriedade customizada |
| `ring-[<value>]` | `--tw-ring-shadow: 0 0 0 <value>;` | Anel com valor personalizado |

### Cores de Anel

Todas as cores de sombra estão disponíveis para anéis com o prefixo `ring-`:

- `ring-inherit`, `ring-current`, `ring-transparent`
- `ring-black`, `ring-white`
- Todas as paletas de cores (red, orange, amber, etc.) de 50 a 950

## Classes de Anel Interno (Inset Ring)

### Anéis Internos Padrão

| Classe | Propriedade CSS | Descrição |
|--------|----------------|-----------|
| `inset-ring` | `--tw-inset-ring-shadow: inset 0 0 0 1px` | Anel interno de 1px |
| `inset-ring-<number>` | `--tw-inset-ring-shadow: inset 0 0 0 <number>px` | Anel interno com espessura personalizada |
| `inset-ring-(<custom-property>)` | `--tw-inset-ring-shadow: inset 0 0 0 var(<custom-property>);` | Anel interno com propriedade customizada |
| `inset-ring-[<value>]` | `--tw-inset-ring-shadow: inset 0 0 0 <value>;` | Anel interno com valor personalizado |

### Cores de Anel Interno

Todas as cores de sombra estão disponíveis para anéis internos com o prefixo `inset-ring-`:

- `inset-ring-inherit`, `inset-ring-current`, `inset-ring-transparent`
- `inset-ring-black`, `inset-ring-white`
- Todas as paletas de cores (red, orange, amber, etc.) de 50 a 950

## Exemplos de Uso

### Exemplo Básico

Use utilitários como `shadow-sm` e `shadow-lg` para aplicar diferentes tamanhos de sombras externas:

```html
<div class="shadow-md">shadow-md</div>
<div class="shadow-lg">shadow-lg</div>
<div class="shadow-xl">shadow-xl</div>
```

### Alterando a Opacidade

Use o modificador de opacidade para ajustar a transparência da sombra:

```html
<div class="shadow-xl">shadow-xl</div>
<div class="shadow-xl/20">shadow-xl/20</div>
<div class="shadow-xl/30">shadow-xl/30</div>
```

As opacidades padrão das sombras são baixas (25% ou menos), então aumentar a opacidade (para cerca de 50%) tornará as sombras mais pronunciadas.

### Definindo a Cor da Sombra

Use utilitários como `shadow-indigo-500` e `shadow-cyan-500/50` para alterar a cor da sombra:

```html
<button class="bg-cyan-500 shadow-lg shadow-cyan-500/50">Subscribe</button>
<button class="bg-blue-500 shadow-lg shadow-blue-500/50">Subscribe</button>
<button class="bg-indigo-500 shadow-lg shadow-indigo-500/50">Subscribe</button>
```

Por padrão, as sombras coloridas têm opacidade de 100%, mas você pode ajustar usando o modificador de opacidade.

### Adicionando Sombra Interna

Use utilitários como `inset-shadow-xs` e `inset-shadow-sm` para aplicar sombra interna:

```html
<div class="inset-shadow-2xs">inset-shadow-2xs</div>
<div class="inset-shadow-xs">inset-shadow-xs</div>
<div class="inset-shadow-sm">inset-shadow-sm</div>
```

Você pode ajustar a opacidade de uma sombra interna usando o modificador de opacidade, como `inset-shadow-sm/50`.

### Definindo a Cor da Sombra Interna

Use utilitários como `inset-shadow-indigo-500` e `inset-shadow-cyan-500/50`:

```html
<div class="inset-shadow-sm inset-shadow-indigo-500">inset-shadow-indigo-500</div>
<div class="inset-shadow-sm inset-shadow-indigo-500/50">inset-shadow-indigo-500/50</div>
```

### Adicionando um Anel

Use utilitários `ring` ou `ring-<number>` como `ring-2` e `ring-4`:

```html
<button class="ring">ring</button>
<button class="ring-2">ring-2</button>
<button class="ring-4">ring-4</button>
```

Por padrão, os anéis combinam com o `currentColor` do elemento.

### Definindo a Cor do Anel

Use utilitários como `ring-indigo-500` e `ring-cyan-500/50`:

```html
<button class="ring-2 ring-blue-500">ring-blue-500</button>
<button class="ring-2 ring-blue-500/50">ring-blue-500/50</button>
```

### Adicionando um Anel Interno

Use utilitários `inset-ring` ou `inset-ring-<number>`:

```html
<button class="inset-ring">inset-ring</button>
<button class="inset-ring-2">inset-ring-2</button>
<button class="inset-ring-4">inset-ring-4</button>
```

### Definindo a Cor do Anel Interno

Use utilitários como `inset-ring-indigo-500` e `inset-ring-cyan-500/50`:

```html
<button class="inset-ring-2 inset-ring-blue-500">inset-ring-blue-500</button>
<button class="inset-ring-2 inset-ring-blue-500/50">inset-ring-blue-500/50</button>
```

### Removendo Sombras

Use os utilitários `shadow-none`, `inset-shadow-none`, `ring-0` e `inset-ring-0`:

```html
<div class="shadow-none">shadow-none</div>
```

### Usando Valores Personalizados

Use utilitários como `shadow-[<value>]`, `inset-shadow-[<value>]`, `ring-[<value>]` e `inset-ring-[<value>]`:

```html
<div class="shadow-[0_35px_35px_rgba(0,0,0,0.25)]">
  <!-- Sombra personalizada -->
</div>
```

Para variáveis CSS, você também pode usar a sintaxe `shadow-(<custom-property>)`:

```html
<div class="shadow-(--my-shadow)">
  <!-- Usando variável CSS -->
</div>
```

### Design Responsivo

Use prefixos de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e maiores:

```html
<div class="shadow-none md:shadow-lg">
  <!-- Sem sombra em mobile, com sombra em desktop -->
</div>
```

## Personalizando seu Tema

### Personalizando Sombras

Use as variáveis de tema `--shadow-*` para personalizar os utilitários de sombra:

```css
@theme {
  --shadow-3xl: 0 35px 35px rgba(0, 0, 0, 0.25);
}
```

Agora o utilitário `shadow-3xl` pode ser usado no seu markup:

```html
<div class="shadow-3xl">
  <!-- Sombra personalizada -->
</div>
```

### Personalizando Sombras Internas

Use as variáveis de tema `--inset-shadow-*`:

```css
@theme {
  --inset-shadow-md: inset 0 2px 3px rgba(0, 0, 0, 0.25);
}
```

Agora o utilitário `inset-shadow-md` pode ser usado:

```html
<div class="inset-shadow-md">
  <!-- Sombra interna personalizada -->
</div>
```

### Personalizando Cores de Sombra

Use as variáveis de tema `--color-*` para personalizar as cores:

```css
@theme {
  --color-regal-blue: #243c5a;
}
```

Agora utilitários como `shadow-regal-blue`, `inset-shadow-regal-blue`, `ring-regal-blue` e `inset-ring-regal-blue` podem ser usados:

```html
<div class="shadow-regal-blue">
  <!-- Sombra com cor personalizada -->
</div>
```

---

Para mais informações sobre personalização do tema, consulte a documentação de temas do Tailwind CSS v4.