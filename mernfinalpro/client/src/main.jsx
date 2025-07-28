import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/cartContext'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     <CartProvider>
        <App />
     </CartProvider>
    </BrowserRouter>
  </StrictMode>

  
)
