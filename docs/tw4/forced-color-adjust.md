# forced-color-adjust

Utilitários para controlar a propriedade `forced-color-adjust` em elementos.

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `forced-color-adjust-auto` | `forced-color-adjust: auto;` |
| `forced-color-adjust-none` | `forced-color-adjust: none;` |

## Exemplos

### Desabilitando cores forçadas

Use o utilitário `forced-color-adjust-none` para retirar um elemento das cores impostas pelo modo de cores forçadas. Isso é útil em situações onde impor uma paleta limitada de cores prejudicará a usabilidade.

**Exemplo prático:**

```html
<form>
  <img src="/img/shirt.jpg" />
  <div>
    <h3>Basic Tee</h3>
    <h3>$35</h3>
    <fieldset>
      <legend class="sr-only">Choose a color</legend>
      <div class="forced-color-adjust-none ...">
        <label>
          <input class="sr-only" type="radio" name="color-choice" value="White" />
          <span class="sr-only">White</span>
          <span class="size-6 rounded-full border border-black/10 bg-white"></span>
        </label>
        <!-- ... -->
      </div>
    </fieldset>
  </div>
</form>
```

> **Dica:** Experimente emular `forced-colors: active` nas ferramentas de desenvolvedor para ver as mudanças.

Você também pode usar a variante `forced-colors` para adicionar estilos condicionalmente quando o usuário habilitar um modo de cor forçada.

### Restaurando cores forçadas

Use o utilitário `forced-color-adjust-auto` para fazer um elemento aderir às cores impostas pelo modo de cores forçadas:

```html
<form>
  <fieldset class="forced-color-adjust-none lg:forced-color-adjust-auto ...">
    <legend>Choose a color:</legend>
    <select class="hidden lg:block">
      <option value="White">White</option>
      <option value="Gray">Gray</option>
      <option value="Black">Black</option>
    </select>
    <div class="lg:hidden">
      <label>
        <input class="sr-only" type="radio" name="color-choice" value="White" />
        <!-- ... -->
      </label>
      <!-- ... -->
    </div>
  </fieldset>
</form>
```

Isso pode ser útil se você quiser desfazer o utilitário `forced-color-adjust-none`, por exemplo em tamanhos de tela maiores.

### Design responsivo

Prefixe um utilitário `forced-color-adjust` com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e maiores:

```html
<div class="forced-color-adjust-none md:forced-color-adjust-auto ...">
  <!-- ... -->
</div>
```

## Mais informações

Saiba mais sobre o uso de variantes na [documentação de variantes](https://tailwindcss.com/docs/hover-focus-and-other-states).

