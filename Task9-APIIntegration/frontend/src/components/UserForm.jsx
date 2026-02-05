import React, { useState, useEffect } from 'react';

const UserForm = ({ onSubmit, initialData, isEditing, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    phone: '',
    address: {
      street: '',
      city: '',
      country: '',
      zipCode: ''
    },
    profession: '',
    interests: []
  });
  
  const [interestInput, setInterestInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Populate form with initial data when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        age: initialData.age || '',
        phone: initialData.phone || '',
        address: {
          street: initialData.address?.street || '',
          city: initialData.address?.city || '',
          country: initialData.address?.country || '',
          zipCode: initialData.address?.zipCode || ''
        },
        profession: initialData.profession || '',
        interests: initialData.interests || []
      });
    } else {
      // Reset form when not editing
      setFormData({
        name: '',
        email: '',
        age: '',
        phone: '',
        address: {
          street: '',
          city: '',
          country: '',
          zipCode: ''
        },
        profession: '',
        interests: []
      });
    }
    setErrors({});
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      // Handle nested address fields
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const addInterest = () => {
    if (interestInput.trim() && !formData.interests.includes(interestInput.trim())) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, interestInput.trim()]
      }));
      setInterestInput('');
    }
  };

  const removeInterest = (index) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.age || formData.age < 1) newErrors.age = 'Valid age is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.profession.trim()) newErrors.profession = 'Profession is required';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await onSubmit(formData);
      
      // Reset form only if creating new user (not editing)
      if (!isEditing) {
        setFormData({
          name: '',
          email: '',
          age: '',
          phone: '',
          address: {
            street: '',
            city: '',
            country: '',
            zipCode: ''
          },
          profession: '',
          interests: []
        });
        setInterestInput('');
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (isEditing) {
      onCancel();
    } else {
      setFormData({
        name: '',
        email: '',
        age: '',
        phone: '',
        address: {
          street: '',
          city: '',
          country: '',
          zipCode: ''
        },
        profession: '',
        interests: []
      });
      setInterestInput('');
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter full name"
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter email address"
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="age">Age *</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            placeholder="Enter age"
            min="1"
            max="120"
            className={errors.age ? 'error' : ''}
          />
          {errors.age && <span className="error-text">{errors.age}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter phone number"
            className={errors.phone ? 'error' : ''}
          />
          {errors.phone && <span className="error-text">{errors.phone}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="profession">Profession *</label>
        <input
          type="text"
          id="profession"
          name="profession"
          value={formData.profession}
          onChange={handleInputChange}
          placeholder="Enter profession"
          className={errors.profession ? 'error' : ''}
        />
        {errors.profession && <span className="error-text">{errors.profession}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="street">Street Address</label>
          <input
            type="text"
            id="street"
            name="address.street"
            value={formData.address.street}
            onChange={handleInputChange}
            placeholder="Enter street address"
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="address.city"
            value={formData.address.city}
            onChange={handleInputChange}
            placeholder="Enter city"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="address.country"
            value={formData.address.country}
            onChange={handleInputChange}
            placeholder="Enter country"
          />
        </div>

        <div className="form-group">
          <label htmlFor="zipCode">Zip Code</label>
          <input
            type="text"
            id="zipCode"
            name="address.zipCode"
            value={formData.address.zipCode}
            onChange={handleInputChange}
            placeholder="Enter zip code"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="interests">Interests</label>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <input
            type="text"
            id="interests"
            value={interestInput}
            onChange={(e) => setInterestInput(e.target.value)}
            placeholder="Add an interest"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest())}
          />
          <button
            type="button"
            onClick={addInterest}
            className="btn btn-secondary"
            style={{ padding: '8px 15px' }}
          >
            Add
          </button>
        </div>
        
        {formData.interests.length > 0 && (
          <div className="interests-list">
            {formData.interests.map((interest, index) => (
              <span key={index} className="interest-tag">
                {interest}
                <button
                  type="button"
                  onClick={() => removeInterest(index)}
                  style={{ 
                    marginLeft: '8px', 
                    background: 'none', 
                    border: 'none', 
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Processing...' : (isEditing ? 'Update User' : 'Create User')}
        </button>
        
        <button
          type="button"
          onClick={handleReset}
          className="btn btn-secondary"
          disabled={loading}
        >
          {isEditing ? 'Cancel' : 'Reset'}
        </button>
      </div>
    </form>
  );
};

export default UserForm;