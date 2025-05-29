# Float

Utilitários para controlar a flutuação (float) de elementos.

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `float-right` | `float: right;` |
| `float-left` | `float: left;` |
| `float-start` | `float: inline-start;` |
| `float-end` | `float: inline-end;` |
| `float-none` | `float: none;` |

## Exemplos

### Flutuando elementos à direita

Use o utilitário `float-right` para flutuar um elemento à direita do seu container:

```html
<article>
  <img class="float-right ..." src="/img/mountains.jpg" />
  <p>Maybe we can live without libraries, people like you and me. Maybe. Sure, we're too old to change the world, but what about that kid, sitting down, opening a book, right now, in a branch at the local library and finding drawings of pee-pees and wee-wees on the Cat in the Hat and the Five Chinese Brothers? Doesn't HE deserve better? Look. If you think this is about overdue fines and missing books, you'd better think again. This is about that kid's right to read a book without getting his mind warped! Or: maybe that turns you on, Seinfeld; maybe that's how y'get your kicks. You and your good-time buddies.</p>
</article>
```

**Resultado:** O elemento flutua à direita do container.

### Flutuando elementos à esquerda

Use o utilitário `float-left` para flutuar um elemento à esquerda do seu container:

```html
<article>
  <img class="float-left ..." src="/img/mountains.jpg" />
  <p>Maybe we can live without libraries, people like you and me. Maybe. Sure, we're too old to change the world, but what about that kid, sitting down, opening a book, right now, in a branch at the local library and finding drawings of pee-pees and wee-wees on the Cat in the Hat and the Five Chinese Brothers? Doesn't HE deserve better? Look. If you think this is about overdue fines and missing books, you'd better think again. This is about that kid's right to read a book without getting his mind warped! Or: maybe that turns you on, Seinfeld; maybe that's how y'get your kicks. You and your good-time buddies.</p>
</article>
```

**Resultado:** O elemento flutua à esquerda do container.

### Usando propriedades lógicas

Use os utilitários `float-start` e `float-end`, que utilizam propriedades lógicas para mapear para o lado esquerdo ou direito baseado na direção do texto:

#### Direção da esquerda para a direita (LTR)

```html
<article>
  <img class="float-start ..." src="/img/mountains.jpg" />
  <p>Maybe we can live without libraries, people like you and me. Maybe. Sure, we're too old to change the world, but what about that kid, sitting down, opening a book, right now, in a branch at the local library and finding drawings of pee-pees and wee-wees on the Cat in the Hat and the Five Chinese Brothers? Doesn't HE deserve better? Look. If you think this is about overdue fines and missing books, you'd better think again. This is about that kid's right to read a book without getting his mind warped! Or: maybe that turns you on, Seinfeld; maybe that's how y'get your kicks. You and your good-time buddies.</p>
</article>
```

#### Direção da direita para a esquerda (RTL)

```html
<article dir="rtl">
  <img class="float-start ..." src="/img/mountains.jpg" />
  <p>ربما يمكننا العيش بدون مكتبات، أشخاص مثلي ومثلك. ربما. بالتأكيد، نحن أكبر من أن نغير العالم، ولكن ماذا عن ذلك الطفل الذي يجلس ويفتح كتابًا الآن في أحد فروع المكتبة المحلية ويجد رسومات للتبول والبول على القطة في القبعة والإخوة الصينيون الخمسة؟ ألا يستحق الأفضل؟ ينظر. إذا كنت تعتقد أن الأمر يتعلق بالغرامات المتأخرة والكتب المفقودة، فمن الأفضل أن تفكر مرة أخرى. يتعلق الأمر بحق ذلك الطفل في قراءة كتاب دون أن يتشوه عقله! أو: ربما يثيرك هذا يا سينفيلد؛ ربما هذه هي الطريقة التي تحصل بها على ركلاتك. أنت ورفاقك الطيبين.</p>
</article>
```

**Nota:** `float-start` se adapta automaticamente à direção do texto (esquerda em LTR, direita em RTL).

### Desabilitando float

Use o utilitário `float-none` para remover qualquer flutuação aplicada a um elemento:

```html
<article>
  <img class="float-none ..." src="/img/mountains.jpg" />
  <p>Maybe we can live without libraries, people like you and me. Maybe. Sure, we're too old to change the world, but what about that kid, sitting down, opening a book, right now, in a branch at the local library and finding drawings of pee-pees and wee-wees on the Cat in the Hat and the Five Chinese Brothers? Doesn't HE deserve better? Look. If you think this is about overdue fines and missing books, you'd better think again. This is about that kid's right to read a book without getting his mind warped! Or: maybe that turns you on, Seinfeld; maybe that's how y'get your kicks. You and your good-time buddies.</p>
</article>
```

**Resultado:** O elemento não flutua, mantém seu comportamento normal de layout.

## Design Responsivo

Prefixe um utilitário float com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e maiores:

```html
<img class="float-right md:float-left" src="/img/mountains.jpg" />
```

**Exemplo:** Flutua à direita por padrão, mas flutua à esquerda em telas médias e maiores.

---

Saiba mais sobre o uso de variantes na [documentação de variantes](../variants.md).

