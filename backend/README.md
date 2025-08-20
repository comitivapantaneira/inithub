# backend
⚙️ Repositório destinado a armazenar todos os componentes relacionados ao backend da aplicação.

## 🚀 Tecnologias

- **NestJS** - Framework Node.js
- **Prisma** - ORM para PostgreSQL
- **PostgreSQL** - Banco de dados com pgvector
- **Swagger** - Documentação da API
- **OpenAI (Embeddings)** - Geração e busca por similaridade

## 📋 Funcionalidades

- **Iniciativas (CRUD)** – Criar, listar, visualizar, editar e excluir iniciativas. Inclui funcionalidade de aprovação de iniciativas.
- **Recursos Sociais** – Sistema de likes e comentários nas iniciativas para interação entre usuários.
- **Embeddings** – Geração assíncrona de embeddings ao criar uma iniciativa e busca por similaridade via pgvector.
- **Usuários** – Gerenciamento completo de usuários com endpoints para todas as operações CRUD.
- **Autenticação** – Sistema de autenticação JWT para controle de acesso aos recursos.

## 📄 Documentação

A documentação da API é gerada automaticamente pelo Swagger. Para acessá-la, inicie o servidor e navegue para /api/.

## 📁 Estrutura do Projeto
```
src/
├── auth/               # Autenticação e autorização
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── dto/            # Data Transfer Objects
├── initiatives/        # CRUD de iniciativas
│   ├── initiatives.controller.ts
│   ├── initiatives.service.ts
│   └── dto/            # DTOs específicos de iniciativas
├── users/              # Gerenciamento de usuários
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── dto/            # DTOs de usuários
├── embeddings/         # Busca semântica com IA
│   ├── embeddings.controller.ts
│   ├── embeddings.service.ts
│   └── dto/            # DTOs de embeddings
├── prisma/             # Configuração do Prisma ORM
│   ├── prisma.module.ts
│   └── prisma.service.ts
└── main.ts             # Bootstrap da aplicação
```
