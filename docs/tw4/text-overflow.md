# Text Overflow

O Tailwind CSS oferece utilitários para controlar como o texto é truncado quando ultrapassa os limites de seu contêiner.

## Classes Disponíveis

| Classe | Propriedades CSS |
|--------|------------------|
| `truncate` | `overflow: hidden;`<br>`text-overflow: ellipsis;`<br>`white-space: nowrap;` |
| `text-ellipsis` | `text-overflow: ellipsis;` |
| `text-clip` | `text-overflow: clip;` |

## Exemplos

### Truncando texto

Use o utilitário `truncate` para evitar que o texto quebre linha e truncar texto que ultrapassa o limite com reticências (…) se necessário:

**Resultado visual:**
> `truncate` The longest word in any of the major English language dictionaries is pneumonoultramicroscopicsilicovolcanoconiosis, a word that refers to a lung disease contracted from the inhalation of very fine silica particles, specifically from a volcano; medically, it is the same as silicosis.

```html
<p class="truncate">
  The longest word in any of the major English language dictionaries is pneumonoultramicroscopicsilicovolcanoconiosis...
</p>
```

### Adicionando reticências

Use o utilitário `text-ellipsis` para truncar texto que ultrapassa o limite com reticências (…) se necessário:

**Resultado visual:**
> `text-ellipsis` The longest word in any of the major English language dictionaries is pneumonoultramicroscopicsilicovolcanoconiosis, a word that refers to a lung disease contracted from the inhalation of very fine silica particles, specifically from a volcano; medically, it is the same as silicosis.

```html
<p class="overflow-hidden text-ellipsis">
  The longest word in any of the major English language dictionaries is pneumonoultramicroscopicsilicovolcanoconiosis...
</p>
```

### Cortando texto

Use o utilitário `text-clip` para truncar o texto no limite da área de conteúdo:

**Resultado visual:**
> `text-clip` The longest word in any of the major English language dictionaries is pneumonoultramicroscopicsilicovolcanoconiosis, a word that refers to a lung disease contracted from the inhalation of very fine silica particles, specifically from a volcano; medically, it is the same as silicosis.

```html
<p class="overflow-hidden text-clip">
  The longest word in any of the major English language dictionaries is pneumonoultramicroscopicsilicovolcanoconiosis...
</p>
```

> **Nota:** Este é o comportamento padrão do navegador.

### Design Responsivo

Prefixe um utilitário de text-overflow com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e maiores:

```html
<p class="text-ellipsis md:text-clip">
  Lorem ipsum dolor sit amet...
</p>
```

Para saber mais sobre o uso de variantes, consulte a [documentação de variantes](../variants.md).

