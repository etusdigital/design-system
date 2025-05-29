# Field Sizing

O Tailwind CSS v4 oferece utilitários para controlar como os campos de formulário se dimensionam.

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|-----------------|
| `field-sizing-fixed` | `field-sizing: fixed;` |
| `field-sizing-content` | `field-sizing: content;` |

## Exemplos

### Dimensionamento baseado no conteúdo

Use o utilitário `field-sizing-content` para permitir que um controle de formulário ajuste seu tamanho com base no conteúdo:

**Exemplo:**
```html
<textarea class="field-sizing-content ..." rows="2">
  Latex Salesman, Vanderlay Industries
</textarea>
```

> **Dica:** Digite no campo abaixo para ver o tamanho mudar dinamicamente

### Usando um tamanho fixo

Use o utilitário `field-sizing-fixed` para fazer um controle de formulário usar um tamanho fixo:

**Exemplo:**
```html
<textarea class="field-sizing-fixed w-80 ..." rows="2">
  Latex Salesman, Vanderlay Industries
</textarea>
```

> **Dica:** Digite no campo abaixo para ver que o tamanho permanece o mesmo

### Design responsivo

Prefixe um utilitário field-sizing com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e acima:

**Exemplo:**
```html
<input class="field-sizing-content md:field-sizing-fixed ..." />
```

> Saiba mais sobre o uso de variantes na [documentação de variantes](../variants).

## Casos de Uso

- **`field-sizing-content`**: Ideal para campos que devem expandir conforme o usuário digita
- **`field-sizing-fixed`**: Melhor para manter layouts consistentes e previsíveis

## Compatibilidade

Esta funcionalidade está disponível no Tailwind CSS v4 e funciona com:
- `<textarea>`
- `<input>`
- Outros elementos de formulário compatíveis

