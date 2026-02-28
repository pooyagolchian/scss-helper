# scss-helper

> A modern SCSS/CSS utility toolkit — fills the gaps in Tailwind CSS v3/v4 and pure-SCSS projects with design tokens, fluid typography, container queries, dark mode, golden ratio layouts, animations, and a 12-column CSS grid.

[![npm version](https://img.shields.io/npm/v/scss-helper.svg)](https://www.npmjs.com/package/scss-helper)
[![npm downloads](https://img.shields.io/npm/dm/scss-helper.svg)](https://www.npmjs.com/package/scss-helper)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Bundle Size](https://img.shields.io/badge/gzip-5.1KB-brightgreen)](https://www.npmjs.com/package/scss-helper)

📖 **[Full Documentation & Interactive Demos →](https://pooya.blog/scss-helper/)**

---

## Features

- **Design Tokens** — 30+ CSS custom properties for colors, spacing & typography
- **12-Column CSS Grid** — responsive breakpoints, gap utilities, auto-fit layouts
- **Fluid Typography** — smooth `clamp()`-based scaling, no breakpoints needed
- **Dark Mode** — dual strategy: `data-theme` attribute + `prefers-color-scheme`
- **Container Queries** — component-level responsive design
- **Golden Ratio** — φ-based typography, spacing, and grid layouts
- **Animations & Transitions** — 12 animations + 5 transition presets, all `prefers-reduced-motion` aware
- **Tailwind CSS Plugin** — use tokens and utilities alongside Tailwind v3
- **Modern Sass** — 100% `@use`/`@forward`, zero deprecation warnings
- **Namespaced** — `sh-` prefix on all classes, configurable via `$prefix`
- **Tiny** — 5.1 KB gzipped (full bundle), 1.7 KB grid-only, 583 B tokens-only

---

## What's New in v5

| Change | Details |
|--------|---------|
| Modern Sass modules | All files migrated to `@use`/`@forward` — zero `@import` deprecation warnings |
| Namespaced classes | All utility classes use the `sh-` prefix to avoid Tailwind collisions |
| Configurable prefix | `@use "scss-helper" with ($prefix: "my-")` |
| Smaller footprint | Removed ~25 KB of legacy modules (px helpers, flexbox grid, modifiers) |
| Bug fixes | Removed broken `attr(data-cq)` rule; fixed dark mode utility consistency |
| DRY grid | Responsive variants deduplicated via mixin; consistent `-xs`/`-sm`/`-md`/`-lg`/`-xl` suffixes |
| Prefixed keyframes | `sh-spin`, `sh-bounce`, etc. no longer collide with Tailwind keyframes |

### Breaking Changes (v4 → v5)

| v4 | v5 |
|----|-----|
| `.grid` | `.sh-grid` |
| `.col-6` | `.sh-col-6` |
| `.gap-4` | `.sh-gap-4` |
| `.col-6-large` | `.sh-col-6-lg` |
| `.text-fluid-lg` | `.sh-text-fluid-lg` |
| `.animate-spin` | `.sh-animate-spin` |
| `.transition-colors` | `.sh-transition-colors` |
| `.cq` | `.sh-cq` |
| `.dark\:text-white` | `.sh-dark-text-white` |
| `@import "scss-helper"` | `@use "scss-helper"` |

**Removed modules:** flexbox grid (`.sg-row`/`.sg-col-*`), px-based margin/padding helpers, font-size helpers (`.fs-*`), modifier classes (`.text-*`, `.bg-*`), clearfix, border-radius/box-shadow wrapper mixins.

### Migration Checklist

1. Update imports: replace `@import` with `@use "scss-helper"`
2. Find & replace class names: add `sh-` prefix (e.g. `.grid` → `.sh-grid`)
3. Update breakpoint suffixes: `-large` → `-lg`, `-medium` → `-md`, etc.
4. Update keyframe references: `spin` → `sh-spin`, `bounce` → `sh-bounce`
5. Remove references to deleted modules (see table above)
6. Test dark mode — class format changed from `.dark\:*` to `.sh-dark-*`

---

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Design Tokens](#design-tokens)
- [CSS Grid System](#css-grid-system)
- [Golden Ratio Layouts](#golden-ratio-layouts)
- [Fluid Typography](#fluid-typography)
- [Dark Mode](#dark-mode)
- [Container Queries](#container-queries)
- [Animations & Transitions](#animations--transitions)
- [Mixins](#mixins)
- [Tailwind CSS Plugin](#tailwind-css-plugin)
- [Build Outputs](#build-outputs)
- [Customization](#customization)
- [Browser Support](#browser-support)
- [Contributing](#contributing)
- [License](#license)

---

## Installation

```bash
npm install scss-helper
# or
pnpm add scss-helper
# or
yarn add scss-helper
```

**Peer dependency:** [Dart Sass](https://sass-lang.com/dart-sass) ≥ 1.60

```bash
npm install -D sass
```

## Quick Start

### Option 1: SCSS (recommended)

```scss
// Import everything
@use "scss-helper";

// Or cherry-pick individual modules
@use "scss-helper/src/tokens/index";
@use "scss-helper/src/typography/fluid";
@use "scss-helper/src/golden/golden-ratio";
```

### Option 2: Pre-compiled CSS

```css
/* Full bundle */
@import "scss-helper/css";

/* Grid only */
@import "scss-helper/css/grid";

/* Tokens only (CSS custom properties) */
@import "scss-helper/css/tokens";
```

### Option 3: CDN

```html
<link rel="stylesheet" href="https://unpkg.com/scss-helper@5/dist/style.css">
```

---

## Design Tokens

CSS custom properties generated from Sass variables. Drop into any project — Tailwind v4 `@theme`, vanilla CSS, or SCSS.

```css
:root {
  /* Colors */
  --color-primary: #0d6efd;
  --color-secondary: #6c757d;
  --color-success: #28a745;
  /* ... 30+ color tokens */

  /* Spacing (0.25rem steps) */
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-4: 1rem;
  /* ... 30 steps */

  /* Typography */
  --font-size-base: 1rem;
  --font-weight-bold: 700;
  --line-height-base: 1.5;
}
```

**Standalone build:** `@import "scss-helper/css/tokens"` — just the `:root` custom properties, nothing else.

---

## CSS Grid System

A 12-column CSS Grid with responsive breakpoints and gap utilities.

### Basic Grid

```html
<div class="sh-grid sh-gap-4">
  <div class="sh-col-8">Main content</div>
  <div class="sh-col-4">Sidebar</div>
</div>
```

### Responsive

Breakpoint suffixes: `-xs` (32rem), `-sm` (48rem), `-md` (64rem), `-lg` (80rem), `-xl` (90rem).

```html
<div class="sh-grid sh-gap-4">
  <div class="sh-col-12 sh-col-6-md sh-col-4-lg">Card</div>
  <div class="sh-col-12 sh-col-6-md sh-col-4-lg">Card</div>
  <div class="sh-col-12 sh-col-12-md sh-col-4-lg">Card</div>
</div>
```

### Auto-fit Grid

```html
<!-- Cards that auto-fit to fill available space -->
<div class="sh-grid-auto-md sh-gap-4">
  <div>Card</div>
  <div>Card</div>
  <div>Card</div>
</div>
```

Auto-fit sizes: `sh-grid-auto-xs` (8rem), `sh-grid-auto-sm` (10rem), `sh-grid-auto-md` (15rem), `sh-grid-auto-lg` (20rem), `sh-grid-auto-xl` (25rem).

### Gap Utilities

```html
<div class="sh-grid sh-gap-4">...</div>     <!-- 1rem gap -->
<div class="sh-grid sh-gap-x-2 sh-gap-y-4">...</div> <!-- different axes -->
```

Scale: `sh-gap-0` through `sh-gap-16` (0 to 4rem).

### Column Utilities

| Class | Description |
|-------|-------------|
| `sh-col-{1-12}` | Set column span |
| `sh-col-start-{1-12}` | Set column start line |
| `sh-col-end-{2-13}` | Set column end line |
| `sh-col-start` / `sh-col-end` | Start at 1 / End at -1 |
| `sh-col-start-auto` / `sh-col-end-auto` | Auto placement |

All column utilities support responsive suffixes: `sh-col-6-md`, `sh-col-start-1-lg`, etc.

---

## Golden Ratio Layouts

A complete design system derived from φ (1.618). Typography scales, spacing, grid layouts, and aspect ratios — all mathematically harmonious.

### Golden Typography Scale

```html
<h1 class="gs-text-3">Display heading</h1>   <!-- 4.236rem -->
<h2 class="gs-text-2">Section heading</h2>   <!-- 2.618rem -->
<p class="gs-text-0">Body text</p>            <!-- 1rem (base) -->
<small class="gs-text--1">Caption</small>     <!-- 0.618rem -->
```

### Golden Spacing

```html
<div class="gs-p-5 gs-m-4">
  <!-- padding: 1.618rem, margin: 1rem -->
</div>
```

### Golden Grid Layouts

```html
<!-- 61.8% / 38.2% two-column layout -->
<div class="gs-grid-golden">
  <main>Content</main>
  <aside>Sidebar</aside>
</div>

<!-- Reversed: 38.2% / 61.8% -->
<div class="gs-grid-golden-reverse">...</div>

<!-- Three-column golden spiral -->
<div class="gs-grid-golden-3">...</div>
```

### SCSS Functions

```scss
@use "scss-helper/src/golden/golden-ratio" as golden;

h1 {
  font-size: golden.golden-step(2);         // 2.618rem
  margin-bottom: golden.golden-step(1);     // 1.618rem
}

.layout {
  @include golden.golden-columns;           // 61.8% / 38.2% grid
}
```

---

## Fluid Typography

Smooth font scaling using CSS `clamp()` — no breakpoints, no JavaScript.

```html
<h1 class="sh-text-fluid-4xl">Headline</h1>
<p class="sh-text-fluid-base">Body text</p>
```

| Class | Range |
|-------|-------|
| `sh-text-fluid-xs` | 12px → 14px |
| `sh-text-fluid-sm` | 14px → 16px |
| `sh-text-fluid-base` | 16px → 18px |
| `sh-text-fluid-lg` | 18px → 22px |
| `sh-text-fluid-xl` | 20px → 28px |
| `sh-text-fluid-2xl` | 24px → 36px |
| `sh-text-fluid-3xl` | 30px → 48px |
| `sh-text-fluid-4xl` | 36px → 64px |

### SCSS Function

```scss
@use "scss-helper/src/typography/fluid" as fluid;

h1 {
  font-size: fluid.fluid-type(1.5rem, 3rem);           // default viewport range
  font-size: fluid.fluid-type(1rem, 2rem, 30rem, 90rem); // custom viewport range
}
```

---

## Dark Mode

Dual-strategy dark mode — works with both JavaScript toggles and OS preferences.

### Token Overrides

Semantic color tokens automatically shift in dark mode:

```css
/* Light mode */
--color-primary: #0d6efd;

/* Dark mode (automatic) */
--color-primary: #60a5fa;
```

### Utility Classes

```html
<!-- Works under [data-theme="dark"] AND prefers-color-scheme: dark -->
<p class="sh-dark-text-white">White text in dark mode</p>
<div class="sh-dark-bg-gray-900">Dark background in dark mode</div>
```

### SCSS Mixin

```scss
@use "scss-helper/src/dark/dark-mode" as dark;

.card {
  background: white;
  @include dark.dark-mode {
    background: #1a1a1a;
    color: white;
  }
}
```

### JavaScript Toggle

```js
// Toggle dark mode
document.documentElement.dataset.theme =
  document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
```

---

## Container Queries

Component-level responsive design using CSS Container Queries.

```html
<div class="sh-cq">
  <div class="sh-c-col-12 sh-c-col-6-sm sh-c-col-4-md">
    Responds to container width, not viewport
  </div>
</div>
```

### Container Types

| Class | Description |
|-------|-------------|
| `sh-cq` | `container-type: inline-size` |
| `sh-cq-size` | `container-type: size` |
| `sh-cq-normal` | `container-type: normal` |

### SCSS Mixin

```scss
@use "scss-helper/src/container/container-query" as cq;

.card {
  @include cq.container-bp('card', sm) {
    font-size: 1.25rem;
  }
  @include cq.container-bp(none, md) {
    // unnamed container query
    display: grid;
  }
}
```

---

## Animations & Transitions

Pre-built animations with `prefers-reduced-motion` guard. All prefixed with `sh-` to avoid Tailwind collisions.

### Animations

```html
<div class="sh-animate-fade-in">Fades in</div>
<div class="sh-animate-slide-up sh-delay-200">Slides up after 200ms</div>
<div class="sh-animate-spin">Loading spinner</div>
```

| Class | Description |
|-------|-------------|
| `sh-animate-fade-in` / `sh-animate-fade-out` | Opacity fade |
| `sh-animate-slide-up` / `sh-animate-slide-down` | Vertical slide |
| `sh-animate-slide-left` / `sh-animate-slide-right` | Horizontal slide |
| `sh-animate-scale-in` | Scale from 95% to 100% |
| `sh-animate-spin` | Continuous rotation |
| `sh-animate-ping` | Ping/ripple effect |
| `sh-animate-pulse` | Opacity pulse |
| `sh-animate-bounce` | Bounce |
| `sh-animate-wiggle` | Wiggle rotation |

### Animation Modifiers

```html
<div class="sh-animate-fade-in sh-delay-300 sh-animate-once">
  Fades in once after 300ms
</div>
```

Delays: `sh-delay-75` through `sh-delay-1000`.
Iteration: `sh-animate-once`, `sh-animate-twice`, `sh-animate-infinite`.
Fill: `sh-animate-fill-both`, `sh-animate-fill-forwards`.

### Transitions

```html
<button class="sh-transition-colors sh-duration-fast">
  Smooth color transition
</button>
```

| Class | Properties |
|-------|-----------|
| `sh-transition` | All properties |
| `sh-transition-colors` | Color, background, border |
| `sh-transition-opacity` | Opacity |
| `sh-transition-transform` | Transform |
| `sh-transition-shadow` | Box-shadow |

Duration: `sh-duration-fast` (100ms), `sh-duration-slow` (400ms).
Easing: `sh-ease-in`, `sh-ease-out`, `sh-ease-bounce`.

### Custom Timing

```html
<div class="sh-transition" style="--duration: 500ms; --easing: ease-in-out">
  Custom timing via CSS custom properties
</div>
```

### SCSS Mixin

```scss
@use "scss-helper/src/animation/transitions" as tr;

.button {
  @include tr.transition(opacity transform, 200ms, ease-out);
}
```

### Accessibility

All animations and transitions are automatically disabled for users with `prefers-reduced-motion: reduce`.

---

## Mixins

### Border Stroke

```scss
@use "scss-helper/src/mixin" as mx;

.card {
  @include mx.border-stroke(light);          // 1px solid black
  @include mx.border-stroke(medium, red);    // 3px solid red
  @include mx.border-stroke(heavy, #333);    // 6px solid #333
}
```

### Modifiers (Map Walker)

```scss
@use "scss-helper/src/mixin" as mx;

$sizes: (sm: 0.875rem, md: 1rem, lg: 1.25rem);

.text {
  @include mx.modifiers($sizes, "font-size");
}
// → .text-sm { font-size: 0.875rem; }
// → .text-md { font-size: 1rem; }
// → .text-lg { font-size: 1.25rem; }
```

### Breakpoint

```scss
@use "scss-helper/src/variables" as vars;

.sidebar {
  display: none;
  @include vars.breakpoint(md) {
    display: block;
  }
}
```

---

## Tailwind CSS Plugin

Use scss-helper's design tokens and utilities alongside Tailwind CSS v3.

### Setup

```js
// tailwind.config.js
const scssHelper = require('scss-helper/plugin');

module.exports = {
  plugins: [scssHelper],
  // or with options:
  plugins: [scssHelper({ injectTokens: true })],
};
```

### What the Plugin Provides

1. **Design tokens** as `:root` CSS custom properties (colors, spacing, typography)
2. **Dark mode** token overrides under `[data-theme="dark"]` and `prefers-color-scheme`
3. **Fluid typography** utilities: `sh-text-fluid-xs` through `sh-text-fluid-4xl`
4. **Container query** utilities: `sh-cq`, `sh-cq-size`, `sh-cq-normal`
5. **Transition** utilities: `sh-transition-colors`, `sh-transition-shadow`
6. **Animation** utilities: `sh-animate-fade-in`, `sh-animate-spin`, etc.
7. **Theme extensions**: `text-primary`, `bg-danger`, `text-fluid-lg`, etc.

### Options

| Option | Default | Description |
|--------|---------|-------------|
| `injectTokens` | `true` | Inject `:root` CSS custom properties |

---

## Build Outputs

| Export Path | File | Size | Gzipped | Description |
|------------|------|------|---------|-------------|
| `scss-helper` | `index.scss` | — | — | Full SCSS entry point |
| `scss-helper/css` | `dist/style.css` | 29 KB | 5.1 KB | Full compiled CSS |
| `scss-helper/css/grid` | `dist/only-css-grid.css` | 11 KB | 1.7 KB | Grid system only |
| `scss-helper/css/tokens` | `dist/tokens.css` | 1.8 KB | 583 B | Design tokens only |
| `scss-helper/plugin` | `plugin.js` | 5.4 KB | — | Tailwind CSS v3 plugin |

---

## Customization

### Custom Prefix

```scss
@use "scss-helper" with ($prefix: "my-");
// → .my-grid, .my-col-6, .my-animate-spin, etc.
```

### Override Variables

```scss
@use "scss-helper/src/variables" with (
  $primary: #8b5cf6,
  $font-size-base: 1.125rem,
  $grid-columns: 16,
);
@use "scss-helper";
```

### Override Fluid Scale

```scss
$fluid-type-scale: (
  sm: (1rem, 1.25rem),
  lg: (1.5rem, 2.5rem),
) !default;
```

### Override Dark Palette

```scss
$dark-palette: (
  "brand": #a78bfa,
  "surface": #1e1e2e,
) !default;
```

---

## Browser Support

| Feature | Chrome | Edge | Firefox | Safari |
|---------|--------|------|---------|--------|
| CSS Grid, Tokens, Typography | 57+ | 16+ | 52+ | 10.1+ |
| Container Queries | 105+ | 105+ | 110+ | 16+ |
| `clamp()` fluid typography | 79+ | 79+ | 75+ | 13.1+ |
| `prefers-color-scheme` | 76+ | 79+ | 67+ | 12.1+ |

---

## Development

```bash
# Install dependencies
pnpm install

# Build all outputs
pnpm build

# Watch mode
pnpm watch

# Build expanded (readable) CSS
pnpm build:dev
```

---

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -m 'Add my feature'`
4. Push: `git push origin feature/my-feature`
5. Open a Pull Request

---

## Changelog

### v5.0.0

- Modern Sass `@use`/`@forward` module system (zero `@import` deprecation warnings)
- `sh-` namespaced utility classes with configurable `$prefix`
- Removed ~25 KB of legacy helper modules
- DRY CSS grid, prefixed keyframes, dark mode fixes
- Updated Tailwind plugin & documentation

### v4.0.0

- Design tokens, fluid typography, container queries, golden ratio layouts
- Tailwind CSS v3 plugin
- Dark mode with dual strategy

---

## License

[MIT](https://opensource.org/licenses/MIT) © [Pooya Golchian](https://pooya.blog)
