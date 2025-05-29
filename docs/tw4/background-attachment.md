# Background Attachment

Controla como as imagens de fundo são anexadas ao viewport.

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|-----------------|
| `bg-fixed` | `background-attachment: fixed;` |
| `bg-local` | `background-attachment: local;` |
| `bg-scroll` | `background-attachment: scroll;` |

## Exemplos

### Fixando a imagem de fundo

Use `bg-fixed` para fixar a imagem de fundo em relação ao viewport:

```html
<div class="bg-[url(/img/mountains.jpg)] bg-fixed ...">
  <!-- Conteúdo aqui -->
</div>
```

**Resultado:** A imagem de fundo permanece fixa enquanto o conteúdo rola.

---

### Rolagem com o container

Use `bg-local` para fazer a imagem de fundo rolar junto com o container e o viewport:

```html
<div class="bg-[url(/img/mountains.jpg)] bg-local ...">
  <!-- Conteúdo aqui -->
</div>
```

**Resultado:** A imagem de fundo rola junto com o conteúdo do container.

---

### Rolagem com o viewport

Use `bg-scroll` para fazer a imagem de fundo rolar com o viewport, mas não com o container:

```html
<div class="bg-[url(/img/mountains.jpg)] bg-scroll ...">
  <!-- Conteúdo aqui -->
</div>
```

**Resultado:** A imagem de fundo fica fixa no container, mas rola com o viewport.

---

## Design Responsivo

Adicione um prefixo de breakpoint como `md:` para aplicar a utility apenas em tamanhos de tela médios e acima:

```html
<div class="bg-local md:bg-fixed ...">
  <!-- Conteúdo aqui -->
</div>
```

**Saiba mais:** Consulte a documentação sobre variantes para mais informações sobre design responsivo.

