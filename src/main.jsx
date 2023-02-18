import React  from 'react'
import App    from './App'
import { apiSlice }     from './api/apiSlice'
import { createRoot }   from 'react-dom/client'
import { ApiProvider }  from "@reduxjs/toolkit/query/react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'

import './sass/style.scss'

createRoot(document.getElementById('root'))
.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ApiProvider api={ apiSlice } >
          <Routes>
            <Route path='/*' element={<App />} />
          </Routes>
        </ApiProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
