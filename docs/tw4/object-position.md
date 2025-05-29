# Object Position

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `object-top-left` | `object-position: top left;` |
| `object-top` | `object-position: top;` |
| `object-top-right` | `object-position: top right;` |
| `object-left` | `object-position: left;` |
| `object-center` | `object-position: center;` |
| `object-right` | `object-position: right;` |
| `object-bottom-left` | `object-position: bottom left;` |
| `object-bottom` | `object-position: bottom;` |
| `object-bottom-right` | `object-position: bottom right;` |
| `object-(<custom-property>)` | `object-position: var(<custom-property>);` |
| `object-[<value>]` | `object-position: <value>;` |

## Exemplos

### Exemplo Básico

Use utilitários como `object-left` e `object-bottom-right` para especificar como o conteúdo de um elemento substituído deve ser posicionado dentro de seu contêiner:

*Passe o mouse sobre os exemplos para ver a imagem completa*

**Posições disponíveis:**

- `object-top-left`
- `object-top`
- `object-top-right`
- `object-left`
- `object-center`
- `object-right`
- `object-bottom-left`
- `object-bottom`
- `object-bottom-right`

```html
<img class="size-24 object-top-left ..." src="/img/mountains.jpg" />
<img class="size-24 object-top ..." src="/img/mountains.jpg" />
<img class="size-24 object-top-right ..." src="/img/mountains.jpg" />
<img class="size-24 object-left ..." src="/img/mountains.jpg" />
<img class="size-24 object-center ..." src="/img/mountains.jpg" />
<img class="size-24 object-right ..." src="/img/mountains.jpg" />
<img class="size-24 object-bottom-left ..." src="/img/mountains.jpg" />
<img class="size-24 object-bottom ..." src="/img/mountains.jpg" />
<img class="size-24 object-bottom-right ..." src="/img/mountains.jpg" />
```

### Usando um Valor Personalizado

Use a sintaxe `object-[<value>]` para definir a posição do objeto com base em um valor completamente personalizado:

```html
<img class="object-[25%_75%] ..." src="/img/mountains.jpg" />
```

Para variáveis CSS, você também pode usar a sintaxe `object-(<custom-property>)`:

```html
<img class="object-(--my-object) ..." src="/img/mountains.jpg" />
```

Isso é apenas um atalho para `object-[var(<custom-property>)]` que adiciona a função `var()` para você automaticamente.

### Design Responsivo

Prefixe um utilitário `object-position` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e superiores:

```html
<img class="object-center md:object-top ..." src="/img/mountains.jpg" />
```

Saiba mais sobre o uso de variantes na documentação de variantes.

