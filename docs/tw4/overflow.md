# Overflow

As classes de overflow do Tailwind CSS v4 controlam como o conteúdo que excede os limites de um elemento é tratado.

## Classes Disponíveis

### Overflow Geral

| Classe | Propriedade CSS |
|--------|----------------|
| `overflow-auto` | `overflow: auto;` |
| `overflow-hidden` | `overflow: hidden;` |
| `overflow-clip` | `overflow: clip;` |
| `overflow-visible` | `overflow: visible;` |
| `overflow-scroll` | `overflow: scroll;` |

### Overflow Horizontal (X)

| Classe | Propriedade CSS |
|--------|----------------|
| `overflow-x-auto` | `overflow-x: auto;` |
| `overflow-x-hidden` | `overflow-x: hidden;` |
| `overflow-x-clip` | `overflow-x: clip;` |
| `overflow-x-visible` | `overflow-x: visible;` |
| `overflow-x-scroll` | `overflow-x: scroll;` |

### Overflow Vertical (Y)

| Classe | Propriedade CSS |
|--------|----------------|
| `overflow-y-auto` | `overflow-y: auto;` |
| `overflow-y-hidden` | `overflow-y: hidden;` |
| `overflow-y-clip` | `overflow-y: clip;` |
| `overflow-y-visible` | `overflow-y: visible;` |
| `overflow-y-scroll` | `overflow-y: scroll;` |

## Exemplos de Uso

### Mostrando conteúdo que transborda

Use a classe `overflow-visible` para impedir que o conteúdo de um elemento seja cortado:

```html
<div class="overflow-visible ...">
  <!-- Conteúdo que pode transbordar -->
</div>
```

> **Nota:** Qualquer conteúdo que ultrapasse os limites do elemento será então visível.

### Ocultando conteúdo que transborda

Use a classe `overflow-hidden` para cortar qualquer conteúdo que transborde os limites do elemento:

```html
<div class="overflow-hidden ...">
  <!-- Conteúdo será cortado se transbordar -->
</div>
```

### Scroll quando necessário

Use a classe `overflow-auto` para adicionar barras de rolagem a um elemento quando seu conteúdo transbordar:

```html
<div class="overflow-auto ...">
  <!-- Conteúdo com scroll automático -->
</div>
```

> **Diferença:** Ao contrário de `overflow-scroll`, que sempre mostra barras de rolagem, esta classe só as mostra quando o scroll é necessário.

### Scroll horizontal quando necessário

Use a classe `overflow-x-auto` para permitir rolagem horizontal quando necessário:

```html
<div class="overflow-x-auto ...">
  <!-- Conteúdo com scroll horizontal automático -->
</div>
```

### Scroll vertical quando necessário

Use a classe `overflow-y-auto` para permitir rolagem vertical quando necessário:

```html
<div class="h-32 overflow-y-auto ...">
  <!-- Conteúdo com scroll vertical automático -->
</div>
```

### Scroll horizontal sempre

Use a classe `overflow-x-scroll` para permitir rolagem horizontal e sempre mostrar barras de rolagem (a menos que sejam desabilitadas pelo sistema operacional):

```html
<div class="overflow-x-scroll ...">
  <!-- Conteúdo com scroll horizontal sempre visível -->
</div>
```

### Scroll vertical sempre

Use a classe `overflow-y-scroll` para permitir rolagem vertical e sempre mostrar barras de rolagem (a menos que sejam desabilitadas pelo sistema operacional):

```html
<div class="overflow-y-scroll ...">
  <!-- Conteúdo com scroll vertical sempre visível -->
</div>
```

### Scroll em todas as direções

Use a classe `overflow-scroll` para adicionar barras de rolagem a um elemento:

```html
<div class="overflow-scroll ...">
  <!-- Conteúdo com scroll vertical e horizontal -->
</div>
```

> **Diferença:** Ao contrário de `overflow-auto`, que só mostra barras de rolagem se necessário, esta classe sempre as mostra. Note que alguns sistemas operacionais (como macOS) ocultam barras de rolagem desnecessárias independentemente desta configuração.

## Design Responsivo

Prefixe uma classe de overflow com uma variante de breakpoint como `md:` para aplicar a classe apenas em tamanhos de tela médios e acima:

```html
<div class="overflow-auto md:overflow-scroll ...">
  <!-- Overflow automático em mobile, scroll sempre em desktop -->
</div>
```

> Saiba mais sobre o uso de variantes na documentação de variantes.

