# Box Shadow - Tailwind CSS v4

Utilitários para controlar a sombra (box-shadow) de um elemento.

## Classes de Tamanho de Sombra

| Classe | Propriedade CSS | Descrição |
|--------|----------------|-----------|
| `shadow-2xs` | `box-shadow: var(--shadow-2xs);` | `0 1px rgb(0 0 0 / 0.05)` |
| `shadow-xs` | `box-shadow: var(--shadow-xs);` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` |
| `shadow-sm` | `box-shadow: var(--shadow-sm);` | `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)` |
| `shadow-md` | `box-shadow: var(--shadow-md);` | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` |
| `shadow-lg` | `box-shadow: var(--shadow-lg);` | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` |
| `shadow-xl` | `box-shadow: var(--shadow-xl);` | `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` |
| `shadow-2xl` | `box-shadow: var(--shadow-2xl);` | `0 25px 50px -12px rgb(0 0 0 / 0.25)` |
| `shadow-none` | `box-shadow: 0 0 #0000;` | Remove sombra |

## Classes Personalizadas

| Classe | Propriedade CSS | Descrição |
|--------|----------------|-----------|
| `shadow-(<custom-property>)` | `box-shadow: var(<custom-property>);` | Usando propriedade CSS personalizada |
| `shadow-(color:<custom-property>)` | `--tw-shadow-color: var(<custom-property>);` | Cor da sombra personalizada |
| `shadow-[<value>]` | `box-shadow: <value>;` | Valor arbitrário |

## Cores de Sombra

### Cores Básicas

| Classe | Propriedade CSS | Valor |
|--------|----------------|-------|
| `shadow-inherit` | `--tw-shadow-color: inherit;` | Herda a cor |
| `shadow-current` | `--tw-shadow-color: currentColor;` | Cor atual do texto |
| `shadow-transparent` | `--tw-shadow-color: transparent;` | Transparente |
| `shadow-black` | `--tw-shadow-color: var(--color-black);` | `#000` |
| `shadow-white` | `--tw-shadow-color: var(--color-white);` | `#fff` |

### Paleta de Cores Red

| Classe | Valor OKLCH |
|--------|-------------|
| `shadow-red-50` | `oklch(97.1% 0.013 17.38)` |
| `shadow-red-100` | `oklch(93.6% 0.032 17.717)` |
| `shadow-red-200` | `oklch(88.5% 0.062 18.334)` |
| `shadow-red-300` | `oklch(80.8% 0.114 19.571)` |
| `shadow-red-400` | `oklch(70.4% 0.191 22.216)` |
| `shadow-red-500` | `oklch(63.7% 0.237 25.331)` |
| `shadow-red-600` | `oklch(57.7% 0.245 27.325)` |
| `shadow-red-700` | `oklch(50.5% 0.213 27.518)` |
| `shadow-red-800` | `oklch(44.4% 0.177 26.899)` |
| `shadow-red-900` | `oklch(39.6% 0.141 25.723)` |
| `shadow-red-950` | `oklch(25.8% 0.092 26.042)` |

### Paleta de Cores Orange

| Classe | Valor OKLCH |
|--------|-------------|
| `shadow-orange-50` | `oklch(98% 0.016 73.684)` |
| `shadow-orange-100` | `oklch(95.4% 0.038 75.164)` |
| `shadow-orange-200` | `oklch(90.1% 0.076 70.697)` |
| `shadow-orange-300` | `oklch(83.7% 0.128 66.29)` |
| `shadow-orange-400` | `oklch(75% 0.183 55.934)` |
| `shadow-orange-500` | `oklch(70.5% 0.213 47.604)` |
| `shadow-orange-600` | `oklch(64.6% 0.222 41.116)` |
| `shadow-orange-700` | `oklch(55.3% 0.195 38.402)` |
| `shadow-orange-800` | `oklch(47% 0.157 37.304)` |
| `shadow-orange-900` | `oklch(40.8% 0.123 38.172)` |
| `shadow-orange-950` | `oklch(26.6% 0.079 36.259)` |

### Paleta de Cores Blue

