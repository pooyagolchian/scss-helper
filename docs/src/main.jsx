import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/noir.css'
import App from './App.jsx'

// import.meta.env.BASE_URL is '/' locally and '/scss-helper/' on GitHub Pages
// (set via VITE_BASE_URL in the deploy workflow)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>
)
