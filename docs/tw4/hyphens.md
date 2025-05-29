# Hyphens

O utilitário `hyphens` controla como as palavras devem ser hifenizadas quando quebram em múltiplas linhas.

## Classes Disponíveis

| Classe | CSS |
|--------|-----|
| `hyphens-none` | `hyphens: none;` |
| `hyphens-manual` | `hyphens: manual;` |
| `hyphens-auto` | `hyphens: auto;` |

## Exemplos

### Prevenindo Hifenização

Use o utilitário `hyphens-none` para prevenir que palavras sejam hifenizadas, mesmo quando a sugestão de quebra de linha `&shy;` é usada:

**Resultado:**
Oficialmente reconhecida pelo dicionário Duden como a palavra mais longa em alemão, Kraftfahrzeughaftpflichtversicherung é uma palavra de 36 letras para seguro de responsabilidade civil de veículos motorizados.

```html
<p class="hyphens-none">
  ... Kraftfahrzeug&shy;haftpflichtversicherung é uma ...
</p>
```

### Hifenização Manual

Use o utilitário `hyphens-manual` para definir pontos de hifenização apenas onde a sugestão de quebra de linha `&shy;` é usada:

**Resultado:**
Oficialmente reconhecida pelo dicionário Duden como a palavra mais longa em alemão, Kraftfahrzeug­haftpflichtversicherung é uma palavra de 36 letras para seguro de responsabilidade civil de veículos motorizados.

```html
<p class="hyphens-manual">
  ... Kraftfahrzeug&shy;haftpflichtversicherung é uma ...
</p>
```

> **Nota:** Este é o comportamento padrão do navegador.

### Hifenização Automática

Use o utilitário `hyphens-auto` para permitir que o navegador escolha automaticamente pontos de hifenização baseados no idioma:

**Resultado:**
Oficialmente reconhecida pelo dicionário Duden como a palavra mais longa em alemão, Kraftfahrzeughaftpflichtversicherung é uma palavra de 36 letras para seguro de responsabilidade civil de veículos motorizados.

```html
<p class="hyphens-auto" lang="de">
  ... Kraftfahrzeughaftpflichtversicherung é uma ...
</p>
```

> **Dica:** A sugestão de quebra de linha `&shy;` será preferida sobre pontos de hifenização automática.

## Design Responsivo

Prefixe um utilitário `hyphens` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e acima:

```html
<p class="hyphens-none md:hyphens-auto ...">
  Lorem ipsum dolor sit amet...
</p>
```

Saiba mais sobre o uso de variantes na [documentação de variantes](../variants).

## Casos de Uso Comuns

- **`hyphens-none`**: Títulos, nomes próprios, URLs
- **`hyphens-manual`**: Texto onde você quer controle preciso sobre quebras
- **`hyphens-auto`**: Parágrafos longos em layouts estreitos, especialmente em dispositivos móveis
