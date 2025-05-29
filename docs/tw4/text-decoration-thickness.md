# text-decoration-thickness

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `decoration-<number>` | `text-decoration-thickness: <number>px;` |
| `decoration-from-font` | `text-decoration-thickness: from-font;` |
| `decoration-auto` | `text-decoration-thickness: auto;` |
| `decoration-(length:<custom-property>)` | `text-decoration-thickness: var(<custom-property>);` |
| `decoration-[<value>]` | `text-decoration-thickness: <value>;` |

## Exemplos

### Exemplo Básico

Use as utilitários `decoration-<number>` como `decoration-2` e `decoration-4` para alterar a espessura da decoração de texto de um elemento:

**Classes:** `decoration-2`, `decoration-4`

**Resultado visual:**
- The quick brown fox jumps over the lazy dog. *(decoration-1)*
- **The quick brown fox jumps over the lazy dog.** *(decoration-2)*
- **The quick brown fox jumps over the lazy dog.** *(decoration-4)*

```html
<p class="underline decoration-1">The quick brown fox...</p>
<p class="underline decoration-2">The quick brown fox...</p>
<p class="underline decoration-4">The quick brown fox...</p>
```

### Usando um Valor Personalizado

Use a sintaxe `decoration-[<value>]` para definir a espessura da decoração de texto com base em um valor completamente personalizado:

```html
<p class="decoration-[0.25rem] ...">
  Lorem ipsum dolor sit amet...
</p>
```

Para variáveis CSS, você também pode usar a sintaxe `decoration-(length:<custom-property>)`:

```html
<p class="decoration-(length:--my-decoration-thickness) ...">
  Lorem ipsum dolor sit amet...
</p>
```

> **Nota:** Esta é apenas uma forma abreviada para `decoration-[length:var(<custom-property>)]` que adiciona a função `var()` automaticamente para você.

### Design Responsivo

Prefixe um utilitário de `text-decoration-thickness` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e acima:

```html
<p class="underline md:decoration-4 ...">
  Lorem ipsum dolor sit amet...
</p>
```

> **Saiba mais:** Consulte a documentação sobre variantes para aprender mais sobre o uso de variantes.

