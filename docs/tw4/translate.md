# Translate

## Sintaxe

O Tailwind CSS v4 oferece diferentes formas de aplicar translações:

### Translação geral
- `translate-<number>` → `translate: calc(var(--spacing) * <number>) calc(var(--spacing) * <number>);`
- `-translate-<number>` → `translate: calc(var(--spacing) * -<number>) calc(var(--spacing) * -<number>);`
- `translate-<fraction>` → `translate: calc(<fraction> * 100%) calc(<fraction> * 100%);`
- `-translate-<fraction>` → `translate: calc(<fraction> * -100%) calc(<fraction> * -100%);`
- `translate-full` → `translate: 100% 100%;`
- `-translate-full` → `translate: -100% -100%;`
- `translate-px` → `translate: 1px 1px;`
- `-translate-px` → `translate: -1px -1px;`
- `translate-(<custom-property>)` → `translate: var(<custom-property>) var(<custom-property>);`
- `translate-[<value>]` → `translate: <value> <value>;`
- `translate-none` → `translate: none;`

### Translação no eixo X
- `translate-x-<number>` → `translate: calc(var(--spacing) * <number>) var(--tw-translate-y);`
- `-translate-x-<number>` → `translate: calc(var(--spacing) * -<number>) var(--tw-translate-y);`
- `translate-x-<fraction>` → `translate: calc(<fraction> * 100%) var(--tw-translate-y);`
- `-translate-x-<fraction>` → `translate: calc(<fraction> * -100%) var(--tw-translate-y);`
- `translate-x-full` → `translate: 100% var(--tw-translate-y);`
- `-translate-x-full` → `translate: -100% var(--tw-translate-y);`
- `translate-x-px` → `translate: 1px var(--tw-translate-y);`
- `-translate-x-px` → `translate: -1px var(--tw-translate-y);`
- `translate-x-(<custom-property>)` → `translate: var(<custom-property>) var(--tw-translate-y);`
- `translate-x-[<value>]` → `translate: <value> var(--tw-translate-y);`

### Translação no eixo Y
- `translate-y-<number>` → `translate: var(--tw-translate-x) calc(var(--spacing) * <number>);`
- `-translate-y-<number>` → `translate: var(--tw-translate-x) calc(var(--spacing) * -<number>);`
- `translate-y-<fraction>` → `translate: var(--tw-translate-x) calc(<fraction> * 100%);`
- `-translate-y-<fraction>` → `translate: var(--tw-translate-x) calc(<fraction> * -100%);`
- `translate-y-full` → `translate: var(--tw-translate-x) 100%;`
- `-translate-y-full` → `translate: var(--tw-translate-x) -100%;`
- `translate-y-px` → `translate: var(--tw-translate-x) 1px;`
- `-translate-y-px` → `translate: var(--tw-translate-x) -1px;`
- `translate-y-(<custom-property>)` → `translate: var(--tw-translate-x) var(<custom-property>);`
- `translate-y-[<value>]` → `translate: var(--tw-translate-x) <value>;`

### Translação no eixo Z
- `translate-z-<number>` → `translate: var(--tw-translate-x) var(--tw-translate-y) calc(var(--spacing) * <number>);`
- `-translate-z-<number>` → `translate: var(--tw-translate-x) var(--tw-translate-y) calc(var(--spacing) * -<number>);`
- `translate-z-px` → `translate: var(--tw-translate-x) var(--tw-translate-y) 1px;`
- `-translate-z-px` → `translate: var(--tw-translate-x) var(--tw-translate-y) -1px;`
- `translate-z-(<custom-property>)` → `translate: var(--tw-translate-x) var(--tw-translate-y) var(<custom-property>);`
- `translate-z-[<value>]` → `translate: var(--tw-translate-x) var(--tw-translate-y) <value>;`

## Exemplos

### Usando a escala de espaçamento

Use utilitários `translate-<number>` como `translate-2` e `-translate-4` para transladar um elemento em ambos os eixos baseado na escala de espaçamento:

