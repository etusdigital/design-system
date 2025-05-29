# Filter: Saturate

## Sintaxe

O Tailwind CSS v4 oferece diferentes formas de aplicar filtros de saturação:

- `saturate-<number>` → `filter: saturate(<number>%);`
- `saturate-(<custom-property>)` → `filter: saturate(var(<custom-property>));`
- `saturate-[<value>]` → `filter: saturate(<value>);`

## Exemplos

### Exemplo básico

Use utilitários como `saturate-50` e `saturate-100` para controlar a saturação de um elemento:

- `saturate-50` - Reduz a saturação para 50%
- `saturate-100` - Saturação normal (100%)
- `saturate-150` - Aumenta a saturação para 150%
- `saturate-200` - Aumenta a saturação para 200%

```html
<img class="saturate-50" src="/img/mountains.jpg" />
<img class="saturate-100" src="/img/mountains.jpg" />
<img class="saturate-150" src="/img/mountains.jpg" />
<img class="saturate-200" src="/img/mountains.jpg" />
```

### Usando valores customizados

Use a sintaxe `saturate-[<value>]` para definir a saturação baseada em um valor completamente customizado:

```html
<img class="saturate-[.25]" src="/img/mountains.jpg" />
```

### Usando variáveis CSS

Para variáveis CSS, você também pode usar a sintaxe `saturate-(<custom-property>)`:

```html
<img class="saturate-(--my-saturation)" src="/img/mountains.jpg" />
```

Isso é apenas uma forma abreviada de `saturate-[var(<custom-property>)]` que adiciona a função `var()` automaticamente.

### Design responsivo

Prefixe um utilitário `filter: saturate()` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em telas médias e maiores:

```html
<img class="saturate-50 md:saturate-150" src="/img/mountains.jpg" />
```

---

📝 **Nota:** Saiba mais sobre o uso de variantes na [documentação de variantes](../variants.md).

