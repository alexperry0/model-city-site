import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/tokens.css'
import './styles/reset.css'
import './styles/typography.css'
import './styles/animations.css'
import './styles/layout.css'
import './styles/components.css'
import './styles/pages/about.css'
import './styles/pages/give.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
