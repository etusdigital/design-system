# Estados: Hover, Focus e Outros

## Introdução

Toda classe utilitária no Tailwind pode ser aplicada condicionalmente adicionando uma **variante** no início do nome da classe que descreve a condição que você quer atingir.

Por exemplo, para aplicar a classe `bg-sky-700` no hover, use a classe `hover:bg-sky-700`:

```html
<button class="bg-sky-500 hover:bg-sky-700 ...">
  Salvar alterações
</button>
```

### Diferença entre CSS Tradicional e Tailwind

**CSS Tradicional:**
```css
.btn-primary {
  background-color: #0ea5e9;
}
.btn-primary:hover {
  background-color: #0369a1;
}
```

**Tailwind CSS:**
```css
.bg-sky-500 {
  background-color: #0ea5e9;
}
.hover\:bg-sky-700:hover {
  background-color: #0369a1;
}
```

No Tailwind, em vez de adicionar estilos para um estado hover a uma classe existente, você adiciona outra classe ao elemento que só faz algo no hover.

### Variantes Disponíveis

O Tailwind inclui variantes para praticamente tudo que você vai precisar:

- **Pseudo-classes:** `:hover`, `:focus`, `:first-child`, `:required`
- **Pseudo-elementos:** `::before`, `::after`, `::placeholder`, `::selection`
- **Media queries:** breakpoints responsivos, modo escuro, `prefers-reduced-motion`
- **Seletores de atributo:** `[dir="rtl"]`, `[open]`
- **Seletores filhos:** `& > *`, `& *`

### Empilhando Variantes

As variantes podem ser empilhadas para atingir situações mais específicas:

```html
<button class="dark:md:hover:bg-fuchsia-600 ...">
  Salvar alterações
</button>
```

---

## Pseudo-classes

### `:hover`, `:focus` e `:active`

Estilize elementos no hover, focus e active usando as variantes `hover`, `focus` e `active`:

```html
<button class="bg-violet-500 hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700 ...">
  Salvar alterações
</button>
```

### Estados de Posição: `:first`, `:last`, `:odd` e `:even`

#### Primeiro e Último Filho

Estilize um elemento quando for o primeiro ou último filho usando as variantes `first` e `last`:

```html
<ul role="list">
  {#each people as person}
    <li class="flex py-4 first:pt-0 last:pb-0">
      <img class="h-10 w-10 rounded-full" src={person.imageUrl} alt="" />
      <div class="ml-3 overflow-hidden">
        <p class="text-sm font-medium text-gray-900 dark:text-white">{person.name}</p>
        <p class="truncate text-sm text-gray-500 dark:text-gray-400">{person.email}</p>
      </div>
    </li>
  {/each}
</ul>
```

#### Filhos Ímpares e Pares

Estilize elementos quando forem filhos ímpares ou pares usando as variantes `odd` e `even`:

```html
<table>
  <tbody>
    {#each people as person}
      <tr class="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
        <td>{person.name}</td>
        <td>{person.title}</td>
        <td>{person.email}</td>
      </tr>
    {/each}
  </tbody>
</table>
```

#### Seletores Nth

Use as variantes `nth-*` e `nth-last-*` para estilizar filhos baseado em sua posição:

```html
<div class="nth-3:underline"></div>
<div class="nth-last-5:underline"></div>
<div class="nth-of-type-4:underline"></div>
<div class="nth-last-of-type-6:underline"></div>
```

### Estados de Formulário: `:required`, `:disabled`, `:invalid`

Estilize elementos de formulário em diferentes estados:

```html
<input
  type="text"
  value="tbone"
  disabled
  class="invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-pink-500 focus:invalid:outline-pink-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 ..."
/>
```

### Seletor `:has()`

Use a variante `has-*` para estilizar um elemento baseado no estado ou conteúdo de seus descendentes:

```html
<label class="has-checked:bg-indigo-50 has-checked:text-indigo-900 has-checked:ring-indigo-200 dark:has-checked:bg-indigo-950 dark:has-checked:text-indigo-200 dark:has-checked:ring-indigo-900 ...">
  <svg fill="currentColor"><!-- ... --></svg>
  Google Pay
  <input type="radio" class="checked:border-indigo-500 ..." />
</label>
```

### Seletor `:not()`

Use a variante `not-` para estilizar um elemento quando uma condição não é verdadeira:

```html
<button class="bg-indigo-600 hover:not-focus:bg-indigo-700">
  <!-- ... -->
</button>
```

---

## Estados Baseados em Elementos Pai

### Grupos (`group`)

Quando precisar estilizar um elemento baseado no estado de algum elemento pai, marque o pai com a classe `group` e use variantes `group-*`:

```html
<a href="#" class="group ...">
  <div>
    <svg class="stroke-sky-500 group-hover:stroke-white ..." fill="none" viewBox="0 0 24 24">
      <!-- ... -->
    </svg>
    <h3 class="text-gray-900 group-hover:text-white ...">Novo projeto</h3>
  </div>
  <p class="text-gray-500 group-hover:text-white ...">
    Crie um novo projeto a partir de uma variedade de templates iniciais.
  </p>
</a>
```

