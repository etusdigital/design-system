# Background Image

## Referência de Classes

| Classe | Propriedade CSS |
|--------|----------------|
| `bg-[<value>]` | `background-image: <value>;` |
| `bg-(image:<custom-property>)` | `background-image: var(<custom-property>);` |
| `bg-none` | `background-image: none;` |

### Gradientes Lineares

| Classe | Propriedade CSS |
|--------|----------------|
| `bg-linear-to-t` | `background-image: linear-gradient(to top, var(--tw-gradient-stops));` |
| `bg-linear-to-tr` | `background-image: linear-gradient(to top right, var(--tw-gradient-stops));` |
| `bg-linear-to-r` | `background-image: linear-gradient(to right, var(--tw-gradient-stops));` |
| `bg-linear-to-br` | `background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));` |
| `bg-linear-to-b` | `background-image: linear-gradient(to bottom, var(--tw-gradient-stops));` |
| `bg-linear-to-bl` | `background-image: linear-gradient(to bottom left, var(--tw-gradient-stops));` |
| `bg-linear-to-l` | `background-image: linear-gradient(to left, var(--tw-gradient-stops));` |
| `bg-linear-to-tl` | `background-image: linear-gradient(to top left, var(--tw-gradient-stops));` |
| `bg-linear-<angle>` | `background-image: linear-gradient(<angle> in oklab, var(--tw-gradient-stops));` |
| `-bg-linear-<angle>` | `background-image: linear-gradient(-<angle> in oklab, var(--tw-gradient-stops));` |
| `bg-linear-(<custom-property>)` | `background-image: linear-gradient(var(--tw-gradient-stops, var(<custom-property>)));` |
| `bg-linear-[<value>]` | `background-image: linear-gradient(var(--tw-gradient-stops, <value>));` |

### Gradientes Radiais

| Classe | Propriedade CSS |
|--------|----------------|
| `bg-radial` | `background-image: radial-gradient(in oklab, var(--tw-gradient-stops));` |
| `bg-radial-(<custom-property>)` | `background-image: radial-gradient(var(--tw-gradient-stops, var(<custom-property>)));` |
| `bg-radial-[<value>]` | `background-image: radial-gradient(var(--tw-gradient-stops, <value>));` |

### Gradientes Cônicos

| Classe | Propriedade CSS |
|--------|----------------|
| `bg-conic-<angle>` | `background-image: conic-gradient(from <angle> in oklab, var(--tw-gradient-stops));` |
| `-bg-conic-<angle>` | `background-image: conic-gradient(from -<angle> in oklab, var(--tw-gradient-stops));` |
| `bg-conic-(<custom-property>)` | `background-image: var(<custom-property>);` |
| `bg-conic-[<value>]` | `background-image: <image>;` |

### Paradas de Gradiente

| Classe | Propriedade CSS |
|--------|----------------|
| `from-<color>` | `--tw-gradient-from: <color>;` |
| `from-<percentage>` | `--tw-gradient-from-position: <percentage>;` |
| `from-(<custom-property>)` | `--tw-gradient-from: var(<custom-property>);` |
| `from-[<value>]` | `--tw-gradient-from: <value>;` |
| `via-<color>` | `--tw-gradient-via: <color>;` |
| `via-<percentage>` | `--tw-gradient-via-position: <percentage>;` |
| `via-(<custom-property>)` | `--tw-gradient-via: var(<custom-property>);` |
| `via-[<value>]` | `--tw-gradient-via: <value>;` |
| `to-<color>` | `--tw-gradient-to: <color>;` |
| `to-<percentage>` | `--tw-gradient-to-position: <percentage>;` |
| `to-(<custom-property>)` | `--tw-gradient-to: var(<custom-property>);` |
| `to-[<value>]` | `--tw-gradient-to: <value>;` |

## Exemplos

### Exemplo básico

Use a sintaxe `bg-[<value>]` para definir a imagem de fundo de um elemento:

```html
<div class="bg-[url(/img/mountains.jpg)] ..."></div>
```

### Adicionando um gradiente linear

Use utilitários como `bg-linear-to-r` e `bg-linear-<angle>` com os utilitários de parada de cor para adicionar um gradiente linear a um elemento:

