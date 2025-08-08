# 📦 Inithub

Este repositório consiste em um monorepo onde está sendo desenvolvido o **Inithub**, uma plataforma de gestão de iniciativas colaborativas com suporte a inteligência artificial.

O repositório monolítico inclui os serviços de **frontend**, **backend**, **agente de IA** e **banco de dados**, todos orquestrados via Docker. Cada serviço possui um README específico, no qual são descritos em mais detalhes os objetivos, estrutura e funcionamento de cada um.

## 🧩 Estrutura do Projeto

```
inithub/
├── frontend/         # Interface web (React + Vite)
├── backend/          # API principal (NestJS)
├── agent/            # Serviço IA (FastAPI)
├── docker-compose.yml
└── .env              # Variáveis de ambiente
```

> ℹ️ Cada serviço possui seu próprio diretório e README com instruções específicas.

## 🏗️ Arquitetura e Organização do Monorepo

O **Inithub** está organizado como um monorepo, ou seja, todos os serviços e componentes da aplicação estão agrupados em um único repositório. Essa abordagem facilita o desenvolvimento integrado, o versionamento sincronizado e a orquestração dos serviços com Docker.

| Serviço            | Descrição                                                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| **Frontend**       | Aplicação React + Vite que oferece a interface para os usuários interagirem com a plataforma.                              |
| **Backend**        | API principal construída em NestJS com Prisma, responsável por gerenciar iniciativas, recursos sociais e banco de dados.   |
| **Agente de IA**   | Serviço dedicado a funcionalidades de inteligência artificial, como geração de texto, recomendações e chat, usando OpenAI. |
| **Banco de Dados** | PostgreSQL com extensão pgvector para armazenamento e busca eficiente de vetores, fundamental para IA.                     |

## 💬 Comunicação entre serviços

Os serviços do Inithub se comunicam principalmente por meio de APIs REST e WebSockets, garantindo uma arquitetura desacoplada, modular e com suporte a funcionalidades em tempo real.

As APIs REST são usadas para operações padrão, como gerenciamento de dados, enquanto os WebSockets possibilitam interações em tempo real e experiências interativas, como chats e recomendações inteligentes.

## 🚀 Tecnologias

- **Frontend:** React, Vite, TypeScript, TailwindCSS
- **Backend:** NestJS, Prisma, PostgreSQL
- **Agente IA:** FastAPI, OpenAI
- **Banco de Dados:** PostgreSQL + pgvector
- **Infraestrutura:** Docker, Docker Compose

## 🏃♂️ Como Executar o Backend

### Pré-requisitos
- Node.js 18+
- Docker e Docker Compose

### Passos

1. **Iniciar o banco de dados:**
   ```bash
   cd backend
   docker-compose up -d
   ```

2. **Instalar dependências:**
   ```bash
   npm install
   ```

3. **Configurar banco de dados:**
   ```bash
   npx prisma migrate reset --force --skip-generate
   npx prisma generate
   ```

4. **Executar em desenvolvimento:**
   ```bash
   npm run start:dev
   ```

5. **Acessar a API:**
   - API: http://localhost:3000
   - Documentação Swagger: http://localhost:3000/api

### Endpoints Principais
- `GET /initiatives` - Listar iniciativas
- `POST /initiatives` - Criar iniciativa
- `POST /initiatives/:id/like` - Adicionar like
- `POST /initiatives/:id/comments` - Adicionar comentário
