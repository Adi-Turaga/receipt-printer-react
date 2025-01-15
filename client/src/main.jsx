import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './tabs.css'
import './input.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
