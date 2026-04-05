import { Routes, Route, Link } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import ApplicationsPage from './pages/ApplicationsPage'
import ApplicationDetailPage from './pages/ApplicationDetailPage'
import CompaniesPage from './pages/CompaniesPage'
import CompanyDetailPage from './pages/CompanyDetailPage'
import ContactsPage from './pages/ContactsPage'
import ApplicationFormPage from './pages/ApplicationFormPage'
import CompanyFormPage from './pages/CompanyFormPage'
import ContactDetailPage from './pages/ContactDetailPage'
import ContactFormPage from './pages/ContactFormPage'


function App() {
  return (
    <div>
      <nav>
        <Link to="/">Dashboard</Link> |{' '}
        <Link to="/applications">Applications</Link> |{' '}
        <Link to="/companies">Companies</Link> |{' '}
        <Link to="/contacts">Contacts</Link> 
      </nav>

      <Routes>
        <Route path = "/" element={<DashboardPage/>} />
        <Route path = "/applications" element={<ApplicationsPage />} />
        <Route path = "/applications/new" element={<ApplicationFormPage />} />
        <Route path = "/applications/:id/edit" element={<ApplicationFormPage />} />
        <Route path = "/applications/:id" element={<ApplicationDetailPage />} />
        <Route path = "/companies" element={<CompaniesPage />} />
        <Route path="/companies/new" element={<CompanyFormPage />} />
        <Route path = "/companies/:id" element={<CompanyDetailPage />} />
        <Route path="/companies/:id/edit" element={<CompanyFormPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/contacts/new" element={<ContactFormPage />} />
        <Route path="/contacts/:id" element={<ContactDetailPage />} />
        <Route path="/contacts/:id/edit" element={<ContactFormPage />} /> 
       
      </Routes>
    </div>
  )
}

export default App;