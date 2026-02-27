# scss-helper

> A remarkable SCSS/CSS utility toolkit — fills the gaps in Tailwind CSS v3/v4 and pure-SCSS projects with design tokens, fluid typography, container queries, dark mode, golden ratio layouts, animations, and more.

[![npm version](https://img.shields.io/npm/v/scss-helper.svg)](https://www.npmjs.com/package/scss-helper)
[![npm downloads](https://img.shields.io/npm/dm/scss-helper.svg)](https://www.npmjs.com/package/scss-helper)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

📖 **[Full Documentation →](https://pooya.blog/scss-helper/)**

---

## Installation

```bash
npm install scss-helper
# or
pnpm add scss-helper
# or
yarn add scss-helper
```

---

## Quick Start

### Import everything
```scss
@import 'scss-helper/src/style';
```

### Import only the CSS grid
```scss
@import 'scss-helper/src/only-css-grid';
```

### Use pre-built CSS
```html
<!-- Full build (~75KB) -->
<link rel="stylesheet" href="node_modules/scss-helper/dist/style.css">

<!-- Grid only (~12KB) -->
<link rel="stylesheet" href="node_modules/scss-helper/dist/only-css-grid.css">

<!-- Design tokens only (~2KB) -->
<link rel="stylesheet" href="node_modules/scss-helper/dist/tokens.css">
```

---

## What's Included

### Design Tokens
CSS custom properties for colors, spacing, and typography.

```css
--color-white, --color-black, --color-gray-*
--space-xs, --space-sm, --space-md, --space-lg, --space-xl
--font-size-sm, --font-size-md, --font-size-lg
```

---

### CSS Grid System

```html
<!-- Basic grid -->
<div class="gs-grid">
  <div class="gs-col-6">Half</div>
  <div class="gs-col-6">Half</div>
</div>

<!-- Auto-fit responsive grid -->
<div class="gs-grid-auto-md">
  <div>Card</div>
  <div>Card</div>
</div>

<!-- Custom columns + gap -->
<div class="gs-grid gs-grid-gap-md" style="--grid-cols: 3">
  <div>Item</div>
</div>
```

**Gap classes:** `gs-grid-gap-xs` `gs-grid-gap-sm` `gs-grid-gap-md` `gs-grid-gap-lg` `gs-grid-gap-xl`  
**Auto-fit classes:** `gs-grid-auto-xs` → `gs-grid-auto-xl`  
**Column span classes:** `gs-col-1` → `gs-col-12`

---

### Golden Ratio Layouts

Layouts based on φ (1.618) for naturally proportioned designs.

```html
<!-- 61.8% / 38.2% split -->
<div class="gs-grid-golden">
  <main>Main content</main>
  <aside>Sidebar</aside>
</div>

<!-- Reversed -->
<div class="gs-grid-golden-reverse">
  <aside>Sidebar</aside>
  <main>Main content</main>
</div>

<!-- Three-column golden split -->
<div class="gs-grid-golden-3">
  <div>23.6%</div>
  <div>38.2%</div>
  <div>38.2%</div>
</div>
```

---

### Fluid Typography

Type that scales smoothly between viewport sizes using `clamp()`.

```html
<h1 class="text-fluid-xl">Scales 1.75rem → 2.5rem</h1>
<p class="text-fluid-md">Scales 1rem → 1.25rem</p>
```

| Class | Min | Max |
|---|---|---|
| `text-fluid-xs` | 0.75rem | 0.875rem |
| `text-fluid-sm` | 0.875rem | 1rem |
| `text-fluid-md` | 1rem | 1.25rem |
| `text-fluid-lg` | 1.25rem | 1.75rem |
| `text-fluid-xl` | 1.75rem | 2.5rem |
| `text-fluid-2xl` | 2rem | 3.5rem |
| `text-fluid-3xl` | 2.5rem | 4.5rem |

---

### Dark Mode

Dual-strategy: JS-toggled via `data-theme` and automatic via `prefers-color-scheme`.

```scss
@import 'scss-helper/src/dark/_dark-mode';

.card {
  background: #fff;

  @include dark-mode {
    background: #1a1a1a;
  }
}
```

```js
// Toggle dark mode
document.documentElement.setAttribute('data-theme', 'dark')
```

```html
<!-- Utility classes -->
<p class="dark:text-white">White in dark mode</p>
<div class="dark:bg-dark">Dark background</div>
```

---

### Container Queries

Element-level responsive design.

```html
<div class="cq-container">
  <p class="cq-sm:text-sm cq-lg:text-xl">
    Responds to container width, not the viewport
  </p>
</div>
```

Breakpoints: `cq-xs` (320px) · `cq-sm` (480px) · `cq-md` (640px) · `cq-lg` (768px) · `cq-xl` (1024px)

---

### Animations

12 keyframe animations with a `prefers-reduced-motion` guard.

```html
<div class="animate-fade-in">Fades in</div>
<div class="animate-slide-up animate-delay-200">Slides up (delayed)</div>
<div class="animate-spin">Spinning</div>
<div class="animate-pulse">Pulsing skeleton</div>
```

**Classes:** `animate-fade-in` · `animate-fade-out` · `animate-slide-up` · `animate-slide-down` · `animate-slide-left` · `animate-slide-right` · `animate-spin` · `animate-ping` · `animate-pulse` · `animate-bounce` · `animate-scale-in` · `animate-wiggle`

**Delays:** `animate-delay-75` · `animate-delay-100` · `animate-delay-200` · `animate-delay-300` · `animate-delay-500`

---

### Mixins

```scss
@import 'scss-helper/src/_mixin';

// Dark mode
@include dark-mode { background: #1a1a1a; }

// Transition
@include transition(background-color, 150ms, ease-out);

// Box shadow
@include box-shadow(0, 4px, 16px, rgba(0, 0, 0, 0.12));

// Border radius
@include border-radius(8px);

// Clearfix
@include clearfix;

// Modifiers
@include modifiers((primary: blue, danger: red), color);
```

---

### Spacing Helpers

```html
<div class="mt-4">margin-top: 1rem</div>
<div class="px-6">padding-inline: 1.5rem</div>
```

**Margin:** `m-*` `mt-*` `mb-*` `ml-*` `mr-*` `mx-*` `my-*`  
**Padding:** `p-*` `pt-*` `pb-*` `pl-*` `pr-*` `px-*` `py-*`  
**Scale:** 0 1 2 3 4 5 6 8 10 12 16 20 24 32

---

### Tailwind CSS Plugin

```js
// tailwind.config.js
const scssHelper = require('scss-helper/plugin')

module.exports = {
  plugins: [scssHelper],
}
```

Adds golden ratio, fluid type, and container query utilities as Tailwind classes.

---

## Build Outputs

| File | Description | Size |
|---|---|---|
| `dist/style.css` | Full build — all utilities | ~75KB |
| `dist/only-css-grid.css` | CSS grid only | ~12KB |
| `dist/tokens.css` | Design tokens only | ~2KB |

---

## Development

```bash
git clone https://github.com/pooyagolchian/scss-helper.git
cd scss-helper
pnpm install
pnpm build        # build all outputs
cd docs && pnpm dev  # run docs locally at localhost:5173
```

---

## Changelog

### v3.0.0
- Design tokens, fluid typography, container queries, dark mode mixin
- Golden ratio grid layouts (φ = 1.618)
- 12 keyframe animations + transition utilities
- Tailwind CSS plugin
- Pre-built CSS: `style.css`, `only-css-grid.css`, `tokens.css`
- Full docs at [pooya.blog/scss-helper](https://pooya.blog/scss-helper/)

### v2.x
- Flexbox grid, margin/padding helpers, font-size generator, mixins

---

## License

MIT © [Pooya Golchian](https://github.com/pooyagolchian)
