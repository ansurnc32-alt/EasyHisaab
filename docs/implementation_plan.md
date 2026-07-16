# EasyHisaab - Architecture & Documentation Plan

As the acting CTO and Chief Architect, I have reviewed your vision for EasyHisaab. The transition from a simple MVP PRD to a robust, scalable AI-powered Document Creation Platform requires careful architectural planning, especially considering our target demographic and the dynamic template requirements.

Before generating the 17 comprehensive architectural markdown files, I have analyzed your product requirements and prepared a strategic critique. 

## 🚨 User Review Required: CTO Critique (Section 19)

I am challenging a few assumptions to ensure this product survives in the real world:

1. **The "Offline-First" vs. "AI-Powered" Contradiction**: 
   You requested strict offline support alongside advanced AI (NLU, OCR). Running local LLMs on low-end Indian Android devices is impossible. 
   *Recommendation*: We must adopt a **Hybrid-Offline Strategy**. Manual document creation remains 100% functional offline (via local SQLite). AI Voice commands and OCR will require an internet connection and will gracefully show a "Connect to use Voice" state when offline.
2. **The "Zero-Auth" Data Loss Risk**: 
   If we skip authentication entirely for MVP, users will lose all business data if they clear app data or change phones. For a business owner, losing their ledger is a fatal trust-breaker.
   *Recommendation*: Implement "Device-ID Auth" invisibly on first launch, and heavily prompt for a simple OTP (Phone Number) login to enable silent Cloud Sync.
3. **Template Architecture Complexity**: 
   Allowing 100% unstructured custom templates will make future analytics and AI training a nightmare. 
   *Recommendation*: We need a **"Strict Core + Flexible Meta" schema** (e.g., MongoDB). Every document MUST have a standardized `LineItem` array (Name, Qty), but templates can inject flexible `meta_data` fields (e.g., "Rental Days", "Unit Type").
4. **Platform Choice - React Native (Expo) over PWA**:
   Target users struggle to "Add to Home Screen" with PWAs. A lightweight React Native app (under 15MB) deployed to the Play Store is easier to share via a WhatsApp link, gives us native SQLite access for robust offline mode, and allows direct WhatsApp intents for sharing PDFs.
5. **Monetization Reality Check**: 
   Tier 2/3 Indian business owners strongly resist monthly SaaS subscriptions. 
   *Recommendation*: We should plan a **Freemium Quota Model** (e.g., 50 Free PDFs/month). Once they hit the limit, they pay a very small micro-transaction (₹99/month) or watch a rewarded ad to unlock more.

## ❓ Open Questions

Please clarify the following business requirements before I begin drafting the exact database schemas and API designs:

1. **Tech Stack Approval**: Do you approve of using **React Native (Expo)** for the frontend and **Node.js + MongoDB** for the backend? This stack perfectly supports our dynamic template requirements.
2. **Offline AI**: Do you accept that AI Voice Parsing will require an active internet connection, falling back to standard OS-level voice typing if offline?
3. **Cloud Sync**: Should we enforce OTP login on day 1 for safety, or keep it strictly local until the user voluntarily decides to backup?
4. **Monetization**: For the Business Model document, should I architect the system for a Monthly Subscription (SaaS) or a Usage-based Quota (Freemium)?

## 📝 Proposed Documentation Plan

Once you answer the open questions and approve this plan, I will generate the complete software blueprint in a new folder `docs/architecture/` containing the following professional markdown files:

### Phase 1: Strategy & Features
- `01_Business_Model.md`
- `02_Feature_Breakdown.md` (MoSCoW)
- `17_Future_AI_Roadmap.md`

### Phase 2: System & Database Design
- `03_System_Architecture.md`
- `04_Database_Design.md` (MongoDB Schema)
- `05_API_Design.md`

### Phase 3: UI/UX & Components
- `07_Design_System.md`
- `08_UI_Wireframes.md`
- `09_Component_Library.md`

### Phase 4: AI & Engineering
- `10_AI_Assistant_Design.md`
- `11_Prompt_Library.md`
- `12_Security_Architecture.md`
- `13_Performance_Strategy.md`
- `14_Testing_Strategy.md`
- `15_Deployment_Plan.md`
- `16_Project_Roadmap.md` (Sprints 1-6)

- *Note: `06_Folder_Structure.md` will be documented as well.*

---

**Please provide your answers to the open questions so we can proceed with generating the architecture files.**
