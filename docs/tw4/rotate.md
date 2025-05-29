# Rotate

## Sintaxe

O Tailwind CSS v4 oferece diferentes formas de aplicar rotações:

### Rotação básica
- `rotate-none` → `rotate: none;`
- `rotate-<number>` → `rotate: <number>deg;`
- `-rotate-<number>` → `rotate: calc(<number>deg * -1);`
- `rotate-(<custom-property>)` → `rotate: var(<custom-property>);`
- `rotate-[<value>]` → `rotate: <value>;`

### Rotação no eixo X
- `rotate-x-<number>` → `transform: rotateX(<number>deg) var(--tw-rotate-y);`
- `-rotate-x-<number>` → `transform: rotateX(-<number>deg) var(--tw-rotate-y);`
- `rotate-x-(<custom-property>)` → `transform: rotateX(var(<custom-property>)) var(--tw-rotate-y);`
- `rotate-x-[<value>]` → `transform: rotateX(<value>) var(--tw-rotate-y);`

### Rotação no eixo Y
- `rotate-y-<number>` → `transform: var(--tw-rotate-x) rotateY(<number>deg);`
- `-rotate-y-<number>` → `transform: var(--tw-rotate-x) rotateY(-<number>deg);`
- `rotate-y-(<custom-property>)` → `transform: var(--tw-rotate-x) rotateY(var(<custom-property>));`
- `rotate-y-[<value>]` → `transform: var(--tw-rotate-x) rotateY(<value>);`

### Rotação no eixo Z
- `rotate-z-<number>` → `transform: var(--tw-rotate-x) var(--tw-rotate-y) rotateZ(<number>deg);`
- `-rotate-z-<number>` → `transform: var(--tw-rotate-x) var(--tw-rotate-y) rotateZ(-<number>deg);`
- `rotate-z-(<custom-property>)` → `transform: var(--tw-rotate-x) var(--tw-rotate-y) rotateZ(var(<custom-property>));`
- `rotate-z-[<value>]` → `transform: var(--tw-rotate-x) var(--tw-rotate-y) rotateZ(<value>);`

## Exemplos

### Exemplo básico

Use utilitários `rotate-<number>` como `rotate-45` e `rotate-90` para rotacionar um elemento por graus:

- `rotate-45` - Rotaciona 45 graus
- `rotate-90` - Rotaciona 90 graus  
- `rotate-210` - Rotaciona 210 graus

```html
<img class="rotate-45" src="/img/mountains.jpg" />
<img class="rotate-90" src="/img/mountains.jpg" />
<img class="rotate-210" src="/img/mountains.jpg" />
```

### Usando valores negativos

Use utilitários `-rotate-<number>` como `-rotate-45` e `-rotate-90` para rotacionar um elemento no sentido anti-horário por graus:

- `-rotate-45` - Rotaciona -45 graus (anti-horário)
- `-rotate-90` - Rotaciona -90 graus (anti-horário)
- `-rotate-210` - Rotaciona -210 graus (anti-horário)

```html
<img class="-rotate-45" src="/img/mountains.jpg" />
<img class="-rotate-90" src="/img/mountains.jpg" />
<img class="-rotate-210" src="/img/mountains.jpg" />
```

### Rotacionando no espaço 3D

Use utilitários `rotate-x-<number>`, `rotate-y-<number>` e `rotate-z-<number>` como `rotate-x-50`, `-rotate-y-30` e `rotate-z-45` juntos para rotacionar um elemento no espaço 3D:

```html
<img class="rotate-x-50 rotate-z-45" src="/img/mountains.jpg" />
<img class="rotate-x-15 -rotate-y-30" src="/img/mountains.jpg" />
<img class="rotate-y-25 rotate-z-30" src="/img/mountains.jpg" />
```

### Usando valores customizados

Use a sintaxe `rotate-[<value>]` para definir a rotação baseada em um valor completamente customizado:

```html
<img class="rotate-[3.142rad]" src="/img/mountains.jpg" />
```

### Usando variáveis CSS

Para variáveis CSS, você também pode usar a sintaxe `rotate-(<custom-property>)`:

```html
<img class="rotate-(--my-rotation)" src="/img/mountains.jpg" />
```

Isso é apenas uma forma abreviada de `rotate-[var(<custom-property>)]` que adiciona a função `var()` automaticamente.

### Design responsivo

Prefixe um utilitário de rotação com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em telas médias e maiores:

```html
<img class="rotate-45 md:rotate-60" src="/img/mountains.jpg" />
```

---

📝 **Nota:** Saiba mais sobre o uso de variantes na [documentação de variantes](../variants.md).

