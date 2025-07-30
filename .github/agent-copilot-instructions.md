# Agent - Init Hub

Agent é um aplicação responsável por captar iniciativas de usuários através de um agente de chat, facilitando a criação de hubs de inovação e colaboração.

## Build & Commands

- make install # Instala as dependências pip
- make start   # Inicia a aplicação

### Development Environment

// TODO

## Code Style

- Aplique os princípios SOLID e DRY.
- As funções devem ser escritas em snake_case em inglês.
- Os prompts devem ser escritos em português.
- As tipagens devem ser centralizadas no arquivo `src/schemas.py`.
- Mantenha espaço entre funções e classes, evite linhas muito longas.
- Dê preferência pelo f-strings para formatação de strings.
- Os imports devem ser top-down com os imports mais importantes no topo, separados por blocos:
  ```python
  from src.schemas import State, FlowClassifier # Local imports
  from src.llms import default_llm

  from langchain_core.messages import AIMessage # Third-party imports

  import logging # Standard library imports
  ```


## Architecture

// TODO


## Git Workflow

- Use o padrão GitHub Flow com branches curtas a partir da main
- Nomeie branches com prefixo semântico, ex: feat/, fix/, chore/
- Escreva commits (semânticos) no formato: <tipo>(escopo): descrição
- Realize merge via squash para manter histórico limpo
- Proíba commits diretos na main com regras de proteção
- Execute testes e validações em cada PR via GitHub Actions
- Rebase a branch com main antes de finalizar o PR

## Configuration

Todas as configurações devem possuir nomes consistentes e documentadas.
