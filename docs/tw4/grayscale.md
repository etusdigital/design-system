# Filter: Grayscale

O filtro `grayscale` permite controlar o efeito de escala de cinza aplicado a um elemento.

## Classes disponíveis

| Classe | CSS | Descrição |
|--------|-----|-----------|
| `grayscale` | `filter: grayscale(100%);` | Aplica 100% de efeito grayscale |
| `grayscale-<number>` | `filter: grayscale(<number>%);` | Aplica uma porcentagem específica de grayscale |
| `grayscale-(<custom-property>)` | `filter: grayscale(var(<custom-property>));` | Usa uma variável CSS customizada |
| `grayscale-[<value>]` | `filter: grayscale(<value>);` | Permite valores arbitrários |

## Exemplos

### Exemplo básico

Use utilitários como `grayscale` e `grayscale-75` para controlar a quantidade de efeito grayscale aplicado a um elemento:

**Variações disponíveis:**
- `grayscale-0` - 0% de grayscale (sem efeito)
- `grayscale-25` - 25% de grayscale
- `grayscale-50` - 50% de grayscale  
- `grayscale` - 100% de grayscale (escala de cinza completa)

```html
<img class="grayscale-0 ..." src="/img/mountains.jpg" />
<img class="grayscale-25 ..." src="/img/mountains.jpg" />
<img class="grayscale-50 ..." src="/img/mountains.jpg" />
<img class="grayscale ..." src="/img/mountains.jpg" />
```

### Usando valores customizados

Use a sintaxe `grayscale-[<value>]` para definir o grayscale baseado em um valor completamente customizado:

```html
<img class="grayscale-[0.5] ..." src="/img/mountains.jpg" />
```

### Usando variáveis CSS

Para variáveis CSS, você também pode usar a sintaxe `grayscale-(<custom-property>)`:

```html
<img class="grayscale-(--my-grayscale) ..." src="/img/mountains.jpg" />
```

> **Nota:** Esta é apenas uma forma abreviada de `grayscale-[var(<custom-property>)]` que adiciona a função `var()` automaticamente para você.

### Design responsivo

Prefixe um utilitário `filter: grayscale()` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e superiores:

```html
<img class="grayscale md:grayscale-0 ..." src="/img/mountains.jpg" />
```

Para mais informações sobre o uso de variantes, consulte a [documentação de variantes](../variants.md).

## Compatibilidade

Este filtro é suportado por todos os navegadores modernos que suportam a propriedade CSS `filter`.

