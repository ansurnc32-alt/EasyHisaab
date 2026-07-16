# 06 Folder Structure

> [!NOTE]  
> **Document Status**: Approved Architecture Draft  
> **Structure**: Monorepo or Split Repos (Split recommended for V1)

We will use a decoupled structure. The frontend will be purely React + Vite (PWA configured), and the backend will be Node.js.

## 1. Frontend (React Web / PWA)
```text
easyhisaab-frontend/
├── public/                 # PWA Manifest, Icons, offline.html
├── src/
│   ├── assets/             # Images, Global CSS
│   ├── components/         # Reusable UI (Buttons, Cards)
│   ├── features/           # Domain logic (DDD for Frontend)
│   │   ├── documents/      # Components & Hooks specific to documents
│   │   ├── clients/
│   │   └── voice/
│   ├── hooks/              # Global React Hooks
│   ├── lib/                # Third-party wrappers (Axios, Dexie.js for offline DB)
│   ├── pages/              # Route level components
│   ├── store/              # Global State (Zustand or Redux)
│   ├── utils/              # PDF Generation helpers, formatting
│   ├── App.jsx             # Root Router
│   └── main.jsx            # Entry point & Service Worker Registration
├── .env                    # Environment variables
├── vite.config.js          # Vite & PWA plugin config
└── package.json
```

## 2. Backend (Node.js / Express)
Following the Modular Monolith DDD structure from `03_System_Architecture`.

```text
easyhisaab-backend/
├── src/
│   ├── config/             # DB config, Envs, Constants
│   ├── modules/            # The Domains
│   │   ├── documents/
│   │   │   ├── controllers/   # Express Route Handlers
│   │   │   ├── models/        # Mongoose Schemas
│   │   │   ├── services/      # Business Logic
│   │   │   └── routes.js      # Module specific routing
│   │   ├── clients/
│   │   ├── intelligence/      # AI and LLM logic
│   ├── shared/             # Code shared across modules
│   │   ├── errors/         # Custom Error Classes
│   │   ├── middlewares/    # Auth, Rate Limiter, Error Handler
│   │   └── utils/          # Logger (Winston)
│   ├── app.js              # Express App Setup
│   └── server.js           # Server Entry (App.listen)
├── tests/                  # Unit and Integration Tests
├── docs/                   # Postman Collections, OpenAPI Swagger
├── .env.example
└── package.json
```

## 3. DevOps & Scripts
```text
easyhisaab-ops/
├── docker/
│   ├── Dockerfile.backend
│   └── docker-compose.yml  # Local dev environment (Mongo + Node)
├── scripts/
│   ├── seed_templates.js   # DB seed for Catering/Rental templates
│   └── backup_db.sh
└── .github/
    └── workflows/
        ├── deploy-backend.yml
        └── deploy-frontend.yml
```

## CTO Rationale for this Structure
- **Frontend `features/` pattern**: Grouping code by feature (documents, clients) instead of file type (components, hooks) makes the codebase infinitely more maintainable as it grows.
- **Backend `modules/` pattern**: By encapsulating `controllers`, `models`, and `services` inside a specific domain folder, we prevent tight coupling. A developer working on AI features only needs to look inside the `intelligence` folder.