```html
<div class="h-14 bg-linear-to-r from-cyan-500 to-blue-500"></div>
<div class="h-14 bg-linear-to-t from-sky-500 to-indigo-500"></div>
<div class="h-14 bg-linear-to-bl from-violet-500 to-fuchsia-500"></div>
<div class="h-14 bg-linear-65 from-purple-500 to-pink-500"></div>
```

### Adicionando um gradiente radial

Use os utilitários `bg-radial` e `bg-radial-[<position>]` com os utilitários de parada de cor para adicionar um gradiente radial a um elemento:

```html
<div class="size-18 rounded-full bg-radial from-pink-400 from-40% to-fuchsia-700"></div>
<div class="size-18 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%"></div>
<div class="size-18 rounded-full bg-radial-[at_25%_25%] from-white to-zinc-900 to-75%"></div>
```

### Adicionando um gradiente cônico

Use os utilitários `bg-conic` e `bg-conic-<angle>` com os utilitários de parada de cor para adicionar um gradiente cônico a um elemento:

```html
<div class="size-24 rounded-full bg-conic from-blue-600 to-sky-400 to-50%"></div>
<div class="size-24 rounded-full bg-conic-180 from-indigo-600 via-indigo-50 to-indigo-600"></div>
<div class="size-24 rounded-full bg-conic/decreasing from-violet-700 via-lime-300 to-violet-700"></div>
```

### Definindo paradas de cor do gradiente

Use utilitários como `from-indigo-500`, `via-purple-500` e `to-pink-500` para definir as cores das paradas do gradiente:

```html
<div class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ..."></div>
```

### Definindo posições das paradas do gradiente

Use utilitários como `from-10%`, `via-30%` e `to-90%` para definir posições mais precisas para as paradas de cor do gradiente:

```html
<div class="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ..."></div>
```

### Alterando o modo de interpolação

Use o modificador de interpolação para controlar o modo de interpolação de um gradiente:

- **srgb**
- **hsl** 
- **oklab**
- **oklch**
- **longer**
- **shorter**
- **increasing**
- **decreasing**

```html
<div class="bg-linear-to-r/srgb from-indigo-500 to-teal-400"></div>
<div class="bg-linear-to-r/hsl from-indigo-500 to-teal-400"></div>
<div class="bg-linear-to-r/oklab from-indigo-500 to-teal-400"></div>
<div class="bg-linear-to-r/oklch from-indigo-500 to-teal-400"></div>
<div class="bg-linear-to-r/longer from-indigo-500 to-teal-400"></div>
<div class="bg-linear-to-r/shorter from-indigo-500 to-teal-400"></div>
<div class="bg-linear-to-r/increasing from-indigo-500 to-teal-400"></div>
<div class="bg-linear-to-r/decreasing from-indigo-500 to-teal-400"></div>
```

Por padrão, os gradientes são interpolados no espaço de cores `oklab`.

### Removendo imagens de fundo

Use o utilitário `bg-none` para remover uma imagem de fundo existente de um elemento:

```html
<div class="bg-none"></div>
```

### Usando um valor personalizado

Use utilitários como `bg-linear-[<value>]` e `from-[<value>]` para definir o gradiente baseado em um valor completamente personalizado:

```html
<div class="bg-linear-[25deg,red_5%,yellow_60%,lime_90%,teal] ...">
  <!-- ... -->
</div>
```

Para variáveis CSS, você também pode usar a sintaxe `bg-linear-(<custom-property>)`:

```html
<div class="bg-linear-(--my-gradient) ...">
  <!-- ... -->
</div>
```

Isso é apenas uma abreviação para `bg-linear-[var(<custom-property>)]` que adiciona a função `var()` automaticamente para você.

### Design responsivo

Prefixe um utilitário `background-image` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e acima:

```html
<div class="from-purple-400 md:from-yellow-500 ...">
  <!-- ... -->
</div>
```

Saiba mais sobre o uso de variantes na documentação de variantes.

## Personalizando seu tema

Use as variáveis de tema `--color-*` para personalizar os utilitários de cor em seu projeto:

```css
@theme {
  --color-regal-blue: #243c5a;
}
```

Agora utilitários como `from-regal-blue`, `via-regal-blue` e `to-regal-blue` podem ser usados em sua marcação:

```html
<div class="from-regal-blue">
  <!-- ... -->
</div>
```

Saiba mais sobre personalização do seu tema na documentação do tema.

