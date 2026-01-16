# Style Guide

**"Space Terminal"** aesthetic — monochromatic, glow-enhanced, developer-focused design.

## What Makes This Design Unique

### 1. Semantic Color System

White-on-black with semantic meaning encoded in **OKLab mix ratios** (not transparency). Tokens are defined by mixing `--color-ink` into `--color-surface` using `color-mix(in oklab, ...)` for perceptually uniform steps.

**Base colors:**

- `--color-surface` — Background surface (black)
- `--color-ink` — Foreground ink (white)

**Line colors:**

- `line-border` — Card/container borders
- `line-separator` — HR lines, table borders, content dividers

**Content colors:**

- `content-default` — Default body text
- `content-reading` — Prose, comfortable reading
- `content-emphasis` — Bold text, emphasis
- `content-primary` — Headings, links, important elements
- `content-accent` — Primary navigation
- `content-active` — Hover/active/selected states

**References:** `layout.css`, `PageWithSidebar.svelte`, `+page.svelte`, `vision/+page.svelte`

### 2. Text Glow Effects

Signature interactive feedback system: normal state → hover adds `content-active + text-glow-active`

Glow utilities:

- `text-glow-active` — interactive glow (uses `content-active` at reduced intensity)
- `text-glow-emphasis` — heading glow (uses `content-emphasis` at reduced intensity)
- `text-glow-happy` — warm accent glow (currently `orange-200`)

Future: `text-glow-danger`, etc.

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
