## Helper for scss project

Package for scss project to generate useful style without tears!

- Font size
- Simple grid (Flexbox gird like `Bootstrap`))
- Visual design
- Color helper
- Css grid
- 32.8 KiB size of compiled css
- Semantic color naming
- Reusable mixin and functionality

## Compile and watch

I'm using node-sass to compile and watch scss files.

#### Compile production:

`npm run build:prod`

#### Compile development:

`npm run build:dev`

#### Watch:

`npm run watch`

#### Install package on npm repo:

This repo release on npm package.

`npm install scss-helper --save-dev`

`yarn add scss-helper --save-dev`

#### Install Github repo

`npm install`


### **Flex Grid System Documentation**

This flex grid system is designed to replicate the behavior of Bootstrap's grid system using Flexbox. It dynamically generates column classes based on a 24-column layout.

#### **Key Features:**
- Flexible grid layout using `display: flex`.
- Responsive by default (columns stack on smaller screens).
- Auto-generated column classes (`sg-col-X`) for custom width.
- Spacing between columns with padding.
- Uses Dart Sass `math.div()` to avoid deprecated division warnings.

---

### **1. Grid Container (`.sg-row`)**

The `.sg-row` class is used to create a flex container for your columns.

```scss
.sg-row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}
```

#### Properties:
- `display: flex`: Enables flexbox layout.
- `flex-wrap: wrap`: Allows the columns to wrap to a new line if the total width exceeds 100%.
- `margin-right` & `margin-left`: Adds spacing around the grid to prevent the content from touching the edges.

#### **Usage Example:**

```html
<div class="sg-row">
  <div class="sg-col-6">Column 6</div>
  <div class="sg-col-6">Column 6</div>
</div>
```

---

### **2. Grid Column (`.sg-col`)**

The `.sg-col` class applies basic padding between grid columns.

```scss
.sg-col {
  padding-right: 15px;
  padding-left: 15px;
  flex-grow: 1;
}
```

#### Properties:
- `padding-right` & `padding-left`: Adds spacing between columns.
- `flex-grow: 1`: Allows the column to grow to fill any remaining space, maintaining flexibility.

#### **Usage Example:**

```html
<div class="sg-row">
  <div class="sg-col">Flexible Column</div>
  <div class="sg-col">Flexible Column</div>
</div>
```

---

### **3. Dynamic Columns (`.sg-col-X`)**

Dynamic column classes from `sg-col-1` to `sg-col-24` are generated to give precise control over column widths. These classes calculate the width of each column based on a 24-column layout.

```scss
@for $i from 1 through 24 {
  .sg-col-#{$i} {
    width: math.div(100%, 24) * $i;
    flex: 0 0 math.div(100%, 24) * $i;
    max-width: math.div(100%, 24) * $i;
  }
}
```

#### Properties:
- `width`: Specifies the width of the column as a percentage of the total row width.
- `flex`: Controls how the column should shrink, grow, and set its initial size.
- `max-width`: Limits the maximum width of the column.

#### **Usage Example:**

```html
<div class="sg-row">
  <div class="sg-col-12">Half Width (12/24)</div>
  <div class="sg-col-6">Quarter Width (6/24)</div>
  <div class="sg-col-6">Quarter Width (6/24)</div>
</div>
```

---

### **4. Responsive Design**

The grid is responsive by default. On screens smaller than 768px, all columns stack vertically (i.e., they take up 100% width). You can modify or extend this behavior as needed.

```scss
@media (max-width: 768px) {
  .sg-col {
    flex-basis: 100%;
    max-width: 100%;
  }
}
```

#### Properties:
- `flex-basis: 100%`: Forces the column to take up 100% of the available width on smaller screens.
- `max-width: 100%`: Ensures that the column doesn't exceed 100% width on small screens.

#### **Usage Example:**

```html
<div class="sg-row">
  <div class="sg-col-12">Full Width on Mobile</div>
  <div class="sg-col-6">Full Width on Mobile</div>
</div>
```

---

### **5. SCSS Configuration**

#### Importing `sass:math`

To ensure compatibility with Dart Sass and prevent deprecation warnings, we import the `sass:math` module and replace the traditional `/` division operator with `math.div()`:

```scss
@use 'sass:math';

@for $i from 1 through 24 {
  .sg-col-#{$i} {
    width: math.div(100%, 24) * $i;
    flex: 0 0 math.div(100%, 24) * $i;
    max-width: math.div(100%, 24) * $i;
  }
}
```

