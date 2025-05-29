# Position

Esta documentação cobre as classes utilitárias de posicionamento do Tailwind CSS v4.

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|-----------------|
| `static` | `position: static;` |
| `fixed` | `position: fixed;` |
| `absolute` | `position: absolute;` |
| `relative` | `position: relative;` |
| `sticky` | `position: sticky;` |

## Exemplos

### Posicionamento Estático

Use a classe `static` para posicionar um elemento de acordo com o fluxo normal do documento:

```html
<div class="static ...">
  <p>Static parent</p>
  <div class="absolute bottom-0 left-0 ...">
    <p>Absolute child</p>
  </div>
</div>
```

**Resultado visual:**
```
┌─────────────────────┐
│ Static parent       │
│ Absolute child      │
└─────────────────────┘
```

Com elementos posicionados estaticamente, qualquer offset será ignorado e o elemento não servirá como referência de posição para filhos posicionados absolutamente.

### Posicionamento Relativo

Use a classe `relative` para posicionar um elemento de acordo com o fluxo normal do documento:

```html
<div class="relative ...">
  <p>Relative parent</p>
  <div class="absolute bottom-0 left-0 ...">
    <p>Absolute child</p>
  </div>
</div>
```

**Resultado visual:**
```
┌─────────────────────┐
│ Relative parent     │
│ Absolute child      │
└─────────────────────┘
```

Com elementos posicionados relativamente, qualquer offset é calculado em relação à posição normal do elemento e o elemento servirá como referência de posição para filhos posicionados absolutamente.

### Posicionamento Absoluto

Use a classe `absolute` para posicionar um elemento fora do fluxo normal do documento, fazendo com que elementos vizinhos ajam como se o elemento não existisse:

**Com posicionamento estático:**
```html
<div class="static ...">
  <div class="static ..."><p>Static child</p></div>
  <div class="inline-block ..."><p>Static sibling</p></div>
</div>
```

**Com posicionamento absoluto:**
```html
<div class="static ...">
  <div class="static ..."><p>Static parent</p></div>
  <div class="absolute ..."><p>Absolute child</p></div>
  <div class="inline-block ..."><p>Static sibling</p></div>
</div>
```

**Comparação visual:**
```
Estático:                    Absoluto:
┌─────────────────────┐     ┌─────────────────────┐
│ Static child        │     │ Static parent       │
│ Static sibling      │     │ Static sibling      │
└─────────────────────┘     │   ┌─────────────┐   │
                            │   │ Absolute    │   │
                            │   │ child       │   │
                            │   └─────────────┘   │
                            └─────────────────────┘
```

Com elementos posicionados absolutamente, qualquer offset é calculado em relação ao pai mais próximo que tenha uma posição diferente de `static`, e o elemento servirá como referência de posição para outros filhos posicionados absolutamente.

### Posicionamento Fixo

Use a classe `fixed` para posicionar um elemento em relação à janela do navegador:

```html
<div class="relative">
  <div class="fixed top-0 right-0 left-0">Contacts</div>
  <div>
    <div>
      <img src="/img/andrew.jpg" />
      <strong>Andrew Alfred</strong>
    </div>
    <div>
      <img src="/img/debra.jpg" />
      <strong>Debra Houston</strong>
    </div>
    <!-- ... -->
  </div>
</div>
```

**Comportamento:**
- O elemento fica fixo na tela mesmo com o scroll
- Offsets são calculados em relação ao viewport
- O elemento serve como referência para filhos posicionados absolutamente

### Posicionamento Sticky

Use a classe `sticky` para posicionar um elemento como `relative` até cruzar um limite especificado, então tratá-lo como `fixed` até que seu pai saia da tela:

```html
<div>
  <div>
    <div class="sticky top-0 ...">A</div>
    <div>
      <div>
        <img src="/img/andrew.jpg" />
        <strong>Andrew Alfred</strong>
      </div>
      <div>
        <img src="/img/aisha.jpg" />
        <strong>Aisha Houston</strong>
      </div>
      <!-- ... -->
    </div>
  </div>
  <div>
    <div class="sticky top-0">B</div>
    <div>
      <div>
        <img src="/img/bob.jpg" />
        <strong>Bob Alfred</strong>
      </div>
      <!-- ... -->
    </div>
  </div>
  <!-- ... -->
</div>
```

**Comportamento:**
- Inicialmente se comporta como `relative`
- Torna-se `fixed` quando atinge o limite definido
- Offsets são calculados em relação à posição normal do elemento
- O elemento serve como referência para filhos posicionados absolutamente

## Design Responsivo

Prefixe uma classe de posição com uma variante de breakpoint como `md:` para aplicar a classe apenas em telas médias ou maiores:

```html
<div class="relative md:absolute ...">
  <!-- ... -->
</div>
```

**Exemplo de uso responsivo:**
- `sm:relative` - relativo em telas pequenas e acima
- `md:absolute` - absoluto em telas médias e acima  
- `lg:fixed` - fixo em telas grandes e acima
- `xl:sticky` - sticky em telas extra grandes e acima

## Dicas de Uso

1. **Static** é o padrão - use quando quiser remover posicionamento especial
2. **Relative** é útil como contexto para elementos absolute
3. **Absolute** remove o elemento do fluxo - use com cuidado
4. **Fixed** é ideal para headers, modais e elementos que devem ficar sempre visíveis
5. **Sticky** é perfeito para navegação que gruda no topo ao fazer scroll

## Veja Também

- [Top / Right / Bottom / Left](./top-right-bottom-left.md)
- [Z-Index](./z-index.md)
- [Layout](./layout.md)

