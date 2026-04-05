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

  if (loading) return <p>Loading companies...</p>
  if (error) return <p>{error}</p>
    


    return (
      <div>
        <h1>Companies</h1>
        <button onClick={() => navigate('/companies/new')}>
         + New Company
        </button>
        <table>
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
                <td>{com.industry}</td>
                <td>{com.website}</td>
                <td>
                  <Link to={`/companies/${com.id}`}>View</Link>
                  {' | '}
                  <button type="button" onClick={() => navigate(`/companies/${com.id}/edit`)}>Edit</button>
                  {' | '}
                  <button onClick={() => handleDelete(com.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  export default CompaniesPage;