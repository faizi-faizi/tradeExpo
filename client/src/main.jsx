import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'


// 🚧 Maintenance Mode
const MAINTENANCE = false;

if (MAINTENANCE) {
  document.body.innerHTML = `
    <div style="
      height:100vh;display:flex;justify-content:center;align-items:center;
      background:#111;color:white;font-family:sans-serif;text-align:center;
    ">
      <div>
        <h1>🚧 Website Under Maintenance</h1>
        <p>We will be back shortly. Thank you for your patience.</p>
      </div>
    </div>
  `;
  throw new Error("Maintenance Mode Active");
}

// =======================
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)