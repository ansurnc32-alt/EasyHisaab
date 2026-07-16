# 03 System Architecture

> [!NOTE]  
> **Document Status**: Draft (Awaiting Review)  
> **Product**: EasyHisaab  
> **Architecture Style**: Modular Monolith (Pragmatic Domain-Driven Design)  
> **Tech Stack**: MERN (MongoDB, Express, React Web, Node.js)  

---

## 1. High Level Architecture

EasyHisaab will be built as an **Offline-First React Web Application (PWA)** backed by a stateless **Node.js/Express API**. 

Because you want to build this as a React Web App while ensuring offline capabilities (Zero-Auth V1), the frontend must heavily utilize local browser storage (`IndexedDB` via `localforage` or `Dexie.js`). 

> [!WARNING]  
> **CTO Critique: Browser Storage Risk**  
> Browsers can silently wipe `IndexedDB` or `LocalStorage` to free up space if the device runs low on memory. For a business ledger, data loss is fatal.  
> **Solution**: We must explicitly request the `StorageManager.persist()` API in the React app so the browser treats our local data as durable.

### The Hybrid-Offline Strategy
- **Offline Operations (Local First)**: React UI -> IndexedDB. All document creation, template switching, and PDF generation happen locally.
- **Online Operations (Background Sync & AI)**: When online, background workers sync data to the Node.js API. Voice and AI commands bypass local storage and hit the Cloud API, which returns structured data to be saved locally.

---

## 2. Layered Architecture (DDD Approach)

To ensure the backend API is decoupled and completely reusable for a future React Native or Desktop app, we will use a **Clean Architecture / Pragmatic DDD approach**.

Every request flows strictly through these layers:

1. **Presentation Layer (Controllers/Routes)**: Handles HTTP requests, extracts parameters, and returns JSON. Knows *nothing* about business rules.
2. **Application Layer (Use Cases)**: Orchestrates tasks. E.g., `CreateDocumentUseCase`. It fetches data from the Domain layer, calls external services (AI), and saves it via Repositories.
3. **Domain Layer (Entities & Rules)**: Pure business logic. E.g., `DocumentEntity.calculateTotal()`. Has zero dependencies on Mongoose, Express, or external libraries.
4. **Infrastructure Layer (Repositories/Services)**: Contains the Mongoose schemas, MongoDB connections, AI API wrappers, and PDF generation engines.

---

## 3. Domain Driven Design (Bounded Contexts)

Instead of a monolithic "spaghetti" codebase, the backend will be split into isolated domains. Each domain is self-contained.

### Core Domains
- **🪪 Identity Domain**: (Disabled in V1, but architected). Handles Authentication, Device-IDs, Users, and Roles.
- **🏢 Core Business Domain**: Handles Clients, Businesses, and Settings.
- **📄 Document Engine Domain**: Handles Templates, Documents, Line Items, and Pricing logic.
- **🤖 Intelligence Domain**: Handles AI parsing, Voice processing, and OCR.
- **📊 Analytics Domain**: Generates reports and aggregates history.

*Rule: The Document Engine Domain can communicate with the Core Business Domain via an interface, but they do not share the same database queries directly.*

---

## 4. Folder Responsibilities (Backend Preview)

```text
src/
├── 📁 modules/                 # Domains (DDD)
│   ├── 📁 documents/
│   │   ├── 📁 domain/          # Entities & Business Rules
│   │   ├── 📁 application/     # Use Cases (CreateDoc, SyncDoc)
│   │   ├── 📁 infrastructure/  # Mongoose Schemas & Repositories
│   │   └── 📁 presentation/    # Express Routes & Controllers
│   ├── 📁 clients/
│   └── 📁 intelligence/
├── 📁 shared/                  # Common utilities, Error handling
├── 📁 config/                  # DB, Environment variables
└── 📁 services/                # External adapters (OpenAI, AWS)
```

---

## 5. Communication Flow

### Scenario A: Creating a Document (Offline)
1. User taps "Add Item" in React.
2. React saves to local `IndexedDB` immediately.
3. React generates PDF locally using `pdfmake` or `jsPDF` (no backend required).
4. *When Internet connects*: React sends a background `POST /api/v1/documents/sync` request to the Node.js API.

### Scenario B: Creating a Document via Voice (Online required)
1. User holds Mic and speaks in React.
2. React records audio and sends `POST /api/v1/intelligence/voice-parse` to Node.js.
3. Node.js `Intelligence Domain` processes audio -> LLM intent extraction.
4. Node.js returns a structured JSON object (`{ intent: 'CREATE_DOC', items: [...] }`).
5. React receives JSON, creates the document locally, and saves to IndexedDB.

---

## 6. Sub-Systems Design

### AI Layer
- **Architecture**: AI logic sits strictly in the backend to protect API keys and allow prompt updates without releasing a new app version.
- **Engine**: OpenAI (GPT-4o-mini) for fast intent parsing and JSON structuring.
- **Input**: Accepts raw text or audio.
- **Output**: Strict JSON schema corresponding to the `Template` structure.

### Voice Layer
- **Architecture**: Web Speech API (Browser native) for real-time dictation (speech-to-text) to avoid latency. If the browser fails, fallback to recording an audio blob and sending it to the backend (e.g., Whisper API).

### PDF Layer
- **Architecture**: Client-side generation.
- **Reasoning**: Generating PDFs on the backend requires sending the file back to the client, consuming bandwidth and failing offline. We will use a library like `pdfmake` in the React app to instantly generate the buffer and trigger the native Web Share API (WhatsApp intent).

---

## 7. Future Scaling & Deployment Architecture

**Phase 1 (Validation)**
- Frontend: Hosted on Vercel or Netlify (CDN, edge caching).
- Backend: Single Node.js instance on Render or Railway.
- Database: MongoDB Atlas (Serverless).

**Phase 2 (Growth - Multi-Business, Cloud Sync)**
- We maintain the Modular Monolith but scale horizontally behind an NGINX load balancer.
- Introduce Redis for rate-limiting AI requests.

**Phase 3 (Enterprise - Real-time Analytics)**
- Extract the `Intelligence Domain` into its own Python microservice (FastAPI) if we decide to run custom open-source LLMs (like Llama 3) to reduce OpenAI costs.

---

## CTO Questions for You

1. **PDF Generation**: I strongly recommend client-side PDF generation (React) for offline support. Do you agree, or do you prefer backend PDF generation (which requires internet but allows for more complex HTML/CSS designs)?
2. **Database Choice**: You requested MongoDB. Given the dynamic nature of Templates (where a rental template has different fields than a catering template), MongoDB is mathematically the perfect choice here. Are you comfortable with `Mongoose` discriminators or schema-less subdocuments for this?
