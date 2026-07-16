# 16 Project Roadmap

> [!NOTE]  
> **Document Status**: Approved Architecture Draft  
> **Timeline**: V1 MVP to be delivered in Sprint 4.

## Sprint 1: Foundation & Core UI
- **Objectives**: Setup mono-repo, build core UI components, establish local database.
- **Features**: 
  - React + Vite + PWA manifest setup.
  - Dexie.js (IndexedDB) initialization.
  - Component Library implementation (Buttons, Inputs).
- **Learning Goals**: Mastering PWA caching, Dexie.js schemas.
- **Deliverables**: A working local React app where you can navigate between screens (no data saving yet).

## Sprint 2: The Document Engine (Offline)
- **Objectives**: Build the core list-making functionality.
- **Features**: 
  - Client Selection UI.
  - Item Entry UI (add, edit, quantity).
  - Local state management (Zustand/Redux).
- **Learning Goals**: Complex form state in React.
- **Deliverables**: Ability to create a full document and save it to IndexedDB.

## Sprint 3: PDF Engine & Launch MVP
- **Objectives**: Generate PDFs locally and share them.
- **Features**: 
  - `pdfmake` integration to convert UI state to PDF buffer.
  - Web Share API implementation (WhatsApp intent).
- **Learning Goals**: Client-side PDF generation, Blob manipulation.
- **Deliverables**: V1 Offline App. Ready for "Uncle Testing".

## Sprint 4: Backend Infrastructure
- **Objectives**: Build the Node.js API to accept data.
- **Features**: 
  - Express setup with Mongoose.
  - Device-ID Auth middleware.
  - `/sync` endpoints.
- **Learning Goals**: Domain Driven Design in Node.js, Upsert queries.
- **Deliverables**: A deployed backend API.

## Sprint 5: The Sync Engine
- **Objectives**: Connect React to Node.js seamlessly.
- **Features**: 
  - Background worker in React to poll `SyncQueue`.
  - Handle offline/online state changes.
- **Learning Goals**: Conflict resolution, Web Workers/Service Workers.
- **Deliverables**: Cloud-backed app. Data survives an app uninstall.

## Sprint 6: Intelligence (AI & Voice)
- **Objectives**: Introduce Voice Parsing.
- **Features**: 
  - Web Speech API on Frontend.
  - OpenAI integration on Backend.
  - System prompts and error handling.
- **Learning Goals**: OpenAI Structured Outputs, Audio processing.
- **Deliverables**: The "Magic" feature. Users can speak to create lists.
