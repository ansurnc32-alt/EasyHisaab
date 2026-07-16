# 07 Design System

> [!NOTE]  
> **Document Status**: Approved Architecture Draft  
> **Target Audience**: Non-tech-savvy users, 50+ age demographic, reading glasses wearers.

## 1. Brand Guidelines
- **Personality**: Trustworthy, Simple, Familiar (like a physical notebook), Fast.
- **Language**: Colloquial Hindi-first ("नया पर्चा" instead of "Create Document").

## 2. Color Palette
To ensure high contrast and readability.
- **Primary Action**: `#25D366` (WhatsApp Green - familiar to users). Used for the final "Share" or "Generate" actions.
- **Secondary Action**: `#3B82F6` (Trust Blue). Used for "Add Item", navigation.
- **Background (Light)**: `#F9FAFB` (Off-white, reduces eye strain compared to pure white).
- **Background (Card)**: `#FFFFFF`.
- **Text (Primary)**: `#111827` (Near black for max contrast).
- **Text (Secondary)**: `#4B5563` (Dark grey for subtext, never lighter).
- **Error/Destructive**: `#DC2626` (Bright red).

## 3. Typography
**Crucial Requirement**: Base font size must be massive.
- **Font Family**: `Inter` or `Noto Sans Devanagari` (for perfect Hindi rendering).
- **Base Size (Body)**: `18px` (Standard web is 16px, we bump it up).
- **Headings (H1)**: `28px` - Bold.
- **Buttons**: `20px` - SemiBold.

## 4. Spacing & Touch Targets
- **Minimum Touch Target**: `60x60px` (Apple recommends 44px, but our users need larger targets).
- **Padding**: Standard padding inside cards should be generous (`16px` to `24px`).
- **Margin**: High negative space between distinct sections to avoid "clutter panic".

## 5. UI Elements

### Buttons
- **Primary Button**: Massive width (100% of container), `60px` height. WhatsApp Green. Highly rounded corners (`12px` border-radius).
- **Voice Mic Button**: Distinct, floating, or centrally placed. Must pulse when active.
- **Quantity Selector (+ / -)**: Massive square buttons next to the item. 

### Cards
- **Document Card**: Looks like a physical receipt. Subtle drop shadow (`box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1)`).
- **Item Card**: Large icon on the left, item name, massive `+` and `-` on the right.

### Forms & Inputs
- **Inputs**: `60px` height. `2px` solid border (`#D1D5DB`). On focus, border turns Blue and thickness increases.
- **Labels**: Always placed *above* the input. Placeholder text is not a substitute for labels.
- **Typing Fallback**: Every text input has a permanent 🎙️ Mic icon embedded on the right side.

## 6. Accessibility & Responsiveness
- **No Swiping**: Older users struggle with hidden swipe actions. Use explicit "Delete" buttons (with an icon) instead of "Swipe left to delete".
- **Responsive**: App is strictly designed for Mobile Viewports (max-width: `600px`). On desktop, it should render as a mobile-sized container in the center of the screen to preserve UI integrity.
- **Dark Mode**: Avoid for V1. High contrast light mode mimics paper better. Older demographics often struggle with dark mode reading.

## CTO Critique on Design
"Beautiful" for EasyHisaab does not mean gradient glassmorphism. "Beautiful" means **obvious, fast, and legible**. Every screen should have exactly one obvious primary action. If a user has to ask "what do I click next?", the UI has failed.
