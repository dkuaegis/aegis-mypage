import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { initGoogleAnalytics } from './utils/analytics'

// Google Analytics 초기화
initGoogleAnalytics()

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
      <App />
  </BrowserRouter>
)
