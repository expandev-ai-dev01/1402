# TODO List - Sistema de Gerenciamento de Tarefas

## Descrição

Sistema de gerenciamento de tarefas desenvolvido com React, TypeScript e TailwindCSS.

## Tecnologias

- **React 18.3.1**: Framework frontend
- **TypeScript 5.6.3**: Tipagem estática
- **Vite 5.4.11**: Build tool e dev server
- **TailwindCSS 3.4.14**: Framework CSS utilitário
- **React Router DOM 6.26.2**: Roteamento
- **TanStack Query 5.59.20**: Gerenciamento de estado do servidor
- **Axios 1.7.7**: Cliente HTTP
- **React Hook Form 7.53.1**: Gerenciamento de formulários
- **Zod 3.23.8**: Validação de schemas

## Estrutura do Projeto

```
src/
├── app/                    # Configuração da aplicação
│   ├── App.tsx            # Componente raiz
│   ├── providers.tsx      # Provedores de contexto
│   └── router.tsx         # Configuração de rotas
├── core/                   # Componentes e lógica compartilhada
│   ├── components/        # Componentes UI genéricos
│   ├── contexts/          # Contextos globais
│   └── lib/               # Configurações de bibliotecas
├── domain/                 # Domínios de negócio (a serem implementados)
├── pages/                  # Páginas da aplicação
│   ├── layouts/           # Layouts compartilhados
│   ├── Home/              # Página inicial
│   └── NotFound/          # Página 404
└── assets/                 # Recursos estáticos
    └── styles/            # Estilos globais
```

## Instalação

```bash
# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp .env.example .env

# Configurar variáveis de ambiente no .env
```

## Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build de produção
npm run preview

# Lint do código
npm run lint
```

## Variáveis de Ambiente

- `VITE_API_URL`: URL base da API (padrão: http://localhost:3000)
- `VITE_API_VERSION`: Versão da API (padrão: v1)
- `VITE_API_TIMEOUT`: Timeout das requisições em ms (padrão: 30000)

## Funcionalidades

### Implementadas
- ✅ Estrutura base da aplicação
- ✅ Configuração de roteamento
- ✅ Sistema de autenticação (contexto)
- ✅ Cliente HTTP configurado
- ✅ Componentes UI base
- ✅ Layouts responsivos

### A Implementar
- [ ] Criação de Tarefas
- [ ] Categorização de Tarefas
- [ ] Definição de Prioridades
- [ ] Definição de Prazos
- [ ] Marcação de Conclusão
- [ ] Lembretes e Notificações
- [ ] Busca de Tarefas
- [ ] Visualização de Tarefas
- [ ] Compartilhamento de Tarefas
- [ ] Sincronização entre Dispositivos

## Padrões de Código

- Componentes em PascalCase
- Hooks com prefixo `use`
- Arquivos de tipos em `types.ts`
- Estilos em `variants.ts` usando Tailwind
- Exports centralizados em `index.ts`
- JSDoc para documentação

## Licença

MIT