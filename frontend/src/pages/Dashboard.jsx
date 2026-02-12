import { useState, useEffect } from 'react';
import ContactList from '../components/ContactList';
import ContactForm from '../components/ContactForm';
import { getContacts, createContact, updateContact, deleteContact } from '../services/api';
import './Dashboard.css';

function Dashboard({ user }) {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (err) {
      setError('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (contactData) => {
    try {
      const newContact = await createContact(contactData);
      setContacts([newContact, ...contacts]);
      setShowForm(false);
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to create contact');
    }
  };

  const handleUpdate = async (id, contactData) => {
    try {
      const updated = await updateContact(id, contactData);
      setContacts(contacts.map(c => c._id === id ? updated : c));
      setEditingContact(null);
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to update contact');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await deleteContact(id);
        setContacts(contacts.filter(c => c._id !== id));
      } catch (err) {
        setError('Failed to delete contact');
      }
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome, {user.name}!</h1>
        <button className="btn-primary" onClick={() => setShowForm(true)}>
          + Add Contact
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {(showForm || editingContact) && (
        <ContactForm
          contact={editingContact}
          onSubmit={editingContact ? handleUpdate : handleCreate}
          onCancel={() => {
            setShowForm(false);
            setEditingContact(null);
          }}
        />
      )}

      {loading ? (
        <div className="loading">Loading contacts...</div>
      ) : (
        <ContactList
          contacts={contacts}
          onEdit={setEditingContact}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default Dashboard;
