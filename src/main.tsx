import { WandSparkles } from 'lucide-react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { applyIconCursor } from './lib/iconCursor.tsx'

applyIconCursor(WandSparkles, { color: '#6b5bd2', mirror: true, hotspot: [4, 4] })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
