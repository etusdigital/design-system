# Clear

As utilidades `clear` controlam como um elemento é posicionado em relação a elementos flutuantes (float).

## Classes Disponíveis

| Classe | Propriedade CSS | Descrição |
|--------|----------------|-----------|
| `clear-left` | `clear: left;` | Posiciona o elemento abaixo de elementos flutuantes à esquerda |
| `clear-right` | `clear: right;` | Posiciona o elemento abaixo de elementos flutuantes à direita |
| `clear-both` | `clear: both;` | Posiciona o elemento abaixo de todos os elementos flutuantes |
| `clear-start` | `clear: inline-start;` | Posiciona o elemento usando propriedades lógicas (início) |
| `clear-end` | `clear: inline-end;` | Posiciona o elemento usando propriedades lógicas (fim) |
| `clear-none` | `clear: none;` | Remove qualquer clear aplicado ao elemento |

## Exemplos

### Clearing Left

Use a utilidade `clear-left` para posicionar um elemento abaixo de qualquer elemento flutuante à esquerda anterior:

```html
<article>
  <img class="float-left ..." src="/img/snow-mountains.jpg" />
  <img class="float-right ..." src="/img/green-mountains.jpg" />
  <p class="clear-left ...">
    Maybe we can live without libraries, people like you and me. Maybe. Sure, we're too old to change the world, but what about that kid, sitting down, opening a book, right now, in a branch at the local library and finding drawings of pee-pees and wee-wees on the Cat in the Hat and the Five Chinese Brothers? Doesn't HE deserve better? Look. If you think this is about overdue fines and missing books, you'd better think again. This is about that kid's right to read a book without getting his mind warped! Or: maybe that turns you on, Seinfeld; maybe that's how y'get your kicks. You and your good-time buddies.
  </p>
</article>
```

### Clearing Right

Use a utilidade `clear-right` para posicionar um elemento abaixo de qualquer elemento flutuante à direita anterior:

```html
<article>
  <img class="float-left ..." src="/img/green-mountains.jpg" />
  <img class="float-right ..." src="/img/snow-mountains.jpg" />
  <p class="clear-right ...">
    Maybe we can live without libraries, people like you and me. Maybe. Sure, we're too old to change the world, but what about that kid, sitting down, opening a book, right now, in a branch at the local library and finding drawings of pee-pees and wee-wees on the Cat in the Hat and the Five Chinese Brothers? Doesn't HE deserve better? Look. If you think this is about overdue fines and missing books, you'd better think again. This is about that kid's right to read a book without getting his mind warped! Or: maybe that turns you on, Seinfeld; maybe that's how y'get your kicks. You and your good-time buddies.
  </p>
</article>
```

### Clearing All

Use a utilidade `clear-both` para posicionar um elemento abaixo de todos os elementos flutuantes anteriores:

```html
<article>
  <img class="float-left ..." src="/img/snow-mountains.jpg" />
  <img class="float-right ..." src="/img/green-mountains.jpg" />
  <p class="clear-both ...">
    Maybe we can live without libraries, people like you and me. Maybe. Sure, we're too old to change the world, but what about that kid, sitting down, opening a book, right now, in a branch at the local library and finding drawings of pee-pees and wee-wees on the Cat in the Hat and the Five Chinese Brothers? Doesn't HE deserve better? Look. If you think this is about overdue fines and missing books, you'd better think again. This is about that kid's right to read a book without getting his mind warped! Or: maybe that turns you on, Seinfeld; maybe that's how y'get your kicks. You and your good-time buddies.
  </p>
</article>
```

### Usando Propriedades Lógicas

Use as utilidades `clear-start` e `clear-end`, que utilizam propriedades lógicas para mapear para o lado esquerdo ou direito baseado na direção do texto:

```html
<article dir="rtl">
  <img class="float-left ..." src="/img/green-mountains.jpg" />
  <img class="float-right ..." src="/img/green-mountains.jpg" />
  <p class="clear-end ...">
    ربما يمكننا العيش بدون مكتبات، أشخاص مثلي ومثلك. ربما. بالتأكيد، نحن أكبر من أن نغير العالم، ولكن ماذا عن ذلك الطفل الذي يجلس ويفتح كتابًا الآن في أحد فروع المكتبة المحلية ويجد رسومات للتبول والبول على القطة في القبعة والإخوة الصينيون الخمسة؟ ألا يستحق الأفضل؟ ينظر. إذا كنت تعتقد أن الأمر يتعلق بالغرامات المتأخرة والكتب المفقودة، فمن الأفضل أن تفكر مرة أخرى. يتعلق الأمر بحق ذلك الطفل في قراءة كتاب دون أن يتشوه عقله! أو: ربما يثيرك هذا يا سينفيلد؛ ربما هذه هي الطريقة التي تحصل بها على ركلاتك. أنت ورفاقك الطيبين.
  </p>
</article>
```

### Desabilitando Clears

Use a utilidade `clear-none` para resetar qualquer clear que esteja aplicado a um elemento:

```html
<article>
  <img class="float-left ..." src="/img/green-mountains.jpg" />
  <img class="float-right ..." src="/img/snow-mountains.jpg" />
  <p class="clear-none ...">
    Maybe we can live without libraries, people like you and me. Maybe. Sure, we're too old to change the world, but what about that kid, sitting down, opening a book, right now, in a branch at the local library and finding drawings of pee-pees and wee-wees on the Cat in the Hat and the Five Chinese Brothers? Doesn't HE deserve better? Look. If you think this is about overdue fines and missing books, you'd better think again. This is about that kid's right to read a book without getting his mind warped! Or: maybe that turns you on, Seinfeld; maybe that's how y'get your kicks. You and your good-time buddies.
  </p>
</article>
```

### Design Responsivo

Prefixe uma utilidade clear com uma variante de breakpoint como `md:` para aplicar a utilidade apenas em tamanhos de tela médios e acima:

```html
<p class="clear-left md:clear-none ...">
  Lorem ipsum dolor sit amet...
</p>
```

Saiba mais sobre o uso de variantes na [documentação de variantes](../variants).

