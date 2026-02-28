# scss-helper

> A comprehensive SCSS/CSS utility toolkit — fills the gaps in Tailwind CSS v3/v4 and pure-SCSS projects with design tokens, fluid typography, container queries, dark mode, golden ratio layouts, animations, and more.

[![npm version](https://img.shields.io/npm/v/scss-helper.svg)](https://www.npmjs.com/package/scss-helper)
[![npm downloads](https://img.shields.io/npm/dm/scss-helper.svg)](https://www.npmjs.com/package/scss-helper)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

📖 **[Full Documentation & Interactive Demos →](https://pooya.blog/scss-helper/)**

---

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Design Tokens](#design-tokens)
- [CSS Grid System](#css-grid-system)
- [Flexbox Grid](#flexbox-grid)
- [Golden Ratio Layouts](#golden-ratio-layouts)
- [Fluid Typography](#fluid-typography)
- [Dark Mode](#dark-mode)
- [Container Queries](#container-queries)
- [Animations & Transitions](#animations--transitions)
- [Spacing Helpers](#spacing-helpers)
- [Font Size Helpers](#font-size-helpers)
- [Mixins](#mixins)
- [Modifier Classes](#modifier-classes)
- [Tailwind CSS Plugin](#tailwind-css-plugin)
- [Build Outputs](#build-outputs)
- [Development](#development)
- [Changelog](#changelog)
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

**Requirements:** Dart Sass >= 1.60.0 · Node.js >= 18

---

## Quick Start

### Three ways to use scss-helper

**1. Import SCSS source** (full control, tree-shakeable)

```scss
// Everything
@import 'scss-helper';

// Or cherry-pick individual modules
@import 'scss-helper/src/tokens/index';       // Design tokens only
@import 'scss-helper/src/css-grid';            // CSS Grid only
@import 'scss-helper/src/typography/fluid';    // Fluid type only
@import 'scss-helper/src/dark/dark-mode';      // Dark mode only
@import 'scss-helper/src/animation/animations';// Animations only
@import 'scss-helper/src/golden/golden-ratio'; // Golden ratio only
@import 'scss-helper/src/container/container-query'; // Container queries
```

**2. Drop-in pre-built CSS** (zero config)

```html
<!-- Full build -->
<link rel="stylesheet" href="node_modules/scss-helper/dist/style.css">

<!-- Grid only -->
<link rel="stylesheet" href="node_modules/scss-helper/dist/only-css-grid.css">

<!-- Design tokens only -->
<link rel="stylesheet" href="node_modules/scss-helper/dist/tokens.css">
```

**3. Tailwind CSS v3 plugin** (extend Tailwind with scss-helper utilities)

```js
// tailwind.config.js
const scssHelper = require('scss-helper/plugin');
module.exports = {
  plugins: [scssHelper],
};
```

---

## Design Tokens

CSS custom properties on `:root` for colors, spacing, and typography — usable in any CSS context.

### Colors

```css
/* Palette */
--color-white    --color-black
--color-gray-100 ... --color-gray-900

/* Hues */
--color-blue     --color-indigo   --color-purple
--color-pink     --color-red      --color-orange
--color-yellow   --color-green    --color-teal     --color-cyan

/* Semantic */
--color-primary  --color-secondary --color-success
--color-info     --color-warning   --color-danger
--color-light    --color-dark
```

### Spacing

30-step scale from `--spacing-0` (0) to `--spacing-96` (24rem), based on a 0.25rem unit.

```css
--spacing-0: 0;
--spacing-1: 0.25rem;    --spacing-2: 0.5rem;
--spacing-3: 0.75rem;    --spacing-4: 1rem;
--spacing-5: 1.25rem;    --spacing-6: 1.5rem;
/* ... up to */
--spacing-96: 24rem;
```

### Typography

```css
--font-size-sm  --font-size-base  --font-size-lg  --font-size-xl
--font-size-2xl --font-size-3xl   --font-size-4xl
--font-size-h1 ... --font-size-h6
--font-weight-lighter --font-weight-light --font-weight-normal
--font-weight-bold    --font-weight-bolder
--line-height-sm  --line-height-base  --line-height-lg
```

**Standalone import:**
```scss
@import 'scss-helper/src/tokens/index';
```

---

## CSS Grid System

A 12-column CSS Grid with responsive breakpoints, auto-fit layouts, and flexible gap utilities.

```html
<!-- Basic 12-column grid -->
<div class="grid">
  <div style="--span: 6">Half</div>
  <div style="--span: 6">Half</div>
</div>

<!-- Auto-fit responsive grid -->
<div class="grid-auto-md">
  <div>Card</div>
  <div>Card</div>
  <div>Card</div>
</div>
```

### Column Spans

`.col-1` through `.col-12` — explicit column span classes.

```html
<div class="grid">
  <div class="col-8">Main</div>
  <div class="col-4">Sidebar</div>
</div>
```

### Column Start/End

`.col-start-1` through `.col-start-12` · `.col-end-1` through `.col-end-13`

### Auto-fit Grids

| Class | Min column width |
|---|---|
| `grid-auto-xs` | Smallest |
| `grid-auto-sm` | Small |
| `grid-auto-md` | Medium |
| `grid-auto-lg` | Large |
| `grid-auto-xl` | Largest |

### Gap Utilities

**Named scale:** `grid-gap-xxxxs` `grid-gap-xxxs` `grid-gap-xxs` `grid-gap-xs` `grid-gap-sm` `grid-gap-md` `grid-gap-lg` `grid-gap-xl` `grid-gap-xxl` `grid-gap-xxxl` `grid-gap-xxxxl`

**Numeric scale (Tailwind-compatible):** `gap-0` through `gap-16` · `gap-x-{n}` · `gap-y-{n}`

### Responsive Variants

All column, start, end, and auto classes are available at each breakpoint:

`-xsmall` (32rem) · `-small` (48rem) · `-medium` (64rem) · `-large` (80rem) · `-xlarge` (90rem)

```html
<div class="grid">
  <div class="col-12 col-6-medium col-4-large">Responsive column</div>
</div>
```

### Breakpoint Mixin

```scss
@include breakpoint(md) {
  .custom { font-size: 1.25rem; }
}
```

---

## Flexbox Grid

A 24-column flexbox grid for legacy layouts.

```html
<div class="sg-row">
  <div class="sg-col-12">Half (12/24)</div>
  <div class="sg-col-12">Half (12/24)</div>
</div>
```

`.sg-col` (auto-grow) · `.sg-col-1` through `.sg-col-24` — percentage-based widths.
Columns collapse to 100% width below 768px.

---

## Golden Ratio Layouts

Layouts, typography, and spacing based on φ (1.618) for naturally proportioned designs.

### Grid Layouts

```html
<!-- 61.8% / 38.2% two-column split -->
<div class="gs-grid-golden">
  <main>Main content</main>
  <aside>Sidebar</aside>
</div>

<!-- Reversed: 38.2% / 61.8% -->
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

<!-- Flexbox variant -->
<div class="gs-flex-golden">
  <main>Major</main>
  <aside>Minor</aside>
</div>
```

### Golden Typography

Type sizes scaled by powers of φ:

| Class | Size |
|---|---|
| `gs-text--2` | 0.382rem |
| `gs-text--1` | 0.618rem |
| `gs-text-0` | 1rem (base) |
| `gs-text-1` | 1.618rem |
| `gs-text-2` | 2.618rem |
| `gs-text-3` | 4.236rem |
| `gs-text-4` | 6.854rem |
| `gs-text-5` | 11.09rem |

Leading classes: `gs-leading-body` · `gs-leading-tight` · `gs-leading-compact`

### Golden Spacing

9-step spacing scale via CSS custom properties:

`--gs-space-1` through `--gs-space-9`

Utility classes: `gs-m-{n}` · `gs-mt-{n}` · `gs-p-{n}` · `gs-gap-{n}` (n = 1–9)

### Golden Aspect Ratios

| Class | Ratio |
|---|---|
| `gs-ratio-golden` | 1.618 : 1 |
| `gs-ratio-golden-portrait` | 1 : 1.618 |
| `gs-ratio-golden-landscape` | 2.618 : 1 |

### Golden Border Radius

`gs-rounded-phi` · `gs-rounded-phi-sm` · `gs-rounded-phi-lg`

### Mixins & Functions

```scss
// Grid mixin
@include golden-columns($gap: 1rem);

// Type scaling mixin
@include golden-scale-type($step: 2, $leading: 1.4);

// Functions
$major: golden-ratio-split(960px);  // → 593.28px
$minor: golden-ratio-minor(960px);  // → 366.72px
$scaled: golden-step(3);            // → 4.236rem
```

---

## Fluid Typography

Type that scales smoothly between viewport sizes using `clamp()`.

```html
<h1 class="text-fluid-xl">Scales 1.75rem → 2.5rem</h1>
<p class="text-fluid-md">Scales 1rem → 1.25rem</p>
```

| Class | Min | Max |
|---|---|---|
| `text-fluid-xs` | 0.75rem | 0.875rem |
| `text-fluid-sm` | 0.875rem | 1rem |
| `text-fluid-base` | 1rem | 1.125rem |
| `text-fluid-md` | 1rem | 1.25rem |
| `text-fluid-lg` | 1.25rem | 1.75rem |
| `text-fluid-xl` | 1.75rem | 2.5rem |
| `text-fluid-2xl` | 2rem | 3.5rem |
| `text-fluid-3xl` | 2.5rem | 4.5rem |
| `text-fluid-4xl` | 3rem | 5.5rem |

### SCSS Function

```scss
// Use in your own styles
font-size: fluid-type(1rem, 1.5rem);
// Outputs: clamp(1rem, calc(1rem + ...), 1.5rem)
```

---

## Dark Mode

Dual-strategy dark mode: JS-toggled via `data-theme` attribute and automatic via `prefers-color-scheme`.

### Mixin

```scss
@import 'scss-helper/src/dark/dark-mode';

.card {
  background: #fff;
  color: #333;

  @include dark-mode {
    background: #1a1a1a;
    color: #f0f0f0;
  }
}
```

This outputs styles inside both `[data-theme="dark"]` and `@media (prefers-color-scheme: dark)`.

### JS Toggle

```js
// Enable dark mode
document.documentElement.setAttribute('data-theme', 'dark');

// Disable
document.documentElement.removeAttribute('data-theme');
```

### Utility Classes

```html
<p class="dark:text-white">White text in dark mode</p>
<div class="dark:bg-dark">Dark background</div>
<span class="dark:text-primary">Primary color in dark mode</span>
```

16 color utilities for both text and background, automatically scoped to `[data-theme="dark"]`.

### Token Overrides

Design tokens (`--color-primary`, `--color-secondary`, etc.) are automatically adjusted to lighter/darker values in dark mode.

---

## Container Queries

Element-level responsive design based on container width, not viewport.

### Setup

```html
<div class="cq">
  <!-- Children respond to this container's width -->
</div>

<!-- Or with a named container -->
<div data-cq="sidebar">
  <!-- Named container for targeted queries -->
</div>
```

Container type utilities: `.cq` (inline-size) · `.cq-size` (size) · `.cq-normal` (normal)

### Container-Responsive Grid

```html
<div class="cq">
  <div class="grid">
    <div class="c-col-12-xs c-col-6-md c-col-4-lg">
      Responds to container width
    </div>
  </div>
</div>
```

`.c-col-{1–12}-{breakpoint}` — column spans that respond to container width at each breakpoint.

Breakpoints: `xs` (320px) · `sm` (480px) · `md` (640px) · `lg` (768px) · `xl` (1024px)

### Container Breakpoint Mixin

```scss
@include container-bp(md) {
  .card { font-size: 1.125rem; }
}

// Named container
@include container-bp(lg, sidebar) {
  .nav { flex-direction: column; }
}
```

---

## Animations & Transitions

### Keyframe Animations

12 animations with CSS custom properties for duration and easing:

```html
<div class="animate-fade-in">Fades in</div>
<div class="animate-slide-up">Slides up</div>
<div class="animate-bounce">Bouncing</div>
<div class="animate-spin">Spinning</div>
```

**All animation classes:**

| Class | Effect |
|---|---|
| `animate-fade-in` | Fade in (opacity 0 → 1) |
| `animate-fade-out` | Fade out (opacity 1 → 0) |
| `animate-slide-up` | Slide up from below |
| `animate-slide-down` | Slide down from above |
| `animate-slide-left` | Slide in from right |
| `animate-slide-right` | Slide in from left |
| `animate-spin` | 360° rotation |
| `animate-ping` | Expanding ping effect |
| `animate-pulse` | Pulsing opacity |
| `animate-bounce` | Bouncing vertically |
| `animate-scale-in` | Scale from 0 → 1 |
| `animate-wiggle` | Side-to-side wiggle |
| `animate-none` | Remove animation |

### Animation Modifiers

**Delays:** `delay-75` · `delay-100` · `delay-200` · `delay-300` · `delay-500` · `delay-1000`

**Iteration:** `animate-once` · `animate-twice` · `animate-infinite`

**Fill mode:** `animate-fill-both` · `animate-fill-forwards`

```html
<div class="animate-slide-up delay-200 animate-fill-forwards">
  Slides up after 200ms delay, stays in final position
</div>
```

### Transition Utilities

```html
<button class="transition">All properties (default)</button>
<a class="transition-colors duration-fast">Fast color transition</a>
<div class="transition-transform ease-bounce">Bouncy transform</div>
```

| Class | Transitions |
|---|---|
| `transition` | All properties |
| `transition-none` | Disable transitions |
| `transition-colors` | Color & background-color |
| `transition-opacity` | Opacity |
| `transition-transform` | Transform |
| `transition-shadow` | Box-shadow |

**Duration:** `duration-fast` · `duration-slow`

**Easing:** `ease-in` · `ease-out` · `ease-bounce`

### CSS Custom Properties

Override animation/transition timing per element:

```css
.my-element {
  --duration: 500ms;
  --easing: cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Accessibility

All animations and transitions are automatically disabled when `prefers-reduced-motion: reduce` is active.

---

## Spacing Helpers

Margin and padding utility classes generated from 0 to 100 (px-based).

### Margin

| Pattern | Example | Description |
|---|---|---|
| `m-{n}` | `m-16` | All sides |
| `mt-{n}` | `mt-8` | Top |
| `mb-{n}` | `mb-8` | Bottom |
| `ml-{n}` | `ml-12` | Left |
| `mr-{n}` | `mr-12` | Right |
| `mx-{n}` | `mx-24` | Left + right |
| `my-{n}` | `my-16` | Top + bottom |
| `m-auto-{n}` | `m-auto-20` | Centered (auto L/R, n top/bottom) |

### Padding

| Pattern | Example | Description |
|---|---|---|
| `p-{n}` | `p-16` | All sides |
| `pt-{n}` | `pt-8` | Top |
| `pb-{n}` | `pb-8` | Bottom |
| `pl-{n}` | `pl-12` | Left |
| `pr-{n}` | `pr-12` | Right |
| `px-{n}` | `px-24` | Left + right |
| `py-{n}` | `py-16` | Top + bottom |

Scale: 0–100 in 1px increments.

---

## Font Size Helpers

Pixel-based font size classes from 1px to 100px.

```html
<p class="fs-14">14px text</p>
<h1 class="fs-32">32px heading</h1>
```

`.fs-1` through `.fs-100`

---

## Mixins

### Available Mixins

```scss
// Dark mode (dual strategy)
@include dark-mode {
  background: #1a1a1a;
}

// Transitions
@include transition(background-color, 150ms, ease-out);

// Box shadow (with optional spread and inset)
@include box-shadow(0, 4px, 16px, rgba(0,0,0,0.12));
@include box-shadow(0, 2px, 8px, rgba(0,0,0,0.1), 2px, true); // spread + inset

// Border radius
@include border-radius(8px);

// Border stroke (light | medium | heavy | none)
@include border-stroke(medium, #333);

// Clearfix
@include clearfix;

// Breakpoint media query
@include breakpoint(md) { ... }

// Container query breakpoint
@include container-bp(lg) { ... }

// Golden ratio
@include golden-columns($gap: 1rem);
@include golden-scale-type($step: 2, $leading: 1.4);

// Modifier class generator (from any Sass map)
@include modifiers($map, $attribute, $prefix, $separator, $base);
```

---

## Modifier Classes

Auto-generated from design token maps:

```html
<!-- Text colors -->
<p class="text-primary">Primary text</p>
<p class="text-danger">Danger text</p>

<!-- Background colors -->
<div class="bg-success">Success background</div>
<div class="bg-warning">Warning background</div>

<!-- Font sizes -->
<span class="font-size-small">Small</span>
<span class="font-size-x-large">Extra large</span>

<!-- Font weights -->
<strong class="font-weight-bold">Bold</strong>
<span class="font-weight-lighter">Lighter</span>
```

---

## Tailwind CSS Plugin

Extends Tailwind CSS v3 with scss-helper's design tokens and utilities.

```js
// tailwind.config.js
const scssHelper = require('scss-helper/plugin');

module.exports = {
  plugins: [
    scssHelper,
    // or with options:
    scssHelper({ injectTokens: true }),
  ],
};
```

### What gets added

| Layer | What |
|---|---|
| `addBase` | `:root` design tokens (colors, spacing, typography, transitions). Dark mode token overrides. |
| `addUtilities` | `.text-fluid-*`, `.cq`, `.cq-size`, `.transition-colors`, `.transition-shadow`, `.animate-*` |
| `addComponents` | `.sg-row`, `.sg-col` flexbox grid |
| `theme.extend` | `colors` (primary, secondary, success, info, warning, danger), `fontSize` (8 fluid sizes), `transitionDuration` (fast, slow) |

### Using tokens in Tailwind

```html
<!-- Colors reference CSS custom properties -->
<p class="text-primary">Uses --color-primary</p>

<!-- Fluid font sizes -->
<h1 class="text-fluid-xl">Fluid heading</h1>
```

---

## Build Outputs

| File | Description | Size |
|---|---|---|
| `dist/style.css` | Full build — all utilities | ~75 KB |
| `dist/only-css-grid.css` | CSS Grid system only | ~12 KB |
| `dist/tokens.css` | Design tokens only | ~2 KB |

### Package Exports

```js
// package.json exports
"scss-helper"             // → index.scss (full SCSS source)
"scss-helper/css"         // → dist/style.css
"scss-helper/css/grid"    // → dist/only-css-grid.css
"scss-helper/css/tokens"  // → dist/tokens.css
"scss-helper/plugin"      // → plugin.js (Tailwind plugin)
```

---

## Development

```bash
git clone https://github.com/pooyagolchian/scss-helper.git
cd scss-helper
pnpm install

pnpm build         # Build all CSS outputs
pnpm build:css     # Build full style.css
pnpm build:grid    # Build grid-only CSS
pnpm build:tokens  # Build tokens-only CSS
pnpm build:dev     # Build expanded (unminified) CSS
pnpm watch         # Watch mode for all outputs

# Documentation site
cd docs && pnpm install && pnpm dev   # → localhost:5173
```

---

## Changelog

### v4.0.0
- Comprehensive README rewrite with full API documentation
- Complete coverage of all utility classes, mixins, and functions
- Improved documentation structure with table of contents

### v3.0.0
- Design tokens (colors, spacing, typography) as CSS custom properties
- Fluid typography with `clamp()` scaling
- Container queries with container-responsive grid columns
- Dual-strategy dark mode (JS toggle + OS preference)
- Golden ratio system: layouts, typography, spacing, aspect ratios
- 12 keyframe animations + transition utilities
- Accessibility: `prefers-reduced-motion` guard
- Tailwind CSS v3 plugin
- Pre-built CSS: `style.css`, `only-css-grid.css`, `tokens.css`
- Full interactive docs at [pooya.blog/scss-helper](https://pooya.blog/scss-helper/)

### v2.x
- Flexbox grid, margin/padding helpers, font-size generator, mixins

---

## License

MIT © [Pooya Golchian](https://github.com/pooyagolchian)
