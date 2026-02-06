import React from 'react';
import { useReviews } from './hooks/useReviews';
import ReviewForm from './components/ReviewForm';
import ReviewList from './components/ReviewList';
import './App.css';

// Main App Component - Clean Architecture
function App() {
  const { reviews, addReview, updateReviewStatus, deleteReview } = useReviews();

  return (
    <div className="app">
      <header className="app-header">
        <h1>ReviewCheck</h1>
        <p>Clean Component Structure Demo</p>
      </header>

      <main className="app-main">
        <ReviewForm onSubmit={addReview} />
        <ReviewList
          reviews={reviews}
          onStatusChange={updateReviewStatus}
          onDelete={deleteReview}
        />
      </main>

      <footer className="app-footer">
        <p>Built with React - No Spaghetti Code! 🍝❌</p>
      </footer>
    </div>
  );
}

export default App;
