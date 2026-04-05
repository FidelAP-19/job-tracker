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

    if (loading) return <p>Loading contacts...</p>
    if (error) return <p>{error}</p>


  return (
    <div>
      <h1>Contacts</h1>
      <button onClick={() => navigate('/contacts/new')}>
        + New Contact
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Company-Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(c => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.role}</td>
              <td>{c.email}</td>
              <td>{c.Company?.name}</td>
              <td>
                <Link to={`/contacts/${c.id}`}>View</Link>
                {' | '}
                <button onClick={() => navigate(`/contacts/${c.id}/edit`)}>Edit</button>
                {' | '}
                <button onClick={() => handleDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )
  }

  export default ContactsPage;
