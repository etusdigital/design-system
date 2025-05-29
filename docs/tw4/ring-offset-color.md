# Ring Offset Color

Utilitários para controlar a cor do offset (deslocamento) de um ring (anel) em elementos.

## Uso Básico

### Definindo a cor do ring offset

Use as utilitários `ring-offset-*` para alterar a cor do offset de um ring. Geralmente isso é feito para tentar combinar o offset com a cor de fundo do elemento pai, já que offsets de box-shadow verdadeiros não são possíveis em CSS.

**Exemplo:**

```html
<button class="ring-2 ring-purple-500 ring-offset-4 ring-offset-slate-50 dark:ring-offset-slate-900">
  Salvar Alterações
</button>
```

**Classes disponíveis:**
- `ring-offset-slate-50` - Offset com cor cinza claro
- `ring-offset-slate-900` - Offset com cor cinza escuro (para modo dark)

### Controlando a opacidade

Use o modificador de opacidade de cor para controlar a opacidade da cor do ring offset.

```html
<button class="ring-2 ring-purple-500 ring-offset-4 ring-offset-purple-100/50">
  Botão com opacity 50%
</button>
```

Você pode usar qualquer valor definido na sua escala de opacidade, ou usar valores arbitrários se precisar:

```html
<button class="ring-2 ring-purple-500 ring-offset-4 ring-offset-purple-100/[.55]">
  Botão com opacity 55%
</button>
```

## Aplicando Condicionalmente

### Estados como hover, focus, etc.

O Tailwind permite aplicar classes utilitárias condicionalmente em diferentes estados usando modificadores de variante. Por exemplo, use `hover:ring-offset-blue-500` para aplicar `ring-offset-blue-500` apenas no hover.

```html
<div class="ring-2 ring-offset-2 ring-offset-blue-300 hover:ring-offset-blue-500">
  <!-- Muda a cor do offset no hover -->
</div>
```

**Estados disponíveis:**
- `hover:ring-offset-*` - No hover
- `focus:ring-offset-*` - No focus
- `active:ring-offset-*` - Quando ativo

### Breakpoints e media queries

Você também pode usar modificadores de variante para responsive breakpoints, modo escuro, prefers-reduced-motion, e mais. Por exemplo, use `md:ring-offset-blue-500` para aplicar a cor apenas em telas médias e maiores.

```html
<div class="ring-2 ring-offset-2 ring-offset-blue-300 md:ring-offset-blue-500">
  <!-- Muda a cor do offset em telas médias+ -->
</div>
```

**Breakpoints disponíveis:**
- `sm:ring-offset-*` - Telas pequenas e maiores
- `md:ring-offset-*` - Telas médias e maiores  
- `lg:ring-offset-*` - Telas grandes e maiores
- `xl:ring-offset-*` - Telas extra grandes e maiores

## Usando Valores Customizados

### Customizando seu tema

Por padrão, o Tailwind disponibiliza toda a paleta de cores padrão como cores de ring offset. Você pode customizar sua paleta editando `theme.colors` ou `theme.extend.colors` no seu arquivo `tailwind.config.js`.

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'azul-real': '#243c5a',
      },
    }
  }
}
```

Alternativamente, você pode customizar apenas as cores de ring offset editando `theme.ringOffsetColor` ou `theme.extend.ringOffsetColor`:

```javascript
module.exports = {
  theme: {
    extend: {
      ringOffsetColor: {
        'custom': '#ff6b6b',
      },
    }
  }
}
```

### Valores arbitrários

Se você precisar usar um valor de cor específico que não faz sentido incluir no seu tema, use colchetes para gerar a propriedade dinamicamente:

```html
<div class="ring-offset-[#50d71e]">
  <!-- Cor verde personalizada -->
</div>
```

## Exemplo Prático Completo

```html
<div class="space-y-4">
  <!-- Botão básico com ring offset -->
  <button class="px-4 py-2 bg-blue-500 text-white rounded-lg ring-2 ring-blue-500 ring-offset-2 ring-offset-white">
    Botão Padrão
  </button>
  
  <!-- Botão com hover e responsive -->
  <button class="px-4 py-2 bg-green-500 text-white rounded-lg ring-2 ring-green-500 ring-offset-2 ring-offset-gray-100 hover:ring-offset-green-100 md:ring-offset-4">
    Botão Interativo
  </button>
  
  <!-- Botão com modo escuro -->
  <button class="px-4 py-2 bg-purple-500 text-white rounded-lg ring-2 ring-purple-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900">
    Botão Dark Mode
  </button>
</div>
```

## Referência Rápida

| Classe | Propriedade CSS |
|--------|----------------|
| `ring-offset-transparent` | `--tw-ring-offset-color: transparent` |
| `ring-offset-white` | `--tw-ring-offset-color: #ffffff` |
| `ring-offset-black` | `--tw-ring-offset-color: #000000` |
| `ring-offset-gray-50` | `--tw-ring-offset-color: #f9fafb` |
| `ring-offset-red-500` | `--tw-ring-offset-color: #ef4444` |
| `ring-offset-[#50d71e]` | `--tw-ring-offset-color: #50d71e` |

---

Para mais informações, consulte a documentação oficial do Tailwind CSS sobre [Ring Offset Color](https://tailwindcss.com/docs/ring-offset-color).

