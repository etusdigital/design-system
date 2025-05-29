# Flex

## Classes disponíveis

| Classe | Propriedade CSS | Descrição |
|--------|----------------|-----------|
| `flex-<number>` | `flex: <number>;` | Define um número específico para flex |
| `flex-<fraction>` | `flex: calc(<fraction> * 100%);` | Define uma fração como valor flex |
| `flex-auto` | `flex: 1 1 auto;` | Permite crescer e encolher baseado no tamanho inicial |
| `flex-initial` | `flex: 0 1 auto;` | Permite apenas encolher, mantém tamanho inicial |
| `flex-none` | `flex: none;` | Impede crescimento e encolhimento |
| `flex-(<custom-property>)` | `flex: var(<custom-property>);` | Usa uma propriedade CSS customizada |
| `flex-[<value>]` | `flex: <value>;` | Define um valor customizado arbitrário |

## Exemplos

### Exemplo básico

Use utilitários `flex-<number>` como `flex-1` para permitir que um item flex cresça e encolha conforme necessário, ignorando seu tamanho inicial:

**Classe:** `flex-1`

```html
<div class="flex">
  <div class="w-14 flex-none">01</div>
  <div class="w-64 flex-1">02</div>
  <div class="w-32 flex-1">03</div>
</div>
```

### Initial

Use `flex-initial` para permitir que um item flex encolha mas não cresça, levando em conta seu tamanho inicial:

**Classe:** `flex-initial`

```html
<div class="flex">
  <div class="w-14 flex-none">01</div>
  <div class="w-64 flex-initial">02</div>
  <div class="w-32 flex-initial">03</div>
</div>
```

### Auto

Use `flex-auto` para permitir que um item flex cresça e encolha, levando em conta seu tamanho inicial:

**Classe:** `flex-auto`

```html
<div class="flex">
  <div class="w-14 flex-none">01</div>
  <div class="w-64 flex-auto">02</div>
  <div class="w-32 flex-auto">03</div>
</div>
```

### None

Use `flex-none` para impedir que um item flex cresça ou encolha:

**Classe:** `flex-none`

```html
<div class="flex">
  <div class="w-14 flex-none">01</div>
  <div class="w-32 flex-none">02</div>
  <div class="flex-1">03</div>
</div>
```

### Usando um valor customizado

Use a sintaxe `flex-[<value>]` para definir a propriedade flex shorthand baseada em um valor completamente customizado:

**Classe:** `flex-[<value>]`

```html
<div class="flex-[3_1_auto]">
  <!-- Conteúdo -->
</div>
```

Para variáveis CSS, você também pode usar a sintaxe `flex-(<custom-property>)`:

**Classe:** `flex-(<custom-property>)`

```html
<div class="flex-(--my-flex)">
  <!-- Conteúdo -->
</div>
```

Isso é apenas um atalho para `flex-[var(<custom-property>)]` que adiciona a função `var()` automaticamente.

### Design responsivo

Prefixe um utilitário flex com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em telas médias e maiores:

**Exemplo:** `flex-none md:flex-1`

```html
<div class="flex-none md:flex-1">
  <!-- Conteúdo -->
</div>
```

Saiba mais sobre o uso de variantes na [documentação de variantes](../variants.md).

## Notas Importantes

- No Tailwind CSS v4, certifique-se de importar o Tailwind usando `@import "tailwindcss";` em vez das diretivas `@tailwind` separadas
- Os utilitários flex são essenciais para criar layouts flexíveis e responsivos
- Combine com outras classes de layout para obter o controle total sobre o comportamento dos elementos flex

