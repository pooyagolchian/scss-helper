# SCSS Helper Documentation

## Table of Contents
- [Introduction](#introduction)
- [Installation](#installation)
    - [Install from NPM](#install-package-on-npm-repo)
    - [Install from GitHub](#install-github-repo)
- [Compile and Watch](#compile-and-watch)
    - [Compile Production](#compile-production)
    - [Compile Development](#compile-development)
    - [Watch for Changes](#watch)
- [Flexbox Grid System](#flexbox-grid-system)
    - [Grid Container](#grid-container)
    - [Grid Column](#grid-column)
    - [Dynamic Columns](#dynamic-columns)
    - [Responsive Design](#responsive-design)
- [CSS Grid System](#css-grid-system)
    - [Basic Grid Layout](#basic-grid-layout)
    - [Auto-Sized Grid Layout](#auto-sized-grid-layout)
    - [Fixed Number of Columns](#fixed-number-of-columns)
    - [Grid Gaps](#grid-gaps)
    - [Responsive Design](#responsive-grid-design)
- [Font Size Generator](#font-size-generator)
- [Margin Helper](#margin-helper)
- [Box Shadow Mixin](#box-shadow-mixin)
- [Clearfix Mixin](#clearfix-mixin)
- [Modifiers Mixin](#modifiers-mixin)
- [Border Radius Mixin](#border-radius-mixin)
- [Padding Mixin](#padding-mixin)

---

## Introduction

A package for SCSS projects designed to generate useful styles with minimal effort.

### Features
- Font size generator
- Simple grid (Flexbox grid similar to Bootstrap)
- CSS grid support
- Visual design utilities
- Color helpers
- Semantic color naming
- Reusable mixins and functionalities
- Lightweight (32.8 KiB compiled CSS)

---

## Installation

### Install Package on NPM Repo
```bash
npm install scss-helper --save-dev
```
or
```bash
yarn add scss-helper --save-dev
```

### Install GitHub Repo
```bash
npm install
```

---

## Compile and Watch

We use `sass` to compile and watch SCSS files.

### Compile Production
```bash
npm run build:prod
```

### Compile Development
```bash
npm run build:dev
```

### Watch for Changes
```bash
npm run watch
```

---

## Flexbox Grid System

The Flexbox Grid system mimics the behavior of Bootstrap's grid using Flexbox. It is based on a 24-column layout and dynamically generates column classes.

### Grid Container
The `.sg-row` class creates a flex container for grid columns.

#### SCSS
```scss
.sg-row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}
```

#### HTML Example
```html
<div class="sg-row">
  <div class="sg-col-6">Column 6</div>
  <div class="sg-col-6">Column 6</div>
</div>
```

### Grid Column
The `.sg-col` class adds padding and makes the columns flexible.

#### SCSS
```scss
.sg-col {
  padding-right: 15px;
  padding-left: 15px;
  flex-grow: 1;
}
```

#### HTML Example
```html
<div class="sg-row">
  <div class="sg-col">Flexible Column</div>
  <div class="sg-col">Flexible Column</div>
</div>
```

### Dynamic Columns
Classes from `.sg-col-1` to `.sg-col-24` control the width of each column based on a 24-column layout.

#### SCSS
```scss
@for $i from 1 through 24 {
  .sg-col-#{$i} {
    width: math.div(100%, 24) * $i;
    flex: 0 0 math.div(100%, 24) * $i;
    max-width: math.div(100%, 24) * $i;
  }
}
```

#### HTML Example
```html
<div class="sg-row">
  <div class="sg-col-12">Half Width (12/24)</div>
  <div class="sg-col-6">Quarter Width (6/24)</div>
  <div class="sg-col-6">Quarter Width (6/24)</div>
</div>
```

### Responsive Design
On screens smaller than 768px, columns stack vertically.

#### SCSS
```scss
@media (max-width: 768px) {
  .sg-col {
    flex-basis: 100%;
    max-width: 100%;
  }
}
```

#### HTML Example
```html
<div class="sg-row">
  <div class="sg-col-12">Full Width on Mobile</div>
  <div class="sg-col-6">Full Width on Mobile</div>
</div>
```

---

## CSS Grid System

The CSS Grid system provides a flexible and powerful way to design grid layouts using the `grid-template-columns` property and other CSS Grid features.

### Basic Grid Layout

#### SCSS
```scss
.grid {
  --grid-cols: 12;
  display: grid;
  grid-template-columns: repeat(var(--grid-cols), 1fr);
  gap: 15px;
}
```

#### HTML Example
```html
<div class="grid">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Auto-Sized Grid Layout

Auto-fit grid layout adjusts columns based on available space.

#### SCSS
```scss
.grid-auto {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 10px;
}
```

#### HTML Example
```html
<div class="grid-auto">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

---

### 1. **Basic Grid Structure**

#### Grid Container
The `.grid` class defines a basic grid layout with customizable column count and gap between grid items.

```scss
.grid,
[class*="grid-auto-"] {
  display: grid;
  grid-gap: var(--grid-gap, 0); // Sets the gap between grid items
}
```

**Example:**
```html
<div class="grid">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

---

### 2. **Column Count Customization**

The `grid-template-columns` property dynamically calculates the number of columns based on a custom property `--grid-cols`, which can be set globally or locally.

```scss
.grid {
  --grid-cols: 4; // Sets default column count
  grid-template-columns: repeat(var(--grid-cols), 1fr); // Creates equal-width columns

  > * {
    grid-column: span var(--span, 4) / span var(--span, 4);
  }
}
```

**Example:**
```html
<div class="grid">
  <div style="--span: 2">Item 1</div> <!-- Spans 2 columns -->
  <div>Item 2</div> <!-- Default spans all columns -->
</div>
```

---

### 3. **Auto-Sized Grids**

The `.grid-auto-*` classes automatically create columns that resize to fit available space, with a minimum column width defined by custom properties like `--col-min-width`.

```scss
.grid-auto-xs,
.grid-auto-sm,
.grid-auto-md,
.grid-auto-lg,
.grid-auto-xl {
  grid-template-columns: repeat(auto-fit, minmax(var(--col-min-width), 1fr));
}
```

**Column Size Examples:**
```scss
.grid-auto-xs {
  --col-min-width: 8rem;
}
.grid-auto-sm {
  --col-min-width: 10rem;
}
.grid-auto-md {
  --col-min-width: 15rem;
}
```

**Example:**
```html
<div class="grid-auto-xs">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

---

### 4. **Grid Gaps (Spacing Between Items)**

The `grid-gap` property can be customized using predefined classes like `.grid-gap-xs` for various spacing needs.

```scss
.grid-gap-xxxxs {
  --grid-gap: var(--space-xxxxs, 0.125rem);
}
.grid-gap-md {
  --grid-gap: var(--space-md, 1.25rem);
}
```

**Example:**
```html
<div class="grid grid-gap-md">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

---

### 5. **Column Spans and Starts**

Custom properties `--span`, `--col-start`, and `--col-end` are used to control how many columns an item spans or where a column starts and ends.

```scss
@for $i from 1 through $grid-columns {
  .col-#{$i} {
    --span: #{$i}; // Sets the span for the column
  }

  .col-start-#{$i} {
    grid-column-start: #{$i}; // Starts the column at index i
  }

  .col-end-#{$i + 1} {
    grid-column-end: #{$i + 1}; // Ends the column at index i+1
  }
}
```

**Example:**
```html
<div class="grid">
  <div class="col-2">Item 1</div> <!-- Spans 2 columns -->
  <div class="col-start-3 col-end-4">Item 2</div> <!-- Starts at column 3, ends at 4 -->
</div>
```

---

### 6. **Responsive Breakpoints**

Using the `@mixin breakpoint`, grid layouts and custom column widths can be adapted for various screen sizes.

```scss
@mixin breakpoint($breakpoint) {
  @media (min-width: map-get($breakpoints, $key: $breakpoint)) {
    @content;
  }
}
```

#### Example of Responsive Grid:
```scss
@include breakpoint(xs) {
  .grid-auto-xs-xsmall {
    --col-min-width: 8rem;
  }
}

@include breakpoint(sm) {
  .grid-auto-sm-small {
    --col-min-width: 10rem;
  }
}
```

---

### 7. **Responsive Auto-Sized Columns**

Each grid size has specific configurations for minimum column width, ensuring responsive design across devices.

```scss
@include breakpoint(md) {
  .grid-auto-md-medium {
    --col-min-width: 15rem;
  }
}

@include breakpoint(lg) {
  .grid-auto-lg-large {
    --col-min-width: 20rem;
  }
}
```

---

### 8. **Complete Example**

Here’s a full HTML example using these concepts:

```html
<div class="grid grid-auto-md grid-gap-lg">
  <div class="col-2">Item 1</div>
  <div class="col-3">Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</div>
```

### Explanation:
- `.grid-auto-md`: Automatically sizes columns for medium devices.
- `.grid-gap-lg`: Adds large spacing between grid items.
- `.col-2`: First item spans 2 columns.
- `.col-3`: Second item spans 3 columns.

---












### Fixed Number of Columns

Use `.col-#` classes to control the number of columns an item spans.

#### SCSS
```scss
@for $i from 1 through 12 {
  .col-#{$i} {
    grid-column: span $i;
  }
}
```

#### HTML Example
```html
<div class="grid">
  <div class="col-6">Spans 6 Columns</div>
  <div class="col-12">Spans 12 Columns</div>
</div>
```

### Grid Gaps

Define custom grid gaps using predefined classes.

#### SCSS
```scss
.grid-gap-md {
  gap: 1.25rem;
}
```

#### HTML Example
```html
<div class="grid grid-gap-md">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

### Responsive Grid Design

Adjust the grid based on breakpoints for responsive layouts.

#### SCSS
```scss
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
```

#### HTML Example
```html
<div class="grid">
  <div class="col-6">Item 1</div>
  <div class="col-6">Item 2</div>
</div>
```

---

## Font Size Generator

Create font size classes dynamically with a helper function and mixin.

### Helper Function
```scss
@function generate-font-size($size) {
  @return $size + px;
}
```

### Mixin
```scss
@mixin generate-font-sizes($min-size, $max-size) {
  @for $i from $min-size through $max-size {
    .fs-#{$i} {
      font-size: generate-font-size($i);
    }
  }
}
```

#### Example
```scss
@include generate-font-sizes(1, 100);
```

#### HTML Example
```html
<p class="fs-12">This text is 12px in size.</p>
<p class="fs-24">This text is 24px in size.</p>
```

---

## Margin Helper

Generate dynamic margin classes for top, bottom, left, and right.

### Mixin
```scss
@mixin generate-margin($property, $min-size, $max-size) {
  @for $i from $min-size through $max-size {
    .#{$property}-#{$i} {
      #{$property}: generate-margin-size($i);
    }
  }
}
```

#### Example
```scss
@include generate-margin(mt, 0, 100); // Generates margin-top classes
```

#### HTML Example
```html
<div class="mt-10 mb-20">This element has 10px top margin and 20px bottom margin.</div>
```

---

## Box Shadow Mixin

### Mixin Definition
```scss
@mixin box-shadow($x, $y, $blur, $color, $spread: 0, $inset: false) {
  $shadow-type: if($inset == true, inset, null);
  box-shadow: $shadow-type $x $y $blur $spread $color;
}
```

#### Example Usage
```scss
@include box-shadow(5px, 5px, 10px, rgba(0,

 0, 0, 0.4));
```

---

## Clearfix Mixin

### Mixin Definition
```scss
@mixin clearfix {
  &::after {
    content: "";
    display: table;
    clear: both;
  }
}
```

#### HTML Example
```html
<div class="clearfix">
  <div class="child">Floated Element</div>
</div>
```

---

## Modifiers Mixin

### Mixin Definition
```scss
@mixin modifiers($map, $attribute, $prefix: "-", $separator: "-", $base: "base") {
  @each $key, $value in $map {
    &#{if($key != $base, $prefix + $key, "")} {
      #{$attribute}: $value;
    }
  }
}
```

---

## Border Radius Mixin

### Mixin Definition
```scss
@mixin border-radius($radius) {
  border-radius: $radius;
}
```

---

## Padding Mixin

### Mixin Definition
```scss
@mixin generate-padding($side) {
  @for $i from 0 through 100 {
    .#{$side}-#{$i} {
      padding-#{$side}: $i + px;
    }
  }
}
```

#### Example Usage
```scss
@include generate-padding('t'); // Generates padding-top classes
```

#### HTML Example
```html
<div class="pt-10">This element has 10px padding at the top.</div>
```
