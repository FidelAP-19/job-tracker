import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createContact, getContactById, updateContact } from '../services/contactService'
import { getAllCompanies } from '../services/companyService'

export default function ContactFormPage() {

    const { id } = useParams()
    const navigate = useNavigate()
    const isEditing = Boolean(id)

    const [ formData, setFormData ] = useState({
        name:'',
        company_id:'',
        role:'',
        email:'',
        linkedin_url:'',
        notes:'',
    })

    const [ companies, setCompanies ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(null)

    useEffect(() => {
        const loadData = async () => {
            try{
                const companyList = await getAllCompanies()
                setCompanies(companyList)

                if(isEditing){
                    const con = await getContactById(id)
                    setFormData({
                        name: con.name || '',
                        company_id: con.company_id || '',
                        role:con.role || '',
                        email: con.email || '',
                        linkedin_url: con.linkedin_url || '',
                        notes: con.notes || '',
                    })
                }

            }catch(err){
                setError(err.response?.data?.error || "Failed to load data.")
            }
        }
        loadData()
    }, [id, isEditing])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({...prev, [name]: value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try{
            if(isEditing){
                await updateContact(id, formData) 
            }else{
                await createContact(formData)
            }
            navigate('/contacts/')
        }catch(err){
            setError(err.response?.data?.error || "Failed to save contact")
            setLoading(false)
        }
    }

    return (
        <div>
          <h1 className="page-title">{isEditing ? 'Edit Contact' : 'New Contact'}</h1>
    
          <div className="card" style={{ maxWidth: '600px' }}>
            <div className="card-body">
              {error && <p style={{ color: 'var(--danger-text)', marginBottom: '16px' }}>{error}</p>}
    
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input className="form-input" name="name" value={formData.name} onChange={handleChange} required />
                </div>
    
                <div className="form-group">
                  <label className="form-label">Company</label>
                  <select className="form-select" name="company_id" value={formData.company_id} onChange={handleChange} required>
                    <option value="">-- Select a Company --</option>
                    {companies.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
    
                <div className="form-group">
                  <label className="form-label">Role</label>
                  <input className="form-input" name="role" value={formData.role} onChange={handleChange} />
                </div>
    
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input className="form-input" name="email" value={formData.email} onChange={handleChange} />
                </div>
    
                <div className="form-group">
                  <label className="form-label">LinkedIn URL</label>
                  <input className="form-input" name="linkedin_url" value={formData.linkedin_url} onChange={handleChange} />
                </div>
    
                <div className="form-group">
                  <label className="form-label">Notes</label>
                  <textarea className="form-textarea" name="notes" value={formData.notes} onChange={handleChange} />
                </div>
    
                <div className="form-actions">
                  <button className="btn btn-primary" type="submit" disabled={loading}>
                    {loading ? 'Saving...' : isEditing ? 'Update Contact' : 'Create Contact'}
                  </button>
                  <button className="btn" type="button" onClick={() => navigate('/contacts')}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )
}