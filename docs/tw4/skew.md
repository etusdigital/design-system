# Skew

## Sintaxe

O Tailwind CSS v4 oferece diferentes formas de aplicar inclinações (skew):

### Inclinação geral
- `skew-<number>` → `transform: skewX(<number>deg) skewY(<number>deg);`
- `-skew-<number>` → `transform: skewX(-<number>deg) skewY(-<number>deg);`
- `skew-(<custom-property>)` → `transform: skewX(var(<custom-property>)) skewY(var(<custom-property>));`
- `skew-[<value>]` → `transform: skewX(<value>) skewY(<value>);`

### Inclinação no eixo X
- `skew-x-<number>` → `transform: skewX(<number>deg);`
- `-skew-x-<number>` → `transform: skewX(-<number>deg);`
- `skew-x-(<custom-property>)` → `transform: skewX(var(<custom-property>));`
- `skew-x-[<value>]` → `transform: skewX(<value>);`

### Inclinação no eixo Y
- `skew-y-<number>` → `transform: skewY(<number>deg);`
- `-skew-y-<number>` → `transform: skewY(-<number>deg);`
- `skew-y-(<custom-property>)` → `transform: skewY(var(<custom-property>));`
- `skew-y-[<value>]` → `transform: skewY(<value>);`

## Exemplos

### Exemplo básico

Use utilitários `skew-<number>` como `skew-4` e `skew-10` para inclinar um elemento em ambos os eixos:

- `skew-3` - Inclina 3 graus em ambos os eixos
- `skew-6` - Inclina 6 graus em ambos os eixos
- `skew-12` - Inclina 12 graus em ambos os eixos

```html
<img class="skew-3" src="/img/mountains.jpg" />
<img class="skew-6" src="/img/mountains.jpg" />
<img class="skew-12" src="/img/mountains.jpg" />
```

### Usando valores negativos

Use utilitários `-skew-<number>` como `-skew-4` e `-skew-10` para inclinar um elemento negativamente em ambos os eixos:

- `-skew-3` - Inclina -3 graus em ambos os eixos
- `-skew-6` - Inclina -6 graus em ambos os eixos
- `-skew-12` - Inclina -12 graus em ambos os eixos

```html
<img class="-skew-3" src="/img/mountains.jpg" />
<img class="-skew-6" src="/img/mountains.jpg" />
<img class="-skew-12" src="/img/mountains.jpg" />
```

### Inclinando no eixo X

Use utilitários `skew-x-<number>` como `skew-x-4` e `-skew-x-10` para inclinar um elemento no eixo X:

- `-skew-x-12` - Inclina -12 graus no eixo X
- `skew-x-6` - Inclina 6 graus no eixo X
- `skew-x-12` - Inclina 12 graus no eixo X

```html
<img class="-skew-x-12" src="/img/mountains.jpg" />
<img class="skew-x-6" src="/img/mountains.jpg" />
<img class="skew-x-12" src="/img/mountains.jpg" />
```

### Inclinando no eixo Y

Use utilitários `skew-y-<number>` como `skew-y-4` e `-skew-y-10` para inclinar um elemento no eixo Y:

- `-skew-y-12` - Inclina -12 graus no eixo Y
- `skew-y-6` - Inclina 6 graus no eixo Y
- `skew-y-12` - Inclina 12 graus no eixo Y

```html
<img class="-skew-y-12" src="/img/mountains.jpg" />
<img class="skew-y-6" src="/img/mountains.jpg" />
<img class="skew-y-12" src="/img/mountains.jpg" />
```

### Usando valores customizados

Use a sintaxe `skew-[<value>]` para definir a inclinação baseada em um valor completamente customizado:

```html
<img class="skew-[3.142rad]" src="/img/mountains.jpg" />
```

### Usando variáveis CSS

Para variáveis CSS, você também pode usar a sintaxe `skew-(<custom-property>)`:

```html
<img class="skew-(--my-skew)" src="/img/mountains.jpg" />
```

Isso é apenas uma forma abreviada de `skew-[var(<custom-property>)]` que adiciona a função `var()` automaticamente.

### Design responsivo

Prefixe utilitários `skewX()` e `skewY()` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em telas médias e maiores:

```html
<img class="skew-3 md:skew-12" src="/img/mountains.jpg" />
```

---

📝 **Nota:** Saiba mais sobre o uso de variantes na [documentação de variantes](../variants.md).

