# text-underline-offset

A propriedade `text-underline-offset` no Tailwind CSS v4 permite controlar o deslocamento (offset) da linha de sublinhado em textos.

## Classes disponíveis

| Classe | Propriedade CSS | Descrição |
|--------|----------------|-----------|
| `underline-offset-<number>` | `text-underline-offset: <number>px;` | Define um offset positivo |
| `-underline-offset-<number>` | `text-underline-offset: calc(<number>px * -1);` | Define um offset negativo |
| `underline-offset-auto` | `text-underline-offset: auto;` | Usa o valor automático do navegador |
| `underline-offset-(<custom-property>)` | `text-underline-offset: var(<custom-property>);` | Usa uma propriedade CSS customizada |
| `underline-offset-[<value>]` | `text-underline-offset: <value>;` | Valor arbitrário customizado |

## Exemplos

### Exemplo básico

Use as classes `underline-offset-<number>` como `underline-offset-2` e `underline-offset-4` para alterar o deslocamento do sublinhado:

```html
<p class="underline underline-offset-1">The quick brown fox jumps over the lazy dog.</p>
<p class="underline underline-offset-2">The quick brown fox jumps over the lazy dog.</p>
<p class="underline underline-offset-4">The quick brown fox jumps over the lazy dog.</p>
<p class="underline underline-offset-8">The quick brown fox jumps over the lazy dog.</p>
```

**Resultado visual:**
- `underline-offset-1`: The quick brown fox jumps over the lazy dog.
- `underline-offset-2`: The quick brown fox jumps over the lazy dog.
- `underline-offset-4`: The quick brown fox jumps over the lazy dog.
- `underline-offset-8`: The quick brown fox jumps over the lazy dog.

### Usando valores customizados

Use a sintaxe `underline-offset-[<value>]` para definir o offset do sublinhado com base em um valor completamente customizado:

```html
<p class="underline underline-offset-[3px]">
  Lorem ipsum dolor sit amet...
</p>
```

Para variáveis CSS, você também pode usar a sintaxe `underline-offset-(<custom-property>)`:

```html
<p class="underline underline-offset-(--my-underline-offset)">
  Lorem ipsum dolor sit amet...
</p>
```

> **Nota:** Esta é apenas uma forma abreviada de `underline-offset-[var(<custom-property>)]` que adiciona a função `var()` automaticamente.

### Design responsivo

Prefixe uma classe de `text-underline-offset` com uma variante de breakpoint como `md:` para aplicar a utilidade apenas em tamanhos de tela médios e acima:

```html
<p class="underline md:underline-offset-4">
  Lorem ipsum dolor sit amet...
</p>
```

Aprenda mais sobre o uso de variantes na [documentação de variantes](../variants.md).

## Valores numéricos disponíveis

Os valores padrão disponíveis incluem:
- `underline-offset-0`
- `underline-offset-1`
- `underline-offset-2`
- `underline-offset-4`
- `underline-offset-8`

## Casos de uso comuns

1. **Sublinhados decorativos**: Use offsets maiores para criar efeitos visuais interessantes
2. **Tipografia fina**: Use offsets menores para textos delicados
3. **Contraste visual**: Ajuste o offset baseado no tamanho da fonte ou peso do texto
