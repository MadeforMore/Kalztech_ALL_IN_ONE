import React from 'react';
import StarRating from './StarRating';
import { REVIEW_STATUS } from '../utils/constants';
import './ReviewCard.css';

// Presentational Component - Clean and Focused
const ReviewCard = ({ review, onStatusChange, onDelete }) => {
  const { id, name, email, rating, reviewText, status, createdAt } = review;
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusClass = () => {
    switch (status) {
      case REVIEW_STATUS.APPROVED:
        return 'status-approved';
      case REVIEW_STATUS.REJECTED:
        return 'status-rejected';
      default:
        return 'status-pending';
    }
  };

  return (
    <div className={`review-card ${getStatusClass()}`}>
      <div className="review-header">
        <div className="reviewer-info">
          <h3>{name}</h3>
          <p className="email">{email}</p>
        </div>
        <div className="review-meta">
          <span className={`status-badge ${getStatusClass()}`}>
            {status}
          </span>
          <span className="date">{formatDate(createdAt)}</span>
        </div>
      </div>

      <div className="review-rating">
        <StarRating rating={rating} readOnly />
      </div>

      <p className="review-text">{reviewText}</p>

      <div className="review-actions">
        {status === REVIEW_STATUS.PENDING && (
          <>
            <button
              className="btn-approve"
              onClick={() => onStatusChange(id, REVIEW_STATUS.APPROVED)}
            >
              Approve
            </button>
            <button
              className="btn-reject"
              onClick={() => onStatusChange(id, REVIEW_STATUS.REJECTED)}
            >
              Reject
            </button>
          </>
        )}
        <button
          className="btn-delete"
          onClick={() => onDelete(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