#### **Why `math.div()`?**
- Sass has deprecated the `/` operator for division in most cases. It’s now recommended to use `math.div()` for better clarity and to avoid potential issues in future versions of Dart Sass.
- You can find more information in the [official Sass documentation](https://sass-lang.com/documentation/modules/math#div).

---

### **Summary**

- **Container**: Use `.sg-row` to create a flex container for your grid.
- **Columns**: Use `.sg-col` for flexible columns and `.sg-col-X` (X from 1 to 24) for fixed-width columns.
- **Responsive**: Columns stack on smaller screens (768px and below).
- **Compatibility**: Uses Dart Sass with `math.div()` to ensure compatibility and avoid deprecated behavior.

---



###  Documentation for the Flex Grid System

This SCSS code creates a highly customizable grid system using CSS Grid, offering both a predefined column grid and an auto-fit grid system with responsive capabilities. The system supports custom grid gaps, flexible column spans, and responsive breakpoints, all based on a configurable number of grid columns (`$grid-columns`).

---

### **1. Basic Grid Layout**

#### **`.grid` Class**
The `.grid` class defines a grid container with a specified number of columns using CSS Grid.

```scss
.grid {
  --grid-cols: #{$grid-columns};
  grid-template-columns: repeat(var(--grid-cols), 1fr);

  > * {
    grid-column: span var(--span, #{$grid-columns}) / span var(--span, #{$grid-columns});
  }
}
```

- **`grid-template-columns`:** Defines a fixed number of columns based on the `--grid-cols` variable.
- **Child elements (`> *`)**: Span across the grid based on the `--span` variable, which defaults to the total number of columns.

#### **Usage Example**:

```html
<div class="grid">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

---

### **2. Auto-Sized Grid Layout**

The `.grid-auto-*` classes automatically define columns based on the available space. These layouts use `auto-fit` with `minmax()` to create responsive columns that fit within the container.

#### **Responsive Auto-Sized Grids**

```scss
.grid-auto-xs,
.grid-auto-sm,
.grid-auto-md,
.grid-auto-lg,
.grid-auto-xl {
  grid-template-columns: repeat(auto-fit, minmax(var(--col-min-width), 1fr));
}
```

- **`grid-template-columns`:** Defines columns that automatically fit within the available space, with each column having a minimum width of `var(--col-min-width)` and growing to fill the remaining space (using `1fr`).

#### **Column Min Widths** (based on breakpoints):

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

.grid-auto-lg {
  --col-min-width: 20rem;
}

.grid-auto-xl {
  --col-min-width: 25rem;
}
```

These classes control the minimum width of the grid columns, which changes based on the screen size.

---

### **3. Fixed Number of Columns**

The `.col-#` classes allow precise control over how many columns an element spans. This allows for creating fixed-width column layouts, much like traditional grid systems such as Bootstrap.

#### **Generating Column Classes**:

```scss
@for $i from 1 through $grid-columns {
  .col-#{$i} {
    --span: #{$i};
  }

  .col-start-#{$i} {
    grid-column-start: #{$i};
  }

  .col-end-#{$i + 1} {
    grid-column-end: #{$i + 1};
  }
}
```

- **`.col-X`**: Specifies how many columns the element should span.
- **`.col-start-X`**: Defines the starting column for the element.
- **`.col-end-X`**: Defines the ending column for the element.

#### **Usage Example**:

```html
<div class="grid">
  <div class="col-6">Spans 6 columns</div>
  <div class="col-12">Spans 12 columns</div>
</div>
```

---

### **4. Grid Gaps**

The grid supports different gap sizes between columns through predefined classes, which set the `grid-gap` variable. This allows you to quickly adjust the spacing between grid items.

#### **Grid Gap Classes**:

```scss
.grid-gap-xxxxs {
  --grid-gap: var(--space-xxxxs, 0.125rem);
}

.grid-gap-xxxs {
  --grid-gap: var(--space-xxxs, 0.25rem);
}

.grid-gap-xxs {
  --grid-gap: var(--space-xxs, 0.375rem);
}

.grid-gap-xs {
  --grid-gap: var(--space-xs, 0.5rem);
}

.grid-gap-sm {
  --grid-gap: var(--space-sm, 0.75rem);
}

.grid-gap-md {
  --grid-gap: var(--space-md, 1.25rem);
}

.grid-gap-lg {
  --grid-gap: var(--space-lg, 2rem);
}

.grid-gap-xl {
  --grid-gap: var(--space-xl, 3.25rem);
}
```

Each class sets a different grid gap, allowing for fine-grained control over the spacing between columns.

#### **Usage Example**:

```html
<div class="grid grid-gap-md">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

This will apply a medium-sized gap between the grid items.

---

### **5. Responsive Behavior**

The grid system includes responsive utilities based on predefined breakpoints (`xs`, `sm`, `md`, `lg`, `xl`). For each breakpoint, columns and auto-sizing behaviors can be customized using media queries.

#### **Responsive Grid Classes**:

```scss
@include breakpoint(xs) {
  .grid-auto-xs-xsmall {
    --col-min-width: 8rem;
  }
  // Similar definitions for sm, md, lg, xl breakpoints
}
```

- The code uses media queries and mixins to adapt the grid layout at different screen sizes.
- Custom column spans and grid behavior can be defined at different breakpoints.

#### **Usage Example**:

```html
<div class="grid grid-auto-sm grid-auto-md grid-gap-sm">
  <div class="col-6-md">Spans 6 columns on medium screens</div>
  <div class="col-12-sm">Spans 12 columns on small screens</div>
</div>
```

---

### **6. Column Start/End Utilities**

The `.col-start` and `.col-end` classes allow you to control where a column starts and ends. These can be especially useful for creating more complex grid layouts.

#### **Classes**:

```scss
.col-start {
  grid-column-start: 1;
}

.col-end {
  grid-column-end: -1;
}
```

- **`.col-start`**: Defines the first column an element starts in.
- **`.col-end`**: Defines the last column an element occupies.

#### **Usage Example**:

```html
<div class="grid">
  <div class="col-start-2 col-end-4">Spans from column 2 to 4</div>
</div>
```

---

### **7. Auto Column Start/End**

To automatically place elements in the grid without manually specifying start/end positions, you can use the `.col-start-auto` and `.col-end-auto` classes.

```scss
.col-start-auto {
  grid-column-start: auto;
}

.col-end-auto {
  grid-column-end: auto;
}
```

These classes allow the browser to automatically position grid items based on the available space.

---

### **Conclusion**

This grid system provides a flexible and powerful way to build responsive layouts. By leveraging CSS Grid and Sass, it allows for:
- **Fixed-width columns** (`col-*` classes).
- **Auto-fit columns** based on available space (`grid-auto-*` classes).
- **Responsive behavior** at multiple breakpoints.
- **Customizable grid gaps** with predefined classes.

This system is a robust alternative to frameworks like Bootstrap, while providing a greater level of flexibility and control over the layout.

---




### Documentation for Font Size Generator Mixin and Helper Function

This documentation explains how to use the mixin and helper function designed to generate dynamic font size classes in your SCSS. These utilities allow for easy creation of font size classes over a customizable range, providing a flexible and maintainable approach to styling.

---

### **1. Helper Function: `generate-font-size`**

The `generate-font-size` function is designed to create font size values in SCSS. By default, it appends `px` to the numeric size value, but you can modify it to handle other units such as `rem`, `em`, or `%`.

#### **Syntax**:
```scss
@function generate-font-size($size) {
  @return $size + px;
}
```

#### **Parameters**:
- **`$size`**: The numeric font size value that you want to convert into a CSS unit (e.g., `px`).

#### **Returns**:
- A string representing the font size value with the unit `px`.

#### **Example Usage**:
```scss
font-size: generate-font-size(16); // Outputs: 16px
```

---

### **2. Mixin: `generate-font-sizes`**

The `generate-font-sizes` mixin is responsible for creating a series of CSS classes, where each class corresponds to a specific font size. The class naming convention follows the format `.fs-[size]`, where `[size]` is the font size in pixels.

#### **Syntax**:
```scss
@mixin generate-font-sizes($min-size, $max-size) {
  @for $i from $min-size through $max-size {
    .fs-#{$i} {
      font-size: generate-font-size($i);
    }
  }
}
```

#### **Parameters**:
- **`$min-size`**: The minimum font size (integer value) to generate the classes for.
- **`$max-size`**: The maximum font size (integer value) to generate the classes for.

#### **Example Usage**:
```scss
@include generate-font-sizes(1, 100);
```
This will generate CSS classes `.fs-1` to `.fs-100`, each with the corresponding font sizes from `1px` to `100px`.

#### **Output Example**:
When you include the mixin, it generates the following CSS classes:

```css
.fs-1 {
  font-size: 1px;
}

