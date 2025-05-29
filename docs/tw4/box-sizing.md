# Box Sizing

O `box-sizing` controla como o navegador calcula o tamanho total de um elemento.

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `box-border` | `box-sizing: border-box` |
| `box-content` | `box-sizing: content-box` |

## Exemplos

### Incluindo bordas e padding

Use a classe `box-border` para definir o `box-sizing` de um elemento como `border-box`, fazendo com que o navegador inclua as bordas e padding do elemento quando você define sua altura ou largura.

Isso significa que um elemento de 100px × 100px com uma borda de 2px e 4px de padding em todos os lados será renderizado como 100px × 100px, com uma área de conteúdo interno de 88px × 88px:

```html
<div class="box-border size-32 border-4 p-4 ...">
  <!-- Conteúdo -->
</div>
```

> **Nota:** O Tailwind torna isso padrão para todos os elementos em nossos estilos base preflight.

### Excluindo bordas e padding

Use a classe `box-content` para definir o `box-sizing` de um elemento como `content-box`, fazendo com que o navegador adicione bordas e padding além da largura ou altura especificada do elemento.

Isso significa que um elemento de 100px × 100px com uma borda de 2px e 4px de padding em todos os lados será realmente renderizado como 112px × 112px, com uma área de conteúdo interno de 100px × 100px:

```html
<div class="box-content size-32 border-4 p-4 ...">
  <!-- Conteúdo -->
</div>
```

### Design Responsivo

Prefixe uma classe de box-sizing com uma variante de breakpoint como `md:` para aplicar a classe apenas em tamanhos de tela médios e acima:

```html
<div class="box-content md:box-border ...">
  <!-- Conteúdo -->
</div>
```

Aprenda mais sobre o uso de variantes na [documentação de variantes](../variants).

## Quando Usar

- **`box-border`**: Use quando quiser que o padding e bordas sejam incluídos no tamanho total do elemento (mais previsível)
- **`box-content`**: Use quando quiser que o padding e bordas sejam adicionados ao tamanho especificado (comportamento padrão do CSS)

