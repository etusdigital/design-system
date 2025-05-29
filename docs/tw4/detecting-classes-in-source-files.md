# Detectando Classes em Arquivos de Origem

## Visão Geral

O Tailwind funciona escaneando seu projeto em busca de classes utilitárias e, em seguida, gerando todo o CSS necessário com base nas classes que você realmente usou.

Isso garante que seu CSS seja o menor possível e também é o que torna possível recursos como valores arbitrários.

### Como as classes são detectadas

O Tailwind trata todos os seus arquivos de origem como texto simples e não tenta analisar seus arquivos como código de forma alguma.

Em vez disso, ele apenas procura por tokens em seu arquivo que possam ser classes com base nos caracteres que o Tailwind espera nos nomes das classes:

```javascript
export function Button({ color, children }) {
  const colors = {
    black: "bg-black text-white",
    blue: "bg-blue-500 text-white",
    white: "bg-white text-black",
  };

  return (
    <button className={`${colors[color]} rounded-full px-2 py-1.5 font-sans text-sm/6 font-medium shadow`}>
      {children}
    </button>
  );
}
```

Em seguida, ele tenta gerar o CSS para todos esses tokens, descartando quaisquer tokens que não correspondam a uma classe utilitária que o framework conheça.

## Nomes de Classes Dinâmicas

Como o Tailwind escaneia seus arquivos de origem como texto simples, ele não tem como entender concatenação de strings ou interpolação na linguagem de programação que você está usando.

### ❌ Não construa nomes de classes dinamicamente

```html
<div class="text-{{ error ? 'red' : 'green' }}-600"></div>
```

No exemplo acima, as strings `text-red-600` e `text-green-600` não existem, então o Tailwind não gerará essas classes.

### ✅ Sempre use nomes de classes completos

```html
<div class="{{ error ? 'text-red-600' : 'text-green-600' }}"></div>
```

Se você está usando uma biblioteca de componentes como React ou Vue, isso significa que você não deve usar props para construir classes dinamicamente:

### ❌ Não use props para construir nomes de classes dinamicamente

```javascript
function Button({ color, children }) {
  return (
    <button className={`bg-${color}-600 hover:bg-${color}-500 ...`}>
      {children}
    </button>
  );
}
```

### ✅ Sempre mapeie props para nomes de classes estáticos

```javascript
function Button({ color, children }) {
  const colorVariants = {
    blue: "bg-blue-600 hover:bg-blue-500",
    red: "bg-red-600 hover:bg-red-500",
  };

  return (
    <button className={`${colorVariants[color]} ...`}>
      {children}
    </button>
  );
}
```

Isso tem o benefício adicional de permitir mapear diferentes valores de props para diferentes tons de cor, por exemplo:

```javascript
function Button({ color, children }) {
  const colorVariants = {
    blue: "bg-blue-600 hover:bg-blue-500 text-white",
    red: "bg-red-500 hover:bg-red-400 text-white",
    yellow: "bg-yellow-300 hover:bg-yellow-400 text-black",
  };

  return (
    <button className={`${colorVariants[color]} ...`}>
      {children}
    </button>
  );
}
```

Contanto que você sempre use nomes de classes completos em seu código, o Tailwind gerará todo o seu CSS perfeitamente a cada vez.

## Quais Arquivos São Escaneados

O Tailwind escaneará todos os arquivos em seu projeto em busca de nomes de classes, exceto nos seguintes casos:

- Arquivos que estão em seu arquivo `.gitignore`
- Arquivos binários como imagens, vídeos ou arquivos zip
- Arquivos CSS
- Arquivos de lock de gerenciadores de pacotes comuns

Se você precisar escanear arquivos que o Tailwind está ignorando por padrão, você pode registrar explicitamente essas fontes.

## Registrando Fontes Explicitamente

Use `@source` para registrar explicitamente caminhos de origem relativos à folha de estilo:

```css
@import "tailwindcss";
@source "../node_modules/@acmecorp/ui-lib";
```

