# Responsive Design

## Visão Geral

Toda classe utilitária no Tailwind pode ser aplicada condicionalmente em diferentes breakpoints, o que torna muito fácil construir interfaces responsivas complexas sem nunca sair do seu HTML.

Primeiro, certifique-se de adicionar a meta tag viewport no `<head>` do seu documento:

```html
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
```

Para adicionar um utilitário que só tenha efeito em um determinado breakpoint, você só precisa prefixar o utilitário com o nome do breakpoint, seguido pelo caractere `:`:

```html
<!-- Largura de 16 por padrão, 32 em telas médias e 48 em telas grandes -->
<img class="w-16 md:w-32 lg:w-48" src="..." />
```

## Breakpoints Padrão

Existem cinco breakpoints por padrão, inspirados em resoluções comuns de dispositivos:

| Breakpoint | Media Query |
|------------|-------------|
| `sm` | `@media (width >= 40rem) { ... }` |
| `md` | `@media (width >= 48rem) { ... }` |
| `lg` | `@media (width >= 64rem) { ... }` |
| `xl` | `@media (width >= 80rem) { ... }` |
| `2xl` | `@media (width >= 96rem) { ... }` |

Isso funciona para toda classe utilitária no framework, o que significa que você pode alterar literalmente qualquer coisa em um determinado breakpoint — até mesmo coisas como espaçamento entre letras ou estilos de cursor.

## Exemplo Prático

Aqui está um exemplo simples de um componente de página de marketing que usa um layout empilhado em telas pequenas e um layout lado a lado em telas maiores:

```html
<div class="mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl">
  <div class="md:flex">
    <div class="md:shrink-0">
      <img
        class="h-48 w-full object-cover md:h-full md:w-48"
        src="/img/building.jpg"
        alt="Modern building architecture"
      />
    </div>
    <div class="p-8">
      <div class="text-sm font-semibold tracking-wide text-indigo-500 uppercase">
        Company retreats
      </div>
      <a href="#" class="mt-1 block text-lg leading-tight font-medium text-black hover:underline">
        Incredible accommodation for your team
      </a>
      <p class="mt-2 text-gray-500">
        Looking to take your team away on a retreat to enjoy awesome food and take in some sunshine? 
        We have a list of places to do just that.
      </p>
    </div>
  </div>
</div>
```

### Como o Exemplo Funciona:

* **Por padrão**, o `div` externo é `display: block`, mas ao adicionar o utilitário `md:flex`, ele se torna `display: flex` em telas médias e maiores.

* **Quando o pai é um flex container**, queremos garantir que a imagem nunca encolha, então adicionamos `md:shrink-0` para prevenir encolhimento em telas médias e maiores. Tecnicamente poderíamos ter usado apenas `shrink-0` já que não faria nada em telas menores, mas como só importa em telas `md`, é uma boa ideia deixar isso claro no nome da classe.

* **Em telas pequenas** a imagem é automaticamente de largura total por padrão. Em telas médias e acima, limitamos a largura para um tamanho fixo e garantimos que a imagem seja de altura total usando `md:h-full md:w-48`.

Usamos apenas um breakpoint neste exemplo, mas você poderia facilmente personalizar este componente em outros tamanhos usando os prefixos responsivos `sm`, `lg`, `xl`, ou `2xl` também.

## Trabalhando com Mobile-First

O Tailwind usa um sistema de breakpoint mobile-first, similar ao que você pode estar acostumado em outros frameworks como Bootstrap.

Isso significa que utilitários sem prefixo (como `uppercase`) têm efeito em todos os tamanhos de tela, enquanto utilitários com prefixo (como `md:uppercase`) só têm efeito no breakpoint especificado e acima.

### Direcionando Telas Mobile

Onde essa abordagem surpreende as pessoas com mais frequência é que para estilizar algo para mobile, você precisa usar a versão sem prefixo de um utilitário, não a versão com prefixo `sm:`. Não pense em `sm:` como significando "em telas pequenas", pense nisso como "no breakpoint pequeno".

#### ❌ Não use `sm:` para direcionar dispositivos móveis