.fs-2 {
  font-size: 2px;
}

/* ... */

.fs-100 {
  font-size: 100px;
}
```

---

### **3. How to Use the Mixin and Function**

#### **Step-by-Step Instructions**:

1. **Include the Helper Function**: Define the `generate-font-size` function in your SCSS to create the desired font sizes.
2. **Define the Mixin**: Use the `generate-font-sizes` mixin to create a range of font size classes, specifying the minimum and maximum font sizes as arguments.
3. **Apply Classes in HTML**: After generating the CSS, you can apply the generated classes in your HTML.

#### **Example SCSS Code**:
```scss
@function generate-font-size($size) {
  @return $size + px;
}

@mixin generate-font-sizes($min-size, $max-size) {
  @for $i from $min-size through $max-size {
    .fs-#{$i} {
      font-size: generate-font-size($i);
    }
  }
}

// Generate font size classes from 1px to 100px
@include generate-font-sizes(1, 100);
```

#### **Example HTML**:
```html
<p class="fs-12">This text is 12px in size.</p>
<p class="fs-24">This text is 24px in size.</p>
<p class="fs-48">This text is 48px in size.</p>
```

---

### **4. Customization Options**

#### **Change Units**:
If you prefer using units other than `px` (e.g., `rem`, `em`), simply modify the `generate-font-size` function:

```scss
@function generate-font-size($size) {
  @return $size + rem;
}
```

This will generate font sizes in `rem` instead of `px`.

#### **Generate Different Ranges**:
You can easily change the range of generated font size classes by passing different values to the mixin:

```scss
// Generate font size classes from 10px to 50px
@include generate-font-sizes(10, 50);
```

---

### **5. Advantages**

1. **Scalability**: The mixin can generate as many font size classes as needed, just by changing the range.
2. **Custom Units**: Easily switch between `px`, `rem`, `em`, or other units by modifying the helper function.
3. **Maintainability**: Instead of hardcoding individual font size classes, this approach keeps your code DRY and easy to maintain.
4. **Flexibility**: You can customize the range of font sizes and units based on project requirements.

---

### **6. Example Full Code Implementation**

```scss
// Helper function to calculate font size
@function generate-font-size($size) {
  @return $size + px; // Modify this to use different units like rem or em
}

