import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AddPage from './AddPage.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <BrowserRouter >
      <Routes >
        <Route path="/" element={<App/>} />
        <Route path="/add-book" element={<AddPage/>} /> 
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
