# transition-delay

O utilitário `transition-delay` permite controlar o atraso antes do início de uma transição CSS.

## Sintaxe

| Classe | Propriedade CSS | Descrição |
|--------|----------------|-----------|
| `delay-<number>` | `transition-delay: <number>ms;` | Define o atraso em milissegundos |
| `delay-(<custom-property>)` | `transition-delay: var(<custom-property>);` | Usa uma propriedade CSS customizada |
| `delay-[<value>]` | `transition-delay: <value>;` | Define um valor customizado arbitrário |

## Exemplos

### Exemplo básico

Use utilitários como `delay-150` e `delay-700` para definir o atraso de transição de um elemento em milissegundos:

**Classes disponíveis:**
- `delay-150` - Atraso de 150ms
- `delay-300` - Atraso de 300ms  
- `delay-700` - Atraso de 700ms

**Demonstração:** Passe o mouse sobre cada botão para ver o comportamento esperado

```html
<button class="transition delay-150 duration-300 ease-in-out ...">
  Botão A (150ms)
</button>

<button class="transition delay-300 duration-300 ease-in-out ...">
  Botão B (300ms)
</button>

<button class="transition delay-700 duration-300 ease-in-out ...">
  Botão C (700ms)
</button>
```

### Usando um valor customizado

Use a sintaxe `delay-[<value>]` para definir o atraso de transição baseado em um valor completamente customizado:

```html
<button class="delay-[1s,250ms] ...">
  <!-- Múltiplos valores de atraso -->
</button>
```

### Usando variáveis CSS

Para variáveis CSS, você também pode usar a sintaxe `delay-(<custom-property>)`:

```html
<button class="delay-(--my-delay) ...">
  <!-- Usa var(--my-delay) automaticamente -->
</button>
```

> **Nota:** Esta é uma forma abreviada de `delay-[var(<custom-property>)]` que adiciona a função `var()` automaticamente.

### Design responsivo

Prefixe um utilitário de `transition-delay` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e maiores:

```html
<button class="delay-150 md:delay-300 ...">
  <!-- 150ms por padrão, 300ms em telas médias+ -->
</button>
```

---

**Saiba mais:** Consulte a documentação de variantes para aprender mais sobre o uso de variantes responsivas.

