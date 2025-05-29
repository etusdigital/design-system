# Caption Side

Controla a posição de um elemento caption em relação a sua tabela.

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `caption-top` | `caption-side: top;` |
| `caption-bottom` | `caption-side: bottom;` |

## Exemplos

### Posicionando no topo da tabela

Use a classe `caption-top` para posicionar um elemento caption no topo de uma tabela:

```html
<table>
  <caption class="caption-top">
    Tabela 3.1: Lutadores profissionais e seus movimentos característicos.
  </caption>
  <thead>
    <tr>
      <th>Lutador</th>
      <th>Movimento(s) Característico(s)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>"Stone Cold" Steve Austin</td>
      <td>Stone Cold Stunner, Lou Thesz Press</td>
    </tr>
    <tr>
      <td>Bret "The Hitman" Hart</td>
      <td>The Sharpshooter</td>
    </tr>
    <tr>
      <td>Razor Ramon</td>
      <td>Razor's Edge, Fallaway Slam</td>
    </tr>
  </tbody>
</table>
```

### Posicionando na parte inferior da tabela

Use a classe `caption-bottom` para posicionar um elemento caption na parte inferior de uma tabela:

```html
<table>
  <caption class="caption-bottom">
    Tabela 3.1: Lutadores profissionais e seus movimentos característicos.
  </caption>
  <thead>
    <tr>
      <th>Lutador</th>
      <th>Movimento(s) Característico(s)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>"Stone Cold" Steve Austin</td>
      <td>Stone Cold Stunner, Lou Thesz Press</td>
    </tr>
    <tr>
      <td>Bret "The Hitman" Hart</td>
      <td>The Sharpshooter</td>
    </tr>
    <tr>
      <td>Razor Ramon</td>
      <td>Razor's Edge, Fallaway Slam</td>
    </tr>
  </tbody>
</table>
```

## Design Responsivo

Adicione um prefixo de breakpoint como `md:` antes de uma classe de `caption-side` para aplicar a utilidade apenas em tamanhos de tela médios e maiores:

```html
<caption class="caption-top md:caption-bottom">
  <!-- ... -->
</caption>
```

> **Nota:** Saiba mais sobre o uso de variantes na documentação de variantes.

## Notas de Uso

- A propriedade `caption-side` especifica a posição de um título de tabela
- Por padrão, o caption aparece no topo da tabela
- Esta propriedade só funciona com elementos `<caption>` dentro de tabelas
- É útil para melhorar a acessibilidade e organização visual de tabelas

