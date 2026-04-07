import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAllContacts, deleteContact } from "../services/contactService"

function ContactsPage() {
  const navigate = useNavigate()
  const [ contacts, setContacts ] = useState([])
  const [ loading, setLoading ] = useState(true)
  const [ error, setError ] = useState(null)

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try{
        setLoading(true)
        const data = await getAllContacts()
        setContacts(data)
    }catch(err){
      setError(err.response?.data?.error || 'Failed to load contacts')
    }finally{
      setLoading(false)
    }
  }
    

    const handleDelete = async (id) => {
      if (!window.confirm('Delete this contact?')) return
      try{
        await deleteContact(id)
        setContacts(contacts.filter(contact => contact.id !== id))
      }catch(err){
        alert(err.response?.data?.error || 'Failed to delete contact')
      }
    }

    if (loading) return <p style={{ color: 'var(--text-secondary)', padding: '20px' }}>Loading contacts...</p>
    if (error) return <p style={{ color: 'var(--danger-text)', padding: '20px' }}>{error}</p>
  


    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 className="page-title" style={{ margin: 0 }}>Contacts</h1>
          <button className="btn btn-primary" onClick={() => navigate('/contacts/new')}>
            + New Contact
          </button>
        </div>
  
        <div className="card">
          <table className="app-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Company</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(c => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td className="td-secondary">{c.role}</td>
                  <td className="td-secondary">{c.email}</td>
                  <td className="td-secondary">{c.Company?.name}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <Link to={`/contacts/${c.id}`} className="btn" style={{ fontSize: '12px', padding: '4px 10px' }}>View</Link>
                      <button className="btn" style={{ fontSize: '12px', padding: '4px 10px' }} onClick={() => navigate(`/contacts/${c.id}/edit`)}>Edit</button>
                      <button className="btn btn-danger" style={{ fontSize: '12px', padding: '4px 10px' }} onClick={() => handleDelete(c.id)}>Delete</button>
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

  export default ContactsPage;
