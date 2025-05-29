# scroll-snap-stop

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `snap-normal` | `scroll-snap-stop: normal;` |
| `snap-always` | `scroll-snap-stop: always;` |

## Exemplos

### Forçando paradas em posições de snap

Use a utilitária `snap-always` junto com a utilitária `snap-mandatory` para forçar um contêiner de scroll a sempre parar em um elemento antes que o usuário possa continuar scrollando para o próximo item:

**Classe:** `snap-always`

Faça scroll na grade de imagens para ver o comportamento esperado

```html
<div class="snap-x snap-mandatory ...">
  <div class="snap-center snap-always ...">
    <img src="/img/vacation-01.jpg" />
  </div>
  <div class="snap-center snap-always ...">
    <img src="/img/vacation-02.jpg" />
  </div>
  <div class="snap-center snap-always ...">
    <img src="/img/vacation-03.jpg" />
  </div>
  <div class="snap-center snap-always ...">
    <img src="/img/vacation-04.jpg" />
  </div>
  <div class="snap-center snap-always ...">
    <img src="/img/vacation-05.jpg" />
  </div>
  <div class="snap-center snap-always ...">
    <img src="/img/vacation-06.jpg" />
  </div>
</div>
```

### Pulando posições de snap

Use a utilitária `snap-normal` para permitir que um contêiner de scroll pule posições possíveis de scroll snap:

**Classe:** `snap-normal`

Faça scroll na grade de imagens para ver o comportamento esperado

```html
<div class="snap-x ...">
  <div class="snap-center snap-normal ...">
    <img src="/img/vacation-01.jpg" />
  </div>
  <div class="snap-center snap-normal ...">
    <img src="/img/vacation-02.jpg" />
  </div>
  <div class="snap-center snap-normal ...">
    <img src="/img/vacation-03.jpg" />
  </div>
  <div class="snap-center snap-normal ...">
    <img src="/img/vacation-04.jpg" />
  </div>
  <div class="snap-center snap-normal ...">
    <img src="/img/vacation-05.jpg" />
  </div>
  <div class="snap-center snap-normal ...">
    <img src="/img/vacation-06.jpg" />
  </div>
</div>
```

### Design responsivo

Prefixe uma utilitária de `scroll-snap-stop` com uma variante de breakpoint como `md:` para aplicar a utilitária apenas em tamanhos de tela médios e acima:

```html
<div class="snap-always md:snap-normal ...">
  <!-- ... -->
</div>
```

Saiba mais sobre o uso de variantes na documentação de variantes.

