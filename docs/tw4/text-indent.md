# Text Indent

Utilitários para controlar a indentação de texto em elementos de bloco.

## Classes Disponíveis

| Classe | Propriedade CSS | Descrição |
|--------|----------------|-----------|
| `indent-<number>` | `text-indent: calc(var(--spacing) * <number>)` | Indentação positiva |
| `-indent-<number>` | `text-indent: calc(var(--spacing) * -<number>)` | Indentação negativa |
| `indent-px` | `text-indent: 1px;` | Indentação de 1 pixel |
| `-indent-px` | `text-indent: -1px;` | Indentação negativa de 1 pixel |
| `indent-(<custom-property>)` | `text-indent: var(<custom-property>);` | Valor customizado via CSS variable |
| `indent-[<value>]` | `text-indent: <value>;` | Valor arbitrário |

## Exemplos

### Exemplo Básico

Use as classes `indent-<number>` como `indent-2` e `indent-8` para definir a quantidade de espaço vazio (indentação) mostrado antes do texto em um bloco:

```html
<p class="indent-2">
  So I started to walk into the water. I won't lie to you boys, I was terrified. 
  But I pressed on, and as I made my way past the breakers a strange calm came over me. 
  I don't know if it was divine intervention or the kinship of all living things 
  but I tell you Jerry at that moment, I was a marine biologist.
</p>

<p class="indent-8">
  So I started to walk into the water. I won't lie to you boys, I was terrified. 
  But I pressed on, and as I made my way past the breakers a strange calm came over me. 
  I don't know if it was divine intervention or the kinship of all living things 
  but I tell you Jerry at that moment, I was a marine biologist.
</p>
```

### Usando Valores Negativos

Para usar um valor de indentação negativo, prefixe o nome da classe com um traço para convertê-lo em um valor negativo:

```html
<p class="-indent-8">
  So I started to walk into the water. I won't lie to you boys, I was terrified. 
  But I pressed on, and as I made my way past the breakers a strange calm came over me. 
  I don't know if it was divine intervention or the kinship of all living things 
  but I tell you Jerry at that moment, I was a marine biologist.
</p>
```

### Usando Valores Customizados

Use a sintaxe `indent-[<value>]` para definir a indentação de texto baseada em um valor completamente customizado:

```html
<p class="indent-[50%]">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit...
</p>
```

Para variáveis CSS, você também pode usar a sintaxe `indent-(<custom-property>)`:

```html
<p class="indent-(--my-indentation)">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit...
</p>
```

Isso é apenas uma forma abreviada de `indent-[var(<custom-property>)]` que adiciona a função `var()` automaticamente para você.

### Design Responsivo

Prefixe um utilitário de text-indent com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e superiores:

```html
<p class="indent-4 md:indent-8">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit...
</p>
```

Saiba mais sobre o uso de variantes na documentação de variantes.

