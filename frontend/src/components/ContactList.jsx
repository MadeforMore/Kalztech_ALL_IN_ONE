import ContactCard from './ContactCard';
import './ContactList.css';

function ContactList({ contacts, onEdit, onDelete }) {
  if (contacts.length === 0) {
    return (
      <div className="empty-state">
        <p>No contacts yet. Add your first contact!</p>
      </div>
    );
  }

  return (
    <div className="contact-list">
      {contacts.map(contact => (
        <ContactCard
          key={contact._id}
          contact={contact}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default ContactList;
