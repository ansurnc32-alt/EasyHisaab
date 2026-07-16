# 08 UI Wireframes & Flows

> [!NOTE]  
> **Document Status**: Approved Architecture Draft  
> **Flow Principle**: Linear progression. No complex nested menus.

## Screen 1: Home Dashboard (`/home`)
- **Purpose**: Entry point. Quick resume and creation.
- **Components**:
  - Header: Logo, Greeting ("नमस्ते").
  - Section: "Recent Documents" (Scrollable vertical list of cards).
  - Floating Action Button (FAB) or Massive Fixed Bottom Button: ➕ **नया पर्चा बनाएं (Create New)**.
- **User Actions**: Tap New -> Go to Template Select (or directly to Client Select if only 1 template exists).
- **Empty State**: Illustration of a notebook. Text: "आपकी लिस्ट खाली है। पहला पर्चा बनाएं।" (Your list is empty. Create first document).

## Screen 2: Client Details (`/client-details`)
- **Purpose**: Identify who the document is for.
- **Components**:
  - Large Input: Client Name (🎙️ Mic icon attached).
  - Large Input: Phone Number (Optional).
  - List: "Recent Clients" below inputs for quick selection.
- **Buttons**: **"आगे बढ़ें (Next)"**.
- **Actions**: Proceed to item entry. No complex validation, name is optional but recommended.

## Screen 3: Item Entry (The Core Engine) (`/document/edit`)
- **Purpose**: Adding items fast.
- **Components**:
  - **Sticky Top Bar**: Displays Document Total (₹4500) or Item Count (10 Items).
  - **Body**: List of added items. 
    - Each item row: [Item Name] [ - ] [ 5 ] [ + ]
  - **Bottom Fixed Area (The Add Bar)**:
    - Text Input "खोजें या लिखें (Search or type)" with 🎙️ Voice Input.
    - Grid of 6 frequent items (e.g., icons for Chair, Table, Tent).
- **Buttons**: Massive **"पर्चा देखें (Review Document)"** button at the absolute bottom.
- **User Actions**: Tap frequent item -> Adds 1. Tap '+' -> Increases qty. Tap Mic -> Speaks item.

## Screen 4: Voice Parsing Loading State (Modal)
- **Purpose**: Feedback while LLM parses audio.
- **Components**:
  - Central spinner.
  - Text: "आपकी आवाज़ को समझा जा रहा है..." (Understanding your voice...).
- **Error State**: "क्षमा करें, समझ नहीं आया। कृपया दोबारा बोलें या टाइप करें।" (Sorry, didn't catch that. Please speak again or type).

## Screen 5: Review & Share (`/document/review`)
- **Purpose**: Final verification and PDF generation.
- **Components**:
  - Visual preview of the Receipt/Invoice (clean table layout).
  - Summary: Grand Total, Tax (if any).
- **Buttons**:
  - "संशोधन करें (Edit)" -> Go back to Screen 3.
  - **"PDF बनाएं और शेयर करें (Share on WhatsApp)"** -> Massive Green Button.
- **User Actions**: Tap Share -> App triggers local PDF generation -> Opens WhatsApp intent natively with the attached PDF.
- **Success State**: After sharing, user is returned to Home Screen, and document status updates to "Shared".

## CTO UX Directives
1. **Validation**: Never block the user with red error text unless absolutely necessary (e.g., trying to generate a PDF with 0 items). If a field is optional, let them pass.
2. **Loading States**: Since it's offline-first, loading states should be almost non-existent except for Voice AI requests and PDF generation processing. Use skeleton loaders if reading from local IndexedDB takes > 50ms.
