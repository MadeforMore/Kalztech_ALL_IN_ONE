import React from 'react';

const UserList = ({ users, loading, onEdit, onDelete, onRefresh }) => {
  if (loading) {
    return (
      <div className="loading">
        <div>🔄 Loading users...</div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="empty-state">
        <h3>📝 No Users Found</h3>
        <p>Start by adding your first user using the form on the left.</p>
        <button onClick={onRefresh} className="btn btn-primary" style={{ marginTop: '20px' }}>
          🔄 Refresh
        </button>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <span style={{ color: '#6c757d' }}>
          Total: {users.length} user{users.length !== 1 ? 's' : ''}
        </span>
        <button onClick={onRefresh} className="btn btn-secondary" style={{ padding: '8px 15px' }}>
          🔄 Refresh
        </button>
      </div>

      <div className="users-list">
        {users.map((user) => (
          <div key={user._id} className="user-card">
            <div className="user-header">
              <div>
                <h3 className="user-name">{user.name}</h3>
                <p className="user-email">{user.email}</p>
              </div>
            </div>

            <div className="user-details">
              <div className="user-detail">
                <strong>Age:</strong> {user.age} years
              </div>
              <div className="user-detail">
                <strong>Phone:</strong> {user.phone}
              </div>
              <div className="user-detail">
                <strong>Profession:</strong> {user.profession}
              </div>
              {user.address && (user.address.city || user.address.country) && (
                <div className="user-detail">
                  <strong>Location:</strong> {[user.address.city, user.address.country].filter(Boolean).join(', ')}
                </div>
              )}
            </div>

            {user.address && (user.address.street || user.address.zipCode) && (
              <div className="user-details">
                {user.address.street && (
                  <div className="user-detail">
                    <strong>Address:</strong> {user.address.street}
                    {user.address.zipCode && `, ${user.address.zipCode}`}
                  </div>
                )}
              </div>
            )}

            {user.interests && user.interests.length > 0 && (
              <div>
                <strong style={{ fontSize: '0.9rem', color: '#495057' }}>Interests:</strong>
                <div className="interests-list">
                  {user.interests.map((interest, index) => (
                    <span key={index} className="interest-tag">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginTop: '15px',
              paddingTop: '15px',
              borderTop: '1px solid #e9ecef'
            }}>
              <div style={{ fontSize: '0.8rem', color: '#6c757d' }}>
                Created: {formatDate(user.createdAt)}
                {user.updatedAt !== user.createdAt && (
                  <div>Updated: {formatDate(user.updatedAt)}</div>
                )}
              </div>
              
              <div className="user-actions">
                <button
                  onClick={() => onEdit(user)}
                  className="btn btn-edit"
                  title="Edit user"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => onDelete(user._id)}
                  className="btn btn-danger"
                  title="Delete user"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;