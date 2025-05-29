# Animation

As animações no Tailwind CSS v4 fornecem uma maneira simples de adicionar movimento aos seus elementos.

## Utilitários Disponíveis

### `animate-spin`
Adiciona uma animação de rotação linear infinita.

```css
animation: var(--animate-spin); /* spin 1s linear infinite */

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

### `animate-ping`
Adiciona uma animação de escala e fade como um radar ping.

```css
animation: var(--animate-ping); /* ping 1s cubic-bezier(0, 0, 0.2, 1) infinite */

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}
```

### `animate-pulse`
Adiciona uma animação suave de fade in/out.

```css
animation: var(--animate-pulse); /* pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite */

@keyframes pulse {
  50% {
    opacity: 0.5;
  }
}
```

### `animate-bounce`
Adiciona uma animação de bounce vertical.

```css
animation: var(--animate-bounce); /* bounce 1s infinite */

@keyframes bounce {
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: none;
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}
```

### `animate-none`
Remove todas as animações.

```css
animation: none;
```

### Valores Personalizados

#### `animate-(<custom-property>)`
Usa uma propriedade CSS customizada.

```css
animation: var(<custom-property>);
```

#### `animate-[<value>]`
Define um valor de animação completamente personalizado.

```css
animation: <value>;
```

## Exemplos de Uso

### Adicionando uma animação de spin
Use o utilitário `animate-spin` para adicionar uma animação de rotação linear aos elementos como indicadores de carregamento:

```html
<button type="button" class="bg-indigo-500 ..." disabled>
  <svg class="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24">
    <!-- ... -->
  </svg>
  Processando…
</button>
```

### Adicionando uma animação de ping
Use o utilitário `animate-ping` para fazer um elemento escalar e desaparecer como um radar ping ou ondulação de água—útil para coisas como badges de notificação:

```html
<span class="relative flex size-3">
  <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
  <span class="relative inline-flex size-3 rounded-full bg-sky-500"></span>
</span>
```

### Adicionando uma animação de pulse
Use o utilitário `animate-pulse` para fazer um elemento aparecer e desaparecer suavemente—útil para coisas como skeleton loaders:

```html
<div class="mx-auto w-full max-w-sm rounded-md border border-blue-300 p-4">
  <div class="flex animate-pulse space-x-4">
    <div class="size-10 rounded-full bg-gray-200"></div>
    <div class="flex-1 space-y-6 py-1">
      <div class="h-2 rounded bg-gray-200"></div>
      <div class="space-y-3">
        <div class="grid grid-cols-3 gap-4">
          <div class="col-span-2 h-2 rounded bg-gray-200"></div>
          <div class="col-span-1 h-2 rounded bg-gray-200"></div>
        </div>
        <div class="h-2 rounded bg-gray-200"></div>
      </div>
    </div>
  </div>
</div>
```

### Adicionando uma animação de bounce
Use o utilitário `animate-bounce` para fazer um elemento pular para cima e para baixo—útil para coisas como indicadores de "rolar para baixo":

```html
<svg class="size-6 animate-bounce ...">
  <!-- ... -->
</svg>
```

### Suporte para movimento reduzido
Para situações onde o usuário especificou que prefere movimento reduzido, você pode aplicar animações condicionalmente usando as variantes `motion-safe` e `motion-reduce`:

```html
<button type="button" class="bg-indigo-600 ..." disabled>
  <svg class="mr-3 size-5 motion-safe:animate-spin ..." viewBox="0 0 24 24">
    <!-- ... -->
  </svg>
  Processando
</button>
```

### Usando um valor personalizado
Use a sintaxe `animate-[<value>]` para definir a animação baseada em um valor completamente personalizado:

```html
<div class="animate-[wiggle_1s_ease-in-out_infinite] ...">
  <!-- ... -->
</div>
```

Para variáveis CSS, você também pode usar a sintaxe `animate-(<custom-property>)`:

```html
<div class="animate-(--my-animation) ...">
  <!-- ... -->
</div>
```

Isso é apenas uma abreviação para `animate-[var(<custom-property>)]` que adiciona a função `var()` automaticamente.

### Design responsivo
Prefixe um utilitário de animação com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e acima:

```html
<div class="animate-none md:animate-spin ...">
  <!-- ... -->
</div>
```

Saiba mais sobre como usar variantes na documentação de variantes.

## Personalizando seu tema

Use as variáveis de tema `--animate-*` para personalizar os utilitários de animação no seu projeto:

```css
@theme {
  --animate-wiggle: wiggle 1s ease-in-out infinite;
  
  @keyframes wiggle {
    0%,
    100% {
      transform: rotate(-3deg);
    }
    50% {
      transform: rotate(3deg);
    }
  }
}
```

Agora o utilitário `animate-wiggle` pode ser usado no seu markup:

```html
<div class="animate-wiggle">
  <!-- ... -->
</div>
```

Saiba mais sobre personalizar seu tema na documentação de temas.

