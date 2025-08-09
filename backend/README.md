# Inithub Backend API

NestJS API para gestão de iniciativas colaborativas com recursos sociais básicos.

## 🚀 Tecnologias

- **NestJS** - Framework Node.js
- **Prisma** - ORM para PostgreSQL
- **PostgreSQL** - Banco de dados com pgvector
- **Swagger** - Documentação da API
- **OpenAI (Embeddings)** - Geração e busca por similaridade

## 📋 Funcionalidades

### Iniciativas (CRUD)
- Criar, listar, visualizar, editar e excluir iniciativas
- Aprovar iniciativas

### Recursos Sociais
- Sistema de likes
- Comentários nas iniciativas

### Embeddings
- Geração assíncrona de embeddings ao criar uma iniciativa
- Busca por similaridade de iniciativas via pgvector

### Usuários
- Gerenciamento de usuários com endpoints para CRUD

## 🛠️ Instalação

```bash
# Instalar dependências
npm install

# Variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env e defina DATABASE_URL e OPENAI_API_KEY

# Configurar banco de dados
docker-compose up -d

# Executar migrações
npx prisma migrate dev

# Gerar cliente Prisma
npx prisma generate
```

> Requisitos: PostgreSQL com a extensão `pgvector` habilitada.

## 🏃♂️ Executar

```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run build
npm run start:prod
```

## 📚 API Endpoints

### Iniciativas
- `GET /initiatives` - Listar todas
- `POST /initiatives` - Criar
- `GET /initiatives/:id` - Visualizar uma
- `PATCH /initiatives/:id` - Editar
- `DELETE /initiatives/:id` - Excluir
- `PATCH /initiatives/:id/approve` - Aprovar

### Recursos Sociais
- `POST /initiatives/:id/like` - Adicionar like
- `POST /initiatives/:id/comments` - Adicionar comentário

### Usuários
- `GET /users` - Listar usuários
- `POST /users` - Criar usuário
- `GET /users/:id` - Visualizar usuário
- `PATCH /users/:id` - Atualizar usuário
- `DELETE /users/:id` - Excluir usuário

### Embeddings
- `POST /embeddings/similar` - Buscar iniciativas similares por texto

## 📖 Documentação

Acesse `http://localhost:3000/api` para ver a documentação Swagger.

## 🧪 Testes

```bash
npm run test
npm run test:e2e
npm run test:cov
```

- Os testes e2e usam a API real de embeddings da OpenAI (sem mocking).
- Certifique-se de definir `OPENAI_API_KEY` no `.env` antes de rodar.
- O banco de dados deve estar acessível e com migrações aplicadas (`npx prisma migrate dev`).
- Node 18+ recomendado.