// Mixin to generate dynamic font size classes
@mixin generate-font-sizes($min-size, $max-size) {
  @for $i from $min-size through $max-size {
    .fs-#{$i} {
      font-size: generate-font-size($i);
    }
  }
}

// Generate font size classes from 1px to 100px
@include generate-font-sizes(1, 100);
```

### **7. Conclusion**

This SCSS utility provides a clean, flexible, and scalable way to manage font size classes in your project. By utilizing a mixin and a helper function, you can quickly generate a wide range of font sizes, ensuring maintainable and efficient CSS. You can also easily adjust the units or size ranges to fit any design system.




---



### Documentation for Margin Helper Mixin and Function

This documentation explains how to use the mixins and helper function designed to generate dynamic margin classes in your SCSS. These utilities allow for the creation of margin classes with customizable ranges and support for auto-centering. This approach is both flexible and maintainable, ideal for scalable projects.

---

### **1. Helper Function: `generate-margin-size`**

The `generate-margin-size` function is responsible for calculating and formatting margin values. It appends a unit (`px` by default) to a numeric value but can be easily modified to handle other units like `rem`, `em`, etc.

#### **Syntax**:
```scss
@function generate-margin-size($size) {
  @return $size + px;
}
```

#### **Parameters**:
- **`$size`**: The numeric value representing the margin size (e.g., `10`, `20`, etc.).

#### **Returns**:
- A string that represents the margin size, including the `px` unit (e.g., `10px`, `20px`).

#### **Example Usage**:
```scss
margin-top: generate-margin-size(10); // Outputs: margin-top: 10px;
```

---

### **2. Mixin: `generate-margin`**

The `generate-margin` mixin dynamically generates margin classes for a specified range of values. This allows you to create classes like `.mt-1`, `.mb-10`, etc., for margin-top, margin-bottom, margin-left, and margin-right.

#### **Syntax**:
```scss
@mixin generate-margin($property, $min-size, $max-size) {
  @for $i from $min-size through $max-size {
    .#{$property}-#{$i} {
      #{$property}: generate-margin-size($i);
    }
  }
}
```

#### **Parameters**:
- **`$property`**: The margin property (e.g., `mt`, `mb`, `ml`, `mr`) for which the margin classes are being generated.
- **`$min-size`**: The minimum value in the range of margin sizes.
- **`$max-size`**: The maximum value in the range of margin sizes.

#### **Returns**:
- Dynamically generates classes with the format `.mt-X`, `.mb-X`, etc., where `X` is the margin size in `px`.

#### **Example Usage**:
```scss
@include generate-margin(mt, 0, 100); // Generates classes .mt-0 to .mt-100 with margin-top values from 0px to 100px
@include generate-margin(mb, 0, 50); // Generates classes .mb-0 to .mb-50 with margin-bottom values from 0px to 50px
```

---

### **3. Mixin: `generate-margin-auto`**

The `generate-margin-auto` mixin generates margin classes that center elements horizontally with `margin: auto`, while allowing control over the top and bottom margins.

#### **Syntax**:
```scss
@mixin generate-margin-auto($min-size, $max-size) {
  @for $i from $min-size through $max-size {
    .m-auto-#{$i} {
      margin: generate-margin-size($i) auto;
    }
  }
}
```

#### **Parameters**:
- **`$min-size`**: The minimum top/bottom margin size (in pixels).
- **`$max-size`**: The maximum top/bottom margin size (in pixels).

#### **Returns**:
- Dynamically generates classes that set a top/bottom margin while centering the element horizontally with `auto`.

#### **Example Usage**:
```scss
@include generate-margin-auto(0, 100); // Generates classes .m-auto-0 to .m-auto-100 with horizontal auto centering and top/bottom margins from 0px to 100px
```

---

### **4. Usage Examples in HTML**

You can use the generated classes in your HTML to apply margin to elements:

#### **Example 1: Margins for Each Side**
```html
<div class="mt-10 mb-20 ml-5 mr-15">
  This element has 10px margin-top, 20px margin-bottom, 5px margin-left, and 15px margin-right.
