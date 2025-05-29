# Background Size

Utilitários para controlar o tamanho das imagens de fundo.

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `bg-auto` | `background-size: auto;` |
| `bg-cover` | `background-size: cover;` |
| `bg-contain` | `background-size: contain;` |
| `bg-size-(<custom-property>)` | `background-size: var(<custom-property>);` |
| `bg-size-[<value>]` | `background-size: <value>;` |

## Exemplos

### Preenchendo o Container (bg-cover)

Use o utilitário `bg-cover` para dimensionar a imagem de fundo até que ela preencha completamente a camada de fundo, cortando a imagem se necessário:

```html
<div class="bg-[url(/img/mountains.jpg)] bg-cover bg-center">
  <!-- Conteúdo -->
</div>
```

### Preenchendo sem Cortar (bg-contain)

Use o utilitário `bg-contain` para dimensionar a imagem de fundo até as bordas externas sem cortar ou esticar:

```html
<div class="bg-[url(/img/mountains.jpg)] bg-contain bg-center">
  <!-- Conteúdo -->
</div>
```

### Usando o Tamanho Padrão (bg-auto)

Use o utilitário `bg-auto` para exibir a imagem de fundo em seu tamanho padrão:

```html
<div class="bg-[url(/img/mountains.jpg)] bg-auto bg-center bg-no-repeat">
  <!-- Conteúdo -->
</div>
```

### Usando Valores Personalizados

#### Valores Arbitrários

Use a sintaxe `bg-size-[<value>]` para definir o tamanho da imagem de fundo com base em um valor completamente personalizado:

```html
<div class="bg-size-[auto_100px] ...">
  <!-- Conteúdo -->
</div>
```

#### Variáveis CSS

Para variáveis CSS, você também pode usar a sintaxe `bg-size-(<custom-property>)`:

```html
<div class="bg-size-(--my-image-size) ...">
  <!-- Conteúdo -->
</div>
```

> **Nota:** Esta é apenas uma forma abreviada de `bg-size-[var(<custom-property>)]` que adiciona automaticamente a função `var()` para você.

Equivalente a:
```html
<div class="bg-size-[var(--my-image-size)] ...">
  <!-- Conteúdo -->
</div>
```

## Design Responsivo

Prefixe um utilitário de background-size com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e maiores:

```html
<div class="bg-auto md:bg-contain ...">
  <!-- Conteúdo -->
</div>
```

> **Saiba mais:** Consulte a documentação sobre variantes para aprender mais sobre como usar variantes responsivas.

## Casos de Uso Comuns

### Imagem de Fundo Hero

```html
<div class="h-96 bg-[url('/hero-bg.jpg')] bg-cover bg-center">
  <div class="flex items-center justify-center h-full">
    <h1 class="text-4xl text-white">Título Hero</h1>
  </div>
</div>
```

### Ícones de Fundo

```html
<div class="w-16 h-16 bg-[url('/icon.svg')] bg-contain bg-no-repeat bg-center">
  <!-- Ícone como fundo -->
</div>
```

