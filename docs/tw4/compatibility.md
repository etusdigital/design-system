# Compatibilidade

## Suporte a navegadores

O Tailwind CSS v4.0 foi projetado e testado em navegadores modernos, e a funcionalidade central do framework depende especificamente dessas versões de navegadores:

* Chrome 111 (lançado em março de 2023)
* Safari 16.4 (lançado em março de 2023)
* Firefox 128 (lançado em julho de 2024)

O Tailwind também inclui suporte para muitos recursos de ponta da plataforma como `field-sizing: content`, `@starting-style`, e `text-wrap: balance` que têm suporte limitado em navegadores. Cabe a você decidir se quer usar esses recursos modernos em seus projetos — se os navegadores que você está segmentando não os suportam, simplesmente não use esses utilitários e variantes.

Se você não tem certeza sobre o suporte para um recurso moderno da plataforma, o banco de dados Can I use é um ótimo recurso.

## Sass, Less e Stylus

O Tailwind CSS v4.0 é uma ferramenta de build CSS com recursos completos projetada para um fluxo de trabalho específico, e não foi projetado para ser usado com pré-processadores CSS como Sass, Less ou Stylus.

Pense no próprio Tailwind CSS como seu pré-processador — você não deveria usar Tailwind com Sass pela mesma razão que não usaria Sass com Stylus.

Como o Tailwind foi projetado para navegadores modernos, você na verdade não precisa de um pré-processador para coisas como nesting ou variáveis, e o próprio Tailwind fará coisas como agrupar suas importações e adicionar prefixos de fornecedores.

### Importações em tempo de build

O Tailwind agrupará automaticamente outros arquivos CSS que você incluir com `@import`, sem a necessidade de uma ferramenta de pré-processamento separada.

```css
@import "tailwindcss";
@import "./typography.css";
```

Neste exemplo, o arquivo `typography.css` será agrupado em seu CSS compilado pelo Tailwind, sem qualquer outra ferramenta como Sass ou `postcss-import`.

### Variáveis

Todos os navegadores modernos suportam variáveis CSS nativas sem a necessidade de qualquer tipo de pré-processador:

```css
.typography {
  font-size: var(--text-base);
  color: var(--color-gray-700);
}
```

O Tailwind depende muito de variáveis CSS internamente, então se você pode usar Tailwind em seu projeto, você pode usar variáveis CSS nativas.

### Nesting

Por baixo dos panos, o Tailwind usa Lightning CSS para processar CSS aninhado como este:

```css
.typography {
  p {
    font-size: var(--text-base);
  }
  img {
    border-radius: var(--radius-lg);
  }
}
```

O Tailwind achata esse CSS aninhado para você para que possa ser compreendido por todos os navegadores modernos:

```css
.typography p {
  font-size: var(--text-base);
}

.typography img {
  border-radius: var(--radius-lg);
}
```

O suporte nativo a CSS nesting também é muito bom hoje em dia, então você não precisa realmente de um pré-processador para nesting mesmo se não estiver usando Tailwind.

### Loops

No Tailwind, os tipos de classes para as quais você pode ter usado loops no passado (como `col-span-1`, `col-span-2`, etc.) são geradas para você sob demanda pelo Tailwind sempre que você as usa, em vez de ter que ser predefinidas.

Além disso, quando você está construindo coisas com Tailwind CSS, você faz a grande maioria do seu estilo em seu HTML, não em arquivos CSS. Como você não está escrevendo toneladas de CSS em primeiro lugar, você simplesmente não precisa de recursos como loops que são projetados para gerar programaticamente muitas regras CSS personalizadas.

### Funções de cor e matemática

Ao usar pré-processadores como Sass ou Less, você pode ter usado funções como `darken` ou `lighten` para ajustar cores.

Ao usar Tailwind, o fluxo de trabalho recomendado é usar uma paleta de cores predefinida que inclui tons claros e escuros de cada cor, como a paleta de cores padrão expertamente projetada incluída com o framework.

```html
<button class="bg-indigo-500 hover:bg-indigo-600 ...">
  <!-- ... -->
</button>
```

Você também pode usar recursos CSS modernos como `color-mix()` para ajustar cores em tempo de execução diretamente no navegador. Isso até permite que você ajuste cores definidas usando variáveis CSS ou a palavra-chave `currentcolor`, o que não é possível com pré-processadores.

Da mesma forma, os navegadores suportam funções matemáticas como `min()`, `max()`, e `round()` nativamente agora, então não há necessidade de depender de um pré-processador para esses recursos também.

## Módulos CSS

O Tailwind é compatível com módulos CSS e pode coexistir com eles se você estiver introduzindo Tailwind em um projeto que já os usa, mas não recomendamos usar módulos CSS e Tailwind juntos se você puder evitar.

### Preocupações de escopo

Os módulos CSS são projetados para resolver problemas de escopo que simplesmente não existem ao compor classes utilitárias em seu HTML em vez de escrever CSS personalizado.

Os estilos são naturalmente escopo com Tailwind porque cada classe utilitária sempre faz a mesma coisa, não importa onde seja usada — não há risco de que adicionar uma classe utilitária a uma parte de sua UI crie algum efeito colateral inesperado em outro lugar.

### Performance

Ao usar módulos CSS, ferramentas de build como Vite, Parcel e Turbopack processam cada módulo CSS separadamente. Isso significa que se você tem 50 módulos CSS em um projeto, o Tailwind precisa executar 50 vezes separadamente, o que leva a tempos de build muito mais lentos e uma experiência de desenvolvedor pior.

### Compartilhamento de contexto explícito

Como os módulos CSS são processados separadamente, eles não têm `@theme` a menos que você importe um.

Isso significa que recursos como `@apply` não funcionarão da maneira que você espera a menos que você importe explicitamente seus estilos globais como referência:

Importe seus estilos globais como referência para garantir que suas variáveis de tema sejam definidas

```css
@reference "../app.css";

button {
  @apply bg-blue-500;
}
```

Alternativamente, você também pode simplesmente usar variáveis CSS em vez de `@apply`, o que tem o benefício adicional de permitir que o Tailwind pule o processamento desses arquivos e melhorará sua performance de build:

```css
button {
  background: var(--color-blue-500);
}
```

## Vue, Svelte e Astro

Vue, Svelte e Astro suportam blocos `<style>` em arquivos de componentes que se comportam muito como módulos CSS, o que significa que são processados por suas ferramentas de build totalmente separadamente e têm todas as mesmas desvantagens.

Se você está usando Tailwind com essas ferramentas, recomendamos evitar blocos `<style>` em seus componentes e apenas estilizar coisas com classes utilitárias diretamente em sua marcação, da maneira que o Tailwind foi feito para ser usado.

Se você usar blocos `<style>`, certifique-se de importar seus estilos globais como referência se quiser que recursos como `@apply` funcionem como esperado:

Importe seus estilos globais como referência para garantir que suas variáveis de tema sejam definidas

```vue
<template>
  <button><slot /></button>
</template>

<style scoped>
@reference "../app.css";

button {
  @apply bg-blue-500;
}
</style>
```

Ou simplesmente use suas variáveis CSS definidas globalmente em vez de recursos como `@apply`, que não requerem que o Tailwind processe seu CSS de componente:

```vue
<template>
  <button><slot /></button>
</template>

<style scoped>
button {
  background-color: var(--color-blue-500);
}
</style>
```

