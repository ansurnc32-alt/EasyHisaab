# 05 API Design

> [!NOTE]  
> **Document Status**: Approved Architecture Draft  
> **API Style**: RESTful JSON API  
> **Versioning**: Prefix `/api/v1/`  

## 1. Global Standards
- **Authentication**: V1 uses a `X-Device-ID` header. V2 will use standard Bearer Tokens (JWT).
- **Response Structure**:
```json
{
  "success": true,
  "data": {},
  "message": "Operation successful"
}
```
- **Error Structure**:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Item name is required"
  }
}
```

## 2. API Endpoints

### 🏢 Core Business & Templates
**`GET /api/v1/templates`**
- **Purpose**: Fetch available business templates.
- **Response**: Array of template schemas (Catering, Rental).
- **Cache**: Heavily cached (24 hours).

### 👥 Clients
**`GET /api/v1/clients`**
- **Purpose**: Get all clients for the device.
- **Headers**: `X-Device-ID: uuid`
- **Query**: `?search=Rahul` (For client search)

**`POST /api/v1/clients`**
- **Purpose**: Create a new client (online).
- **Body**: `{ "name": "Rahul", "phone": "9876543210" }`

### 📄 Documents (The Core Ledger)
> [!IMPORTANT]
> Because EasyHisaab is offline-first, standard CRUD is replaced by a powerful `Sync` endpoint.

**`POST /api/v1/documents/sync`**
- **Purpose**: Bulk sync documents created offline to the cloud.
- **Request Body**:
```json
{
  "documents": [
    {
      "_id": "uuid-generated-locally",
      "clientId": "uuid",
      "items": [...]
    }
  ]
}
```
- **Backend Logic**: Iterates and performs `upsert` based on `_id` and `updatedAt` timestamps to resolve conflicts.

**`GET /api/v1/documents/history?clientId={id}`**
- **Purpose**: Fetch past documents for a specific client.
- **Response**: Paginated list of documents.

### 🤖 Intelligence (AI & Voice)
**`POST /api/v1/intelligence/parse-voice`**
- **Purpose**: Accepts dictated text and returns a structured JSON document.
- **Request Body**: 
```json
{
  "templateId": "uuid",
  "transcript": "Rahul Sharma ki shadi ke liye 100 kursi aur 20 table likh do"
}
```
- **Response Body**:
```json
{
  "success": true,
  "data": {
    "client": { "name": "Rahul Sharma", "isNew": true },
    "items": [
      { "name": "Kursi", "quantity": 100 },
      { "name": "Table", "quantity": 20 }
    ]
  }
}
```
- **Status Codes**: 
  - `200 OK`: Parsed successfully.
  - `422 Unprocessable Entity`: LLM could not understand the business context.

## 3. Status Codes & Error Handling
- `200`: Success.
- `201`: Created.
- `400`: Bad Request (Invalid JSON).
- `401`: Unauthorized (Missing Device ID).
- `404`: Not Found.
- `429`: Too Many Requests (Rate limit hit on AI endpoints).
- `500`: Internal Server Error.

## 4. Rate Limiting (Security)
AI endpoints (`/intelligence/*`) are expensive.
- Limit: 50 voice parse requests per `Device-ID` per day for V1.
- Fallback: UI switches to manual entry if limit is reached.
