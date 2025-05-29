# Scroll Snap Type

O `scroll-snap-type` controla como o scroll snapping funciona em um elemento container.

## Classes Disponíveis

### Tipo de Snap

| Classe | Propriedade CSS |
|--------|----------------|
| `snap-none` | `scroll-snap-type: none;` |
| `snap-x` | `scroll-snap-type: x var(--tw-scroll-snap-strictness);` |
| `snap-y` | `scroll-snap-type: y var(--tw-scroll-snap-strictness);` |
| `snap-both` | `scroll-snap-type: both var(--tw-scroll-snap-strictness);` |

### Rigorosidade do Snap

| Classe | Propriedade CSS |
|--------|----------------|
| `snap-mandatory` | `--tw-scroll-snap-strictness: mandatory;` |
| `snap-proximity` | `--tw-scroll-snap-strictness: proximity;` |

## Exemplos

### Scroll Snapping Horizontal

Use a classe `snap-x` para habilitar scroll snapping horizontal dentro de um elemento:

```html
<div class="snap-x overflow-x-auto flex space-x-4 p-4">
  <div class="snap-center flex-shrink-0">
    <img src="/img/vacation-01.jpg" class="w-64 h-40 object-cover rounded" />
  </div>
  <div class="snap-center flex-shrink-0">
    <img src="/img/vacation-02.jpg" class="w-64 h-40 object-cover rounded" />
  </div>
  <div class="snap-center flex-shrink-0">
    <img src="/img/vacation-03.jpg" class="w-64 h-40 object-cover rounded" />
  </div>
  <div class="snap-center flex-shrink-0">
    <img src="/img/vacation-04.jpg" class="w-64 h-40 object-cover rounded" />
  </div>
  <div class="snap-center flex-shrink-0">
    <img src="/img/vacation-05.jpg" class="w-64 h-40 object-cover rounded" />
  </div>
  <div class="snap-center flex-shrink-0">
    <img src="/img/vacation-06.jpg" class="w-64 h-40 object-cover rounded" />
  </div>
</div>
```

> **Nota:** Para que o scroll snapping funcione, você também precisa definir o alinhamento do snap nos elementos filhos usando classes como `snap-center`, `snap-start` ou `snap-end`.

### Scroll Snapping Obrigatório

Use a classe `snap-mandatory` para forçar um container snap a sempre parar em um ponto de snap:

```html
<div class="snap-x snap-mandatory overflow-x-auto flex space-x-4 p-4">
  <div class="snap-center flex-shrink-0">
    <img src="/img/vacation-01.jpg" class="w-64 h-40 object-cover rounded" />
  </div>
  <div class="snap-center flex-shrink-0">
    <img src="/img/vacation-02.jpg" class="w-64 h-40 object-cover rounded" />
  </div>
  <div class="snap-center flex-shrink-0">
    <img src="/img/vacation-03.jpg" class="w-64 h-40 object-cover rounded" />
  </div>
  <div class="snap-center flex-shrink-0">
    <img src="/img/vacation-04.jpg" class="w-64 h-40 object-cover rounded" />
  </div>
  <div class="snap-center flex-shrink-0">
    <img src="/img/vacation-05.jpg" class="w-64 h-40 object-cover rounded" />
  </div>
  <div class="snap-center flex-shrink-0">
    <img src="/img/vacation-06.jpg" class="w-64 h-40 object-cover rounded" />
  </div>
</div>
```

### Scroll Snapping por Proximidade

Use a classe `snap-proximity` para fazer um container snap parar em pontos de snap que estão próximos:

```html
<div class="snap-x snap-proximity overflow-x-auto flex space-x-4 p-4">
  <div class="snap-center flex-shrink-0">
    <img src="/img/vacation-01.jpg" class="w-64 h-40 object-cover rounded" />
  </div>
  <div class="snap-center flex-shrink-0">
    <img src="/img/vacation-02.jpg" class="w-64 h-40 object-cover rounded" />
  </div>
  <div class="snap-center flex-shrink-0">
    <img src="/img/vacation-03.jpg" class="w-64 h-40 object-cover rounded" />
  </div>
  <div class="snap-center flex-shrink-0">
    <img src="/img/vacation-04.jpg" class="w-64 h-40 object-cover rounded" />
  </div>
  <div class="snap-center flex-shrink-0">
    <img src="/img/vacation-05.jpg" class="w-64 h-40 object-cover rounded" />
  </div>
</div>
```

## Design Responsivo

Use prefixos de breakpoint como `md:` para aplicar a classe apenas em tamanhos de tela específicos:

```html
<div class="snap-none md:snap-x overflow-x-auto">
  <!-- Conteúdo aqui -->
</div>
```

### Breakpoints Disponíveis

- `sm:snap-x` - Aplica em telas pequenas e maiores
- `md:snap-x` - Aplica em telas médias e maiores  
- `lg:snap-x` - Aplica em telas grandes e maiores
- `xl:snap-x` - Aplica em telas extra grandes e maiores
- `2xl:snap-x` - Aplica em telas 2x extra grandes

## Casos de Uso Comuns

### Carrossel de Imagens
```html
<div class="snap-x snap-mandatory overflow-x-auto flex">
  <!-- Imagens aqui -->
</div>
```

### Lista Horizontal de Cards
```html
<div class="snap-x snap-proximity overflow-x-auto flex space-x-4">
  <!-- Cards aqui -->
</div>
```

### Scroll Vertical com Seções
```html
<div class="snap-y snap-mandatory overflow-y-auto h-screen">
  <section class="snap-start h-screen">Seção 1</section>
  <section class="snap-start h-screen">Seção 2</section>
  <section class="snap-start h-screen">Seção 3</section>
</div>
```