```html
<!-- Isso só centralizará o texto em telas de 640px e maiores, não em telas pequenas -->
<div class="sm:text-center"></div>
```

#### ✅ Use utilitários sem prefixo para direcionar mobile

```html
<!-- Isso centralizará o texto no mobile e alinhará à esquerda em telas de 640px e maiores -->
<div class="text-center sm:text-left"></div>
```

Por essa razão, é frequentemente uma boa ideia implementar primeiro o layout mobile para um design, depois aplicar quaisquer mudanças que façam sentido para telas `sm`, seguidas por telas `md`, etc.

### Direcionando um Intervalo de Breakpoint

Por padrão, estilos aplicados por regras como `md:flex` se aplicarão naquele breakpoint e permanecerão aplicados em breakpoints maiores.

Se você quiser aplicar um utilitário apenas quando um intervalo específico de breakpoint estiver ativo, combine uma variante responsiva como `md` com uma variante `max-*` para limitar esse estilo a um intervalo específico:

```html
<div class="md:max-xl:flex">
  <!-- ... -->
</div>
```

O Tailwind gera uma variante `max-*` correspondente para cada breakpoint, então por padrão as seguintes variantes estão disponíveis:

| Variante | Media Query |
|----------|-------------|
| `max-sm` | `@media (width < 40rem) { ... }` |
| `max-md` | `@media (width < 48rem) { ... }` |
| `max-lg` | `@media (width < 64rem) { ... }` |
| `max-xl` | `@media (width < 80rem) { ... }` |
| `max-2xl` | `@media (width < 96rem) { ... }` |

### Direcionando um Único Breakpoint

Para direcionar um único breakpoint, direcione o intervalo para aquele breakpoint combinando uma variante responsiva como `md` com a variante `max-*` para o próximo breakpoint:

```html
<div class="md:max-lg:flex">
  <!-- ... -->
</div>
```

Leia sobre direcionamento de intervalos de breakpoint para aprender mais.

## Usando Breakpoints Personalizados

### Personalizando seu Tema

Use as variáveis de tema `--breakpoint-*` para personalizar seus breakpoints:

```css
@import "tailwindcss";

@theme {
  --breakpoint-xs: 30rem;
  --breakpoint-2xl: 100rem;
  --breakpoint-3xl: 120rem;
}
```

Isso atualiza o breakpoint `2xl` para usar `100rem` em vez do padrão `96rem`, e cria novos breakpoints `xs` e `3xl` que podem ser usados em sua marcação:

```html
<div class="grid xs:grid-cols-2 3xl:grid-cols-6">
  <!-- ... -->
</div>
```

**Nota:** É importante sempre usar a mesma unidade para definir seus breakpoints ou os utilitários gerados podem ser ordenados de forma inesperada, fazendo com que as classes de breakpoint se sobreponham umas às outras de maneiras inesperadas.

O Tailwind usa `rem` para os breakpoints padrão, então se você estiver adicionando breakpoints adicionais aos padrões, certifique-se de usar `rem` também.

Aprenda mais sobre personalização do seu tema na documentação de tema.

### Removendo Breakpoints Padrão

Para remover um breakpoint padrão, redefina seu valor para a palavra-chave `initial`:

```css
@import "tailwindcss";

@theme {
  --breakpoint-2xl: initial;
}
```

Você também pode redefinir todos os breakpoints padrão usando `--breakpoint-*: initial`, então definir todos os seus breakpoints do zero:

```css
@import "tailwindcss";

@theme {
  --breakpoint-*: initial;
  --breakpoint-tablet: 40rem;
  --breakpoint-laptop: 64rem;
  --breakpoint-desktop: 80rem;
}
```

Aprenda mais sobre remoção de valores de tema padrão na documentação de tema.

### Usando Valores Arbitrários

Se você precisar usar um breakpoint único que não faz sentido incluir em seu tema, use as variantes `min` ou `max` para gerar um breakpoint personalizado rapidamente usando qualquer valor arbitrário.

```html
<div class="max-[600px]:bg-sky-300 min-[320px]:text-center">
  <!-- ... -->
</div>
```