Isso é especialmente útil quando você precisa escanear uma biblioteca externa que foi construída com Tailwind, já que as dependências geralmente são listadas em seu arquivo `.gitignore` e ignoradas pelo Tailwind por padrão.

### Definindo seu Caminho Base

O Tailwind usa o diretório de trabalho atual como ponto de partida ao escanear nomes de classes por padrão.

Para definir o caminho base para detecção de fonte explicitamente, use a função `source()` ao importar o Tailwind em seu CSS:

```css
@import "tailwindcss" source("../src");
```

Isso pode ser útil ao trabalhar com monorepos onde seus comandos de build são executados a partir da raiz do monorepo em vez da raiz de cada projeto.

### Ignorando Caminhos Específicos

Use `@source not` para ignorar caminhos específicos, relativos à folha de estilo, ao escanear nomes de classes:

```css
@import "tailwindcss";
@source not "../src/components/legacy";
```

Isso é útil quando você tem grandes diretórios em seu projeto que você sabe que não usam classes Tailwind, como componentes legados ou bibliotecas de terceiros.

### Desabilitando Detecção Automática

Use `source(none)` para desabilitar completamente a detecção automática de fonte se você quiser registrar todas as suas fontes explicitamente:

```css
@import "tailwindcss" source(none);
@source "../admin";
@source "../shared";
```

Isso pode ser útil em projetos que têm várias folhas de estilo Tailwind onde você quer garantir que cada uma inclua apenas as classes que cada folha de estilo precisa.

## Incluindo Utilitários Específicos na Lista Segura

Se você precisar garantir que o Tailwind gere certos nomes de classes que não existem em seus arquivos de conteúdo, use `@source inline()` para forçá-los a serem gerados:

```css
@import "tailwindcss";
@source inline("underline");
```

**Resultado CSS gerado:**

```css
.underline {
  text-decoration: underline;
}
```

### Incluindo Variantes na Lista Segura

Você também pode usar `@source inline()` para gerar classes com variantes. Por exemplo, para gerar a classe `underline` com variantes hover e focus, adicione `{hover:,focus:,}` à entrada de origem:

```css
@import "tailwindcss";
@source inline("{hover:,focus:,}underline");
```

**Resultado CSS gerado:**

```css
.underline {
  text-decoration: underline;
}

@media (hover: hover) {
  .hover\:underline:hover {
    text-decoration: underline;
  }
}

@media (focus: focus) {
  .focus\:underline:focus {
    text-decoration: underline;
  }
}
```

### Lista Segura com Intervalos

A entrada de origem é expandida por chaves, então você pode gerar várias classes de uma vez. Por exemplo, para gerar todas as cores de fundo vermelhas com variantes hover, use um intervalo:

```css
@import "tailwindcss";
@source inline("{hover:,}bg-red-{50,{100..900..100},950}");
```

**Resultado CSS gerado:**

```css
.bg-red-50 {
  background-color: var(--color-red-50);
}
.bg-red-100 {
  background-color: var(--color-red-100);
}
.bg-red-200 {
  background-color: var(--color-red-200);
}
/* ... */
.bg-red-800 {
  background-color: var(--color-red-800);
}
.bg-red-900 {
  background-color: var(--color-red-900);
}
.bg-red-950 {
  background-color: var(--color-red-950);
}

@media (hover: hover) {
  .hover\:bg-red-50:hover {
    background-color: var(--color-red-50);
  }
  /* ... */
  .hover\:bg-red-950:hover {
    background-color: var(--color-red-950);
  }
}
```

Isso gera cores de fundo vermelhas de 100 a 900 em incrementos de 100, junto com as primeiras e últimas tonalidades de 50 e 950. Também adiciona a variante `hover:` para cada uma dessas classes.

### Excluindo Classes Explicitamente

Use `@source not inline()` para impedir que classes específicas sejam geradas, mesmo se forem detectadas em seus arquivos de origem:

```css
@import "tailwindcss";
@source not inline("{hover:,focus:,}bg-red-{50,{100..900..100},950}");
```

Isso excluirá explicitamente os utilitários de fundo vermelho, junto com suas variantes hover e focus, de serem gerados.

