import React, { useState, useEffect } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import { getUsers, createUser, updateUser, deleteUser } from './services/api';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingUser, setEditingUser] = useState(null);

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getUsers();
      setUsers(response.data.data);
    } catch (err) {
      setError('Failed to fetch users. Please check if the backend server is running.');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (userData) => {
    try {
      setError('');
      setSuccess('');
      const response = await createUser(userData);
      setUsers(prev => [response.data.data, ...prev]);
      setSuccess('User created successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to create user';
      setError(errorMessage);
      setTimeout(() => setError(''), 5000);
      throw err;
    }
  };

  const handleUpdateUser = async (id, userData) => {
    try {
      setError('');
      setSuccess('');
      const response = await updateUser(id, userData);
      setUsers(prev => prev.map(user => 
        user._id === id ? response.data.data : user
      ));
      setEditingUser(null);
      setSuccess('User updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update user';
      setError(errorMessage);
      setTimeout(() => setError(''), 5000);
      throw err;
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      setError('');
      await deleteUser(id);
      setUsers(prev => prev.filter(user => user._id !== id));
      setSuccess('User deleted successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to delete user';
      setError(errorMessage);
      setTimeout(() => setError(''), 5000);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setError('');
    setSuccess('');
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setError('');
    setSuccess('');
  };

  return (
    <div className="container">
      <header className="header">
        <h1>🚀 API Integration Task</h1>
        <p>React Forms → Node.js Backend → MongoDB Database</p>
      </header>

      <main className="main-content">
        <section className="section">
          <h2>{editingUser ? '✏️ Edit User' : '➕ Add New User'}</h2>
          
          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}
          
          <UserForm
            onSubmit={editingUser ? 
              (data) => handleUpdateUser(editingUser._id, data) : 
              handleCreateUser
            }
            initialData={editingUser}
            isEditing={!!editingUser}
            onCancel={handleCancelEdit}
          />
        </section>

        <section className="section">
          <h2>👥 Users List ({users.length})</h2>
          
          <UserList
            users={users}
            loading={loading}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            onRefresh={fetchUsers}
          />
        </section>
      </main>
    </div>
  );
}

export default App;