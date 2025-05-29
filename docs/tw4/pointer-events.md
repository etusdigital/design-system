# Pointer Events

O Tailwind CSS v4 oferece utilitários para controlar o comportamento de pointer events dos elementos.

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `pointer-events-auto` | `pointer-events: auto;` |
| `pointer-events-none` | `pointer-events: none;` |

## Exemplos

### Ignorando eventos de ponteiro

Use o utilitário `pointer-events-none` para fazer com que um elemento ignore eventos de ponteiro, como `:hover` e eventos de `click`:

**Clique nos ícones de pesquisa para ver o comportamento esperado**

#### Comportamento Normal (`pointer-events-auto`)
```html
<div class="relative ...">
  <div class="pointer-events-auto absolute ...">
    <svg class="absolute h-5 w-5 text-gray-400">
      <!-- ... -->
    </svg>
  </div>
  <input type="text" placeholder="Search" class="..." />
</div>
```

#### Sem eventos de ponteiro (`pointer-events-none`)
```html
<div class="relative ...">
  <div class="pointer-events-none absolute ...">
    <svg class="absolute h-5 w-5 text-gray-400">
      <!-- ... -->
    </svg>
  </div>
  <input type="text" placeholder="Search" class="..." />
</div>
```

> **Nota:** Os eventos de ponteiro ainda serão acionados em elementos filhos e passarão através dos elementos que estão "abaixo" do alvo.

### Restaurando eventos de ponteiro

Use o utilitário `pointer-events-auto` para reverter ao comportamento padrão do navegador para eventos de ponteiro:

```html
<div class="pointer-events-none md:pointer-events-auto ...">
  <!-- ... -->
</div>
```

Este exemplo mostra como você pode desabilitar eventos de ponteiro em telas pequenas e reabilitá-los em telas médias e maiores usando breakpoints responsivos.
