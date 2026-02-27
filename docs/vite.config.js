import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Set base to repo name so asset paths work on GitHub Pages
  // https://pooyagolchian.github.io/scss-helper/
  base: process.env.VITE_BASE_URL ?? '/',
})