</div>
```

#### **Example 2: Auto-Centered Margin**
```html
<div class="m-auto-30">
  This element has 30px margin-top/bottom and auto left/right (centered horizontally).
</div>
```

---

### **5. Customization Options**

#### **Change Units**:
You can easily modify the `generate-margin-size` function to use units other than `px`. For example, to use `rem` instead of `px`:

```scss
@function generate-margin-size($size) {
  @return $size + rem; // Change 'px' to 'rem' or any other unit
}
```

#### **Adjust the Range**:
If you want to limit or extend the range of margin sizes, adjust the parameters passed to the mixins. For example, to generate margin classes from `0px` to `50px`:

```scss
@include generate-margin(mt, 0, 50); // Generate margin-top classes from 0px to 50px
@include generate-margin-auto(0, 50); // Generate auto-margin classes from 0px to 50px
```

---

### **6. Example Full Code Implementation**

Below is the full implementation using both the helper function and the mixins:

```scss
// Helper function to calculate margin size
@function generate-margin-size($size) {
  @return $size + px; // Modify this to use different units like rem or em
}

// Mixin to generate dynamic margin classes
@mixin generate-margin($property, $min-size, $max-size) {
  @for $i from $min-size through $max-size {
    .#{$property}-#{$i} {
      #{$property}: generate-margin-size($i);
    }
  }
}

// Mixin to generate auto-margin classes (horizontal centering)
@mixin generate-margin-auto($min-size, $max-size) {
  @for $i from $min-size through $max-size {
    .m-auto-#{$i} {
      margin: generate-margin-size($i) auto;
    }
  }
}

// Generate margin classes for top, bottom, left, right
@include generate-margin(mt, 0, 100); // margin-top from 0px to 100px
@include generate-margin(mb, 0, 100); // margin-bottom from 0px to 100px
@include generate-margin(ml, 0, 100); // margin-left from 0px to 100px
@include generate-margin(mr, 0, 100); // margin-right from 0px to 100px

// Generate margin classes for auto margins (horizontal centering)
@include generate-margin-auto(0, 100);
```

---

### **7. Advantages**

- **Maintainability**: The code is structured to avoid repetition and promote reusability. If you need to update the margin logic, you only need to modify the helper function or the mixins.
- **Scalability**: Easily generate a wide range of margin classes by adjusting the minimum and maximum values.
- **Flexibility**: You can customize the units (e.g., `px`, `rem`, etc.) or even add more margin properties (like `margin-inline`, `margin-block`, etc.) without rewriting much code.
- **Auto-Margins**: Support for horizontal centering (`auto`) combined with custom top/bottom margins.

---

### **8. Example Output**

Here’s an example of the generated CSS classes:

```css
.mt-0 {
  margin-top: 0px;
}

.mt-10 {
  margin-top: 10px;
}

.mb-20 {
  margin-bottom: 20px;
}

.m-auto-30 {
  margin: 30px auto;
}

