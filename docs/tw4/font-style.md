# Font Style

Utilitários para controlar o estilo da fonte de um elemento.

## Utilitários Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `italic` | `font-style: italic;` |
| `not-italic` | `font-style: normal;` |

## Exemplos

### Texto em Itálico

Use o utilitário `italic` para deixar o texto em itálico:

**Resultado:**
> *The quick brown fox jumps over the lazy dog.*

```html
<p class="italic">The quick brown fox jumps over the lazy dog.</p>
```

### Texto Normal

Use o utilitário `not-italic` para exibir o texto normalmente:

**Resultado:**
> The quick brown fox jumps over the lazy dog.

```html
<p class="not-italic">The quick brown fox jumps over the lazy dog.</p>
```

## Design Responsivo

Prefixe um utilitário de font-style com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e acima:

```html
<p class="italic md:not-italic">
  Lorem ipsum dolor sit amet...
</p>
```

**Neste exemplo:**
- Em telas pequenas: o texto será exibido em itálico
- Em telas médias e maiores: o texto será exibido normal (não itálico)

## Breakpoints Disponíveis

- `sm:` - A partir de 640px
- `md:` - A partir de 768px  
- `lg:` - A partir de 1024px
- `xl:` - A partir de 1280px
- `2xl:` - A partir de 1536px

---

Saiba mais sobre o uso de variantes na [documentação de variantes](../variants.md).

