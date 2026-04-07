import { useState, useEffect } from 'react'
import { useNavigate, useParams }  from 'react-router-dom'
import { getContactById } from '../services/contactService'

export default function ContactDetailPage() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [ contact, setContact ] = useState(null)
    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState(null)

    useEffect(() => {
        const loadContact = async () => {
            try {
                const data = await getContactById(id)
                setContact(data)
            }catch(err){
                setError(err.response?.data?.error || 'Failed to load to contact.')
            }finally{
                setLoading(false)
            }
        }
        loadContact()
    },[id])

    if (loading) return <p style={{ color: 'var(--text-secondary)' }}>Loading...</p>
    if (error) return <p style={{ color: 'var(--danger-text)' }}>{error}</p>
    if (!contact) return null

    return (
        <div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
            <button className="btn" onClick={() => navigate('/contacts')}>← Back</button>
            <button className="btn" onClick={() => navigate(`/contacts/${id}/edit`)}>Edit</button>
          </div>
    
          <h1 className="page-title">{contact.name}</h1>
    
          <div className="card" style={{ marginBottom: '24px', maxWidth: '600px' }}>
            <div className="card-body">
              <div className="detail-field"><strong>Role</strong>{contact.role}</div>
              <div className="detail-field"><strong>Email</strong>{contact.email}</div>
              <div className="detail-field"><strong>LinkedIn</strong>{contact.linkedin_url || 'N/A'}</div>
              <div className="detail-field"><strong>Notes</strong>{contact.notes || 'None'}</div>
            </div>
          </div>
    
          <h2 style={{ fontSize: '16px', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '16px' }}>Company</h2>
          <div className="card" style={{ maxWidth: '600px' }}>
            {!contact.Company ? (
              <div className="card-body">
                <p style={{ color: 'var(--text-secondary)' }}>No company information available.</p>
              </div>
            ) : (
              <div className="card-body">
                <div className="detail-field"><strong>Name</strong>{contact.Company.name}</div>
                <div className="detail-field"><strong>Industry</strong>{contact.Company.industry}</div>
                <div style={{ marginTop: '12px' }}>
                  <button className="btn" onClick={() => navigate(`/companies/${contact.Company.id}`)}>
                    View Company
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )
}