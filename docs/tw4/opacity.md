# Opacity

O utilitário `opacity` permite controlar a transparência de um elemento.

## Sintaxe

- `opacity-<number>` - Define a opacidade como `opacity: <number>%;`
- `opacity-(<custom-property>)` - Define a opacidade usando `opacity: var(<custom-property>);`
- `opacity-[<value>]` - Define a opacidade com valor customizado `opacity: <value>;`

## Exemplos

### Exemplo básico

Use utilitários como `opacity-25` e `opacity-100` para definir a opacidade de um elemento:

**Classes disponíveis:** `opacity-0`, `opacity-25`, `opacity-50`, `opacity-75`, `opacity-100`

```html
<button class="bg-indigo-500 opacity-100">Opacidade 100%</button>
<button class="bg-indigo-500 opacity-75">Opacidade 75%</button>
<button class="bg-indigo-500 opacity-50">Opacidade 50%</button>
<button class="bg-indigo-500 opacity-25">Opacidade 25%</button>
```

### Aplicação condicional

Prefixe um utilitário de opacidade com uma variante como `disabled:` para aplicar apenas em determinado estado:

```html
<input class="opacity-100 disabled:opacity-75" type="text" />
```

Saiba mais sobre o uso de variantes na [documentação de variantes](../variants.md).

### Usando valores customizados

Use a sintaxe `opacity-[<value>]` para definir a opacidade baseada em um valor completamente customizado:

```html
<button class="opacity-[.67]">
  <!-- Conteúdo do botão -->
</button>
```

Para variáveis CSS, você também pode usar a sintaxe `opacity-(<custom-property>)`:

```html
<button class="opacity-(--my-opacity)">
  <!-- Conteúdo do botão -->
</button>
```

Esta é uma forma abreviada de `opacity-[var(<custom-property>)]` que adiciona a função `var()` automaticamente.

### Design responsivo

Prefixe um utilitário de opacidade com uma variante de breakpoint como `md:` para aplicar apenas em tamanhos de tela médios e acima:

```html
<button class="opacity-50 md:opacity-100">
  <!-- Conteúdo do botão -->
</button>
```

Saiba mais sobre o uso de variantes na [documentação de variantes](../variants.md).

## Valores padrão

| Classe | Propriedades CSS |
|--------|-----------------|
| `opacity-0` | `opacity: 0%;` |
| `opacity-25` | `opacity: 25%;` |
| `opacity-50` | `opacity: 50%;` |
| `opacity-75` | `opacity: 75%;` |
| `opacity-100` | `opacity: 100%;` |

