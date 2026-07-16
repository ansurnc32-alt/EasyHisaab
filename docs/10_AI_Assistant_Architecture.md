# 10 AI Assistant Architecture

> [!NOTE]  
> **Document Status**: Approved Architecture Draft  
> **Core Role**: Translate unstructured Hindi/Hinglish audio into strictly structured JSON for the Document Engine.

## 1. High-Level AI Flow
1. **Speech Recognition (STT)**: User speaks -> Audio converted to text.
2. **Intent & Command Parsing**: Text sent to LLM -> LLM identifies intent and extracts items.
3. **Validation**: Backend validates LLM output against the active Template schema.
4. **Execution**: Backend returns structured JSON to the frontend.

## 2. Layer Design

### Speech Recognition (Client-Side vs Server-Side)
- **Primary Strategy**: Web Speech API (Client-side browser native). It's fast, free, and supports Hindi (`hi-IN`).
- **Fallback Strategy**: If unsupported (or highly inaccurate), the browser records an audio Blob, sends it to our Node.js backend, which passes it to OpenAI's Whisper API.

### Intent Detection & Parsing (LLM Layer)
We will use **OpenAI GPT-4o-mini** via the backend.
The LLM must perform two tasks simultaneously via Function Calling (Structured Outputs):
1. Detect Intent: Is the user trying to create a document, or search for a client?
2. Extract Entities: Array of items, quantities, and (if applicable) prices.

### Memory & Conversation Flow
- **V1 Memory**: Stateless. The LLM processes the current transcript as a single shot. "Add 5 chairs" will just return `{ item: chair, qty: 5 }`.
- **V2 Memory**: Contextual. The backend passes the current document state to the LLM. 
  - User: "Add 5 chairs." -> App adds 5 chairs.
  - User: "Make it 10." -> LLM knows to update chairs to 10 instead of adding a new line item.

## 3. Fallback & Corrections
> [!WARNING]  
> AI will hallucinate. AI will misspell Hindi names. The architecture must account for this.

- **Correction Strategy**: The AI *proposes* the list. It is added to the React UI instantly. The user can then manually use the `+` / `-` buttons to fix AI mistakes. 
- **Graceful Failure**: If the LLM throws an error or returns invalid JSON, the backend returns a `422 Unprocessable Entity` with message: "मैं समझ नहीं पाया। कृपया टाइप करें।" (I didn't understand. Please type).

## 4. Future AI Scaling (Provider Abstraction)
The Node.js backend must implement an **AI Service Interface**.
```typescript
interface AIService {
  parseVoiceToDocument(transcript: string, template: Template): Promise<DocumentData>;
}
```
Currently, `OpenAIService` implements this. In the future, if we switch to a self-hosted Llama 3 model or Gemini, we only write a new class without changing the core business logic.
