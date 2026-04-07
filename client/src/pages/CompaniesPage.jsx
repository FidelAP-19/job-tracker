import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAllCompanies, deleteCompany } from '../services/companyService'

function CompaniesPage() {

  const navigate = useNavigate()
  const [ companies, setCompanies ] = useState([])
  const [ loading, setLoading ] = useState(true)
  const [ error, setError ] = useState(null)

  useEffect(() => {
    fetchCompanies()
  }, [])

  const fetchCompanies = async () => {
    try{
      setLoading(true)
      const data = await getAllCompanies()
      setCompanies(data)
    } catch (err){
        setError(err.response?.data?.error || 'Failed to load companies.')
    }finally{
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this company?')) return
    try{
      await deleteCompany(id)
      setCompanies(companies.filter(com => com.id !== id))
    }catch(err){
      alert(err.response?.data?.error || 'Failed to delete companies')
    }
  }

  if (loading) return <p style={{ color: 'var(--text-secondary)', padding: '20px' }}>Loading companies...</p>
  if (error) return <p style={{ color: 'var(--danger-text)', padding: '20px' }}>{error}</p>
    


  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 className="page-title" style={{ margin: 0 }}>Companies</h1>
        <button className="btn btn-primary" onClick={() => navigate('/companies/new')}>
          + New Company
        </button>
      </div>

      <div className="card">
        <table className="app-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Industry</th>
              <th>Website</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.map(com => (
              <tr key={com.id}>
                <td>{com.name}</td>
                <td className="td-secondary">{com.industry}</td>
                <td className="td-secondary">{com.website}</td>
                <td>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <Link to={`/companies/${com.id}`} className="btn" style={{ fontSize: '12px', padding: '4px 10px' }}>View</Link>
                    <button className="btn" style={{ fontSize: '12px', padding: '4px 10px' }} onClick={() => navigate(`/companies/${com.id}/edit`)}>Edit</button>
                    <button className="btn btn-danger" style={{ fontSize: '12px', padding: '4px 10px' }} onClick={() => handleDelete(com.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
  }

  export default CompaniesPage;