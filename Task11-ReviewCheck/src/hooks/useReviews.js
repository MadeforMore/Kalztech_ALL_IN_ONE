import { useState, useCallback } from 'react';
import { REVIEW_STATUS } from '../utils/constants';

// Custom hook for review management - Separation of Concerns
export const useReviews = () => {
  const [reviews, setReviews] = useState([]);

  const addReview = useCallback((review) => {
    const newReview = {
      id: Date.now(),
      ...review,
      status: REVIEW_STATUS.PENDING,
      createdAt: new Date().toISOString()
    };
    setReviews(prev => [newReview, ...prev]);
  }, []);

  const updateReviewStatus = useCallback((id, status) => {
    setReviews(prev => 
      prev.map(review => 
        review.id === id ? { ...review, status } : review
      )
    );
  }, []);

  const deleteReview = useCallback((id) => {
    setReviews(prev => prev.filter(review => review.id !== id));
  }, []);

  return {
    reviews,
    addReview,
    updateReviewStatus,
    deleteReview
  };
};
