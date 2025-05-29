# Backdrop Filter: Sepia

O filtro `backdrop-sepia` aplica um efeito sepia ao fundo de um elemento.

## Sintaxe

| Classe | Propriedade CSS |
|--------|----------------|
| `backdrop-sepia` | `backdrop-filter: sepia(100%);` |
| `backdrop-sepia-<number>` | `backdrop-filter: sepia(<number>%);` |
| `backdrop-sepia-(<custom-property>)` | `backdrop-filter: sepia(var(<custom-property>));` |
| `backdrop-sepia-[<value>]` | `backdrop-filter: sepia(<value>);` |

## Exemplos

### Exemplo básico

Use utilitários como `backdrop-sepia` e `backdrop-sepia-50` para controlar o efeito sepia aplicado ao fundo de um elemento:

```html
<!-- Sem efeito sepia -->
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-sepia-0 ..."></div>
</div>

<!-- Sepia moderado (50%) -->
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-sepia-50 ..."></div>
</div>

<!-- Sepia completo (100%) -->
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-sepia ..."></div>
</div>
```

**Valores disponíveis:**
- `backdrop-sepia-0` - Sem efeito sepia
- `backdrop-sepia-50` - Sepia de 50%
- `backdrop-sepia` - Sepia completo (100%)

### Usando valores customizados

Use a sintaxe `backdrop-sepia-[<value>]` para definir um valor completamente customizado para o backdrop sepia:

```html
<div class="backdrop-sepia-[.25] ...">
  <!-- Sepia de 25% -->
</div>
```

### Usando variáveis CSS

Para variáveis CSS, você pode usar a sintaxe `backdrop-sepia-(<custom-property>)`:

```html
<div class="backdrop-sepia-(--my-backdrop-sepia) ...">
  <!-- Usa a variável CSS --my-backdrop-sepia -->
</div>
```

Isto é uma forma abreviada de `backdrop-sepia-[var(<custom-property>)]` que adiciona a função `var()` automaticamente.

### Design responsivo

Prefixe um utilitário `backdrop-filter: sepia()` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e acima:

```html
<div class="backdrop-sepia md:backdrop-sepia-0 ...">
  <!-- Sepia em mobile, sem sepia em desktop -->
</div>
```

Saiba mais sobre o uso de variantes na [documentação de variantes](https://tailwindcss.com/docs/hover-focus-and-other-states).

