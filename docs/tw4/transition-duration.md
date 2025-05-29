# transition-duration

As classes de duração de transição no Tailwind CSS v4 permitem controlar o tempo de duração das animações de transição nos elementos.

## Sintaxe

| Classe | Propriedade CSS |
|--------|----------------|
| `duration-<number>` | `transition-duration: <number>ms;` |
| `duration-initial` | `transition-duration: initial;` |
| `duration-(<custom-property>)` | `transition-duration: var(<custom-property>);` |
| `duration-[<value>]` | `transition-duration: <value>;` |

## Exemplos

### Exemplo básico

Use utilitários como `duration-150` e `duration-700` para definir a duração da transição de um elemento em milissegundos:

**Demonstração visual:**
- `duration-150` - Transição rápida
- `duration-300` - Transição média
- `duration-700` - Transição lenta

Passe o mouse sobre cada botão para ver o comportamento esperado:

```html
<button class="transition duration-150 ease-in-out ...">Button A</button>
<button class="transition duration-300 ease-in-out ...">Button B</button>
<button class="transition duration-700 ease-in-out ...">Button C</button>
```

### Usando valores customizados

Use a sintaxe `duration-[<value>]` para definir a duração da transição baseada em um valor completamente customizado:

```html
<button class="duration-[1s,15s] ...">
  <!-- ... -->
</button>
```

Para variáveis CSS, você também pode usar a sintaxe `duration-(<custom-property>)`:

```html
<button class="duration-(--my-duration) ...">
  <!-- ... -->
</button>
```

Esta é apenas uma forma abreviada de `duration-[var(<custom-property>)]` que adiciona a função `var()` automaticamente para você.

### Design responsivo

Prefixe um utilitário de duração de transição com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e acima:

```html
<button class="duration-0 md:duration-150 ...">
  <!-- ... -->
</button>
```

Aprenda mais sobre o uso de variantes na [documentação de variantes](../variants.md).

## Valores padrão disponíveis

| Classe | Valor |
|--------|-------|
| `duration-0` | 0ms |
| `duration-75` | 75ms |
| `duration-100` | 100ms |
| `duration-150` | 150ms |
| `duration-200` | 200ms |
| `duration-300` | 300ms |
| `duration-500` | 500ms |
| `duration-700` | 700ms |
| `duration-1000` | 1000ms |
