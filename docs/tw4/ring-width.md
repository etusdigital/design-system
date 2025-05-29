# Box Shadow

## Utilitários de Shadow (Sombra Externa)

### Sombras Básicas
| Classe | Propriedade CSS | Descrição |
|--------|----------------|-----------|
| `shadow-2xs` | `box-shadow: var(--shadow-2xs);` | `0 1px rgb(0 0 0 / 0.05)` |
| `shadow-xs` | `box-shadow: var(--shadow-xs);` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` |
| `shadow-sm` | `box-shadow: var(--shadow-sm);` | `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)` |
| `shadow-md` | `box-shadow: var(--shadow-md);` | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` |
| `shadow-lg` | `box-shadow: var(--shadow-lg);` | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` |
| `shadow-xl` | `box-shadow: var(--shadow-xl);` | `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` |
| `shadow-2xl` | `box-shadow: var(--shadow-2xl);` | `0 25px 50px -12px rgb(0 0 0 / 0.25)` |
| `shadow-none` | `box-shadow: 0 0 #0000;` | Remove a sombra |

### Sombras Personalizadas
| Classe | Propriedade CSS |
|--------|----------------|
| `shadow-(<custom-property>)` | `box-shadow: var(<custom-property>);` |
| `shadow-[<value>]` | `box-shadow: <value>;` |

### Cores de Shadow
Disponível para todas as cores do sistema:
- `shadow-inherit`, `shadow-current`, `shadow-transparent`
- `shadow-black`, `shadow-white`
- `shadow-red-{50-950}`, `shadow-orange-{50-950}`, `shadow-amber-{50-950}`
- `shadow-yellow-{50-950}`, `shadow-lime-{50-950}`, `shadow-green-{50-950}`
- `shadow-emerald-{50-950}`, `shadow-teal-{50-950}`, `shadow-cyan-{50-950}`
- `shadow-sky-{50-950}`, `shadow-blue-{50-950}`, `shadow-indigo-{50-950}`
- `shadow-violet-{50-950}`, `shadow-purple-{50-950}`, `shadow-fuchsia-{50-950}`
- `shadow-pink-{50-950}`, `shadow-rose-{50-950}`
- `shadow-slate-{50-950}`, `shadow-gray-{50-950}`, `shadow-zinc-{50-950}`
- `shadow-neutral-{50-950}`, `shadow-stone-{50-950}`

## Utilitários de Inset Shadow (Sombra Interna)

### Sombras Internas Básicas
| Classe | Propriedade CSS | Descrição |
|--------|----------------|-----------|
| `inset-shadow-2xs` | `box-shadow: var(--inset-shadow-2xs);` | `inset 0 1px rgb(0 0 0 / 0.05)` |
| `inset-shadow-xs` | `box-shadow: var(--inset-shadow-xs);` | `inset 0 1px 1px rgb(0 0 0 / 0.05)` |
| `inset-shadow-sm` | `box-shadow: var(--inset-shadow-sm);` | `inset 0 2px 4px rgb(0 0 0 / 0.05)` |
| `inset-shadow-none` | `box-shadow: inset 0 0 #0000;` | Remove sombra interna |

### Sombras Internas Personalizadas
| Classe | Propriedade CSS |
|--------|----------------|
| `inset-shadow-(<custom-property>)` | `box-shadow: var(<custom-property>);` |
| `inset-shadow-[<value>]` | `box-shadow: <value>;` |

### Cores de Inset Shadow
Disponível para todas as cores do sistema (mesmo padrão das shadows externas):
- `inset-shadow-inherit`, `inset-shadow-current`, `inset-shadow-transparent`
- Todas as variações de cores: `inset-shadow-{cor}-{intensidade}`

## Utilitários de Ring (Anel/Borda)

### Rings Básicos
| Classe | Propriedade CSS | Descrição |
|--------|----------------|-----------|
| `ring` | `--tw-ring-shadow: 0 0 0 1px;` | Ring de 1px |
| `ring-<number>` | `--tw-ring-shadow: 0 0 0 <number>px;` | Ring personalizado |
| `ring-(<custom-property>)` | `--tw-ring-shadow: 0 0 0 var(<custom-property>);` | Ring com variável CSS |
| `ring-[<value>]` | `--tw-ring-shadow: 0 0 0 <value>;` | Ring com valor customizado |

### Cores de Ring
Disponível para todas as cores do sistema:
- `ring-inherit`, `ring-current`, `ring-transparent`
- Todas as variações de cores: `ring-{cor}-{intensidade}`

## Utilitários de Inset Ring (Anel Interno)

### Inset Rings Básicos
| Classe | Propriedade CSS | Descrição |
|--------|----------------|-----------|
| `inset-ring` | `--tw-inset-ring-shadow: inset 0 0 0 1px` | Ring interno de 1px |
| `inset-ring-<number>` | `--tw-inset-ring-shadow: inset 0 0 0 <number>px` | Ring interno personalizado |
| `inset-ring-(<custom-property>)` | `--tw-inset-ring-shadow: inset 0 0 0 var(<custom-property>);` | Ring interno com variável |
| `inset-ring-[<value>]` | `--tw-inset-ring-shadow: inset 0 0 0 <value>;` | Ring interno customizado |

