# User Select

Utilitários para controlar o comportamento de seleção de texto pelo usuário.

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `select-none` | `user-select: none;` |
| `select-text` | `user-select: text;` |
| `select-all` | `user-select: all;` |
| `select-auto` | `user-select: auto;` |

## Exemplos

### Desabilitando seleção de texto

Use a classe `select-none` para impedir a seleção de texto em um elemento e seus filhos:

**Exemplo:** `select-none`

*Tente selecionar o texto para ver o comportamento esperado*

```html
<div class="select-none">
  The quick brown fox jumps over the lazy dog.
</div>
```

### Permitindo seleção de texto

Use a classe `select-text` para permitir a seleção de texto em um elemento e seus filhos:

**Exemplo:** `select-text`

*Tente selecionar o texto para ver o comportamento esperado*

```html
<div class="select-text">
  The quick brown fox jumps over the lazy dog.
</div>
```

### Selecionando todo o texto em um clique

Use a classe `select-all` para selecionar automaticamente todo o texto em um elemento quando o usuário clicar:

**Exemplo:** `select-all`

*Tente clicar no texto para ver o comportamento esperado*

```html
<div class="select-all">
  The quick brown fox jumps over the lazy dog.
</div>
```

### Usando comportamento automático de seleção

Use a classe `select-auto` para usar o comportamento padrão do navegador para seleção de texto:

**Exemplo:** `select-auto`

*Tente selecionar o texto para ver o comportamento esperado*

```html
<div class="select-auto">
  The quick brown fox jumps over the lazy dog.
</div>
```

## Design Responsivo

Prefixe uma classe de user-select com uma variante de breakpoint como `md:` para aplicar a classe apenas em tamanhos de tela médios e acima:

```html
<div class="select-none md:select-all">
  <!-- Conteúdo -->
</div>
```

Saiba mais sobre o uso de variantes na [documentação de variantes](https://tailwindcss.com/docs/hover-focus-and-other-states).

