# 09 Component Library

> [!NOTE]  
> **Document Status**: Approved Architecture Draft  
> **UI Framework**: React (Tailwind CSS for styling)

To maintain absolute consistency and speed up development, we will build a highly constrained component library. Every component is designed for low-tech, elderly users.

## 1. Core Atoms

### `Button`
- **Props**: `variant` ('primary' | 'secondary' | 'danger'), `size` (default is massive: `h-16`), `isFullWidth`, `isLoading`, `leftIcon`.
- **Behavior**: Must include haptic feedback (vibration) on tap if supported by browser. Shows a spinning loader if `isLoading` is true.

### `VoiceButton`
- **Props**: `onDictationResult`, `isListening`, `language` (default: 'hi-IN').
- **Behavior**: Pulses rhythmically while recording. Automatically detects silence to stop recording. Falls back to a standard button if the Web Speech API is denied.

### `TextInput`
- **Props**: `label`, `placeholder`, `value`, `onChange`, `iconRight` (usually the VoiceButton), `type` (text | tel | number).
- **Behavior**: Huge tap target (`h-16`). Border turns thick blue on focus. `type="tel"` forces the numeric keypad.

## 2. Molecules

### `QuantitySelector`
- **Props**: `value`, `onChange`, `min` (default 1), `max`.
- **Layout**: 
  `[ - (Large Button) ]` `[ 5 (Text, 24px) ]` `[ + (Large Button) ]`
- **Behavior**: Prevents user from entering invalid text. 

### `ItemCard`
- **Props**: `item` (object), `onUpdateQuantity`, `onDelete`.
- **Layout**: Image/Icon on left, Item Name (bold) and Price/Unit (subtext) in center, `QuantitySelector` on right.

### `ClientCard`
- **Props**: `client` (object), `onSelect`.
- **Layout**: Avatar with initials. Client Name. Last active date.

## 3. Organisms

### `DocumentPreview` (The Receipt)
- **Props**: `document` (object), `template` (object).
- **Behavior**: Renders a clean HTML table that visually perfectly matches what the final PDF will look like. Strips out UI buttons.

### `EmptyState`
- **Props**: `title`, `description`, `icon`, `actionButton`.
- **Behavior**: Used when lists are empty to guide the user towards the primary action instead of leaving them staring at a blank screen.

## 4. Overlays

### `Toast`
- **Props**: `message`, `type` (success | error).
- **Behavior**: Pops up from the **top** (not bottom, to avoid keyboard collision) for 3 seconds.

### `LoadingScreen`
- **Props**: `message`.
- **Behavior**: Full-screen white overlay with a central spinner. Prevents accidental double-taps during PDF generation.

---
**CTO Guideline**: Do not use third-party component libraries like Material-UI or Chakra for this. They bring too much CSS bloat and complexity. Build these custom using Tailwind CSS to keep the bundle size tiny for offline usage.