- `-translate-6` - Move -6 unidades em ambos os eixos
- `translate-2` - Move 2 unidades em ambos os eixos
- `translate-8` - Move 8 unidades em ambos os eixos

```html
<img class="-translate-6" src="/img/mountains.jpg" />
<img class="translate-2" src="/img/mountains.jpg" />
<img class="translate-8" src="/img/mountains.jpg" />
```

### Usando porcentagem

Use utilitários `translate-<fraction>` como `translate-1/4` e `-translate-full` para transladar um elemento em ambos os eixos por uma porcentagem do tamanho do elemento:

- `-translate-1/4` - Move -25% em ambos os eixos
- `translate-1/6` - Move ~16.67% em ambos os eixos
- `translate-1/2` - Move 50% em ambos os eixos

```html
<img class="-translate-1/4" src="/img/mountains.jpg" />
<img class="translate-1/6" src="/img/mountains.jpg" />
<img class="translate-1/2" src="/img/mountains.jpg" />
```

### Transladando no eixo X

Use utilitários `translate-x-<number>` ou `translate-x-<fraction>` como `translate-x-4` e `translate-x-1/4` para transladar um elemento no eixo X:

- `-translate-x-4` - Move -4 unidades no eixo X
- `translate-x-2` - Move 2 unidades no eixo X
- `translate-x-1/2` - Move 50% no eixo X

```html
<img class="-translate-x-4" src="/img/mountains.jpg" />
<img class="translate-x-2" src="/img/mountains.jpg" />
<img class="translate-x-1/2" src="/img/mountains.jpg" />
```

### Transladando no eixo Y

Use utilitários `translate-y-<number>` ou `translate-y-<fraction>` como `translate-y-6` e `translate-y-1/3` para transladar um elemento no eixo Y:

- `-translate-y-4` - Move -4 unidades no eixo Y
- `translate-y-2` - Move 2 unidades no eixo Y
- `translate-y-1/2` - Move 50% no eixo Y

```html
<img class="-translate-y-4" src="/img/mountains.jpg" />
<img class="translate-y-2" src="/img/mountains.jpg" />
<img class="translate-y-1/2" src="/img/mountains.jpg" />
```

### Transladando no eixo Z

Use utilitários `translate-z-<number>` como `translate-z-6` e `-translate-z-12` para transladar um elemento no eixo Z:

- `-translate-z-8` - Move -8 unidades no eixo Z
- `translate-z-4` - Move 4 unidades no eixo Z
- `translate-z-12` - Move 12 unidades no eixo Z

```html
<div class="transform-3d">
  <img class="-translate-z-8 rotate-x-50 rotate-z-45" src="/img/mountains.jpg" />
  <img class="translate-z-2 rotate-x-50 rotate-z-45" src="/img/mountains.jpg" />
  <img class="translate-z-1/2 rotate-x-50 rotate-z-45" src="/img/mountains.jpg" />
</div>
```

**Nota:** Os utilitários `translate-z-<number>` requerem que o utilitário `transform-3d` seja aplicado ao elemento pai.

### Usando valores customizados

Use a sintaxe `translate-[<value>]` para definir a translação baseada em um valor completamente customizado:

```html
<img class="translate-[3.142rad]" src="/img/mountains.jpg" />
```

### Usando variáveis CSS

Para variáveis CSS, você também pode usar a sintaxe `translate-(<custom-property>)`:

```html
<img class="translate-(--my-translate)" src="/img/mountains.jpg" />
```

Isso é apenas uma forma abreviada de `translate-[var(<custom-property>)]` que adiciona a função `var()` automaticamente.

### Design responsivo

Prefixe um utilitário de translação com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em telas médias e maiores:

```html
<img class="translate-45 md:translate-60" src="/img/mountains.jpg" />
```

---

📝 **Nota:** Saiba mais sobre o uso de variantes na [documentação de variantes](../variants.md).

