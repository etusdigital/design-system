# touch-action

## Classes disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `touch-auto` | `touch-action: auto;` |
| `touch-none` | `touch-action: none;` |
| `touch-pan-x` | `touch-action: pan-x;` |
| `touch-pan-left` | `touch-action: pan-left;` |
| `touch-pan-right` | `touch-action: pan-right;` |
| `touch-pan-y` | `touch-action: pan-y;` |
| `touch-pan-up` | `touch-action: pan-up;` |
| `touch-pan-down` | `touch-action: pan-down;` |
| `touch-pinch-zoom` | `touch-action: pinch-zoom;` |
| `touch-manipulation` | `touch-action: manipulation;` |

## Exemplos

### Exemplo básico

Use utilitários como `touch-pan-y` e `touch-pinch-zoom` para controlar como um elemento pode ser rolado (panned) e ampliado (pinched) em telas sensíveis ao toque:

> Experimente fazer pan nessas imagens em uma tela sensível ao toque

**touch-auto**
```html
<div class="h-48 w-full touch-auto overflow-auto ...">
  <img class="h-auto w-[150%] max-w-none" src="..." />
</div>
```

**touch-none**
```html
<div class="h-48 w-full touch-none overflow-auto ...">
  <img class="h-auto w-[150%] max-w-none" src="..." />
</div>
```

**touch-pan-x**
```html
<div class="h-48 w-full touch-pan-x overflow-auto ...">
  <img class="h-auto w-[150%] max-w-none" src="..." />
</div>
```

**touch-pan-y**
```html
<div class="h-48 w-full touch-pan-y overflow-auto ...">
  <img class="h-auto w-[150%] max-w-none" src="..." />
</div>
```

### Design responsivo

Prefixe um utilitário `touch-action` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e maiores:

```html
<div class="touch-pan-x md:touch-auto ...">
  <!-- ... -->
</div>
```

Saiba mais sobre o uso de variantes na [documentação de variantes](../variants).

