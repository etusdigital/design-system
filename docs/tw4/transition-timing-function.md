# Transition Timing Function

As classes utilitárias de `transition-timing-function` permitem controlar a curva de aceleração das transições CSS em seus elementos.

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `ease-linear` | `transition-timing-function: linear;` |
| `ease-in` | `transition-timing-function: var(--ease-in);` <br/> `/* cubic-bezier(0.4, 0, 1, 1) */` |
| `ease-out` | `transition-timing-function: var(--ease-out);` <br/> `/* cubic-bezier(0, 0, 0.2, 1) */` |
| `ease-in-out` | `transition-timing-function: var(--ease-in-out);` <br/> `/* cubic-bezier(0.4, 0, 0.2, 1) */` |
| `ease-initial` | `transition-timing-function: initial;` |
| `ease-(<custom-property>)` | `transition-timing-function: var(<custom-property>);` |
| `ease-[<value>]` | `transition-timing-function: <value>;` |

## Exemplos

### Exemplo Básico

Use utilitários como `ease-in` e `ease-out` para controlar a curva de aceleração da transição de um elemento:

> **Dica:** Passe o mouse sobre cada botão para ver o comportamento esperado

```html
<button class="duration-300 ease-in ...">Button A</button>
<button class="duration-300 ease-out ...">Button B</button>
<button class="duration-300 ease-in-out ...">Button C</button>
```

### Usando um Valor Personalizado

Use a sintaxe `ease-[<value>]` para definir a função de temporização da transição baseada em um valor completamente personalizado:

```html
<button class="ease-[cubic-bezier(0.95,0.05,0.795,0.035)] ...">
  <!-- ... -->
</button>
```

Para variáveis CSS, você também pode usar a sintaxe `ease-(<custom-property>)`:

```html
<button class="ease-(--my-ease) ...">
  <!-- ... -->
</button>
```

Esta é apenas uma forma abreviada para `ease-[var(<custom-property>)]` que adiciona a função `var()` automaticamente para você.

### Design Responsivo

Prefixe um utilitário de `transition-timing-function` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e maiores:

```html
<button class="ease-out md:ease-in ...">
  <!-- ... -->
</button>
```

Saiba mais sobre o uso de variantes na [documentação de variantes](../variants).

## Personalizando seu Tema

Use as variáveis de tema `--ease-*` para personalizar os utilitários de função de temporização de transição em seu projeto:

```css
@theme {
  --ease-in-expo: cubic-bezier(0.95, 0.05, 0.795, 0.035);
}
```

Agora o utilitário `ease-in-expo` pode ser usado em sua marcação:

```html
<button class="ease-in-expo">
  <!-- ... -->
</button>
```

Saiba mais sobre personalização de tema na [documentação de tema](../theme).

