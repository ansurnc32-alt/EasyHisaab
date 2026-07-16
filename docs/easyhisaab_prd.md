# EasyHisaab - Product Requirements Document (PRD)

> [!NOTE]
> **Document Status**: Draft (Planning Phase)
> **Product**: EasyHisaab
> **Target Audience**: Non-tech-savvy small business owners (Tier 2/3 cities, India)

---

## 1. Product Vision

### Problem Statement
Small business owners (like caterers, tent houses, and independent contractors) relying on pen and paper struggle with manual calculations, lost records, and unorganized lists. However, they actively avoid digital solutions because existing accounting/billing apps are too complex, require excessive typing, and are designed for accountants rather than older, non-tech-savvy demographics.

### Solution
EasyHisaab is a strictly minimal, voice-friendly, Hindi-first **Document Creation Platform** that replaces paper notebooks. It allows users to quickly generate professional lists, quotations, and invoices using highly simplified, business-specific templates with an almost zero learning curve. 

### Product Goals
- Achieve a 0-minute learning curve for a 50+ year-old user.
- Reduce the time taken to create a list/document by 50% compared to pen and paper.
- Establish a scalable template architecture to support any list-based business in the future without altering core code.

### Target Users
Small business owners, specifically targeting older demographics (45-65 years old) who are comfortable with WhatsApp voice notes but intimidated by complex UIs, heavy typing, or traditional "accounting" concepts.

### Success Metrics
- **Activation Rate**: Percentage of users who generate their first PDF within 5 minutes of opening the app.
- **Retention**: Daily Active Users (DAU) / Weekly Active Users (WAU).
- **Time-to-Value**: Average time taken from opening the app to sharing a document on WhatsApp.

---

## 2. User Personas

### Persona 1: The Father
- **Business**: Catering
- **Age**: 55+
- **Technical Knowledge**: Low. Uses WhatsApp, makes phone calls, watches YouTube. Types very slowly (mostly Hindi/Hinglish).
- **Pain Points**: Writing long ingredient lists by hand for every client takes time. Paper lists get lost or ruined in the kitchen. Doesn't want an "accounting" app because clients buy their own ingredients; he just needs to give them the list.
- **Workflow**: Client books catering -> Father calculates ingredients based on head count -> Writes list on paper (Rice 10kg, etc.) -> Hands paper to client.
- **Needs**: Extremely fast way to create an **Ingredient List without prices**. Ability to easily share it on WhatsApp.
- **Goals**: Move away from paper notebooks without feeling overwhelmed by a new system. Look professional to clients.

### Persona 2: The Uncle
- **Business**: Tent & Rental
- **Age**: 50+
- **Technical Knowledge**: Low to Medium. Can use basic apps but gets frustrated by too many buttons and hidden menus.
- **Pain Points**: Calculating rental totals manually leads to errors. Hard to track what was rented to whom. Creating a professional quotation takes too much effort.
- **Workflow**: Client requests items -> Uncle notes down items (Chairs, Tables) -> Adds prices -> Calculates total -> Gives verbal or paper quote.
- **Needs**: Fast entry of rental items, **automatic total calculation**, and professional PDF generation to share with clients.
- **Goals**: Look professional to clients with instant PDF quotes/bills, and avoid manual calculation mistakes.

---

## 3. User Journey

### Core MVP Flow (Manual to Future)
1. **Open App**: App opens instantly to a clean, highly legible screen.
2. **Select Action**: Single, massive "Create Document" (नया पर्चा बनाएं) button.
3. **Select Client**: Type name, use voice input ("Rahul Sharma"), or select from recent contacts.
4. **Add Items**:
   - Tap item from a frequently used visual grid (e.g., an icon of Rice or a Chair).
   - Or use voice typing on the keyboard.
   - Adjust quantity with large `+` / `-` buttons. *(Price auto-calculates if using the rental template).*
5. **Review**: Clean summary screen showing the list (and total, if applicable).
6. **Generate & Share**: One-tap to create PDF and instantly open WhatsApp to share with the client.

### Future AI Voice Flow (Phase 3)
1. User opens the app and holds a massive, central **"Mic"** button.
2. Speaks: *"Rahul ki shadi ke liye 100 kursi, 20 table aur ek generator likh do."*
3. **AI Processing**: The system parses the intent, selects the Rental template, creates Rahul as a client, adds the items with default prices, and calculates the total.
4. User simply reviews the generated document and taps "Share".

---

## 4. Functional Requirements

