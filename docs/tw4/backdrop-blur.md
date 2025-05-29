# backdrop-filter: blur()

## Classes Disponíveis

| Classe | CSS | Valor |
|--------|-----|-------|
| `backdrop-blur-xs` | `backdrop-filter: blur(var(--blur-xs))` | 4px |
| `backdrop-blur-sm` | `backdrop-filter: blur(var(--blur-sm))` | 8px |
| `backdrop-blur-md` | `backdrop-filter: blur(var(--blur-md))` | 12px |
| `backdrop-blur-lg` | `backdrop-filter: blur(var(--blur-lg))` | 16px |
| `backdrop-blur-xl` | `backdrop-filter: blur(var(--blur-xl))` | 24px |
| `backdrop-blur-2xl` | `backdrop-filter: blur(var(--blur-2xl))` | 40px |
| `backdrop-blur-3xl` | `backdrop-filter: blur(var(--blur-3xl))` | 64px |
| `backdrop-blur-none` | `backdrop-filter: ;` | - |
| `backdrop-blur-(<custom-property>)` | `backdrop-filter: blur(var(<custom-property>))` | Propriedade customizada |
| `backdrop-blur-[<value>]` | `backdrop-filter: blur(<value>)` | Valor arbitrário |

## Exemplos

### Exemplo básico

Use utilitários como `backdrop-blur-sm` e `backdrop-blur-lg` para controlar o blur de fundo de um elemento:

```html
<!-- backdrop-blur-none -->
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-blur-none ..."></div>
</div>

<!-- backdrop-blur-sm -->
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-blur-sm ..."></div>
</div>

<!-- backdrop-blur-md -->
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-blur-md ..."></div>
</div>
```

### Usando um valor customizado

Use a sintaxe `backdrop-blur-[<value>]` para definir o backdrop blur baseado em um valor completamente customizado:

```html
<div class="backdrop-blur-[2px] ...">
  <!-- ... -->
</div>
```

Para variáveis CSS, você também pode usar a sintaxe `backdrop-blur-(<custom-property>)`:

```html
<div class="backdrop-blur-(--my-backdrop-blur) ...">
  <!-- ... -->
</div>
```

Isso é apenas uma abreviação para `backdrop-blur-[var(<custom-property>)]` que adiciona a função `var()` automaticamente.

### Design responsivo

Prefixe um utilitário `backdrop-filter: blur()` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e acima:

```html
<div class="backdrop-blur-none md:backdrop-blur-lg ...">
  <!-- ... -->
</div>
```

Saiba mais sobre o uso de variantes na [documentação de variantes](../variants).

## Customizando seu tema

Use as variáveis de tema `--blur-*` para customizar os utilitários de backdrop blur em seu projeto:

```css
@theme {
  --blur-2xs: 2px;
}
```

Agora o utilitário `backdrop-blur-2xs` pode ser usado em seu markup:

```html
<div class="backdrop-blur-2xs">
  <!-- ... -->
</div>
```

Saiba mais sobre customização de tema na [documentação de tema](../theme).

