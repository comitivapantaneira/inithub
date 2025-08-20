# agent
🧠 Repositório destinado a armazenar todos os componentes relacionados ao agente de Inteligência Artificial da aplicação.

## 🚀 Tecnologias

- **FastAPI** - Framework web moderno e rápido para Python
- **LangChain** - Framework para desenvolvimento de aplicações com LLMs
- **OpenAI GPT** - Modelo de linguagem para conversação e geração de texto
- **WebSocket** - Comunicação em tempo real
- **Pydantic** - Validação de dados e serialização

## 📋 Funcionalidades

- **Chat Inteligente** – Conversação em tempo real via WebSocket com assistência na criação de iniciativas.
- **Classificação de Solicitações** – Identificação automática do tipo de pedido do usuário para direcionamento adequado.
- **Extração de Iniciativas** – Extração de dados estruturados a partir de texto livre para criação de projetos.
- **Registro de Iniciativas** – Auxílio no processo de criação e refinamento de iniciativas colaborativas.
- **Orientação Geral** – Suporte e informações sobre o funcionamento da plataforma.
- **Processamento de Linguagem Natural** – Análise de intenção, extração de entidades e geração de respostas contextuais.

## 📁 Estrutura do Projeto
```
src/
├── main.py             # Aplicação FastAPI e WebSocket
├── chain.py            # Orquestração dos fluxos de IA
├── nodes.py            # Nós individuais do grafo de processamento
├── schemas.py          # Modelos Pydantic e tipos
├── llms.py             # Configuração dos modelos de linguagem
├── terminal.py         # Interface de linha de comando
└── config/
    ├── env.py          # Configurações de ambiente
    └── logger.py       # Sistema de logging

prompts/
├── classify_user_request.md    # Prompt para classificação
├── extract_initiative.md       # Prompt para extração
├── register_initiative.md      # Prompt para registro
└── guide.md                   # Prompt para orientação

ui/
├── index.html          # Interface web simples
└── styles.css          # Estilos da interface
```
