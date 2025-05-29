# accent-color

A propriedade `accent-color` permite personalizar a cor de elementos de formulário como checkboxes, radio buttons e outros controles.

## Classes Básicas

| Classe | CSS |
|--------|-----|
| `accent-inherit` | `accent-color: inherit;` |
| `accent-current` | `accent-color: currentColor;` |
| `accent-transparent` | `accent-color: transparent;` |
| `accent-black` | `accent-color: var(--color-black);` |
| `accent-white` | `accent-color: var(--color-white);` |

## Cores por Escala

### Red (Vermelho)
| Classe | Valor |
|--------|-------|
| `accent-red-50` | `oklch(97.1% 0.013 17.38)` |
| `accent-red-100` | `oklch(93.6% 0.032 17.717)` |
| `accent-red-200` | `oklch(88.5% 0.062 18.334)` |
| `accent-red-300` | `oklch(80.8% 0.114 19.571)` |
| `accent-red-400` | `oklch(70.4% 0.191 22.216)` |
| `accent-red-500` | `oklch(63.7% 0.237 25.331)` |
| `accent-red-600` | `oklch(57.7% 0.245 27.325)` |
| `accent-red-700` | `oklch(50.5% 0.213 27.518)` |
| `accent-red-800` | `oklch(44.4% 0.177 26.899)` |
| `accent-red-900` | `oklch(39.6% 0.141 25.723)` |
| `accent-red-950` | `oklch(25.8% 0.092 26.042)` |

### Orange (Laranja)
| Classe | Valor |
|--------|-------|
| `accent-orange-50` | `oklch(98% 0.016 73.684)` |
| `accent-orange-100` | `oklch(95.4% 0.038 75.164)` |
| `accent-orange-200` | `oklch(90.1% 0.076 70.697)` |
| `accent-orange-300` | `oklch(83.7% 0.128 66.29)` |
| `accent-orange-400` | `oklch(75% 0.183 55.934)` |
| `accent-orange-500` | `oklch(70.5% 0.213 47.604)` |
| `accent-orange-600` | `oklch(64.6% 0.222 41.116)` |
| `accent-orange-700` | `oklch(55.3% 0.195 38.402)` |
| `accent-orange-800` | `oklch(47% 0.157 37.304)` |
| `accent-orange-900` | `oklch(40.8% 0.123 38.172)` |
| `accent-orange-950` | `oklch(26.6% 0.079 36.259)` |

### Outras Cores Disponíveis

As seguintes escalas de cores também estão disponíveis com a mesma estrutura (50-950):

- **amber** - Âmbar
- **yellow** - Amarelo
- **lime** - Lima
- **green** - Verde
- **emerald** - Esmeralda
- **teal** - Azul-petróleo
- **cyan** - Ciano
- **sky** - Céu
- **blue** - Azul
- **indigo** - Índigo
- **violet** - Violeta
- **purple** - Roxo
- **fuchsia** - Fúcsia
- **pink** - Rosa
- **rose** - Rosa-claro
- **slate** - Ardósia
- **gray** - Cinza
- **zinc** - Zinco
- **neutral** - Neutro
- **stone** - Pedra

## Exemplos de Uso

### Definindo a cor de destaque

Use utilitários como `accent-rose-500` e `accent-lime-600` para alterar a cor de destaque de um elemento:

```html
<label>
  <input type="checkbox" checked />
  Browser padrão
</label>

<label>
  <input class="accent-pink-500" type="checkbox" checked />
  Personalizado
</label>
```

Isso é útil para estilizar elementos como checkboxes e grupos de radio buttons, substituindo a cor padrão do navegador.

### Alterando a opacidade

Use o modificador de opacidade de cor para controlar a opacidade da cor de destaque de um elemento:

```html
<input class="accent-purple-500/25" type="checkbox" checked />
<input class="accent-purple-500/75" type="checkbox" checked />
```

> **Nota:** Definir a opacidade da cor de destaque tem suporte limitado nos navegadores e funciona apenas no Firefox atualmente.

### Usando um valor personalizado

Use a sintaxe `accent-[<value>]` para definir a cor de destaque com base em um valor completamente personalizado:

```html
<input class="accent-[#50d71e]" type="checkbox" />
```

Para variáveis CSS, você também pode usar a sintaxe `accent-(<custom-property>)`:

```html
<input class="accent-(--my-accent-color)" type="checkbox" />
```

Isso é apenas uma abreviação para `accent-[var(<custom-property>)]` que adiciona a função `var()` automaticamente.

### Aplicando no hover

Prefixe um utilitário accent-color com uma variante como `hover:` para aplicar o utilitário apenas nesse estado:

```html
<input class="accent-black hover:accent-pink-500" type="checkbox" />
```

Saiba mais sobre o uso de variantes na [documentação de variantes](./variants).

### Design responsivo

Prefixe um utilitário accent-color com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e superiores:

```html
<input class="accent-black md:accent-pink-500" type="checkbox" />
```

## Personalizando seu tema

Use as variáveis de tema `--color-*` para personalizar os utilitários de cor em seu projeto:

```css
@theme {
  --color-regal-blue: #243c5a;
}
```

Agora o utilitário `accent-regal-blue` pode ser usado em sua marcação:

```html
<input class="accent-regal-blue" type="checkbox" />
```

Saiba mais sobre personalização do tema na [documentação do tema](./theme).
```

</rewritten_file>