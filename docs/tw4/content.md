# Content

## Classes disponíveis

| Classe | CSS | Variável CSS |
|--------|-----|--------------|
| `content-[<value>]` | `content: <value>;` | - |
| `content-(<custom-property>)` | `content: var(<custom-property>);` | - |
| `content-none` | `content: none;` | - |

## Exemplos

### Exemplo básico

Use a sintaxe `content-[<value>]`, junto com as variantes `before` e `after`, para definir o conteúdo dos pseudo-elementos `::before` e `::after`:

```html
<p>
  Higher resolution means more than just a better-quality image. With a
  Retina 6K display, 
  <a class="text-blue-600 after:content-['_↗']" href="...">
    Pro Display XDR
  </a> 
  gives you nearly 40 percent more screen real estate than a 5K display.
</p>
```

### Referenciando valor de atributo

Use a sintaxe `content-[attr(<name>)]` para referenciar um valor armazenado em um atributo usando a função CSS `attr()`:

```html
<p before="Hello World" class="before:content-[attr(before)] ...">
  <!-- ... -->
</p>
```

### Usando espaços e underscores

Como espaços em branco indicam o fim de uma classe em HTML, substitua qualquer espaço em um valor arbitrário por um underscore:

```html
<p class="before:content-['Hello_World'] ..."></p>
```

Se você precisar incluir um underscore real, pode fazer isso escapando-o com uma barra invertida:

```html
<p class="before:content-['Hello\_World']"></p>
```

### Usando uma variável CSS

Use a sintaxe `content-(<custom-property>)` para controlar o conteúdo dos pseudo-elementos `::before` e `::after` usando uma variável CSS:

```html
<p class="content-(--my-content)"></p>
```

Isso é apenas uma abreviação para `content-[var(<custom-property>)]` que adiciona a função `var()` automaticamente para você.

### Design responsivo

Prefixe um utilitário de content com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e maiores:

```html
<p class="before:content-['Mobile'] md:before:content-['Desktop'] ..."></p>
```

Saiba mais sobre o uso de variantes na documentação de variantes.

