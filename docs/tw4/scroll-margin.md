# Scroll Margin

As utilidades de `scroll-margin` controlam a margem de rolagem de um elemento.

## Classes Disponíveis

### Scroll Margin Geral

| Classe | Propriedade CSS |
|--------|----------------|
| `scroll-m-<number>` | `scroll-margin: calc(var(--spacing) * <number>);` |
| `-scroll-m-<number>` | `scroll-margin: calc(var(--spacing) * -<number>);` |
| `scroll-m-(<custom-property>)` | `scroll-margin: var(<custom-property>);` |
| `scroll-m-[<value>]` | `scroll-margin: <value>;` |

### Scroll Margin Horizontal (X)

| Classe | Propriedade CSS |
|--------|----------------|
| `scroll-mx-<number>` | `scroll-margin-inline: calc(var(--spacing) * <number>);` |
| `-scroll-mx-<number>` | `scroll-margin-inline: calc(var(--spacing) * -<number>);` |
| `scroll-mx-(<custom-property>)` | `scroll-margin-inline: var(<custom-property>);` |
| `scroll-mx-[<value>]` | `scroll-margin-inline: <value>;` |

### Scroll Margin Vertical (Y)

| Classe | Propriedade CSS |
|--------|----------------|
| `scroll-my-<number>` | `scroll-margin-block: calc(var(--spacing) * <number>);` |
| `-scroll-my-<number>` | `scroll-margin-block: calc(var(--spacing) * -<number>);` |
| `scroll-my-(<custom-property>)` | `scroll-margin-block: var(<custom-property>);` |
| `scroll-my-[<value>]` | `scroll-margin-block: <value>;` |

### Scroll Margin Start (Início)

| Classe | Propriedade CSS |
|--------|----------------|
| `scroll-ms-<number>` | `scroll-margin-inline-start: calc(var(--spacing) * <number>);` |
| `-scroll-ms-<number>` | `scroll-margin-inline-start: calc(var(--spacing) * -<number>);` |
| `scroll-ms-(<custom-property>)` | `scroll-margin-inline-start: var(<custom-property>);` |
| `scroll-ms-[<value>]` | `scroll-margin-inline-start: <value>;` |

### Scroll Margin End (Fim)

| Classe | Propriedade CSS |
|--------|----------------|
| `scroll-me-<number>` | `scroll-margin-inline-end: calc(var(--spacing) * <number>);` |
| `-scroll-me-<number>` | `scroll-margin-inline-end: calc(var(--spacing) * -<number>);` |
| `scroll-me-(<custom-property>)` | `scroll-margin-inline-end: var(<custom-property>);` |
| `scroll-me-[<value>]` | `scroll-margin-inline-end: <value>;` |

### Scroll Margin Top (Topo)

| Classe | Propriedade CSS |
|--------|----------------|
| `scroll-mt-<number>` | `scroll-margin-top: calc(var(--spacing) * <number>);` |
| `-scroll-mt-<number>` | `scroll-margin-top: calc(var(--spacing) * -<number>);` |
| `scroll-mt-(<custom-property>)` | `scroll-margin-top: var(<custom-property>);` |
| `scroll-mt-[<value>]` | `scroll-margin-top: <value>;` |

### Scroll Margin Right (Direita)

| Classe | Propriedade CSS |
|--------|----------------|
| `scroll-mr-<number>` | `scroll-margin-right: calc(var(--spacing) * <number>);` |
| `-scroll-mr-<number>` | `scroll-margin-right: calc(var(--spacing) * -<number>);` |
| `scroll-mr-(<custom-property>)` | `scroll-margin-right: var(<custom-property>);` |
| `scroll-mr-[<value>]` | `scroll-margin-right: <value>;` |

### Scroll Margin Bottom (Inferior)

| Classe | Propriedade CSS |
|--------|----------------|
| `scroll-mb-<number>` | `scroll-margin-bottom: calc(var(--spacing) * <number>);` |
| `-scroll-mb-<number>` | `scroll-margin-bottom: calc(var(--spacing) * -<number>);` |
| `scroll-mb-(<custom-property>)` | `scroll-margin-bottom: var(<custom-property>);` |
| `scroll-mb-[<value>]` | `scroll-margin-bottom: <value>;` |

### Scroll Margin Left (Esquerda)

