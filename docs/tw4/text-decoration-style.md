# text-decoration-style

## Classes disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `decoration-solid` | `text-decoration-style: solid;` |
| `decoration-double` | `text-decoration-style: double;` |
| `decoration-dotted` | `text-decoration-style: dotted;` |
| `decoration-dashed` | `text-decoration-style: dashed;` |
| `decoration-wavy` | `text-decoration-style: wavy;` |

## Exemplos

### Exemplo básico

Use utilitários como `decoration-dotted` e `decoration-dashed` para alterar o estilo de decoração de texto de um elemento:

**Resultado visual:**

- **decoration-solid:** The quick brown fox jumps over the lazy dog.
- **decoration-double:** The quick brown fox jumps over the lazy dog.
- **decoration-dotted:** The quick brown fox jumps over the lazy dog.
- **decoration-dashed:** The quick brown fox jumps over the lazy dog.
- **decoration-wavy:** The quick brown fox jumps over the lazy dog.

**Código:**

```html
<p class="underline decoration-solid">The quick brown fox...</p>
<p class="underline decoration-double">The quick brown fox...</p>
<p class="underline decoration-dotted">The quick brown fox...</p>
<p class="underline decoration-dashed">The quick brown fox...</p>
<p class="underline decoration-wavy">The quick brown fox...</p>
```

### Design responsivo

Adicione um prefixo de breakpoint como `md:` antes de um utilitário de `text-decoration-style` para aplicá-lo apenas em tamanhos de tela médios e acima:

```html
<p class="underline md:decoration-dashed">
  Lorem ipsum dolor sit amet...
</p>
```

Saiba mais sobre o uso de variantes na [documentação de variantes](../variants.md).

