# scroll-padding

## Utilitários Disponíveis

### scroll-padding (todas as direções)

| Classe | CSS | Classe Negativa | CSS Negativo |
|--------|-----|----------------|--------------|
| `scroll-p-<number>` | `scroll-padding: calc(var(--spacing) * <number>);` | `-scroll-p-<number>` | `scroll-padding: calc(var(--spacing) * -<number>);` |
| `scroll-p-(<custom-property>)` | `scroll-padding: var(<custom-property>);` | | |
| `scroll-p-[<value>]` | `scroll-padding: <value>;` | | |

### scroll-padding-inline (horizontal)

| Classe | CSS | Classe Negativa | CSS Negativo |
|--------|-----|----------------|--------------|
| `scroll-px-<number>` | `scroll-padding-inline: calc(var(--spacing) * <number>);` | `-scroll-px-<number>` | `scroll-padding-inline: calc(var(--spacing) * -<number>);` |
| `scroll-px-(<custom-property>)` | `scroll-padding-inline: var(<custom-property>);` | | |
| `scroll-px-[<value>]` | `scroll-padding-inline: <value>;` | | |

### scroll-padding-block (vertical)

| Classe | CSS | Classe Negativa | CSS Negativo |
|--------|-----|----------------|--------------|
| `scroll-py-<number>` | `scroll-padding-block: calc(var(--spacing) * <number>);` | `-scroll-py-<number>` | `scroll-padding-block: calc(var(--spacing) * -<number>);` |
| `scroll-py-(<custom-property>)` | `scroll-padding-block: var(<custom-property>);` | | |
| `scroll-py-[<value>]` | `scroll-padding-block: <value>;` | | |

### scroll-padding-inline-start

| Classe | CSS | Classe Negativa | CSS Negativo |
|--------|-----|----------------|--------------|
| `scroll-ps-<number>` | `scroll-padding-inline-start: calc(var(--spacing) * <number>);` | `-scroll-ps-<number>` | `scroll-padding-inline-start: calc(var(--spacing) * -<number>);` |
| `scroll-ps-(<custom-property>)` | `scroll-padding-inline-start: var(<custom-property>);` | | |
| `scroll-ps-[<value>]` | `scroll-padding-inline-start: <value>;` | | |

### scroll-padding-inline-end

| Classe | CSS | Classe Negativa | CSS Negativo |
|--------|-----|----------------|--------------|
| `scroll-pe-<number>` | `scroll-padding-inline-end: calc(var(--spacing) * <number>);` | `-scroll-pe-<number>` | `scroll-padding-inline-end: calc(var(--spacing) * -<number>);` |
| `scroll-pe-(<custom-property>)` | `scroll-padding-inline-end: var(<custom-property>);` | | |
| `scroll-pe-[<value>]` | `scroll-padding-inline-end: <value>;` | | |

### scroll-padding-top

| Classe | CSS | Classe Negativa | CSS Negativo |
|--------|-----|----------------|--------------|
| `scroll-pt-<number>` | `scroll-padding-top: calc(var(--spacing) * <number>);` | `-scroll-pt-<number>` | `scroll-padding-top: calc(var(--spacing) * -<number>);` |
| `scroll-pt-(<custom-property>)` | `scroll-padding-top: var(<custom-property>);` | | |
| `scroll-pt-[<value>]` | `scroll-padding-top: <value>;` | | |

### scroll-padding-right

| Classe | CSS | Classe Negativa | CSS Negativo |
|--------|-----|----------------|--------------|
| `scroll-pr-<number>` | `scroll-padding-right: calc(var(--spacing) * <number>);` | `-scroll-pr-<number>` | `scroll-padding-right: calc(var(--spacing) * -<number>);` |
| `scroll-pr-(<custom-property>)` | `scroll-padding-right: var(<custom-property>);` | | |
| `scroll-pr-[<value>]` | `scroll-padding-right: <value>;` | | |

### scroll-padding-bottom

