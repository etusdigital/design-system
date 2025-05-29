# Transform Origin

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `origin-center` | `transform-origin: center;` |
| `origin-top` | `transform-origin: top;` |
| `origin-top-right` | `transform-origin: top right;` |
| `origin-right` | `transform-origin: right;` |
| `origin-bottom-right` | `transform-origin: bottom right;` |
| `origin-bottom` | `transform-origin: bottom;` |
| `origin-bottom-left` | `transform-origin: bottom left;` |
| `origin-left` | `transform-origin: left;` |
| `origin-top-left` | `transform-origin: top left;` |

## Valores Personalizados

| Sintaxe | Propriedade CSS |
|---------|----------------|
| `origin-(<custom-property>)` | `transform-origin: var(<custom-property>);` |
| `origin-[<value>]` | `transform-origin: <value>;` |

## Exemplos

### Exemplo Básico

Use utilitários como `origin-top` e `origin-bottom-left` para definir a origem da transformação de um elemento:

```html
<img class="origin-center rotate-45 ..." src="/img/mountains.jpg" />
<img class="origin-top-left rotate-12 ..." src="/img/mountains.jpg" />
<img class="origin-bottom -rotate-12 ..." src="/img/mountains.jpg" />
```

### Usando um Valor Personalizado

Use a sintaxe `origin-[<value>]` para definir a origem da transformação baseada em um valor completamente personalizado:

```html
<img class="origin-[33%_75%] ..." src="/img/mountains.jpg" />
```

Para variáveis CSS, você também pode usar a sintaxe `origin-(<custom-property>)`:

```html
<img class="origin-(--my-transform-origin) ..." src="/img/mountains.jpg" />
```

Isso é apenas uma abreviação para `origin-[var(<custom-property>)]` que adiciona a função `var()` automaticamente para você.

### Design Responsivo

Prefixe um utilitário de transform-origin com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e acima:

```html
<img class="origin-center md:origin-top ..." src="/img/mountains.jpg" />
```

Saiba mais sobre o uso de variantes na documentação de variantes.

