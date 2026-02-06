import React from 'react';
import './FormInput.css';

// Reusable Input Component - DRY Principle
const FormInput = ({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  onBlur, 
  error, 
  touched,
  required = false,
  ...props 
}) => {
  const showError = touched && error;

  return (
    <div className="form-input">
      <label htmlFor={name}>
        {label}
        {required && <span className="required">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={showError ? 'error' : ''}
          {...props}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={showError ? 'error' : ''}
          {...props}
        />
      )}
      {showError && <span className="error-message">{error}</span>}
    </div>
  );
};

export default FormInput;
