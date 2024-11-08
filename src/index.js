import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from "./App.js"
import './index.css'
import { ContextProvider } from './context/ContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <ContextProvider >
   <App />
   </ContextProvider>
  </StrictMode>
)
