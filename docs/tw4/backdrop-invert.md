# backdrop-filter: invert()

As classes de `backdrop-invert` permitem controlar a inversão de cores do backdrop de um elemento usando a propriedade CSS `backdrop-filter: invert()`.

## Classes Disponíveis

| Classe | Propriedade CSS | Descrição |
|--------|----------------|-----------|
| `backdrop-invert` | `backdrop-filter: invert(100%);` | Inversão completa das cores |
| `backdrop-invert-<number>` | `backdrop-filter: invert(<number>%);` | Inversão com valor específico |
| `backdrop-invert-(<custom-property>)` | `backdrop-filter: invert(var(<custom-property>))` | Usando variável CSS |
| `backdrop-invert-[<value>]` | `backdrop-filter: invert(<value>);` | Valor completamente personalizado |

## Exemplos

### Exemplo Básico

Use utilitários como `backdrop-invert` e `backdrop-invert-65` para controlar a inversão de cores do backdrop de um elemento:

```html
<!-- Sem inversão -->
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-invert-0 ...">
    <!-- Conteúdo -->
  </div>
</div>

<!-- Inversão parcial (65%) -->
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-invert-65 ...">
    <!-- Conteúdo -->
  </div>
</div>

<!-- Inversão completa (100%) -->
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-invert ...">
    <!-- Conteúdo -->
  </div>
</div>
```

### Usando Valores Personalizados

Use a sintaxe `backdrop-invert-[<value>]` para definir a inversão do backdrop com base em um valor completamente personalizado:

```html
<div class="backdrop-invert-[.25] ...">
  <!-- Inversão de 25% -->
</div>
```

### Usando Variáveis CSS

Para variáveis CSS, você também pode usar a sintaxe `backdrop-invert-(<custom-property>)`:

```html
<div class="backdrop-invert-(--my-backdrop-inversion) ...">
  <!-- Usando variável CSS personalizada -->
</div>
```

Isso é apenas um atalho para `backdrop-invert-[var(<custom-property>)]` que adiciona a função `var()` automaticamente.

### Design Responsivo

Prefixe um utilitário `backdrop-filter: invert()` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e maiores:

```html
<div class="backdrop-invert-0 md:backdrop-invert ...">
  <!-- backdrop-invert-0 em telas pequenas, backdrop-invert em telas médias+ -->
</div>
```

## Notas Importantes

- A propriedade `backdrop-filter` funciona apenas em elementos com backdrop (elementos com transparência ou sobreposição)
- Nem todos os navegadores suportam `backdrop-filter` completamente
- Para melhor compatibilidade, considere usar fallbacks quando necessário

## Saiba Mais

Aprenda mais sobre o uso de variantes na [documentação de variantes](../variants.md).

