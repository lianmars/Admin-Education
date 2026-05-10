---
name: Educational Management System
colors:
  surface: '#f4fbf4'
  surface-dim: '#d4dcd5'
  surface-bright: '#f4fbf4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eef6ee'
  surface-container: '#e8f0e9'
  surface-container-high: '#e3eae3'
  surface-container-highest: '#dde4dd'
  on-surface: '#161d19'
  on-surface-variant: '#3c4a42'
  inverse-surface: '#2b322d'
  inverse-on-surface: '#ebf3eb'
  outline: '#6c7a71'
  outline-variant: '#bbcabf'
  surface-tint: '#006c49'
  primary: '#006c49'
  on-primary: '#ffffff'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#4edea3'
  secondary: '#006c4a'
  on-secondary: '#ffffff'
  secondary-container: '#82f5c1'
  on-secondary-container: '#00714e'
  tertiary: '#a43a3a'
  on-tertiary: '#ffffff'
  tertiary-container: '#fc7c78'
  on-tertiary-container: '#711419'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#85f8c4'
  secondary-fixed-dim: '#68dba9'
  on-secondary-fixed: '#002114'
  on-secondary-fixed-variant: '#005137'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3af'
  on-tertiary-fixed: '#410005'
  on-tertiary-fixed-variant: '#842225'
  background: '#f4fbf4'
  on-background: '#161d19'
  surface-variant: '#dde4dd'
typography:
  display:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  h1:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.01em
  h2:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  h3:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  sidebar_width: 260px
  max_content_width: 1280px
---

## Brand & Style
The design system is rooted in the "Institutional Minimalist" aesthetic. It prioritizes clarity, structural integrity, and high-velocity administrative efficiency. Taking inspiration from the focus-oriented environment of Notion and the functional reliability of Google Workspace, this design system establishes a digital environment that feels secure and professional. 

The brand personality is authoritative yet accessible—designed to reduce the cognitive load of school administrators. It utilizes ample white space, a disciplined color application, and a rigorous typographic hierarchy to transform complex data into actionable insights.

## Colors
This design system employs a focused palette designed for high legibility. 
- **Primary Canvas:** The primary brand greens are used strategically for primary actions, success states, and key navigational markers. 
- **Surface Palette:** We utilize a layered approach to grays. `#FFFFFF` is used for primary content cards and data surfaces, while `#F3F4F6` (and slightly darker variations) defines the background architecture and sidebar, creating a clear distinction between the "tool" and the "content."
- **Typography:** To ensure maximum readability and professional tone, `#1F2937` serves as the primary ink color, providing high contrast against white surfaces without the harshness of pure black.

## Typography
This design system utilizes **Inter** for its exceptional legibility in data-heavy environments. The hierarchy is strictly enforced to guide the eye through complex administrative forms. 

- **Weight Usage:** Semi-bold (600) is reserved for headings and primary UI labels to provide anchor points in the layout. Regular (400) is used for all body copy and user input.
- **Micro-copy:** Small labels (12px) use a heavier weight and subtle tracking to remain legible in sidebars and table headers.
- **Spacing:** For mobile views, Display and H1 sizes scale down by a factor of 0.8x to ensure headers do not consume the limited vertical viewport.

## Layout & Spacing
The layout philosophy is based on a **fixed-fluid hybrid grid**. 
- **Navigation:** A persistent sidebar (260px) sits on the left, using a light gray background to frame the main content area.
- **Content Area:** Main content is contained within a 1280px max-width container, centered on the screen to prevent line lengths from becoming too long for comfortable reading.
- **Grid:** A 12-column system is used within the content area. 
- **Rhythm:** An 8px linear scale is the foundation for all padding and margins. Tables and cards utilize "generous padding" (24px) to ensure the interface feels airy and modern despite the density of school data.

## Elevation & Depth
This design system uses a "Low-Contrast Flat" approach with subtle depth cues to indicate interactivity.
- **Flat Base:** The background is a flat neutral surface.
- **Primary Elevation:** Cards and containers use a white background with a very soft, diffused shadow (`0 1px 3px rgba(0,0,0,0.05), 0 10px 15px -5px rgba(0,0,0,0.02)`).
- **Interactive States:** On hover, cards may lift slightly or gain a subtle border color change. Buttons use a small drop shadow to signify clickability.
- **Z-Index:** Modals and dropdowns use a higher elevation with more pronounced shadows to sit clearly above the administrative workspace.

## Shapes
The shape language is "Soft Professional." A standard radius of 6px-8px (Soft) is applied to all components. This offers a modern, approachable feel while maintaining the structural "box" feel appropriate for an institutional management tool.
- **Buttons & Inputs:** Use the standard 6px radius.
- **Cards:** Use a slightly larger 8px-12px radius to frame content sections softly.
- **Circular Elements:** Reserved exclusively for user avatars and status pips.

## Components
- **Buttons:** Primary buttons use the brand green (#10B981) with white text. Secondary buttons use a light gray ghost style with a subtle border.
- **Data Tables:** These are the core of the system. They feature generous cell padding (16px vertical), very thin horizontal dividers (#F3F4F6), and hover states for rows. Headers are sticky and use the `label-sm` style.
- **Input Fields:** Professional "Notion-style" inputs—minimalist, with a subtle 1px border that shifts to brand green on focus. Labels are always positioned above the field.
- **Cards:** White backgrounds, soft shadows, and 24px internal padding. Used to group related data like "Student Information" or "Financial Overview."
- **Sidebar:** A vertical navigation stack with clear icons, using a "light on light" color scheme (dark gray text on light gray background) to minimize visual distraction from the main workspace.
- **Status Chips:** Small, rounded badges used for "Attendance," "Payment Status," or "Grade Level," employing light tinted backgrounds with darker text for high-contrast accessibility.