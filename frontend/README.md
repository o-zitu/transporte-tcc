# 🚌 ZTRANSPORTES

> Sistema web Full-Stack para gestão de reservas de assentos e informações do transporte público.

Desenvolvido como Trabalho de Conclusão de Curso (TCC) do Curso Técnico em Informática — CEPRU/UNISC.

---

## 📋 Sobre o Projeto

O **ZTRANSPORTES** é uma plataforma interativa que automatiza a reserva de assentos e o controle de embarque no transporte coletivo. O sistema oferece interfaces distintas para **passageiros**, **motoristas** e **administradores**, permitindo desde a reserva visual de poltronas até a confirmação de check-in em tempo real.

---

## ✅ Funcionalidades

### 👤 Passageiro
- Cadastro e login
- Visualização de ônibus disponíveis
- Mapa de assentos interativo (48 poltronas em tempo real)
- Reserva e cancelamento de assento

### 🚍 Motorista
- Painel exclusivo por role
- Seleção da linha em operação
- Lista de passageiros com reserva ativa
- Confirmação de embarque (check-in) com atualização de status

### 👑 Administrador
- Criação e exclusão de ônibus
- Gerenciamento de usuários
- Alteração de roles (PASSAGEIRO / MOTORISTA / ADMIN)

---

## 🛠️ Tecnologias Utilizadas

### Backend
| Tecnologia | Uso |
|---|---|
| Java 17 | Linguagem principal |
| Spring Boot | Framework da API REST |
| Spring Data JPA + Hibernate | Persistência de dados |
| MySQL | Banco de dados relacional |
| Postman | Testes de endpoints |

### Frontend
| Tecnologia | Uso |
|---|---|
| React.js (Vite) | Interface de usuário |
| React Router Dom | Navegação entre telas |
| JavaScript / JSX | Lógica da interface |
| CSS puro | Estilização |
| Fetch API | Comunicação com o backend |

### Ferramentas
- IntelliJ IDEA (backend)
- VS Code (frontend)
- Git + GitHub (versionamento)

---

## 🏗️ Arquitetura

```
transporte-tcc/
│
├── backend/                          # API REST — Java + Spring Boot
│   └── src/main/java/com/tcc/transporte/
│       ├── config/
│       │   ├── ApiExceptionHandler   # Tratamento global de erros
│       │   └── CorsConfig            # Configuração de CORS
│       ├── controller/
│       │   ├── AuthController        # Login e cadastro
│       │   ├── OnibusController      # CRUD de ônibus
│       │   ├── ReservaController     # CRUD de reservas
│       │   └── UsuarioController     # Gerenciamento de usuários
│       ├── model/
│       │   ├── entity/
│       │   │   ├── Usuario           # Entidade usuário
│       │   │   ├── Onibus            # Entidade ônibus
│       │   │   ├── Reserva           # Entidade reserva
│       │   │   └── Localizacao       # Entidade localização
│       │   └── enums/
│       │       ├── Role              # PASSAGEIRO | MOTORISTA | ADMIN
│       │       └── StatusReserva     # ATIVA | CONFIRMADA
│       ├── repository/
│       │   ├── UsuarioRepository
│       │   ├── OnibusRepository
│       │   ├── ReservaRepository
│       │   └── LocalizacaoRepository
│       └── service/
│           ├── AuthService           # Lógica de autenticação
│           ├── OnibusService         # Regras de negócio dos ônibus
│           └── ReservaService        # Regras de reserva e validações
│
└── frontend/                         # Interface — React.js + Vite
    └── src/
        ├── components/
        │   ├── Assentos.jsx          # Mapa de assentos (48 poltronas)
        │   ├── ListaOnibus.jsx       # Listagem de ônibus
        │   ├── MinhasReservas.jsx    # Reservas do usuário
        │   └── ProtectedRoute.jsx    # Proteção de rotas privadas
        ├── pages/
        │   ├── Login.jsx             # Tela de login
        │   ├── Register.jsx          # Tela de cadastro
        │   ├── HomePage.jsx          # Página inicial
        │   ├── Onibus.jsx / OnibusPage.jsx
        │   ├── MapaPage.jsx          # Mapa de localização
        │   ├── MotoristaPage.jsx     # Painel do motorista
        │   ├── AdminPage.jsx         # Painel administrativo
        │   ├── CriarOnibusPage.jsx   # Criação de ônibus
        │   ├── CriarUsuarioPage.jsx  # Criação de usuário
        │   └── GerenciarUsuariosPage.jsx
        ├── services/                 # Chamadas à API (Fetch)
        ├── styles/                   # App.css, index.css
        ├── App.jsx
        ├── Router.jsx                # Definição das rotas
        └── main.jsx
```

---

## 🔗 Principais Endpoints da API

| Método | Rota | Descrição |
|---|---|---|
| POST | `/auth/register` | Cadastro de usuário |
| POST | `/auth/login` | Login de usuário |
| GET | `/onibus` | Listar ônibus disponíveis |
| DELETE | `/onibus/{id}` | Remover ônibus |
| POST | `/reservas` | Criar reserva |
| GET | `/reservas` | Listar reservas do usuário |
| DELETE | `/reservas/{id}` | Cancelar reserva |

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- Java 17+
- Node.js 18+
- MySQL

### Backend

```bash
# Entre na pasta do backend
cd backend

# Configure o banco de dados em:
# src/main/resources/application.properties

# Rode o projeto
./mvnw spring-boot:run
```

### Frontend

```bash
# Entre na pasta do frontend
cd frontend

# Instale as dependências
npm install

# Rode o projeto
npm run dev
```

Acesse: `http://localhost:5173`

---

## 🧠 Desafios Técnicos Resolvidos

| Problema | Causa | Solução |
|---|---|---|
| Tela branca (loop infinito) | `useEffect` sem dependências corretas | Array `[]` vazio para executar apenas no mount |
| Status não persistia após F5 | Payload sem ID da reserva | Refatoração para incluir ID no PUT |
| Reserva não sumia da tela | Estado local não atualizado | Uso de `filter` e `map` após resposta da API |
| Erro `@Transactional` no DELETE | Reservas vinculadas ao usuário | `deleteByUsuario_Id` com `@Transactional` |

---

## 👨‍💻 Autor

**Vitor de Oliveira Limberger**  
Curso Técnico em Informática — CEPRU/UNISC  
GitHub: [@o-zitu](https://github.com/o-zitu)

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos.