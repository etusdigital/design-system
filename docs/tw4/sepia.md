# Filter: Sepia

## Sintaxe

O Tailwind CSS v4 oferece diferentes formas de aplicar filtros sépia:

- `sepia` → `filter: sepia(100%);`
- `sepia-<number>` → `filter: sepia(<number>%);`
- `sepia-(<custom-property>)` → `filter: sepia(var(<custom-property>));`
- `sepia-[<value>]` → `filter: sepia(<value>);`

## Exemplos

### Exemplo básico

Use utilitários como `sepia` e `sepia-50` para controlar o efeito sépia aplicado a um elemento:

- `sepia-0` - Sem efeito sépia (0%)
- `sepia-50` - Efeito sépia moderado (50%)
- `sepia` - Efeito sépia completo (100%)

```html
<img class="sepia-0" src="/img/mountains.jpg" />
<img class="sepia-50" src="/img/mountains.jpg" />
<img class="sepia" src="/img/mountains.jpg" />
```

### Usando valores customizados

Use a sintaxe `sepia-[<value>]` para definir a quantidade de sépia baseada em um valor completamente customizado:

```html
<img class="sepia-[.25]" src="/img/mountains.jpg" />
```

### Usando variáveis CSS

Para variáveis CSS, você também pode usar a sintaxe `sepia-(<custom-property>)`:

```html
<img class="sepia-(--my-sepia)" src="/img/mountains.jpg" />
```

Isso é apenas uma forma abreviada de `sepia-[var(<custom-property>)]` que adiciona a função `var()` automaticamente.

### Design responsivo

Prefixe um utilitário `filter: sepia()` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em telas médias e maiores:

```html
<img class="sepia md:sepia-0" src="/img/mountains.jpg" />
```

---

📝 **Nota:** Saiba mais sobre o uso de variantes na [documentação de variantes](../variants.md).

