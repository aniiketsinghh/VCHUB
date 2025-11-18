import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router";
import Router from './routes.jsx';
import { AuthProvider } from './context/authContext.jsx';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
   <StrictMode>
    <BrowserRouter>
    <Router />
    </BrowserRouter>
   </StrictMode>
  </AuthProvider>
)
