# Text Decoration Line

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `underline` | `text-decoration-line: underline;` |
| `overline` | `text-decoration-line: overline;` |
| `line-through` | `text-decoration-line: line-through;` |
| `no-underline` | `text-decoration-line: none;` |

## Exemplos

### Sublinhando texto

Use a classe `underline` para adicionar um sublinhado ao texto de um elemento:

**Resultado visual:**
> <span style="text-decoration-line: underline;">The quick brown fox jumps over the lazy dog.</span>

```html
<p class="underline">The quick brown fox...</p>
```

### Adicionando uma linha superior ao texto

Use a classe `overline` para adicionar uma linha superior ao texto de um elemento:

**Resultado visual:**
> <span style="text-decoration-line: overline;">The quick brown fox jumps over the lazy dog.</span>

```html
<p class="overline">The quick brown fox...</p>
```

### Adicionando uma linha através do texto

Use a classe `line-through` para adicionar uma linha através do texto de um elemento:

**Resultado visual:**
> <span style="text-decoration-line: line-through;">The quick brown fox jumps over the lazy dog.</span>

```html
<p class="line-through">The quick brown fox...</p>
```

### Removendo decoração de texto

Use a classe `no-underline` para remover decorações de texto de um elemento:

**Resultado visual:**
> <span style="text-decoration-line: none;">The quick brown fox jumps over the lazy dog.</span>

```html
<p class="no-underline">The quick brown fox...</p>
```

## Variantes de Estado

### Aplicando no hover

Prefixe uma classe de `text-decoration-line` com uma variante como `hover:` para aplicar a classe apenas nesse estado:

**Exemplo:**
> Passe o mouse sobre o texto para ver o comportamento esperado

```html
<p>The <a href="..." class="no-underline hover:underline ...">quick brown fox</a> jumps over the lazy dog.</p>
```

Saiba mais sobre o uso de variantes na [documentação de variantes](../variants.md).

## Design Responsivo

Prefixe uma classe de `text-decoration-line` com uma variante de breakpoint como `md:` para aplicar a classe apenas em tamanhos de tela médios e acima:

```html
<a class="no-underline md:underline ..." href="...">
  <!-- ... -->
</a>
```

Saiba mais sobre o uso de variantes na [documentação de variantes](../variants.md).