/* Similar classes for ml-#, mr-#, etc. */
```

---

### **Conclusion**

This utility provides a simple, scalable way to generate margin classes with minimal redundancy. Using helper functions and mixins ensures that your SCSS remains DRY and easy to maintain, while offering flexibility in customizing the range of margin values and units.

---


### Documentation for the `box-shadow` Mixin

This mixin helps generate the `box-shadow` property for elements with flexibility in the shadow's position, blur radius, color, spread, and inset option.

---

### **Mixin Definition**

```scss
@mixin box-shadow($x, $y, $blur, $color, $spread: 0, $inset: false) {
  $shadow-type: if($inset == true, inset, null);
  
  box-shadow: $shadow-type $x $y $blur $spread $color;
}
```

### **Parameters**:

1. **`$x`**: Horizontal offset of the shadow.
    - This moves the shadow horizontally.
    - Positive values move the shadow to the right, and negative values move it to the left.

2. **`$y`**: Vertical offset of the shadow.
    - This moves the shadow vertically.
    - Positive values move the shadow down, and negative values move it up.

3. **`$blur`**: The blur radius of the shadow.
    - Higher values create a more blurred shadow, while smaller values create sharper edges.

4. **`$color`**: The color of the shadow.
    - Accepts any CSS color format (e.g., `rgba()`, `hex`, `color names`).

5. **`$spread`** (optional, defaults to `0`): The spread radius of the shadow.
    - A positive value increases the size of the shadow, while a negative value decreases it.

6. **`$inset`** (optional, defaults to `false`): Creates an inset shadow.
    - When set to `true`, the shadow will be drawn inside the element, as an inset shadow.

---

### **Example Usage**:

#### 1. **Basic Box Shadow**:
```scss
@include box-shadow(10px, 10px, 20px, rgba(0, 0, 0, 0.5));
```
- **Description**: Creates a shadow with a 10px horizontal offset, 10px vertical offset, 20px blur, and black color with 50% opacity.
- **Output**:
```css
box-shadow: 10px 10px 20px 0 rgba(0, 0, 0, 0.5);
```

#### 2. **Box Shadow with Spread**:
```scss
@include box-shadow(5px, 5px, 15px, rgba(0, 0, 0, 0.3), 10px);
```
- **Description**: Adds a 10px spread to the shadow, making the shadow area larger.
- **Output**:
```css
box-shadow: 5px 5px 15px 10px rgba(0, 0, 0, 0.3);
```

#### 3. **Inset Box Shadow**:
```scss
@include box-shadow(5px, 5px, 10px, rgba(0, 0, 0, 0.4), 0, true);
```
- **Description**: Creates an inset shadow (drawn inside the element).
- **Output**:
```css
box-shadow: inset 5px 5px 10px 0 rgba(0, 0, 0, 0.4);
```

---

### **Advantages**:
1. **Modern and Cross-Browser Friendly**: Since most modern browsers fully support the `box-shadow` property, there’s no need for vendor prefixes, making the code cleaner and easier to maintain.

2. **Customizable**: This mixin provides full control over shadow properties, including an optional spread radius and inset shadows for deeper customization.

3. **Flexible for Various Use Cases**: Whether you want a standard shadow, an inset shadow, or one with a spread effect, the mixin can handle it all without needing to write separate CSS.

---

### **Conclusion**:

The `box-shadow` mixin is a powerful and flexible tool for adding shadows to elements. It improves code reusability and maintainability by removing redundancy while allowing the developer to easily adjust the shadow’s properties (including position, blur, spread, and inset). The mixin simplifies generating CSS for shadows across your project, with no need for extra vendor prefixes.

---

### **Documentation for `clearfix` Mixin**

The `clearfix` mixin is a utility for clearing floated child elements within a parent container. This prevents layout issues when child elements are floated left or right.

---

### **Mixin Definition**:

```scss
@mixin clearfix {
  &::after {
    content: "";
    display: table;
    clear: both;
  }
}
```

### **How It Works**:
- **Floated Elements**: When elements are floated (either left or right), their parent container might not expand to wrap around them. This can cause layout issues where the container does not contain its children.
- **Clearfix Solution**: The `clearfix` mixin adds an `::after` pseudo-element that clears the floated elements, ensuring the parent container wraps its floated children correctly.

### **Usage**:

To apply the `clearfix` mixin to a container with floated children:

```scss
.container {
  @include clearfix;
}
```

---

### **Detailed Explanation of Properties**:

1. **`&::after`**:
    - The `&::after` creates a pseudo-element that is inserted after the content of the container. This pseudo-element will help in clearing the floated elements inside the container.

2. **`content: ""`**:
    - This creates an empty pseudo-element. The `content` property is required for the `::after` pseudo-element to work.

3. **`display: table`**:
    - This creates a block-level formatting context, allowing the container to properly contain its floated children. Using `display: table` instead of `block` is more reliable for cross-browser compatibility.

4. **`clear: both`**:
    - The `clear` property ensures that no floating elements (either floated to the left or right) appear next to the `::after` pseudo-element. This effectively "clears" the floated elements.

---

### **Browser Support**:

- Modern browsers fully support this `clearfix` method. It works across major browsers such as Chrome, Firefox, Safari, and Edge without the need for vendor prefixes.
- Older browsers (such as Internet Explorer 6 or 7) may require additional hacks, but most modern projects no longer need to support these browsers.

---

### **Example Usage in SCSS**:

```scss
.container {
  @include clearfix;
  
  .child {
    float: left;
    width: 50%;
  }
}
```

### **Example Usage in HTML**:

```html
<div class="container">
  <div class="child">Floated Child 1</div>
  <div class="child">Floated Child 2</div>
