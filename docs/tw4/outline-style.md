# Outline Style

O `outline-style` controla o estilo visual do contorno de um elemento.

## Classes Disponíveis

| Classe | Propriedade CSS | Descrição |
|--------|----------------|-----------|
| `outline-solid` | `outline-style: solid;` | Contorno sólido |
| `outline-dashed` | `outline-style: dashed;` | Contorno tracejado |
| `outline-dotted` | `outline-style: dotted;` | Contorno pontilhado |
| `outline-double` | `outline-style: double;` | Contorno duplo |
| `outline-none` | `outline-style: none;` | Remove o contorno |
| `outline-hidden` | `outline: 2px solid transparent; outline-offset: 2px;` | Oculta o contorno mantendo acessibilidade |

## Exemplos

### Exemplo Básico

Use utilitários como `outline-solid` e `outline-dashed` para definir o estilo do contorno de um elemento:

```html
<button class="outline-2 outline-offset-2 outline-solid ...">
  Botão A (outline-solid)
</button>

<button class="outline-2 outline-offset-2 outline-dashed ...">
  Botão B (outline-dashed)
</button>

<button class="outline-2 outline-offset-2 outline-dotted ...">
  Botão C (outline-dotted)
</button>

<button class="outline-3 outline-offset-2 outline-double ...">
  Botão D (outline-double)
</button>
```

### Ocultando um Contorno

Use o utilitário `outline-hidden` para ocultar o contorno padrão do navegador em elementos focados, preservando ainda o contorno no modo de cores forçadas:

```html
<input 
  class="focus:border-indigo-600 focus:outline-hidden ..." 
  type="text" 
/>
```

> **Nota:** É altamente recomendado aplicar seu próprio estilo de foco para acessibilidade ao usar este utilitário.

> **Dica:** Experimente emular `forced-colors: active` nas ferramentas de desenvolvedor para ver o comportamento.

### Removendo Contornos

Use o utilitário `outline-none` para remover completamente o contorno padrão do navegador em elementos focados:

```html
<div class="focus-within:outline-2 focus-within:outline-indigo-600 ...">
  <textarea 
    class="outline-none ..." 
    placeholder="Deixe um comentário..." 
  />
  <button class="..." type="button">
    Postar
  </button>
</div>
```

> **Importante:** É altamente recomendado aplicar seu próprio estilo de foco para acessibilidade ao usar este utilitário.

### Design Responsivo

Prefixe um utilitário `outline-style` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e acima:

```html
<div class="outline md:outline-dashed ...">
  <!-- Contorno sólido por padrão, tracejado em telas médias+ -->
</div>
```

> Saiba mais sobre o uso de variantes na [documentação de variantes](../variants.md).

## Casos de Uso Comuns

- **`outline-solid`**: Para botões e elementos interativos com foco claro
- **`outline-dashed`**: Para indicar elementos temporários ou em modo de edição
- **`outline-dotted`**: Para elementos secundários que precisam de destaque sutil
- **`outline-double`**: Para elementos importantes que precisam de destaque extra
- **`outline-hidden`**: Para manter acessibilidade enquanto oculta visualmente
- **`outline-none`**: Para elementos com estilos de foco personalizados