| Classe | Valor OKLCH |
|--------|-------------|
| `shadow-blue-50` | `oklch(97% 0.014 254.604)` |
| `shadow-blue-100` | `oklch(93.2% 0.032 255.585)` |
| `shadow-blue-200` | `oklch(88.2% 0.059 254.128)` |
| `shadow-blue-300` | `oklch(80.9% 0.105 251.813)` |
| `shadow-blue-400` | `oklch(70.7% 0.165 254.624)` |
| `shadow-blue-500` | `oklch(62.3% 0.214 259.815)` |
| `shadow-blue-600` | `oklch(54.6% 0.245 262.881)` |
| `shadow-blue-700` | `oklch(48.8% 0.243 264.376)` |
| `shadow-blue-800` | `oklch(42.4% 0.199 265.638)` |
| `shadow-blue-900` | `oklch(37.9% 0.146 265.522)` |
| `shadow-blue-950` | `oklch(28.2% 0.091 267.935)` |

### Paleta de Cores Green

| Classe | Valor OKLCH |
|--------|-------------|
| `shadow-green-50` | `oklch(98.2% 0.018 155.826)` |
| `shadow-green-100` | `oklch(96.2% 0.044 156.743)` |
| `shadow-green-200` | `oklch(92.5% 0.084 155.995)` |
| `shadow-green-300` | `oklch(87.1% 0.15 154.449)` |
| `shadow-green-400` | `oklch(79.2% 0.209 151.711)` |
| `shadow-green-500` | `oklch(72.3% 0.219 149.579)` |
| `shadow-green-600` | `oklch(62.7% 0.194 149.214)` |
| `shadow-green-700` | `oklch(52.7% 0.154 150.069)` |
| `shadow-green-800` | `oklch(44.8% 0.119 151.328)` |
| `shadow-green-900` | `oklch(39.3% 0.095 152.535)` |
| `shadow-green-950` | `oklch(26.6% 0.065 152.934)` |

## Sombras Internas (Inset)

### Tamanhos de Sombra Interna

| Classe | Propriedade CSS | Descrição |
|--------|----------------|-----------|
| `inset-shadow-2xs` | `box-shadow: var(--inset-shadow-2xs);` | `inset 0 1px rgb(0 0 0 / 0.05)` |
| `inset-shadow-xs` | `box-shadow: var(--inset-shadow-xs);` | `inset 0 1px 1px rgb(0 0 0 / 0.05)` |
| `inset-shadow-sm` | `box-shadow: var(--inset-shadow-sm);` | `inset 0 2px 4px rgb(0 0 0 / 0.05)` |
| `inset-shadow-none` | `box-shadow: inset 0 0 #0000;` | Remove sombra interna |

### Classes Personalizadas Inset

| Classe | Propriedade CSS |
|--------|----------------|
| `inset-shadow-(<custom-property>)` | `box-shadow: var(<custom-property>);` |
| `inset-shadow-[<value>]` | `box-shadow: <value>;` |

### Cores de Sombra Interna

As cores de sombra interna seguem o mesmo padrão das sombras externas, mas com o prefixo `inset-shadow-`:

- `inset-shadow-inherit`
- `inset-shadow-current`
- `inset-shadow-transparent`
- `inset-shadow-black`
- `inset-shadow-white`
- `inset-shadow-red-{50-950}`
- `inset-shadow-blue-{50-950}`
- E todas as outras cores da paleta...

## Rings (Bordas como Sombra)

### Tamanhos de Ring

| Classe | Propriedade CSS | Descrição |
|--------|----------------|-----------|
| `ring` | `--tw-ring-shadow: 0 0 0 1px;` | Ring padrão (1px) |
| `ring-<number>` | `--tw-ring-shadow: 0 0 0 <number>px;` | Ring com tamanho específico |
| `ring-(<custom-property>)` | `--tw-ring-shadow: 0 0 0 var(<custom-property>);` | Ring personalizado |
| `ring-[<value>]` | `--tw-ring-shadow: 0 0 0 <value>;` | Valor arbitrário |

### Cores de Ring

As cores de ring seguem o mesmo padrão das sombras:

- `ring-inherit`
- `ring-current`
- `ring-transparent`
- `ring-black`
- `ring-white`
- `ring-{color}-{shade}`

## Inset Rings

### Tamanhos de Inset Ring

