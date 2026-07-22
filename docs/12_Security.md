# 12 Security Architecture

> [!NOTE]  
> **Document Status**: Approved Architecture Draft  
> **Constraint**: Zero-Auth V1 means high reliance on device-level security.

## 1. Authentication & Authorization
- **V1 (Zero-Auth)**: The frontend generates a persistent `uuid` on first install. This `X-Device-ID` is passed in all API headers. It acts as an anonymous authorization token.
- **V2 (Phone OTP)**: We will implement standard JWT (JSON Web Tokens). The Device ID is mapped to the verified Phone Number.
- **Authorization**: The Node.js backend must verify that any document being synced or requested belongs to the `X-Device-ID` making the request.

## 2. Data Security & Encryption
- **Transit**: 100% TLS/SSL (HTTPS) enforced on all API endpoints. No HTTP allowed.
- **At Rest (Local)**: IndexedDB is natively sandboxed by the browser per domain. However, it is *not* encrypted. Anyone with physical access to the unlocked phone can theoretically read the DB. This is acceptable for V1.
- **At Rest (Cloud)**: MongoDB Atlas encrypts data at rest automatically.

## 3. Input Validation (Defense in Depth)
- **Frontend**: React prevents submitting empty items or massive negative numbers.
- **Backend (Crucial)**: We do not trust the client. 
  - Use `Zod` or `Joi` in Node.js to validate every incoming request body.
  - E.g., `quantity` must be a positive number `< 10,000` to prevent database overflow attacks.

## 4. Rate Limiting (DDoS & Cost Protection)
Because we are exposing AI endpoints without hard user accounts, we are vulnerable to API abuse which could cost us money (OpenAI bills).
- Use `express-rate-limit`.
- Global API limit: 200 requests per IP per 15 minutes.
- Voice/AI API limit: 50 requests per `Device-ID` per day. 10 requests per IP per hour.

## 5. Privacy & GDPR/DPDP Act Compliance
- **Data Minimization**: We do not ask for email, age, or location. We only store the client's name and optional phone number.
- **Deletion**: When a user uninstalls a PWA, local data is wiped. For cloud data, V2 will include a "Delete My Account" button that triggers a hard delete of all related records in MongoDB.

## CTO Warning
The biggest security risk in V1 is **Session Hijacking via Device ID**. If someone extracts the `Device-ID` UUID from local storage, they can sync and download that business's history from another device. 
*Mitigation for V2*: Transition to HTTP-Only secure cookies with JWT immediately when Phone Auth is introduced.

## Authentication Cookie Deployment

The authentication API uses an HttpOnly JWT cookie. Keep `COOKIE_SAME_SITE=lax` when the React frontend and API are served from the same site. For separately hosted frontend and backend domains, both must use HTTPS, `COOKIE_SAME_SITE` must be set to `none`, and `CORS_ORIGIN` must be the exact frontend origin with credentialed CORS enabled. Production automatically sets the cookie `Secure` flag.
