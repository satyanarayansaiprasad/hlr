# Design System Document: The Editorial Health Authority

## 1. Overview & Creative North Star
**Creative North Star: "The Clinical Curator"**

This design system moves away from the cluttered, ad-heavy aesthetic of traditional health sites. It treats medical information as a premium editorial experience. By blending the precision of a clinical laboratory with the high-end minimalism of a lifestyle brand, we establish immediate authority and calm.

The design breaks the "template" look by using **Intentional Asymmetry** and **Tonal Depth**. We do not use rigid lines to separate content; instead, we use "The Breathable Grid"—a layout strategy that favors expansive whitespace and overlapping elements (e.g., a product image bleeding out of a container) to create a sense of bespoke craftsmanship rather than a generic CMS output.

---

## 2. Color & Surface Architecture
Our palette uses "Clinical Blue" for action and "Sage Green" for validation, set against a sophisticated range of greige and cool-white neutrals.

### The "No-Line" Rule
**Strict Mandate:** 1px solid borders are prohibited for sectioning or containment. 
Structure is defined solely through:
- **Background Shifts:** Use `surface-container-low` sections against `surface` backgrounds.
- **Tonal Transitions:** Defining an area by shifting from `surface-container-lowest` to `surface-container-high`.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—stacked sheets of fine, heavy-stock paper.
- **Layer 0 (Base):** `surface` (#f8f9fa) – The canvas.
- **Layer 1 (Sections):** `surface-container-low` (#f3f4f5) – Used for broad content groupings.
- **Layer 2 (Cards):** `surface-container-lowest` (#ffffff) – Used for primary interactive elements to create a "lifted" feel against the background.

### The "Glass & Gradient" Rule
To avoid a flat, "out-of-the-box" look, floating elements (like Navigation Bars or Expert Badges) must utilize **Glassmorphism**:
- **Token:** `surface-container-lowest` at 80% opacity.
- **Effect:** `backdrop-blur: 20px`.
- **Signature Gradient:** High-conversion CTAs should use a subtle linear gradient from `primary` (#003d9b) to `primary_container` (#0052cc) at a 135-degree angle to add "visual soul."

---

## 3. Typography
We use a dual-sans-serif approach to balance clinical authority with modern readability.

*   **Display & Headlines (Manrope):** Chosen for its geometric precision and modern "Apple-esque" feel. High-contrast sizing communicates editorial confidence.
*   **Body & Labels (Inter):** The industry standard for legibility. Its neutral tone ensures that complex health data remains easy to digest.

**The Hierarchy of Trust:**
- **Display-LG (3.5rem):** Reserved for hero editorial titles.
- **Headline-MD (1.75rem):** Used for primary section headers in reviews.
- **Title-SM (1rem, Medium weight):** Used for "Expert Insight" callouts to distinguish from general body text.
- **Body-LG (1rem):** The default for article content. Increased line-height (1.6) is mandatory for readability.

---

## 4. Elevation & Depth
In this system, depth is a tool for focus, not just decoration.

### The Layering Principle
Achieve hierarchy by "stacking" surface tiers. Place a `surface-container-lowest` card on a `surface-container-low` section to create a soft, natural lift.

### Ambient Shadows
Shadows must be "atmospheric." 
- **Value:** `0px 20px 40px rgba(25, 28, 29, 0.04)`
- **Color:** Use a tinted version of `on-surface` (#191c1d) rather than pure black to mimic natural light filtering through a clinical space.

### The "Ghost Border" Fallback
If a border is required for accessibility (e.g., in high-contrast modes), use a **Ghost Border**:
- **Token:** `outline-variant` (#c3c6d6) at **15% opacity**. Never use 100% opacity.

---

## 5. Components

### High-Conversion CTA Buttons
- **Style:** `rounded-md` (0.75rem). 
- **Primary:** Gradient from `primary` to `primary_container`. White text. No border.
- **Secondary:** `surface-container-highest` background with `on-primary-fixed-variant` text.
- **Interaction:** On hover, the button should scale by 2% (`scale-102`) and the shadow should deepen slightly.

### Expert Badges & Chips
- **Aesthetic:** Glassmorphic. 
- **Style:** `secondary_container` (#91f78e) at 20% opacity with `secondary` (#006e1c) text. 
- **Placement:** Always overlapping the edge of a card or image to break the grid.

### Structured Comparison Tables
- **Execution:** No vertical or horizontal lines. 
- **Alternating Rows:** Use `surface-container-low` for even rows and `surface-container-lowest` for odd rows.
- **Headers:** Use `primary_fixed` (#dae2ff) background to subtly highlight the "Top Pick."

### Cards & Article Lists
- **Rule:** Forbid the use of divider lines between items.
- **Spacing:** Use the `xl` spacing scale (1.5rem+) to separate list items.
- **Visual Cues:** Use a `primary` colored vertical bar (4px width) on the left side of a card only when it is "Active" or "Recommended."

### Input Fields
- **Background:** `surface-container-low`.
- **Active State:** Shift to `surface-container-lowest` with a `primary` ghost border (20% opacity).

---

## 6. Do's and Don'ts

### Do:
- **Do** use asymmetrical margins (e.g., 60% width for text, 40% for supporting imagery) to create an editorial feel.
- **Do** use `secondary` (Sage Green) tokens for all "Safe," "Natural," or "Expert-Verified" callouts.
- **Do** prioritize `surface_container_lowest` for the main article "paper" to make it pop against the `surface` background.

### Don't:
- **Don't** use pure black (#000000) for text. Always use `on-surface` (#191c1d) for a softer, premium contrast.
- **Don't** use standard 1px borders to separate the sidebar. Use a background color shift to `surface-container-low`.
- **Don't** use "drop shadows" on buttons. Use ambient, diffused glows that feel like they are part of the surface.
- **Don't** crowd the content. If it feels full, add another 1rem of whitespace. Space is the ultimate indicator of a premium brand.