| Classe | Propriedade CSS |
|--------|----------------|
| `inset-ring` | `--tw-inset-ring-shadow: inset 0 0 0 1px` |
| `inset-ring-<number>` | `--tw-inset-ring-shadow: inset 0 0 0 <number>px` |
| `inset-ring-(<custom-property>)` | `--tw-inset-ring-shadow: inset 0 0 0 var(<custom-property>);` |
| `inset-ring-[<value>]` | `--tw-inset-ring-shadow: inset 0 0 0 <value>;` |

### Cores de Inset Ring

As cores de inset ring seguem o mesmo padrão, com prefixo `inset-ring-`:

- `inset-ring-inherit`
- `inset-ring-current`
- `inset-ring-transparent`
- `inset-ring-{color}-{shade}`

## Exemplos de Uso

### Exemplo Básico

Use utilitários como `shadow-sm` e `shadow-lg` para aplicar diferentes tamanhos de sombra:

```html
<div class="shadow-md ..."></div>
<div class="shadow-lg ..."></div>
<div class="shadow-xl ..."></div>
```

### Alterando a Opacidade

Use o modificador de opacidade para ajustar a opacidade da sombra:

```html
<div class="shadow-xl ..."></div>
<div class="shadow-xl/20 ..."></div>
<div class="shadow-xl/30 ..."></div>
```

### Definindo a Cor da Sombra

Use utilitários como `shadow-indigo-500` e `shadow-cyan-500/50` para alterar a cor:

```html
<button class="bg-cyan-500 shadow-lg shadow-cyan-500/50 ...">Subscribe</button>
<button class="bg-blue-500 shadow-lg shadow-blue-500/50 ...">Subscribe</button>
<button class="bg-indigo-500 shadow-lg shadow-indigo-500/50 ...">Subscribe</button>
```

### Adicionando Sombra Interna

Use utilitários como `inset-shadow-xs` e `inset-shadow-sm`:

```html
<div class="inset-shadow-2xs ..."></div>
<div class="inset-shadow-xs ..."></div>
<div class="inset-shadow-sm ..."></div>
```

### Definindo Cor da Sombra Interna

```html
<div class="inset-shadow-sm inset-shadow-indigo-500 ..."></div>
<div class="inset-shadow-sm inset-shadow-indigo-500/50 ..."></div>
```

### Adicionando Ring

Use `ring` ou `ring-<number>` para aplicar uma borda sólida:

```html
<button class="ring ...">Subscribe</button>
<button class="ring-2 ...">Subscribe</button>
<button class="ring-4 ...">Subscribe</button>
```

### Definindo Cor do Ring

```html
<button class="ring-2 ring-blue-500 ...">Subscribe</button>
<button class="ring-2 ring-blue-500/50 ...">Subscribe</button>
```

### Adicionando Inset Ring

```html
<button class="inset-ring ...">Subscribe</button>
<button class="inset-ring-2 ...">Subscribe</button>
<button class="inset-ring-4 ...">Subscribe</button>
```

### Removendo Sombras

Use os utilitários de remoção:

```html
<div class="shadow-none ..."></div>
```

### Usando Valores Personalizados

```html
<div class="shadow-[0_35px_35px_rgba(0,0,0,0.25)] ...">
  <!-- ... -->
</div>
```

Para variáveis CSS:

```html
<div class="shadow-(--my-shadow) ...">
  <!-- ... -->
</div>
```

### Design Responsivo

Use variantes de breakpoint como `md:`:

```html
<div class="shadow-none md:shadow-lg ...">
  <!-- ... -->
</div>
```

## Personalizando o Tema

### Personalizando Sombras

Use as variáveis de tema `--shadow-*`:

```css
@theme {
  --shadow-3xl: 0 35px 35px rgba(0, 0, 0, 0.25);
}
```

```html
<div class="shadow-3xl">
  <!-- ... -->
</div>
```

### Personalizando Sombras Internas

Use as variáveis `--inset-shadow-*`:

```css
@theme {
  --inset-shadow-md: inset 0 2px 3px rgba(0, 0, 0, 0.25);
}
```

```html
<div class="inset-shadow-md">
  <!-- ... -->
</div>
```

### Personalizando Cores de Sombra

Use as variáveis `--color-*`:

```css
@theme {
  --color-regal-blue: #243c5a;
}
```

```html
<div class="shadow-regal-blue">
  <!-- ... -->
</div>
```

Agora utilitários como `shadow-regal-blue`, `inset-shadow-regal-blue`, `ring-regal-blue`, e `inset-ring-regal-blue` podem ser usados.

