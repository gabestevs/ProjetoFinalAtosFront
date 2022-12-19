import React from 'react'
import './assets/css/global.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import { AddCompany } from './pages/AddCompany'
import { EditCompany } from './pages/EditCompany'
import { Links } from './pages/Links'
import { NotFound } from './pages/NotFound'
import { Page } from './pages/Page'

export function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/add-company" element={<AddCompany />} />
        <Route path="/edit-company/:id" element={<EditCompany />} />
        <Route path="/links/:id/:name" element={<Links />} />
        <Route path="/linkatalog/:id/:name" element={<Page />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

