# Text Transform

Utilitários para controlar a transformação de texto em elementos.

## Classes Disponíveis

| Classe | Propriedade CSS | Descrição |
|--------|-----------------|-----------|
| `uppercase` | `text-transform: uppercase;` | Converte todo o texto para maiúsculas |
| `lowercase` | `text-transform: lowercase;` | Converte todo o texto para minúsculas |
| `capitalize` | `text-transform: capitalize;` | Capitaliza a primeira letra de cada palavra |
| `normal-case` | `text-transform: none;` | Remove qualquer transformação de texto |

## Exemplos

### Texto em Maiúsculas

Use a classe `uppercase` para converter todo o texto para maiúsculas:

**Resultado:**
> **THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.**

```html
<p class="uppercase">The quick brown fox jumps over the lazy dog.</p>
```

### Texto em Minúsculas

Use a classe `lowercase` para converter todo o texto para minúsculas:

**Resultado:**
> the quick brown fox jumps over the lazy dog.

```html
<p class="lowercase">The quick brown fox jumps over the lazy dog.</p>
```

### Texto Capitalizado

Use a classe `capitalize` para capitalizar a primeira letra de cada palavra:

**Resultado:**
> The Quick Brown Fox Jumps Over The Lazy Dog.

```html
<p class="capitalize">the quick brown fox jumps over the lazy dog.</p>
```

### Resetando a Transformação

Use a classe `normal-case` para preservar a capitalização original do texto:

**Resultado:**
> The quick brown fox jumps over the lazy dog.

```html
<p class="normal-case">The quick brown fox jumps over the lazy dog.</p>
```

## Design Responsivo

Você pode aplicar diferentes transformações de texto em diferentes tamanhos de tela usando os prefixos de breakpoint:

```html
<p class="capitalize md:uppercase lg:normal-case">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</p>
```

**Breakpoints disponíveis:**
- `sm:` - Telas pequenas (640px+)
- `md:` - Telas médias (768px+)
- `lg:` - Telas grandes (1024px+)
- `xl:` - Telas extra grandes (1280px+)
- `2xl:` - Telas ultra grandes (1536px+)

## Casos de Uso Comuns

### Títulos e Cabeçalhos
```html
<h1 class="uppercase tracking-wide">Título Principal</h1>
<h2 class="capitalize">Subtítulo da Seção</h2>
```

### Navegação
```html
<nav>
  <a href="#" class="uppercase text-sm font-medium">Home</a>
  <a href="#" class="uppercase text-sm font-medium">Sobre</a>
  <a href="#" class="uppercase text-sm font-medium">Contato</a>
</nav>
```

### Botões
```html
<button class="uppercase px-4 py-2 bg-blue-500 text-white">
  Clique Aqui
</button>
```

Para mais informações sobre variantes responsivas, consulte a [documentação oficial do Tailwind CSS](https://tailwindcss.com/docs/responsive-design).

