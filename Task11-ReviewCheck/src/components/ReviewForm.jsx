import React from 'react';
import { useFormValidation } from '../hooks/useFormValidation';
import { validateEmail, validateRating, validateReviewText } from '../utils/validation';
import { ERROR_MESSAGES } from '../utils/constants';
import FormInput from './FormInput';
import StarRating from './StarRating';
import './ReviewForm.css';

// Container Component - Handles Logic
const ReviewForm = ({ onSubmit }) => {
  const initialValues = {
    name: '',
    email: '',
    rating: 0,
    reviewText: ''
  };

  const validationRules = {
    name: (value) => !value.trim() ? ERROR_MESSAGES.REQUIRED_FIELD : '',
    email: (value) => {
      if (!value.trim()) return ERROR_MESSAGES.REQUIRED_FIELD;
      if (!validateEmail(value)) return ERROR_MESSAGES.INVALID_EMAIL;
      return '';
    },
    rating: (value) => !validateRating(value) ? ERROR_MESSAGES.INVALID_RATING : '',
    reviewText: (value) => {
      if (!value.trim()) return ERROR_MESSAGES.REQUIRED_FIELD;
      if (!validateReviewText(value)) return ERROR_MESSAGES.INVALID_REVIEW;
      return '';
    }
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    resetForm
  } = useFormValidation(initialValues, validationRules);

  const handleRatingChange = (rating) => {
    handleChange({ target: { name: 'rating', value: rating } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateAll()) {
      onSubmit(values);
      resetForm();
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h2>Submit Your Review</h2>
      
      <FormInput
        label="Name"
        name="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.name}
        touched={touched.name}
        required
      />

      <FormInput
        label="Email"
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.email}
        touched={touched.email}
        required
      />

      <div className="form-input">
        <label>
          Rating<span className="required">*</span>
        </label>
        <StarRating 
          rating={values.rating} 
          onRatingChange={handleRatingChange}
        />
        {touched.rating && errors.rating && (
          <span className="error-message">{errors.rating}</span>
        )}
      </div>

      <FormInput
        label="Review"
        name="reviewText"
        type="textarea"
        value={values.reviewText}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.reviewText}
        touched={touched.reviewText}
        required
        placeholder="Share your experience (minimum 10 characters)"
      />

      <button type="submit" className="submit-btn">
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
