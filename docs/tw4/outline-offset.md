# Outline Offset

O utilitário `outline-offset` permite controlar o deslocamento do contorno de um elemento.

## Sintaxe

| Classe | Propriedade CSS | Descrição |
|--------|----------------|-----------|
| `outline-offset-<number>` | `outline-offset: <number>px;` | Define o deslocamento positivo |
| `-outline-offset-<number>` | `outline-offset: calc(<number>px * -1);` | Define o deslocamento negativo |
| `outline-offset-(<custom-property>)` | `outline-offset: var(<custom-property>);` | Usa uma propriedade customizada |
| `outline-offset-[<value>]` | `outline-offset: <value>;` | Valor arbitrário customizado |

## Exemplos

### Exemplo básico

Use utilitários como `outline-offset-2` e `outline-offset-4` para alterar o deslocamento do contorno de um elemento:

```html
<button class="outline-2 outline-offset-0 ...">Button A</button>
<button class="outline-2 outline-offset-2 ...">Button B</button>
<button class="outline-2 outline-offset-4 ...">Button C</button>
```

**Resultado visual:**
- `outline-offset-0` - Sem deslocamento
- `outline-offset-2` - Deslocamento de 2px
- `outline-offset-4` - Deslocamento de 4px

### Usando um valor customizado

Use a sintaxe `outline-offset-[<value>]` para definir o deslocamento do contorno baseado em um valor completamente customizado:

```html
<div class="outline-offset-[2vw] ...">
  <!-- ... -->
</div>
```

### Usando variáveis CSS

Para variáveis CSS, você também pode usar a sintaxe `outline-offset-(<custom-property>)`:

```html
<div class="outline-offset-(--my-outline-offset) ...">
  <!-- ... -->
</div>
```

> **Nota:** Esta é apenas uma forma abreviada de `outline-offset-[var(<custom-property>)]` que adiciona a função `var()` automaticamente para você.

### Design responsivo

Prefixe um utilitário outline-offset com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios ou maiores:

```html
<div class="outline md:outline-offset-2 ...">
  <!-- ... -->
</div>
```

> 📚 Saiba mais sobre o uso de variantes na [documentação de variantes](../variants.md).

