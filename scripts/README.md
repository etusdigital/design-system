# Scripts de Documentação

## generate-md-simple.js

Script que gera arquivos `.md` limpos a partir dos arquivos `.mdx` dos componentes, removendo todo código JSX e conteúdo específico do Storybook.

### O que remove:
- Imports (React/Storybook)
- Tags `<Meta>`
- Seção completa `### Playground`
- Tags `<Canvas>`
- Tags `<Controls>`
- Tags `<Story>`
- Tags `<br />` órfãs
- Separadores `---` órfãos
- Múltiplas linhas vazias consecutivas

### Como usar:

```bash
# Via npm script
npm run generate-docs

# Diretamente
node scripts/generate-md-simple.js
```

### Output:
- Cria pasta `docs/` 
- Gera um arquivo `.md` para cada arquivo `.mdx` encontrado em `src/components/`
- Mantém toda a documentação markdown original, apenas remove elementos JSX/Storybook

## install-hooks.js

Script que instala Git hooks automaticamente para automatizar a geração de documentação.

### Instalação automática:
- **Executado automaticamente** após `npm install` via script `prepare`
- **Não requer ação manual** - funciona out-of-the-box
- **Silencioso** - só instala se for um repositório Git

### Funcionamento:
- **Pre-commit hook**: Executa `npm run generate-docs` antes de cada commit
- Adiciona automaticamente os arquivos `.md` gerados ao commit
- Falha o commit se a geração de docs falhar

### Fluxo completamente automatizado:
1. Desenvolvedores fazem `npm install` (hooks são instalados automaticamente)
2. Editam arquivos `.mdx` de componentes
3. Fazem `git commit` normalmente
4. Hook executa automaticamente `generate-docs`
5. Arquivos `.md` são gerados e adicionados ao commit
6. Commit prossegue com docs atualizados

### Exemplo:
```
src/components/BButton/BButton.mdx → docs/BButton.md
src/components/BCard/BCard.mdx → docs/BCard.md
```