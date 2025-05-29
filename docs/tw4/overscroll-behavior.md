# overscroll-behavior

Utilitários para controlar como um contêiner se comporta quando o conteúdo interno atinge os limites do scroll.

## Classes Disponíveis

### Comportamento geral

| Classe | Propriedade CSS |
| --- | --- |
| `overscroll-auto` | `overscroll-behavior: auto;` |
| `overscroll-contain` | `overscroll-behavior: contain;` |
| `overscroll-none` | `overscroll-behavior: none;` |

### Comportamento horizontal (eixo X)

| Classe | Propriedade CSS |
| --- | --- |
| `overscroll-x-auto` | `overscroll-behavior-x: auto;` |
| `overscroll-x-contain` | `overscroll-behavior-x: contain;` |
| `overscroll-x-none` | `overscroll-behavior-x: none;` |

### Comportamento vertical (eixo Y)

| Classe | Propriedade CSS |
| --- | --- |
| `overscroll-y-auto` | `overscroll-behavior-y: auto;` |
| `overscroll-y-contain` | `overscroll-behavior-y: contain;` |
| `overscroll-y-none` | `overscroll-behavior-y: none;` |

## Exemplos

### Prevenindo o overscroll do elemento pai

Use o utilitário `overscroll-contain` para prevenir que o scroll na área de destino dispare o scroll no elemento pai, mas preserve os efeitos de "bounce" quando fizer scroll além do final do contêiner em sistemas operacionais que suportam:

**Classe:** `overscroll-contain`

**Comportamento:** Scroll para ver o comportamento

> Well, let me tell you something, funny boy. Y'know that little stamp, the one that says "New York Public Library"? Well that may not mean anything to you, but that means a lot to me. One whole hell of a lot.
> 
> Sure, go ahead, laugh if you want to. I've seen your type before: Flashy, making the scene, flaunting convention. Yeah, I know what you're thinking. What's this guy making such a big stink about old library books? Well, let me give you a hint, junior.
> 
> Maybe we can live without libraries, people like you and me. Maybe. Sure, we're too old to change the world, but what about that kid, sitting down, opening a book, right now, in a branch at the local library and finding drawings of pee-pees and wee-wees on the Cat in the Hat and the Five Chinese Brothers? Doesn't HE deserve better?

```html
<div class="overscroll-contain ...">
  Well, let me tell you something, ...
</div>
```

### Prevenindo o efeito bounce do overscroll

Use o utilitário `overscroll-none` para prevenir que o scroll na área de destino dispare o scroll no elemento pai, e também prevenir os efeitos de "bounce" quando fizer scroll além do final do contêiner:

**Classe:** `overscroll-none`

**Comportamento:** Scroll para ver o comportamento

> Well, let me tell you something, funny boy. Y'know that little stamp, the one that says "New York Public Library"? Well that may not mean anything to you, but that means a lot to me. One whole hell of a lot.
> 
> Sure, go ahead, laugh if you want to. I've seen your type before: Flashy, making the scene, flaunting convention. Yeah, I know what you're thinking. What's this guy making such a big stink about old library books? Well, let me give you a hint, junior.
> 
> Maybe we can live without libraries, people like you and me. Maybe. Sure, we're too old to change the world, but what about that kid, sitting down, opening a book, right now, in a branch at the local library and finding drawings of pee-pees and wee-wees on the Cat in the Hat and the Five Chinese Brothers? Doesn't HE deserve better?

```html
<div class="overscroll-none ...">
  Well, let me tell you something, ...
</div>
```

### Usando o comportamento padrão de overscroll

Use o utilitário `overscroll-auto` para permitir que o usuário continue fazendo scroll na área de scroll pai quando atingir os limites da área de scroll primária:

**Classe:** `overscroll-auto`

**Comportamento:** Scroll para ver o comportamento

> Well, let me tell you something, funny boy. Y'know that little stamp, the one that says "New York Public Library"? Well that may not mean anything to you, but that means a lot to me. One whole hell of a lot.
> 
> Sure, go ahead, laugh if you want to. I've seen your type before: Flashy, making the scene, flaunting convention. Yeah, I know what you're thinking. What's this guy making such a big stink about old library books? Well, let me give you a hint, junior.
> 
> Maybe we can live without libraries, people like you and me. Maybe. Sure, we're too old to change the world, but what about that kid, sitting down, opening a book, right now, in a branch at the local library and finding drawings of pee-pees and wee-wees on the Cat in the Hat and the Five Chinese Brothers? Doesn't HE deserve better?

```html
<div class="overscroll-auto ...">
  Well, let me tell you something, ...
</div>
```

## Design Responsivo

Prefixe um utilitário de overscroll-behavior com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e maiores:

```html
<div class="overscroll-auto md:overscroll-contain ...">
  <!-- ... -->
</div>
```

Saiba mais sobre o uso de variantes na [documentação de variantes](../variants).

## Casos de Uso Comuns

- **Modais e overlays:** Use `overscroll-contain` para prevenir que o scroll do modal afete a página de fundo
- **Carrosséis e galerias:** Use `overscroll-none` para prevenir efeitos indesejados nos limites
- **Áreas de scroll aninhadas:** Use `overscroll-auto` para permitir scroll contínuo entre contêineres pai e filho
