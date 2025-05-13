import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './Context/ThemeContext'
// ✅ import your provider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      {' '}
      {/* ✅ wrap App in ThemeProvider */}
      <App />
    </ThemeProvider>
  </StrictMode>
)