### Must Have (MVP)
- **Dynamic Template Engine**: Ability to switch between Catering (no price) and Rental (with price) modes.
- **Client Management**: Basic name and phone number entry (optional fields).
- **Item Catalog**: Add, select, and edit items with large tap targets.
- **Document Creation**: Add items, set quantities, and auto-calculate totals (based on template rules).
- **PDF Generation**: Create clean, professional PDFs.
- **WhatsApp Integration**: Direct sharing of generated PDFs.
- **Localization**: Hindi language support for UI labels.
- **Local Storage**: Offline-first architecture.

### Good To Have (V2)
- Frequently used items / quick-add suggestions.
- History of documents per client.
- Cloud Backup / Sync (Phone number login).
- Basic Voice-to-Text for item search.

### Future Features (V3+ AI Powered)
- **Natural Language Understanding (NLU)**: End-to-end document creation via voice.
- **AI Suggestions**: *"You usually add Sugar with Tea, add now?"*
- **OCR Integration**: Scan old paper notebooks to digitize templates/items.
- **Analytics & Smart Reports**: Monthly business summaries.

---

## 5. Non-Functional Requirements

- **Performance**: Instant load times (<1s). The app must feel as fast and responsive as opening a physical notebook.
- **Accessibility (CRITICAL)**: High contrast ratios, extremely large typography (minimum 18sp/px for body), extra-large touch targets (minimum 64x64dp). No complex gestures; tap and scroll only.
- **Security**: Basic data encryption for cloud backups. Privacy-first approach (business data is highly sensitive).
- **Scalability**: The template engine must be JSON/Configuration-driven so adding a "Delivery List" template later requires zero frontend code changes.
- **Maintainability**: Modular architecture separating core UI components from business logic and template configurations.
- **Offline Support**: 100% functional without the internet. Sync must happen silently in the background when online.

---

## 6. Business Templates

> [!IMPORTANT]  
> **Architectural Decision**: The system must NOT be hardcoded for specific businesses. It must use a generic schema where fields dictate behavior.

### 1. Catering Template (Ingredient List)
- **DocumentType**: `INGREDIENT_LIST`
- **Fields**:
  - `ItemName` (Text, ✅ Required)
  - `Quantity` (Number, ✅ Required)
  - `Unit` (Dropdown: Kg, Litre, Pkt, ✅ Required)
  - `Price` (Hidden/Disabled, ❌ Optional)
  - `Remarks` (Text, Optional)
- **Logic**: No totals calculated. Focus is on layout clarity and grouping.

### 2. Rental Template (Quotation/Invoice)
- **DocumentType**: `RENTAL_INVOICE`
- **Fields**:
  - `ItemName` (Text, ✅ Required)
  - `Quantity` (Number, ✅ Required)
  - `Price` (Number, ✅ Required)
  - `RentalDays` (Number, Optional, Default: 1)
  - `Total` (Computed: Qty * Price * Days, Auto)
- **Logic**: Bottom bar must persistently show the Grand Total.

### 3. Future Businesses (e.g., Hardware Store Bill)
- **DocumentType**: `RETAIL_BILL`
- **Fields**:
  - `ItemName`, `Quantity`, `Price`, `Discount` (Optional), `Tax` (Optional), `Total`.

---

## 7. Information Architecture

Keep navigation extremely flat. Maximum 2-3 levels deep.

```text
📱 App Launch
 ├── 🏠 Home (Recent Documents & Big "New" Button)
 │    ├── 📄 Document Flow (Step 1: Client)
 │    │    ├── 📝 Step 2: Add Items
 │    │    └── 👀 Step 3: Review & Share (PDF)
 │    └── 🔍 View Past Document
 └── ⚙️ Settings
      ├── 🌐 Language (Hindi/English)
      └── 🏢 Switch Business Template
```

---

## 8. Screen List

### 1. Home Screen
- **Purpose**: Starting point and quick access to recent work.
- **Components**: Welcome message ("नमस्ते!"), List of recent documents.
- **Buttons**: Massive primary floating/fixed button: **"➕ नया पर्चा बनाएं"** (Create New Document).
- **Actions**: Tap to start flow, tap a recent card to view/share again.

### 2. Client Details Screen
- **Purpose**: Identify who the document is for.
- **Components**: Large text inputs for Name and Phone.
- **Buttons**: "Next", "Skip" (Allow anonymous lists).
- **Actions**: Proceed to item entry.

### 3. Item Entry Screen (The Core)
- **Purpose**: Fast addition of items to the list.
- **Components**:
  - Top: Running total (if Rental) or Item Count (if Catering).
  - Middle: Visual grid of frequent items (e.g., icons) OR list view of selected items.
  - Bottom: Large "Add Item" input area with a prominent Voice Mic icon.
