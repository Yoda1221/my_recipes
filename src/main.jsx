import React  from 'react'
import App    from './App'
import { apiSlice }     from './api/apiSlice'
import { createRoot }   from 'react-dom/client'
import { ApiProvider }  from "@reduxjs/toolkit/query/react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './sass/style.scss'

createRoot(document.getElementById('root'))
.render(
  <React.StrictMode>
    <ApiProvider api={ apiSlice } >
      <BrowserRouter>
          <Routes>
            <Route path='/*' element={<App />} />
          </Routes>
      </BrowserRouter>
    </ApiProvider>
  </React.StrictMode>,
)
