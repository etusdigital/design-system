# Backdrop Filter: Grayscale

O utilitário `backdrop-grayscale` aplica um filtro de escala de cinza ao backdrop de um elemento.

## Sintaxe

| Classe | CSS |
|--------|-----|
| `backdrop-grayscale` | `backdrop-filter: grayscale(100%);` |
| `backdrop-grayscale-<number>` | `backdrop-filter: grayscale(<number>%);` |
| `backdrop-grayscale-(<custom-property>)` | `backdrop-filter: grayscale(var(<custom-property>));` |
| `backdrop-grayscale-[<value>]` | `backdrop-filter: grayscale(<value>);` |

## Exemplos

### Exemplo básico

Use utilitários como `backdrop-grayscale-50` e `backdrop-grayscale` para controlar o efeito de escala de cinza aplicado ao backdrop de um elemento:

```html
<!-- Sem filtro de escala de cinza -->
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-grayscale-0 ..."></div>
</div>

<!-- 50% de filtro de escala de cinza -->
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-grayscale-50 ..."></div>
</div>

<!-- 100% de filtro de escala de cinza (completo) -->
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-grayscale ..."></div>
</div>
```

**Resultado visual:**
- `backdrop-grayscale-0`: Sem efeito de escala de cinza
- `backdrop-grayscale-50`: Efeito de escala de cinza moderado
- `backdrop-grayscale`: Efeito de escala de cinza completo

### Usando um valor customizado

Use a sintaxe `backdrop-grayscale-[<value>]` para definir a escala de cinza do backdrop com base em um valor completamente customizado:

```html
<div class="backdrop-grayscale-[0.5] ...">
  <!-- Aplica 50% de escala de cinza -->
</div>
```

### Usando variáveis CSS

Para variáveis CSS, você também pode usar a sintaxe `backdrop-grayscale-(<custom-property>)`:

```html
<div class="backdrop-grayscale-(--my-backdrop-grayscale) ...">
  <!-- Usa a variável CSS --my-backdrop-grayscale -->
</div>
```

Isso é apenas uma forma abreviada de `backdrop-grayscale-[var(<custom-property>)]` que adiciona a função `var()` automaticamente para você.

### Design responsivo

Prefixe um utilitário `backdrop-filter: grayscale()` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e acima:

```html
<div class="backdrop-grayscale md:backdrop-grayscale-0 ...">
  <!-- Aplica escala de cinza em telas pequenas, remove em telas médias+ -->
</div>
```

## Valores padrão disponíveis

- `backdrop-grayscale-0`: 0% (sem efeito)
- `backdrop-grayscale-50`: 50% 
- `backdrop-grayscale`: 100% (efeito completo)

## Saiba mais

Aprenda mais sobre o uso de variantes na [documentação de variantes](../variants/).

