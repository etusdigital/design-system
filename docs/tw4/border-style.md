# Border Style

## Utilitários Disponíveis

### Estilos de Borda

| Classe | Propriedade CSS |
|--------|----------------|
| `border-solid` | `border-style: solid;` |
| `border-dashed` | `border-style: dashed;` |
| `border-dotted` | `border-style: dotted;` |
| `border-double` | `border-style: double;` |
| `border-hidden` | `border-style: hidden;` |
| `border-none` | `border-style: none;` |

### Estilos de Divisor

| Classe | Propriedade CSS |
|--------|----------------|
| `divide-solid` | `& > :not(:last-child) { border-style: solid; }` |
| `divide-dashed` | `& > :not(:last-child) { border-style: dashed; }` |
| `divide-dotted` | `& > :not(:last-child) { border-style: dotted; }` |
| `divide-double` | `& > :not(:last-child) { border-style: double; }` |
| `divide-hidden` | `& > :not(:last-child) { border-style: hidden; }` |
| `divide-none` | `& > :not(:last-child) { border-style: none; }` |

## Exemplos

### Exemplo Básico

Use utilitários como `border-solid` e `border-dotted` para controlar o estilo da borda de um elemento:

```html
<div class="border-2 border-solid ...">border-solid</div>
<div class="border-2 border-dashed ...">border-dashed</div>
<div class="border-2 border-dotted ...">border-dotted</div>
<div class="border-4 border-double ...">border-double</div>
```

### Removendo uma Borda

Use o utilitário `border-none` para remover uma borda existente de um elemento:

```html
<button class="border-none ...">Save Changes</button>
```

Isso é mais comumente usado para remover um estilo de borda que foi aplicado em um breakpoint menor.

### Definindo o Estilo do Divisor

Use utilitários como `divide-dashed` e `divide-dotted` para controlar o estilo da borda entre elementos filhos:

```html
<div class="grid grid-cols-3 divide-x-3 divide-dashed divide-indigo-500">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

### Design Responsivo

Prefixe um utilitário de `border-style` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e acima:

```html
<div class="border-solid md:border-dotted ...">
  <!-- ... -->
</div>
```

Aprenda mais sobre o uso de variantes na documentação de variantes.

