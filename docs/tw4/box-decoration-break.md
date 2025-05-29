# Box Decoration Break

Utilitários para controlar como os elementos quebrados devem ser decorados.

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `box-decoration-clone` | `box-decoration-break: clone` |
| `box-decoration-slice` | `box-decoration-break: slice` |

## Exemplos

### Exemplo Básico

Use os utilitários `box-decoration-slice` e `box-decoration-clone` para controlar se propriedades como background, border, border-image, box-shadow, clip-path, margin e padding devem ser renderizadas como se o elemento fosse um fragmento contínuo ou blocos distintos:

#### box-decoration-slice
```html
<span class="box-decoration-slice bg-linear-to-r from-indigo-600 to-pink-500 px-2 text-white">
  Hello<br />World
</span>
```

#### box-decoration-clone
```html
<span class="box-decoration-clone bg-linear-to-r from-indigo-600 to-pink-500 px-2 text-white">
  Hello<br />World
</span>
```

### Design Responsivo

Prefixe um utilitário de `box-decoration-break` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e superiores:

```html
<div class="box-decoration-clone md:box-decoration-slice">
  <!-- ... -->
</div>
```

> **Nota:** Saiba mais sobre o uso de variantes na [documentação de variantes](../variants.md).

## Casos de Uso

- **`box-decoration-slice`**: Ideal quando você quer que a decoração seja "cortada" nas quebras de linha
- **`box-decoration-clone`**: Útil quando você quer que cada linha tenha sua própria decoração completa

## Compatibilidade

Esta propriedade é suportada na maioria dos navegadores modernos. Verifique a compatibilidade no [Can I Use](https://caniuse.com/css-box-decoration-break).