#### Diferenciando Grupos Aninhados

Quando aninhar grupos, você pode dar um nome único usando `group/{name}`:

```html
<ul role="list">
  {#each people as person}
    <li class="group/item ...">
      <a class="group/edit invisible group-hover/item:visible ..." href="tel:{person.phone}">
        <span class="group-hover/edit:text-gray-700 ...">Ligar</span>
        <svg class="group-hover/edit:translate-x-0.5 group-hover/edit:text-gray-500 ...">
          <!-- ... -->
        </svg>
      </a>
    </li>
  {/each}
</ul>
```

---

## Estados Baseados em Elementos Irmãos

### Peers (`peer`)

Quando precisar estilizar um elemento baseado no estado de um elemento irmão, marque o irmão com a classe `peer` e use variantes `peer-*`:

```html
<form>
  <label class="block">
    <span class="...">Email</span>
    <input type="email" class="peer ..." />
    <p class="invisible peer-invalid:visible ...">
      Por favor, forneça um endereço de email válido.
    </p>
  </label>
</form>
```

#### Diferenciando Peers

Para usar múltiplos peers, dê um nome único usando `peer/{name}`:

```html
<fieldset>
  <legend>Status de publicação</legend>
  <input id="draft" class="peer/draft" type="radio" name="status" checked />
  <label for="draft" class="peer-checked/draft:text-sky-500">Rascunho</label>
  
  <input id="published" class="peer/published" type="radio" name="status" />
  <label for="published" class="peer-checked/published:text-sky-500">Publicado</label>
  
  <div class="hidden peer-checked/draft:block">
    Rascunhos são visíveis apenas para administradores.
  </div>
  <div class="hidden peer-checked/published:block">
    Seu post será publicamente visível no seu site.
  </div>
</fieldset>
```

---

## Pseudo-elementos

### `::before` e `::after`

Estilize os pseudo-elementos `::before` e `::after` usando as variantes `before` e `after`:

```html
<label>
  <span class="text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*'] ...">
    Email
  </span>
  <input type="email" name="email" class="..." placeholder="voce@exemplo.com" />
</label>
```

### Outros Pseudo-elementos

#### `::placeholder`
```html
<input
  class="placeholder:text-gray-500 placeholder:italic ..."
  placeholder="Buscar por qualquer coisa..."
  type="text"
  name="search"
/>
```

#### `::file`
```html
<input
  type="file"
  class="file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100 ..."
/>
```

#### `::marker`
```html
<ul role="list" class="list-disc marker:text-sky-400 ...">
  <li>5 xícaras de cogumelos Porcini picados</li>
  <li>1/2 xícara de azeite</li>
  <li>3lb de aipo</li>
</ul>
```

#### `::selection`
```html
<div class="selection:bg-fuchsia-300 selection:text-fuchsia-900">
  <p>
    Então comecei a caminhar na água. Não vou mentir para vocês, eu estava aterrorizado...
  </p>
</div>
```

---

## Media Queries e Feature Queries

### Breakpoints Responsivos

Para estilizar um elemento em um breakpoint específico, use variantes responsivas como `md` e `lg`:

```html
<div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
  <!-- ... -->
</div>
```

### Container Queries

Para estilizar baseado na largura de um elemento pai em vez do viewport, use variantes como `@md` e `@lg`:

```html
<div class="@container">
  <div class="flex flex-col @md:flex-row">
    <!-- ... -->
  </div>
</div>
```

### Modo Escuro (`prefers-color-scheme`)

Use utilitários sem variante para o modo claro e a variante `dark` para sobrescrever no modo escuro:

```html
<div class="bg-white dark:bg-gray-900 ...">
  <h3 class="text-gray-900 dark:text-white ...">Escreve de cabeça para baixo</h3>
  <p class="text-gray-500 dark:text-gray-400 ...">
    A Caneta Zero Gravity pode ser usada para escrever em qualquer orientação...
  </p>
</div>
```

### Movimento Reduzido (`prefers-reduced-motion`)

Use a variante `motion-reduce` para adicionar estilos condicionalmente quando o usuário solicitou movimento reduzido:

```html
<button type="button" class="bg-indigo-500 ..." disabled>
  <svg class="animate-spin motion-reduce:hidden ..." viewBox="0 0 24 24">
    <!-- ... -->
  </svg>
  Processando...
</button>
```

### Outras Media Queries

#### `prefers-contrast`
```html
<input class="border-gray-200 placeholder-gray-400 contrast-more:border-gray-400 contrast-more:placeholder-gray-500 ..." />
```

#### `orientation`
```html
<div class="portrait:hidden">
  <!-- Conteúdo oculto no modo retrato -->
</div>
<div class="landscape:hidden">
  <p>Esta experiência foi projetada para ser vista no modo paisagem.</p>
</div>
```

