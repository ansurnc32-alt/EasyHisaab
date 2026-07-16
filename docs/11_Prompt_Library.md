# 11 Prompt Library

> [!NOTE]  
> **Document Status**: Approved Architecture Draft  
> **LLM Optimization**: GPT-4o-mini  

## 1. Core Principle
Do NOT rely on the LLM to output markdown or conversational text. EasyHisaab's AI is purely an invisible data parser. **Strict JSON Mode** (or OpenAI Structured Outputs) is mandatory.

## 2. Voice Parsing Prompt (Document Generation)

**System Prompt:**
```text
You are an expert data extractor for an Indian business app called EasyHisaab.
Your job is to listen to Hindi/Hinglish text and extract the client name and line items.

Rules:
1. Output strictly in valid JSON.
2. If the user mentions a client name (e.g., "Rahul ki party", "Sharma ji ke liye"), extract it. If not, return null for client.
3. Extract items and quantities. Default quantity is 1 if not specified.
4. Translate item names to clear Hindi (written in English script/Hinglish) or standard English based on the input context. E.g., "kursi" -> "Chair" or "Kursi".
5. Ignore filler words.
```

**JSON Schema Definition (passed to OpenAI API):**
```json
{
  "type": "object",
  "properties": {
    "clientName": { "type": ["string", "null"] },
    "items": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": { "type": "string" },
          "quantity": { "type": "number" },
          "unit": { "type": ["string", "null"] }
        },
        "required": ["name", "quantity"]
      }
    }
  },
  "required": ["clientName", "items"]
}
```

## 3. Error Recovery Prompt
Used when the transcript makes absolutely no sense (e.g., pocket dial audio).

**System Prompt:**
```text
You are an intent validator. Analyze the following transcript.
Is the user trying to create a list of items for a business?
Reply ONLY with YES or NO.
Transcript: {user_input}
```
*Backend Logic: If NO, throw an error to the frontend.*

## 4. Future: OCR Extraction Prompt
When scanning a hand-written paper list in V3.

**System Prompt:**
```text
You are an OCR validation engine. Extract line items from the provided image of a handwritten ledger.
Ignore smudges, signatures, and dates. 
Return a JSON array of objects with keys: "name" (string), "quantity" (number). 
If a quantity is unreadable, default to 1.
```

## CTO Advice on Prompt Engineering
Prompt engineering for Indian languages (Hindi/Hinglish) is tricky. Models tend to auto-translate Hinglish into pure Hindi script (Devanagari). Our users might prefer reading "Chair" or "Kursi" in English text rather than "कुर्सी". We must explicitly instruct the LLM on which script to use based on user preferences stored in the database.
