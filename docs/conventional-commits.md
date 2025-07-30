# 📝 Conventional Commits

Este documento define o padrão de **commits semânticos** que deve ser seguido no projeto para garantir um histórico de versionamento claro e estruturado.

---

## 1. 🎯 Estrutura do Commit

```
<tipo>: <descrição>
```

### Exemplo:

```
feat: adiciona autenticação com OAuth2
```

---

## 2. 🏷️ Tipos de Commit

- [x] **feat**: Nova funcionalidade para o usuário
- [x] **fix**: Correção de bug
- [x] **docs**: Mudanças na documentação
- [x] **style**: Formatação, ponto e vírgula faltando, etc (sem mudança de código)
- [x] **refactor**: Refatoração de código (sem nova funcionalidade ou correção)
- [x] **test**: Adição ou correção de testes
- [x] **chore**: Atualizações de build, configurações, dependências
- [x] **perf**: Melhoria de performance
- [x] **ci**: Mudanças nos arquivos de CI/CD
- [x] **build**: Mudanças no sistema de build ou dependências externas
- [x] **revert**: Reverte um commit anterior

---

## 3. 🎨 Descrição

- [x] Use o **imperativo** ("adiciona" ao invés de "adicionado")
- [x] Primeira letra em **minúscula**
- [x] Máximo de **50 caracteres** no título
- [x] **Não termine** com ponto final
- [x] Seja **claro e conciso** sobre o que foi feito

---

## 4. 🌱 Workflow de Branches

Para manter uma organização eficiente do desenvolvimento, seguimos o seguinte fluxo de trabalho com branches:

```
main: ambiente de produção (release estável)
develop: ambiente de desenvolvimento (últimas funcionalidades em integração)

Branches de feature:
feat/login-social
fix/bug-header-mobile
refactor/estrutura-servico-api
```

> ❗ Use sempre letras minúsculas e hífens para separar palavras na descrição.

### Regras:

- [x] Toda nova funcionalidade, correção ou ajuste deve ser criada a partir da branch **develop**
- [x] Após revisão e testes, as branches são mergeadas na **develop**
- [x] Releases para produção devem ser feitas por merge da **develop** para a **main**

---

## 5. 📋 Exemplos Práticos

```bash
feat: implementa login com 2FA
fix: corrige vazamento de memória no endpoint users
docs: atualiza README com instruções de instalação
test: adiciona testes unitários para formatDate
refactor: extrai lógica de conexão para classe separada
```

---

## 6. ✅ Checklist do Commit

Antes de fazer commit, verifique:

- [x] O tipo está **correto** e apropriado
- [x] A descrição é **clara** e no imperativo
- [x] O commit é **atômico** (uma mudança lógica por commit)

---

> 🎯 Commits bem estruturados facilitam o **code review**, **debugging** e **geração automática** de changelogs e releases.
