# 14 Testing Strategy

> [!NOTE]  
> **Document Status**: Approved Architecture Draft  
> **Key Challenge**: Testing offline sync logic automatically.

## 1. Unit Testing
- **Backend (Jest)**: 
  - Test pure business logic in the Domain layer (e.g., total calculation algorithms, template validation schemas).
  - Target: 90% coverage on Domain layer.
- **Frontend (Vitest)**: 
  - Test custom React hooks (e.g., `useOfflineSync`, `useDocumentBuilder`).

## 2. Integration Testing
- **API Tests (Supertest)**: Test Express routes. Ensure the `/sync` endpoint properly resolves conflicts based on timestamps.
- **Database Tests (MongoDB Memory Server)**: Spin up an in-memory Mongo instance during CI to test Mongoose schemas and queries without mocking.

## 3. Component & UI Testing
- **React Testing Library**: Render individual UI components. Ensure buttons fire the correct callbacks. Ensure the massive UI scale doesn't break layout boundaries.

## 4. End-to-End (E2E) Testing
- **Cypress / Playwright**: 
  - We must test the PWA installation flow.
  - **The Offline Test Case**: 
    1. Cypress opens app.
    2. Cypress disables network via CDP (Chrome DevTools Protocol).
    3. Cypress creates a document and generates PDF.
    4. Cypress enables network.
    5. Cypress asserts that the background sync fired and the data is on the backend.

## 5. Real User Testing (UAT)
- **The "Uncle Test"**: Hand the phone to a 50+ year old target user without explaining *anything*. 
- **Acceptance Criteria**: 
  - Can they figure out how to add an item?
  - Can they generate a PDF within 60 seconds?
  - If they ask "What do I do next?", the UI test has failed.