#### `print`
```html
<div>
  <article class="print:hidden">
    <h1>Minha Receita Secreta de Pizza</h1>
    <!-- ... -->
  </article>
  <div class="hidden print:block">
    Você está mesmo tentando imprimir isso? É secreto!
  </div>
</div>
```

---

## Seletores de Atributo

### Estados ARIA

Use a variante `aria-*` para estilizar condicionalmente baseado em atributos ARIA:

```html
<div aria-checked="true" class="bg-gray-600 aria-checked:bg-sky-700">
  <!-- ... -->
</div>
```

### Atributos de Dados (`data-*`)

Use a variante `data-*` para aplicar estilos condicionalmente baseado em atributos de dados:

```html
<!-- Verifica se o atributo existe -->
<div data-active class="border border-gray-300 data-active:border-purple-500">
  <!-- ... -->
</div>

<!-- Verifica um valor específico -->
<div data-size="large" class="data-[size=large]:p-8">
  <!-- ... -->
</div>
```

### Suporte RTL

Use as variantes `rtl` e `ltr` para layouts multidirecionais:

```html
<div class="group flex items-center">
  <img class="h-12 w-12 shrink-0 rounded-full" src="..." alt="" />
  <div class="ltr:ml-3 rtl:mr-3">
    <p class="text-gray-700 group-hover:text-gray-900 ...">...</p>
    <p class="text-gray-500 group-hover:text-gray-700 ...">...</p>
  </div>
</div>
```

### Estado Aberto/Fechado

Use a variante `open` para elementos `<details>` ou `<dialog>` em estado aberto:

```html
<details class="border border-transparent open:border-black/10 open:bg-gray-100 ..." open>
  <summary class="text-sm leading-6 font-semibold text-gray-900 select-none">
    Por que chamam de Ovaltine?
  </summary>
  <div class="mt-3 text-sm leading-6 text-gray-600">
    <p>A caneca é redonda. O pote é redondo. Deveriam chamar de Redondine.</p>
  </div>
</details>
```

---

## Seletores de Filhos

### Estilizando Filhos Diretos (`*`)

Use a variante `*` para estilizar filhos diretos que você não tem controle:

```html
<div>
  <h2>Categorias</h2>
  <ul class="*:rounded-full *:border *:border-sky-100 *:bg-sky-50 *:px-2 *:py-0.5 dark:text-sky-300 dark:*:border-sky-500/15 dark:*:bg-sky-500/10 ...">
    <li>Vendas</li>
    <li>Marketing</li>
    <li>SEO</li>
  </ul>
</div>
```

### Estilizando Todos os Descendentes (`**`)

A variante `**` aplica estilos a todos os descendentes, não apenas filhos diretos:

```html
<ul class="**:data-avatar:size-12 **:data-avatar:rounded-full ...">
  {#each items as item}
    <li>
      <img src={item.src} data-avatar />
      <p>{item.name}</p>
    </li>
  {/each}
</ul>
```

---

## Variantes Customizadas

### Usando Variantes Arbitrárias

Variantes arbitrárias permitem escrever seletores customizados diretamente no HTML:

```html
<ul role="list">
  {#each items as item}
    <li class="[&.is-dragging]:cursor-grabbing">{item}</li>
  {/each}
</ul>
```

### Registrando uma Variante Customizada

Para variantes arbitrárias usadas múltiplas vezes, crie uma variante customizada usando a diretiva `@custom-variant`:

```css
@custom-variant theme-midnight (&:where([data-theme="midnight"] *));
```

Agora você pode usar a variante `theme-midnight:<utility>` no seu HTML:

```html
<html data-theme="midnight">
  <button class="theme-midnight:bg-black ..."></button>
</html>
```

---

## Referência Rápida

### Tabela de Variantes Principais

| Variante | Descrição | Seletor CSS |
|----------|-----------|-------------|
| `hover` | Ao passar o mouse | `@media (hover: hover) { &:hover }` |
| `focus` | Quando focado | `&:focus` |
| `active` | Quando ativo/pressionado | `&:active` |
| `first` | Primeiro filho | `&:first-child` |
| `last` | Último filho | `&:last-child` |
| `odd` | Filhos ímpares | `&:nth-child(odd)` |
| `even` | Filhos pares | `&:nth-child(even)` |
| `disabled` | Quando desabilitado | `&:disabled` |
| `checked` | Quando marcado | `&:checked` |
| `dark` | Modo escuro | `@media (prefers-color-scheme: dark)` |
| `md` | Breakpoint médio | `@media (width >= 48rem)` |
| `lg` | Breakpoint grande | `@media (width >= 64rem)` |

### Dicas de Uso

1. **Combine variantes:** `dark:md:hover:bg-blue-500`
2. **Use grupos para elementos pai:** `group-hover:bg-red-500`
3. **Use peers para elementos irmãos:** `peer-invalid:text-red-500`
4. **Crie variantes arbitrárias:** `[&.custom-class]:bg-red-500`
5. **Registre variantes customizadas para reutilização**

---

*Este guia cobre todas as variantes disponíveis no Tailwind CSS v4 para controlar quando e como os estilos são aplicados baseados em diferentes estados e condições.*

