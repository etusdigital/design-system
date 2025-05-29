# Filter: hue-rotate()

O utilitário `hue-rotate` permite rotacionar a tonalidade (hue) de um elemento através de filtros CSS.

## Sintaxe

| Classe | Propriedade CSS | Descrição |
|--------|----------------|-----------|
| `hue-rotate-<number>` | `filter: hue-rotate(<number>deg);` | Rotaciona a tonalidade por graus positivos |
| `-hue-rotate-<number>` | `filter: hue-rotate(calc(<number>deg * -1));` | Rotaciona a tonalidade por graus negativos |
| `hue-rotate-(<custom-property>)` | `filter: hue-rotate(var(<custom-property>));` | Usa uma propriedade CSS customizada |
| `hue-rotate-[<value>]` | `filter: hue-rotate(<value>);` | Valor completamente customizado |

## Exemplos

### Exemplo básico

Use utilitários como `hue-rotate-90` e `hue-rotate-180` para rotacionar a tonalidade de um elemento por graus:

```html
<img class="hue-rotate-15" src="/img/mountains.jpg" />
<img class="hue-rotate-90" src="/img/mountains.jpg" />
<img class="hue-rotate-180" src="/img/mountains.jpg" />
<img class="hue-rotate-270" src="/img/mountains.jpg" />
```

**Resultado visual:**
- `hue-rotate-15` - Rotação leve de 15°
- `hue-rotate-90` - Rotação de 90°
- `hue-rotate-180` - Rotação de 180°
- `hue-rotate-270` - Rotação de 270°

### Usando valores negativos

Use utilitários como `-hue-rotate-15` e `-hue-rotate-45` para definir valores negativos de rotação:

```html
<img class="-hue-rotate-15" src="/img/mountains.jpg" />
<img class="-hue-rotate-45" src="/img/mountains.jpg" />
<img class="-hue-rotate-90" src="/img/mountains.jpg" />
```

### Usando valores customizados

Use a sintaxe `hue-rotate-[<value>]` para definir a rotação baseada em um valor completamente customizado:

```html
<img class="hue-rotate-[3.142rad]" src="/img/mountains.jpg" />
```

### Usando variáveis CSS

Para variáveis CSS, você também pode usar a sintaxe `hue-rotate-(<custom-property>)`:

```html
<img class="hue-rotate-(--my-hue-rotate)" src="/img/mountains.jpg" />
```

Isso é apenas um atalho para `hue-rotate-[var(<custom-property>)]` que adiciona a função `var()` automaticamente.

### Design responsivo

Prefixe um utilitário `hue-rotate` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios ou maiores:

```html
<img class="hue-rotate-60 md:hue-rotate-0" src="/img/mountains.jpg" />
```

Saiba mais sobre o uso de variantes na [documentação de variantes](https://tailwindcss.com/docs/responsive-design).

## Valores disponíveis

Os valores padrão disponíveis incluem:
- `0`, `15`, `30`, `60`, `90`, `180`, `270` graus
- Valores negativos correspondentes: `-15`, `-30`, `-60`, `-90`, `-180`, `-270`
- Valores customizados usando a sintaxe de colchetes `[valor]`