</div>
```

- In this example, the `.container` uses the `clearfix` mixin to ensure that it properly wraps around its two floated child elements. Without the `clearfix` mixin, the container would collapse, and the layout would break.

---

### **Advantages**:
1. **Cross-browser Compatibility**: The `clearfix` mixin ensures that your layout works across modern browsers and prevents common float-related issues.
2. **Simplicity**: By adding the mixin to a container, you can avoid the hassle of manually clearing floats every time you use them.
3. **Reusability**: The mixin can be reused across your project wherever needed, keeping your SCSS clean and DRY (Don’t Repeat Yourself).

---

### **Conclusion**:

The `clearfix` mixin is a simple, effective way to ensure that floated elements are properly cleared within their parent containers. By using this utility, you avoid common float-related layout issues, ensuring that your layouts work as expected across modern browsers.


---


### **Documentation for the `modifiers` Mixin**

This mixin dynamically generates CSS class modifiers based on a given map of values, making it useful for utility-first CSS or any scenarios where you need to generate variations of a base class. It can handle both flat and nested maps.

---

### **Mixin Definition**:

```scss
@mixin modifiers(
  $map,               // The map containing the modifiers and their values
  $attribute,         // The CSS property (e.g., "color", "margin")
  $prefix: "-",       // Optional prefix for modifiers (e.g., "-")
  $separator: "-",    // Optional separator between base class and modifier
  $base: "base"       // The base class, for which no modifier is needed
) {
  @each $key, $value in $map {
    &#{if($key != $base, $prefix + $key, "")} {
      @if type-of($value) == "map" {
        @include modifiers($value, $attribute, $prefix, $separator);
      } @else {
        #{$attribute}: $value;
      }
    }
  }
}
```

### **Parameters**:

1. **`$map`**: A Sass map containing key-value pairs. The keys represent the modifiers, and the values represent the CSS property values. The value can also be a nested map for more granular control.

2. **`$attribute`**: The CSS property to be applied (e.g., `"color"`, `"margin"`, etc.).

3. **`$prefix`** (optional): A string that acts as the prefix for the modifier classes. Defaults to `"-"`. This is useful if you want your modifiers to follow a specific naming convention like `-primary`, `-secondary`.

4. **`$separator`** (optional): Defines a separator between the base class and the modifier. Defaults to `"-"`. For example, a modifier with a base class of `.btn` would result in `.btn-primary` when the `-primary` modifier is applied.

5. **`$base`** (optional): The base class name that doesn't require a modifier. Defaults to `"base"`.

---

### **How It Works**:

- The mixin loops through the map and creates modifier classes based on the keys.
- For each key, it appends the key (modifier) to the parent selector (base class).
- If the value is another map (nested map), it recursively calls the `modifiers` mixin to generate deeper modifier classes.
- For each key-value pair where the value is not a map, it applies the specified CSS property (e.g., `color: blue`).

### **Usage Example**:

#### Example SCSS Code:

```scss
$colors: (
  base: black,
  primary: blue,
  secondary: red,
  nested: (
    dark: #003366,
    light: #99ccff
  )
);

.btn {
  @include modifiers($colors, "color");
}
```

#### Output CSS:

```css
.btn {
  color: black;
}

.btn-primary {
  color: blue;
}

.btn-secondary {
  color: red;
}

.btn-nested-dark {
  color: #003366;
}

.btn-nested-light {
  color: #99ccff;
}
```

#### **Explanation of Output**:
- The base `.btn` class gets `color: black`.
- The `.btn-primary` and `.btn-secondary` classes apply the respective colors from the map.
- The nested map under `nested` generates deeper modifiers like `.btn-nested-dark` and `.btn-nested-light`.

---

### **Customization**:

#### **Changing the Prefix**:
You can change the `$prefix` parameter to suit your needs:

```scss
.btn {
  @include modifiers($colors, "color", "--");
}
```

This would output:

```css
.btn--primary {
  color: blue;
}

.btn--secondary {
  color: red;
}
```

#### **Changing the Separator**:
If you want a different separator between the base class and the modifier, you can adjust the `$separator` parameter:

```scss
.btn {
  @include modifiers($colors, "color", "-", "_");
}
```

This would output:

```css
.btn_primary {
  color: blue;
}

.btn_secondary {
  color: red;
}
```

---

### **Handling Nested Maps**:
You can include as many levels of nesting as needed. Each level will generate a deeper modifier:

```scss
$spacing: (
  base: 0,
  small: 5px,
  large: 10px,
  nested: (
    bigger: 15px,
    biggest: 20px
  )
);

.container {
  @include modifiers($spacing, "margin");
}
```

This would output:

```css
.container {
  margin: 0;
}

.container-small {
  margin: 5px;
}

.container-large {
  margin: 10px;
}

.container-nested-bigger {
  margin: 15px;
}

