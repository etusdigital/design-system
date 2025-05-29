# Mix Blend Mode

Os utilitários de mix-blend-mode controlam como o conteúdo de um elemento se mistura com o elemento atrás dele.

## Utilitários Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `mix-blend-normal` | `mix-blend-mode: normal;` |
| `mix-blend-multiply` | `mix-blend-mode: multiply;` |
| `mix-blend-screen` | `mix-blend-mode: screen;` |
| `mix-blend-overlay` | `mix-blend-mode: overlay;` |
| `mix-blend-darken` | `mix-blend-mode: darken;` |
| `mix-blend-lighten` | `mix-blend-mode: lighten;` |
| `mix-blend-color-dodge` | `mix-blend-mode: color-dodge;` |
| `mix-blend-color-burn` | `mix-blend-mode: color-burn;` |
| `mix-blend-hard-light` | `mix-blend-mode: hard-light;` |
| `mix-blend-soft-light` | `mix-blend-mode: soft-light;` |
| `mix-blend-difference` | `mix-blend-mode: difference;` |
| `mix-blend-exclusion` | `mix-blend-mode: exclusion;` |
| `mix-blend-hue` | `mix-blend-mode: hue;` |
| `mix-blend-saturation` | `mix-blend-mode: saturation;` |
| `mix-blend-color` | `mix-blend-mode: color;` |
| `mix-blend-luminosity` | `mix-blend-mode: luminosity;` |
| `mix-blend-plus-darker` | `mix-blend-mode: plus-darker;` |
| `mix-blend-plus-lighter` | `mix-blend-mode: plus-lighter;` |

## Exemplos

### Exemplo Básico

Use utilitários como `mix-blend-overlay` e `mix-blend-soft-light` para controlar como o conteúdo de um elemento e seu fundo se misturam com outros conteúdos no mesmo contexto de empilhamento:

```html
<div class="flex justify-center -space-x-14">
  <div class="bg-blue-500 mix-blend-multiply ..."></div>
  <div class="bg-pink-500 mix-blend-multiply ..."></div>
</div>
```

### Isolando a Mistura

Use o utilitário `isolate` no elemento pai para criar um novo contexto de empilhamento e prevenir a mistura com conteúdo atrás dele:

```html
<!-- Com isolamento -->
<div class="isolate flex justify-center -space-x-14">
  <div class="bg-yellow-500 mix-blend-multiply ..."></div>
  <div class="bg-green-500 mix-blend-multiply ..."></div>
</div>

<!-- Sem isolamento -->
<div class="flex justify-center -space-x-14">
  <div class="bg-yellow-500 mix-blend-multiply ..."></div>
  <div class="bg-green-500 mix-blend-multiply ..."></div>
</div>
```

### Design Responsivo

Prefixe um utilitário de mix-blend-mode com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e acima:

```html
<div class="mix-blend-multiply md:mix-blend-overlay ...">
  <!-- ... -->
</div>
```

Saiba mais sobre o uso de variantes na documentação de variantes.

