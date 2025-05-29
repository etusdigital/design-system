# font-variant-numeric

Utilitários para controlar a variante numérica das fontes no Tailwind CSS v4.

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|-----------------|
| `normal-nums` | `font-variant-numeric: normal;` |
| `ordinal` | `font-variant-numeric: ordinal;` |
| `slashed-zero` | `font-variant-numeric: slashed-zero;` |
| `lining-nums` | `font-variant-numeric: lining-nums;` |
| `oldstyle-nums` | `font-variant-numeric: oldstyle-nums;` |
| `proportional-nums` | `font-variant-numeric: proportional-nums;` |
| `tabular-nums` | `font-variant-numeric: tabular-nums;` |
| `diagonal-fractions` | `font-variant-numeric: diagonal-fractions;` |
| `stacked-fractions` | `font-variant-numeric: stacked-fractions;` |

## Exemplos

### Usando glifos ordinais

Use a utilidade `ordinal` para habilitar glifos especiais para marcadores ordinais em fontes que os suportam:

**Exemplo:** `ordinal` → 1st

```html
<p class="ordinal">1st</p>
```

### Usando zeros com barra

Use a utilidade `slashed-zero` para forçar um zero com barra em fontes que os suportam:

**Exemplo:** `slashed-zero` → 0

```html
<p class="slashed-zero">0</p>
```

### Usando figuras de alinhamento

Use a utilidade `lining-nums` para usar glifos numéricos alinhados pela linha de base em fontes que os suportam:

**Exemplo:** `lining-nums` → 1234567890

```html
<p class="lining-nums">1234567890</p>
```

### Usando figuras oldstyle

Use a utilidade `oldstyle-nums` para usar glifos numéricos onde alguns números têm descendentes em fontes que os suportam:

**Exemplo:** `oldstyle-nums` → 1234567890

```html
<p class="oldstyle-nums">1234567890</p>
```

### Usando figuras proporcionais

Use a utilidade `proportional-nums` para usar glifos numéricos que têm larguras proporcionais em fontes que os suportam:

**Exemplo:** `proportional-nums`
- 12121
- 90909

```html
<p class="proportional-nums">12121</p>
<p class="proportional-nums">90909</p>
```

### Usando figuras tabulares

Use a utilidade `tabular-nums` para usar glifos numéricos que têm larguras uniformes/tabulares em fontes que os suportam:

**Exemplo:** `tabular-nums`
- 12121
- 90909

```html
<p class="tabular-nums">12121</p>
<p class="tabular-nums">90909</p>
```

### Usando frações diagonais

Use a utilidade `diagonal-fractions` para substituir números separados por barra com frações diagonais comuns em fontes que os suportam:

**Exemplo:** `diagonal-fractions` → 1/2 3/4 5/6

```html
<p class="diagonal-fractions">1/2 3/4 5/6</p>
```

### Usando frações empilhadas

Use a utilidade `stacked-fractions` para substituir números separados por barra com frações empilhadas comuns em fontes que os suportam:

**Exemplo:** `stacked-fractions` → 1/2 3/4 5/6

```html
<p class="stacked-fractions">1/2 3/4 5/6</p>
```

### Combinando múltiplas utilidades

As utilidades de `font-variant-numeric` são combináveis, então você pode habilitar múltiplas variantes combinando-as:

```html
<dl>
  <dt>Subtotal</dt>
  <dd class="text-right slashed-zero tabular-nums">$100.00</dd>
  <dt>Tax</dt>
  <dd class="text-right slashed-zero tabular-nums">$14.50</dd>
  <dt>Total</dt>
  <dd class="text-right slashed-zero tabular-nums">$114.50</dd>
</dl>
```

### Resetando variantes numéricas

Use a propriedade `normal-nums` para resetar variantes de fonte numéricas:

```html
<p class="slashed-zero tabular-nums md:normal-nums">
  <!-- conteúdo -->
</p>
```

### Design responsivo

Prefixe uma utilidade de `font-variant-numeric` com uma variante de breakpoint como `md:` para aplicar a utilidade apenas em tamanhos de tela médios e acima:

```html
<p class="proportional-nums md:tabular-nums">
  Lorem ipsum dolor sit amet...
</p>
```

Saiba mais sobre o uso de variantes na [documentação de variantes](../variants.md).

