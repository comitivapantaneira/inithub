# frontend
📱 Respositório destinado a armazenar todos os componentes relacionados ao frontend da aplicação.

## 🚀 Tecnologias

- **React 18** - Biblioteca para interfaces de usuário
- **Vite** - Build tool e dev server
- **TypeScript** - Tipagem estática para JavaScript
- **TailwindCSS** - Framework CSS utilitário
- **React Router** - Roteamento SPA
- **Lucide React** - Biblioteca de ícones

## 📋 Funcionalidades

- **Home** – Tela principal com a listagem de todas as iniciativas disponíveis para os funcionários.  
- **Login/Cadastro** – Autenticação de usuários. Como MVP, é possível realizar login sem senha: entrando como **administrador** ou, com qualquer outro e-mail, como **usuário comum**.  
- **Minhas Iniciativas** – Gestão pessoal das iniciativas propostas e pelas quais o usuário é responsável.  
- **Criar Iniciativa** – Bate-papo com o agente de IA para criação e refinamento da iniciativa proposta.  
- **Progresso** – Linha do tempo com atualizações relacionadas a cada iniciativa.  
- **Dashboard Admin** – Painel administrativo com visualização de gráficos e gerenciamento de cada iniciativa.

## 📁 Estrutura do Projeto
src/
├── components/ # Componentes reutilizáveis
│ ├── charts/ # Gráficos e visualizações
│ ├── features/ # Componentes por funcionalidade
│ ├── layout/ # Layout e navegação
│ └── routing/ # Componentes relacionados a rotas
├── hooks/ # Hooks personalizados do React
├── pages/ # Páginas da aplicação
├── services/ # Integração com APIs e serviços externos
├── types/ # Definições e tipos do TypeScript
├── ui/ # Componentes base (ex: shadcn/ui)
├── utils/ # Funções utilitárias e helpers
└── styles/ # Estilos globais e temas