| Classe | CSS | Classe Negativa | CSS Negativo |
|--------|-----|----------------|--------------|
| `scroll-pb-<number>` | `scroll-padding-bottom: calc(var(--spacing) * <number>);` | `-scroll-pb-<number>` | `scroll-padding-bottom: calc(var(--spacing) * -<number>);` |
| `scroll-pb-(<custom-property>)` | `scroll-padding-bottom: var(<custom-property>);` | | |
| `scroll-pb-[<value>]` | `scroll-padding-bottom: <value>;` | | |

### scroll-padding-left

| Classe | CSS | Classe Negativa | CSS Negativo |
|--------|-----|----------------|--------------|
| `scroll-pl-<number>` | `scroll-padding-left: calc(var(--spacing) * <number>);` | `-scroll-pl-<number>` | `scroll-padding-left: calc(var(--spacing) * -<number>);` |
| `scroll-pl-(<custom-property>)` | `scroll-padding-left: var(<custom-property>);` | | |
| `scroll-pl-[<value>]` | `scroll-padding-left: <value>;` | | |

## Exemplos

### Exemplo básico

Use os utilitários `scroll-pt-<number>`, `scroll-pr-<number>`, `scroll-pb-<number>` e `scroll-pl-<number>` como `scroll-pl-4` e `scroll-pt-6` para definir o offset de scroll de um elemento dentro de um container snap:

*Role na grade de imagens para ver o comportamento esperado*

```html
<div class="snap-x scroll-pl-6 ...">
  <div class="snap-start ...">
    <img src="/img/vacation-01.jpg" />
  </div>
  <div class="snap-start ...">
    <img src="/img/vacation-02.jpg" />
  </div>
  <div class="snap-start ...">
    <img src="/img/vacation-03.jpg" />
  </div>
  <div class="snap-start ...">
    <img src="/img/vacation-04.jpg" />
  </div>
  <div class="snap-start ...">
    <img src="/img/vacation-05.jpg" />
  </div>
</div>
```

### Usando propriedades lógicas

Use os utilitários `scroll-ps-<number>` e `scroll-pe-<number>` para definir as propriedades lógicas `scroll-padding-inline-start` e `scroll-padding-inline-end`, que mapeiam para o lado esquerdo ou direito baseado na direção do texto:

*Role na grade de imagens para ver o comportamento esperado*

**Esquerda para direita:**

```html
<div dir="ltr">
  <div class="snap-x scroll-ps-6 ...">
    <!-- ... -->
  </div>
</div>
```

**Direita para esquerda:**

```html
<div dir="rtl">
  <div class="snap-x scroll-ps-6 ...">
    <!-- ... -->
  </div>
</div>
```

### Usando valores negativos

Para usar um valor negativo de scroll padding, prefixe o nome da classe com um traço para convertê-lo em um valor negativo:

```html
<div class="-scroll-ps-6 snap-x ...">
  <!-- ... -->
</div>
```

### Usando um valor customizado

Use utilitários como `scroll-pl-[<value>]` e `scroll-pe-[<value>]` para definir o scroll padding baseado em um valor completamente customizado:

```html
<div class="scroll-pl-[24rem] ...">
  <!-- ... -->
</div>
```

Para variáveis CSS, você também pode usar a sintaxe `scroll-pl-(<custom-property>)`:

```html
<div class="scroll-pl-(--my-scroll-padding) ...">
  <!-- ... -->
</div>
```

Isso é apenas uma abreviação para `scroll-pl-[var(<custom-property>)]` que adiciona a função `var()` automaticamente para você.

### Design responsivo

Prefixe um utilitário de scroll-padding com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e acima:

```html
<div class="scroll-p-8 md:scroll-p-0 ...">
  <!-- ... -->
</div>
```

Saiba mais sobre o uso de variantes na documentação de variantes.

## Customizando seu tema

Os utilitários `scroll-p-<number>`, `scroll-px-<number>`, `scroll-py-<number>`, `scroll-ps-<number>`, `scroll-pe-<number>`, `scroll-pt-<number>`, `scroll-pr-<number>`, `scroll-pb-<number>` e `scroll-pl-<number>` são controlados pela variável de tema `--spacing`, que pode ser customizada em seu próprio tema:

```css
@theme {
  --spacing: 1px;
}
```

Saiba mais sobre customizar a escala de espaçamento na documentação de variáveis de tema.

