## Helper for scss project

Package for scss project to generate useful style without tears!

- Font size
- Simple grid
- Visual design
- Color helper
- Css grid
- ~20KB size of compiled css
- Sementic color naming
- Reusable mixin and functionality

## Compile and watch

I'm using node-sass to compile and watch scss files.

#### Compile:

`node-sass src/index.scss dist/style.css`

#### Watch:

`node-sass src/style.scss dist/style.css -w`

##### Only css-grid watch

`node-sass src/only-css-grid.scss dist/css-grid.css -w`

#### Install:

This repo release on npm package.

`npm install scss-helper --save-dev`

`yarn add scss-helper --save-dev`