### Cores de Inset Ring
Disponível para todas as cores do sistema:
- `inset-ring-inherit`, `inset-ring-current`, `inset-ring-transparent`
- Todas as variações de cores: `inset-ring-{cor}-{intensidade}`

## Exemplos de Uso

### Exemplo Básico
Use utilitários como `shadow-sm` e `shadow-lg` para aplicar diferentes tamanhos de sombra:

```html
<div class="shadow-md">shadow-md</div>
<div class="shadow-lg">shadow-lg</div>
<div class="shadow-xl">shadow-xl</div>
```

### Alterando a Opacidade
Use o modificador de opacidade para ajustar a opacidade da sombra:

```html
<div class="shadow-xl">shadow-xl</div>
<div class="shadow-xl/20">shadow-xl/20</div>
<div class="shadow-xl/30">shadow-xl/30</div>
```

As opacidades padrão das sombras são baixas (25% ou menos), então aumentar a opacidade (para ~50%) tornará as sombras mais pronunciadas.

### Definindo a Cor da Sombra
Use utilitários como `shadow-indigo-500` e `shadow-cyan-500/50` para alterar a cor da sombra:

```html
<button class="bg-cyan-500 shadow-lg shadow-cyan-500/50">Subscribe</button>
<button class="bg-blue-500 shadow-lg shadow-blue-500/50">Subscribe</button>
<button class="bg-indigo-500 shadow-lg shadow-indigo-500/50">Subscribe</button>
```

Por padrão, sombras coloridas têm opacidade de 100%, mas você pode ajustar usando o modificador de opacidade.

### Adicionando Sombra Interna
Use utilitários como `inset-shadow-xs` e `inset-shadow-sm` para aplicar sombra interna:

```html
<div class="inset-shadow-2xs">inset-shadow-2xs</div>
<div class="inset-shadow-xs">inset-shadow-xs</div>
<div class="inset-shadow-sm">inset-shadow-sm</div>
```

### Definindo Cor da Sombra Interna
Use utilitários como `inset-shadow-indigo-500` para alterar a cor da sombra interna:

```html
<div class="inset-shadow-sm inset-shadow-indigo-500">inset-shadow-indigo-500</div>
<div class="inset-shadow-sm inset-shadow-indigo-500/50">inset-shadow-indigo-500/50</div>
```

### Adicionando um Ring
Use utilitários `ring` ou `ring-<number>` como `ring-2` e `ring-4`:

```html
<button class="ring">ring</button>
<button class="ring-2">ring-2</button>
<button class="ring-4">ring-4</button>
```

Por padrão, rings correspondem ao `currentColor` do elemento.

### Definindo Cor do Ring
Use utilitários como `ring-indigo-500` e `ring-cyan-500/50`:

```html
<button class="ring-2 ring-blue-500">ring-blue-500</button>
<button class="ring-2 ring-blue-500/50">ring-blue-500/50</button>
```

### Adicionando Ring Interno
Use utilitários `inset-ring` ou `inset-ring-<number>`:

```html
<button class="inset-ring">inset-ring</button>
<button class="inset-ring-2">inset-ring-2</button>
<button class="inset-ring-4">inset-ring-4</button>
```

### Definindo Cor do Ring Interno
Use utilitários como `inset-ring-indigo-500`:

```html
<button class="inset-ring-2 inset-ring-blue-500">inset-ring-blue-500</button>
<button class="inset-ring-2 inset-ring-blue-500/50">inset-ring-blue-500/50</button>
```

### Removendo Sombras
Use os utilitários `shadow-none`, `inset-shadow-none`, `ring-0` e `inset-ring-0`:

```html
<div class="shadow-none">shadow-none</div>
```

### Usando Valores Customizados
Use utilitários como `shadow-[<value>]`, `inset-shadow-[<value>]`, `ring-[<value>]` e `inset-ring-[<value>]`:

```html
<div class="shadow-[0_35px_35px_rgba(0,0,0,0.25)]">
  <!-- Sombra customizada -->
</div>
```

Para variáveis CSS, você também pode usar a sintaxe `shadow-(<custom-property>)`:

```html
<div class="shadow-(--my-shadow)">
  <!-- Usando variável CSS -->
</div>
```

### Design Responsivo
Prefixe um utilitário com uma variante de breakpoint como `md:`:

```html
<div class="shadow-none md:shadow-lg">
  <!-- sem sombra em mobile, shadow-lg em telas médias e maiores -->
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

Agora o utilitário `shadow-3xl` pode ser usado:

```html
<div class="shadow-3xl">
  <!-- Sombra customizada -->
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
  <!-- Sombra interna customizada -->
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
  <!-- Sombra com cor customizada -->
</div>
```

