# font-size

## Classes Disponíveis

| Classe | CSS | Descrição |
|--------|-----|-----------|
| `text-xs` | `font-size: var(--text-xs); /* 0.75rem (12px) */`<br>`line-height: var(--text-xs--line-height); /* calc(1 / 0.75) */` | Texto extra pequeno |
| `text-sm` | `font-size: var(--text-sm); /* 0.875rem (14px) */`<br>`line-height: var(--text-sm--line-height); /* calc(1.25 / 0.875) */` | Texto pequeno |
| `text-base` | `font-size: var(--text-base); /* 1rem (16px) */`<br>`line-height: var(--text-base--line-height); /* calc(1.5 / 1) */` | Texto base (padrão) |
| `text-lg` | `font-size: var(--text-lg); /* 1.125rem (18px) */`<br>`line-height: var(--text-lg--line-height); /* calc(1.75 / 1.125) */` | Texto grande |
| `text-xl` | `font-size: var(--text-xl); /* 1.25rem (20px) */`<br>`line-height: var(--text-xl--line-height); /* calc(1.75 / 1.25) */` | Texto extra grande |
| `text-2xl` | `font-size: var(--text-2xl); /* 1.5rem (24px) */`<br>`line-height: var(--text-2xl--line-height); /* calc(2 / 1.5) */` | Texto 2x grande |
| `text-3xl` | `font-size: var(--text-3xl); /* 1.875rem (30px) */`<br>`line-height: var(--text-3xl--line-height); /* calc(2.25 / 1.875) */` | Texto 3x grande |
| `text-4xl` | `font-size: var(--text-4xl); /* 2.25rem (36px) */`<br>`line-height: var(--text-4xl--line-height); /* calc(2.5 / 2.25) */` | Texto 4x grande |
| `text-5xl` | `font-size: var(--text-5xl); /* 3rem (48px) */`<br>`line-height: var(--text-5xl--line-height); /* 1 */` | Texto 5x grande |
| `text-6xl` | `font-size: var(--text-6xl); /* 3.75rem (60px) */`<br>`line-height: var(--text-6xl--line-height); /* 1 */` | Texto 6x grande |
| `text-7xl` | `font-size: var(--text-7xl); /* 4.5rem (72px) */`<br>`line-height: var(--text-7xl--line-height); /* 1 */` | Texto 7x grande |
| `text-8xl` | `font-size: var(--text-8xl); /* 6rem (96px) */`<br>`line-height: var(--text-8xl--line-height); /* 1 */` | Texto 8x grande |
| `text-9xl` | `font-size: var(--text-9xl); /* 8rem (128px) */`<br>`line-height: var(--text-9xl--line-height); /* 1 */` | Texto 9x grande |

## Classes Customizadas

| Classe | CSS | Descrição |
|--------|-----|-----------|
| `text-(length:<custom-property>)` | `font-size: var(<custom-property>);` | Usando variável CSS customizada |
| `text-[<value>]` | `font-size: <value>;` | Valor arbitrário |

## Exemplos

### Exemplo Básico

Use utilitários como `text-sm` e `text-lg` para definir o tamanho da fonte de um elemento:

```html
<p class="text-sm ...">The quick brown fox jumps over the lazy dog.</p>
<p class="text-base ...">The quick brown fox jumps over the lazy dog.</p>
<p class="text-lg ...">The quick brown fox jumps over the lazy dog.</p>
<p class="text-xl ...">The quick brown fox jumps over the lazy dog.</p>
<p class="text-2xl ...">The quick brown fox jumps over the lazy dog.</p>
```

**Resultado:**
- `text-sm`: The quick brown fox jumps over the lazy dog.
- `text-base`: The quick brown fox jumps over the lazy dog.
- `text-lg`: The quick brown fox jumps over the lazy dog.
- `text-xl`: The quick brown fox jumps over the lazy dog.
- `text-2xl`: The quick brown fox jumps over the lazy dog.

### Definindo o line-height

Use utilitários como `text-sm/6` e `text-lg/7` para definir o tamanho da fonte e o line-height de um elemento ao mesmo tempo:

```html
<p class="text-sm/6 ...">So I started to walk into the water...</p>
<p class="text-sm/7 ...">So I started to walk into the water...</p>
<p class="text-sm/8 ...">So I started to walk into the water...</p>
```

**Resultado:**
- `text-sm/6`: So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me.
- `text-lg/7`: So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me.

### Usando um valor customizado

Use a sintaxe `text-[<value>]` para definir o tamanho da fonte baseado em um valor completamente customizado:

```html
<p class="text-[14px] ...">
  Lorem ipsum dolor sit amet...
</p>
```

Para variáveis CSS, você também pode usar a sintaxe `text-(length:<custom-property>)`:

```html
<p class="text-(length:--my-text-size) ...">
  Lorem ipsum dolor sit amet...
</p>
```

Isso é apenas uma abreviação para `text-[length:var(<custom-property>)]` que adiciona a função `var()` automaticamente para você.

### Design Responsivo

Prefixe um utilitário de font-size com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e acima:

```html
<p class="text-sm md:text-base ...">
  Lorem ipsum dolor sit amet...
</p>
```

Saiba mais sobre o uso de variantes na documentação de variantes.

## Customizando seu tema

Use as variáveis de tema `--text-*` para customizar os utilitários de tamanho de fonte em seu projeto:

```css
@theme {
  --text-tiny: 0.625rem;
}
```

Agora o utilitário `text-tiny` pode ser usado em sua marcação:

```html
<div class="text-tiny">
  <!-- ... -->
</div>
```

Você também pode fornecer valores padrão de line-height, letter-spacing e font-weight para um tamanho de fonte:

```css
@theme {
  --text-tiny: 0.625rem;
  --text-tiny--line-height: 1.5rem;
  --text-tiny--letter-spacing: 0.125rem;
  --text-tiny--font-weight: 500;
}
```

Saiba mais sobre customizar seu tema na documentação do tema.

