# Font Weight

O Tailwind CSS v4 oferece utilitários para controlar o peso da fonte (font-weight) dos elementos.

## Classes Disponíveis

| Classe | Propriedade CSS | Descrição |
|--------|----------------|-----------|
| `font-thin` | `font-weight: 100;` | Peso extra-fino |
| `font-extralight` | `font-weight: 200;` | Peso extra-leve |
| `font-light` | `font-weight: 300;` | Peso leve |
| `font-normal` | `font-weight: 400;` | Peso normal |
| `font-medium` | `font-weight: 500;` | Peso médio |
| `font-semibold` | `font-weight: 600;` | Peso semi-negrito |
| `font-bold` | `font-weight: 700;` | Peso negrito |
| `font-extrabold` | `font-weight: 800;` | Peso extra-negrito |
| `font-black` | `font-weight: 900;` | Peso preto |
| `font-(<custom-property>)` | `font-weight: var(<custom-property>);` | Valor customizado com variável CSS |
| `font-[<value>]` | `font-weight: <value>;` | Valor arbitrário |

## Exemplos

### Exemplo básico

Use utilitários como `font-thin` e `font-bold` para definir o peso da fonte de um elemento:

```html
<p class="font-light">The quick brown fox jumps over the lazy dog.</p>
<p class="font-normal">The quick brown fox jumps over the lazy dog.</p>
<p class="font-medium">The quick brown fox jumps over the lazy dog.</p>
<p class="font-semibold">The quick brown fox jumps over the lazy dog.</p>
<p class="font-bold">The quick brown fox jumps over the lazy dog.</p>
```

### Usando um valor customizado

Use a sintaxe `font-[<value>]` para definir o peso da fonte baseado em um valor completamente customizado:

```html
<p class="font-[1000]">
  Lorem ipsum dolor sit amet...
</p>
```

Para variáveis CSS, você também pode usar a sintaxe `font-(<custom-property>)`:

```html
<p class="font-(--my-font-weight)">
  Lorem ipsum dolor sit amet...
</p>
```

Isso é apenas um atalho para `font-[var(<custom-property>)]` que adiciona a função `var()` automaticamente.

### Design responsivo

Prefixe um utilitário de font-weight com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios ou maiores:

```html
<p class="font-normal md:font-bold">
  Lorem ipsum dolor sit amet...
</p>
```

Saiba mais sobre o uso de variantes na documentação de variantes.

## Personalizando seu tema

Use as variáveis de tema `--font-weight-*` para personalizar os utilitários de peso da fonte em seu projeto:

```css
@theme {
  --font-weight-extrablack: 1000;
}
```

Agora o utilitário `font-extrablack` pode ser usado em sua marcação:

```html
<div class="font-extrablack">
  <!-- ... -->
</div>
```

Saiba mais sobre personalização de tema na documentação de temas.

