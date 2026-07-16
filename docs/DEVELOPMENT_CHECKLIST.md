# EasyHisaab — Development Checklist

> One milestone at a time. Each milestone must compile, run, and be tested before moving on.

---

## Phase 0 — Project Setup

| # | Milestone | Status |
|---|-----------|--------|
| 1 | Backend Initialization | 🔄 In Progress |
| 2 | Frontend Initialization | ⬜ Pending |

---

## Phase 1 — Backend Core

| # | Milestone | Status |
|---|-----------|--------|
| 3 | User Auth Module (register, login, JWT, refresh) | ⬜ Pending |
| 4 | Business Module (CRUD, owner scoping) | ⬜ Pending |
| 5 | Client Module (CRUD, business scoping) | ⬜ Pending |
| 6 | Template Module (seed + CRUD) | ⬜ Pending |
| 7 | Document Module (CRUD, line items) | ⬜ Pending |

---

## Phase 2 — Intelligence & Output

| # | Milestone | Status |
|---|-----------|--------|
| 8 | Voice Parsing (Hindi → structured JSON) | ⬜ Pending |
| 9 | PDF Generation (server-side or client-side per architecture) | ⬜ Pending |
| 10 | Document History (list, filter, pagination) | ⬜ Pending |

---

## Phase 3 — Frontend MVP

| # | Milestone | Status |
|---|-----------|--------|
| 11 | Auth Screens (login, register) | ⬜ Pending |
| 12 | Business Selection Screen | ⬜ Pending |
| 13 | Voice Input Screen (mic + review) | ⬜ Pending |
| 14 | Document Review & Edit Screen | ⬜ Pending |
| 15 | PDF Preview & Share | ⬜ Pending |
| 16 | Document History Screen | ⬜ Pending |

---

## Phase 4 — Polish & Deploy

| # | Milestone | Status |
|---|-----------|--------|
| 17 | Error handling & Hindi UX copy | ⬜ Pending |
| 18 | Testing (API + critical flows) | ⬜ Pending |
| 19 | Deployment (backend + frontend) | ⬜ Pending |

---

## Milestone 1 Tasks (Current)

- [x] Initialize `backend/` folder
- [x] `package.json` with scripts
- [x] Instructor-style folder structure
- [x] Express + `app.js` + `index.js`
- [x] MongoDB connection via Mongoose
- [x] `dotenv`, `cors`, `cookie-parser`
- [x] `asyncHandler`, `ApiError`, `ApiResponse`, `constants`
- [x] `utils/` and `middlewares/`
- [x] Prettier + Nodemon
- [x] Health check route for testing
