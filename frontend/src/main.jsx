import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import EmailBuilder from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EmailBuilder/>
  </StrictMode>,
)
