# List Style Type

O Tailwind CSS v4 oferece utilitários para controlar o estilo dos marcadores em listas através da propriedade `list-style-type`.

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `list-disc` | `list-style-type: disc;` |
| `list-decimal` | `list-style-type: decimal;` |
| `list-none` | `list-style-type: none;` |
| `list-(<custom-property>)` | `list-style-type: var(<custom-property>);` |
| `list-[<value>]` | `list-style-type: <value>;` |

## Exemplos

### Exemplo Básico

Use utilitários como `list-disc` e `list-decimal` para controlar o estilo dos marcadores em uma lista:

#### Lista com Discos (`list-disc`)

```html
<ul class="list-disc pl-6">
  <li>Now this is a story all about how, my life got flipped-turned upside down</li>
  <li>And I'd like to take a minute just sit right there</li>
  <li>I'll tell you how I became the prince of a town called Bel-Air</li>
</ul>
```

#### Lista Numerada (`list-decimal`)

```html
<ol class="list-decimal pl-6">
  <li>Now this is a story all about how, my life got flipped-turned upside down</li>
  <li>And I'd like to take a minute just sit right there</li>
  <li>I'll tell you how I became the prince of a town called Bel-Air</li>
</ol>
```

#### Lista Sem Marcadores (`list-none`)

```html
<ul class="list-none">
  <li>Now this is a story all about how, my life got flipped-turned upside down</li>
  <li>And I'd like to take a minute just sit right there</li>
  <li>I'll tell you how I became the prince of a town called Bel-Air</li>
</ul>
```

### Usando Valores Customizados

#### Sintaxe com Colchetes (`list-[<value>]`)

Use a sintaxe `list-[<value>]` para definir marcadores baseados em valores completamente customizados:

```html
<ol class="list-[upper-roman] pl-8">
  <li>Primeiro item</li>
  <li>Segundo item</li>
  <li>Terceiro item</li>
</ol>
```

#### Variáveis CSS (`list-(<custom-property>)`)

Para variáveis CSS, você também pode usar a sintaxe `list-(<custom-property>)`:

```html
<ol class="list-(--my-marker) pl-6">
  <li>Item com marcador customizado</li>
  <li>Outro item</li>
</ol>
```

> **Nota:** Esta é apenas uma forma abreviada de `list-[var(<custom-property>)]` que adiciona automaticamente a função `var()` para você.

### Design Responsivo

Prefixe um utilitário de `list-style-type` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e acima:

```html
<ul class="list-none md:list-disc pl-6">
  <li>Este item não terá marcador em telas pequenas</li>
  <li>Mas terá disco em telas médias e maiores</li>
  <li>Útil para layouts responsivos</li>
</ul>
```

## Variantes Disponíveis

- **Responsive:** `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- **State:** `hover:`, `focus:`, `active:`
- **Dark mode:** `dark:`

Para saber mais sobre o uso de variantes, consulte a [documentação de variantes](../variants.md).

## Exemplos Práticos

### Lista de Navegação

```html
<nav>
  <ul class="list-none space-y-2">
    <li><a href="#home" class="text-blue-600 hover:text-blue-800">Home</a></li>
    <li><a href="#about" class="text-blue-600 hover:text-blue-800">Sobre</a></li>
    <li><a href="#contact" class="text-blue-600 hover:text-blue-800">Contato</a></li>
  </ul>
</nav>
```

### Lista de Instruções

```html
<ol class="list-decimal pl-6 space-y-2">
  <li>Configure seu ambiente de desenvolvimento</li>
  <li>Instale as dependências necessárias</li>
  <li>Execute o projeto localmente</li>
  <li>Faça seus primeiros commits</li>
</ol>
```

