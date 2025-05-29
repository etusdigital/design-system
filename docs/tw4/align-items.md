# align-items

Utilitários para controlar como os itens flexíveis são alinhados ao longo do eixo transversal do contêiner.

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `items-start` | `align-items: flex-start;` |
| `items-end` | `align-items: flex-end;` |
| `items-end-safe` | `align-items: safe flex-end;` |
| `items-center` | `align-items: center;` |
| `items-center-safe` | `align-items: safe center;` |
| `items-baseline` | `align-items: baseline;` |
| `items-baseline-last` | `align-items: last baseline;` |
| `items-stretch` | `align-items: stretch;` |

## Exemplos

### Stretch

Use o utilitário `items-stretch` para esticar os itens e preencher o eixo transversal do contêiner:

```html
<div class="flex items-stretch ...">
  <div class="py-4">01</div>
  <div class="py-12">02</div>
  <div class="py-8">03</div>
</div>
```

### Start

Use o utilitário `items-start` para alinhar os itens ao início do eixo transversal do contêiner:

```html
<div class="flex items-start ...">
  <div class="py-4">01</div>
  <div class="py-12">02</div>
  <div class="py-8">03</div>
</div>
```

### Center

Use o utilitário `items-center` para alinhar os itens ao longo do centro do eixo transversal do contêiner:

```html
<div class="flex items-center ...">
  <div class="py-4">01</div>
  <div class="py-12">02</div>
  <div class="py-8">03</div>
</div>
```

### End

Use o utilitário `items-end` para alinhar os itens ao final do eixo transversal do contêiner:

```html
<div class="flex items-end ...">
  <div class="py-4">01</div>
  <div class="py-12">02</div>
  <div class="py-8">03</div>
</div>
```

### Baseline

Use o utilitário `items-baseline` para alinhar os itens ao longo do eixo transversal do contêiner de forma que todas as suas linhas de base se alinhem:

```html
<div class="flex items-baseline ...">
  <div class="pt-2 pb-6">01</div>
  <div class="pt-8 pb-12">02</div>
  <div class="pt-12 pb-4">03</div>
</div>
```

### Last baseline

Use o utilitário `items-baseline-last` para alinhar os itens ao longo do eixo transversal do contêiner de forma que todas as suas linhas de base se alinhem com a última linha de base no contêiner:

```html
<div class="grid grid-cols-[1fr_auto] items-baseline-last">
  <div>
    <img src="img/spencer-sharp.jpg" />
    <h4>Spencer Sharp</h4>
    <p>Trabalhando no futuro do recrutamento de astronautas na Space Recruit.</p>
  </div>
  <p>spacerecruit.com</p>
</div>
```

Isso é útil para garantir que os itens de texto se alinhem entre si, mesmo que tenham alturas diferentes.

### Design Responsivo

Prefixe um utilitário de `align-items` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e acima:

```html
<div class="flex items-stretch md:items-center ...">
  <!-- ... -->
</div>
```

Saiba mais sobre o uso de variantes na documentação de variantes.

