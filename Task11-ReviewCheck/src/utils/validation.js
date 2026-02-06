// Validation utilities - Single Responsibility Principle
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateRating = (rating) => {
  return rating >= 1 && rating <= 5;
};

export const validateReviewText = (text) => {
  return text.trim().length >= 10;
};
