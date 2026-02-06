import React from 'react';
import './StarRating.css';

// Presentational Component - Single Responsibility
const StarRating = ({ rating, onRatingChange, readOnly = false }) => {
  const stars = [1, 2, 3, 4, 5];

  const handleClick = (value) => {
    if (!readOnly && onRatingChange) {
      onRatingChange(value);
    }
  };

  return (
    <div className="star-rating">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          className={`star ${star <= rating ? 'filled' : ''} ${readOnly ? 'readonly' : ''}`}
          onClick={() => handleClick(star)}
          disabled={readOnly}
          aria-label={`Rate ${star} stars`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default StarRating;
