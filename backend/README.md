# Inithub Backend API

NestJS API para gestão de iniciativas colaborativas com autenticação JWT, recursos sociais e funcionalidades administrativas.

## 🚀 Tecnologias

- **NestJS** - Framework Node.js
- **Prisma** - ORM para PostgreSQL
- **PostgreSQL** - Banco de dados com pgvector
- **JWT** - Autenticação
- **Swagger** - Documentação da API

## 📋 Funcionalidades

### Autenticação
- Registro e login de usuários
- Autenticação JWT
- Proteção de rotas

### Iniciativas (CRUD)
- Criar, listar, visualizar, editar e excluir iniciativas
- Apenas o autor pode editar/excluir suas iniciativas

### Recursos Sociais
- Sistema de likes
- Comentários nas iniciativas

### Funcionalidades Admin
- Aprovar iniciativas
- Atribuir iniciativas a usuários

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

## 🏃‍♂️ Executar

```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run build
npm run start:prod
```

## 📚 API Endpoints

### Autenticação
- `POST /auth/register` - Registrar usuário
- `POST /auth/login` - Login

### Iniciativas
- `GET /initiatives` - Listar todas
- `POST /initiatives` - Criar (autenticado)
- `GET /initiatives/:id` - Visualizar uma
- `PATCH /initiatives/:id` - Editar (autor)
- `DELETE /initiatives/:id` - Excluir (autor)

### Recursos Sociais
- `POST /initiatives/:id/like` - Toggle like (autenticado)
- `POST /initiatives/:id/comments` - Adicionar comentário (autenticado)

### Admin
- `PATCH /initiatives/:id/approve` - Aprovar (admin)
- `PATCH /initiatives/:id/assign/:userId` - Atribuir (admin)

## 📖 Documentação

Acesse `http://localhost:3000/api` para ver a documentação Swagger.

## 🧪 Testes

```bash
npm run test
npm run test:cov
```