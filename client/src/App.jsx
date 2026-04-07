import { Routes, Route, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'

import DashboardPage from './pages/DashboardPage'
import ApplicationsPage from './pages/ApplicationsPage'
import ApplicationDetailPage from './pages/ApplicationDetailPage'
import ApplicationFormPage from './pages/ApplicationFormPage'
import CompaniesPage from './pages/CompaniesPage'
import CompanyDetailPage from './pages/CompanyDetailPage'
import CompanyFormPage from './pages/CompanyFormPage'
import ContactsPage from './pages/ContactsPage'
import ContactDetailPage from './pages/ContactDetailPage'
import ContactFormPage from './pages/ContactFormPage'

function App() {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
    }
  }, [darkMode])

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-title">Job Tracker</div>
        <NavLink to="/" end className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')}>Dashboard</NavLink>
        <NavLink to="/applications" className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')}>Applications</NavLink>
        <NavLink to="/companies" className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')}>Companies</NavLink>
        <NavLink to="/contacts" className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')}>Contacts</NavLink>
        <div className="sidebar-bottom">
          <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? 'Light mode' : 'Dark mode'}
          </button>
        </div>
      </aside>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/applications/new" element={<ApplicationFormPage />} />
          <Route path="/applications/:id/edit" element={<ApplicationFormPage />} />
          <Route path="/applications/:id" element={<ApplicationDetailPage />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/companies/new" element={<CompanyFormPage />} />
          <Route path="/companies/:id/edit" element={<CompanyFormPage />} />
          <Route path="/companies/:id" element={<CompanyDetailPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/contacts/new" element={<ContactFormPage />} />
          <Route path="/contacts/:id/edit" element={<ContactFormPage />} />
          <Route path="/contacts/:id" element={<ContactDetailPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App