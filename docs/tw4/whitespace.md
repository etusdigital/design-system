# White Space

Utilitários para controlar o comportamento de quebra de linha e espaçamento em branco dos elementos.

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `whitespace-normal` | `white-space: normal;` |
| `whitespace-nowrap` | `white-space: nowrap;` |
| `whitespace-pre` | `white-space: pre;` |
| `whitespace-pre-line` | `white-space: pre-line;` |
| `whitespace-pre-wrap` | `white-space: pre-wrap;` |
| `whitespace-break-spaces` | `white-space: break-spaces;` |

## Exemplos

### Normal

Use a classe `whitespace-normal` para fazer com que o texto seja quebrado normalmente dentro de um elemento. Quebras de linha e espaços serão colapsados:

**Classe:** `whitespace-normal`

**Resultado visual:**
> Hey everyone! It's almost 2022 and we still don't know if there are aliens living among us, or do we? Maybe the person writing this is an alien. You will never know.

```html
<p class="whitespace-normal">
  Hey everyone!

  It's almost 2022       and we still don't know if there             are aliens living among us, or do we? Maybe the person writing this is an alien.

  You will never know.
</p>
```

### No Wrap

Use a classe `whitespace-nowrap` para impedir que o texto seja quebrado dentro de um elemento. Quebras de linha e espaços serão colapsados:

**Classe:** `whitespace-nowrap`

**Resultado visual:**
> Hey everyone! It's almost 2022 and we still don't know if there are aliens living among us, or do we? Maybe the person writing this is an alien. You will never know.

```html
<p class="overflow-auto whitespace-nowrap">
  Hey everyone!

  It's almost 2022       and we still don't know if there             are aliens living among us, or do we? Maybe the person writing this is an alien.

  You will never know.
</p>
```

### Pre

Use a classe `whitespace-pre` para preservar quebras de linha e espaços dentro de um elemento. O texto não será quebrado:

**Classe:** `whitespace-pre`

**Resultado visual:**
```
Hey everyone!

It's almost 2022       and we still don't know if there             are aliens living among us, or do we? Maybe the person writing this is an alien.

You will never know.
```

```html
<p class="overflow-auto whitespace-pre">
  Hey everyone!

  It's almost 2022       and we still don't know if there             are aliens living among us, or do we? Maybe the person writing this is an alien.

  You will never know.
</p>
```

### Pre Line

Use a classe `whitespace-pre-line` para preservar quebras de linha mas não espaços dentro de um elemento. O texto será quebrado normalmente:

**Classe:** `whitespace-pre-line`

**Resultado visual:**
> Hey everyone!
> 
> It's almost 2022 and we still don't know if there are aliens living among us, or do we? Maybe the person writing this is an alien.
> 
> You will never know.

```html
<p class="whitespace-pre-line">
  Hey everyone!

  It's almost 2022       and we still don't know if there             are aliens living among us, or do we? Maybe the person writing this is an alien.

  You will never know.
</p>
```

### Pre Wrap

Use a classe `whitespace-pre-wrap` para preservar quebras de linha e espaços dentro de um elemento. O texto será quebrado normalmente:

**Classe:** `whitespace-pre-wrap`

**Resultado visual:**
```
Hey everyone!

It's almost 2022       and we still don't know if there             are aliens living among us, or do we? Maybe the person writing this is an alien.

You will never know.
```

```html
<p class="whitespace-pre-wrap">
  Hey everyone!

  It's almost 2022       and we still don't know if there             are aliens living among us, or do we? Maybe the person writing this is an alien.

  You will never know.
</p>
```

### Break Spaces

Use a classe `whitespace-break-spaces` para preservar quebras de linha e espaços dentro de um elemento. Espaços em branco no final das linhas não irão "pendurar", mas serão quebrados para a próxima linha:

**Classe:** `whitespace-break-spaces`

**Resultado visual:**
```
Hey everyone!

It's almost 2022       and we still don't know if there             are aliens living among us, or do we? Maybe the person writing this is an alien.

You will never know.
```

```html
<p class="whitespace-break-spaces">
  Hey everyone!

  It's almost 2022       and we still don't know if there             are aliens living among us, or do we? Maybe the person writing this is an alien.

  You will never know.
</p>
```

## Design Responsivo

Prefixe uma classe de white-space com uma variante de breakpoint como `md:` para aplicar a classe apenas em tamanhos de tela médios e maiores:

```html
<p class="whitespace-pre md:whitespace-normal ...">
  Lorem ipsum dolor sit amet...
</p>
```

Saiba mais sobre o uso de variantes na [documentação de variantes](./variants.md).

