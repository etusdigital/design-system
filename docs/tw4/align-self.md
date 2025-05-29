# Align Self

Utilitários para controlar como um item flexível é alinhado ao longo do eixo cruzado de seu contêiner.

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `self-auto` | `align-self: auto;` |
| `self-start` | `align-self: flex-start;` |
| `self-end` | `align-self: flex-end;` |
| `self-end-safe` | `align-self: safe flex-end;` |
| `self-center` | `align-self: center;` |
| `self-center-safe` | `align-self: safe center;` |
| `self-stretch` | `align-self: stretch;` |
| `self-baseline` | `align-self: baseline;` |
| `self-baseline-last` | `align-self: last baseline;` |

## Exemplos

### Auto

Use a classe `self-auto` para alinhar um item com base no valor da propriedade `align-items` do contêiner:

```html
<div class="flex items-stretch ...">
  <div>01</div>
  <div class="self-auto ...">02</div>
  <div>03</div>
</div>
```

### Start

Use a classe `self-start` para alinhar um item ao início do eixo cruzado do contêiner, independentemente do valor `align-items` do contêiner:

```html
<div class="flex items-stretch ...">
  <div>01</div>
  <div class="self-start ...">02</div>
  <div>03</div>
</div>
```

### Center

Use a classe `self-center` para alinhar um item ao centro do eixo cruzado do contêiner, independentemente do valor `align-items` do contêiner:

```html
<div class="flex items-stretch ...">
  <div>01</div>
  <div class="self-center ...">02</div>
  <div>03</div>
</div>
```

### End

Use a classe `self-end` para alinhar um item ao final do eixo cruzado do contêiner, independentemente do valor `align-items` do contêiner:

```html
<div class="flex items-stretch ...">
  <div>01</div>
  <div class="self-end ...">02</div>
  <div>03</div>
</div>
```

### Stretch

Use a classe `self-stretch` para esticar um item para preencher o eixo cruzado do contêiner, independentemente do valor `align-items` do contêiner:

```html
<div class="flex items-stretch ...">
  <div>01</div>
  <div class="self-stretch ...">02</div>
  <div>03</div>
</div>
```

### Baseline

Use a classe `self-baseline` para alinhar um item de forma que sua linha de base se alinhe com a linha de base do eixo cruzado do contêiner flexível:

```html
<div class="flex ...">
  <div class="self-baseline pt-2 pb-6">01</div>
  <div class="self-baseline pt-8 pb-12">02</div>
  <div class="self-baseline pt-12 pb-4">03</div>
</div>
```

### Last Baseline

Use a classe `self-baseline-last` para alinhar um item ao longo do eixo cruzado do contêiner de forma que sua linha de base se alinhe com a última linha de base no contêiner:

```html
<div class="grid grid-cols-[1fr_auto]">
  <div>
    <img src="img/spencer-sharp.jpg" />
    <h4>Spencer Sharp</h4>
    <p class="self-baseline-last">Trabalhando no futuro do recrutamento de astronautas na Space Recruit.</p>
  </div>
  <p class="self-baseline-last">spacerecruit.com</p>
</div>
```

Isso é útil para garantir que itens de texto se alinhem entre si, mesmo que tenham alturas diferentes.

## Design Responsivo

Prefixe um utilitário align-self com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e maiores:

```html
<div class="self-auto md:self-end ...">
  <!-- ... -->
</div>
```

Saiba mais sobre o uso de variantes na documentação de variantes.

