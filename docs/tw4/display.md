# Display

As classes de display controlam como um elemento é exibido na tela.

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|-----------------|
| `inline` | `display: inline;` |
| `block` | `display: block;` |
| `inline-block` | `display: inline-block;` |
| `flow-root` | `display: flow-root;` |
| `flex` | `display: flex;` |
| `inline-flex` | `display: inline-flex;` |
| `grid` | `display: grid;` |
| `inline-grid` | `display: inline-grid;` |
| `contents` | `display: contents;` |
| `table` | `display: table;` |
| `inline-table` | `display: inline-table;` |
| `table-caption` | `display: table-caption;` |
| `table-cell` | `display: table-cell;` |
| `table-column` | `display: table-column;` |
| `table-column-group` | `display: table-column-group;` |
| `table-footer-group` | `display: table-footer-group;` |
| `table-header-group` | `display: table-header-group;` |
| `table-row-group` | `display: table-row-group;` |
| `table-row` | `display: table-row;` |
| `list-item` | `display: list-item;` |
| `hidden` | `display: none;` |

## Classes Especiais de Acessibilidade

| Classe | Propriedades CSS |
|--------|------------------|
| `sr-only` | `position: absolute;`<br/>`width: 1px;`<br/>`height: 1px;`<br/>`padding: 0;`<br/>`margin: -1px;`<br/>`overflow: hidden;`<br/>`clip: rect(0, 0, 0, 0);`<br/>`white-space: nowrap;`<br/>`border-width: 0;` |
| `not-sr-only` | `position: static;`<br/>`width: auto;`<br/>`height: auto;`<br/>`padding: 0;`<br/>`margin: 0;`<br/>`overflow: visible;`<br/>`clip: auto;`<br/>`white-space: normal;` |

## Exemplos

### Block e Inline

Use as classes `inline`, `inline-block` e `block` para controlar o fluxo de texto e elementos:

```html
<p>
  Ao controlar o fluxo de texto, usar a propriedade CSS 
  <span class="inline">display: inline</span> fará com que o texto 
  dentro do elemento quebre normalmente.
</p>

<p>
  Enquanto usar a propriedade 
  <span class="inline-block">display: inline-block</span> 
  envolverá o elemento para evitar que o texto dentro se estenda 
  além de seu pai.
</p>

<p>
  Por último, usar a propriedade 
  <span class="block">display: block</span> colocará o elemento 
  em sua própria linha e preencherá seu pai.
</p>
```

### Flow Root

Use a classe `flow-root` para criar um elemento de nível de bloco com seu próprio contexto de formatação de bloco:

```html
<div class="p-4">
  <div class="flow-root ...">
    <div class="my-4 ...">Bem, deixe-me te contar algo, ...</div>
  </div>
  <div class="flow-root ...">
    <div class="my-4 ...">Claro, vá em frente, ria se quiser...</div>
  </div>
</div>
```

### Flex

Use a classe `flex` para criar um contêiner flex de nível de bloco:

```html
<div class="flex items-center">
  <img src="path/to/image.jpg" />
  <div>
    <strong>Andrew Alfred</strong>
    <span>Consultor técnico</span>
  </div>
</div>
```

### Inline Flex

Use a classe `inline-flex` para criar um contêiner flex inline que flui com o texto:

```html
<p>
  Hoje passei a maior parte do dia pesquisando maneiras de aproveitar o fato de que 
  garrafas podem ser devolvidas por 10 centavos em Michigan, mas apenas 5 centavos aqui. 
  <span class="inline-flex items-baseline">
    <img src="/img/kramer.jpg" class="mx-1 size-5 self-center rounded-full" />
    <span>Kramer</span>
  </span>
  continua me dizendo que não há como fazer isso funcionar, que ele executou os números 
  em todas as abordagens possíveis, mas eu só tenho que acreditar que há uma maneira de 
  fazer isso funcionar, há simplesmente muita oportunidade aqui.
</p>
```

### Grid

Use a classe `grid` para criar um contêiner de grade:

```html
<div class="grid grid-cols-3 grid-rows-3 gap-4">
  <!-- ... -->
</div>
```

### Inline Grid

Use a classe `inline-grid` para criar um contêiner de grade inline:

```html
<span class="inline-grid grid-cols-3 gap-4">
  <span>01</span>
  <span>02</span>
  <span>03</span>
  <span>04</span>
  <span>05</span>
  <span>06</span>
</span>
<span class="inline-grid grid-cols-3 gap-4">
  <span>01</span>
  <span>02</span>
  <span>03</span>
  <span>04</span>
  <span>05</span>
  <span>06</span>
</span>
```

### Contents

Use a classe `contents` para criar um contêiner "fantasma" cujos filhos agem como filhos diretos do pai:

```html
<div class="flex ...">
  <div class="flex-1 ...">01</div>
  <div class="contents">
    <div class="flex-1 ...">02</div>
    <div class="flex-1 ...">03</div>
  </div>
  <div class="flex-1 ...">04</div>
</div>
```

### Table

Use as classes `table`, `table-row`, `table-cell`, `table-caption`, `table-column`, `table-column-group`, `table-header-group`, `table-row-group` e `table-footer-group` para criar elementos que se comportam como seus respectivos elementos de tabela:

```html
<div class="table w-full ...">
  <div class="table-header-group ...">
    <div class="table-row">
      <div class="table-cell text-left ...">Música</div>
      <div class="table-cell text-left ...">Artista</div>
      <div class="table-cell text-left ...">Ano</div>
    </div>
  </div>
  <div class="table-row-group">
    <div class="table-row">
      <div class="table-cell ...">The Sliding Mr. Bones (Next Stop, Pottersville)</div>
      <div class="table-cell ...">Malcolm Lockyer</div>
      <div class="table-cell ...">1961</div>
    </div>
    <div class="table-row">
      <div class="table-cell ...">Witchy Woman</div>
      <div class="table-cell ...">The Eagles</div>
      <div class="table-cell ...">1972</div>
    </div>
    <div class="table-row">
      <div class="table-cell ...">Shining Star</div>
      <div class="table-cell ...">Earth, Wind, and Fire</div>
      <div class="table-cell ...">1975</div>
    </div>
  </div>
</div>
```

### Hidden

Use a classe `hidden` para remover um elemento do documento:

```html
<div class="flex ...">
  <div class="hidden ...">01</div>
  <div>02</div>
  <div>03</div>
</div>
```

Para ocultar visualmente um elemento mas mantê-lo no documento, use a propriedade `visibility` em vez disso.

### Apenas para Leitor de Tela

Use `sr-only` para ocultar um elemento visualmente sem ocultá-lo dos leitores de tela:

```html
<a href="#">
  <svg><!-- ... --></svg>
  <span class="sr-only">Configurações</span>
</a>
```

Use `not-sr-only` para desfazer `sr-only`, tornando um elemento visível para usuários videntes, bem como leitores de tela:

```html
<a href="#">
  <svg><!-- ... --></svg>
  <span class="sr-only sm:not-sr-only">Configurações</span>
</a>
```

Isso pode ser útil quando você quer ocultar visualmente algo em telas pequenas, mas mostrá-lo em telas maiores, por exemplo.

## Design Responsivo

Prefixe uma classe de display com uma variante de breakpoint como `md:` para aplicar a classe apenas em tamanhos de tela médios e maiores:

```html
<div class="flex md:inline-flex ...">
  <!-- ... -->
</div>
```

Saiba mais sobre o uso de variantes na documentação de variantes.

