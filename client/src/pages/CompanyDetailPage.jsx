import { useState, useEffect } from 'react'
import { useNavigate, useParams }  from 'react-router-dom'
import { getCompanyById } from '../services/companyService'
import StatusBadge from '../components/StatusBadge'

export default function CompanyDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [ company, setCompany ] = useState(null)
  const [ loading, setLoading ] = useState(true)
  const [ error, setError ] = useState(null)

  useEffect(()=>{
    const loadCompany = async () => {
      try {
        const data = await getCompanyById(id)
        setCompany(data)
      }catch (err){
        setError(err.response?.data?.error || 'Failed to load company.')
      }finally{
        setLoading(false)
      }
    }
    loadCompany()
  }, [id])

  if (loading) return <p>Loading...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>
  if (!company) return null

  return (
    <div>
      <button onClick={() => navigate(`/companies`)}>←Back</button>
      <button onClick={() => navigate(`/companies/${id}/edit`)}>Edit</button>

      <h1>{company.name}</h1>
      <p><strong>Industry:</strong> {company.industry}</p>
      <p><strong>Website:</strong> {company.website}</p>
      <p><strong>Notes:</strong> {company.notes || 'None'}</p>

      <hr />

      <h2>Applications</h2>
      {company.Applications?.length === 0 ? (
        <p>No Applications are available for {company.name} at this moment</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Role-Title</th>
              <th>Status</th>
              <th>Date Applied</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
              {company.Applications?.map((app) => (
                <tr key={app.id}>
                  <td>{app.role_title}</td>
                  <td><StatusBadge status = {app.status} /></td>
                  <td>{app.date_applied ? new Date(app.date_applied).toLocaleDateString() : '-'}</td>
                  <td><button onClick={() => navigate(`/applications/${app.id}`)}>View</button></td>
                </tr>
              ))}  
          </tbody>
        </table>
      )
    }
      <hr />

      <h2>Company Contacts</h2>
      {company.Contacts?.length === 0 ? (
        <p>No Contacts for this {company.name} at this moment.</p> 
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>E-mail</th>
              <th>LinkedIn</th>
            </tr>
          </thead>
          <tbody>
              {company.Contacts?.map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.name}</td>
                  <td>{contact.role}</td>
                  <td>{contact.email}</td>
                  <td>{contact.linkedin_url || 'N/A'}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  ) 
  }