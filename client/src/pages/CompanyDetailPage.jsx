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

  if (loading) return <p style={{ color: 'var(--text-secondary)' }}>Loading...</p>
  if (error) return <p style={{ color: 'var(--danger-text)' }}>{error}</p>
  if (!company) return null

  return (
    <div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <button className="btn" onClick={() => navigate('/companies')}>← Back</button>
        <button className="btn" onClick={() => navigate(`/companies/${id}/edit`)}>Edit</button>
      </div>

      <h1 className="page-title">{company.name}</h1>

      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-body">
          <div className="detail-field"><strong>Industry</strong>{company.industry}</div>
          <div className="detail-field"><strong>Website</strong>{company.website}</div>
          <div className="detail-field"><strong>Notes</strong>{company.notes || 'None'}</div>
        </div>
      </div>

      <h2 style={{ fontSize: '16px', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '16px' }}>Applications</h2>
      <div className="card" style={{ marginBottom: '24px' }}>
        {company.Applications?.length === 0 ? (
          <div className="card-body">
            <p style={{ color: 'var(--text-secondary)' }}>No applications for this company.</p>
          </div>
        ) : (
          <table className="app-table">
            <thead>
              <tr>
                <th>Role</th>
                <th>Status</th>
                <th>Date Applied</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {company.Applications?.map((app) => (
                <tr key={app.id}>
                  <td>{app.role_title}</td>
                  <td><StatusBadge status={app.status} /></td>
                  <td className="td-secondary">{app.date_applied ? new Date(app.date_applied).toLocaleDateString() : '-'}</td>
                  <td>
                    <button className="btn" style={{ fontSize: '12px', padding: '4px 10px' }} onClick={() => navigate(`/applications/${app.id}`)}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <h2 style={{ fontSize: '16px', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '16px' }}>Contacts</h2>
      <div className="card">
        {company.Contacts?.length === 0 ? (
          <div className="card-body">
            <p style={{ color: 'var(--text-secondary)' }}>No contacts for this company.</p>
          </div>
        ) : (
          <table className="app-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>LinkedIn</th>
              </tr>
            </thead>
            <tbody>
              {company.Contacts?.map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.name}</td>
                  <td className="td-secondary">{contact.role}</td>
                  <td className="td-secondary">{contact.email}</td>
                  <td className="td-secondary">{contact.linkedin_url || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
  }