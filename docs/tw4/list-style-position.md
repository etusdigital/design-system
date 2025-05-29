# List Style Position

Utilitários para controlar a posição dos marcadores em listas.

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `list-inside` | `list-style-position: inside;` |
| `list-outside` | `list-style-position: outside;` |

## Exemplos

### Exemplo Básico

Use as classes `list-inside` e `list-outside` para controlar a posição dos marcadores e a indentação do texto em uma lista:

#### list-inside
Com `list-inside`, os marcadores aparecem dentro do conteúdo da lista:

```html
<ul class="list-inside list-disc">
  <li>5 xícaras de cogumelos Porcini picados</li>
  <li>1/2 xícara de azeite de oliva</li>
  <li>3 libras de aipo</li>
</ul>
```

**Resultado:**
* 5 xícaras de cogumelos Porcini picados
* 1/2 xícara de azeite de oliva  
* 3 libras de aipo

#### list-outside
Com `list-outside`, os marcadores aparecem fora do conteúdo da lista (padrão):

```html
<ul class="list-outside list-disc">
  <li>5 xícaras de cogumelos Porcini picados</li>
  <li>1/2 xícara de azeite de oliva</li>
  <li>3 libras de aipo</li>
</ul>
```

**Resultado:**
* 5 xícaras de cogumelos Porcini picados
* 1/2 xícara de azeite de oliva
* 3 libras de aipo

### Design Responsivo

Prefixe uma classe de `list-style-position` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e maiores:

```html
<ul class="list-outside md:list-inside list-disc">
  <li>Item da lista</li>
  <li>Outro item</li>
  <li>Mais um item</li>
</ul>
```

Saiba mais sobre o uso de variantes na [documentação de variantes](../variants.md).

## Notas de Uso

- **`list-inside`**: Os marcadores são posicionados dentro da área de conteúdo do item da lista
- **`list-outside`**: Os marcadores são posicionados fora da área de conteúdo do item da lista (comportamento padrão)
- Essas classes funcionam melhor quando combinadas com classes de tipo de lista como `list-disc`, `list-decimal`, etc.