.container-nested-biggest {
  margin: 20px;
}
```

---

### **Advantages**:

1. **Scalability**: The `modifiers` mixin can handle both flat and deeply nested maps, allowing you to generate as many variations of a base class as you need.

2. **Flexibility**: It can be used for any CSS property (`color`, `margin`, `padding`, etc.) by simply passing the desired property as the `$attribute` parameter.

3. **Customization**: You have control over the prefix, separator, and base class naming conventions, making it adaptable to your project’s style guidelines.

4. **DRY Code**: The mixin prevents repetition by generating all modifiers automatically, making it easier to maintain your CSS code.

---

### **Conclusion**:

The `modifiers` mixin is a highly flexible utility for dynamically generating class modifiers based on a map of values. It simplifies the process of creating modifier-based utility classes, supports nested maps for more complex variations, and allows full customization of class naming conventions.

---


### **Documentation for `border-radius` Mixin**

This mixin is designed to apply the `border-radius` CSS property to elements in a clean and flexible manner. It supports any valid border radius values and simplifies code by removing the need for redundant vendor prefixes.

---

### **Mixin Definition**:

```scss
@mixin border-radius($radius) {
  border-radius: $radius;
}
```

### **Parameters**:

- **`$radius`**:
    - This is the value to be applied to the `border-radius` property. It can accept any valid unit such as `px`, `em`, `rem`, `%`, or even combinations for complex radius configurations (e.g., `10px 5px`).

---

### **Usage Examples**:

#### 1. **Simple Border Radius**:
```scss
.box {
  @include border-radius(10px);
}
```

**Output**:
```css
.box {
  border-radius: 10px;
}
```

#### 2. **Multiple Radius Values**:
You can pass multiple values to create complex border radius configurations, such as rounding only specific corners.

```scss
.card {
  @include border-radius(10px 0 0 10px);
}
```

**Output**:
```css
.card {
  border-radius: 10px 0 0 10px;
}
```

#### 3. **Percentage Border Radius**:
You can use percentage values to create circular or elliptical shapes.

```scss
.avatar {
  @include border-radius(50%);
}
```

**Output**:
```css
.avatar {
  border-radius: 50%;
}
```

---

### **Advantages**:

1. **Simplicity**: By removing unnecessary vendor prefixes, the mixin is more efficient and easier to maintain.
2. **Flexibility**: The mixin can handle any valid `border-radius` value, making it adaptable to a wide range of design needs.
3. **Cleaner Code**: With no need for vendor prefixes, the code remains clean and focused on modern browser support.

---

### **Conclusion**:

The `border-radius` mixin offers a simple, flexible way to apply border radius properties to elements in modern projects. By focusing only on the necessary property, it improves code cleanliness and reduces maintenance. 


---


### **Documentation for Padding Mixin**

This utility mixin is designed to generate padding classes dynamically for all sides (top, bottom, left, right) with values from `0px` to `100px`. It uses a loop to reduce redundancy and improve code maintainability.

---

### **Mixin Definition**:

```scss
@mixin generate-padding($side) {
  @for $i from 0 through 100 {
    .#{$side}-#{$i} {
      padding-#{$side}: $i + px;
    }
  }
}
```

### **Parameters**:

- **`$side`**:
    - A string representing the side for the padding property. It accepts:
        - `t` for `padding-top`
        - `b` for `padding-bottom`
        - `l` for `padding-left`
        - `r` for `padding-right`

### **Usage**:

- To generate padding classes for different sides, use the mixin and pass the corresponding side abbreviation:
    - `@include generate-padding('t')` for `padding-top` classes (`pt-0` to `pt-100`)
    - `@include generate-padding('b')` for `padding-bottom` classes (`pb-0` to `pb-100`)
    - `@include generate-padding('l')` for `padding-left` classes (`pl-0` to `pl-100`)
    - `@include generate-padding('r')` for `padding-right` classes (`pr-0` to `pr-100`)

### **Example Usage in SCSS**:

```scss
@include generate-padding('t'); // padding-top classes
@include generate-padding('b'); // padding-bottom classes
@include generate-padding('l'); // padding-left classes
@include generate-padding('r'); // padding-right classes
```

### **Generated CSS Output**:

The mixin will generate the following CSS classes:

```css
.pt-0 {
  padding-top: 0px;
}

.pt-1 {
  padding-top: 1px;
}

.pt-2 {
  padding-top: 2px;
}

/* ... */

.pt-100 {
  padding-top: 100px;
}

.pb-0 {
  padding-bottom: 0px;
}

/* Similar classes for padding-left (pl-) and padding-right (pr-) */
```

---

### **Advantages**:

1. **DRY Code**: The use of a mixin reduces repetition and ensures you don't have to write the same logic for each padding side.
2. **Flexibility**: You can easily generate padding classes for any range or specific sides just by including the mixin with the appropriate parameters.
3. **Maintainability**: If you need to change the range (e.g., from `0px` to `50px`), you only need to update the loop once inside the mixin.

---

### **Conclusion**:

The `generate-padding` mixin provides an efficient and scalable way to generate padding classes for all sides. It simplifies the process of generating utility classes, making the code more maintainable, flexible, and easier to scale.


