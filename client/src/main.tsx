//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import ErrorBoundary from './components/error-boundary.tsx'

createRoot(document.getElementById('root')!).render(
  //<StrictMode>
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
  //</StrictMode>,
)
