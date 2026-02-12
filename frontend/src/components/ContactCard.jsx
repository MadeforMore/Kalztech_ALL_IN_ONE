import './ContactCard.css';

function ContactCard({ contact, onEdit, onDelete }) {
  return (
    <div className="contact-card">
      <div className="contact-header">
        <h3>{contact.name}</h3>
        <div className="contact-actions">
          <button onClick={() => onEdit(contact)} className="btn-edit">
            ✏️ Edit
          </button>
          <button onClick={() => onDelete(contact._id)} className="btn-delete">
            🗑️ Delete
          </button>
        </div>
      </div>
      <div className="contact-details">
        <p><strong>📧 Email:</strong> {contact.email}</p>
        <p><strong>📱 Phone:</strong> {contact.phone}</p>
        {contact.company && <p><strong>🏢 Company:</strong> {contact.company}</p>}
        {contact.address && <p><strong>📍 Address:</strong> {contact.address}</p>}
        {contact.notes && <p><strong>📝 Notes:</strong> {contact.notes}</p>}
      </div>
    </div>
  );
}

export default ContactCard;
