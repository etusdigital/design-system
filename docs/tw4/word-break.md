# Word-Break

## Sintaxe

O Tailwind CSS v4 oferece diferentes formas de controlar quebras de palavra:

- `break-normal` → `word-break: normal;`
- `break-all` → `word-break: break-all;`
- `break-keep` → `word-break: keep-all;`

## Exemplos

### Normal

Use o utilitário `break-normal` para adicionar quebras de linha apenas em pontos normais de quebra de palavra:

```html
<p class="break-normal">
  A palavra mais longa em qualquer dos principais dicionários da língua inglesa é pneumonoultramicroscopicsilicovolcanoconiosis, uma palavra que se refere a uma doença pulmonar contraída pela inalação de partículas de sílica muito finas, especificamente de um vulcão; medicamente, é o mesmo que silicose.
</p>
```

### Break All

Use o utilitário `break-all` para adicionar quebras de linha sempre que necessário, sem tentar preservar palavras inteiras:

```html
<p class="break-all">
  A palavra mais longa em qualquer dos principais dicionários da língua inglesa é pneumonoultramicroscopicsilicovolcanoconiosis, uma palavra que se refere a uma doença pulmonar contraída pela inalação de partículas de sílica muito finas, especificamente de um vulcão; medicamente, é o mesmo que silicose.
</p>
```

### Break Keep

Use o utilitário `break-keep` para evitar que quebras de linha sejam aplicadas ao texto chinês/japonês/coreano (CJK):

```html
<p class="break-keep">
  抗衡不屈不挠 (kànghéng bùqū bùnáo) 这是一个长词，意思是不畏强暴，奋勇抗争，坚定不移，永不放弃。这个词通常用来描述那些在面对困难和挑战时坚持自己信念的人， 他们克服一切困难，不屈不挠地追求自己的目标。无论遇到多大的挑战，他们都能够坚持到底，不放弃，最终获得胜利。
</p>
```

**Nota:** Para texto não-CJK, o utilitário `break-keep` tem o mesmo comportamento que o utilitário `break-normal`.

### Design responsivo

Prefixe um utilitário `word-break` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em telas médias e maiores:

```html
<p class="break-normal md:break-all">
  Lorem ipsum dolor sit amet...
</p>
```

---

📝 **Nota:** Saiba mais sobre o uso de variantes na [documentação de variantes](../variants.md).

