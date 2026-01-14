# Style Guide

**"Space Terminal"** aesthetic — monochromatic, glow-enhanced, developer-focused design.

## What Makes This Design Unique

### 1. Semantic Color System

White-on-black with semantic meaning encoded in opacity. All colors use OKLAB color space mixing for perceptually uniform appearance.

**Line colors:**

- `line-border` (10%) — Card/container borders
- `line-separator` (20%) — HR lines, table borders, content dividers

**Content colors:**

- `content-default` (50%) — Default body text
- `content-reading` (60%) — Prose, comfortable reading
- `content-emphasis` (70%) — Bold text, emphasis
- `content-primary` (80%) — Headings, links, important elements
- `content-accent` (90%) — Primary navigation
- `content-active` (100%) — Hover/active/selected states

**References:** `layout.css`, `PageWithSidebar.svelte`, `+page.svelte`, `vision/+page.svelte`

### 2. Text Glow Effects

Signature interactive feedback system: normal state → hover adds `content-active + text-glow-active`

Two utilities: `text-glow-active` (full intensity, interactive states) and `text-glow-emphasis` (50% intensity, headings). Future: `text-glow-happy`, `text-glow-danger`, etc.

**References:** `layout.css`, `+page.svelte`

### 3. Iosevka Typography

- **Sans:** `Iosevka Etoile` (body, UI)
- **Mono:** `Iosevka` (code)

Cards use `py-20` for generous breathing room.

**References:** `layout.css`, `+page.svelte`, `vision/+page.svelte`

---

## Component Patterns

### Link Utilities

- `.link` — Forward navigation (deeper into content). Base: `text-content-accent`, hover: `text-content-active + text-glow-active`
- `.link-back` — Backward navigation (breadcrumbs, "back to X"). Base: `text-content-primary`, hover: `text-content-active` (no glow)

**Example:** `<a href="/deeper" class="link">Explore</a>`

**References:** `layout.css`, `+page.svelte`, `vision/+page.svelte`

### Card Pattern

`py-20` for generous padding, `border-line-border` for subtle outlines.

**Example:** `class="py-20 border border-line-border rounded-lg"`

**References:** `vision/+page.svelte`

### Article Prose

`.article` class applies `prose` with custom color theme, responsive sizing, and glowing headings.

**References:** `layout.css`, `.svx` files

### Layout Patterns

- **PageWithSidebar** — Two-column responsive layout (sidebar/content). Sidebar converts to top section on mobile with border transitions (`border-b` → `border-r`).
- **ArticleLayout** — Breadcrumb navigation + centered prose. For mdsvex articles (`.svx` files with `layout: vision` frontmatter).
- **Breadcrumb pattern** — `ffloyd.space / section` using `.link-back` with `/` separator. Visually separates navigation from content.

**References:** `PageWithSidebar.svelte`, `ArticleLayout.svelte`
