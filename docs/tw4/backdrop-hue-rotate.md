# backdrop-filter: hue-rotate()

O utilitário `backdrop-hue-rotate` permite aplicar rotação de matiz ao filtro de fundo de um elemento.

## Sintaxe

| Classe | Propriedade CSS | Descrição |
|--------|-----------------|-----------|
| `backdrop-hue-rotate-<number>` | `backdrop-filter: hue-rotate(<number>deg);` | Aplica rotação de matiz positiva |
| `-backdrop-hue-rotate-<number>` | `backdrop-filter: hue-rotate(calc(<number>deg * -1));` | Aplica rotação de matiz negativa |
| `backdrop-hue-rotate-(<custom-property>)` | `backdrop-filter: hue-rotate(var(<custom-property>));` | Usa propriedade CSS customizada |
| `backdrop-hue-rotate-[<value>]` | `backdrop-filter: hue-rotate(<value>);` | Valor arbitrário |

## Exemplos

### Exemplo básico

Use utilitários como `backdrop-hue-rotate-90` e `backdrop-hue-rotate-180` para rotacionar a matiz do fundo de um elemento:

<div class="grid grid-cols-3 gap-4">
  <div class="text-center">
    <div class="bg-[url(/img/mountains.jpg)] h-32 rounded-lg overflow-hidden">
      <div class="bg-white/30 backdrop-hue-rotate-90 h-full flex items-center justify-center">
        backdrop-hue-rotate-90
      </div>
    </div>
  </div>
  <div class="text-center">
    <div class="bg-[url(/img/mountains.jpg)] h-32 rounded-lg overflow-hidden">
      <div class="bg-white/30 backdrop-hue-rotate-180 h-full flex items-center justify-center">
        backdrop-hue-rotate-180
      </div>
    </div>
  </div>
  <div class="text-center">
    <div class="bg-[url(/img/mountains.jpg)] h-32 rounded-lg overflow-hidden">
      <div class="bg-white/30 backdrop-hue-rotate-270 h-full flex items-center justify-center">
        backdrop-hue-rotate-270
      </div>
    </div>
  </div>
</div>

```html
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-hue-rotate-90 ..."></div>
</div>

<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-hue-rotate-180 ..."></div>
</div>

<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-hue-rotate-270 ..."></div>
</div>
```

### Usando valores negativos

Use utilitários como `-backdrop-hue-rotate-90` e `-backdrop-hue-rotate-180` para definir um valor negativo de rotação de matiz do fundo:

<div class="grid grid-cols-3 gap-4">
  <div class="text-center">
    <div class="bg-[url(/img/mountains.jpg)] h-32 rounded-lg overflow-hidden">
      <div class="bg-white/30 -backdrop-hue-rotate-15 h-full flex items-center justify-center">
        -backdrop-hue-rotate-15
      </div>
    </div>
  </div>
  <div class="text-center">
    <div class="bg-[url(/img/mountains.jpg)] h-32 rounded-lg overflow-hidden">
      <div class="bg-white/30 -backdrop-hue-rotate-45 h-full flex items-center justify-center">
        -backdrop-hue-rotate-45
      </div>
    </div>
  </div>
  <div class="text-center">
    <div class="bg-[url(/img/mountains.jpg)] h-32 rounded-lg overflow-hidden">
      <div class="bg-white/30 -backdrop-hue-rotate-90 h-full flex items-center justify-center">
        -backdrop-hue-rotate-90
      </div>
    </div>
  </div>
</div>

```html
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 -backdrop-hue-rotate-15 ..."></div>
</div>

<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 -backdrop-hue-rotate-45 ..."></div>
</div>

<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 -backdrop-hue-rotate-90 ..."></div>
</div>
```

### Usando um valor customizado

Use a sintaxe `backdrop-hue-rotate-[<value>]` para definir a rotação de matiz do fundo baseada em um valor completamente customizado:

```html
<div class="backdrop-hue-rotate-[3.142rad] ...">
  <!-- ... -->
</div>
```

Para variáveis CSS, você também pode usar a sintaxe `backdrop-hue-rotate-(<custom-property>)`:

```html
<div class="backdrop-hue-rotate-(--my-backdrop-hue-rotation) ...">
  <!-- ... -->
</div>
```

Esta é apenas uma forma abreviada de `backdrop-hue-rotate-[var(<custom-property>)]` que adiciona a função `var()` automaticamente para você.

### Design responsivo

Use um prefixo de variante de breakpoint como `md:` para aplicar o utilitário `backdrop-filter: hue-rotate()` apenas em tamanhos de tela médios e acima:

```html
<div class="backdrop-hue-rotate-15 md:backdrop-hue-rotate-0 ...">
  <!-- ... -->
</div>
```

Aprenda mais sobre o uso de variantes na [documentação de variantes](https://tailwindcss.com/docs/responsive-design).

## Valores padrão

Os valores padrão disponíveis são:

- `backdrop-hue-rotate-0` - 0deg
- `backdrop-hue-rotate-15` - 15deg
- `backdrop-hue-rotate-30` - 30deg
- `backdrop-hue-rotate-60` - 60deg
- `backdrop-hue-rotate-90` - 90deg
- `backdrop-hue-rotate-180` - 180deg

E suas variantes negativas correspondentes (`-backdrop-hue-rotate-*`).

