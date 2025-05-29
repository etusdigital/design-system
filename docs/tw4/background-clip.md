# Background Clip

O `background-clip` controla como o plano de fundo de um elemento é aplicado em relação às suas bordas, padding e conteúdo.

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `bg-clip-border` | `background-clip: border-box;` |
| `bg-clip-padding` | `background-clip: padding-box;` |
| `bg-clip-content` | `background-clip: content-box;` |
| `bg-clip-text` | `background-clip: text;` |

## Exemplos

### Exemplo Básico

Use as classes `bg-clip-border`, `bg-clip-padding` e `bg-clip-content` para controlar a área de aplicação do plano de fundo de um elemento:

```html
<!-- bg-clip-border: aplica o fundo até a borda externa -->
<div class="border-4 bg-indigo-500 bg-clip-border p-3">
  bg-clip-border
</div>

<!-- bg-clip-padding: aplica o fundo até a borda interna (excluindo a borda) -->
<div class="border-4 bg-indigo-500 bg-clip-padding p-3">
  bg-clip-padding
</div>

<!-- bg-clip-content: aplica o fundo apenas na área do conteúdo -->
<div class="border-4 bg-indigo-500 bg-clip-content p-3">
  bg-clip-content
</div>
```

### Recorte para Texto

Use a classe `bg-clip-text` para recortar o plano de fundo de um elemento para corresponder ao formato do texto:

```html
<p class="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-5xl font-extrabold text-transparent">
  Hello world
</p>
```

**Resultado:** O texto terá um gradiente colorido como plano de fundo.

### Design Responsivo

Prefixe uma classe de `background-clip` com uma variante de breakpoint como `md:` para aplicar a classe apenas em tamanhos de tela médios e acima:

```html
<div class="bg-clip-border md:bg-clip-padding">
  <!-- Usa bg-clip-border em telas pequenas e bg-clip-padding em telas médias+ -->
</div>
```

## Observações

- A classe `bg-clip-text` é especialmente útil para criar efeitos de texto com gradientes
- Lembre-se de usar `text-transparent` junto com `bg-clip-text` para que apenas o plano de fundo seja visível
- Para mais informações sobre variantes responsivas, consulte a documentação de variantes do Tailwind CSS