| Classe | Propriedade CSS |
|--------|----------------|
| `scroll-ml-<number>` | `scroll-margin-left: calc(var(--spacing) * <number>);` |
| `-scroll-ml-<number>` | `scroll-margin-left: calc(var(--spacing) * -<number>);` |
| `scroll-ml-(<custom-property>)` | `scroll-margin-left: var(<custom-property>);` |
| `scroll-ml-[<value>]` | `scroll-margin-left: <value>;` |

## Exemplos

### Exemplo Básico

Use as utilidades `scroll-mt-<number>`, `scroll-mr-<number>`, `scroll-mb-<number>` e `scroll-ml-<number>` como `scroll-ml-4` e `scroll-mt-6` para definir o deslocamento de rolagem ao redor de itens dentro de um contêiner snap:

```html
<div class="snap-x ...">
  <div class="snap-start scroll-ml-6 ...">
    <img src="/img/vacation-01.jpg"/>
  </div>
  <div class="snap-start scroll-ml-6 ...">
    <img src="/img/vacation-02.jpg"/>
  </div>
  <div class="snap-start scroll-ml-6 ...">
    <img src="/img/vacation-03.jpg"/>
  </div>
  <div class="snap-start scroll-ml-6 ...">
    <img src="/img/vacation-04.jpg"/>
  </div>
  <div class="snap-start scroll-ml-6 ...">
    <img src="/img/vacation-05.jpg"/>
  </div>
</div>
```

*Role na grade de imagens para ver o comportamento esperado*

### Usando Valores Negativos

Para usar um valor negativo de scroll margin, prefixe o nome da classe com um traço para convertê-lo em um valor negativo:

```html
<div class="snap-start -scroll-ml-6 ...">
  <!-- ... -->
</div>
```

### Usando Propriedades Lógicas

Use as utilidades `scroll-ms-<number>` e `scroll-me-<number>` para definir as propriedades lógicas `scroll-margin-inline-start` e `scroll-margin-inline-end`, que mapeiam para o lado esquerdo ou direito baseado na direção do texto:

#### Exemplo com Left-to-right (Esquerda para Direita)

```html
<div dir="ltr">
  <div class="snap-x ...">
    <div class="snap-start scroll-ms-6 ...">
      <img src="/img/vacation-01.jpg"/>
    </div>
    <!-- ... -->
  </div>
</div>
```

#### Exemplo com Right-to-left (Direita para Esquerda)

```html
<div dir="rtl">
  <div class="snap-x ...">
    <div class="snap-start scroll-ms-6 ...">
      <img src="/img/vacation-01.jpg"/>
    </div>
    <!-- ... -->
  </div>
</div>
```

*Role na grade de imagens para ver o comportamento esperado*

Para mais controle, você também pode usar os modificadores LTR e RTL para aplicar condicionalmente estilos específicos dependendo da direção atual do texto.

### Usando um Valor Personalizado

Use utilidades como `scroll-ml-[<value>]` e `scroll-me-[<value>]` para definir a margem de rolagem baseada em um valor completamente personalizado:

```html
<div class="scroll-ml-[24rem] ...">
  <!-- ... -->
</div>
```

Para variáveis CSS, você também pode usar a sintaxe `scroll-ml-(<custom-property>)`:

```html
<div class="scroll-ml-(--my-scroll-margin) ...">
  <!-- ... -->
</div>
```

Isso é apenas uma abreviação para `scroll-ml-[var(<custom-property>)]` que adiciona a função `var()` para você automaticamente.

### Design Responsivo

Prefixe uma utilidade de scroll-margin com uma variante de breakpoint como `md:` para aplicar a utilidade apenas em tamanhos de tela médios e acima:

```html
<div class="scroll-m-8 md:scroll-m-0 ...">
  <!-- ... -->
</div>
```

Saiba mais sobre o uso de variantes na documentação de variantes.

## Customizando seu Tema

As utilidades `scroll-m-<number>`, `scroll-mx-<number>`, `scroll-my-<number>`, `scroll-ms-<number>`, `scroll-me-<number>`, `scroll-mt-<number>`, `scroll-mr-<number>`, `scroll-mb-<number>` e `scroll-ml-<number>` são controladas pela variável de tema `--spacing`, que pode ser customizada no seu próprio tema:

```css
@theme {
  --spacing: 1px;
}
```

Saiba mais sobre customizar a escala de espaçamento na documentação de variáveis de tema.

