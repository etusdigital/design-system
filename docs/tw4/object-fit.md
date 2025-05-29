# object-fit

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `object-contain` | `object-fit: contain;` |
| `object-cover` | `object-fit: cover;` |
| `object-fill` | `object-fit: fill;` |
| `object-none` | `object-fit: none;` |
| `object-scale-down` | `object-fit: scale-down;` |

## Exemplos

### Redimensionar para cobrir

Use a classe `object-cover` para redimensionar o conteúdo de um elemento para cobrir seu contêiner:

```html
<img class="h-48 w-96 object-cover ..." src="/img/mountains.jpg" />
```

### Conter dentro dos limites

Use a classe `object-contain` para redimensionar o conteúdo de um elemento para permanecer contido dentro de seu contêiner:

```html
<img class="h-48 w-96 object-contain ..." src="/img/mountains.jpg" />
```

### Esticar para caber

Use a classe `object-fill` para esticar o conteúdo de um elemento para caber em seu contêiner:

```html
<img class="h-48 w-96 object-fill ..." src="/img/mountains.jpg" />
```

### Reduzir escala

Use a classe `object-scale-down` para exibir o conteúdo de um elemento em seu tamanho original, mas reduzi-lo para caber em seu contêiner, se necessário:

```html
<img class="h-48 w-96 object-scale-down ..." src="/img/mountains.jpg" />
```

### Usar o tamanho original

Use a classe `object-none` para exibir o conteúdo de um elemento em seu tamanho original, ignorando o tamanho do contêiner:

```html
<img class="h-48 w-96 object-none ..." src="/img/mountains.jpg" />
```

### Design responsivo

Prefixe uma classe de object-fit com uma variante de breakpoint como `md:` para aplicar a classe apenas em tamanhos de tela médios ou maiores:

```html
<img class="object-contain md:object-cover" src="/img/mountains.jpg" />
```

Saiba mais sobre o uso de variantes na [documentação de variantes](../variants.md).

