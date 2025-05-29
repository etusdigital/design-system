# Aspect Ratio

Utilitários para controlar a proporção de aspecto de um elemento.

## Classes Utilitárias

| Classe | Propriedade CSS | Descrição |
|--------|----------------|-----------|
| `aspect-square` | `aspect-ratio: 1 / 1;` | Proporção quadrada (1:1) |
| `aspect-video` | `aspect-ratio: var(--aspect-ratio-video);` | Proporção de vídeo (16:9) |
| `aspect-auto` | `aspect-ratio: auto;` | Proporção automática |
| `aspect-<ratio>` | `aspect-ratio: <ratio>;` | Proporção personalizada |
| `aspect-(<custom-property>)` | `aspect-ratio: var(<custom-property>);` | Usando variável CSS |
| `aspect-[<value>]` | `aspect-ratio: <value>;` | Valor arbitrário |

## Exemplos

### Exemplo Básico

Use as utilitários `aspect-<ratio>` como `aspect-3/2` para dar a um elemento uma proporção específica:

*Redimensione o exemplo para ver o comportamento esperado*

```html
<img class="aspect-3/2 object-cover" src="/img/villas.jpg" />
```

### Usando Proporção de Vídeo

Use a utilitário `aspect-video` para dar a um elemento de vídeo uma proporção 16:9:

*Redimensione o exemplo para ver o comportamento esperado*

```html
<iframe 
  class="aspect-video" 
  src="https://www.youtube.com/embed/dQw4w9WgXcQ">
</iframe>
```

### Usando Valor Personalizado

Use a sintaxe `aspect-[<value>]` para definir a proporção baseada em um valor completamente personalizado:

```html
<img class="aspect-[calc(4*3+1)/3]" src="/img/villas.jpg" />
```

Para variáveis CSS, você também pode usar a sintaxe `aspect-(<custom-property>)`:

```html
<img class="aspect-(--my-aspect-ratio)" src="/img/villas.jpg" />
```

Isso é apenas uma abreviação para `aspect-[var(<custom-property>)]` que adiciona automaticamente a função `var()`.

### Design Responsivo

Prefixe uma utilitário de aspect-ratio com uma variante de breakpoint como `md:` para aplicar a utilitário apenas em tamanhos de tela médios e acima:

```html
<iframe 
  class="aspect-video md:aspect-square" 
  src="https://www.youtube.com/embed/dQw4w9WgXcQ">
</iframe>
```

Aprenda mais sobre o uso de variantes na [documentação de variantes](https://tailwindcss.com/docs/hover-focus-and-other-states).

## Personalizando seu Tema

Use as variáveis de tema `--aspect-*` para personalizar as utilitários de aspect ratio em seu projeto:

```css
@theme {
  --aspect-retro: 4 / 3;
}
```

Agora a utilitário `aspect-retro` pode ser usada em sua marcação:

```html
<iframe 
  class="aspect-retro" 
  src="https://www.youtube.com/embed/dQw4w9WgXcQ">
</iframe>
```

Aprenda mais sobre personalização de tema na [documentação de tema](https://tailwindcss.com/docs/theme).

