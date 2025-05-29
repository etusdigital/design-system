# Scroll Snap Align

Utilitários para controlar o alinhamento de elementos em contêineres de scroll snap.

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `snap-start` | `scroll-snap-align: start;` |
| `snap-end` | `scroll-snap-align: end;` |
| `snap-center` | `scroll-snap-align: center;` |
| `snap-align-none` | `scroll-snap-align: none;` |

## Exemplos

### Alinhamento ao Centro

Use a classe `snap-center` para alinhar um elemento ao seu centro quando estiver sendo rolado dentro de um contêiner snap:

```html
<div class="snap-x overflow-x-auto flex space-x-4">
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

### Alinhamento ao Início

Use a classe `snap-start` para alinhar um elemento ao seu início quando estiver sendo rolado dentro de um contêiner snap:

```html
<div class="snap-x overflow-x-auto flex space-x-4">
  <div class="snap-start flex-shrink-0">
    <img src="/img/vacation-01.jpg" class="w-64 h-40 object-cover rounded" />
  </div>
  <div class="snap-start flex-shrink-0">
    <img src="/img/vacation-02.jpg" class="w-64 h-40 object-cover rounded" />
  </div>
  <div class="snap-start flex-shrink-0">
    <img src="/img/vacation-03.jpg" class="w-64 h-40 object-cover rounded" />
  </div>
  <div class="snap-start flex-shrink-0">
    <img src="/img/vacation-04.jpg" class="w-64 h-40 object-cover rounded" />
  </div>
  <div class="snap-start flex-shrink-0">
    <img src="/img/vacation-05.jpg" class="w-64 h-40 object-cover rounded" />
  </div>
  <div class="snap-start flex-shrink-0">
    <img src="/img/vacation-06.jpg" class="w-64 h-40 object-cover rounded" />
  </div>
</div>
```

### Alinhamento ao Final

Use a classe `snap-end` para alinhar um elemento ao seu final quando estiver sendo rolado dentro de um contêiner snap:

```html
<div class="snap-x overflow-x-auto flex space-x-4">
  <div class="snap-end flex-shrink-0">
    <img src="/img/vacation-01.jpg" class="w-64 h-40 object-cover rounded" />
  </div>
  <div class="snap-end flex-shrink-0">
    <img src="/img/vacation-02.jpg" class="w-64 h-40 object-cover rounded" />
  </div>
  <div class="snap-end flex-shrink-0">
    <img src="/img/vacation-03.jpg" class="w-64 h-40 object-cover rounded" />
  </div>
  <div class="snap-end flex-shrink-0">
    <img src="/img/vacation-04.jpg" class="w-64 h-40 object-cover rounded" />
  </div>
  <div class="snap-end flex-shrink-0">
    <img src="/img/vacation-05.jpg" class="w-64 h-40 object-cover rounded" />
  </div>
  <div class="snap-end flex-shrink-0">
    <img src="/img/vacation-06.jpg" class="w-64 h-40 object-cover rounded" />
  </div>
</div>
```

## Design Responsivo

Você pode usar prefixos de breakpoint como `md:` para aplicar as classes apenas em tamanhos de tela específicos:

```html
<div class="snap-center md:snap-start lg:snap-end">
  <!-- Conteúdo -->
</div>
```

### Breakpoints Disponíveis

- `sm:` - Telas pequenas (640px+)
- `md:` - Telas médias (768px+)
- `lg:` - Telas grandes (1024px+)
- `xl:` - Telas extra grandes (1280px+)
- `2xl:` - Telas 2x extra grandes (1536px+)

## Notas Importantes

- Para que o scroll snap funcione, o elemento pai deve ter a propriedade `scroll-snap-type` definida (use classes como `snap-x`, `snap-y`, `snap-both`)
- O elemento deve estar dentro de um contêiner com overflow para permitir a rolagem
- Funciona melhor com elementos que têm tamanhos consistentes
