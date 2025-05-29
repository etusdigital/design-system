# Font Smoothing

As utilitários de font smoothing controlam como o texto é renderizado no navegador, aplicando diferentes tipos de antialiasing.

## Classes disponíveis

| Classe | Propriedades CSS |
|--------|------------------|
| `antialiased` | `-webkit-font-smoothing: antialiased;`<br>`-moz-osx-font-smoothing: grayscale;` |
| `subpixel-antialiased` | `-webkit-font-smoothing: auto;`<br>`-moz-osx-font-smoothing: auto;` |

## Exemplos

### Antialiasing em escala de cinza

Use a classe `antialiased` para renderizar o texto usando antialiasing em escala de cinza:

**Exemplo visual:**
```
antialiased: The quick brown fox jumps over the lazy dog.
```

**Código:**
```html
<p class="antialiased ...">The quick brown fox ...</p>
```

### Antialiasing subpixel

Use a classe `subpixel-antialiased` para renderizar o texto usando antialiasing subpixel:

**Exemplo visual:**
```
subpixel-antialiased: The quick brown fox jumps over the lazy dog.
```

**Código:**
```html
<p class="subpixel-antialiased ...">The quick brown fox ...</p>
```

## Design responsivo

Você pode usar prefixos de breakpoint como `md:` para aplicar as utilitários de font smoothing apenas em tamanhos de tela específicos:

```html
<p class="antialiased md:subpixel-antialiased ...">
  Lorem ipsum dolor sit amet...
</p>
```

Este exemplo aplica `antialiased` por padrão e muda para `subpixel-antialiased` em telas médias e maiores.

## Mais informações

Para saber mais sobre como usar variantes responsivas, consulte a documentação sobre variantes do Tailwind CSS.

