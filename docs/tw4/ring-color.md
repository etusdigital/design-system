# Box Shadow - Tailwind CSS v4

## Visão Geral

As utilitários de box-shadow no Tailwind CSS permitem aplicar sombras, rings (anéis) e efeitos de sombra interna aos elementos HTML.

## Utilitários de Sombra

### Sombras Básicas

| Classe | Propriedade CSS | Descrição |
|--------|----------------|-----------|
| `shadow-2xs` | `box-shadow: var(--shadow-2xs);` | Sombra extra pequena: `0 1px rgb(0 0 0 / 0.05)` |
| `shadow-xs` | `box-shadow: var(--shadow-xs);` | Sombra pequena: `0 1px 2px 0 rgb(0 0 0 / 0.05)` |
| `shadow-sm` | `box-shadow: var(--shadow-sm);` | Sombra pequena-média: `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)` |
| `shadow-md` | `box-shadow: var(--shadow-md);` | Sombra média: `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` |
| `shadow-lg` | `box-shadow: var(--shadow-lg);` | Sombra grande: `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` |
| `shadow-xl` | `box-shadow: var(--shadow-xl);` | Sombra extra grande: `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` |
| `shadow-2xl` | `box-shadow: var(--shadow-2xl);` | Sombra extra grande 2: `0 25px 50px -12px rgb(0 0 0 / 0.25)` |
| `shadow-none` | `box-shadow: 0 0 #0000;` | Remove sombra |

### Sombras Internas (Inset)

| Classe | Propriedade CSS | Descrição |
|--------|----------------|-----------|
| `inset-shadow-2xs` | `box-shadow: var(--inset-shadow-2xs);` | Sombra interna extra pequena: `inset 0 1px rgb(0 0 0 / 0.05)` |
| `inset-shadow-xs` | `box-shadow: var(--inset-shadow-xs);` | Sombra interna pequena: `inset 0 1px 1px rgb(0 0 0 / 0.05)` |
| `inset-shadow-sm` | `box-shadow: var(--inset-shadow-sm);` | Sombra interna média: `inset 0 2px 4px rgb(0 0 0 / 0.05)` |
| `inset-shadow-none` | `box-shadow: inset 0 0 #0000;` | Remove sombra interna |

### Rings (Anéis)

| Classe | Propriedade CSS | Descrição |
|--------|----------------|-----------|
| `ring` | `--tw-ring-shadow: 0 0 0 1px;` | Ring padrão de 1px |
| `ring-<number>` | `--tw-ring-shadow: 0 0 0 <number>px;` | Ring com espessura personalizada |
| `inset-ring` | `--tw-inset-ring-shadow: inset 0 0 0 1px` | Ring interno padrão de 1px |
| `inset-ring-<number>` | `--tw-inset-ring-shadow: inset 0 0 0 <number>px` | Ring interno com espessura personalizada |

## Cores de Sombra

### Cores Básicas

| Classe | Propriedade CSS |
|--------|----------------|
| `shadow-inherit` | `--tw-shadow-color: inherit;` |
| `shadow-current` | `--tw-shadow-color: currentColor;` |
| `shadow-transparent` | `--tw-shadow-color: transparent;` |
| `shadow-black` | `--tw-shadow-color: var(--color-black);` |
| `shadow-white` | `--tw-shadow-color: var(--color-white);` |

### Paleta de Cores

Todas as cores padrão do Tailwind estão disponíveis para sombras:

- `shadow-red-{50-950}` - Tons de vermelho
- `shadow-orange-{50-950}` - Tons de laranja
- `shadow-amber-{50-950}` - Tons de âmbar
- `shadow-yellow-{50-950}` - Tons de amarelo
- `shadow-lime-{50-950}` - Tons de lima
- `shadow-green-{50-950}` - Tons de verde
- `shadow-emerald-{50-950}` - Tons de esmeralda
- `shadow-teal-{50-950}` - Tons de azul-petróleo
- `shadow-cyan-{50-950}` - Tons de ciano
- `shadow-sky-{50-950}` - Tons de azul-céu
- `shadow-blue-{50-950}` - Tons de azul
- `shadow-indigo-{50-950}` - Tons de índigo
- `shadow-violet-{50-950}` - Tons de violeta
- `shadow-purple-{50-950}` - Tons de roxo
- `shadow-fuchsia-{50-950}` - Tons de fúcsia
- `shadow-pink-{50-950}` - Tons de rosa
- `shadow-rose-{50-950}` - Tons de rose
- `shadow-slate-{50-950}` - Tons de ardósia
- `shadow-gray-{50-950}` - Tons de cinza
- `shadow-zinc-{50-950}` - Tons de zinco
- `shadow-neutral-{50-950}` - Tons neutros
- `shadow-stone-{50-950}` - Tons de pedra

