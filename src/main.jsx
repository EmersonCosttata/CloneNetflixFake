import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './components/contetx/AuthContext.jsx'
import { HashRouter } from 'react-router-dom';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
    <AuthProvider>
    <App />
    </AuthProvider>
    </HashRouter>
  </React.StrictMode>
)
