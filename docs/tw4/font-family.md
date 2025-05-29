# Font Family

## Classes Disponíveis

| Classe | CSS Gerado | Descrição |
|--------|------------|-----------|
| `font-sans` | `font-family: var(--font-sans);` | Fonte sans-serif padrão do sistema |
| `font-serif` | `font-family: var(--font-serif);` | Fonte serif padrão do sistema |
| `font-mono` | `font-family: var(--font-mono);` | Fonte monospace padrão do sistema |
| `font-(family-name:<custom-property>)` | `font-family: var(<custom-property>);` | Usa uma variável CSS customizada |
| `font-[<value>]` | `font-family: <value>;` | Valor customizado arbitrário |

### Fontes Padrão do Sistema

- **font-sans**: `ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`
- **font-serif**: `ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif`
- **font-mono**: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`

## Exemplos

### Exemplo Básico

Use utilidades como `font-sans` e `font-mono` para definir a família da fonte de um elemento:

```html
<p class="font-sans">The quick brown fox jumps over the lazy dog.</p>
<p class="font-serif">The quick brown fox jumps over the lazy dog.</p>
<p class="font-mono">The quick brown fox jumps over the lazy dog.</p>
```

**Resultado visual:**
- `font-sans`: The quick brown fox jumps over the lazy dog.
- `font-serif`: The quick brown fox jumps over the lazy dog.
- `font-mono`: The quick brown fox jumps over the lazy dog.

### Usando Valores Customizados

Use a sintaxe `font-[<value>]` para definir a família da fonte baseada em um valor completamente customizado:

```html
<p class="font-[Open_Sans]">
  Lorem ipsum dolor sit amet...
</p>
```

Para variáveis CSS, você também pode usar a sintaxe `font-(family-name:<custom-property>)`:

```html
<p class="font-(family-name:--my-font)">
  Lorem ipsum dolor sit amet...
</p>
```

Isso é apenas uma abreviação para `font-[family-name:var(<custom-property>)]` que adiciona a função `var()` automaticamente.

### Design Responsivo

Prefixe uma utilidade font-family com uma variante de breakpoint como `md:` para aplicar a utilidade apenas em tamanhos de tela médios e maiores:

```html
<p class="font-sans md:font-serif">
  Lorem ipsum dolor sit amet...
</p>
```

Saiba mais sobre o uso de variantes na documentação de variantes.

## Customizando seu Tema

Use as variáveis de tema `--font-*` para customizar as utilidades de família de fonte em seu projeto:

```css
@theme {
  --font-display: "Oswald", "sans-serif";
}
```

Agora a utilidade `font-display` pode ser usada em seu markup:

```html
<div class="font-display">
  <!-- ... -->
</div>
```

### Configurações Avançadas de Fonte

Você também pode fornecer valores padrão de `font-feature-settings` e `font-variation-settings` para uma família de fonte:

```css
@theme {
  --font-display: "Oswald", "sans-serif";
  --font-display--font-feature-settings: "cv02", "cv03", "cv04", "cv11";
  --font-display--font-variation-settings: "opsz" 32;
}
```

### Carregando Fontes Customizadas

Se necessário, use a regra `@font-face` para carregar fontes customizadas:

```css
@font-face {
  font-family: Oswald;
  font-style: normal;
  font-weight: 200 700;
  font-display: swap;
  src: url("/fonts/Oswald.woff2") format("woff2");
}
```

### Carregando Fontes de Serviços Externos

Se você estiver carregando uma fonte de um serviço como Google Fonts, certifique-se de colocar o `@import` no topo do seu arquivo CSS:

```css
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
@import "tailwindcss";

@theme {
  --font-roboto: "Roboto", sans-serif;
}
```

> **Importante**: Os navegadores exigem que as declarações `@import` venham antes de qualquer outras regras, então as importações de URL precisam estar acima de importações como `@import "tailwindcss"` que são inlineadas no CSS compilado.

---

Saiba mais sobre customização do seu tema na documentação de temas.

