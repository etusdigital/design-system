# Scale

## Sintaxe

O Tailwind CSS v4 oferece diferentes formas de aplicar transformações de escala:

### Escala geral
- `scale-none` → `scale: none;`
- `scale-<number>` → `scale: <number>% <number>%;`
- `-scale-<number>` → `scale: calc(<number>% * -1) calc(<number>% * -1);`
- `scale-(<custom-property>)` → `scale: var(<custom-property>) var(<custom-property>);`
- `scale-[<value>]` → `scale: <value>;`

### Escala no eixo X
- `scale-x-<number>` → `scale: <number>% var(--tw-scale-y);`
- `-scale-x-<number>` → `scale: calc(<number>% * -1) var(--tw-scale-y);`
- `scale-x-(<custom-property>)` → `scale: var(<custom-property>) var(--tw-scale-y);`
- `scale-x-[<value>]` → `scale: <value> var(--tw-scale-y);`

### Escala no eixo Y
- `scale-y-<number>` → `scale: var(--tw-scale-x) <number>%;`
- `-scale-y-<number>` → `scale: var(--tw-scale-x) calc(<number>% * -1);`
- `scale-y-(<custom-property>)` → `scale: var(--tw-scale-x) var(<custom-property>);`
- `scale-y-[<value>]` → `scale: var(--tw-scale-x) <value>;`

### Escala no eixo Z
- `scale-z-<number>` → `scale: var(--tw-scale-x) var(--tw-scale-y) <number>%;`
- `-scale-z-<number>` → `scale: var(--tw-scale-x) var(--tw-scale-y) calc(<number>% * -1);`
- `scale-z-(<custom-property>)` → `scale: var(--tw-scale-x) var(--tw-scale-y) var(<custom-property>);`
- `scale-z-[<value>]` → `scale: var(--tw-scale-x) var(--tw-scale-y) <value>;`
- `scale-3d` → `scale: var(--tw-scale-x) var(--tw-scale-y) var(--tw-scale-z);`

## Exemplos

### Exemplo básico

Use utilitários `scale-<number>` como `scale-75` e `scale-150` para escalar um elemento por uma porcentagem de seu tamanho original:

- `scale-75` - Reduz o elemento para 75% do tamanho original
- `scale-100` - Mantém o tamanho original (100%)
- `scale-125` - Aumenta o elemento para 125% do tamanho original

```html
<img class="scale-75" src="/img/mountains.jpg" />
<img class="scale-100" src="/img/mountains.jpg" />
<img class="scale-125" src="/img/mountains.jpg" />
```

### Escalando no eixo X

Use os utilitários `scale-x-<number>` como `scale-x-75` e `-scale-x-150` para escalar um elemento no eixo X por uma porcentagem de sua largura original:

- `scale-x-75` - Reduz a largura para 75%
- `scale-x-100` - Mantém a largura original
- `scale-x-125` - Aumenta a largura para 125%

```html
<img class="scale-x-75" src="/img/mountains.jpg" />
<img class="scale-x-100" src="/img/mountains.jpg" />
<img class="scale-x-125" src="/img/mountains.jpg" />
```

### Escalando no eixo Y

Use os utilitários `scale-y-<number>` como `scale-y-75` e `-scale-y-150` para escalar um elemento no eixo Y por uma porcentagem de sua altura original:

- `scale-y-75` - Reduz a altura para 75%
- `scale-y-100` - Mantém a altura original
- `scale-y-125` - Aumenta a altura para 125%

```html
<img class="scale-y-75" src="/img/mountains.jpg" />
<img class="scale-y-100" src="/img/mountains.jpg" />
<img class="scale-y-125" src="/img/mountains.jpg" />
```

### Usando valores negativos

Use utilitários `-scale-<number>`, `-scale-x-<number>` ou `-scale-y-<number>` como `-scale-x-75` e `-scale-125` para espelhar e reduzir um elemento por uma porcentagem de seu tamanho original:

- `-scale-x-75` - Espelha horizontalmente e reduz para 75%
- `-scale-100` - Espelha completamente
- `-scale-y-125` - Espelha verticalmente e aumenta para 125%

```html
<img class="-scale-x-75" src="/img/mountains.jpg" />
<img class="-scale-100" src="/img/mountains.jpg" />
<img class="-scale-y-125" src="/img/mountains.jpg" />
```

### Usando valores customizados

Use a sintaxe `scale-[<value>]` para definir a escala baseada em um valor completamente customizado:

```html
<img class="scale-[1.7]" src="/img/mountains.jpg" />
```

### Usando variáveis CSS

Para variáveis CSS, você também pode usar a sintaxe `scale-(<custom-property>)`:

```html
<img class="scale-(--my-scale)" src="/img/mountains.jpg" />
```

Isso é apenas uma forma abreviada de `scale-[var(<custom-property>)]` que adiciona a função `var()` automaticamente.

### Aplicando no hover

Prefixe um utilitário de escala com uma variante como `hover:` para aplicar o utilitário apenas nesse estado:

```html
<img class="scale-95 hover:scale-120" src="/img/mountains.jpg" />
```

---

📝 **Nota:** Saiba mais sobre o uso de variantes na [documentação de variantes](../variants.md).