Aprenda mais sobre suporte a valores arbitrários na documentação de valores arbitrários.

## Container Queries

### O que são Container Queries?

Container queries são uma feature moderna do CSS que permite estilizar algo baseado no tamanho de um elemento pai em vez do tamanho de toda a viewport. Elas permitem construir componentes que são muito mais portáveis e reutilizáveis porque podem mudar baseado no espaço real disponível para aquele componente.

### Exemplo Básico

Use a classe `@container` para marcar um elemento como container, então use variantes como `@sm` e `@md` para estilizar elementos filhos baseado no tamanho do container:

```html
<div class="@container">
  <div class="flex flex-col @md:flex-row">
    <!-- ... -->
  </div>
</div>
```

Assim como as variantes de breakpoint, container queries são mobile-first no Tailwind CSS e se aplicam no tamanho do container alvo e acima.

### Container Queries de Largura Máxima

Use variantes como `@max-sm` e `@max-md` para aplicar um estilo abaixo de um tamanho específico de container:

```html
<div class="@container">
  <div class="flex flex-row @max-md:flex-col">
    <!-- ... -->
  </div>
</div>
```

### Intervalos de Container Query

Combine uma variante regular de container query com uma variante de container query de largura máxima para direcionar um intervalo específico:

```html
<div class="@container">
  <div class="flex flex-row @sm:@max-md:flex-col">
    <!-- ... -->
  </div>
</div>
```

### Containers Nomeados

Para designs complexos que usam múltiplos containers aninhados, você pode nomear containers usando `@container/{name}` e direcionar containers específicos com variantes como `@sm/{name}` e `@md/{name}`:

```html
<div class="@container/main">
  <!-- ... -->
  <div class="flex flex-row @sm/main:flex-col">
    <!-- ... -->
  </div>
</div>
```

Isso torna possível estilizar algo baseado no tamanho de um container distante, ao invés de apenas o container mais próximo.

### Usando Tamanhos de Container Personalizados

Use as variáveis de tema `--container-*` para personalizar seus tamanhos de container:

```css
@import "tailwindcss";

@theme {
  --container-8xl: 96rem;
}
```

Isso adiciona uma nova variante de container query `8xl` que pode ser usada em sua marcação:

```html
<div class="@container">
  <div class="flex flex-col @8xl:flex-row">
    <!-- ... -->
  </div>
</div>
```

Aprenda mais sobre personalização do seu tema na documentação de tema.

### Usando Valores Arbitrários

Use variantes como `@min-[475px]` e `@max-[960px]` para tamanhos únicos de container query que você não quer adicionar ao seu tema:

```html
<div class="@container">
  <div class="flex flex-col @min-[475px]:flex-row">
    <!-- ... -->
  </div>
</div>
```

### Usando Unidades de Container Query

Use unidades de comprimento de container query como `cqw` como valores arbitrários em outras classes utilitárias para referenciar o tamanho do container:

```html
<div class="@container">
  <div class="w-[50cqw]">
    <!-- ... -->
  </div>
</div>
```

### Referência de Tamanhos de Container

Por padrão, o Tailwind inclui tamanhos de container variando de 16rem (256px) a 80rem (1280px):

| Variante | Container Query |
|----------|-----------------|
| `@3xs` | `@container (width >= 16rem) { … }` |
| `@2xs` | `@container (width >= 18rem) { … }` |
| `@xs` | `@container (width >= 20rem) { … }` |
| `@sm` | `@container (width >= 24rem) { … }` |
| `@md` | `@container (width >= 28rem) { … }` |
| `@lg` | `@container (width >= 32rem) { … }` |
| `@xl` | `@container (width >= 36rem) { … }` |
| `@2xl` | `@container (width >= 42rem) { … }` |
| `@3xl` | `@container (width >= 48rem) { … }` |
| `@4xl` | `@container (width >= 56rem) { … }` |
| `@5xl` | `@container (width >= 64rem) { … }` |
| `@6xl` | `@container (width >= 72rem) { … }` |
| `@7xl` | `@container (width >= 80rem) { … }` |