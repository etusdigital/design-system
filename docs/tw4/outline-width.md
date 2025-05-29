# outline-width

Utilitários para controlar a largura do contorno de um elemento.

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `outline` | `outline-width: 1px;` |
| `outline-<number>` | `outline-width: <number>px;` |
| `outline-(length:<custom-property>)` | `outline-width: var(<custom-property>);` |
| `outline-[<value>]` | `outline-width: <value>;` |

## Exemplos

### Exemplo Básico

Use as classes `outline` ou `outline-<number>` como `outline-2` e `outline-4` para definir a largura do contorno de um elemento:

**Classes:** `outline`, `outline-2`, `outline-4`

```html
<button class="outline outline-offset-2 ...">Button A</button>
<button class="outline-2 outline-offset-2 ...">Button B</button>
<button class="outline-4 outline-offset-2 ...">Button C</button>
```

### Aplicando no Focus

Prefixe uma classe de `outline-width` com uma variante como `focus:*` para aplicar a classe apenas nesse estado:

**Foque no botão para ver o contorno adicionado**

```html
<button class="outline-offset-2 outline-sky-500 focus:outline-2 ...">
  Save Changes
</button>
```

Saiba mais sobre o uso de variantes na [documentação de variantes](../variants.md).

### Usando um Valor Customizado

Use a sintaxe `outline-[<value>]` para definir a largura do contorno baseada em um valor completamente customizado:

```html
<div class="outline-[2vw] ...">
  <!-- ... -->
</div>
```

Para variáveis CSS, você também pode usar a sintaxe `outline-(length:<custom-property>)`:

```html
<div class="outline-(length:--my-outline-width) ...">
  <!-- ... -->
</div>
```

Isso é apenas uma abreviação para `outline-[length:var(<custom-property>)]` que adiciona a função `var()` automaticamente para você.

### Design Responsivo

Prefixe uma classe de `outline-width` com uma variante de breakpoint como `md:` para aplicar a classe apenas em tamanhos de tela médios e maiores:

```html
<div class="outline md:outline-2 ...">
  <!-- ... -->
</div>
```

Saiba mais sobre o uso de variantes na [documentação de variantes](../variants.md).

