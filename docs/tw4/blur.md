# filter: blur()

## Utilitários Disponíveis

| Classe | CSS | Valor |
|--------|-----|-------|
| `blur-xs` | `filter: blur(var(--blur-xs));` | `/* 4px */` |
| `blur-sm` | `filter: blur(var(--blur-sm));` | `/* 8px */` |
| `blur-md` | `filter: blur(var(--blur-md));` | `/* 12px */` |
| `blur-lg` | `filter: blur(var(--blur-lg));` | `/* 16px */` |
| `blur-xl` | `filter: blur(var(--blur-xl));` | `/* 24px */` |
| `blur-2xl` | `filter: blur(var(--blur-2xl));` | `/* 40px */` |
| `blur-3xl` | `filter: blur(var(--blur-3xl));` | `/* 64px */` |
| `blur-none` | `filter: ;` | |
| `blur-(<custom-property>)` | `filter: blur(var(<custom-property>));` | |
| `blur-[<value>]` | `filter: blur(<value>);` | |

## Exemplos

### Exemplo básico

Use utilitários como `blur-sm` e `blur-lg` para aplicar desfoque a um elemento:

- `blur-none` - Sem desfoque
- `blur-sm` - Desfoque pequeno
- `blur-lg` - Desfoque grande
- `blur-2xl` - Desfoque muito grande

```html
<img class="blur-none" src="/img/mountains.jpg" />
<img class="blur-sm" src="/img/mountains.jpg" />
<img class="blur-lg" src="/img/mountains.jpg" />
<img class="blur-2xl" src="/img/mountains.jpg" />
```

### Usando valores customizados

Use a sintaxe `blur-[<value>]` para definir o desfoque baseado em um valor completamente customizado:

```html
<img class="blur-[2px]" src="/img/mountains.jpg" />
```

Para variáveis CSS, você também pode usar a sintaxe `blur-(<custom-property>)`:

```html
<img class="blur-(--my-blur)" src="/img/mountains.jpg" />
```

Isso é apenas uma abreviação para `blur-[var(<custom-property>)]` que adiciona a função `var()` automaticamente para você.

### Design responsivo

Prefixe um utilitário `filter: blur()` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e maiores:

```html
<img class="blur-none md:blur-lg" src="/img/mountains.jpg" />
```

Saiba mais sobre o uso de variantes na documentação de variantes.

## Customizando seu tema

Use as variáveis de tema `--blur-*` para customizar os utilitários de desfoque em seu projeto:

```css
@theme {
  --blur-2xs: 2px;
}
```

Agora o utilitário `blur-2xs` pode ser usado em sua marcação:

```html
<img class="blur-2xs" src="/img/mountains.jpg" />
```

Saiba mais sobre customização de tema na documentação de tema.

