# Filter: Brightness

## Sintaxe

O Tailwind CSS v4 oferece diferentes formas de aplicar filtros de brilho:

- `brightness-<number>` → `filter: brightness(<number>%);`
- `brightness-(<custom-property>)` → `filter: brightness(var(<custom-property>));`
- `brightness-[<value>]` → `filter: brightness(<value>);`

## Exemplos

### Exemplo básico

Use utilitários como `brightness-50` e `brightness-100` para controlar o brilho de um elemento:

- `brightness-50` - Reduz o brilho para 50%
- `brightness-100` - Brilho normal (100%)
- `brightness-125` - Aumenta o brilho para 125%
- `brightness-200` - Aumenta o brilho para 200%

```html
<img class="brightness-50" src="/img/mountains.jpg" />
<img class="brightness-100" src="/img/mountains.jpg" />
<img class="brightness-125" src="/img/mountains.jpg" />
<img class="brightness-200" src="/img/mountains.jpg" />
```

### Usando valores customizados

Use a sintaxe `brightness-[<value>]` para definir o brilho baseado em um valor completamente customizado:

```html
<img class="brightness-[1.75]" src="/img/mountains.jpg" />
```

### Usando variáveis CSS

Para variáveis CSS, você também pode usar a sintaxe `brightness-(<custom-property>)`:

```html
<img class="brightness-(--my-brightness)" src="/img/mountains.jpg" />
```

Isso é apenas uma forma abreviada de `brightness-[var(<custom-property>)]` que adiciona a função `var()` automaticamente.

### Design responsivo

Prefixe um utilitário `filter: brightness()` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em telas médias e maiores:

```html
<img class="brightness-110 md:brightness-150" src="/img/mountains.jpg" />
```

---

📝 **Nota:** Saiba mais sobre o uso de variantes na [documentação de variantes](../variants.md).

