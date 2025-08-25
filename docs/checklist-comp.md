# Checklist: ${ComponentName}

## Pré-migração

- [ ] Documentar API atual
- [ ] Identificar dependências
- [ ] Criar testes de snapshot
- [ ] Listar breaking changes

## Durante migração

- [ ] Criar nova estrutura de arquivos
- [ ] Migrar código Vue
- [ ] Extrair e tipar props/events
- [ ] Adaptar para novos tokens
- [ ] Atualizar imports das dependências
- [ ] Adicionar JSDoc

## Pós-migração

- [ ] Executar testes unitários
- [ ] Validar visual no Storybook
- [ ] Testar retrocompatibilidade
- [ ] Atualizar documentação
- [ ] Code review
- [ ] Marcar como concluído no tracker
