# Hopion Frontend

Aplicação frontend do Hopion desenvolvida com React, TypeScript e Vite.

## 🚀 Tecnologias

- **React 19** - Biblioteca para construção de interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Vite** - Build tool e dev server ultra-rápido
- **React Router** - Roteamento da aplicação
- **Tailwind CSS v4** - Framework CSS utility-first
- **Vitest** - Framework de testes unitários
- **Testing Library** - Testes de componentes React
- **ESLint** - Linter para qualidade de código
- **Husky** - Git hooks para validações automáticas

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Hopion-Ofc/hopion-fe.git
cd hopion-fe
```

2. Instale as dependências:
```bash
npm install
```

## 🎯 Como executar

### Modo desenvolvimento
```bash
npm run dev
```
O projeto estará disponível em `http://localhost:5173`

### Build para produção
```bash
npm run build
```

### Preview do build
```bash
npm run preview
```

## 🧪 Testes

### Executar todos os testes
```bash
npm run test
```

### Modo watch (desenvolvimento)
```bash
npm run test:watch
```

### Interface visual de testes
```bash
npm run test:ui
```

## 🔍 Scripts disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run preview` | Preview do build de produção |
| `npm run lint` | Executa o ESLint |
| `npm run type-check` | Verifica tipos TypeScript |
| `npm run test` | Executa os testes |
| `npm run test:watch` | Testes em modo watch |
| `npm run test:ui` | Interface visual dos testes |

## 🛡️ Validações Git (Husky)

O projeto possui validações automáticas via Git Hooks:

### Pre-commit
- **ESLint**: Verifica e corrige automaticamente problemas de código
- Arquivos são formatados antes do commit

### Pre-push
- **Type-check**: Verifica tipagem TypeScript completa
- **Testes**: Executa todos os testes unitários
- ⚠️ O push é **bloqueado** se houver erros de tipagem ou testes falhando