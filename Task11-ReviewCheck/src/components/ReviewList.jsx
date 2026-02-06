import React, { useState } from 'react';
import ReviewCard from './ReviewCard';
import { REVIEW_STATUS } from '../utils/constants';
import './ReviewList.css';

// Container Component with Filtering Logic
const ReviewList = ({ reviews, onStatusChange, onDelete }) => {
  const [filter, setFilter] = useState('all');

  const filteredReviews = reviews.filter(review => {
    if (filter === 'all') return true;
    return review.status === filter;
  });

  const getCount = (status) => {
    if (status === 'all') return reviews.length;
    return reviews.filter(r => r.status === status).length;
  };

  return (
    <div className="review-list">
      <div className="list-header">
        <h2>Reviews ({filteredReviews.length})</h2>
        
        <div className="filter-buttons">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All ({getCount('all')})
          </button>
          <button
            className={filter === REVIEW_STATUS.PENDING ? 'active' : ''}
            onClick={() => setFilter(REVIEW_STATUS.PENDING)}
          >
            Pending ({getCount(REVIEW_STATUS.PENDING)})
          </button>
          <button
            className={filter === REVIEW_STATUS.APPROVED ? 'active' : ''}
            onClick={() => setFilter(REVIEW_STATUS.APPROVED)}
          >
            Approved ({getCount(REVIEW_STATUS.APPROVED)})
          </button>
          <button
            className={filter === REVIEW_STATUS.REJECTED ? 'active' : ''}
            onClick={() => setFilter(REVIEW_STATUS.REJECTED)}
          >
            Rejected ({getCount(REVIEW_STATUS.REJECTED)})
          </button>
        </div>
      </div>

      {filteredReviews.length === 0 ? (
        <div className="empty-state">
          <p>No reviews found</p>
        </div>
      ) : (
        <div className="reviews-container">
          {filteredReviews.map(review => (
            <ReviewCard
              key={review.id}
              review={review}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;
