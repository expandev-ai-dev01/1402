# TODO List - Backend API

Sistema de gerenciamento de tarefas - API REST

## Descrição

Backend API para sistema de gerenciamento de tarefas com suporte a múltiplas funcionalidades incluindo criação, categorização, priorização, compartilhamento e sincronização de tarefas.

## Tecnologias

- Node.js
- TypeScript
- Express.js
- SQL Server
- Zod (validação)

## Estrutura do Projeto

```
src/
├── api/                    # API Controllers
│   └── v1/                 # API Version 1
│       ├── external/       # Public endpoints
│       └── internal/       # Authenticated endpoints
├── routes/                 # Route definitions
│   └── v1/                 # Version 1 routes
├── middleware/             # Express middleware
│   ├── crud/               # CRUD operations middleware
│   ├── error/              # Error handling
│   └── notFound/           # 404 handler
├── services/               # Business logic
├── utils/                  # Utility functions
│   └── zodValidation/      # Validation utilities
├── config/                 # Configuration
└── server.ts               # Application entry point
```

## Instalação

```bash
# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp .env.example .env

# Configurar variáveis de ambiente no arquivo .env
```

## Configuração

Edite o arquivo `.env` com suas configurações:

```env
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=1433
DB_USER=sa
DB_PASSWORD=your_password
DB_NAME=todolist
```

## Execução

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Produção
npm start

# Testes
npm test

# Lint
npm run lint
```

## API Endpoints

### Health Check
- `GET /health` - Verifica status da API

### API v1
Base URL: `/api/v1`

#### External (Public)
- Endpoints públicos disponíveis em `/api/v1/external`

#### Internal (Authenticated)
- Endpoints autenticados disponíveis em `/api/v1/internal`

## Funcionalidades

1. **Criação de Tarefas** - Criar novas tarefas com título, descrição, data e prioridade
2. **Categorização** - Organizar tarefas em categorias personalizadas
3. **Prioridades** - Classificar por importância (alta, média, baixa)
4. **Prazos** - Definir datas limite para conclusão
5. **Conclusão** - Marcar tarefas como concluídas
6. **Lembretes** - Sistema de notificações e alertas
7. **Busca** - Localizar tarefas por palavras-chave
8. **Visualização** - Múltiplos modos (lista, calendário, kanban)
9. **Compartilhamento** - Colaboração entre usuários
10. **Sincronização** - Atualização entre dispositivos

## Padrões de Código

- TypeScript strict mode
- ESLint para qualidade de código
- Zod para validação de dados
- TSDoc para documentação
- Testes com Jest

## Segurança

- Helmet para headers HTTP seguros
- CORS configurável
- Validação de entrada com Zod
- Multi-tenancy com isolamento de dados

## Licença

ISC