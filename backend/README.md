# Inithub Backend API

NestJS API para gestão de iniciativas colaborativas com recursos sociais básicos.

## 🚀 Tecnologias

- **NestJS** - Framework Node.js
- **Prisma** - ORM para PostgreSQL
- **PostgreSQL** - Banco de dados com pgvector
- **Swagger** - Documentação da API

## 📋 Funcionalidades

### Iniciativas (CRUD)
- Criar, listar, visualizar, editar e excluir iniciativas
- Aprovar iniciativas

### Recursos Sociais
- Sistema de likes
- Comentários nas iniciativas

## 🛠️ Instalação

```bash
# Instalar dependências
npm install

# Configurar banco de dados
docker-compose up -d

# Executar migrações
npx prisma migrate dev

# Gerar cliente Prisma
npx prisma generate
```

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

## 📖 Documentação

Acesse `http://localhost:3000/api` para ver a documentação Swagger.

## 🧪 Testes

```bash
npm run test
npm run test:cov
```