- **Buttons**: Massive `+` / `-` buttons for quantity, "Done/Review" button.
- **Actions**: Add items, adjust quantity, proceed to review.

### 4. Review & Share Screen
- **Purpose**: Final check before generating the PDF.
- **Components**: Clean, receipt-like table of items. Grand Total (if applicable).
- **Buttons**: "Edit", **"WhatsApp Share"** (Massive green button with WhatsApp icon).
- **Actions**: Generates the PDF locally and opens the WhatsApp share intent.

---

## 9. UX Guidelines for Low-Tech Users

- **Hindi First**: Default language should be colloquial Hindi/Hinglish (e.g., "पर्चा" instead of "Document", "ग्राहक" instead of "Client").
- **Voice Over Keyboard**: Always present a prominent microphone icon next to text fields. Typing is the enemy of adoption.
- **No Hidden Menus**: Avoid hamburger menus, swipe-to-delete, or long-press actions. If an action exists, it must have a visible button.
- **One Task Per Screen**: Do not clutter. Screen 1: Client -> Screen 2: Items -> Screen 3: Review.
- **High Contrast & Large Fonts**: Assume the user needs reading glasses. Use dark text on light backgrounds, minimum `18px` font size.
- **Forgiving UI**: Easy to undo. No destructive actions (like delete) without clear, simple confirmation.
- **Tactile Feedback**: Use haptic feedback (vibration) when items are added or quantities are changed to give a physical, reassuring feel.

---

## 10. MVP Scope (Version 1)

> [!WARNING]  
> **Strict Scope Control**: Do NOT include inventory tracking, complex accounting, or payment gateways in V1. Feature creep will kill the app's simplicity.

**Included in V1:**
- 2 Hardcoded Templates (Catering & Rental).
- Offline-first local database (e.g., SQLite / IndexedDB / WatermelonDB).
- Manual item entry + OS-level Voice-to-Text keyboard integration.
- PDF Generation with a clean, professional layout.
- Direct WhatsApp sharing.
- Hindi and English language toggle.

**Excluded from V1:**
- Cloud Auth & Sync (let them use it instantly without login).
- Custom AI intent parsing.
- Inventory / Stock management.
- Barcode scanning.

---

## 11. Future Roadmap

- **Phase 1: Validation (Months 1-2)**
  - Deliver offline-first MVP to core users (Father, Uncle).
  - Measure usage: Are they saving time? Are PDFs legible to clients?
- **Phase 2: Data & Cloud (Months 3-4)**
  - Introduce phone number login (OTP) and silent cloud backup.
  - Introduce an admin template builder to dynamically add new business types.
- **Phase 3: The AI Assistant (Months 5-8)**
  - Integrate LLMs for Natural Language Voice Input.
  - Unstructured voice commands mapped to structured documents.
- **Phase 4: Expansion & Ecosystem (Months 9-12)**
  - OCR to scan old paper notebooks.
  - Introduce Inventory management as an *optional* toggle.
  - Broader market launch to generic shopkeepers.

---

## 12. Risks

- **Business Risks**: The "activation energy" required to pull out a phone and open an app might be higher than grabbing a pen. If the app takes even 10 seconds longer than writing manually, they will revert to paper.
- **Technical Risks**: Device fragmentation in India. Low-end Android devices with small screens and poor microphones may struggle with PDF generation and voice input.
- **UX Risks**: **The Billing App Trap.** Making the app too feature-rich will immediately alienate the core demographic. It must remain a "Document Creator", not an accounting software.
- **AI Risks**: Voice recognition in regional accents or mixed languages (Hinglish) can be highly inaccurate. The fallback to manual entry must be flawless.

---

## 13. Deliverables & Strategic Recommendations

1. **Terminology Shift**: Drop the words "Invoice", "Bill", or "Accounting" in marketing and UI for the Catering persona. Use terms like "Parcha", "List", or "Estimate". "Billing" implies taxes and complexity.
2. **Tech Stack Recommendation**: Build this as a Progressive Web App (PWA) or using React Native/Expo. This allows for rapid iteration without App Store review delays during the crucial MVP validation phase.
3. **Database Architecture**: The database schema must use a flexible NoSQL document structure or an Entity-Attribute-Value (EAV) model in SQL to support the dynamic template system seamlessly. Hardcoding columns like `price` or `rental_days` into a primary `Items` table will ruin scalability.
4. **Onboarding**: Zero-auth onboarding. The moment the app is installed, the user should be on the home screen ready to press "Create Document". Delay login prompts until they try to back up data.
