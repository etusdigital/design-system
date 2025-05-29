# Filter: Contrast()

## Visão Geral

A propriedade `filter: contrast()` permite controlar o contraste de um elemento usando utilitários do Tailwind CSS v4.

## Sintaxe

| Classe | Propriedade CSS | Descrição |
|--------|----------------|-----------|
| `contrast-<number>` | `filter: contrast(<number>%);` | Define o contraste com valor pré-definido |
| `contrast-(<custom-property>)` | `filter: contrast(var(<custom-property>));` | Usa uma propriedade CSS customizada |
| `contrast-[<value>]` | `filter: contrast(<value>);` | Define contraste com valor arbitrário |

## Exemplos

### Exemplo Básico

Use utilitários como `contrast-50` e `contrast-100` para controlar o contraste de um elemento:

```html
<img class="contrast-50" src="/img/mountains.jpg" />
<img class="contrast-100" src="/img/mountains.jpg" />
<img class="contrast-125" src="/img/mountains.jpg" />
<img class="contrast-200" src="/img/mountains.jpg" />
```

**Resultado visual:**
- `contrast-50` - Contraste reduzido (50%)
- `contrast-100` - Contraste normal (100%)
- `contrast-125` - Contraste aumentado (125%)
- `contrast-200` - Contraste muito aumentado (200%)

### Usando Valores Personalizados

Use a sintaxe `contrast-[<value>]` para definir o contraste baseado em um valor completamente personalizado:

```html
<img class="contrast-[.25]" src="/img/mountains.jpg" />
```

### Usando Variáveis CSS

Para variáveis CSS, você também pode usar a sintaxe `contrast-(<custom-property>)`:

```html
<img class="contrast-(--my-contrast)" src="/img/mountains.jpg" />
```

> **Nota:** Esta é apenas uma forma abreviada de `contrast-[var(--my-contrast)]` que adiciona a função `var()` automaticamente para você.

### Design Responsivo

Prefixe um utilitário `filter: contrast()` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e acima:

```html
<img class="contrast-125 md:contrast-150" src="/img/mountains.jpg" />
```

Saiba mais sobre o uso de variantes na [documentação de variantes](../variants).

## Valores Disponíveis

| Classe | Valor de Contraste |
|--------|-------------------|
| `contrast-0` | 0% |
| `contrast-50` | 50% |
| `contrast-75` | 75% |
| `contrast-100` | 100% (padrão) |
| `contrast-125` | 125% |
| `contrast-150` | 150% |
| `contrast-200` | 200% |

