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
- [Grid System](#grid-system)
    - [Grid Container](#grid-container)
    - [Grid Column](#grid-column)
    - [Dynamic Columns](#dynamic-columns)
    - [Responsive Design](#responsive-design)
    - [SCSS Configuration](#scss-configuration)
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
- Visual design utilities
- Color helpers
- CSS grid support
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

## Grid System

The Flex Grid system mimics the behavior of Bootstrap's grid using Flexbox. It is based on a 24-column layout and dynamically generates column classes.

### Grid Container
The `.sg-row` class creates a flex container for grid columns.

```scss
.sg-row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}
```

### Grid Column
The `.sg-col` class adds padding and makes the columns flexible.

```scss
.sg-col {
  padding-right: 15px;
  padding-left: 15px;
  flex-grow: 1;
}
```

### Dynamic Columns
Classes from `.sg-col-1` to `.sg-col-24` control the width of each column based on a 24-column layout.

```scss
@for $i from 1 through 24 {
  .sg-col-#{$i} {
    width: math.div(100%, 24) * $i;
    flex: 0 0 math.div(100%, 24) * $i;
    max-width: math.div(100%, 24) * $i;
  }
}
```

### Responsive Design
On screens smaller than 768px, columns stack vertically.

```scss
@media (max-width: 768px) {
  .sg-col {
    flex-basis: 100%;
    max-width: 100%;
  }
}
```

### SCSS Configuration
To avoid deprecation warnings in Dart Sass, use `math.div()` for divisions.

```scss
@use 'sass:math';
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

Example:
```scss
@include generate-font-sizes(1, 100);
```

---

## Margin Helper

### Helper Function
```scss
@function generate-margin-size($size) {
  @return $size + px;
}
```

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

Example:
```scss
@include generate-margin(mt, 0, 100); // Generates margin-top classes
```

---

## Box Shadow Mixin

```scss
@mixin box-shadow($x, $y, $blur, $color, $spread: 0, $inset: false) {
  $shadow-type: if($inset == true, inset, null);
  box-shadow: $shadow-type $x $y $blur $spread $color;
}
```

---

## Clearfix Mixin

```scss
@mixin clearfix {
  &::after {
    content: "";
    display: table;
    clear: both;
  }
}
```

---

## Modifiers Mixin

Generate utility classes based on a map of values.

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

```scss
@mixin border-radius($radius) {
  border-radius: $radius;
}
```

---

## Padding Mixin

Generate padding classes for each side.

```scss
@mixin generate-padding($side) {
  @for $i from 0 through 100 {
    .#{$side}-#{$i} {
      padding-#{$side}: $i + px;
    }
  }
}
```

Example:
```scss
@include generate-padding('t'); // Generates padding-top classes
```
