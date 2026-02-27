// Standalone PostCSS config for the docs app.
// Prevents Vite from walking up to the root postcss.config.js
// (which requires autoprefixer from root node_modules).
// The docs app doesn't need autoprefixer — Vite handles vendor prefixes.
export default {
  plugins: [],
}