**Nota:** As mesmas cores estão disponíveis para `inset-shadow-`, `ring-` e `inset-ring-`.

## Exemplos Práticos

### Exemplo Básico

Use utilitários como `shadow-sm` e `shadow-lg` para aplicar diferentes tamanhos de sombra:

```html
<div class="shadow-md">Sombra média</div>
<div class="shadow-lg">Sombra grande</div>
<div class="shadow-xl">Sombra extra grande</div>
```

### Alterando a Opacidade

Use o modificador de opacidade para ajustar a opacidade da sombra:

```html
<div class="shadow-xl">Sombra padrão</div>
<div class="shadow-xl/20">Sombra com 20% de opacidade</div>
<div class="shadow-xl/30">Sombra com 30% de opacidade</div>
```

### Definindo a Cor da Sombra

Use utilitários como `shadow-indigo-500` e `shadow-cyan-500/50` para alterar a cor da sombra:

```html
<button class="bg-cyan-500 shadow-lg shadow-cyan-500/50">Inscrever-se</button>
<button class="bg-blue-500 shadow-lg shadow-blue-500/50">Inscrever-se</button>
<button class="bg-indigo-500 shadow-lg shadow-indigo-500/50">Inscrever-se</button>
```

### Adicionando Sombra Interna

Use utilitários como `inset-shadow-xs` e `inset-shadow-sm` para aplicar sombra interna:

```html
<div class="inset-shadow-2xs">Sombra interna extra pequena</div>
<div class="inset-shadow-xs">Sombra interna pequena</div>
<div class="inset-shadow-sm">Sombra interna média</div>
```

### Definindo a Cor da Sombra Interna

```html
<div class="inset-shadow-sm inset-shadow-indigo-500">Sombra interna colorida</div>
<div class="inset-shadow-sm inset-shadow-indigo-500/50">Sombra interna com 50% opacidade</div>
```

### Adicionando Rings

Use `ring` ou `ring-<number>` para aplicar um anel sólido:

```html
<button class="ring">Ring padrão</button>
<button class="ring-2">Ring de 2px</button>
<button class="ring-4">Ring de 4px</button>
```

### Definindo a Cor do Ring

```html
<button class="ring-2 ring-blue-500">Ring azul</button>
<button class="ring-2 ring-blue-500/50">Ring azul com 50% opacidade</button>
```

### Adicionando Rings Internos

```html
<button class="inset-ring">Ring interno padrão</button>
<button class="inset-ring-2">Ring interno de 2px</button>
<button class="inset-ring-4">Ring interno de 4px</button>
```

### Removendo Sombras

Use os utilitários de remoção para remover sombras existentes:

```html
<div class="shadow-none">Sem sombra</div>
<div class="inset-shadow-none">Sem sombra interna</div>
<div class="ring-0">Sem ring</div>
<div class="inset-ring-0">Sem ring interno</div>
```

### Usando Valores Personalizados

Use a sintaxe de colchetes para valores personalizados:

```html
<div class="shadow-[0_35px_35px_rgba(0,0,0,0.25)]">
  Sombra personalizada
</div>
```

Para variáveis CSS, use a sintaxe de parênteses:

```html
<div class="shadow-(--my-shadow)">
  Sombra usando variável CSS
</div>
```

### Design Responsivo

Prefixe os utilitários com variantes de breakpoint:

```html
<div class="shadow-none md:shadow-lg">
  Sem sombra no mobile, sombra grande no desktop
</div>
```

## Personalização

### Personalizando Sombras

Use as variáveis de tema `--shadow-*` para personalizar as sombras:

```css
@theme {
  --shadow-3xl: 0 35px 35px rgba(0, 0, 0, 0.25);
}
```

### Personalizando Sombras Internas

Use as variáveis `--inset-shadow-*`:

```css
@theme {
  --inset-shadow-md: inset 0 2px 3px rgba(0, 0, 0, 0.25);
}
```

### Personalizando Cores

Use as variáveis `--color-*` para adicionar novas cores:

```css
@theme {
  --color-regal-blue: #243c5a;
}
```

Agora você pode usar `shadow-regal-blue`, `ring-regal-blue`, etc.

## Observações Importantes

1. As opacidades padrão das sombras são baixas (25% ou menos)
2. Aumentar a opacidade (para 50%) torna as sombras mais pronunciadas
3. Rings por padrão seguem a `currentColor` do elemento
4. Sombras coloridas têm opacidade de 100% por padrão, mas podem ser ajustadas
5. A sintaxe `shadow-(--variavel)` é um atalho para `shadow-[var(--variavel)]`
