# Letter Spacing

## Classes Disponíveis

| Classe | Propriedade CSS | Valor |
|--------|----------------|-------|
| `tracking-tighter` | `letter-spacing: var(--tracking-tighter)` | `-0.05em` |
| `tracking-tight` | `letter-spacing: var(--tracking-tight)` | `-0.025em` |
| `tracking-normal` | `letter-spacing: var(--tracking-normal)` | `0em` |
| `tracking-wide` | `letter-spacing: var(--tracking-wide)` | `0.025em` |
| `tracking-wider` | `letter-spacing: var(--tracking-wider)` | `0.05em` |
| `tracking-widest` | `letter-spacing: var(--tracking-widest)` | `0.1em` |
| `tracking-(<custom-property>)` | `letter-spacing: var(<custom-property>)` | - |
| `tracking-[<value>]` | `letter-spacing: <value>` | - |

## Exemplos

### Exemplo Básico

Use utilitários como `tracking-tight` e `tracking-wide` para definir o espaçamento entre letras de um elemento:

- `tracking-tight`: The quick brown fox jumps over the lazy dog.
- `tracking-normal`: The quick brown fox jumps over the lazy dog.
- `tracking-wide`: The quick brown fox jumps over the lazy dog.

```html
<p class="tracking-tight ...">The quick brown fox ...</p>
<p class="tracking-normal ...">The quick brown fox ...</p>
<p class="tracking-wide ...">The quick brown fox ...</p>
```

### Usando Valores Negativos

Usar valores negativos não faz muito sentido com a escala nomeada de letter spacing que o Tailwind inclui por padrão, mas se você personalizou sua escala para usar números, pode ser útil:

```css
@theme {
  --tracking-1: 0em;
  --tracking-2: 0.025em;
  --tracking-3: 0.05em;
  --tracking-4: 0.1em;
}
```

Para usar um valor negativo de letter spacing, prefixe o nome da classe com um traço para convertê-lo em um valor negativo:

```html
<p class="-tracking-2">The quick brown fox ...</p>
```

### Usando um Valor Customizado

Use a sintaxe `tracking-[<value>]` para definir o letter spacing baseado em um valor completamente customizado:

```html
<p class="tracking-[.25em] ...">
  Lorem ipsum dolor sit amet...
</p>
```

Para variáveis CSS, você também pode usar a sintaxe `tracking-(<custom-property>)`:

```html
<p class="tracking-(--my-tracking) ...">
  Lorem ipsum dolor sit amet...
</p>
```

Isso é apenas um atalho para `tracking-[var(<custom-property>)]` que adiciona a função `var()` automaticamente.

### Design Responsivo

Prefixe um utilitário de letter-spacing com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e acima:

```html
<p class="tracking-tight md:tracking-wide ...">
  Lorem ipsum dolor sit amet...
</p>
```

Saiba mais sobre o uso de variantes na documentação de variantes.

## Personalizando seu Tema

Use as variáveis de tema `--tracking-*` para personalizar os utilitários de letter spacing em seu projeto:

```css
@theme {
  --tracking-tightest: -0.075em;
}
```

Agora o utilitário `tracking-tightest` pode ser usado em sua marcação:

```html
<p class="tracking-tightest">
  Lorem ipsum dolor sit amet...
</p>
```

Saiba mais sobre personalização de tema na documentação de tema.

