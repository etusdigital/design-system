# filter: invert()

O utilitário `filter: invert()` do Tailwind CSS permite controlar a inversão de cores de um elemento.

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `invert` | `filter: invert(100%);` |
| `invert-<number>` | `filter: invert(<number>%);` |
| `invert-(<custom-property>)` | `filter: invert(var(<custom-property>))` |
| `invert-[<value>]` | `filter: invert(<value>);` |

## Exemplos

### Exemplo básico

Use utilitários como `invert` e `invert-20` para controlar a inversão de cores de um elemento:

**Resultado visual:**
- `invert-0` - Sem inversão
- `invert-20` - Inversão de 20%
- `invert` - Inversão completa (100%)

```html
<img class="invert-0" src="/img/mountains.jpg" />
<img class="invert-20" src="/img/mountains.jpg" />
<img class="invert" src="/img/mountains.jpg" />
```

### Usando um valor customizado

Use a sintaxe `invert-[<value>]` para definir a inversão de cores baseada em um valor completamente customizado:

```html
<img class="invert-[.25]" src="/img/mountains.jpg" />
```

Para variáveis CSS, você também pode usar a sintaxe `invert-(<custom-property>)`:

```html
<img class="invert-(--my-inversion)" src="/img/mountains.jpg" />
```

Esta é apenas uma abreviação para `invert-[var(<custom-property>)]` que adiciona a função `var()` automaticamente.

### Design responsivo

Prefixe um utilitário `filter: invert()` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e maiores:

```html
<img class="invert md:invert-0" src="/img/mountains.jpg" />
```

Saiba mais sobre o uso de variantes na [documentação de variantes](../variants.md).

## Valores padrão

- `invert-0`: 0% de inversão
- `invert`: 100% de inversão (inversão completa)
- Valores customizados: Use `invert-[<number>]` para qualquer porcentagem específica

## Compatibilidade

Este utilitário funciona com todos os navegadores modernos que suportam a propriedade CSS `filter`.

