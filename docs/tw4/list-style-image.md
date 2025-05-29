# list-style-image

## Utilitários Disponíveis

| Classe | Propriedade CSS | Descrição |
|--------|----------------|-----------|
| `list-image-[<value>]` | `list-style-image: <value>;` | Define uma imagem personalizada para o marcador da lista |
| `list-image-(<custom-property>)` | `list-style-image: var(<custom-property>);` | Usa uma propriedade CSS customizada para a imagem do marcador |
| `list-image-none` | `list-style-image: none;` | Remove a imagem do marcador da lista |

## Exemplos

### Exemplo Básico

Use a sintaxe `list-image-[<value>]` para controlar a imagem do marcador dos itens da lista:

```html
<ul class="list-image-[url(/img/checkmark.png)]">
  <li>5 xícaras de cogumelos Porcini picados</li>
  <li>1/2 xícara de azeite de oliva</li>
  <li>3 libras de aipo</li>
</ul>
```

**Resultado visual:**
- ✓ 5 xícaras de cogumelos Porcini picados
- ✓ 1/2 xícara de azeite de oliva  
- ✓ 3 libras de aipo

### Usando uma Variável CSS

Use a sintaxe `list-image-(<custom-property>)` para controlar a imagem do marcador usando uma variável CSS:

```html
<ul class="list-image-(--my-list-image)">
  <li>Item da lista 1</li>
  <li>Item da lista 2</li>
  <li>Item da lista 3</li>
</ul>
```

Isso é apenas uma forma abreviada de `list-image-[var(<custom-property>)]` que adiciona automaticamente a função `var()` para você.

### Removendo uma Imagem de Marcador

Use o utilitário `list-image-none` para remover uma imagem de marcador existente dos itens da lista:

```html
<ul class="list-image-none">
  <li>Item sem marcador personalizado</li>
  <li>Outro item sem marcador personalizado</li>
</ul>
```

### Design Responsivo

Prefixe um utilitário de `list-style-image` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e maiores:

```html
<div class="list-image-none md:list-image-[url(/img/checkmark.png)]">
  <ul>
    <li>Este item não terá imagem em telas pequenas</li>
    <li>Mas terá checkmark em telas médias e maiores</li>
  </ul>
</div>
```

Saiba mais sobre o uso de variantes na [documentação de variantes](../variants).

## Notas Importantes

- As imagens de marcador só funcionam com elementos `<ul>` e `<ol>`
- Certifique-se de que o caminho da imagem esteja correto e acessível
- Para melhor acessibilidade, considere usar apenas imagens decorativas como marcadores
- A propriedade `list-style-image` tem precedência sobre `list-style-type`

